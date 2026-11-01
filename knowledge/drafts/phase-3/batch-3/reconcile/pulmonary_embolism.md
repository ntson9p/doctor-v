# Biên bản đối chiếu: pulmonary_embolism (Thuyên tắc mạch phổi), phần mở rộng lô 3

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần c, 31/10/2026.
- Bản chính thức: `knowledge/conditions/pulmonary_embolism.yaml`, giữ `source_checked`. Mọi giá trị cũ giữ nguyên; thêm very_frequent khi Đau ngực cho đau kiểu màng phổi.
- Thêm prior Khó thở, Đau ngực, Ho và 8 liên kết với dấu hiệu lô 3. Không liên kết `chest_pain`, không liên kết ho.
- Nguồn mở lại: Frese 2011, Haasenritter 2015, Verdon 2008 (cùng ngày); Miniati 2012, ESC 2019, NHS Pulmonary embolism, 4235/QĐ-BYT đã xác minh (4235 mở lại tr. 24).

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Khó thở | P5; từ 45 tuổi P4; dưới 13 tuổi P6 | như lượt A | Giữ | Trùng; Frese 0,35% mọi tuổi, tăng mạnh theo tuổi (ESC) | Frese, ESC |
| Prior Đau ngực, 18–44 tuổi | P4 | P5 | P5 | Verdon 0,3% ở tuổi trung bình 55; huyết khối tĩnh mạch tăng mạnh theo tuổi (ESC), nên người trẻ thấp hơn; phụ nữ dùng thuốc tránh thai được nâng qua estrogen_use | Verdon 2008, ESC |
| Prior Đau ngực, thiếu niên | P5 | P6 | P6 | Như trên | ESC |
| Prior Ho, 18–44 tuổi | P6 | P5 | P6 | Ít người thuyên tắc phổi ho (Miniati 4%), bệnh ít ở người trẻ | Miniati, ESC |
| pleuritic_chest_pain khi Đau ngực | không thêm | very_frequent | Thêm | Giá trị cũ tính trên mọi người bệnh (49% có đau ngực); trong số người đã đau ngực 84% đau kiểu màng phổi (Miniati). Dấu hiệu cảnh báo của bệnh không được bỏ sót | Miniati |
| dyspnea_onset | {.65, .28, .07} | {.75, .20, .05} | Trung bình {.70, .24, .06} | | Miniati, ESC |
| chest_pain_sudden_severe | occasional | frequent | occasional | Ngang nguồn; đau màng phổi thường đột ngột nhưng vừa phải; mức thấp làm câu 'Không' ít hạ bệnh, còn câu 'Có' đã có quy tắc mức 2 | Miniati, 4235, NHS |
| chest_pain_duration | {.03, .17, .50, .30} | {.03, .12, .55, .30} | Trung bình | | Miniati |
| spo2_measured | {.12, .14, .14, .60} | không có | Giữ | Dấu hiệu đã vào danh mục | ESC |
| orthopnea | rare | không có | Giữ | Miniati: 0,4% | Miniati |
| cough_duration | không có | {.70, .18, .10, .02} | Giữ | Ho, nếu có, mới xuất hiện | ESC, Miniati |
| dyspnea_severity, estrogen_use | – | – | Giữ | Trùng | ESC |

## Giá trị dựa trên nhận định (bác sĩ cần duyệt)

- Prior Đau ngực, Ho ở người trẻ (theo xu hướng tuổi của ESC); estrogen_use occasional (chưa có số liệu dùng thuốc tránh thai ở người bệnh Việt Nam); các phân bố.

## Mức xử trí của ca mới

- NHS Pulmonary embolism ghi "Call 999 or go to A&E"; theo quy ước của lượt R cho quy tắc là mức 2, và quy tắc rf_pe_signs đã hạ xuống mức 2. Hai ca mới (chưa ngất, chưa sốc) để mức đúng 2. Ba ca cũ để mức 1 (có ngất, người 80 tuổi, hồi hộp) không đổi. Urgency của bệnh vẫn là 1; bác sĩ nên thống nhất (ghi chú của lượt C phần b và lượt R).

## Ca dev cũ được thêm câu trả lời lô 3

- d-pulmonary-embolism-1: chest_pain có (đau khi hít sâu), dyspnea_onset đột ngột.
- d-pulmonary-embolism-2: chest_pain không, dyspnea_onset trong vài giờ (từ sáng).
- d-pulmonary-embolism-3: chest_pain có, dyspnea_onset đột ngột ("bỗng").
- Kết quả không đổi.

## Bộ dev (ca mới)

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-pulmonary-embolism-shortness-of-breath-1 (nữ 44 tuổi dùng thuốc tránh thai) | mức 2 (đúng 2); hạng 1 | quy tắc rf_pe_signs |
| d-pulmonary-embolism-chest-pain-1 (nam 36 tuổi bó bột) | mức 2 (đúng 2); không có hạng | Khó thở trong nhóm dấu hiệu nguy hiểm của Đau ngực làm quy tắc rf_chest_pain_breathless (mức 2) đúng ngay; sau đó chỉ hỏi câu có thể nâng lên mức 1, nên đau kiểu màng phổi, bất động không được hỏi; thuyên tắc phổi 0,6%, dưới ngưỡng vào danh sách cần loại trừ. Đề xuất ghi `conditions: [pulmonary_embolism, pneumothorax, acute_coronary_syndrome]` cho quy tắc này |
