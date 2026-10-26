/**
 * Usage:
 *   npm run eval:check                    validate every vignette set
 *   npm run eval:check -- --set holdout   validate one set (dev | holdout | external)
 */
import { DEFAULT_KNOWLEDGE_ROOT, formatIssues, loadKnowledge } from '@doctor-v/kb';
import type { Issue } from '@doctor-v/kb';
import { VIGNETTE_SETS, loadVignettes, plannedConditionIds, validateVignettes } from '../vignette.ts';
import type { VignetteSet } from '../vignette.ts';

const args = process.argv.slice(2);
const setIndex = args.indexOf('--set');
const requested = setIndex >= 0 ? args[setIndex + 1] : undefined;
const isSet = (s: string | undefined): s is VignetteSet => VIGNETTE_SETS.some((v) => v === s);
if (setIndex >= 0 && !isSet(requested)) {
  console.error(`--set phải là một trong: ${VIGNETTE_SETS.join(', ')}`);
  process.exit(2);
}
const sets: readonly VignetteSet[] = isSet(requested) ? [requested] : VIGNETTE_SETS;

const loaded = loadKnowledge(DEFAULT_KNOWLEDGE_ROOT);
if (!loaded.knowledge) {
  console.log(formatIssues(loaded.issues));
  console.error('Danh mục knowledge/ đang có lỗi cấu trúc; sửa trước khi kiểm tra ca.');
  process.exit(1);
}
const issues: Issue[] = [];
const vignettes = loadVignettes(sets, issues);
issues.push(...validateVignettes(vignettes, loaded.knowledge, plannedConditionIds(DEFAULT_KNOWLEDGE_ROOT)));

if (issues.length > 0) console.log(formatIssues(issues));
const counts = sets.map((s) => `${s}: ${vignettes.filter((v) => v.vignette.set === s).length}`).join(', ');
const errors = issues.filter((i) => i.severity === 'error').length;
console.log(`\nSố ca: ${counts}. Kết quả: ${errors} lỗi, ${issues.length - errors} cảnh báo.`);
process.exit(errors > 0 ? 1 : 0);
