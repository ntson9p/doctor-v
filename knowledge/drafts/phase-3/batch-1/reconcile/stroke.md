# Biên bản đối chiếu phần mở rộng: Đột quỵ não (`stroke`), triệu chứng chính Chóng mặt

- Người đối chiếu: `agent:pass-c` (Giai đoạn 3, lô 1, phần a), ngày 2026-10-25.
- Bản nháp: `.../pass-a/extend/stroke.yaml`, `.../pass-b/extend/stroke.yaml`. Biên bản Giai đoạn 1: `knowledge/drafts/reconcile/stroke.md`.
- Bản chính thức: `knowledge/conditions/stroke.yaml`, giữ trạng thái `source_checked`. Mọi giá trị cũ giữ nguyên; chỉ sửa câu đầu ghi chú prior Đau đầu ("chỉ có prior cho đau đầu" không còn đúng).
- Nguồn mới đã mở lại: Kerber 2006, Tarnutzer 2011, Newman-Toker 2007, 2008 (PMC, Europe PMC), Paul 2013, Bösner 2018 (Europe PMC); 3312/QĐ-BYT (2024) trên luatvietnam.vn. GRACE-3, MSD Stroke dùng theo sổ nguồn.

## 1. Bảng bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Chóng mặt | mặc định P5; 5–17 tuổi P6; 45–74 tuổi P4; từ 75 tuổi P3 | mặc định P6; 18–44 tuổi P5; 45–64 tuổi P4; từ 65 tuổi P3 | Mặc định P5; 5–17 tuổi P6; 45–64 tuổi P4; **65–74 tuổi P3**; từ 75 tuổi P3 | Chỉ lệch ở 65–74 tuổi (một mức), nguồn ngang nhau → mức cao hơn cho bệnh nguy hiểm; tuổi trên 50 dự báo mạnh đột quỵ (Tarnutzer) | Kerber 2006, Newman-Toker 2008, Tarnutzer 2011, Bösner 2018 |
| `es_stroke_signs` khi Chóng mặt | nêu vấn đề (very_frequent quá mạnh), không tự sửa | `freq_by_complaint: { dizziness: occasional }` | **occasional** | Hai lượt cùng ý. Ở hội chứng tiền đình cấp do đột quỵ, không kể dấu hiệu vận nhãn và thất điều nặng, chỉ khoảng 1/5 có dấu hiệu thần kinh khác (Tarnutzer 2011); nhiều cơn trước đột quỵ tuần hoàn sau chỉ có chóng mặt (Paul 2013); số 60% yếu vận động của Kerber đo ở cấp cứu. Mức thấp làm câu trả lời "Không" ở màn sàng lọc chỉ giảm khả năng khoảng 1,2 lần (an toàn) | Tarnutzer, Paul, Kerber |
| `headache`: bậc | B | A | B | Số liệu từ tổng quan nhưng ở cấp cứu, bệnh viện (không phải bối cảnh tương đương) | Tarnutzer 2011 |
| `vertigo_spinning`: bậc | B numeric | A verbal | B numeric | Cùng mức frequent | Kerber 2006, Tarnutzer 2011 |
| `dizziness_pattern` | 0,08/0,20/0,62/0,10 | 0,05/0,25/0,62/0,08 | 0,065/0,225/0,62/0,09 | Trung bình (TVD 0,05) | Tarnutzer, GRACE-3, Paul |
| `cannot_walk_unaided`: bậc | B | A | B | Như trên | Tarnutzer 2011 |
| `sudden_loss_of_balance` khi Chóng mặt | ghi là gần trung tính | không thêm mức riêng | **Không thêm** | Nâng lên very_frequent làm câu trả lời "Không" giảm khả năng đột quỵ 3 lần mà chưa có số liệu | |
| Nghe kém | không liên kết (2/69 ca, Tarnutzer) | không liên kết | Không liên kết | Quy tắc rf_vertigo_sudden_hearing_loss đã xếp mức 2 | Tarnutzer 2011 |

Giống nhau ở hai lượt: `headache` frequent, `vertigo_spinning` frequent, `dizziness_positional` occasional, `cannot_walk_unaided` frequent, `transient_neuro_symptoms` occasional.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior Chóng mặt (suy từ cấp cứu ở Mỹ, hạ cho tuyến ban đầu); P3 từ 65 tuổi làm người cao tuổi chóng mặt không rõ nguyên nhân dễ được khuyên đi cấp cứu.
- `es_stroke_signs` occasional khi Chóng mặt; `dizziness_positional`, `transient_neuro_symptoms` (occasional); phân bố `dizziness_pattern`.

## 3. Ca phát triển và ảnh hưởng tới các triệu chứng chính đã phát hành

| Ca | Kết quả (sạch) |
|---|---|
| d-stroke-dizziness-1 (67 tuổi, tăng huyết áp, chóng mặt liên tục, không tự đi được, đau gáy, không có dấu hiệu FAST) | Hạng 1 (47%), mức 1/1 (rf_dizziness_central_signs_high_risk) |

Phần mở rộng chỉ thêm prior cho Chóng mặt và liên kết với các câu chỉ hỏi khi chóng mặt (`vertigo_spinning`, `dizziness_pattern`, `dizziness_positional`), câu `headache` (ngầm định khi Đau đầu) và hai câu đã có quy tắc (`cannot_walk_unaided`, `transient_neuro_symptoms`). So sánh bộ dev có và không có phần mở rộng của phần a (cùng dữ liệu phần b): Sốt, Đau bụng, Đau đầu giữ nguyên chỉ số (xem `migraine.md`).

## 4. Đề xuất cho người bảo trì

- Thêm `stroke` vào `cant_miss` của Chóng mặt.
