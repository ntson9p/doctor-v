import { describe, expect, it } from 'vitest';
import { weightedKappa } from '../src/agreement.ts';

describe('weighted kappa', () => {
  it('is 1 for perfect agreement and below 0 for systematic disagreement', () => {
    expect(weightedKappa([[0, 0], [2, 2], [4, 4]], 5)).toBeCloseTo(1, 12);
    expect(weightedKappa([[0, 4], [4, 0], [0, 4], [4, 0]], 5)).toBeLessThan(0);
  });
  it('penalizes far disagreements more than near ones', () => {
    const near = weightedKappa([[0, 1], [1, 2], [2, 3], [3, 4], [4, 4], [0, 0]], 5);
    const far = weightedKappa([[0, 3], [1, 4], [2, 0], [3, 0], [4, 4], [0, 0]], 5);
    expect(near).toBeGreaterThan(far);
  });
});
