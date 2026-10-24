import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CompiledKb } from '@doctor-v/engine';
import { compileKnowledge } from './compile.ts';
import { listYamlFiles, loadConditionDrafts, loadKnowledge, parseYamlFile } from './load.ts';
import type { Issue, Located, RawKnowledge } from './load.ts';
import { findingSchema, sourceSchema } from './schema.ts';
import type { FindingYaml, SourceYaml } from './schema.ts';
import { validateKnowledge } from './validate.ts';

export type { Issue, Located, RawKnowledge, Severity } from './load.ts';
export { compileKnowledge, convertExpr } from './compile.ts';
export { listYamlFiles, loadKnowledge, parseYamlFile } from './load.ts';
export { lintText, splitSentences, wordCount } from './text.ts';
export { validateKnowledge } from './validate.ts';
export * from './schema.ts';

/** Absolute path of the repository's `knowledge/` directory. */
export const DEFAULT_KNOWLEDGE_ROOT = fileURLToPath(new URL('../../../knowledge', import.meta.url));

export interface CheckResult {
  knowledge: RawKnowledge | null;
  issues: Issue[];
  errors: number;
  warnings: number;
}

function summarize(knowledge: RawKnowledge | null, issues: Issue[]): CheckResult {
  return {
    knowledge,
    issues,
    errors: issues.filter((i) => i.severity === 'error').length,
    warnings: issues.filter((i) => i.severity === 'warning').length,
  };
}

/** Loads and validates the knowledge base. */
export function checkKnowledge(root: string = DEFAULT_KNOWLEDGE_ROOT): CheckResult {
  const loaded = loadKnowledge(root);
  const issues = [...loaded.issues];
  if (loaded.knowledge) issues.push(...validateKnowledge(loaded.knowledge));
  return summarize(loaded.knowledge, issues);
}

/** Validates and compiles; `kb` is null when there is any error. */
export function buildKnowledge(root: string = DEFAULT_KNOWLEDGE_ROOT): CheckResult & { kb: CompiledKb | null } {
  const result = checkKnowledge(root);
  const kb = result.errors === 0 && result.knowledge ? compileKnowledge(result.knowledge) : null;
  return { ...result, kb };
}

/**
 * Validates draft condition files (e.g. `drafts/pass-a`) against the shared catalog.
 * Drafts may add sources in `<dir>/sources/` and propose findings in `proposed_findings`.
 * Only issues located in the draft directory are reported.
 */
export function checkDrafts(relDir: string, root: string = DEFAULT_KNOWLEDGE_ROOT): CheckResult {
  const loaded = loadKnowledge(root);
  const issues = loaded.issues.filter((i) => i.file.startsWith(relDir));
  if (!loaded.knowledge) {
    issues.push({ severity: 'error', file: relDir, path: '', message: 'Danh mục chung (knowledge/) đang có lỗi; sửa trước khi kiểm tra bản nháp' });
    return summarize(null, [...issues, ...loaded.issues]);
  }
  const drafts = loadConditionDrafts(root, relDir);
  issues.push(...drafts.issues);

  const draftSources: Located<SourceYaml>[] = [];
  for (const abs of listYamlFiles(join(root, relDir, 'sources'))) {
    const data = parseYamlFile(abs, sourceSchema, root, issues);
    if (data) draftSources.push({ file: `${relDir}/sources/${data.id}.yaml`, data });
  }

  const catalogIds = new Set(loaded.knowledge.findings.map((f) => f.data.id));
  const proposed: Located<FindingYaml>[] = [];
  for (const draft of drafts.drafts) {
    (draft.data.proposed_findings ?? []).forEach((raw, i) => {
      const parsed = findingSchema.safeParse(raw);
      if (parsed.success && catalogIds.has(parsed.data.id)) {
        issues.push({
          severity: 'warning',
          file: draft.file,
          path: `proposed_findings.${i}`,
          message: `Dấu hiệu đề xuất "${parsed.data.id}" đã được gộp vào danh mục; dùng bản trong knowledge/findings/`,
        });
      } else if (parsed.success) {
        proposed.push({ file: draft.file, data: parsed.data });
      } else {
        for (const iss of parsed.error.issues) {
          issues.push({
            severity: 'error',
            file: draft.file,
            path: `proposed_findings.${i}.${iss.path.map(String).join('.')}`,
            message: iss.message,
          });
        }
      }
    });
  }

  const combined: RawKnowledge = {
    ...loaded.knowledge,
    sources: [...loaded.knowledge.sources, ...draftSources],
    findings: [...loaded.knowledge.findings, ...proposed],
    conditions: drafts.drafts.map((d) => ({ file: d.file, data: { ...d.data, proposed_findings: undefined } })),
  };
  // Several drafts of one pass may propose the same new finding; that is expected, not an error.
  const proposedTwice = (i: Issue): boolean =>
    i.path === 'id' && i.message.includes('bị trùng') && i.message.includes(`đã có trong ${relDir}`);
  issues.push(...validateKnowledge(combined).filter((i) => i.file.startsWith(relDir) && !proposedTwice(i)));
  return summarize(combined, issues);
}

/** Formats issues grouped by file, for terminal output. */
export function formatIssues(issues: Issue[]): string {
  const byFile = new Map<string, Issue[]>();
  for (const issue of issues) {
    const list = byFile.get(issue.file) ?? [];
    list.push(issue);
    byFile.set(issue.file, list);
  }
  const lines: string[] = [];
  for (const [file, list] of [...byFile.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(file);
    for (const i of list) {
      const mark = i.severity === 'error' ? '  ✖' : '  ⚠';
      lines.push(`${mark} ${i.path ? `[${i.path}] ` : ''}${i.message}`);
    }
  }
  return lines.join('\n');
}
