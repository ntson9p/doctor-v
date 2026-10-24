/**
 * Zod schemas for the YAML files in `knowledge/`.
 *
 * Field names mirror docs/kb-guide.md exactly (snake_case, as written by authors).
 * Cross-file checks (references, text rules) live in validate.ts.
 */
import * as z from 'zod';

export const ID = z
  .string()
  .regex(/^[a-z][a-z0-9_]*$/, 'ID chỉ gồm chữ thường tiếng Anh, chữ số và dấu "_"');
export const SOURCE_ID = z
  .string()
  .regex(/^[a-z0-9][a-z0-9-]*$/, 'ID nguồn chỉ gồm chữ thường, chữ số và dấu "-"');
const TEXT = z.string().trim().min(1);
const DATE = z
  .string()
  .regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, 'Ngày phải có dạng YYYY, YYYY-MM hoặc YYYY-MM-DD');
const DAY = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày phải có dạng YYYY-MM-DD');

export const FREQ_LEVELS = ['rare', 'occasional', 'frequent', 'very_frequent', 'almost_always'] as const;
export const LEAK_LEVELS = ['specific', 'moderate', 'nonspecific'] as const;
export const PRIOR_LEVELS = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'] as const;
export const RHO_LEVELS = ['low', 'medium', 'high'] as const;
export const TIERS = ['A', 'B', 'C', 'D', 'E'] as const;
export const BASES = ['numeric', 'verbal', 'judgment'] as const;
export const LICENSE_CLASSES = ['L0', 'L1', 'L2', 'L3'] as const;
export const REVIEW_STATUSES = ['draft', 'source_checked', 'doctor_reviewed'] as const;
export const SOURCE_TYPES = [
  'guideline_vn',
  'guideline_intl',
  'systematic_review',
  'primary_study',
  'textbook',
  'reference',
  'dataset',
  'statistic',
  'web_page',
] as const;
export const FINDING_KINDS = [
  'symptom',
  'sign',
  'measurement',
  'risk_factor',
  'exposure',
  'history',
] as const;

const SEX = z.enum(['female', 'male']);
const LEVEL = z.number().int().min(1).max(5);

export const evidenceSchema = z.strictObject({
  tier: z.enum(TIERS),
  basis: z.enum(BASES),
  sources: z.array(SOURCE_ID),
  locator: TEXT.optional(),
  reported: TEXT.optional(),
  population: TEXT.optional(),
  note: TEXT.optional(),
});

export const applicabilitySchema = z.strictObject({
  sex: z.array(SEX).min(1).optional(),
  age_groups: z.array(ID).min(1).optional(),
  reason_vi: TEXT.optional(),
});

export type ExprYaml =
  | { all: ExprYaml[] }
  | { any: ExprYaml[] }
  | { not: ExprYaml }
  | { finding: string; is: 'present' | 'absent' | 'unknown' }
  | { finding: string; in: string[] }
  | { age_groups: string[] }
  | { age_months_lt: number }
  | { age_years_gte: number }
  | { sex: 'female' | 'male' };

export const exprSchema: z.ZodType<ExprYaml> = z.lazy(() =>
  z.union([
    z.strictObject({ all: z.array(exprSchema).min(1) }),
    z.strictObject({ any: z.array(exprSchema).min(1) }),
    z.strictObject({ not: exprSchema }),
    z.strictObject({ finding: ID, is: z.enum(['present', 'absent', 'unknown']) }),
    z.strictObject({ finding: ID, in: z.array(ID).min(1) }),
    z.strictObject({ age_groups: z.array(ID).min(1) }),
    z.strictObject({ age_months_lt: z.number().int().positive() }),
    z.strictObject({ age_years_gte: z.number().int().nonnegative() }),
    z.strictObject({ sex: SEX }),
  ]),
);

const leakSchema = z.union([z.enum(LEAK_LEVELS), z.number().min(0.001).max(0.95)]);

const findingCommon = {
  id: ID,
  kind: z.enum(FINDING_KINDS),
  label_vi: TEXT,
  question_vi: TEXT,
  question_other_vi: TEXT.optional(),
  help_vi: TEXT.optional(),
  alt_question: z.strictObject({ text_vi: TEXT, inverted: z.boolean().optional() }).optional(),
  cluster: ID.optional(),
  requires: z.array(exprSchema).optional(),
  applies_to: applicabilitySchema.optional(),
  cost: z.number().min(0.5).max(5).optional(),
  unknown_rate: z.number().min(0).max(0.9).optional(),
  sensitive: z.boolean().optional(),
  sources: z.array(SOURCE_ID).optional(),
  notes_vi: TEXT.optional(),
};

export const binaryFindingSchema = z.strictObject({
  ...findingCommon,
  type: z.literal('binary'),
  leak: leakSchema,
  leak_note: TEXT.optional(),
  leak_by_complaint: z.record(ID, leakSchema).optional(),
});

