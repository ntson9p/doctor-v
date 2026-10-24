import type { CompiledKb } from '@doctor-v/engine';
import { useState } from 'preact/hooks';
import { useTapGuard } from '../../lib/tap-guard.ts';

interface Props {
  kb: CompiledKb;
  title: string;
  noneLabel: string;
  findingIds: readonly string[];
  allowUnknown: boolean;
  /** Called with the checked findings, or with null for "I don't know". */
  onAnswer: (checked: string[] | null) => void;
}

/**
 * Multi-select checklist. "None of the above" is an explicit choice, so an empty list is never
 * sent by accident.
 */
export function GroupQuestion({ kb, title, noneLabel, findingIds, allowUnknown, onAnswer }: Props) {
  const [checked, setChecked] = useState<string[]>([]);
  const settled = useTapGuard();
  const toggle = (id: string, input: HTMLInputElement): void => {
    // An ignored tap must not leave the box looking ticked.
    if (!settled()) {
      input.checked = checked.includes(id);
      return;
    }
    setChecked(checked.includes(id) ? checked.filter((x) => x !== id) : [...checked, id]);
  };

  return (
    <div>
      <h1 class="question" tabIndex={-1} data-autofocus>
        {title}
      </h1>
      <p class="note">Chọn tất cả những dấu hiệu đang có.</p>
      <fieldset class="stack">
        <legend class="visually-hidden">{title}</legend>
        {findingIds.map((id) => {
          const help = kb.text.findings[id]?.help;
          return (
            <label key={id} class="choice">
              <input type="checkbox" checked={checked.includes(id)} onChange={(e) => toggle(id, e.currentTarget)} />
              <span class="choice__text">
                <span>{kb.text.findings[id]?.label ?? id}</span>
                {help ? <span class="choice__help">{help}</span> : null}
              </span>
            </label>
          );
        })}
      </fieldset>
      <div class="stack" style={{ marginTop: '1.25rem' }}>
        <button type="button" class="btn btn--primary btn--block" disabled={checked.length === 0} onClick={() => settled() && onAnswer(checked)}>
          {checked.length === 0 ? 'Tiếp tục' : `Tiếp tục (đã chọn ${checked.length})`}
        </button>
        <button type="button" class="btn btn--block" onClick={() => settled() && onAnswer([])}>
          {noneLabel}
        </button>
        {allowUnknown ? (
          <button type="button" class="btn btn--block" onClick={() => settled() && onAnswer(null)}>
            Tôi không rõ
          </button>
        ) : null}
      </div>
    </div>
  );
}
