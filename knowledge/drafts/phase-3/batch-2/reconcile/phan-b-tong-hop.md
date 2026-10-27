# Lượt C, Giai đoạn 3 lô 2, phần b (sốt, đau đầu, nắng nóng): báo cáo chung

- Người thực hiện: `agent:pass-c`, 27/10/2026. Không đọc bộ ca giữ kín. Không chạy git.
- Bệnh mới: encephalitis, leptospirosis, kawasaki_disease, heat_exhaustion, heat_stroke, acute_angle_closure_glaucoma, hypertensive_crisis. Bản mở rộng: migraine, measles. Biên bản từng bệnh nằm cùng thư mục.
- Mọi bản chính thức để `source_checked`: mọi nguồn được trích đã mở lại (Europe PMC, PDF của Bộ Y tế, trang NHS, MSD, CDC).

## 1. Nguồn

- Chuyển 35 nguồn từ bản nháp vào `knowledge/sources/`, mỗi nguồn ghi `verified_by: agent:pass-c` và điều đã đối chiếu.
- Mở lại: 3312/QĐ-BYT (2015) bài Viêm não (tr. 489–491), bài Kawasaki (tr. 311–313), tên "hội chứng hạch-da-niêm mạc" (tr. 716); 5642/QĐ-BYT bài Viêm não do Herpes (tr. 12–14); 40/QĐ-BYT bài Glôcôm góc đóng (tr. 77–79); 3192/QĐ-BYT; ICHD-3 mục 10.3 và 11.3.1; Kelman 2005.
- Chỉ đọc được tóm tắt (ghi rõ trong sổ): Kim 2020, Doan 2022, Seah 1997, Lai 2001, Zampaglione 1996, Kakoti 2013. Lai 2001: bản PDF trên hkmj.org không tải được nên không dùng bảng triệu chứng lượt B dẫn.
- Không dùng: CDC Yellow Book (trùng trang CDC cho nhân viên y tế), Ha 2019 (Park 2019 đủ cho phân bố tuổi, giới).
- Sửa một ghi chú sai của lượt A: OR 5,29 trong Haake 2015 là nguy cơ khi sống cùng nhà với người bệnh, không phải tiếp xúc chuột.
- Sửa URL của 3192/QĐ-BYT (thừa dấu "/").
- Dùng 2 lần WebSearch: mã ICD-10 T67 (xác nhận "heatstroke and sunstroke" cùng mã T67.0; chưa có bản tiếng Việt) và "thiên đầu thống" (mở bài Đại Đoàn Kết 9/4/2018).

## 2. Tên bệnh

- "Thiên đầu thống": bỏ khỏi đau nửa đầu; thêm vào glôcôm góc đóng cơn cấp (tên dân gian của glôcôm, nguồn báo chí; cần bác sĩ xác nhận).
- "Say nắng": ICD-10 xếp sunstroke cùng mã với sốc nhiệt (T67.0). Kiệt sức do nóng: "Say nắng, say nóng thể nhẹ"; sốc nhiệt: "Say nắng, say nóng thể nặng". Bỏ "Đột quỵ do nóng" (dễ hiểu nhầm là đột quỵ não).

## 3. Ca dev

### 3.1 Ca d-from-h-fever-038

- Đọc lại: bé 7 tuổi ở Bắc Giang, tháng 6, gần chuồng lợn và ruộng lúa; sốt cao, đau đầu, nôn, co giật, li bì, lú lẫn, cứng gáy; phần nguồn của ca ghi "viêm não cấp ở trẻ (nghĩ viêm não Nhật Bản ở miền Bắc mùa hè)". Ca mô tả đúng viêm não: đổi bệnh đúng từ "other" thành encephalitis (giữ acceptable rỗng, mức 1).
- Kết quả: viêm não đứng đầu (68%), đứng đầu danh sách "Bác sĩ cần loại trừ", mức 1.

### 3.2 Ca d-stroke-3

