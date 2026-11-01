# Biên bản đối chiếu: cardiac_arrhythmia (Rối loạn nhịp tim), phần mở rộng lô 3

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần c, 31/10/2026.
- Bản chính thức: `knowledge/conditions/cardiac_arrhythmia.yaml`, giữ `source_checked`. Mọi giá trị cũ giữ nguyên.
- Thêm prior Khó thở, Đau ngực và 4 liên kết với dấu hiệu lô 3. Không liên kết `chest_pain`.
- Nguồn mở lại: Frese 2011, Haasenritter 2015, Chun 2015, Sallam 2026 (cùng ngày); NHS Atrial fibrillation, NHS SVT, ESC 2019, ESC 2024 đã xác minh ở lượt trước.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Khó thở | P4; từ 65 tuổi P3; 5–17 tuổi P5; dưới 5 tuổi P6 | như lượt A | Giữ | Trùng; Frese: rung, cuồng nhĩ 0,49%, rối loạn nhịp khác 0,15% | Frese, NHS AF |
| Prior Đau ngực, thiếu niên | P5 | P4 (mặc định) | P4 | Có số liệu: rối loạn nhịp 65% nguyên nhân tim của trẻ em đau ngực ở bệnh viện (khoảng 2,5%), nguyên nhân tim 0,9–1,5% ở cấp cứu; hạ cho cộng đồng | Chun, Sallam |
| Prior Đau ngực, các tuổi khác | P4; từ 65 tuổi P3; 5–12 tuổi P5 | như lượt A | Giữ | Trùng; phần dư 1–4% của nhóm tim mạch ngoài mạch vành | Haasenritter |
| palpitations khi Khó thở, Đau ngực | không thêm | frequent | Không thêm | Liên kết cũ để occasional từ 45 tuổi theo ESC 2024 (ở rung nhĩ, hồi hộp ít gặp hơn mệt); nguồn không cho thấy khác biệt theo triệu chứng chính; có hồi hộp kèm khó thở hoặc tức ngực thì quy tắc rf_palpitations_danger đã xếp mức 2 | ESC 2024, NHS AF |
| dyspnea_severity | {.55, .38, .07} | {.55, .40, .05} | Trung bình | | ESC 2024, NHS AF |
| chest_pain_duration | {.08, .42, .40, .10} | {.10, .45, .35, .10} | Trung bình | | NHS SVT, NHS AF |
| dyspnea_onset, orthopnea | – | – | Giữ | Trùng | ESC 2019, NHS |

## Giá trị dựa trên nhận định (bác sĩ cần duyệt)

- Prior Đau ngực (phần dư của nhóm tim mạch), orthopnea occasional, các phân bố.

## Ca dev cũ được thêm câu trả lời lô 3

- d-cardiac-arrhythmia-1, -2, -3, -palpitations-1: chest_pain không (lời kể ghi "không đau ngực"; trùng mặc định nên kết quả không đổi). Hai ca d-from-h-* (chuyển từ bộ giữ kín) không sửa.

## Bộ dev (ca mới)

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-cardiac-arrhythmia-shortness-of-breath-1 (nam 72 tuổi, rung nhĩ nhanh) | mức 2 (đúng 2); hạng 1 | quy tắc rf_palpitations_danger ghi tên bệnh này |
| d-cardiac-arrhythmia-chest-pain-1 (nữ 29 tuổi, nhịp nhanh trên thất kèm tức ngực 40 phút) | mức 1 (đúng 2); không có hạng | Tức ngực từ 15 phút làm quy tắc rf_chest_pain_ongoing (mức 1) dừng phiên trước khi hỏi hồi hộp; bệnh mức 3 không vào danh sách cần loại trừ. Khuyên quá mức, chấp nhận; đề xuất cho người bảo trì ở báo cáo chung |
