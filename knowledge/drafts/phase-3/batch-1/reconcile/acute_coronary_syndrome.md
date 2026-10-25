# Biên bản đối chiếu lượt C: acute_coronary_syndrome (mở rộng, Giai đoạn 3 lô 1)

- Phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-25.
- Bản nháp: `pass-a/extend/acute_coronary_syndrome.yaml`, `pass-b/extend/acute_coronary_syndrome.yaml`. Giữ nguyên mọi giá trị đã đối chiếu ở Giai đoạn 1.
- Nguồn mở lại: Reed 2010, Grossman 2003, Georgeson 1992, Weber 1996 (tóm tắt, API Europe PMC); Bösner 2018 (toàn văn); Maarsingh 2010; EHRA 2011 và hướng dẫn thực hành ESC 2018 (trang OUP); 2187/QĐ-BYT (trang vnras.com: triệu chứng không điển hình 'cảm giác hồi hộp', chuyển viện ngay khi có cơn ngất, rung nhĩ 21%).
- Trạng thái: giữ `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| prior syncope | từ 45 tuổi P4; 18–44 P5; dưới 18 P6 | từ 45 tuổi P4; dưới 45 P6 | Bản A | 18–44 tuổi lệch một mức, ngang nguồn; thận trọng hơn | Reed 2010; Grossman 2003 |
| prior palpitations, dizziness | | | Trùng giá trị | | 2187; van Oosterhout; Bösner |
| chest_pain_pressure, theo triệu chứng chính | không đổi | Ngất, Chóng mặt: occasional | Không dùng | Nguồn không cho thấy khác biệt rõ: Canto 2000 cho tỷ lệ đau ngực khoảng hai phần ba ở mọi kiểu biểu hiện; Georgeson 1992 chọn người ngất không đau ngực nên không cho biết tỷ lệ; Grossman 2003: 2/3 người cao tuổi ngất có men tim tăng có khó chịu ở ngực (số rất nhỏ). Có đau ngực kèm ngất, choáng thì quy tắc đã xếp mức 1 | Canto 2000; Georgeson 1992; Grossman 2003 |
| fainting_or_near_fainting, theo triệu chứng chính | không đổi (ghi nhận có thể thấp) | Chóng mặt: frequent | Dùng (B) | Danh mục đặt tỷ lệ nền 0,25 khi Chóng mặt; tiền ngất xử trí như ngất | ESC 2018; 2187 |
| palpitations | occasional | occasional | Trùng | | 2187; van Oosterhout |
| dizziness | frequent | không liên kết | **Bỏ** | Không có số liệu; khi chạy bộ ca dev, câu này được hỏi ở Đau bụng và câu trả lời 'không chóng mặt' hạ bệnh dưới ngưỡng mức 1 ở ca d-acute-coronary-syndrome-3 (bỏ sót cấp cứu ở triệu chứng chính đã phát hành) | — |
| breathless_on_exertion | occasional | không liên kết | **Bỏ** | Danh mục đã nâng tỷ lệ nền lên 0,15: liên kết gần như không mang thông tin (tỷ số 1,33 và 0,94) mà vẫn làm tốn một câu hỏi ở Đau bụng | MSD |
| syncope_trigger | 0,06/0,25/0,08/0,04/0,15/0,07/0,35 | 0,08/0,15/0,10/0,07/0,15/0,10/0,35 | Trung bình | | ESC 2018 bảng 6 |
| syncope_warning | không liên kết | 0,45/0,15/0,40 | Giữ (B) | | ESC 2018; 2187 |
| pulse_measured | 0,02/0,26/0,10/0,02 | 0,012/0,30/0,075/0,013 | Trung bình | | 2187 |
| dizziness_positional | rare | không liên kết | Giữ (A) | | Bösner 2018 |
| dizziness_pattern | không liên kết | 0,15/0,50/0,25/0,10 | Giữ (B) | | 2187 |

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Prior ba triệu chứng chính mới (từ số liệu cấp cứu Anh, Mỹ); các phân bố; quyết định không dùng tần suất đau ngực theo triệu chứng chính.

## Ảnh hưởng lên triệu chứng chính đã phát hành và bộ ca dev

- So với bản bỏ phần mở rộng của lượt C (cùng dữ liệu khác): các ca Đau bụng giữ nguyên mức xử trí; d-acute-coronary-syndrome-2 giảm từ 39% xuống 35% (vẫn mức 1, đứng đầu); d-acute-coronary-syndrome-3 giữ 12,5% (mức 1), bản nhiễu giống hệt bản không mở rộng.
- d-acute-coronary-syndrome-syncope-1 (66 tuổi, ngất khi leo cầu thang, không đau ngực, khó thở): mức 1 đúng (rf_syncope_breathing), đứng đầu danh sách cần loại trừ; phiên dừng ở câu thứ 2 nên rối loạn nhịp chiếm 47% bảng xác suất.
