# Biên bản đối chiếu: pneumothorax (Tràn khí màng phổi)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần c, 31/10/2026.
- Bản chính thức: `knowledge/conditions/pneumothorax.yaml`, trạng thái `source_checked`.
- Mức xử trí 2, không được bỏ sót: hai lượt thống nhất (4235/QĐ-BYT: cần X quang phổi, hút khí hoặc dẫn lưu; tràn khí áp lực đe dọa tính mạng).
- 15 liên kết trong bản chính thức. Lượt A có 1 liên kết riêng (spo2_measured), lượt B có 3 (wheeze, heartburn và tách freq_by_age của copd_known).
- Nguồn mở lại: 4235/QĐ-BYT (bài khó thở tr. 16–17, đau ngực tr. 24–28, tràn khí màng phổi tr. 139–143; chuyển phông TCVN3), Olesen 2019 (toàn văn, bảng 3–5), tóm tắt Bobbio 2015, Chan 1985, Klin 2021, Ghisalberti 2020, Chun 2015 (API Europe PMC), MSD Pneumothorax (tải trang). Haasenritter 2015, Frese 2011, Verdon 2008 cũng mở lại cùng ngày.
- Gộp id nguồn: haasenritter-croatmedj-2015 (lượt A) và haasenritter-cmj-2015 (lượt B) cùng một bài, giữ haasenritter-croatmedj-2015; frese-jclinmedres-2011 của lượt A thay bằng frese-jcmr-2011 đã có trong sổ.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common | Tràn khí màng phổi, Xẹp phổi do tràn khí | thêm "Tràn khí màng phổi tự phát", "Thủng phổi" | Theo lượt B, bỏ mục trùng tên chính | "Thủng phổi" là cách gọi dân gian, giúp tìm kiếm | – |
| summary_vi | 3 câu | 3 câu | Ghép | Câu 3 của lượt B (chụp X quang) đã có ở self_care_vi | – |
| Prior Đau ngực | P5; 13–44 tuổi P4; 5–12 tuổi P6 | như lượt A | Giữ | Trùng. Lượt C ước lại từ tỷ lệ mới mắc (10–25/100.000 người trẻ mỗi năm, phần lớn có đau) so với số lượt khám đau ngực: 0,1–0,5%, ranh giới P5/P4. Đã kiểm tra tổng xác suất bệnh cấp cứu ở người trẻ đau ngực (mục Bộ dev) | Olesen, Bobbio, Ghisalberti, Chun, Haasenritter |
| Prior Khó thở | P5; dưới 13 tuổi P6 | như lượt A | Giữ | Trùng | Frese, Chan, 4235 |
| Hệ số giới | nam 1,7, nữ 0,45 | nam 1,6, nữ 0,4 | nam 1,6, nữ 0,45 | Tính lại: 77% người tràn khí là nam (Pháp, gồm cả thể thứ phát) chia cho khoảng 48% nam trong người đau ngực (Haasenritter, sáu nghiên cứu) | Bobbio, Olesen, Haasenritter |
| pleuritic_chest_pain | frequent; Đau ngực very_frequent | frequent | Theo lượt A | Câu hỏi không có điều kiện đau ngực: khi Khó thở chỉ khoảng hai phần ba có đau; khi Đau ngực mọi người đều đau và cơn đau là kiểu màng phổi (MSD, 4235). Nguồn cho thấy rõ khác biệt theo triệu chứng chính | MSD, 4235, Ghisalberti, Chan |
| breathing_difficulty | frequent; từ 65 tuổi very_frequent | frequent | Theo lượt A | Thể thứ phát ở người cao tuổi khó thở nặng (Chan 74%; 4235: đột nhiên suy hô hấp nặng); dấu hiệu cảnh báo của bệnh không được bỏ sót: giữ liên kết mạnh | Chan, 4235, Ghisalberti |
| chest_pain_sudden_severe | frequent | frequent | Giữ | Trùng; Olesen 95% khởi phát đột ngột nhưng câu hỏi cần cả dữ dội | Olesen, 4235 |
| chest_pain_duration | {.03, .12, .60, .25} | {.02, .08, .55, .35} | Trung bình {.025, .10, .575, .30} | Lệch ít | Olesen, Chun |
| dyspnea_onset | {.60, .33, .07} | {.80, .17, .03} | {.70, .25, .05} | Lệch 0,2: mở lại Olesen (95% là khởi phát triệu chứng nói chung, thường là cơn đau) và MSD (khó thở đột ngột hoặc từ từ tùy tốc độ, kích thước) | Olesen, MSD, 4235 |
| dyspnea_severity | {.45, .45, .10} | như lượt A | Giữ | Trùng | 4235 |
| spo2_measured | {.20, .12, .08, .60} | không có | Giữ | Dấu hiệu đã vào danh mục; 'Chưa đo' đúng tỷ lệ nền 0,6; tràn khí lớn, thể thứ phát hạ ô xy | 4235, MSD |
| chest_pain_pressure | rare (bậc B, 4235) | occasional (bậc C, ước lượng) | rare | Lệch một mức: chọn bản có nguồn tốt hơn (4235: đau bên phải hay trái thường do phổi, màng phổi; đau ở bên tràn khí). Không phải dấu hiệu cảnh báo của bệnh này | 4235, MSD |
| chest_wall_tenderness, chest_pain_exertional, smoker, fever, fainting_or_near_fainting, es_severe_breathing | – | – | Giữ | Trùng mức | Olesen, 4235, Chan |
| copd_known | occasional; từ 65 tuổi frequent | thêm 18–44 tuổi rare | Theo lượt B | Người trẻ gần như chỉ có thể nguyên phát (Olesen loại người có bệnh phổi; Chan: người trẻ không có bệnh phổi). Mức rare thấp hơn tỷ lệ nền 0,04 để câu 'Không' của người trẻ không làm giảm tràn khí | Chan, Olesen, MSD |
| wheeze | không có | rare; từ 65 tuổi occasional | Bỏ | Nguồn (4235 phần khám) không nói về khò khè; mức occasional ở người cao tuổi làm tăng tràn khí ở mọi người bệnh phổi tắc nghẽn khò khè (thêm khối lượng bệnh cấp cứu), còn rare ở người trẻ không có nguồn | – |
| heartburn | không có | rare | Bỏ | Ước lượng, không có nguồn; trào ngược đã có ợ chua very_frequent | – |
| specialties | respiratory, emergency | emergency, respiratory | Giữ | Như nhau | – |
| warning_signs | 6 mục | cùng 6 mục | Giữ | Trùng | – |
| self_care_vi, see_doctor_vi | 4 và 3 câu | 4 và 3 câu | Ghép | Giữ "không tự lái xe", "gọi 115 khi khó thở tăng nhanh, môi tím", "bỏ thuốc lá" | 4235, MSD |

