# Biên bản đối chiếu: hand_foot_mouth_disease (Bệnh tay chân miệng)

- Lượt C: `agent:pass-c`, ngày 2026-10-24 (truy cập nguồn ngày 2026-10-25).
- Bản chính thức: `knowledge/conditions/hand_foot_mouth_disease.yaml`, trạng thái `source_checked`.
- `npm run kb:check`: 0 lỗi, 0 cảnh báo ở tệp này.

## 1. Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| codes.icd10_verified | false | true | false | Lượt C chưa đối chiếu được | — |
| prior_modifiers: phía Nam theo tháng | tháng 3–5, 9–12 ×1,3; tháng 1, 2, 6–8 ×0,6 | tháng 9–12 ×1,5 | Theo A | 3312/2015 và Tu 2007 nêu hai đỉnh (tháng 3–5 và 9–12); Nguyen 2017 (đỉnh tháng 10–12) phù hợp đỉnh thứ hai. Hệ số của A có trung bình cả năm gần bằng 1 | byt-qd-3312-2015, tu-eid-2007, nguyen-scitotenv-2017 |
| prior_modifiers: cả vùng phía Nam ×1,5 | không có | có | Bỏ | Chỉ có mô tả bằng lời; cộng dồn với hệ số mùa sẽ thành gần ×2 trong tháng cao điểm và đẩy trung bình toàn quốc lên | hoang-ijid-2019 |
| prior_modifiers: Tây Nguyên | không có | mùa mưa (tháng 5–10) ×1,25 | Giữ, thêm mùa khô (tháng 11–4) ×0,75 | Số liệu 25 và 15 ca/tháng so với trung bình 20; thêm hệ số đối ứng để trung bình bằng 1 | pham-wpsar-2019 |
| fever | frequent | không có | Giữ (A) | Liên kết hiện không được dùng (bệnh chỉ có prior cho sốt) | hoang-ijid-2019, nhan-plosntd-2020 |
| fever_max_temp | 0,45/0,43/0,12 | 0,40/0,45/0,15 | 0,42/0,44/0,14 | Trung bình | byt-qd-292-2024, hoang-ijid-2019 |
| fever_duration | 0,72/0,25/0,02/0,01 | 0,70/0,26/0,03/0,01 | 0,71/0,26/0,02/0,01 | Trung bình | byt-qd-292-2024 |
| rash_non_blanching | occasional | rare | rare (B) | Câu hướng dẫn mới của danh mục ghi rõ nốt phỏng nước không tính; rare dưới tỷ lệ nền 5% (câu "có" hướng sang não mô cầu, sốt xuất huyết) | byt-qd-292-2024 |
| cough | occasional | frequent | frequent (B) | Gộp hai nghiên cứu ngoại trú 289/852 (33,9%), trên ranh giới 33% | hoang-ijid-2019, nhan-plosntd-2020 |
| runny_nose | occasional | frequent | frequent (B) | Gộp 292/852 (34,3%) | hoang-ijid-2019, nhan-plosntd-2020 |
| startle_myoclonus | occasional | rare | occasional (A) | Mức rare của B cao hơn tỷ lệ nền 1% (cảnh báo). Gộp ngoại trú 64/852 (7,5%), đúng ranh giới rare và occasional; với dấu hiệu cảnh báo của bệnh có biến chứng nguy hiểm, chọn mức mạnh hơn | hoang-ijid-2019, nhan-plosntd-2020, byt-qd-292-2024 |
| diarrhea | rare | không có | Bỏ | 5,6% và 3,8% ở ngoại trú, gần bằng tỷ lệ nền 5% | hoang-ijid-2019, nhan-plosntd-2020 |
| sore_throat | frequent | không có | Giữ (A) | 38,7–43,1% ở trẻ nằm viện; 292 nêu đau họng ở giai đoạn khởi phát | tu-eid-2007, byt-qd-292-2024 |
| drowsy_hard_to_wake | rare | không có | Bỏ | rare cao hơn tỷ lệ nền 1% (cảnh báo); số liệu 1,5% gần bằng nền; đã có quy tắc mức 2 | hoang-ijid-2019 |
| seizure_recent | rare | không có | Bỏ | Như trên (co giật ở ca cộng đồng hiếm, gần nền); đã có quy tắc mức 2 | tu-eid-2007 |
| breathing_difficulty | rare | không có | Giữ (A) | Thở nhanh, khó thở là độ 3, hiếm ở ca khám ban đầu; rare dưới tỷ lệ nền 5% | byt-qd-292-2024 |
| headache | không có | rare | Giữ (B) | 5,5% ở ngoại trú | hoang-ijid-2019 |
| child_unable_to_drink | không có | occasional | Bỏ | Không có số liệu; câu hỏi theo định nghĩa IMCI (không uống được) nặng hơn "bú kém", đã có chán ăn (frequent) và quy tắc mức 2 | byt-qd-292-2024 |
| warning_signs | 9 dấu hiệu | 7 dấu hiệu | Theo A (bao gồm B) | | byt-qd-292-2024 mục III.3.1 |
| self_care_vi, see_doctor_vi | | | Gộp | Bỏ câu về aspirin (292 không nêu; 292 cho phép ibuprofen hạ sốt) | byt-qd-292-2024 |

