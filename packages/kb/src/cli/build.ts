/**
 * Validates knowledge/ and writes the compiled engine model to packages/kb/dist/kb.json.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildKnowledge, formatIssues } from '../index.ts';

const result = buildKnowledge();
if (result.issues.length > 0) console.log(formatIssues(result.issues));
if (!result.kb) {
  console.error(`\nKhông biên dịch được: ${result.errors} lỗi.`);
  process.exit(1);
}

const outDir = fileURLToPath(new URL('../../dist/', import.meta.url));
mkdirSync(outDir, { recursive: true });
const outFile = `${outDir}kb.json`;
writeFileSync(outFile, `${JSON.stringify(result.kb)}\n`, 'utf8');
console.log(
  `Đã biên dịch phiên bản ${result.kb.version}: ${result.kb.conditions.length} bệnh, ` +
    `${result.kb.findings.length} dấu hiệu → ${outFile}`,
);