## Giá trị dựa trên nhận định (bác sĩ cần duyệt)

- Prior Đau ngực (P4 ở 13–44 tuổi, P5 từ 45 tuổi, P6 ở 5–12 tuổi) và Khó thở (P5): ước từ tỷ lệ mới mắc, các nghiên cứu đau ngực, khó thở ở tuyến ban đầu không tách riêng tràn khí.
- chest_pain_duration, dyspnea_onset, dyspnea_severity, spo2_measured: phân bố ước lượng.
- chest_wall_tenderness rare, fever rare, es_severe_breathing occasional, copd_known theo tuổi.
- smoker frequent dựa trên thể nguyên phát (Olesen 58% hút hằng ngày), chưa có số liệu Việt Nam.

## Bộ dev

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-pneumothorax-1 (nam 22 tuổi, điển hình) | mức 2 (đúng 2); dừng khẩn, tràn khí đứng đầu danh sách cần loại trừ | quy tắc rf_chest_pain_breathless |
| d-pneumothorax-2 (thiếu niên đến muộn) | mức 2 (đúng 2); hạng 1 | như trên |
| d-pneumothorax-3 (thể thứ phát, Khó thở) | mức 2 (đúng 2); hạng 1 trong danh sách cần loại trừ (xác suất 4%, đợt cấp bệnh phổi tắc nghẽn 77%) | hạt giống nhiễu 1: không vào danh sách cần loại trừ |

Kiểm tra khuyên quá mức qua tổng xác suất bệnh cấp cứu (mô phỏng, không phải ca dev): nam 20 tuổi đau thành ngực điển hình (ấn đau, đau khi hít sâu, nhiều ngày) mức 4, tràn khí 0,02%; nam 20 tuổi chỉ đau khi hít sâu, không ấn đau, không khó thở: mức 2 (tràn khí 2,4–10,7% tùy thời gian đau). Mức 2 ở ca sau là hợp lý (cần X quang để loại trừ tràn khí), nhưng là chỗ có thể khuyên quá mức với viêm màng phổi do vi rút.
