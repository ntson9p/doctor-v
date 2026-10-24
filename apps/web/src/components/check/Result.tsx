import type { CompiledKb, SessionResult } from '@doctor-v/engine';
import { conditionName, describeReason, findingLabel, percentText, supportText } from '../../lib/explain.ts';

const LEVEL_ICON: Record<number, string> = { 1: '🚨', 2: '🏥', 3: '🩺', 4: '📅', 5: '🏠' };
/** Conditions shown on the result: those at 1% or more, at most 5 (docs/plan.md §3.3). */
const SHOW_MIN_PROB = 0.01;
const SHOW_MAX = 5;
/** Self-care advice of the leading condition, only when it is that likely and the level is 4–5. */
const SELF_CARE_MIN_PROB = 0.3;

interface Props {
  kb: CompiledKb;
  result: SessionResult;
  onReview: () => void;
  onRestart: () => void;
}

export function Result({ kb, result: r, onReview, onRestart }: Props) {
  const level = r.triage.level;
  const levelText = kb.text.triageLevels[String(level)];
  // Conditions behind a probability-based level: those at that urgency (or can't-miss), most probable first.
  const behind = (cantMiss: boolean): string[] =>
    r.conditions
      .filter((c) => c.urgency <= level && (!cantMiss || c.cantMiss))
      .slice(0, 2)
      .map((c) => conditionName(kb, c.conditionId));
  const reasons = [
    ...new Set(
      r.triage.reasons
        .filter((x) => x.level === level)
        .map((x) => describeReason(kb, x, x.kind === 'probability' ? behind(x.cantMiss) : [])),
    ),
  ].slice(0, 3);
  const conditions = r.conditions.filter((c) => c.probability >= SHOW_MIN_PROB).slice(0, SHOW_MAX);
  const top = r.conditions[0];
  const selfCare =
    level >= 4 && top && top.probability >= SELF_CARE_MIN_PROB ? (kb.text.conditions[top.conditionId]?.selfCare ?? []) : [];

  return (
    <div>
      <div class={`triage triage--${level}`} role={level <= 2 ? 'alert' : undefined}>
        <h1 class="triage__label" tabIndex={-1} data-autofocus>
          <span aria-hidden="true">{LEVEL_ICON[level]}</span> {levelText?.label}
        </h1>
        <p>{levelText?.action}</p>
        {level === 1 ? (
          <a class="btn btn-115 btn--block" href="tel:115">
            Gọi 115
          </a>
        ) : null}
        {reasons.length > 0 ? (
          <>
            <p>
              <strong>Lý do:</strong>
            </p>
            <ul>
              {reasons.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </>
        ) : null}
      </div>

      {r.safetyNet.length > 0 && level > 1 ? (
        <div class="section">
          <h2>Đi cấp cứu ngay nếu có</h2>
          <ul>
            {r.safetyNet.map((id) => (
              <li key={id}>{findingLabel(kb, id)}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div class="section">
        <h2>Nên khám</h2>
        <p>{level <= 2 ? (kb.text.specialties.emergency ?? 'Cấp cứu') : r.specialties.map((s) => kb.text.specialties[s] ?? s).join(', ')}.</p>
      </div>

      {r.rankingSuppressed ? (
        <div class="section">
          <p>Với trẻ dưới 2 tháng tuổi, ứng dụng không gợi ý tên bệnh. Hãy cho bé đi khám sớm.</p>
        </div>
      ) : r.emergencyStop ? (
        r.urgentConditions.length > 0 ? (
          <div class="section">
            <h2>Bác sĩ cần loại trừ</h2>
            <ul>
              {r.urgentConditions.map((id) => (
                <li key={id}>{conditionName(kb, id)}</li>
              ))}
            </ul>
          </div>
        ) : null
      ) : (
        <div class="section">
          <h2>Tình trạng có thể liên quan</h2>
          {conditions.map((c) => {
            const why = c.supporting
              .map((x) => supportText(kb, x.findingId, x.value))
              .filter((t): t is string => t !== null)
              .slice(0, 3);
            const width = Math.max(2, Math.round(c.probability * 100));
            return (
              <div key={c.conditionId} class="condition">
                <div class="condition__head">
                  <span class="condition__name">{conditionName(kb, c.conditionId)}</span>
                  <span>{percentText(c.display)}</span>
                </div>
                <div class="bar" aria-hidden="true">
                  <span style={{ width: `${width}%` }} />
                </div>
                {c.cantMiss && c.urgency <= 2 ? <span class="tag">Cần loại trừ sớm</span> : null}
                {why.length > 0 ? <p class="why">Vì sao gợi ý: {why.join(', ')}.</p> : null}
              </div>
            );
          })}
          <div class="condition">
            <div class="condition__head">
              <span>Nguyên nhân khác chưa có trong hệ thống</span>
              <span>{percentText(r.other.display)}</span>
            </div>
          </div>
          <details class="more">
            <summary>Con số này nghĩa là gì?</summary>
            <p>
              "Khoảng 65%" nghĩa là: trong 100 người trả lời giống như vậy, ước tính khoảng 65 người là do tình trạng
              này. Đây là ước tính, không phải kết luận.
            </p>
            {r.calibrated ? null : <p>Con số chưa được hiệu chuẩn trên dữ liệu người bệnh thật.</p>}
          </details>
        </div>
      )}

      {selfCare.length > 0 ? (
        <div class="section">
          <h2>Tự chăm sóc an toàn</h2>
          <ul>
            {selfCare.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <p class="note">
        Đây là thông tin tham khảo, không phải chẩn đoán. Nội dung chưa được bác sĩ thẩm định. Phiên bản dữ liệu{' '}
        {r.kbVersion}.
      </p>
      <div class="stack">
        <button type="button" class="btn btn--block" onClick={onReview}>
          Xem lại câu trả lời
        </button>
        <button type="button" class="btn btn--block" onClick={onRestart}>
          Kiểm tra lại từ đầu
        </button>
      </div>
    </div>
  );
}
