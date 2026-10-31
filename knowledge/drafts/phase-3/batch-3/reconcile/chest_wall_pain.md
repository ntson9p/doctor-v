# Biên bản đối chiếu: chest_wall_pain (Đau thành ngực, cơ, sụn sườn)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần c, 31/10/2026.
- Bản chính thức: `knowledge/conditions/chest_wall_pain.yaml`, trạng thái `source_checked`.
- 16 liên kết trong bản chính thức; 9 liên kết chung trùng mức. Lượt A có thêm 4 (chest_pain_radiates_back, pain_radiates_arm_jaw, similar_episodes_before, nausea), lượt B thêm 3 (heartburn, known_heart_disease, rash_any).
- Nguồn mở lại: toàn văn Haasenritter 2015, Verdon 2007, Ronga 2012, Bösner 2009; tóm tắt Bösner 2010 (Fam Pract), Bösner 2010 (BJGP), Sallam 2026, Chun 2015; NHS Costochondritis; 4235/QĐ-BYT tr. 24–28. NHS Chest pain có trong sổ (đã xác minh).
- Gộp id nguồn: ronga-bmcfampract-2012 và nhs-costochondritis có ở nhiều thư mục bản nháp, nay một tệp mỗi nguồn.

## Mức xử trí (ghi chú của lô)

- Gợi ý của người bảo trì: 5. Hai lượt cùng đổi sang 4.
- NHS Costochondritis: "Urgent advice: NHS 111" khi nghĩ mình bị viêm sụn sườn, để loại trừ bệnh nặng hơn (theo quy ước của lượt R là mức 3).
- NHS Chest pain: đau ngực lúc có lúc không hoặc đã hết nhanh thì khám bác sĩ gia đình (mức 4).
- Verdon 2007: lành tính, không tử vong trong năm theo dõi; hay tái lại.
- Lượt C giữ 4: ca điển hình không cần khám trong 24 giờ, nhưng lần đầu đau ngực cần bác sĩ khám; việc loại trừ bệnh tim cấp do các quy tắc đau ngực và ngưỡng của hội chứng vành cấp đảm nhận. Bác sĩ cần quyết giữa 3 (NHS Costochondritis) và 4.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi | Đau thành ngực (hội chứng thành ngực) | Đau thành ngực (cơ, sụn sườn) | Theo lượt B (tên trong scope.yaml); "Hội chứng thành ngực" vào vi_common | | – |
| codes.icd10 | R07.3 | M94.0 | R07.3 | Bệnh gộp đau cơ, sụn, sau chấn thương nhẹ; M94.0 chỉ là hội chứng Tietze, viêm sụn sườn | – |
| Prior Đau ngực, 5–17 tuổi | P1 (mặc định, ước lượng) | P2 | P2 | Có số liệu: ở trẻ em phần lớn là đau ngực không rõ nguyên nhân, cơ xương 4,7–33% (cấp cứu), 8,8% (khoa nhi) | Sallam, Chun |
| Prior Đau ngực, người lớn | P1; từ 75 tuổi P2 | như lượt A | Giữ | 24,5–49,8% ở tuyến ban đầu | Haasenritter, Verdon 2007 |
| chest_pain_duration | {.25, .20, .15, .40} | {.25, .20, .20, .35} | Trung bình | | Verdon 2007, Bösner 2010 |
| chest_pain_radiates_back | rare | không có | Giữ | Verdon 2007: 5/300 | Verdon 2007 |
| pain_radiates_arm_jaw | rare, above_leak_ok | không có | Giữ | Verdon 2007: 7,3% lan tay; cao hơn tỷ lệ nền 1% là theo số liệu | Verdon 2007 |
| similar_episodes_before | frequent | không có | Giữ | Verdon 2007: 35% cũ hoặc tái lại, 57% bị lại trong năm | Verdon 2007, Bösner 2010 |
| nausea | rare | không có | Bỏ | Nguồn không nêu; Ronga cho triệu chứng tiêu hóa OR 0,54, còn mức rare so với tỷ lệ nền 0,2 làm câu 'Có' giảm 8 lần | Ronga |
| heartburn | không có | rare | Giữ | Ronga OR 0,54 với triệu chứng tiêu hóa | Ronga |
| known_heart_disease | không có | rare | Giữ | Ronga: không có tiền sử bệnh mạch vành OR 5,12 | Ronga |
| rash_any | không có | rare | Giữ | 4235: khám thành ngực tìm zona; đau cơ, sụn không có ban | 4235 |
| chest_wall_tenderness (very_frequent), pleuritic_chest_pain, chest_pain_pressure (frequent), chest_pain_exertional, chest_pain_sudden_severe, breathing_difficulty, cold_sweat, fainting_or_near_fainting, fever (rare) | – | – | Giữ | Trùng mức | Ronga, Verdon 2007, Bösner 2010, NHS |
| summary_vi, self_care_vi, see_doctor_vi | | | Ghép, rút ngắn câu dài | | NHS |
| proposed_findings | – | chest_pain_worse_movement | Không dùng | Chưa vào danh mục (ghi chú của lô) | Ronga |

## Giá trị dựa trên nhận định (bác sĩ cần duyệt)

- Prior trẻ em (P2) và từ 75 tuổi (P2).
- chest_pain_duration (quy đổi từ mô tả của Verdon, Bösner); chest_pain_sudden_severe rare (9% "cấp và dữ dội" rộng hơn câu hỏi); chest_pain_exertional rare; rash_any, cold_sweat, fainting_or_near_fainting, fever rare.
- chest_wall_tenderness very_frequent đo bằng bác sĩ ấn; câu hỏi là người dân tự ấn.

## Dấu hiệu đề xuất (để ngoài bản chính thức)

- `chest_pain_worse_movement` (lượt B): "Đau ngực có tăng khi xoay người, cúi, vươn tay hoặc đổi tư thế không?" Ronga 2012: liên quan cử động OR 2,06, tư thế OR 2,13. Không có trong danh sách dấu hiệu được duyệt trước khi viết bộ giữ kín.

## Bộ dev

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-chest-wall-pain-1 (nữ 34 tuổi sau mang vác) | mức 4 (đúng 4); hạng 1 | |
| d-chest-wall-pain-2 (nam 15 tuổi, cơn nhói vài giây) | mức 4 (đúng 4); hạng 1 | |
| d-chest-wall-pain-3 (nam 55 tuổi, đau giữa ngực, dễ nhầm bệnh tim) | mức 2 (đúng 3); không có hạng | Tức giữa ngực làm quy tắc rf_chest_pain_central (mức 2) dừng khẩn; khi dừng khẩn chỉ hiện danh sách bệnh cần loại trừ (mức 1–2), nên bệnh lành tính không bao giờ có hạng (đau thành ngực 76%). Khuyên quá mức, chấp nhận |
