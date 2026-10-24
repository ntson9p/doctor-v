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

## 2026-10-24 — Giai đoạn 1: soạn dữ liệu, sửa lỗi phát hiện sớm

**Bộ ca giữ kín:** 94 ca, do agent không được xem dữ liệu bệnh viết:
- theo triệu chứng chính: sốt 38, đau bụng 38, đau đầu 18;
- theo đối tượng: 29 ca dưới 18 tuổi, 16 ca từ 65 tuổi;
- 47 ca mức 1–2;
- 13 ca bệnh ngoài phạm vi.

**Lượt R:**
- xác minh 29/31 nguồn;
- sửa mức 3 quy tắc theo văn bản gốc, thêm 10 quy tắc;
- NICE NG51 đã được tách thành NG253/254/255 (11/2025).

Lưu ý: trang NICE chặn truy cập tự động; lượt R đã đọc qua dịch vụ đọc văn bản trung gian. Từ đó về sau, agent không được dùng proxy; nguồn bị chặn để `verified: false`.

**Lượt A:** đủ 33/33 bệnh, 0 lỗi.

**Lượt B:** xong lô 1 và lô 4 (17 bệnh). Mức đồng thuận A–B:
- kappa có trọng số **0,90** trên 160 cặp liên kết;
- mức xử trí và cờ "không được bỏ sót" trùng 100%.

Lô 2–3 đang chạy.

**Thay đổi bộ suy luận và danh mục theo phản hồi của các lượt soạn:**
- Hệ số prior theo giới; tần suất ghi đè theo nhóm tuổi (`freq_by_age`).
- Nhóm câu hỏi có điều kiện (`requires`). Nhóm "phơi nhiễm khi sốt" hỏi cho mọi triệu chứng chính khi có sốt. Trước đó prior sốt rét quá thấp nên câu phơi nhiễm hầu như không được hỏi.
- 10 dấu hiệu mới, trong đó có "mất thăng bằng đột ngột" (BE-FAST) và kết quả tự xét nghiệm COVID-19 (có mục "chưa xét nghiệm" không mang thông tin).
- Sửa tỷ lệ nền có lý do: đau di chuyển xuống hố chậu phải, đau trùng kỳ kinh, buồn nôn và chán ăn khi đau bụng…
- Thêm quy tắc: sốt kèm phơi nhiễm sốt rét; sốt kèm cơn đau quặn thận; tiểu buốt ở nhóm nguy cơ; bệnh nền + sốt + ho; sưng sau tai; sưng quanh mắt; trẻ nôn dịch xanh; mất thăng bằng đột ngột.

**Chạy thử bộ suy luận trên bản nháp lượt A (8 ca tự viết):** bệnh đúng đứng đầu ở 6/8 ca, mức xử trí đúng cả 8 ca. Lần chạy thử phát hiện 2 lỗi hệ thống, đã sửa:
1. Mức "rare" (2,5%) cao hơn tỷ lệ nền 1% của dấu hiệu đặc hiệu, nên trả lời "Có" lại làm tăng bệnh lành tính. Đã thêm mức `very_rare` (0,5%) và cảnh báo tự động; cảnh báo bắt được 25 liên kết trong lượt A.
2. Khi dừng vì cấp cứu, danh sách xếp hạng chưa đáng tin. Giao diện chỉ hiện "Bác sĩ cần loại trừ", không hiện %.

**Giới hạn phiên:** nhiều agent bị dừng vì chạm giới hạn sử dụng. Công việc dở được lưu và chạy tiếp; từ đây chạy tối đa khoảng 3 agent cùng lúc.

**Tiếp theo:**
1. Lượt C lô 1 và 4 (đang chạy); lượt B rồi lượt C cho lô 2 và 3.
2. Cân chỉnh prior giữa các lô (`npm run kb:priors`).
3. Điền `cant_miss`.
4. Hiệu chỉnh hệ số nhiệt.
5. Chạy bộ giữ kín, viết báo cáo, báo chi phí.
