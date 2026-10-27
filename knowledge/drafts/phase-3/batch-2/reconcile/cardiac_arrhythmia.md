# Biên bản đối chiếu: cardiac_arrhythmia (mở rộng, Giai đoạn 3 lô 2)

- Lượt C (`agent:pass-c`), 27/10/2026. Sửa tại chỗ `knowledge/conditions/cardiac_arrhythmia.yaml`; mọi giá trị cũ giữ nguyên. Trạng thái vẫn `source_checked`.
- Nguồn mới: Salbach 2025 (toàn văn PMC11877945, đã mở lại). Không dùng `aphrs-af-2026` (lượt A; không có số liệu Việt Nam) làm nguồn số.

## Bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| atrial_fibrillation_known, Hồi hộp | frequent | frequent | frequent | Giống nhau | Salbach, Weber |
| atrial_fibrillation_known, Ngất | occasional | occasional | occasional | Giống nhau | ESC 2018 |
| atrial_fibrillation_known, Chóng mặt | occasional | frequent | occasional | Ngang nguồn (ước lượng); rối loạn nhịp gây choáng ở người cao tuổi phần lớn là nhịp chậm, như lý do của Ngất | ESC 2018 |

Cách khai báo cuối: `freq: occasional`, `freq_by_complaint: { palpitations: frequent }`.

## Độ mạnh của liên kết

- Với Hồi hộp từ 45 tuổi: rung, cuồng nhĩ chiếm khoảng một nửa số rối loạn nhịp (Weber 1996, qua EHRA 2011), và khoảng 73% người đến cấp cứu vì rung nhĩ đã biết từ trước (Salbach 2025), nên khoảng 35–50% người bệnh này trả lời "Có". Với tỷ lệ nền 0,04, câu "Có" tăng khả năng khoảng 12 lần, phù hợp số liệu (khác với đột quỵ, nơi số liệu chỉ gợi ý 2–3 lần).

## Giá trị dựa trên nhận định

- Mức occasional với Ngất và Chóng mặt; tỷ lệ đã biết rung nhĩ lấy từ một khoa cấp cứu ở Đức.

## Kiểm thử

- Ca mới d-cardiac-arrhythmia-palpitations-1 (66 tuổi, đã biết rung nhĩ, cơn đang tiếp diễn, mạch 120): mức 3, hạng 1.
