/**
 * Build-time access to the knowledge base, for prerendered pages and the data endpoint.
 * Paths are resolved from the app folder: bundled server code cannot rely on its own location.
 */
import { resolve } from 'node:path';
import { buildKnowledge, formatIssues } from '@doctor-v/kb';
import type { CompiledKb } from '@doctor-v/engine';
import type { RawKnowledge } from '@doctor-v/kb';

let cached: { kb: CompiledKb; knowledge: RawKnowledge } | null = null;

export function builtKnowledge(): { kb: CompiledKb; knowledge: RawKnowledge } {
  if (cached) return cached;
  const built = buildKnowledge(resolve(process.cwd(), '../../knowledge'));
  if (!built.kb || !built.knowledge) {
    throw new Error(`Không biên dịch được dữ liệu:\n${formatIssues(built.issues.filter((i) => i.severity === 'error'))}`);
  }
  cached = { kb: built.kb, knowledge: built.knowledge };
  return cached;
}
