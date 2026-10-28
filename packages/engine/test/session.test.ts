import { describe, expect, it } from 'vitest';
import {
  answerStep,
  currentAnswers,
  displayPercent,
  goBack,
  groupResponse,
  nextStep,
  sessionResult,
  startSession,
  stopEarly,
} from '../src/index.ts';
import type { AskStep, SessionState, Step } from '../src/index.ts';
import { ADULT, PARAMS, makeKb } from './fixture.ts';

const kb = makeKb();

function ask(step: Step): AskStep {
  if (step.kind === 'done') throw new Error(`Session ended early: ${step.reason}`);
  return step;
}

/** Answers every question from a fixed table (absent / unknown when missing); returns the final state. */
function runToEnd(state: SessionState, table: Record<string, string>): SessionState {
  const fallback = (id: string): string => (kb.findings.find((f) => f.id === id)?.type === 'categorical' ? 'unknown' : 'absent');
  let s = state;
  for (let i = 0; i < 50; i++) {
    const step = nextStep(kb, s);
    if (step.kind === 'done') return s;
    const ids = step.kind === 'finding' ? [step.findingId] : step.findingIds;
    s = answerStep(kb, s, step, Object.fromEntries(ids.map((id) => [id, table[id] ?? fallback(id)])));
  }
  throw new Error('Session did not end');
}

