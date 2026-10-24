/**
 * Simulated patients: runs a full engine session for a vignette (docs/evaluation.md §3).
 */
import { OTHER, UNKNOWN, answerStep, indexKb, nextStep, sessionResult, startSession } from '@doctor-v/engine';
import type { CompiledKb, Finding, PatientContext, SessionResult, StopReason, TriageLevel } from '@doctor-v/engine';
import { ageMonthsOf } from './vignette.ts';
import type { Vignette } from './vignette.ts';

export interface RunOptions {
  /** Share of answers replaced by "unknown" (0 = clean run). */
  noise?: number;
  seed?: number;
}

export interface CaseRun {
  vignetteId: string;
  complaint: string;
  expectedCondition: string;
  acceptable: string[];
  expectedTriage: number;
  triage: TriageLevel;
  /** 1-based rank of the first acceptable condition; null when the gold is "other" or absent. */
  rank: number | null;
  /** Probability of the gold condition (or of OTHER for out-of-scope cases). */
  goldProbability: number;
  probabilities: Record<string, number>;
  top: { id: string; p: number }[];
  questions: number;
  stopReason: StopReason | null;
  rankingSuppressed: boolean;
  result: SessionResult;
}

/** Deterministic PRNG (mulberry32) so noisy runs are reproducible. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFor(id: string, seed: number): number {
  let h = seed >>> 0;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 2654435761) >>> 0;
  return h;
}

export function contextOf(v: Vignette): PatientContext {
  return { ageMonths: ageMonthsOf(v), sex: v.patient.sex, regionId: v.patient.region ?? null, month: v.patient.month ?? null };
}

/**
 * The vignette's true value for a finding. Unmentioned binary findings follow
 * `default_unmentioned`, except findings that most people have (leak ≥ 0.5, e.g. "fully
 * vaccinated"): for those, silence says nothing, so the answer is "unknown".
 */
export function trueValue(f: Finding, v: Vignette): string {
  const given = v.answers[f.id];
  if (given !== undefined) return given;
  if (f.type !== 'binary' || f.leak >= 0.5) return UNKNOWN;
  return v.default_unmentioned ?? 'absent';
}

export function runVignette(kb: CompiledKb, v: Vignette, options: RunOptions = {}): CaseRun {
  const idx = indexKb(kb);
  const noise = options.noise ?? 0;
  const random = rng(seedFor(v.id, options.seed ?? 1));
  let state = startSession(kb, v.complaint, contextOf(v));

  for (let guard = 0; guard < 100; guard++) {
    const step = nextStep(kb, state);
    if (step.kind === 'done') break;
    const ids = step.kind === 'finding' ? [step.findingId] : step.findingIds;
    const response: Record<string, string> = {};
    for (const id of ids) {
      const f = idx.findingById.get(id);
      if (!f) throw new Error(`Unknown finding ${id}`);
      const truth = trueValue(f, v);
      if (step.kind === 'finding' && step.alt) {
        // The alternative wording resolves the noise; inverted questions flip the answer.
        response[id] = truth === UNKNOWN || !f.altQuestion?.inverted ? truth : truth === 'present' ? 'absent' : 'present';
      } else {
        // The emergency screen is a checklist of observable emergencies: no noise there.
        response[id] = noise > 0 && step.phase !== 'screen' && random() < noise ? UNKNOWN : truth;
      }
    }
    state = answerStep(kb, state, step, response);
  }

  const result = sessionResult(kb, state);
  const gold = v.expected.condition;
  const accepted = new Set([gold, ...(v.expected.acceptable ?? [])]);
  const ranked = result.conditions.map((c) => c.conditionId);
  const firstHit = ranked.findIndex((id) => accepted.has(id));
  const probabilities: Record<string, number> = Object.fromEntries(result.conditions.map((c) => [c.conditionId, c.probability]));
  probabilities[OTHER] = result.other.probability;
  return {
    vignetteId: v.id,
    complaint: v.complaint,
    expectedCondition: gold,
    acceptable: v.expected.acceptable ?? [],
    expectedTriage: v.expected.triage,
    triage: result.triage.level,
    rank: gold === OTHER || firstHit < 0 ? null : firstHit + 1,
    goldProbability: probabilities[gold] ?? 0,
    probabilities,
    top: result.conditions.slice(0, 5).map((c) => ({ id: c.conditionId, p: c.probability })),
    questions: result.questionsAsked,
    stopReason: result.stopReason,
    rankingSuppressed: result.rankingSuppressed,
    result,
  };
}
