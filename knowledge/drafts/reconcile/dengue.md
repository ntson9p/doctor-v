# Biên bản đối chiếu: Sốt xuất huyết Dengue (`dengue`)

- Người đối chiếu: `agent:pass-c` (lô 2), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/dengue.yaml`, `knowledge/drafts/pass-b/dengue.yaml`.
- Bản chính thức: `knowledge/conditions/dengue.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 32, lượt B 24, chung 22; bản chính thức 29 liên kết.
- Nguồn đã mở lại: 2760/QĐ-BYT (PDF ký số trên cổng Sở Y tế Lai Châu: mục I, II.1–II.3, III.2, IV.A, Phụ lục 2, 21, 22, 25); Phuong 2006, Low 2011 (EDEN), Lee 2017, Trung 2012, Halsey 2012, Le-Viet 2019, Hoang 2025 (toàn văn qua API Europe PMC); Rosenberger 2023 (tóm tắt); trang CDC Clinical Features of Dengue.
- Đổi ID nguồn: `phuong-2006-dengue-auf-vietnam` → `phuong-bmcinfectdis-2006`; `low-2011-eden-dengue-adults` → `low-plosntd-2011`; `lee-2017-dengue-seasonality-vietnam` → `lee-bmcinfectdis-2017` (cùng bài với bản của lượt A).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `codes.icd10_verified` | true | false | **false** | Không đối chiếu được bảng ICD-10 của Bộ Y tế. A97 là mã của bản ICD-10 WHO 2016; báo cáo giám sát theo Thông tư 54 dùng A90/A91 | Hoang 2025 bảng 1 |
| `specialties` | truyền nhiễm, đa khoa | truyền nhiễm | **Giữ đa khoa** | Phần lớn ca theo dõi ngoại trú ở y tế cơ sở | 2760 mục IV.A |
| Prior `headache`: trẻ 2 tháng–5 tuổi | P4 (mặc định) | P5 | **P5** | Lệch một mức, đều ước lượng; trẻ nhỏ hiếm khi được chọn triệu chứng chính đau đầu; nhất quán với prior 'Sốt' (hạ một mức ở trẻ dưới 5 tuổi) | — |
| Prior `abdominal_pain` | P4; từ 65 tuổi P5 | P5; 5–17 tuổi P4 | **P4; dưới 5 tuổi và từ 65 tuổi P5** | Lệch một mức, đều ước lượng; chọn mức cao hơn vì đau bụng nhiều là dấu hiệu cảnh báo, người ở giai đoạn nguy hiểm có thể chọn 'Đau bụng'; trẻ em gặp nhiều nhất | 2760 mục II.2, Phụ lục 22 |
| `prior_modifiers` | Tháng 8–11 × 1,5; tháng 2–4 × 0,5; Bắc × 0,5; Trung × 1,2; Nam × 1,3; Bắc + tháng 8–11 × 1,5; Bắc + tháng 1, 5, 6 × 0,3; Bắc + tháng 2–4 × 0,15 | Bắc × 0,5; Bắc + 8–11 × 2,5; Bắc + 1–6 × 0,2; Trung + 7–11 × 1,4; Trung + 1–5 × 0,6; Nam + 8–12 × 1,4; Nam + 2–5 × 0,5 | **Cách của lượt A** | Lượt C quy đổi bảng 2 của Lee 2017 sang hệ số so với trung bình năm: tháng 8–11 gấp 1,2–1,8 lần ở Khánh Hòa, TP.HCM, An Giang và 2,3 lần ở Hà Nội; tháng 2–4 bằng 0,3–0,7 lần (Hà Nội 0,06–0,08). Hệ số tháng chung của A áp dụng được cả khi không biết vùng; cộng với hệ số riêng cho miền Bắc thì khớp số liệu Hà Nội (tháng 8–11: 0,5 × 1,5 × 1,5; tháng 2–4: 0,5 × 0,5 × 0,15). Hệ số vùng của A cho trung bình cả nước xấp xỉ 1 theo dân số. Cách của B không điều chỉnh mùa khi thiếu thông tin vùng | Lee 2017 bảng 2; 2760 mục I, Phụ lục 22 |
| `fever` | almost_always | very_frequent | **very_frequent** | Lệch một mức, cùng nguồn. Người đến vì đau bụng ở giai đoạn nguy hiểm có thể đã hết sốt; mức thấp hơn tránh loại gần hết khả năng sốt xuất huyết khi trả lời 'không sốt' (an toàn hơn) | 2760 mục II.2 |
| `fever_duration` | 0,33/0,47/0,15/0,05 | 0,40/0,45/0,14/0,01 | **0,38/0,46/0,14/0,02** | Theo ghi chú của đợt: 2760 định nghĩa sốt không quá 7 ngày, nên 'hơn 7 ngày' rất thấp; các lựa chọn khác lấy trung bình | 2760 Phụ lục 2 |
| `fever_max_temp` | 0,07/0,28/0,65 | 0,08/0,40/0,52 | **0,07/0,34/0,59** | Trung bình | 2760 Phụ lục 25; Le-Viet; Low |
| `retro_orbital_pain` | frequent | occasional | **occasional** | Lệch một mức. Nguồn của B (người lớn khám ban đầu ở châu Á, 26%) sát người dùng hơn nguồn của A (ngoại trú Nam Mỹ, 68%). Tỷ lệ nền 5% của danh mục đã thấp hơn thực tế (15,9% ở bệnh sốt khác) | Low 2011 bảng 3, 7; Halsey 2012 |
| `fatigue` | very_frequent | không liên kết | **Bỏ** | Mệt mỏi gặp ở hầu hết bệnh sốt; nguồn của A (90–96%) không có nhóm so sánh; EDEN: ngủ gà 59% so với 52%. Liên kết sẽ làm câu trả lời 'không mệt' giảm 2,5 lần khả năng dengue mà không có căn cứ phân biệt | Trung 2012; Halsey 2012; Low 2011 |
| `diarrhea` | occasional | không liên kết | **Bỏ** | Ở tuyến cơ sở Việt Nam, tiêu chảy gặp ở dengue ít hơn bệnh sốt khác (4,5% so với 7,6%); mức occasional (20%) so với tỷ lệ nền 5% sẽ làm tiêu chảy tăng dengue 4 lần | Phuong 2006 bảng 2 |
| `cough` | occasional | không liên kết | **Giữ, trung tính** | Mức occasional bằng tỷ lệ nền 0,2; số liệu 11–31% (Bình Thuận: không khác bệnh sốt khác; IDAMS: ho gợi ý bệnh khác) | Phuong; Le-Viet; Rosenberger |
| `runny_nose` | occasional | không liên kết | **Giữ, trung tính** | 15,3% so với 25,5% ở bệnh sốt khác; thang 6 mức không có mức giữa 2,5% và 20% | Phuong; Rosenberger |
| `sore_throat` | occasional | không liên kết | **Giữ, trung tính** | 40% ở cả dengue và bệnh sốt khác: không phân biệt; để bằng tỷ lệ nền | Phuong; Le-Viet |
| `black_stool` | rare | không liên kết | **Bỏ** | rare (2,5%) cao hơn tỷ lệ nền 1% (cảnh báo của bộ kiểm tra); dấu hiệu đã có quy tắc mức 2 và nằm trong `warning_signs` | 2760 Phụ lục 2 |
| `drowsy_hard_to_wake` | rare | không liên kết | **Bỏ** | Như trên | Halsey; 2760 |
| `cold_hands_feet` | rare | không liên kết | **Bỏ** | Như trên | 2760 |
| `fever_cyclic` | rare | không liên kết | **Giữ** | Sốt dengue liên tục (có khi hai pha), không thành cơn cách ngày; rare thấp hơn tỷ lệ nền 5% nên giúp phân biệt với sốt rét | 2760 mục II.1.1; CDC |
| `dengue_nearby` | occasional | frequent | **occasional** | Lệch một mức, đều không có số liệu. Người bệnh thường không biết ca bệnh quanh nhà, và mùa, vùng dịch đã được tính bằng hệ số prior (tránh đếm trùng) | 2760 Phụ lục 2 |
| `symptoms_worsen_after_improving` | không liên kết | occasional | **Giữ** | Có trong dấu hiệu cần khám lại ngay | 2760 mục IV.A.3.b |
| `abd_pain_location` | 0,30/0,25/0,04/0,10/0,05/0,03/0,03/0,20 | 0,30/0,30/0,04/0,10/0,04/0,03/0,02/0,17 | **0,30/0,27/0,04/0,10/0,05/0,03/0,03/0,18** | TVD 0,05; trung bình | 2760 mục II.2 |
| `abd_pain_duration` | không khai báo | 0,10/0,30/0,45/0,14/0,01 | **Giữ** | Đau trên 2 tuần gần như không phải dengue | 2760 mục II.2 |
| `headache_location` | 0,05/0,15/0,45/0,05/0,30 | 0,05/0,15/0,40/0,10/0,30 | **0,05/0,15/0,43/0,07/0,30** | Trung bình | 2760; CDC |
| `headache_severity` | 0,15/0,45/0,40 | không khai báo | **Giữ** | CDC: đau đầu nhiều | CDC |
| `headache_course` | 0,75/0,20/0,05 | 0,85/0,13/0,02 | **0,80/0,17/0,03** | Trung bình | 2760 |
| `headache_duration` | 0,07/0,58/0,35 | 0,05/0,70/0,25 | **0,06/0,64/0,30** | Trung bình | 2760 |
| `warning_signs` | 13 mục | 11 mục | **Hợp (14 mục)** | Mọi mục đều có trong dấu hiệu cảnh báo (Phụ lục 2) hoặc dấu hiệu cần khám lại ngay (mục IV.A.3.b) của 2760; danh sách này hiện khi xác suất dengue từ 10% | 2760 |
| `summary_vi`, `self_care_vi`, `see_doctor_vi` | | | Gộp | Giữ lời khuyên không tự dùng aspirin, ibuprofen; tránh đồ màu đỏ, nâu; uống oresol (2760 mục IV.A.1–2) | 2760 |

