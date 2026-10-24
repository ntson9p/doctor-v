import type { CompiledKb, DisplayPercent, TriageReason } from '@doctor-v/engine';

/** "khoảng 65%" or "dưới 5%" (docs/style-guide-vi.md §7). */
export function percentText(d: DisplayPercent): string {
  return d.kind === 'below' ? `dưới ${d.percent}%` : `khoảng ${d.percent}%`;
}

export function findingLabel(kb: CompiledKb, id: string): string {
  return kb.text.findings[id]?.label ?? id;
}

/** Common name first, official name after when it adds something ("Đau bụng kinh (thống kinh)"). */
export function conditionName(kb: CompiledKb, id: string): string {
  const t = kb.text.conditions[id];
  if (!t) return id;
  const adds = t.officialName && !t.officialName.toLowerCase().startsWith(t.name.toLowerCase());
  return adds ? `${t.name} (${t.officialName})` : t.name;
}

/**
 * An answer that supports a condition, as the user gave it: a sign they have, or a chosen option
 * ("Số ngày sốt: 1–2 ngày"). Answers "no" are left out: listed bare they read as if present.
 */
export function supportText(kb: CompiledKb, findingId: string, value: string): string | null {
  const t = kb.text.findings[findingId];
  if (!t) return null;
  if (value === 'present') return t.label;
  if (value === 'absent' || value === 'unknown') return null;
  const option = t.options[value];
  return option ? `${t.label}: ${option.charAt(0).toLowerCase()}${option.slice(1)}` : null;
}

/**
 * One sentence explaining why the triage level was chosen. `names` are the conditions behind a
 * probability-based level, most probable first.
 */
export function describeReason(kb: CompiledKb, r: TriageReason, names: readonly string[] = []): string {
  switch (r.kind) {
    case 'emergency_screen':
      return `Có dấu hiệu cấp cứu: ${findingLabel(kb, r.findingId)}.`;
    case 'emergency_unknown':
      return `Chưa rõ có dấu hiệu cấp cứu hay không: ${findingLabel(kb, r.findingId)}.`;
    case 'rule':
      return kb.text.rules[r.ruleId]?.reason ?? r.ruleId;
    case 'rule_unknown':
      return `Chưa loại trừ được một dấu hiệu nguy hiểm vì có câu trả lời "Không rõ": ${kb.text.rules[r.ruleId]?.reason ?? r.ruleId}`;
    case 'probability': {
      const list = names.length > 0 ? `: ${names.join(', ')}` : '';
      return r.cantMiss
        ? `Chưa loại trừ được bệnh nguy hiểm${list}. Cần được khám để xác định.`
        : `Chưa loại trừ được tình trạng cần khám ở mức này${list}.`;
    }
    case 'guard_other':
      return 'Các câu trả lời chưa khớp rõ với tình trạng nào trong hệ thống, nên cần được khám.';
    case 'guard_early_stop':
      return 'Phiên hỏi đã dừng sớm, nên chưa thể khuyên tự theo dõi tại nhà.';
  }
}
