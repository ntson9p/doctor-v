# Biên bản đối chiếu bản mở rộng: common_cold (Viêm mũi họng cấp, cảm lạnh)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần a, 31/10/2026.
- Bản chính thức: `knowledge/conditions/common_cold.yaml`, giữ trạng thái `source_checked` (không thêm nguồn mới; mọi nguồn trích đều đã xác minh trong sổ).
- Không sửa giá trị đã đối chiếu trước đây.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Ho, dưới 2 tháng | P1 (mặc định) | P2 | P2 | Như prior Sốt của bệnh ở tuổi này; trẻ nhỏ ho cần nghĩ tới viêm tiểu phế quản, ho gà, viêm phổi | – |
| Prior Ho, các tuổi khác | P1; từ 65 tuổi P2 | như lượt A | Giữ | Trùng | NHS Cough, GRACE |
| Bậc prior Ho | C judgment | B judgment | B | NHS Cough (phần lớn ho do cảm lạnh, cúm), GRACE (71% người ho cấp có sổ mũi) | NHS Cough, GRACE |
| cough_duration | {.62, .30, .075, .005} | {.60, .30, .09, .01} | Trung bình | | MSD, NHS, Pappas, Thompson |
| wheeze, trẻ 2 tháng–5 tuổi | occasional | rare (mặc định) | rare | Lệch một mức, cùng nhận định; occasional (gấp 4 tỷ lệ nền) làm cảm lạnh tăng khi bé khò khè, trong khi bé khò khè cần nghĩ trước tới viêm tiểu phế quản, hen, viêm phổi | NHS, MSD |
| wheeze, các tuổi khác | rare | rare | Giữ | Trùng | NHS, MSD |
| hoarse_voice | không có | occasional | Giữ | NHS (đã xác minh) liệt kê khàn tiếng trong triệu chứng chính | NHS Common cold |

## Giá trị dựa trên nhận định

- Prior Ho (P1, ngang viêm phế quản cấp ở người 18–74 tuổi): hai bệnh gối nhau.
- Phân bố thời gian ho; hoarse_voice occasional; wheeze rare.

## Kiểm tra cột Ho (`npm run kb:priors`, chỉ các bệnh phần a)

- Tổng prior: dưới 2 tháng 34%, 2 tháng–17 tuổi 64%, 18–44 tuổi 77%, 45–64 tuổi 80%, 65–74 tuổi 77%, từ 75 tuổi 57%. Thêm các bệnh phần b, c (ho gà, viêm tiểu phế quản, viêm thanh quản, suy tim, phản vệ, trào ngược…), cột vẫn dưới khoảng 85% (1 − other_prior). Cảm lạnh và viêm phế quản cấp cùng P1 ở người lớn là hai bệnh lớn nhất, đúng như NHS Cough và GRACE.

## Ca dev cũ của bệnh này

- d-common-cold-1, -2, -3: thêm cough_duration lt_1w (lời kể "hai ngày nay"); d-common-cold-3 thêm chest_indrawing absent ("không thấy rút lõm lồng ngực"). Kết quả không đổi.

## Ca dev mới

- d-common-cold-cough-1 (Ho, 28 tuổi): mức 5, hạng 1 (77%); một hạt giống nhiễu ra mức 3.
