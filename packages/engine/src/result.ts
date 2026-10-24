/**
 * Result of a check: triage, ranked conditions with display percentages and explanations,
 * safety-netting and specialties (docs/engine-spec.md §9–§10).
 */
import { isApplicable } from './context.ts';
import { indexKb } from './kb-index.ts';
import type { EngineIndex } from './kb-index.ts';
import type { CompiledKb, Condition, EngineParams, TriageLevel } from './model.ts';
import { evidenceItems, hypothesesFor, likelihood, posterior } from './posterior.ts';
import type { EvidenceItem } from './posterior.ts';
import { envOf, nextStep } from './session.ts';
import type { SessionState, StopReason } from './session.ts';
import { computeTriage } from './triage.ts';
import type { Triage } from './triage.ts';

export type DisplayPercent = { kind: 'about'; percent: number } | { kind: 'below'; percent: number };

export interface Contribution {
  findingId: string;
  value: string;
  /** Log likelihood ratio against OTHER, after temperature and cluster weights. */
  logRatio: number;
}

export interface ConditionScore {
  conditionId: string;
  probability: number;
  display: DisplayPercent;
  urgency: TriageLevel;
  cantMiss: boolean;
  supporting: Contribution[];
  opposing: Contribution[];
}

export interface SessionResult {
  kbVersion: string;
  calibrated: boolean;
  complaintId: string;
  ageGroup: string;
  stopReason: StopReason | null;
  questionsAsked: number;
  triage: Triage;
  /** True for young infants: no condition list is shown. */
  rankingSuppressed: boolean;
  /** All candidate conditions, most probable first. */
  conditions: ConditionScore[];
  other: { probability: number; display: DisplayPercent };
  /** Findings for "go to emergency now if…", in display order. */
  safetyNet: string[];
  specialties: string[];
}

const MAX_CONTRIBUTIONS = 5;
const SPECIALTY_MIN_PROB = 0.15;
const PEDIATRIC_MAX_MONTHS = 16 * 12;

/** Rounds to the display grid; never shows 0% or 100% (docs/plan.md §3.3). */
export function displayPercent(probability: number, display: EngineParams['display']): DisplayPercent {
  const rounded = Math.round((probability * 100) / display.roundTo) * display.roundTo;
  if (rounded < display.minShown) return { kind: 'below', percent: display.minShown };
  return { kind: 'about', percent: Math.min(rounded, display.maxShown) };
}

export function contributions(
  idx: EngineIndex,
  items: readonly EvidenceItem[],
  condition: Condition,
  complaintId: string,
): { supporting: Contribution[]; opposing: Contribution[] } {
  const { temperature, categoricalSmoothing: alpha } = idx.kb.params;
  const all = items
    .map((item) => ({
      findingId: item.finding.id,
      value: item.value,
      logRatio:
        temperature *
        item.weight *
        (Math.log(likelihood(item.finding, item.value, condition, complaintId, alpha)) -
          Math.log(likelihood(item.finding, item.value, null, complaintId, alpha))),
    }))
    .filter((c) => Math.abs(c.logRatio) > 1e-9);
  return {
    supporting: all.filter((c) => c.logRatio > 0).sort((a, b) => b.logRatio - a.logRatio).slice(0, MAX_CONTRIBUTIONS),
    opposing: all.filter((c) => c.logRatio < 0).sort((a, b) => a.logRatio - b.logRatio).slice(0, MAX_CONTRIBUTIONS),
  };
}

export function sessionResult(kb: CompiledKb, state: SessionState): SessionResult {
  const idx = indexKb(kb);
  const params = kb.params;
  const env = envOf(kb, state);
  const hyps = hypothesesFor(idx, state.complaintId, state.ctx, env.ageGroup);
  const items = evidenceItems(idx, env.answers, env.implied);
  const probs = posterior(idx, hyps, items, state.complaintId);

  const step = nextStep(kb, state);
  const stopReason = step.kind === 'done' ? step.reason : null;
  const earlyStop = stopReason === 'stopped_by_user' || stopReason === 'max_questions' || stopReason === null;
  const triage = computeTriage({ idx, complaintId: state.complaintId, env, hyps, probs, earlyStop });

  const conditions: ConditionScore[] = [];
  hyps.conditions.forEach((c, h) => {
    if (c === null) return;
    const probability = probs[h] ?? 0;
    conditions.push({
      conditionId: c.id,
      probability,
      display: displayPercent(probability, params.display),
      urgency: c.urgency,
      cantMiss: c.cantMiss,
      ...contributions(idx, items, c, state.complaintId),
    });
  });
  conditions.sort((a, b) => b.probability - a.probability);
  const pOther = probs[probs.length - 1] ?? 0;

  // Safety-netting: the complaint's own list, then warning signs of urgent conditions still possible.
  const safety: string[] = [...(idx.complaintById.get(state.complaintId)?.safetyNet ?? [])];
  for (const cs of conditions) {
    if (cs.probability < params.safetyNetMinProb || cs.urgency > 2) continue;
    safety.push(...(idx.conditionById.get(cs.conditionId)?.warningSigns ?? []));
  }
  const safetyNet = [...new Set(safety)].filter((id) => {
    const f = idx.findingById.get(id);
    return f !== undefined && env.answers[id] !== 'present' && isApplicable(f.appliesTo, state.ctx, env.ageGroup);
  });

  const specialties: string[] = [];
  if (triage.level <= 2) specialties.push('emergency');
  if (state.ctx.ageMonths < PEDIATRIC_MAX_MONTHS) specialties.push('pediatrics');
  for (const cs of conditions) {
    if (cs.probability < SPECIALTY_MIN_PROB) break;
    specialties.push(...(idx.conditionById.get(cs.conditionId)?.specialties ?? []));
  }
  if (specialties.length === 0) specialties.push('general_medicine');

  return {
    kbVersion: kb.version,
    calibrated: params.calibrated,
    complaintId: state.complaintId,
    ageGroup: env.ageGroup,
    stopReason,
    questionsAsked: state.history.length,
    triage,
    rankingSuppressed: params.screenOnlyAgeGroups.includes(env.ageGroup),
    conditions,
    other: { probability: pOther, display: displayPercent(pOther, params.display) },
    safetyNet,
    specialties: [...new Set(specialties)],
  };
}
