# Biên bản đối chiếu: lung_cancer (Ung thư phổi)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần a, 31/10/2026.
- Bản chính thức: `knowledge/conditions/lung_cancer.yaml`, trạng thái `source_checked`.
- Mức xử trí 4, `rule_out: true`, không thuộc nhóm không được bỏ sót: hai lượt thống nhất. applicability từ 13 tuổi: hai lượt thống nhất.
- 5 liên kết chung, 4 trùng mức. Lượt A có thêm 4 liên kết, lượt B thêm 6.
- Nguồn mở lại: NG12 (cập nhật 15/4/2026), bản tin GLOBOCAN 2024 (PDF), Okoli 2018, Chowienczyk 2020, Ruano-Raviña 2020 (toàn văn), Hamilton 2005 (tóm tắt), MSD, NHS.
- Hai id cho cùng bản tin GLOBOCAN (iarc-globocan-vn-2024 của lượt A, globocan-2024-vietnam của lượt B): giữ `iarc-globocan-vn-2024`, nhãn L3 (bản tin ghi © IARC, All Rights Reserved).

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common | Ung thư phế quản – phổi | thêm "U phổi" | Theo lượt A | "U phổi" gồm cả u lành | – |
| codes | C34 | C34.9 + MONDO:0008903 | C34 + MONDO | Mã nhóm | – |
| summary_vi | "nguyên nhân ít gặp…" | "khối u ác tính…" | Gộp, giữ giọng điềm tĩnh | Nói rõ phần lớn triệu chứng do bệnh khác, cần bác sĩ khám để loại trừ | NHS Lung cancer |
| Prior Ho | P6; 45–64 tuổi P5; từ 65 tuổi P4 | như lượt A | Giữ | Trùng | GLOBOCAN 2024 |
| Prior Khó thở, từ 65 tuổi | P5 | P4 | P4 | Frese 2011 (đã mở lại): u ác đường hô hấp 0,12–0,40% người khám vì khó thở ở mọi lứa tuổi, nên cao hơn ở người lớn tuổi | Frese 2011 |
| Prior Đau ngực, từ 65 tuổi | P5 | P4 | P4 | Ung thư (mọi loại) khoảng 1% người đau ngực ở tuyến ban đầu (Verdon: 7/672 tử vong vì ung thư liên quan đến đau ngực), tập trung ở người lớn tuổi | Verdon 2008 |
| Hệ số giới | 1,4 và 0,6 | 1,3 và 0,7 | 1,3 và 0,7 | Chênh lệch (tỷ suất 29,0 so với 9,9) phần lớn do hút thuốc, đã có hai câu hỏi; hệ số nhỏ để ung thư phổi ở phụ nữ không hút thuốc không bị hạ quá mức | GLOBOCAN 2024 |
| breathing_difficulty | frequent | occasional | frequent | Lệch một mức; người dùng app là người có triệu chứng: Ruano-Raviña 26,7% mọi ca, tức khoảng 39% ca có triệu chứng; Hamilton (đọc toàn bộ hồ sơ) khoảng 56% | Okoli 2018, Ruano-Raviña 2020 |
| cough_duration | {.05, .08, .37, .50} | {.05, .08, .42, .45} | Trung bình | | MSD, NHS, 4235 |
| dyspnea_onset | {.05, .15, .80} | {.05, .20, .75} | Trung bình | | 4235, MSD |
| chest_pain_duration | {.05, .1, .2, .65} | {.05, .10, .25, .60} | Trung bình | | MSD |
| dyspnea_severity | có | không có | Giữ | | NG12, MSD |
| fatigue | frequent | không có | Giữ | Nguồn lệch nhau (CPRD 6,5%, Ruano-Raviña 10%, Hamilton khoảng 36%); với tỷ lệ nền 20%, frequent cho tỷ số khả dĩ 2,5, gần LR+ 2,3 của Hamilton | Okoli 2018 |
| lymph_node_swelling | occasional | không có | Giữ | NG12 mục 1.1.3 | NG12 |
| fever | rare | không có | Giữ | MSD: sốt khi viêm phổi sau chỗ tắc; câu "có sốt" nghiêng về nhiễm trùng | MSD |
| hemoptysis_large | không có | rare | Giữ | MSD: lượng máu thường ít | MSD |
| pleuritic_chest_pain | không có | occasional | Giữ | Đau 23,8% lúc chẩn đoán; đau kiểu màng phổi khi u lan tới màng phổi | Ruano-Raviña, MSD |
| chest_pain_exertional, chest_pain_sudden_severe | không có | rare | Giữ | Đau âm ỉ, tăng dần | MSD |
| former_smoker | (đề xuất dấu hiệu) | occasional | Giữ | Dấu hiệu nay có trong danh mục; Tây Ban Nha 46,9% đã bỏ thuốc, Việt Nam ước thấp hơn | Ruano-Raviña, MSD |
| copd_known | không có | occasional | Giữ | Bệnh đồng mắc (2767); hô hấp ký bất thường liên quan độc lập (Hamilton) | 2767, Hamilton |
| Bậc của smoker | C judgment | B numeric | B | Ruano-Raviña, MSD có số liệu | Ruano-Raviña, MSD |
| cough, hemoptysis, weight_loss_unintended | – | – | Giữ | Trùng mức; ghi cả nguồn tuyến ban đầu (Anh) và bệnh viện (Tây Ban Nha) | |
| warning_signs | 2 mục | thêm confusion | Hợp hai bản | | – |

## Giá trị dựa trên nhận định

- Mọi prior (từ tỷ suất mới mắc GLOBOCAN và Frese, chưa có số liệu theo lý do đi khám ở Việt Nam).
- Hệ số giới 1,3 và 0,7.
- fatigue frequent, lymph_node_swelling occasional, former_smoker occasional, copd_known occasional, fever rare, hemoptysis_large rare.
- Mọi phân bố. Câu chữ người dùng thấy cần bác sĩ duyệt (không nói tiên lượng, không gây hoảng sợ).

## Ca dev

- d-lung-cancer-1 (điển hình: nam 66 tuổi hút thuốc, ho hơn 2 tháng, ho ra máu, sụt cân): mức 3, hạng 1 (64%; lao phổi 33%).
- d-lung-cancer-2 (nữ chưa từng hút thuốc, ho khan, khó thở tăng dần): mức đúng 4, app mức 3 (khuyên quá mức), hạng 1 (38%; lao phổi 30%); một hạt giống nhiễu hạng 9.
- d-lung-cancer-3 (bệnh phổi tắc nghẽn, ho ra máu kèm khó thở): mức 2 đúng (rf_hemoptysis_severe), nhưng phiên dừng khẩn sau 8 câu và danh sách "Bác sĩ cần loại trừ" rỗng, vì quy tắc rf_hemoptysis_severe chưa có `conditions`; ca không đạt top 3. Đề xuất cho người bảo trì: thêm `conditions: [pulmonary_tuberculosis, lung_cancer, pulmonary_embolism]` vào rf_hemoptysis_severe (và rf_hemoptysis nếu muốn).
