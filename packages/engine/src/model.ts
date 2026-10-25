/**
 * Compiled knowledge-base model consumed by the engine.
 *
 * The YAML sources in `knowledge/` are validated and compiled into this shape by
 * `@doctor-v/kb`. All verbal scales (frequency levels, prior levels, leak levels)
 * are already converted to numbers here. See docs/engine-spec.md for the meaning
 * of every parameter.
 */

export type TriageLevel = 1 | 2 | 3 | 4 | 5;
export type Sex = 'female' | 'male';
export type BinaryValue = 'present' | 'absent' | 'unknown';

/** Reserved categorical value meaning "the user does not know". */
export const UNKNOWN = 'unknown';

export interface AgeGroup {
  id: string;
  /** Inclusive lower bound, in months. */
  minMonths: number;
  /** Exclusive upper bound, in months; `null` means no upper bound. */
  maxMonths: number | null;
}

export interface Applicability {
  sex: Sex[] | null;
  ageGroups: string[] | null;
}

/** Boolean expression over answers and patient context (three-valued at runtime). */
export type Expr =
  | { all: Expr[] }
  | { any: Expr[] }
  | { not: Expr }
  /** True when at least `atLeast` of the expressions are true. */
  | { atLeast: number; of: Expr[] }
  | { finding: string; is: BinaryValue }
  | { finding: string; in: string[] }
  | { ageGroups: string[] }
  | { ageMonthsLt: number }
  | { ageYearsGte: number }
  | { sex: Sex };

interface FindingBase {
  id: string;
  /** Background probability when no linked hypothesis explains the finding. */
  leak: number;
  /** Per-complaint leak overrides, keyed by complaint id. */
  leakByComplaint: Record<string, number>;
  clusterId: string | null;
  /** All expressions must be true before the question may be asked. */
  requires: Expr[];
  appliesTo: Applicability | null;
  /** Relative burden of answering (1 = simple yes/no). */
  cost: number;
  /** Expected share of "unknown" answers. */
  unknownRate: number;
  /** Present when the finding has an alternative phrasing for "unknown" answers. */
  altQuestion: { inverted: boolean } | null;
}

export interface BinaryFinding extends FindingBase {
  type: 'binary';
}

export interface CategoricalFinding extends FindingBase {
  type: 'categorical';
  options: string[];
  /** Distribution over `options` for hypotheses without a link; sums to 1. */
  baseline: number[];
  /** An option that carries no information (e.g. "not measured"), or null. */
  neutralOption: string | null;
}

export type Finding = BinaryFinding | CategoricalFinding;

export interface Cluster {
  id: string;
  /** Within-cluster correlation used to shrink evidence (0..1). */
  rho: number;
}

export interface ComplaintPrior {
  default: number;
  byAge: Record<string, number>;
}

export interface PriorModifier {
  months: number[] | null;
  regions: string[] | null;
  sex: Sex[] | null;
  factor: number;
}

/** Binary link: P(present | condition). Categorical link: distribution aligned to options. */
export type Link = number | number[];

export interface Condition {
  id: string;
  urgency: TriageLevel;
  cantMiss: boolean;
  applicability: Applicability | null;
  /** Keyed by complaint id; a condition is a hypothesis only for complaints listed here. */
  priors: Record<string, ComplaintPrior>;
  priorModifiers: PriorModifier[];
  links: Record<string, Link>;
  /** Per age group: binary link values that replace `links` for that group. */
  linksByAge: Record<string, Record<string, number>>;
  /** Per chief complaint: binary link values that replace `links` (and `linksByAge`) for that complaint. */
  linksByComplaint: Record<string, Record<string, number>>;
  warningSigns: string[];
  specialties: string[];
}

export type RedFlagItem = { group: string } | { finding: string };

export interface Complaint {
  id: string;
  /** Findings automatically answered "present"; never counted as evidence. */
  implies: string[];
  redFlags: RedFlagItem[];
  intake: string[];
  cantMiss: string[];
  safetyNet: string[];
  otherPrior: number | null;
  ageGroups: string[] | null;
  /** False while the complaint's batch is being authored: evaluation can use it, the app does not offer it. */
  released: boolean;
}

export interface QuestionGroup {
  id: string;
  findings: string[];
  allowUnknown: boolean;
  appliesTo: Applicability | null;
  /** All expressions must be true before the group is asked. */
  requires: Expr[];
}

export interface Rule {
  id: string;
  level: TriageLevel;
  when: Expr;
  /** `null` means the rule applies to every complaint. */
  complaints: string[] | null;
  /** Conditions the rule is meant to catch, listed first among those a doctor must rule out. */
  conditions: string[];
}

export interface EngineParams {
  otherPrior: number;
  /** Cumulative P(urgency of "other" <= k) for k = 1..4. */
  otherUrgencyCumulative: [number, number, number, number];
  temperature: number;
  categoricalSmoothing: number;
  /** Probability thresholds for triage levels 1..4. */
  thresholds: [number, number, number, number];
  cantMissThreshold: number;
  elderAgeGroups: string[];
  elderThresholdFactor: number;
  highRiskAgeGroups: string[];
  highRiskFindings: string[];
  screenOnlyAgeGroups: string[];
  selfCareBlockOther: number;
  /** Under-triage weights W(u) for true urgency u = 1..4. */
  underTriageWeights: [number, number, number, number];
  cantMissWeight: number;
  lambdaBeforeStable: number;
  lambdaAfterStable: number;
  /** Weight of information about the urgent group while the level rests on its probability. */
  urgentFocusWeight: number;
  stop: {
    triageChangeProb: number;
    top1Mass: number;
    minEigBits: number;
    minVoi: number;
    maxQuestions: number;
    softMaxQuestions: number;
  };
  /** Urgent (level 1–2) conditions at or above this probability add their warning signs. */
  safetyNetMinProb: number;
  /** Any condition at or above this probability adds its warning signs. */
  safetyNetLikelyProb: number;
  candidateMinProb: number;
  display: { roundTo: number; minShown: number; maxShown: number };
  calibrated: boolean;
}

/** Vietnamese texts for UIs and the CLI. The engine itself never reads them. */
export interface TextBundle {
  findings: Record<
    string,
    {
      label: string;
      question: string;
      questionOther: string | null;
      help: string | null;
      altQuestion: string | null;
      options: Record<string, string>;
    }
  >;
  conditions: Record<
    string,
    {
      name: string;
      officialName: string;
      englishName: string;
      icd10: string | null;
      summary: string[];
      selfCare: string[];
      seeDoctor: string[];
      reviewStatus: string;
    }
  >;
  complaints: Record<string, { label: string; synonyms: string[]; icon: string | null }>;
  groups: Record<string, { title: string; noneLabel: string }>;
  rules: Record<string, { reason: string }>;
  triageLevels: Record<string, { label: string; action: string }>;
  specialties: Record<string, string>;
  ageGroups: Record<string, string>;
  regions: Record<string, string>;
  emergencyScreen: { title: string; noneLabel: string };
}

export interface CompiledKb {
  schemaVersion: 1;
  /** Short content hash; shown on every result for traceability. */
  version: string;
  params: EngineParams;
  ageGroups: AgeGroup[];
  regions: string[];
  findings: Finding[];
  clusters: Cluster[];
  conditions: Condition[];
  complaints: Complaint[];
  groups: QuestionGroup[];
  rules: Rule[];
  emergencyScreen: { items: { findingId: string; level: TriageLevel }[] };
  text: TextBundle;
}
