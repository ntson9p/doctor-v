# Biên bản đối chiếu: encephalitis (Viêm não cấp)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 2 phần b, 27/10/2026.
- Bản chính thức: `knowledge/conditions/encephalitis.yaml`, trạng thái `source_checked`.
- Mức xử trí 1, không được bỏ sót: hai lượt thống nhất.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi / vi_common | Viêm não; [Viêm não Nhật Bản, Viêm não do vi rút] | Viêm não cấp; [Viêm não] | Viêm não cấp; [Viêm não, Viêm não Nhật Bản] | Tên bài trong 3312 là "Viêm não", định nghĩa dùng "viêm não cấp"; giữ "viêm não Nhật Bản" để tìm kiếm | 3312/QĐ-BYT (2015) tr. 489 |
| codes.mondo | MONDO:0019956 | không có | Bỏ | Chưa kiểm tra được | – |
| Prior Sốt, dưới 2 tháng | P5 | P6 (mặc định) | P5 | Lệch một mức, nguồn ngang nhau: chọn mức an toàn hơn; nhóm này chỉ sàng lọc, sốt đã ở mức 2 | 3312 (herpes sơ sinh) |
| Prior Đau đầu, người lớn và thiếu niên | P6 | P5 | P5 | Lệch một mức, nguồn ngang nhau: mức an toàn hơn; ở ranh giới P5/P6; phần cộng vào khối bệnh không được bỏ sót khoảng 0,08% | Ho Dang Trung 2012, Ngan 2024, 5642 |
| Prior Đau đầu, trẻ 2 tháng–5 tuổi | P6 (mặc định) | P6 | P6 | Trùng | – |
| Hệ số mùa hè | tháng 5–7, mọi vùng, 1,5 | miền Bắc, tháng 5–7, 1,5 | Miền Bắc, 1,5 | Brindle 2023: miền Nam không có mùa rõ | Brindle 2023, 3312, Takamatsu 2013 |
| Hệ số mùa đông | không có | miền Bắc, tháng 11–3, 0,6 | Giữ | Tháng 1 thấp nhất; 3312: tăng vào tháng 3–8 | Brindle 2023, 3312 |
| fever_max_temp | 0,12/0,38/0,50 | 0,08/0,32/0,60 | 0,10/0,35/0,55 | Trung bình | Huong 2024, Takamatsu 2013 |
| fever_duration | 0,40/0,42/0,12/0,06 | 0,35/0,45/0,12/0,08 | 0,38/0,43/0,12/0,07 | Trung bình | Huong 2024, Ngan 2024 |
| headache freq_by_age | thêm dưới 2 tháng: rare | không có | Giữ rare | Có cơ sở như viêm màng não vi khuẩn | 3312 |
| headache_course, duration, severity | xem bản A | xem bản B | Trung bình | Phân bố ước lượng | 3312, 5642 |
| headache_location | không có | có | Giữ | Ước lượng hợp lý | 5642 |
| confusion | frequent | very_frequent | very_frequent | Lệch một mức; số liệu 68–97% và là tiêu chuẩn định nghĩa ca; "không lú lẫn" giảm mạnh khả năng ở số đông trẻ sốt thường (ít đẩy khối bệnh không được bỏ sót) | Takamatsu 2013, Ngan 2024, Kakoti 2013, Zhang 2023 |
| drowsy_hard_to_wake freq_by_age | không có | dưới 5 tuổi: very_frequent | Giữ | Câu lú lẫn không hỏi dưới 5 tuổi | 3312, Huong 2024 |
| seizure_recent | frequent mọi tuổi | occasional; trẻ 2 tháng–12 tuổi frequent | Theo lượt B | Có số liệu theo tuổi: người lớn 20–36%, trẻ em 55–82% | Zhang 2023, Ngan 2024, Takamatsu 2013, Huong 2024 |
| rash_any | rare | không có | Giữ rare | Takamatsu 2013: 2%; dưới tỷ lệ nền 5% | Takamatsu 2013 |
| warning_signs | có persistent_vomiting | có es_unresponsive_or_seizing | Hợp cả hai | Đều là dấu hiệu nặng | NHS, 3312 |
| Nguồn CDC | trang cho nhân viên y tế | CDC Yellow Book | Dùng trang cho nhân viên y tế | Trùng nội dung; một nguồn đủ | CDC |

Các liên kết trùng mức: fever, headache (mức chung và trẻ em), drowsy_hard_to_wake, neck_stiffness, vomiting, es_stroke_signs.

## Giá trị dựa trên nhận định

- Mọi prior (không có số liệu ở người đi khám vì sốt, đau đầu).
- Hai hệ số mùa ở miền Bắc (1,5 và 0,6).
- Các phân bố số ngày sốt, mức độ, kiểu, thời gian, vị trí đau đầu.
- Hạ một mức số liệu bệnh viện cho co giật ở trẻ em, cứng gáy (từ 55–86% xuống occasional).

## Đề xuất (không đưa vào danh mục ở lô này)

- Dấu hiệu `behavior_change_new` ("Mới thay đổi tính tình, hành vi lạ") của lượt B: chưa thêm vì bộ ca giữ kín được viết khi chưa có dấu hiệu này.
- Câu hỏi tiêm vắc xin viêm não Nhật Bản.
- Người bảo trì: thêm encephalitis vào `conditions` của rf_altered_consciousness, rf_new_seizure; thêm vào `cant_miss` của Sốt, Đau đầu.

## Ca dev

- Viết mới: d-encephalitis-1, -2, -3.
- Ca d-from-h-fever-038 đổi bệnh đúng từ "other" thành encephalitis (xem báo cáo chung của lượt C).
