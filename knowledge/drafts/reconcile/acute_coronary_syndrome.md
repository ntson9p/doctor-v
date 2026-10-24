# Biên bản đối chiếu: Hội chứng mạch vành cấp (`acute_coronary_syndrome`)

- Người đối chiếu: `agent:pass-c` (lô 4), ngày 2026-10-24.
- Bản nháp: `knowledge/drafts/pass-a/acute_coronary_syndrome.yaml`, `knowledge/drafts/pass-b/acute_coronary_syndrome.yaml`.
- Bản chính thức: `knowledge/conditions/acute_coronary_syndrome.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 16, lượt B 16, chung 12; bản chính thức 18 liên kết. Trong đợt thử nghiệm bệnh chỉ có prior cho đau bụng.
- Nguồn đã mở lại: 2187/QĐ-BYT (bản đăng lại toàn văn trên vnras.com), MSD; van Oosterhout 2020, Hoang Vu 2025, Trinh 2025, Le 2025 (toàn văn qua API Europe PMC); Canto 2000, Canto 2012, Nguyen 2022, Swap 2005, Viniol 2014 (tóm tắt). Không trích NICE CG95 trong bệnh này (trang NICE chặn truy cập tự động).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi_common` | Nhồi máu cơ tim, Cơn đau tim | thêm Hội chứng vành cấp | Hợp | | |
| `summary_vi` | | | Gộp | Câu chữ | 2187 |
| `chest_pain_pressure` | frequent | frequent, `freq_by_age` 75+: occasional | **Giữ cả `freq_by_age`** | Nguồn cho thấy rõ xu hướng theo tuổi: nhóm không đau ngực già hơn trung bình 7 tuổi (Canto 2000); MSD: người cao tuổi hay than khó thở hơn đau ngực. Làm câu trả lời "không đau ngực" ít trấn an hơn ở người từ 75 tuổi | Canto 2000, Canto 2012, MSD |
| `es_crushing_chest_pain` | occasional | không liên kết | **Giữ** | Khi người dùng chọn mục này ở màn sàng lọc, liên kết đưa bệnh lên đầu danh sách cần loại trừ; khi trả lời "không" chỉ giảm khoảng 1,2 lần | 2187, Canto 2000 |
| `pain_radiates_arm_jaw`: bậc | B/verbal | A/numeric | A/numeric, occasional | Cùng mức; số liệu 37–38% (van Oosterhout) hạ một mức cho người chủ yếu đau bụng | van Oosterhout, Swap |
| `cold_sweat` | occasional (B/verbal) | frequent (A/numeric 44–47%) | **occasional** | Lệch một mức. Số liệu bậc A đo ở bệnh viện, chủ yếu ở người đau ngực; vã mồ hôi thường đi kèm cơn đau ngực điển hình (MSD; 2187) và người đau thắt ngực kèm vã mồ hôi đã dừng ở màn sàng lọc. Hạ một mức theo kb-guide 2.1, giống cách lượt B làm với đau lan tay | van Oosterhout, MSD, 2187 |
| `breathing_difficulty` | occasional (B/verbal) | frequent (A/numeric 40–48%) | **frequent** | Lệch một mức. Giữ số liệu bậc A, không hạ: khó thở nổi bật ở biểu hiện không điển hình (2187) và ở người cao tuổi (MSD) | van Oosterhout, MSD, 2187 |
| `nausea`: bậc | B/verbal | A/numeric | A/numeric, frequent | Cùng mức | van Oosterhout |
| `vomiting` | occasional | không liên kết | **Bỏ** | Mức occasional (20%) bằng đúng tỷ lệ nền 20% của nôn khi đau bụng, không mang thông tin | |
| `fatigue` | frequent (C/verbal) | không liên kết | **Bỏ** | Nguồn chỉ nêu mệt là triệu chứng có thể gặp, không cho tần suất; với tỷ lệ nền 20%, mức frequent làm câu trả lời "Không" giảm khả năng một bệnh không được bỏ sót | MSD, 2187 |
| `heartburn` | occasional | không liên kết | **Giữ** | Người bệnh hay tưởng là khó tiêu (MSD); khó tiêu là triệu chứng khi đến viện được tổng hợp (van Oosterhout). Giữ để câu trả lời "ợ chua, nóng rát" không làm giảm khả năng bệnh tim | MSD, van Oosterhout |
| `abd_pain_location` | thượng vị 0,72 | 0,70 | 0,71; bụng dưới mỗi vùng 0,01 | TVD 0,05; 2187: không lan quá rốn | 2187 |
| `abd_pain_duration` | lt_6h 0,35 | 0,50 | 0,43/0,25/0,16/0,09/0,07 | TVD 0,15; trung bình | Canto 2000, 2187, Nguyen 2022 |
| `known_heart_disease`: cơ sở | numeric | judgment | numeric, occasional | Cùng mức | Canto 2000, Hoang Vu |
| `smoker` | occasional (27,3%, n = 1.168) | frequent (42,5%, n = 127; khoảng 20%, n = 118) | **occasional** | Lệch một mức. Trung bình theo cỡ mẫu khoảng 28%: nằm trong khoảng occasional; nguồn lớn nhất là của A | Hoang Vu, Trinh, Le |
| `abd_pain_radiates_back` | không liên kết | occasional | **Giữ** | Đau giữa hai bả vai được báo cáo, hay ở nữ (OR 2,15); MSD: lan ra lưng | van Oosterhout, MSD |
| `abd_pain_severe` | không liên kết | occasional | **Giữ** | Biểu hiện thượng vị thường là tức, đè nặng | 2187 |
| `abd_pain_meal_relation` | không liên kết | phân bố | **Giữ** | Giúp phân biệt với loét dạ dày – tá tràng | 2187 |
| `fever` | không liên kết | rare | **Giữ** | Không có trong triệu chứng khởi phát | 2187 |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | | 2187 |

