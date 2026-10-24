import type { CompiledKb } from '@doctor-v/engine';
import { useState } from 'preact/hooks';

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
  const toggle = (id: string): void => setChecked(checked.includes(id) ? checked.filter((x) => x !== id) : [...checked, id]);

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
              <input type="checkbox" checked={checked.includes(id)} onChange={() => toggle(id)} />
              <span>
                {kb.text.findings[id]?.label ?? id}
                {help ? <span class="why"> ({help})</span> : null}
              </span>
            </label>
          );
        })}
      </fieldset>
      <div class="stack" style={{ marginTop: '1.25rem' }}>
        <button type="button" class="btn btn--primary btn--block" disabled={checked.length === 0} onClick={() => onAnswer(checked)}>
          {checked.length === 0 ? 'Tiếp tục' : `Tiếp tục (đã chọn ${checked.length})`}
        </button>
        <button type="button" class="btn btn--block" onClick={() => onAnswer([])}>
          {noneLabel}
        </button>
        {allowUnknown ? (
          <button type="button" class="btn btn--block" onClick={() => onAnswer(null)}>
            Tôi không rõ
          </button>
        ) : null}
      </div>
    </div>
  );
}
