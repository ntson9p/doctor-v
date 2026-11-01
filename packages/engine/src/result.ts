/**
 * Result of a check: triage, ranked conditions with display percentages and explanations,
 * safety-netting and specialties (docs/engine-spec.md §9–§10).
 */
import { isApplicable } from './context.ts';
import { indexKb } from './kb-index.ts';
import type { EngineIndex } from './kb-index.ts';
import type { CompiledKb, EngineParams, Link, TriageLevel } from './model.ts';
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
  ruleOut: boolean;
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
  /**
   * True when the session stopped early because a danger rule demands emergency care. The
   * ranking then rests on very few answers, so UIs show `urgentConditions` instead of it.
   */
  emergencyStop: boolean;
  /**
   * Conditions a doctor should rule out first, most probable first, at most 3. Candidates: those
   * named by the level 1–2 danger rules that hold (meningococcal disease for a purpuric rash,
   * however rare), level 1–2 conditions still possible, and level 3 conditions whose own warning
   * signs are present (a severe form, e.g. dengue with warning signs; for level 4–5 conditions a
   * warning sign points to another condition). At least one rule-named condition is kept, named by
   * the rules that set the level when they name one.
   */
  urgentConditions: string[];
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

/** Explanation of one condition: `links` are its effective links for the patient's age group. */
export function contributions(
  idx: EngineIndex,
  items: readonly EvidenceItem[],
  links: Readonly<Record<string, Link>>,
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
        (Math.log(likelihood(item.finding, item.value, links[item.finding.id], complaintId, alpha)) -
          Math.log(likelihood(item.finding, item.value, undefined, complaintId, alpha))),
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
    const links = hyps.links[h];
    if (c === null || !links) return;
    const probability = probs[h] ?? 0;
    conditions.push({
      conditionId: c.id,
      probability,
      display: displayPercent(probability, params.display),
      urgency: c.urgency,
      cantMiss: c.cantMiss,
      ruleOut: c.ruleOut,
      ...contributions(idx, items, links, state.complaintId),
    });
  });
  conditions.sort((a, b) => b.probability - a.probability);
  const pOther = probs[probs.length - 1] ?? 0;
  const namedBy = (keep: (level: TriageLevel) => boolean): Set<string> =>
    new Set(
      triage.reasons.flatMap((r) =>
        r.kind === 'rule' && r.level <= 2 && keep(r.level) ? (idx.ruleById.get(r.ruleId)?.conditions ?? []) : [],
      ),
    );
  const ruleNamed = namedBy(() => true);
  // The condition kept in any case comes from the rules that set the level: a broader level 2 rule (fainting with
  // pain) must not take the place of the condition behind the level 1 rule (a ruptured aortic aneurysm).
  const levelNamed = namedBy((level) => level === triage.level);
  const keptNamed = levelNamed.size > 0 ? levelNamed : ruleNamed;
  const warningSignPresent = (id: string): boolean =>
    (idx.conditionById.get(id)?.warningSigns ?? []).some((f) => env.answers[f] === 'present' || env.implied.has(f));
  const ruleOut = conditions.filter(
    (c) =>
      ruleNamed.has(c.conditionId) ||
      (c.probability >= params.safetyNetMinProb && (c.urgency <= 2 || (c.urgency === 3 && warningSignPresent(c.conditionId)))),
  );
  const urgentConditions = ruleOut.slice(0, 3);
  const named = ruleOut.find((c) => keptNamed.has(c.conditionId));
  if (named && urgentConditions.length === 3 && !urgentConditions.some((c) => keptNamed.has(c.conditionId))) urgentConditions[2] = named;

  // Safety-netting: the complaint's own list, then warning signs of urgent conditions still
  // possible and of any condition that is likely (e.g. dengue, level 3, has warning signs too).
  const safety: string[] = [...(idx.complaintById.get(state.complaintId)?.safetyNet ?? [])];
  for (const cs of conditions) {
    const urgentPossible = cs.urgency <= 2 && cs.probability >= params.safetyNetMinProb;
    if (!urgentPossible && cs.probability < params.safetyNetLikelyProb) continue;
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
    emergencyStop: stopReason === 'emergency',
    urgentConditions: urgentConditions.map((c) => c.conditionId),
    conditions,
    other: { probability: pOther, display: displayPercent(pOther, params.display) },
    safetyNet,
    specialties: [...new Set(specialties)],
  };
}
