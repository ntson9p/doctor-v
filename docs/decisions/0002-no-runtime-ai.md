# 0002. Không dùng AI khi app chạy

**Ngày:** 2026-10-24 · **Trạng thái:** Đã duyệt (chủ dự án chọn phương án khuyến nghị)

## Bối cảnh
- **Bằng chứng về LLM:**
  - Một thử nghiệm ngẫu nhiên năm 2026 trên Nature Medicine (1.298 người) cho thấy người dùng LLM không nhận ra bệnh hay mức khẩn tốt hơn nhóm đối chứng.
  - Trên bệnh nhân cấp cứu thật, GPT-3.5 và GPT-4 xếp mức khẩn thấp hơn cần thiết ở 22–41% số ca.
- **Pháp lý khi gửi dữ liệu ra nước ngoài:**
  - Gửi dữ liệu sức khỏe tới AI ở nước ngoài kéo theo nghĩa vụ nặng theo Luật 91/2025/QH15 (dữ liệu cá nhân nhạy cảm, chuyển dữ liệu xuyên biên giới).
  - Luật Trí tuệ nhân tạo 134/2025/QH15 cũng phát sinh nghĩa vụ.

## Quyết định
- **Bộ suy luận Bayes cố định chạy trên máy người dùng.** Không có LLM nào được gọi khi app chạy.
- **AI (Claude) chỉ hỗ trợ soạn nội dung** ở khâu phát triển. Mọi dữ kiện đều phải có nguồn kiểm chứng được, qua đối chiếu chéo, và chờ bác sĩ duyệt.

## Hệ quả
- **Lợi ích:**
  - kết quả nhất quán, kiểm thử được;
  - chạy được offline;
  - không tốn phí vận hành.
- **Đánh đổi:** người dùng chọn từ danh sách thay vì gõ tự do. Bù lại bằng ô tìm kiếm hiểu chữ không dấu, từ đồng nghĩa và từ địa phương.
- **Tính năng AI tùy chọn** (nhập mô tả tự do) chỉ xem xét sau khi đã chuẩn bị đủ pháp lý (`docs/research/legal-regulatory.md`, mục 4.7).

## Phương án đã cân nhắc
- **AI tùy chọn để nhập tự do:** để giai đoạn sau.
- **Chatbot AI tự kết luận:** không chọn, vì thiếu bằng chứng an toàn.
