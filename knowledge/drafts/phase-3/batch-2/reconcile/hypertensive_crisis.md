# Biên bản đối chiếu: hypertensive_crisis (Cơn tăng huyết áp)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 2 phần b, 27/10/2026.
- Bản chính thức: `knowledge/conditions/hypertensive_crisis.yaml`, trạng thái `source_checked`.
- Mức xử trí 3, không thuộc nhóm không được bỏ sót: hai lượt thống nhất.
- Hai lượt khác nhau nhiều nhất (1 liên kết có/không chung, 8 chỉ lượt A, 7 chỉ lượt B). Lượt C giữ thiết kế của phạm vi lô: prior thấp, bệnh chủ yếu được nhận ra nhờ số đo huyết áp.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| vi_common | Lên huyết áp, Lên tăng-xông | Cơn cao huyết áp, Huyết áp tăng vọt | Theo lượt B | "Tăng-xông" là từ dân gian, không dùng làm tên hiển thị (quy tắc viết, mục 4) | – |
| Prior Đau đầu | P5; thiếu niên P6; từ 45 tuổi P4 | P5 mọi người lớn; thiếu niên P6 | Theo lượt B | Phạm vi lô: không có số đo thì prior thấp; lượt B thử P4 ở người cao tuổi: người 79 tuổi chóng mặt tư thế bị hỏi thêm 10 câu, lên mức 3 | Vallelonga 2020, NHS |
| Prior Chóng mặt | P5; thiếu niên P6; từ 65 tuổi P4 | như Đau đầu | Theo lượt B | Như trên | Vallelonga 2020, Pierin 2019 |
| bp_measured | 0,02/0,06/0,27/0,65 | 0,005/0,025/0,17/0,80 | 0,01/0,04/0,22/0,73 | Trung bình; 3192 xếp độ 3 từ tâm trương 110 | ICHD-3 10.3, MSD, 3192, Pierin 2019 |
| hypertension_known | frequent | very_frequent | frequent | 4 nghiên cứu 34–78% (trung bình khoảng 58%); mức thấp hơn đúng yêu cầu không đẩy bệnh lên chỉ vì tiền sử | Vallelonga, Zampaglione, Shin, Pierin |
| bp_lowering_meds | occasional | không liên kết | Không liên kết | Hai lượt cùng tránh đếm trùng; occasional gần bằng tỷ lệ nền 0,15 | Shin 2021 |
| headache, dizziness, nausea | occasional | không có | Không liên kết | Bằng tỷ lệ nền 0,2 nên không mang thông tin | Pierin 2019 |
| fainting_or_near_fainting | occasional | không có | Không liên kết | 4–10%, gần tỷ lệ nền 5% | Vallelonga 2020, Zampaglione 1996 |
| chest_pain_pressure, breathing_difficulty | occasional | không có | Giữ | Có số liệu (8,7–17,8%) | Pierin 2019, Vallelonga 2020 |
| confusion | rare, above_leak_ok | không có | Giữ | Bệnh não do tăng huyết áp; lú lẫn 10% ở người đến cấp cứu | Zampaglione 1996, Vallelonga 2020 |
| bleeding_gums_nose | không liên kết (câu gộp chảy máu chân răng) | rare, above_leak_ok | Giữ rare | Chảy máu mũi 3–17%; rare chỉ tăng nhẹ | Vallelonga 2020, Zampaglione 1996 |
| headache_location, character, course, duration | không có | có | Giữ | ICHD-3 10.3 (thường hai bên, theo nhịp mạch) | ICHD-3 |
| dizziness_pattern | không có | có | Không giữ | Nguồn chỉ ghi có chóng mặt, phân bố là ước lượng thuần túy | – |
| Lời dặn | đo lại theo 3192 | đo lại, không tự tăng thuốc | Hợp | 3192 Phụ lục 2: nghỉ 5–10 phút, không dùng chất kích thích 2 giờ trước | 3192 |

## Giá trị dựa trên nhận định

- Prior (chưa có số liệu về tỷ lệ huyết áp từ 180/120 ở người khám vì đau đầu, chóng mặt).
- Phân bố số đo huyết áp và đặc điểm đau đầu.
- Mức confusion, bleeding_gums_nose (cố ý cao hơn tỷ lệ nền nhưng thấp).

## Đề xuất

- Người bảo trì: thêm hypertensive_crisis vào `conditions` của rf_extreme_bp_with_symptoms.
- Lựa chọn số đo chưa có mốc 180/110 riêng.

## Ca dev

- d-hypertensive-crisis-1, -2, -3.
