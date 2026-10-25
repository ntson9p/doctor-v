/**
 * A tiny, hand-built knowledge base for engine tests. Numbers are illustrative, not medical.
 */
import type { BinaryFinding, CategoricalFinding, CompiledKb, Condition, EngineParams } from '../src/index.ts';

export const PARAMS: EngineParams = {
  otherPrior: 0.15,
  otherUrgencyCumulative: [0.01, 0.05, 0.2, 0.5],
  temperature: 1,
  categoricalSmoothing: 0.02,
  thresholds: [0.1, 0.02, 0.1, 0.25],
  cantMissThreshold: 0.01,
  elderAgeGroups: ['elder_75p'],
  elderThresholdFactor: 0.5,
  highRiskAgeGroups: ['infant_0_2m', 'child_2m_5y', 'elder_75p'],
  highRiskFindings: ['pregnant'],
  screenOnlyAgeGroups: ['infant_0_2m'],
  selfCareBlockOther: 0.3,
  underTriageWeights: [49, 49, 9, 3],
  cantMissWeight: 99,
  lambdaBeforeStable: 0.1,
  lambdaAfterStable: 1,
  urgentFocusWeight: 2,
  stop: { triageChangeProb: 0.05, top1Mass: 0.7, minEigBits: 0.05, minVoi: 0.01, maxQuestions: 30, softMaxQuestions: 20 },
  safetyNetMinProb: 0.005,
  safetyNetLikelyProb: 0.1,
  candidateMinProb: 0.0005,
  display: { roundTo: 5, minShown: 5, maxShown: 95 },
  calibrated: false,
};

const binary = (id: string, leak: number, extra: Partial<BinaryFinding> = {}): BinaryFinding => ({
  id,
  type: 'binary',
  leak,
  leakByComplaint: {},
  clusterId: null,
  requires: [],
  appliesTo: null,
  cost: 1,
  unknownRate: 0.1,
  altQuestion: null,
  ...extra,
});

const duration: CategoricalFinding = {
  id: 'duration',
  type: 'categorical',
  options: ['short', 'long'],
  baseline: [0.6, 0.4],
  leak: 0,
  leakByComplaint: {},
  clusterId: null,
  requires: [{ finding: 'fever', is: 'present' }],
  appliesTo: null,
  cost: 1,
  unknownRate: 0.1,
  altQuestion: null,
};

const condition = (c: Partial<Condition> & Pick<Condition, 'id' | 'urgency' | 'priors' | 'links'>): Condition => ({
  cantMiss: false,
  applicability: null,
  priorModifiers: [],
  linksByAge: {},
  warningSigns: [],
  specialties: ['general_medicine'],
  ...c,
});

export function makeKb(overrides: Partial<CompiledKb> = {}): CompiledKb {
  return {
    schemaVersion: 1,
    version: 'test',
    params: PARAMS,
    ageGroups: [
      { id: 'infant_0_2m', minMonths: 0, maxMonths: 2 },
      { id: 'child_2m_5y', minMonths: 2, maxMonths: 60 },
      { id: 'child_5_12', minMonths: 60, maxMonths: 156 },
      { id: 'teen_13_17', minMonths: 156, maxMonths: 216 },
      { id: 'adult_18_44', minMonths: 216, maxMonths: 540 },
      { id: 'adult_45_64', minMonths: 540, maxMonths: 780 },
      { id: 'elder_65_74', minMonths: 780, maxMonths: 900 },
      { id: 'elder_75p', minMonths: 900, maxMonths: null },
    ],
    regions: ['north', 'south'],
    findings: [
      binary('es_collapse', 0.01),
      binary('fever', 0.05),
      binary('neck', 0.01, { altQuestion: { inverted: true } }),
      binary('cough', 0.2, { clusterId: 'resp' }),
      binary('runny', 0.2, { clusterId: 'resp' }),
      binary('rash', 0.05),
      binary('breathless', 0.05),
      duration,
      binary('pregnant', 0.05, { appliesTo: { sex: ['female'], ageGroups: ['adult_18_44'] } }),
    ],
    clusters: [{ id: 'resp', rho: 0.5 }],
    conditions: [
      condition({
        id: 'cold',
        urgency: 5,
        priors: { fever: { default: 0.3, byAge: {} } },
        links: { cough: 0.8, runny: 0.8, neck: 0.005, duration: [0.85, 0.15] },
      }),
      condition({
        id: 'mening',
        urgency: 2,
        cantMiss: true,
        priors: { fever: { default: 0.002, byAge: { child_2m_5y: 0.02 } } },
        links: { neck: 0.8, rash: 0.3, cough: 0.05, duration: [0.7, 0.3] },
        // Neck stiffness is a less reliable sign in small children.
        linksByAge: { child_2m_5y: { neck: 0.5 } },
        warningSigns: ['neck', 'rash'],
        specialties: ['infectious_disease'],
      }),
      condition({
        id: 'measles',
        urgency: 3,
        priors: { fever: { default: 0.02, byAge: {} } },
        links: { rash: 0.95, cough: 0.8, runny: 0.8, duration: [0.4, 0.6] },
        warningSigns: ['breathless'],
        priorModifiers: [
          { months: [1, 2, 3], regions: null, sex: null, factor: 3 },
          { months: null, regions: null, sex: ['female'], factor: 2 },
        ],
      }),
    ],
    complaints: [
      {
        id: 'fever',
        implies: ['fever'],
        redFlags: [{ finding: 'neck' }],
        intake: ['assoc', 'only_with_rash'],
        cantMiss: ['mening'],
        safetyNet: ['neck'],
        otherPrior: null,
        ageGroups: null,
        released: true,
      },
    ],
    groups: [
      { id: 'assoc', findings: ['cough', 'runny', 'rash'], allowUnknown: true, appliesTo: null, requires: [] },
      {
        id: 'only_with_rash',
        findings: ['pregnant'],
        allowUnknown: false,
        appliesTo: null,
        requires: [{ finding: 'rash', is: 'present' }],
      },
    ],
    rules: [
      { id: 'r_neck', level: 2, when: { finding: 'neck', is: 'present' }, complaints: null, conditions: ['mening'] },
      {
        id: 'r_infant',
        level: 3,
        when: { ageGroups: ['infant_0_2m'] },
        complaints: null,
        conditions: [],
      },
    ],
    emergencyScreen: { items: [{ findingId: 'es_collapse', level: 1 }] },
    text: {
      findings: {},
      conditions: {},
      complaints: {},
      groups: {},
      rules: {},
      triageLevels: {},
      specialties: {},
      ageGroups: {},
      regions: {},
      emergencyScreen: { title: '', noneLabel: '' },
    },
    ...overrides,
  };
}

export const ADULT = { ageMonths: 30 * 12, sex: 'male' as const, regionId: null, month: null };
