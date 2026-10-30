# Giai đoạn 3: phạm vi

> **Trạng thái:** chủ dự án đã duyệt ngày 2026-10-25, kèm 4 quyết định (mục 7). Chưa có bác sĩ duyệt.
> **Căn cứ:** `docs/plan.md` (mục 6 và 10), `docs/research/vietnam-sources.md`, 33 bệnh đã có trong `knowledge/conditions/`, chi phí đo được ở Giai đoạn 1 (`docs/reports/phase-1.md`, mục 6).

## 1. Tóm tắt

- **41 triệu chứng chính:** 3 đã có, 38 mới, chia 11 nhóm.
- **177 bệnh:** 33 đã có, 144 mới. Trong đó có 6 bệnh ung thư, gắn nhãn "Bác sĩ cần loại trừ". Thêm khoảng 30 bệnh dự bị cho các đợt sau.
- **Phủ hai bộ ca đã công bố** mà kế hoạch dùng để so sánh: 43/45 ca Semigran và 45/48 ca Levine có bệnh đúng trong danh sách (mục 8).
- **11 lô:**
  - lô 1: Chóng mặt, Ngất, Hồi hộp, theo yêu cầu của chủ dự án;
  - lô 2: bổ sung các bệnh nguy hiểm còn thiếu của 3 triệu chứng đã có (Sốt, Đau bụng, Đau đầu);
  - lô 11: Nổi cục, nổi hạch.
- **Chi phí ước tính:** khoảng 50 triệu token. Nếu chạy 3 agent song song, mất khoảng 16 giờ chạy agent, chưa tính các vòng chấm và sửa.
- **Quyết định của chủ dự án:** mục 7.

## 2. Cách chọn

**Mỗi triệu chứng chính phải có đủ hai loại bệnh:**
- các bệnh "không được bỏ sót" (mức xử trí 1–2), vì an toàn là mục tiêu số một;
- các nguyên nhân hay gặp nhất, để app có ích với đa số người dùng và nhận đúng các ca tự chăm sóc (chỉ tiêu ≥ 50%).

**Ưu tiên thêm:**
- bệnh đặc thù Việt Nam, nhất là bệnh có hướng dẫn của Bộ Y tế: Whitmore (6101/QĐ-BYT), lao (162/QĐ-BYT), ngộ độc methanol (3610/QĐ-BYT), dại (1622/QĐ-BYT)…;
- đủ ba nhóm: trẻ em, thai sản, người cao tuổi.

**Gộp hoặc bỏ:**
- Gộp các bệnh có cùng cách xử trí, mà chỉ phân biệt được khi khám hoặc xét nghiệm. Ví dụ: "Viêm âm đạo" gộp nấm, vi khuẩn và trùng roi; "Rối loạn nhịp tim" gộp nhịp nhanh và nhịp chậm.
- Không đưa vào bệnh mà câu hỏi tại nhà gần như không phân biệt được, nếu quy tắc an toàn đã đủ để xử trí. Ví dụ: viêm thanh thiệt được xử trí bằng quy tắc "chảy dãi, thở rít".

**Quy tắc mở triệu chứng:** một triệu chứng chính chỉ hiện trong app khi lô của nó đạt các chỉ tiêu trên bộ ca giữ kín. Bệnh nguy hiểm của một lô sau phải đã có, hoặc đã được quy tắc an toàn xử trí.

**Giới hạn:**
- Không có số liệu về lý do đi khám ở tuyến ban đầu tại Việt Nam (báo cáo nghiên cứu, mục 3.4). Vì vậy nhãn "hay gặp" và thứ tự lô dựa trên đánh giá, không dựa trên số liệu.
- Mức xử trí và mã ICD-10 dưới đây là dự kiến. Ba lượt soạn A/B/C sẽ đối chiếu với nguồn và với bộ mã của Thông tư 06/2026/TT-BYT.

## 3. Bốn mươi mốt triệu chứng chính

| # | Nhóm | Triệu chứng chính | Lô |
|---|---|---|---|
| 1 | Toàn thân | Sốt | đã có |
| 2 | Toàn thân | Mệt mỏi, sụt cân | 7 |
| 3 | Toàn thân | Ngất, suýt ngất | 1 |
| 4 | Toàn thân | Phù, sưng chân | 8 |
| 5 | Toàn thân | Vàng da, vàng mắt | 4 |
| 6 | Đầu – thần kinh | Đau đầu | đã có |
| 7 | Đầu – thần kinh | Chóng mặt | 1 |
| 8 | Đầu – thần kinh | Co giật | 7 |
| 9 | Đầu – thần kinh | Yếu, tê tay chân, méo miệng | 7 |
| 10 | Đầu – thần kinh | Lú lẫn, lơ mơ (người nhà nhận thấy) | 7 |
| 11 | Tai mũi họng – mắt – răng | Đau họng | 5 |
| 12 | Tai mũi họng – mắt – răng | Đau tai | 5 |
| 13 | Tai mũi họng – mắt – răng | Sổ mũi, nghẹt mũi, chảy máu mũi | 5 |
| 14 | Tai mũi họng – mắt – răng | Đau mắt, đỏ mắt, nhìn mờ | 5 |
| 15 | Tai mũi họng – mắt – răng | Đau răng, đau miệng, loét miệng | 5 |
| 16 | Hô hấp – tim mạch | Ho | 3 |
| 17 | Hô hấp – tim mạch | Khó thở | 3 |
| 18 | Hô hấp – tim mạch | Đau ngực | 3 |
| 19 | Hô hấp – tim mạch | Hồi hộp, tim đập nhanh | 1 |
| 20 | Tiêu hóa | Đau bụng (thêm từ đồng nghĩa "ợ chua, ợ nóng, khó tiêu") | đã có |
| 21 | Tiêu hóa | Tiêu chảy | 4 |
| 22 | Tiêu hóa | Nôn (ói), buồn nôn | 4 |
| 23 | Tiêu hóa | Táo bón | 4 |
| 24 | Tiêu hóa | Đi ngoài ra máu, phân đen | 4 |
| 25 | Tiết niệu – sinh dục | Tiểu buốt, tiểu ra máu | 6 |
| 26 | Tiết niệu – sinh dục | Tiểu khó, bí tiểu | 6 |
| 27 | Tiết niệu – sinh dục | Khí hư bất thường, ngứa vùng kín | 6 |
| 28 | Tiết niệu – sinh dục | Ra máu âm đạo bất thường | 6 |
| 29 | Tiết niệu – sinh dục | Đau, sưng bìu | 6 |
| 30 | Cơ xương khớp | Đau lưng | 8 |
| 31 | Cơ xương khớp | Đau, sưng khớp | 8 |
| 32 | Cơ xương khớp | Đau cổ, vai, gáy | 8 |
| 33 | Da | Phát ban, nổi mẩn, ngứa | 9 |
| 34 | Da | Sưng đỏ một vùng da, mụn nhọt | 9 |
| 35 | Tinh thần | Buồn chán, lo âu | 7 |
| 36 | Tinh thần | Mất ngủ | 7 |
| 37 | Tai nạn – ngộ độc | Ngã, va đập, chấn thương | 10 |
| 38 | Tai nạn – ngộ độc | Vết thương, bỏng, bị cắn, bị đốt | 10 |
| 39 | Tai nạn – ngộ độc | Ngộ độc (thức ăn, rượu, hóa chất, khí than) | 10 |
| 40 | Trẻ nhỏ | Trẻ dưới 1 tuổi quấy khóc, bỏ bú | 4 |
| 41 | Toàn thân | Nổi cục, nổi hạch, khối u (cổ, vú, dưới da) | 11 |