describe('session flow', () => {
  it('asks the emergency screen first, then mandatory red flags, then intake groups', () => {
    let s = startSession(kb, 'fever', ADULT);
    const screen = ask(nextStep(kb, s));
    expect(screen).toMatchObject({ kind: 'group', groupId: null, phase: 'screen' });
    s = answerStep(kb, s, screen, groupResponse(screen, []));

    const redFlag = ask(nextStep(kb, s));
    expect(redFlag).toMatchObject({ kind: 'finding', findingId: 'neck', phase: 'red_flags' });
    s = answerStep(kb, s, redFlag, { neck: 'absent' });

    const intake = ask(nextStep(kb, s));
    expect(intake).toMatchObject({ kind: 'group', groupId: 'assoc', phase: 'intake' });
    expect(intake.kind === 'group' && intake.findingIds).toEqual(['cough', 'runny', 'rash']);
  });

  it('stops at once with "emergency" when a level 1–2 rule applies, listing urgent conditions only', () => {
    let s = startSession(kb, 'fever', ADULT, { es_collapse: 'absent' });
    s = answerStep(kb, s, ask(nextStep(kb, s)), { neck: 'present' });
    expect(nextStep(kb, s)).toEqual({ kind: 'done', reason: 'emergency' });
    const result = sessionResult(kb, s);
    expect(result.triage.level).toBe(2);
    expect(result.emergencyStop).toBe(true);
    expect(result.urgentConditions).toEqual(['mening']);
  });

  it('keeps the condition named by the rule that set the level, even when a broader rule names a likelier one', () => {
    const base = kb.conditions.find((c) => c.id === 'mening');
    if (!base) throw new Error('fixture has no meningitis');
    const urgent = (id: string, urgency: 1 | 2, prior: number): typeof base => ({
      ...base,
      id,
      urgency,
      cantMiss: false,
      priors: { fever: { default: prior, byAge: {} } },
      links: { neck: 0.5, rash: 0.5 },
      linksByAge: {},
      warningSigns: [],
    });
    const kb2 = makeKb({
      conditions: [...kb.conditions, urgent('sepsis', 1, 0.05), urgent('enceph', 2, 0.04), urgent('rare', 1, 0.0005)],
      rules: [
        ...kb.rules,
        { id: 'r_neck_rash', level: 1, when: { all: [{ finding: 'neck', is: 'present' }, { finding: 'rash', is: 'present' }] }, complaints: null, conditions: ['rare'] },
      ],
    });
    let s = startSession(kb2, 'fever', ADULT, { es_collapse: 'absent' });
    s = answerStep(kb2, s, ask(nextStep(kb2, s)), { neck: 'present' });
    s = answerStep(kb2, s, ask(nextStep(kb2, s)), { rash: 'present' });
    const result = sessionResult(kb2, s);
    expect(result.triage.level).toBe(1);
    // Meningitis, named by the level 2 rule, is likelier than the rare condition but no longer takes its place.
    expect(result.urgentConditions).toEqual(['sepsis', 'enceph', 'rare']);
  });

  it('at level 2, also asks a level 1 rule two signs away, the less likely sign first, within a limit', () => {
    const twoAway = {
      id: 'r_three',
      level: 1 as const,
      when: { all: [{ finding: 'neck', is: 'present' as const }, { finding: 'rash', is: 'present' as const }, { finding: 'breathless', is: 'present' as const }] },
      complaints: null,
      conditions: [],
    };
    const kb2 = makeKb({ rules: [...kb.rules, twoAway] });
    let s = startSession(kb2, 'fever', ADULT, { es_collapse: 'absent' });
    s = answerStep(kb2, s, ask(nextStep(kb2, s)), { neck: 'present' });
    // Breathlessness is less likely than a rash here, so it is asked first.
    const first = ask(nextStep(kb2, s));
    expect(first).toMatchObject({ kind: 'finding', findingId: 'breathless', phase: 'escalation' });
    const ended = answerStep(kb2, s, first, { breathless: 'absent' });
    expect(nextStep(kb2, ended)).toEqual({ kind: 'done', reason: 'emergency' });
    const second = answerStep(kb2, s, first, { breathless: 'present' });
    expect(ask(nextStep(kb2, second))).toMatchObject({ findingId: 'rash', phase: 'escalation' });
    // No such question once the limit is reached.
    const kb3 = makeKb({ rules: [...kb.rules, twoAway], params: { ...PARAMS, stop: { ...PARAMS.stop, maxEscalationQuestions: 0 } } });
    let t = startSession(kb3, 'fever', ADULT, { es_collapse: 'absent' });
    t = answerStep(kb3, t, ask(nextStep(kb3, t)), { neck: 'present' });
    expect(nextStep(kb3, t)).toEqual({ kind: 'done', reason: 'emergency' });
  });

  it('at level 2, asks the open signs that could raise it to level 1 before stopping', () => {
    const kb2 = makeKb({
      rules: [
        ...kb.rules,
        { id: 'r_neck_rash', level: 1, when: { all: [{ finding: 'neck', is: 'present' }, { finding: 'rash', is: 'present' }] }, complaints: null, conditions: [] },
      ],
    });
    let s = startSession(kb2, 'fever', ADULT, { es_collapse: 'absent' });
    s = answerStep(kb2, s, ask(nextStep(kb2, s)), { neck: 'present' });
    const escalation = ask(nextStep(kb2, s));
    expect(escalation).toMatchObject({ kind: 'finding', findingId: 'rash', phase: 'escalation' });
    const raised = answerStep(kb2, s, escalation, { rash: 'present' });
    expect(nextStep(kb2, raised)).toEqual({ kind: 'done', reason: 'emergency' });
    expect(sessionResult(kb2, raised).triage.level).toBe(1);
    const notRaised = answerStep(kb2, s, escalation, { rash: 'absent' });
    expect(nextStep(kb2, notRaised)).toEqual({ kind: 'done', reason: 'emergency' });
    expect(sessionResult(kb2, notRaised).triage.level).toBe(2);
  });

  it('asks an unknown danger sign again with the alternative wording, inverting the answer', () => {
    let s = startSession(kb, 'fever', ADULT, { es_collapse: 'absent' });
    s = answerStep(kb, s, ask(nextStep(kb, s)), { neck: 'unknown' });
    const alt = ask(nextStep(kb, s));
    expect(alt).toMatchObject({ kind: 'finding', findingId: 'neck', alt: true });
    // "Có" to "Can you touch your chest with your chin?" means no neck stiffness.
    s = answerStep(kb, s, alt, { neck: 'present' });
    expect(currentAnswers(s).neck).toBe('absent');
    expect(nextStep(kb, s)).toMatchObject({ kind: 'group', groupId: 'assoc' });
  });

  it('only screens danger signs for young infants', () => {
    const infant = { ...ADULT, ageMonths: 1 };
    const s = runToEnd(startSession(kb, 'fever', infant), {});
    expect(nextStep(kb, s)).toEqual({ kind: 'done', reason: 'screen_only' });
    const result = sessionResult(kb, s);
    expect(result.rankingSuppressed).toBe(true);
    expect(result.triage.level).toBeLessThanOrEqual(3);
  });

  it('ends, never repeats a question, and is deterministic', () => {
    const table = { cough: 'present', runny: 'present', duration: 'short' };
    const a = runToEnd(startSession(kb, 'fever', ADULT), table);
    const b = runToEnd(startSession(kb, 'fever', ADULT), table);
    const asked = a.history.flatMap((h) => Object.keys(h.answers));
    expect(new Set(asked).size).toBe(asked.length);
    expect(sessionResult(kb, a)).toEqual(sessionResult(kb, b));
    expect(sessionResult(kb, a).conditions[0]?.conditionId).toBe('cold');
  });

  it('asks a group only when its condition holds', () => {
    const woman = { ...ADULT, sex: 'female' as const };
    const askedGroup = (s: SessionState): boolean =>
      s.history.some((h) => h.step.kind === 'group' && h.step.groupId === 'only_with_rash');
    expect(askedGroup(runToEnd(startSession(kb, 'fever', woman), { rash: 'present' }))).toBe(true);
    expect(askedGroup(runToEnd(startSession(kb, 'fever', woman), {}))).toBe(false);
  });

  it('goes back by dropping the last step', () => {
    let s = startSession(kb, 'fever', ADULT, { es_collapse: 'absent' });
    const before = s;
    s = answerStep(kb, s, ask(nextStep(kb, s)), { neck: 'absent' });
    expect(goBack(s)).toEqual(before);
  });

  it('still asks mandatory red flags after an early stop, and then never recommends self-care', () => {
    let s = stopEarly(startSession(kb, 'fever', ADULT, { es_collapse: 'absent' }));
    expect(nextStep(kb, s)).toMatchObject({ kind: 'finding', findingId: 'neck' });
    s = answerStep(kb, s, ask(nextStep(kb, s)), { neck: 'absent' });
    const intake = ask(nextStep(kb, s));
    s = answerStep(kb, s, intake, groupResponse(intake, ['cough', 'runny']));
    expect(nextStep(kb, s)).toEqual({ kind: 'done', reason: 'stopped_by_user' });
    const result = sessionResult(kb, s);
    expect(result.triage.level).toBe(4);
    expect(result.triage.reasons.some((r) => r.kind === 'guard_early_stop')).toBe(true);
  });

  it('rejects answers that do not belong to the step', () => {
    const s = startSession(kb, 'fever', ADULT, { es_collapse: 'absent' });
    const step = ask(nextStep(kb, s));
    expect(() => answerStep(kb, s, step, { cough: 'present' })).toThrow();
    expect(() => answerStep(kb, s, step, { neck: 'maybe' })).toThrow();
  });
});

