# Báo cáo kiểm định: bộ `holdout`

- Ngày chạy: 2026-10-25
- Phiên bản dữ liệu: `94cd5ffc57cd` (46 bệnh, 190 dấu hiệu)
- Số ca: 156, trong đó 134 ca được xếp hạng bệnh
- Dừng sớm vì dấu hiệu nguy hiểm: 73 ca (sạch), 348 lượt chạy (nhiễu, 5 hạt giống); các ca này chỉ hiện danh sách "bác sĩ cần loại trừ" (tối đa 3 bệnh), nên top-k chấm theo danh sách đó và ECE không tính
- Hệ số nhiệt: 1; đã hiệu chuẩn: chưa
- "Nhiễu": 15% câu trả lời (trừ màn sàng lọc cấp cứu) bị đổi thành "Không rõ"; mỗi ca chạy với 5 hạt giống cố định (1–5), cộng dồn.

| Chỉ số | Sạch | Nhiễu | Chỉ tiêu | Đạt (sạch) |
|---|---|---|---|---|
| Đứng đầu (top-1) | 76.9% (103/134) | 75.1% (503/670) | ≥ 45.0% | ✅ |
| Trong top 3 | 89.6% (120/134) | 88.8% (595/670) | ≥ 65.0% | ✅ |
| Trong top 10 | 91.8% (123/134) | 92.1% (617/670) | ≥ 85.0% | ✅ |
| Mức xử trí đúng | 78.2% (122/156) | 69.2% (540/780) | — |  |
| Mức xử trí an toàn | 95.5% (149/156) | 95.0% (741/780) | ≥ 97.0% | ❌ |
| Bỏ sót cấp cứu | 6.4% (5/78) | 8.2% (32/390) | ≤ 5.0% | ❌ |
| Khuyên đi khám quá mức | 17.3% (27/156) | 25.8% (201/780) | ≤ 35.0% | ✅ |
| Tự chăm sóc nhận đúng | 72.2% (13/18) | 50.0% (45/90) | ≥ 50.0% | ✅ |
| ECE (các % hiển thị) | 0.063 | 0.045 | ≤ 0.1 | ✅ |
| ECE (bệnh đứng đầu) | 0.092 | 0.071 | — |  |
| Brier | 0.507 | 0.535 | — |  |
| Số câu hỏi (trung vị / P90) | 10 / 22 | 13 / 24 | ≤ 20 | ✅ |

> Chỉ tiêu trong `docs/evaluation.md` dành cho bộ `holdout`. Bệnh nhân mô phỏng trả lời "hoàn hảo" nên kết quả thực tế sẽ thấp hơn.

## Theo triệu chứng chính (chạy sạch)

| Triệu chứng chính | Số ca | Top-3 | Mức xử trí an toàn |
|---|---|---|---|
| Đau bụng | 44 | 35/38 | 44/44 |
| Chóng mặt | 19 | 14/16 | 17/19 |
| Sốt | 45 | 31/38 | 44/45 |
| Đau đầu | 23 | 19/19 | 23/23 |
| Hồi hộp, tim đập nhanh | 10 | 10/10 | 10/10 |
| Ngất, suýt ngất | 15 | 11/13 | 11/15 |

## Ca bị phân loại thấp hơn mức cần (7)

- **h-dizzy-009** — Nữ 80 tuổi, 3 ngày nay từng lúc choáng váng, tối sầm mắt cả khi ngồi, mệt, hụt hơi; máy đo báo mạch 36 lần/phút: cần mức 1, app ra mức 2. Đứng đầu: Ngất phế vị 71.6%; Loạn nhịp tim 13.7%; Thiếu máu thiếu sắt 1.1%.
- **h-dizzy-015** — Nữ 38 tuổi đau nửa đầu từ trẻ, 1 năm nay nhiều cơn chóng mặt quay 2–6 giờ kèm đau đầu một bên, sợ ánh sáng, sợ tiếng ồn: cần mức 4, app ra mức 5. Đứng đầu: Đau nửa đầu (migraine) 97.9%; Chóng mặt tư thế kịch phát lành tính 0.7%; Ngất phế vị 0.2%.
- **h-fever-009** — Nam 16 tuổi, sốt cao 4 ngày, ho, mắt đỏ, chưa mọc ban, bạn cùng lớp bị sởi: cần mức 3, app ra mức 5. Đứng đầu: Cảm lạnh 74.0%; Cúm 14.3%; COVID-19 6.3%.
- **h-syncope-001** — Nữ 24 tuổi sinh con 8 ngày, đêm sưởi than dưới gầm giường trong phòng kín, dậy đi vệ sinh thì ngất; mẹ ngủ cùng phòng nhức đầu: cần mức 1, app ra mức 2. Đứng đầu: Ngất phế vị 59.5%; Ngộ độc khí CO 13.8%; Sốt xuất huyết 4.7%.
- **h-syncope-006** — Nữ 27 tuổi chậm kinh 2 tuần, ra máu nâu, đột ngột đau dữ dội bụng dưới lan lên vai phải rồi ngất; da tái, vã mồ hôi lạnh: cần mức 1, app ra mức 2. Đứng đầu: Ngất phế vị 68.1%; Tiêu chảy cấp 20.7%; Chửa ngoài tử cung 5.2%.
- **h-syncope-008** — Bé gái 12 tuổi sốt cao 4 ngày, sáng nay hết sốt nhưng mệt lả, đau bụng, nôn, chảy máu cam, ngồi dậy suýt ngất, tay chân lạnh: cần mức 1, app ra mức 2. Đứng đầu: Ngất phế vị 68.0%; Tiêu chảy cấp 20.7%; Sốt xuất huyết 6.9%.
- **h-syncope-010** — Nam 15 tuổi đang chạy nước rút đá bóng thì ngã gục, bất tỉnh 30 giây; trước đó tim đập dồn dập; bố đột tử năm 36 tuổi: cần mức 1, app ra mức 2. Đứng đầu: Ngất phế vị 88.7%; Loạn nhịp tim 3.2%; Hạ đường máu 1.3%.

