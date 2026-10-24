# Biên bản đối chiếu: influenza (Cúm mùa)

- Lượt C: `agent:pass-c`, ngày 2026-10-24 (truy cập nguồn ngày 2026-10-25).
- Bản chính thức: `knowledge/conditions/influenza.yaml`, trạng thái `source_checked`.
- `npm run kb:check`: 0 lỗi, 0 cảnh báo ở tệp này.

## 1. Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common | Cúm | Cúm, Cảm cúm | Theo A | "Cảm cúm" là từ dân gian, cũng được dùng cho cảm lạnh (5643 gọi viêm mũi do vi rút là "cảm cúm"); dễ gây nhầm | docs/style-guide-vi.md mục 4 |
| codes.icd10_verified | false | true | false | Lượt C chưa đối chiếu được | — |
| summary_vi | 3 câu | 3 câu | Gộp | | byt-qd-1840-2025 mục I, II.1.1 |
| specialties | general_medicine, infectious_disease, pediatrics | infectious_disease, general_medicine | Theo B | Bộ suy luận tự thêm "Nhi khoa" cho trẻ | engine-spec mục 9 |
| prior fever: basis | numeric | judgment | judgment, ghi số trong reported | Số liệu là tỷ lệ cúm trong ca giống cúm, không phải trong mọi người sốt | nguyen-vaccine-2013, todd-irv-2018 |
| prior headache: tier | B | C | C | Ước lượng thuần | — |
| prior_modifiers: mùa đông xuân (miền Bắc) | tháng 12–5, ×1,5 | tháng 12–4, ×1,5 | tháng 12–4, ×1,5 | Bài báo không ghi tháng từng mùa; chỉ lấy các tháng thuộc đông hoặc xuân theo cả hai cách chia mùa | nguyen-jcv-2016 bảng 3, byt-qd-1840-2025 |
| prior_modifiers: mùa hè thu (miền Bắc) | tháng 6–11, ×0,5 | tháng 6–9, ×0,5 | tháng 6–10, ×0,5 | Như trên; tháng 5 và 11 để trung tính, trung bình cả năm bằng 1 | nguyen-jcv-2016 |
| fever_max_temp | 0,12/0,48/0,40 | 0,15/0,45/0,40 | 0,13/0,47/0,40 | Trung bình | silvennoinen-pidj-2009, todd-irv-2018 |
| fever_duration | 0,55/0,38/0,05/0,02 | 0,50/0,42/0,06/0,02 | 0,52/0,40/0,06/0,02 | Trung bình | byt-qd-1840-2025 mục II.1.1 |
| myalgia | very_frequent | frequent; child_2m_5y occasional | very_frequent; trẻ dưới 12 tuổi occasional | Số gộp 0,59 của Ebell trộn trẻ em với người lớn; người lớn có hội chứng giống cúm 90,7% (Todd); trẻ 7–13 tuổi 13% (Silvennoinen) | todd-irv-2018, silvennoinen-pidj-2009, ebell-bmjopen-2025 |
| headache | very_frequent | frequent | very_frequent; child_5_12 frequent; child_2m_5y occasional | Như đau cơ: người lớn 92,9%, trẻ 7–13 tuổi 39%, gộp 0,65 | todd-irv-2018, silvennoinen-pidj-2009, ebell-bmjopen-2025 |
| fatigue: freq_by_age | không | child_2m_5y occasional | Theo B | Ebell: người lớn 0,82, trẻ dưới 5 tuổi 0,27 | ebell-bmjopen-2025 |
| sore_throat | very_frequent | frequent | very_frequent (A) | Đau họng gặp như nhau ở cúm và nhiễm vi rút khác (Todd 89,1% và 86,3%; Ebell LR+ 1,1); cảm lạnh để very_frequent theo cùng nguồn, nên cúm cũng very_frequent để đau họng không nghiêng sai về cảm lạnh | todd-irv-2018, ebell-bmjopen-2025 |
| nasal_congestion | very_frequent | frequent | very_frequent (A) | Số gộp 0,69 thuộc khoảng very_frequent; số 39,6% của B là hồi cứu | ebell-bmjopen-2025 |
| vomiting | occasional | rare; trẻ em occasional | Theo B | Người lớn có hội chứng giống cúm: triệu chứng tiêu hóa 6,8%; 1840, CDC: trẻ em có thể nôn | todd-irv-2018, byt-qd-1840-2025, cdc-flu-clinical-signs |
| loss_of_smell_taste | rare | rare | Bỏ liên kết | Cao hơn tỷ lệ nền 1% (bộ kiểm tra cảnh báo); very_rare là sai vì cúm vẫn có thể giảm ngửi | struyf-cochrane-2022, marquez-jamanetwopen-2022 |
| headache_duration, location, course, severity | có | không có | Giữ (A) | Ước lượng, bậc C | byt-qd-1840-2025, cdc-flu-clinical-signs |
| loss_of_appetite | không có | frequent | Giữ (B) | Ebell 0,51 | ebell-bmjopen-2025 |
| arthralgia | không có | occasional | Giữ (B) | Ebell 0,29 | ebell-bmjopen-2025 |
| pleuritic_chest_pain | không có | occasional | Giữ (B) | Ebell đau ngực 0,25 (đau ngực chung) | ebell-bmjopen-2025 |
| diarrhea | không có | occasional | Giữ (B) | Ebell 0,14 | ebell-bmjopen-2025 |
| rash_any | không có | rare | Giữ (B) | Ebell 0,04, LR+ 0,58 | ebell-bmjopen-2025 |
| breathing_difficulty | không có | occasional | Bỏ | Không có số liệu tần suất; ở cộng đồng khó thở gặp ở 6–8% người có triệu chứng hô hấp (Marquez), gần bằng tỷ lệ nền 5%; 1840 xếp khó thở vào cúm nặng, đã có quy tắc rf_fever_breathing, rf_high_risk_fever_breathing | byt-qd-1840-2025, marquez-jamanetwopen-2022 |
| sick_contact_respiratory | không có | frequent | Giữ (B) | 1840: ca nghi ngờ cần yếu tố dịch tễ; 58% hộ có nhiều ca cúm có ca liên quan về thời gian | byt-qd-1840-2025, nguyen-jcv-2016 |
| warning_signs | có persistent_vomiting | có child_unable_to_drink | Hợp hai danh sách | | |
| self_care_vi, see_doctor_vi | | | Gộp | Bỏ câu về aspirin không dẫn được nguồn cúm; dùng câu của 2760 | byt-qd-1840-2025, byt-qd-2760-2023 |

