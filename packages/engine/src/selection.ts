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
import type { Triage } from './triage.ts';

export interface QuestionScore {
  findingId: string;
  /**
   * Expected reduction of triage decision loss. Negative when the risk of an "unknown"
   * answer (which raises the level by policy) outweighs what the answer could reveal.
   */
  voi: number;
  /** Expected information gain about the diagnosis, in bits. */
  eig: number;
  /** Probability that a real answer (not "unknown") changes the triage level. */
  changeProb: number;
  /** Expected information gain, in bits, about the urgent group in focus (0 without focus). */
  eigFocus: number;
}

export interface Analysis {
  probs: number[];
  triageLevel: TriageLevel;
  scores: QuestionScore[];
  stable: boolean;
  /** Probability of the most likely condition (OTHER excluded). */
  top1Mass: number;
  /** The level 1–2 rests only on the probability of an urgent group (see `urgentFocus`). */
  focus: boolean;
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

/**
 * Most urgent level demanded by danger rules or emergency-screen items that hold (6 when
 * none). Such a rule is taken as ground truth: the patient needs at least that level,
 * whatever the condition. Levels raised by "unknown" answers are policy, not truth.
 */
export function dangerCap(triage: Triage): number {
  let cap = 6;
  for (const r of triage.reasons) {
    if ((r.kind === 'rule' || r.kind === 'emergency_screen') && r.level < cap) cap = r.level;
  }
  return cap;
}

export interface UrgentFocus {
  level: number;
  /** The level was set by the can't-miss threshold: the group is the can't-miss conditions. */
  cantMiss: boolean;
}

/**
 * The urgent group whose probability alone sets a level 1–2 (no rule, screen item or
 * "unknown" danger sign holds that level), or null. Questions about this group can lower the
 * level by ruling it out, or confirm it; one question rarely does either alone.
 */
export function urgentFocus(triage: Triage): UrgentFocus | null {
  const prob = triage.reasons.find((r) => r.kind === 'probability');
  if (!prob || prob.kind !== 'probability' || prob.level > 2 || prob.level !== triage.level) return null;
  if (triage.reasons.some((r) => r.kind !== 'probability' && r.level <= prob.level)) return null;
  return { level: prob.level, cantMiss: prob.cantMiss };
}

/** Probability of the urgent group in focus (OTHER counts with its share of that urgency). */
export function focusMass(idx: EngineIndex, hyps: Hypotheses, probs: readonly number[], focus: UrgentFocus): number {
  const q = idx.kb.params.otherUrgencyCumulative;
  let mass = 0;
  hyps.conditions.forEach((c: Condition | null, h) => {
    const ph = probs[h] ?? 0;
    if (c === null) {
      if (!focus.cantMiss) mass += ph * (q[focus.level - 1] ?? 0);
    } else if (c.urgency <= focus.level && (!focus.cantMiss || c.cantMiss)) {
      mass += ph;
    }
  });
  return mass;
}

function binaryEntropy(p: number): number {
  if (p <= 0 || p >= 1) return 0;
  return -(p * Math.log2(p) + (1 - p) * Math.log2(1 - p));
}

/** Expected loss of triage level k under the posterior, urgencies capped by danger rules. */
export function expectedLoss(
  idx: EngineIndex,
  hyps: Hypotheses,
  probs: readonly number[],
  k: number,
  cap: number,
  elder: boolean,
): number {
  const pmf = otherUrgencyPmf(idx);
  let expected = 0;
  hyps.conditions.forEach((c: Condition | null, h) => {
    const ph = probs[h] ?? 0;
    if (ph === 0) return;
    if (c === null) {
      pmf.forEach((pu, i) => {
        expected += ph * pu * loss(idx, k, Math.min(i + 1, cap), false, elder);
      });
    } else {
      expected += ph * loss(idx, k, Math.min(c.urgency, cap), c.cantMiss && c.urgency <= cap, elder);
    }
  });
  return expected;
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
    // Age overrides only change values, never add links, so the base links decide relevance.
    return relevant.some((c) => c.links[f.id] !== undefined) || ruleFindings.has(f.id);
  });
}

