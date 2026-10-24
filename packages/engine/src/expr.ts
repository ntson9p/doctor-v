import type { PatientContext } from './context.ts';
import { UNKNOWN } from './model.ts';
import type { Expr } from './model.ts';

/** Three-valued logic: true, false, or undetermined because an answer is "unknown". */
export type Tri = 'T' | 'F' | 'U';

export interface ExprEnv {
  answers: Readonly<Record<string, string>>;
  /** Findings implied "present" by the chief complaint. */
  implied: ReadonlySet<string>;
  ctx: PatientContext;
  ageGroup: string;
}

export function valueOf(env: ExprEnv, findingId: string): string | undefined {
  return env.implied.has(findingId) ? 'present' : env.answers[findingId];
}

/**
 * Evaluates an expression. A finding that was never asked counts as "no evidence" (false);
 * a finding answered "unknown" makes the atom undetermined (U), except for `is: unknown`.
 */
export function evalExpr(expr: Expr, env: ExprEnv): Tri {
  if ('all' in expr) {
    let undetermined = false;
    for (const e of expr.all) {
      const r = evalExpr(e, env);
      if (r === 'F') return 'F';
      if (r === 'U') undetermined = true;
    }
    return undetermined ? 'U' : 'T';
  }
  if ('any' in expr) {
    let undetermined = false;
    for (const e of expr.any) {
      const r = evalExpr(e, env);
      if (r === 'T') return 'T';
      if (r === 'U') undetermined = true;
    }
    return undetermined ? 'U' : 'F';
  }
  if ('not' in expr) {
    const r = evalExpr(expr.not, env);
    return r === 'U' ? 'U' : r === 'T' ? 'F' : 'T';
  }
  if ('atLeast' in expr) {
    let yes = 0;
    let undetermined = 0;
    for (const e of expr.of) {
      const r = evalExpr(e, env);
      if (r === 'T') yes += 1;
      else if (r === 'U') undetermined += 1;
    }
    if (yes >= expr.atLeast) return 'T';
    return yes + undetermined >= expr.atLeast ? 'U' : 'F';
  }
  if ('finding' in expr) {
    const v = valueOf(env, expr.finding);
    if (v === undefined) return 'F';
    if ('is' in expr) {
      if (expr.is === 'unknown') return v === UNKNOWN ? 'T' : 'F';
      if (v === UNKNOWN) return 'U';
      return v === expr.is ? 'T' : 'F';
    }
    if (v === UNKNOWN) return 'U';
    return expr.in.includes(v) ? 'T' : 'F';
  }
  if ('ageGroups' in expr) return expr.ageGroups.includes(env.ageGroup) ? 'T' : 'F';
  if ('ageMonthsLt' in expr) return env.ctx.ageMonths < expr.ageMonthsLt ? 'T' : 'F';
  if ('ageYearsGte' in expr) return env.ctx.ageMonths >= expr.ageYearsGte * 12 ? 'T' : 'F';
  return env.ctx.sex === expr.sex ? 'T' : 'F';
}
