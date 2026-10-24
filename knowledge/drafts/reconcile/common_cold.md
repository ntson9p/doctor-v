# Biên bản đối chiếu: common_cold (Cảm lạnh, viêm mũi họng cấp)

- Lượt C: `agent:pass-c`, ngày 2026-10-24 (truy cập nguồn ngày 2026-10-25).
- Bản nháp: `knowledge/drafts/pass-a/common_cold.yaml`, `knowledge/drafts/pass-b/common_cold.yaml`.
- Bản chính thức: `knowledge/conditions/common_cold.yaml`, trạng thái `source_checked`.
- `npm run kb:check`: 0 lỗi, 0 cảnh báo ở tệp này.

## 1. Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common | Cảm lạnh | Cảm lạnh, Cảm thường | Theo B | "Cảm thường" là phần trong ngoặc của tên ICD-10 J00 | ICD-10 (theo lượt B) |
| codes.icd10_verified | false | true | false | Lượt C không mở lại được dữ liệu tra cứu ICD | — |
| summary_vi | 3 câu | 3 câu | Gộp | Giữ ý "người lớn ít khi sốt, trẻ nhỏ có thể sốt cao hơn" (B) và thời gian khỏi theo MSD | msd-common-cold, byt-qd-5643-2015 |
| specialties | general_medicine, pediatrics, ent | general_medicine, ent | Theo B | Bộ suy luận tự thêm "Nhi khoa" cho người dưới 16 tuổi; ghi pediatrics sẽ gợi ý sai cho người lớn | docs/engine-spec.md mục 9 |
| prior fever: elder_65_74, elder_75p | P2 (mặc định) | P3 | P3 (B) | Lệch một mức, nguồn ngang nhau; chọn mức thận trọng (sốt ở người cao tuổi nên nghĩ bệnh nặng hơn) | judgment |
| prior headache: tier | B | C | C | Ước lượng thuần, không có số liệu lý do đi khám | — |
| fever (freq) | occasional | frequent; child_5_12 occasional | occasional, không tách tuổi | Hai số liệu 15% (trẻ) và 46,8% (người lớn, hồi cứu) nằm hai bên ranh giới; MSD, CDC: sốt ít gặp hoặc nhẹ ở trẻ lớn và người lớn | pappas-pidj-2008, iyadorai-virolj-2024, msd-common-cold, cdc-common-cold |
| fever_max_temp | 0,55/0,35/0,10 | 0,50/0,38/0,12 | 0,52/0,37/0,11 | Lệch nhỏ (TVD 0,05); lấy trung bình | byt-qd-5643-2015, cdc-common-cold |
| fever_duration | 0,65/0,30/0,03/0,02 | 0,62/0,33/0,04/0,01 | 0,63/0,32/0,04/0,01 | Lấy trung bình | byt-qd-5643-2015 mục 5.1, nhs-common-cold |
| nasal_congestion | very_frequent | frequent; trẻ em very_frequent | very_frequent, không tách tuổi | NHS xếp vào triệu chứng chính; số 60,5% của B là hồi cứu (dễ thấp hơn thực tế); khoảng 76% người nghi viêm xoang nhưng không có viêm xoang có nghẹt mũi | nhs-common-cold, pappas-pidj-2008, iyadorai-virolj-2024, ebell-afm-2019 |
| headache: freq_by_age | không | child_2m_5y, child_5_12: occasional | Theo B | Trẻ tuổi đi học chỉ 15% đau đầu lúc khởi phát; trẻ dưới 12 tuổi có triệu chứng hô hấp âm tính COVID-19: 10,2% | pappas-pidj-2008, marquez-jamanetwopen-2022 |
| myalgia: freq_by_age | không | không | Thêm child_2m_5y, child_5_12: occasional | Trẻ ít tự báo đau cơ (4,8% ở trẻ dưới 12 tuổi âm tính COVID-19); cúm và COVID-19 đã hạ mức ở trẻ, nếu cảm lạnh không hạ thì câu "không đau cơ" ở trẻ sẽ nghiêng sai về cúm | marquez-jamanetwopen-2022 |
| fatigue | frequent | không có | Giữ (A), thêm occasional cho trẻ dưới 12 tuổi | NHS: mệt là triệu chứng chính; trẻ ít tự báo (4,7%) | nhs-common-cold, todd-irv-2018, marquez-jamanetwopen-2022 |
| productive_cough | không có | frequent | Giữ (B) | 5643: lúc đầu ho khan, sau ho có đờm; GRACE: 79% người ho cấp có đờm | byt-qd-5643-2015, vanvugt-bmj-2013 |
| loss_of_smell_taste | rare | rare | Bỏ liên kết | Mức rare (2,5%) cao hơn tỷ lệ nền 1%, bộ kiểm tra cảnh báo. Cảm lạnh vẫn có thể giảm ngửi (NHS; 3,0% người có triệu chứng âm tính COVID-19), nên very_rare là sai; bỏ liên kết để dùng tỷ lệ nền | nhs-common-cold, marquez-jamanetwopen-2022 |
| facial_pain_pressure | occasional | không có | Giữ (A) | NHS: có thể căng tai, mặt; 37% người nghi viêm xoang nhưng không có viêm xoang đau hàm hoặc trán | nhs-common-cold, ebell-afm-2019 |
| pleuritic_chest_pain | rare | không có | occasional | Đọc lại GRACE: 46% người ho cấp ở tuyến ban đầu (95% không viêm phổi) có đau ngực; rare quá thấp | vanvugt-bmj-2013 |
| symptoms_worsen_after_improving | rare | occasional | rare (A) | Lệch một mức; số của B lấy từ nhóm nghi viêm xoang (đã chọn lọc). Chọn mức thận trọng: câu "có" hướng sang biến chứng | byt-qd-5643-2015, cdc-sinus-infection |
| ear_pain | không có | occasional | rare | 5643 nêu đau nhói lan lên tai (bài này gồm cả viêm họng do vi khuẩn); Kontiokari: đau tai gặp ở viêm tai giữa nhiều gấp 21,3 lần nhiễm trùng hô hấp trên không viêm tai. Rare (dưới tỷ lệ nền 5%) để câu "có" hướng sang viêm tai giữa | kontiokari-pidj-1998, byt-qd-5643-2015 |
| rash_any | không có | rare | Giữ (B) | Ban không thuộc bệnh cảnh cảm lạnh; 5643 lưu ý có thể là khởi đầu của sởi | msd-common-cold, byt-qd-5643-2015 |
| sick_contact_respiratory | không có | frequent | Giữ (B) | Lây trong hộ gia đình (45% hộ có nhiều ca rhinovirus có ca liên quan về thời gian) | nguyen-jcv-2016, byt-qd-5643-2015 |
| headache_duration, headache_location, headache_course, headache_severity | có | không có | Giữ (A) | Dùng khi triệu chứng chính là đau đầu; ước lượng hợp lý, bậc C | cdc-common-cold, msd-common-cold |
| warning_signs | 4 dấu hiệu | 7 dấu hiệu | Hợp hai danh sách | Các dấu hiệu B thêm (co giật, cứng gáy, ban không mất khi ấn) đều là dấu hiệu cấp cứu | — |
| self_care_vi, see_doctor_vi | | | Gộp | Bỏ câu súc họng nước muối (chưa đối chiếu được); giữ các câu có nguồn | nhs-common-cold, msd-common-cold, byt-qd-2760-2023 |

