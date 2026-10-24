# Biên bản đối chiếu: covid19 (COVID-19)

- Lượt C: `agent:pass-c`, ngày 2026-10-24 (truy cập nguồn ngày 2026-10-25).
- Bản chính thức: `knowledge/conditions/covid19.yaml`, trạng thái `source_checked`.
- `npm run kb:check`: 0 lỗi, 0 cảnh báo ở tệp này.

## 1. Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common | không có | Bệnh COVID-19, Nhiễm vi rút corona | Không ghi (A) | Tên hiển thị lấy mục đầu của vi_common; "Nhiễm vi rút corona" dễ nhầm với coronavirus gây cảm lạnh | — |
| codes.icd10_verified | false | true | false | Lượt C chưa đối chiếu được | — |
| specialties | infectious_disease, general_medicine, respiratory | infectious_disease, general_medicine | Theo B | Ca nhẹ không cần chuyên khoa hô hấp | byt-qd-2671-2023 |
| prior fever, headache: tier | B | C | C | Không có số liệu lưu hành 2025–2026; ước lượng thuần | — |
| fever | occasional | frequent | occasional (A) | Omicron: 30,4% (22,5% ở người đã tiêm nhắc); số gộp 37,6% chủ yếu trước Omicron; sốt giảm khi Omicron chiếm ưu thế | marquez-jamanetwopen-2022, struyf-cochrane-2022, vihta-cid-2022 |
| sore_throat | frequent | very_frequent | frequent (A) | ZOE 70,5% tính trong 14 ngày quanh xét nghiệm; lúc xét nghiệm 43,4% (Marquez) | marquez-jamanetwopen-2022, menni-lancet-2022 |
| runny_nose | frequent | very_frequent | frequent (A) | Như đau họng; trước Omicron 30,3% | menni-lancet-2022, struyf-cochrane-2022 |
| headache | frequent | very_frequent; trẻ em occasional/frequent | frequent; trẻ dưới 12 tuổi occasional | Trung bình ZOE (74,7%, 14 ngày) và Marquez (35,5%); trẻ dưới 12 tuổi 17,6% | menni-lancet-2022, marquez-jamanetwopen-2022 |
| myalgia | occasional | frequent; trẻ em occasional | occasional (A), không tách tuổi | Omicron 28,6%; gộp trước Omicron 37,5%; trẻ em 8,6% vẫn thuộc occasional | marquez-jamanetwopen-2022, struyf-cochrane-2022 |
| fatigue: freq_by_age | không | không | Thêm trẻ dưới 12 tuổi: occasional | Trẻ dưới 12 tuổi dương tính: 7,6% (Marquez); Struyf: độ nhạy thấp hơn ở trẻ | marquez-jamanetwopen-2022, struyf-cochrane-2022 |
| productive_cough | occasional | không có | Giữ (A) | 2671 mô tả ho khan | byt-qd-2671-2023 mục III.3.1 |
| nasal_congestion | frequent | không có | Giữ (A) | Omicron 38,8% | marquez-jamanetwopen-2022 |
| headache_duration, location, course | có | không có | Giữ (A) | Ước lượng, bậc C | byt-qd-2671-2023 |
| diarrhea | không có | occasional | Bỏ | Trước Omicron 18,5%; Omicron 4,8%, gần bằng tỷ lệ nền 5% | struyf-cochrane-2022, marquez-jamanetwopen-2022 |
| sick_contact_respiratory | không có | frequent | Giữ (B) | 2671: ca nghi ngờ cần yếu tố dịch tễ | byt-qd-2671-2023 mục II.2.1 |
| fever_duration | không có | 0,55/0,37/0,06/0,02 | Giữ (B), bậc C | Ước lượng; Omicron triệu chứng trung bình 6,9 ngày | byt-qd-2671-2023, menni-lancet-2022 |
| covid_self_test | không có | dương tính 0,22, âm tính 0,08, chưa xét nghiệm 0,70 | Giữ (B) | Đúng hướng dẫn của lô: "chưa xét nghiệm" = 0,70 như tỷ lệ nền; 0,22/0,30 = 73% (độ nhạy ở người có triệu chứng) | dinnes-cochrane-2022 |
| warning_signs | có severe_weakness | có chest_pain_pressure | Hợp hai danh sách | | |
| see_doctor_vi | trên 60 tuổi, bệnh nền, có thai, chưa tiêm | cao tuổi, bệnh nền, có thai, suy giảm miễn dịch | Theo bảng 5 của 2671 | Thêm hút thuốc lá; giữ mốc trên 60 tuổi | byt-qd-2671-2023 bảng 5 |

Các trường giống nhau, giữ nguyên: tên, mã U07.1, MONDO, urgency 5, prior fever P3, prior headache P4, cough, fatigue (mặc định), loss_of_smell_taste, breathing_difficulty.

## 2. Nguồn

- Thêm vào sổ nguồn và đã mở lại: struyf-cochrane-2022, marquez-jamanetwopen-2022, menni-lancet-2022, vihta-cid-2022 (tóm tắt), dinnes-cochrane-2022 (tóm tắt).
- Gộp ID trùng: `menni-2022-omicron-symptoms` → `menni-lancet-2022`; `struyf-2022-cochrane-covid-symptoms` → `struyf-cochrane-2022`; `dinnes-2022-cochrane-covid-antigen` → `dinnes-cochrane-2022`.
- Nguồn có sẵn, dùng lại: byt-qd-2671-2023 (lượt C mở lại PDF ký số, đối chiếu mục 2.1, 3.1, 5.1, 5.2.1, bảng 4, bảng 5); byt-qd-2760-2023.

## 3. Giá trị dựa trên ước lượng

- Prior P3 (sốt), P4 (đau đầu), không có số liệu 2025–2026.
- productive_cough occasional; sick_contact_respiratory frequent; fever_duration; ba phân bố đau đầu; mức occasional ở trẻ em.

## 4. Ca kiểm thử (dev)

| Ca | Kết quả (sạch) | Nhận xét |
|---|---|---|
| d-covid19-1 | hạng 3 (0,02; cúm 0,51, cảm lạnh 0,47), mức 5 đúng | Câu tự xét nghiệm không được hỏi |
| d-covid19-2 | hạng 2 (0,07; viêm xoang 0,85), mức 4 (đúng là 5, khuyên quá mức) | Đường đau đầu; câu tự xét nghiệm và "quá 10 ngày" không được hỏi |
| d-covid19-3 | hạng 3 (0,03; cúm 0,80), mức 3 đúng | Câu tự xét nghiệm không được hỏi |

Mâu thuẫn ghi nhận: cả 3 ca đều có kết quả tự xét nghiệm dương tính nhưng bộ suy luận không hỏi câu này. Phiên dừng ("confident") khi mức xử trí ổn định, VOI dưới 0,01 và 3 bệnh đầu chiếm từ 80%; vì cảm lạnh, cúm, COVID-19 cùng mức xử trí và cùng nằm trong 3 bệnh đầu, câu phân biệt mạnh nhất không bao giờ được chọn. Không sửa tham số bệnh để "ép" kết quả; đề xuất người bảo trì xem lại điều kiện dừng (ví dụ đòi hỏi EIG thấp hoặc bệnh đầu đủ cao) hoặc hỏi bắt buộc `covid_self_test` khi có sốt kèm triệu chứng hô hấp.