- Nam 72 tuổi, mất thị lực nửa trái, đau đầu vùng gáy. Mức 1 giữ nguyên; danh sách cần loại trừ đổi từ [đột quỵ, xuất huyết dưới nhện] thành [glôcôm góc đóng, đột quỵ, xuất huyết dưới nhện]: đột quỵ từ hạng 1 xuống hạng 2.
- Nguyên nhân: phiên dừng ngay sau nhóm dấu hiệu nguy hiểm của Đau đầu (rf_befast_high_risk mức 1), nên câu "đau nhức một bên mắt" (dấu hiệu phân biệt chính) không được hỏi. Đột quỵ bị giảm khả năng vì không có méo miệng, yếu tay chân, mất thăng bằng; glôcôm không bị giảm vì chưa có câu nào liên quan. Cả hai cùng liên kết mất thị lực ở mức occasional (hai lượt trùng).
- Lượt C không sửa: hai lượt cùng chọn mức này, và mất thị lực đột ngột kèm đau đầu ở người cao tuổi thì glôcôm cấp đúng là bệnh cần loại trừ. Đề xuất cho người bảo trì: trong pha `escalation`, hỏi thêm `eye_pain_one_side` khi rf_vision_loss thỏa; hoặc ưu tiên bệnh do quy tắc nêu tên trong danh sách cần loại trừ.

### 3.3 Ca mới (23 ca)

| Ca | Mức đúng | App (sạch) | Hạng | Ghi chú |
|---|---|---|---|---|
| d-encephalitis-1, -2, -3 | 1 | 1 | 1 | |
| d-leptospirosis-1, -3 | 3 | 3 | 1 | |
| d-leptospirosis-2 | 2 | 2 | 2 | Sốt xuất huyết đứng đầu (giai đoạn nguy hiểm); 1/5 lần nhiễu ra mức 3 |
| d-kawasaki-disease-1, -3 | 3 | 3 | 1 | |
| d-kawasaki-disease-2 | 3 | 3 | 14 | Nhũ nhi, thể không điển hình: câu đỏ mắt, môi đỏ, sẹo BCG không được hỏi vì prior thấp và chưa có ban |
| d-heat-exhaustion-1 | 5 | 4 | 1 | Chạm giới hạn 30 câu (chốt an toàn mức 4) |
| d-heat-exhaustion-2 | 4 | 4 | 1 (chấp nhận ngất phản xạ) | Bản đầu có đau đầu, trùng quy tắc ngất kèm đau đầu (mức 2, ESC 2018) nên đã bỏ; mức 4 theo quy ước ngất lần đầu của bộ dev |
| d-heat-exhaustion-3 | 5 | 5 | 1 | Tách đúng với sốc nhiệt |
| d-heat-stroke-1 | 1 | 1 | 3 | Câu phơi nắng chưa được hỏi khi dừng cấp cứu |
| d-heat-stroke-2 | 1 | 1 | 2 | Nhiễm khuẩn huyết đứng đầu |
| d-heat-stroke-3 | 1 | 1 | ngoài danh sách | Đau đầu: phiên dừng ở lú lẫn trước khi hỏi sốt, phơi nắng |
| d-acute-angle-closure-glaucoma-1, -2, -3 | 2 | 2 | 1 | |
| d-hypertensive-crisis-1 | 3 | 3 | 2 | Đau đầu căng thẳng đứng đầu |
| d-hypertensive-crisis-2 | 3 | 3 | 2 | Bản đầu dùng Chóng mặt; người 66 tuổi tăng huyết áp chóng mặt đúng là mức 2 theo quy tắc (rf_acute_vertigo_vascular_risk) hoặc khả năng cơn thiếu máu não, nên đổi sang Đau đầu |
| d-hypertensive-crisis-3 | 2 | 1 | 1 | Xuất huyết dưới nhện 26% đưa lên mức 1; câu nhìn mờ không được hỏi nên rf_extreme_bp_with_symptoms không thỏa |
| d-migraine-headache-1 | 5 | 5 | 1 | |
| d-measles-fever-1 | 3 | 3 | 1 | |

Tổng 23 ca mới (sạch): hạng 1: 16; trong 3: 21; bỏ sót cấp cứu 0/11; khuyên quá mức 2. Nhiễu: bỏ sót 1/55 (d-leptospirosis-2), quá mức 18,3%.

## 4. Kiểm định bộ dev

Trước (170 ca, c234131faf16): sạch top1 79,4%, top3 95,8%, an toàn 99,4%, bỏ sót 0/75, quá mức 6,5%; nhiễu bỏ sót 12/375, quá mức 18,7%.

| Bản | Ca | Sạch | Nhiễu |
|---|---|---|---|
| Chỉ phần b (bản gốc + 9 bệnh của phần b + 23 ca mới + sửa d-from-h-fever-038) | 193 | top1 78,8%, top3 95,2%, top10 97,9%, an toàn 99,5%, bỏ sót 0/86, quá mức 6,7% | bỏ sót 13/430, quá mức 18,4% |
| Riêng 170 ca cũ, chỉ phần b | 170 | top1 80,1% (133/166), top3 95,8% (159/166), bỏ sót 0/75, quá mức 6,5% | bỏ sót 12/375, quá mức 18,5% |
| Cả hai phần (repo hiện tại) | 217 | top1 74,8%, top3 93,5%, top10 96,7%, an toàn 99,5%, bỏ sót 0/106, quá mức 7,4% | bỏ sót 12/530, quá mức 18,2% |

