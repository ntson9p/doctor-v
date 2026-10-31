# Biên bản đối chiếu: copd_exacerbation (Đợt cấp bệnh phổi tắc nghẽn mạn tính)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần a, 31/10/2026.
- Bản chính thức: `knowledge/conditions/copd_exacerbation.yaml`, trạng thái `source_checked`.
- Mức xử trí 3, không thuộc nhóm không được bỏ sót: hai lượt thống nhất. applicability từ 18 tuổi: hai lượt thống nhất.
- 11 liên kết chung, cả 11 trùng mức. Lượt B thêm 7 liên kết (kể cả ba dấu hiệu mới thêm vào danh mục).
- Nguồn mở lại: McManus 2008 (toàn văn, bảng 3), WHO Việt Nam, STEPS 2021 (báo cáo PDF, bảng 5), Lâm 2014 và Nguyen Viet 2015 (tóm tắt), NHS COPD, Frese 2011, GOLD 2026 (PDF, tr. 32: tới 70% người bệnh chưa được chẩn đoán, hơn 90–95% ở nước thu nhập thấp và trung bình). 2767/QĐ-BYT đã được lượt R xác minh.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common | 2 tên | 3 tên | Hợp hai bản | "Viêm phế quản mạn đợt cấp" là cách gọi hay gặp | – |
| codes | J44.1 | J44.1 + MONDO:0005002 | Theo lượt B | MONDO là mục bệnh nền (không có mục riêng cho đợt cấp) | – |
| Prior Khó thở, 18–44 tuổi | P4 | P5 | P4 | Lệch một mức, cùng ước lượng; nhóm gồm người 40–44 tuổi, bệnh hay gặp từ 40 tuổi (2767); bệnh có urgency 3 nên chọn mức thận trọng hơn | 2767, Lâm 2014 |
| Prior Ho, 18–44 tuổi | P5 | P6 | P5 | Cùng lý do | 2767 |
| Prior Khó thở, Ho từ 45 tuổi | P2; Ho P3, từ 65 tuổi P2 | như lượt A | Giữ | Trùng | Frese 2011, WHO, Lâm 2014 |
| Hệ số giới | nam 1,5, nữ 0,5 | không có | nam 1,4, nữ 0,6 | Đọc lại nguồn: chênh lệch nam/nữ gần gấp 3 cả ở người chưa từng hút thuốc (Nguyen Viet 2015: 12,9% so với 4,4%), nên không chỉ do hút thuốc; nhưng Lâm 2014 thấy giới nam mất ý nghĩa khi tính hút thuốc, và câu khói bếp mang phần nguy cơ của phụ nữ. Giữ hệ số, nhỏ hơn lượt A | WHO, Nguyen Viet 2015, Lâm 2014 |
| Hệ số mùa | không có | miền Bắc, tháng 12–2: 1,3 | Giữ | NHS (đã mở lại): đợt cấp hay gặp vào mùa đông; 2767: nhiệt độ giảm đột ngột, nhiễm cúm, cảm lạnh khởi phát đợt cấp. Hệ số nhỏ | NHS COPD, 2767 |
| dyspnea_onset | {.08, .70, .22} | {.10, .75, .15} | Trung bình | | 2767, GOLD |
| cough_duration | {.2, .15, .2, .45} | {.25, .20, .20, .35} | Trung bình | | 2767 |
| former_smoker | (đề xuất dấu hiệu) | occasional | Giữ | | 2767, Nguyen Viet 2015 |
| biomass_smoke_exposure | (đề xuất dấu hiệu) | frequent | Giữ | Ô nhiễm trong nhà là yếu tố nguy cơ (2767, WHO); 25–40% người bệnh chưa từng hút thuốc | 2767, WHO, Nguyen Viet 2015 |
| spo2_measured | không có | {.15, .17, .08, .6} | Giữ | SpO2 dưới 92% là đợt trung bình, nặng | 2767 |
| night_respiratory_symptoms | không có | occasional | Giữ | NHS: có khi thức dậy ban đêm vì khó thở; thấp hơn hen | NHS COPD |
| chest_pain_pressure | không có | occasional | Giữ | 2767: nặng ngực tùy mức nặng | 2767 |
| weight_loss_unintended | không có | occasional | Giữ | NHS: ít gặp, giai đoạn nặng; người đi khám vì đợt cấp thường bệnh nặng hơn. Ngang lao phổi, ung thư phổi nên không làm lệch các bệnh này | 2767, NHS |
| hemoptysis | không có | very_rare | Giữ | NHS: ho ra máu thường do bệnh khác | NHS COPD |
| Bậc của breathing_difficulty, cough, productive_cough, wheeze, fever | B numeric (McManus) | B verbal (2767) | Giữ mức, ghi cả hai nguồn | Trùng mức; McManus là người nằm viện nên đã hạ mức | McManus 2008, 2767 |
| copd_known, smoker, dyspnea_severity, reliever_no_relief, similar_episodes_before, orthopnea, leg_swelling_both | – | – | Giữ | Trùng | |
| warning_signs | 4 mục | thêm cold_hands_feet | Hợp hai bản | | – |

## Giá trị dựa trên nhận định

- Mọi prior: chưa có số liệu theo lý do đi khám ở Việt Nam; dưới 45 tuổi là ước lượng.
- Hệ số giới 1,4 và 0,6 (có thể đếm trùng một phần với câu hút thuốc), hệ số mùa 1,3.
- copd_known frequent, biomass_smoke_exposure frequent, former_smoker occasional, weight_loss_unintended occasional.
- Mọi phân bố (thời gian ho, khởi phát, mức khó thở, SpO2).

## Ca dev

- d-copd-exacerbation-1 (điển hình, Khó thở): mức 3, hạng 1 (99%).
- d-copd-exacerbation-2 (nữ không hút thuốc, khói bếp, chưa được chẩn đoán, Ho): mức 3, hạng 1 (96%).
- d-copd-exacerbation-3 (Ho, có sốt nhẹ, dễ nhầm viêm phổi): mức 3, hạng 1 (83%; viêm phế quản 13%, viêm phổi 3%).