Các trường giống nhau, giữ nguyên: tên, mã B08.4, urgency 3, chuyên khoa, prior (P6; trẻ 2 tháng–5 tuổi P3; 5–12 tuổi P4; vị thành niên P5), mouth_ulcers, hand_foot_blisters, rash_any, rash_spreads_from_face, loss_of_appetite, vomiting, red_eyes, hfmd_contact.

## 2. Nguồn

- Thêm vào sổ nguồn và đã mở lại: hoang-ijid-2019, nhan-plosntd-2020, tu-eid-2007, pham-wpsar-2019 (toàn văn), nguyen-scitotenv-2017 (tóm tắt).
- Gộp ID trùng: `hoang-2019-hfmd-southern-vietnam` → `hoang-ijid-2019`; `nhan-2020-hfmd-southern-vietnam` → `nhan-plosntd-2020`; `nguyen-2017-hfmd-mekong` → `nguyen-scitotenv-2017`; `pham-2019-hfmd-daklak` → `pham-wpsar-2019`.
- Không đưa vào: syt-hcm-hfmd-2024 (lượt A; bản trình chiếu, chỉ dùng cho ghi chú prior).
- Nguồn có sẵn, dùng lại: byt-qd-292-2024 (lượt C tải lại bản Word trên trang Trung tâm Y tế Phú Nhuận, đối chiếu mục I, II.1.1, II.1.2, II.3.1, II.5, II.6, III.2, III.3.1); byt-qd-3312-2015 (bài Bệnh tay-chân-miệng, mục 1.2).

## 3. Giá trị dựa trên ước lượng

- Prior và mọi hệ số mùa, vùng (độ lớn hệ số phía Nam là ước lượng).
- loss_of_appetite frequent; rash_non_blanching, rash_spreads_from_face, breathing_difficulty rare; hfmd_contact occasional; startle_myoclonus occasional (ranh giới).

## 4. Ca kiểm thử (dev)

| Ca | Kết quả (sạch) | Nhận xét |
|---|---|---|
| d-hand-foot-mouth-disease-1 | hạng 1 (0,99), mức 3 đúng | Điển hình, độ 1 |
| d-hand-foot-mouth-disease-2 | hạng 1 (0,81), mức 3 đúng | Trẻ 9 tháng, chỉ loét miệng và ban; quy tắc rf_hfmd_infant |
| d-hand-foot-mouth-disease-3 | hạng 1 (0,95), mức 2 đúng | Độ 2a (giật mình, sốt từ 39°C); dễ nhầm viêm màng não |