## Ca có bệnh đúng ngoài top 3 (14)

- **h-abd-012** — Nữ 55 tuổi có sỏi mật, không uống rượu, đau dữ dội thượng vị lan ra lưng sau bữa nhiều mỡ: bệnh đúng *Viêm tụy cấp* (hạng —, 4.1%). Đứng đầu: Sỏi thận 24.0%; Viêm túi mật 13.7%; Viêm ruột thừa 11.2%.
- **h-abd-013** — Nam 38 tuổi, đột ngột đau quặn hông lưng trái lan xuống bẹn, tiểu hồng: bệnh đúng *Sỏi thận* (hạng —, 46.7%). Đứng đầu: Sỏi thận 46.7%; Viêm ruột thừa 11.8%; Đau dạ dày 8.9%.
- **h-abd-047** — Bé trai 5 tháng sinh non, khóc không dỗ được, nôn dịch xanh, khối phồng căng cứng ở bẹn phải không đẩy lên được: bệnh đúng *Bán tắc ruột* (hạng —, 0.3%). Đứng đầu: Tiêu chảy cấp 39.5%; Lồng ruột cấp 18.0%; Viêm phổi 7.8%.
- **h-dizzy-004** — Nữ 67 tuổi tăng huyết áp, đái tháo đường, sau cảm chóng mặt quay liên tục từ chiều qua, nôn, vẫn tự đi được: bệnh đúng *Viêm thần kinh tiền đình* (hạng —, 14.7%). Đứng đầu: Ngất phế vị 19.8%; Viêm thần kinh tiền đình 14.7%; Loạn nhịp tim 13.8%.
- **h-dizzy-014** — Bé trai 8 tuổi nôn và tiêu chảy toàn nước từ tối qua sau ăn cỗ, đứng dậy là choáng, khát, mắt trũng, tiểu ít: bệnh đúng *Tiêu chảy cấp* (hạng —, 98.9%). Đứng đầu: Tiêu chảy cấp 98.9%; Ngất phế vị 1.0%; Sốt xuất huyết 0.0%.
- **h-fever-009** — Nam 16 tuổi, sốt cao 4 ngày, ho, mắt đỏ, chưa mọc ban, bạn cùng lớp bị sởi: bệnh đúng *Sởi* (hạng 8, 0.5%). Đứng đầu: Cảm lạnh 74.0%; Cúm 14.3%; COVID-19 6.3%.
- **h-fever-017** — Nam 45 tuổi vừa từ châu Phi về, sốt 2 ngày không thành cơn, tiêu chảy: bệnh đúng *Sốt rét* (hạng 4, 3.1%). Đứng đầu: Cúm 15.2%; Viêm phổi 5.7%; Tiêu chảy cấp 5.3%.
- **h-fever-022** — Nữ 52 tuổi đang hóa trị ung thư, sốt 38,4°C, ớn lạnh, không có triệu chứng khu trú: bệnh đúng *Nhiễm trùng máu* (hạng 7, 1.2%). Đứng đầu: Sốt xuất huyết 16.3%; COVID-19 4.7%; Nhiễm trùng thận 3.0%.
- **h-fever-035** — Nam 30 tuổi ở Đắk Nông, ngủ rừng, sốt 5 ngày, nay vàng mắt, lú lẫn, tiểu ít: bệnh đúng *Sốt rét* (hạng —, 0.1%). Đứng đầu: Cảm lạnh 24.1%; Cúm 23.5%; Sốt xuất huyết 20.3%.
- **h-fever-039** — Bé trai 22 tháng, sốt cao 3 ngày, loét miệng, giật mình liên tục, thở nhanh, vã mồ hôi, chi lạnh: bệnh đúng *Tay chân miệng* (hạng —, 2.0%). Đứng đầu: Cảm lạnh 22.7%; Nhiễm trùng máu 18.2%; Viêm màng não mủ 11.8%.
- **h-fever-040** — Nữ 68 tuổi bị đái tháo đường, sốt 4 ngày, vừa hết sốt thì mệt lả, chân tay lạnh, choáng khi đứng: bệnh đúng *Sốt xuất huyết* (hạng —, 3.5%). Đứng đầu: Nhiễm trùng thận 31.0%; Nhiễm trùng máu 20.5%; Cúm 9.1%.
- **h-fever-046** — Nữ 27 tuổi mang thai 28 tuần, sốt cao đột ngột, rét run, đau nhức người, ho, xưởng có nhiều người bị cúm: bệnh đúng *Cúm* (hạng —, 60.9%). Đứng đầu: Cúm 60.9%; Cảm lạnh 37.3%; COVID-19 1.3%.
- **h-syncope-008** — Bé gái 12 tuổi sốt cao 4 ngày, sáng nay hết sốt nhưng mệt lả, đau bụng, nôn, chảy máu cam, ngồi dậy suýt ngất, tay chân lạnh: bệnh đúng *Sốt xuất huyết* (hạng —, 6.9%). Đứng đầu: Ngất phế vị 68.0%; Tiêu chảy cấp 20.7%; Sốt xuất huyết 6.9%.
- **h-syncope-013** — Nam 70 tuổi tiêm insulin, tối qua ăn rất ít; 5 giờ sáng vợ thấy vã mồ hôi đầm đìa, run, ú ớ nói không rõ, lúc mở mắt lúc lịm đi: bệnh đúng *Hạ đường máu* (hạng —, 3.6%). Đứng đầu: Ngất phế vị 54.7%; Loạn nhịp tim 18.2%; Tiêu chảy cấp 3.6%.

