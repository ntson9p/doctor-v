/**
 * Cross-file validation and content rules for the knowledge base.
 * Schema-level checks happen while loading (load.ts); everything that needs
 * more than one file, or encodes an authoring rule from docs/kb-guide.md, is here.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import type { Issue, Located, RawKnowledge, Severity } from './load.ts';
import type { EvidenceYaml, ExprYaml } from './schema.ts';
import { lintText, splitSentences } from './text.ts';
import type { TextKind } from './text.ts';

/** Collects ids of findings that an expression requires to be present. */
export function findingsInExpr(expr: ExprYaml, out: Set<string> = new Set()): Set<string> {
  if ('all' in expr) expr.all.forEach((e) => findingsInExpr(e, out));
  else if ('any' in expr) expr.any.forEach((e) => findingsInExpr(e, out));
  else if ('not' in expr) findingsInExpr(expr.not, out);
  else if ('finding' in expr) out.add(expr.finding);
  return out;
}

export function validateKnowledge(k: RawKnowledge): Issue[] {
  const issues: Issue[] = [];
  const add = (severity: Severity, file: string, path: string, message: string): void => {
    issues.push({ severity, file, path, message });
  };
  const lint = (text: string | undefined, kind: TextKind, file: string, path: string): void => {
    if (text === undefined) return;
    for (const hit of lintText(text, kind)) add(hit.severity, file, path, hit.message);
  };

  // ---------- Index every id and reject duplicates ----------
  function indexById<T extends { id: string }>(items: Located<T>[], what: string): Map<string, Located<T>> {
    const map = new Map<string, Located<T>>();
    for (const item of items) {
      const prev = map.get(item.data.id);
      if (prev) {
        add('error', item.file, 'id', `${what} "${item.data.id}" bị trùng (đã có trong ${prev.file})`);
      } else {
        map.set(item.data.id, item);
      }
    }
    return map;
  }
  const spread = <T,>(loc: Located<T[]>): Located<T>[] => loc.data.map((data) => ({ file: loc.file, data }));

  const findingById = indexById(k.findings, 'Dấu hiệu');
  const clusterById = indexById(spread(k.clusters), 'Cụm');
  const groupById = indexById(spread(k.groups), 'Nhóm câu hỏi');
  const complaintById = indexById(k.complaints, 'Triệu chứng chính');
  const conditionById = indexById(k.conditions, 'Bệnh');
  const ruleById = indexById(spread(k.rules), 'Quy tắc');
  const sourceById = indexById(k.sources, 'Nguồn');
  const ageGroupIds = new Set(k.ageGroups.data.map((a) => a.id));
  const regionIds = new Set(k.regions.data.map((r) => r.id));
  const specialtyIds = new Set(k.specialties.data.map((s) => s.id));

  const checkFileName = (loc: Located<{ id: string }>, what: string): void => {
    const expected = `${loc.data.id}.yaml`;
    if (basename(loc.file) !== expected) {
      add('error', loc.file, 'id', `${what}: tên file phải là "${expected}"`);
    }
  };

  const checkAgeGroups = (ids: string[] | undefined, file: string, path: string): void => {
    for (const id of ids ?? []) {
      if (!ageGroupIds.has(id)) add('error', file, path, `Không có nhóm tuổi "${id}"`);
    }
  };

  const checkSources = (ids: string[] | undefined, file: string, path: string): void => {
    for (const id of ids ?? []) {
      if (!sourceById.has(id)) add('error', file, path, `Không có nguồn "${id}" trong knowledge/sources/`);
    }
  };

  const checkExpr = (expr: ExprYaml, file: string, path: string): void => {
    if ('all' in expr) expr.all.forEach((e, i) => checkExpr(e, file, `${path}.all.${i}`));
    else if ('any' in expr) expr.any.forEach((e, i) => checkExpr(e, file, `${path}.any.${i}`));
    else if ('not' in expr) checkExpr(expr.not, file, `${path}.not`);
    else if ('finding' in expr) {
      const f = findingById.get(expr.finding)?.data;
      if (!f) {
        add('error', file, path, `Không có dấu hiệu "${expr.finding}"`);
      } else if ('is' in expr && f.type !== 'binary') {
        add('error', file, path, `"${expr.finding}" là dấu hiệu nhiều lựa chọn: dùng "in", không dùng "is"`);
      } else if ('in' in expr) {
        if (f.type !== 'categorical') {
          add('error', file, path, `"${expr.finding}" là dấu hiệu có/không: dùng "is", không dùng "in"`);
        } else {
          const options = new Set(f.options.map((o) => o.id));
          for (const v of expr.in) {
            if (!options.has(v)) add('error', file, path, `"${expr.finding}" không có lựa chọn "${v}"`);
          }
        }
      }
    } else if ('age_groups' in expr) checkAgeGroups(expr.age_groups, file, path);
  };

  const checkEvidence = (ev: EvidenceYaml, file: string, path: string, opts: { keyFinding?: boolean } = {}): void => {
    if (ev.tier === 'E') add('error', file, `${path}.tier`, 'Bậc bằng chứng E bị cấm trong dữ liệu chính thức');
    if (ev.sources.length === 0) add('error', file, `${path}.sources`, 'Cần ít nhất 1 nguồn');
    checkSources(ev.sources, file, `${path}.sources`);
    if (opts.keyFinding && (ev.tier === 'D' || ev.tier === 'E')) {
      add('error', file, `${path}.tier`, 'Dấu hiệu chủ chốt (very_frequent, almost_always) cần bậc A, B hoặc C');
    }
    if (ev.tier === 'D') add('warning', file, `${path}.tier`, 'Bậc D chỉ dành cho đồng thuận của bác sĩ thật');
    if (ev.basis === 'judgment' && ev.note === undefined) {
      add('error', file, `${path}.note`, 'Ước lượng "judgment" phải ghi lý do trong "note"');
    }
    for (const id of ev.sources) {
      const src = sourceById.get(id)?.data;
      if (src && !src.verified && (ev.tier === 'A' || ev.tier === 'B')) {
        add('warning', file, `${path}.sources`, `Nguồn "${id}" chưa được kiểm tra (verified: false) nhưng đang dùng cho bậc ${ev.tier}`);
      }
    }
  };

  // ---------- Meta ----------
  {
    const p = k.params.data;
    const f = p.frequency_levels;
    const freq = [f.rare, f.occasional, f.frequent, f.very_frequent, f.almost_always];
    if (!freq.every((v, i) => i === 0 || v > (freq[i - 1] ?? 0)) || freq.some((v) => v <= 0 || v >= 1)) {
      add('error', k.params.file, 'frequency_levels', 'Các mức tần suất phải tăng dần và nằm trong (0, 1)');
    }
    const pl = p.prior_levels;
    const priors = [pl.P1, pl.P2, pl.P3, pl.P4, pl.P5, pl.P6];
    if (!priors.every((v, i) => i === 0 || v < (priors[i - 1] ?? 1)) || priors.some((v) => v <= 0)) {
      add('error', k.params.file, 'prior_levels', 'Các mức prior phải giảm dần và lớn hơn 0');
    }
    const q = p.other_urgency_cumulative;
    if (!q.every((v, i) => i === 0 || v >= (q[i - 1] ?? 0))) {
      add('error', k.params.file, 'other_urgency_cumulative', 'Phải không giảm');
    }
    for (const [key, ids] of [
      ['elder_age_groups', p.elder_age_groups],
      ['high_risk_age_groups', p.high_risk_age_groups],
      ['screen_only_age_groups', p.screen_only_age_groups],
    ] as const) {
      checkAgeGroups(ids, k.params.file, key);
    }
    for (const id of p.high_risk_findings) {
      if (!findingById.has(id)) add('error', k.params.file, 'high_risk_findings', `Không có dấu hiệu "${id}"`);
    }
    if (p.display.min_shown >= p.display.max_shown) {
      add('error', k.params.file, 'display', 'min_shown phải nhỏ hơn max_shown');
    }
  }
  {
    const groups = [...k.ageGroups.data].sort((a, b) => a.min_months - b.min_months);
    let expected = 0;
    groups.forEach((g, i) => {
      if (g.min_months !== expected) {
        add('error', k.ageGroups.file, `${i}`, `Nhóm tuổi "${g.id}" phải bắt đầu từ ${expected} tháng (liền mạch, không chồng lấn)`);
      }
      const last = i === groups.length - 1;
      if (last && g.max_months !== null) add('error', k.ageGroups.file, `${i}`, 'Nhóm tuổi cuối phải có max_months: null');
      if (!last && g.max_months === null) add('error', k.ageGroups.file, `${i}`, 'Chỉ nhóm tuổi cuối mới được max_months: null');
      expected = g.max_months ?? expected;
    });
  }
  {
    const levels = k.triageLevels.data.map((t) => t.level).sort();
    if (levels.join(',') !== '1,2,3,4,5') {
      add('error', k.triageLevels.file, '', 'Phải có đúng 5 mức xử trí 1–5');
    }
    k.triageLevels.data.forEach((t, i) => {
      lint(t.label_vi, 'label', k.triageLevels.file, `${i}.label_vi`);
      lint(t.action_vi, 'sentence', k.triageLevels.file, `${i}.action_vi`);
    });
  }

  // ---------- Sources ----------
  for (const loc of k.sources) {
    checkFileName(loc, 'Nguồn');
    const archive = loc.data.archive;
    if (archive) {
      const abs = join(k.root, archive.path);
      if (!existsSync(abs)) {
        add('error', loc.file, 'archive.path', `Không thấy file lưu trữ "${archive.path}"`);
      } else {
        const sha = createHash('sha256').update(readFileSync(abs)).digest('hex');
        if (sha !== archive.sha256) add('error', loc.file, 'archive.sha256', 'SHA-256 không khớp với file lưu trữ');
      }
    }
  }

  // ---------- Findings ----------
  // Findings that are themselves danger signs (not mere context such as "fever" inside a combination):
  // emergency-screen items, mandatory complaint red flags, and single-finding rules of level 1–2.
  const redFlagFindings = new Set<string>();
  for (const r of k.rules.data) if (r.level <= 2 && 'finding' in r.when) redFlagFindings.add(r.when.finding);
  for (const item of k.emergencyScreen.data.items) redFlagFindings.add(item.finding);
  for (const c of k.complaints) {
    for (const rf of c.data.red_flags) {
      if ('finding' in rf) redFlagFindings.add(rf.finding);
      else for (const id of groupById.get(rf.group)?.data.findings ?? []) redFlagFindings.add(id);
    }
  }

  for (const { file, data: f } of k.findings) {
    const at = (p: string): string => `${f.id}.${p}`;
    lint(f.label_vi, 'label', file, at('label_vi'));
    lint(f.question_vi, 'question', file, at('question_vi'));
    lint(f.question_other_vi, 'question', file, at('question_other_vi'));
    lint(f.help_vi, 'sentence', file, at('help_vi'));
    lint(f.alt_question?.text_vi, 'question', file, at('alt_question.text_vi'));
    if (f.cluster !== undefined && !clusterById.has(f.cluster)) {
      add('error', file, at('cluster'), `Không có cụm "${f.cluster}"`);
    }
    f.requires?.forEach((e, i) => checkExpr(e, file, at(`requires.${i}`)));
    checkAgeGroups(f.applies_to?.age_groups, file, at('applies_to.age_groups'));
    checkSources(f.sources, file, at('sources'));
    // Facts people simply know (history, risk factors, exposures) need no rephrasing for "unknown".
    const observable = f.kind === 'symptom' || f.kind === 'sign' || f.kind === 'measurement';
    if (redFlagFindings.has(f.id) && observable && f.alt_question === undefined && f.type === 'binary') {
      add('warning', file, at('alt_question'), 'Dấu hiệu nguy hiểm nên có câu hỏi thay thế (alt_question)');
    }
    if (f.type === 'binary') {
      for (const complaintId of Object.keys(f.leak_by_complaint ?? {})) {
        if (!complaintById.has(complaintId)) {
          add('error', file, at('leak_by_complaint'), `Không có triệu chứng chính "${complaintId}"`);
        }
      }
      if (typeof f.leak === 'number' && f.leak_note === undefined) {
        add('error', file, at('leak_note'), 'Tỷ lệ nền ghi bằng số phải có lý do (leak_note)');
      }
    } else {
      const ids = f.options.map((o) => o.id);
      if (new Set(ids).size !== ids.length) add('error', file, at('options'), 'Lựa chọn bị trùng ID');
      if (ids.includes('unknown')) add('error', file, at('options'), '"unknown" là ID dành riêng cho "Không rõ"');
      f.options.forEach((o, i) => lint(o.label_vi, 'label', file, at(`options.${i}.label_vi`)));
      if (f.baseline) checkDistribution(f.baseline, ids, file, at('baseline'));
    }
  }

  function checkDistribution(dist: Record<string, number>, options: string[], file: string, path: string): void {
    const keys = Object.keys(dist);
    const missing = options.filter((o) => !(o in dist));
    const extra = keys.filter((key) => !options.includes(key));
    if (missing.length > 0) add('error', file, path, `Thiếu lựa chọn: ${missing.join(', ')}`);
    if (extra.length > 0) add('error', file, path, `Lựa chọn không tồn tại: ${extra.join(', ')}`);
    const sum = Object.values(dist).reduce((a, b) => a + b, 0);
    if (Math.abs(sum - 1) > 0.02) add('error', file, path, `Tổng phân bố phải bằng 1 (hiện là ${sum.toFixed(3)})`);
  }

  // ---------- Clusters, groups ----------
  k.clusters.data.forEach((c, i) => {
    lint(c.label_vi, 'label', k.clusters.file, `${i}.label_vi`);
  });
  k.groups.data.forEach((g, i) => {
    const file = k.groups.file;
    lint(g.title_vi, 'question', file, `${i}.title_vi`);
    lint(g.none_label_vi, 'label', file, `${i}.none_label_vi`);
    checkAgeGroups(g.applies_to?.age_groups, file, `${i}.applies_to.age_groups`);
    g.requires?.forEach((e, j) => checkExpr(e, file, `${i}.requires.${j}`));
    for (const id of g.findings) {
      const f = findingById.get(id)?.data;
      if (!f) add('error', file, `${i}.findings`, `Không có dấu hiệu "${id}"`);
      else if (f.type !== 'binary') add('error', file, `${i}.findings`, `Nhóm chọn nhiều chỉ chứa dấu hiệu có/không ("${id}")`);
    }
  });

  // ---------- Complaints ----------
  const priorsByComplaint = new Map<string, Set<string>>();
  for (const { data: c } of k.conditions) {
    for (const p of c.priors) {
      const set = priorsByComplaint.get(p.complaint) ?? new Set<string>();
      set.add(c.id);
      priorsByComplaint.set(p.complaint, set);
    }
  }
  for (const loc of k.complaints) {
    const { file, data: c } = loc;
    checkFileName(loc, 'Triệu chứng chính');
    lint(c.label_vi, 'label', file, 'label_vi');
    lint(c.description_vi, 'sentence', file, 'description_vi');
    c.synonyms_vi.forEach((s, i) => lint(s, 'label', file, `synonyms_vi.${i}`));
    checkAgeGroups(c.age_groups, file, 'age_groups');
    checkSources(c.sources, file, 'sources');
    for (const id of c.implies) {
      const f = findingById.get(id)?.data;
      if (!f) add('error', file, 'implies', `Không có dấu hiệu "${id}"`);
      else if (f.type !== 'binary') add('error', file, 'implies', `"${id}" phải là dấu hiệu có/không`);
    }
    c.red_flags.forEach((rf, i) => {
      if ('group' in rf && !groupById.has(rf.group)) add('error', file, `red_flags.${i}`, `Không có nhóm "${rf.group}"`);
      if ('finding' in rf && !findingById.has(rf.finding)) add('error', file, `red_flags.${i}`, `Không có dấu hiệu "${rf.finding}"`);
    });
    for (const id of c.intake) if (!groupById.has(id)) add('error', file, 'intake', `Không có nhóm "${id}"`);
    for (const id of c.safety_net) if (!findingById.has(id)) add('error', file, 'safety_net', `Không có dấu hiệu "${id}"`);
    for (const id of c.cant_miss) {
      const cond = conditionById.get(id)?.data;
      if (!cond) {
        add('error', file, 'cant_miss', `Không có bệnh "${id}"`);
      } else if (!cond.priors.some((p) => p.complaint === c.id)) {
        add('error', file, 'cant_miss', `Bệnh "${id}" chưa có prior cho triệu chứng chính "${c.id}"`);
      }
    }
    if ((priorsByComplaint.get(c.id)?.size ?? 0) === 0) {
      add('warning', file, '', 'Chưa có bệnh nào khai báo prior cho triệu chứng chính này');
    }
  }

  // ---------- Conditions ----------
  for (const loc of k.conditions) {
    const { file, data: c } = loc;
    checkFileName(loc, 'Bệnh');
    lint(c.names.vi, 'label', file, 'names.vi');
    c.names.vi_common?.forEach((n, i) => lint(n, 'label', file, `names.vi_common.${i}`));
    const sentenceCount = c.summary_vi.flatMap((s) => splitSentences(s)).length;
    if (sentenceCount > 3) add('error', file, 'summary_vi', `Mô tả có ${sentenceCount} câu (tối đa 3)`);
    c.summary_vi.forEach((s, i) => lint(s, 'sentence', file, `summary_vi.${i}`));
    c.self_care_vi?.forEach((s, i) => lint(s, 'sentence', file, `self_care_vi.${i}`));
    c.see_doctor_vi?.forEach((s, i) => lint(s, 'sentence', file, `see_doctor_vi.${i}`));
    if (c.cant_miss && c.urgency > 2) add('error', file, 'cant_miss', 'Bệnh "không được bỏ sót" phải có urgency 1 hoặc 2');
    for (const s of c.specialties) if (!specialtyIds.has(s)) add('error', file, 'specialties', `Không có chuyên khoa "${s}"`);
    checkAgeGroups(c.applicability?.age_groups, file, 'applicability.age_groups');
    if (c.applicability && c.applicability.reason_vi === undefined) {
      add('error', file, 'applicability.reason_vi', 'Loại trừ cứng phải ghi lý do (reason_vi)');
    }
    checkSources(c.sources, file, 'sources');
    if (c.proposed_findings !== undefined) {
      add('error', file, 'proposed_findings', 'Chỉ bản nháp mới được có proposed_findings; hãy xử lý trước khi đưa vào conditions/');
    }

    const seenComplaints = new Set<string>();
    c.priors.forEach((p, i) => {
      if (!complaintById.has(p.complaint)) add('error', file, `priors.${i}.complaint`, `Không có triệu chứng chính "${p.complaint}"`);
      if (seenComplaints.has(p.complaint)) add('error', file, `priors.${i}.complaint`, 'Prior bị khai báo hai lần cho cùng triệu chứng chính');
      seenComplaints.add(p.complaint);
      checkAgeGroups(Object.keys(p.by_age ?? {}), file, `priors.${i}.by_age`);
      checkEvidence(p.evidence, file, `priors.${i}.evidence`);
    });
    c.prior_modifiers?.forEach((m, i) => {
      for (const r of m.when.regions ?? []) if (!regionIds.has(r)) add('error', file, `prior_modifiers.${i}`, `Không có vùng "${r}"`);
      if (m.when.months === undefined && m.when.regions === undefined && m.when.sex === undefined) {
        add('error', file, `prior_modifiers.${i}.when`, 'Cần "months", "regions" hoặc "sex"');
      }
      checkEvidence(m.evidence, file, `prior_modifiers.${i}.evidence`);
    });

    const linked = new Set<string>();
    c.findings.forEach((link, i) => {
      const path = `findings.${i}`;
      const f = findingById.get(link.finding)?.data;
      if (linked.has(link.finding)) add('error', file, path, `Dấu hiệu "${link.finding}" bị khai báo hai lần`);
      linked.add(link.finding);
      if (!f) {
        add('error', file, path, `Không có dấu hiệu "${link.finding}" trong knowledge/findings/`);
        return;
      }
      if ('freq' in link) {
        if (f.type !== 'binary') add('error', file, path, `"${link.finding}" là dấu hiệu nhiều lựa chọn: dùng "dist"`);
        checkAgeGroups(Object.keys(link.freq_by_age ?? {}), file, `${path}.freq_by_age`);
        checkEvidence(link.evidence, file, `${path}.evidence`, {
          keyFinding: link.freq === 'very_frequent' || link.freq === 'almost_always',
        });
      } else {
        if (f.type !== 'categorical') add('error', file, path, `"${link.finding}" là dấu hiệu có/không: dùng "freq"`);
        else checkDistribution(link.dist, f.options.map((o) => o.id), file, `${path}.dist`);
        checkEvidence(link.evidence, file, `${path}.evidence`);
      }
    });
    if (c.findings.length < 5) add('error', file, 'findings', `Cần ít nhất 5 liên kết dấu hiệu (hiện có ${c.findings.length})`);
    for (const id of c.warning_signs ?? []) {
      const f = findingById.get(id)?.data;
      if (!f) add('error', file, 'warning_signs', `Không có dấu hiệu "${id}"`);
      else if (f.type !== 'binary') add('error', file, 'warning_signs', `"${id}" phải là dấu hiệu có/không`);
    }
  }

  // ---------- Rules and emergency screen ----------
  k.rules.data.forEach((r, i) => {
    const file = k.rules.file;
    checkExpr(r.when, file, `${i}.when`);
    lint(r.reason_vi, 'sentence', file, `${i}.reason_vi`);
    for (const id of r.complaints ?? []) {
      if (!complaintById.has(id)) add('error', file, `${i}.complaints`, `Không có triệu chứng chính "${id}"`);
    }
    checkEvidence(r.evidence, file, `${i}.evidence`);
    if (r.level <= 2 && r.evidence.tier !== 'A' && r.evidence.tier !== 'B') {
      add('warning', file, `${i}.evidence.tier`, 'Quy tắc mức 1–2 nên dựa trên nguồn bậc A/B hoặc hướng dẫn chính thức');
    }
  });
  if (ruleById.size === 0) add('warning', k.rules.file, '', 'Chưa có quy tắc nào');
  {
    const es = k.emergencyScreen;
    lint(es.data.title_vi, 'question', es.file, 'title_vi');
    lint(es.data.none_label_vi, 'label', es.file, 'none_label_vi');
    es.data.items.forEach((item, i) => {
      const f = findingById.get(item.finding)?.data;
      if (!f) add('error', es.file, `items.${i}`, `Không có dấu hiệu "${item.finding}"`);
      else if (f.type !== 'binary') add('error', es.file, `items.${i}`, `"${item.finding}" phải là dấu hiệu có/không`);
    });
  }

  return issues;
}
