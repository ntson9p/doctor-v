# Biên bản đối chiếu: Xuất huyết dưới nhện (`subarachnoid_hemorrhage`)

- Người đối chiếu: `agent:pass-c` (lô 4), ngày 2026-10-24.
- Bản nháp: `knowledge/drafts/pass-a/subarachnoid_hemorrhage.yaml`, `knowledge/drafts/pass-b/subarachnoid_hemorrhage.yaml`.
- Bản chính thức: `knowledge/conditions/subarachnoid_hemorrhage.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 16, lượt B 20, chung 15; bản chính thức 19 liên kết.
- Nguồn đã mở lại: 3312/QĐ-BYT (2024) trên luatvietnam.vn (lượt R chưa mở được; lượt C sửa `verified: true` trong sổ nguồn), ICHD-3 (PDF), MSD, NHS; Perry 2010 (toàn văn, bảng 2); Perry 2013, Carpenter 2016, de Rooij 2007, Linn 1994, Stovner 2022 (tóm tắt hoặc toàn văn qua API Europe PMC). Không trích NICE NG228 (trang NICE chặn truy cập tự động).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `codes.icd10` | I60 | I60.9 | I60 | Dùng mã nhóm | ICD-10 |
| `names.vi_common` | có "Xuất huyết dưới nhện" đứng đầu | bắt đầu bằng "Chảy máu dưới nhện" | Theo lượt A (tên hiển thị trùng pilot-scope) | | |
| `summary_vi` câu 3 | "Đây là cấp cứu, cần gọi 115 ngay." | "...vì có thể chảy máu lại và tử vong nhanh" | Theo lượt B | Nêu lý do; 3312: chảy máu lại sớm 18% | 3312 |
| Prior từ 45 tuổi | P5 | P4 | **P4** | Lệch một mức; lượt B có số liệu tỷ suất theo tuổi (de Rooij 2007: dưới 25 tuổi bằng 0,1 lần nhóm 45–55, trên 85 tuổi 1,6 lần) và là mức thận trọng; đau đầu lành tính giảm theo tuổi | de Rooij 2007, Stovner 2022, Linn 1994, 3312 |
| `headache_course` | 0,90/0,05/0,05 | 0,90/0,06/0,04 | 0,90/0,05/0,05 (numeric) | Chênh rất nhỏ; Linn 1994: chỉ 2/37 người từng có cơn đột ngột trước đó | Linn 1994, Perry 2010 |
| `headache_location` | gáy 0,40, trán 0,07 | gáy 0,30, trán 0,15 | gáy 0,35, trán 0,11 (trung bình) | TVD 0,10 | 3312 |
| `headache_duration`: bậc | C | B | B (judgment) | Trung bình 0,55/0,36/0,09 | Perry 2010, Carpenter 2016, NHS |
| `bp_measured` | 0,25/0,27/0,25/0,23 | 0,25/0,30/0,25/0,20 | 0,25/0,29/0,25/0,21 | Trung bình; suy từ huyết áp tâm thu 159 ± 29 mmHg | Perry 2010 |
| `seizure_recent`, `es_stroke_signs`, `vision_loss_or_double`, `confusion`: bậc, cơ sở | B/verbal hoặc judgment | C/judgment hoặc verbal | B, occasional | Cùng mức; nguồn chính là 3312/QĐ-BYT (đã xác minh) | 3312, MSD, NHS, ICHD-3 |
| `hypertension_known` | occasional (B/verbal) | frequent (B/judgment) | **occasional** | Lệch một mức, cả hai không có tỷ lệ tăng huyết áp đã biết. Ước tỷ lệ ở người bệnh khoảng 25–35% (yếu tố nguy cơ theo 3312; huyết áp lúc đến viện cao hơn, Perry 2010), trong khoảng occasional; mức này không làm câu trả lời "Không" giảm khả năng một bệnh không được bỏ sót | 3312, Perry 2010 |
| `sudden_loss_of_balance` | occasional (dấu hiệu đề xuất) | không liên kết (dấu hiệu chưa có trong danh mục) | **Giữ** | Dấu hiệu nay đã có; 3312/QĐ-BYT liệt kê mất thăng bằng trong triệu chứng khác | 3312 |
| `nausea` | không liên kết | frequent | **Giữ** | Buồn nôn ít nhất cũng thường như nôn (58,6%); NHS | Perry 2010, NHS |
| `drowsy_hard_to_wake` | không liên kết | occasional | **Giữ** | 3312, NHS; cùng cụm với lú lẫn | 3312, NHS |
| `photophobia` | không liên kết | occasional | **Giữ** | NHS: rất sợ ánh sáng; tránh để đau nửa đầu lấn át | NHS, ICHD-3 |
| `smoker` | không liên kết | frequent | **Bỏ** | Nguồn chỉ nêu là yếu tố nguy cơ, không cho tần suất; tỷ lệ nền 20% gộp cả nam (hút nhiều) và nữ (rất ít) trong khi bệnh gặp ở nữ nhiều hơn: câu trả lời "Không hút thuốc" của phụ nữ sẽ làm giảm sai khả năng bệnh | 3312 |
| `heavy_alcohol` | không liên kết | occasional | **Bỏ** | Như trên; tác động nhỏ và lệch theo giới | 3312 |
| `warning_signs` | có `persistent_vomiting` | không có | Hợp hai bản | | |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | | NHS, Carpenter 2016 |

Giống nhau ở hai lượt: tên chính thức, `urgency` 1, `cant_miss` true, chuyên khoa, prior 18–44 tuổi P5 và dưới 18 tuổi P6, `headache_thunderclap` very_frequent, `neck_stiffness` frequent, `vomiting` frequent, `fainting_or_near_fainting` occasional, `headache_severity`, `fever` rare.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P5 (18–44 tuổi), P4 (từ 45 tuổi), P6 (dưới 18 tuổi); chưa có số liệu Việt Nam.
- Hạ một mức đau đầu sét đánh và cứng gáy vì số liệu ở khoa cấp cứu.
- `seizure_recent`, `confusion`, `drowsy_hard_to_wake`, `es_stroke_signs`, `vision_loss_or_double`, `sudden_loss_of_balance`, `photophobia`, `hypertension_known` (occasional, mô tả bằng lời); `nausea` frequent.
- Phân bố `headache_location`, `headache_duration`.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-subarachnoid-hemorrhage-1 (điển hình, cứng gáy) | Hạng 1 (96%), mức 1/1 | |
| d-subarachnoid-hemorrhage-2 (đến muộn, không cứng gáy) | Hạng 6 (1,8%), mức 1/1 | Xem mục 4 |
| d-subarachnoid-hemorrhage-3 (dễ nhầm đau nửa đầu) | Hạng 6 (1,5%), mức 1/1 | Xem mục 4 |

Mức xử trí đúng ở cả 3 ca nhờ quy tắc rf_thunderclap_headache (mức 1); giao diện không hiện xếp hạng khi dừng cấp cứu. Nhưng xếp hạng thấp cho thấy một vấn đề của danh mục, không phải của bệnh này: không sửa tham số của bệnh để ca đạt.

## 4. Đề xuất cho người bảo trì

1. **Hạ tỷ lệ nền của `headache_thunderclap`** từ 1% xuống khoảng 0,2% (`leak: 0.002`, kèm leak_note). Căn cứ: Linn 1994: bác sĩ đa khoa Hà Lan gặp 148 người đau đầu đột ngột, dữ dội trong 5 năm, 25% là xuất huyết dưới nhện; với prior hiện có (khoảng 0,07%) và tần suất 80%, tỷ lệ nền 1% chỉ cho khoảng 2–8% khả năng sau câu trả lời "Có", trong khi tỷ lệ nền 0,2% cho khoảng 20%, gần với Linn 1994. Nếu hạ, phải **bỏ** các liên kết very_rare (0,5%) của đau đầu căng thẳng và đau nửa đầu (khi đó cao hơn nền), và các bệnh lô 1 (cảm lạnh, cúm, viêm xoang, COVID-19) không nên liên kết dấu hiệu này.
2. Tương tự, xem lại tỷ lệ nền 1% của `vision_loss_or_double` và `sudden_loss_of_balance` ở người đau đầu (xem biên bản `stroke.md`).
