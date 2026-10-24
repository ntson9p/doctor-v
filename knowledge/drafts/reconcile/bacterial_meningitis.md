# Biên bản đối chiếu: Viêm màng não do vi khuẩn (`bacterial_meningitis`)

- Người đối chiếu: `agent:pass-c` (lô 2), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/bacterial_meningitis.yaml`, `knowledge/drafts/pass-b/bacterial_meningitis.yaml`.
- Bản chính thức: `knowledge/conditions/bacterial_meningitis.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 21, lượt B 18, chung 16; bản chính thức 22 liên kết.
- Nguồn đã mở lại: 5642/QĐ-BYT bài Viêm màng não nhiễm khuẩn (PDF trên kcb.vn, tr. 17–18); Wertheim 2009, Nguyen-Huu 2022, Huong 2014, Truong 2023 (toàn văn qua API Europe PMC); van Samkar 2015, Attia 1999, Curtis 2010, van de Beek 2004, Mai 2008, Bijlsma 2016 (tóm tắt); trang NHS Meningitis (rà soát 12/6/2026). **Không trích NICE NG240**: nice.org.uk trả lỗi 403 khi lượt C mở lại, và lượt C không dùng dịch vụ trung gian; các dữ kiện lượt A lấy từ NG240 được thay bằng NHS, 5642 và Nguyen-Huu.
- Đổi ID nguồn: `attia-1999-jama-meningitis` → `attia-jama-1999`; `curtis-2010-meningitis-children` → `curtis-pediatrics-2010`; `vandebeek-2004-nejm-meningitis` → `vandebeek-nejm-2004`; `mai-2008-ssuis-meningitis-vietnam` → `mai-cid-2008`; `wertheim-2009-ssuis-north-vietnam` → `wertheim-plosone-2009`; `nguyenhuu-2022-meningitis-children-vn` → `nguyenhuu-phmt-2022`; `huong-2014-ssuis-review` → `huong-eid-2014`; `truong-2023-meningitis-children-south-vn` → `truong-ofid-2023`; `bijlsma-2016-meningitis-netherlands` → `bijlsma-lancetid-2016`. Bậc mặc định của van Samkar hạ từ A xuống B (tổng quan đặc điểm lâm sàng, không phải độ chính xác chẩn đoán).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `codes.icd10_verified` | true | false | **false** | Chưa đối chiếu bảng ICD-10 của Bộ Y tế | — |
| `specialties` | cấp cứu, truyền nhiễm, thần kinh | cấp cứu, truyền nhiễm | **Lượt B** | Ở Việt Nam bệnh được điều trị ở khoa truyền nhiễm hoặc nhi | 5642 |
| Prior 'Đau đầu' | P6 | P5 | **P5** | Lệch một mức, đều ước lượng; chọn mức an toàn hơn cho bệnh không được bỏ sót: người lớn viêm màng não liên cầu lợn đau đầu 92–95%, có thể chọn 'Đau đầu' | Wertheim; van Samkar |
| `headache` (khi triệu chứng chính là sốt) | frequent | very_frequent; dưới 2 tháng rare, 2 tháng–5 tuổi occasional | **Lượt B** | Lệch một mức. Số liệu riêng viêm màng não vi khuẩn ở người lớn Việt Nam 92–95%; Attia (50%) gộp cả viêm màng não vi rút. Trẻ Việt Nam 30% (không tự kể được). Đau đầu là triệu chứng chính, không phải dấu hiệu ca nặng nên không hạ mức | Wertheim; van Samkar; Nguyen-Huu; Attia |
| `neck_stiffness`: mức riêng theo tuổi (ghi chú đợt) | không | dưới 2 tháng và 2 tháng–5 tuổi: occasional | **Giữ của lượt B** | Khác rõ: trẻ Việt Nam nằm viện 42% so với người lớn 88–93%; NHS: trẻ nhỏ biểu hiện người cứng hoặc mềm nhũn. Mức chung frequent (hạ một mức so với số liệu bệnh viện) giữ nguyên | Nguyen-Huu; Wertheim; van Samkar; NHS |
| `confusion` | frequent | occasional | **occasional** | Lệch một mức. Lú lẫn 46% ở người lớn nằm viện, hạ một mức cho cộng đồng (dấu hiệu ca nặng, kb-guide 2.1). Có lú lẫn thì đã có quy tắc mức 2; mức thấp hơn giữ cho 'không lú lẫn' không làm giảm mạnh khả năng bệnh | Wertheim; van de Beek |
| `drowsy_hard_to_wake` | frequent (ước lượng) | occasional (14–15%) | **occasional** | Có số liệu | van de Beek; Nguyen-Huu |
| `vomiting` | occasional | frequent | **occasional** | Lệch một mức. Người lớn 30% (tổng quan Attia, bậc A); trẻ 61% ở 33 trẻ nằm viện tuyến cuối, hạ một mức cho cộng đồng. Mức frequent làm trẻ sốt kèm nôn (thường do viêm dạ dày – ruột) dễ vượt ngưỡng 1% của bệnh không được bỏ sót, trái với IMCI | Attia; Nguyen-Huu |
| `rash_non_blanching` | frequent | very_frequent | **very_frequent** | Lệch một mức. Dấu hiệu cảnh báo của bệnh nguy hiểm, nguồn Việt Nam: 7/7 người có ban là ban xuất huyết, bầm tím hoặc tử ban | Wertheim; NHS |
| `headache_worse_activity` | frequent | không liên kết | **Bỏ** | Câu hỏi 'đau tăng khi đi lại, leo cầu thang' không giống nghiệm pháp lắc đầu của Attia; với tỷ lệ nền 5%, mọi người sốt đau đầu tăng khi vận động sẽ tăng khả năng viêm màng não khoảng 10 lần | Attia |
| `fever_max_temp` | khai báo | không | **Giữ** | Ước lượng | Curtis; Wertheim |
| `fever_duration` | 0,70/0,23/0,04/0,03 | không | **0,60/0,30/0,06/0,04** | Wertheim: triệu chứng trung vị 4 ngày trước nhập viện; chuyển bớt sang 3–5 ngày | 5642; Wertheim |
| `headache_severity` | 0,05/0,30/0,65 | 0,05/0,25/0,70 | **0,05/0,28/0,67** | Trung bình | NHS; 5642 |
| `headache_course` | 0,85/0,05/0,10 | 0,90/0,07/0,03 | **0,88/0,07/0,05** | Lựa chọn 'nặng dần trong vài tuần' ít hợp với bệnh diễn biến vài giờ đến vài ngày | 5642 |
| `headache_duration` | 0,12/0,75/0,13 | 0,15/0,70/0,15 | **0,13/0,73/0,14** | Trung bình | 5642; Wertheim |
| `headache_location` | khai báo | không | **Giữ** | Ước lượng | 5642 |
| `immunocompromised` | occasional | không liên kết | **Giữ** | 5642: cơ địa suy giảm miễn dịch bệnh cảnh nặng hơn, có thể do Listeria | 5642 mục 2, 3.1 |
| `child_unable_to_drink` | không liên kết | occasional | **Giữ** | Chán ăn 48,5% ở trẻ; bú, ăn kém LR 2,0; NHS: bỏ bú | Nguyen-Huu; Curtis; NHS |
| `cold_hands_feet` | không liên kết | occasional | **Giữ** | NHS liệt kê tay chân rất lạnh | NHS |
| `warning_signs` | 7 mục | 8 mục | **Hợp** (thêm tay chân lạnh) | | NHS |
| `pig_pork_exposure` | đề xuất dấu hiệu mới | liên kết occasional | **occasional** (dấu hiệu đã có trong danh mục) | Khoảng 1/3 viêm màng não vi khuẩn ở người lớn miền Nam do liên cầu lợn × 1/3–1/2 có phơi nhiễm ≈ 10–20% | Mai; Wertheim; Huong; van Samkar |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | Thêm thử ly thủy tinh (NHS), báo việc ăn tiết canh, người tiếp xúc gần hỏi về thuốc phòng bệnh | NHS |

