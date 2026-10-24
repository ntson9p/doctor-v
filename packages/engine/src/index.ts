export type * from './model.ts';
export { UNKNOWN } from './model.ts';
export { ageGroupOf, isApplicable } from './context.ts';
export type { PatientContext } from './context.ts';
export { evalExpr } from './expr.ts';
export type { ExprEnv, Tri } from './expr.ts';
export { indexKb } from './kb-index.ts';
export type { EngineIndex } from './kb-index.ts';
export { OTHER, conditionPrior, evidenceItems, hypothesesFor, likelihood, posterior } from './posterior.ts';
export type { EvidenceItem, Hypotheses } from './posterior.ts';
export { computeTriage, probabilityLevel } from './triage.ts';
export type { Triage, TriageReason } from './triage.ts';
export { analyze, dangerCap, expectedLoss, focusMass, pickQuestion, urgentFocus } from './selection.ts';
export type { Analysis, QuestionScore, UrgentFocus } from './selection.ts';
export {
  answerStep,
  currentAnswers,
  emergencyScreenStep,
  envOf,
  goBack,
  groupResponse,
  nextStep,
  startSession,
  stopEarly,
} from './session.ts';
export type { AnsweredStep, AskStep, Phase, SessionState, Step, StopReason } from './session.ts';
export { contributions, displayPercent, sessionResult } from './result.ts';
export type { ConditionScore, Contribution, DisplayPercent, SessionResult } from './result.ts';
