# Biên bản đối chiếu: acute_otitis_media (Viêm tai giữa cấp tính)

- Lượt C: `agent:pass-c`, ngày 2026-10-24 (truy cập nguồn ngày 2026-10-25).
- Bản chính thức: `knowledge/conditions/acute_otitis_media.yaml`, trạng thái `source_checked`.
- `npm run kb:check`: 0 lỗi, 0 cảnh báo ở tệp này.

## 1. Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi | Viêm tai giữa cấp tính | Viêm tai giữa cấp | Theo A | Tên bài của 5643 | byt-qd-5643-2015 |
| names.vi_common | Viêm tai giữa cấp | Viêm tai giữa, Viêm tai | Viêm tai giữa | "Viêm tai" quá rộng (gồm viêm tai ngoài) | — |
| codes.icd10_verified | false | true | false | Lượt C chưa đối chiếu được | — |
| prior fever: default | P5 | P4 | P5 (A) | Hai bản cho cùng mức ở mọi nhóm tuổi được xếp hạng (trẻ 2 tháng–5 tuổi P2, 5–12 tuổi P3, vị thành niên P4, người lớn P5); chỉ khác ở trẻ dưới 2 tháng, nhóm không xếp hạng | — |
| prior: tier | B | C | B | Có số liệu Fortanier, Laine làm căn cứ | fortanier-plosone-2015, laine-pediatrics-2010 |
| fever | frequent | không có | Giữ (A) | Liên kết hiện không được dùng (bệnh chỉ có prior cho sốt) | laine-pediatrics-2010, kontiokari-pidj-1998 |
| fever_max_temp | 0,20/0,45/0,35 | không có | Bỏ (B) | Laine: nhiệt độ cao nhất không phân biệt được trẻ có và không có viêm tai | laine-pediatrics-2010 |
| fever_duration | 0,60/0,33/0,05/0,02 | 0,55/0,37/0,05/0,03 | 0,57/0,35/0,05/0,03 | Trung bình | thompson-bmj-2013 |
| ear_pain: freq_by_age | không | child_2m_5y frequent | Theo B | Trẻ chưa biết nói chỉ quấy, dụi tai; Laine: dụi tai không dự đoán được bệnh | msd-acute-otitis-media, laine-pediatrics-2010 |
| runny_nose | frequent | very_frequent | very_frequent (B) | 5643: thể điển hình là trẻ đang sổ mũi, ngạt mũi; Laine: triệu chứng hô hấp như nhau ở trẻ có và không có viêm tai, nên để cùng mức cảm lạnh. Số 40% của A từ một quần thể đặc thù (trẻ bản địa ở Úc) | byt-qd-5643-2015, laine-pediatrics-2010 |
| nasal_congestion | frequent | very_frequent | very_frequent (B) | Như trên | byt-qd-5643-2015 |
| vomiting | occasional | không có | Bỏ (B) | 5643, MSD có nêu nôn ở trẻ nhỏ, nhưng Laine cho thấy triệu chứng tiêu hóa như nhau ở trẻ có và không có viêm tai; liên kết riêng cho viêm tai sẽ tạo phân biệt giả với cảm lạnh | laine-pediatrics-2010 |
| rash_any | không có | rare | Giữ (B) | Ban không thuộc bệnh cảnh | msd-acute-otitis-media |
| mouth_ulcers | không có | rare | Giữ (B) | Gợi ý tay chân miệng | msd-acute-otitis-media |
| warning_signs | 4 dấu hiệu | thêm swelling_behind_ear | Theo B | Dấu hiệu viêm xương chũm | byt-qd-5643-2015 |
| see_doctor_vi | | | Gộp, sửa | Trẻ dưới 12 tháng: NHS xếp vào nhóm "khám bác sĩ" (không gấp) nên bỏ chữ "trong ngày" của lượt B; giữ khám trong ngày khi sốt từ 39°C, chảy mủ tai, nôn, đau quá 2 ngày | nhs-ear-infections, msd-acute-otitis-media |

Các trường giống nhau, giữ nguyên: mã H66.0, MONDO, urgency 4, chuyên khoa, ear_pain (mặc định very_frequent), ear_discharge, cough, breathing_difficulty.

## 2. Nguồn

- Thêm vào sổ nguồn và đã mở lại: rothman-jama-2003, kontiokari-pidj-1998, laine-pediatrics-2010, fortanier-plosone-2015 (đều đọc tóm tắt), thompson-bmj-2013 (toàn văn), nhs-ear-infections, msd-acute-otitis-media.
- Gộp ID trùng: `laine-2010-aom-symptoms` → `laine-pediatrics-2010`; `rothman-2003-aom-rce` → `rothman-jama-2003`.
- Không đưa vào: abbott-plosone-2023 (lượt A; quần thể đặc thù, không còn dùng).
- Nguồn có sẵn, dùng lại: byt-qd-5643-2015 (lượt C mở lại bản PDF trên vnras.com, bài Viêm tai giữa cấp tính trẻ em và Viêm xương chũm cấp tính trẻ em).

## 3. Giá trị dựa trên ước lượng

- Prior theo tuổi; ear_discharge occasional; cough frequent; ear_pain frequent ở trẻ dưới 5 tuổi; runny_nose, nasal_congestion very_frequent (mô tả bằng lời); rash_any, mouth_ulcers, breathing_difficulty rare.

## 4. Ca kiểm thử (dev)

| Ca | Kết quả (sạch) | Nhận xét |
|---|---|---|
| d-acute-otitis-media-1 | hạng 1 (0,92), mức 4 đúng | |
| d-acute-otitis-media-2 | hạng 1 (0,94), mức 4 đúng | Trẻ 7 tháng |
| d-acute-otitis-media-3 | hạng 1 (0,94), mức 4 (đúng là 3, thấp hơn mức cần) | Sốt 39,6°C kèm nôn: NHS khuyên khám gấp. Không có quy tắc nào bắt "đau tai kèm sốt từ 39°C hoặc nôn", nên phiên không hỏi nhiệt độ và nôn |

Mâu thuẫn ghi nhận: ca 3 thấp hơn mức cần một bậc (không phải cấp cứu). Không đổi urgency của bệnh (ca điển hình chưa biến chứng là mức 4). Đề xuất quy tắc mức 3: trẻ có đau tai kèm sốt từ 39°C, nôn hoặc chảy dịch tai (NHS Ear infections; MSD: sốt từ 39°C, chảy mủ tai là tiêu chí dùng kháng sinh).
