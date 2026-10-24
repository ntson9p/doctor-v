/**
 * Triage level = the most urgent of: emergency-screen items, rules, and the
 * probability-based level; then safety guards (docs/engine-spec.md §6).
 */
import { evalExpr, valueOf } from './expr.ts';
import type { ExprEnv } from './expr.ts';
import type { EngineIndex } from './kb-index.ts';
import { UNKNOWN } from './model.ts';
import type { TriageLevel } from './model.ts';
import type { Hypotheses } from './posterior.ts';

export type TriageReason =
  | { kind: 'emergency_screen'; level: TriageLevel; findingId: string }
  | { kind: 'rule'; level: TriageLevel; ruleId: string }
  /** A level 1–2 rule might apply but an answer is "unknown". */
  | { kind: 'rule_unknown'; level: TriageLevel; ruleId: string; ruleLevel: TriageLevel }
  | { kind: 'emergency_unknown'; level: TriageLevel; findingId: string }
  | { kind: 'probability'; level: TriageLevel; mass: number; threshold: number; cantMiss: boolean }
  | { kind: 'guard_other'; level: TriageLevel; otherProbability: number }
  | { kind: 'guard_early_stop'; level: TriageLevel };

export interface Triage {
  level: TriageLevel;
  /** Every reason found, most urgent first. */
  reasons: TriageReason[];
}

export interface TriageInput {
  idx: EngineIndex;
  complaintId: string;
  env: ExprEnv;
  hyps: Hypotheses;
  probs: readonly number[];
  /** The session ended before the stopping criteria were met (user stop or question cap). */
  earlyStop?: boolean;
}

const asLevel = (n: number): TriageLevel => n as TriageLevel;

export function isHighRisk(idx: EngineIndex, env: ExprEnv): boolean {
  const p = idx.kb.params;
  if (p.highRiskAgeGroups.includes(env.ageGroup)) return true;
  return p.highRiskFindings.some((id) => valueOf(env, id) === 'present');
}

export function isElder(idx: EngineIndex, ageGroup: string): boolean {
  return idx.kb.params.elderAgeGroups.includes(ageGroup);
}

/** Most urgent level whose cumulative probability reaches its threshold; null means level 5. */
export function probabilityLevel(
  idx: EngineIndex,
  hyps: Hypotheses,
  probs: readonly number[],
  ageGroup: string,
): Extract<TriageReason, { kind: 'probability' }> | null {
  const p = idx.kb.params;
  const factor = isElder(idx, ageGroup) ? p.elderThresholdFactor : 1;
  const pOther = probs[probs.length - 1] ?? 0;
  for (let k = 1; k <= 4; k++) {
    let mass = pOther * (p.otherUrgencyCumulative[k - 1] ?? 0);
    let cantMissMass = 0;
    hyps.conditions.forEach((c, h) => {
      if (c === null || c.urgency > k) return;
      const ph = probs[h] ?? 0;
      mass += ph;
      if (c.cantMiss) cantMissMass += ph;
    });
    const threshold = (p.thresholds[k - 1] ?? 1) * factor;
    if (mass >= threshold) return { kind: 'probability', level: asLevel(k), mass, threshold, cantMiss: false };
    if (k === 2) {
      const cmThreshold = p.cantMissThreshold * factor;
      if (cantMissMass >= cmThreshold) {
        return { kind: 'probability', level: 2, mass: cantMissMass, threshold: cmThreshold, cantMiss: true };
      }
    }
  }
  return null;
}

export function computeTriage(input: TriageInput): Triage {
  const { idx, env } = input;
  const params = idx.kb.params;
  const highRisk = isHighRisk(idx, env);
  const reasons: TriageReason[] = [];

  for (const item of idx.kb.emergencyScreen.items) {
    const v = valueOf(env, item.findingId);
    if (v === 'present') reasons.push({ kind: 'emergency_screen', level: item.level, findingId: item.findingId });
    else if (v === UNKNOWN) {
      reasons.push({ kind: 'emergency_unknown', level: highRisk ? item.level : 3, findingId: item.findingId });
    }
  }
  for (const rule of idx.rulesFor(input.complaintId)) {
    const r = evalExpr(rule.when, env);
    if (r === 'T') reasons.push({ kind: 'rule', level: rule.level, ruleId: rule.id });
    else if (r === 'U' && rule.level <= 2) {
      reasons.push({ kind: 'rule_unknown', level: highRisk ? rule.level : 3, ruleId: rule.id, ruleLevel: rule.level });
    }
  }
  const prob = probabilityLevel(idx, input.hyps, input.probs, env.ageGroup);
  if (prob) reasons.push(prob);

  let level: TriageLevel = 5;
  for (const r of reasons) if (r.level < level) level = r.level;

  const pOther = input.probs[input.probs.length - 1] ?? 0;
  if (level === 5 && pOther > params.selfCareBlockOther) {
    level = 4;
    reasons.push({ kind: 'guard_other', level: 4, otherProbability: pOther });
  }
  if (level === 5 && input.earlyStop === true) {
    level = 4;
    reasons.push({ kind: 'guard_early_stop', level: 4 });
  }
  reasons.sort((a, b) => a.level - b.level);
  return { level, reasons };
}
