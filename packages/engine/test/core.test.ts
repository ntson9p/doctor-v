import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { entropyBits, logSumExp, normalizeLog } from '../src/math.ts';
import {
  OTHER,
  analyze,
  computeTriage,
  evalExpr,
  evidenceItems,
  hypothesesFor,
  indexKb,
  pickQuestion,
  posterior,
} from '../src/index.ts';
import type { ExprEnv, PatientContext } from '../src/index.ts';
import { ADULT, PARAMS, makeKb } from './fixture.ts';

const kb = makeKb();
const idx = indexKb(kb);
const implied = new Set(['fever']);

function envFor(answers: Record<string, string>, ctx: PatientContext = ADULT, ageGroup = 'adult_18_44'): ExprEnv {
  return { answers, implied, ctx, ageGroup };
}

function probsFor(answers: Record<string, string>, ctx: PatientContext = ADULT, ageGroup = 'adult_18_44') {
  const hyps = hypothesesFor(idx, 'fever', ctx, ageGroup);
  return { hyps, probs: posterior(idx, hyps, evidenceItems(idx, answers, implied), 'fever') };
}

const prob = (r: ReturnType<typeof probsFor>, id: string): number => r.probs[r.hyps.ids.indexOf(id)] ?? NaN;

describe('math', () => {
  it('computes logSumExp stably', () => {
    expect(logSumExp([1000, 1000])).toBeCloseTo(1000 + Math.log(2), 12);
    expect(logSumExp([-Infinity, -Infinity])).toBe(-Infinity);
  });
  it('normalizes log weights', () => {
    const p = normalizeLog([0, Math.log(3)]);
    expect(p[0]).toBeCloseTo(0.25, 12);
    expect(p[1]).toBeCloseTo(0.75, 12);
  });
  it('computes entropy in bits', () => {
    expect(entropyBits([0.5, 0.5])).toBeCloseTo(1, 12);
    expect(entropyBits([1, 0])).toBe(0);
  });
});

describe('three-valued expressions', () => {
  const env = envFor({ neck: 'unknown', rash: 'present', cough: 'absent' });
  it('treats unasked findings as false and unknown answers as undetermined', () => {
    expect(evalExpr({ finding: 'runny', is: 'present' }, env)).toBe('F');
    expect(evalExpr({ finding: 'neck', is: 'present' }, env)).toBe('U');
    expect(evalExpr({ finding: 'neck', is: 'unknown' }, env)).toBe('T');
    expect(evalExpr({ finding: 'fever', is: 'present' }, env)).toBe('T');
  });
  it('combines with all / any / not', () => {
    expect(evalExpr({ all: [{ finding: 'rash', is: 'present' }, { finding: 'neck', is: 'present' }] }, env)).toBe('U');
    expect(evalExpr({ all: [{ finding: 'cough', is: 'present' }, { finding: 'neck', is: 'present' }] }, env)).toBe('F');
    expect(evalExpr({ any: [{ finding: 'cough', is: 'present' }, { finding: 'neck', is: 'present' }] }, env)).toBe('U');
    expect(evalExpr({ any: [{ finding: 'rash', is: 'present' }, { finding: 'neck', is: 'present' }] }, env)).toBe('T');
    expect(evalExpr({ not: { finding: 'neck', is: 'present' } }, env)).toBe('U');
    expect(evalExpr({ ageYearsGte: 30 }, env)).toBe('T');
    expect(evalExpr({ ageMonthsLt: 3 }, env)).toBe('F');
  });
  it('counts at-least-n, undetermined while unknown answers could still reach n', () => {
    const rash = { finding: 'rash', is: 'present' } as const;
    const fever = { finding: 'fever', is: 'present' } as const;
    const neck = { finding: 'neck', is: 'present' } as const;
    const cough = { finding: 'cough', is: 'present' } as const;
    const runny = { finding: 'runny', is: 'present' } as const;
    expect(evalExpr({ atLeast: 2, of: [rash, fever, neck] }, env)).toBe('T');
    expect(evalExpr({ atLeast: 2, of: [rash, neck, cough] }, env)).toBe('U');
    expect(evalExpr({ atLeast: 2, of: [rash, cough, runny] }, env)).toBe('F');
    expect(evalExpr({ atLeast: 3, of: [rash, neck, cough] }, env)).toBe('F');
    expect(evalExpr({ atLeast: 1, of: [cough, neck] }, env)).toBe('U');
    expect(evalExpr({ atLeast: 2, of: [rash, { any: [cough, fever] }] }, env)).toBe('T');
  });
});

