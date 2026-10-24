# 0008. Bảo đảm chất lượng khi chưa thử với người thật và chưa có bác sĩ

**Ngày:** 2026-10-24 · **Trạng thái:** Đã duyệt (chủ dự án chọn "Tìm bác sĩ sau" và "Không thử với người thật")

## Quyết định

**Nội dung y khoa:**
- Mỗi bệnh được hai agent soạn độc lập (lượt A, B), rồi agent thứ ba đối chiếu (lượt C).
- Mọi con số có nguồn đã mở được.
- Công cụ kiểm lỗi tự động chặn bậc bằng chứng E, xác suất 0/1 và nguồn không tồn tại.
- Mọi bệnh mang nhãn "chưa thẩm định" (`review.status`) cho tới khi có bác sĩ duyệt.
- App chỉ chạy nội bộ cho tới khi bác sĩ duyệt.

**Độ chính xác:**
- Bộ ca giữ kín do agent riêng viết, không được xem dữ liệu bệnh.
- Bệnh nhân mô phỏng, có thêm biến thể nhiễu.
- Chỉ tiêu và cổng chặn trong `docs/evaluation.md`.

**Giao diện** (khi có, Giai đoạn 2 trở đi):
- đánh giá theo bộ tiêu chí Nielsen và hướng dẫn của W3C cho người cao tuổi;
- kiểm thử tự động WCAG 2.2;
- chụp ảnh giao diện ở 3 bề rộng × 4 cỡ chữ;
- giả lập máy yếu;
- "nhân vật mô phỏng" rà câu chữ;
- chủ dự án tự thử qua link Zalo.

## Hệ quả và giới hạn
- **Không thay được bác sĩ thật:** các agent cùng một mô hình nền, nên "độc lập" chỉ ở mức quy trình, không ở mức kiến thức. Đây là bước bắt lỗi trích xuất.
- **Kết quả thực tế sẽ thấp hơn:** bệnh nhân mô phỏng trả lời "hoàn hảo", nên kết quả trên bộ ca là cận trên.
- **Hai điều kiện để phát hành công khai:**
  1. bác sĩ duyệt;
  2. luật sư rà soát.

  Nên thử thêm với khoảng 5 người cao tuổi nếu có điều kiện.
