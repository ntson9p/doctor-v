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

**Lượt C (đối chiếu A–B, viết ca phát triển):** xong cả 4 lô (33 bệnh, 99 ca dev, 95 nguồn mới; mọi nguồn mới đã mở để xác minh, không qua proxy). Lượt C bắt được một trích dẫn bịa trong lượt A (một tỷ lệ không có trong bài báo được dẫn).

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

### Lượt C lô 3 (9 bệnh đau bụng cấp) và cơ chế ưu tiên loại trừ

**Vấn đề:** viêm ruột thừa còn 4–6% ở ca viêm dạ dày – ruột, trên ngưỡng 1% của bệnh "không được bỏ sót". Không câu đơn lẻ nào kéo được nó xuống dưới 1%, nên VOI một bước bằng 0, và phiên dừng trước khi hỏi vị trí đau. Ở ca tắc ruột, phiên dừng sau 3 câu thích ứng, không hỏi "từng mổ bụng" hay "nôn dịch xanh".

**Đã sửa:** khi mức 1–2 chỉ dựa vào xác suất, ưu tiên các câu mang thông tin về nhóm bệnh khẩn đó, và chưa dừng khi còn câu như vậy. Trên 99 ca dev: Brier 0,494 → 0,477; log loss 1,242 → 1,209; số câu trung vị không đổi.

**Đề xuất của lượt C lô 3:**
- **Đã làm:**
  - gom cụm "khóc thét từng cơn" với "đau quặn từng cơn";
  - quy tắc tiểu buốt theo đủ các nhóm của NHS;
  - quy tắc sốt kèm cơn đau quặn thận: đổi nguồn sang hướng dẫn EAU 2026 (mục 3.4.2: thận tắc nghẽn nhiễm khuẩn là cấp cứu), giữ mức 2;
  - câu "nôn dịch xanh" bỏ chữ "vàng đắng" theo NHS;
  - sửa chú thích tỷ lệ nền theo Bines 2006;
  - thêm nguồn cho quy tắc phân nhầy máu;
  - điền danh sách `cant_miss` của 3 triệu chứng chính.
- **Không làm:** câu bắt buộc "vị trí đau". Qua 10 hạt giống nhiễu, chính xác hơn chút (top-1 72,7% → 73,8%) nhưng số ca cấp cứu bị bỏ sót tăng 8 → 11/380.
- **Để sau:**
  - dấu hiệu mới "đau về đêm", "mỡ máu cao";
  - "nguyên nhân khác" khi đau bụng: tổng prior các bệnh chỉ 31–50%, nên mỗi bệnh bị phóng to 2–2,7 lần khi chuẩn hóa.

**Đánh giá nhiễu giờ dùng 5 hạt giống:** chỉ riêng việc đổi thứ tự câu hỏi đã làm số ca bị bỏ sót đổi một ca với một hạt giống.

**Bộ dev, 99 ca của 33 bệnh:**

| | Top-1 | Top-3 | An toàn | Bỏ sót cấp cứu | Khuyên quá mức |
|---|---|---|---|---|---|
| Trả lời đúng ca | 76,8% | 93,9% | 100% | 0/38 | 8,1% |
| Nhiễu (5 hạt giống) | 72,7% | 89,9% | 98,8% | 3/190 | 20,4% |

Số câu hỏi trung vị 14 (sạch), 16 (nhiễu).

**Còn tồn:** ngưỡng 1% của bệnh "không được bỏ sót" làm ca viêm dạ dày – ruột sốt, đau quanh rốn bị khuyên đi cấp cứu, vì viêm ruột thừa còn khoảng 2%. Ngưỡng này hợp với bệnh tính bằng giờ (nhiễm khuẩn huyết, viêm màng não), có thể quá chặt với bệnh "cửa sổ" 1–2 ngày như viêm ruột thừa. Đây là quyết định chuyên môn, cần bác sĩ thẩm định.

### Lần chạy đầu bộ ca giữ kín (94 ca, phiên bản dữ liệu 7ab307c94b37)

Báo cáo: `evaluation/reports/2026-10-24-holdout-7ab307c94b37.md`. Ngày trong tên file là ngày UTC; ngày chạy theo giờ Việt Nam là 25/10. Từ lần này, ngày lấy theo giờ máy.

| | Top-1 | Top-3 | Top-10 | An toàn | Bỏ sót cấp cứu | Khuyên quá mức | ECE |
|---|---|---|---|---|---|---|---|
| Chỉ tiêu | ≥ 45% | ≥ 65% | ≥ 85% | ≥ 97% | ≤ 5% | ≤ 35% | ≤ 0,10 |
| Sạch | 75,9% | 88,6% | 93,7% | **88,3%** | **8/47** | 10,6% | 0,085 |
| Nhiễu (5 hạt giống) | 72,9% | 86,3% | 92,9% | 85,5% | 54/235 | 16,6% | 0,050 |

**Không đạt chỉ tiêu an toàn.** Bộ dev cho 0/38, trong khi ca dev do chính các lượt soạn dữ liệu viết, còn bộ giữ kín do agent độc lập viết: dữ liệu đã hợp với bộ dev hơn thực tế.

**Cả 8 ca bỏ sót đều cần mức 1 (gọi 115) mà app ra mức 2 (đến cấp cứu ngay).** Không ca cấp cứu nào bị khuyên ở nhà hay khám muộn.