Giống nhau ở hai lượt: tên, mã A97, MONDO, `urgency` 3, `cant_miss` false, prior 'Sốt' (P2; dưới 2 tháng P4; 2 tháng–5 tuổi và từ 65 tuổi P3), prior 'Đau đầu' mặc định P4, hệ số miền Bắc × 0,5, các liên kết đau đầu, đau cơ, đau khớp, chán ăn, nôn, nôn liên tục, đau bụng, đau bụng dữ dội, phát ban, chấm xuất huyết, chảy máu chân răng, tiểu ít, khó thở.

Lưu ý về tỷ lệ nền mới khi sốt: đau đầu (0,5), đau cơ (0,4), chán ăn (0,4) vẫn thấp hơn tỷ lệ ở bệnh sốt khác trong nguồn (Phuong: 96%, 59%, 84%; EDEN: 69%, 64%, 60%; Le-Viet: 81%, 44%, 55%). Vì vậy các liên kết đau đầu, chán ăn của dengue (very_frequent) làm tăng khả năng dengue nhiều hơn thực tế. Đau khớp (occasional, tỷ lệ nền 0,2) nay trung tính, phù hợp với số liệu Việt Nam.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P2 cho 'Sốt' (trung bình cả nước, cả năm) và mức hạ cho trẻ dưới 5 tuổi, người từ 65 tuổi; prior P4 cho 'Đau đầu', 'Đau bụng'.
- Độ lớn hệ số vùng (Bắc 0,5; Trung 1,2; Nam 1,3) và hệ số riêng miền Bắc; số liệu 1994–2013, chưa có Tây Nguyên, Bắc Trung Bộ và các đợt dịch lớn ở Hà Nội sau 2013.
- Tần suất nôn liên tục, đau bụng dữ dội, tiểu ít, gần nhà có người bệnh, đã đỡ rồi lại nặng lên (occasional); chấm xuất huyết trong số người có ban (frequent).
- `fever_duration` 'hơn 7 ngày' 0,02; mọi phân bố vị trí, thời gian đau bụng, đau đầu.

