# Biên bản đối chiếu: Ngộ độc khí carbon monoxide (`carbon_monoxide_poisoning`)

- Người đối chiếu: `agent:pass-c` (Giai đoạn 3, lô 1, phần a), ngày 2026-10-25.
- Bản nháp: `.../pass-a/carbon_monoxide_poisoning.yaml`, `.../pass-b/carbon_monoxide_poisoning.yaml`.
- Bản chính thức: `knowledge/conditions/carbon_monoxide_poisoning.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 22, lượt B 20 (kèm 1 dấu hiệu đề xuất), chung 15; bản chính thức 25 liên kết.
- Nguồn đã mở lại: 3610/QĐ-BYT bài 33 (vnras.com); NHS Carbon monoxide poisoning, CDC CO Basics, MMWR 2005 (curl); Jüttner 2021, Lu 2015, Pepe 2011 (Europe PMC); Newman-Toker 2008 (PMC).

## 1. Mức xử trí

Lượt A giữ mức 1 như gợi ý; lượt B chọn mức 2. **Lượt C chọn mức 2, vẫn `cant_miss: true`.**
- `urgency` là mức của ca điển hình chưa biến chứng (kb-guide 2.5): người còn tỉnh, đau đầu, chóng mặt, buồn nôn sau phơi nhiễm.
- NHS: có triệu chứng thì gọi 111; gọi 999 hoặc đến cấp cứu khi khó thở, đột ngột lú lẫn, mất ý thức, yếu, đau ngực hoặc đau cơ; người ngộ độc khí CO cần được kiểm tra ở bệnh viện (đo CO trong máu, thở oxy). Theo quy ước của doctor-v, "999 hoặc cấp cứu" là mức 2; Việt Nam không có dịch vụ 111.
- 3610/QĐ-BYT: chẩn đoán, xử trí nhanh, thở oxy càng sớm càng tốt; Jüttner 2021: thở oxy 100% ngay từ trước khi đến viện. Đến cơ sở cấp cứu ngay đáp ứng yêu cầu này.
- Dấu hiệu nặng đã có quy tắc mức 1: lú lẫn, li bì (rf_altered_consciousness), đau ngực khi chóng mặt (rf_dizziness_chest_pain), ngất kèm khó thở (rf_syncope_breathing); rf_co_exposure ở mức 2.
- Với mức 1 và ngưỡng 1%, mọi người chóng mặt có phơi nhiễm sẽ bị khuyên gọi 115, kể cả ca nhẹ đã ra chỗ thoáng.

## 2. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi` | Ngộ độc carbon monoxide | Ngộ độc khí carbon monoxide (CO) | **Lượt B** | Đúng tên bài trong 3610/QĐ-BYT | 3610/QĐ-BYT |
| `codes.icd10_verified` | true | false | **false** | Không đối chiếu được | |
| `urgency` | 1 | 2 | **2** | Mục 1 | NHS, 3610, Jüttner |
| `prior_modifiers` | tháng 12–2: 2; tháng 5–9: 0,7; miền Bắc tháng 12–2: 1,5 | tháng 12–2: 2 | **Chỉ tháng 12–2: 2** | Hai hệ số chỉ lượt A có đều là ước lượng, không có số liệu Việt Nam; khác biệt theo mùa, vùng phần lớn đã nằm trong câu hỏi phơi nhiễm (tránh đếm trùng) | MMWR 2005, 3610 |
| `better_away_from_place` | không có | đề xuất better_away_from_room (frequent) | **frequent**, dùng dấu hiệu của danh mục | NHS: nặng hơn khi ở trong phòng nhiễm khí, đỡ khi ra ngoài | NHS |
| `dizziness` | frequent | không liên kết | **Giữ** | 18–39% (hồ sơ); hướng dẫn xếp vào nhóm triệu chứng hay gặp nhất; chỉ tác dụng ở Ngất | Lu 2015, Pepe 2011, 3610, Jüttner |
| `nausea` | frequent | không liên kết | **occasional** | Số liệu 17–33% | MMWR, Lu, Pepe |
| `fatigue` | frequent | không liên kết | **occasional** | Số liệu 20–43%, triệu chứng rất không đặc hiệu | Lu, Pepe |
| `palpitations` | không liên kết | occasional | **Giữ** | Hồi hộp 18,4% | Pepe 2011 |
| `fainting_or_near_fainting` | occasional | frequent | **frequent** | Số liệu tốt nhất 40,9% (cấp cứu); câu hỏi gồm cả choáng; là dấu hiệu cảnh báo của bệnh nguy hiểm | Pepe 2011, Jüttner |
| `drowsy_hard_to_wake` | occasional | rare (above_leak_ok) | **occasional** | Số liệu 8–11%; dấu hiệu cảnh báo của bệnh nguy hiểm | Lu, Pepe |
| `severe_weakness` | occasional | không liên kết | **Giữ** | NHS: yếu sau phơi nhiễm là lý do đi cấp cứu | NHS, CDC |
| `breathing_difficulty` | occasional | không liên kết | **Giữ** | Số liệu 6,3–6,7% (rare) nhưng rare thấp hơn nền 5% sẽ làm "Có" giảm khả năng, trái với NHS, Jüttner | MMWR, Pepe, Jüttner, NHS |
| `chest_pain_pressure` | occasional | rare | **occasional** | CDC xếp đau ngực vào triệu chứng hay gặp nhất; 3610: tổn thương cơ tim; số 1,7% của Pepe chỉ là đau ngực kiểu tim; dấu hiệu cảnh báo | CDC, 3610, Jüttner, Pepe |
| `seizure_recent` | không liên kết | rare (above_leak_ok) | **Giữ** | Co giật 6,9% ở cấp cứu; 3610: trẻ em, đôi khi người lớn, khởi đầu bằng co giật | Pepe, 3610 |
| `vertigo_spinning` | occasional | không liên kết | **Giữ** | Chóng mặt do thiếu oxy thường là choáng váng | 3610, CDC |
| `not_recovered_after_faint` | không liên kết | occasional | **Giữ** | 3610: thời gian, mức độ hôn mê rất thay đổi | 3610 |
| `pulse_measured` | phân bố (36% mạch 100–150 trong số đã đo) | không liên kết | **Giữ, chỉnh theo Pepe** (26% trên 100) | Nhịp nhanh xoang 25,9% | Pepe 2011 |
| `dizziness_pattern` | 0,08/0,45/0,32/0,15 | 0,05/0,35/0,50/0,10 | **0,06/0,40/0,42/0,12** | TVD 0,18: đọc lại NHS (lúc có lúc không, nặng hơn trong phòng) | NHS, 3610 |
| `syncope_trigger`, `syncope_warning` | | | Trung bình hai lượt | | 3610, Jüttner, CDC |
| Nguồn CDC | cdc-co-about | cdc-co-basics | **cdc-co-basics**, bậc C | Cùng một trang cho người dân | CDC |
| `warning_signs` | có fainting_or_near_fainting | có not_recovered_after_faint | Hợp hai bản | | |

