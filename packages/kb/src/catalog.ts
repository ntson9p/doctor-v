/**
 * Compact index of the knowledge base: one Markdown line per finding, question group, complaint, condition, rule
 * and source. Authoring agents read it instead of the full YAML files, which put 160–290 thousand tokens in their
 * context before they started work in Phase 3 batches 1–2 (docs/handoff.md §5, §7). They still open the full file
 * of a condition they extend or use as a model.
 *
 * Agents read `index.md` whole (about 30 thousand tokens with 60 conditions) and search the other files for the
 * lines they need: every link of a competitor, the rules of a complaint, a source id.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import type { RawKnowledge } from './load.ts';
import type { ApplicabilityYaml, ConditionYaml, ExprYaml, FindingYaml, RuleYaml } from './schema.ts';
import { FREQ_LEVELS } from './schema.ts';

export const INDEX_SECTIONS = ['meta', 'findings', 'groups', 'complaints', 'conditions', 'links', 'rules', 'sources'] as const;
export type IndexSection = (typeof INDEX_SECTIONS)[number];

/** Files written by `kb:index -- --out-dir`: the first is read whole, the others are searched. */
export const INDEX_FILES: readonly { file: string; sections: readonly IndexSection[] }[] = [
  { file: 'index.md', sections: ['meta', 'findings', 'groups', 'complaints', 'conditions'] },
  { file: 'links.md', sections: ['links'] },
  { file: 'rules.md', sections: ['rules'] },
  { file: 'sources.md', sections: ['sources'] },
];

export const FREQ_SHORT: Record<(typeof FREQ_LEVELS)[number], string> = {
  very_rare: 'vr',
  rare: 'r',
  occasional: 'o',
  frequent: 'f',
  very_frequent: 'vf',
  almost_always: 'aa',
};

const PHASE_1 = 'GĐ1';

/** A probability as written in the YAML, without the leading zero: 0.45 → ".45", 0.005 → ".005". */
const num = (x: number): string => String(x).replace(/^0\./, '.');

/**
 * Writes a triage or `requires` expression on one line: `a` present, `a=no` absent, `a=?` unknown,
 * `a∈{x,y}`, `&`, `|`, `not(…)`, `≥2 of (…; …)`, `age∈{…}`, `age<3mo`, `age≥60y`, `sex=female`.
 */
export function formatExpr(e: ExprYaml, nested = false): string {
  const wrap = (s: string): string => (nested ? `(${s})` : s);
  if ('all' in e) return e.all.length === 1 ? formatExpr(e.all[0]!, nested) : wrap(e.all.map((x) => formatExpr(x, true)).join(' & '));
  if ('any' in e) return e.any.length === 1 ? formatExpr(e.any[0]!, nested) : wrap(e.any.map((x) => formatExpr(x, true)).join(' | '));
  if ('not' in e) return `not(${formatExpr(e.not)})`;
  if ('at_least' in e) return `≥${e.at_least} of (${e.of.map((x) => formatExpr(x)).join('; ')})`;
  if ('finding' in e) {
    if ('in' in e) return `${e.finding}∈{${e.in.join(',')}}`;
    return e.is === 'present' ? e.finding : e.is === 'absent' ? `${e.finding}=no` : `${e.finding}=?`;
  }
  if ('age_groups' in e) return `age∈{${e.age_groups.join(',')}}`;
  if ('age_months_lt' in e) return `age<${e.age_months_lt}mo`;
  if ('age_years_gte' in e) return `age≥${e.age_years_gte}y`;
  return `sex=${e.sex}`;
}

/** Age groups as a list, or as "all except …" when that is shorter. */
function formatAges(ids: readonly string[], allAges: readonly string[]): string {
  const missing = allAges.filter((a) => !ids.includes(a));
  return missing.length > 0 && missing.length < ids.length ? `trừ ${missing.join(',')}` : ids.join(',');
}

function formatApplicability(a: ApplicabilityYaml | undefined, allAges: readonly string[]): string[] {
  if (a === undefined) return [];
  const parts: string[] = [];
  if (a.sex) parts.push(`giới ${a.sex.join(',')}`);
  if (a.age_groups) parts.push(`tuổi ${formatAges(a.age_groups, allAges)}`);
  return parts;
}

/**
 * The batch each `- id:` entry of a YAML list was added in, read from the section headers of the file
 * (`# ---------- Giai đoạn 3, lô 2 ----------`). Entries above the first header are from Phase 1.
 */
export function batchesOfEntries(text: string): Map<string, string> {
  const out = new Map<string, string>();
  let current = PHASE_1;
  for (const line of text.split(/\r?\n/)) {
    const header = /^#.*Giai đoạn (\d+), lô (\d+)/.exec(line);
    if (header) current = `lô ${header[2]}`;
    const entry = /^- id: *([a-z][a-z0-9_]*)/.exec(line);
    if (entry) out.set(entry[1]!, current);
  }
  return out;
}

