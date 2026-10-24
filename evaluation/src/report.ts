/**
 * Markdown evaluation report (Vietnamese), written to evaluation/reports/.
 */
import type { CompiledKb } from '@doctor-v/engine';
import { TARGETS } from './metrics.ts';
import type { Metrics, Rate } from './metrics.ts';
import type { CaseRun } from './runner.ts';
import type { Vignette } from './vignette.ts';

const pct = (x: number): string => (Number.isNaN(x) ? '—' : `${(x * 100).toFixed(1)}%`);
const fmtRate = (r: Rate): string => (r.of === 0 ? '—' : `${pct(r.rate)} (${r.count}/${r.of})`);
const pass = (ok: boolean | null): string => (ok === null ? '' : ok ? '✅' : '❌');

export interface ReportInput {
  set: string;
  date: string;
  kb: CompiledKb;
  clean: Metrics;
  noisy: Metrics;
  runs: CaseRun[];
  vignettes: ReadonlyMap<string, Vignette>;
}

export function renderReport(input: ReportInput): string {
  const { kb, clean, noisy, runs } = input;
  const name = (id: string): string => (id === 'other' ? 'Nguyên nhân khác' : (kb.text.conditions[id]?.name ?? id));
  const title = (id: string): string => input.vignettes.get(id)?.title_vi ?? id;
  const topList = (r: CaseRun): string => r.top.slice(0, 3).map((t) => `${name(t.id)} ${pct(t.p)}`).join('; ');

  const rows: [string, string, string, string, boolean | null][] = [
    ['Đứng đầu (top-1)', fmtRate(clean.top1), fmtRate(noisy.top1), `≥ ${pct(TARGETS.top1)}`, clean.top1.rate >= TARGETS.top1],
    ['Trong top 3', fmtRate(clean.top3), fmtRate(noisy.top3), `≥ ${pct(TARGETS.top3)}`, clean.top3.rate >= TARGETS.top3],
    ['Trong top 10', fmtRate(clean.top10), fmtRate(noisy.top10), `≥ ${pct(TARGETS.top10)}`, clean.top10.rate >= TARGETS.top10],
    ['Mức xử trí đúng', fmtRate(clean.triageExact), fmtRate(noisy.triageExact), '—', null],
    ['Mức xử trí an toàn', fmtRate(clean.triageSafe), fmtRate(noisy.triageSafe), `≥ ${pct(TARGETS.triageSafe)}`, clean.triageSafe.rate >= TARGETS.triageSafe],
    ['Bỏ sót cấp cứu', fmtRate(clean.emergencyUnderTriage), fmtRate(noisy.emergencyUnderTriage), `≤ ${pct(TARGETS.emergencyUnderTriageMax)}`, clean.emergencyUnderTriage.rate <= TARGETS.emergencyUnderTriageMax],
    ['Khuyên đi khám quá mức', fmtRate(clean.overTriage), fmtRate(noisy.overTriage), `≤ ${pct(TARGETS.overTriageMax)}`, clean.overTriage.rate <= TARGETS.overTriageMax],
    ['Tự chăm sóc nhận đúng', fmtRate(clean.selfCareCorrect), fmtRate(noisy.selfCareCorrect), `≥ ${pct(TARGETS.selfCareCorrect)}`, clean.selfCareCorrect.rate >= TARGETS.selfCareCorrect],
    ['ECE (các % hiển thị)', clean.eceDisplayed.toFixed(3), noisy.eceDisplayed.toFixed(3), `≤ ${TARGETS.eceMax}`, clean.eceDisplayed <= TARGETS.eceMax],
    ['ECE (bệnh đứng đầu)', clean.eceTop1.toFixed(3), noisy.eceTop1.toFixed(3), '—', null],
    ['Brier', clean.brier.toFixed(3), noisy.brier.toFixed(3), '—', null],
    ['Số câu hỏi (trung vị / P90)', `${clean.questionsMedian} / ${clean.questionsP90}`, `${noisy.questionsMedian} / ${noisy.questionsP90}`, `≤ ${TARGETS.questionsMedianMax}`, clean.questionsMedian <= TARGETS.questionsMedianMax],
  ];

  const lines: string[] = [];
  lines.push(`# Báo cáo kiểm định: bộ \`${input.set}\``);
  lines.push('');
  lines.push(`- Ngày chạy: ${input.date}`);
  lines.push(`- Phiên bản dữ liệu: \`${kb.version}\` (${kb.conditions.length} bệnh, ${kb.findings.length} dấu hiệu)`);
  lines.push(`- Số ca: ${clean.cases}, trong đó ${clean.ranked} ca được xếp hạng bệnh`);
  lines.push(`- Hệ số nhiệt: ${kb.params.temperature}; đã hiệu chuẩn: ${kb.params.calibrated ? 'có' : 'chưa'}`);
  lines.push('- "Nhiễu": 15% câu trả lời (trừ màn sàng lọc cấp cứu) bị đổi thành "Không rõ", hạt giống cố định.');
  lines.push('');
  lines.push('| Chỉ số | Sạch | Nhiễu | Chỉ tiêu | Đạt (sạch) |');
  lines.push('|---|---|---|---|---|');
  for (const [label, a, b, target, ok] of rows) lines.push(`| ${label} | ${a} | ${b} | ${target} | ${pass(ok)} |`);
  lines.push('');
  lines.push('> Chỉ tiêu trong `docs/evaluation.md` dành cho bộ `holdout`. Bệnh nhân mô phỏng trả lời "hoàn hảo" nên kết quả thực tế sẽ thấp hơn.');

  const byComplaint = new Map<string, CaseRun[]>();
  for (const r of runs) byComplaint.set(r.complaint, [...(byComplaint.get(r.complaint) ?? []), r]);
  lines.push('');
  lines.push('## Theo triệu chứng chính (chạy sạch)');
  lines.push('');
  lines.push('| Triệu chứng chính | Số ca | Top-3 | Mức xử trí an toàn |');
  lines.push('|---|---|---|---|');
  for (const [complaint, list] of [...byComplaint.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const rankedList = list.filter((r) => r.expectedCondition !== 'other' && !r.rankingSuppressed);
    const top3 = rankedList.filter((r) => r.rank !== null && r.rank <= 3).length;
    const safe = list.filter((r) => r.triage <= r.expectedTriage).length;
    lines.push(`| ${kb.text.complaints[complaint]?.label ?? complaint} | ${list.length} | ${top3}/${rankedList.length} | ${safe}/${list.length} |`);
  }

  const under = runs.filter((r) => r.triage > r.expectedTriage);
  lines.push('');
  lines.push(`## Ca bị phân loại thấp hơn mức cần (${under.length})`);
  lines.push('');
  if (under.length === 0) lines.push('Không có.');
  for (const r of under) {
    lines.push(`- **${r.vignetteId}** — ${title(r.vignetteId)}: cần mức ${r.expectedTriage}, app ra mức ${r.triage}. Đứng đầu: ${topList(r)}.`);
  }

  const misses = runs.filter((r) => r.expectedCondition !== 'other' && !r.rankingSuppressed && (r.rank === null || r.rank > 3));
  lines.push('');
  lines.push(`## Ca có bệnh đúng ngoài top 3 (${misses.length})`);
  lines.push('');
  if (misses.length === 0) lines.push('Không có.');
  for (const r of misses) {
    lines.push(`- **${r.vignetteId}** — ${title(r.vignetteId)}: bệnh đúng *${name(r.expectedCondition)}* (hạng ${r.rank ?? '—'}, ${pct(r.goldProbability)}). Đứng đầu: ${topList(r)}.`);
  }

  const over = runs.filter((r) => r.triage < r.expectedTriage);
  lines.push('');
  lines.push(`## Ca được khuyên đi khám khẩn hơn mức cần (${over.length})`);
  lines.push('');
  if (over.length === 0) lines.push('Không có.');
  for (const r of over) {
    const reason = r.result.triage.reasons[0];
    const why = reason?.kind === 'rule' ? `quy tắc \`${reason.ruleId}\`` : (reason?.kind ?? '—');
    lines.push(`- **${r.vignetteId}** — ${title(r.vignetteId)}: cần mức ${r.expectedTriage}, app ra mức ${r.triage} (${why}).`);
  }

  const stops = new Map<string, number>();
  for (const r of runs) stops.set(r.stopReason ?? 'none', (stops.get(r.stopReason ?? 'none') ?? 0) + 1);
  lines.push('');
  lines.push('## Lý do dừng hỏi');
  lines.push('');
  for (const [reason, count] of stops) lines.push(`- ${reason}: ${count}`);
  lines.push('');
  return lines.join('\n');
}