**Triệu chứng dự bị** (cho các đợt sau):
- Ù tai, nghe kém;
- Thai máy ít. Đề xuất xử trí bằng quy tắc an toàn trong hồ sơ thai, không làm triệu chứng riêng.

**Việc giao diện đi kèm:** với 40 triệu chứng, màn chọn triệu chứng cần chia theo nhóm (kế hoạch, mục 3.1). Từ điển tìm kiếm cũng cần thêm từ dân gian, ví dụ "trúng gió", "lên máu".

## 4. Mười một lô

Cột "Mức" là mức xử trí dự kiến: 1 = gọi 115, 2 = đến cấp cứu ngay, 3 = khám trong 24 giờ, 4 = khám trong vài ngày, 5 = theo dõi tại nhà. Quy tắc an toàn có thể nâng mức khi có dấu hiệu nặng.

### Lô 1 — Chóng mặt, Ngất, Hồi hộp (12 bệnh mới)

> **Xong ngày 2026-10-26:** đã mở trong app. Thực tế 13 bệnh mới, vì ngoại tâm thu tách khỏi rối loạn nhịp tim. Kết quả chấm và chi phí: `docs/worklog.md`.

Vì sao đi trước: chủ dự án ưu tiên. Ba triệu chứng này hay gặp ở người cao tuổi, dùng chung nhiều bệnh (rối loạn nhịp tim, hạ đường huyết, thiếu máu, hạ huyết áp tư thế) và có nhiều nguyên nhân nguy hiểm.

| Bệnh | Tiếng Anh | ICD-10 | Mức | Vì sao chọn |
|---|---|---|---|---|
| Chóng mặt tư thế kịch phát lành tính | BPPV | H81.1 | 4 | Nguyên nhân chóng mặt quay cuồng hay gặp nhất |
| Viêm dây thần kinh tiền đình | Vestibular neuritis | H81.2 | 3 | Hay gặp; cần khám để phân biệt với đột quỵ |
| Ngất do phản xạ, hạ huyết áp tư thế (kể cả do thuốc hạ áp) | Reflex syncope, orthostatic hypotension | R55, I95.1 | 4 | Nguyên nhân ngất hay gặp nhất |
| Rối loạn nhịp tim (nhanh hoặc chậm) | Cardiac arrhythmia | I44–I49 | 3 | Không được bỏ sót: ngất do tim |
| Hạ đường huyết | Hypoglycaemia | E16 | 2 | Không được bỏ sót; người dùng thuốc tiểu đường |
| Thiếu máu | Anaemia | D50–D64 | 4 | Hay gặp ở phụ nữ, trẻ em |
| Cơn thiếu máu não thoáng qua | Transient ischaemic attack | G45 | 2 | Không được bỏ sót: báo trước đột quỵ |
| Ngộ độc khí CO | Carbon monoxide poisoning | T58 | 1 | Không được bỏ sót; Việt Nam: đốt than sưởi, chạy máy phát trong phòng kín |
| Cơn hoảng sợ | Panic attack, panic disorder | F41.0 | 4 | Hay gặp; dễ nhầm với bệnh tim |
| Cường giáp | Hyperthyroidism | E05 | 4 | Hay gặp; gây hồi hộp, sụt cân |
| Thuyên tắc phổi | Pulmonary embolism | I26 | 1 | Không được bỏ sót |
| Xuất huyết tiêu hóa | Upper GI bleeding | K92.0–K92.2 | 1 | Không được bỏ sót: ngất, phân đen |

Bệnh đã có cần bổ sung cho triệu chứng mới: đột quỵ, hội chứng vành cấp, chửa ngoài tử cung, nhiễm khuẩn huyết, viêm dạ dày ruột cấp (mất nước), sốt xuất huyết Dengue (giai đoạn nguy hiểm), đau nửa đầu (chóng mặt do đau nửa đầu).

### Lô 2 — Bổ sung cho Sốt, Đau bụng, Đau đầu (13 bệnh mới)

> **Xong ngày 2026-10-28:** đã phát hành. Thực tế 14 bệnh mới, vì say nắng nhẹ và sốc nhiệt được tách làm hai. Kết quả chấm và chi phí: `docs/worklog.md`.

Vì sao: ba triệu chứng này đang chạy nhưng còn thiếu một số bệnh nguy hiểm. Hiện các quy tắc an toàn đã bắt được những ca này (bỏ sót 0/54 ở lần chấm thứ ba), nhưng các bệnh đó chưa hiện trong danh sách "Bác sĩ cần loại trừ". Nhiều bệnh trong lô này cũng cần cho các lô sau.

