import { describe, expect, it } from 'vitest';
import { ENGINE_SMOKE } from '../src/index.ts';

describe('smoke', () => {
  it('loads the engine module', () => {
    expect(ENGINE_SMOKE).toBe('engine-ok');
  });
});
