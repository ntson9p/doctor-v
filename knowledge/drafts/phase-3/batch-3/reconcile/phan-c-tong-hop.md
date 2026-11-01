# Lượt C, Giai đoạn 3 lô 3, phần c (đau ngực): báo cáo chung

- Người thực hiện: `agent:pass-c`, 31/10/2026. Không đọc bộ ca giữ kín. Không chạy git.
- Bệnh mới: pneumothorax, aortic_dissection, gerd, chest_wall_pain, herpes_zoster. Bản mở rộng: acute_coronary_syndrome, pulmonary_embolism, cardiac_arrhythmia, anemia. Biên bản từng bệnh nằm cùng thư mục.
- Cả 9 bản chính thức để `source_checked`: mọi nguồn được trích đều đã xác minh.
- `npm run kb:check`: 0 lỗi; không còn cảnh báo nào trong các tệp của phần c (15 cảnh báo còn lại thuộc tệp khác, có từ trước).
- `npm run eval:check -- --set dev`: 0 lỗi, 0 cảnh báo.
- WebSearch: **0 lần**. Mở nguồn bằng `curl` (API Europe PMC, NHS, MSD, vnras.com) vào thư mục tạm; PDF 4235/QĐ-BYT chuyển phông TCVN3 sang Unicode để đọc. Không dùng dịch vụ đọc hộ.

## 1. Nguồn

**Thêm vào sổ, đã xác minh (30):**
- Toàn văn qua API Europe PMC: Olesen 2019, Haasenritter 2015, Verdon 2007, Ronga 2012, Methorst 2026, Evangelista 2016, Erhabor 2026, Saricilar 2026, Chen 2025, Quach 2021, VNAGE 2026 (dao-frontmed-2026).
- Tóm tắt qua API Europe PMC: Bobbio 2015, Chan 1985, Klin 2021, Ghisalberti 2020, Klompas 2002, Hagan 2000, Pape 2015, Howard 2013, Bösner 2010 (Fam Pract), Bösner 2010 (BJGP), Chun 2015, Sallam 2026, Kawai 2014.
- Trang web: NHS Costochondritis, NHS Heartburn and acid reflux, NHS Shingles, MSD Pneumothorax, MSD Aortic dissection; 75/QĐ-BYT (bài Bệnh zona, bản đăng lại trên vnras.com).

**Sửa nguồn đã có trong sổ (giữ đúng cho mọi người dùng):**
- `bosner-bmcfampract-2009` (phần b cũng dùng): giữ ghi chú cũ, thêm bảng 2–3 sau khi đọc toàn văn PMC2801475. Bản nháp của lượt A ở hai thư mục đã gộp vào tệp này.
- `byt-qd-4235-2012` (phần a và các lô trước dùng): giữ ghi chú cũ, thêm ba bài đã đọc lại (khó thở tr. 16–17, đau ngực tr. 24–28, tràn khí màng phổi tr. 139–143); đổi ngày truy cập.
- `verdon-smw-2008`, `frese-jcmr-2011`: dùng bản phần a đã xác minh, không sửa.

**Gộp id trùng:** haasenritter-croatmedj-2015 (bỏ haasenritter-cmj-2015); dao-frontmed-2026 (bỏ vnage-gerd-2026); nhs-heartburn-acid-reflux (bỏ nhs-heartburn-reflux); frese-jcmr-2011 (bỏ frese-jclinmedres-2011, theo phần a); ronga-bmcfampract-2012, nhs-costochondritis, nhs-shingles, hagan-jama-2000, klompas-jama-2002, bosner-fampract-2010, chun-kjp-2015, sallam-cureus-2026 có ở nhiều thư mục bản nháp, nay mỗi nguồn một tệp.

**Không xác minh được, không đưa vào sổ:** cdc-shingles-hcp, cdc-shingles-clinical-overview, cdc-shingles-clinical-signs. www.cdc.gov trả lỗi 403 (Access Denied) với curl; công cụ đọc trang báo không phân giải được tên miền (cần cho phép tên miền này trong phần Network access của môi trường). Dữ kiện tương ứng đã có trong 75/QĐ-BYT và NHS Shingles.

## 2. Dấu hiệu đề xuất

- chest_pain_tearing, skin_burning_band (đã vào danh mục): liên kết bản trong danh mục.
- `chest_pain_worse_movement` (lượt B, đau thành ngực): không có trong danh sách được duyệt, để ngoài bản chính thức (biên bản chest_wall_pain).

## 3. Đề xuất cho người bảo trì (không sửa quy tắc, triệu chứng chính, dấu hiệu)

