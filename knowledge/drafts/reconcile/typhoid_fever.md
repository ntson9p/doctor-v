# Biên bản đối chiếu: Bệnh thương hàn (`typhoid_fever`)

- Người đối chiếu: `agent:pass-c` (lô 2), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/typhoid_fever.yaml`, `knowledge/drafts/pass-b/typhoid_fever.yaml`.
- Bản chính thức: `knowledge/conditions/typhoid_fever.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 18, lượt B 13, chung 12; bản chính thức 15 liên kết.
- Nguồn đã mở lại: 5642/QĐ-BYT bài Thương hàn (PDF trên kcb.vn, tr. 38–40); Azmatullah 2015, Nga 2018, Hoang 2025, Le-Viet 2019, Phuong 2006 (toàn văn qua API Europe PMC).
- Đổi ID nguồn: `azmatullah-2015-enteric-fever-review` → `azmatullah-jgh-2015`; `nga-2018-typhoid-control-vietnam` → `nga-ajtmh-2018`. Giấy phép của Azmatullah xếp L2 (theo lượt B): bài ghi giấy phép chỉ cho dùng phi thương mại.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names` | Thương hàn (thường gọi: Sốt thương hàn) | Bệnh thương hàn (thường gọi: Sốt thương hàn, Thương hàn) | **Lượt B** | Theo tên bài trong 5642 | 5642 |
| `codes.icd10_verified` | true | false | **false** | Chưa đối chiếu bảng ICD-10 của Bộ Y tế | — |
| Prior 'Sốt' | P5 | P6 | **P6** (theo ghi chú đợt: quyết định từ bằng chứng) | Tỷ lệ mắc toàn quốc khoảng 14,7/100.000/năm quanh 2000 rồi giảm mạnh, tác giả coi đã gần như loại trừ (Nga 2018); Cần Thơ 2014–2022 chỉ 0,36/100.000/năm (Hoang 2025); 378 người lớn sốt cấp không rõ ổ ở Quảng Nam làm PCR máu tìm S. Typhi, không có ca dương tính được báo cáo (Le-Viet 2019); chẩn đoán 'thương hàn' 2,8–5,2% ở Bình Thuận 2001–2002 không có xác nhận vi sinh (Phuong 2006). Kể cả khi báo cáo thiếu vài lần, vài ca trên 100.000 dân so với hàng chục nghìn lượt sốt cho tỷ lệ dưới 0,02% | Nga; Hoang; Le-Viet; Phuong |
| `fever_duration` | 0,07/0,28/0,20/0,45 | 0,05/0,25/0,25/0,45 | **0,06/0,26/0,23/0,45** | Trung bình | Azmatullah; 5642 |
| `headache`, `abdominal_pain`: mức riêng trẻ dưới 5 tuổi | không | occasional | **Giữ của lượt B** | Khác rõ: trẻ dưới 5 tuổi đau đầu 14%, đau bụng 20% so với 46–63% ở trẻ lớn và người lớn | Azmatullah bảng 1, 3 |
| `abd_pain_location` | 0,15/0,08/0,04/0,15/0,20/0,05/0,03/0,30 | 0,15/0,08/0,03/0,20/0,22/0,05/0,02/0,25 | **0,15/0,08/0,03/0,18/0,21/0,05/0,02/0,28** | Trung bình | 5642 |
| `abd_pain_duration` | 0,03/0,10/0,30/0,47/0,10 | 0,02/0,06/0,27/0,60/0,05 | **0,02/0,08/0,29/0,54/0,07** | Trung bình | 5642 |
| `cough` | frequent | không liên kết | **Bỏ** | 33–41% ở thương hàn, ngang tỷ lệ ở bệnh sốt khác (khoảng 30%: Phuong, Le-Viet); tỷ lệ nền danh mục 0,2 nên mức frequent sẽ phóng đại (tăng 2,5 lần) | Azmatullah; Phuong; Le-Viet |
| `fatigue` | frequent | không liên kết | **Bỏ** | Không có tần suất; trung tính khi sốt (tỷ lệ nền 0,5) và gặp ở hầu hết bệnh sốt | 5642 |
| `bleeding_gums_nose` | occasional | không liên kết | **Giữ** | 5642: 'có thể chảy máu mũi' ở thời kỳ khởi phát ('có thể có' = occasional theo bảng 2.1) | 5642 mục 3.1.b |
| `drowsy_hard_to_wake` | rare | không liên kết | **Bỏ** | rare cao hơn tỷ lệ nền 1% (cảnh báo của bộ kiểm tra); giữ một liên kết trong cụm rối loạn tri giác là `confusion` | — |
| `confusion` | không liên kết | occasional | **Giữ** | Thay đổi ý thức 29% người lớn, 8–36% tùy khu vực (bệnh viện); 5642: li bì, thờ ơ, mê sảng ở tuần thứ 2 | Azmatullah bảng 1, 2; 5642 |
| `black_stool` | rare | không liên kết | **Bỏ** | rare cao hơn tỷ lệ nền 1%; đã có quy tắc mức 2 và nằm trong `warning_signs` | Azmatullah |
| `headache_course` | khai báo | không | **Giữ** | Ước lượng | 5642 |
| `warning_signs` | 8 mục (có nôn liên tục) | 8 mục (có mệt lả) | **Hợp (9 mục)** | Biến chứng xuất huyết, thủng ruột, viêm não, trụy mạch | 5642 |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | | 5642 |

Giống nhau ở hai lượt: mã A01.0, `urgency` 3, `cant_miss` false, prior P6 cho 'Đau bụng' và 'Đau đầu', liên kết sốt, nhiệt độ, đau đầu, đau bụng (frequent), khởi phát từ từ, tiêu chảy, nôn (occasional), phát ban (rare), thời gian đau đầu.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P6 cho cả 3 triệu chứng chính: nếu còn ổ bệnh địa phương (đồng bằng sông Cửu Long, miền núi phía Bắc), xác suất sẽ bị đánh giá thấp.
- Mọi phân bố (số ngày sốt, nhiệt độ, vị trí, kiểu khởi phát, thời gian đau bụng, kiểu và thời gian đau đầu).
- Chảy máu mũi, lú lẫn (occasional).

## 3. Ca phát triển

| Ca | Kết quả sạch | Ghi chú |
|---|---|---|
| d-typhoid-fever-1 (19 tuổi, An Giang, sốt tăng dần 9 ngày, đau bụng, tiêu chảy) | Hạng 2 (16%; dengue 48%), mức 3/3 | Dengue vẫn đứng đầu dù sốt hơn 7 ngày: tỷ lệ nền thấp của chán ăn, đau đầu khi sốt làm tăng dengue, và hệ số làm trơn chỉ cho 'sốt hơn 7 ngày' giảm dengue khoảng 3 lần |
| d-typhoid-fever-2 (bé 7 tuổi, chỉ sốt kéo dài 9 ngày) | Hạng 9, mức 3/3 | Ca khó, như dự kiến với prior P6; mức xử trí an toàn nhờ quy tắc sốt kéo dài |
| d-typhoid-fever-3 (30 tuổi, Sóc Trăng, tháng 8, sốt 7 ngày, đau hố chậu phải, tiêu chảy; dễ nhầm sốt xuất huyết) | Hạng 6 (dengue 93%), mức 3/3 | Giữa mùa dịch ở miền Nam, bộ suy luận chọn dengue; phù hợp dịch tễ hiện nay. Ca được giữ để theo dõi khả năng nhầm |

Không sửa prior để các ca này đạt vì P6 có bằng chứng.
