# Biên bản đối chiếu: Bệnh sốt mò (`scrub_typhus`)

- Người đối chiếu: `agent:pass-c` (lô 2), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/scrub_typhus.yaml`, `knowledge/drafts/pass-b/scrub_typhus.yaml`.
- Bản chính thức: `knowledge/conditions/scrub_typhus.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 16, lượt B 14, chung 12; bản chính thức 18 liên kết.
- Nguồn đã mở lại: 5642/QĐ-BYT bài Sốt mò (PDF trên kcb.vn, tr. 60–64); Hamaguchi 2015, Katoh 2019, Le-Viet 2019, Bonell 2017 (toàn văn qua API Europe PMC).
- Đổi ID nguồn: `hamaguchi-2015-rickettsiosis-hanoi` → `hamaguchi-ajtmh-2015`; `katoh-2019-scrub-typhus-hanoi` → `katoh-plosntd-2019`; `bonell-2017-scrub-typhus-burden` → `bonell-plosntd-2017`.
- Lượt C bỏ dữ kiện của lượt A 'vết loét chỉ gặp ở 0,6% người sốt không do dengue (Phuong 2006)': không tìm thấy trong bài Phuong 2006.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi` | Sốt mò | Bệnh sốt mò (thường gọi: Sốt mò) | **Lượt B** | Theo tên bài trong 5642 | 5642 |
| `codes.icd10_verified` | true | false | **false** | Chưa đối chiếu bảng ICD-10 của Bộ Y tế | — |
| Prior 'Sốt': 13–17 tuổi | P4 (mặc định) | P5 | **P4** | Lệch một mức, đều ước lượng. Các nghiên cứu Việt Nam chỉ gồm người lớn (thiếu số liệu, không phải bằng chứng là ít mắc); thiếu niên nông thôn cũng làm rẫy, phát cỏ | — |
| Prior 'Đau đầu': trẻ dưới 13 tuổi | P5 (mặc định) | P6 | **P6** | Nhất quán với prior 'Sốt' (trẻ em hạ một mức) | — |
| `eschar` | frequent | frequent | **frequent** (giải thích theo ghi chú đợt) | Số liệu Việt Nam: 47% (Quảng Nam, tuyến tỉnh, PCR), 63% (Bạch Mai 2001–2003), 18% (Bạch Mai 2012–2013), 46–94% (các nghiên cứu trước). Con số 18% đến từ bệnh viện tuyến cuối, nơi ca điển hình đã được chữa ở tuyến dưới (Katoh tự nhận định). Ở cộng đồng tỷ lệ thật có vết loét khoảng 50–65%, nhưng người dân tự tìm sẽ bỏ sót vết loét ở nách, bẹn, nên chọn khoảng 50%. Tỷ lệ nền 1% khớp nhóm sốt khác (0,7–0,8%) | Le-Viet bảng 1, 4; Hamaguchi bảng 1; Katoh bảng 1, Discussion |
| `malaria_area_exposure` | occasional | không liên kết | **Giữ** | 47% người sốt mò ở Quảng Nam có đi rừng, so với 11% ở người sốt nói chung. Ở Việt Nam hiện nay sốt mò gặp nhiều hơn sốt rét ở người đi rừng bị sốt. Chọn occasional (thấp hơn số liệu) vì mẫu nhỏ và đếm trùng với câu làm rẫy, phát cỏ | Le-Viet bảng 1, 4 |
| `fever_duration` | 0,13/0,35/0,25/0,27 | 0,08/0,32/0,27/0,33 | **0,10/0,34/0,26/0,30** | Trung bình | Le-Viet; Katoh; Hamaguchi |
| `fever_max_temp` | 0,08/0,37/0,55 | 0,08/0,40/0,52 | **0,08/0,39/0,53** | Trung bình | Le-Viet |
| `chills_rigors` | very_frequent | frequent | **frequent** | Lệch một mức. Hamaguchi 82% nhưng các bệnh sốt khác cùng nghiên cứu cũng 73–76% (không phân biệt); Katoh 24%; câu hỏi 'rét run cầm cập' chặt hơn 'ớn lạnh'; 5642: 'có thể kèm theo rét run' | Hamaguchi bảng 1; Katoh bảng 1; 5642 mục 3.1 |
| `arthralgia` | occasional | không liên kết | **Giữ, trung tính** | 37% (7/19 ca); với tỷ lệ nền 0,2 khi sốt, mức occasional trung tính | Le-Viet bảng 4 |
| `sore_throat` | không liên kết | rare | **Giữ** | Hai nguồn Việt Nam cùng cho 5–6%, thấp hơn nhiều so với sốt do vi rút đường hô hấp (14–29%) | Katoh; Le-Viet |
| `edema_face_hands` | occasional | không liên kết | **Giữ** | Phù 28% ở sốt mò so với 7–9% ở bệnh sốt khác; 5642: phù nhẹ mặt và mu chân (câu hỏi danh mục hỏi mặt hoặc bàn tay, chỉ khớp một phần) | Hamaguchi bảng 1; 5642 |
| `lymph_node_swelling` | frequent | occasional | **occasional** | Lệch một mức. Số liệu 42–64% là bác sĩ khám; hạch sốt mò mềm, không đau nên người bệnh tự sờ thấy ít hơn nhiều, và trẻ viêm họng cũng hay có hạch cổ | Hamaguchi; Le-Viet; 5642 |
| `headache_course` | khai báo | không | **Giữ** | Ước lượng | 5642 |
| `headache_duration` | không | khai báo | **Giữ** | Ước lượng | Katoh; 5642 |
| `summary_vi`, `self_care_vi`, `see_doctor_vi` | | | Gộp | Thêm 'hết sốt sau 1–3 ngày khi dùng đúng kháng sinh', 'bôi thuốc xua côn trùng' (5642 mục 5, 6) | 5642 |

Giống nhau ở hai lượt: mã A75.3, `urgency` 3, `cant_miss` false, prior 'Sốt' P4 (dưới 2 tháng P6; 2 tháng–12 tuổi P5), prior 'Đau đầu' P5, hệ số mùa miền Bắc (× 1,5 tháng 5–10; × 0,5 tháng 11–4), các liên kết vết loét, làm rẫy phát cỏ, sốt, đau đầu, đau cơ, ho, phát ban, đỏ mắt, `warning_signs`.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P4 ở cộng đồng (suy từ tỷ lệ 3–6% ở bệnh viện); mức cho trẻ em và thiếu niên.
- Tần suất vết loét khi người dân tự tìm (khoảng 50%); nổi hạch tự sờ thấy (occasional); đi rừng (occasional, thấp hơn số liệu vì đếm trùng).
- Phân bố số ngày sốt, nhiệt độ, kiểu và thời gian đau đầu.

## 3. Ca phát triển

| Ca | Kết quả sạch | Ghi chú |
|---|---|---|
| d-scrub-typhus-1 (nữ 48 tuổi, Thái Nguyên, phát cỏ, vết loét ở bẹn) | Hạng 1 (99%), mức 3/3 | |
| d-scrub-typhus-2 (Quảng Nam, đi rừng, không thấy vết loét) | Hạng 1 (45%; dengue 20%), mức 3/3 | Quy tắc sốt kèm đi rừng (mức 3) yêu cầu xét nghiệm sốt rét |
| d-scrub-typhus-3 (sốt 8 ngày, ho, khó thở, vết loét ở nách; dễ nhầm viêm phổi, nhiễm khuẩn huyết) | Hạng 1 (99%), mức 3/3 | Vết loét quyết định thứ hạng |

## 4. Đề xuất cho người bảo trì

- Gom `bush_exposure` và `malaria_area_exposure` vào một cụm.
- Câu hỏi `edema_face_hands` hỏi 'mặt hoặc bàn tay'; với sốt mò phù thường ở mặt và mu chân.
