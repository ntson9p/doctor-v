/** Vietnamese text helpers for search: accent-insensitive, "đ" folded to "d". */

export function fold(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/** True when every word of the query appears in one of the texts (accents ignored). */
export function matches(query: string, texts: readonly string[]): boolean {
  const words = fold(query).split(' ').filter(Boolean);
  if (words.length === 0) return true;
  const haystacks = texts.map(fold);
  return haystacks.some((h) => words.every((w) => h.includes(w)));
}
