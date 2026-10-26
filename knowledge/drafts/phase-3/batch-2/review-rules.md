# Biên bản lượt R, Giai đoạn 3 lô 2: quy tắc, dấu hiệu nguy hiểm và nguồn

- Phạm vi: 12 nguồn mới của lô 2, 10 quy tắc mới, 3 quy tắc cũ được sửa ở lô 2, danh sách dấu hiệu nguy hiểm của các triệu chứng chính, nhóm câu hỏi và câu chữ của 15 dấu hiệu lô 2.
- Người thực hiện: `agent:pass-r`. Ngày: 2026-10-26.
- Không sửa `knowledge/conditions/` và các bản nháp khác trong `knowledge/drafts/`. Không đọc bộ ca giữ kín.
- `npm run kb:check`:
  - trước: 0 lỗi, 25 cảnh báo, trong đó 13 cảnh báo thuộc lô 2 (8 nguồn chưa kiểm tra dùng cho bậc B, 4 quy tắc mức 1–2 bậc C, 1 dấu hiệu thiếu câu hỏi thay thế);
  - sau: **0 lỗi, 13 cảnh báo**: 12 cảnh báo cũ không thuộc lô 2, và 1 cảnh báo cố ý của lô 2 (mục 3.2, `rf_measles_contact_fever`).
- `npm run eval -- --set dev`: chế độ sạch giống hệt trước về mức xử trí và thứ hạng; chỉ ECE đổi (0,070 → 0,073). Không ca cấp cứu nào bị bỏ sót (0/75 sạch, 12/375 nhiễu như trước). Chi tiết từng ca ở mục 8.
- Mọi thay đổi vẫn **cần bác sĩ duyệt** trước khi phát hành.

---

## 1. Cách làm và hạn chế

**Trang NHS.** Tải bằng curl rồi trích chữ, để ghi đúng từng mục "Call 999", "A&E", "111", "GP". WebFetch chỉ trả bản tóm tắt, không chép nguyên văn.

**WHO 2003 (Leptospira).** Tải bản PDF trên kho IRIS. Kho có 2 tệp: tệp được gắn làm "PDF chính" là một bản dịch dạng ảnh (không trích được chữ); tệp còn lại là bản tiếng Anh có chữ, đã đọc chương II.

**NICE NG18.**
- nice.org.uk trả lỗi 403 cho trang hướng dẫn và bản PDF; NCBI Bookshelf đòi xác minh reCAPTCHA.
- Tệp trên labmed.org.uk chỉ là bản tóm tắt cho phòng xét nghiệm (11/2017), không có khuyến cáo chuyển tuyến.
- Theo yêu cầu, **không** dùng dịch vụ đọc hộ. NG18 **chưa xác minh được**; quy tắc liên quan đổi sang nguồn khác (mục 3.2).

**AHA 2017 (Kawasaki), AHA/ASA 2014 (bóc tách động mạch cổ).** ahajournals.org chặn bằng Cloudflare (403), PubMed đòi cookie. Đã đọc bản ghi và tóm tắt qua API Europe PMC (như các nguồn khác trong sổ, ví dụ `curtis-pediatrics-2010`).

**Nguồn Việt Nam.**
- 3312/QĐ-BYT (2015), bản PDF trên vnras.com: bài Kawasaki (tr. 311–315), bài Toan xeton do đái tháo đường (tr. 632–637).
- 5642/QĐ-BYT (2015), bản PDF trên kcb.vn: không có bài riêng về Leptospira; bài Sốt mò có đoạn chẩn đoán phân biệt (tr. 62).
- 40/QĐ-BYT (2015, bệnh về mắt), bản PDF trên vnras.com: bài Glôcôm góc đóng nguyên phát (tr. 78–84). Nguồn mới.
- Trích chữ từ các PDF này làm mất một phần dấu tiếng Việt (do phông chữ); đã đọc kỹ ngữ cảnh, chỉ ghi điều đọc rõ.
- Không tìm được hướng dẫn chẩn đoán, điều trị của Bộ Y tế về bệnh do Leptospira, về say nắng, sốc nhiệt (chỉ có tin báo chí về hướng dẫn chăm sóc sức khỏe mùa nắng nóng), hay về vị trí tiêm BCG.

**Nguồn quốc tế khác.**
- WHO BEC 2018 (đã có trong sổ): tải lại PDF trên IRIS, đọc thêm phần nhiễm toan ceton, sốc nhiệt.
- EAU Paediatric Urology 2026: đọc toàn văn trên uroweb.org. Nguồn mới.
- Trang WHO "Heat and health" và hướng dẫn ESVS 2024 về phình động mạch chủ bụng đều trả lỗi 403.

**Khác.**
- Đã dùng **5 lần** WebSearch.
- Tệp tải về chỉ nằm trong thư mục tạm. Không chạy mã nào từ đó, không chép tệp nào vào repo.
- Kiểm tra hành vi các quy tắc bằng 27 tình huống mô phỏng (đánh giá điều kiện quy tắc) và so từng ca của bộ dev trước, sau (mục 8). Mã kiểm tra nằm trong thư mục tạm.
- Lỡ chạy một lệnh `git status` (chỉ đọc, không có kết quả) trước khi nhớ ra yêu cầu không dùng git; không có lệnh git nào khác.

---

## 2. Sổ nguồn

### 2.1 Mười hai nguồn của lô 2