interface ConditionBatches {
  added: Map<string, string>;
  extended: Map<string, string[]>;
}

/** Which Phase 3 batch added or extended each condition, from knowledge/drafts/phase-3/batch-N/scope.yaml. */
function conditionBatches(root: string): ConditionBatches {
  const added = new Map<string, string>();
  const extended = new Map<string, string[]>();
  const phase3 = join(root, 'drafts', 'phase-3');
  if (!existsSync(phase3)) return { added, extended };
  const ids = (list: unknown): string[] =>
    Array.isArray(list) ? list.map((d: { id?: unknown }) => d.id).filter((id) => typeof id === 'string') : [];
  for (const dir of readdirSync(phase3).sort()) {
    const batch = /^batch-(\d+)$/.exec(dir);
    const file = join(phase3, dir, 'scope.yaml');
    if (!batch || !existsSync(file)) continue;
    const data: unknown = parse(readFileSync(file, 'utf8'));
    if (typeof data !== 'object' || data === null) continue;
    const label = `lô ${batch[1]}`;
    if ('new' in data) for (const id of ids(data.new)) added.set(id, label);
    if ('extend' in data) for (const id of ids(data.extend)) extended.set(id, [...(extended.get(id) ?? []), label]);
  }
  return { added, extended };
}

function readBatches(root: string, files: Iterable<string>): Map<string, string> {
  const out = new Map<string, string>();
  for (const file of new Set(files)) {
    const abs = join(root, file);
    if (!existsSync(abs)) continue;
    for (const [id, batch] of batchesOfEntries(readFileSync(abs, 'utf8'))) out.set(`${file}#${id}`, batch);
  }
  return out;
}

function findingLine(f: FindingYaml, batch: string, allAges: readonly string[]): string {
  const parts: string[] = [];
  if (f.type === 'binary') {
    const byComplaint = f.leak_by_complaint
      ? ` (${Object.entries(f.leak_by_complaint).map(([c, l]) => `${c} ${typeof l === 'number' ? num(l) : l}`).join(', ')})`
      : '';
    parts.push(`bin, leak ${typeof f.leak === 'number' ? num(f.leak) : f.leak}${byComplaint}`);
  } else {
    parts.push(`cat ${f.options.map((o) => (o.neutral ? `${o.id}°` : o.id)).join('|')}`);
  }
  parts.push(f.kind);
  if (f.requires) parts.push(`requires ${f.requires.map((e) => formatExpr(e, f.requires!.length > 1)).join(' & ')}`);
  if (f.cluster) parts.push(`cụm ${f.cluster}`);
  parts.push(...formatApplicability(f.applies_to, allAges));
  parts.push(batch);
  return `- \`${f.id}\` ${parts.join(' · ')} — ${f.question_vi}`;
}

function linkText(link: ConditionYaml['findings'][number]): string {
  if ('dist' in link) {
    return `${link.finding}{${Object.entries(link.dist).map(([o, p]) => `${o} ${num(p)}`).join(', ')}}`;
  }
  const overrides = [
    ...Object.entries(link.freq_by_age ?? {}).map(([a, f]) => `${a} ${FREQ_SHORT[f]}`),
    ...Object.entries(link.freq_by_complaint ?? {}).map(([c, f]) => `@${c} ${FREQ_SHORT[f]}`),
  ];
  return `${link.finding} ${FREQ_SHORT[link.freq]}${overrides.length > 0 ? `[${overrides.join(', ')}]` : ''}`;
}

function conditionLine(c: ConditionYaml, batches: ConditionBatches, allAges: readonly string[]): string {
  const parts: string[] = [`u${c.urgency}${c.cant_miss ? ' cant_miss' : ''}${c.rule_out ? ' rule_out' : ''}`];
  parts.push(...formatApplicability(c.applicability, allAges));
  const extended = batches.extended.get(c.id);
  parts.push(`${batches.added.get(c.id) ?? PHASE_1}${extended ? `, mở rộng ${extended.join(', ')}` : ''}`);
  const priors = c.priors.map((p) => {
    const byAge = Object.entries(p.by_age ?? {}).map(([a, l]) => `${a} ${l}`);
    return `${p.complaint} ${p.default}${byAge.length > 0 ? ` (${byAge.join(', ')})` : ''}`;
  });
  parts.push(`prior ${priors.join('; ')}`);
  for (const m of c.prior_modifiers ?? []) {
    const when = [
      m.when.months ? `tháng ${m.when.months.join(',')}` : '',
      m.when.regions ? `vùng ${m.when.regions.join(',')}` : '',
      m.when.sex ? `giới ${m.when.sex.join(',')}` : '',
    ].filter((s) => s !== '');
    parts.push(`prior ×${m.factor} khi ${when.join(', ')}`);
  }
  return `- \`${c.id}\` ${c.names.vi} · ${parts.join(' · ')}`;
}