Các trường giống nhau, giữ nguyên: tên chính, mã J11, MONDO, urgency 5, prior fever P2, prior headache P3, fever, chills_rigors, fatigue (mặc định), cough, productive_cough, runny_nose.

## 2. Nguồn

- Thêm vào sổ nguồn và đã mở lại: ebell-bmjopen-2025, todd-irv-2018, nguyen-jcv-2016, nguyen-vaccine-2013 (tóm tắt), silvennoinen-pidj-2009 (tóm tắt), cdc-flu-clinical-signs, struyf-cochrane-2022, marquez-jamanetwopen-2022.
- Không đưa vào: call-jama-2005, monto-aim-2000 (lượt A; số liệu đã có trong tổng quan Ebell 2025, mới hơn), iyadorai-virolj-2024 cho cúm (số đau đầu 9,8%, đau cơ 19,4% thấp bất thường do hồi cứu).
- Nguồn có sẵn, dùng lại: byt-qd-1840-2025 (lượt C mở lại PDF ký số, đối chiếu mục I, II.1.1, II.1.2, II.2.3, II.2.4.1, III.2.2); byt-qd-2760-2023.

## 3. Giá trị dựa trên ước lượng

- Prior P2 (sốt), P3 (đau đầu); tháng của từng mùa trong hệ số mùa.
- productive_cough occasional; vomiting rare ở người lớn; sick_contact_respiratory frequent; bốn phân bố đau đầu; mức occasional ở trẻ dưới 5 tuổi cho đau đầu.

## 4. Ca kiểm thử (dev)

| Ca | Kết quả (sạch) | Nhận xét |
|---|---|---|
| d-influenza-1 | hạng 1 (0,61; cảm lạnh 0,37), mức 5 đúng | Phiên không hỏi nhiệt độ cao nhất, rét run, đau cơ (dừng khi 3 bệnh hô hấp chiếm trên 80%); cúm thắng nhờ hệ số tháng 1 ở miền Bắc |
| d-influenza-2 | hạng 1 (0,72), mức 3 đúng | Người cao tuổi; quy tắc rf_high_risk_fever |
| d-influenza-3 | hạng 1 (0,56), mức 5 đúng | Dễ nhầm viêm màng não; chưa có bệnh viêm màng não trong dữ liệu (lô 2), cần chạy lại khi lô 2 xong |
