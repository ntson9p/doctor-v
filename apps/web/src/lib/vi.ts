/**
 * Vietnamese text helpers for search. Accents are optional but respected when typed: "dau" finds both
 * "đau" and "đầu", while "đầu" finds only "đầu", and "nôn" does not find "nóng".
 */

/** Removes every mark and folds "đ" to "d". */
export function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** The five tone marks (huyền, sắc, ngã, hỏi, nặng) as combining characters. */
const TONE = /[̣̀́̃̉]/g;

interface Syllable {
  /** Letters with their own marks (â ă ê ô ơ ư đ). The tone is kept apart, so "hoà" and "hòa" agree. */
  letters: string[];
  /** The same letters without marks. */
  plain: string[];
  tone: string;
}

function syllables(text: string): Syllable[] {
  return text
    .normalize('NFD')
    .toLowerCase()
    .split(/[^\p{L}\p{M}]+/u)
    .filter(Boolean)
    .map((s) => {
      const letters = [...s.replace(TONE, '').normalize('NFC')];
      return { letters, plain: letters.map(fold), tone: s.match(TONE)?.[0] ?? '' };
    });
}

/**
 * True when a typed syllable fits a syllable of the text. Marks the user typed must match; a letter typed
 * without its marks fits any marked form. A syllable still being typed may be the start of a longer one.
 */
function fits(typed: Syllable, word: Syllable, prefix: boolean): boolean {
  const n = typed.letters.length;
  if (prefix ? n > word.letters.length : n !== word.letters.length) return false;
  if (typed.tone !== '' && typed.tone !== word.tone) return false;
  return typed.letters.every((c, i) => c === word.letters[i] || (c === typed.plain[i] && c === word.plain[i]));
}

/** True when every `need` item can be paired with a different `pool` item (bipartite matching). */
function pairUp<N, P>(need: readonly N[], pool: readonly P[], fit: (n: N, p: P) => boolean): boolean {
  const owner: (N | null)[] = pool.map(() => null);
  const place = (n: N, seen: Set<number>): boolean =>
    pool.some((p, j) => {
      if (seen.has(j) || !fit(n, p)) return false;
      seen.add(j);
      const other = owner[j] ?? null;
      if (other !== null && !place(other, seen)) return false;
      owner[j] = n;
      return true;
    });
  return need.every((n) => place(n, new Set()));
}

/** Words people add when they type a sentence ("bé bị sốt cao"); none of them names a symptom. */
const FILLERS = syllables('bị hay thấy hơi rất quá lắm cứ đang tôi mình em con cháu bé của thì là và ạ ơi');

/**
 * True when the query names one of the texts: every word typed, filler words aside, fits a different word
 * of the text (the last one may be half-typed), or a whole text appears in the query ("đau bụng dữ dội").
 */
export function matches(query: string, texts: readonly string[]): boolean {
  const typed = syllables(query);
  const words = typed.filter((s) => !FILLERS.some((f) => fits(s, f, false)));
  if (words.length === 0) return true;
  const halfTyped = /\s$/.test(query) ? null : words.at(-1);
  return texts.some((text) => {
    const own = syllables(text);
    return (
      pairUp(words, own, (w, t) => fits(w, t, w === halfTyped)) || pairUp(own, typed, (t, w) => fits(w, t, false))
    );
  });
}
