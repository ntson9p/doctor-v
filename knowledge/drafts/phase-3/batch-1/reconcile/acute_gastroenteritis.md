# Biên bản đối chiếu phần mở rộng: Viêm dạ dày – ruột cấp (`acute_gastroenteritis`), triệu chứng chính Chóng mặt, Ngất

- Người đối chiếu: `agent:pass-c` (Giai đoạn 3, lô 1, phần a), ngày 2026-10-25.
- Bản nháp: `.../pass-a/extend/acute_gastroenteritis.yaml`, `.../pass-b/extend/acute_gastroenteritis.yaml`. Biên bản Giai đoạn 1: `knowledge/drafts/reconcile/acute_gastroenteritis.md`.
- Bản chính thức: `knowledge/conditions/acute_gastroenteritis.yaml`, giữ trạng thái `source_checked`; mọi giá trị cũ giữ nguyên.
- Nguồn mới đã mở lại: NHS Dehydration, NHS Dizziness (curl); Newman-Toker 2008 (PMC). ESC 2018, NHS Fainting, NHS Diarrhoea and vomiting dùng theo sổ nguồn (lượt R, lượt C trước đã mở).

## 1. Bảng bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Chóng mặt, Ngất: bậc | B và C | C và C | **C** cho cả hai | Ước lượng; nguồn chính là trang NHS (bậc C) | NHS Dehydration |
| `dizziness_on_standing` | frequent | frequent | **occasional, riêng Chóng mặt và Ngất frequent** | Hai lượt đặt mức cho người chọn Chóng mặt, Ngất (nhóm đang mất nước). Câu này còn được hỏi ở Đau bụng, Sốt, nơi phần lớn người bệnh chưa mất nước nhiều: để frequent chung sẽ giảm khả năng bệnh ở người đau bụng, sốt không choáng khi đứng mà không có số liệu. Nguồn cho thấy khác biệt theo nhóm (NHS: chóng mặt khi đứng dậy là dấu hiệu mất nước) | NHS Dehydration, ESC 2018 |
| `dizziness` | frequent | frequent | **occasional, riêng Ngất frequent** | Hai lượt nghĩ câu này chỉ có tác dụng ở Ngất; thực ra còn được hỏi ở Đau bụng, Sốt. Mức chung bằng tỷ lệ nền (trung tính) | NHS Dehydration |
| `palpitations` | occasional | không liên kết | **Bỏ** | Nguồn (NHS) nói tim đập nhanh là dấu hiệu khám khẩn (dấu hiệu đo được), không phải triệu chứng hồi hộp; mạch nhanh đã có `pulse_measured` | NHS Dehydration |
| `vertigo_spinning` | occasional | không liên kết | **Giữ** | Chóng mặt do mất nước là choáng váng (NHS) | NHS, Newman-Toker 2007 |
| `dizziness_pattern` | 0,30/0,30/0,35/0,05 | 0,25/0,30/0,40/0,05 | 0,275/0,30/0,375/0,05 | Trung bình | NHS |
| `syncope_trigger` | | | Trung bình (đứng dậy 0,35, đi ngoài 0,275) | | ESC 2018 |
| `syncope_warning`, `pulse_measured` | | | Trung bình | | ESC, NHS |

Hai lượt giống nhau: prior Chóng mặt P3, Ngất P3; `fainting_or_near_fainting` occasional.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P3 cho Chóng mặt và Ngất.
- Mức chung occasional và mức riêng frequent cho `dizziness_on_standing`, `dizziness`; các phân bố.
- `fainting_or_near_fainting` occasional: ở Đau bụng, Sốt (nền 5%) câu trả lời "Không" giảm nhẹ khả năng bệnh (0,84 lần); ở Chóng mặt (nền 0,25) gần trung tính.

## 3. Ca phát triển và ảnh hưởng tới triệu chứng chính đã phát hành

| Ca | Kết quả (sạch) |
|---|---|
| d-acute-gastroenteritis-dizziness-1 (35 tuổi, tiêu chảy, nôn, choáng khi đứng dậy rồi hết) | Hạng 1 (96%), mức 5/5 |

Đau bụng, Sốt: không ca sạch nào đổi mức xử trí hay hạng vì phần mở rộng này (xem `migraine.md`, mục 4).

## 4. Đề xuất cho người bảo trì

- Thêm quy tắc mức 3 cho người lớn mất nước: tiêu chảy hoặc nôn kèm choáng khi đứng dậy không hết, hoặc tiểu ít (NHS Dehydration: khám khẩn); hiện chỉ có quy tắc mất nước cho trẻ (rf_child_dehydration).
- `rf_fainting_with_pain` xếp mức 2 mọi người có ngất hoặc choáng kèm đau bụng, kể cả ngất khi đi ngoài do tiêu chảy (ESC: hoàn cảnh nguy cơ thấp); bác sĩ cần xem.
