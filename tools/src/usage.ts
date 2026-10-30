/**
 * Token usage and API-equivalent cost of a Claude Code session: the main conversation and every sub-agent.
 *
 * Claude Code writes the transcripts under ~/.claude/projects/<project>/: <session>.jsonl, and
 * <session>/subagents/agent-<id>.jsonl with agent-<id>.meta.json (the description the agent was launched with).
 * Every request sends the whole conversation so far, so most of the cost is reading and caching the context again at
 * each step, not the text the model writes. Worklog figures before 31/10/2026 counted only each agent's final
 * context size (docs/worklog.md, 31/10/2026).
 */

/** USD per million tokens. */
export interface Price {
  input: number;
  cacheWrite5m: number;
  cacheWrite1h: number;
  cacheRead: number;
  output: number;
}

// List prices, platform.claude.com/docs/en/about-claude/pricing, read 31/10/2026.
const OPUS_5_5: Price = { input: 4, cacheWrite5m: 5, cacheWrite1h: 8, cacheRead: 0.2, output: 20 };
const SONNET_5_5: Price = { input: 2, cacheWrite5m: 2.5, cacheWrite1h: 4, cacheRead: 0.1, output: 10 };
const FABLE_5_1: Price = { input: 10, cacheWrite5m: 12.5, cacheWrite1h: 20, cacheRead: 0.25, output: 50 };
// Haiku 5.5 is priced by prompt length (input, cache reads and cache writes): above 100,000 tokens it costs 5 times
// more.
const HAIKU_5_5: Price = { input: 0.1, cacheWrite5m: 0.125, cacheWrite1h: 0.2, cacheRead: 0.01, output: 0.5 };
const HAIKU_5_5_LONG: Price = { input: 0.5, cacheWrite5m: 0.625, cacheWrite1h: 1, cacheRead: 0.05, output: 2.5 };

/** The list price of one request, or null for a model missing from this table. */
export function priceOf(model: string, promptTokens: number): Price | null {
  switch (model) {
    case 'claude-opus-5-5':
      return OPUS_5_5;
    case 'claude-sonnet-5-5':
      return SONNET_5_5;
    case 'claude-haiku-5-5':
      return promptTokens > 100_000 ? HAIKU_5_5_LONG : HAIKU_5_5;
    case 'claude-fable-5-1':
      return FABLE_5_1;
    default:
      return null;
  }
}

export interface Request {
  id: string;
  /** ISO 8601, UTC. */
  timestamp: string;
  model: string;
  effort: string;
  input: number;
  cacheWrite5m: number;
  cacheWrite1h: number;
  cacheRead: number;
  output: number;
  /** Part of output. */
  thinking: number;
}

type Json = Record<string, unknown>;
const isObject = (v: unknown): v is Json => typeof v === 'object' && v !== null && !Array.isArray(v);
const count = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
const text = (v: unknown): string | null => (typeof v === 'string' ? v : null);

/**
 * The model requests of one transcript. A response is written as several lines (one per content block) sharing
 * message.id: each id counts once, with the line reporting the most output tokens. Lines Claude Code writes itself,
 * such as "You've hit your session limit", have model "<synthetic>" and are not requests.
 */
export function readRequests(transcript: string): Request[] {
  const byId = new Map<string, Request>();
  for (const line of transcript.split('\n')) {
    if (!line.includes('"usage"')) continue;
    let entry: unknown;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }
    if (!isObject(entry) || entry.type !== 'assistant') continue;
    const message = entry.message;
    if (!isObject(message)) continue;
    const usage = message.usage;
    const model = text(message.model);
    const id = text(message.id) ?? text(entry.uuid);
    if (!isObject(usage) || model === null || model === '<synthetic>' || id === null) continue;
    const creation = usage.cache_creation;
    const details = usage.output_tokens_details;
    const cacheWrite = count(usage.cache_creation_input_tokens);
    const cacheWrite1h = isObject(creation) ? count(creation.ephemeral_1h_input_tokens) : 0;
    const request: Request = {
      id,
      timestamp: text(entry.timestamp) ?? '',
      model,
      effort: text(entry.perTurnEffort) ?? text(entry.effort) ?? '?',
      input: count(usage.input_tokens),
      cacheWrite5m: cacheWrite - cacheWrite1h,
      cacheWrite1h,
      cacheRead: count(usage.cache_read_input_tokens),
      output: count(usage.output_tokens),
      thinking: isObject(details) ? count(details.thinking_tokens) : 0,
    };
    const previous = byId.get(id);
    if (previous === undefined || request.output >= previous.output) byId.set(id, request);
  }
  return [...byId.values()];
}

/** Requests from `since` (inclusive) to `until` (exclusive): ISO 8601 prefixes in UTC, such as 2026-11-01T08:00. */
export function within(requests: readonly Request[], since: string | null, until: string | null): Request[] {
  return requests.filter((r) => (since === null || r.timestamp >= since) && (until === null || r.timestamp < until));
}

