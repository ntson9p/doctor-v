# Biên bản đối chiếu: diabetic_ketoacidosis (Nhiễm toan ceton, tăng áp lực thẩm thấu do đái tháo đường)

- Lượt C (`agent:pass-c`), Giai đoạn 3 lô 2 phần a, 27/10/2026. Trạng thái: `source_checked`.
- Nguồn đã mở lại: tóm tắt Umpierrez 2002, toàn văn Bich 2025 (PMC12597153); các văn bản 3879/QĐ-BYT, 5481/QĐ-BYT, 3312/QĐ-BYT (2015), NHS DKA, NHS Type 1 diabetes, WHO BEC đã xác minh trong sổ. Không dùng `ada-hyperglycemic-crises-2024` (Europe PMC chỉ có tóm tắt, không có các số lượt A dẫn) và `who-steps-vn-2021` (lượt A; số STEPS đã có trong ghi chú tỷ lệ nền của câu đái tháo đường).

## Bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Mã ICD-10 | E10.1 | E14.1 | E14.1 | Bệnh gộp, không xác định típ | — |
| specialties | thêm pediatrics | không | Bỏ pediatrics | Bộ suy luận tự thêm "Nhi khoa" dưới 16 tuổi | engine-spec §9 |
| Prior Đau bụng 5–17 tuổi | P5 | P6 | P6 | B có số liệu Việt Nam: 0,77/100.000 trẻ mỗi năm, kể cả 57,8% khởi phát bằng nhiễm toan vẫn dưới 0,02% trẻ đau bụng | Bich 2025 |
| Prior Chóng mặt 45–64 tuổi | P5 | P6 | P6 | Thể tăng áp lực thẩm thấu chủ yếu trên 60 tuổi | 3879/QĐ-BYT |
| diabetes | frequent | very_frequent; thiếu niên, từ 65 tuổi frequent | Bản B | Nguồn cho thấy khác biệt theo tuổi (tới 40% tăng áp lực thẩm thấu là lần đầu phát hiện; 57,8% trẻ nhiễm toan lúc chẩn đoán) | 3879, Bich |
| breathing_difficulty | occasional | frequent | frequent | B dẫn hướng dẫn hiện hành của Bộ Y tế (thở Kussmaul là triệu chứng phổ biến), WHO BEC (người bệnh kể là khó thở); dấu hiệu cảnh báo | 5481/QĐ-BYT, WHO BEC |
| fatigue | very_frequent | frequent | frequent | Mô tả bằng lời; mức thấp hơn để câu "Không" không hạ quá mạnh bệnh nguy hiểm | 3879, NHS |
| weight_loss_unintended | frequent | occasional; trẻ em, thiếu niên frequent | Bản B | Trẻ mới khởi phát típ 1 hay sụt cân (89,1%); người lớn nhiễm toan diễn ra 1–2 ngày | Bich, 3879 |
| glucose_measured, abd_pain_location, abd_pain_onset | phân bố A | phân bố B | Trung bình | Lệch dưới 0,1 | 3879, 5481 |
| persistent_vomiting, abd_pain_severe, dizziness_on_standing, dizziness_pattern, vertigo_spinning | không | có | Giữ | Có nguồn mô tả (nôn gây mất nước, đau liên quan mức toan, hạ huyết áp tư thế) | 3879, Umpierrez |
| severe_weakness | occasional | không | Giữ | Mất nước nặng, hạ huyết áp | 3879 |
| warning_signs | có severe_weakness | có cold_hands_feet | Gộp | — | — |

## Dấu hiệu đề xuất (không đưa vào lô này)

- `deep_rapid_breathing` ("Thở nhanh, sâu bất thường", lượt B; lượt R cũng nêu): không đưa vào danh mục ở lô này vì bộ ca giữ kín được viết khi chưa có câu này. Đề xuất người bảo trì thêm ở lô sau để rf_dka_suspected không phải dựa vào câu khó thở chung.

## Giá trị dựa trên nhận định

- Prior mọi triệu chứng chính; mức occasional của mùi ceton; tỷ lệ người đã biết bệnh theo tuổi.
- Các phân bố (vị trí đau, thời gian, kiểu chóng mặt, đường huyết).

## Kiểm thử

- d-diabetic-ketoacidosis-1 (mức 2, hạng 1).
- -2 (tăng áp lực thẩm thấu, 79 tuổi, triệu chứng chính Sốt): mức 1 (mức đúng 2, an toàn) do xác suất nhiễm khuẩn huyết ở người từ 75 tuổi; câu khát nhiều không được hỏi nên bệnh xếp hạng 10. Bản đầu dùng triệu chứng chính Chóng mặt kiểu liên tục: quy tắc rf_acute_vertigo_vascular_risk dừng phiên ngay, cũng không hỏi khát nhiều.
- -3 (thiếu niên chưa biết bệnh, dễ nhầm viêm dạ dày – ruột): mức 2 (đúng, nhờ khả năng viêm ruột thừa) nhưng hạng 12: với prior P6 câu khát nhiều không được hỏi, nên quy tắc rf_dka_suspected không thỏa. Đề xuất người bảo trì cân nhắc hỏi câu khát nhiều, tiểu nhiều trong nhóm hỏi tiếp của Đau bụng ở trẻ em, thiếu niên (rf_new_diabetes_child đã dùng câu này).
