# Biên bản đối chiếu lượt C: pulmonary_embolism

- Giai đoạn 3, lô 1, phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-25.
- Nguồn mở lại: Oqab 2018, Costantino 2018, Badertscher 2019 (tóm tắt, API Europe PMC); Miniati 2012, Bösner 2018 (toàn văn PMC); ESC 2019 (thuyên tắc phổi) và hướng dẫn thực hành ESC 2018 (trang OUP); NHS Pulmonary embolism (tải trang, rà soát 15/10/2026).
- Trạng thái: `source_checked`.

## Mức xử trí

Hai lượt cùng chọn mức 1 và nhóm không được bỏ sót; lượt B ghi rằng NHS viết 'gọi 999 hoặc đến cấp cứu'. Lượt C mở lại trang NHS: ngoài 'gọi 999 hoặc đến cấp cứu', trang dặn **không tự lái xe, nhờ người chở hoặc gọi 999** — đúng nội dung mức 1 của doctor-v ('Gọi 115, hoặc nhờ người đưa đến khoa cấp cứu gần nhất ngay. Không tự lái xe.'), còn mức 2 chỉ là 'đến khoa cấp cứu ngay'. ESC 2019: bệnh có thể gây tụt huyết áp, ngừng tim; NHS Sepsis cũng ghi '999 hoặc cấp cứu' mà nhiễm khuẩn huyết vẫn ở mức 1. Giữ **mức 1**. Quy ước của lượt R ('999 hoặc cấp cứu' là mức 2) chỉ dành cho quy tắc; bác sĩ nên quyết.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| prior syncope, 45–64 tuổi | P4 | P5 | P5 | Số liệu cấp cứu (0,8%, tuổi trung bình 62) phải hạ cho cộng đồng vì chỉ 2–10% người ngất đến cấp cứu (lượt B có căn cứ này); giữ P4 từ 65 tuổi (huyết khối tăng gần 8 lần ở người từ 80 tuổi) | Oqab 2018; ESC thực hành bảng web 2; ESC 2019 |
| prior palpitations, 18–44 tuổi | P5 | P6 | P5 | Ngang nguồn (ước lượng); thận trọng hơn | ESC 2019; Miniati 2012 |
| prior dizziness | mặc định P5, dưới 45 tuổi P6 | mặc định P6, từ 45 tuổi P5 | Trùng giá trị | Chỉ khác cách viết | — |
| hemoptysis | rare, above_leak_ok (Miniati 6%) | occasional (ước 5–15%) | rare | Có số liệu | Miniati 2012 |
| recent_immobility | occasional | frequent | occasional | Mẫu ngoại trú Firenze: 66% không có yếu tố thuận lợi; trong phần còn lại có cả ung thư, thuốc tránh thai, hậu sản; câu hỏi chỉ hỏi mổ, bó bột, nằm lâu, ngồi xe lâu (ước 20–30%) | Miniati 2012; ESC 2019 bảng 3 |
| fainting_or_near_fainting | occasional | occasional; Chóng mặt frequent | Bản B | Tiền ngất là biểu hiện khiến nghĩ tới bệnh; tỷ lệ nền 0,25 khi Chóng mặt | ESC 2019; Miniati |
| dizziness | frequent | không liên kết | Giữ (A) | | ESC 2019 |
| not_recovered_after_faint | (chưa có dấu hiệu) | occasional | Giữ (B) | Ngất đi kèm rối loạn huyết động | ESC 2019 |
| breathless_on_exertion, cold_hands_feet, es_severe_breathing | occasional | không liên kết | Giữ (A) | Liên kết của tắc mạch nhỏ, sốc, khó thở dữ dội (ESC 2019); es_severe_breathing để bệnh hiện trong danh sách 'Bác sĩ cần loại trừ' | ESC 2019 |
| palpitation_rhythm, pulse_measured, syncope_trigger, syncope_warning, dizziness_pattern | | | Trung bình | Lệch nhỏ, đều là ước lượng | ESC 2019 |
| warning_signs | có sưng bắp chân | có tay chân lạnh | Gộp | | NHS; ESC |
| summary_vi | câu cuối 'cần gọi 115 ngay' | 'cần được cấp cứu ngay' | Bản A | Khớp mức 1 | NHS |

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Mọi prior (hạ từ số liệu cấp cứu châu Âu, Bắc Mỹ; chưa có số liệu Việt Nam).
- Phân bố hoàn cảnh ngất, dấu hiệu trước ngất, kiểu chóng mặt, mạch; `dizziness` frequent; `previous_clot` occasional.

## Kiểm tra trên bộ ca dev và mâu thuẫn còn lại

- d-pulmonary-embolism-1 (ngất kèm khó thở, sau chuyến xe dài): mức 1 đúng (quy tắc rf_syncope_breathing); bệnh đứng thứ 3 trong danh sách 'Bác sĩ cần loại trừ' (1,2%) vì phiên dừng ở câu thứ 2, trước khi hỏi sưng bắp chân, ngồi xe lâu.
- **d-pulmonary-embolism-2 và -3 (Hồi hộp kèm khó thở): ra mức 2, đúng là mức 1** (cả bản sạch và 5 bản nhiễu). Nguyên nhân không nằm ở dữ liệu bệnh: quy tắc rf_palpitations_danger (hồi hộp kèm khó thở: mức 2, lượt R đã hạ từ mức 1 để không khuyên 'gọi 115' cho mọi cơn hoảng sợ) dừng phiên ở câu thứ 4, trước khi hỏi sưng bắp chân, nằm lâu, đau ngực khi hít sâu; khi đó thuyên tắc phổi chỉ 0,5–0,7%. Câu lý do của quy tắc vẫn dặn 'nhờ người đưa đi hoặc gọi 115, không tự lái xe', nên lời khuyên thực tế gần với mức 1. Không sửa dữ liệu để ca qua. Đề xuất cho người bảo trì: thêm `pulmonary_embolism` vào `conditions` của rf_palpitations_danger, rf_syncope_breathing, rf_dizziness_near_syncope_breathing; cân nhắc quy tắc mức 1 cho hồi hộp hoặc choáng kèm khó thở và một dấu hiệu huyết khối (sưng đau một bên bắp chân, mới mổ hoặc nằm lâu, từng bị cục máu đông), với các câu này được hỏi trong nhóm dấu hiệu nguy hiểm.
