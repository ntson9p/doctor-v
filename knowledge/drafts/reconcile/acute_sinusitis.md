# Biên bản đối chiếu: acute_sinusitis (Viêm mũi xoang cấp tính)

- Lượt C: `agent:pass-c`, ngày 2026-10-24 (truy cập nguồn ngày 2026-10-25).
- Bản chính thức: `knowledge/conditions/acute_sinusitis.yaml`, trạng thái `source_checked`.
- `npm run kb:check`: 0 lỗi, 0 cảnh báo ở tệp này.
- Mức xử trí: hai lượt cùng đổi từ gợi ý 5 sang 4; giữ 4 (bệnh được định nghĩa theo 5643 là viêm mũi xoang nghĩ do vi khuẩn; viêm mũi do vi rút trong 10 ngày đầu thuộc cảm lạnh).

## 1. Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common | Viêm xoang cấp | Viêm xoang cấp, Viêm xoang | Theo B | Tên hiển thị vẫn là "Viêm xoang cấp" | — |
| codes.icd10_verified | false | true | false | Lượt C chưa đối chiếu được | — |
| specialties | ent, general_medicine | ent | Theo A | Bệnh thường được khám ở tuyến ban đầu | nhs-sinusitis |
| prior headache: by_age | không | child_2m_5y P4 | Theo B | Trẻ dưới 5 tuổi ít khi than đau đầu; lệch một mức, chọn mức thận trọng | judgment |
| prior: tier | B | C | C | Ước lượng thuần | — |
| fever: freq_by_age | không | trẻ 2 tháng–12 tuổi frequent | Theo B | 5643 (bài trẻ em): trẻ thường sốt nhẹ kéo dài; Ebell 0,11 là số ở người lớn, đo trên 38°C | byt-qd-5643-2015, ebell-afm-2019 |
| facial_pain_pressure | frequent | very_frequent | frequent (A) | Phần chính của câu hỏi là đau, nặng vùng trán, má (độ nhạy 0,49); đau tăng khi cúi 0,72 | ebell-afm-2019 |
| loss_of_smell_taste | frequent | occasional | frequent (A) | Ebell: 0,61; B chỉ ước lượng | ebell-afm-2019 |
| headache: freq_by_age | không | child_5_12 very_frequent | Theo B | 5643: trẻ trên 6 tuổi luôn có nhức đầu | byt-qd-5643-2015 |
| symptoms_worsen_after_improving | frequent | very_frequent | very_frequent (B) | Ebell: 0,74 (số liệu, nguồn tốt hơn); độ đặc hiệu thấp (0,41) đã được cân bằng bằng mức rare ở cảm lạnh | ebell-afm-2019 |
| sore_throat | occasional | không có | Giữ (A) | CDC: đau họng do dịch chảy xuống họng | cdc-sinus-infection |
| headache_duration | 0,05/0,40/0,55 | 0,05/0,35/0,60 | 0,05/0,37/0,58 | Trung bình | byt-qd-5643-2015 |
| headache_location | trán, mặt 0,60 | trán, mặt 0,50 | Theo B | Giảm đếm trùng với câu đau vùng trán, má | ebell-afm-2019 |
| headache_course | có | không có | Giữ (A) | Viêm mũi xoang cấp tái phát (từ 4 đợt/năm) theo 5643 | byt-qd-5643-2015 |
| fever_max_temp | không có | 0,55/0,35/0,10 | Giữ (B) | Phần lớn sốt nhẹ | byt-qd-5643-2015, ebell-afm-2019 |
| fever_duration | không có | 0,30/0,35/0,15/0,20 | 0,30/0,40/0,20/0,10 | Giữ tỷ lệ sốt quá 7 ngày bằng tỷ lệ nền để bệnh lành tính này không "giải thích" sốt kéo dài (dấu hiệu cần tìm nguyên nhân khác) | byt-qd-5643-2015, cdc-sinus-infection |
| warning_signs | 5 dấu hiệu | thêm periorbital_swelling | Theo B | Biến chứng hốc mắt (5643 mục 5.2.1) | byt-qd-5643-2015 |
| self_care_vi | | | Gộp | Bỏ câu "thuốc nhỏ mũi co mạch chỉ dùng vài ngày" (chưa có nguồn cho viêm xoang); giữ hỏi bác sĩ, dược sĩ trước khi dùng | nhs-sinusitis |

Các trường giống nhau, giữ nguyên: tên, mã J01.9, không có MONDO, urgency 4, prior (đau đầu P3, sốt P4), fever (mặc định occasional), nasal_congestion, runny_nose, purulent_nasal_discharge, cough (very_frequent), headache (mặc định frequent), nasal_symptoms_over_10_days (frequent), ear_pain (occasional).

## 2. Nguồn

- Thêm vào sổ nguồn và đã mở lại: ebell-afm-2019 (trang PMC, bảng 3; API Europe PMC báo lỗi 500 với toàn văn này), nhs-sinusitis, cdc-sinus-infection.
- Gộp ID trùng: `ebell-2019-rhinosinusitis-signs` → `ebell-afm-2019`.
- Nguồn có sẵn, dùng lại: byt-qd-5643-2015 (lượt C mở lại bản PDF trên vnras.com: trang quyết định, bài Viêm mũi xoang cấp tính mục 1, 2.1, 3.1.1, 3.2, 5, bài Viêm mũi xoang trẻ em mục 3.1.1). Ghi chú: Ebell 2019 phần lớn ở phòng khám chuyên khoa, không phải tuyến ban đầu.

## 3. Giá trị dựa trên ước lượng

- Mọi prior; fever_duration; headache_location; headache_course; nasal_symptoms_over_10_days frequent; fever frequent ở trẻ em.

## 4. Ca kiểm thử (dev)

| Ca | Kết quả (sạch) | Nhận xét |
|---|---|---|
| d-acute-sinusitis-1 | hạng 1 (0,84), mức 4 đúng | |
| d-acute-sinusitis-2 | hạng 1 (0,71), mức 4 đúng | Trẻ 8 tuổi, bệnh hai pha |
| d-acute-sinusitis-3 | hạng 1 (0,86), mức 4 (đúng là 3, thấp hơn mức cần) | Đau đầu dữ dội kèm sốt: NHS, CDC khuyên khám sớm. Không có quy tắc nào bắt "sốt kèm đau đầu dữ dội", nên phiên không hỏi mức độ đau |

Mâu thuẫn ghi nhận: không đổi urgency (ca điển hình là mức 4). Đề xuất quy tắc mức 3 cho sốt kèm đau đầu dữ dội (headache_severity = severe). Khi có bệnh viêm màng não (lô 2), cần chạy lại ca này. Ở ca d-covid19-2, viêm xoang được xếp đầu (0,85) vì mất ngửi và nghẹt mũi, trong khi câu "quá 10 ngày" và kết quả tự xét nghiệm không được hỏi (xem biên bản covid19).