Hai nguyên nhân có tính hệ thống, đã sửa:
1. App dừng ngay ở quy tắc mức 2 đầu tiên, nên dấu hiệu thứ hai (ví dụ ban xuất huyết sau tay chân lạnh) không bao giờ được hỏi. Giờ ở mức 2, app hỏi thêm các dấu hiệu có thể nâng lên mức 1 rồi mới dừng, và hỏi lại bằng câu thay thế dấu hiệu mức 1 đang "Không rõ".
2. Thiếu quy tắc mức 1:
   - lú lẫn hoặc li bì: nâng từ mức 2 (NHS khuyên gọi 999; người bệnh không tự đến viện an toàn được);
   - sốc: tay chân lạnh, da tái kèm mệt lả, tiểu ít hoặc ngất (2760);
   - nghi chửa ngoài tử cung vỡ (NHS).

   Câu "lú lẫn" thêm chữ "mới bị", để không tính người vốn hay quên.

**Thủ tục giữ kín:** 8 ca dùng để sửa đã chuyển sang dev (`d-from-h-…`); bộ giữ kín còn 86 ca. Cần agent độc lập viết ca thay thế trước lần chấm sau.

Ở các ca khác của báo cáo, tôi chỉ xem tiêu đề và mức xử trí, không dùng để sửa dữ liệu.

**Sau khi sửa (dev, 107 ca, sạch):** top-1 75,2%, top-3 94,3%, an toàn 100%, bỏ sót 0/46.

### Lần chấm thứ hai bộ ca giữ kín (106 ca, phiên bản dữ liệu 961e389d3c45)

Bộ giữ kín gồm 86 ca cũ và 20 ca mới do agent độc lập viết. Agent không được đọc dữ liệu bệnh, quy tắc, bộ dev, báo cáo hay nhật ký, và không chạy engine trên ca của mình.

**Kết quả (sạch):**
- top-1 74,4%, top-3 88,9%;
- an toàn 94,3% (chưa đạt 97%);
- bỏ sót cấp cứu 1/50 (đạt ≤ 5%; nhiễu: 10/250);
- khuyên quá mức 12,3%; ECE 0,095.

**6 ca bị xếp thấp:**
- 1 ca nghiêm trọng: trẻ 4 tuổi viêm ruột thừa có tiêu chảy, chọn triệu chứng chính "sốt", app ra mức 5. App không hỏi dấu hiệu "đau tăng khi đi lại".
- 5 ca không cấp cứu, triệu chứng kéo dài: sốt 6 ngày ở trẻ, sổ mũi 12 ngày, đau đầu hằng ngày nhiều tháng (2 ca), đau bụng kinh nặng dần.

**Việc tồn từ ghi chú của agent viết ca:** danh mục thiếu câu hỏi mạch nhanh, nghe kém, sản dịch hôi, nước tiểu hôi, bệnh phổi mạn tính, thuốc chống đông. Chưa sửa: các ghi chú này đến từ ca giữ kín, nên nếu dùng để sửa thì phải theo quy tắc giữ kín.

Báo cáo Giai đoạn 1: `docs/reports/phase-1.md`.

### Vòng sửa thứ hai (sau lần chấm thứ hai)

Từ các ca bị xếp thấp ở lần chấm thứ hai. Theo quy tắc giữ kín, các ca đã dùng chuyển sang dev; agent độc lập đang viết 12 ca thay thế.

**Quy tắc mới, có nguồn:**
- sốt từ 6 ngày → khám trong ngày (trước là hơn 7 ngày);
- sổ mũi hơn 10 ngày → khám trong vài ngày (CDC);
- đau đầu nhiều lần mỗi tuần → khám trong vài ngày (NHS; câu hỏi mới `headache_frequent`);
- đau bụng kinh kèm đau khi quan hệ → khám trong vài ngày (NHS);
- đau bụng tăng khi đi lại hoặc khi ho, kèm sốt hoặc nôn → khám trong ngày; trẻ dưới 5 tuổi → đi cấp cứu (Benabbas 2017, Reust 2016).

**Thay đổi luồng hỏi:**
- Sốt có đau bụng: hỏi nhóm dấu hiệu nặng ở bụng.
- Nhóm mới "dấu hiệu nguy hiểm toàn thân", hỏi một lần ở đầu phiên cho đau bụng và đau đầu. Vì lú lẫn, li bì và sốc giờ là quy tắc mức 1, các câu này có giá trị câu hỏi rất cao; nếu không hỏi trước, chúng bị hỏi lẻ từng câu giữa phiên, kể cả với ca đau bụng kinh.
- Câu thay thế cho "mới sinh con".

**Kết quả trên bộ dev (113 ca):**
- trả lời đúng ca: an toàn 99,1%, bỏ sót cấp cứu 0/47;
- nhiễu, 10 hạt giống: bỏ sót 9/460 (2,0%), khuyên quá mức 15,6%.

Ca còn sai: đau bụng kinh thứ phát (cần thêm câu hỏi đau nặng dần qua nhiều năm, khó có thai).

## 2026-10-25 — Giai đoạn 2: giao diện bản đầu

