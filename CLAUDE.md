# doctor-v

Agent chính: đọc `docs/handoff.md` trước khi làm việc. Tệp đó có trạng thái dự án, quy trình một lô, việc tiếp theo và việc tồn.

Quy tắc chung cho mọi agent:
- Trả lời chủ dự án bằng tiếng Việt. Mã, định danh, lệnh, commit message bằng tiếng Anh. Tài liệu trong `docs/` viết tiếng Việt.
- Khi cần chủ dự án quyết định: hỏi trắc nghiệm, phương án tốt nhất đứng đầu, ghi rõ được và mất.
- Không chạy `prettier --write`: mã được định dạng tay. Kiểm tra bằng `npm run verify`.
- Chỉ agent viết ca giữ kín được đọc `evaluation/vignettes/holdout/`. Các agent khác chỉ xem kết quả chấm qua báo cáo (`docs/evaluation.md`, quy tắc giữ kín).
- Agent soạn dữ liệu không chạy git: lịch sử có bản nháp của các lượt khác.
- Chỉ phát hành (`npm run web:release`, tag `release-…`) khi lô đã đạt mọi chỉ tiêu trên bộ giữ kín.

Model, effort và chi phí (chủ dự án quyết định ngày 31/10/2026, chi tiết ở `docs/handoff.md` mục 5):
- Khi tạo agent con, luôn ghi `model` và `effort`: Opus 5.5 cho mọi agent; effort xhigh cho lượt C và agent viết ca giữ kín; high cho lượt A, B, R và việc khác. Không ghi thì agent con dùng effort của phiên chính.
- Giữ ngữ cảnh gọn: mỗi lô một phiên chính mới; mỗi agent con khoảng 5 bệnh mới; agent đọc mục lục gọn thay cho đọc toàn bộ dữ liệu.
- Đo chi phí bằng `npm run agent:usage`, không dùng số token mà công cụ Agent báo khi agent xong.