| Nguồn | Kết quả | Phiên bản, ghi chú |
|---|---|---|
| `nhs-testicle-pain` | Đã xác minh | Rà soát 26/6/2025, hạn 26/6/2028. Ghi đủ mục "A&E or 999" và "urgent GP / 111". |
| `nhs-glaucoma` | Đã xác minh | Rà soát 13/6/2025. Glôcôm khởi phát đột ngột: "Call 999 or go to A&E". |
| `nhs-heat-exhaustion-heatstroke` | Đã xác minh | Rà soát 28/5/2026. Bốn bước làm mát, quy tắc 30 phút, danh sách "Call 999 now". Trang **không** nêu ngưỡng 40°C như bản nháp ghi. |
| `nhs-kawasaki-disease` | Đã xác minh | Rà soát 19/2/2026. Chỉ có mục khám khẩn (mức 3), không có mục 999. |
| `nhs-diabetic-ketoacidosis` | Đã xác minh | Rà soát 08/6/2023, hạn rà soát 08/6/2026 đã qua, chưa có bản mới. |
| `nhs-abdominal-aortic-aneurysm` | Đã xác minh | Rà soát 14/6/2023, hạn đã qua, chưa có bản mới. "Call 999" (chỉ 999). |
| `nhs-jaundice` | Đã xác minh | Rà soát 22/1/2024. Mọi vàng da: khám khẩn (mức 3), có sốt hay không. |
| `nhs-measles` | Đã xác minh | Rà soát 31/7/2025. Tiêm đủ 2 mũi thì khó là sởi. |
| `nice-ng18` | **Chưa xác minh** | Bị chặn (mục 1). Bỏ ngày xuất bản vì chưa đối chiếu. Không còn quy tắc nào dẫn nguồn này. |
| `who-leptospirosis-2003` | Đã xác minh | WHO/CDS/CSR/EPH 2002.23, ISBN 92 4 154589 5. **Sửa giấy phép L2 → L3**: trang bản quyền ghi "© WHO 2003, All rights reserved". |
| `aha-kawasaki-2017` | **Chưa xác minh** nội dung | Đã xác nhận bản ghi, tóm tắt, đính chính 2019 qua Europe PMC; toàn văn bị chặn nên chưa đọc tiêu chuẩn chẩn đoán. AHA có **bản cập nhật 2024** (Jone và cộng sự, Circulation 2024;150:e481–e500), bổ sung chứ không thay thế. Quy tắc không còn dẫn nguồn này. |
| `biller-stroke-2014` | Đã xác minh (tóm tắt) | Stroke 2014;45:3155–3174, PMID 25104849, đính chính 2016. Đổi `url` sang Europe PMC. Chưa đọc được khoảng thời gian từ nắn cổ đến đột quỵ. |

Mỗi nguồn đã xác minh có `verified_by: "agent:pass-r"` và `notes_vi` ghi các dữ kiện quy tắc dùng (với NHS: đủ các mục "Call 999", "A&E", "111").

### 2.2 Nguồn mới (5)

| Nguồn | Vì sao thêm |
|---|---|
| `nhs-type-1-diabetes` | Trang triệu chứng đái tháo đường típ 1 (rà soát 31/10/2024): khám khẩn khi nghĩ bị típ 1; gọi 999 hoặc đến cấp cứu khi tiểu nhiều, khát, mệt kèm đau bụng, nôn, buồn ngủ, thở nhanh sâu; thường được khám chuyên khoa trong ngày. Thay NICE NG18. |
| `nhs-jaundice-in-babies` | Vàng da sơ sinh (rà soát 24/3/2026): mức khẩn cho trẻ nhỏ (mục 3.2, `rf_fever_jaundice`). |
| `eau-paediatric-urology-2026` | Hướng dẫn chính thức về bìu cấp: cửa sổ khoảng 4–6 giờ; mổ thám sát khẩn mọi ca xoắn trong 24 giờ đầu. Cho `rf_scrotal_pain` bậc B. |
| `byt-qd-40-2015` | Hướng dẫn của Bộ Y tế về bệnh mắt, bài glôcôm góc đóng: triệu chứng cơn cấp, cần điều trị kịp thời. Cho `rf_acute_glaucoma_signs` nguồn Việt Nam. Chưa kiểm tra được văn bản thay thế. |
| `rothwell-stroke-2001` | Nghiên cứu bệnh–chứng dân số (tóm tắt): người dưới 45 tuổi bị đột quỵ hệ sống–nền có khả năng đã đi nắn chỉnh cột sống trong 1 tuần trước cao gấp khoảng 5 lần. Dùng để chọn khoảng thời gian hỏi về bẻ, nắn cổ. |

### 2.3 Nguồn cũ được bổ sung ghi chú (3)

- `byt-qd-3312-2015`: bài Kawasaki (6 biểu hiện chính, tiêu chuẩn Nhật Bản và AHA, thể không điển hình, tấy đỏ sẹo BCG, globulin miễn dịch trong 10 ngày đầu, tổn thương mạch vành khoảng một phần ba ca không điều trị, chẩn đoán phân biệt); bài Toan xeton do đái tháo đường (bệnh sử, lâm sàng).
- `byt-qd-5642-2015`: không có bài riêng về Leptospira; đoạn chẩn đoán phân biệt trong bài Sốt mò.
- `who-bec-2018`: nhiễm toan ceton (thở nhanh sâu có thể được kể là khó thở, hơi thở mùi ngọt, rất nặng, cần chuyển gấp); sốc nhiệt là nguyên nhân rối loạn ý thức, làm mát bằng xịt nước mát và quạt; dấu hiệu chảy máu trong ổ bụng.

---

## 3. Quy tắc

### 3.1 Tóm tắt

Không quy tắc nào đổi mức. Các thay đổi là điều kiện, nguồn, bậc bằng chứng và câu lý do.

