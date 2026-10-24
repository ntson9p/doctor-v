# Biên bản đối chiếu: Nhiễm khuẩn huyết (`sepsis`)

- Người đối chiếu: `agent:pass-c` (lô 2), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/sepsis.yaml`, `knowledge/drafts/pass-b/sepsis.yaml`.
- Bản chính thức: `knowledge/conditions/sepsis.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 17, lượt B 13, chung 13; bản chính thức 15 liên kết.
- Nguồn đã mở lại: 5642/QĐ-BYT bài Nhiễm khuẩn huyết (PDF trên kcb.vn, tr. 79–81); Loots 2022, Wattanapaiboon 2020, Rudd 2020, Wertheim 2009 (toàn văn qua API Europe PMC); trang NHS Sepsis (rà soát 14/5/2026). Không trích NICE NG253, NG254: nice.org.uk trả lỗi 403 và lượt C không dùng dịch vụ trung gian.
- Đổi ID nguồn: `wattanapaiboon-2020-sepsis-symptoms` → `wattanapaiboon-idr-2020`; `rudd-2020-gbd-sepsis` → `rudd-lancet-2020`; `wertheim-2009-ssuis-north-vietnam` → `wertheim-plosone-2009`.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `codes.icd10_verified` | true | false | **false** | Chưa đối chiếu bảng ICD-10 của Bộ Y tế | — |
| Prior 'Sốt' (ghi chú đợt: lượt B hạ prior sau khi chạy thử) | mặc định P5; dưới 2 tháng P3; 2 tháng–5 tuổi P4; 65–74 tuổi P4; từ 75 tuổi P3 | mặc định P4 nhưng mọi nhóm tuổi được ghi riêng: dưới 2 tháng P3; 2 tháng–64 tuổi P5; 65–74 tuổi P4; từ 75 tuổi P3 | **Như nhau ở mọi nhóm trừ 2 tháng–5 tuổi; chọn P5 cho nhóm này** | Nguồn chỉ cho nhóm nguy cơ cao: trẻ dưới 12 tháng và người trên 75 tuổi (NHS), trẻ sơ sinh, đẻ non, người già (5642); tỷ lệ mắc cao nhất ở trẻ nhỏ (Rudd) nhưng trẻ nhỏ sốt rất nhiều lần. Lượt C chạy lại trên dữ liệu hiện tại: với P4, trẻ 2 tuổi chỉ sốt cao 1 ngày, không có dấu hiệu nào khác bị xếp mức 2 (tổng xác suất mức 1–2 = 2,25%, ngưỡng 2%); với P5 là mức 3. IMCI và NHS cho trẻ sốt không có dấu hiệu nguy hiểm theo dõi tại nhà; trẻ có dấu hiệu nặng đã có quy tắc mức 2. Không thấy khác biệt ở 7 ca trẻ em khác trong bộ phát triển | NHS Sepsis; 5642; Rudd 2020 |
| `fever_max_temp` | 0,15/0,35/0,50 | 0,25/0,30/0,45 | **0,20/0,33/0,47** | Trung bình | Loots; 5642; NHS |
| `fever_duration` | 0,55/0,30/0,08/0,07 | không khai báo | **Giữ** | Gần phân bố nền; Loots: bệnh tiến triển nhanh 84% | Loots |
| `confusion` | frequent | occasional | **occasional** | Lệch một mức. Wattanapaiboon (Thái Lan, tuổi trung vị 67, n = 437): 22%; Loots (Hà Lan, tuổi trung vị 80, n = 151): 54%. Nhóm Thái Lan gần người dùng doctor-v hơn; người dưới 65 tuổi còn ít hơn. Có lú lẫn thì quy tắc mức 2 đã áp dụng; mức thấp hơn giữ cho 'không lú lẫn' không làm giảm mạnh khả năng bệnh (an toàn hơn) | Wattanapaiboon bảng 2; Loots bảng 1 |
| `drowsy_hard_to_wake` | frequent | occasional | **occasional** | Đều ước lượng; Wattanapaiboon: thay đổi ý thức khi đến khám 13%. Với trẻ dưới 5 tuổi (không hỏi lú lẫn), mức frequent sẽ làm 'không li bì' giảm khả năng bệnh 2 lần | Wattanapaiboon; NHS |
| `severe_weakness` | frequent | occasional | **occasional** | Đều ước lượng; mệt mỏi 16% khi đến khám; có dấu hiệu này thì quy tắc mức 2 đã áp dụng | Wattanapaiboon bảng 2 |
| `cough` | frequent | không liên kết | **occasional (trung tính)** | Ho khi đến khám 28% (ho có đờm 25%, ho khan 3%); mức occasional bằng tỷ lệ nền 0,2. Mức frequent sẽ làm mọi người sốt kèm ho tăng khả năng nhiễm khuẩn huyết 2,5 lần | Wattanapaiboon bảng 2; Loots |
| `dysuria` | occasional | không liên kết | **Bỏ** | Tiểu buốt khi đến khám chỉ 4,3%; liên kết occasional sẽ đẩy mọi nhiễm trùng tiết niệu có sốt lên mức cấp cứu chỉ vì xác suất; viêm thận – bể thận đã có liên kết riêng | Wattanapaiboon bảng 2 |
| `persistent_vomiting` | occasional | không liên kết | **Bỏ** | Không có số liệu (người lớn: buồn nôn, nôn 5,9%); NHS chỉ ghi trẻ nhỏ có thể nôn; nôn liên tục đã có quy tắc mức 3 | Wattanapaiboon; NHS |
| `warning_signs` | 9 mục (có co giật) | 8 mục | **Hợp** | NHS liệt kê co giật trong triệu chứng ở trẻ | NHS |
| `self_care_vi` | không khai báo | 2 câu | **Lượt B** | | |
| `see_doctor_vi` | | | Gộp | 5642: điều trị ngay khi nghĩ đến, kháng sinh tĩnh mạch sớm | 5642 mục 3.1 |

