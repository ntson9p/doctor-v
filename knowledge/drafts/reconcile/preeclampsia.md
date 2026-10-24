# Biên bản đối chiếu: Tiền sản giật (`preeclampsia`)

- Người đối chiếu: `agent:pass-c` (lô 4), ngày 2026-10-24.
- Bản nháp: `knowledge/drafts/pass-a/preeclampsia.yaml`, `knowledge/drafts/pass-b/preeclampsia.yaml`.
- Bản chính thức: `knowledge/conditions/preeclampsia.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 18, lượt B 15, chung 12; bản chính thức 20 liên kết.
- Nguồn đã mở lại: 315/QĐ-BYT (PDF, bài Tiền sản giật – sản giật), Thăng 2023 (PDF toàn văn), ICHD-3 (PDF, mục 10.3.4), NHS; Ngwenya 2020, Thangaratinam 2011, Yen 2011 (tóm tắt qua API Europe PMC).
- Không trích NICE NG133 trong bệnh này: trang NICE chặn truy cập tự động và lượt C không dùng dịch vụ đọc trung gian.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `codes.icd10` | O14 | O14.9 | O14 | Bệnh gồm mọi mức độ (kể cả HELLP); dùng mã nhóm | ICD-10 |
| `names` | vi_common: Tiền sản giật, Nhiễm độc thai nghén; en Preeclampsia | Tiền sản giật – sản giật, Nhiễm độc thai nghén; en Pre-eclampsia | Gộp | Câu chữ | 315 |
| `summary_vi` | | | Gộp | Câu chữ | 315, NHS |
| Prior đau đầu | P4 (13–17 tuổi P5) | P5 (13–17 tuổi P6) | **P4 (13–17 tuổi P5)** | Lệch một mức, cả hai là ước lượng có nguồn ngang nhau → mức thận trọng cho bệnh nguy hiểm (kb-guide mục 5). Ước tính thô của lượt C gần P5 (xem mục 2) | 315, Thăng 2023, Ngwenya 2020, Yen 2011 |
| `recent_childbirth`: bậc | C | B | B (judgment) | Cùng mức occasional; 315 ghi sản giật có thể xảy ra thời kỳ hậu sản | 315, NHS, ICHD-3 |
| `bp_measured` | 0,10/0,45/0,28/0,17 (numeric) | 0,10/0,50/0,30/0,10 (verbal) | 0,10/0,47/0,29/0,14 | TVD 0,07; trung bình, dựa số liệu độ 1–3 của Thăng 2023 dịch về mức thấp hơn | Thăng 2023, 315 |
| `headache_location` | phân bố hai bên | không liên kết | **Giữ** | ICHD-3 10.3.4: thường hai bên | ICHD-3 |
| `headache_character` | theo nhịp mạch 0,65 | không liên kết | **Giữ** | ICHD-3 10.3.4: thường theo nhịp mạch | ICHD-3 |
| `headache_severity` | 0,10/0,40/0,50 | 0,15/0,40/0,45 | 0,12/0,40/0,48 | Trung bình | NHS, 315 |
| `headache_worse_activity` | frequent | không liên kết | **Giữ** | ICHD-3 10.3.4 tiêu chuẩn C3 | ICHD-3 |
| `headache_duration` | không liên kết | phân bố dai dẳng | **Giữ** | NHS: đau đầu không đỡ khi dùng thuốc | NHS |
| `blurred_vision`: cơ sở | numeric (Thăng 2023, khoảng 11%) | verbal | numeric, occasional | Cùng mức | Thăng 2023, 315, NHS |
| `edema_face_hands` | occasional (numeric: phù toàn thân 29,4%) | frequent (verbal: 315 "phù thường gặp") | **occasional** | Lệch một mức; giữ mức có số liệu. Câu hỏi chỉ hỏi phù mặt, tay mới xuất hiện (tương ứng phù toàn thân), phù chân đơn thuần không tính | Thăng 2023, 315, NHS |
| `abdominal_pain` | occasional | không liên kết | **Giữ** | Đau thượng vị 22,4% ở thể nặng (Ngwenya 2020); chỉ dùng khi triệu chứng chính là đau đầu | Ngwenya 2020, Thăng 2023, 315 |
| `abd_pain_location` | | | Trung bình (thượng vị 0,50; dưới sườn phải 0,34) | TVD 0,03 | 315, NHS |
| `abd_pain_severe` | không liên kết | occasional | **Giữ** | Dấu hiệu tiền sản giật nặng (315) | 315, NHS |
| `vomiting`: bậc | C | B | B (verbal) | Thêm Thangaratinam 2011, Yen 2011 | NHS, Thangaratinam, Yen |
| `seizure_recent` | rare | không liên kết | **Bỏ** | Mức rare cao hơn tỷ lệ nền 1% (bộ kiểm tra cảnh báo). Lượt A cố ý để tăng khả năng bệnh khi co giật, nhưng tần suất thật (sản giật) chỉ ở mức rare, không đủ căn cứ nâng lên occasional; quy tắc rf_new_seizure (mức 2) đã xử lý co giật | 315 |
| `hypertension_known` | occasional | không liên kết | **Giữ** | NHS: tăng huyết áp có từ trước là yếu tố nguy cơ; tác dụng nhỏ | NHS |
| `fever` | không liên kết | rare | **Giữ** | Không phải triệu chứng của bệnh; có thai kèm sốt nghiêng về nhiễm trùng | 315, NHS |
| `warning_signs` | có `persistent_vomiting` | có `edema_face_hands` | Hợp hai bản | NHS: phù đột ngột và nôn cần kiểm tra ngay | NHS |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | | NHS, 315 |

Giống nhau ở hai lượt: tên chính thức, `urgency` 2, `cant_miss` true, chuyên khoa, `applicability`, prior đau bụng (P5; P6), `pregnant` very_frequent, `gestational_age`, `headache` frequent, `headache_course`, `heartburn` occasional.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- **Prior đau đầu P4.** Ước tính thô của lượt C: khoảng 3–4% phụ nữ 18–44 tuổi đang có thai từ 20 tuần hoặc trong 6 tuần sau sinh; tiền sản giật đang hoạt động ở khoảng 0,5% số thai phụ từ 20 tuần tại một thời điểm, khoảng một nửa có đau đầu; nếu người bị đau đầu dữ dội khi có thai tự kiểm tra nhiều gấp vài lần người đau đầu thường thì prior khoảng 0,05–0,2% (P5). Chọn P4 theo quy tắc thận trọng; cần đối chiếu khi gộp prior các lô (`npm run kb:priors`).
- `pregnant` very_frequent và `recent_childbirth` occasional: tỷ lệ khởi phát sau sinh (15–20%) là ước lượng.
- Phân bố `bp_measured` (dịch từ ca nặng nằm viện), `headache_location`, `headache_character`, `headache_severity`, `headache_duration`, `abd_pain_location`.
- `abdominal_pain`, `abd_pain_severe`, `vomiting`, `heartburn`, `hypertension_known` (occasional); `fever` (rare).

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-preeclampsia-1 (thai 34 tuần, đau đầu, nhìn mờ, phù, 165/110) | Hạng 3 (15%, sau đau nửa đầu 36% và đau đầu căng thẳng 30%), mức 2/2 | Phiên dừng cấp cứu ngay khi biết có thai từ 20 tuần, trước khi hỏi huyết áp, nhìn mờ, phù. Ở thời điểm đó, xếp hạng phản ánh đúng dịch tễ (thai phụ đau đầu phần lớn do đau đầu nguyên phát); giao diện không hiện xếp hạng khi dừng cấp cứu. Không sửa tham số |
| d-preeclampsia-2 (sau sinh 5 ngày) | Hạng 2 (15%, sau đau đầu căng thẳng 30%), mức 2/2 | Mô hình tính 'có thai' và 'vừa sinh con' độc lập: câu trả lời 'không có thai' làm giảm khả năng (một phần được bù khi 'chậm kinh' cũng được hỏi, vì cùng cụm). Xem đề xuất 1 |
| d-preeclampsia-3 (thai 35 tuần, đau thượng vị, nôn, ợ nóng) | Hạng 1 (80%), mức 2/2 | Khi lô 3 có viêm loét dạ dày, viêm túi mật, ca này sẽ khó hơn |

## 4. Đề xuất cho người bảo trì

1. Cho `recent_childbirth` điều kiện `requires: pregnant is absent` (đề xuất của lượt A). Khi đó tần suất có điều kiện của tiền sản giật sẽ gần almost_always và câu trả lời 'không có thai' của người mới sinh không còn bị tính hai lần.
2. Đối chiếu Quyết định 1154/QĐ-BYT (2024) về tăng huyết áp thai kỳ do lượt B nêu; lượt C chưa tìm thấy văn bản (1 lần tìm kiếm).
3. Thêm yếu tố nguy cơ: mang thai lần đầu, đa thai, từng bị tiền sản giật (NHS).
