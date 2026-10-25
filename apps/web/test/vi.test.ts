import { describe, expect, it } from 'vitest';
import { fold, matches } from '../src/lib/vi.ts';

// Labels and synonyms as written in knowledge/complaints/.
const FEVER = ['Sốt', 'nóng sốt', 'sốt cao', 'người nóng', 'ớn lạnh'];
const ABDOMINAL = ['Đau bụng', 'đau bao tử', 'đau bụng dưới', 'đau bụng kinh'];
const HEADACHE = ['Đau đầu', 'nhức đầu', 'đau sau gáy'];

describe('complaint search', () => {
  it('folds marks and "đ"', () => {
    expect(fold('  Đau   BỤNG ')).toBe('dau bung');
  });
  it('finds a complaint typed without accents, or half-typed', () => {
    expect(matches('nhuc dau', HEADACHE)).toBe(true);
    expect(matches('dau bao tu', ABDOMINAL)).toBe(true);
    expect(matches('dau bun', ABDOMINAL)).toBe(true);
    expect(matches('bụng đau', ABDOMINAL)).toBe(true);
    expect(matches('', FEVER)).toBe(true);
  });
  it('respects the accents the user typed', () => {
    expect(matches('dau', ABDOMINAL)).toBe(true);
    expect(matches('dau', HEADACHE)).toBe(true);
    expect(matches('đầu', HEADACHE)).toBe(true);
    expect(matches('đầu', ABDOMINAL)).toBe(false);
    // "nôn" is not "nóng", and "ói" is not the end of "người" or "dưới".
    expect(matches('nôn', FEVER)).toBe(false);
    expect(matches('ói', FEVER)).toBe(false);
    expect(matches('ói', ABDOMINAL)).toBe(false);
    expect(matches('bủng', ABDOMINAL)).toBe(false);
  });
  it('matches whole words once a word is finished', () => {
    expect(matches('non', FEVER)).toBe(true); // may still become "nóng"
    expect(matches('non ', FEVER)).toBe(false);
  });
  it('accepts either tone-mark position', () => {
    expect(matches('hoà', ['hòa'])).toBe(true);
    expect(matches('thuỷ', ['thủy'])).toBe(true);
  });
  it('pairs each word with a different word of the text', () => {
    expect(matches('đau lưng', HEADACHE)).toBe(false);
    expect(matches('dau đầu', ['đầu đau'])).toBe(true);
  });
  it('reads a sentence: filler words, or a whole complaint inside the query', () => {
    expect(matches('bé bị sốt cao', FEVER)).toBe(true);
    expect(matches('tôi bị đau bụng dữ dội', ABDOMINAL)).toBe(true);
    expect(matches('con bi sot', FEVER)).toBe(true);
    expect(matches('tôi bị', HEADACHE)).toBe(true);
    // A filler word only counts with its own tone: "bì" in "tê bì" is not "bị", so it must match too.
    expect(matches('tê bì', ['tê buốt'])).toBe(false);
  });
  it('finds nothing for a symptom the pilot does not cover', () => {
    for (const texts of [FEVER, ABDOMINAL, HEADACHE]) {
      expect(matches('chóng mặt', texts)).toBe(false);
      expect(matches('chong mat', texts)).toBe(false);
      expect(matches('đau lưng', texts)).toBe(false);
    }
  });
});