Thay đổi ở ca cũ do phần b (chạy sạch):
- Tốt hơn: d-from-h-fever-009 (sởi hạng 2 → 1, do đổi tần suất phát ban), d-from-h-fever-038 (nay có bệnh đúng, hạng 1), d-scrub-typhus-2 (hạng 2 → 1: Leptospira chia bớt khả năng của sốt xuất huyết), d-malaria-2 (hạng 8 → 6).
- Kém hơn: d-stroke-3 (hạng 1 → 2, mục 3.2); d-typhoid-fever-2 (11 → 12) và -3 (7 → 8): Leptospira chen trên thương hàn; cả hai vốn ngoài top 3.
- Danh sách cần loại trừ đổi, mức không đổi: d-stroke-1 (thêm viêm não ở cuối), d-from-h-head-015 (ngộ độc khí CO, bệnh đúng "other": viêm não lên đầu danh sách vì đau đầu kèm lú lẫn), d-acute-sinusitis-3 (danh sách ẩn thêm sốt xuất huyết; 23 → 27 câu).
- Không ca cũ nào đổi mức xử trí khi chạy sạch. Khi chạy nhiễu: số ca cấp cứu bị bỏ sót của 170 ca cũ giữ 12; vài lần chạy đổi mức (tốt hơn: d-anemia-2, d-measles-2, d-migraine-1, d-reflex-orthostatic-syncope-1, -2; kém hơn: d-acute-gastroenteritis-dizziness-1, d-acute-otitis-media-3 mỗi ca một lần).
- Thay đổi khi ghép với phần a (không do phần b): ví dụ d-primary-dysmenorrhea-3 (4 → 2), d-renal-colic-3 (3 → 2), d-malaria-2 (6 → 10), d-from-h-syncope-017 (nay có bệnh đúng); ca mới của phần b cho kết quả như nhau khi chạy riêng và chạy chung.

## 5. Đề xuất cho người bảo trì (lượt C không sửa)

1. `conditions` của quy tắc: encephalitis → rf_altered_consciousness, rf_new_seizure; heat_stroke → rf_heat_stroke_signs, rf_altered_consciousness; acute_angle_closure_glaucoma → rf_acute_glaucoma_signs, rf_vision_loss; leptospirosis → rf_lepto_severe; kawasaki_disease → rf_kawasaki_signs; hypertensive_crisis → rf_extreme_bp_with_symptoms.
2. `cant_miss` của triệu chứng chính: Sốt thêm encephalitis, heat_stroke; Đau đầu thêm encephalitis, heat_stroke, acute_angle_closure_glaucoma; Chóng mặt, Ngất thêm heat_stroke.
3. Câu phơi nắng hỏi muộn (sốc nhiệt vắng mặt trong danh sách cần loại trừ: d-heat-stroke-1, -3): hỏi `heat_exposure` trong pha escalation khi rf_heat_stroke_signs có thể thỏa, hoặc đưa vào `red_flags` của Ngất, Chóng mặt; đưa `fever_exposures` vào `intake` của Chóng mặt, Ngất khi có sốt.
4. Câu đau một bên mắt không được hỏi khi phiên dừng ở dấu hiệu nguy hiểm khác (d-stroke-3).
5. Bệnh Kawasaki ở nhũ nhi (d-kawasaki-disease-2): khi trẻ dưới 5 tuổi sốt từ 3 ngày, các câu của rf_kawasaki_signs không được hỏi vì mức đã là 3; cân nhắc hỏi đỏ mắt, môi đỏ trong nhóm câu sốt của trẻ nhỏ.
6. Phạm vi tuổi (applicability) của Kawasaki loại thiếu niên dù không bất khả về sinh học (kb-guide 4.6): cần quyết định.
7. Dấu hiệu đề xuất chưa thêm (để không lệch bộ ca giữ kín): `behavior_change_new` (viêm não), `hot_dry_skin`, `not_better_after_cooling` (sốc nhiệt).
8. `npm run kb:check`: 0 lỗi; 13 cảnh báo đều cũ, không thuộc tệp của phần b.
