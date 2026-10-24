import type { CompiledKb, Complaint, Condition, Expr, Finding, QuestionGroup, Rule } from './model.ts';

/** Lookup tables derived once per compiled knowledge base. */
export interface EngineIndex {
  kb: CompiledKb;
  findingById: ReadonlyMap<string, Finding>;
  conditionById: ReadonlyMap<string, Condition>;
  complaintById: ReadonlyMap<string, Complaint>;
  groupById: ReadonlyMap<string, QuestionGroup>;
  clusterRho: ReadonlyMap<string, number>;
  /** Rules that apply to a complaint (emergency-screen items are handled separately). */
  rulesFor(complaintId: string): readonly Rule[];
  /** Findings referenced by the complaint's rules or by the emergency screen. */
  ruleFindingsFor(complaintId: string): ReadonlySet<string>;
  /**
   * Danger signs for the complaint: emergency-screen items, mandatory red flags and
   * single-finding rules of level 1–2. They are asked again with the alternative wording
   * when the answer is "unknown".
   */
  redFlagFindingsFor(complaintId: string): ReadonlySet<string>;
}

function collectFindings(expr: Expr, out: Set<string>): void {
  if ('all' in expr) expr.all.forEach((e) => collectFindings(e, out));
  else if ('any' in expr) expr.any.forEach((e) => collectFindings(e, out));
  else if ('not' in expr) collectFindings(expr.not, out);
  else if ('atLeast' in expr) expr.of.forEach((e) => collectFindings(e, out));
  else if ('finding' in expr) out.add(expr.finding);
}

const cache = new WeakMap<CompiledKb, EngineIndex>();

export function indexKb(kb: CompiledKb): EngineIndex {
  const cached = cache.get(kb);
  if (cached) return cached;

  const findingById = new Map(kb.findings.map((f) => [f.id, f]));
  const conditionById = new Map(kb.conditions.map((c) => [c.id, c]));
  const complaintById = new Map(kb.complaints.map((c) => [c.id, c]));
  const groupById = new Map(kb.groups.map((g) => [g.id, g]));
  const clusterRho = new Map(kb.clusters.map((c) => [c.id, c.rho]));

  const rulesByComplaint = new Map<string, Rule[]>();
  const ruleFindings = new Map<string, Set<string>>();
  const redFlags = new Map<string, Set<string>>();
  for (const complaint of kb.complaints) {
    const rules = kb.rules.filter((r) => r.complaints === null || r.complaints.includes(complaint.id));
    rulesByComplaint.set(complaint.id, rules);

    const referenced = new Set<string>(kb.emergencyScreen.items.map((i) => i.findingId));
    for (const r of rules) collectFindings(r.when, referenced);
    ruleFindings.set(complaint.id, referenced);

    const danger = new Set<string>(kb.emergencyScreen.items.map((i) => i.findingId));
    for (const item of complaint.redFlags) {
      if ('finding' in item) danger.add(item.finding);
      else for (const id of groupById.get(item.group)?.findings ?? []) danger.add(id);
    }
    for (const r of rules) if (r.level <= 2 && 'finding' in r.when) danger.add(r.when.finding);
    redFlags.set(complaint.id, danger);
  }

  const index: EngineIndex = {
    kb,
    findingById,
    conditionById,
    complaintById,
    groupById,
    clusterRho,
    rulesFor: (id) => rulesByComplaint.get(id) ?? [],
    ruleFindingsFor: (id) => ruleFindings.get(id) ?? new Set(),
    redFlagFindingsFor: (id) => redFlags.get(id) ?? new Set(),
  };
  cache.set(kb, index);
  return index;
}
