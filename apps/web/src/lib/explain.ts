import type { CompiledKb, DisplayPercent, TriageReason } from '@doctor-v/engine';

/** "khoảng 65%" or "dưới 5%" (docs/style-guide-vi.md §7). */
export function percentText(d: DisplayPercent): string {
  return d.kind === 'below' ? `dưới ${d.percent}%` : `khoảng ${d.percent}%`;
}

export function findingLabel(kb: CompiledKb, id: string): string {
  return kb.text.findings[id]?.label ?? id;
}

export function conditionName(kb: CompiledKb, id: string): string {
  const t = kb.text.conditions[id];
  if (!t) return id;
  return t.officialName && t.officialName !== t.name ? `${t.name} (${t.officialName})` : t.name;
}

/** One sentence explaining why the triage level was chosen. */
export function describeReason(kb: CompiledKb, r: TriageReason): string {
  switch (r.kind) {
    case 'emergency_screen':
      return `Có dấu hiệu cấp cứu: ${findingLabel(kb, r.findingId)}.`;
    case 'emergency_unknown':
      return `Chưa rõ có dấu hiệu cấp cứu hay không: ${findingLabel(kb, r.findingId)}.`;
    case 'rule':
      return kb.text.rules[r.ruleId]?.reason ?? r.ruleId;
    case 'rule_unknown':
      return `Chưa loại trừ được một dấu hiệu nguy hiểm vì có câu trả lời "Không rõ": ${kb.text.rules[r.ruleId]?.reason ?? r.ruleId}`;
    case 'probability':
      return r.cantMiss
        ? 'Chưa loại trừ được một bệnh nguy hiểm, cần được khám để xác định.'
        : 'Các câu trả lời phù hợp với tình trạng cần được khám ở mức này.';
    case 'guard_other':
      return 'Các câu trả lời chưa khớp rõ với tình trạng nào trong hệ thống, nên cần được khám.';
    case 'guard_early_stop':
      return 'Phiên hỏi đã dừng sớm, nên chưa thể khuyên tự theo dõi tại nhà.';
  }
}
