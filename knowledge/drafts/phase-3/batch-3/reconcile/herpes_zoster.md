# Biên bản đối chiếu: herpes_zoster (Bệnh zona)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần c, 31/10/2026.
- Bản chính thức: `knowledge/conditions/herpes_zoster.yaml`, trạng thái `source_checked`.
- Mức xử trí 4, không thuộc nhóm không được bỏ sót: hai lượt thống nhất (NHS: gặp dược sĩ trong 3 ngày từ khi nổi ban; 75/QĐ-BYT: thuốc kháng vi rút tốt nhất trong 72 giờ).
- 14 liên kết trong bản chính thức; 11 liên kết chung trùng mức. Lượt A có thêm 2 (fever, similar_episodes_before) và đề xuất skin_burning_band; lượt B có thêm 3 (skin_burning_band, cold_sweat, diabetes).
- Nguồn mở lại: 75/QĐ-BYT bài Bệnh zona (bản đăng lại trên vnras.com), NHS Shingles, toàn văn Chen 2025, tóm tắt Kawai 2014, 4235/QĐ-BYT tr. 25–26.
- **Không mở được:** ba trang CDC (cdc-shingles-hcp của lượt A; cdc-shingles-clinical-overview, cdc-shingles-clinical-signs của lượt B). www.cdc.gov trả lỗi 403 (Access Denied) với curl; công cụ đọc trang không phân giải được tên miền. Lượt C không đưa ba nguồn này vào sổ; mọi dữ kiện liên quan đã có trong 75/QĐ-BYT và NHS.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| specialties | dermatology, general_medicine | thêm infectious_disease | dermatology, general_medicine | Điều trị ngoại trú ở da liễu, đa khoa | 75/QĐ-BYT |
| Prior Đau ngực | P4; 5–17 tuổi P5; từ 45 tuổi P3 | như lượt A | Giữ | Trùng | Chen, Kawai, 75/QĐ-BYT |
| skin_burning_band | (đề xuất dấu hiệu) | very_frequent | very_frequent | Dấu hiệu đã vào danh mục; tiền triệu bỏng rát, châm chích là điển hình (75/QĐ-BYT, NHS); trẻ em, người trẻ đau ít hơn nên không để almost_always | 75/QĐ-BYT, NHS |
| chest_pain_duration | {.10, .10, .25, .55} | {.10, .10, .15, .65} | Trung bình {.10, .10, .20, .60} | | 75/QĐ-BYT |
| immunocompromised | occasional, bậc B | occasional, bậc A | occasional, bậc B | Chen 2025 là tổng quan về nguy cơ, không phải độ chính xác chẩn đoán | Chen |
| fever | occasional | không có | Bỏ | Nguồn chỉ nêu mệt, khó chịu, nhức đầu (75/QĐ-BYT), "thấy không khỏe" (NHS); không nêu sốt. Occasional làm câu 'có sốt' tăng zona 4 lần ở người đau ngực, cạnh tranh sai với viêm phổi | – |
| similar_episodes_before | rare | không có | Giữ | Kawai: tái phát 1–6% | Kawai |
| diabetes | không có | occasional | Bỏ | 75/QĐ-BYT chỉ nêu đái tháo đường là yếu tố khởi động, không có tần suất; tỷ lệ nền 0,07 thấp hơn hẳn tỷ lệ ở người cao tuổi (nhóm hay bị zona), nên liên kết sẽ thổi phồng | – |
| cold_sweat | không có | rare | Bỏ | Ước lượng, không có nguồn | – |
| rash_any, dermatomal_rash, hives, chest_wall_tenderness, chest_pain_radiates_back, chest_pain_pressure, chest_pain_exertional, chest_pain_sudden_severe, lymph_node_swelling, breathing_difficulty | – | – | Giữ | Trùng mức | 75/QĐ-BYT, NHS |
| warning_signs | 7 mục (dấu hiệu bệnh tim) | 4 mục (lú lẫn, lơ mơ, cứng gáy, mắt) | Hợp hai bản (8 mục, bỏ fainting_or_near_fainting) | Dấu hiệu của bệnh khác cần loại trừ và của biến chứng (zona mắt, viêm não màng não) | 75/QĐ-BYT, NHS |
| self_care_vi, see_doctor_vi | | | Ghép | Giữ khám trong 3 ngày đầu, khám trong ngày nếu ban ở mắt, mũi, suy giảm miễn dịch, có thai, dưới 18 tuổi (NHS) | NHS, 75/QĐ-BYT |
| proposed_findings | skin_burning_band | – | Bỏ khỏi tệp | Đã vào danh mục | – |

## Giá trị dựa trên nhận định (bác sĩ cần duyệt)

- Prior Đau ngực (ước từ tỷ lệ mới mắc và tỷ lệ zona vùng ngực bụng 50%).
- rash_any frequent (tỷ lệ người đã có ban lúc hỏi), chest_wall_tenderness frequent, chest_pain_radiates_back occasional, lymph_node_swelling occasional, các mức rare.
- Trường hợp cần khám khẩn (zona mắt, suy giảm miễn dịch nặng, có thai, dưới 18 tuổi theo NHS) chưa có quy tắc riêng: đề xuất người bảo trì.
- Đau lan ra sau lưng (occasional) làm quy tắc mức 1 rf_chest_pain_spreading_or_systemic đúng với một phần người zona (khuyên quá mức).

## Bộ dev

| Ca | Kết quả (sạch) |
|---|---|
| d-herpes-zoster-1 (nữ 68 tuổi, điển hình) | mức 4 (đúng 4); hạng 1 |
| d-herpes-zoster-2 (nam 58 tuổi, chưa nổi ban) | mức 4 (đúng 4); hạng 1 (59%, đau thành ngực 39% là chẩn đoán chấp nhận được) |
| d-herpes-zoster-3 (nam 63 tuổi có yếu tố nguy cơ tim mạch) | mức 4 (đúng 4); hạng 1 |
