# Biên bản đối chiếu: pulmonary_tuberculosis (Lao phổi)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần a, 31/10/2026.
- Bản chính thức: `knowledge/conditions/pulmonary_tuberculosis.yaml`, trạng thái `source_checked`.
- Mức xử trí 4, không thuộc nhóm không được bỏ sót: hai lượt thống nhất (NHS TB: khám không khẩn; 162/QĐ-BYT).
- 12 liên kết chung, 10 trùng mức. Lượt A có thêm 2 liên kết.
- Nguồn mở lại: điều tra lao quốc gia (Nguyen 2020, toàn văn, bảng 3–4), Cochrane 2022 (toàn văn), Wang 2008, Miller 2000, Duong 2025 (tóm tắt), NHS TB, MSD TB, STEPS 2021. 162/QĐ-BYT đã được lượt R xác minh.
- Hai id cho cùng bài điều tra (nguyen-plosone-2020 của lượt A, nguyenhv-plosone-2020 của lượt B): giữ `nguyen-plosone-2020`.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| codes | A15 | A15.0 + MONDO:0006052 | A15 + MONDO | A15.0 chỉ cho ca có xác nhận bằng soi đờm; người dùng chưa xét nghiệm | – |
| specialties | respiratory, infectious_disease | infectious_disease, respiratory | Giữ | Cùng nội dung | – |
| Prior Ho, 45–64 tuổi | P4 | P3 | P3 | Lệch một mức; đọc lại bảng 4: 423–618/100.000 ở 45–64 tuổi, gần bằng từ 65 tuổi (689) và gấp 2–3 lần 25–44 tuổi; khoảng 0,3–0,4% dân số tuổi này là người lao có ho, so với 12–18% người lớn ho kéo dài (Lâm 2011), tức khoảng 1–3% | Nguyen 2020, Lâm 2011 |
| Prior Ho, các tuổi khác | P4; trẻ P5; dưới 2 tháng P6; từ 65 tuổi P3 | như lượt A | Giữ | Trùng | Nguyen 2020 |
| Prior Sốt, người lớn | P4 | P5 | P5 | Lệch một mức; người sốt chủ yếu là bệnh cấp vài ngày, số đợt sốt mới mỗi năm gấp hàng trăm lần số ca lao mới, mà chỉ 13–52% người lao có sốt; P5 đổi ít ca Sốt đã phát hành hơn (mục dưới) | Nguyen 2020, Wang 2008, Miller 2000, 162/QĐ-BYT |
| Prior Sốt, trẻ em, vị thành niên | P5 | P6 | P6 | Cùng lý do; lao ở tuổi 15–24 chỉ 63/100.000 | Nguyen 2020 |
| Prior Sốt, từ 65 tuổi | P4 (mặc định) | P4 | Giữ | Trùng | |
| Prior Khó thở, vị thành niên | P5 (mặc định) | P6 | P6 | Lao ở tuổi 15–24 ít | Nguyen 2020 |
| Prior Khó thở, từ 65 tuổi | P5 (mặc định) | P4 | P4 | Tỷ lệ cao nhất từ 65 tuổi; 4235 nêu lao trong nguyên nhân khó thở kèm toàn trạng thay đổi ở người già | Nguyen 2020, 4235 |
| Hệ số giới | 1,5 và 0,5 | 1,6 và 0,4 | 1,5 và 0,5 | Câu hút thuốc (frequent) đã mang một phần chênh lệch; hệ số ít cực đoan hơn ít làm sót lao ở nữ | Nguyen 2020 |
| fever | occasional | frequent | occasional | Lệch một mức; hai nguồn châu Á đều dưới 33% (Việt Nam 12,7%, khoảng 19% ca có triệu chứng; Đài Loan 27,9%); số 52,3% của Miller ở Mỹ, Miller ghi người gốc châu Á hay có biểu hiện không điển hình | Nguyen 2020, Wang 2008, Miller 2000 |
| weight_loss_unintended | occasional | frequent | occasional | Lệch một mức; nguồn có số liệu (Việt Nam 7,7%, khoảng 11% ca có triệu chứng) dưới 33%; 162/QĐ-BYT, NHS, MSD chỉ mô tả bằng lời | Nguyen 2020 |
| cough_duration | {.05, .12, .55, .28} | {.05, .09, .56, .30} | Trung bình | | Nguyen 2020 bảng 3 |
| fever_duration | {.04, .08, .08, .80} | {.05, .10, .10, .75} | Trung bình | | 162/QĐ-BYT, Miller 2000 |
| fever_max_temp | {.45, .40, .15} | {.45, .43, .12} | Trung bình | | 162/QĐ-BYT |
| dyspnea_onset | {.03, .17, .80} | {.05, .25, .70} | Trung bình | | MSD |
| dyspnea_severity | có | không có | Giữ | Khó thở thường khi gắng sức | 162/QĐ-BYT |
| fatigue | frequent | không có | Giữ | 162/QĐ-BYT, NHS, MSD đều nêu mệt | 162/QĐ-BYT, NHS |
| Bậc của diabetes | B numeric | C numeric | B | Wang 2008 (31,2%) là nghiên cứu gốc | Wang 2008, MSD |
| cough, productive_cough, night_sweats, hemoptysis, breathing_difficulty, pleuritic_chest_pain, tb_contact, smoker, immunocompromised | – | – | Giữ | Trùng mức | |
| warning_signs | 3 mục | 5 mục (có cứng gáy, co giật) | Hợp hai bản | NHS TB: cứng gáy, co giật, lú lẫn (lao màng não) thì gọi 999 hoặc đến cấp cứu | NHS TB |

