import type { AgeGroup, Applicability, Sex } from './model.ts';

export interface PatientContext {
  /** Age in completed months (years × 12 for older patients). */
  ageMonths: number;
  sex: Sex;
  regionId: string | null;
  /** Calendar month 1–12, used by seasonal prior modifiers. */
  month: number | null;
}

export function ageGroupOf(ageGroups: readonly AgeGroup[], ageMonths: number): string {
  for (const g of ageGroups) {
    if (ageMonths >= g.minMonths && (g.maxMonths === null || ageMonths < g.maxMonths)) return g.id;
  }
  throw new Error(`No age group covers ${ageMonths} months`);
}

export function isApplicable(a: Applicability | null, ctx: PatientContext, ageGroup: string): boolean {
  if (a === null) return true;
  if (a.sex !== null && !a.sex.includes(ctx.sex)) return false;
  if (a.ageGroups !== null && !a.ageGroups.includes(ageGroup)) return false;
  return true;
}