| Bệnh | Tiếng Anh | ICD-10 | Mức | Vì sao chọn |
|---|---|---|---|---|
| Phình động mạch chủ bụng (dọa vỡ, vỡ) | Abdominal aortic aneurysm | I71.3–I71.4 | 1 | Không được bỏ sót: người cao tuổi đau bụng, đau lưng, ngất |
| Thiếu máu mạc treo ruột cấp | Acute mesenteric ischaemia | K55.0 | 1 | Không được bỏ sót: người cao tuổi, rung nhĩ |
| Xoắn, vỡ nang buồng trứng | Ovarian torsion, ruptured cyst | N83.0, N83.2, N83.5 | 2 | Không được bỏ sót: nữ đau bụng dưới |
| Xoắn tinh hoàn | Testicular torsion | N44 | 2 | Không được bỏ sót: trẻ trai, nam trẻ đau bụng, đau bìu |
| Nhiễm toan ceton, tăng áp lực thẩm thấu do đái tháo đường | DKA, HHS | E10.1, E11.0–E11.1 | 2 | Không được bỏ sót: đau bụng, nôn, lơ mơ |
| Glôcôm góc đóng cơn cấp | Acute angle-closure glaucoma | H40.2 | 2 | Không được bỏ sót: đau đầu, đỏ mắt, nhìn mờ |
| Viêm não (viêm não Nhật Bản, do vi rút herpes) | Encephalitis | A83.0, B00.4, G04 | 1 | Không được bỏ sót; Việt Nam |
| Bệnh do Leptospira | Leptospirosis | A27 | 3 | Việt Nam: sau lũ, lội nước bẩn |
| Bệnh Kawasaki | Kawasaki disease | M30.3 | 3 | Trẻ sốt kéo dài; điều trị muộn gây tổn thương mạch vành |
| Áp xe gan | Liver abscess | K75.0, A06.4 | 3 | Việt Nam: áp xe gan do amip, do vi khuẩn |
| Say nắng, sốc nhiệt | Heat stroke | T67.0 | 1 | Không được bỏ sót; khí hậu nóng |
| Viêm đường mật cấp | Acute cholangitis | K83.0 | 2 | Không được bỏ sót: sốt, đau bụng, vàng da |
| Cơn tăng huyết áp (cần có số đo huyết áp) | Hypertensive urgency or emergency | I10 | 2 | Tăng huyết áp chiếm 26% người 18–69 tuổi (STEPS 2021); chỉ xét khi người dùng có số đo |

Thêm sau lô 1 (hai ca cấp cứu của lần chấm giữ kín thứ hai bị khuyên mức 2 thay vì mức 1):
- Phình động mạch chủ bụng cần cả triệu chứng Ngất và Chóng mặt (ca h-syncope-017).
- Đột quỵ tuần hoàn sau sau khi bị bẻ cổ hoặc chấn thương cổ (ca h-dizzy-020): xét thêm dấu hiệu này cho Chóng mặt.
- Ca nào được dùng để sửa sẽ chuyển sang dev, và có ca thay thế.
- "Say nắng, sốc nhiệt" được tách làm hai bệnh: say nắng, kiệt sức do nóng (mức nhẹ) và sốc nhiệt (mức 1). Lô 2 vì vậy có 14 bệnh mới.

### Lô 3 — Ho, Khó thở, Đau ngực (15 bệnh mới)

Vì sao: rất hay gặp. Có nhiều bệnh nguy hiểm, nhất là ở người cao tuổi và người hút thuốc (41% nam giới, STEPS 2021).

| Bệnh | Tiếng Anh | ICD-10 | Mức | Vì sao chọn |
|---|---|---|---|---|
| Viêm phế quản cấp | Acute bronchitis | J20 | 5 | Nguyên nhân ho hay gặp |
| Hen phế quản (cơn hen) | Asthma | J45–J46 | 3 | Hay gặp; cơn nặng là cấp cứu |
| Đợt cấp bệnh phổi tắc nghẽn mạn tính | COPD exacerbation | J44.1 | 3 | Việt Nam: tỷ lệ hút thuốc cao |
| Lao phổi | Pulmonary tuberculosis | A15–A16 | 4 | Việt Nam: gánh nặng lao cao (162/QĐ-BYT) |
| Ho gà | Pertussis | A37 | 3 | Việt Nam có dịch; nguy hiểm ở trẻ nhỏ |
| Viêm tiểu phế quản | Bronchiolitis | J21 | 3 | Trẻ dưới 2 tuổi |
| Viêm thanh quản cấp (croup) | Croup | J05.0 | 3 | Trẻ em |
| Suy tim | Heart failure | I50 | 3 | Hay gặp ở người cao tuổi; khó thở, phù |
| Tràn khí màng phổi | Pneumothorax | J93 | 2 | Không được bỏ sót |
| Bóc tách động mạch chủ | Aortic dissection | I71.0 | 1 | Không được bỏ sót |
| Phản vệ | Anaphylaxis | T78.2, T88.6 | 1 | Không được bỏ sót |
| Trào ngược dạ dày – thực quản | GORD | K21 | 5 | Hay gặp: ợ nóng, đau ngực, ho kéo dài |
| Đau thành ngực (cơ, sụn sườn) | Chest wall pain, costochondritis | M94.0, R07.4 | 5 | Nguyên nhân đau ngực lành tính hay gặp nhất |
| Zona thần kinh (giời leo) | Herpes zoster | B02 | 4 | Hay gặp ở người cao tuổi; đau ngực trước khi nổi ban |
| Ung thư phổi | Lung cancer | C34 | 4 | Bác sĩ cần loại trừ: ho kéo dài, ho ra máu, sụt cân, nhất là người hút thuốc |

Bệnh đã có cần bổ sung: viêm phổi, cảm lạnh, cúm, COVID-19, sởi (ho), hội chứng vành cấp (đau ngực, khó thở), nhiễm khuẩn huyết (khó thở). Các bệnh của lô 1 cũng cần thêm: thuyên tắc phổi, rối loạn nhịp tim, cơn hoảng sợ, thiếu máu.

