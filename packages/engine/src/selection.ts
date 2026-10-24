/**
 * Adaptive question selection (docs/engine-spec.md §7): value of information for the
 * triage decision, expected information gain for the diagnosis, and triage stability.
 */
import { isApplicable } from './context.ts';
import type { PatientContext } from './context.ts';
import { evalExpr } from './expr.ts';
import type { ExprEnv } from './expr.ts';
import type { EngineIndex } from './kb-index.ts';
import { entropyBits } from './math.ts';
import { UNKNOWN } from './model.ts';
import type { Condition, Finding, TriageLevel } from './model.ts';
import { evidenceItems, likelihood, posterior } from './posterior.ts';
import type { Hypotheses } from './posterior.ts';
import { computeTriage, isElder } from './triage.ts';

export interface QuestionScore {
  findingId: string;
  /** Expected reduction of triage decision loss. */
  voi: number;
  /** Expected information gain about the diagnosis, in bits. */
  eig: number;
  /** Probability that answering changes the triage level. */
  changeProb: number;
}

export interface Analysis {
  probs: number[];
  triageLevel: TriageLevel;
  scores: QuestionScore[];
  stable: boolean;
  /** Probability mass of the 3 most likely conditions (OTHER excluded). */
  top3Mass: number;
}

/** Answer values whose probabilities sum to 1 for every hypothesis ("unknown" handled apart). */
export function answerSpace(f: Finding): string[] {
  return f.type === 'binary' ? ['present', 'absent'] : f.options;
}

function underTriageWeight(idx: EngineIndex, u: number, cantMiss: boolean, elder: boolean): number {
  const p = idx.kb.params;
  const w = cantMiss ? p.cantMissWeight : (p.underTriageWeights[u - 1] ?? 1);
  // Halving the thresholds for the elderly corresponds to W' = 2W + 1 (p* = 1 / (1 + W)).
  return elder ? 2 * w + 1 : w;
}

function loss(idx: EngineIndex, k: number, u: number, cantMiss: boolean, elder: boolean): number {
  if (k < u) return u - k;
  if (k > u) return (k - u) * underTriageWeight(idx, u, cantMiss, elder);
  return 0;
}

/** Probability that OTHER needs urgency u (from the cumulative parameters). */
export function otherUrgencyPmf(idx: EngineIndex): number[] {
  const q = idx.kb.params.otherUrgencyCumulative;
  return [q[0], q[1] - q[0], q[2] - q[1], q[3] - q[2], 1 - q[3]];
}

/** Expected loss of the best triage decision under the posterior. */
export function decisionRisk(idx: EngineIndex, hyps: Hypotheses, probs: readonly number[], ageGroup: string): number {
  const elder = isElder(idx, ageGroup);
  const pmf = otherUrgencyPmf(idx);
  let best = Infinity;
  for (let k = 1; k <= 5; k++) {
    let expected = 0;
    hyps.conditions.forEach((c: Condition | null, h) => {
      const ph = probs[h] ?? 0;
      if (c === null) {
        pmf.forEach((pu, i) => {
          expected += ph * pu * loss(idx, k, i + 1, false, elder);
        });
      } else {
        expected += ph * loss(idx, k, c.urgency, c.cantMiss, elder);
      }
    });
    if (expected < best) best = expected;
  }
  return best;
}

export interface SelectionInput {
  idx: EngineIndex;
  complaintId: string;
  ctx: PatientContext;
  env: ExprEnv;
  hyps: Hypotheses;
}

/** Findings that may be asked now and could matter. */
export function candidateFindings(input: SelectionInput, probs: readonly number[]): Finding[] {
  const { idx, env, hyps } = input;
  const params = idx.kb.params;
  const ruleFindings = idx.ruleFindingsFor(input.complaintId);
  const screenItems = new Set(idx.kb.emergencyScreen.items.map((i) => i.findingId));
  const relevant = hyps.conditions.filter((c, h): c is Condition => c !== null && (probs[h] ?? 0) >= params.candidateMinProb);
  return idx.kb.findings.filter((f) => {
    if (env.answers[f.id] !== undefined || env.implied.has(f.id) || screenItems.has(f.id)) return false;
    if (!isApplicable(f.appliesTo, input.ctx, env.ageGroup)) return false;
    if (!f.requires.every((e) => evalExpr(e, env) === 'T')) return false;
    return relevant.some((c) => c.links[f.id] !== undefined) || ruleFindings.has(f.id);
  });
}

