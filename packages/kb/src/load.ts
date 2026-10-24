import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parseDocument } from 'yaml';
import type * as z from 'zod';
import {
  ageGroupFileSchema,
  clusterFileSchema,
  complaintSchema,
  conditionSchema,
  emergencyScreenSchema,
  engineParamsSchema,
  findingFileSchema,
  labelledFileSchema,
  questionGroupFileSchema,
  ruleFileSchema,
  sourceSchema,
  triageLevelFileSchema,
} from './schema.ts';
import type {
  AgeGroupYaml,
  ClusterYaml,
  ComplaintYaml,
  ConditionYaml,
  EmergencyScreenYaml,
  EngineParamsYaml,
  FindingYaml,
  LabelledYaml,
  QuestionGroupYaml,
  RuleYaml,
  SourceYaml,
  TriageLevelYaml,
} from './schema.ts';

export type Severity = 'error' | 'warning';

export interface Issue {
  severity: Severity;
  /** Path relative to the knowledge root, with forward slashes. */
  file: string;
  /** Dotted path inside the file, e.g. `findings.3.freq`; empty when not applicable. */
  path: string;
  message: string;
}

export interface Located<T> {
  file: string;
  data: T;
}

export interface RawKnowledge {
  root: string;
  params: Located<EngineParamsYaml>;
  ageGroups: Located<AgeGroupYaml[]>;
  triageLevels: Located<TriageLevelYaml[]>;
  specialties: Located<LabelledYaml[]>;
  regions: Located<LabelledYaml[]>;
  sources: Located<SourceYaml>[];
  /** One entry per finding, so every finding keeps the file it came from. */
  findings: Located<FindingYaml>[];
  clusters: Located<ClusterYaml[]>;
  groups: Located<QuestionGroupYaml[]>;
  complaints: Located<ComplaintYaml>[];
  conditions: Located<ConditionYaml>[];
  rules: Located<RuleYaml[]>;
  emergencyScreen: Located<EmergencyScreenYaml>;
}

export interface LoadResult {
  knowledge: RawKnowledge | null;
  issues: Issue[];
}

const toPosix = (p: string): string => p.split('\\').join('/');

export function listYamlFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.ya?ml$/.test(e.name))
    .map((e) => e.name)
    .sort()
    .map((name) => join(dir, name));
}

/** Parses one YAML file and validates it; returns null (with issues) when invalid. */
export function parseYamlFile<T>(
  absPath: string,
  schema: z.ZodType<T>,
  root: string,
  issues: Issue[],
): T | null {
  const file = toPosix(relative(root, absPath));
  if (!existsSync(absPath)) {
    issues.push({ severity: 'error', file, path: '', message: 'Thiếu file bắt buộc' });
    return null;
  }
  const text = readFileSync(absPath, 'utf8');
  if (text.charCodeAt(0) === 0xfeff) {
    issues.push({ severity: 'warning', file, path: '', message: 'File có ký tự BOM ở đầu; nên lưu UTF-8 không BOM' });
  }
  const doc = parseDocument(text, { uniqueKeys: true, prettyErrors: true });
  if (doc.errors.length > 0) {
    for (const e of doc.errors) {
      issues.push({ severity: 'error', file, path: '', message: `Lỗi cú pháp YAML: ${e.message}` });
    }
    return null;
  }
  for (const w of doc.warnings) {
    issues.push({ severity: 'warning', file, path: '', message: `YAML: ${w.message}` });
  }
  const result = schema.safeParse(doc.toJS());
  if (!result.success) {
    for (const iss of result.error.issues) {
      issues.push({
        severity: 'error',
        file,
        path: iss.path.map(String).join('.'),
        message: iss.message,
      });
    }
    return null;
  }
  return result.data;
}

function loadOne<T>(root: string, rel: string, schema: z.ZodType<T>, issues: Issue[]): Located<T> | null {
  const data = parseYamlFile(join(root, rel), schema, root, issues);
  return data === null ? null : { file: rel, data };
}

function loadDir<T>(root: string, relDir: string, schema: z.ZodType<T>, issues: Issue[], exclude: string[] = []): Located<T>[] {
  const out: Located<T>[] = [];
  for (const abs of listYamlFiles(join(root, relDir))) {
    const rel = toPosix(relative(root, abs));
    if (exclude.includes(rel)) continue;
    const data = parseYamlFile(abs, schema, root, issues);
    if (data !== null) out.push({ file: rel, data });
  }
  return out;
}

/** Loads and schema-validates every file under the knowledge root. */
export function loadKnowledge(root: string): LoadResult {
  const issues: Issue[] = [];
  const params = loadOne(root, 'meta/engine-params.yaml', engineParamsSchema, issues);
  const ageGroups = loadOne(root, 'meta/age-groups.yaml', ageGroupFileSchema, issues);
  const triageLevels = loadOne(root, 'meta/triage-levels.yaml', triageLevelFileSchema, issues);
  const specialties = loadOne(root, 'meta/specialties.yaml', labelledFileSchema, issues);
  const regions = loadOne(root, 'meta/regions.yaml', labelledFileSchema, issues);
  const clusters = loadOne(root, 'findings/clusters.yaml', clusterFileSchema, issues);
  const groups = loadOne(root, 'rules/question-groups.yaml', questionGroupFileSchema, issues);
  const rules = loadOne(root, 'rules/red-flags.yaml', ruleFileSchema, issues);
  const emergencyScreen = loadOne(root, 'rules/emergency-screen.yaml', emergencyScreenSchema, issues);

  const sources = loadDir(root, 'sources', sourceSchema, issues);
  const findingFiles = loadDir(root, 'findings', findingFileSchema, issues, ['findings/clusters.yaml']);
  const findings = findingFiles.flatMap((f) => f.data.map((data) => ({ file: f.file, data })));
  const complaints = loadDir(root, 'complaints', complaintSchema, issues);
  const conditions = loadDir(root, 'conditions', conditionSchema, issues);

  if (
    params === null ||
    ageGroups === null ||
    triageLevels === null ||
    specialties === null ||
    regions === null ||
    clusters === null ||
    groups === null ||
    rules === null ||
    emergencyScreen === null
  ) {
    return { knowledge: null, issues };
  }
  return {
    knowledge: {
      root,
      params,
      ageGroups,
      triageLevels,
      specialties,
      regions,
      sources,
      findings,
      clusters,
      groups,
      complaints,
      conditions,
      rules,
      emergencyScreen,
    },
    issues,
  };
}

/** Loads draft condition files (e.g. knowledge/drafts/pass-a) with the condition schema. */
export function loadConditionDrafts(root: string, relDir: string): { drafts: Located<ConditionYaml>[]; issues: Issue[] } {
  const issues: Issue[] = [];
  const drafts = loadDir(root, relDir, conditionSchema, issues);
  return { drafts, issues };
}
