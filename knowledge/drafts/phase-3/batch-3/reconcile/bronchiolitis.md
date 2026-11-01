# Biên bản đối chiếu lượt C: bronchiolitis (Viêm tiểu phế quản cấp)

- Giai đoạn 3 lô 3, phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-31.
- Bản nháp: `pass-a/bronchiolitis.yaml`, `pass-b/bronchiolitis.yaml`.
- Nguồn mở lại: NICE NG9 (tải trang Recommendations: 1.1.1 dưới 2 tuổi, đỉnh 3–6 tháng; 1.1.2 nặng nhất ngày 3–5, ho hết ở 90% trong 3 tuần; 1.1.3 viêm long 1–3 ngày rồi ho dai dẳng, thở nhanh hoặc rút lõm, khò khè hoặc ran nổ; 1.1.4 sốt khoảng 30%, thường dưới 39°C, bú kém sau 3–5 ngày; 1.1.5 trẻ dưới 6 tuần có thể chỉ ngừng thở; 1.1.6, 1.1.7; 1.2.1; 1.6.1); Do 2016, Do 2023, Toizumi 2025 (tóm tắt qua API Europe PMC); Moore 2017. 3312/QĐ-BYT, NHS Bronchiolitis, IMCI đã được lượt R xác minh trong ngày.
- Nguồn đưa vào sổ: `do-plosone-2016`, `do-bmcinfectdis-2023`, `toizumi-vaccines-2025` (đều đã mở).
- Trạng thái: `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| prior cough, 2 tháng–5 tuổi | P2 | P3 | P3 (B) | Nhóm tuổi gồm cả trẻ 2–5 tuổi không còn mắc bệnh; với P2 bệnh đứng trên hen, khò khè sau nhiễm vi rút ở trẻ 3–4 tuổi có khò khè (NG9 1.1.7); số liệu RSV ở trẻ đi khám ngoại trú thấp (3,9%) | NG9; Do 2023; Toizumi 2025 |
| prior shortness_of_breath, 2 tháng–5 tuổi | P1 | P2 | P2 (B) | Như trên; còn viêm phổi, hen, viêm thanh quản cấp, dị vật | NG9 1.1.7 |
| prior shortness_of_breath, dưới 2 tháng | P2 | P1 | P2 (A) | Trẻ dưới 2 tháng khó thở cần nghĩ nhiều tới viêm phổi, nhiễm khuẩn huyết (bệnh không được bỏ sót); mức thấp hơn giữ phần xác suất cho các bệnh này | NG9; 3312 |
| prior fever | P3 | P3 | Giữ | Trùng | NG9 1.1.4 |
| prior_modifiers mùa đông xuân miền Bắc | Không | ×1,3 | Không dùng (A) | 3312 chỉ mô tả bằng lời; miền Nam có mùa mưa (Do 2016); chưa lượng hóa được | 3312; Do 2016 |
| cough | very_frequent | almost_always | almost_always (B) | Ho dai dẳng là tiêu chuẩn bắt buộc (NG9 1.1.3); câu 'không ho' giữ cho trẻ chỉ sốt không bị gợi ý bệnh này | NG9 |
| fever_max_temp | 0,50 / 0,42 / 0,08 | 0,40 / 0,50 / 0,10 | Trung bình 0,45 / 0,46 / 0,09 | Ngang nguồn | NG9 |
| fever_duration | 0,55 / 0,38 / 0,05 / 0,02 | 0,55 / 0,40 / 0,04 / 0,01 | Trung bình 0,55 / 0,39 / 0,045 / 0,015 | Ngang nguồn | NG9 |
| stridor | very_rare | rare (above_leak_ok) | rare (B) | Lệch hai mức; mở lại nguồn: IMCI tách thở rít khỏi khò khè, nhưng 3312 dùng chữ 'thở rít' cho tiếng thở của chính bệnh này, người nhà dễ lẫn | 3312; IMCI |
| young_infant_fast_breathing | frequent | Không | Giữ (A) | NG9 1.1.3; IMCI | NG9; IMCI |
| young_infant_not_feeding | Không | occasional | Giữ (B) | NG9 1.1.4 | NG9 |
| spo2_measured | Không (dấu hiệu chưa có) | 0,22 / 0,12 / 0,06 / 0,60 | Giữ (B) | NG9 1.1.8, 1.2.2 | NG9 |
| grunting | Không (dấu hiệu chưa có) | rare (above_leak_ok) | Giữ (B) | NG9 1.2.1 | NG9; NHS |
| asthma_known | Không | rare | Giữ (B) | NG9 1.1.7 | NG9 |
| inspiratory_whoop | Không | very_rare | Giữ (B) | Dấu hiệu của ho gà | MSD Pertussis |
| post_tussive_vomiting | Không | occasional | Giữ (B) | Moore: nôn sau ho có độ đặc hiệu chỉ 66% ở trẻ em | Moore 2017 |
| barking_cough: nguồn | NHS Croup, MSD Croup | Bjornson 2013 | NHS, MSD, Smith 2018 | Bjornson 2013 không mở được | |
| warning_signs | 7 mục | 8 mục (thêm grunting) | Hợp (8 mục) | | |

Các trường còn lại trùng nhau.

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Ba prior (nhất là prior Sốt P3, đổi kết quả của triệu chứng chính đã phát hành).
- Tần suất khò khè, rút lõm, bú kém, thở rên, ngừng thở ở cộng đồng; phân bố SpO2, thời gian ho, khởi phát khó thở, sốt.

## Ca dev và ảnh hưởng lên Sốt

- d-bronchiolitis-1 (4 tháng, Ho, điển hình): đứng đầu (79%), mức 3. d-bronchiolitis-3 (9 tháng, Khó thở, dễ nhầm hen, viêm phổi): đứng đầu (87%), mức 3.
- d-bronchiolitis-2 (10 tháng, Sốt, chưa nghe khò khè): mức 3 đúng, nhưng xếp thứ 4 (14%) sau cảm lạnh, cúm, COVID-19; viêm phổi (chấp nhận) chỉ 1,5%. Ca không điển hình; không nâng prior Sốt vì bệnh này đổi kết quả của triệu chứng chính đã phát hành.
- Ảnh hưởng lên các ca Sốt cũ (so bộ dev có và không có 8 bệnh của phần b, cùng dữ liệu phần a): không ca nào đổi mức xử trí hay thứ hạng ở chế độ sạch; viêm tiểu phế quản không vào 3 bệnh đầu của ca Sốt cũ nào. Trẻ nhỏ sốt bị hỏi thêm câu: d-acute-otitis-media-2 (7 tháng) 18 → 25 câu, d-acute-otitis-media-3 14 → 20 câu (thêm rút lõm lồng ngực, mắt trũng, giật mình, mất mùi, tiếp xúc tay chân miệng, ăn chung đồ ăn trước câu đau tai), d-scrub-typhus-3 17 → 18 câu. Lý do: prior P3 thêm phần xác suất của bệnh mức 3 ở trẻ sốt, nên trước khi mức xử trí ổn định, bộ suy luận hỏi các câu phân biệt mức 3 với mức 4. Ở chế độ nhiễu: d-acute-otitis-media-3 đổi chỗ một phiên mức 2 và một phiên mức 3 (tổng không đổi), d-common-cold-3 thêm một phiên mức 4 (đúng là 5), d-measles-2 và d-measles-fever-1 tụt một bậc ở một phiên (8 → 9, 9 → 10), d-from-h-fever-014 lên một bậc ở một phiên.
