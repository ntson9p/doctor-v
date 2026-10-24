/**
 * Question flow of one check (docs/engine-spec.md §2). The state is an immutable value;
 * every function returns a new state, so "back" is simply dropping the last step.
 */
import { ageGroupOf, isApplicable } from './context.ts';
import type { PatientContext } from './context.ts';
import { evalExpr } from './expr.ts';
import type { ExprEnv } from './expr.ts';
import { indexKb } from './kb-index.ts';
import type { EngineIndex } from './kb-index.ts';
import { UNKNOWN } from './model.ts';
import type { CompiledKb, Complaint, QuestionGroup } from './model.ts';
import { evidenceItems, hypothesesFor, posterior } from './posterior.ts';
import { analyze, isConfident, pickQuestion } from './selection.ts';
import { computeTriage } from './triage.ts';

export type Phase = 'screen' | 'red_flags' | 'intake' | 'adaptive';

export type AskStep =
  | { kind: 'finding'; findingId: string; phase: Phase; alt: boolean }
  /** `groupId` is null for the emergency screen. */
  | { kind: 'group'; groupId: string | null; findingIds: string[]; phase: Phase; allowUnknown: boolean };

export type StopReason =
  | 'emergency'
  | 'screen_only'
  | 'confident'
  | 'no_more_questions'
  | 'max_questions'
  | 'stopped_by_user';

export type Step = AskStep | { kind: 'done'; reason: StopReason };

export interface AnsweredStep {
  step: AskStep;
  /** Stored finding values (already un-inverted for alternative questions). */
  answers: Readonly<Record<string, string>>;
}

export interface SessionState {
  complaintId: string;
  ctx: PatientContext;
  /** Answers collected before the session started (emergency screen, demographics). */
  initial: Readonly<Record<string, string>>;
  history: readonly AnsweredStep[];
  stoppedByUser: boolean;
}

function complaintOf(idx: EngineIndex, id: string): Complaint {
  const complaint = idx.complaintById.get(id);
  if (!complaint) throw new Error(`Unknown complaint "${id}"`);
  return complaint;
}

function assertValue(idx: EngineIndex, findingId: string, value: string): void {
  const f = idx.findingById.get(findingId);
  if (!f) throw new Error(`Unknown finding "${findingId}"`);
  const ok =
    value === UNKNOWN || (f.type === 'binary' ? value === 'present' || value === 'absent' : f.options.includes(value));
  if (!ok) throw new Error(`Invalid value "${value}" for finding "${findingId}"`);
}

export function startSession(
  kb: CompiledKb,
  complaintId: string,
  ctx: PatientContext,
  initial: Readonly<Record<string, string>> = {},
): SessionState {
  const idx = indexKb(kb);
  const complaint = complaintOf(idx, complaintId);
  const ageGroup = ageGroupOf(kb.ageGroups, ctx.ageMonths);
  if (complaint.ageGroups !== null && !complaint.ageGroups.includes(ageGroup)) {
    throw new Error(`Complaint "${complaintId}" does not apply to age group "${ageGroup}"`);
  }
  for (const [id, value] of Object.entries(initial)) assertValue(idx, id, value);
  return { complaintId, ctx, initial: { ...initial }, history: [], stoppedByUser: false };
}

export function currentAnswers(state: SessionState): Record<string, string> {
  const out: Record<string, string> = { ...state.initial };
  for (const h of state.history) Object.assign(out, h.answers);
  return out;
}

export function envOf(kb: CompiledKb, state: SessionState): ExprEnv {
  const idx = indexKb(kb);
  return {
    answers: currentAnswers(state),
    implied: new Set(complaintOf(idx, state.complaintId).implies),
    ctx: state.ctx,
    ageGroup: ageGroupOf(kb.ageGroups, state.ctx.ageMonths),
  };
}

/** The emergency screen as a step (also usable by UIs before a session starts). */
export function emergencyScreenStep(kb: CompiledKb): AskStep {
  return {
    kind: 'group',
    groupId: null,
    findingIds: kb.emergencyScreen.items.map((i) => i.findingId),
    phase: 'screen',
    allowUnknown: false,
  };
}

