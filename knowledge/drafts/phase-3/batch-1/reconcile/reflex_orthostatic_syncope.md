# Biên bản đối chiếu lượt C: reflex_orthostatic_syncope

- Giai đoạn 3, lô 1, phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-25.
- Bản nháp: `pass-a/reflex_orthostatic_syncope.yaml`, `pass-b/reflex_orthostatic_syncope.yaml`. Bản chính thức: `knowledge/conditions/reflex_orthostatic_syncope.yaml`.
- Nguồn mở lại: Soteriades 2002, Romme 2008, Alboni 2001, Del Rosso 2008 (tóm tắt, API Europe PMC); Berecki 2013 (toàn văn PMC, bảng 2); Bösner 2018 (toàn văn PMC); Maarsingh 2010 (tóm tắt); hướng dẫn thực hành ESC 2018 (trang OUP); NHS Low blood pressure (tải trang). ESC 2018 và NHS Fainting đã có trong sổ đăng ký, lượt R xác minh cùng ngày.
- Trạng thái: `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi | "…hạ huyết áp tư thế đứng" | "…hạ huyết áp thế đứng" | Bản A | Cách gọi thông dụng trong tài liệu Việt Nam | — |
| names.vi_common | Ngất phế vị, Cường phế vị, Tụt huyết áp khi đứng dậy, Hạ huyết áp do thuốc | Ngất xỉu thông thường, … | Bản A | "Cường phế vị" là từ người dân hay dùng; "thông thường" dễ hiểu là trấn an | Quy tắc viết mục 5 |
| names.en, summary_vi | — | — | Bản B | Mô tả rõ hơn, mỗi câu một ý | — |
| specialties | cardiology trước | general_medicine trước | Bản B | Ngất lành tính khám đa khoa trước | NHS Fainting |
| prior dizziness, 5–12 tuổi | P2 (mặc định) | P3 | P2 | Lệch một mức, ngang nguồn (cả hai ước lượng); tiền ngất, choáng khi đứng dậy vẫn hay gặp ở trẻ lớn | Bösner 2018 |
| syncope_trigger | 0,33/0,18/0,25/0,08/0,01/0,01/0,14 | 0,33/0,18/0,25/0,09/0,02/0,01/0,12 | Trung bình; gắng sức 0,02, khi nằm 0,02 | Theo số liệu Berecki (2% ở ngất không do tim) | Berecki 2013 bảng 2 |
| syncope_warning | 0,75/0,05/0,20 | 0,80/0,07/0,13 | 0,75/0,07/0,18 | Hồi hộp 11% ở ngất không do tim; người cao tuổi ít tiền triệu | Berecki 2013; Romme 2008 |
| bp_lowering_meds, theo tuổi | rare/very_rare dưới 45 tuổi; frequent từ 65 | chỉ frequent từ 65 | Bản B | Tỷ lệ nền 0,15 không đổi theo tuổi: mức rare làm người trẻ uống thuốc hạ áp mà ngất bị giảm khả năng hạ huyết áp do thuốc, ngược với ESC | ESC 2018; hướng dẫn thực hành ESC bảng web 1 |
| similar_episodes_before | very_frequent | frequent | frequent | Tỷ lệ từng có cơn trước dao động 34–81% theo bối cảnh (Rochester 66% ngất lần đầu); very_frequent làm 'lần đầu' giảm khả năng 4 lần | Berecki 2013 |
| dizziness | very_frequent | không liên kết | Giữ (A) | Có số liệu: choáng váng 73,4% trước cơn | Romme 2008 |
| fainting_or_near_fainting | very_frequent | không liên kết | Giữ (A) | Kiểu tiền ngất 69% ở người cao tuổi chóng mặt; tỷ lệ nền 0,25 khi Chóng mặt | Maarsingh 2010 |
| abdominal_pain | occasional | không liên kết | Giữ (A) | Khó chịu ở bụng trước ngất gợi ý ngất phản xạ; đau là yếu tố khởi phát | Alboni 2001; ESC 2018 bảng 5 |
| not_recovered_after_faint | (chưa có dấu hiệu) | rare | Giữ (B) | Ngất phản xạ hồi phục hoàn toàn nhanh | ESC 2018; NHS Fainting |
| known_heart_disease | không liên kết | rare | Giữ (B) | Không có bệnh tim gợi ý ngất phản xạ | Alboni 2001; ESC 2018 bảng 5 |
| pregnant | không liên kết | occasional | Giữ (B) | Có thai gây hạ huyết áp, choáng; không liên kết thì người có thai ngất đơn thuần bị đẩy lên chửa ngoài tử cung mức 2, trong khi NHS và quy tắc rf_syncope_pregnancy chỉ là mức 3 | NHS Low blood pressure; NHS Ectopic pregnancy |
| cold_hands_feet | không liên kết | occasional | Bỏ | Tỷ lệ nền 0,15 khi Ngất (người bảo trì thêm sau lượt B) đã tính da tái sau ngất thông thường; khi Chóng mặt (tỷ lệ nền 0,01) liên kết sẽ tăng một bệnh lành tính 20 lần trên dấu hiệu sốc | Danh mục `cold_hands_feet` |
| dizziness_pattern | 0,45/0,30/0,05/0,20 | 0,50/0,25/0,05/0,20 | Trung bình | Lệch nhỏ | ESC thực hành; Maarsingh |
| pulse_measured | lệch dưới 0,005 | | Bản B | Lệch rất nhỏ | — |
| Bậc bằng chứng đau ngực | C (NHS) | B (ESC bảng 6) | B | ESC bảng 6 nêu đúng đặc điểm này | ESC 2018 |
| warning_signs | đau ngực, khó thở, lú lẫn, phân đen | chưa hồi phục, đau ngực, khó thở, hồi hộp, phân đen, bất tỉnh/co giật | Bản B | Khớp danh sách 'Call 999' của NHS Fainting | NHS Fainting |
| self_care_vi, see_doctor_vi | | | Gộp hai bản, tách câu dài | | NHS Fainting |

Ghi chú: danh mục đã nâng tỷ lệ nền của `vertigo_spinning` lên 0,4; mức occasional của hai lượt vẫn thấp hơn nên giữ, chỉ sửa ghi chú.

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Prior Chóng mặt (P2, từ 65 tuổi P1): Bösner, Maarsingh không tách hạ huyết áp tư thế khỏi nhóm tim mạch.
- Phân bố hoàn cảnh ngất, dấu hiệu báo trước, kiểu chóng mặt, mạch.
- `dizziness_on_standing` frequent; `bp_lowering_meds` occasional/frequent; `abdominal_pain` occasional; `pregnant` occasional; `known_heart_disease` rare; `dizziness_positional` rare; `vertigo_spinning` occasional.

## Kiểm tra trên bộ ca dev

- 3 ca đều đúng mức xử trí và đứng đầu (d-reflex-orthostatic-syncope-1/2/3; ca 2 và 3 là người 67 và 60 tuổi).
- **Lo ngại của lượt B được xác nhận ở thời điểm bắt đầu phiên:** người ngất từ 45 tuổi bắt đầu ở mức 2 chỉ vì xác suất. Tổng xác suất bệnh không được bỏ sót mức 1–2 trước khi trả lời câu nào: nam 45–64 tuổi 2,72%, nữ 1,74%; nam 65–74 tuổi 4,29%, nữ 3,31% (ngưỡng 1%). Phần lớn do xuất huyết tiêu hóa trên (nam, hệ số 1,6), hội chứng mạch vành cấp, thuyên tắc phổi, nhiễm khuẩn huyết. Sau khi trả lời không có dấu hiệu nào ở hai nhóm dấu hiệu nguy hiểm, kèm hoàn cảnh và tiền triệu điển hình, tổng này còn 0,13–0,31%: mức 4 (mức 3 từ 75 tuổi vì ngưỡng giảm một nửa). Ở bản nhiễu, hai ca 60 và 67 tuổi ra mức 3 (do câu dấu hiệu nguy hiểm 'Không rõ'), không ca nào ra mức 2. Không chỉnh prior chỉ để tránh hiện tượng này.