## 3. Ca phát triển

| Ca | Kết quả sạch | Ghi chú |
|---|---|---|
| d-dengue-1 (nữ 24 tuổi, TP.HCM, ngày 3, đau sau hốc mắt) | Hạng 1 (94%), mức 3/3 | |
| d-dengue-2 (bé 4 tuổi, Cần Thơ, chỉ chán ăn, nôn 1 lần, đau bụng nhẹ) | Hạng 1 (44%), mức 3/3 | Phiên chạm trần 30 câu: sau khi mức xử trí ổn định, bộ suy luận còn hỏi lần lượt các dấu hiệu của quy tắc không liên quan (đau ngực, sưng sau tai…) |
| d-dengue-3 (nữ 27 tuổi, Đà Nẵng, triệu chứng chính đau bụng, ngày sốt thứ 5, tiểu ít) | Hạng 1 (81%), **mức 3, đúng là 2** | **Bỏ sót cấp cứu.** Quy tắc giai đoạn nguy hiểm (rf_fever_critical_phase_signs, rf_fever_vomiting_critical_phase) cần biết số ngày sốt, nhưng với triệu chứng chính 'Đau bụng' câu này không bắt buộc. Mỗi câu riêng lẻ (số ngày sốt, tiểu ít) không đổi được mức xử trí nên bộ suy luận không hỏi, rồi dừng khi 3 bệnh đầu chiếm trên 80%. Không sửa tham số bệnh vì đây là lỗ hổng cấu hình (xem mục 4). Danh sách 'Đi cấp cứu ngay nếu…' vẫn có 'tiểu ít' |

## 4. Đề xuất cho người bảo trì

- Khi có sốt ở bất kỳ triệu chứng chính nào (đau bụng, đau đầu), hỏi bắt buộc `fever_duration`, để các quy tắc giai đoạn nguy hiểm của sốt xuất huyết chạy được (ca d-dengue-3).
- Nâng tỷ lệ nền khi sốt: đau đầu khoảng 0,7; chán ăn khoảng 0,6–0,7; đau cơ khoảng 0,55; đau sau hốc mắt khoảng 0,15 (Phuong 2006 bảng 2, Low 2011 bảng 3, Le-Viet 2019 bảng 1).
- Hệ số làm trơn của dấu hiệu nhiều lựa chọn (0,02) làm 'sốt hơn 7 ngày' chỉ giảm dengue khoảng 3 lần dù 2760 định nghĩa sốt không quá 7 ngày; cân nhắc giảm.