## Ca được khuyên đi khám khẩn hơn mức cần (27)

- **h-abd-013** — Nam 38 tuổi, đột ngột đau quặn hông lưng trái lan xuống bẹn, tiểu hồng: cần mức 3, app ra mức 2 (quy tắc `rf_severe_abdominal_pain`).
- **h-abd-016** — Nữ 26 tuổi mang thai 16 tuần, tiểu buốt, tiểu nhiều lần, nước tiểu hồng: cần mức 3, app ra mức 2 (rule_unknown).
- **h-abd-020** — Bé gái 2 tuổi, đau bụng từng cơn 10 giờ, nôn, li bì giữa các cơn, chưa có phân máu: cần mức 2, app ra mức 1 (quy tắc `rf_altered_consciousness`).
- **h-abd-033** — Nữ 42 tuổi có sỏi túi mật, đau dưới sườn phải 3 giờ sau bữa nhiều mỡ, không sốt: cần mức 3, app ra mức 2 (probability).
- **h-abd-034** — Nữ 30 tuổi, đau quặn bụng dưới trái tái đi tái lại 8 tháng, đi ngoài xong đỡ: cần mức 4, app ra mức 3 (probability).
- **h-abd-035** — Bé trai 6 tuổi, đau quanh rốn từng lúc 2 tháng, 4–5 ngày mới đi ngoài, phân cứng: cần mức 4, app ra mức 2 (probability).
- **h-abd-038** — Nam 20 tuổi, sốt 5 ngày, chán ăn, buồn nôn, nay vàng mắt, đau tức dưới sườn phải: cần mức 3, app ra mức 2 (quy tắc `rf_cholangitis_triad`).
- **h-dizzy-006** — Nữ 79 tuổi rung nhĩ tự bỏ thuốc chống đông, chiều qua 15 phút chòng chành, không ngồi vững, nói ngọng rồi tự hết: cần mức 2, app ra mức 1 (probability).
- **h-dizzy-012** — Nữ 80 tuổi hay uống thuốc xương khớp, 3 ngày chóng mặt, đứng dậy tối sầm mắt, phân đen sệt, không đau bụng, không nôn: cần mức 2, app ra mức 1 (quy tắc `rf_syncope_gi_bleeding`).
- **h-dizzy-014** — Bé trai 8 tuổi nôn và tiêu chảy toàn nước từ tối qua sau ăn cỗ, đứng dậy là choáng, khát, mắt trũng, tiểu ít: cần mức 3, app ra mức 2 (quy tắc `rf_fainting_with_pain`).
- **h-dizzy-017** — Nữ 45 tuổi, nửa năm 4 cơn chóng mặt quay 2–4 giờ kèm ù tai, nghe kém, đầy tức tai trái, nôn; hết cơn tai nghe gần như cũ: cần mức 4, app ra mức 3 (probability).
- **h-dizzy-018** — Nam 60 tuổi mới uống amlodipine 10 ngày, mỗi sáng lâng lâng vài giờ sau uống thuốc, nhức đầu, đỏ bừng mặt; huyết áp bình thường: cần mức 4, app ra mức 2 (probability).
- **h-dizzy-019** — Nam 50 tuổi phụ hồ làm ngoài nắng 39°C, chóng mặt, đau đầu, vã mồ hôi, chuột rút; nghỉ chỗ mát, uống oresol 30 phút thì đỡ hẳn: cần mức 5, app ra mức 2 (probability).
- **h-fever-046** — Nữ 27 tuổi mang thai 28 tuần, sốt cao đột ngột, rét run, đau nhức người, ho, xưởng có nhiều người bị cúm: cần mức 3, app ra mức 2 (quy tắc `rf_pregnancy_hypertension_signs`).
- **h-fever-049** — Bé trai 11 tháng, sốt cao 3 ngày vẫn chơi, bú tốt, hết sốt thì nổi ban hồng ấn mất màu: cần mức 5, app ra mức 3 (probability).
- **h-fever-051** — Nam 49 tuổi hút thuốc, ho khạc đờm 6 tuần, sốt nhẹ về chiều, đổ mồ hôi đêm, sụt 5 kg: cần mức 4, app ra mức 3 (quy tắc `rf_prolonged_fever`).
- **h-head-001** — Nữ 32 tuổi, sau cảm 1 tuần, nặng trán và má khi cúi, nghẹt mũi, nước mũi vàng: cần mức 5, app ra mức 4 (probability).
- **h-head-008** — Nam 14 tuổi, chớp sáng trước mắt 20 phút rồi đau giật hai bên trán, giống các cơn trước: cần mức 5, app ra mức 3 (rule_unknown).
- **h-head-010** — Nữ 48 tuổi, 2 ngày trước đột ngột đau đầu rất mạnh, nay còn đau, gáy cứng, chói mắt: cần mức 2, app ra mức 1 (quy tắc `rf_thunderclap_headache`).
- **h-head-016** — Nữ 67 tuổi, đột ngột đau nhức quanh mắt trái, mắt đỏ, nhìn mờ, thấy quầng sáng, nôn: cần mức 2, app ra mức 1 (quy tắc `rf_befast_high_risk`).
- **h-palp-001** — Nam 55 tuổi tiêm insulin, mới tăng liều, bỏ bữa trưa thì hồi hộp, tim đập nhanh, run, vã mồ hôi; đường huyết 3,1 mmol/L, uống nước đường đỡ hẳn: cần mức 4, app ra mức 3 (quy tắc `rf_hypoglycemia_suspected`).
- **h-palp-002** — Nam 71 tuổi hay uống thuốc giảm đau xương khớp, 2 tháng nay tim đập nhanh, hụt hơi khi đi bộ, xanh xao, sụt 4 kg: cần mức 4, app ra mức 3 (rule_unknown).
- **h-palp-007** — Nữ 33 tuổi mang thai 32 tuần, 2 ngày tim đập nhanh cả khi nghỉ, hụt hơi, đau ngực khi hít sâu, bắp chân trái sưng đau sau chuyến xe 12 giờ: cần mức 2, app ra mức 1 (quy tắc `rf_breathless_leg_swelling`).
- **h-palp-009** — Nam 22 tuổi, tối qua sau 2 ly cà phê đậm để thức khuya, tim hẫng nhịp vài lần trong nửa giờ, sáng nay hết, vẫn khỏe: cần mức 5, app ra mức 4 (probability).
- **h-syncope-002** — Nữ 74 tuổi uống gliclazide, 1 tuần ăn rất ít vì viêm họng, sáng nay lả đi trên ghế, vã mồ hôi, nói lẫn lộn; uống sữa đường thì tỉnh: cần mức 2, app ra mức 1 (quy tắc `rf_altered_consciousness`).
- **h-syncope-014** — Nam 76 tuổi được nói hẹp van tim nhưng không tái khám, leo cầu thang thì tức ngực, choáng, tối sầm mắt, khuỵu xuống; hay hụt hơi khi gắng sức: cần mức 2, app ra mức 1 (quy tắc `rf_chest_pain_with_features`).
- **h-syncope-015** — Nam 17 tuổi thức khuya ôn thi, đang ngồi ăn thì kêu lên, ngã, co cứng rồi giật cả người 1–2 phút, cắn lưỡi, tè ra quần; gia đình gọi là ngất: cần mức 3, app ra mức 1 (quy tắc `rf_altered_consciousness`).

## Lý do dừng hỏi

- confident: 81
- emergency: 73
- max_questions: 2