Giống nhau ở hai lượt: tên, mã G00.9, `urgency` 2, `cant_miss` true, prior 'Sốt' (P6; dưới 2 tháng P4; 2 tháng–5 tuổi và từ 65 tuổi P5), liên kết sốt (very_frequent), cứng gáy (frequent), nôn liên tục, sợ ánh sáng, co giật, phát ban, thóp phồng (occasional).

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior theo tuổi cho 'Sốt' và prior P5 cho 'Đau đầu'.
- Hạ một mức cứng gáy, lú lẫn, nôn so với số liệu bệnh viện.
- Nôn liên tục, sợ ánh sáng, tay chân lạnh, suy giảm miễn dịch (occasional); mọi phân bố.
- Tỷ lệ nền của đau đầu khi sốt (0,5) không theo tuổi, nên mức riêng 'occasional' ở trẻ nhỏ làm câu trả lời 'không đau đầu' tăng nhẹ khả năng viêm màng não (khoảng 1,6 lần) so với các bệnh sốt khác.

## 3. Ca phát triển

| Ca | Kết quả sạch | Ghi chú |
|---|---|---|
| d-bacterial-meningitis-1 (52 tuổi, ăn tiết canh, sốt, đau đầu, nôn vọt, cứng gáy) | Hạng 9 (1%), mức 2/2 | Dừng vì cấp cứu ngay sau nhóm dấu hiệu nguy hiểm (cứng gáy), trước khi hỏi đau đầu và phơi nhiễm; khi dừng vì cấp cứu giao diện không hiện thứ hạng mà hiện 'Bác sĩ cần loại trừ' (có viêm màng não) |
| d-bacterial-meningitis-2 (bé 11 tháng, sốt, nôn, thóp phồng, chưa cứng gáy) | Hạng 2 (6%), mức 2/2 | Mức 2 đến từ xác suất (chưa có quy tắc cho thóp phồng ở trẻ từ 2 tháng) |
| d-bacterial-meningitis-3 (nữ 38 tuổi, đau đầu tăng dần, sốt, cứng gáy; dễ nhầm xuất huyết dưới nhện) | Hạng 6 (3%), mức 2/2 | Như ca 1: dừng sau nhóm dấu hiệu nguy hiểm của đau đầu, trước khi hỏi sốt |

## 4. Đề xuất cho người bảo trì

- Thêm thóp phồng vào nhóm dấu hiệu nguy hiểm của trẻ 2 tháng–5 tuổi hoặc quy tắc mức 2 'sốt + thóp phồng' (NHS Meningitis; Curtis 2010: LR 8,0). Hiện chỉ trẻ dưới 2 tháng có quy tắc này.
- Cân nhắc tỷ lệ nền theo tuổi cho các triệu chứng trẻ nhỏ không tự kể được (đau đầu, đau cơ).
