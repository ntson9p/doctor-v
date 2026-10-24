/**
 * Agreement between two independent authoring passes (docs/kb-guide.md §5):
 * quadratic-weighted kappa on frequency levels, links present in only one pass,
 * and agreement on priors, urgency and categorical distributions.
 */
import type { Located } from './load.ts';
import { FREQ_LEVELS, PRIOR_LEVELS } from './schema.ts';
import type { ConditionYaml } from './schema.ts';

export interface ConditionAgreement {
  conditionId: string;
  sharedBinaryLinks: number;
  exactFreqMatches: number;
  onlyA: string[];
  onlyB: string[];
  /** Mean total-variation distance between categorical distributions present in both passes. */
  meanTvd: number | null;
  urgency: [number, number];
  cantMiss: [boolean, boolean];
  /** Default prior level per complaint, A vs B. */
  priors: Record<string, [string | null, string | null]>;
}

export interface AgreementReport {
  conditions: ConditionAgreement[];
  missingInB: string[];
  missingInA: string[];
  weightedKappa: number;
  pairs: number;
}

/** Quadratic-weighted Cohen's kappa for paired ordinal ratings 0..k-1. */
export function weightedKappa(pairs: readonly [number, number][], k: number): number {
  if (pairs.length === 0) return NaN;
  const observed = Array.from({ length: k }, () => new Array<number>(k).fill(0));
  const rowTotals = new Array<number>(k).fill(0);
  const colTotals = new Array<number>(k).fill(0);
  for (const [a, b] of pairs) {
    const row = observed[a];
    if (row) row[b] = (row[b] ?? 0) + 1;
    rowTotals[a] = (rowTotals[a] ?? 0) + 1;
    colTotals[b] = (colTotals[b] ?? 0) + 1;
  }
  const n = pairs.length;
  let num = 0;
  let den = 0;
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < k; j++) {
      const w = ((i - j) * (i - j)) / ((k - 1) * (k - 1));
      num += w * (observed[i]?.[j] ?? 0);
      den += w * (((rowTotals[i] ?? 0) * (colTotals[j] ?? 0)) / n);
    }
  }
  return den === 0 ? 1 : 1 - num / den;
}

export function compareDrafts(a: Located<ConditionYaml>[], b: Located<ConditionYaml>[]): AgreementReport {
  const byIdB = new Map(b.map((x) => [x.data.id, x.data]));
  const byIdA = new Map(a.map((x) => [x.data.id, x.data]));
  const pairs: [number, number][] = [];
  const conditions: ConditionAgreement[] = [];

  for (const { data: ca } of a) {
    const cb = byIdB.get(ca.id);
    if (!cb) continue;
    const linksA = new Map(ca.findings.map((l) => [l.finding, l]));
    const linksB = new Map(cb.findings.map((l) => [l.finding, l]));
    let shared = 0;
    let exact = 0;
    const tvds: number[] = [];
    for (const [id, la] of linksA) {
      const lb = linksB.get(id);
      if (!lb) continue;
      if ('freq' in la && 'freq' in lb) {
        const ia = FREQ_LEVELS.indexOf(la.freq);
        const ib = FREQ_LEVELS.indexOf(lb.freq);
        pairs.push([ia, ib]);
        shared += 1;
        if (ia === ib) exact += 1;
      } else if ('dist' in la && 'dist' in lb) {
        const keys = new Set([...Object.keys(la.dist), ...Object.keys(lb.dist)]);
        let tvd = 0;
        for (const key of keys) tvd += Math.abs((la.dist[key] ?? 0) - (lb.dist[key] ?? 0));
        tvds.push(tvd / 2);
      }
    }
    const priorIds = new Set([...ca.priors.map((p) => p.complaint), ...cb.priors.map((p) => p.complaint)]);
    const priors: ConditionAgreement['priors'] = {};
    for (const complaint of priorIds) {
      priors[complaint] = [
        ca.priors.find((p) => p.complaint === complaint)?.default ?? null,
        cb.priors.find((p) => p.complaint === complaint)?.default ?? null,
      ];
    }
    conditions.push({
      conditionId: ca.id,
      sharedBinaryLinks: shared,
      exactFreqMatches: exact,
      onlyA: [...linksA.keys()].filter((id) => !linksB.has(id)),
      onlyB: [...linksB.keys()].filter((id) => !linksA.has(id)),
      meanTvd: tvds.length === 0 ? null : tvds.reduce((x, y) => x + y, 0) / tvds.length,
      urgency: [ca.urgency, cb.urgency],
      cantMiss: [ca.cant_miss, cb.cant_miss],
      priors,
    });
  }
  return {
    conditions,
    missingInB: [...byIdA.keys()].filter((id) => !byIdB.has(id)),
    missingInA: [...byIdB.keys()].filter((id) => !byIdA.has(id)),
    weightedKappa: weightedKappa(pairs, FREQ_LEVELS.length),
    pairs: pairs.length,
  };
}

export function renderAgreement(report: AgreementReport): string {
  const lines: string[] = [];
  lines.push('# Mức đồng thuận giữa lượt A và lượt B');
  lines.push('');
  lines.push(`- Số cặp liên kết có/không có trong cả hai lượt: ${report.pairs}`);
  lines.push(`- Kappa có trọng số bậc hai trên ${FREQ_LEVELS.length} mức tần suất: **${report.weightedKappa.toFixed(3)}**`);
  if (report.missingInB.length > 0) lines.push(`- Bệnh chỉ có ở lượt A: ${report.missingInB.join(', ')}`);
  if (report.missingInA.length > 0) lines.push(`- Bệnh chỉ có ở lượt B: ${report.missingInA.join(', ')}`);
  lines.push('');
  lines.push('| Bệnh | Liên kết chung | Trùng mức | Chỉ A | Chỉ B | TVD phân bố | Mức xử trí A/B | Không được bỏ sót A/B | Prior A/B |');
  lines.push('|---|---|---|---|---|---|---|---|---|');
  for (const c of report.conditions) {
    const priors = Object.entries(c.priors)
      .map(([k, [pa, pb]]) => `${k}: ${pa ?? '—'}/${pb ?? '—'}`)
      .join('; ');
    lines.push(
      `| ${c.conditionId} | ${c.sharedBinaryLinks} | ${c.exactFreqMatches} | ${c.onlyA.length} | ${c.onlyB.length} | ` +
        `${c.meanTvd === null ? '—' : c.meanTvd.toFixed(2)} | ${c.urgency[0]}/${c.urgency[1]} | ` +
        `${c.cantMiss[0] ? 'có' : 'không'}/${c.cantMiss[1] ? 'có' : 'không'} | ${priors} |`,
    );
  }
  lines.push('');
  lines.push('Mốc tham khảo: kappa ≥ 0,6 là đồng thuận khá; ≥ 0,8 là rất tốt. PRIOR_LEVELS: ' + PRIOR_LEVELS.join(' > ') + '.');
  lines.push('');
  return lines.join('\n');
}
