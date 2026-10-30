import { describe, expect, it } from 'vitest';
import { priceOf, readRequests, renderUsage, summarize, within } from '../src/usage.ts';

const line = (id: string, usage: object, timestamp = '2026-11-01T01:00:00.000Z'): string =>
  JSON.stringify({ type: 'assistant', timestamp, perTurnEffort: 'high', message: { id, model: 'claude-opus-5-5', usage } });

describe('agent usage', () => {
  it('counts a response written over several lines once, and skips synthetic and broken lines', () => {
    const transcript = [
      line('m1', { input_tokens: 1, cache_read_input_tokens: 1000, output_tokens: 5 }),
      line('m1', { input_tokens: 1, cache_read_input_tokens: 1000, output_tokens: 40 }),
      JSON.stringify({ type: 'assistant', message: { id: 'x', model: '<synthetic>', usage: { output_tokens: 0 } } }),
      '{"type":"assistant","usage" broken',
      line('m2', {
        cache_creation_input_tokens: 300,
        cache_creation: { ephemeral_1h_input_tokens: 100 },
        output_tokens: 10,
        output_tokens_details: { thinking_tokens: 4 },
      }),
    ].join('\n');
    const requests = readRequests(transcript);
    expect(requests.map((r) => [r.id, r.output])).toEqual([['m1', 40], ['m2', 10]]);
    expect(requests[1]).toMatchObject({ cacheWrite5m: 200, cacheWrite1h: 100, thinking: 4, effort: 'high' });
  });

  it('prices cache reads, cache writes and output, and counts a rebuilt cache as a rewrite', () => {
    const transcript = [
      line('a', {
        cache_read_input_tokens: 1_000_000,
        output_tokens: 100_000,
        output_tokens_details: { thinking_tokens: 50_000 },
      }),
      line('b', { cache_creation_input_tokens: 200_000, cache_read_input_tokens: 10_000, output_tokens: 0 }),
    ].join('\n');
    const s = summarize(readRequests(transcript));
    // Opus 5.5, USD per million tokens: cache read 0.20, 5-minute cache write 5, output 20.
    expect(s.usd.cacheRead).toBeCloseTo(0.202, 9);
    expect(s.usd.cacheWrite).toBeCloseTo(1, 9);
    expect(s.usd.rewrite).toBeCloseTo(1, 9);
    expect(s.usd.output).toBeCloseTo(2, 9);
    expect(s.usd.thinking).toBeCloseTo(1, 9);
    expect(s.usd.total).toBeCloseTo(3.202, 9);
    expect([s.tokens, s.maxContext]).toEqual([1_310_000, 1_000_000]);
    const table = renderUsage([{ name: 'Phiên chính', requests: readRequests(transcript) }]);
    expect(table).toContain('| **Cộng** | 2 | 1,3 | 1.000 | 3 |');
  });

  it('uses the long-prompt price of Haiku 5.5 above 100,000 tokens, and leaves unknown models unpriced', () => {
    expect(priceOf('claude-haiku-5-5', 100_000)?.output).toBe(0.5);
    expect(priceOf('claude-haiku-5-5', 100_001)?.output).toBe(2.5);
    const unknown = { type: 'assistant', message: { id: 'z', model: 'claude-x', usage: { output_tokens: 10 } } };
    const s = summarize(readRequests(JSON.stringify(unknown)));
    expect([s.requests, s.unpriced, s.usd.total]).toEqual([1, 1, 0]);
  });

  it('keeps the requests of a time window, start included and end excluded', () => {
    const requests = readRequests([
      line('early', { output_tokens: 1 }, '2026-10-31T23:59:00.000Z'),
      line('inside', { output_tokens: 1 }, '2026-11-01T08:00:00.000Z'),
      line('late', { output_tokens: 1 }, '2026-11-02T00:00:00.000Z'),
    ].join('\n'));
    expect(within(requests, '2026-11-01', '2026-11-02').map((r) => r.id)).toEqual(['inside']);
    expect(within(requests, null, null)).toHaveLength(3);
  });
});
