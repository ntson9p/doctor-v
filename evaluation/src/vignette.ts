/**
 * Clinical vignettes (test cases) used to measure accuracy and safety.
 * One vignette per YAML file under evaluation/vignettes/<set>/. Format: docs/evaluation.md.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listYamlFiles, parseYamlFile } from '@doctor-v/kb';
import type { Issue, RawKnowledge } from '@doctor-v/kb';
import { parse } from 'yaml';
import * as z from 'zod';

const ID = z.string().regex(/^[a-z][a-z0-9_]*$/);
const TEXT = z.string().trim().min(1);

export const VIGNETTE_SETS = ['dev', 'holdout', 'external'] as const;
export type VignetteSet = (typeof VIGNETTE_SETS)[number];

export const vignetteSchema = z.strictObject({
  id: z.string().regex(/^[a-z0-9][a-z0-9-]*$/),
  set: z.enum(VIGNETTE_SETS),
  title_vi: TEXT,
  narrative_vi: TEXT,
  patient: z
    .strictObject({
      age_years: z.number().int().min(0).max(120).optional(),
      age_months: z.number().int().min(0).max(1440).optional(),
      sex: z.enum(['female', 'male']),
      region: ID.optional(),
      month: z.number().int().min(1).max(12).optional(),
    })
    .refine((p) => (p.age_years === undefined) !== (p.age_months === undefined), {
      message: 'Cần đúng một trong hai: age_years hoặc age_months',
    }),
  complaint: ID,
  /** Binary findings: present | absent | unknown. Categorical: option id | unknown. */
  answers: z.record(ID, z.string()),
  /** How the simulated patient answers binary findings the vignette does not mention. */
  default_unmentioned: z.enum(['absent', 'unknown']).optional(),
  expected: z.strictObject({
    /** Gold condition id, or "other" when the true cause is not in the knowledge base. */
    condition: ID,
    acceptable: z.array(ID).optional(),
    triage: z.number().int().min(1).max(5),
  }),
  source: z.strictObject({
    basis: TEXT,
    references: z.array(z.string()).optional(),
  }),
  author: TEXT,
  notes_vi: TEXT.optional(),
});

export type Vignette = z.infer<typeof vignetteSchema>;

export const VIGNETTE_ROOT = fileURLToPath(new URL('../vignettes', import.meta.url));

export interface LoadedVignette {
  file: string;
  vignette: Vignette;
}

export function loadVignettes(sets: readonly VignetteSet[], issues: Issue[], root: string = VIGNETTE_ROOT): LoadedVignette[] {
  const out: LoadedVignette[] = [];
  for (const set of sets) {
    for (const abs of listYamlFiles(join(root, set))) {
      const vignette = parseYamlFile(abs, vignetteSchema, root, issues);
      if (!vignette) continue;
      const file = relative(root, abs).split('\\').join('/');
      if (vignette.set !== set) {
        issues.push({ severity: 'error', file, path: 'set', message: `Ca nằm trong thư mục "${set}" nhưng ghi set: ${vignette.set}` });
      }
      out.push({ file, vignette });
    }
  }
  return out;
}

const idsOf = (list: unknown): string[] =>
  Array.isArray(list) ? list.map((d: { id?: unknown }) => d.id).filter((id) => typeof id === 'string') : [];

/**
 * Condition ids planned but not yet written, so that cases can name them before pass C creates them:
 * the pilot scope (knowledge/drafts/pilot-scope.yaml) and the new conditions of each Phase 3 batch
 * (knowledge/drafts/phase-3/<batch>/scope.yaml).
 */
export function plannedConditionIds(knowledgeRoot: string): Set<string> {
  const ids = new Set<string>();
  const pilot = join(knowledgeRoot, 'drafts', 'pilot-scope.yaml');
  if (existsSync(pilot)) idsOf(parse(readFileSync(pilot, 'utf8'))).forEach((id) => ids.add(id));
  const phase3 = join(knowledgeRoot, 'drafts', 'phase-3');
  if (existsSync(phase3)) {
    for (const batch of readdirSync(phase3)) {
      const scope = join(phase3, batch, 'scope.yaml');
      if (!existsSync(scope)) continue;
      const data: unknown = parse(readFileSync(scope, 'utf8'));
      if (data && typeof data === 'object' && 'new' in data) idsOf(data.new).forEach((id) => ids.add(id));
    }
  }
  return ids;
}