- **Công nghệ:** `apps/web` dùng Astro 7.4.2, `@astrojs/preact` 6.1.1, Preact 10.29.8. Không dùng Preact 11 vì bản này ra ngày 23/10, mới 2 ngày.
- **Kích thước:** trang kiểm tra 52 KB JavaScript (19 KB nén); dữ liệu `/data/kb.json` sinh lúc build, 176 KB (32 KB nén); CSS 8 KB.
- **Luồng hoàn chỉnh theo kế hoạch mục 3.1:** cảnh báo, sàng lọc cấp cứu, thông tin cơ bản, chọn triệu chứng, câu hỏi, xem lại, kết quả. Kèm cỡ chữ 4 bước và nút Gọi 115 trên mọi trang.
- **Kiểm tra:** `astro check` và ESLint không lỗi. Bộ kiểm thử Playwright cùng axe đã viết; sẽ chạy sau khi cài trình duyệt kiểm thử.
- **Để Giai đoạn 4:** tra cứu bệnh, hình cơ thể, nút Nghe, chia sẻ/in, offline, chế độ tối.
- **Lưu ý:** Astro gửi thống kê sử dụng ẩn danh khi build; tắt bằng `npx astro telemetry disable`, đây là thiết lập chung của máy.

### Lần chấm thứ ba bộ ca giữ kín (112 ca, phiên bản dữ liệu 7f751b806e58)

Sau vòng sửa thứ hai. Bộ giữ kín có thêm 12 ca mới do agent độc lập viết.

**Đạt mọi chỉ tiêu an toàn.**
- Sạch: an toàn 99,1%, bỏ sót cấp cứu 0/54, top-1 74,7%, top-3 89,5%, khuyên quá mức 12,5%, ECE 0,078, trung vị 11 câu.
- Nhiễu, 5 hạt giống: an toàn 97,3%, bỏ sót 8/270 (3%).

Ca duy nhất bị xếp thấp: sởi giai đoạn khởi phát, chưa nổi ban, có tiếp xúc người bệnh (cần mức 3, app ra mức 5). Mô hình loại sởi vì chưa có ban; chưa mô hình hóa diễn tiến theo ngày bệnh. Để vòng sau, theo quy tắc giữ kín.

**Việc tồn từ ghi chú của agent viết ca:** thêm hướng dẫn lao của Bộ Y tế vào sổ nguồn (ho kéo dài).

### Giai đoạn 2: kiểm thử đầu cuối

14 kiểm thử Playwright và axe đều đạt, trên Pixel 5 và trên màn 320 px. Các kiểm thử đã tìm ra và sửa 2 lỗi tràn ngang ở cỡ chữ lớn nhất:
- đầu trang chật: giờ tự rút gọn theo cỡ chữ (container query tính bằng em);
- ô nhập liệu không co lại trong hàng.

### Giai đoạn 2: hoàn thiện bản đầu

**Xem lại giao diện bằng ảnh chụp từng màn** (`apps/web/scripts/screenshots.mjs`). Đã sửa:
- "Vì sao gợi ý" liệt kê cả câu trả lời "không", đọc như thể người bệnh có dấu hiệu đó. Nay chỉ nêu dấu hiệu có và lựa chọn kèm giá trị.
- Hiệu ứng hover dính lại sau khi chạm trên màn cảm ứng, làm nút ở câu sau trông như đã chọn sẵn.
- "Quay lại" trông như một đáp án.
- Tiến trình xuống 5 dòng ở chữ lớn.
- Giải thích lẫn vào tên dấu hiệu.
- Tên bệnh lặp; con số % lệch vị trí.

**Tốc độ** (`apps/web/scripts/latency.mjs`):
- máy tính: trung vị 59 ms mỗi câu;
- CPU chậm 6 lần: trung vị 327 ms, ra kết quả 785 ms.

Đã thêm trạng thái "đang xử lý" hiện trước khi tính. Đã thêm lớp chặn chạm nhầm: bỏ qua mọi lần chạm trong 0,4 giây đầu sau khi câu mới hiện ra, vì lần chạm thứ hai bị giữ lại trong lúc tính sẽ trả lời một câu người dùng chưa đọc.

**Câu chữ pháp lý:** dùng đúng bản nháp trong `docs/legal/` cho màn "Trước khi bắt đầu", các cảnh báo trên kết quả và nhãn chân trang. Thêm trang "Điều khoản và quyền riêng tư", ghi rõ là bản nháp.

**Kiểm thử:** 18 kiểm thử Playwright và axe đều đạt trên Pixel 5 và trên màn 320 px.

**Mốc duyệt Giai đoạn 2: chủ dự án thử trên điện thoại** (`npm run web:phone`).

**Việc tồn của giao diện (Giai đoạn 4):**
- tra cứu bệnh, hình cơ thể, nút Nghe, tóm tắt chia sẻ/in, offline (service worker), chế độ tối;
- cân nhắc chạy engine trong Web Worker nếu máy yếu vẫn chậm.

### Góp ý đầu tiên khi thử trên điện thoại: ô tìm triệu chứng

Chủ dự án gõ "chóng mặt" vào ô tìm triệu chứng, không ra kết quả nào.