| Quy tắc | Mức | Thay đổi chính | Bậc |
|---|---|---|---|
| `rf_scrotal_pain` | 2 | Sửa câu lý do theo nguồn; thêm EAU | C → B |
| `rf_acute_glaucoma_signs` | 2 | Thêm 40/QĐ-BYT | B (nay có nguồn đã xác minh) |
| `rf_heat_stroke_signs` | 1 | Thêm "ngất chưa tỉnh hẳn"; lời dặn làm mát theo NHS; bỏ ngưỡng 40°C không có trong nguồn | C → B |
| `rf_kawasaki_signs` | 3 | Nguồn: 3312/QĐ-BYT thay AHA 2017 (chưa mở được) | B |
| `rf_dka_suspected` | 2 | **Thu hẹp điều kiện** (khó thở, nôn chỉ tính khi có khát nhiều, tiểu nhiều hoặc đường huyết cao); thêm đau bụng kèm mệt nhiều (tiêu chí NHS) | C → B |
| `rf_new_diabetes_child` | 3 | Nguồn: NHS Type 1 diabetes, 3312/QĐ-BYT thay NG18 (chưa mở được) | B |
| `rf_aaa_rupture_signs` | 1 | **Sửa điều kiện**: bỏ vã mồ hôi; đau lưng cần kèm da tái lạnh hoặc ngất chưa hồi phục; thêm người đã biết phình động mạch chủ | C → B |
| `rf_lepto_severe` | 2 | Thêm 5642/QĐ-BYT; ghi điểm cần bác sĩ duyệt | B |
| `rf_fever_jaundice` | 3 | Thêm nguồn trẻ sơ sinh; giải thích vì sao không cần nhánh riêng cho trẻ nhỏ | C |
| `rf_measles_contact_fever` | 3 | **Không áp dụng khi đã tiêm đủ 2 mũi**; "Không rõ" vẫn tính | B |
| `rf_dizziness_central_signs_high_risk` (cũ, sửa ở lô 2) | 1 | Ghi chú đối chiếu Biller 2014, thêm Rothwell 2001 | B |
| `rf_acute_vertigo_vascular_risk` (cũ, sửa ở lô 2) | 2 | Như trên | B |
| `rf_recurrent_vertigo` (cũ, sửa ở lô 2) | 4 | Giữ nguyên, ghi chú đối chiếu | C |
| `rf_befast_high_risk` (cũ, Đau đầu) | 1 | **Thêm** "bẻ, nắn cổ hoặc chấn thương cổ" vào yếu tố nguy cơ | B |

Mọi ghi chú "người bảo trì ghi theo trí nhớ, lượt R đối chiếu" đã được thay bằng điều đọc được trong nguồn, kèm vị trí (`locator`).

### 3.2 Từng quy tắc mới

**`rf_scrotal_pain` (mức 2, Đau bụng).**
- NHS: đau tinh hoàn kèm buồn nôn, nôn **hoặc đau bụng**, đau đột ngột dữ dội, hoặc đau quá 1 giờ: đến cấp cứu ngay hoặc gọi 999. Với Đau bụng, mọi đau bìu thuộc nhóm này, nên mức 2 đúng.
- Khám khẩn (mức 3) chỉ dành cho đau âm ỉ, có khối, sưng, thay đổi hình dạng mà không kèm các dấu hiệu trên.
- EAU 2026: cửa sổ quyết định khoảng 4–6 giờ; mổ thám sát khẩn mọi ca xoắn trong 24 giờ đầu; hay gặp ở sơ sinh và tuổi dậy thì.
- Câu lý do cũ "phải mổ trong vài giờ" sửa thành "chậm vài giờ có thể mất tinh hoàn" cho khớp nguồn.
- Không mở rộng cho Sốt: câu đau bìu (tỷ lệ nền 1%) sẽ bị hỏi ở mọi nam giới sốt.

**`rf_acute_glaucoma_signs` (mức 2, Đau đầu).**
- NHS: glôcôm khởi phát đột ngột là cấp cứu, "Call 999 or go to A&E" (mức 2). Triệu chứng: đau mắt dữ dội, mắt đỏ, đau quanh mắt, vòng sáng nhiều màu quanh đèn, nhìn mờ, buồn nôn, nôn, đau đầu.
- 40/QĐ-BYT: cơn cấp đột ngột, đau nhức mắt lan lên nửa đầu cùng bên, nhìn mờ như qua màn sương, nhìn đèn thấy quầng xanh đỏ, có thể nôn, đau bụng, vã mồ hôi, sốt; tổn thương thần kinh thị giác không hồi phục.
- Giữ điều kiện "đau một bên mắt + (đỏ mắt hoặc quầng sáng)". Không dùng "nhìn mờ" (hay gặp trong đau nửa đầu có tiền triệu).
- Cơn đau đầu từng cụm (đau quanh mắt, đỏ mắt, chảy nước mắt) cũng thỏa; chấp nhận.

**`rf_heat_stroke_signs` (mức 1, Sốt, Đau đầu, Chóng mặt, Ngất).**
- NHS "Call 999 now" (chỉ 999, mức 1): vẫn không khỏe sau 30 phút nghỉ chỗ mát, làm mát, uống nước; thân nhiệt rất cao; da nóng không ra mồ hôi; tim nhanh; thở nhanh hoặc khó thở; lú lẫn, mất phối hợp; co giật; mất ý thức.
- Bản nháp ghi "sốt từ 40°C": trang NHS hiện không nêu ngưỡng nào. Đã bỏ khỏi ghi chú.
- Thêm `not_recovered_after_faint` (ngất chưa tỉnh hẳn): NHS Heat ghi mất ý thức là dấu hiệu sốc nhiệt; NHS Fainting gọi 999 khi ngất chưa hồi phục hẳn. Ngất do nóng đã tỉnh hẳn thì không thuộc quy tắc (ngất do nóng là ngất phản xạ hay gặp).
- Câu lý do: lời dặn trong lúc chờ theo NHS và WHO BEC (chỗ mát, cởi bớt quần áo, lau hoặc xịt nước mát, quạt liên tục). Không dặn cho uống, vì người lú lẫn, co giật dễ sặc.
- Không đưa thở nhanh, sốt cao, tim nhanh vào điều kiện: người sốt do nhiễm trùng làm việc ngoài trời cũng có (tỷ lệ nền phơi nắng 15%).
- Thêm WHO BEC (sốc nhiệt là nguyên nhân rối loạn ý thức) để có bậc B.
- Hạn chế còn lại: khi lú lẫn đã đưa mức lên 1 thì phiên dừng, nên câu phơi nắng không được hỏi và lời dặn làm mát không hiện (mục 7.3).

