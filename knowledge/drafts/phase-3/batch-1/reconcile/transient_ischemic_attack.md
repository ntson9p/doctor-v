# Biên bản đối chiếu: Cơn thiếu máu não thoáng qua (`transient_ischemic_attack`)

- Người đối chiếu: `agent:pass-c` (Giai đoạn 3, lô 1, phần a), ngày 2026-10-25.
- Bản nháp: `.../pass-a/transient_ischemic_attack.yaml`, `.../pass-b/transient_ischemic_attack.yaml`.
- Bản chính thức: `knowledge/conditions/transient_ischemic_attack.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 13, lượt B 12, chung 12; bản chính thức 13 liên kết.
- Nguồn đã mở lại: Kerber 2006, Newman-Toker 2008, Tarnutzer 2011 (PMC); Paul 2013, Bösner 2018 (Europe PMC); NHS TIA (curl); 3312/QĐ-BYT (2024) bài 1 trên luatvietnam.vn; 5643/QĐ-BYT bài Chóng mặt. GRACE-3 và MSD Stroke overview dùng theo sổ nguồn (lượt R, lượt C trước đã mở).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi_common` | Thiếu máu não thoáng qua, Đột quỵ nhỏ, Tai biến thoáng qua | Thiếu máu não thoáng qua, Cơn tai biến mạch máu não thoáng qua | Thiếu máu não thoáng qua, Tai biến mạch máu não thoáng qua | Bỏ "Đột quỵ nhỏ": dễ lẫn với "đột quỵ nhẹ" (một thể đột quỵ riêng trong 3312/QĐ-BYT) | 3312/QĐ-BYT |
| `codes.icd10_verified` | true | false | **false** | Lượt C không đối chiếu được | |
| `summary_vi` | | | Lấy của lượt B (đủ ý, ngắn hơn) | | NHS TIA, 3312 |
| Prior 18–44 tuổi | P5 | P6 | **P5** | Lệch một mức, nguồn ngang nhau (đều suy từ cấp cứu ở Mỹ): chọn mức cao hơn cho bệnh nguy hiểm | Kerber 2006, Newman-Toker 2008 |
| Prior 45–64 tuổi | P4 | P5 | **P4** | Như trên | Kerber 2006, Paul 2013 |
| `prior_modifiers` theo giới | nam 1,4, nữ 0,75 | không có | **Giữ của lượt A** | Khác biệt rõ, có ý nghĩa thống kê: nam OR 2,47 (1,39–4,40); tính từ bảng 1 ra khoảng 1,5 và 0,7 | Kerber 2006 |
| `dizziness_pattern` | 0,20/0,60/0,12/0,08 | 0,12/0,73/0,10/0,05 | **0,12/0,70/0,11/0,07** | TVD 0,13: đọc lại NHS TIA (vài phút đến vài giờ, hết trong 24 giờ) và 3312: dồn vào "vài phút đến vài giờ" | NHS TIA, 3312, Paul 2013 |
| `vertigo_spinning` | frequent | không liên kết | **Giữ** | Kerber: 18/53 có lý do khám là quay cuồng; mức gần trung tính với nền 0,4 | Kerber 2006, Paul 2013 |
| `fainting_or_near_fainting` | rare | rare | **occasional** | Hai lượt chọn khi nền còn 5%; nền mới 0,25 làm rare giảm khả năng của bệnh "không được bỏ sót" khoảng 10 lần vì một câu trả lời rất hay gặp; nguồn chỉ ghi cần phân biệt với ngất | 3312/QĐ-BYT |
| `bp_measured` | 0,35/0,40/0,17/0,08 | 0,35/0,37/0,18/0,10 | 0,35/0,385/0,175/0,09 | Trung bình | 3312 (ABCD2), Kerber |
| `transient_neuro_symptoms`: cơ sở | numeric | judgment | numeric | Cùng mức frequent; số liệu của Kerber, Paul | Kerber 2006, Paul 2013 |
| `warning_signs` | không có headache_thunderclap | có | Hợp hai bản | | |
| `self_care_vi`, `see_doctor_vi` | | | Gộp; giữ "gọi 115 nếu triệu chứng đang có, tái lại hoặc trong 24 giờ qua" (NHS TIA, NHS Stroke) | | NHS TIA |

Giống nhau ở hai lượt: tên chính thức, mã G45.9, `urgency` 2, `cant_miss` true, chuyên khoa, prior dưới 18 tuổi (P6) và từ 65 tuổi (P4), các liên kết chung cùng mức.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior (P5 ở 18–44 tuổi, P4 từ 45 tuổi) và hệ số giới (một nghiên cứu ở cấp cứu Mỹ).
- `transient_neuro_symptoms` frequent: cơn tuần hoàn sau chỉ có chóng mặt không có trong câu hỏi.
- `fainting_or_near_fainting` occasional (đổi so với hai lượt); `dizziness_positional`, `cannot_walk_unaided` (rare); phân bố `dizziness_pattern`, `bp_measured`.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-transient-ischemic-attack-1 (69 tuổi, nói ngọng, tê tay 20 phút, 2 ngày trước) | Hạng 1 (62%), mức 2/2 (rf_transient_neuro) | |
| d-transient-ischemic-attack-2 (72 tuổi, rung nhĩ, 2 cơn quay cuồng đơn độc) | Hạng 2 (5%), mức 2/2 (xác suất bệnh "không được bỏ sót") | Rối loạn nhịp tim (phần b) chiếm 71% vì có bệnh tim đã biết. Cơn chóng mặt quay tự phát đơn độc hợp với cơn thiếu máu tuần hoàn sau hơn (Paul 2013); phần b nên xem liên kết cảm giác quay của rối loạn nhịp. Không sửa tham số của bệnh này |
| d-transient-ischemic-attack-3 (52 tuổi, tiền sử đau nửa đầu, tê tay, nói khó) | Hạng 1 (54%), mức 2/2 | Đau nửa đầu xếp thứ 2 |

Biến thể nhiễu: không có ca nào thiếu mức.

## 4. Đề xuất cho người bảo trì

- Thêm `transient_ischemic_attack` vào `conditions` của `rf_transient_neuro` (đề xuất của lượt R) và của `rf_dizziness_central_signs`, `rf_dizziness_central_signs_high_risk`.
- Thêm câu hỏi thời điểm của cơn (trong 24 giờ qua hay 1–7 ngày), để mức 1 khi trong 24 giờ theo NHS (đề xuất của lượt R).
- Thêm `transient_ischemic_attack` vào `cant_miss` của triệu chứng chính Chóng mặt.
