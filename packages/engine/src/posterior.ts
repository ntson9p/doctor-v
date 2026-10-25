/**
 * Priors, likelihoods and posteriors (docs/engine-spec.md §3–§5).
 */
import { isApplicable } from './context.ts';
import type { PatientContext } from './context.ts';
import type { EngineIndex } from './kb-index.ts';
import { clamp, normalizeLog } from './math.ts';
import { UNKNOWN } from './model.ts';
import type { Condition, Finding, Link } from './model.ts';

/** Hypothesis id for "a condition not in the knowledge base". */
export const OTHER = 'other';

const FACTOR_RANGE = [0.1, 10] as const;
const PRODUCT_RANGE = [0.01, 100] as const;

export interface Hypotheses {
  /** Condition ids in knowledge-base order, then OTHER (always last). */
  ids: string[];
  /** Aligned with `ids`; `null` for OTHER. */
  conditions: (Condition | null)[];
  /** Effective links for the patient's age group and complaint, aligned with `ids`; `null` for OTHER. */
  links: (Readonly<Record<string, Link>> | null)[];
  logPrior: number[];
}

/** A condition's links with the overrides of one age group, then of one complaint, applied. */
export function linksFor(c: Condition, ageGroup: string, complaintId: string): Readonly<Record<string, Link>> {
  const byAge = c.linksByAge[ageGroup];
  const byComplaint = c.linksByComplaint[complaintId];
  return byAge || byComplaint ? { ...c.links, ...byAge, ...byComplaint } : c.links;
}

/** Unnormalized prior of a condition for a complaint, age group and context. */
export function conditionPrior(c: Condition, complaintId: string, ctx: PatientContext, ageGroup: string): number {
  const entry = c.priors[complaintId];
  if (!entry) return 0;
  const base = entry.byAge[ageGroup] ?? entry.default;
  let product = 1;
  for (const m of c.priorModifiers) {
    const monthOk = m.months === null || (ctx.month !== null && m.months.includes(ctx.month));
    const regionOk = m.regions === null || (ctx.regionId !== null && m.regions.includes(ctx.regionId));
    const sexOk = m.sex === null || m.sex.includes(ctx.sex);
    if (monthOk && regionOk && sexOk) product *= clamp(m.factor, FACTOR_RANGE[0], FACTOR_RANGE[1]);
  }
  return base * clamp(product, PRODUCT_RANGE[0], PRODUCT_RANGE[1]);
}

/** The candidate conditions for a complaint plus OTHER, with normalized log-priors. */
export function hypothesesFor(idx: EngineIndex, complaintId: string, ctx: PatientContext, ageGroup: string): Hypotheses {
  const complaint = idx.complaintById.get(complaintId);
  if (!complaint) throw new Error(`Unknown complaint "${complaintId}"`);
  const conditions = idx.kb.conditions.filter(
    (c) => c.priors[complaintId] !== undefined && isApplicable(c.applicability, ctx, ageGroup),
  );
  const raw = conditions.map((c) => conditionPrior(c, complaintId, ctx, ageGroup));
  const total = raw.reduce((a, b) => a + b, 0);
  if (conditions.length === 0 || total <= 0) return { ids: [OTHER], conditions: [null], links: [null], logPrior: [0] };

  const otherPrior = complaint.otherPrior ?? idx.kb.params.otherPrior;
  const logPrior = raw.map((r) => Math.log(((1 - otherPrior) * r) / total));
  logPrior.push(Math.log(otherPrior));
  return {
    ids: [...conditions.map((c) => c.id), OTHER],
    conditions: [...conditions, null],
    links: [...conditions.map((c) => linksFor(c, ageGroup, complaintId)), null],
    logPrior,
  };
}

/**
 * P(answer | hypothesis), given the hypothesis' link for the finding (undefined when not
 * linked, and always for OTHER): unlinked hypotheses use the finding's leak or baseline
 * distribution. "unknown" carries no evidence.
 */
export function likelihood(f: Finding, value: string, link: Link | undefined, complaintId: string, alpha: number): number {
  if (value === UNKNOWN) return 1;
  if (f.type === 'binary') {
    const p = typeof link === 'number' ? link : (f.leakByComplaint[complaintId] ?? f.leak);
    return value === 'present' ? p : 1 - p;
  }
  const i = f.options.indexOf(value);
  if (i < 0) return 1;
  const dist = Array.isArray(link) ? link : f.baseline;
  return ((dist[i] ?? 0) + alpha) / (1 + f.options.length * alpha);
}

export interface EvidenceItem {
  finding: Finding;
  value: string;
  /** Cluster shrinkage w = 1 / (1 + rho (n - 1)); 1 for unclustered findings. */
  weight: number;
}

/** Answered findings that count as evidence, in knowledge-base order. */
export function evidenceItems(
  idx: EngineIndex,
  answers: Readonly<Record<string, string>>,
  implied: ReadonlySet<string>,
): EvidenceItem[] {
  const items: EvidenceItem[] = [];
  const perCluster = new Map<string, number>();
  for (const f of idx.kb.findings) {
    const value = answers[f.id];
    if (value === undefined || value === UNKNOWN || implied.has(f.id)) continue;
    items.push({ finding: f, value, weight: 1 });
    if (f.clusterId !== null) perCluster.set(f.clusterId, (perCluster.get(f.clusterId) ?? 0) + 1);
  }
  for (const item of items) {
    const cluster = item.finding.clusterId;
    if (cluster === null) continue;
    const n = perCluster.get(cluster) ?? 1;
    item.weight = 1 / (1 + (idx.clusterRho.get(cluster) ?? 0) * (n - 1));
  }
  return items;
}

export function logEvidence(
  items: readonly EvidenceItem[],
  links: Readonly<Record<string, Link>> | null,
  complaintId: string,
  alpha: number,
): number {
  let total = 0;
  for (const item of items) {
    total += item.weight * Math.log(likelihood(item.finding, item.value, links?.[item.finding.id], complaintId, alpha));
  }
  return total;
}

/** Posterior probabilities aligned with `hyps.ids`. */
export function posterior(idx: EngineIndex, hyps: Hypotheses, items: readonly EvidenceItem[], complaintId: string): number[] {
  const { temperature, categoricalSmoothing } = idx.kb.params;
  return normalizeLog(
    hyps.logPrior.map(
      (lp, h) => lp + temperature * logEvidence(items, hyps.links[h] ?? null, complaintId, categoricalSmoothing),
    ),
  );
}
