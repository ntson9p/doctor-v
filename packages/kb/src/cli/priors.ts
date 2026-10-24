/**
 * Prints the prior table per complaint × age group (after modifiers are ignored), with the
 * sum of the absolute values. On the absolute scale of docs/kb-guide.md §2.3 the conditions
 * of one complaint and age group should add up to roughly 1 - other_prior (≈ 0.85); large
 * deviations or implausible orderings reveal inconsistent priors between authoring batches.
 *
 * Usage: npm run kb:priors [-- --drafts drafts/pass-a]
 */
import { DEFAULT_KNOWLEDGE_ROOT, checkDrafts, checkKnowledge } from '../index.ts';

const args = process.argv.slice(2);
const draftsIndex = args.indexOf('--drafts');
const dir = draftsIndex >= 0 ? args[draftsIndex + 1] : undefined;
const result = dir === undefined ? checkKnowledge(DEFAULT_KNOWLEDGE_ROOT) : checkDrafts(dir, DEFAULT_KNOWLEDGE_ROOT);
const k = result.knowledge;
if (!k) {
  console.error('Không đọc được dữ liệu.');
  process.exit(1);
}

const levels = k.params.data.prior_levels;
const ageGroups = [...k.ageGroups.data].sort((a, b) => a.min_months - b.min_months).map((a) => a.id);
const pct = (x: number): string => `${(x * 100).toFixed(2)}%`;

for (const complaint of k.complaints.map((c) => c.data.id)) {
  const rows = k.conditions
    .map((c) => ({ c: c.data, entry: c.data.priors.find((p) => p.complaint === complaint) }))
    .filter((r) => r.entry !== undefined);
  if (rows.length === 0) continue;
  console.log(`\n## ${complaint}`);
  console.log(['condition'.padEnd(28), ...ageGroups.map((a) => a.slice(0, 11).padEnd(11))].join(' '));
  const sums = new Array<number>(ageGroups.length).fill(0);
  for (const { c, entry } of rows) {
    if (!entry) continue;
    const cells = ageGroups.map((ag, i) => {
      const excluded = c.applicability?.age_groups !== undefined && !c.applicability.age_groups.includes(ag);
      if (excluded) return '—'.padEnd(11);
      const level = entry.by_age?.[ag] ?? entry.default;
      sums[i] = (sums[i] ?? 0) + levels[level];
      return level.padEnd(11);
    });
    const sexNote = c.applicability?.sex ? ` (${c.applicability.sex.join('/')})` : '';
    console.log([`${c.id}${sexNote}`.slice(0, 28).padEnd(28), ...cells].join(' '));
  }
  console.log(['TỔNG'.padEnd(28), ...sums.map((s) => pct(s).padEnd(11))].join(' '));
}
console.log('\nMốc tham khảo: tổng mỗi cột nên vào khoảng 1 - other_prior (≈ 85%).');
