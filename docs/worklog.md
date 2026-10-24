# Nhật ký công việc

Ghi theo thứ tự thời gian, mới nhất ở cuối. Mỗi mục: đã làm gì, quyết định gì, việc tiếp theo.

## 2026-10-24 — Nghiên cứu, lập kế hoạch

**Nghiên cứu:** 5 báo cáo trong `docs/research/`:
- nguồn dữ liệu y khoa quốc tế;
- nguồn Việt Nam;
- pháp lý;
- phương pháp chẩn đoán;
- UX và công nghệ.

**Chủ dự án quyết định 6 điểm:**
1. tìm bác sĩ sau;
2. hiện con số %;
3. khoảng 150 bệnh, có cả trẻ em;
4. không dùng AI khi app chạy;
5. phi lợi nhuận vĩnh viễn;
6. không thử với người thật.

**Kết quả:** kế hoạch được duyệt và lưu trong `docs/plan.md`.

## 2026-10-24 — Giai đoạn 0 (nền móng) và đầu Giai đoạn 1

**Công cụ:**
- npm workspaces;
- TypeScript 6.0.3 chạy trực tiếp bằng Node 24;
- ESLint, Prettier, Vitest 5, fast-check.

**Gói `kb`:**
- schema Zod cho mọi file trong `knowledge/`;
- kiểm lỗi chéo: tham chiếu, bậc bằng chứng, cấm xác suất 0/1, quy tắc câu chữ tiếng Việt;
- biên dịch sang JSON, mã phiên bản theo nội dung;
- kiểm tra bản nháp theo từng lượt soạn.

**Danh mục thử nghiệm:**
- 130 dấu hiệu (câu hỏi tiếng Việt);
- 12 cụm dấu hiệu;
- 3 triệu chứng chính: sốt, đau bụng, đau đầu;
- 9 nhóm câu hỏi;
- 41 quy tắc mức xử trí;
- màn sàng lọc cấp cứu 7 mục;
- 21 nguồn.

**Gói `engine`:**
- prior, likelihood, posterior;
- mức xử trí;
- chọn câu hỏi theo giá trị thông tin;
- luồng phiên, kết quả;
- 37 kiểm thử, gồm kiểm thử thuộc tính.

**Gói `evaluation`:**
- định dạng ca kiểm thử;
- bệnh nhân mô phỏng;
- chỉ số và báo cáo;
- các lệnh `eval`, `eval:tune`, `play`.

**Tài liệu:**
- `engine-spec.md`, `kb-guide.md`, `style-guide-vi.md`, `evaluation.md`;
- 8 quyết định kiến trúc;
- bản nháp pháp lý;
- README.

**Đang chạy:**
- lượt A soạn 33 bệnh của đợt thử nghiệm (4 lô);
- lượt R xác minh nguồn và quy tắc;
- agent riêng viết bộ ca giữ kín (khoảng 90 ca).

**Tiếp theo:**
1. Lượt B soạn độc lập.
2. Lượt C đối chiếu, viết vào `knowledge/conditions/` và viết ca `dev`.
3. Điền `cant_miss` cho 3 triệu chứng chính.
4. Tinh chỉnh hệ số nhiệt.
5. Chạy bộ giữ kín và viết báo cáo.
6. Đo chi phí mỗi bệnh.