1. **cant_miss của triệu chứng chính mới:** chest_pain: acute_coronary_syndrome, aortic_dissection, pulmonary_embolism, pneumothorax (cùng anaphylaxis của phần b); shortness_of_breath: thêm pneumothorax, pulmonary_embolism, acute_coronary_syndrome; cough: pulmonary_embolism.
2. **`conditions` của quy tắc lô 3** (khi dừng khẩn chỉ hiện danh sách cần loại trừ, gồm bệnh mức 1–2 có xác suất từ ngưỡng hiển thị và bệnh được quy tắc ghi tên):
   - rf_chest_pain_breathless: [pulmonary_embolism, pneumothorax, acute_coronary_syndrome]. Ca d-pulmonary-embolism-chest-pain-1 dừng ngay sau câu khó thở, thuyên tắc phổi 0,6% không vào danh sách.
   - rf_chest_pain_sudden_severe: [aortic_dissection, pneumothorax, pulmonary_embolism]; rf_aortic_dissection_signs: [aortic_dissection]; rf_chest_pain_ongoing, rf_chest_pain_spreading_or_systemic: [acute_coronary_syndrome, aortic_dissection]; rf_chest_pain_central, rf_breathless_chest_pressure, rf_breathless_chest_pressure_features: [acute_coronary_syndrome]; rf_pe_signs: [pulmonary_embolism]; rf_dyspnea_sudden: [pulmonary_embolism, pneumothorax] (cùng bệnh của phần b); rf_hemoptysis_severe: thêm pulmonary_embolism (phần a đã đề xuất).
3. **Rối loạn nhịp tim ở Đau ngực:** bệnh mức 3 nên không bao giờ vào danh sách cần loại trừ; câu hồi hộp không nằm trong nhóm hỏi của Đau ngực, nên khi tức ngực từ 15 phút làm rf_chest_pain_ongoing dừng phiên, rf_palpitations_danger (có ghi tên bệnh này) không được xét. Đề xuất hỏi hồi hộp sớm ở Đau ngực (nhóm chest_pain_associated đã đủ 7 mục).
4. **Quy tắc mức 1 cho đau thượng vị kèm vã mồ hôi, buồn nôn hoặc khó thở ở người từ 45 tuổi** (Đau bụng; 2187/QĐ-BYT: đau thượng vị là biểu hiện không điển hình của nhồi máu cơ tim). Ca d-acute-coronary-syndrome-3 hiện chỉ đạt mức 1 nhờ xác suất 10,2% so với ngưỡng 10%; vì vậy lượt C chưa đưa prior Đau bụng của trào ngược vào (biên bản gerd). Sau khi có quy tắc, có thể thêm prior Đau bụng P3 hoặc P4 cho gerd.
5. **Câu huyết áp:** rf_extreme_bp_with_symptoms không giới hạn triệu chứng chính; với Khó thở (khó thở ngầm định), người chưa đo huyết áp trả lời "không rõ" nên luôn ra ít nhất mức 3 (ca d-anemia-shortness-of-breath-1). Đề xuất thêm lựa chọn trung tính "Chưa đo" cho bp_measured, hoặc giới hạn quy tắc.
6. **Tỷ lệ nền của hụt hơi khi gắng sức khi Khó thở:** `breathless_on_exertion` nên có `leak_by_complaint: { shortness_of_breath: khoảng 0,5 }` (biên bản anemia).
7. **Zona cần khám khẩn** (ban ở mắt, mũi, nhìn thay đổi, suy giảm miễn dịch nặng, có thai, dưới 18 tuổi: NHS "urgent GP / 111"): chưa có quy tắc. Đau zona vòng ra lưng làm rf_chest_pain_spreading_or_systemic (mức 1) đúng: khuyên quá mức.
8. **Đau thắt ngực ổn định** chưa là bệnh (6,6–11,2% người đau ngực ở phòng khám): nên thêm cho Đau ngực.
9. **Mức của thuyên tắc phổi:** urgency 1 nhưng quy tắc rf_pe_signs mức 2 (NHS "999 or A&E"); hai ca dev mới để mức 2, ba ca cũ mức 1. Nên thống nhất.

## 4. Bộ dev

So từng ca (chế độ sạch và 5 hạt giống nhiễu) giữa dữ liệu lúc bắt đầu phần c (12e9ddd8f39d, gồm phần a và phần b, 258 ca) và dữ liệu cuối (9dcca15e4bf9, 280 ca). Trong lúc chạy, chỉ các tệp của phần c đổi, nên mọi thay đổi dưới đây do phần c.

### 4.1 Chỉ số