### Lô 4 — Tiêu chảy, Nôn, Táo bón, Đi ngoài ra máu, Vàng da, Trẻ quấy khóc (16 bệnh mới)

Vì sao: tiêu hóa là nhóm lý do khám rất hay gặp. Phần lớn bệnh nguy hiểm của nhóm này đã có từ triệu chứng Đau bụng và từ lô 1–2.

| Bệnh | Tiếng Anh | ICD-10 | Mức | Vì sao chọn |
|---|---|---|---|---|
| Lỵ (lỵ trực khuẩn, lỵ amip) | Dysentery | A03, A06.0 | 3 | Tiêu chảy có máu; Việt Nam (5642/QĐ-BYT) |
| Hội chứng ruột kích thích | Irritable bowel syndrome | K58 | 5 | Hay gặp |
| Táo bón chức năng | Functional constipation | K59.0 | 5 | Hay gặp |
| Trĩ, nứt kẽ hậu môn | Haemorrhoids, anal fissure | K64, K60.2 | 4 | Nguyên nhân đi ngoài ra máu hay gặp nhất |
| Nôn nghén (kể cả nôn nghén nặng) | Nausea and vomiting of pregnancy | O21 | 5 | Thai sản |
| Hẹp phì đại môn vị | Infantile pyloric stenosis | Q40.0 | 2 | Không được bỏ sót: trẻ 2–8 tuần tuổi nôn vọt |
| Viêm gan vi rút cấp (A, B, E) | Acute viral hepatitis | B15–B17 | 3 | Vàng da; Việt Nam: viêm gan B lưu hành cao |
| Sỏi túi mật (cơn đau quặn mật) | Biliary colic | K80.2 | 4 | Hay gặp |
| Xơ gan | Cirrhosis | K70.3, K74.6 | 3 | Việt Nam: do viêm gan B, rượu; vàng da, phù, nôn ra máu |
| Suy gan cấp (do viêm gan, do thuốc như paracetamol, do thảo dược) | Acute liver failure | K72.0 | 1 | Không được bỏ sót: vàng da, lơ mơ; có trong 2 bộ ca đã công bố |
| Ung thư đại trực tràng | Colorectal cancer | C18–C20 | 4 | Bác sĩ cần loại trừ: đi ngoài ra máu, thay đổi thói quen đại tiện, sụt cân |
| Ung thư dạ dày | Gastric cancer | C16 | 4 | Bác sĩ cần loại trừ: đau thượng vị kèm sụt cân, nôn, phân đen |
| Ung thư gan | Hepatocellular carcinoma | C22.0 | 4 | Bác sĩ cần loại trừ: người viêm gan B, xơ gan; đau hạ sườn phải, sụt cân, vàng da |
| Vàng da sơ sinh | Neonatal jaundice | P59 | 3 | Trẻ sơ sinh |
| Teo đường mật bẩm sinh | Biliary atresia | Q44.2 | 3 | Không được bỏ sót: vàng da kéo dài, phân bạc màu |
| Khóc dạ đề (cơn khóc ở trẻ nhỏ) | Infant colic | R10.4 | 5 | Lý do quấy khóc hay gặp nhất ở trẻ dưới 4 tháng |

Bệnh đã có cần bổ sung:
- cho Tiêu chảy, Nôn, Táo bón, Đi ngoài ra máu, Vàng da: viêm dạ dày ruột cấp (kể cả ngộ độc thực phẩm), thương hàn, tắc ruột, viêm ruột thừa, lồng ruột, viêm túi mật cấp, viêm tụy cấp, viêm loét dạ dày, sốt rét (vàng da), đau nửa đầu (nôn), viêm màng não, xuất huyết dưới nhện;
- cho Trẻ quấy khóc: viêm tai giữa, viêm thận – bể thận, nhiễm khuẩn huyết, viêm màng não, tay chân miệng.

### Lô 5 — Đau họng, Đau tai, Mũi, Mắt, Răng miệng (16 bệnh mới)

Vì sao: rất hay gặp, phần lớn lành tính. Lô này giúp app nhận đúng các ca tự chăm sóc, đồng thời không bỏ sót vài bệnh nguy hiểm.

| Bệnh | Tiếng Anh | ICD-10 | Mức | Vì sao chọn |
|---|---|---|---|---|
| Viêm họng do vi rút | Viral pharyngitis | J02.9 | 5 | Nguyên nhân đau họng hay gặp nhất |
| Viêm họng do liên cầu | Streptococcal pharyngitis | J02.0 | 4 | Hay gặp; cần khám |
| Áp xe quanh amidan | Peritonsillar abscess | J36 | 2 | Không được bỏ sót |
| Bạch hầu | Diphtheria | A36 | 2 | Không được bỏ sót; Việt Nam có ổ dịch những năm gần đây |
| Tăng bạch cầu đơn nhân nhiễm khuẩn | Infectious mononucleosis | B27 | 4 | Thanh thiếu niên; có trong 2 bộ ca đã công bố |
| Viêm tai ngoài | Otitis externa | H60 | 4 | Hay gặp |
| Viêm mũi dị ứng | Allergic rhinitis | J30 | 5 | Hay gặp |
| Chảy máu mũi (chảy máu cam) | Epistaxis | R04.0 | 5 | Hay gặp; chảy nhiều là cấp cứu |
| Viêm kết mạc (đau mắt đỏ) | Conjunctivitis | H10 | 5 | Hay gặp; Việt Nam có dịch đau mắt đỏ |
| Viêm loét giác mạc | Keratitis, corneal ulcer | H16 | 3 | Có thể mất thị lực; Việt Nam: chấn thương khi làm nông |
| Xuất huyết dưới kết mạc | Subconjunctival haemorrhage | H11.3 | 5 | Trông đáng sợ nhưng lành tính |
| Lẹo mắt | Stye (hordeolum) | H00.0 | 5 | Hay gặp; có trong 2 bộ ca đã công bố |
| Bong võng mạc | Retinal detachment | H33 | 2 | Không được bỏ sót: nhìn mờ đột ngột |
| Chấn thương mắt, dị vật, bỏng hóa chất ở mắt | Eye injury, chemical burn | S05, T15, T26 | 2 | Không được bỏ sót |
| Sâu răng, viêm tủy, áp xe răng | Dental caries, pulpitis, abscess | K02, K04 | 4 | Rất hay gặp; nhiễm trùng lan rộng là cấp cứu |
| Nhiệt miệng (loét áp tơ) | Aphthous ulcer (canker sore) | K12.0 | 5 | Rất hay gặp; có trong 2 bộ ca đã công bố |

