/**
 * Writes <dir>/agreement.md comparing <dir>/pass-a with <dir>/pass-b (dir relative to knowledge/).
 * Usage: npm run kb:agreement                            (dir: drafts, the pilot)
 *        npm run kb:agreement -- drafts/phase-3/batch-1
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { compareDrafts, renderAgreement } from '../agreement.ts';
import { DEFAULT_KNOWLEDGE_ROOT, formatIssues } from '../index.ts';
import { loadConditionDrafts } from '../load.ts';

const dir = (process.argv[2] ?? 'drafts').replace(/\\/g, '/').replace(/\/$/, '');
const a = loadConditionDrafts(DEFAULT_KNOWLEDGE_ROOT, `${dir}/pass-a`);
const b = loadConditionDrafts(DEFAULT_KNOWLEDGE_ROOT, `${dir}/pass-b`);
const issues = [...a.issues, ...b.issues];
if (issues.length > 0) console.log(formatIssues(issues));

const report = compareDrafts(a.drafts, b.drafts);
const file = join(DEFAULT_KNOWLEDGE_ROOT, dir, 'agreement.md');
writeFileSync(file, renderAgreement(report), 'utf8');
console.log(`Kappa có trọng số: ${report.weightedKappa.toFixed(3)} trên ${report.pairs} cặp liên kết. Đã ghi ${file}`);