**`rf_kawasaki_signs` (mức 3, Sốt).**
- NHS: triệu chứng chính là sốt từ 5 ngày; có triệu chứng bệnh Kawasaki thì khám khẩn (mức 3), không có mục 999. Mức 3 đúng.
- 3312/QĐ-BYT (2015): 6 biểu hiện chính; theo AHA, sốt từ 5 ngày là bắt buộc; thể không điển hình có ít biểu hiện hơn; có thể tấy đỏ sẹo BCG; globulin miễn dịch nên dùng trong 10 ngày đầu.
- Ngưỡng "sốt từ 3 ngày + 2 dấu hiệu" rộng hơn tiêu chuẩn. Lượt R giữ vì lựa chọn số ngày sốt không tách được mốc 5 ngày, và các bệnh dễ nhầm đều cần khám:
  - sởi (sốt, mắt đỏ, phát ban): mức 3 là đúng (NHS Measles);
  - sốt tinh hồng nhiệt (ban, lưỡi dâu tây): cần khám để dùng kháng sinh;
  - tay chân miệng sốt trên 2 ngày đã ở mức 2 (`rf_hfmd_warning_signs`); câu sưng, bong da tay chân đã loại trừ nốt phỏng của tay chân miệng.
- Bỏ `aha-kawasaki-2017` khỏi nguồn (chưa mở được toàn văn), dùng `byt-qd-3312-2015` và `nhs-kawasaki-disease`.

**`rf_dka_suspected` (mức 2).** Sửa điều kiện.
- Bản nháp: (đái tháo đường hoặc khát nhiều, tiểu nhiều) và (mùi ceton, hoặc **mọi khó thở**, hoặc nôn kèm khát nhiều hoặc đường huyết cao). Người đái tháo đường cảm lạnh, thở mệt nhẹ cũng thành mức 2.
- Nay:
  - khát nhiều, tiểu nhiều kèm một trong: hơi thở mùi ceton, nôn, nôn liên tục, khó thở, hoặc đau bụng kèm mệt nhiều;
  - hoặc đã biết đái tháo đường kèm hơi thở mùi ceton, hoặc đường huyết đo được trên 11 mmol/L kèm nôn hay khó thở.
- Căn cứ:
  - NHS DKA: gọi 999 hoặc đến cấp cứu khi không biết mức xeton mà có triệu chứng nhiễm toan ceton (khát, tiểu nhiều, buồn ngủ, lú lẫn, hơi thở mùi trái cây), hoặc có triệu chứng mà chưa được chẩn đoán đái tháo đường;
  - NHS Type 1 diabetes: tiểu nhiều, khát, mệt kèm đau bụng, nôn, buồn ngủ, thở nhanh sâu: gọi 999 hoặc đến cấp cứu;
  - WHO BEC: nhiễm toan ceton gây thở nhanh, sâu mà người bệnh có thể kể là khó thở; người bệnh rất nặng, cần chuyển gấp (bậc B);
  - 3312/QĐ-BYT: trẻ nhiễm toan ceton thường có sụt cân, đau bụng, nôn, đái nhiều, uống nhiều; đau bụng giống bệnh ngoại khoa cấp.
- Các tình huống được hỏi:
  - người đái tháo đường cảm lạnh, khó thở nhẹ, chưa đo đường huyết: **không** còn mức 2 (vẫn mức 3 nếu sốt kèm khó thở, theo quy tắc chung);
  - người đái tháo đường nôn vì ngộ độc thức ăn, không khát nhiều, chưa đo đường huyết: không thuộc quy tắc; nôn liên tục vẫn mức 3;
  - nếu đã đo đường huyết trên 11 mmol/L mà nôn: mức 2, đúng với NHS (có triệu chứng, không biết xeton).
- Đau bụng kèm khát nhiều, tiểu nhiều chỉ tính khi kèm mệt nhiều, đúng tiêu chí NHS Type 1 diabetes ("tiểu nhiều, rất khát và mệt, kèm đau bụng"): người đau bụng dưới kèm "tiểu nhiều" dễ là viêm bàng quang (đi tiểu nhiều lần). Bản thử đầu của lượt R chỉ đòi "trẻ em, thiếu niên" mà không đòi mệt; khi đó câu khát nhiều bị hỏi thêm ở trẻ đau bụng và một ca đau bụng kinh 14 tuổi của bộ dev chạm giới hạn 30 câu, bị xếp mức 4 thay vì 5 (mục 8). Bản cuối không còn hiện tượng này.

**`rf_new_diabetes_child` (mức 3).**
- NHS Type 1 diabetes: nghĩ con bị típ 1 thì khám khẩn (mức 3); thường được khám chuyên khoa trong ngày. Câu lý do "thử đường máu ngay trong ngày" khớp.
- Thay `nice-ng18` (chưa mở được) bằng `nhs-type-1-diabetes` và `byt-qd-3312-2015`. Điều kiện giữ nguyên.

**`rf_aaa_rupture_signs` (mức 1).** Sửa điều kiện.
- NHS: gọi 999 khi đau bụng hoặc lưng đột ngột, dữ dội; khó thở; da tái hoặc xám; mất ý thức. Nhóm nguy cơ: nam từ 65 tuổi, hút thuốc, tăng huyết áp, mỡ máu cao, người thân bị phình, xơ vữa, bệnh phổi tắc nghẽn mạn tính, Marfan.
- Bản nháp có hai chỗ quá rộng:
  - "vã mồ hôi lạnh" đủ làm điều kiện đi kèm: người cao tuổi đau quặn thận rất hay vã mồ hôi. Đã bỏ.
  - Đau hông lưng (câu hỏi không có mức độ) kèm ngất hoặc choáng: với triệu chứng chính Ngất, ngất luôn có, nên mọi người từ 60 tuổi có đau lưng mạn tính và một lần ngất tư thế đều thành "gọi 115". Nay đau hông lưng hoặc đau lan ra sau lưng chỉ tính khi kèm tay chân lạnh, da tái, hoặc ngất chưa hồi phục hẳn.
- Thêm người đã biết có phình động mạch chủ (`known_aaa`) ở mọi tuổi.
- Người từ 60 tuổi đau quặn thận dữ dội mà choáng vì đau **vẫn** lên mức 1: NHS khuyên gọi 999 khi đau bụng, lưng đột ngột dữ dội ở người có thể bị phình, và tại nhà không phân biệt được. Đây là điểm xếp cao hơn cần, chờ bác sĩ duyệt.
- Ngưỡng 60 tuổi của người bảo trì (NHS nêu 65) giữ nguyên, chờ bác sĩ duyệt.
- Thêm WHO BEC (đau bụng dữ dội có thể là chảy máu trong ổ bụng gây sốc) để có bậc B. Không mở được hướng dẫn ESVS 2024.
- Ca d-from-h-syncope-017 vẫn thỏa quy tắc (đau bụng dữ dội, da tái lạnh, chưa hồi phục).

