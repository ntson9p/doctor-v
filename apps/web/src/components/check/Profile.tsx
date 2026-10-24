import type { CompiledKb } from '@doctor-v/engine';
import { useState } from 'preact/hooks';

export interface ProfileData {
  forOther: boolean;
  /** Age as typed, with its unit ("months" is required under 2 years). */
  age: string;
  unit: 'years' | 'months';
  sex: 'female' | 'male' | null;
  regionId: string | null;
}

export const EMPTY_PROFILE: ProfileData = { forOther: false, age: '', unit: 'years', sex: null, regionId: null };

/** Age in completed months, or null when the input is not a plausible age. */
export function ageMonthsOf(p: ProfileData): number | null {
  const n = Number(p.age.replace(',', '.'));
  if (!Number.isFinite(n) || n < 0 || !Number.isInteger(n)) return null;
  if (p.unit === 'months') return n <= 36 ? n : null;
  return n <= 120 ? n * 12 : null;
}

interface Props {
  kb: CompiledKb;
  initial: ProfileData;
  onDone: (p: ProfileData) => void;
}

export function Profile({ kb, initial, onDone }: Props) {
  const [p, setP] = useState<ProfileData>(initial);
  const [tried, setTried] = useState(false);
  const months = ageMonthsOf(p);
  const valid = months !== null && p.sex !== null;
  const who = p.forOther ? 'người được kiểm tra' : 'bạn';

  const submit = (e: Event): void => {
    e.preventDefault();
    setTried(true);
    if (valid) onDone(p);
  };

  return (
    <form onSubmit={submit} noValidate>
      <h1 tabIndex={-1} data-autofocus>
        Thông tin cơ bản
      </h1>

      <fieldset class="stack">
        <legend>Kiểm tra cho ai?</legend>
        <label class="choice">
          <input type="radio" name="who" checked={!p.forOther} onChange={() => setP({ ...p, forOther: false })} />
          <span>Cho bản thân</span>
        </label>
        <label class="choice">
          <input type="radio" name="who" checked={p.forOther} onChange={() => setP({ ...p, forOther: true })} />
          <span>Cho người thân</span>
        </label>
      </fieldset>

      <div class="field">
        <label for="age">Tuổi của {who}</label>
        <div class="row">
          <input
            id="age"
            inputMode="numeric"
            autoComplete="off"
            value={p.age}
            aria-describedby="age-help"
            aria-invalid={tried && months === null}
            onInput={(e) => setP({ ...p, age: (e.target as HTMLInputElement).value.trim() })}
            style={{ flex: '1 1 6rem' }}
          />
          <select
            aria-label="Đơn vị tuổi"
            value={p.unit}
            onChange={(e) => setP({ ...p, unit: (e.target as HTMLSelectElement).value === 'months' ? 'months' : 'years' })}
            style={{ flex: '1 1 8rem' }}
          >
            <option value="years">tuổi</option>
            <option value="months">tháng tuổi</option>
          </select>
        </div>
        <p id="age-help" class="note">
          Trẻ dưới 2 tuổi: chọn "tháng tuổi" và nhập số tháng.
        </p>
        {tried && months === null ? <p class="error">Vui lòng nhập tuổi bằng số.</p> : null}
      </div>

      <fieldset class="stack">
        <legend>Giới tính của {who}</legend>
        <label class="choice">
          <input type="radio" name="sex" checked={p.sex === 'female'} onChange={() => setP({ ...p, sex: 'female' })} />
          <span>Nữ</span>
        </label>
        <label class="choice">
          <input type="radio" name="sex" checked={p.sex === 'male'} onChange={() => setP({ ...p, sex: 'male' })} />
          <span>Nam</span>
        </label>
        {tried && p.sex === null ? <p class="error">Vui lòng chọn giới tính.</p> : null}
      </fieldset>

      <div class="field">
        <label for="region">Đang sống ở đâu? (không bắt buộc)</label>
        <select
          id="region"
          value={p.regionId ?? ''}
          onChange={(e) => {
            const v = (e.target as HTMLSelectElement).value;
            setP({ ...p, regionId: v === '' ? null : v });
          }}
        >
          <option value="">Không chọn</option>
          {kb.regions.map((id) => (
            <option key={id} value={id}>
              {kb.text.regions[id] ?? id}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" class="btn btn--primary btn--block">
        Tiếp tục
      </button>
    </form>
  );
}
