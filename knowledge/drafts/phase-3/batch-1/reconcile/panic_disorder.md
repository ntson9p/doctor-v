# Biên bản đối chiếu lượt C: panic_disorder

- Giai đoạn 3, lô 1, phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-25.
- Nguồn mở lại: Weber 1996, Barsky 1996 (tóm tắt, API Europe PMC); Hayashi 2010 (toàn văn PMC, bảng 3); de Jonge 2016, Kessler 2006 (tóm tắt và toàn văn trên PMC); Bösner 2018 (toàn văn); Maarsingh 2010 (tóm tắt); EHRA 2011, ESC 2019 (trang OUP); MSD Panic attacks and panic disorder (trang MSD; địa chỉ đã đổi, sổ đăng ký ghi địa chỉ mới); NHS Panic disorder (tải trang).
- Trạng thái: `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| prior palpitations, 5–12 tuổi | P3 | P5 | P4 | Lệch hai mức; mở lại nguồn: bệnh bắt đầu cuối tuổi vị thành niên, đầu tuổi trưởng thành; tuổi khởi phát trung vị 32 (khoảng tứ phân vị 20–47), hiếm trước dậy thì | MSD; de Jonge 2016 |
| prior palpitations, 13–17 tuổi | P2 | P3 | P3 | Ngang nguồn; với bệnh lành tính, mức thấp hơn là thận trọng hơn (để xác suất cho nguyên nhân cần khám) | MSD |
| prior palpitations, từ 75 tuổi | P3 | P4 | P4 | Như trên; khởi phát mới sau 65 tuổi ít gặp | de Jonge 2016 |
| prior dizziness | 5–12 P4; 18–44 P2; 65–74 P3 | 5–12 P5; 13–17 P4; 18–44 P3; 65–74 P4 | Bản B | Ngang nguồn (ước lượng); mức thấp hơn thận trọng hơn với bệnh lành tính | Bösner 2018 |
| prior_modifiers (giới) | nữ 1,2; nam 0,75 (bậc C) | nữ 1,4; nam 0,7 (bậc B) | Hệ số của A, bằng chứng của B | Người hồi hộp vốn khoảng 60% là nữ (Klein-Wiele 56,5%, Gao 63,7%); với tỷ lệ nữ/nam 2/1 trong bệnh, hệ số so với mức chung khoảng 1,1–1,2 và 0,75–0,85; lượt B giả định nam nữ ngang nhau | de Jonge 2016 (OR 1,8); Kessler 2006 (OR 2,3); MSD |
| dizziness | very_frequent (Hayashi 72–88%) | frequent (bằng lời) | very_frequent | Có số liệu | Hayashi 2010 |
| tremor | occasional (Hayashi 30%) | frequent (danh sách NHS) | occasional | Có số liệu | Hayashi 2010 |
| cold_sweat | occasional (Hayashi 21–29%) | frequent | occasional | Có số liệu; câu hỏi hỏi mồ hôi lạnh | Hayashi 2010 |
| fainting_or_near_fainting | occasional | occasional | occasional; thêm Chóng mặt frequent | Cả hai lượt chưa có; danh mục đặt tỷ lệ nền 0,25 khi Chóng mặt nên occasional làm 'Có' giảm khả năng bệnh; ở người hoảng sợ chọn Chóng mặt, kiểu chóng mặt chính là choáng, cảm giác sắp ngất | NHS; MSD; Hayashi |
| palpitation_abrupt_onset | occasional | rare | rare | Ngang nguồn; thận trọng hơn (trả lời 'Có' nghiêng về nhịp nhanh vòng vào lại) | EHRA 2011 bảng 2 |
| palpitation_duration | (chưa có dấu hiệu) | 0,05/0,85/0,10 | Giữ (B) | Cơn 5–20 phút, tới 1 giờ; cơn do tâm thần hay kéo dài trên 15 phút | NHS; MSD; Barsky 1996 |
| palpitation_rhythm, pulse_measured, dizziness_pattern | | | Trung bình | Lệch nhỏ | EHRA |
| stress_poor_sleep | frequent | không liên kết | Giữ (A) | | EHRA 2011 bảng 2 |
| Bậc bằng chứng các triệu chứng | B, numeric (Hayashi) | C, verbal | Bản A | Có số liệu | Hayashi 2010 |
| warning_signs | 3 dấu hiệu | thêm ý định tự hại | Bản B | Rối loạn hoảng sợ hay kèm trầm cảm | MSD |
| summary_vi | | | Bản B | | NHS |

Không đổi: mức xử trí 4, không thuộc nhóm không được bỏ sót.

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Mọi prior (nhóm 'tâm thần' của các nghiên cứu Mỹ, có hiệu chỉnh vì tỷ lệ mắc ở châu Á thấp hơn); hệ số giới quy đổi.
- `breathing_difficulty` frequent và `chest_pain_pressure` occasional: số liệu ở mức cao hơn một bậc, hạ để không quy khó thở, đau ngực cho cơn hoảng sợ.
- `fainting_or_near_fainting` frequent khi Chóng mặt; các phân bố.

## Kiểm tra trên bộ ca dev

- 3 ca đều đúng mức 4 và đứng đầu (98%, 95%, 98%), kể cả ca dễ nhầm với cường giáp (cường giáp dưới 1%).
- Ca d-pulmonary-embolism-3 (thuyên tắc phổi dễ nhầm với cơn hoảng sợ) dừng sớm ở mức 2 vì quy tắc, lúc đó cơn hoảng sợ chiếm 72% (xem biên bản thuyên tắc phổi).
