/**
 * Token usage and API-equivalent cost of a Claude Code session, main conversation and sub-agents: the cost figure
 * for the worklog at the end of a batch (docs/handoff.md, step 10).
 * Usage:
 *   npm run agent:usage                                  this session (CLAUDE_CODE_SESSION_ID)
 *   npm run agent:usage -- <session id | session .jsonl>
 *   npm run agent:usage -- --since 2026-11-01T02:00 --until 2026-11-03   time window, UTC as in the transcripts
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { readRequests, renderUsage, summarize, within } from '../usage.ts';
import type { AgentUsage } from '../usage.ts';

const args = process.argv.slice(2);
const option = (name: string): string | null => {
  const i = args.indexOf(name);
  if (i < 0) return null;
  const value = args[i + 1];
  if (value === undefined || value.startsWith('--')) {
    console.error(`Thiếu giá trị sau ${name}, ví dụ: ${name} 2026-11-01T02:00`);
    process.exit(2);
  }
  return value;
};
const since = option('--since');
const until = option('--until');
const target = args.find((a, i) => !a.startsWith('--') && (i === 0 || !args[i - 1]!.startsWith('--')));

function sessionFile(): string {
  if (target?.endsWith('.jsonl')) return target;
  const id = target ?? process.env.CLAUDE_CODE_SESSION_ID;
  if (id === undefined || id === '') {
    console.error('Không biết phiên nào: chạy trong một phiên Claude Code, hoặc ghi mã phiên hay đường dẫn tệp .jsonl.');
    process.exit(2);
  }
  const projects = join(process.env.CLAUDE_CONFIG_DIR ?? join(homedir(), '.claude'), 'projects');
  const found = existsSync(projects)
    ? readdirSync(projects).map((p) => join(projects, p, `${id}.jsonl`)).find((f) => existsSync(f))
    : undefined;
  if (found === undefined) {
    console.error(`Không tìm thấy bản ghi của phiên ${id} trong ${projects}.`);
    process.exit(1);
  }
  return found;
}

function description(metaFile: string): string | null {
  try {
    const meta: unknown = JSON.parse(readFileSync(metaFile, 'utf8'));
    if (typeof meta === 'object' && meta !== null && 'description' in meta && typeof meta.description === 'string') {
      return meta.description;
    }
  } catch {
    // An agent without a readable description is listed by its file name.
  }
  return null;
}

const main = sessionFile();
const load = (file: string) => within(readRequests(readFileSync(file, 'utf8')), since, until);
const agents: AgentUsage[] = [];
const subagents = join(dirname(main), basename(main, '.jsonl'), 'subagents');
if (existsSync(subagents)) {
  for (const file of readdirSync(subagents).filter((f) => f.endsWith('.jsonl'))) {
    const requests = load(join(subagents, file));
    const name = description(join(subagents, file.replace(/\.jsonl$/, '.meta.json'))) ?? file;
    if (requests.length > 0) agents.push({ name, requests });
  }
}
agents.sort((a, b) => summarize(a.requests).first.localeCompare(summarize(b.requests).first));
agents.unshift({ name: 'Phiên chính', requests: load(main) });

const all = summarize(agents.flatMap((a) => a.requests));
console.log(
  `Phiên ${basename(main, '.jsonl')}: ${agents.length - 1} agent con, từ ${all.first || '–'} đến ${all.last || '–'} (UTC).\n`,
);
console.log(renderUsage(agents));
