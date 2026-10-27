# Biên bản đối chiếu: heat_exhaustion (Kiệt sức do nóng)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 2 phần b, 27/10/2026.
- Bản chính thức: `knowledge/conditions/heat_exhaustion.yaml`, trạng thái `source_checked`.
- Mức xử trí 5, không thuộc nhóm không được bỏ sót: hai lượt thống nhất.

## Tên bệnh

- ICD-10 (WHO) xếp "heatstroke and sunstroke" cùng mã T67.0: "sunstroke" (say nắng) thuộc mã của sốc nhiệt. Trong dân gian, "say nắng" thường chỉ thể nhẹ.
- Hai lượt đều ghi tên thường gọi "Say nắng", "Say nóng" cho bệnh này. Lượt C đổi thành "Say nắng, say nóng thể nhẹ"; sốc nhiệt dùng "Say nắng, say nóng thể nặng". Cách ghi này không gây hiểu nhầm về mức nặng.
- Chưa đối chiếu được bộ mã ICD-10 tiếng Việt của Bộ Y tế (đã dùng 1 lần tìm kiếm, chỉ xác nhận tên tiếng Anh của T67.0, T67.5).

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Đau đầu, Chóng mặt, Ngất | P3 (dưới 5 tuổi P4 với Đau đầu) | P4 (dưới 5 tuổi P5) | P4 | Lượt B có số liệu dịch tễ (Đài Loan: khoảng 40 ca/100.000 dân/năm đi khám), lượt A ước lượng | Kuo 2025 |
| Prior Sốt | P4 (dưới 2 tháng P5) | P5 | P5 | MSD: thân nhiệt thường bình thường; nhóm sốt chủ yếu do nhiễm trùng | MSD, Kuo 2025 |
| Hệ số mùa miền Bắc | không có | hè ×2, đông ×0,2 | Giữ | Đài Loan: 67,9% ca vào mùa hè; miền Bắc có mùa rõ | Kuo 2025, Brindle 2023 |
| fainting_or_near_fainting | frequent | occasional, Chóng mặt frequent | Theo lượt B | Không có tỷ lệ; với Đau đầu, Sốt, giữ khả năng cho nguyên nhân nặng hơn | MSD, CDC NIOSH |
| fever | frequent | occasional | occasional | MSD: thân nhiệt thường bình thường; "có sốt" khi đó nghiêng về sốc nhiệt (bệnh không được bỏ sót) | MSD |
| severe_weakness | occasional | không có | Không liên kết | Đã ở mức 2 (rf_shock_signs); gục ngã giống sốc nhiệt hơn | NHS, MSD |
| myalgia | occasional | không có | Giữ | Chuột rút do nóng | CDC NIOSH, NHS |
| persistent_vomiting | không có | rare | Giữ | MSD: nôn không uống được thì truyền dịch | MSD |
| palpitations, vertigo_spinning | không có | occasional | Giữ | MSD: tim nhanh; không mô tả quay tròn | MSD |
| headache_severity, headache_course | không có | có | Giữ | Ước lượng | NHS |
| dizziness_pattern, syncope_trigger, headache_duration | xem bản A | xem bản B | Trung bình | Ước lượng | MSD, CDC NIOSH |
| Nguồn chính | CDC NIOSH | MSD | Dùng cả hai | Đều đã mở lại | CDC NIOSH, MSD |

Các liên kết trùng mức: heat_exposure, dizziness, headache, nausea, vomiting, fatigue, cold_sweat, dizziness_on_standing, decreased_urine, confusion, drowsy_hard_to_wake, not_recovered_after_faint.

## Giá trị dựa trên nhận định

- Mọi prior và hệ số mùa (không có số liệu Việt Nam).
- Mọi tần suất (nguồn chỉ liệt kê triệu chứng, không có tỷ lệ).
- Các phân bố.

## Đề xuất

- Dấu hiệu "rất khát", "chuột rút", "đã làm mát, uống nước 30 phút mà chưa đỡ" (đề xuất của lượt B, lượt R): chưa đưa vào ở lô này.
- Thứ tự câu hỏi: xem biên bản sốc nhiệt.

## Ca dev

- d-heat-exhaustion-1, -2 (chấp nhận ngất phản xạ), -3 (dễ nhầm với sốc nhiệt).