**`rf_lepto_severe` (mức 2, Sốt, Đau đầu).**
- WHO 2003: 4 nhóm biểu hiện; hội chứng Weil (vàng da, suy thận, xuất huyết, viêm cơ tim) và xuất huyết phổi kèm suy hô hấp là thể nặng, cần nhập viện; dùng kháng sinh ngay, tốt nhất trước ngày thứ 5. Điều kiện của bản nháp khớp với nguồn.
- 5642/QĐ-BYT: Leptospira gây sốt, đau cơ, vàng da, tổn thương phổi, suy thận.
- Điểm cần bác sĩ duyệt: nhánh "khó thở". Người sốt làm ruộng bị viêm phổi cũng thỏa, và lên mức 2 thay vì mức 3. Lượt R giữ vì xuất huyết phổi diễn biến nhanh và không phân biệt được tại nhà.

**`rf_fever_jaundice` (mức 3).**
- NHS: mọi vàng da (có sốt hay không) cần khám khẩn, mức 3.
- Trẻ sơ sinh, nhũ nhi (vàng da sinh lý): các mức NHS đã có sẵn trong các quy tắc chung:
  - vàng da kèm sốt từ 38°C ở trẻ sơ sinh: NHS gọi 999 hoặc đến cấp cứu; doctor-v: trẻ dưới 3 tháng sốt ở mức 2 (`rg_fever_under_3_months`);
  - vàng da không sốt ở trẻ trên 24 giờ tuổi: NHS khám khẩn; doctor-v: trẻ dưới 2 tháng luôn ở mức 3 (`rg_young_infant_any`);
  - kèm bú kém, li bì, thở nhanh, hạ thân nhiệt: mức 2 (`rg_young_infant_danger_sign`).
- Vì vậy không cần nhánh riêng cho trẻ nhỏ; quy tắc đòi có sốt nên vàng da sinh lý không bị xếp cao hơn.
- Vàng da không sốt (NHS: mức 3) chưa có quy tắc; xem mục 7.2.

**`rf_measles_contact_fever` (mức 3, Sốt).**
- NHS: khám khẩn khi nghĩ bị sởi, hoặc chưa tiêm đủ 2 mũi (và chưa từng mắc) mà tiếp xúc gần; tiêm đủ 2 mũi thì khó là sởi.
- Thêm điều kiện: không áp dụng khi đã tiêm đủ 2 mũi. "Không rõ" vẫn tính (ca d-from-h-fever-009). Câu tiêm vắc xin chỉ hỏi trẻ từ 18 tháng đến 17 tuổi, nên người lớn và trẻ nhỏ chưa được hỏi vẫn được khuyên khám.
- Cách viết `not: { finding: measles_vaccinated, is: present }` bị bộ kiểm tra cảnh báo. Đây là **cố ý**: cần đúng cả khi câu hỏi chưa được hỏi. Đã ghi chú trong tệp quy tắc.

### 3.3 Quy tắc cũ được sửa ở lô 2

**`rf_dizziness_central_signs_high_risk` (mức 1) và `rf_acute_vertigo_vascular_risk` (mức 2).**
- Yếu tố "bị bẻ, nắn cổ hoặc chấn thương cổ" phù hợp với Biller 2014 (tóm tắt): bóc tách động mạch cổ là một trong những nguyên nhân hay gặp nhất của đột quỵ ở người trẻ và trung niên; lực cơ học có thể gây bóc tách; phần lớn nghiên cứu dân số thấy liên quan giữa nắn chỉnh cột sống cổ và đột quỵ do bóc tách động mạch đốt sống ở người trẻ.
- Sửa ghi chú: bản nháp viết "ở mọi lứa tuổi", nguồn chỉ nói người trẻ và trung niên.
- Thêm `rothwell-stroke-2001` vào nguồn.
- Mức và điều kiện giữ nguyên. Ca d-from-h-dizzy-020 vẫn đúng mức 1.

**`rf_recurrent_vertigo` (mức 4).** Tính cả "từng cơn, mỗi cơn vài phút đến vài giờ" là đúng với NHS Vertigo ("keeps coming back": khám không khẩn). Dấu hiệu nguy hiểm đi kèm vẫn do quy tắc mức 1–2 xử lý.

**`rf_befast_high_risk` (mức 1, Đau đầu).** Thêm "bị bẻ, nắn cổ hoặc chấn thương cổ" vào yếu tố nguy cơ, cùng cấu trúc với hai quy tắc của Chóng mặt. Bóc tách động mạch cổ hay biểu hiện bằng đau đầu một bên, đau gáy (Biller 2014). Trước đây người 35 tuổi đau đầu, đột ngột mất thăng bằng sau bẻ cổ chỉ ở mức 2.

---

## 4. Dấu hiệu nguy hiểm, nhóm câu hỏi

Không sửa `knowledge/complaints/` và `question-groups.yaml`. Đã kiểm tra:

- **Đau bụng:** `scrotal_pain` hỏi riêng ngay sau `abdominal_red_flags` (nhóm đã đủ 7 mục), chỉ hỏi nam giới. Hợp lý. Khi một dấu hiệu khác đã đưa mức lên 2 thì câu này không được hỏi nữa (mức đã đúng, chỉ thiếu tên bệnh trong danh sách cần loại trừ).
- **Đau đầu:** `eye_pain_one_side` hỏi ngay sau `headache_red_flags` (đủ 7 mục). Câu đỏ mắt, quầng sáng được hỏi thích ứng khi có đau mắt.
- **Ngất:** `flank_pain` hỏi ngay sau `syncope_red_flags` (đủ 7 mục). Với điều kiện mới của `rf_aaa_rupture_signs`, câu tay chân lạnh (`general_danger_signs`) và "chưa hồi phục hẳn" (cuối danh sách) vẫn được hỏi sau đó.
- **`fever_exposures`:** đủ 7 mục, gồm `flood_mud_exposure` và `heat_exposure`.
- **Nhãn trong bảng đánh dấu:** ứng dụng hiện `label_vi` cho từng mục của nhóm (`GroupQuestion.tsx`), không hiện `question_vi`. Các mục phơi nhiễm khác đều có mốc thời gian trong nhãn ("Tháng qua đi rừng…", "3 tuần qua tiếp xúc người bị sởi"). Hai nhãn mới thiếu mốc thời gian, đã sửa (mục 5).
- **Hạn chế, chưa sửa:**
  - `fever_exposures` không có trong `intake` của Chóng mặt và Ngất, dù chú thích của nhóm ghi "hỏi cho mọi triệu chứng chính". Vì vậy với người chóng mặt, ngất có sốt, câu phơi nắng, lội nước chỉ được hỏi thích ứng.
  - Câu phơi nắng không nằm trong danh sách dấu hiệu nguy hiểm, nên người lú lẫn sau khi phơi nắng dừng ở mức 1 trước khi được hỏi; không thấy lời dặn làm mát (mục 7.3).

