/**
 * Prints the compact index of the knowledge base (Markdown, one line per item) for authoring agents.
 * Usage:
 *   npm run kb:index -- --out-dir /tmp/kb-index         index.md (read whole), links.md, rules.md, sources.md (search)
 *   npm run kb:index                                    every section to stdout
 *   npm run kb:index -- --only findings,rules           some sections: meta, findings, groups, complaints, conditions,
 *                                                       links, rules, sources
 *   npm run kb:index -- --only rules --out /tmp/rules.md
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { INDEX_FILES, INDEX_SECTIONS, renderCatalog } from '../catalog.ts';
import type { IndexSection } from '../catalog.ts';
import { checkKnowledge, formatIssues } from '../index.ts';

const args = process.argv.slice(2);
const option = (name: string): string | undefined => {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  const value = args[i + 1];
  if (value === undefined || value.startsWith('--')) {
    console.error(`Thiếu giá trị sau ${name}`);
    process.exit(2);
  }
  return value;
};
const only = option('--only')?.split(',').map((s) => s.trim());
const unknown = only?.filter((s) => !(INDEX_SECTIONS as readonly string[]).includes(s)) ?? [];
if (unknown.length > 0) {
  console.error(`Không có mục ${unknown.join(', ')}. Các mục: ${INDEX_SECTIONS.join(', ')}.`);
  process.exit(2);
}

const result = checkKnowledge();
if (!result.knowledge || result.errors > 0) {
  console.error(formatIssues(result.issues.filter((i) => i.severity === 'error')));
  console.error('Dữ liệu đang có lỗi; sửa trước khi in mục lục (npm run kb:check).');
  process.exit(1);
}
const k = result.knowledge;

const report = (file: string, text: string): void =>
  console.log(`Đã ghi ${file}: ${text.length} ký tự, ${text.split('\n').length - 1} dòng.`);

const outDir = option('--out-dir');
const out = option('--out');
if (outDir !== undefined) {
  mkdirSync(outDir, { recursive: true });
  for (const { file, sections } of INDEX_FILES) {
    const text = renderCatalog(k, { sections });
    writeFileSync(join(outDir, file), text, 'utf8');
    report(join(outDir, file), text);
  }
} else {
  const text = renderCatalog(k, only ? { sections: only as IndexSection[] } : {});
  if (out === undefined) {
    process.stdout.write(text);
  } else {
    writeFileSync(out, text, 'utf8');
    report(out, text);
  }
}