describe('priors and posteriors', () => {
  it('gives OTHER its prior share and normalizes the rest', () => {
    const r = probsFor({});
    expect(prob(r, OTHER)).toBeCloseTo(0.15, 12);
    expect(r.probs.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 12);
    // cold : mening : measles = 0.3 : 0.002 : 0.02 among the remaining 0.85
    expect(prob(r, 'cold')).toBeCloseTo((0.85 * 0.3) / 0.322, 12);
  });
  it('applies age-specific priors and seasonal modifiers', () => {
    const child = { ...ADULT, ageMonths: 24 };
    expect(prob(probsFor({}, child, 'child_2m_5y'), 'mening')).toBeGreaterThan(prob(probsFor({}), 'mening'));
    const winter = { ...ADULT, month: 2 };
    expect(prob(probsFor({}, winter), 'measles')).toBeGreaterThan(prob(probsFor({}), 'measles'));
  });
  it('applies sex-specific prior modifiers', () => {
    const female = { ...ADULT, sex: 'female' as const };
    expect(prob(probsFor({}, female), 'measles')).toBeGreaterThan(prob(probsFor({}), 'measles'));
  });
  it('uses age-specific link overrides', () => {
    const child = { ...ADULT, ageMonths: 24 };
    const adultLinks = hypothesesFor(idx, 'fever', ADULT, 'adult_18_44');
    const childLinks = hypothesesFor(idx, 'fever', child, 'child_2m_5y');
    const at = (h: ReturnType<typeof hypothesesFor>) => h.links[h.ids.indexOf('mening')]?.neck;
    expect(at(adultLinks)).toBe(0.8);
    expect(at(childLinks)).toBe(0.5);
  });
  it('ignores unknown answers and implied findings', () => {
    const base = probsFor({});
    expect(probsFor({ neck: 'unknown', rash: 'unknown' }).probs).toEqual(base.probs);
    expect(probsFor({ fever: 'present' }).probs).toEqual(base.probs);
  });
  it('raises a condition when its typical finding is present and lowers it when absent', () => {
    const base = prob(probsFor({}), 'mening');
    expect(prob(probsFor({ neck: 'present' }), 'mening')).toBeGreaterThan(base);
    expect(prob(probsFor({ neck: 'absent' }), 'mening')).toBeLessThan(base);
  });
  it('shrinks the evidence of correlated findings in a cluster', () => {
    const items = evidenceItems(idx, { cough: 'present', runny: 'present', rash: 'present' }, implied);
    expect(items.find((i) => i.finding.id === 'cough')?.weight).toBeCloseTo(1 / 1.5, 12);
    expect(items.find((i) => i.finding.id === 'rash')?.weight).toBe(1);
  });
  it('does not depend on the order in which answers were given', () => {
    const a = probsFor({ cough: 'present', rash: 'absent', duration: 'long' }).probs;
    const b = probsFor({ duration: 'long', rash: 'absent', cough: 'present' }).probs;
    expect(a).toEqual(b);
  });

  const answerArb = fc.record(
    {
      neck: fc.constantFrom('present', 'absent', 'unknown'),
      cough: fc.constantFrom('present', 'absent', 'unknown'),
      runny: fc.constantFrom('present', 'absent', 'unknown'),
      rash: fc.constantFrom('present', 'absent', 'unknown'),
      duration: fc.constantFrom('short', 'long', 'unknown'),
    },
    { requiredKeys: [] },
  );

  it('always returns finite probabilities that sum to 1 (property)', () => {
    fc.assert(
      fc.property(answerArb, (answers) => {
        const { probs } = probsFor(answers);
        expect(probs.every((p) => Number.isFinite(p) && p > 0 && p < 1)).toBe(true);
        expect(probs.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 10);
      }),
    );
  });

  it('a present finding never lowers the odds of a condition linked above its leak (property)', () => {
    fc.assert(
      fc.property(answerArb, (answers) => {
        const { neck: _neck, ...rest } = answers;
        const without = probsFor(rest);
        const withNeck = probsFor({ ...rest, neck: 'present' });
        const odds = (r: ReturnType<typeof probsFor>): number => prob(r, 'mening') / prob(r, OTHER);
        expect(odds(withNeck)).toBeGreaterThan(odds(without));
      }),
    );
  });
});