Các trường giống nhau, giữ nguyên: tên chính, mã J00, MONDO, urgency 5, cant_miss false, prior fever (mặc định P2, trẻ 2 tháng–12 tuổi P1), prior headache P3, runny_nose, sore_throat, cough, headache (mặc định frequent), myalgia (mặc định frequent), purulent_nasal_discharge, nasal_symptoms_over_10_days, breathing_difficulty.

## 2. Nguồn

- Thêm vào sổ nguồn và đã mở lại: nguyen-jcv-2016, todd-irv-2018, pappas-pidj-2008 (tóm tắt), iyadorai-virolj-2024, marquez-jamanetwopen-2022, ebell-afm-2019, vanvugt-bmj-2013, thompson-bmj-2013, kontiokari-pidj-1998 (tóm tắt), cdc-common-cold, nhs-common-cold, msd-common-cold, cdc-sinus-infection.
- Gộp ID trùng: `todd-2018-hcmc-ili` → `todd-irv-2018`; `nguyen-2016-household-ili-vietnam` → `nguyen-jcv-2016`; `pappas-2008-cold-children` → `pappas-pidj-2008`; `iyadorai-2024-cccov-influenza` → `iyadorai-virolj-2024`; `ebell-2019-rhinosinusitis-signs` → `ebell-afm-2019`; `struyf-2022-cochrane-covid-symptoms` → `struyf-cochrane-2022`.
- Nguồn có sẵn, dùng lại: byt-qd-5643-2015 (lượt C mở lại bản PDF trên vnras.com, đối chiếu bài Viêm mũi họng cấp tính mục 2, 3.1.1, 3.2, 5.1; không sửa sổ nguồn), byt-qd-2760-2023 (chỉ dùng cho lời khuyên không tự dùng aspirin, ibuprofen; đã đối chiếu dòng "Không dùng aspirin, analgin, ibuprofen").

## 3. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior cho sốt (P1 ở trẻ 2 tháng–12 tuổi, P2 người lớn, P3 từ 65 tuổi) và prior cho đau đầu (P3).
- Mức occasional cho trẻ dưới 12 tuổi ở đau đầu, đau cơ, mệt.
- fatigue frequent; facial_pain_pressure occasional; pleuritic_chest_pain occasional; symptoms_worsen_after_improving rare; ear_pain rare; rash_any rare; breathing_difficulty rare; sick_contact_respiratory frequent; nasal_symptoms_over_10_days occasional.
- Bốn phân bố về đau đầu và hai phân bố về sốt.

## 4. Ca kiểm thử (dev)

| Ca | Kết quả (sạch) | Nhận xét |
|---|---|---|
| d-common-cold-1 | hạng 1 (0,63; cúm 0,34), mức 5 đúng | |
| d-common-cold-2 | hạng 1 (0,75), mức 5 đúng | Đường triệu chứng chính đau đầu |
| d-common-cold-3 | hạng 1 (0,61), mức 5 đúng | Dễ nhầm viêm phổi; không thở nhanh |

Điểm cần ghi nhận: phiên dừng sớm ("confident") khi 3 bệnh hô hấp lành tính chiếm trên 80% xác suất, nên các câu phân biệt cảm lạnh với cúm (nhiệt độ cao nhất, rét run, đau cơ) thường không được hỏi; kết quả dựa chủ yếu vào prior và hệ số mùa. Đây là đặc điểm của điều kiện dừng (engine-spec mục 8), không phải lỗi của dữ liệu bệnh. Ở bản nhiễu, ca 1 và 2 lên mức 3 do câu trả lời "không rõ" ở dấu hiệu nguy hiểm (thiết kế an toàn).