describe('result', () => {
  it('rounds display percentages and never shows 0% or 100%', () => {
    expect(displayPercent(0.024, PARAMS.display)).toEqual({ kind: 'below', percent: 5 });
    expect(displayPercent(0.026, PARAMS.display)).toEqual({ kind: 'about', percent: 5 });
    expect(displayPercent(0.648, PARAMS.display)).toEqual({ kind: 'about', percent: 65 });
    expect(displayPercent(0.999, PARAMS.display)).toEqual({ kind: 'about', percent: 95 });
  });

  it('explains the ranking with the answers that raised or lowered each condition', () => {
    const s = runToEnd(startSession(kb, 'fever', ADULT), { cough: 'present', runny: 'present' });
    const result = sessionResult(kb, s);
    const cold = result.conditions.find((c) => c.conditionId === 'cold');
    expect(cold?.supporting.map((c) => c.findingId)).toContain('cough');
    expect(result.conditions.find((c) => c.conditionId === 'measles')?.opposing.map((c) => c.findingId)).toContain('rash');
    expect(result.kbVersion).toBe('test');
  });

  it('adds warning signs of likely conditions even when they are not urgent', () => {
    const s = runToEnd(startSession(kb, 'fever', ADULT), { rash: 'present', cough: 'present', runny: 'present' });
    const result = sessionResult(kb, s);
    expect(result.conditions[0]?.conditionId).toBe('measles');
    expect(result.safetyNet).toContain('breathless');
  });

  it('adds warning signs of urgent conditions that are still possible to the safety net', () => {
    // A toddler has a higher meningitis prior (≈ 5% here), so its warning signs are listed.
    const toddler = { ...ADULT, ageMonths: 24 };
    const s = startSession(kb, 'fever', toddler, { es_collapse: 'absent' });
    const result = sessionResult(kb, s);
    expect(result.safetyNet).toEqual(['neck', 'rash']);
    expect(result.specialties[0]).toBe('emergency');
    expect(result.specialties).toContain('pediatrics');
  });
});
