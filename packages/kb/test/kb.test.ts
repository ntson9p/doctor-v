import { describe, expect, it } from 'vitest';
import { buildKnowledge, checkKnowledge, lintText, splitSentences, wordCount } from '../src/index.ts';

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

describe('repository knowledge base', () => {
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
});
