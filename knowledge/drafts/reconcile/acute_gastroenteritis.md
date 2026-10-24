# Biên bản đối chiếu: Viêm dạ dày – ruột cấp (`acute_gastroenteritis`)

- Người đối chiếu: `agent:pass-c` (lô 3), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/acute_gastroenteritis.yaml`, `knowledge/drafts/pass-b/acute_gastroenteritis.yaml`.
- Bản chính thức: `knowledge/conditions/acute_gastroenteritis.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 24, lượt B 23, chung 20, hợp 27; bản chính thức 26 liên kết.
- Nguồn đã mở lại: 5642/QĐ-BYT (PDF trên kcb.vn, bài Bệnh tiêu chảy do vi khuẩn), 3312/QĐ-BYT (PDF đăng lại trên vnras.com, bài Tiêu chảy cấp), WHO 2005 (bản văn bản qua API kho IRIS), Lively 2018 (toàn văn PMC), Vu 2006, Tran 2025, Erkan 2004, Viniol 2014 (tóm tắt qua API Europe PMC), Cervellin 2016 (toàn văn PMC), Bines 2006 (bản văn bản qua API IRIS), CDC Norovirus, CDC Food poisoning, NHS Diarrhoea and vomiting.
- Sổ nguồn: thêm mới các nguồn trên (trừ 5642, 3312, Viniol đã có). Lượt B gọi Lively 2018 là `lively-2018-norovirus-outbreaks`, WHO 2005 là `who-treatment-diarrhoea-2005`, Bines 2006 là `bines-2006-intussusception-vietnam`, Erkan 2004 là `erkan-2004-child-abdominal-pain`; sổ nguồn dùng `lively-ofid-2018`, `who-diarrhoea-2005`, `bines-bwho-2006`, `erkan-pedint-2004`.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi_common` | 3 tên, có "Viêm ruột cấp" | 2 tên | Giữ 3 tên | Tên người dân hay dùng, giúp tìm kiếm | — |
| `codes.icd10_verified` | false | true | true | Lượt B đã tra công cụ ICD-10 của Bộ Y tế (icd.kcb.vn) ngày 24/10/2026. Lượt C không tự tra lại được vì trang chạy bằng JavaScript | — |
| `specialties` | đa khoa, nhi, truyền nhiễm, tiêu hóa | tiêu hóa, truyền nhiễm | Hợp: đa khoa, nhi, tiêu hóa, truyền nhiễm | Bệnh thường gặp ở tuyến ban đầu và ở trẻ nhỏ | — |
| Prior đau bụng: bậc, cơ sở | B/judgment | A/numeric | B/judgment | Mức giống nhau (P2; 2 tháng – 5 tuổi P1; dưới 2 tháng P3). Số liệu nước ngoài không phải tỷ lệ trong người đau bụng ở Việt Nam; P1 ở trẻ nhỏ là ước lượng (Erkan chỉ cho 15,4% ở trẻ 2–16 tuổi) | Viniol, Erkan, WHO 2005, 3312 |
| Prior sốt, trẻ 5–12 tuổi | P2 | P3 (mặc định) | **P3** | Lệch một mức, cùng là ước lượng. Ở tuổi đi học sốt chủ yếu do bệnh hô hấp, cúm, sốt xuất huyết; người viêm dạ dày – ruột thường chọn tiêu chảy hoặc đau bụng làm triệu chứng chính | Lively, Vu, Tran |
| `nausea` | very_frequent (C/verbal: CDC "thường gặp") | frequent (B/judgment) | **frequent** | Lệch một mức. Tả, tiêu chảy do E. coli sinh độc tố ít buồn nôn; tỷ lệ nền của buồn nôn khi đau bụng là 35%, nên very_frequent làm câu trả lời "Không" hạ bệnh này khoảng 3 lần | CDC, 5642 |
| `abd_pain_severe` | occasional | rare | **rare** | Lệch một mức. NHS xếp đau bụng đột ngột, dữ dội vào nhóm gọi 999, tức không phải biểu hiện thường của tiêu chảy, nôn. Mức thấp hơn tỷ lệ nền để đau dữ dội không bị quy cho bệnh lành tính | NHS D&V |
| `abdomen_hard_swollen` | rare | — | **Bỏ** | Tỷ lệ nền của dấu hiệu là 1%, nên mức rare (2,5%) lại làm tăng khả năng bệnh, ngược ý "ít gặp" của lượt A. 3312 chỉ nêu chướng bụng như biến chứng (hạ kali, thuốc cầm tiêu chảy). Không liên kết để dấu hiệu cấp cứu ngoại khoa nghiêng về các bệnh nguy hiểm | 3312 |
| `abd_pain_meal_relation` | {0,05; 0,40; 0,55} | — | Giữ của lượt A | Ăn uống làm quặn bụng, đi ngoài nhiều hơn; kiểu "đau lúc đói, ăn vào đỡ" gợi ý viêm loét dạ dày | CDC |
| `red_jelly_stool` | rare | — | **rare + `above_leak_ok`** | Bines: 9% trẻ nhóm chứng ở Hà Nội (phần lớn viêm dạ dày – ruột) được ghi là có phân như mứt dâu. Giữ rare (không lên occasional vì nhóm chứng đã bị nghi lồng ruột, có chọn lọc); vẫn thấp hơn lồng ruột 8 lần, quy tắc mức 2 vẫn áp dụng | Bines 2006 |
| `myalgia` | occasional | — | Giữ | CDC liệt kê đau mỏi người là triệu chứng khác | CDC norovirus |
| `fatigue` | — | frequent | Giữ | 5642 liệt kê mệt mỏi trong tình trạng nhiễm độc | 5642 |
| `vomiting_bilious` | — (dấu hiệu chưa có) | occasional | Giữ | Sau nhiều lần nôn hay ra dịch vàng đắng; 3312 xếp nôn ra mật vào chỉ định nhập viện | 3312, NHS |
| `episodic_crying_legs_drawn` | — | occasional (B/numeric) | Giữ, đổi cơ sở thành **judgment** | Bines chỉ ghi "đau bụng" ở 18–19% trẻ nhóm chứng, không tách riêng cơn khóc thét; mức 20% gấp đôi tỷ lệ nền 0,10 | Bines 2006 |
| `fever_max_temp` | {0,40; 0,40; 0,20} | {0,40; 0,42; 0,18} | Trung bình | Lệch rất nhỏ | 5642, CDC |
| `abd_pain_location`, `abd_pain_duration` | | | Trung bình | TVD dưới 0,05 | |
| `warning_signs` | 7 dấu hiệu | 7 dấu hiệu | Hợp hai bản, **bỏ** `diarrhea_bloody` và `abd_pain_severe` | Phân có máu thuộc mức 3 (khám trong ngày), không phải "đi cấp cứu ngay". Đau bụng dữ dội báo hiệu bệnh khác chứ không phải biến chứng của bệnh này; dấu hiệu đó đã có trong danh sách an toàn chung của triệu chứng chính, và bộ suy luận mới đưa bệnh có dấu hiệu cảnh báo đang có vào danh sách "bác sĩ cần loại trừ" | NHS D&V |
| `self_care_vi`, `see_doctor_vi` | | | Gộp, viết lại | Có nguồn cho dung dịch bù nước và lời dặn không tự dùng thuốc cầm nôn, cầm tiêu chảy cho trẻ | WHO 2005, 3312, NHS, CDC |

Giống nhau ở hai lượt: tên chính thức, mã A09, `urgency` 5, `cant_miss` false, prior đau bụng, `abdominal_pain` very_frequent, `diarrhea` very_frequent, `diarrhea_bloody` occasional, `vomiting` frequent, `fever` frequent, `fever_duration`, `abd_pain_colicky` frequent, `persistent_vomiting`, `child_vomits_everything`, `sunken_eyes`, `decreased_urine`, `unsafe_food_shared`, `headache` occasional, `loss_of_appetite` frequent, `abd_pain_worse_movement` rare.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P1 ở trẻ 2 tháng – 5 tuổi khi đau bụng, P2 ở trẻ 2 tháng – 5 tuổi khi sốt, P3 khi sốt ở người từ 5 tuổi.
- Phân bố vị trí đau, thời gian đau, liên quan bữa ăn, nhiệt độ, số ngày sốt.
- `nausea`, `persistent_vomiting`, `child_vomits_everything`, `unsafe_food_shared`, `sunken_eyes`, `decreased_urine`, `fatigue`, `headache`, `loss_of_appetite`, `abd_pain_colicky`, `abd_pain_severe`, `abd_pain_worse_movement`.
- `vomiting_bilious`, `episodic_crying_legs_drawn`, `red_jelly_stool` (ba liên kết cố ý ở mức gần hoặc cao hơn tỷ lệ nền).

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-acute-gastroenteritis-1 (điển hình, người ăn cùng cũng bị) | Hạng 1 (gần 100%), mức 5/5 | |
| d-acute-gastroenteritis-2 (bé 18 tháng, cha mẹ chọn "Sốt") | Hạng 1 (98%), mức 5/5 | Kiểm tra lời dặn của lô: viêm dạ dày – ruột có sốt không bị đẩy lên mức 2. Bản nhiễu cho mức 2 vì câu nôn ra máu hoặc phân đen bị đổi thành "Không rõ" ở trẻ dưới 5 tuổi (nhóm nguy cơ cao: quy tắc `rf_gi_bleeding` chưa xác định được tính đúng mức 2, theo thiết kế an toàn) |
| d-acute-gastroenteritis-3 (dễ nhầm viêm ruột thừa) | Hạng 1 (91%), **mức 2** (đúng là 5) | Khuyên quá mức: viêm ruột thừa còn 5,8% (trên ngưỡng 1% của bệnh không được bỏ sót). Phiên dừng "confident" sau 12 câu, **chưa hỏi vị trí đau**, đau di chuyển, đau tăng khi cử động: không câu đơn lẻ nào kéo viêm ruột thừa xuống dưới 1%, nên mức xử trí bị coi là ổn định. Không sửa tham số vì tri thức không sai: khi thử cho hỏi bắt buộc vị trí đau (chạy thử trong bộ nhớ, không sửa tệp), ca này cho mức 5 |

## 4. Đề xuất cho người bảo trì

1. Hỏi bắt buộc `abd_pain_location` ở triệu chứng chính đau bụng (sau nhóm dấu hiệu nguy hiểm). Chạy thử trong bộ nhớ trên 99 ca dev (ngày 25/10/2026, sau khi người bảo trì đổi `min_voi`): mức xử trí đúng 90 → 93 ca, khuyên quá mức 9 → 6 ca, top-1 75 → 76; bản nhiễu top-1 73 → 75, top-3 90 → 93, nhưng một ca nhiễu (d-acute-coronary-syndrome-3) từ mức 1 xuống mức 2 vì chuỗi nhiễu thay đổi, cần xem lại trước khi áp dụng. Gốc vấn đề là điều kiện dừng: mức xử trí được coi là ổn định khi không câu đơn lẻ nào đổi được mức, dù vài câu cộng lại có thể đổi.
2. Câu hỏi `vomiting_bilious` gộp "xanh lá" với "vàng đắng như mật"; trẻ viêm dạ dày – ruột nôn nhiều có thể trả lời "Có" và bị quy tắc `rf_child_bilious_vomiting` xếp mức 2. NHS dùng "xanh hoặc vàng xanh"; nên cân nhắc bỏ chữ "vàng đắng".