Giống nhau ở hai lượt: tên thường gọi, mã T58, `cant_miss` true, chuyên khoa, prior P5 cho Chóng mặt và Ngất, hệ số tháng 12–2, các liên kết chung khác.

## 3. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- `urgency` 2 thay vì 1 (mục 1).
- Prior P5 và hệ số mùa đông 2 (số liệu theo tháng của Mỹ).
- `others_same_symptoms`, `better_away_from_place` (frequent, không có tỷ lệ); `blurred_vision`, `severe_weakness`, `not_recovered_after_faint` (occasional); các phân bố.

## 4. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-carbon-monoxide-poisoning-1 (đốt than sưởi, Hà Nội, tháng 1) | Hạng 1 trong danh sách cần loại trừ, mức 2/2 (rf_co_exposure) | |
| d-carbon-monoxide-poisoning-2 (78 tuổi, ngất trong nhà tắm có bình nóng lạnh chạy gas, còn lẫn lộn) | Mức 1/1, **không có trong danh sách** | Phiên dừng ở câu thứ 3 (lú lẫn: mức 1) trước khi hỏi phơi nhiễm, nên xác suất ngộ độc khí CO vẫn ở mức prior. Ca đúng về lâm sàng (3610: người già khởi đầu bằng lẫn lộn), giữ nguyên; xem đề xuất |
| d-carbon-monoxide-poisoning-3 (lẩu than trong phòng kín, dễ nhầm ngộ độc thức ăn) | Hạng 1 trong danh sách cần loại trừ, mức 2/2 | Câu phơi nhiễm được hỏi muộn rồi dừng ngay, nên không kịp hỏi người ở cùng, đỡ khi ra ngoài |

## 5. Đề xuất cho người bảo trì

- Đưa `co_exposure` vào `red_flags` của Chóng mặt và Ngất, trước nhóm dấu hiệu nguy hiểm toàn thân: câu hỏi rẻ, rất đặc hiệu, là điều kiện của quy tắc mức 2, và cần cho danh sách cần loại trừ khi phiên dừng sớm vì lú lẫn.
- Thêm `carbon_monoxide_poisoning` vào `conditions` của `rf_co_exposure` (đề xuất của lượt R) và vào `cant_miss` của Chóng mặt và Ngất.
- Cân nhắc thêm Đau đầu vào phạm vi của `rf_co_exposure` và prior của bệnh này cho Đau đầu ở lô 2 (như ghi chú của quy tắc).