Giống nhau ở hai lượt: tên, mã A41.9, MONDO, `urgency` 1, `cant_miss` true, chuyên khoa, các liên kết rét run, khó thở (frequent), tay chân lạnh, tiểu ít, choáng ngất (occasional), ban xuất huyết (frequent), suy giảm miễn dịch, đái tháo đường, không uống được (occasional).

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Toàn bộ prior theo tuổi (không có số liệu tỷ lệ nhiễm khuẩn huyết trong người sốt ở cộng đồng Việt Nam), nhất là 2 tháng–5 tuổi (P4 hay P5).
- Tay chân lạnh, choáng ngất, tiểu ít, mệt lả, li bì (occasional); ban xuất huyết trong số người có ban (frequent); không uống được ở trẻ (occasional).

## 3. Ca phát triển

| Ca | Kết quả sạch | Ghi chú |
|---|---|---|
| d-sepsis-1 (nữ 72 tuổi, đái tháo đường, sốt rét run, lú lẫn, thở nhanh, tiểu ít) | Hạng 2 (3%; viêm phổi 89%), **mức 2, đúng là 1** | Dừng vì cấp cứu sau 2 màn hỏi (lú lẫn). Mô hình một bệnh chia xác suất cho viêm phổi (prior P2 ở 65–74 tuổi, cũng liên kết khó thở, lú lẫn); mức 1 của nhiễm khuẩn huyết chỉ đạt khi xác suất từ 10% |
| d-sepsis-2 (nữ 81 tuổi, sốt nhẹ, li bì, mệt lả, tiểu ít) | Hạng 1 (72%), mức 1/1 | Ngưỡng người từ 75 tuổi |
| d-sepsis-3 (nam 35 tuổi, sốt rét run như cúm, tay chân lạnh, da nổi vân, thở nhanh; dễ nhầm sốc sốt xuất huyết) | Hạng 6 (5%), **mức 2, đúng là 1** | Như ca 1: quy tắc tay chân lạnh, li bì, lú lẫn đều là mức 2 |

Mức đúng 1 dựa trên NHS Sepsis (lú lẫn, thở rất nhanh, da tái, xám hoặc loang lổ: gọi 999 hoặc đến cấp cứu, tương ứng lời khuyên mức 1 'Gọi 115, hoặc nhờ người đưa đến khoa cấp cứu gần nhất ngay') và ví dụ mức 1 của kb-guide mục 2.5. Không nâng prior để ca đạt: P4 cho 65–74 tuổi và P5 cho người lớn là thống nhất của hai lượt.

## 4. Đề xuất cho người bảo trì

- Thêm quy tắc mức 1 cho sốt kèm từ 2 dấu hiệu nguy cơ cao của nhiễm khuẩn huyết (lú lẫn hoặc li bì; khó thở, thở nhanh; tay chân lạnh, da loang lổ; mệt lả), theo danh sách 'gọi 999' của NHS Sepsis. Hiện mỗi dấu hiệu chỉ là mức 2 và mức 1 phụ thuộc xác suất, vốn bị chia với bệnh nguồn (viêm phổi, viêm thận – bể thận).
- Với `other_urgency_cumulative` q₂ = 0,02 bằng ngưỡng mức 2 (0,02), khi 'nguyên nhân khác' chiếm khoảng 85–90% thì chỉ cần 0,3–0,5% xác suất của bệnh mức 1–2 là đủ lên mức 2: người 50 tuổi chỉ sốt kèm rét run, hoặc người 70 tuổi sốt kèm rét run, đều bị xếp mức 2 trong lần chạy thử của lượt C.
