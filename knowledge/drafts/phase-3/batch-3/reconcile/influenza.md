# Biên bản đối chiếu bản mở rộng: influenza (Cúm mùa)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần a, 31/10/2026.
- Bản chính thức: `knowledge/conditions/influenza.yaml`, giữ trạng thái `source_checked` (nguồn mới frese-jcmr-2011 đã mở lại).
- Không sửa giá trị đã đối chiếu trước đây.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Ho | P2 | P2 | Giữ | Trùng | Todd 2018, Nguyen 2013, Ebell 2025 |
| Prior Khó thở | P3 | P4 | P4 | Lệch một mức; Frese 2011 (đã mở lại): cúm 0,44% (Hà Lan), 1,08% (Đức) người khám vì khó thở mới; người khó thở vì biến chứng phần lớn được tính vào viêm phổi | Frese 2011, 1840 |
| cough_duration | {.6, .28, .11, .01} | {.62, .27, .10, .01} | Trung bình | | CDC, 1840 |
| dyspnea_onset | {.07, .85, .08} | {.07, .88, .05} | Trung bình | | 1840 |
| dyspnea_severity | {.62, .32, .06} | không có | Giữ | Gần bằng phân bố nền; khó thở lúc nghỉ là cúm nặng (1840) | 1840 |
| breathing_difficulty | nêu vấn đề, không thêm | nêu vấn đề, không thêm | Không thêm | Lượt C trước đã bỏ liên kết này (không có số liệu ngoài bệnh viện, gần tỷ lệ nền 5%). Ở Ho, khi không liên kết, câu "có khó thở" dùng tỷ lệ nền 5%, tức cúm đã được tính như hiếm khó thở (thấp hơn COVID-19 occasional, viêm phế quản frequent); câu "không" gần như trung tính. Không có nguồn để đặt mức khác | – |

## Giá trị dựa trên nhận định

- Prior Ho, phân bố thời gian ho, khởi phát và mức khó thở.
- Hệ số mùa miền Bắc (đã có) áp cả cho Ho, Khó thở.

## Ca dev cũ của bệnh này

- d-influenza-1, -2, -3: thêm cough_duration lt_1w; d-influenza-1 thêm chest_pain absent ("không đau ngực"). Kết quả không đổi.

## Ca dev mới

- d-influenza-cough-1 (Ho, 34 tuổi, Hà Nội tháng 1): mức 5, hạng 1 (79%); hai hạt giống nhiễu ra mức 3.
- d-influenza-shortness-of-breath-1 (Khó thở, cúm ngày 3): mức 3, hạng 1 (83%); viêm phổi để `acceptable` vì chỉ khám, chụp phổi mới phân biệt được.
