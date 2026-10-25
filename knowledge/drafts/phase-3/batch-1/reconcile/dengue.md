# Biên bản đối chiếu phần mở rộng: Sốt xuất huyết Dengue (`dengue`), triệu chứng chính Chóng mặt, Ngất

- Người đối chiếu: `agent:pass-c` (Giai đoạn 3, lô 1, phần a), ngày 2026-10-25.
- Bản nháp: `.../pass-a/extend/dengue.yaml`, `.../pass-b/extend/dengue.yaml`. Biên bản Giai đoạn 1: `knowledge/drafts/reconcile/dengue.md`.
- Bản chính thức: `knowledge/conditions/dengue.yaml`, giữ trạng thái `source_checked`; mọi giá trị cũ giữ nguyên.
- Nguồn đã mở lại: WHO 2009 (tải lại PDF trên IRIS, đối chiếu mục 2.3.1.1, Textbox D, E; đã ghi thêm vào sổ nguồn), Mahabala 2023 (Europe PMC). 2760/QĐ-BYT, CDC Clinical features, ESC 2018 dùng theo sổ nguồn (lượt C, lượt R đã mở).

## 1. Bảng bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `fever` khi Chóng mặt, Ngất | nêu vấn đề (very_frequent làm người đã hết sốt bị giảm khả năng 4 lần) | `freq_by_complaint: { dizziness: frequent, syncope: frequent }` | **frequent** | Hai lượt cùng ý; giai đoạn nguy hiểm bắt đầu khi hết sốt (CDC) hoặc khi sốt đã giảm (2760); WHO 2009 Textbox E: vã mồ hôi nhiều, ngất, lả khi hết sốt | CDC, 2760, WHO 2009 |
| `dizziness_on_standing` | frequent | frequent | **occasional, riêng Chóng mặt và Ngất frequent** | Câu này còn được hỏi ở Sốt, Đau đầu, Đau bụng, nơi phần lớn người bệnh ở giai đoạn sốt; hạ huyết áp tư thế là dấu hiệu của giai đoạn nguy hiểm (WHO 2009 Textbox D, E; Mahabala 2023) | WHO 2009, Mahabala 2023 |
| `dizziness` | frequent | frequent | **occasional, riêng Ngất frequent** | Hai lượt nghĩ chỉ có tác dụng ở Ngất; mức chung bằng tỷ lệ nền (trung tính) | WHO 2009 |
| `palpitations` | occasional | không liên kết | **Bỏ** | Nhịp nhanh khi sốc là dấu hiệu đo được, không phải triệu chứng hồi hộp | WHO 2009 |
| `pulse_measured` | phân bố | không liên kết (giai đoạn sốt có thể mạch chậm tương đối, chưa có số liệu) | **Bỏ** | Không có số liệu mạch ở người tự đo | |
| `vertigo_spinning` | occasional | không liên kết | **Giữ** | Chóng mặt do tụt huyết áp là choáng váng | WHO 2009 |
| `dizziness_pattern` | 0,20/0,25/0,50/0,05 | 0,20/0,30/0,45/0,05 | 0,20/0,275/0,475/0,05 | Trung bình | 2760 |
| `syncope_trigger`, `syncope_warning` | | | Trung bình | | WHO 2009, ESC 2018 |

Hai lượt giống nhau: prior Chóng mặt, Ngất P4 (từ 65 tuổi P5); `fainting_or_near_fainting` occasional.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior Chóng mặt, Ngất P4; `fever` frequent khi Chóng mặt, Ngất.
- Mức chung occasional và mức riêng frequent cho `dizziness_on_standing`, `dizziness`; các phân bố.

## 3. Ca phát triển và ảnh hưởng tới triệu chứng chính đã phát hành

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-dengue-dizziness-1 (24 tuổi, sốt ngày 4, chóng mặt, choáng khi đứng, tiểu ít) | Hạng 1 (68%), mức 2/2 | Mức 2 đến từ xác suất nhóm bệnh mức 1–2 (2,5%), không từ quy tắc: với Chóng mặt, câu số ngày sốt và tiểu ít không được hỏi trong 30 câu (chạm trần), nên rf_fever_critical_phase_signs không được xét. Xem đề xuất 1 |

Sốt, Đau đầu, Đau bụng: không ca sạch nào đổi mức xử trí hay hạng vì phần mở rộng này (xem `migraine.md`, mục 4).

## 4. Đề xuất cho người bảo trì

1. Thêm `group: fever_red_flags` và `finding: fever_duration` vào `red_flags` của Chóng mặt và Ngất (như Đau đầu, Đau bụng đã làm), để các quy tắc giai đoạn nguy hiểm của sốt xuất huyết được xét khi người chóng mặt, ngất có sốt.
2. Quy tắc mức 2 cho người trong ngày 3–7 của bệnh sốt đã hết sốt mà ngất hoặc choáng khi đứng dậy (WHO 2009 Textbox E: tiêu chí nhập viện; CDC, PAHO: hạ huyết áp tư thế là dấu hiệu cảnh báo). Cần câu hỏi "đã sốt mấy ngày trước khi hết sốt" vì `fever_duration` chỉ hỏi khi đang sốt (đề xuất của lượt A).
