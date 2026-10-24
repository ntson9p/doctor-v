/**
 * Usage:
 *   npm run kb:check                         validate knowledge/
 *   npm run kb:check -- --drafts drafts/pass-a   validate draft conditions in knowledge/drafts/pass-a
 */
import { checkDrafts, checkKnowledge, formatIssues } from '../index.ts';

const args = process.argv.slice(2);
const draftsIndex = args.indexOf('--drafts');
const draftsDir = draftsIndex >= 0 ? args[draftsIndex + 1] : undefined;
if (draftsIndex >= 0 && draftsDir === undefined) {
  console.error('Thiếu thư mục sau --drafts, ví dụ: --drafts drafts/pass-a');
  process.exit(2);
}

const result = draftsDir === undefined ? checkKnowledge() : checkDrafts(draftsDir.replace(/\\/g, '/').replace(/\/$/, ''));
if (result.issues.length > 0) console.log(formatIssues(result.issues));

const k = result.knowledge;
if (k && draftsDir === undefined) {
  console.log(
    `\nDữ liệu: ${k.conditions.length} bệnh, ${k.findings.length} dấu hiệu, ${k.complaints.length} triệu chứng chính, ` +
      `${k.rules.data.length} quy tắc, ${k.sources.length} nguồn.`,
  );
}
console.log(`Kết quả: ${result.errors} lỗi, ${result.warnings} cảnh báo.`);
process.exit(result.errors > 0 ? 1 : 0);