export function analyze(input: SelectionInput): Analysis {
  const { idx, env, hyps, complaintId } = input;
  const params = idx.kb.params;
  const alpha = params.categoricalSmoothing;
  const elder = isElder(idx, env.ageGroup);
  const probs = posterior(idx, hyps, evidenceItems(idx, env.answers, env.implied), complaintId);
  const triage = computeTriage({ idx, complaintId, env, hyps, probs });
  const triageLevel = triage.level;
  const entropyNow = entropyBits(probs);
  const focus = urgentFocus(triage);
  const focusEntropyNow = focus ? binaryEntropy(focusMass(idx, hyps, probs, focus)) : 0;

  const scores: QuestionScore[] = [];
  for (const f of candidateFindings(input, probs)) {
    const u = f.unknownRate;
    const envUnknown: ExprEnv = { ...env, answers: { ...env.answers, [f.id]: UNKNOWN } };
    const levelUnknown = u > 0 ? computeTriage({ idx, complaintId, env: envUnknown, hyps, probs }).level : triageLevel;
    // Expected loss over the possible true answers when the question is not asked (today's
    // level), asked and answered, or asked and answered "unknown" (the level policy then gives).
    let riskNotAsked = 0;
    let riskAnswered = 0;
    let riskUnknown = 0;
    let expEntropy = 0;
    let expFocusEntropy = 0;
    let changeProb = 0;
    for (const value of answerSpace(f)) {
      let pv = 0;
      hyps.links.forEach((links, h) => {
        pv += (probs[h] ?? 0) * likelihood(f, value, links?.[f.id], complaintId, alpha);
      });
      if (pv <= 0) continue;
      const answers = { ...env.answers, [f.id]: value };
      const env2: ExprEnv = { ...env, answers };
      const probs2 = posterior(idx, hyps, evidenceItems(idx, answers, env.implied), complaintId);
      const triage2 = computeTriage({ idx, complaintId, env: env2, hyps, probs: probs2 });
      const cap = dangerCap(triage2);
      riskNotAsked += pv * expectedLoss(idx, hyps, probs2, triageLevel, cap, elder);
      riskAnswered += pv * expectedLoss(idx, hyps, probs2, triage2.level, cap, elder);
      riskUnknown += pv * expectedLoss(idx, hyps, probs2, levelUnknown, cap, elder);
      expEntropy += pv * entropyBits(probs2);
      if (focus) expFocusEntropy += pv * binaryEntropy(focusMass(idx, hyps, probs2, focus));
      if (triage2.level !== triageLevel) changeProb += (1 - u) * pv;
    }
    scores.push({
      findingId: f.id,
      voi: riskNotAsked - ((1 - u) * riskAnswered + u * riskUnknown),
      eig: Math.max(0, (1 - u) * (entropyNow - expEntropy)),
      changeProb,
      eigFocus: focus ? Math.max(0, (1 - u) * (focusEntropyNow - expFocusEntropy)) : 0,
    });
  }

  const stable = scores.every((s) => s.changeProb < params.stop.triageChangeProb);
  const top1Mass = Math.max(0, ...probs.slice(0, -1));
  return { probs, triageLevel, scores, stable, top1Mass, focus: focus !== null };
}

/**
 * Picks the next question. While the triage level is unstable, only questions that could
 * change it are considered, and the probability of changing it is added to the score.
 * Safety value counts only above `min_voi`, the burden of one more question. With an urgent
 * focus, information about that group is added with `urgent_focus_weight`. Returns null when
 * no question has a positive score.
 */
export function pickQuestion(idx: EngineIndex, analysis: Analysis): QuestionScore | null {
  const params = idx.kb.params;
  const pool = analysis.stable
    ? analysis.scores
    : analysis.scores.filter((s) => s.changeProb >= params.stop.triageChangeProb);
  const lambda = analysis.stable ? params.lambdaAfterStable : params.lambdaBeforeStable;
  let best: QuestionScore | null = null;
  let bestScore = 0;
  for (const s of pool) {
    const cost = idx.findingById.get(s.findingId)?.cost ?? 1;
    const safety = Math.max(0, s.voi - params.stop.minVoi);
    const info = s.eig + (analysis.focus ? params.urgentFocusWeight * s.eigFocus : 0);
    const score = (safety + lambda * info + (analysis.stable ? 0 : s.changeProb)) / cost;
    if (score > bestScore) {
      best = s;
      bestScore = score;
    }
  }
  return best;
}

/**
 * True when the adaptive phase should end (docs/engine-spec.md §8): the triage level is
 * stable, no question is still worth asking for safety (VOI), no question still informs about
 * an urgent group in focus, and the diagnosis is either concentrated on one condition (top-1
 * mass) or cannot be refined further (EIG).
 */
export function isConfident(idx: EngineIndex, analysis: Analysis): boolean {
  const stop = idx.kb.params.stop;
  if (!analysis.stable) return false;
  const maxVoi = Math.max(0, ...analysis.scores.map((s) => s.voi));
  if (maxVoi >= stop.minVoi) return false;
  if (analysis.focus && Math.max(0, ...analysis.scores.map((s) => s.eigFocus)) >= stop.minEigBits) return false;
  const maxEig = Math.max(0, ...analysis.scores.map((s) => s.eig));
  return analysis.top1Mass >= stop.top1Mass || maxEig < stop.minEigBits;
}