describe('triage', () => {
  const triageFor = (answers: Record<string, string>, ctx: PatientContext = ADULT, ageGroup = 'adult_18_44') => {
    const { hyps, probs } = probsFor(answers, ctx, ageGroup);
    return computeTriage({ idx, complaintId: 'fever', env: envFor(answers, ctx, ageGroup), hyps, probs });
  };

  it('sends emergency-screen positives to level 1', () => {
    expect(triageFor({ es_collapse: 'present' }).level).toBe(1);
  });
  it('applies rules, and treats an unknown level-2 danger sign as "possibly present"', () => {
    expect(triageFor({ neck: 'present' }).level).toBe(2);
    expect(triageFor({ neck: 'unknown' }).level).toBe(3);
    const toddler = { ...ADULT, ageMonths: 24 };
    expect(triageFor({ neck: 'unknown' }, toddler, 'child_2m_5y').level).toBe(2);
  });
  it('starts from self-care when nothing urgent is likely', () => {
    expect(triageFor({}).level).toBe(5);
  });
  it('uses the lower threshold for can\'t-miss conditions', () => {
    // P(mening) = 0.95 × 0.004 / 0.324 ≈ 1.2%: below the 2% level-2 threshold even with
    // OTHER's share (≈ 1.4%), but above the 1% can't-miss threshold.
    const kb2 = makeKb({
      params: { ...kb.params, otherPrior: 0.05 },
      conditions: kb.conditions.map((c) => (c.id === 'mening' ? { ...c, priors: { fever: { default: 0.004, byAge: {} } } } : c)),
    });
    const idx2 = indexKb(kb2);
    const hyps = hypothesesFor(idx2, 'fever', ADULT, 'adult_18_44');
    const probs = posterior(idx2, hyps, [], 'fever');
    const t = computeTriage({ idx: idx2, complaintId: 'fever', env: envFor({}), hyps, probs });
    expect(t.level).toBe(2);
    expect(t.reasons[0]).toMatchObject({ kind: 'probability', cantMiss: true });
  });
  it('blocks self-care while OTHER stays likely', () => {
    const kb2 = makeKb({ params: { ...kb.params, otherPrior: 0.35, cantMissThreshold: 0.5, thresholds: [0.9, 0.9, 0.9, 0.9] } });
    const idx2 = indexKb(kb2);
    const hyps = hypothesesFor(idx2, 'fever', ADULT, 'adult_18_44');
    const probs = posterior(idx2, hyps, [], 'fever');
    const t = computeTriage({ idx: idx2, complaintId: 'fever', env: envFor({}), hyps, probs });
    expect(t.level).toBe(4);
    expect(t.reasons.some((r) => r.kind === 'guard_other')).toBe(true);
  });
  it('halves the thresholds for people aged 75 or more', () => {
    const kb2 = makeKb({
      conditions: kb.conditions.map((c) => (c.id === 'mening' ? { ...c, priors: { fever: { default: 0.0025, byAge: {} } } } : c)),
    });
    const idx2 = indexKb(kb2);
    const level = (ctx: PatientContext, ageGroup: string): number => {
      const hyps = hypothesesFor(idx2, 'fever', ctx, ageGroup);
      const probs = posterior(idx2, hyps, [], 'fever');
      return computeTriage({ idx: idx2, complaintId: 'fever', env: envFor({}, ctx, ageGroup), hyps, probs }).level;
    };
    expect(level(ADULT, 'adult_18_44')).toBeGreaterThan(2);
    expect(level({ ...ADULT, ageMonths: 80 * 12 }, 'elder_75p')).toBe(2);
  });
  it('never becomes less urgent when a danger sign is added (property)', () => {
    fc.assert(
      fc.property(
        fc.record({ cough: fc.constantFrom('present', 'absent'), rash: fc.constantFrom('present', 'absent') }),
        (answers) => {
          expect(triageFor({ ...answers, neck: 'present' }).level).toBeLessThanOrEqual(triageFor(answers).level);
        },
      ),
    );
  });
});

describe('question selection', () => {
  // Two danger signs with level-2 rules and no linked condition: one plausible (5%), one very rare (0.1%).
  const base = makeKb();
  const sign = (id: string, leak: number) => ({ ...base.findings.find((f) => f.id === 'rash')!, id, leak });
  const kb2 = makeKb({
    params: { ...PARAMS, stop: { ...PARAMS.stop, minVoi: 0.1 } },
    findings: [...base.findings, sign('bleed', 0.05), sign('hernia', 0.001)],
    rules: [
      ...base.rules,
      { id: 'r_bleed', level: 2, when: { finding: 'bleed', is: 'present' }, complaints: null },
      { id: 'r_hernia', level: 2, when: { finding: 'hernia', is: 'present' }, complaints: null },
    ],
  });
  const idx2 = indexKb(kb2);
  const answers = { cough: 'present', runny: 'present', rash: 'absent', neck: 'absent', duration: 'short' };
  const env: ExprEnv = { answers, implied, ctx: ADULT, ageGroup: 'adult_18_44' };
  const hyps = hypothesesFor(idx2, 'fever', ADULT, 'adult_18_44');
  const analysis = analyze({ idx: idx2, complaintId: 'fever', ctx: ADULT, env, hyps });
  const score = (id: string) => analysis.scores.find((s) => s.findingId === id);

  it('does not treat a possible "unknown" answer as instability', () => {
    // Before the fix every danger sign had changeProb >= unknown_rate (0.1).
    expect(score('hernia')?.changeProb).toBeLessThan(0.01);
  });
  it('values a danger sign by the rule it can trigger, minus the cost of an "unknown" answer', () => {
    expect(score('bleed')?.voi).toBeGreaterThan(0.5);
    expect(score('hernia')?.voi).toBeLessThan(0.1);
    expect(pickQuestion(idx2, analysis)?.findingId).toBe('bleed');
  });
});
