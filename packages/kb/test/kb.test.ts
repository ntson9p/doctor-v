import { describe, expect, it } from 'vitest';
import { evalExpr } from '@doctor-v/engine';
import type { ExprEnv } from '@doctor-v/engine';
import { buildKnowledge, checkKnowledge, convertExpr, lintText, splitSentences, validateKnowledge, wordCount } from '../src/index.ts';

describe('Vietnamese text rules', () => {
  const messages = (text: string, kind: 'question' | 'sentence' | 'label') => lintText(text, kind).map((h) => h.message);

  it('counts words and splits sentences', () => {
    expect(wordCount('Có sốt không?')).toBe(3);
    expect(splitSentences('Câu một. Câu hai! Câu ba?')).toEqual(['Câu một.', 'Câu hai!', 'Câu ba?']);
  });
  it('requires questions to end with "?" and stay short', () => {
    expect(messages('Có sốt không', 'question').join()).toContain('"?"');
    const long = `${'rất '.repeat(20)}đau không?`;
    expect(lintText(long, 'question').some((h) => h.severity === 'warning')).toBe(true);
  });
  it('bans "ốm" and promises, but not words that merely contain those letters', () => {
    expect(lintText('Bé bị ốm mấy ngày nay.', 'sentence').some((h) => h.severity === 'error')).toBe(true);
    expect(lintText('Uống thuốc là khỏi hẳn.', 'sentence').some((h) => h.severity === 'error')).toBe(true);
    expect(lintText('Đau sau gáy, nôn ói.', 'sentence')).toEqual([]);
  });
  it('requires NFC and the new tone-mark style, without flagging "qu" words', () => {
    expect(messages('Sốt'.normalize('NFD'), 'label').join()).toContain('NFC');
    expect(messages('Sức khoẻ', 'label').join()).toContain('khỏe');
    expect(messages('Dấu hiệu đột quỵ', 'label')).toEqual([]);
  });
});

// The whole knowledge base is loaded and checked: several seconds now, and more with each batch, so the
// default 5 s timeout failed on a busy machine.
describe('repository knowledge base', { timeout: 60_000 }, () => {
  it('has no validation errors', () => {
    const result = checkKnowledge();
    const errors = result.issues.filter((i) => i.severity === 'error');
    expect(errors, JSON.stringify(errors.slice(0, 5), null, 2)).toEqual([]);
  });

  it('compiles deterministically into the engine model', () => {
    const a = buildKnowledge();
    const b = buildKnowledge();
    expect(a.kb).not.toBeNull();
    expect(a.kb?.version).toBe(b.kb?.version);
    const kb = a.kb;
    if (!kb) return;

    const fever = kb.findings.find((f) => f.id === 'fever');
    expect(fever?.type === 'binary' && fever.leak).toBe(0.05);
    const duration = kb.findings.find((f) => f.id === 'fever_duration');
    expect(duration?.type === 'categorical' && duration.baseline.reduce((x, y) => x + y, 0)).toBeCloseTo(1, 12);
    for (const c of kb.conditions) {
      for (const link of Object.values(c.links)) {
        if (typeof link === 'number') expect(link > 0 && link < 1).toBe(true);
        else expect(link.reduce((x, y) => x + y, 0)).toBeCloseTo(1, 9);
      }
    }
    expect(kb.text.findings.fever?.question).toBe('Có sốt không?');
  });

  it('compiles at_least and rejects a threshold above the number of conditions', () => {
    expect(convertExpr({ at_least: 2, of: [{ sex: 'male' }, { age_years_gte: 18 }] })).toEqual({
      atLeast: 2,
      of: [{ sex: 'male' }, { ageYearsGte: 18 }],
    });
    const k = checkKnowledge().knowledge;
    expect(k).not.toBeNull();
    if (!k) return;
    const bad = structuredClone(k);
    bad.rules.data.push({
      ...bad.rules.data[0]!,
      id: 'rf_test_at_least',
      when: { at_least: 3, of: [{ finding: 'fever', is: 'present' }, { finding: 'confusion', is: 'present' }] },
    });
    const errors = validateKnowledge(bad).filter((i) => i.severity === 'error');
    expect(errors.map((i) => i.message)).toEqual(['at_least (3) lớn hơn số điều kiện (2)']);
  });

  it('calls 115 for fever with two sepsis sign groups, not for two answers about one state', () => {
    const rule = buildKnowledge().kb?.rules.find((r) => r.id === 'rf_sepsis_multiple_signs');
    expect(rule?.level).toBe(1);
    if (!rule) return;
    const env = (answers: Record<string, string>): ExprEnv => ({
      answers,
      implied: new Set(['fever']),
      ctx: { ageMonths: 40 * 12, sex: 'female', regionId: null, month: 7 },
      ageGroup: 'adult_18_44',
    });
    expect(evalExpr(rule.when, env({ confusion: 'present', breathing_difficulty: 'present' }))).toBe('T');
    expect(evalExpr(rule.when, env({ confusion: 'present', drowsy_hard_to_wake: 'present' }))).toBe('F');
    expect(evalExpr(rule.when, env({ cold_hands_feet: 'present', severe_weakness: 'present' }))).toBe('F');
    expect(evalExpr(rule.when, env({ confusion: 'present', breathing_difficulty: 'unknown' }))).toBe('U');
  });
});
