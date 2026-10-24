import type { CompiledKb } from '@doctor-v/engine';

let pending: Promise<CompiledKb> | null = null;

/** Loads the compiled knowledge base once per page (built by src/pages/data/kb.json.ts). */
export function loadKb(): Promise<CompiledKb> {
  pending ??= fetch('/data/kb.json').then(async (res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as CompiledKb;
  });
  return pending;
}
