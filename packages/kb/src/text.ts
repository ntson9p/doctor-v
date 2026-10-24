/**
 * Automated checks for user-facing Vietnamese text (docs/style-guide-vi.md, marked ⚙).
 */
import type { Severity } from './load.ts';

export type TextKind = 'question' | 'sentence' | 'label';

export interface TextHit {
  severity: Severity;
  message: string;
}

const LIMITS = {
  questionWarn: 15,
  questionError: 25,
  sentenceWarn: 25,
  sentenceError: 40,
  labelWarn: 12,
} as const;

interface BannedTerm {
  re: RegExp;
  severity: Severity;
  message: string;
}

const BANNED: BannedTerm[] = [
  {
    re: /(^|[^\p{L}])ốm(?![\p{L}])/iu,
    severity: 'error',
    message: 'Không dùng "ốm" (miền Bắc hiểu là bệnh, miền Nam hiểu là gầy); dùng "bệnh" hoặc "sụt cân"',
  },
  { re: /bác sĩ\s*AI/iu, severity: 'error', message: 'Không dùng "bác sĩ AI"' },
  { re: /khám\s*(online|trực tuyến)/iu, severity: 'error', message: 'Không dùng "khám online"' },
  { re: /100\s*%/u, severity: 'error', message: 'Không dùng "100%"' },
  { re: /không sao đâu|khỏi hẳn/iu, severity: 'error', message: 'Không hứa hẹn kết quả' },
  {
    re: /chẩn đoán/iu,
    severity: 'warning',
    message: 'App không chẩn đoán; chỉ dùng "chẩn đoán" khi nói về việc của nhân viên y tế',
  },
  { re: /chắc chắn/iu, severity: 'warning', message: 'Tránh "chắc chắn"' },
  { re: /kết luận/iu, severity: 'warning', message: 'Tránh "kết luận" (app không kết luận bệnh)' },
];

/**
 * Old-style tone placement in open syllables ("hoà", "khoẻ", "thuỷ").
 * After "q", the "u" belongs to the consonant "qu", so "quỵ", "quý" are correct.
 */
const OLD_TONE_STYLE = /(o[àáảãạ]|o[èéẻẽẹ]|(?<!q)u[ỳýỷỹỵ])(?![\p{L}])/iu;

export function wordCount(text: string): number {
  return text
    .trim()
    .split(/\s+/u)
    .filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

export function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?…])\s+/u)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function lintText(text: string, kind: TextKind): TextHit[] {
  const hits: TextHit[] = [];
  if (text !== text.normalize('NFC')) {
    hits.push({ severity: 'error', message: 'Văn bản không ở dạng Unicode dựng sẵn (NFC)' });
  }
  if (/\s{2,}/u.test(text) || text !== text.trim()) {
    hits.push({ severity: 'warning', message: 'Có khoảng trắng thừa' });
  }
  for (const term of BANNED) {
    if (term.re.test(text)) hits.push({ severity: term.severity, message: term.message });
  }
  if (OLD_TONE_STYLE.test(text)) {
    hits.push({ severity: 'warning', message: 'Dùng kiểu đặt dấu "hòa, khỏe, thủy"' });
  }

  const words = wordCount(text);
  switch (kind) {
    case 'question':
      if (!text.trimEnd().endsWith('?')) {
        hits.push({ severity: 'error', message: 'Câu hỏi phải kết thúc bằng dấu "?"' });
      }
      if (words > LIMITS.questionError) {
        hits.push({ severity: 'error', message: `Câu hỏi dài ${words} từ (tối đa ${LIMITS.questionError})` });
      } else if (words > LIMITS.questionWarn) {
        hits.push({ severity: 'warning', message: `Câu hỏi dài ${words} từ (nên ≤ ${LIMITS.questionWarn})` });
      }
      break;
    case 'sentence':
      for (const sentence of splitSentences(text)) {
        const n = wordCount(sentence);
        if (n > LIMITS.sentenceError) {
          hits.push({ severity: 'error', message: `Câu dài ${n} từ (tối đa ${LIMITS.sentenceError}): "${sentence}"` });
        } else if (n > LIMITS.sentenceWarn) {
          hits.push({ severity: 'warning', message: `Câu dài ${n} từ (nên ≤ ${LIMITS.sentenceWarn}): "${sentence}"` });
        }
      }
      break;
    case 'label':
      if (words > LIMITS.labelWarn) {
        hits.push({ severity: 'warning', message: `Nhãn dài ${words} từ (nên ≤ ${LIMITS.labelWarn})` });
      }
      break;
  }
  return hits;
}
