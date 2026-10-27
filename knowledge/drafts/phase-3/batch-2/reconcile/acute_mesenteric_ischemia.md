# Biên bản đối chiếu: acute_mesenteric_ischemia (Thiếu máu mạc treo ruột cấp)

- Lượt C (`agent:pass-c`), Giai đoạn 3 lô 2 phần a, 27/10/2026. Trạng thái: `source_checked`.
- Nguồn đã mở lại: toàn văn WSES 2022 (PMC9580452), Tamme 2022 (PMC9608543); tóm tắt Park 2002, Kärkkäinen 2015. `bala-wjes-2022` (A) và `wses-ami-2022` (B) là cùng một bài: chỉ giữ `wses-ami-2022`.

## Bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| mondo | không có | MONDO:0004613 | Bỏ | Chưa xác minh được mã là thể cấp | — |
| abd_pain_location | {quanh rốn 0,35; khắp bụng 0,30…} | {0,30; 0,35…} | Trung bình | Lệch 0,05 | WSES |
| abd_pain_duration | phân bố A | phân bố B | Trung bình | Lệch dưới 0,1 | WSES, Park |
| diarrhea_bloody | occasional | frequent | frequent | Lệch một mức, ngang nguồn; dấu hiệu cảnh báo của bệnh nguy hiểm nên giữ mức mạnh hơn; tính trong số người tiêu chảy tới khoảng 16/35 | WSES (dẫn Park) |
| known_heart_disease | occasional | frequent | occasional | Nguồn chỉ liệt kê yếu tố nguy cơ, không có tỷ lệ; rung nhĩ có câu riêng cùng cụm; frequent làm câu "Không" (rất hay gặp) giảm khả năng gần 2 lần | WSES bảng 1 |
| hypertension_known | không | frequent | Bỏ | Chỉ một lượt, không có tỷ lệ; người cao tuổi tự biết tăng huyết áp nhiều hơn tỷ lệ nền 0,15 nên dễ đẩy bệnh lên vô căn cứ | — |
| cold_hands_feet | không | rare (above_leak_ok) | Giữ | Sốc là biểu hiện muộn (WSES), tác dụng nhỏ | WSES |
| Mã ICD-10 | K55.0 | K55.0 | Giữ | — | — |

Các trường còn lại (mức xử trí 1, không được bỏ sót, prior P6/P5/P4 theo tuổi, buồn nôn, nôn, tiêu chảy, sốt, bụng cứng, rung nhĩ đã biết, sụt cân) hai lượt giống nhau.

## Giá trị dựa trên nhận định

- Prior (suy từ tỷ lệ mắc châu Âu; P4 từ 75 tuổi ngang viêm ruột thừa theo Kärkkäinen).
- Mức occasional cho rung nhĩ đã biết và bệnh tim đã biết; cold_hands_feet rare.
- Phân bố vị trí đau, cách khởi phát, thời gian đau, liên quan bữa ăn.

## Kiểm thử

- d-acute-mesenteric-ischemia-1 (mức 1, hạng 2), -2 (thể cấp trên nền mạn: mức 2, hạng 3), -3 (dễ nhầm viêm dạ dày – ruột: mức 1, hạng 3).
- Ca -2: lượt C ban đầu ghi mức đúng là 1; sửa thành 2 vì người bệnh ổn định, không đau dữ dội, không sốc (đến cấp cứu ngay là đủ theo WSES); thể điển hình đau dữ dội đột ngột mới cần gọi 115.