**Nguyên nhân chính là phạm vi:** bản thử mới có 3 triệu chứng chính (sốt, đau bụng, đau đầu); "chóng mặt" thuộc Giai đoạn 3. Nhưng khi dựng lại, đã thấy thêm các lỗi thật, nay đã sửa:
- **Khớp sai.** Cách cũ bỏ hết dấu rồi tìm chuỗi con, nên "nôn" ra "Sốt" (nằm trong "nóng"), "ói" ra "Sốt" và "Đau bụng" (nằm trong "người", "dưới"), "đầu" ra cả "Đau bụng". Nay so theo từng tiếng: dấu người dùng gõ phải khớp, chữ gõ không dấu khớp mọi dạng có dấu, chỉ tiếng cuối đang gõ dở mới được khớp phần đầu; dấu đặt kiểu cũ hay mới đều nhận ("hoà", "hòa").
- **Gõ thành câu thì không tìm ra.** "bé bị sốt cao", "đau bụng dữ dội" trước đây không ra gì. Nay bỏ qua từ đệm (bị, hay, tôi, bé…) và nhận khi cả một tên triệu chứng nằm trong câu.
- **Khi không tìm thấy:** thông báo cũ chung chung, các nút triệu chứng biến mất, trình đọc màn hình không đọc, và từ cỡ chữ ×1,5 trở lên thì bàn phím che mất thông báo. Nay:
  - thông báo nêu rõ chữ đã gõ;
  - nhắc các dấu hiệu cần gọi 115 (cùng câu chữ với màn đầu);
  - cho chọn một triệu chứng đang có, kèm câu "kết quả sẽ chưa tính đến" chữ đã gõ;
  - nếu không có triệu chứng nào phù hợp, khuyên đi khám;
  - vẫn hiện đủ các nút, nằm trong vùng `role="status"`;
  - khi bàn phím mở, ô tìm kiếm tự cuộn lên sát dưới đầu trang.

**Kiểm thử:**
- 8 kiểm thử đơn vị cho phần khớp chữ (`apps/web/test/vi.test.ts`);
- 3 kiểm thử đầu cuối mới. Kiểm thử bàn phím đã được thử với phần sửa bị tắt và thất bại như mong đợi;
- tổng cộng 64 kiểm thử đơn vị và 24 lượt đầu cuối (12 kiểm thử × 2 cỡ màn hình).

Kiểm thử đầu cuối nay chạy trên máy chủ tĩnh riêng (`apps/web/scripts/serve-dist.mjs`, cổng 4329), nên chạy được cả khi `npm run web:phone` đang mở.

**Chưa kiểm chứng trên máy thật:** cách cuộn khi bàn phím mở mới chỉ được giả lập bằng cách thu nhỏ khung nhìn.

**Việc tồn:**
- ở màn 320 px với chữ lớn nhất, đầu trang xuống 2 dòng;
- từ điển tìm kiếm: từ dân gian ("trúng gió" → triệu chứng thật, theo `docs/style-guide-vi.md` §4), gợi ý khi gõ sai, xếp hạng kết quả khi đã có 35–40 triệu chứng.

## 2026-10-25 — Giai đoạn 3: đề xuất phạm vi

Chủ dự án chọn bước tiếp theo: soạn danh sách đề xuất để duyệt trước khi soạn dữ liệu. Chủ dự án vẫn tiếp tục thử app trên điện thoại song song.

**Đề xuất** (`docs/phase-3/scope.md`, chờ duyệt):
- 40 triệu chứng chính;
- 166 bệnh: 33 đã có, 133 mới; khoảng 35 bệnh dự bị;
- 10 lô:
  - lô 1: Chóng mặt, Ngất, Hồi hộp;
  - lô 2: bổ sung các bệnh nguy hiểm còn thiếu cho 3 triệu chứng đang chạy, ví dụ phình động mạch chủ bụng, thiếu máu mạc treo ruột, xoắn buồng trứng, glôcôm cấp.

Ước tính khoảng 46 triệu token.

**Đối chiếu với hai bộ ca đã công bố** (Semigran 2015, Levine 2024). Một agent tra phụ lục gốc; danh sách đã được kiểm lại từ tệp tải về. Bảng đối chiếu ở `docs/phase-3/benchmark-diagnoses.md`.
- Danh sách đầu chỉ phủ 87% và 79% số ca.
- Đã thêm 7 bệnh để đạt chỉ tiêu ≥ 95%: suy gan cấp, tăng bạch cầu đơn nhân, nhiệt miệng, lẹo mắt, mụn trứng cá, suy giáp, ngưng thở khi ngủ.

**Chờ chủ dự án quyết định 4 điểm:**
- danh sách triệu chứng;
- ung thư;
- sức khỏe tâm thần;
- quy mô.

## 2026-10-25 — Giai đoạn 3, lô 1 (Chóng mặt, Ngất, Hồi hộp): bắt đầu

Chủ dự án đã duyệt phạm vi, kèm 4 quyết định (`docs/phase-3/scope.md`, mục 7):
- 41 triệu chứng chính, 177 bệnh;
- nêu tên 6 bệnh ung thư, kèm nhãn "Bác sĩ cần loại trừ";
- đưa sức khỏe tâm thần vào lô 7.

**Nền cho lô 1** (commit 3f3e606):
- Trạng thái `in_progress` cho triệu chứng chính đang soạn:
  - bộ kiểm định dùng được;
  - app chưa cho chọn; khi tìm đúng triệu chứng đó, app báo "đang được soạn".
