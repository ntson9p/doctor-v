import type { CompiledKb } from '@doctor-v/engine';
import { ageGroupOf } from '@doctor-v/engine';
import { useEffect, useRef, useState } from 'preact/hooks';
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

/**
 * On a phone the on-screen keyboard covers the lower half of the screen, where the matches and the advice
 * below the search box appear. When the keyboard opens, scroll the box up to just under the sticky header
 * (two rows high on a narrow screen with large text). Returns a function that stops watching.
 */
function revealWhenKeyboardOpens(input: HTMLElement): () => void {
  const vv = window.visualViewport;
  if (!vv) return () => {};
  const before = vv.height;
  const onResize = () => {
    if (vv.height > before * 0.85) return;
    vv.removeEventListener('resize', onResize);
    const header = document.querySelector<HTMLElement>('.site-header');
    input.style.scrollMarginTop = `${(header?.offsetHeight ?? 0) + 8}px`;
    input.scrollIntoView({ block: 'start' });
  };
  vv.addEventListener('resize', onResize);
  return () => vv.removeEventListener('resize', onResize);
}

/** Chief complaint: a grid of large buttons, plus search that takes accents or none, and synonyms. */
export function Complaints({ kb, ageMonths, onPick }: Props) {
  const [query, setQuery] = useState('');
  const stopWatching = useRef<(() => void) | null>(null);
  useEffect(() => () => stopWatching.current?.(), []);
  const ageGroup = ageGroupOf(kb.ageGroups, ageMonths);
  const available = kb.complaints.filter((c) => c.ageGroups === null || c.ageGroups.includes(ageGroup));
  const shown = available.filter((c) => {
    const t = kb.text.complaints[c.id];
    return matches(query, [t?.label ?? c.id, ...(t?.synonyms ?? [])]);
  });
  const typed = query.trim().replace(/\s+/g, ' ');
  // Nothing matched: say so, and still offer every complaint, so the screen never ends in a dead end.
  const notFound = shown.length === 0;

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
          onFocus={(e) => {
            stopWatching.current?.();
            stopWatching.current = revealWhenKeyboardOpens(e.currentTarget);
          }}
          onBlur={() => stopWatching.current?.()}
        />
      </div>
      {/* Always in the page, so screen readers announce what the search found as the user types. */}
      <div role="status" class="search-status">
        {notFound ? (
          <>
            <p>
              <strong>Chưa tìm thấy "{typed}".</strong> Bản thử nghiệm mới có {available.length} triệu chứng chính, ở
              ngay dưới đây.
            </p>
            {/* Danger signs worded as on the first screen (docs/legal/disclaimers.md §2). */}
            <ul>
              <li>
                Nếu có khó thở, đau ngực, ngất, co giật, yếu hoặc liệt một bên người, nói khó, chảy máu nhiều, lơ mơ:
                hãy <strong>gọi 115</strong> hoặc đến cơ sở cấp cứu gần nhất ngay.
              </li>
              <li>Nếu bạn còn có một triệu chứng ở dưới, hãy chọn triệu chứng đó. Kết quả sẽ chưa tính đến "{typed}".</li>
              <li>Nếu không, hãy đi khám để được tư vấn.</li>
            </ul>
          </>
        ) : typed !== '' ? (
          <p class="visually-hidden">Có {shown.length} triệu chứng phù hợp.</p>
        ) : null}
      </div>
      <div class="complaints">
        {(notFound ? available : shown).map((c) => {
          const t = kb.text.complaints[c.id];
          return (
            <button key={c.id} type="button" class="complaint" onClick={() => onPick(c.id)}>
              {ICONS[t?.icon ?? ''] ?? null}
              <span>{t?.label ?? c.id}</span>
            </button>
          );
        })}
      </div>
      {notFound ? null : (
        <p class="note">
          Bản thử nghiệm mới có {available.length} triệu chứng chính. Nếu triệu chứng khác làm bạn lo lắng, hãy đi khám.
        </p>
      )}
    </div>
  );
}