## Ảnh hưởng tới Sốt (triệu chứng đã phát hành)

So bộ dev Sốt, dữ liệu gốc và dữ liệu chỉ có thay đổi của phần a (mỗi ca: chế độ sạch và 5 hạt giống nhiễu):
- Với P5 (bản chính thức): d-typhoid-fever-2 hạng 12 → 13 (sạch và 4 hạt giống; vốn đã ngoài top 10, lao đứng thứ 3 với 1,2%); d-typhoid-fever-1 hạt giống 2 hạng 3 → 4; d-malaria-2 hạt giống 4, 5 hạng 11 → 12, 17 → 18; d-scrub-typhus-3 lao vào vị trí 3 (0,2%), hạng của sốt mò không đổi. Mức xử trí không ca nào kém khẩn hơn mức đúng.
- Với P4 (lượt A), để so sánh: thêm d-malaria-2 sạch hạng 10 → 6, d-kawasaki-disease-2 và d-typhoid-fever-3 đổi hạng ở một hạt giống. Bản chính thức dùng P5.
- Ca mới d-pulmonary-tuberculosis-2 (Sốt, 70 tuổi): lao đứng đầu (72%), mức 3.

## Giá trị dựa trên nhận định

- Mọi prior (suy từ tỷ lệ hiện mắc quốc gia, chưa có tỷ lệ lao trong người đi khám vì ho, sốt, khó thở).
- Hệ số giới 1,5 và 0,5.
- fever, night_sweats, weight_loss_unintended occasional (số cộng đồng thấp, số bệnh viện cao); hemoptysis occasional; tb_contact occasional; smoker frequent; fatigue frequent.
- Phần chia ho từ 2 tuần thành dưới và trên 2 tháng; mọi phân bố khác.

## Ca dev

- d-pulmonary-tuberculosis-1 (điển hình, Ho): mức 4, hạng 1 (95%).
- d-pulmonary-tuberculosis-2 (người cao tuổi, Sốt): mức 3, hạng 1 (72%).
- d-pulmonary-tuberculosis-3 (Ho, ho ra máu, dễ nhầm ung thư phổi): mức 3, hạng 1 (99,6%).
