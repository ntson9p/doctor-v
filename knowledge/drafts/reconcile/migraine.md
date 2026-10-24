# Biên bản đối chiếu: Đau nửa đầu (`migraine`)

- Người đối chiếu: `agent:pass-c` (lô 4), ngày 2026-10-24.
- Bản nháp: `knowledge/drafts/pass-a/migraine.yaml`, `knowledge/drafts/pass-b/migraine.yaml`.
- Bản chính thức: `knowledge/conditions/migraine.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 16, lượt B 14, chung 14; bản chính thức 15 liên kết (bỏ 2, thêm 1).
- Nguồn đã mở lại: ICHD-3 (PDF), NHS; Stovner 2022, Vo 2024 (toàn văn); Rasmussen 1991, 1992 (hai bài), 1993, Smetana 2000, Detsky 2006, Silberstein 1995, Evans 2008, Kelman 2005, Chakravarty 2008, Inan 1994, Carlsen 2024 (tóm tắt qua API Europe PMC). Không trích NICE CG150 (trang NICE chặn truy cập tự động).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `codes.icd10` | G43 | G43.9 | G43 | Bệnh gồm mọi thể; dùng mã nhóm | ICD-10 |
| `names.vi_common` | Đau nửa đầu (migraine), Thiên đầu thống | Đau nửa đầu, Migraine, Đau đầu vận mạch | Hợp; tên hiển thị "Đau nửa đầu (migraine)" | pilot-scope | |
| `specialties` | neurology, general_medicine | neurology | Theo lượt A | Phần lớn được khám và điều trị ở tuyến ban đầu; đồng nhất với đau đầu căng thẳng | Carlsen 2024 |
| Prior: cơ sở | numeric | judgment | judgment | Tỷ lệ mắc không phải tỷ lệ trong người đau đầu đi khám | Stovner, Vo |
| Prior 2 tháng–5 tuổi | P4 | P3 | **P3** | Lượt B có số liệu (0–9 tuổi 5,0%) | Stovner 2022 |
| Prior 13–17 tuổi | P1 | P2 | **P1** | Lệch một mức; chính số liệu của lượt B (Stovner: 10–19 tuổi 13,4% trên 57,9% người có đau đầu, khoảng 23%) ở mức P1 | Stovner 2022 |
| Prior 45–64 tuổi | P2 | P1 | **P2** | Lệch một mức, không có số liệu riêng cho 45–64 tuổi (Stovner gộp 20–64); bệnh giảm theo tuổi (Vo 2024: OR 0,84 mỗi năm) và nguyên nhân thứ phát tăng; chọn mức thận trọng cho bệnh lành tính | Stovner, Vo |
| Prior 65–74 tuổi | P3 | P2 | **P2** | Lượt B có số liệu (từ 65 tuổi 7,9% trên 40,2%, khoảng 20%) | Stovner 2022 |
| Prior từ 75 tuổi | P4 | P3 | **P3** | Lượt B có số liệu theo tuổi | Stovner 2022 |
| `prior_modifiers` (giới) | không có | nữ 1,25; nam 0,8 | **Giữ, đổi thành 1,2 và 0,85** | Khác biệt rõ (Vo 2024: nữ OR hiệu chỉnh 1,77). Trong số người đau đầu, tỉ số nữ/nam là 1,26 (Vo 2024) đến 1,6 (Stovner 2022); chọn tỉ số khoảng 1,4 | Stovner 2022, Vo 2024 |
| `headache_location` | 0,50/0,14/0,18/0,05/0,13 | 0,50/0,15/0,15/0,05/0,15 | Trung bình | TVD 0,03 | Rasmussen, Inan, Kelman, Chakravarty |
| `headache_character` | nhịp mạch 0,78 | 0,72 | 0,75 | Trung bình | Rasmussen 1991, Inan 1994 |
| `headache_severity` | 0,07/0,38/0,55 | 0,10/0,45/0,45 | 0,08/0,42/0,50 | TVD 0,10; trung bình | Rasmussen, Inan, ICHD-3 |
| `headache_duration` | 0,30/0,60/0,10 | 0,30/0,63/0,07 | 0,30/0,62/0,08 | Trung bình | ICHD-3, NHS |
| `photophobia`, `phonophobia`: bậc | B/numeric (Evans 2008) | A/verbal (Smetana) | B/numeric, very_frequent | Cùng mức; giữ số liệu trực tiếp (76% khi hỏi thông thường) | Evans 2008, Smetana 2000 |
| `vision_loss_or_double` | rare | không liên kết | **Bỏ** | Mức rare cao hơn tỷ lệ nền 1% (bộ kiểm tra cảnh báo). very_rare cũng không đúng vì tiền triệu có thể để lại ám điểm; bỏ để trung tính. Quy tắc rf_vision_loss (mức 2) xử lý | ICHD-3 |
| `neck_stiffness` | rare | không liên kết | **Bỏ** | Như trên; ICHD-3 ghi cứng cổ là triệu chứng báo trước của cơn, nên mức thấp hơn nền cũng không đúng. Quy tắc rf_neck_stiffness (mức 2) xử lý | ICHD-3 |
| `headache_thunderclap` | không liên kết | không liên kết | **Thêm very_rare** | Ghi chú lô 4: tỷ lệ nền 1%, mức rare sẽ làm tăng sai; ICHD-3 không xếp đau nửa đầu vào nguyên nhân đau đầu sét đánh, yêu cầu đánh giá xuất huyết dưới nhện; NHS: gọi 999 | ICHD-3, NHS |
| `warning_signs` | không có `es_stroke_signs` | có | Hợp hai bản | | |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | Thêm lời khuyên khám trong ngày khi có thai hoặc mới sinh (NHS) | NHS |

Giống nhau ở hai lượt: tên chính thức, `urgency` 5, `cant_miss` false, prior P1 cho 18–44 tuổi, P2 cho 5–12 tuổi, `headache_course`, `headache_worse_activity`, `nausea`, `photophobia`, `phonophobia` (very_frequent), `vomiting`, `visual_aura`, `blurred_vision` (occasional), `stress_poor_sleep` (frequent), `fever` (rare).

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior theo tuổi (P1/P2/P3) và hệ số giới 1,2/0,85 (áp dụng cho mọi lứa tuổi, dù ở trẻ dưới 10 tuổi khác biệt nhỏ).
- Phân bố `headache_duration`, `headache_course`; tách "vừa" và "nặng" ở `headache_severity`.
- Tần suất trong một cơn của buồn nôn, sợ ánh sáng, sợ tiếng ồn, tiền triệu (suy từ tỷ lệ "từng có" và LR).
- `headache_thunderclap` very_rare.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-migraine-1 (điển hình) | Hạng 1 (96%), mức 5/5 | |
| d-migraine-2 (nam 15 tuổi, hai bên, cơn ngắn, nôn) | Hạng 1 (98%), mức 5/5 | |
| d-migraine-3 (tiền triệu thị giác, dễ nhầm đột quỵ) | Hạng 1 (96%), mức 5/5 | |

Bản nhiễu của ca 2 và 3 cho mức 3 (dấu hiệu nguy hiểm không có câu hỏi thay thế bị đổi thành "Không rõ"); đây là chủ ý an toàn.

## Ghi chú của người bảo trì (2026-10-25)

Tỷ lệ nền của `headache_thunderclap` được hạ từ 1% xuống 0,2% theo đề xuất của lượt C (Linn 1994). Liên kết `very_rare` (0,5%) vì vậy đã cao hơn tỷ lệ nền, nên đã bỏ: bệnh lành tính dùng tỷ lệ nền.
