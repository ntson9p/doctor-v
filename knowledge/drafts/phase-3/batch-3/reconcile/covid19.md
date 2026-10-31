# Biên bản đối chiếu bản mở rộng: covid19 (COVID-19)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần a, 31/10/2026.
- Bản chính thức: `knowledge/conditions/covid19.yaml`, giữ trạng thái `source_checked` (không thêm nguồn mới).
- Không sửa giá trị đã đối chiếu trước đây.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Ho, Khó thở | P3, P4 | P3, P4 | Giữ | Trùng; hoàn toàn là ước lượng | 2671, Marquez 2022 |
| cough_duration | {.6, .27, .12, .01} | {.60, .28, .11, .01} | Trung bình | | ZOE (Menni 2022), NHS Cough |
| dyspnea_onset | {.07, .85, .08} | {.07, .85, .08} | Giữ | Trùng | 2671 |
| dyspnea_severity | {.62, .32, .06} | không có | Giữ | Gần bằng phân bố nền | 2671 |

## Giá trị dựa trên nhận định

- Prior Ho, Khó thở (không có số liệu lưu hành 2025–2026); mọi phân bố mới.

## Ca dev cũ của bệnh này

- d-covid19-1, -3: thêm cough_duration lt_1w; d-covid19-3 thêm chest_pain absent. d-covid19-2 không ho, không thêm. Kết quả không đổi.

## Ca dev mới

- d-covid19-cough-1 (Ho, 31 tuổi, que thử dương tính): mức 5, **hạng 3** (cảm lạnh 78%, cúm 16%, COVID-19 5%). Nguyên nhân: ở triệu chứng chính Ho, câu tự xét nghiệm COVID-19 không có trong nhóm hỏi tiếp và không được chọn hỏi (phiên dừng "đủ tin cậy" sau 29 câu). Đề xuất cho người bảo trì: thêm `covid_self_test` vào phần hỏi tiếp của Ho (và Khó thở), như ở Sốt.
- d-covid19-shortness-of-breath-1 (Khó thở, 68 tuổi, đái tháo đường): mức 2 đúng (rf_high_risk_fever_breathing), dừng khẩn; danh sách cần loại trừ là [viêm phổi]. Viêm phổi để `acceptable` (khó thở ngày 4 ở người cao tuổi bị COVID-19 thường là viêm phổi do vi rút).
