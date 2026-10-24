# Biên bản đối chiếu: measles (Sởi)

- Lượt C: `agent:pass-c`, ngày 2026-10-24 (truy cập nguồn ngày 2026-10-25).
- Bản chính thức: `knowledge/conditions/measles.yaml`, trạng thái `source_checked`.
- `npm run kb:check`: 0 lỗi, 0 cảnh báo ở tệp này.

## 1. Bảng khác biệt

Hai lượt rất giống nhau (11/11 liên kết chung trùng mức).

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common | không có | Bệnh sởi, Lên sởi | Không ghi (A) | Tên hiển thị lấy mục đầu của vi_common; "Sởi" đã là tên thường gọi | — |
| codes.icd10_verified | false | true | false | Lượt C chưa đối chiếu được | — |
| prior fever: by_age teen_13_17 | P5 | (mặc định P5) | Bỏ dòng thừa | Trùng mặc định | — |
| fever | almost_always | không có | Giữ (A) | Tiêu chuẩn ca bệnh; liên kết hiện không được dùng (bệnh chỉ có prior cho sốt) | byt-qd-1019-2025 mục 2.4.2, delmoral-ijidreg-2026 |
| fever_max_temp | 0,05/0,30/0,65 | 0,05/0,25/0,70 | 0,05/0,28/0,67 | Trung bình | byt-qd-1019-2025, cdc-measles-clinical-overview |
| fever_duration | 0,20/0,55/0,20/0,05 | 0,20/0,50/0,22/0,08 | 0,20/0,52/0,21/0,07 | Trung bình | byt-qd-1019-2025 mục 2.1.1 |
| vomiting | occasional | không có | Giữ (A) | 1019 mục 2.7.3: tiêu chảy và nôn trớ thường gặp trong giai đoạn cấp | byt-qd-1019-2025 |
| measles_vaccinated: nguồn | tran 2024, delmoral 2026 | do 2021 | Gộp | Nay câu hỏi chỉ hỏi từ 18 tháng tuổi; trẻ trên 18 tháng nằm viện vì sởi: 27,7% đã tiêm ít nhất 1 mũi | tran-bmcinfectdis-2024, do-jcv-2021 |
| cough, runny_nose, red_eyes, rash_any: basis | numeric (Del Moral) | verbal (1019, CDC) | numeric, kèm 1019 | Có số liệu ở ca không nhập viện | delmoral-ijidreg-2026 |
| see_doctor_vi | có câu tái khám 2–3 ngày | có câu tiêm phòng cho người tiếp xúc | Hợp hai bản | Cả hai có trong 1019 mục 3.2.1 | byt-qd-1019-2025 |

Các trường giống nhau, giữ nguyên: tên, mã B05, MONDO, urgency 3, chuyên khoa, prior (P5; trẻ 2 tháng–12 tuổi P4; từ 45 tuổi P6), rash_any, rash_spreads_from_face, rash_non_blanching (rare, dưới tỷ lệ nền 5%), red_eyes, cough, runny_nose, diarrhea, ear_pain, breathing_difficulty, measles_vaccinated (occasional), measles_contact (occasional), warning_signs.

## 2. Nguồn

- Thêm vào sổ nguồn và đã mở lại: delmoral-ijidreg-2026, nguyentien-wpsar-2026, tran-bmcinfectdis-2024, do-jcv-2021 (tóm tắt), cdc-measles-clinical-overview.
- Gộp ID trùng: `cdc-measles-clinical` → `cdc-measles-clinical-overview`; `nguyentien-2026-measles-dongnai` → `nguyentien-wpsar-2026`; `do-2021-measles-north-vietnam` → `do-jcv-2021`.
- Không đưa vào: ong-eid-2025 (lượt A, chỉ dùng cho ghi chú prior; số liệu đã có trong Nguyen-Tien 2026).
- Nguồn có sẵn, dùng lại: byt-qd-1019-2025 (lượt C tải lại PDF ký số trên cổng Sở Y tế Huế, đối chiếu mục 1, 2.1.1, 2.1.2, 2.3, 2.4, 2.6, 2.7, 3.2.1).

## 3. Giá trị dựa trên ước lượng

- Prior theo tuổi (phụ thuộc mạnh vào đợt dịch).
- diarrhea, vomiting, ear_pain, breathing_difficulty occasional (1019 chỉ mô tả bằng lời).
- Phân bố nhiệt độ và số ngày sốt.
- measles_vaccinated occasional: số liệu ở trẻ nằm viện, câu hỏi về đủ 2 mũi.

## 4. Ca kiểm thử (dev)

| Ca | Kết quả (sạch) | Nhận xét |
|---|---|---|
| d-measles-1 | hạng 1 (0,93), mức 3 đúng | Điển hình |
| d-measles-2 | hạng 1 (0,85), mức 3 đúng | Giai đoạn khởi phát, chưa phát ban |
| d-measles-3 | hạng 1 (0,54; cảm lạnh 0,23), mức 3 đúng | Dễ nhầm sốt xuất huyết; sốt xuất huyết (lô 2) chưa có trong dữ liệu, cần chạy lại |
