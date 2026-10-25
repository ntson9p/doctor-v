# Biên bản đối chiếu lượt C: ectopic_pregnancy (mở rộng, Giai đoạn 3 lô 1)

- Phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-25.
- Bản nháp: `pass-a/extend/ectopic_pregnancy.yaml`, `pass-b/extend/ectopic_pregnancy.yaml`. Giữ nguyên mọi giá trị đã đối chiếu ở Giai đoạn 1.
- Nguồn mở lại: 315/QĐ-BYT (PDF toàn văn, tự trích chữ: 'Toàn thân: có thể choáng ngất do đau, do vỡ khối chửa'; 'Thể lụt máu ổ bụng: đau và choáng nặng do chảy máu trong, xuất hiện đột ngột'; 'choáng do đau và do mất máu: da xanh, niêm mạc nhợt, vã mồ hôi, chi lạnh, mạch nhanh'; thể huyết tụ thành nang có thiếu máu); Joshi 2025 (tóm tắt, API Europe PMC); MSD Ectopic pregnancy (trang MSD: nghĩ tới bệnh ở mọi phụ nữ tuổi sinh đẻ bị ngất không rõ nguyên nhân); NHS Ectopic pregnancy (tải trang); Bösner 2018; hướng dẫn thực hành ESC 2018.
- Trạng thái: giữ `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| prior syncope, dizziness | | | Trùng giá trị (Ngất: 18–44 P4, 13–17 P5, 45–64 P6; Chóng mặt: 18–44 P5, còn lại P6) | | 315; NHS; MSD |
| abdominal_pain | very_frequent (bậc C) | very_frequent (Joshi 82,9%, bậc B) | Bản B | Có số liệu | Joshi 2025 |
| dizziness | frequent | không liên kết | Giữ cho Ngất; mức chung occasional | Lý do của lượt A chỉ đúng với Ngất; khi chạy bộ ca dev, mức frequent cho mọi triệu chứng chính làm câu trả lời 'không' hạ bệnh ở ca Đau bụng (d-ectopic-pregnancy-3 tụt từ hạng 1 xuống hạng 2) | NHS; 315 |
| dizziness_on_standing | frequent | frequent | frequent cho Ngất, Chóng mặt; mức chung occasional | Hai lượt dựa vào người đã choáng, ngất (chảy máu trong); khi Đau bụng phần lớn chưa vỡ | 315; NHS |
| pallor | occasional | frequent | frequent cho Ngất, Chóng mặt; occasional cho Đau bụng | Ngang nguồn; dấu hiệu của tình trạng nguy hiểm nên giữ liên kết mạnh hơn ở nhóm đã choáng, ngất | NHS (da rất tái); 315 |
| cold_hands_feet | không liên kết | occasional | occasional cho Ngất, Chóng mặt; rare (above_leak_ok) cho Đau bụng | Như trên; mức rare vẫn cao hơn tỷ lệ nền 0,01 có chủ ý | 315 |
| abd_pain_severe, theo triệu chứng chính | không | Ngất, Chóng mặt: frequent | Dùng (B) | Người choáng, ngất phần lớn đã vỡ (thể lụt máu ổ bụng; MSD: đau đột ngột dữ dội rồi ngất) | 315; MSD; NHS |
| fainting_or_near_fainting, theo triệu chứng chính | không | Chóng mặt: frequent | Dùng (B) | Tỷ lệ nền 0,25 khi Chóng mặt | NHS; 315 |
| syncope_trigger | 0,05/0,30/0,25/0,15/0,03/0,02/0,20 | 0,10/0,25/0,25/0,12/0,05/0,03/0,20 | Trung bình | | 315; MSD |
| syncope_trigger (nguồn) | | ghi '315: đau kèm mót rặn' | Bỏ ý 'mót rặn' | Trong 315/QĐ-BYT ý này thuộc bài viêm phần phụ, không thuộc bài chửa ngoài tử cung | 315 |
| pulse_measured | | | Trung bình | | 315; MSD |
| not_recovered_after_faint, dizziness_pattern | không liên kết | occasional; phân bố | Giữ (B) | | 315 |

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Prior Ngất, Chóng mặt (ước tính từ tỷ lệ có thai, tỷ lệ chửa ngoài tử cung, như prior Đau bụng).
- Các tần suất theo triệu chứng chính (dựa trên lập luận 'người choáng, ngất phần lớn đã chảy máu trong'), các phân bố.
- Tương tác với liên kết 'có thai' (occasional) của ngất phản xạ: người có thai ngất đơn thuần ra mức 3 (rf_syncope_pregnancy), đúng theo NHS.

## Ảnh hưởng lên triệu chứng chính đã phát hành và bộ ca dev

- Sau khi chỉ để các liên kết mạnh ở Ngất, Chóng mặt: ba ca Đau bụng của bệnh này giữ nguyên mức xử trí và hạng (d-ectopic-pregnancy-3: 36,6% so với 36,8% khi không mở rộng).
- d-ectopic-pregnancy-syncope-1 (có thai 6 tuần, đau bụng dưới dữ dội rồi ngất, da xanh): mức 2 đúng (rf_fainting_with_pain, rf_severe_abdominal_pain), đứng đầu danh sách cần loại trừ; phiên dừng ở câu thứ 4.