---

## 5. Câu chữ của dấu hiệu lô 2

Chỉ sửa trường chữ; không đổi id, loại, lựa chọn.

| Dấu hiệu | Sửa | Lý do |
|---|---|---|
| `flood_mud_exposure` | Câu hỏi "Trong 3 tuần qua…" → "Tháng qua có…"; nhãn thêm "Tháng qua" | WHO 2003: ủ bệnh thường 5–14 ngày, dao động 2–30 ngày; 3 tuần bỏ sót phần cuối. Nhãn hiện trong bảng đánh dấu nên phải có mốc thời gian, như "Tháng qua đi rừng…". |
| `heat_exposure` | Nhãn thêm "24 giờ qua" ("24 giờ qua phơi nắng lâu, làm việc nặng nơi nóng bức", 12 từ); gợi ý thêm người có bệnh tim, tiểu đường | Như trên. NHS: trẻ em, người cao tuổi, người có bệnh mạn tính (đái tháo đường, bệnh tim) dễ bị. |
| `neck_injury_or_manipulation` | "Vài tuần gần đây" → "Tháng qua"; nhãn "Tháng qua bị bẻ, nắn cổ…" | Mốc thời gian cụ thể (quy tắc viết). Rothwell 2001: liên quan rõ với nắn chỉnh trong 1 tuần trước và trong tháng trước. Biller 2014 (tóm tắt) không nêu khoảng thời gian. |
| `eye_pain_one_side` | Thêm câu hỏi thay thế "Có phải nhắm một bên mắt hoặc lấy tay ôm mắt vì đau không?" | Dấu hiệu nằm trong danh sách dấu hiệu nguy hiểm của Đau đầu nên bắt buộc có câu thay thế (quy tắc viết, mục 3); hết cảnh báo của bộ kiểm tra. |
| `red_lips_strawberry_tongue` | "quả dâu" → "quả dâu tây" (câu hỏi, nhãn) | Thuật ngữ là "lưỡi dâu tây" (3312/QĐ-BYT); ở miền Bắc "quả dâu" có thể hiểu là dâu tằm. |
| `bcg_scar_red` | Câu hỏi "…ở cánh tay…" → "…ở vai, cánh tay có sưng đỏ lại không?"; thêm gợi ý "Vết tiêm phòng lao lúc mới sinh thường để lại một sẹo nhỏ ở vai hoặc phía trên cánh tay." | Giúp cha mẹ tìm đúng chỗ. Chưa tìm được văn bản chính thức nêu vị trí tiêm BCG ở Việt Nam (chỉ có trang của bệnh viện tư nêu vai hoặc cánh tay trái), nên không ghi "bên trái". |
| `thirst_polyuria` | Gợi ý thêm "Không tính tiểu buốt, mỗi lần chỉ ra ít." | Tránh nhầm với viêm bàng quang (đi tiểu nhiều lần), vì câu này nay đưa trẻ đau bụng lên mức 2. NHS: tiểu nhiều hơn, nhất là ban đêm. |

Đã kiểm tra, không sửa:
- `ketone_breath`: "mùi lạ như trái cây chín hoặc nước rửa móng tay" khớp NHS (mùi trái cây như kẹo lê hoặc nước rửa móng tay) và WHO BEC (mùi ngọt).
- `scrotal_pain`, `halos_around_lights` (khớp "quầng xanh đỏ" của 40/QĐ-BYT, "vòng sáng nhiều màu" của NHS), `calf_pain` (WHO: đau cơ khi ấn, rõ nhất ở bắp chân), `hands_feet_swelling_peeling`, `known_aaa`, `atrial_fibrillation_known`, `ovarian_cyst_known`.

---

## 6. Không xác minh được

- **NICE NG18:** chưa mở được (mục 1). Ý "trẻ nghi đái tháo đường típ 1 cần chuyển trong ngày" nay dựa vào NHS Type 1 diabetes.
- **AHA 2017 (Kawasaki):** chỉ đọc được tóm tắt; chưa đọc tiêu chuẩn chẩn đoán, mốc 10 ngày điều trị, sẹo BCG trong toàn văn. Các ý này lấy qua 3312/QĐ-BYT.
- **Biller 2014:** chỉ đọc tóm tắt; chưa đọc khoảng thời gian từ nắn cổ đến đột quỵ.
- **40/QĐ-BYT (2015):** đọc bản đăng lại; chưa kiểm tra được văn bản thay thế trên cổng của Bộ Y tế.
- **Vị trí tiêm BCG ở Việt Nam:** chưa có văn bản chính thức.
- **Ngưỡng tuổi 60** của `rf_aaa_rupture_signs`, ngưỡng "3 ngày, 2 dấu hiệu" của `rf_kawasaki_signs`: nhận định, chờ bác sĩ.

---

## 7. Đề xuất

### 7.1 Dấu hiệu còn thiếu (lượt R không được tạo dấu hiệu)

