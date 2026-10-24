import type { CompiledKb } from '@doctor-v/engine';
import { ageGroupOf } from '@doctor-v/engine';
import { useState } from 'preact/hooks';
import { matches } from '../../lib/vi.ts';

const ICONS: Record<string, preact.JSX.Element> = {
  thermometer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M14 14.8V4a2 2 0 1 0-4 0v10.8a4 4 0 1 0 4 0z" />
      <path d="M12 9v7" />
    </svg>
  ),
  abdomen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M8 3c-1 3-2 5-2 9s2 9 6 9 6-5 6-9-1-6-2-9" />
      <circle cx="12" cy="13" r="1.2" fill="currentColor" />
    </svg>
  ),
  head: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M12 3a7 7 0 0 0-7 7c0 2.2 1 4 2.5 5.3V20h6v-2h2a2 2 0 0 0 2-2v-2l1.5-1-1.5-2.5A7 7 0 0 0 12 3z" />
      <path d="M9 9.5c.8-.7 2-.7 2.8 0M12.5 9.5c.8-.7 2-.7 2.8 0" />
    </svg>
  ),
};

interface Props {
  kb: CompiledKb;
  ageMonths: number;
  onPick: (complaintId: string) => void;
}

/** Chief complaint: a grid of large buttons, plus accent-insensitive search with synonyms. */
export function Complaints({ kb, ageMonths, onPick }: Props) {
  const [query, setQuery] = useState('');
  const ageGroup = ageGroupOf(kb.ageGroups, ageMonths);
  const available = kb.complaints.filter((c) => c.ageGroups === null || c.ageGroups.includes(ageGroup));
  const shown = available.filter((c) => {
    const t = kb.text.complaints[c.id];
    return matches(query, [t?.label ?? c.id, ...(t?.synonyms ?? [])]);
  });

  return (
    <div>
      <h1 tabIndex={-1} data-autofocus>
        Khó chịu nhất là gì?
      </h1>
      <div class="field">
        <label for="complaint-search">Tìm triệu chứng (gõ có dấu hoặc không dấu)</label>
        <input
          id="complaint-search"
          type="search"
          value={query}
          placeholder="Ví dụ: nhuc dau, dau bao tu"
          onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
        />
      </div>
      <div class="complaints">
        {shown.map((c) => {
          const t = kb.text.complaints[c.id];
          return (
            <button key={c.id} type="button" class="complaint" onClick={() => onPick(c.id)}>
              {ICONS[t?.icon ?? ''] ?? null}
              <span>{t?.label ?? c.id}</span>
            </button>
          );
        })}
      </div>
      {shown.length === 0 ? (
        <p>
          Chưa tìm thấy triệu chứng này. Bản thử nghiệm mới có: {available.map((c) => kb.text.complaints[c.id]?.label ?? c.id).join(', ')}.
        </p>
      ) : null}
      <p class="note">Bản thử nghiệm mới có {available.length} triệu chứng chính. Nếu triệu chứng khác làm bạn lo lắng, hãy đi khám.</p>
    </div>
  );
}