export interface Cost {
  input: number;
  cacheRead: number;
  cacheWrite: number;
  /** Part of cacheWrite: a large context written again after the cache expired (a pause, a usage limit, a compaction). */
  rewrite: number;
  output: number;
  /** Part of output. */
  thinking: number;
  total: number;
}

export interface Summary {
  requests: number;
  /** Every token the model read or wrote. */
  tokens: number;
  maxContext: number;
  usd: Cost;
  /** Requests whose model has no price: their tokens count, their cost does not. */
  unpriced: number;
  models: Map<string, number>;
  efforts: Map<string, number>;
  first: string;
  last: string;
}

/** A cache write at least this large, and larger than the cache read of its request, rebuilt an expired cache. */
const REWRITE_MIN_TOKENS = 50_000;

export function summarize(requests: readonly Request[]): Summary {
  const usd: Cost = { input: 0, cacheRead: 0, cacheWrite: 0, rewrite: 0, output: 0, thinking: 0, total: 0 };
  const s: Summary = {
    requests: 0, tokens: 0, maxContext: 0, usd, unpriced: 0, models: new Map(), efforts: new Map(), first: '', last: '',
  };
  for (const r of requests) {
    const cacheWrite = r.cacheWrite5m + r.cacheWrite1h;
    const prompt = r.input + cacheWrite + r.cacheRead;
    s.requests += 1;
    s.tokens += prompt + r.output;
    s.maxContext = Math.max(s.maxContext, prompt);
    s.models.set(r.model, (s.models.get(r.model) ?? 0) + 1);
    s.efforts.set(r.effort, (s.efforts.get(r.effort) ?? 0) + 1);
    if (r.timestamp !== '' && (s.first === '' || r.timestamp < s.first)) s.first = r.timestamp;
    if (r.timestamp > s.last) s.last = r.timestamp;
    const price = priceOf(r.model, prompt);
    if (price === null) {
      s.unpriced += 1;
      continue;
    }
    const write = (r.cacheWrite5m * price.cacheWrite5m + r.cacheWrite1h * price.cacheWrite1h) / 1e6;
    usd.input += (r.input * price.input) / 1e6;
    usd.cacheRead += (r.cacheRead * price.cacheRead) / 1e6;
    usd.cacheWrite += write;
    if (cacheWrite >= REWRITE_MIN_TOKENS && cacheWrite > r.cacheRead) usd.rewrite += write;
    usd.output += (r.output * price.output) / 1e6;
    usd.thinking += (r.thinking * price.output) / 1e6;
  }
  usd.total = usd.input + usd.cacheRead + usd.cacheWrite + usd.output;
  return s;
}

export interface AgentUsage {
  name: string;
  requests: Request[];
}

const format = (digits: number): Intl.NumberFormat =>
  new Intl.NumberFormat('vi-VN', { minimumFractionDigits: digits, maximumFractionDigits: digits });
const ONE = format(1);
const WHOLE = format(0);
const share = (part: number, total: number): string => (total > 0 ? `${WHOLE.format((100 * part) / total)}%` : '–');

/** One table row per agent, a total and the cost by kind, in Markdown for the worklog. */
export function renderUsage(agents: readonly AgentUsage[]): string {
  const row = (name: string, s: Summary): string =>
    `| ${name} | ${WHOLE.format(s.requests)} | ${ONE.format(s.tokens / 1e6)} | ${WHOLE.format(s.maxContext / 1e3)} | ` +
    `${WHOLE.format(s.usd.total)} | ` +
    `${s.requests === 0 ? '–' : `${[...s.models.keys()].join(', ')}; ${[...s.efforts.keys()].join(', ')}`} |`;
  const all = summarize(agents.flatMap((a) => a.requests));
  const u = all.usd;
  const lines = [
    '| Agent | Lượt gọi | Token xử lý (triệu) | Ngữ cảnh lớn nhất (nghìn token) | USD theo giá API | Model; effort |',
    '|---|---|---|---|---|---|',
    ...agents.map((a) => row(a.name, summarize(a.requests))),
    row('**Cộng**', all),
    '',
    `Theo loại: đọc lại ngữ cảnh ${WHOLE.format(u.cacheRead)} USD (${share(u.cacheRead, u.total)}); ` +
      `ghi ngữ cảnh vào bộ đệm ${WHOLE.format(u.cacheWrite)} USD (${share(u.cacheWrite, u.total)}), ` +
      `trong đó ghi lại sau khi bộ đệm hết hạn ${WHOLE.format(u.rewrite)} USD (${share(u.rewrite, u.total)}); ` +
      `model viết ra ${WHOLE.format(u.output)} USD (${share(u.output, u.total)}), ` +
      `trong đó phần suy nghĩ ${WHOLE.format(u.thinking)} USD (${share(u.thinking, u.total)}).`,
    'Chưa tính: phí tìm kiếm web, phần tóm tắt trang của WebFetch, các lần nén ngữ cảnh.',
  ];
  if (all.unpriced > 0) {
    lines.push(
      `${all.unpriced} lượt gọi dùng model chưa có trong bảng giá (\`tools/src/usage.ts\`): chỉ tính token, không tính tiền.`,
    );
  }
  return lines.join('\n');
}
