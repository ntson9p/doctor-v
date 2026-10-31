# Biên bản đối chiếu: gerd (Bệnh trào ngược dạ dày – thực quản)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần c, 31/10/2026.
- Bản chính thức: `knowledge/conditions/gerd.yaml`, trạng thái `source_checked`.
- 24 liên kết trong bản chính thức; 12 liên kết chung trùng mức. Lượt A có thêm 5 (night_respiratory_symptoms, wheeze, pain_radiates_arm_jaw, heavy_alcohol, similar_episodes_before), lượt B thêm 4 (runny_nose, breathing_difficulty, cold_sweat, weight_loss_unintended).
- Nguồn mở lại: toàn văn VNAGE 2026 (khuyến cáo 1), Quach 2021 (bảng 1), Haasenritter 2015 (bảng 3), Bösner 2009 (bảng 2), Ronga 2012 (bảng 3); tóm tắt Chun 2015, Viniol 2014, Nasseri 2023; NHS Heartburn and acid reflux; 4235/QĐ-BYT tr. 24–28.
- Gộp id nguồn: vnage-gerd-2026 (lượt A) và dao-frontmed-2026 (lượt B) là cùng một bài, giữ dao-frontmed-2026; nhs-heartburn-acid-reflux (lượt A) và nhs-heartburn-reflux (lượt B) cùng trang, giữ nhs-heartburn-acid-reflux.

## Hai quyết định lớn

1. **Mức xử trí 4 thay cho 5 (hai lượt cùng 5).** Bệnh chỉ được xét khi người dùng chọn Đau ngực hoặc Ho. NHS Chest pain: đau ngực lúc có lúc không thì khám bác sĩ gia đình (mức 4); NHS Heartburn: ợ nóng gần như ngày nào cũng có thì khám bác sĩ (trào ngược là ợ nóng lặp lại); lời khuyên của chính hai lượt ghi đau ngực lần đầu cần bác sĩ khám để loại trừ bệnh tim. Ca d-gerd-1 với mức 5 bị xếp kém khẩn hơn mức đúng. Ợ nóng thỉnh thoảng vẫn tự chăm sóc, hỏi dược sĩ. Bác sĩ cần quyết.
2. **Không đưa prior Đau bụng vào bản chính thức (hai lượt cùng P3).** Thử trên bộ dev:
   - P3: ca d-acute-coronary-syndrome-3 (nam 58 tuổi đau rát thượng vị và sau xương ức, buồn nôn, vã mồ hôi, Đau bụng đã phát hành) tụt từ mức 1 xuống mức 2, tức thêm một ca bỏ sót cấp cứu; d-acute-pancreatitis-2, -3 ra khỏi 3 hạng đầu; d-preeclampsia-3 hạng 2 xuống 3.
   - P4 (và thêm liên kết vã mồ hôi rare): ca trên vẫn mức 2 (hội chứng vành cấp 8,1–8,5%); d-acute-pancreatitis-3 vẫn ra khỏi 3 hạng đầu.
   - Nguyên nhân: xác suất hội chứng vành cấp của ca này trước lô 3 chỉ 10,2%, vừa qua ngưỡng mức 1 (10%); bất kỳ bệnh nào chia phần bằng chứng ợ nóng với từ 1–2% trở lên đều kéo xuống dưới ngưỡng. Thứ tự câu hỏi cũng đổi (câu dùng thuốc giảm đau không còn được hỏi).
   - Người đau thượng vị do trào ngược vẫn được xếp vào viêm, loét dạ dày (mức 4), nên lời khuyên gần như nhau.
   - Đề xuất người bảo trì: thêm quy tắc mức 1 cho đau thượng vị kèm vã mồ hôi hoặc buồn nôn, khó thở ở người từ 45 tuổi (2187/QĐ-BYT: đau thượng vị là biểu hiện không điển hình của nhồi máu cơ tim), rồi mới thêm prior Đau bụng (P3 hoặc P4) cho bệnh này. Các liên kết đau bụng vẫn giữ trong tệp.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| urgency | 5 | 5 | 4 | Mục 1 ở trên | NHS Chest pain, NHS Heartburn |
