/**
 * Writes knowledge/drafts/agreement.md comparing drafts/pass-a with drafts/pass-b.
 * Usage: npm run kb:agreement
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { compareDrafts, renderAgreement } from '../agreement.ts';
import { DEFAULT_KNOWLEDGE_ROOT, formatIssues } from '../index.ts';
import { loadConditionDrafts } from '../load.ts';

const a = loadConditionDrafts(DEFAULT_KNOWLEDGE_ROOT, 'drafts/pass-a');
const b = loadConditionDrafts(DEFAULT_KNOWLEDGE_ROOT, 'drafts/pass-b');
const issues = [...a.issues, ...b.issues];
if (issues.length > 0) console.log(formatIssues(issues));

const report = compareDrafts(a.drafts, b.drafts);
const file = join(DEFAULT_KNOWLEDGE_ROOT, 'drafts', 'agreement.md');
writeFileSync(file, renderAgreement(report), 'utf8');
console.log(`Kappa có trọng số: ${report.weightedKappa.toFixed(3)} trên ${report.pairs} cặp liên kết. Đã ghi ${file}`);