Bệnh đã có cần bổ sung: cảm lạnh, cúm, COVID-19, tay chân miệng (đau họng), viêm tai giữa, viêm xoang, sởi (đỏ mắt). Các bệnh của lô 2 cũng cần thêm: glôcôm, Kawasaki (đỏ mắt).

### Lô 6 — Tiết niệu, sinh dục (12 bệnh mới)

| Bệnh | Tiếng Anh | ICD-10 | Mức | Vì sao chọn |
|---|---|---|---|---|
| Viêm niệu đạo, cổ tử cung do lậu, chlamydia | Gonococcal, chlamydial infection | A54, A56 | 4 | Hay gặp |
| Viêm cầu thận cấp | Acute glomerulonephritis | N00 | 3 | Trẻ em: phù, nước tiểu đỏ |
| Phì đại lành tính tuyến tiền liệt | Benign prostatic hyperplasia | N40 | 4 | Rất hay gặp ở nam cao tuổi |
| Bí tiểu cấp | Acute urinary retention | R33 | 2 | Không được bỏ sót |
| Viêm âm đạo (nấm, vi khuẩn, trùng roi) | Vaginitis | N76.0, B37.3, A59.0 | 5 | Rất hay gặp |
| Dọa sảy thai, sảy thai | Threatened, incomplete miscarriage | O20.0, O03 | 3 | Thai sản |
| Chảy máu ở nửa sau thai kỳ (rau tiền đạo, rau bong non) | Antepartum haemorrhage | O44–O46 | 1 | Không được bỏ sót; thai sản |
| Rong kinh, cường kinh (kể cả do u xơ tử cung) | Heavy menstrual bleeding, fibroids | N92.0, D25 | 4 | Hay gặp |
| Ra máu sau mãn kinh | Postmenopausal bleeding | N95.0 | 4 | Không được bỏ sót: cần khám để loại trừ ung thư |
| Viêm mào tinh hoàn, tinh hoàn | Epididymo-orchitis | N45 | 3 | Hay gặp |
| Thoát vị bẹn (kể cả thoát vị nghẹt) | Inguinal hernia | K40 | 4 | Hay gặp; thoát vị nghẹt là cấp cứu |
| Quai bị | Mumps | B26 | 4 | Việt Nam; gây viêm tinh hoàn |

Bệnh đã có cần bổ sung: viêm bàng quang, viêm thận – bể thận, cơn đau quặn thận, viêm vùng chậu, chửa ngoài tử cung (ra máu âm đạo). Các bệnh của lô 2 cũng cần thêm: xoắn tinh hoàn, xoắn buồng trứng.

### Lô 7 — Co giật, Yếu tê, Lú lẫn, Mệt mỏi, Buồn chán – lo âu, Mất ngủ (15 bệnh mới)

| Bệnh | Tiếng Anh | ICD-10 | Mức | Vì sao chọn |
|---|---|---|---|---|
| Co giật do sốt | Febrile seizure | R56.0 | 3 | Trẻ em; hay gặp |
| Động kinh | Epilepsy | G40 | 3 | Hay gặp; cơn kéo dài là cấp cứu |
| Hội chứng cai rượu (kể cả sảng rượu) | Alcohol withdrawal | F10.3, F10.4 | 2 | Việt Nam: nam giới uống rượu nhiều; co giật, lú lẫn |
| Liệt mặt ngoại biên (liệt Bell) | Bell's palsy | G51.0 | 3 | Hay gặp; cần phân biệt với đột quỵ |
| Hội chứng ống cổ tay | Carpal tunnel syndrome | G56.0 | 4 | Hay gặp |
| Bệnh rễ thần kinh cổ (thoái hóa cột sống cổ) | Cervical radiculopathy | M47.2, M50.1 | 4 | Hay gặp: tê tay, đau vai gáy |
| Hội chứng Guillain–Barré | Guillain–Barré syndrome | G61.0 | 2 | Không được bỏ sót: yếu hai chân tăng dần |
| Sa sút trí tuệ | Dementia | F00–F03 | 4 | Người cao tuổi; lú lẫn tăng dần |
| Chảy máu trong sọ do chấn thương (tụ máu dưới, ngoài màng cứng) | Traumatic intracranial haemorrhage | S06.4–S06.6 | 1 | Không được bỏ sót: người cao tuổi ngã, lú lẫn dần |
| Đái tháo đường típ 2 | Type 2 diabetes | E11 | 4 | Việt Nam: 7,1% người 18–69 tuổi (STEPS 2021) |
| Suy giáp | Hypothyroidism | E03 | 4 | Mệt mỏi, tăng cân, táo bón; có trong bộ ca Levine |
| Ngưng thở khi ngủ | Obstructive sleep apnoea | G47.3 | 4 | Ngáy to, buồn ngủ ban ngày; có trong bộ ca Levine |
| Trầm cảm | Depression | F32–F33 | 4 | Hay gặp; ý nghĩ tự hại là cấp cứu |
| Rối loạn lo âu lan tỏa | Generalised anxiety disorder | F41.1 | 4 | Hay gặp |
| Mất ngủ | Insomnia | F51.0, G47.0 | 5 | Rất hay gặp ở người cao tuổi |

Bệnh đã có cần bổ sung: đột quỵ, viêm màng não, nhiễm khuẩn huyết, tiền sản giật (sản giật), xuất huyết dưới nhện, viêm phổi và viêm thận – bể thận (lú lẫn ở người cao tuổi). Nhiều bệnh của lô 1–3 cũng cần thêm: hạ đường huyết, cơn thiếu máu não thoáng qua, ngộ độc CO, viêm não, nhiễm toan ceton, cơn tăng huyết áp, thiếu máu, cường giáp, lao, suy tim.