| | Trước (258 ca) | Sau, cùng 258 ca | Sau, 280 ca (thêm 22 ca phần c) |
|---|---|---|---|
| Sạch | top1 76,9% · top3 93,7% · an toàn 99,6% · bỏ sót 0/114 · quá mức 7,4% | top1 76,5% · top3 94,1% · an toàn 99,6% · bỏ sót 0/114 · quá mức 7,4% | top1 76,5% · top3 93,5% · top10 96,4% · an toàn 99,6% · bỏ sót 0/126 · quá mức 7,9% · ECE 0,064 |
| Nhiễu | top1 72,9% · top3 90,6% · bỏ sót 10/570 · quá mức 19,4% | top1 73,0% · top3 90,7% · bỏ sót 10/570 · quá mức 19,4% | top1 73,2% · top3 90,5% · an toàn 98,4% · bỏ sót 11/630 · quá mức 20,1% |

- 22 ca mới: top1 17/22, top3 19/22, an toàn 22/22, bỏ sót cấp cứu 0/12 (sạch); khuyên quá mức 3/22 (d-anemia-shortness-of-breath-1, d-chest-wall-pain-3, d-cardiac-arrhythmia-chest-pain-1). Ở chế độ nhiễu: một lần bỏ sót (d-acute-coronary-syndrome-shortness-of-breath-1, hạt giống 3: mức 2 thay vì 1).
- Ba ca không vào 3 hạng đầu, cùng một nguyên nhân: dừng khẩn chỉ hiện danh sách bệnh cần loại trừ: d-chest-wall-pain-3 (bệnh lành tính), d-cardiac-arrhythmia-chest-pain-1 (bệnh mức 3), d-pulmonary-embolism-chest-pain-1 (dừng trước khi hỏi dấu hiệu thuyên tắc phổi). Đề xuất 2–3 ở mục 3.
- Ca không đạt hạng 1: d-aortic-dissection-2, -3 (hội chứng vành cấp đứng trước, cả hai trong danh sách cần loại trừ).

### 4.2 Ca cũ đổi kết quả do phần c

| Ca | Thay đổi | Lý do |
|---|---|---|
| d-acute-coronary-syndrome-2 (Đau bụng) | sạch: hạng 1 → 2, mức 1 không đổi; hạt giống 5: hạng 2 → 3 | Câu trả lời lô 3 thêm theo lời kể (khó thở khi đi lại, khởi phát trong vài giờ); phân bố mức khó thở của hai lượt nghiêng về khó thở lúc nghỉ (biên bản acute_coronary_syndrome) |
| d-croup-2 (Khó thở) | hạng 4 → 2 (sạch, hạt giống 2); hạt giống 4: 4 → 5 | Thêm bệnh, đổi thứ tự câu hỏi |
| d-lung-cancer-2 (Ho) | xác suất 37,7% → 35,3%, hạng 1 không đổi; hạt giống 1: 7 → 12, hạt giống 3, 5: 2 → 1 | Trào ngược (prior Ho P3) chia phần ho kéo dài |
| d-panic-disorder-shortness-of-breath-1 | xác suất 79% → 75%, mức không đổi | Rối loạn nhịp, thuyên tắc phổi có prior Khó thở |
| d-panic-disorder-chest-pain-1 | hạt giống 2: mức 3 → 4 (đúng 4) | Đổi thứ tự câu hỏi |
| d-premature-beats-1 | hạt giống 5: mức 4 → 3 (đúng 4) | Câu khó thở khi nằm (liên kết mới của rối loạn nhịp) được hỏi, câu phân đen bị "không rõ" làm quy tắc xuất huyết tiêu hóa ở trạng thái không rõ |
| d-transient-ischemic-attack-2 | hạt giống 5: hạng 5 → 3 | Đổi thứ tự câu hỏi |

- Đau bụng đã phát hành: chỉ d-acute-coronary-syndrome-2 đổi (mục trên). Trào ngược không có prior Đau bụng (biên bản gerd); bản thử có prior này làm d-acute-coronary-syndrome-3 tụt mức 1 xuống 2 và hai ca viêm tụy cấp ra khỏi 3 hạng đầu.
- Sốt và các triệu chứng chính đã phát hành khác: không ca nào đổi mức xử trí ở chế độ sạch; không ca cấp cứu nào bị bỏ sót thêm (sạch và nhiễu, 258 ca cũ).

### 4.3 Ca cũ được thêm câu trả lời lô 3

Chỉ thêm khi lời kể nói rõ: chest_pain (có hoặc không) ở 12 ca của 4 bệnh mở rộng; chest_pain_duration ở d-acute-coronary-syndrome-1; dyspnea_onset ở d-acute-coronary-syndrome-1, -2 và d-pulmonary-embolism-1, -2, -3; dyspnea_severity ở d-acute-coronary-syndrome-2. Không sửa hai ca d-from-h-* (chuyển từ bộ giữ kín) vì chỉ có câu "không đau ngực", trùng mặc định. Không sửa gì khác.