export function nextStep(kb: CompiledKb, state: SessionState): Step {
  const idx = indexKb(kb);
  const params = kb.params;
  const complaint = complaintOf(idx, state.complaintId);
  const env = envOf(kb, state);
  const { answers, ageGroup } = env;
  const isOpen = (id: string): boolean => answers[id] === undefined && !env.implied.has(id);
  const askable = (id: string): boolean => {
    const f = idx.findingById.get(id);
    return f !== undefined && isApplicable(f.appliesTo, state.ctx, ageGroup) && f.requires.every((e) => evalExpr(e, env) === 'T');
  };
  const groupStep = (g: QuestionGroup | undefined, phase: Phase): AskStep | null => {
    if (!g || !isApplicable(g.appliesTo, state.ctx, ageGroup)) return null;
    if (!g.requires.every((e) => evalExpr(e, env) === 'T')) return null;
    const open = g.findings.filter((id) => isOpen(id) && askable(id));
    return open.length > 0 ? { kind: 'group', groupId: g.id, findingIds: open, phase, allowUnknown: g.allowUnknown } : null;
  };

  // 1. Emergency screen, always first.
  const screenOpen = kb.emergencyScreen.items.map((i) => i.findingId).filter(isOpen);
  if (screenOpen.length > 0) {
    return { kind: 'group', groupId: null, findingIds: screenOpen, phase: 'screen', allowUnknown: false };
  }

  // 2. Stop at once when a danger rule already demands emergency care.
  const hyps = hypothesesFor(idx, state.complaintId, state.ctx, ageGroup);
  const probs = posterior(idx, hyps, evidenceItems(idx, answers, env.implied), state.complaintId);
  const triage = computeTriage({ idx, complaintId: state.complaintId, env, hyps, probs });
  if (triage.reasons.some((r) => (r.kind === 'rule' || r.kind === 'emergency_screen') && r.level <= 2)) {
    return { kind: 'done', reason: 'emergency' };
  }

  // 3. Mandatory red flags, in the order the complaint lists them.
  for (const item of complaint.redFlags) {
    if ('group' in item) {
      const step = groupStep(idx.groupById.get(item.group), 'red_flags');
      if (step) return step;
    } else if (isOpen(item.finding) && askable(item.finding)) {
      return { kind: 'finding', findingId: item.finding, phase: 'red_flags', alt: false };
    }
  }

  // 4. Danger signs answered "unknown": ask once more with the alternative wording.
  const altAsked = new Set(
    state.history.flatMap((h) => (h.step.kind === 'finding' && h.step.alt ? [h.step.findingId] : [])),
  );
  for (const id of idx.redFlagFindingsFor(state.complaintId)) {
    const f = idx.findingById.get(id);
    if (f?.altQuestion && answers[id] === UNKNOWN && !altAsked.has(id)) {
      return { kind: 'finding', findingId: id, phase: 'red_flags', alt: true };
    }
  }

  // 5. Intake groups (associated symptoms, chronic conditions).
  for (const groupId of complaint.intake) {
    const step = groupStep(idx.groupById.get(groupId), 'intake');
    if (step) return step;
  }

  // 6. Young infants: danger-sign screening only, no ranking of conditions.
  if (params.screenOnlyAgeGroups.includes(ageGroup)) return { kind: 'done', reason: 'screen_only' };
  if (state.stoppedByUser) return { kind: 'done', reason: 'stopped_by_user' };
  if (state.history.length >= params.stop.maxQuestions) return { kind: 'done', reason: 'max_questions' };

  // 7. Adaptive questions.
  const analysis = analyze({ idx, complaintId: state.complaintId, ctx: state.ctx, env, hyps });
  if (analysis.scores.length === 0) return { kind: 'done', reason: 'no_more_questions' };
  if (isConfident(idx, analysis)) return { kind: 'done', reason: 'confident' };
  const best = pickQuestion(idx, analysis);
  if (!best) return { kind: 'done', reason: 'no_more_questions' };
  return { kind: 'finding', findingId: best.findingId, phase: 'adaptive', alt: false };
}

/**
 * Records the answer to a step. For an alternative question the response is the answer to
 * that question as shown; inverted wordings are mapped back to the finding here.
 */
export function answerStep(
  kb: CompiledKb,
  state: SessionState,
  step: AskStep,
  response: Readonly<Record<string, string>>,
): SessionState {
  const idx = indexKb(kb);
  const ids = step.kind === 'finding' ? [step.findingId] : step.findingIds;
  for (const key of Object.keys(response)) {
    if (!ids.includes(key)) throw new Error(`"${key}" is not part of this step`);
  }
  const answers: Record<string, string> = {};
  for (const id of ids) {
    const raw = response[id];
    if (raw === undefined) throw new Error(`Missing answer for "${id}"`);
    assertValue(idx, id, raw);
    const inverted = step.kind === 'finding' && step.alt && idx.findingById.get(id)?.altQuestion?.inverted === true;
    answers[id] = inverted && raw !== UNKNOWN ? (raw === 'present' ? 'absent' : 'present') : raw;
  }
  return { ...state, history: [...state.history, { step, answers }] };
}

/** Answers for a multi-select step: checked items present, the rest absent (or all unknown). */
export function groupResponse(step: AskStep, checked: readonly string[], allUnknown = false): Record<string, string> {
  const ids = step.kind === 'finding' ? [step.findingId] : step.findingIds;
  return Object.fromEntries(ids.map((id) => [id, allUnknown ? UNKNOWN : checked.includes(id) ? 'present' : 'absent']));
}

export function goBack(state: SessionState): SessionState {
  if (state.history.length === 0) return state;
  return { ...state, history: state.history.slice(0, -1), stoppedByUser: false };
}

/** The user chose to stop early; the result then never recommends self-care. */
export function stopEarly(state: SessionState): SessionState {
  return { ...state, stoppedByUser: true };
}