### Lô 8 — Đau lưng, Đau khớp, Đau cổ vai gáy, Phù – sưng chân (13 bệnh mới)

| Bệnh | Tiếng Anh | ICD-10 | Mức | Vì sao chọn |
|---|---|---|---|---|
| Đau thắt lưng không đặc hiệu (căng cơ, thoái hóa) | Non-specific low back pain | M54.5 | 5 | Nguyên nhân đau lưng hay gặp nhất |
| Thoát vị đĩa đệm thắt lưng, đau thần kinh tọa | Lumbar disc herniation, sciatica | M51.1, M54.3 | 4 | Hay gặp |
| Hội chứng chùm đuôi ngựa | Cauda equina syndrome | G83.4 | 2 | Không được bỏ sót |
| Xẹp đốt sống do loãng xương | Osteoporotic vertebral fracture | M80 | 4 | Phụ nữ cao tuổi |
| Thoái hóa khớp | Osteoarthritis | M15–M19 | 5 | Rất hay gặp |
| Gút | Gout | M10 | 4 | Hay gặp |
| Viêm khớp nhiễm khuẩn | Septic arthritis | M00 | 2 | Không được bỏ sót |
| Viêm khớp dạng thấp | Rheumatoid arthritis | M05–M06 | 4 | Hay gặp |
| Đau cổ vai gáy (căng cơ, sai tư thế) | Mechanical neck pain | M54.2 | 5 | Rất hay gặp |
| Viêm quanh khớp vai | Frozen shoulder, rotator cuff disorder | M75.0, M75.1 | 4 | Hay gặp |
| Huyết khối tĩnh mạch sâu | Deep vein thrombosis | I80.2 | 3 | Không được bỏ sót: sưng đau một chân |
| Viêm mô tế bào | Cellulitis | L03 | 3 | Hay gặp; sưng đỏ một chân |
| Hội chứng thận hư | Nephrotic syndrome | N04 | 3 | Trẻ em: phù |

Bệnh đã có cần bổ sung: cơn đau quặn thận, viêm thận – bể thận, sốt xuất huyết Dengue (đau khớp), tiền sản giật (phù), viêm màng não (cứng gáy), hội chứng vành cấp (đau vai), đau đầu căng cơ (vai gáy). Các bệnh của lô trước cũng cần thêm: phình động mạch chủ bụng, suy tim, xơ gan.

### Lô 9 — Phát ban, Sưng đỏ da (13 bệnh mới)

| Bệnh | Tiếng Anh | ICD-10 | Mức | Vì sao chọn |
|---|---|---|---|---|
| Thủy đậu | Varicella | B01 | 5 | Hay gặp ở trẻ em; nặng hơn ở người lớn, phụ nữ có thai |
| Mày đay | Urticaria | L50 | 5 | Rất hay gặp |
| Dị ứng thuốc nặng (Stevens–Johnson, hoại tử thượng bì nhiễm độc) | SJS, TEN | L51.1, L51.2 | 1 | Không được bỏ sót |
| Ghẻ | Scabies | B86 | 4 | Hay gặp |
| Viêm da cơ địa (chàm) | Atopic dermatitis | L20 | 5 | Rất hay gặp ở trẻ em |
| Viêm da tiếp xúc (kể cả do kiến ba khoang) | Contact dermatitis, Paederus dermatitis | L23–L25 | 5 | Hay gặp; Việt Nam: kiến ba khoang |
| Nấm da (hắc lào, lang ben) | Dermatophytosis, pityriasis versicolor | B35, B36.0 | 5 | Rất hay gặp |
| Chốc lở | Impetigo | L01 | 4 | Trẻ em |
| Nhọt, áp xe da | Furuncle, skin abscess | L02 | 4 | Hay gặp |
| Mụn trứng cá | Acne | L70 | 5 | Rất hay gặp ở tuổi dậy thì; có trong bộ ca Levine |
| Viêm cân hoại tử (kể cả do vi khuẩn Vibrio từ hải sản, nước lợ) | Necrotising fasciitis | M72.6 | 1 | Không được bỏ sót |
| Bệnh Whitmore | Melioidosis | A24 | 2 | Việt Nam (6101/QĐ-BYT): áp xe, sốt kéo dài, người đái tháo đường |
| Côn trùng đốt, cắn (ong, kiến, rết) | Insect bites and stings | T63.4 | 5 | Hay gặp; bị ong đốt nhiều nốt là cấp cứu |

Bệnh đã có cần bổ sung: sởi, sốt xuất huyết Dengue, tay chân miệng, sốt mò (vết loét), nhiễm khuẩn huyết và viêm màng não (ban không mất khi ấn). Các bệnh của lô trước cũng cần thêm: zona, phản vệ, Kawasaki, viêm mô tế bào.

### Lô 10 — Chấn thương, Vết thương – bỏng – bị cắn, Ngộ độc (12 bệnh mới)

Vì sao để cuối: phần lớn người bị nạn gọi 115 hoặc đến viện ngay. Ở nhóm này, giá trị chính của app là quy tắc sơ cứu và quy tắc an toàn, ít phụ thuộc vào xếp hạng bệnh.

