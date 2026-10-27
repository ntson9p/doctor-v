# Biên bản đối chiếu: transient_ischemic_attack (mở rộng, Giai đoạn 3 lô 2)

- Lượt C (`agent:pass-c`), 27/10/2026. Sửa tại chỗ `knowledge/conditions/transient_ischemic_attack.yaml`; mọi giá trị cũ giữ nguyên. Trạng thái vẫn `source_checked`.
- Nguồn mới đã mở lại như bệnh đột quỵ (Ton 2024, Phong 2023, Engelter 2013, Debette 2009, Traenka 2017).

## Bất đồng

| Liên kết | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| atrial_fibrillation_known | occasional | occasional | Giữ | Hai lượt giống nhau | Ton, Phong, Kerber, NHS TIA |
| neck_injury_or_manipulation | rare; 13–44 tuổi occasional | như A, thêm 5–12 tuổi | Bản A | Không có số liệu ở trẻ em | Engelter, Traenka |
| Nguồn của liên kết rung nhĩ | thêm aphrs-af-2026 | thêm phong-jcm-2023, nhs-tia | Bản B | APHRS 2026 không có số liệu Việt Nam như lượt A ghi | — |

## Ghi chú

- Độ mạnh liên kết rung nhĩ: như biên bản bệnh đột quỵ (occasional làm "Có" tăng khả năng khoảng 5 lần, số liệu gợi ý 2–3 lần).
- Hai lượt cùng nhận xét liên kết cũ known_heart_disease ghi "rung nhĩ 6%" (Kerber 2006); nay rung nhĩ có câu riêng cùng cụm heart_history. Không sửa giá trị cũ.

## Giá trị dựa trên nhận định

- Như bệnh đột quỵ (tỷ lệ bẻ, nắn cổ; tỷ lệ rung nhĩ đã biết từ trước).

## Kiểm thử

- Ca mới d-transient-ischemic-attack-dizziness-1 (71 tuổi, rung nhĩ ngừng thuốc chống đông, chóng mặt kèm nhìn đôi 20 phút đã hết): mức 2, hạng 1.
- d-transient-ischemic-attack-2: mức 2 giữ nguyên, hạng 2 thành 3 (rối loạn nhịp tim lên trước vì liên kết rung nhĩ), vẫn trong 3 bệnh đầu.
