import type { CompiledKb } from '@doctor-v/engine';
import { findingLabel } from '../../lib/explain.ts';

interface Props {
  kb: CompiledKb;
  signs: string[];
  onBack: () => void;
}

/** Shown as soon as an emergency-screen sign is chosen; needs no network. */
export function Call115({ kb, signs, onBack }: Props) {
  const level = kb.text.triageLevels['1'];
  return (
    <div>
      <div class="triage triage--1" role="alert">
        <h1 class="triage__label" tabIndex={-1} data-autofocus>
          <span aria-hidden="true">🚨</span> {level?.label ?? 'Gọi 115 ngay'}
        </h1>
        <p>{level?.action}</p>
        <a class="btn btn-115 btn--block" href="tel:115">
          Gọi 115
        </a>
      </div>
      {signs.length > 0 ? (
        <div class="section">
          <h2>Dấu hiệu đã chọn</h2>
          <ul>
            {signs.map((id) => (
              <li key={id}>{findingLabel(kb, id)}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div class="section">
        <h2>Trong lúc chờ</h2>
        <ul>
          <li>Ở cạnh người bệnh cho tới khi có người hỗ trợ.</li>
          <li>Mang theo giấy tờ tùy thân và các thuốc đang dùng.</li>
        </ul>
      </div>
      <button type="button" class="btn btn--block" onClick={onBack}>
        Tôi chọn nhầm, quay lại
      </button>
    </div>
  );
}