| Bệnh | Tiếng Anh | ICD-10 | Mức | Vì sao chọn |
|---|---|---|---|---|
| Chấn động não | Concussion | S06.0 | 3 | Hay gặp sau va đập đầu |
| Gãy xương tay, chân | Limb fracture | T14.2 (S42–S92) | 3 | Hay gặp |
| Gãy cổ xương đùi | Hip fracture | S72.0 | 2 | Không được bỏ sót: người cao tuổi ngã |
| Bong gân | Sprain | S93.4, S63.5 | 5 | Rất hay gặp |
| Vết thương phần mềm | Open wound | T14.1 | 4 | Hay gặp; cần khâu, tiêm phòng uốn ván |
| Phơi nhiễm dại (chó, mèo cắn, cào) | Rabies exposure | Z20.3, W54 | 3 | Việt Nam (1622/QĐ-BYT): tiêm phòng ngay trong ngày |
| Rắn cắn | Snakebite | T63.0 | 1 | Không được bỏ sót; Việt Nam |
| Bỏng | Burns | T20–T32 | 3 | Hay gặp; bỏng rộng, bỏng điện là cấp cứu |
| Uốn ván | Tetanus | A35 | 1 | Không được bỏ sót; Việt Nam |
| Ngộ độc rượu methanol | Methanol poisoning | T51.1 | 1 | Không được bỏ sót; Việt Nam (3610/QĐ-BYT) |
| Ngộ độc thuốc trừ sâu | Organophosphate poisoning | T60.0 | 1 | Không được bỏ sót; Việt Nam |
| Ngộ độc nấm | Mushroom poisoning | T62.0 | 1 | Không được bỏ sót; Việt Nam: nấm rừng |

Bệnh đã có cần bổ sung: viêm dạ dày ruột cấp (ngộ độc thực phẩm). Các bệnh của lô trước cũng cần thêm: chảy máu trong sọ, ngộ độc CO, phản vệ, côn trùng đốt, say nắng.

### Lô 11 — Nổi cục, nổi hạch (7 bệnh mới)

Chủ dự án thêm triệu chứng này và chọn nêu tên ung thư (mục 7). Vì vậy lô này có 2 bệnh ung thư hay gặp nhất của triệu chứng: ung thư vú và ung thư vòm họng. Nếu chỉ muốn 5 bệnh, có thể bỏ 2 bệnh này và dùng quy tắc "dấu hiệu báo động" (khối cứng, không đau, to dần, kèm sụt cân).

| Bệnh | Tiếng Anh | ICD-10 | Mức | Vì sao chọn |
|---|---|---|---|---|
| Viêm hạch, hạch to do nhiễm trùng | Reactive lymphadenitis | L04, R59 | 5 | Nguyên nhân nổi hạch hay gặp nhất |
| Lao hạch | Tuberculous lymphadenitis | A18.2 | 4 | Việt Nam: gánh nặng lao cao |
| Bướu cổ, nhân tuyến giáp | Goitre, thyroid nodule | E01, E04 | 4 | Hay gặp |
| U mỡ, nang bã dưới da | Lipoma, epidermoid cyst | D17, L72.1 | 5 | Hay gặp, lành tính |
| U vú lành tính (u xơ tuyến vú, nang vú) | Fibroadenoma, breast cyst | D24, N60 | 4 | Nguyên nhân khối u vú hay gặp nhất |
| Ung thư vú | Breast cancer | C50 | 4 | Bác sĩ cần loại trừ: ung thư hay gặp nhất ở phụ nữ |
| Ung thư vòm họng | Nasopharyngeal carcinoma | C11 | 4 | Bác sĩ cần loại trừ: hạch cổ, nghẹt mũi hoặc chảy máu mũi một bên; Việt Nam thuộc vùng hay gặp |

Bệnh đã có cần bổ sung: quai bị (sưng mang tai). Các bệnh của lô trước cũng cần thêm: thoát vị bẹn (khối ở bẹn), tăng bạch cầu đơn nhân (hạch cổ), lao phổi, nhọt và áp xe da. Ung thư vòm họng cũng cần thêm cho triệu chứng "Sổ mũi, nghẹt mũi, chảy máu mũi" và "Đau tai".

## 5. Bệnh dự bị (để sau Giai đoạn 3)

| Bệnh | Vì sao để sau |
|---|---|
| Viêm thanh thiệt | Hiếm từ khi có vắc xin Hib; quy tắc "chảy dãi, thở rít" đã xử trí |
| Bệnh Ménière | Ít gặp hơn; khó phân biệt tại nhà |
| Rubella | Khó phân biệt với sởi tại nhà; đã có vắc xin sởi – rubella |
| Sốt tinh hồng nhiệt | Đã có viêm họng do liên cầu |
| Chắp mắt; tưa lưỡi; hăm tã | Lành tính, dễ nhận ra |
| Hội chứng tan máu – tăng ure máu | Hiếm ở Việt Nam; quy tắc "tiêu chảy có máu, kèm tiểu ít hoặc da xanh" xử trí. Có trong 2 bộ ca đã công bố (mục 8) |
| Viêm tuyến tiền liệt cấp | Ít gặp hơn viêm bàng quang, viêm thận – bể thận |
| Viêm màng ngoài tim | Ít gặp hơn các nguyên nhân đau ngực khác |
| Nút ráy tai; viêm xương chũm | Ít gặp hơn, hoặc ít nguy hiểm |
| Nhiễm khuẩn cột sống (kể cả lao cột sống) | Quy tắc "đau lưng kèm sốt" đã xử trí |
| Nhiễm HIV | Cần tư vấn và xét nghiệm; nhạy cảm; nên chờ bác sĩ |
| U lympho | Ít gặp hơn lao hạch, viêm hạch; quy tắc "hạch to dần, không đau, kèm sốt, sụt cân" xử trí |
| Viêm tuyến vú, áp xe vú | Quy tắc "vú sưng đỏ đau, kèm sốt khi đang cho con bú" xử trí: khám trong 24 giờ |
| Tan máu do thiếu men G6PD | Cần xét nghiệm |
| Đục thủy tinh thể; viêm màng bồ đào | Tiến triển chậm, hoặc ít gặp |
| Viêm ruột mạn (Crohn, viêm loét đại tràng); viêm túi thừa | Ít gặp hơn ở Việt Nam |
| Tràn dịch màng tinh hoàn; giãn tĩnh mạch thừng tinh | Lành tính |
| Tả; chikungunya | Hiếm gặp ở Việt Nam hiện nay |
| Vảy nến; hội chứng chân không yên | Bệnh mạn, ít cần định hướng gấp |
| Rối loạn lưỡng cực; loạn thần | Cần bác sĩ tâm thần thiết kế câu hỏi |
| Quá liều paracetamol | Quy tắc "uống quá liều thuốc" sẽ xử trí: gọi 115 |
| Huyết khối tĩnh mạch não; viêm động mạch tế bào khổng lồ | Hiếm |

