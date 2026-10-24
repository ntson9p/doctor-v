/**
 * Browser storage that never throws: private windows, blocked site data and previews can make
 * the accessors fail, and the app must work without them.
 */

export function readJson<T>(storage: 'local' | 'session', key: string): T | null {
  try {
    const raw = (storage === 'local' ? localStorage : sessionStorage).getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
}

export function writeJson(storage: 'local' | 'session', key: string, value: unknown): void {
  try {
    (storage === 'local' ? localStorage : sessionStorage).setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: the session simply is not kept across reloads.
  }
}

export function remove(storage: 'local' | 'session', key: string): void {
  try {
    (storage === 'local' ? localStorage : sessionStorage).removeItem(key);
  } catch {
    // Nothing to remove.
  }
}

/** Keys this app writes; "Xóa dữ liệu" in the settings removes them all. */
export const KEYS = { fontScale: 'dv.fontScale', session: 'dv.session' } as const;
