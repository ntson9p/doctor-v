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

## 2026-10-25 — Giai đoạn 1: lượt C lô 1, 2, 4; sửa cách chọn câu hỏi

**Lượt C (đối chiếu A–B, viết ca phát triển):** xong lô 1, 2, 4 (24 bệnh, 72 ca dev). Lô 3 đang chạy. Lượt C bắt được một trích dẫn bịa trong lượt A (một tỷ lệ không có trong bài báo được dẫn).

**Đề xuất của lượt C lô 2 đã làm:**
- Toán tử `at_least` cho quy tắc. Quy tắc mức 1 mới: sốt kèm từ 2 trong 4 nhóm dấu hiệu nặng (ý thức; hô hấp; tuần hoàn hoặc mệt lả; ban xuất huyết). Mỗi nhóm gộp các câu về cùng một tình trạng.
- Quy tắc mức 2: thóp phồng ở trẻ nhỏ; sốt kèm vàng da sau phơi nhiễm sốt rét.
- Khi có sốt ở đau bụng, đau đầu: hỏi nhóm dấu hiệu nặng và số ngày sốt như với triệu chứng "Sốt".
- Tỷ lệ nền khi sốt theo các nghiên cứu sốt ở Việt Nam và Singapore: đau đầu 0,7; chán ăn 0,65; đau cơ 0,55; đau sau hốc mắt 0,15.
- "Nguyên nhân khác" ở mức 2 hạ xuống 0,01; làm trơn dấu hiệu nhiều lựa chọn 0,01; gom cụm "đi rừng, làm rẫy".

**Lỗi tìm ra khi chạy bộ dev, đã sửa:**
1. Quy tắc "khó thở không kèm ho" viết bằng `not: ho có`, nên đúng ngay cả khi chưa hỏi ho. Ca viêm phổi bị dừng khẩn ở câu 5 với lý do sốt xuất huyết. Đã đổi thành `ho: không`; bộ kiểm tra giờ cảnh báo dạng này.
2. Chọn câu hỏi: khả năng người dùng trả lời "Không rõ" được tính như dấu hiệu mức xử trí chưa ổn định. Vì vậy app hỏi lần lượt mọi dấu hiệu nguy hiểm, ví dụ hỏi người sốt về khối thoát vị (13/37 ca sốt). Đã sửa:
   - giá trị câu hỏi tính cả quy tắc nguy hiểm, và coi "Không rõ" là chi phí;
   - quy tắc chỉ hợp với một số triệu chứng chính đã ghi phạm vi;
   - tỷ lệ nền của dấu hiệu nguy hiểm rất hiếm được hạ cho đúng thực tế;
   - giá trị an toàn chỉ tính phần vượt "gánh nặng" 0,1 của một câu hỏi.
3. Khi dừng khẩn, danh sách "Bác sĩ cần loại trừ" chỉ có bệnh mức 1–2, nên bỏ sót sốt xuất huyết dù chính dấu hiệu cảnh báo của nó làm dừng. Đã thêm bệnh mức 3 đang có dấu hiệu cảnh báo của chính nó. Không thêm bệnh mức 4–5: lần thử đầu đưa cả cảm lạnh vào danh sách khi có cứng gáy, vì cứng gáy nằm trong dấu hiệu cảnh báo của cảm lạnh. Chỉ số top-k của ca dừng khẩn giờ chấm theo danh sách này, là danh sách người dùng thực sự thấy.

**Bộ dev, 72 ca của 24 bệnh (chưa có lô 3):**

| | Top-1 | Top-3 | Bỏ sót cấp cứu | Khuyên quá mức |
|---|---|---|---|---|
| Trả lời đúng ca | 81,9% | 95,8% | 0/23 | 5/72 |
| 15% câu trả lời thành "Không rõ" | 79,2% | 94,4% | 0/23 | 11/72 |

Số câu hỏi trung vị 15, trong đó 7 câu thích ứng.

Trước đó, khi nhiễu có 1 ca chửa ngoài tử cung bị bỏ sót vì câu "chậm kinh" bị "Không rõ". Đã thêm câu hỏi thay thế ("Từ lần có kinh gần nhất đến nay đã hơn 4 tuần chưa?").

**Còn tồn (đã ghi để làm):**
- sốt rét và thương hàn còn bị "nguyên nhân khác" lấn át ở 2 ca;
- viêm phổi ở người từ 75 tuổi bị xếp "gọi 115" theo xác suất nhiễm khuẩn huyết;
- tách câu phơi nhiễm sốt rét (đi rừng trong nước / từ nước có sốt rét về);
- tỷ lệ nền theo tuổi (trẻ nhỏ không tự kể đau đầu, đau cơ; co giật do sốt);
- câu "phù mặt, bàn tay" chưa hợp với sốt mò (phù mặt và mu chân);
- quy tắc chung cho sốt kèm vàng da cần nguồn;
- liên kết quy tắc → bệnh, để danh sách "cần loại trừ" hiện tay chân miệng khi quy tắc nặng dựa vào nhiệt độ hoặc số ngày sốt.