**Cố ý không đưa vào:**
- **Mọc răng:** quy sốt hay quấy khóc cho mọc răng dễ làm bỏ sót bệnh thật.
- **Viêm gan B mạn:** sẽ là một câu hỏi bệnh nền, làm tăng khả năng xơ gan, ung thư gan và viêm gan cấp. Bệnh này không đứng riêng trong kết quả.
- **Ngộ độc thực phẩm:** gộp vào viêm dạ dày ruột cấp, thêm câu hỏi "người ăn chung cũng bị".

## 6. Cách làm mỗi lô và chi phí

**Mỗi lô làm giống Giai đoạn 1:**
1. Lượt A và lượt B soạn độc lập từng bệnh từ nguồn.
2. Lượt C đối chiếu từng điểm khác nhau với nguồn gốc và viết 3 ca dev cho mỗi bệnh.
3. Lượt R đối chiếu các quy tắc an toàn mới với văn bản gốc.
4. Một agent độc lập, không xem dữ liệu bệnh, viết ca giữ kín cho các triệu chứng của lô. Mục tiêu đến cuối Giai đoạn 3: ≥ 300 ca giữ kín, trong đó ≥ 150 ca cấp cứu (kế hoạch, mục 7).
5. Chấm trên dev, giữ kín và biến thể nhiễu. Sửa theo quy tắc giữ kín.
6. Đạt chỉ tiêu thì mở các triệu chứng của lô trong app và phát hành (`npm run web:release`). Trước đó, điện thoại vẫn chạy bản phát hành trước.

**Chi phí ước tính,** theo số đo của Giai đoạn 1 (khoảng 270 nghìn token và 20 phút chạy agent cho mỗi bệnh):

| Việc | Token |
|---|---|
| Soạn 144 bệnh mới (lượt A, B, C) | khoảng 39 triệu |
| Quy tắc, nguồn, ca kiểm thử (thêm khoảng 20%, như Giai đoạn 1) | khoảng 8 triệu |
| Bổ sung khoảng 70 cặp "bệnh đã có × triệu chứng mới" | khoảng 3 triệu (ước đoán, chưa đo) |
| **Cộng** | **khoảng 50 triệu** |

- Mỗi lô khoảng 2–5 triệu token.
- Thời gian chạy agent: khoảng 48 giờ, tức khoảng 16 giờ nếu chạy 3 agent song song; chưa tính các vòng chấm và sửa.
- Giai đoạn 1 từng bị ngắt vì giới hạn sử dụng. Mỗi lô được lưu từng bước nên làm tiếp được.

> **Đính chính (31/10/2026):** ước tính trên dựa trên số đo sai đại lượng của Giai đoạn 1 (kích thước ngữ cảnh lúc agent kết thúc). Đo lại: các agent con của lô 1 và lô 2 mỗi lô xử lý khoảng 0,55–0,65 tỷ token; kể cả phiên chính, mỗi lô khoảng 300 USD theo giá API của Opus 5.5. Cấu hình từ lô 3 và cách đo: `docs/handoff.md` mục 5, `docs/worklog.md` mục 31/10/2026.

## 7. Quyết định của chủ dự án (2026-10-25)

1. **Triệu chứng chính:** duyệt 40 triệu chứng như đề xuất, thêm "Nổi cục, nổi hạch", tổng 41 (lô 11).
2. **Ung thư:** đưa 4 bệnh ung thư (đại trực tràng, dạ dày, gan, phổi) vào danh sách kết quả, gắn nhãn "Bác sĩ cần loại trừ". Đề xuất ban đầu là chỉ dùng dấu hiệu báo động.
   - Theo quyết định này, lô 11 thêm ung thư vú và ung thư vòm họng.
   - Câu chữ về ung thư cần bác sĩ duyệt kỹ trước khi công khai.
3. **Sức khỏe tâm thần:** trầm cảm, lo âu, mất ngủ vào lô 7.
   - Câu hỏi về ý nghĩ tự hại dẫn tới khuyên gọi 115 hoặc đến cơ sở y tế ngay.
   - Chưa hiện đường dây hỗ trợ tâm lý nào cho tới khi xác minh được số chính thức.
4. **Quy mô:** giữ đủ danh sách, không cắt. Sau hai quyết định trên, tổng là 177 bệnh.

Hai điểm theo đề xuất mặc định:
- **HIV:** để dự bị.
- **Cơn tăng huyết áp:** đưa vào lô 2, nhưng chỉ xét khi người dùng có số đo huyết áp.

## 8. Đối chiếu với hai bộ ca đã công bố

Kế hoạch dùng bộ ca Semigran 2015 (45 ca) và Levine 2024 (48 ca) để so sánh doctor-v với các nghiên cứu khác. Chỉ tiêu là bệnh đúng có trong cơ sở tri thức ở ≥ 95% số ca. Danh sách chẩn đoán đã được tra từ phụ lục gốc; nguồn và bảng đối chiếu từng ca nằm ở `benchmark-diagnoses.md`.

- Danh sách đầu tiên chỉ phủ 39/45 ca Semigran (87%) và 38/48 ca Levine (79%).
- Vì vậy đã thêm 7 bệnh: suy gan cấp, tăng bạch cầu đơn nhân nhiễm khuẩn, nhiệt miệng, lẹo mắt, mụn trứng cá, suy giáp, ngưng thở khi ngủ. Sau khi thêm, danh sách phủ 43/45 (96%) và 45/48 (94%).
- Các ca còn thiếu đều là bệnh không có hoặc hiếm ở Việt Nam:
  - sốt phát ban Rocky Mountain: khi chuyển thể sẽ thay bằng sốt mò;
  - viêm da do cây thường xuân độc: thay bằng viêm da tiếp xúc;
  - hội chứng tan máu – tăng ure máu: để dự bị.
  
  Tính cả phần chuyển thể, độ phủ là 44/45 và 47/48.
