# Biên bản đối chiếu: Bệnh sốt rét (`malaria`)

- Người đối chiếu: `agent:pass-c` (lô 2), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/malaria.yaml`, `knowledge/drafts/pass-b/malaria.yaml`.
- Bản chính thức: `knowledge/conditions/malaria.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 15, lượt B 11, chung 10; bản chính thức 13 liên kết.
- Nguồn đã mở lại: 3377/QĐ-BYT (bản quét do Viện Sốt rét Quy Nhơn đăng; lượt C tách ảnh trang và đọc các trang 4–7, 9: mục I, II.1, II.3.1, II.3.2, III); Win Han Oo 2023, Nguyen-Tien 2026, Hoang 2025 (toàn văn qua API Europe PMC); Taylor 2010 (tóm tắt); trang CDC Clinical Features of Malaria.
- Đổi ID nguồn: `winhanoo-2023-malaria-vietnam` → `winhanoo-malarj-2023`; `cdc-malaria-clinical-features` → `cdc-malaria-clinical` (cùng trang với bản của lượt A).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi` | Sốt rét | Bệnh sốt rét (thường gọi: Sốt rét) | **Lượt B** | Theo tên hướng dẫn của Bộ Y tế | 3377 |
| `codes.icd10_verified` | true | false | **false** | Chưa đối chiếu bảng ICD-10 của Bộ Y tế; B54 là mã không đặc hiệu (B50–B53 theo loài) | — |
| Prior 'Sốt': cơ sở | judgment | numeric | **numeric** | Cùng P6; dùng số liệu ca bệnh toàn quốc (1.421 ca năm 2020, 467 ca năm 2021) | Win Han Oo 2023; 3377 mục I |
| `prior_modifiers` | Tây Nguyên × 3; miền Trung × 1,5; miền Bắc, miền Nam × 0,5 | không có | **Tây Nguyên × 3, miền Trung × 1,5; bỏ hệ số 0,5** | Lây truyền còn lại tập trung ở Tây Nguyên và vài tỉnh miền Trung (Đắk Lắk, Khánh Hòa). Câu hỏi phơi nhiễm gộp cả 'đi rừng' ở nơi đã loại trừ, nên nơi ở vẫn mang thông tin. Bỏ hệ số giảm 0,5 vì sẽ hạ sai khả năng ở người miền Bắc, miền Nam vừa đi Tây Nguyên hoặc từ châu Phi về (ý kiến của lượt B) | Nguyen-Tien 2026; 3377 mục I |
| `malaria_area_exposure`: cơ sở | verbal | judgment (có số liệu) | **numeric, almost_always** | Cùng mức. 72,3% ca có tiền sử đi lại liên quan trong 14 ngày; câu hỏi doctor-v (1 tháng, gồm đi rừng, ngủ rẫy, từ nước có sốt rét về) rộng hơn. Ghi chú đợt: tỷ lệ nền nay 0,02, nên không có phơi nhiễm thì khả năng gần bằng 0 | Win Han Oo 2023; 3377 mục II.1 |
| `fever_duration` | 0,30/0,40/0,15/0,15 | 0,40/0,38/0,12/0,10 | **0,35/0,39/0,14/0,12** | Trung bình | 3377 |
| `severe_weakness` | occasional | không liên kết | **Bỏ** | Không có tần suất; sốt rét ác tính chỉ là phần nhỏ số ca; mệt lả đã có quy tắc mức 2 (rf_shock_signs) và nằm trong `warning_signs` | 3377 mục II.3.2.2 |
| `drowsy_hard_to_wake` | rare | không liên kết | **Bỏ** | rare (2,5%) cao hơn tỷ lệ nền 1% (cảnh báo của bộ kiểm tra); đã có quy tắc mức 2 | 3377 mục II.3.2 |
| `bush_exposure` | frequent | không liên kết | **Bỏ** | Đếm trùng với câu hỏi đi rừng, ngủ rẫy (người đi rừng thường cũng làm rẫy, phát cỏ); hai câu không cùng cụm | Nguyen-Tien 2026 |
| `rash_any` | không liên kết | rare | **Giữ** | Phát ban không có trong mô tả của 3377 và CDC; thấp hơn tỷ lệ nền 5% để ban làm giảm khả năng sốt rét so với sốt xuất huyết, sốt mò | CDC; 3377 |
| `headache_severity`, `headache_course` | khai báo | không | **Giữ** | Đau đầu dữ dội là dấu hiệu cảnh báo | 3377 mục II.3.2.1 |
| `warning_signs` | 11 mục | 10 mục | **Hợp** | Lượt A thêm tay chân lạnh (sốc là tiêu chuẩn ác tính) | 3377 mục II.3.2.2 |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | Thêm 'không tự mua thuốc sốt rét khi chưa xét nghiệm' (lượt B); xét nghiệm lại khi lần đầu âm tính (3377 mục II.1) | 3377 |

Giống nhau ở hai lượt: mã B54, `urgency` 3, `cant_miss` false, prior P6 cho 'Sốt' và 'Đau đầu', liên kết phơi nhiễm (almost_always), sốt (almost_always), rét run (very_frequent), sốt thành cơn (occasional), nhiệt độ, đau đầu (very_frequent), đau cơ (frequent), nôn (occasional), vàng da (occasional).

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Độ lớn hệ số Tây Nguyên (3) và miền Trung (1,5).
- Mọi tần suất triệu chứng (3377 và CDC không nêu tỷ lệ): rét run, sốt thành cơn, đau đầu, đau cơ, nôn, vàng da, phát ban; các phân bố nhiệt độ, số ngày sốt, mức độ và kiểu đau đầu.

## 3. Ca phát triển

| Ca | Kết quả sạch | Ghi chú |
|---|---|---|
| d-malaria-1 (Gia Lai, ngủ rẫy, sốt cơn rét run) | Hạng 3 (12%; sốt mò 43%, dengue 34%), mức 3/3 | Bộ suy luận dừng khi 3 bệnh đầu chiếm trên 80%, trước khi hỏi 'sốt thành cơn' (dấu hiệu phân biệt sốt rét). Quy tắc rf_fever_malaria_exposure bảo đảm xét nghiệm trong ngày |
| d-malaria-2 (Hà Nội, từ Angola về, sốt liên tục, không rét run) | Hạng 3 (2%), mức 3/3 | 'Nguyên nhân khác' 86%. Câu hỏi phơi nhiễm không tách người từ châu Phi về (nguy cơ cao hơn nhiều) khỏi người đi rừng trong nước |
| d-malaria-3 (Khánh Hòa, ngủ lán trong rừng, rét run dữ dội, dễ nhầm nhiễm khuẩn huyết, viêm thận – bể thận) | Hạng 3 (3%; dengue 78%), mức 3/3 | Tháng 11 ở Khánh Hòa, dengue có prior cao hơn nhiều; xác suất phản ánh dịch tễ |

Trước khi thêm lại hệ số vùng, d-malaria-1 cho sốt rét 4% (vẫn hạng 3). Hệ số vùng được giữ vì có nguồn về phân bố lây truyền, không phải để ca đạt.

## 4. Đề xuất cho người bảo trì

- Tách câu hỏi phơi nhiễm thành hai dấu hiệu: (1) đi rừng, ngủ rẫy trong nước; (2) từ nước có sốt rét lưu hành (châu Phi, Campuchia, Lào…) về trong 3 tháng. Hai nhóm có nguy cơ rất khác nhau (303/1.421 ca năm 2020 là ca ngoại lai).
- Gom `bush_exposure` và `malaria_area_exposure` vào một cụm (rho medium) để giảm đếm trùng (ảnh hưởng sốt mò và sốt rét).
- Cân nhắc quy tắc 'sốt + vàng da + phơi nhiễm vùng sốt rét → mức 2' (3377 mục II.3.2.2: vàng da là biểu hiện sốt rét ác tính); hiện không có quy tắc nào cho sốt kèm vàng da.