- Danh mục mới:
  - 3 triệu chứng chính;
  - 35 dấu hiệu, 3 cụm, 6 nhóm câu hỏi;
  - 15 quy tắc, theo ESC 2018 (ngất), NICE CG109, GRACE-3 (chóng mặt) và NHS;
  - 4 quy tắc cũ được mở phạm vi sang triệu chứng mới;
  - 9 nguồn, chờ lượt R xác minh.
- Quy tắc "mất thăng bằng" của Đau đầu không áp cho Chóng mặt, vì gần như ai chóng mặt cũng đi loạng choạng. Chóng mặt dùng dấu hiệu nặng hơn: không tự đứng hoặc tự đi được.
- Bộ dev cho kết quả giống hệt trước và sau thay đổi, nên 3 triệu chứng đang chạy không bị ảnh hưởng.
- Bản nháp của Giai đoạn 3 nằm riêng ở `knowledge/drafts/phase-3/batch-1/`, không ghi đè dấu vết soạn của Giai đoạn 1. Bệnh đã có được bổ sung trong thư mục `extend/`.

**Đang chạy:** lượt A (2 agent: phần a nhóm chóng mặt, phần b nhóm ngất và hồi hộp) và lượt R.

**Tiếp theo:**
1. Agent độc lập viết ca giữ kín cho 3 triệu chứng mới.
2. Lượt B.
3. Lượt C, viết ca dev.
4. Điền danh sách "không được bỏ sót" và bệnh mục tiêu của các quy tắc.
5. Chấm điểm.

### Lô 1: lượt R, lượt A xong; lượt B đang chạy

**Lượt R** (`knowledge/drafts/phase-3/batch-1/review-rules.md`):
- Xác minh 7/9 nguồn. NICE CG109 và NG128 bị chặn truy cập tự động; không dùng proxy, nên đã gỡ khỏi các quy tắc.
- Thêm nguồn NHS Vertigo, NHS TIA.
- Sửa mức một số quy tắc, có lý do. Ví dụ: hồi hộp kèm đau ngực, khó thở hoặc choáng từ mức 1 xuống mức 2, theo NHS ("gọi 999 hoặc đến cấp cứu"); nếu để mức 1, mọi cơn hoảng sợ đều bị khuyên gọi 115.
- Thêm 5 quy tắc.
- Lưu ý pháp lý: trang ESC ghi rằng dùng nội dung hướng dẫn trong phần mềm hoặc thuật toán cần giấy phép. Đã thêm vào danh sách cần luật sư xem.

**Hai lỗi lượt R phát hiện, đã sửa:**
1. Khoảng 60% người dùng sẽ trả lời "Không rõ" ở câu mạch. Quy tắc nguy hiểm coi "Không rõ" là "có thể có", nên đẩy rất nhiều người lên ít nhất mức 3.
   - Danh mục có thêm **lựa chọn trung tính** (`neutral`): "Chưa đo" có cùng tỷ lệ ở mọi bệnh, nên không mang thông tin và không bị coi là "không rõ". Bộ kiểm tra bắt lỗi khi một bản nháp ghi lệch tỷ lệ này.
   - Bộ mô phỏng bệnh nhân trả lời lựa chọn trung tính khi ca không ghi.
   - Câu "Chưa xét nghiệm" (COVID) dùng cùng cơ chế.
2. Quy tắc sốc tính "ngất" như một dấu hiệu sốc. Với triệu chứng Ngất, người còn tái sau một lần ngất thông thường sẽ bị xếp mức 1.
   - Đã tách quy tắc: 3 triệu chứng cũ giữ nguyên; triệu chứng mới cần tay chân lạnh kèm mệt lả hoặc tiểu ít.
   - Thêm câu "đến giờ đã hồi phục hẳn sau khi ngất chưa": hồi phục hoàn toàn là dấu hiệu yên tâm theo ESC; chưa hồi phục thì đi cấp cứu.

**Lượt A** (2 agent, 12 bệnh mới, 7 bệnh mở rộng):
- 0 lỗi; mã ICD-10 tự kiểm qua icd.kcb.vn.
- Hai đề xuất đổi mức, để lượt C quyết:
  - xuất huyết tiêu hóa trên: mức 1 xuống mức 2, vì các quy tắc đã nâng ca ngất, sốc lên mức 1;
  - hạ đường huyết: mức 2 xuống mức 3, không còn "không được bỏ sót". Ca điển hình tự xử trí bằng đồ ngọt rồi đi khám xem lại thuốc.

**Thay đổi theo góp ý của lượt A:**
- **Tần suất theo triệu chứng chính** (`freq_by_complaint`). Người chọn một triệu chứng chính là một nhóm con riêng của người bệnh. Ví dụ: đột quỵ biểu hiện bằng chóng mặt hiếm khi có méo miệng, yếu tay, nên câu trả lời "không" ở màn sàng lọc không được hạ đột quỵ 5 lần như dưới Đau đầu.
- **Ngoại tâm thu** tách khỏi "rối loạn nhịp tim" thành bệnh riêng, mức nhẹ.
- **9 dấu hiệu mới:** đường huyết đo ở nhà (có "Chưa đo"); điếc đột ngột (kèm quy tắc mức 2 theo NHS); từng bị thiếu máu; mạch cổ đập thình thịch; mắt lồi; từng bị huyết khối; đang mắc ung thư; đang dùng thuốc chống đông hoặc aspirin; bệnh gan mạn.
- **Cụm và tỷ lệ nền:** 2 cụm dấu hiệu, để tránh đếm trùng; tỷ lệ nền thực tế hơn cho "da xanh" và "hụt hơi khi gắng sức".

