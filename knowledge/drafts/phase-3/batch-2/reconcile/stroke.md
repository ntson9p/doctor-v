# Biên bản đối chiếu: stroke (mở rộng, Giai đoạn 3 lô 2)

- Lượt C (`agent:pass-c`), 27/10/2026. Sửa tại chỗ `knowledge/conditions/stroke.yaml`; mọi giá trị cũ giữ nguyên. Trạng thái vẫn `source_checked`.
- Nguồn mới đã mở lại qua API Europe PMC: Engelter 2013, Debette 2009, Traenka 2017 (tóm tắt), Ton 2024, Phong 2023 (toàn văn). Không dùng `aphrs-af-2026` của lượt A: toàn văn chỉ nêu tỷ lệ rung nhĩ ở các nước châu Á khác (1,07–1,92%), không thấy số của Việt Nam.

## Bất đồng

| Liên kết | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| neck_injury_or_manipulation | rare (above_leak_ok); 13–17, 18–44 tuổi occasional | như A, thêm 5–12 tuổi occasional | Bản A | Không có số liệu ở trẻ em (lượt B cũng ghi vậy); freq_by_age chỉ dùng khi nguồn cho thấy khác biệt | Engelter, Traenka, Rothwell |
| atrial_fibrillation_known | occasional | occasional | Giữ | Hai lượt giống nhau | Ton, Phong, Kerber |
| Số liệu Engelter 2013 | "OR 5,6" | "OR hiệu chỉnh 7,6" | OR thô 5,6 | Tóm tắt chỉ đọc được OR thô | Engelter |

## Độ mạnh của liên kết rung nhĩ (ghi chú của lô)

- Rung nhĩ ở 15,1% (Ton) và 18,1% (Phong) người nhồi máu não, cơn thoáng qua ở Việt Nam, gồm cả rung nhĩ mới phát hiện; đã biết từ trước ước 8–15%. Với tỷ lệ nền 0,04, số liệu gợi ý câu "Có" tăng khả năng khoảng 2–3 lần.
- Thang tần suất chỉ có rare (2,5%, thấp hơn tỷ lệ nền nên sẽ làm "Có" giảm khả năng) và occasional (20%, tăng khoảng 5 lần). Lượt C giữ occasional theo hướng an toàn (người rung nhĩ chóng mặt cấp được nghĩ đến đột quỵ, đúng tinh thần GRACE-3).
- Cụm heart_history (tương quan trung bình) giảm đếm trùng khi trả lời "Có" cả hai câu rung nhĩ và bệnh tim đã biết.

## Giá trị dựa trên nhận định

- Tỷ lệ bẻ, nắn cổ hoặc chấn thương cổ ở người đột quỵ dưới 45 tuổi (khoảng 10%) và từ 45 tuổi (gần tỷ lệ nền).

## Kiểm thử

- Ca mới d-stroke-headache-1 (38 tuổi, đau gáy sau bẻ cổ, mất thăng bằng): mức 1 (rf_befast_high_risk), hạng 1.
- d-from-h-dizzy-020: mức 1 giữ nguyên, hạng 2 giữ nguyên; nhiễu: 4/5 lần mức 1 thành 5/5.
