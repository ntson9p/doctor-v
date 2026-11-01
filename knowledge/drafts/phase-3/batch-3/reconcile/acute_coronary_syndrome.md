# Biên bản đối chiếu: acute_coronary_syndrome (Hội chứng mạch vành cấp), phần mở rộng lô 3

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần c, 31/10/2026.
- Bản chính thức: `knowledge/conditions/acute_coronary_syndrome.yaml`, giữ `source_checked`. Mọi giá trị cũ giữ nguyên.
- Thêm prior Đau ngực, Khó thở và 8 liên kết với dấu hiệu lô 3. Không liên kết dấu hiệu chung `chest_pain`.
- Nguồn mở lại: toàn văn Haasenritter 2015 (bảng 1, 3), Bösner 2009 (bảng 2, 3); tóm tắt Bösner 2010 (BJGP), Sallam 2026, Swap 2005, Verdon 2008; Frese 2011 (lượt C phần a mở lại cùng ngày); NICE CG95, 2187/QĐ-BYT, MSD, van Oosterhout 2020 đã xác minh ở các lượt trước.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Đau ngực | P3; 18–44 tuổi P4; từ 65 tuổi P2; dưới 18 tuổi P6 | như lượt A | Giữ | Trùng; 1,5–3,6% ở tuyến ban đầu (tuổi trung bình 45–60) | Haasenritter, Bösner 2009, Verdon 2008 |
| Prior Khó thở, 65–74 tuổi | P4 | P3 | P4 | Lệch một mức; Frese: nhồi máu cơ tim 0% (Hà Lan) và 1/93 (Đức), bệnh tim thiếu máu cục bộ chỉ 1,2–2,2% ở mọi tuổi; lượt A sát số liệu hơn. Từ 75 tuổi hai lượt cùng P3 | Frese, MSD, 2187 |
| Prior Khó thở, các tuổi khác | 45–64 tuổi P4; 18–44 tuổi P5; dưới 18 tuổi P6; từ 75 tuổi P3 | như lượt A | Giữ | Trùng | Frese |
| chest_pain_duration | {.03, .22, .65, .10} | {.02, .30, .60, .08} | Trung bình {.025, .26, .625, .09} | | NICE CG95, 2187, Bösner 2009 |
| dyspnea_onset | {.35, .50, .15} | {.40, .45, .15} | Trung bình | | MSD, 2187 |
| dyspnea_severity | {.40, .50, .10} | {.35, .55, .10} | Trung bình | | 2187 |
| chest_pain_exertional, chest_pain_radiates_back, chest_pain_sudden_severe (occasional); chest_wall_tenderness, pleuritic_chest_pain (rare) | – | – | Giữ | Trùng; ghép nguồn hai lượt | Swap, Bösner 2009, Bösner 2010, NICE CG95, 4235 |
| chest_pain_pressure khi Đau ngực | không thêm | very_frequent | Không thêm | Bösner 2009: ở người bệnh mạch vành tại phòng khám, đau kiểu đè ép 61–64% nhưng vị trí sau xương ức chỉ 7–8% (phần lớn ngực trái), mà câu hỏi là "ở giữa ngực"; nguồn không cho thấy rõ trên 67%. Mức cao hơn làm câu 'Không' hạ mạnh một bệnh không được bỏ sót (×0,21 so với ×0,53) | Bösner 2009, van Oosterhout |
| pain_radiates_arm_jaw khi Đau ngực | không thêm | frequent | Không thêm | 37–38% đo ở bệnh viện (van Oosterhout), 14–16% ở phòng khám (Bösner 2009); hạ một mức cho cộng đồng thì vẫn occasional. Có đau lan thì quy tắc đã xếp mức 1 | van Oosterhout, Bösner 2009 |

## Giá trị dựa trên nhận định (bác sĩ cần duyệt)

- Prior Đau ngực từ 65 tuổi (P2): số liệu tuyến ban đầu chỉ cho cả nhóm từ 35 tuổi (3,6%). Với prior này, gần như mọi người từ 65 tuổi đau ngực ở mức 1–2 trước khi trả lời câu nào (khuyên quá mức có thể ở người cao tuổi đau thành ngực, nhưng mô phỏng nam 70 tuổi đau thành ngực điển hình vẫn ra mức 4).
- Prior Khó thở theo tuổi; các phân bố thời gian đau, khởi phát, mức khó thở; chest_pain_sudden_severe occasional.

## Thiếu sót cần báo (ghi chú của lô)

- Bệnh này không gồm đau thắt ngực ổn định (6,6–11,2% người đau ngực ở phòng khám, Haasenritter). Người đau khi gắng sức, đỡ khi nghỉ dồn vào "nguyên nhân khác" (quy tắc rf_chest_pain_exertional vẫn xếp mức 3). Lượt C không kéo giãn bệnh này để che chỗ trống; đề xuất thêm bệnh "đau thắt ngực ổn định" cho Đau ngực.

## Ca dev cũ được thêm câu trả lời lô 3 (theo lời kể)

- d-acute-coronary-syndrome-1: chest_pain có, chest_pain_duration từ 15 phút (tức ngực 2 giờ), dyspnea_onset trong vài giờ.
- d-acute-coronary-syndrome-2: chest_pain không; dyspnea_onset trong vài giờ (từ sáng, 8 giờ trước), dyspnea_severity khi đi lại.
- d-acute-coronary-syndrome-syncope-1: chest_pain không.
- Không sửa gì khác.
- **Một thay đổi do câu trả lời mới:** d-acute-coronary-syndrome-2 (nữ 78 tuổi, đau thượng vị, "hơi khó thở khi đi lại") ở chế độ sạch hạng 1 xuống 2 (viêm, loét dạ dày 28%, hội chứng vành cấp 25%), mức 1 không đổi. Hai câu khởi phát và mức khó thở nay được hỏi khi có khó thở; phân bố mức khó thở của hai lượt cho khó thở lúc nghỉ nhiều hơn (0,525 so với tỷ lệ nền 0,3), nên câu trả lời "chỉ khi đi lại, gắng sức" làm giảm bệnh khoảng 1,6 lần. Lượt C có thử phân bố 0,45/0,45/0,1 (ca này về hạng 1) nhưng ca mới d-acute-coronary-syndrome-shortness-of-breath-1 (khó thở lúc nghỉ) tụt từ mức 1 xuống mức 2, nên giữ trung bình của hai lượt. Bác sĩ cần xem: biểu hiện không điển hình ở người cao tuổi có thể chỉ khó thở khi gắng sức.
- Ở chế độ nhiễu, ca này hạt giống 5 hạng 2 xuống 3 (mức 1 không đổi).

## Bộ dev (ca mới)

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-acute-coronary-syndrome-chest-pain-1 (nam 59 tuổi, điển hình) | mức 1 (đúng 1); hạng 1 trong danh sách cần loại trừ | dừng khẩn sau 3 câu |
| d-acute-coronary-syndrome-shortness-of-breath-1 (nữ 79 tuổi, không đau ngực) | mức 1 (đúng 1); hạng 1 | hạt giống nhiễu 3: mức 2 (bỏ sót cấp cứu ở chế độ nhiễu) |