export const categoricalFindingSchema = z.strictObject({
  ...findingCommon,
  type: z.literal('categorical'),
  options: z
    .array(z.strictObject({ id: ID, label_vi: TEXT }))
    .min(2)
    .max(8),
  baseline: z.record(ID, z.number().min(0).max(1)).optional(),
});

export const findingSchema = z.discriminatedUnion('type', [
  binaryFindingSchema,
  categoricalFindingSchema,
]);
export const findingFileSchema = z.array(findingSchema);

export const clusterFileSchema = z.array(
  z.strictObject({
    id: ID,
    rho: z.enum(RHO_LEVELS),
    label_vi: TEXT,
    rationale_vi: TEXT,
  }),
);

export const questionGroupFileSchema = z.array(
  z.strictObject({
    id: ID,
    title_vi: TEXT,
    findings: z.array(ID).min(1).max(7),
    none_label_vi: TEXT,
    allow_unknown: z.boolean().optional(),
    applies_to: applicabilitySchema.optional(),
  }),
);

export const complaintSchema = z.strictObject({
  id: ID,
  label_vi: TEXT,
  icon: ID.optional(),
  synonyms_vi: z.array(TEXT),
  description_vi: TEXT.optional(),
  implies: z.array(ID),
  age_groups: z.array(ID).min(1).optional(),
  other_prior: z.number().min(0.05).max(0.4).optional(),
  red_flags: z.array(z.union([z.strictObject({ group: ID }), z.strictObject({ finding: ID })])),
  intake: z.array(ID),
  cant_miss: z.array(ID),
  safety_net: z.array(ID),
  sources: z.array(SOURCE_ID),
});

const priorEntrySchema = z.strictObject({
  complaint: ID,
  default: z.enum(PRIOR_LEVELS),
  by_age: z.record(ID, z.enum(PRIOR_LEVELS)).optional(),
  evidence: evidenceSchema,
});

const priorModifierSchema = z.strictObject({
  when: z.strictObject({
    months: z.array(z.number().int().min(1).max(12)).min(1).optional(),
    regions: z.array(ID).min(1).optional(),
    sex: z.array(SEX).min(1).optional(),
  }),
  factor: z.number().min(0.1).max(10),
  evidence: evidenceSchema,
});

export const binaryLinkSchema = z.strictObject({
  finding: ID,
  freq: z.enum(FREQ_LEVELS),
  /** Overrides for age groups where the frequency clearly differs (e.g. neck stiffness in infants). */
  freq_by_age: z.record(ID, z.enum(FREQ_LEVELS)).optional(),
  evidence: evidenceSchema,
});

export const categoricalLinkSchema = z.strictObject({
  finding: ID,
  dist: z.record(ID, z.number().min(0).max(1)),
  evidence: evidenceSchema,
});

export const conditionSchema = z.strictObject({
  id: ID,
  names: z.strictObject({
    vi: TEXT,
    vi_common: z.array(TEXT).optional(),
    en: TEXT,
  }),
  codes: z.strictObject({
    icd10: z
      .string()
      .regex(/^[A-Z]\d{2}(\.[0-9A-Z]{1,2})?$/, 'Mã ICD-10 không hợp lệ')
      .optional(),
    icd10_verified: z.boolean().optional(),
    mondo: z
      .string()
      .regex(/^MONDO:\d{7}$/, 'Mã MONDO phải có dạng MONDO:0000000')
      .optional(),
  }),
  summary_vi: z.array(TEXT).min(1).max(3),
  urgency: LEVEL,
  cant_miss: z.boolean(),
  specialties: z.array(ID).min(1),
  applicability: applicabilitySchema.optional(),
  priors: z.array(priorEntrySchema).min(1),
  prior_modifiers: z.array(priorModifierSchema).optional(),
  findings: z.array(z.union([binaryLinkSchema, categoricalLinkSchema])).min(1),
  warning_signs: z.array(ID).optional(),
  self_care_vi: z.array(TEXT).optional(),
  see_doctor_vi: z.array(TEXT).optional(),
  sources: z.array(SOURCE_ID).optional(),
  proposed_findings: z.array(z.record(z.string(), z.unknown())).optional(),
  review: z.strictObject({
    status: z.enum(REVIEW_STATUSES),
    authors: z.array(TEXT).optional(),
    reconciler: TEXT.optional(),
    doctor_reviewer: TEXT.nullable().optional(),
    updated: DAY,
    notes_vi: z.string().optional(),
  }),
});

export const ruleFileSchema = z.array(
  z.strictObject({
    id: ID,
    level: LEVEL,
    when: exprSchema,
    reason_vi: TEXT,
    complaints: z.array(ID).min(1).optional(),
    evidence: evidenceSchema,
  }),
);

export const emergencyScreenSchema = z.strictObject({
  title_vi: TEXT,
  none_label_vi: TEXT,
  items: z
    .array(z.strictObject({ finding: ID, level: z.union([z.literal(1), z.literal(2)]) }))
    .min(1),
});