export function ageMonthsOf(v: Vignette): number {
  return v.patient.age_months ?? (v.patient.age_years ?? 0) * 12;
}

/** Checks every reference in a vignette against the knowledge base. */
export function validateVignettes(vignettes: LoadedVignette[], k: RawKnowledge, extraConditionIds: Set<string>): Issue[] {
  const issues: Issue[] = [];
  const findings = new Map(k.findings.map((f) => [f.data.id, f.data]));
  const complaints = new Map(k.complaints.map((c) => [c.data.id, c.data]));
  const conditions = new Set([...k.conditions.map((c) => c.data.id), ...extraConditionIds]);
  const regions = new Set(k.regions.data.map((r) => r.id));
  const ageGroups = [...k.ageGroups.data].sort((a, b) => a.min_months - b.min_months);
  const seen = new Map<string, string>();

  for (const { file, vignette: v } of vignettes) {
    const err = (path: string, message: string): void => {
      issues.push({ severity: 'error', file, path, message });
    };
    const prev = seen.get(v.id);
    if (prev) err('id', `ID ca bị trùng với ${prev}`);
    seen.set(v.id, file);
    if (!file.endsWith(`/${v.id}.yaml`)) err('id', `Tên file phải là "${v.id}.yaml"`);

    const months = ageMonthsOf(v);
    const ageGroup = ageGroups.find((g) => months >= g.min_months && (g.max_months === null || months < g.max_months))?.id;
    if (v.patient.region !== undefined && !regions.has(v.patient.region)) err('patient.region', `Không có vùng "${v.patient.region}"`);

    const complaint = complaints.get(v.complaint);
    if (!complaint) err('complaint', `Không có triệu chứng chính "${v.complaint}"`);
    else if (complaint.age_groups && ageGroup && !complaint.age_groups.includes(ageGroup)) {
      err('complaint', `Triệu chứng chính "${v.complaint}" không áp dụng cho nhóm tuổi ${ageGroup}`);
    }

    for (const [id, value] of Object.entries(v.answers)) {
      const f = findings.get(id);
      if (!f) {
        err(`answers.${id}`, `Không có dấu hiệu "${id}"`);
        continue;
      }
      if (f.type === 'binary' && !['present', 'absent', 'unknown'].includes(value)) {
        err(`answers.${id}`, `Dấu hiệu có/không chỉ nhận present, absent, unknown (đang là "${value}")`);
      }
      if (f.type === 'categorical' && value !== 'unknown' && !f.options.some((o) => o.id === value)) {
        err(`answers.${id}`, `Lựa chọn "${value}" không có trong ${f.options.map((o) => o.id).join(', ')}`);
      }
      const applies = f.applies_to;
      if (applies?.sex && !applies.sex.includes(v.patient.sex)) err(`answers.${id}`, `Dấu hiệu "${id}" không áp dụng cho giới ${v.patient.sex}`);
      if (applies?.age_groups && ageGroup && !applies.age_groups.includes(ageGroup)) {
        err(`answers.${id}`, `Dấu hiệu "${id}" không áp dụng cho nhóm tuổi ${ageGroup}`);
      }
      if (complaint?.implies.includes(id) && value !== 'present') {
        err(`answers.${id}`, `Mâu thuẫn: triệu chứng chính "${v.complaint}" đã ngầm định "${id}" là có`);
      }
    }

    const gold = v.expected.condition;
    if (gold !== 'other' && !conditions.has(gold)) err('expected.condition', `Không có bệnh "${gold}"`);
    for (const alt of v.expected.acceptable ?? []) {
      if (!conditions.has(alt)) err('expected.acceptable', `Không có bệnh "${alt}"`);
    }
  }
  return issues;
}
