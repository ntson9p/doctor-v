# 0007. Mô hình Bayes đơn bệnh, tần suất quan sát

**Ngày:** 2026-10-24 · **Trạng thái:** Đã duyệt

## Bối cảnh
- **Bằng chứng về độ chính xác:** các hệ thống Bayes do bác sĩ xây với tham số "thô" (5 mức) đạt độ chính xác ngang bác sĩ trên ca mẫu: QMR-DT; Babylon đạt 72,5% so với 71,4%.
- **Những lỗi đã biết:**
  - xác suất 0;
  - tỷ lệ nền đồng nhất quá nhỏ;
  - đếm trùng các triệu chứng tương quan.

## Quyết định
- **Mô hình Bayes đơn bệnh** với giả thuyết "nguyên nhân khác".
- **Tham số:**
  - tần suất quan sát theo 5 mức cố định;
  - tỷ lệ nền theo từng dấu hiệu;
  - tần suất có điều kiện cho câu hỏi lồng nhau;
  - gom cụm cộng hệ số nhiệt để chống đếm trùng.
- **Không có xác suất 0/1**, trừ loại trừ bất khả về sinh học.
- Chi tiết toán học trong `docs/engine-spec.md`, gồm cả các khác biệt có chủ đích so với báo cáo nghiên cứu.

## Hệ quả
- Chưa mô hình hóa được trường hợp mắc nhiều bệnh cùng lúc. Có lộ trình chuyển sang noisy-OR: `docs/engine-spec.md`, mục 12.
- Các tham số là ước lượng có nguồn, chờ bác sĩ duyệt. Hệ số nhiệt được hiệu chỉnh trên bộ ca phát triển.