| Đề xuất | Dùng cho | Căn cứ |
|---|---|---|
| "Đã nghỉ chỗ mát, được làm mát và uống nước 30 phút mà chưa đỡ" | `rf_heat_stroke_signs` (mức 1) | NHS Heat: tiêu chí đầu tiên của "Call 999 now". |
| "Da nóng, khô, không ra mồ hôi dù trời nóng" | Sốc nhiệt | NHS Heat, WHO BEC. |
| "Đau lưng hoặc hông lưng đột ngột, dữ dội" | `rf_aaa_rupture_signs` | NHS AAA: tiêu chí 999. Câu `flank_pain` hiện không có mức độ, nên nhánh đau lưng phải đòi thêm dấu hiệu sốc. |
| Lựa chọn "huyết áp dưới 90/60" cho `bp_measured` | Vỡ phình, sốc | Việc tồn từ trước (ca d-from-h-syncope-017 đo 85/50 nhưng chỉ chọn được "dưới 140/90"). |
| "Thở sâu, nhanh như hụt hơi dù không ho" | Nhiễm toan ceton | NHS DKA, WHO BEC. Câu khó thở hiện gộp nhiều kiểu, nên nhánh khó thở của `rf_dka_suspected` phải đòi thêm khát nhiều hoặc đường huyết cao. |
| "Đang tiêm insulin" (tách khỏi `on_glucose_lowering_meds`) | Nhiễm toan ceton | NHS DKA: hay gặp ở người dùng insulin. |
| "Phân bạc màu hoặc nước tiểu sẫm" ở trẻ vàng da | Vàng da trẻ nhỏ (teo đường mật) | NHS Jaundice in babies: khám khẩn. |
| "Đã từng mắc sởi" | `rf_measles_contact_fever` | NHS: đã mắc sởi thì khó là sởi. |
| "Tiếp xúc, chăm sóc, giết mổ trâu bò, lợn" | Leptospira | WHO 2003: phơi nhiễm với động vật nhiễm bệnh, không chỉ chuột. Hiện câu `flood_mud_exposure` không nói tới gia súc. |

### 7.2 Quy tắc nên xem lại

- **Vàng da không sốt:** NHS khuyên khám khẩn mọi vàng da; doctor-v chưa có quy tắc. Đề xuất quy tắc mức 3 "vàng da, vàng mắt mới xuất hiện" (hoặc đổi tên `rf_fever_jaundice` trước khi phát hành). Lượt R không thêm vì xác suất các bệnh đường mật đã cho mức 2–3 ở Đau bụng, và đổi id cần người bảo trì quyết định.
- **Người đã biết phình động mạch chủ đau bụng, đau lưng không dữ dội:** phình có triệu chứng thường cần khám khẩn, nhưng lượt R chưa mở được nguồn (ESVS 2024 bị chặn).
- **Người lớn mới khát nhiều, tiểu nhiều, sụt cân:** NHS khuyên khám khẩn khi nghĩ bị típ 1 ở mọi tuổi; hiện chỉ có quy tắc cho trẻ em. Cân nhắc quy tắc mức 3 hoặc 4.
- **Chờ bác sĩ duyệt:** nhánh khó thở của `rf_lepto_severe`; mức 1 cho người từ 60 tuổi đau quặn thận dữ dội kèm choáng (`rf_aaa_rupture_signs`); ngưỡng 3 ngày của `rf_kawasaki_signs`.

### 7.3 Bộ suy luận và danh sách câu hỏi

- **Lời dặn làm mát của sốc nhiệt** chỉ hiện khi câu phơi nắng được hỏi trước câu lú lẫn. Có hai cách: hỏi câu phơi nắng sớm ở Ngất, Chóng mặt (như câu khí CO, thêm 1 câu mỗi phiên), hoặc cho bộ suy luận hỏi tiếp các câu "bối cảnh" của quy tắc mức 1 trước khi dừng cấp cứu. Nên quyết định sau lượt C, khi đã có bệnh say nắng, sốc nhiệt.
- Cân nhắc thêm `fever_exposures` vào `intake` của Chóng mặt và Ngất (khi có sốt), đúng như chú thích của nhóm.

### 7.4 Cho lượt C và người bảo trì

- Sau lượt C, thêm bệnh mới vào `conditions`:
  - `rf_scrotal_pain`: testicular_torsion; `rf_acute_glaucoma_signs`: acute_angle_closure_glaucoma; `rf_heat_stroke_signs`: heat_stroke; `rf_dka_suspected`: diabetic_ketoacidosis; `rf_aaa_rupture_signs`: abdominal_aortic_aneurysm; `rf_lepto_severe`: leptospirosis;
  - quy tắc cũ: `rf_cholangitis_triad` (acute_cholangitis), `rf_severe_abdominal_pain` và `rf_fainting_with_pain` (abdominal_aortic_aneurysm, acute_mesenteric_ischemia, ovarian_torsion), `rf_altered_consciousness` (encephalitis, heat_stroke, diabetic_ketoacidosis), `rf_new_seizure` (encephalitis), `rf_extreme_bp_with_symptoms` (hypertensive_crisis).
- Người soạn bệnh nên dùng: `nhs-type-1-diabetes`, `byt-qd-3312-2015` (Kawasaki, nhiễm toan ceton ở trẻ), `byt-qd-40-2015` (glôcôm), `eau-paediatric-urology-2026` (xoắn tinh hoàn), `who-leptospirosis-2003` (ủ bệnh, thể nặng). **Không** lấy số liệu từ `aha-kawasaki-2017` hay `nice-ng18` khi chưa mở được.
- Tỷ lệ nền nên xem lại: `neck_injury_or_manipulation` (0,02) có thể thấp, vì "bẻ cổ" ở tiệm gội đầu phổ biến; `flood_mud_exposure` (0,2) với mốc 1 tháng.

---

## 8. Kiểm tra

### 8.1 `npm run kb:check`

- Trước: 0 lỗi, 25 cảnh báo. 13 cảnh báo thuộc lô 2:
  - 8 cảnh báo nguồn chưa kiểm tra dùng cho bậc B (`biller-stroke-2014` ở 2 quy tắc, `nhs-glaucoma`, `aha-kawasaki-2017`, `nhs-kawasaki-disease`, `nice-ng18`, `who-leptospirosis-2003`, `nhs-measles`);
  - 4 quy tắc mức 1–2 chỉ có bậc C (`rf_scrotal_pain`, `rf_heat_stroke_signs`, `rf_dka_suspected`, `rf_aaa_rupture_signs`);
  - `eye_pain_one_side` thiếu câu hỏi thay thế.