Bộ dev cho kết quả giống hệt sau mọi thay đổi.

**Đang chạy:** lượt B (2 agent), agent viết ca giữ kín. Còn chờ: lượt A riêng cho ngoại tâm thu.

### Lô 1: bộ ca giữ kín; giới hạn sử dụng

**Bộ ca giữ kín** (commit 3bf2985):
- 44 ca, do agent độc lập viết: 19 Chóng mặt, 15 Ngất, 10 Hồi hộp.
- 24 ca mức 1–2; 18 ca từ 65 tuổi; 7 ca trẻ em, vị thành niên.
- 5 ca bệnh ngoài danh mục.
- Tổng bộ giữ kín: 156 ca.

**Việc tồn** từ ghi chú của agent viết ca:
- các dấu hiệu còn thiếu:
  - ở nơi nóng lâu;
  - cắn lưỡi, tiểu không tự chủ (phân biệt ngất với co giật);
  - bệnh van tim;
  - thuốc mới bắt đầu dùng;
  - đỏ bừng mặt;
  - phù hai chân;
  - thuốc tránh thai;
- trẻ 5–12 tuổi không được hỏi "đái tháo đường", nên chưa diễn đạt được hạ đường huyết ở trẻ tiêm insulin;
- dưới 18 tuổi không được hỏi bệnh tim, tăng huyết áp.

**Giới hạn sử dụng:** các agent bị dừng hai lần (10:40 và 15:30). Mỗi lần đều làm tiếp được từ chỗ dừng, không phải chạy lại.

### Lô 1: lượt C, tích hợp, lần chấm giữ kín đầu tiên

**Lượt C** (2 agent):
- 13 bệnh mới và 7 bệnh mở rộng vào `knowledge/conditions/`; độ đồng thuận A–B: kappa có trọng số 0,90.
- 85 nguồn mới, đều đã mở lại để xác minh.
- 46 ca dev.
- Các quyết định chính:
  - ngộ độc CO: mức 2, vẫn "không được bỏ sót";
  - hạ đường huyết: mức 3;
  - xuất huyết tiêu hóa trên: mức 2;
  - thuyên tắc phổi: mức 1;
  - viêm dây thần kinh tiền đình gộp cả viêm mê đạo.

**Tích hợp (người bảo trì):**
- danh sách "không được bỏ sót" của 3 triệu chứng;
- bệnh mục tiêu của các quy tắc;
- 6 quy tắc mới có nguồn:
  - khó thở kèm sưng một bên bắp chân (mức 1);
  - cơn hồi hộp đột ngột chưa dứt (mức 2);
  - ngất, choáng ngày sốt 3–7 (mức 2, tiêu chí nhập viện của WHO 2009);
  - mất nước kèm tiểu ít hoặc ngất (mức 3);
  - chóng mặt quay tái diễn (mức 4).
- Lần chạy dev đầu cho thấy hai quy tắc kích hoạt quá rộng, nên đã thu hẹp:
  - "hồi hộp chưa dứt" cũng bắt người tim nhanh âm ỉ nhiều tuần do cường giáp; nay cần thêm "cơn đến đột ngột";
  - "mất nước" tính cả chóng mặt khi đứng dậy, điều NHS không nêu cho người lớn; nay bỏ dấu hiệu này.

**Lần chấm giữ kín đầu tiên** (156 ca, `evaluation/reports/2026-10-25-holdout-94cd5ffc57cd.md`):
- 3 triệu chứng cũ không đổi.
- Hồi hộp đạt 10/10.
- 5 ca cấp cứu Chóng mặt, Ngất được khuyên mức 2 thay vì mức 1: bỏ sót 5/78, an toàn 95,5%.
- Nguyên nhân:
  1. **Quy tắc "dấu hiệu vỡ" của chửa ngoài tử cung** chỉ áp cho Đau bụng.
  2. **Thiếu quy tắc mức 1** cho:
     - CO kèm ngất;
     - sốt kèm dấu hiệu sốc;
     - nhiều dấu hiệu nguy cơ cao của ngất;
     - mạch dưới 40 có triệu chứng.
  3. **Giới hạn của bước nâng mức.** Khi một dấu hiệu đã đưa mức lên 2, bộ suy luận chỉ hỏi tiếp dấu hiệu tự mình làm một quy tắc mức 1 thành đúng, nên quy tắc cần từ hai câu trở lên không bao giờ được xét. Cách xử lý: đổi thứ tự câu hỏi bắt buộc.
     - Ngất hỏi trước hoàn cảnh xảy ra, dấu hiệu báo trước, có thai, có sốt (ESC cũng đánh giá ngất bắt đầu từ đây).
     - Chóng mặt hỏi sốt sớm.
     - Phơi nhiễm CO, đái tháo đường và thuốc hạ đường huyết hỏi trước nhóm dấu hiệu nguy hiểm toàn thân.

