# doctor-v

Agent chính: đọc `docs/handoff.md` trước khi làm việc. Tệp đó có trạng thái dự án, quy trình một lô, việc tiếp theo và việc tồn.

Quy tắc chung cho mọi agent:
- Trả lời chủ dự án bằng tiếng Việt. Mã, định danh, lệnh, commit message bằng tiếng Anh. Tài liệu trong `docs/` viết tiếng Việt.
- Khi cần chủ dự án quyết định: hỏi trắc nghiệm, phương án tốt nhất đứng đầu, ghi rõ được và mất.
- Không chạy `prettier --write`: mã được định dạng tay. Kiểm tra bằng `npm run verify`.
- Chỉ agent viết ca giữ kín được đọc `evaluation/vignettes/holdout/`. Các agent khác chỉ xem kết quả chấm qua báo cáo (`docs/evaluation.md`, quy tắc giữ kín).
- Agent soạn dữ liệu không chạy git: lịch sử có bản nháp của các lượt khác.
- Chỉ phát hành (`npm run web:release`, tag `release-…`) khi lô đã đạt mọi chỉ tiêu trên bộ giữ kín.
