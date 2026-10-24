import { createHash } from 'node:crypto';
import type {
  Applicability,
  CompiledKb,
  Complaint,
  Condition,
  EngineParams,
  Expr,
  Finding,
  TextBundle,
  TriageLevel,
} from '@doctor-v/engine';
import type { RawKnowledge } from './load.ts';
import type { ApplicabilityYaml, ExprYaml } from './schema.ts';

export function convertExpr(e: ExprYaml): Expr {
  if ('all' in e) return { all: e.all.map(convertExpr) };
  if ('any' in e) return { any: e.any.map(convertExpr) };
  if ('not' in e) return { not: convertExpr(e.not) };
  if ('finding' in e) return 'is' in e ? { finding: e.finding, is: e.is } : { finding: e.finding, in: [...e.in] };
  if ('age_groups' in e) return { ageGroups: [...e.age_groups] };
  if ('age_months_lt' in e) return { ageMonthsLt: e.age_months_lt };
  if ('age_years_gte' in e) return { ageYearsGte: e.age_years_gte };
  return { sex: e.sex };
}

function convertApplicability(a: ApplicabilityYaml | undefined): Applicability | null {
  if (a === undefined) return null;
  return { sex: a.sex ? [...a.sex] : null, ageGroups: a.age_groups ? [...a.age_groups] : null };
}

function normalize(values: number[]): number[] {
  const sum = values.reduce((a, b) => a + b, 0);
  return sum > 0 ? values.map((v) => v / sum) : values.map(() => 1 / values.length);
}

const asLevel = (n: number): TriageLevel => n as TriageLevel;

