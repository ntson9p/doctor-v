import type { AnsweredStep, CompiledKb } from '@doctor-v/engine';
import { UNKNOWN } from '@doctor-v/engine';

interface Props {
  kb: CompiledKb;
  history: readonly AnsweredStep[];
  forOther: boolean;
  /** Re-ask from step `index`; later answers are dropped and asked again. */
  onEdit: (index: number) => void;
  onDone: () => void;
}

function answerText(kb: CompiledKb, h: AnsweredStep): string {
  if (h.step.kind === 'group') {
    const values = Object.values(h.answers);
    if (values.length > 0 && values.every((v) => v === UNKNOWN)) return 'Không rõ';
    const yes = Object.entries(h.answers).filter(([, v]) => v === 'present');
    return yes.length === 0 ? 'Không có dấu hiệu nào' : yes.map(([id]) => kb.text.findings[id]?.label ?? id).join('; ');
  }
  const id = h.step.findingId;
  const v = h.answers[id];
  if (v === undefined || v === UNKNOWN) return 'Không rõ';
  // Stored values are those of the finding; an inverted alternative question was answered the other way.
  const inverted = h.step.alt && kb.findings.find((f) => f.id === id)?.altQuestion?.inverted === true;
  if (v === 'present') return inverted ? 'Không' : 'Có';
  if (v === 'absent') return inverted ? 'Có' : 'Không';
  return kb.text.findings[id]?.options[v] ?? v;
}

function questionText(kb: CompiledKb, h: AnsweredStep, forOther: boolean): string {
  if (h.step.kind === 'group') {
    if (h.step.groupId === null) return kb.text.emergencyScreen.title;
    return kb.text.groups[h.step.groupId]?.title ?? '';
  }
  const t = kb.text.findings[h.step.findingId];
  if (!t) return h.step.findingId;
  if (h.step.alt) return t.altQuestion ?? t.question;
  return forOther && t.questionOther ? t.questionOther : t.question;
}

/** Review and correct answers before seeing the result (docs/plan.md §3.1, step 7). */
export function Review({ kb, history, forOther, onEdit, onDone }: Props) {
  return (
    <div>
      <h1 tabIndex={-1} data-autofocus>
        Xem lại câu trả lời
      </h1>
      <p>Nếu có câu trả lời chưa đúng, bấm "Sửa". Các câu hỏi sau đó sẽ được hỏi lại.</p>
      <div class="section">
        {history.map((h, i) => (
          <div key={i} class="review-item">
            <div>
              <p>{questionText(kb, h, forOther)}</p>
              <p>
                <strong>{answerText(kb, h)}</strong>
              </p>
            </div>
            <button type="button" class="btn" onClick={() => onEdit(i)}>
              Sửa
            </button>
          </div>
        ))}
      </div>
      <button type="button" class="btn btn--primary btn--block" onClick={onDone}>
        Xem kết quả
      </button>
    </div>
  );
}
