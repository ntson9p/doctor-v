# Biên bản đối chiếu: anemia (Thiếu máu), phần mở rộng lô 3

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần c, 31/10/2026.
- Bản chính thức: `knowledge/conditions/anemia.yaml`, giữ `source_checked`. Mọi giá trị cũ giữ nguyên.
- Thêm prior Khó thở và 2 liên kết (mức khó thở, kiểu khởi phát khó thở).
- Nguồn mở lại: Frese 2011 (cùng ngày); 1832/QĐ-BYT, NHS Iron deficiency anaemia, GHO đã xác minh ở lượt trước.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Khó thở, trẻ dưới 2 tháng | P6 | P5 | P6 | Ngang nguồn; bệnh lành tính chọn mức thấp hơn; nhóm tuổi này chỉ sàng lọc dấu hiệu nguy hiểm | – |
| Prior Khó thở, các tuổi khác | P4 | P4 | Giữ | Trùng; Frese 0,2% (thiếu máu thiếu sắt, Hà Lan), thiếu máu phổ biến hơn ở Việt Nam | Frese, GHO |
| dyspnea_severity | {.80, .17, .03} | {.80, .17, .03} | {.70, .25, .05} | Ghi chú của lô: câu hụt hơi khi gắng sức (liên kết cũ frequent) và lựa chọn "chỉ khó thở khi đi lại, gắng sức" hỏi gần cùng một điều nhưng không cùng cụm (câu này nhiều lựa chọn). Lượt C kéo phân bố về gần tỷ lệ nền (0,6/0,3/0,1) để câu mức khó thở chỉ mang phần thông tin còn lại (khó thở lúc nghỉ, nói không trọn câu ít gặp) | 1832/QĐ-BYT |
| dyspnea_onset | {.05, .20, .75} | như lượt A | Giữ | Trùng; diễn biến từ từ | 1832/QĐ-BYT |

## Đề xuất cho người bảo trì

- Câu `breathless_on_exertion` có tỷ lệ nền chung 0,15, trong khi khi triệu chứng chính là Khó thở phần lớn người khó thở đều hụt hơi khi gắng sức. Nên thêm `leak_by_complaint: { shortness_of_breath: khoảng 0,5 }` cho câu này; khi đó thiếu máu, suy tim không còn được tăng quá mức so với hen, viêm phổi (các bệnh không liên kết câu này).

## Giá trị dựa trên nhận định (bác sĩ cần duyệt)

- Prior Khó thở P4; hai phân bố mới.

## Ca dev cũ được thêm câu trả lời lô 3

- d-anemia-2, d-anemia-3: chest_pain không (trùng mặc định). d-anemia-1: không có câu lô 3 nào được lời kể nói rõ.

## Bộ dev (ca mới)

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-anemia-shortness-of-breath-1 (nữ 29 tuổi kinh nguyệt nhiều) | mức 3 (đúng 4); hạng 1 (79%) | Mức 3 do quy tắc rf_extreme_bp_with_symptoms ở trạng thái "không rõ": quy tắc không giới hạn triệu chứng chính, khó thở được ngầm định khi chọn Khó thở, và câu huyết áp không có lựa chọn "chưa đo" nên người chưa đo huyết áp luôn ra ít nhất mức 3. Đề xuất ở báo cáo chung |
