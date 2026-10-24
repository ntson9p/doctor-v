/** Numerically stable log(Σ exp(x)). */
export function logSumExp(values: readonly number[]): number {
  let max = -Infinity;
  for (const v of values) if (v > max) max = v;
  if (!Number.isFinite(max)) return max;
  let sum = 0;
  for (const v of values) sum += Math.exp(v - max);
  return max + Math.log(sum);
}

/** Turns log-weights into probabilities that sum to 1. */
export function normalizeLog(logWeights: readonly number[]): number[] {
  const z = logSumExp(logWeights);
  return logWeights.map((w) => Math.exp(w - z));
}

export function entropyBits(probs: readonly number[]): number {
  let h = 0;
  for (const p of probs) if (p > 0) h -= p * Math.log2(p);
  return h;
}

export function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x));
}
