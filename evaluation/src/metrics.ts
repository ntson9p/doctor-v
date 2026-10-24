/**
 * Accuracy and safety metrics over a set of case runs (docs/evaluation.md §4–§5).
 */
import { OTHER } from '@doctor-v/engine';
import type { CaseRun } from './runner.ts';

export interface Rate {
  count: number;
  of: number;
  rate: number;
}

export interface Metrics {
  cases: number;
  /** In-scope cases with a ranked condition list (excludes "other" gold and young infants). */
  ranked: number;
  /** Cases that stopped early on a danger rule; they are ranked by the urgent list. */
  emergencyStops: number;
  top1: Rate;
  top3: Rate;
  top10: Rate;
  triageExact: Rate;
  triageSafe: Rate;
  /** Cases with gold triage 1–2 that were triaged less urgently. */
  emergencyUnderTriage: Rate;
  overTriage: Rate;
  selfCareCorrect: Rate;
  /** Expected calibration error of the displayed probabilities (conditions with p ≥ 5%; emergency stops show none). */
  eceDisplayed: number;
  /** Expected calibration error of the top-1 probability. */
  eceTop1: number;
  /** Multi-class Brier score, OTHER included. */
  brier: number;
  questionsMedian: number;
  questionsP90: number;
}

const rate = (count: number, of: number): Rate => ({ count, of, rate: of === 0 ? NaN : count / of });

function quantile(values: number[], q: number): number {
  if (values.length === 0) return NaN;
  const sorted = [...values].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return (sorted[lo] ?? NaN) + ((sorted[hi] ?? NaN) - (sorted[lo] ?? NaN)) * (pos - lo);
}

/** Expected calibration error with equal-width bins. */
export function ece(pairs: { p: number; correct: boolean }[], bins = 10): number {
  if (pairs.length === 0) return NaN;
  const sums = Array.from({ length: bins }, () => ({ n: 0, p: 0, hits: 0 }));
  for (const { p, correct } of pairs) {
    const b = sums[Math.min(bins - 1, Math.floor(p * bins))];
    if (!b) continue;
    b.n += 1;
    b.p += p;
    b.hits += correct ? 1 : 0;
  }
  return sums.reduce((acc, b) => (b.n === 0 ? acc : acc + (b.n / pairs.length) * Math.abs(b.hits / b.n - b.p / b.n)), 0);
}

export function computeMetrics(runs: readonly CaseRun[]): Metrics {
  const ranked = runs.filter((r) => r.expectedCondition !== OTHER && !r.rankingSuppressed);
  const within = (k: number): number => ranked.filter((r) => r.rank !== null && r.rank <= k).length;
  const emergencies = runs.filter((r) => r.expectedTriage <= 2);
  const selfCare = runs.filter((r) => r.expectedTriage === 5);

  const displayed: { p: number; correct: boolean }[] = [];
  const top1: { p: number; correct: boolean }[] = [];
  let brierSum = 0;
  for (const r of runs) {
    if (r.rankingSuppressed) continue;
    const accepted = new Set([r.expectedCondition, ...r.acceptable]);
    for (const [id, p] of Object.entries(r.probabilities)) {
      if (id !== OTHER && p >= 0.05 && !r.emergencyStop) displayed.push({ p, correct: accepted.has(id) });
      const y = id === r.expectedCondition ? 1 : 0;
      brierSum += (p - y) ** 2;
    }
    const best = r.top[0];
    if (best && !r.emergencyStop) top1.push({ p: best.p, correct: accepted.has(best.id) });
  }
  const scored = runs.filter((r) => !r.rankingSuppressed).length;

  return {
    cases: runs.length,
    ranked: ranked.length,
    emergencyStops: runs.filter((r) => r.emergencyStop).length,
    top1: rate(within(1), ranked.length),
    top3: rate(within(3), ranked.length),
    top10: rate(within(10), ranked.length),
    triageExact: rate(runs.filter((r) => r.triage === r.expectedTriage).length, runs.length),
    triageSafe: rate(runs.filter((r) => r.triage <= r.expectedTriage).length, runs.length),
    emergencyUnderTriage: rate(emergencies.filter((r) => r.triage > r.expectedTriage).length, emergencies.length),
    overTriage: rate(runs.filter((r) => r.triage < r.expectedTriage).length, runs.length),
    selfCareCorrect: rate(selfCare.filter((r) => r.triage === 5).length, selfCare.length),
    eceDisplayed: ece(displayed),
    eceTop1: ece(top1),
    brier: scored === 0 ? NaN : brierSum / scored,
    questionsMedian: quantile(runs.map((r) => r.questions), 0.5),
    questionsP90: quantile(runs.map((r) => r.questions), 0.9),
  };
}

/** Acceptance targets from docs/evaluation.md §5 (for the holdout set). */
export const TARGETS = {
  top1: 0.45,
  top3: 0.65,
  top10: 0.85,
  triageSafe: 0.97,
  emergencyUnderTriageMax: 0.05,
  overTriageMax: 0.35,
  selfCareCorrect: 0.5,
  eceMax: 0.1,
  questionsMedianMax: 20,
} as const;