**Theo quy tắc giữ kín:**
- 7 ca đã dùng để sửa chuyển sang dev (`d-from-h-*`);
- một agent độc lập đang viết 12 ca mới: 7 ca thay thế và 5 ca bổ sung.

**Bộ dev** (166 ca): sạch bỏ sót 0/73, an toàn 98,8%, top-3 95,7%; nhiễu bỏ sót 10/365.

**Việc tồn của bộ suy luận:** bước nâng mức nên xét cả quy tắc mức 1 còn thiếu hai câu, có giới hạn số câu hỏi thêm. Thứ tự câu hỏi hiện chỉ là cách xử lý tạm.

## 2026-10-26 — Giai đoạn 3, lô 1: mở trong app

### Lần chấm giữ kín thứ hai (161 ca, phiên bản dữ liệu 367336526ecf)

- 12 ca mới do agent độc lập viết: 7 ca thay thế, 5 ca bổ sung.
- Đạt mọi chỉ tiêu (`evaluation/reports/2026-10-26-holdout-367336526ecf.md`):
  - sạch: an toàn 97,5%, bỏ sót cấp cứu 2/79, top-3 91,9%, khuyên đi khám quá mức 18,6%, ECE 0,072;
  - nhiễu: an toàn 97,0%, bỏ sót 17/395 (4,3%).
- 3 triệu chứng cũ không đổi.
- 4 ca bị phân loại thấp hơn mức cần:
  - h-dizzy-020: đột quỵ tuần hoàn sau, nam 41 tuổi sau khi bị bẻ cổ; cần mức 1, app ra mức 2;
  - h-syncope-017: vỡ phình động mạch chủ bụng, bệnh chưa có trong dữ liệu; cần mức 1, app ra mức 2;
  - h-dizzy-015: chóng mặt do đau nửa đầu; cần mức 4, app ra mức 5;
  - h-fever-009: sởi trước khi mọc ban; cần mức 3, app ra mức 5; có từ Giai đoạn 1.
- Theo quy tắc giữ kín, chưa sửa theo các ca này. Lô 2 sẽ thêm phình động mạch chủ bụng; ca nào được dùng để sửa sẽ chuyển sang dev và có ca thay thế.

### Mở Chóng mặt, Ngất, Hồi hộp

- Bỏ `status: in_progress` ở 3 triệu chứng (commit 414f89a). App có 6 triệu chứng chính.
- Kiểm thử đầu cuối: 24/24. Phép thử bàn phím ảo nay gõ "rụng tóc", vì "chóng mặt" đã tìm thấy.
- Trang chủ liệt kê triệu chứng bằng dấu chấm phẩy: "Ngất, suýt ngất" có dấu phẩy riêng, nên danh sách cách bằng dấu phẩy đọc thành 8 triệu chứng (commit 0fce300).
- Xem lại ảnh chụp (điện thoại, 320 px, cỡ chữ lớn nhất):
  - lưới 6 ô và 3 biểu tượng mới hiển thị đúng; trẻ dưới 5 tuổi chỉ thấy 3 triệu chứng cũ;
  - tìm "xây xẩm", "xỉu", "tim đập nhanh" ra đúng triệu chứng; "choáng" ra cả Chóng mặt và Ngất.
- **Việc tồn** từ ảnh chụp:
  - Chóng mặt và Ngất mở đầu bằng câu "phòng kín đốt than". Đây là cách xử lý tạm cho giới hạn của bước nâng mức; xem lại khi sửa bộ suy luận;
  - gợi ý "Ở trẻ nhỏ: thở nhanh, cánh mũi phập phồng…" của câu khó thở hiện cả với người lớn;
  - ở 320 px với cỡ chữ lớn nhất, chữ trong ô đánh dấu xuống dòng gần như từng từ.

### Chi phí lô 1

Token do agent dùng, đo như Giai đoạn 1 (`docs/reports/phase-1.md`, mục 6):

| Việc | Token |
|---|---|
| Lượt A (3 agent, gồm agent riêng cho ngoại tâm thu) | 1,84 triệu |
| Lượt B (2 agent) | 1,38 triệu |
| Lượt C (2 agent) | 1,87 triệu |
| Lượt R | 0,60 triệu |
| Viết ca giữ kín (2 agent: bộ đầu, ca thay thế) | 0,93 triệu |
| **Cộng** | **6,62 triệu** |

- Ước tính cho lô này theo `docs/phase-3/scope.md` mục 6 là khoảng 4,8 triệu: 13 bệnh mới × 270 nghìn, thêm 20%, cộng 13 cặp "bệnh đã có × triệu chứng mới" (7 bệnh cũ). Thực tế gấp khoảng 1,4 lần.
- Lượt A, B, C: khoảng 390 nghìn mỗi bệnh mới (tính cả phần mở rộng 7 bệnh cũ), so với 270 nghìn ở Giai đoạn 1. Nhiều bệnh mới phải viết cho cả 3 triệu chứng.
- Lượt R và viết ca giữ kín (1,53 triệu) là chi phí cố định của mỗi lô, không giảm theo số bệnh. Ước tính cũ gộp chúng vào phần 20%. Lần này còn thêm một agent viết ca thay thế, theo quy tắc giữ kín.
- Agent bị dừng vì giới hạn sử dụng nhiều lần. Mỗi lần làm tiếp được, nhưng phải đọc lại ngữ cảnh, nên tốn thêm token.
- Nếu các lô sau cũng vậy, cả Giai đoạn 3 cần khoảng 70 triệu token thay vì 50 triệu.