- Sau: **0 lỗi, 13 cảnh báo**. 12 cảnh báo cũ không thuộc lô 2 (độ dài câu hỏi của 2 dấu hiệu cũ, bậc C của 9 quy tắc cũ, độ dài câu lý do của `rf_febrile_shock_signs`), và 1 cảnh báo cố ý của lô 2: `rf_measles_contact_fever` dùng `not: … is: present`.

### 8.2 `npm run eval -- --set dev` (170 ca)

| | Trước | Sau |
|---|---|---|
| Sạch | top1 79,4% · top3 95,8% · top10 98,8% · an toàn 99,4% · bỏ sót cấp cứu 0/75 · quá mức 6,5% · ECE 0,070 · câu hỏi 14 | như trước, trừ ECE 0,073 |
| Nhiễu | top1 76,5% · top3 92,4% · top10 98,3% · an toàn 97,4% · bỏ sót cấp cứu 12/375 · quá mức 18,7% · ECE 0,049 · câu hỏi 16 | top3 92,2% · an toàn 97,5% · ECE 0,050; còn lại như trước |

So từng ca (mức xử trí, thứ hạng, số câu hỏi, quy tắc thỏa; chạy sạch và 5 lần nhiễu), chỉ 5 ca khác:

| Ca | Thay đổi | Giải thích |
|---|---|---|
| d-acute-coronary-syndrome-1 (cần mức 1) | Mức 1 giữ nguyên; `rf_dka_suspected` không còn thỏa; 7 → 8 câu | Người 68 tuổi đái tháo đường, khó thở do nhồi máu cơ tim: quy tắc cũ coi là nhiễm toan ceton (đúng hiện tượng "khó thở ở người đái tháo đường" quá rộng). Nay nhiễm toan ceton không còn bị đưa vào danh sách cần loại trừ. |
| d-acute-coronary-syndrome-2 (cần mức 1) | Như trên; 6 → 13 câu | Như trên. Mức 1 vẫn đạt nhờ xác suất. Có lẽ trước đây quy tắc mức 2 (sai) làm mức xử trí ổn định sớm nên phiên dừng sớm; nay phiên hỏi thêm để xác nhận hội chứng vành cấp. |
| d-measles-2 (cần mức 3) | Mức 3, thứ hạng 1 giữ nguyên; 19 → 11 câu | Câu tiêm vắc xin sởi nay nằm trong quy tắc nên được hỏi sớm; trẻ chưa tiêm, có tiếp xúc nên sởi được xác định nhanh. |
| d-from-h-dizzy-009 (cần mức 1) | Mức 1 giữ nguyên; 12 → 11 câu | Thứ tự câu hỏi đổi nhẹ do điều kiện mới của `rf_aaa_rupture_signs` (phạm vi có Chóng mặt). |
| d-from-h-abd-002 (cần mức 3) | Nhiễu: 1 trong 5 lần chạy từ mức 4 thành mức 3 (đúng) | Thứ tự câu hỏi đổi. |

- top3 nhiễu (92,4% → 92,2%) và ECE đổi nhẹ do thứ tự câu hỏi khác ở các ca trên.
- Bốn ca dev của lô 2 giữ đúng mức: d-from-h-syncope-017 (mức 1, `rf_aaa_rupture_signs`), d-from-h-dizzy-020 (mức 1), d-from-h-dizzy-015 (mức 4), d-from-h-fever-009 (mức 3; tiêm vắc xin "không rõ" vẫn thỏa quy tắc sởi).
- **Lần chạy thử giữa chừng:** bản đầu của nhánh đau bụng trong `rf_dka_suspected` (trẻ em, thiếu niên, không đòi mệt) làm ca d-primary-dysmenorrhea-2 (14 tuổi) bị hỏi thêm câu khát nhiều, chạm giới hạn 30 câu và bị xếp mức 4 thay vì 5 (quá mức sạch 6,5% → 7,1%). Đã sửa bằng cách đòi kèm mệt nhiều như NHS; ca này trở lại mức 5 với 29 câu.

### 8.3 Tình huống mô phỏng (đánh giá điều kiện quy tắc, 27 tình huống)

- `rf_dka_suspected`: không thỏa ở người đái tháo đường cảm lạnh khó thở nhẹ chưa đo đường huyết, ở người đái tháo đường nôn do ngộ độc thức ăn không khát nhiều, ở trẻ đau bụng khát nhiều nhưng không mệt, ở phụ nữ 30 tuổi đau bụng khát nhiều không nôn; thỏa khi đường huyết cao kèm nôn, khi khát nhiều, tiểu nhiều kèm nôn, khi trẻ đau bụng khát nhiều kèm mệt nhiều.
- `rf_aaa_rupture_signs`: thỏa ở người 70 tuổi đau quặn thận dữ dội kèm choáng (chủ ý), ở người ngất 72 tuổi đau lưng kèm da tái lạnh, ở ca d-from-h-syncope-017, ở người 50 tuổi đã biết phình động mạch chủ đau dữ dội kèm choáng; không thỏa khi đau quặn thận chỉ vã mồ hôi, hoặc ngất đã tỉnh hẳn kèm đau lưng mạn.
- `rf_measles_contact_fever`: không thỏa khi đã tiêm 2 mũi; thỏa khi "không rõ", chưa tiêm, hoặc người lớn (không được hỏi).
- `rf_heat_stroke_signs`: thỏa khi phơi nắng rồi ngất chưa tỉnh hẳn; không thỏa khi đã tỉnh hẳn.
- `rf_kawasaki_signs`: thỏa ở trẻ sởi sốt 4 ngày (mức 3, chủ ý), không thỏa khi mới sốt 2 ngày.
- `rf_befast_high_risk`: thỏa ở người 35 tuổi đau đầu, đột ngột mất thăng bằng sau bẻ cổ.
- `rf_fever_jaundice` thỏa ở trẻ 1 tháng sốt, vàng da, đồng thời `rg_fever_under_3_months` cho mức 2.
