import { describe, expect, it } from 'vitest';
import { ADULT, makeKb } from '../../packages/engine/test/fixture.ts';
import { computeMetrics, ece, rng, runVignette, trueValue } from '../src/index.ts';
import type { Vignette } from '../src/index.ts';

const kb = makeKb();

const vignette = (id: string, answers: Record<string, string>, condition: string, triage: number): Vignette => ({
  id,
  set: 'dev',
  title_vi: id,
  narrative_vi: id,
  patient: { age_years: ADULT.ageMonths / 12, sex: 'male' },
  complaint: 'fever',
  answers,
  expected: { condition, triage },
  source: { basis: 'test' },
  author: 'test',
});

describe('simulated patient', () => {
  it('runs a full session and ranks the gold condition', () => {
    const run = runVignette(kb, vignette('cold-1', { cough: 'present', runny: 'present', duration: 'short' }, 'cold', 5));
    expect(run.rank).toBe(1);
    expect(run.triage).toBeGreaterThanOrEqual(4);
    expect(run.stopReason).not.toBeNull();
  });

  it('answers the emergency screen from the vignette and stops on emergencies', () => {
    const run = runVignette(kb, vignette('collapse', { es_collapse: 'present' }, 'mening', 1));
    expect(run.triage).toBe(1);
    expect(run.stopReason).toBe('emergency');
  });

  it('answers "unknown" for unmentioned findings that most people have', () => {
    const kb2 = makeKb({
      findings: [
        ...kb.findings,
        {
          id: 'vaccinated',
          type: 'binary',
          leak: 0.85,
          leakByComplaint: {},
          clusterId: null,
          requires: [],
          appliesTo: null,
          cost: 1,
          unknownRate: 0.1,
          altQuestion: null,
        },
      ],
    });
    const f = kb2.findings.find((x) => x.id === 'vaccinated');
    const v = vignette('vacc', {}, 'cold', 5);
    expect(f && trueValue(f, v)).toBe('unknown');
    const cough = kb2.findings.find((x) => x.id === 'cough');
    expect(cough && trueValue(cough, v)).toBe('absent');
  });

  it('is reproducible with noise', () => {
    const v = vignette('mening-1', { neck: 'present', rash: 'present' }, 'mening', 2);
    expect(runVignette(kb, v, { noise: 0.5, seed: 3 })).toEqual(runVignette(kb, v, { noise: 0.5, seed: 3 }));
  });
});

describe('metrics', () => {
  it('computes rates and calibration', () => {
    const runs = [
      runVignette(kb, vignette('a', { cough: 'present', runny: 'present' }, 'cold', 5)),
      runVignette(kb, vignette('b', { neck: 'present' }, 'mening', 2)),
      runVignette(kb, vignette('c', { rash: 'present', cough: 'present', runny: 'present' }, 'measles', 3)),
    ];
    const m = computeMetrics(runs);
    expect(m.cases).toBe(3);
    expect(m.emergencyUnderTriage).toMatchObject({ count: 0, of: 1 });
    expect(m.top3.rate).toBeGreaterThan(0);
    expect(m.brier).toBeGreaterThanOrEqual(0);
  });

  it('computes ECE on equal-width bins', () => {
    expect(ece([{ p: 0.9, correct: true }, { p: 0.9, correct: false }])).toBeCloseTo(0.4, 12);
    expect(ece([{ p: 0.25, correct: false }, { p: 0.25, correct: false }, { p: 0.25, correct: false }, { p: 0.25, correct: true }])).toBeCloseTo(0, 12);
  });

  it('has a deterministic PRNG', () => {
    const a = rng(42);
    const b = rng(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
});
