# Biên bản đối chiếu lượt C: panic_disorder (mở rộng, Giai đoạn 3 lô 3)

- Phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-31.
- Bản nháp: `pass-a/extend/panic_disorder.yaml`, `pass-b/extend/panic_disorder.yaml`. Giữ nguyên mọi giá trị đã đối chiếu ở lô 1.
- Nguồn mở lại: Bösner 2009 (tóm tắt qua API Europe PMC); NHS Shortness of breath (tải trang: nguyên nhân hay gặp gồm hen, nhiễm trùng ngực, thừa cân, hút thuốc, cơn hoảng sợ). Verdon 2008, Frese 2011 đã được lượt C phần a đọc lại; NHS, MSD Panic disorder và Hayashi 2010 đã có trong sổ, đã xác minh.
- Nguồn đưa vào sổ: `bosner-bmcfampract-2009`.
- Trạng thái: giữ `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| prior shortness_of_breath, 18–44 tuổi | P2 | P3 | P3 (B) | Bệnh lành tính cạnh tranh trực tiếp với thuyên tắc phổi, hội chứng vành cấp, rối loạn nhịp; nhóm tăng thông khí 4–8% gồm cả lo âu khác | Frese 2011 |
| prior shortness_of_breath, 65–74 tuổi | P4 | P3 | P4 (A) | Khó thở chủ yếu do bệnh tim phổi; thấp hơn prior Hồi hộp (P3) | |
| prior shortness_of_breath, từ 75 tuổi | P5 | P4 | P5 (A) | Như trên; thấp hơn prior Hồi hộp (P4) | |
| prior shortness_of_breath, dưới 5 tuổi | (mặc định P3, sai) | P6 | P6 (B) | Rối loạn hoảng sợ không gặp ở trẻ nhỏ | MSD |
| prior chest_pain, 5–12 tuổi | P4 | P3 | P4 (A) | Hiếm khởi phát trước tuổi vị thành niên | MSD; de Jonge (bản cũ) |
| prior chest_pain, 65–74 tuổi | P4 | P3 | P4 (A) | Đau ngực do tim tăng rõ | Bösner 2009 |
| dyspnea_onset | 0,55 / 0,25 / 0,20 | 0,75 / 0,15 / 0,10 | Trung bình 0,65 / 0,20 / 0,15 | Ngang nguồn | NHS; MSD |
| chest_pain_duration | 0,15 / 0,55 / 0,25 / 0,05 | 0,10 / 0,60 / 0,25 / 0,05 | Trung bình 0,125 / 0,575 / 0,25 / 0,05 | Ngang nguồn | NHS; MSD |
| fever | rare | Không | **Bỏ** (theo B) | Không có nguồn về tần suất; liên kết này đổi kết quả của Hồi hộp, Chóng mặt (đã phát hành) | |
| spo2_measured | Không (dấu hiệu chưa có) | ge_96 0,38 | Giữ (B) | Thở nhanh do hoảng sợ không làm giảm ô xy máu | MSD |
| pleuritic_chest_pain | Không | rare | Giữ (B) | Không có trong mô tả của NHS, MSD; gợi ý viêm phổi, thuyên tắc phổi | NHS; MSD |
| leg_swelling_one_side | Không | very_rare | Giữ (B) | Kèm khó thở, đau ngực gợi ý thuyên tắc phổi | |
| palpitations, theo triệu chứng chính | | Đề nghị cân nhắc | Không thêm `freq_by_complaint` | Xem mục dưới | Hayashi 2010 |

Hai lượt trùng nhau ở: prior Khó thở 13–17, 45–64 tuổi (P3), 5–12 tuổi (P4); prior Đau ngực 13–17, 18–44 (P2), 45–64 tuổi, từ 75 tuổi; dyspnea_severity; chest_pain_exertional, wheeze, orthopnea (rare).

## Liên kết hồi hộp (very_frequent) ở Khó thở, Đau ngực

- Lượt B: với tỷ lệ nền 5%, câu hồi hộp tăng khả năng cơn hoảng sợ khoảng 16 lần ở hai triệu chứng chính mới, so với 4 lần ở thuyên tắc phổi (occasional).
- Lượt C không thêm `freq_by_complaint`: Hayashi 2010 (76–83%) đo ở mọi người rối loạn hoảng sợ, không có nguồn cho thấy người hoảng sợ chọn Khó thở, Đau ngực ít hồi hộp hơn (kb-guide 2.1 chỉ cho dùng khi nguồn cho thấy khác biệt rõ).
- Ảnh hưởng thực tế nhỏ: ở Khó thở, hồi hộp làm quy tắc rf_palpitations_danger (mức 2) đúng, phiên dừng và chỉ hiện các bệnh mức 1–2, nên cơn hoảng sợ không đứng trên thuyên tắc phổi trong danh sách người dùng thấy. Hai liên kết mới (đau khi hít sâu rare, sưng một bên bắp chân very_rare) kéo cơn hoảng sợ xuống khi có dấu hiệu huyết khối: ở d-pulmonary-embolism-3 (Hồi hộp) cơn hoảng sợ từ 70% còn 28%.
- Vấn đề thật là tỷ lệ nền 5% của hồi hộp ở người khó thở, đau ngực có lẽ quá thấp: đề xuất người bảo trì xem `leak_by_complaint` cho `palpitations` ở Khó thở, Đau ngực.

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Hai prior mới (suy từ nhóm tăng thông khí, nhóm tâm lý ở châu Âu).
- Các phân bố mới và các liên kết thấp hơn nền (bậc C).

## Ca dev và ảnh hưởng lên triệu chứng chính đã phát hành

- Mới: d-panic-disorder-shortness-of-breath-1 (24 tuổi, khó thở đột ngột, hồi hộp, tê tay, SpO2 98%): mức 2 đúng (hồi hộp kèm khó thở: NHS Heart palpitations); cơn hoảng sợ 79% nhưng phiên dừng ở mức 2 nên chỉ hiện danh sách cần loại trừ (không tính được thứ hạng). d-panic-disorder-chest-pain-1 (27 tuổi, đau nhói ngực trái vài phút trong cơn): 99%, mức 4 đúng.
- Hồi hộp (đã phát hành): d-panic-disorder-2 hỏi thêm 6 câu (24 → 30, chạm giới hạn) vì các liên kết mới (sưng một bên bắp chân, khò khè, khó thở khi nằm, đau khi hít sâu) được hỏi để loại trừ; mức xử trí, thứ hạng không đổi. d-premature-beats-1 thêm một phiên nhiễu mức 3 (đúng là 4). d-pulmonary-embolism-2, d-pulmonary-embolism-3 giữ thứ hạng; cơn hoảng sợ giảm phần xác suất.