Giống nhau ở hai lượt: tên chính thức, mã I24.9, `urgency` 1, `cant_miss` true, chuyên khoa, prior (P6; 45–64 tuổi P5; từ 65 tuổi P4), không dùng hệ số theo giới, `fainting_or_near_fainting`, `diabetes`, `known_heart_disease` (occasional), `hypertension_known` (frequent), `warning_signs`.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P6/P5/P4: chưa có số liệu tỷ lệ hội chứng mạch vành cấp trong người đau bụng ở tuyến ban đầu; Viniol 2014 không có bệnh tim trong các nguyên nhân thường gặp.
- `chest_pain_pressure` frequent (75+: occasional): ước khoảng một nửa người biểu hiện đau bụng vẫn có tức ngực.
- Hạ `cold_sweat` một mức, giữ `breathing_difficulty`: lựa chọn của lượt C từ mô tả bằng lời về biểu hiện không điển hình.
- `es_crushing_chest_pain`, `heartburn`, `abd_pain_radiates_back`, `abd_pain_severe` (occasional); phân bố `abd_pain_location`, `abd_pain_duration`, `abd_pain_meal_relation`.
- Không dùng hệ số theo giới (khoảng 65–70% người bệnh là nam), vì nữ hay biểu hiện không đau ngực hơn.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-acute-coronary-syndrome-1 (68 tuổi, đau thượng vị, tức ngực, vã mồ hôi) | Hạng 1 (96%), mức 1/1 | Quy tắc rf_chest_pain_with_features |
| d-acute-coronary-syndrome-2 (nữ 78 tuổi, không đau ngực) | Hạng 1 (79%), mức 1/1 | Mức 1 theo xác suất (ngưỡng người từ 75 tuổi) |
| d-acute-coronary-syndrome-3 (dễ nhầm loét dạ dày) | Hạng 1 (86%), mức 1/1 | Khi lô 3 có viêm loét dạ dày – tá tràng, ca này sẽ khó hơn |

## 4. Đề xuất cho người bảo trì

- Tỷ lệ nền của `diabetes`, `hypertension_known`, `smoker` không đổi theo tuổi và giới (ví dụ hút thuốc: nam hút nhiều, nữ rất ít, như leak_note của danh mục đã ghi), làm liên kết yếu tố nguy cơ kém chính xác; nên cho phép tỷ lệ nền theo nhóm tuổi hoặc giới.
