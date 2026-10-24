/**
 * Grid search of the evidence temperature on the dev set (docs/engine-spec.md §5).
 * Prints a table; the chosen value is set by hand in knowledge/meta/engine-params.yaml.
 */
import { buildKnowledge } from '@doctor-v/kb';
import type { Issue } from '@doctor-v/kb';
import { computeMetrics } from '../metrics.ts';
import { runVignette } from '../runner.ts';
import { loadVignettes } from '../vignette.ts';

const built = buildKnowledge();
if (!built.kb) {
  console.error('Không biên dịch được dữ liệu; chạy npm run kb:check để xem lỗi.');
  process.exit(1);
}
const base = built.kb;
const issues: Issue[] = [];
const vignettes = loadVignettes(['dev'], issues).map((l) => l.vignette);
if (vignettes.length === 0) {
  console.error('Bộ dev chưa có ca nào.');
  process.exit(1);
}

console.log('tau  | log loss | top1   | top3   | ECE   | an toàn');
for (const temperature of [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]) {
  const kb = { ...base, params: { ...base.params, temperature } };
  const runs = vignettes.map((v) => runVignette(kb, v));
  const logLoss = runs.reduce((acc, r) => acc - Math.log(Math.max(r.goldProbability, 1e-6)), 0) / runs.length;
  const m = computeMetrics(runs);
  const p = (x: number): string => `${(x * 100).toFixed(1)}%`.padEnd(6);
  console.log(
    `${temperature.toFixed(1)}  | ${logLoss.toFixed(3).padEnd(8)} | ${p(m.top1.rate)} | ${p(m.top3.rate)} | ${m.eceDisplayed.toFixed(3)} | ${p(m.triageSafe.rate)}`,
  );
}
