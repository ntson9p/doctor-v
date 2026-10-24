import { useRef } from 'preact/hooks';

declare global {
  interface Window {
    /** Test hook: end-to-end tests that click instantly set this to 0 (the guard has its own test). */
    __dvTapSettleMs?: number;
  }
}

/** How long after a question appears taps are ignored. */
const SETTLE_MS = 400;

/**
 * Ignores taps in the first moments after a question appears. On a slow phone the previous answer
 * takes a few hundred milliseconds to compute; a second tap made meanwhile is delivered afterwards
 * to whatever button is under the finger, which would answer a question the user has not read.
 * Call the returned function in each handler; it is false while the screen is settling.
 */
export function useTapGuard(): () => boolean {
  const shownAt = useRef(performance.now());
  return () => performance.now() - shownAt.current >= (window.__dvTapSettleMs ?? SETTLE_MS);
}