export const sourceSchema = z.strictObject({
  id: SOURCE_ID,
  type: z.enum(SOURCE_TYPES),
  title: TEXT,
  publisher: TEXT,
  doc_number: TEXT.optional(),
  date: DATE.optional(),
  supersedes: z.array(TEXT).optional(),
  url: z.url(),
  doi: TEXT.optional(),
  pmid: z
    .string()
    .regex(/^\d+$/)
    .optional(),
  license_class: z.enum(LICENSE_CLASSES),
  license_note: TEXT.optional(),
  default_tier: z.enum(TIERS),
  accessed: DAY,
  verified: z.boolean(),
  verified_by: TEXT.optional(),
  archive: z.strictObject({ path: TEXT, sha256: z.string().regex(/^[0-9a-f]{64}$/) }).optional(),
  notes_vi: TEXT.optional(),
});

export const ageGroupFileSchema = z.array(
  z.strictObject({
    id: ID,
    label_vi: TEXT,
    min_months: z.number().int().nonnegative(),
    max_months: z.number().int().positive().nullable(),
  }),
);

export const triageLevelFileSchema = z.array(
  z.strictObject({
    level: LEVEL,
    id: ID,
    label_vi: TEXT,
    action_vi: TEXT,
  }),
);

export const labelledFileSchema = z.array(z.strictObject({ id: ID, label_vi: TEXT }));

const probability = z.number().min(0).max(1);

export const engineParamsSchema = z.strictObject({
  frequency_levels: z.strictObject({
    rare: probability,
    occasional: probability,
    frequent: probability,
    very_frequent: probability,
    almost_always: probability,
  }),
  leak_levels: z.strictObject({ specific: probability, moderate: probability, nonspecific: probability }),
  leak_floor: probability,
  prior_levels: z.strictObject({
    P1: probability,
    P2: probability,
    P3: probability,
    P4: probability,
    P5: probability,
    P6: probability,
  }),
  cluster_rho: z.strictObject({ low: probability, medium: probability, high: probability }),
  other_prior: probability,
  other_urgency_cumulative: z.tuple([probability, probability, probability, probability]),
  temperature: z.number().min(0.1).max(1.5),
  categorical_smoothing: z.number().min(0).max(0.2),
  thresholds: z.tuple([probability, probability, probability, probability]),
  cant_miss_threshold: probability,
  elder_age_groups: z.array(ID),
  elder_threshold_factor: z.number().min(0.1).max(1),
  high_risk_age_groups: z.array(ID),
  high_risk_findings: z.array(ID),
  screen_only_age_groups: z.array(ID),
  self_care_block_other: probability,
  under_triage_weights: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  cant_miss_weight: z.number().positive(),
  lambda_before_stable: z.number().nonnegative(),
  lambda_after_stable: z.number().nonnegative(),
  stop: z.strictObject({
    triage_change_prob: probability,
    top3_mass: probability,
    min_eig_bits: z.number().nonnegative(),
    min_voi: z.number().nonnegative(),
    max_questions: z.number().int().positive(),
    soft_max_questions: z.number().int().positive(),
  }),
  default_unknown_rate: probability,
  safety_net_min_prob: probability,
  candidate_min_prob: probability,
  display: z.strictObject({
    round_to: z.number().int().positive(),
    min_shown: z.number().int().positive(),
    max_shown: z.number().int().positive(),
  }),
  calibrated: z.boolean(),
});

export type EvidenceYaml = z.infer<typeof evidenceSchema>;
export type ApplicabilityYaml = z.infer<typeof applicabilitySchema>;
export type FindingYaml = z.infer<typeof findingSchema>;
export type BinaryFindingYaml = z.infer<typeof binaryFindingSchema>;
export type CategoricalFindingYaml = z.infer<typeof categoricalFindingSchema>;
export type ClusterYaml = z.infer<typeof clusterFileSchema>[number];
export type QuestionGroupYaml = z.infer<typeof questionGroupFileSchema>[number];
export type ComplaintYaml = z.infer<typeof complaintSchema>;
export type ConditionYaml = z.infer<typeof conditionSchema>;
export type BinaryLinkYaml = z.infer<typeof binaryLinkSchema>;
export type CategoricalLinkYaml = z.infer<typeof categoricalLinkSchema>;
export type RuleYaml = z.infer<typeof ruleFileSchema>[number];
export type EmergencyScreenYaml = z.infer<typeof emergencyScreenSchema>;
export type SourceYaml = z.infer<typeof sourceSchema>;
export type AgeGroupYaml = z.infer<typeof ageGroupFileSchema>[number];
export type TriageLevelYaml = z.infer<typeof triageLevelFileSchema>[number];
export type LabelledYaml = z.infer<typeof labelledFileSchema>[number];
export type EngineParamsYaml = z.infer<typeof engineParamsSchema>;