export function analyze(input: SelectionInput): Analysis {
  const { idx, env, hyps, complaintId } = input;
  const params = idx.kb.params;
  const alpha = params.categoricalSmoothing;
  const probs = posterior(idx, hyps, evidenceItems(idx, env.answers, env.implied), complaintId);
  const triageLevel = computeTriage({ idx, complaintId, env, hyps, probs }).level;
  const riskNow = decisionRisk(idx, hyps, probs, env.ageGroup);
  const entropyNow = entropyBits(probs);

  const scores: QuestionScore[] = [];
  for (const f of candidateFindings(input, probs)) {
    const u = f.unknownRate;
    let expRisk = 0;
    let expEntropy = 0;
    let changeProb = 0;
    for (const value of answerSpace(f)) {
      let pv = 0;
      hyps.conditions.forEach((c, h) => {
        pv += (probs[h] ?? 0) * likelihood(f, value, c, complaintId, alpha);
      });
      if (pv <= 0) continue;
      const answers = { ...env.answers, [f.id]: value };
      const env2: ExprEnv = { ...env, answers };
      const probs2 = posterior(idx, hyps, evidenceItems(idx, answers, env.implied), complaintId);
      expRisk += pv * decisionRisk(idx, hyps, probs2, env.ageGroup);
      expEntropy += pv * entropyBits(probs2);
      if (computeTriage({ idx, complaintId, env: env2, hyps, probs: probs2 }).level !== triageLevel) {
        changeProb += (1 - u) * pv;
      }
    }
    if (u > 0) {
      const env2: ExprEnv = { ...env, answers: { ...env.answers, [f.id]: UNKNOWN } };
      if (computeTriage({ idx, complaintId, env: env2, hyps, probs }).level !== triageLevel) changeProb += u;
    }
    scores.push({
      findingId: f.id,
      voi: Math.max(0, (1 - u) * (riskNow - expRisk)),
      eig: Math.max(0, (1 - u) * (entropyNow - expEntropy)),
      changeProb,
    });
  }

  const stable = scores.every((s) => s.changeProb < params.stop.triageChangeProb);
  const conditionProbs = probs.slice(0, -1).sort((a, b) => b - a);
  const top3Mass = conditionProbs.slice(0, 3).reduce((a, b) => a + b, 0);
  return { probs, triageLevel, scores, stable, top3Mass };
}

/**
 * Picks the next question. While the triage level is unstable, only questions that could
 * change it are considered, and the probability of changing it is added to the score.
 */
export function pickQuestion(idx: EngineIndex, analysis: Analysis): QuestionScore | null {
  const params = idx.kb.params;
  const pool = analysis.stable
    ? analysis.scores
    : analysis.scores.filter((s) => s.changeProb >= params.stop.triageChangeProb);
  const lambda = analysis.stable ? params.lambdaAfterStable : params.lambdaBeforeStable;
  let best: QuestionScore | null = null;
  let bestScore = -Infinity;
  for (const s of pool) {
    const cost = idx.findingById.get(s.findingId)?.cost ?? 1;
    const score = (s.voi + lambda * s.eig + (analysis.stable ? 0 : s.changeProb)) / cost;
    if (score > bestScore) {
      best = s;
      bestScore = score;
    }
  }
  return best;
}

/**
 * True when the adaptive phase should end (docs/engine-spec.md §8): the triage level is
 * stable, no question is still worth asking for safety (VOI), and the diagnosis is either
 * concentrated (top-3 mass) or cannot be refined further (EIG).
 */
export function isConfident(idx: EngineIndex, analysis: Analysis): boolean {
  const stop = idx.kb.params.stop;
  if (!analysis.stable) return false;
  const maxVoi = Math.max(0, ...analysis.scores.map((s) => s.voi));
  if (maxVoi >= stop.minVoi) return false;
  const maxEig = Math.max(0, ...analysis.scores.map((s) => s.eig));
  return analysis.top3Mass >= stop.top3Mass || maxEig < stop.minEigBits;
}