| Prior Đau ngực, 5–12 tuổi | P4 | P3 | P3 | Chun 2015: tiêu hóa 2,9% trẻ em đau ngực ở bệnh viện (lượt B có số liệu) | Chun |
| Prior Đau ngực, từ 65 tuổi | P3 | P2 (mặc định) | P3 | Bösner (tuổi trung bình 59) trào ngược chỉ 3,5%; bệnh tim, phổi chiếm phần lớn hơn ở người cao tuổi; mức thấp hơn an toàn hơn cho bệnh lành tính | Bösner 2009, Haasenritter |
| Prior Đau ngực, 18–64 tuổi | P2 | P2 | Giữ | Bệnh thực quản 6–7% (Buntinx, Verdon) | Haasenritter |
| Prior Ho, 2 tháng–5 tuổi | P5 | P4 | P5 | Ngang nguồn; bệnh lành tính chọn mức thấp hơn | VNAGE |
| Prior Đau bụng | P3 (trẻ thấp hơn) | P3 (trẻ thấp hơn) | Không đưa vào | Mục 2 ở trên | Viniol, Quach, Nasseri |
| heartburn | very_frequent | thêm Ho: frequent | Theo lượt B | Người chỉ có biểu hiện ngoài thực quản ít có triệu chứng điển hình; VNAGE có khuyến cáo riêng cho nhóm chỉ có triệu chứng không điển hình | VNAGE |
| abd_pain_location, abd_pain_duration, chest_pain_duration | lệch ≤ 0,07 | | Trung bình | | Quach, VNAGE, NHS |
| night_respiratory_symptoms | occasional | không có | Giữ | NHS, VNAGE: nặng khi nằm | NHS, VNAGE |
| wheeze | rare | không có | Bỏ | Nguồn ghi 9,4% người trào ngược (khoảng occasional, gần tỷ lệ nền 5%); rare đi ngược số liệu. Không liên kết thì trung tính | VNAGE |
| pain_radiates_arm_jaw | very_rare | không có | Giữ | 4235: lan lên cổ, hàm thường là cơn đau thắt ngực; very_rare để thấp hơn tỷ lệ nền 1% | 4235 |
| heavy_alcohol | occasional | không có | Giữ | Quach: 37,4% so với 26,0% (đơn biến); liên kết yếu | Quach |
| similar_episodes_before | frequent | không có | Giữ | NHS: ợ nóng lặp lại thì gọi là bệnh trào ngược; VNAGE: hay tái phát. Lượt C có thử very_frequent rồi bỏ (không có số liệu) | NHS, VNAGE |
| runny_nose | không có | rare | Bỏ | Ước lượng; với tỷ lệ nền 0,2 khi Ho, rare làm câu 'Có' giảm trào ngược 8 lần, quá mạnh | – |
| breathing_difficulty | không có | rare | Bỏ | Không có nguồn; VNAGE còn xếp hen, khò khè vào biểu hiện ngoài thực quản | – |
| cold_sweat | không có | rare (ước lượng) | Giữ, thêm nguồn | 4235/QĐ-BYT: vã mồ hôi, xanh tái cần tìm nhồi máu cơ tim, tắc mạch phổi, phình tách; NHS, VNAGE không nêu vã mồ hôi. Giúp tách hội chứng vành cấp khỏi trào ngược khi có ợ nóng | 4235, NHS, VNAGE |
| weight_loss_unintended | không có | rare | Giữ | Dấu hiệu báo động cần tìm bệnh khác (VNAGE, NHS) | VNAGE, NHS |
| abd_pain_meal_relation, abd_pain_onset, abd_pain_severe, abd_pain_worse_movement, cough, cough_duration, productive_cough, hoarse_voice, fever, chest_pain_pressure (Đau ngực frequent), chest_pain_exertional, chest_wall_tenderness, pleuritic_chest_pain, chest_pain_sudden_severe | – | – | Giữ | Trùng mức | VNAGE, NHS, 4235, Ronga |
| warning_signs | 7 mục (có chest_pain_pressure) | 6 mục | Hợp hai bản, bỏ chest_pain_pressure | Tức giữa ngực là đặc điểm hay gặp của chính bệnh này khi Đau ngực | – |
| self_care_vi, see_doctor_vi | | | Ghép | Giữ mốc 3–4 giờ trước khi ngủ, kê đầu giường 10–20 cm (NHS); thêm "nôn ra máu, đi ngoài phân đen: đi cấp cứu" | NHS |

## Giá trị dựa trên nhận định (bác sĩ cần duyệt)

- Prior Ho (P3 người lớn) và prior Đau ngực theo tuổi.
- Các phân bố đau bụng, đau ngực, thời gian ho; productive_cough rare; chest_wall_tenderness, pleuritic_chest_pain, chest_pain_sudden_severe rare; pain_radiates_arm_jaw very_rare; cold_sweat rare; similar_episodes_before frequent.
- Mức xử trí 4 và việc chưa có prior Đau bụng.

## Bộ dev

| Ca | Kết quả (sạch) |
|---|---|
| d-gerd-1 (nam 41 tuổi, nóng rát sau xương ức hằng ngày) | mức 4 (đúng 4); hạng 1 (93%) |
| d-gerd-2 (nữ 47 tuổi, ho khan 2 tháng, khàn tiếng) | mức 4 (đúng 4); hạng 1 (86%) |
| d-gerd-3 (nữ 52 tuổi tăng huyết áp, dễ nhầm bệnh tim) | mức 4 (đúng 4); hạng 1 (98%) |

Ca d-gerd-3 ban đầu được viết cho Đau bụng (dễ nhầm viêm, loét dạ dày); sau khi bỏ prior Đau bụng, lượt C viết lại thành ca dễ nhầm bệnh tim ở Đau ngực.

Đau bụng đã phát hành: với bản chính thức, bệnh này không có mặt ở Đau bụng; không ca Đau bụng nào đổi kết quả ở chế độ sạch. Ở chế độ nhiễu chỉ một thay đổi, không do bệnh này: d-acute-coronary-syndrome-2 hạt giống 5 hạng 2 xuống 3, mức xử trí không đổi (biên bản acute_coronary_syndrome).