/** Compiles validated knowledge into the engine model. Call only when validation has no errors. */
export function compileKnowledge(k: RawKnowledge): CompiledKb {
  const p = k.params.data;
  const leakValue = (leak: number | 'specific' | 'moderate' | 'nonspecific'): number =>
    Math.max(p.leak_floor, typeof leak === 'number' ? leak : p.leak_levels[leak]);

  const params: EngineParams = {
    otherPrior: p.other_prior,
    otherUrgencyCumulative: [...p.other_urgency_cumulative],
    temperature: p.temperature,
    categoricalSmoothing: p.categorical_smoothing,
    thresholds: [...p.thresholds],
    cantMissThreshold: p.cant_miss_threshold,
    elderAgeGroups: [...p.elder_age_groups],
    elderThresholdFactor: p.elder_threshold_factor,
    highRiskAgeGroups: [...p.high_risk_age_groups],
    highRiskFindings: [...p.high_risk_findings],
    screenOnlyAgeGroups: [...p.screen_only_age_groups],
    selfCareBlockOther: p.self_care_block_other,
    underTriageWeights: [...p.under_triage_weights],
    cantMissWeight: p.cant_miss_weight,
    lambdaBeforeStable: p.lambda_before_stable,
    lambdaAfterStable: p.lambda_after_stable,
    stop: {
      triageChangeProb: p.stop.triage_change_prob,
      top1Mass: p.stop.top1_mass,
      minEigBits: p.stop.min_eig_bits,
      minVoi: p.stop.min_voi,
      maxQuestions: p.stop.max_questions,
      softMaxQuestions: p.stop.soft_max_questions,
    },
    safetyNetMinProb: p.safety_net_min_prob,
    safetyNetLikelyProb: p.safety_net_likely_prob,
    candidateMinProb: p.candidate_min_prob,
    display: {
      roundTo: p.display.round_to,
      minShown: p.display.min_shown,
      maxShown: p.display.max_shown,
    },
    calibrated: p.calibrated,
  };

  const clusterRho = new Map(k.clusters.data.map((c) => [c.id, p.cluster_rho[c.rho]]));

  const findings: Finding[] = k.findings.map(({ data: f }) => {
    const common = {
      id: f.id,
      clusterId: f.cluster ?? null,
      requires: (f.requires ?? []).map(convertExpr),
      appliesTo: convertApplicability(f.applies_to),
      cost: f.cost ?? 1,
      unknownRate: f.unknown_rate ?? p.default_unknown_rate,
      altQuestion: f.alt_question ? { inverted: f.alt_question.inverted ?? false } : null,
    };
    if (f.type === 'binary') {
      const leakByComplaint: Record<string, number> = {};
      for (const [complaintId, leak] of Object.entries(f.leak_by_complaint ?? {})) {
        leakByComplaint[complaintId] = leakValue(leak);
      }
      return { ...common, type: 'binary', leak: leakValue(f.leak), leakByComplaint };
    }
    const options = f.options.map((o) => o.id);
    const baseline = f.baseline
      ? normalize(options.map((o) => f.baseline?.[o] ?? 0))
      : options.map(() => 1 / options.length);
    // Categorical findings carry no leak; the baseline distribution plays that role.
    return { ...common, type: 'categorical', options, baseline, leak: 0, leakByComplaint: {} };
  });
  const findingById = new Map(findings.map((f) => [f.id, f]));

  const conditions: Condition[] = k.conditions.map(({ data: c }) => {
    const priors: Condition['priors'] = {};
    for (const entry of c.priors) {
      const byAge: Record<string, number> = {};
      for (const [ageGroup, level] of Object.entries(entry.by_age ?? {})) byAge[ageGroup] = p.prior_levels[level];
      priors[entry.complaint] = { default: p.prior_levels[entry.default], byAge };
    }
    const links: Condition['links'] = {};
    const linksByAge: Condition['linksByAge'] = {};
    for (const link of c.findings) {
      if ('freq' in link) {
        links[link.finding] = p.frequency_levels[link.freq];
        for (const [ageGroup, level] of Object.entries(link.freq_by_age ?? {})) {
          linksByAge[ageGroup] = { ...linksByAge[ageGroup], [link.finding]: p.frequency_levels[level] };
        }
      } else {
        const f = findingById.get(link.finding);
        const options = f?.type === 'categorical' ? f.options : Object.keys(link.dist);
        links[link.finding] = normalize(options.map((o) => link.dist[o] ?? 0));
      }
    }
    return {
      id: c.id,
      urgency: asLevel(c.urgency),
      cantMiss: c.cant_miss,
      applicability: convertApplicability(c.applicability),
      priors,
      priorModifiers: (c.prior_modifiers ?? []).map((m) => ({
        months: m.when.months ? [...m.when.months] : null,
        regions: m.when.regions ? [...m.when.regions] : null,
        sex: m.when.sex ? [...m.when.sex] : null,
        factor: m.factor,
      })),
      links,
      linksByAge,
      warningSigns: [...(c.warning_signs ?? [])],
      specialties: [...c.specialties],
    };
  });

  const complaints: Complaint[] = k.complaints.map(({ data: c }) => ({
    id: c.id,
    implies: [...c.implies],
    redFlags: c.red_flags.map((rf) => ('group' in rf ? { group: rf.group } : { finding: rf.finding })),
    intake: [...c.intake],
    cantMiss: [...c.cant_miss],
    safetyNet: [...c.safety_net],
    otherPrior: c.other_prior ?? null,
    ageGroups: c.age_groups ? [...c.age_groups] : null,
  }));

  const text: TextBundle = {
    findings: {},
    conditions: {},
    complaints: {},
    groups: {},
    rules: {},
    triageLevels: {},
    specialties: {},
    ageGroups: {},
    regions: {},
    emergencyScreen: {
      title: k.emergencyScreen.data.title_vi,
      noneLabel: k.emergencyScreen.data.none_label_vi,
    },
  };
  for (const { data: f } of k.findings) {
    text.findings[f.id] = {
      label: f.label_vi,
      question: f.question_vi,
      questionOther: f.question_other_vi ?? null,
      help: f.help_vi ?? null,
      altQuestion: f.alt_question?.text_vi ?? null,
      options: f.type === 'categorical' ? Object.fromEntries(f.options.map((o) => [o.id, o.label_vi])) : {},
    };
  }
  for (const { data: c } of k.conditions) {
    text.conditions[c.id] = {
      name: c.names.vi_common?.[0] ?? c.names.vi,
      officialName: c.names.vi,
      englishName: c.names.en,
      icd10: c.codes.icd10 ?? null,
      summary: [...c.summary_vi],
      selfCare: [...(c.self_care_vi ?? [])],
      seeDoctor: [...(c.see_doctor_vi ?? [])],
      reviewStatus: c.review.status,
    };
  }
  for (const { data: c } of k.complaints) {
    text.complaints[c.id] = { label: c.label_vi, synonyms: [...c.synonyms_vi], icon: c.icon ?? null };
  }
  for (const g of k.groups.data) text.groups[g.id] = { title: g.title_vi, noneLabel: g.none_label_vi };
  for (const r of k.rules.data) text.rules[r.id] = { reason: r.reason_vi };
  for (const t of k.triageLevels.data) text.triageLevels[String(t.level)] = { label: t.label_vi, action: t.action_vi };
  for (const s of k.specialties.data) text.specialties[s.id] = s.label_vi;
  for (const a of k.ageGroups.data) text.ageGroups[a.id] = a.label_vi;
  for (const r of k.regions.data) text.regions[r.id] = r.label_vi;

  const withoutVersion: Omit<CompiledKb, 'version'> = {
    schemaVersion: 1,
    params,
    ageGroups: [...k.ageGroups.data]
      .sort((a, b) => a.min_months - b.min_months)
      .map((a) => ({ id: a.id, minMonths: a.min_months, maxMonths: a.max_months })),
    regions: k.regions.data.map((r) => r.id),
    findings,
    clusters: k.clusters.data.map((c) => ({ id: c.id, rho: clusterRho.get(c.id) ?? 0 })),
    conditions,
    complaints,
    groups: k.groups.data.map((g) => ({
      id: g.id,
      findings: [...g.findings],
      allowUnknown: g.allow_unknown ?? false,
      appliesTo: convertApplicability(g.applies_to),
      requires: (g.requires ?? []).map(convertExpr),
    })),
    rules: k.rules.data.map((r) => ({
      id: r.id,
      level: asLevel(r.level),
      when: convertExpr(r.when),
      complaints: r.complaints ? [...r.complaints] : null,
    })),
    emergencyScreen: {
      items: k.emergencyScreen.data.items.map((i) => ({ findingId: i.finding, level: asLevel(i.level) })),
    },
    text,
  };
  const version = createHash('sha256').update(JSON.stringify(withoutVersion)).digest('hex').slice(0, 12);
  return { ...withoutVersion, version };
}
