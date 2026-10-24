/**
 * Usage:
 *   npm run eval -- --set dev                 run clean and noisy simulations, print metrics
 *   npm run eval -- --set holdout --report    also write evaluation/reports/<date>-<set>-<version>.md
 *   npm run eval -- --set dev --case <id>     print one case in detail
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildKnowledge, formatIssues } from '@doctor-v/kb';
import type { Issue } from '@doctor-v/kb';
import { computeMetrics } from '../metrics.ts';
import type { Metrics } from '../metrics.ts';
import { renderReport } from '../report.ts';
import { runVignette } from '../runner.ts';
import { VIGNETTE_SETS, loadVignettes, validateVignettes } from '../vignette.ts';
import type { VignetteSet } from '../vignette.ts';

const args = process.argv.slice(2);
const option = (name: string): string | undefined => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const set = option('--set') ?? 'dev';
if (!VIGNETTE_SETS.some((s) => s === set)) {
  console.error(`--set phải là một trong: ${VIGNETTE_SETS.join(', ')}`);
  process.exit(2);
}

const built = buildKnowledge();
if (!built.kb || !built.knowledge) {
  console.log(formatIssues(built.issues.filter((i) => i.severity === 'error')));
  console.error('Không biên dịch được dữ liệu.');
  process.exit(1);
}
const kb = built.kb;
const issues: Issue[] = [];
const loaded = loadVignettes([set as VignetteSet], issues);
issues.push(...validateVignettes(loaded, built.knowledge, new Set()));
const errors = issues.filter((i) => i.severity === 'error');
if (errors.length > 0) {
  console.log(formatIssues(errors));
  console.error(`Có ${errors.length} lỗi trong bộ ca; sửa trước khi chạy.`);
  process.exit(1);
}

const only = option('--case');
const vignettes = loaded.map((l) => l.vignette).filter((v) => only === undefined || v.id === only);
const clean = vignettes.map((v) => runVignette(kb, v));
const noisy = vignettes.map((v) => runVignette(kb, v, { noise: 0.15, seed: 7 }));

if (only !== undefined) {
  const r = clean[0];
  if (!r) {
    console.error(`Không có ca "${only}" trong bộ ${set}.`);
    process.exit(2);
  }
  console.log(JSON.stringify({ ...r, result: { triage: r.result.triage, safetyNet: r.result.safetyNet } }, null, 2));
  process.exit(0);
}

const show = (label: string, m: Metrics): void => {
  const p = (x: number): string => (Number.isNaN(x) ? '—' : `${(x * 100).toFixed(1)}%`);
  console.log(
    `${label}: top1 ${p(m.top1.rate)} | top3 ${p(m.top3.rate)} | top10 ${p(m.top10.rate)} | ` +
      `an toàn ${p(m.triageSafe.rate)} | bỏ sót cấp cứu ${m.emergencyUnderTriage.count}/${m.emergencyUnderTriage.of} | ` +
      `quá mức ${p(m.overTriage.rate)} | ECE ${m.eceDisplayed.toFixed(3)} | câu hỏi ${m.questionsMedian}`,
  );
};
const cleanMetrics = computeMetrics(clean);
const noisyMetrics = computeMetrics(noisy);
console.log(`Bộ ${set}: ${vignettes.length} ca, dữ liệu ${kb.version}`);
show('Sạch ', cleanMetrics);
show('Nhiễu', noisyMetrics);

if (args.includes('--report')) {
  const date = new Date().toISOString().slice(0, 10);
  const dir = fileURLToPath(new URL('../../reports/', import.meta.url));
  mkdirSync(dir, { recursive: true });
  const file = `${dir}${date}-${set}-${kb.version}.md`;
  const report = renderReport({
    set,
    date,
    kb,
    clean: cleanMetrics,
    noisy: noisyMetrics,
    runs: clean,
    vignettes: new Map(vignettes.map((v) => [v.id, v])),
  });
  writeFileSync(file, report, 'utf8');
  console.log(`Đã ghi báo cáo: ${file}`);
}