function linksLine(c: ConditionYaml): string {
  const parts = [`${c.findings.length} liên kết: ${c.findings.map(linkText).join(', ')}`];
  if (c.warning_signs && c.warning_signs.length > 0) parts.push(`nguy hiểm: ${c.warning_signs.join(', ')}`);
  parts.push(`khoa ${c.specialties.join(',')}`);
  return `- \`${c.id}\` ${parts.join(' · ')}`;
}

function ruleLine(r: RuleYaml, batch: string): string {
  const parts = [`m${r.level}`, `khi ${formatExpr(r.when)}`];
  if (r.complaints) parts.push(`chỉ ${r.complaints.join(',')}`);
  if (r.conditions) parts.push(`bệnh ${r.conditions.join(',')}`);
  parts.push(batch);
  return `- \`${r.id}\` ${parts.join(' · ')}`;
}

const truncate = (s: string, n: number): string => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

export interface IndexOptions {
  sections?: readonly IndexSection[];
}

/** Renders the compact index as Markdown. */
export function renderCatalog(k: RawKnowledge, options: IndexOptions = {}): string {
  const sections = new Set(options.sections ?? INDEX_SECTIONS);
  const allAges = [...k.ageGroups.data].sort((a, b) => a.min_months - b.min_months).map((a) => a.id);
  const p = k.params.data;
  const out: string[] = [
    '# Mục lục gọn của dữ liệu doctor-v',
    '',
    `Sinh bởi \`npm run kb:index\` từ \`knowledge/\`: ${k.conditions.length} bệnh, ${k.findings.length} dấu hiệu, ` +
      `${k.complaints.length} triệu chứng chính, ${k.rules.data.length} quy tắc, ${k.sources.length} nguồn. ` +
      'Không sửa tay: chạy lại lệnh khi dữ liệu đổi. Cần chi tiết (nguồn, ghi chú, câu chữ) thì mở tệp YAML ghi ở đầu mỗi mục. ' +
      '`GĐ1` là Giai đoạn 1, `lô N` là lô N của Giai đoạn 3.',
  ];
  const exprLegend =
    'Biểu thức: `a` có, `a=no` trả lời không, `a=?` không rõ, `a∈{x,y}`, `&` và, `|` hoặc, `not(…)`, `≥2 of (…; …)`.';

  if (sections.has('meta')) {
    out.push('', '## Thang đo (knowledge/meta/)', '');
    out.push(`- Nhóm tuổi: ${k.ageGroups.data.map((a) => `\`${a.id}\` ${a.label_vi}`).join('; ')}.`);
    out.push(`- Tần suất: ${FREQ_LEVELS.map((f) => `${f} ${num(p.frequency_levels[f])}`).join(', ')}.`);
    out.push(
      `- Tỷ lệ nền (leak): ${Object.entries(p.leak_levels).map(([l, v]) => `${l} ${num(v)}`).join(', ')}; ` +
        `prior: ${Object.entries(p.prior_levels).map(([l, v]) => `${l} ${v}`).join(', ')}; other_prior ${p.other_prior}.`,
    );
    out.push(`- Mức xử trí: ${k.triageLevels.data.map((t) => `${t.level} \`${t.id}\``).join(', ')}.`);
    out.push(`- Chuyên khoa: ${k.specialties.data.map((s) => s.id).join(', ')}. Vùng: ${k.regions.data.map((r) => r.id).join(', ')}.`);
  }

  if (sections.has('findings')) {
    const batches = readBatches(k.root, k.findings.map((f) => f.file));
    out.push('', `## Dấu hiệu (${k.findings.length})`, '');
    out.push(
      'Mỗi dòng: id, kiểu (`bin` có/không, `cat` nhiều lựa chọn, `°` lựa chọn trung tính), loại, điều kiện hỏi, cụm, ' +
        `phạm vi, lô thêm vào, câu hỏi. ${exprLegend}`,
    );
    let file = '';
    for (const f of k.findings) {
      if (f.file !== file) {
        file = f.file;
        out.push('', `### ${file}`, '');
      }
      out.push(findingLine(f.data, batches.get(`${f.file}#${f.data.id}`) ?? PHASE_1, allAges));
    }
    out.push('', `### Cụm (${k.clusters.file})`, '');
    for (const c of k.clusters.data) out.push(`- \`${c.id}\` ${c.rho} — ${c.label_vi}`);
  }

  if (sections.has('groups')) {
    out.push('', `## Nhóm câu hỏi đánh dấu (${k.groups.file}, tối đa 7 mục)`, '');
    for (const g of k.groups.data) {
      const parts = [`[${g.findings.join(', ')}]`, ...formatApplicability(g.applies_to, allAges)];
      if (g.requires) parts.push(`requires ${g.requires.map((e) => formatExpr(e, g.requires!.length > 1)).join(' & ')}`);
      out.push(`- \`${g.id}\` ${parts.join(' · ')}`);
    }
    const screen = k.emergencyScreen.data.items.map((i) => `${i.finding} m${i.level}`).join(', ');
    out.push(`- Màn sàng lọc cấp cứu (${k.emergencyScreen.file}, hỏi đầu tiên): ${screen}`);
  }

  if (sections.has('complaints')) {
    out.push('', '## Triệu chứng chính (knowledge/complaints/)', '');
    out.push('Câu hỏi đi theo thứ tự: màn sàng lọc cấp cứu, `red_flags` (`[nhóm]` hoặc dấu hiệu lẻ), `intake`, rồi chọn thích ứng.');
    for (const { data: c } of k.complaints) {
      const parts = [c.label_vi];
      if (c.status === 'in_progress') parts.push('đang soạn');
      if (c.age_groups) parts.push(`tuổi ${formatAges(c.age_groups, allAges)}`);
      parts.push(`implies ${c.implies.join(',')}`);
      if (c.other_prior !== undefined) parts.push(`other_prior ${c.other_prior}`);
      parts.push(`red_flags ${c.red_flags.map((r) => ('group' in r ? `[${r.group}]` : r.finding)).join(', ')}`);
      parts.push(`intake ${c.intake.map((g) => `[${g}]`).join(', ')}`);
      parts.push(`cant_miss ${c.cant_miss.join(', ')}`);
      parts.push(`safety_net ${c.safety_net.join(', ')}`);
      out.push(`- \`${c.id}\` ${parts.join(' · ')}`);
    }
  }

  if (sections.has('conditions')) {
    const batches = conditionBatches(k.root);
    out.push('', `## Bệnh (${k.conditions.length}, knowledge/conditions/<id>.yaml)`, '');
    out.push(
      'Mỗi dòng: tên, mức (`u2` urgency 2), phạm vi, lô thêm vào và mở rộng, prior theo triệu chứng chính. ' +
        'Liên kết của từng bệnh ở `links.md` (`kb:index -- --only links`).',
    );
    for (const c of k.conditions) out.push(conditionLine(c.data, batches, allAges));
  }

  if (sections.has('links')) {
    out.push('', `## Liên kết của từng bệnh (${k.conditions.length}, knowledge/conditions/<id>.yaml)`, '');
    out.push(
      'Tần suất: `vr` very_rare, `r` rare, `o` occasional, `f` frequent, `vf` very_frequent, `aa` almost_always; ' +
        '`[nhóm tuổi …, @triệu chứng …]` là freq_by_age, freq_by_complaint; `{…}` phân bố của dấu hiệu nhiều lựa chọn. ' +
        'Sau đó: dấu hiệu nguy hiểm (warning_signs), chuyên khoa.',
    );
    for (const c of k.conditions) out.push(linksLine(c.data));
  }

  if (sections.has('rules')) {
    const batches = readBatches(k.root, [k.rules.file]);
    out.push('', `## Quy tắc an toàn (${k.rules.data.length}, ${k.rules.file})`, '');
    out.push(
      '`m1` mức 1. Không ghi `chỉ` thì áp dụng cho mọi triệu chứng chính. `bệnh`: bệnh mục tiêu, giữ trong danh sách ' +
        `"Bác sĩ cần loại trừ". ${exprLegend}`,
    );
    for (const r of k.rules.data) out.push(ruleLine(r, batches.get(`${k.rules.file}#${r.id}`) ?? PHASE_1));
  }

  if (sections.has('sources')) {
    out.push('', `## Nguồn (${k.sources.length}, knowledge/sources/<id>.yaml)`, '');
    out.push('Mỗi dòng: id, loại, nơi ban hành, năm, số văn bản, đã xác minh (✓) hay chưa (✗), tên rút gọn.');
    for (const s of k.sources.map((l) => l.data).sort((a, b) => a.id.localeCompare(b.id))) {
      const parts = [s.type, truncate(s.publisher, 40)];
      if (s.date) parts.push(s.date.slice(0, 4));
      if (s.doc_number) parts.push(s.doc_number);
      parts.push(s.verified ? '✓' : '✗');
      out.push(`- \`${s.id}\` ${parts.join(' · ')} — ${truncate(s.title, 90)}`);
    }
  }
  return `${out.join('\n')}\n`;
}
