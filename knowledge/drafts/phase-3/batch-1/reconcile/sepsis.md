# Biên bản đối chiếu lượt C: sepsis (mở rộng, Giai đoạn 3 lô 1)

- Phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-25.
- Bản nháp: `pass-a/extend/sepsis.yaml`, `pass-b/extend/sepsis.yaml`. Giữ nguyên mọi giá trị đã đối chiếu ở Giai đoạn 1.
- Nguồn mở lại: 5642/QĐ-BYT (PDF toàn văn trên kcb.vn, tự trích chữ bài Nhiễm khuẩn huyết: sốt rất thường gặp, ca nặng có thể hạ thân nhiệt; nhịp tim nhanh, thở nhanh, có thể thay đổi ý thức; sốc: huyết áp tâm thu dưới 90 mmHg; yếu tố nguy cơ: người già, bệnh mạn tính); Wattanapaiboon 2020 (toàn văn PMC: sốt và/hoặc rét run 53,8%, sốt là lý do đi khám 42,1%); MSD Sepsis and septic shock (trang MSD); NHS Sepsis (tải trang); Bösner 2018; hướng dẫn thực hành ESC 2018.
- Trạng thái: giữ `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| prior syncope | | | Trùng giá trị (dưới 65 tuổi P5, từ 65 tuổi P4, 5–17 tuổi P6) | | 5642; NHS; MSD |
| prior dizziness, 18–44 tuổi | P6 | P5 | P5 | Ngang nguồn; thận trọng hơn | 5642; Bösner |
| fever | very_frequent, từ 65 tuổi frequent (bậc C) | frequent (53,8%, bậc B) | frequent | Có số liệu; ca nặng có thể hạ thân nhiệt (5642); với very_frequent, 'không sốt' giảm khả năng bệnh khoảng 5 lần | Wattanapaiboon 2020; 5642 |
| dizziness | frequent | không liên kết | **Bỏ** | Chỉ là nhận định (NHS Sepsis không liệt kê chóng mặt); câu trả lời 'không chóng mặt' sẽ hạ nhiễm khuẩn huyết ở mọi người chọn Sốt (triệu chứng chính đã phát hành) | NHS Sepsis |
| dizziness_on_standing | không liên kết | frequent | frequent cho Ngất, Chóng mặt; mức chung occasional | Lý do của lượt B (tụt huyết áp, mất nước) chỉ đúng với người đã choáng, ngất; mức frequent cho mọi triệu chứng chính sẽ hạ bệnh ở người chọn Sốt | 5642 |
| fainting_or_near_fainting, theo triệu chứng chính | không | Chóng mặt: frequent | Dùng (B) | Tỷ lệ nền 0,25 khi Chóng mặt | 5642; Wattanapaiboon |
| syncope_trigger, pulse_measured, dizziness_pattern | | | Trung bình | | 5642; MSD |
| not_recovered_after_faint | không liên kết | occasional | Giữ (B) | Có thể thay đổi ý thức | 5642; NHS |

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Prior Ngất, Chóng mặt; các phân bố; tần suất theo triệu chứng chính.
- Các liên kết có sẵn (lú lẫn, khó thở, tay chân lạnh) lấy từ người bệnh đi khám vì sốt.

## Ảnh hưởng lên triệu chứng chính đã phát hành và bộ ca dev

- So với bản bỏ phần mở rộng: các ca Sốt giữ nguyên mức xử trí và hạng; một số ca hỏi thêm 1–3 câu (mạch, choáng khi đứng dậy); d-acute-pyelonephritis-2 bớt một phiên nhiễu xếp quá mức.
- d-sepsis-dizziness-1 (79 tuổi, sốt, tiểu buốt, choáng, mệt lả, tay chân lạnh): mức 1 đúng (rf_shock_cold_and_weak), đứng đầu danh sách cần loại trừ.
