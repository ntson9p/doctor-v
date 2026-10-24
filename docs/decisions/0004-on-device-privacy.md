# 0004. Xử lý hoàn toàn trên thiết bị

**Ngày:** 2026-10-24 · **Trạng thái:** Đã duyệt

## Bối cảnh
- Thông tin sức khỏe là **dữ liệu cá nhân nhạy cảm** theo Luật 91/2025/QH15 và Nghị định 356/2025/NĐ-CP (hiệu lực từ 01/01/2026).
- Nếu dữ liệu không rời máy người dùng, nghĩa vụ còn lại rất nhẹ (`docs/research/legal-regulatory.md`).

## Quyết định
- App là **trang tĩnh**. Bộ suy luận và dữ liệu chạy hoàn toàn trong trình duyệt.
- Không tài khoản, không analytics theo dõi, không cookie.
- Không script, font hay CDN của bên thứ ba. Có CSP chặn tài nguyên ngoài.
- Câu trả lời không bao giờ nằm trong URL.
- Chỉ lưu tiến trình trên máy khi người dùng đồng ý, và có nút "Xóa dữ liệu".

## Hệ quả
- Không có dữ liệu thật để hiệu chuẩn tự động. Hiệu chuẩn dựa trên bộ ca kiểm thử, và trong tương lai là nghiên cứu có đối tác y tế.
- Mọi tính năng gửi dữ liệu ra ngoài đều phải làm thủ tục pháp lý trước khi bật. Ví dụ: AI tùy chọn, đồng bộ, phản hồi kết cục khám.