### Điện thoại chỉ chạy bản đã phát hành

Lô 2 thêm bệnh cho Sốt, Đau bụng, Đau đầu, ba triệu chứng đang chạy. Vì vậy bản nháp không được hiện trên điện thoại trước khi đạt kiểm định:
- `npm run web:phone` nay chỉ mở `apps/web/dist/` (bản đã phát hành), không build lại;
- kiểm thử đầu cuối và `npm run web:build` build vào `apps/web/dist-test/`;
- `npm run web:release` build vào `apps/web/dist/`; chỉ chạy khi lô đạt chỉ tiêu. Mỗi lần phát hành có tag git `release-…`.

Bản đang phát hành: lô 1 (6 triệu chứng chính), tag `release-phase3-batch1`.

## 2026-10-26 — Giai đoạn 3, lô 2 (bổ sung cho Sốt, Đau bụng, Đau đầu): bắt đầu

**Phạm vi** (`knowledge/drafts/phase-3/batch-2/scope.yaml`):
- 14 bệnh mới. Phạm vi ghi 13 bệnh; "Say nắng, sốc nhiệt" được tách làm hai:
  - say nắng, kiệt sức do nóng (gợi ý mức 5, tự làm mát);
  - sốc nhiệt (mức 1).
  Gộp lại thì người chỉ mệt, choáng sau khi phơi nắng bị khuyên gọi 115.
- 5 bệnh mở rộng: đột quỵ, cơn thiếu máu não thoáng qua, rối loạn nhịp tim, đau nửa đầu, sởi.

**Danh mục mới:**
- 15 dấu hiệu:
  - đau, sưng bìu;
  - đau nhức một bên mắt; quầng sáng quanh đèn;
  - vừa bị bẻ, nắn cổ;
  - phơi nắng, làm việc nơi nóng bức; lội nước lũ, bùn, tiếp xúc chuột;
  - đau hai bắp chân;
  - khát nhiều, tiểu nhiều; hơi thở mùi trái cây;
  - đã biết phình động mạch chủ, rung nhĩ, u nang buồng trứng;
  - 3 dấu hiệu Kawasaki: môi đỏ nứt, lưỡi dâu; tay chân sưng, bong da; vết BCG sưng đỏ.
- Bảng hỏi đánh dấu có tối đa 7 mục. Ba câu mới được hỏi riêng, ngay sau nhóm dấu hiệu nguy hiểm tương ứng:
  - đau bìu (Đau bụng);
  - đau một bên mắt (Đau đầu);
  - đau hông lưng (Ngất).
- 10 quy tắc mới, nguồn chờ lượt R xác minh:
  - xoắn tinh hoàn (mức 2);
  - glôcôm cấp (mức 2);
  - sốc nhiệt (mức 1);
  - Kawasaki (mức 3);
  - nhiễm toan ceton (mức 2); trẻ nghi đái tháo đường (mức 3);
  - vỡ phình động mạch chủ ở người từ 60 tuổi (mức 1);
  - Leptospira thể nặng (mức 2);
  - sốt kèm vàng da (mức 3);
  - sốt sau khi tiếp xúc người bị sởi (mức 3).

**4 ca giữ kín chuyển sang dev,** vì được dùng để sửa (quy tắc giữ kín). Một agent độc lập sẽ viết ca thay thế.
- d-from-h-syncope-017 (vỡ phình động mạch chủ): quy tắc mới ở trên. Nay đúng mức 1.
- d-from-h-dizzy-020 (đột quỵ sau bẻ cổ): "vừa bị bẻ, nắn cổ" được tính là yếu tố nguy cơ trong hai quy tắc đột quỵ của Chóng mặt. Nay đúng mức 1.
- d-from-h-dizzy-015 (chóng mặt do đau nửa đầu): quy tắc chóng mặt quay tái diễn tính cả kiểu "từng cơn vài phút đến vài giờ", vì phiên hỏi thường dừng trước câu "đã từng bị như vậy". Nay đúng mức 4.
- d-from-h-fever-009 (sởi chưa mọc ban): quy tắc tiếp xúc người bị sởi. Nay đúng mức 3.

**Bộ dev** (170 ca):
- Sạch: bỏ sót 0/75, an toàn 99,4%, top-3 95,8%.
- Nhiễu: bỏ sót 12/375; khuyên khám quá mức 17,3% → 18,7%. Lý do: các câu nguy hiểm mới bị đổi thành "Không rõ" (15% câu trả lời) thì app khuyên khám trong 24 giờ, đúng nguyên tắc an toàn.
- Trước khi thêm 4 ca, bộ dev cho kết quả giống hệt ở chế độ sạch.

**Việc tồn:** câu huyết áp chưa có lựa chọn "huyết áp thấp" (dưới 90/60), dấu hiệu sốc quan trọng khi ngất.

**Tiếp theo:**
1. Lượt R (quy tắc, nguồn).
2. Lượt A (2 agent).
3. Agent viết ca giữ kín.
4. Lượt B, lượt C, tích hợp, chấm điểm.
