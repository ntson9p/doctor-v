import type { CompiledKb } from '@doctor-v/engine';
import { UNKNOWN } from '@doctor-v/engine';
import { useState } from 'preact/hooks';
import { useTapGuard } from '../../lib/tap-guard.ts';

interface Props {
  kb: CompiledKb;
  findingId: string;
  /** Ask the alternative wording (after an "unknown" answer to a danger sign). */
  alt: boolean;
  forOther: boolean;
  onAnswer: (value: string) => void;
}

/** One yes/no/unknown or multiple-choice question per screen. */
export function FindingQuestion({ kb, findingId, alt, forOther, onAnswer }: Props) {
  const [showHelp, setShowHelp] = useState(false);
  const settled = useTapGuard();
  const text = kb.text.findings[findingId];
  const finding = kb.findings.find((f) => f.id === findingId);
  if (!text || !finding) return <p class="error">Không tìm thấy câu hỏi "{findingId}".</p>;

  const question = alt ? (text.altQuestion ?? text.question) : forOther && text.questionOther ? text.questionOther : text.question;
  const options: { value: string; label: string }[] =
    finding.type === 'categorical'
      ? finding.options.map((o) => ({ value: o, label: text.options[o] ?? o }))
      : [
          { value: 'present', label: 'Có' },
          { value: 'absent', label: 'Không' },
        ];

  return (
    <div>
      <h1 class="question" tabIndex={-1} data-autofocus>
        {question}
      </h1>
      {text.help && !alt ? (
        <div>
          <button type="button" class="btn btn--link" aria-expanded={showHelp} onClick={() => setShowHelp(!showHelp)}>
            Cái này là gì?
          </button>
          {showHelp ? <p class="help">{text.help}</p> : null}
        </div>
      ) : null}
      <div class="stack" role="group" aria-label="Chọn câu trả lời">
        {options.map((o) => (
          <button key={o.value} type="button" class="btn btn--block" onClick={() => settled() && onAnswer(o.value)}>
            {o.label}
          </button>
        ))}
        <button type="button" class="btn btn--block" onClick={() => settled() && onAnswer(UNKNOWN)}>
          Không rõ
        </button>
      </div>
    </div>
  );
}
