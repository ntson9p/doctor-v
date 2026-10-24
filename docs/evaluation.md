# Kiểm định độ chính xác và an toàn

Cách doctor-v đo độ chính xác: định dạng ca kiểm thử (vignette), "bệnh nhân mô phỏng", chỉ số và chỉ tiêu.
Căn cứ: `docs/research/symptom-checker-methodology.md` (mục 4) và `docs/plan.md` (mục 7).

---

## 1. Ba bộ ca kiểm thử

| Bộ | Thư mục | Ai viết | Dùng để |
|---|---|---|---|
| `dev` | `evaluation/vignettes/dev/` | Người soạn bệnh (lượt C), ít nhất 3 ca/bệnh | Phát triển, tinh chỉnh tham số |
| `holdout` | `evaluation/vignettes/holdout/` | Agent riêng, **không được đọc** `knowledge/conditions/` và `knowledge/drafts/` | Chấm điểm ở các mốc; không dùng để sửa dữ liệu |
| `external` | `evaluation/vignettes/external/` | Chuyển thể từ bộ ca đã công bố (Semigran 2015, Levine 2021) | So sánh với các nghiên cứu |

**Quy tắc giữ kín:** nếu một ca `holdout` được dùng để sửa dữ liệu, ca đó phải chuyển sang `dev` và có ca mới thay thế. Mọi lần chấm điểm `holdout` đều ghi vào `evaluation/reports/`.

## 2. Định dạng một ca

Mỗi ca là một file `evaluation/vignettes/<bộ>/<id>.yaml`:

```yaml
id: hold-fever-001                # chữ thường, số, gạch ngang; trùng tên file
set: holdout                      # dev | holdout | external
title_vi: "Nam 32 tuổi, sốt cao 3 ngày, đau sau hốc mắt"
narrative_vi: "Anh A, 32 tuổi, sống ở TP.HCM. Sốt cao 39,5°C ba ngày nay, đau nhức người, đau sau hốc mắt. Không ho, không sổ mũi."
patient:
  age_years: 32                   # hoặc age_months (bắt buộc dùng tháng cho trẻ dưới 2 tuổi)
  sex: male                       # female | male
  region: south                   # không bắt buộc: north | central | highlands | south
  month: 8                        # không bắt buộc: tháng 1–12 (dùng cho bệnh theo mùa)
complaint: fever                  # triệu chứng chính người bệnh chọn
answers:                          # câu trả lời của người bệnh, dùng ID trong knowledge/findings/
  fever_max_temp: ge_39           # dấu hiệu nhiều lựa chọn: ID lựa chọn hoặc unknown
  fever_duration: d3_5
  retro_orbital_pain: present     # dấu hiệu có/không: present | absent | unknown
  myalgia: present
  cough: absent
  runny_nose: absent
default_unmentioned: absent       # dấu hiệu có/không không ghi ở trên được trả lời là gì (absent | unknown)
expected:
  condition: dengue               # bệnh đúng (ID), hoặc "other" nếu bệnh không có trong hệ thống
  acceptable: []                  # bệnh khác cũng chấp nhận được (nếu ca thật sự mơ hồ)
  triage: 3                       # mức xử trí đúng 1–5 theo hướng dẫn
source:
  basis: "Ca điển hình theo hướng dẫn 2760/QĐ-BYT"
  references: [byt-qd-2760-2023]
author: "agent:vignette-holdout"
```

**Lưu ý khi viết ca:**
- Ghi **mọi dấu hiệu người bệnh thật sẽ trả lời "có"**. Dấu hiệu bỏ sót sẽ bị trả lời "không" (theo `default_unmentioned: absent`), giống người bệnh thật.
- Ghi rõ các dấu hiệu **"không"** quan trọng để phân biệt (ví dụ không ho, không tiêu chảy).
- Dấu hiệu cần đo (nhiệt độ, huyết áp) nếu không ghi sẽ được coi là "không rõ".
- Không ghi dấu hiệu không áp dụng cho đối tượng (ví dụ `pregnant` cho nam).
- Không ghi dấu hiệu mà triệu chứng chính đã ngầm định ("fever" khi chọn triệu chứng chính "fever").
- Mức xử trí đúng (`expected.triage`) dựa trên hướng dẫn chính thức, theo định nghĩa 5 mức trong `knowledge/meta/triage-levels.yaml`.

Kiểm tra: `npm run eval:check` (hoặc `npm run eval:check -- --set holdout`).

## 3. Bệnh nhân mô phỏng

Bộ chạy (`evaluation/src/`) chạy toàn bộ phiên hỏi đáp của bộ suy luận. Khi bộ suy luận hỏi:
- dấu hiệu có trong `answers`: trả lời đúng giá trị đó;
- dấu hiệu có/không không có trong `answers`: trả lời theo `default_unmentioned`;
- dấu hiệu nhiều lựa chọn không có trong `answers`: "không rõ";
- câu hỏi nhóm: từng mục trả lời như trên.

**Biến thể nhiễu:** mỗi ca chạy thêm phiên bản đổi ngẫu nhiên (có hạt giống cố định) 15% câu trả lời thành "không rõ", để kiểm tra mức xử trí vẫn an toàn khi người dùng không chắc.

## 4. Chỉ số

| Chỉ số | Định nghĩa |
|---|---|
| Top-1 / top-3 / top-10 | Bệnh đúng (hoặc bệnh trong `acceptable`) nằm ở vị trí 1 / trong 3 / trong 10 bệnh đứng đầu. Ca `other` không tính |
| Mức xử trí đúng | Mức gợi ý bằng mức đúng |
| Mức xử trí an toàn | Mức gợi ý khẩn bằng hoặc hơn mức đúng (số nhỏ hơn hoặc bằng) |
| Bỏ sót cấp cứu | Trong các ca mức đúng 1–2, tỷ lệ ca được gợi ý mức kém khẩn hơn |
| Khuyên quá mức | Tỷ lệ ca được gợi ý khẩn hơn mức đúng |
| Tự chăm sóc nhận đúng | Trong các ca mức đúng 5, tỷ lệ ca được gợi ý mức 5 |
| Hiệu chuẩn (ECE) | Chênh lệch trung bình giữa xác suất hiển thị và tỷ lệ đúng thực tế, chia 10 khoảng |
| Brier | Sai số bình phương trung bình của xác suất cho bệnh đúng |
| Số câu hỏi | Trung vị và phân vị 90 số màn hình câu hỏi mỗi phiên |

## 5. Chỉ tiêu (trên bộ `holdout`)

| Chỉ số | Chỉ tiêu |
|---|---|
| Top-1 / top-3 / top-10 | ≥ 45% / ≥ 65% / ≥ 85% |
| Mức xử trí an toàn | ≥ 97% |
| Bỏ sót cấp cứu | ≤ 5% |
| Khuyên quá mức | ≤ 35% |
| Tự chăm sóc nhận đúng | ≥ 50% |
| ECE | ≤ 0,10 |
| Số câu hỏi trung vị | ≤ 20 |

**Cổng tự động:** một thay đổi dữ liệu bị chặn nếu top-3 trên bộ `dev` giảm quá 2 điểm phần trăm, hoặc xuất hiện thêm ca cấp cứu bị bỏ sót.

**Giới hạn:** bệnh nhân mô phỏng trả lời "hoàn hảo" theo dữ kiện ca, nên độ chính xác ngoài đời thực sẽ thấp hơn. Chỉ thử song song ở cơ sở y tế mới đo được độ chính xác thật.
