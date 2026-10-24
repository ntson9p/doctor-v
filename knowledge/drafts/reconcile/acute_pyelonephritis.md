# Biên bản đối chiếu: Viêm thận – bể thận cấp (`acute_pyelonephritis`)

- Người đối chiếu: `agent:pass-c` (lô 2), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/acute_pyelonephritis.yaml`, `knowledge/drafts/pass-b/acute_pyelonephritis.yaml`.
- Bản chính thức: `knowledge/conditions/acute_pyelonephritis.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 18, lượt B 17, chung 13; bản chính thức 19 liên kết.
- Nguồn đã mở lại: 3931/QĐ-BYT bài Viêm thận bể thận cấp (bản PDF trên vnras.com, tr. 49–53; sổ nguồn trước đây mới ghi đã đọc bài sỏi và viêm bàng quang); Kim 2018, Chițu 2026 (toàn văn qua API Europe PMC); Ki 2004, Shaikh 2008, Scholes 2005, Pinson 1997 (tóm tắt); trang NHS Kidney infection (rà soát 13/2/2025).
- Đổi ID nguồn: `kim-2018-pyelonephritis-korea` → `kim-jkms-2018`; `shaikh-2008-uti-prevalence-children` → `shaikh-pidj-2008`; `scholes-2005-pyelonephritis-risk` → `scholes-aim-2005`; `pinson-1997-fever-pyelonephritis` → `pinson-ajem-1997`. Bậc mặc định của Shaikh hạ từ A xuống B (phân tích gộp tỷ lệ hiện mắc, không phải độ chính xác chẩn đoán).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names` | Viêm thận bể thận cấp; thường gọi: Nhiễm trùng thận, Viêm đài bể thận cấp | Viêm thận – bể thận cấp; thường gọi: Nhiễm trùng thận, Viêm đài bể thận | **Lượt B** | Cách viết của kb-guide mục 2.5 | — |
| `codes.icd10_verified` | true | false | **false** | Trong 3931, mã N10 gắn với bài 'Viêm ống kẽ thận cấp'; bài viêm thận bể thận không ghi mã. Kim 2018: 93% ca viêm thận – bể thận ở Hàn Quốc mang mã N10. Chưa đối chiếu bảng ICD-10 của Bộ Y tế | 3931; Kim 2018 |
| `specialties` | tiết niệu, thận | thận, tiết niệu | **Lượt B** | Chỉ khác thứ tự | — |
| Prior 'Đau bụng': 2 tháng–5 tuổi | P4 | P3 (mặc định) | **P3** | Lệch một mức, đều ước lượng; nhiễm khuẩn tiết niệu là nguyên nhân đau bụng có sốt hay gặp ở trẻ nhỏ | — |
| `prior_modifiers` theo giới (ghi chú đợt) | không (đề nghị thêm) | nữ × 1,7; nam × 0,3 | **Lượt B** | Nguồn cho thấy khác biệt rõ: nữ 71,3 so với nam 6,5/10.000/năm (Kim 2018, từ 15 tuổi); 59,0 so với 12,6 (Ki 2004, mọi tuổi). Tỷ số 5,7 nằm giữa 4,7 và 11, trung bình hai giới vẫn bằng 1 | Kim 2018; Ki 2004 |
| `fever_max_temp` | 0,08/0,32/0,60 | 0,10/0,35/0,55 | **0,09/0,34/0,57** | Trung bình | 3931 |
| `fever_duration` | 0,50/0,35/0,08/0,07 | 0,55/0,33/0,08/0,04 | **0,52/0,34/0,08/0,06** | Trung bình | 3931 |
| `flank_pain`, `dysuria`, `urinary_frequency`: mức riêng theo tuổi | không | dưới 2 tháng rare; 2 tháng–5 tuổi occasional | **Giữ của lượt B** | Trẻ nhỏ không chỉ được chỗ đau, không kể được tiểu buốt; NHS: trẻ dưới 2 tuổi có thể chỉ có sốt | NHS |
| `nausea` | không liên kết | frequent | **Giữ** | NHS liệt kê buồn nôn, nôn | NHS |
| `vomiting` | không liên kết | occasional | **Giữ** | Như trên | NHS |
| `headache` | frequent | không liên kết | **Bỏ** | Khi sốt, mức frequent bằng tỷ lệ nền 0,5 (trung tính); khi đau bụng, liên kết sẽ đếm trùng với câu hỏi sốt (đều phản ánh hội chứng nhiễm trùng của 3931), tăng thêm 10 lần | 3931 |
| `fatigue` | frequent | không liên kết | **Bỏ** | Như trên; không có tần suất | 3931; Chițu |
| `pregnant` | occasional | không liên kết | **Giữ** | Có thai là yếu tố thuận lợi (tắc nghẽn); ước 10–20% phụ nữ 13–64 tuổi bị bệnh đang có thai | 3931 mục 1; NHS |
| `confusion` | rare | không liên kết | **Bỏ** | rare cao hơn tỷ lệ nền 1% (cảnh báo của bộ kiểm tra); lú lẫn đã có quy tắc mức 2 và nằm trong `warning_signs` | Chițu |
| `decreased_urine` | occasional | không liên kết | **Giữ** | Người cao tuổi hay tiểu ít; NHS: cả ngày không đi tiểu thì khám gấp | Chițu; NHS; 3931 |
| `diabetes` | không liên kết | occasional | **Giữ** | Đái tháo đường OR 4,1 | Scholes 2005 |
| `kidney_stones_known` | không liên kết | occasional | **Giữ** | Sỏi gây tắc là yếu tố thuận lợi | 3931 mục 1; NHS |
| `abd_pain_location` | 0,05/0,20/0,18/0,05/0,15/0,14/0,15/0,08 | 0,04/0,18/0,18/0,04/0,14/0,14/0,18/0,10 | **0,05/0,19/0,18/0,04/0,15/0,14/0,16/0,09** | Trung bình | 3931; NHS |
| `abd_pain_duration` | 0,08/0,27/0,45/0,17/0,03 | 0,08/0,30/0,45/0,15/0,02 | **0,08/0,28/0,45/0,16/0,03** | Trung bình | 3931 |
| `warning_signs` | 8 mục | 6 mục | **Hợp** | Thêm khó thở, choáng ngất (dấu hiệu nhiễm khuẩn huyết, sốc; 3931: chậm điều trị có thể sốc nhiễm khuẩn) | 3931 |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | 3931: sốt cao rét run cần điều trị nội trú | 3931 mục 3 |

Giống nhau ở hai lượt: mã N10, `urgency` 3, `cant_miss` false, prior 'Sốt' (P3; dưới 2 tháng và từ 65 tuổi P2), prior 'Đau bụng' mặc định P3, các liên kết sốt (very_frequent), rét run, tiểu buốt, tiểu nhiều lần, đau bụng, đau lan ra lưng (frequent), đau hông lưng (very_frequent), tiểu máu, đau lan xuống bẹn (occasional).

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P3 (2–5% người sốt hoặc đau bụng), P2 ở người từ 65 tuổi; chưa có số liệu Việt Nam.
- Độ lớn hệ số giới (áp dụng cho mọi tuổi, trong khi ở trẻ nhỏ và người cao tuổi chênh lệch ít hơn).
- Hầu hết tần suất triệu chứng (3931 và NHS chỉ mô tả bằng lời); mức riêng cho trẻ nhỏ; có thai, đái tháo đường, sỏi thận, tiểu ít (occasional); các phân bố.

## 3. Ca phát triển

| Ca | Kết quả sạch | Ghi chú |
|---|---|---|
| d-acute-pyelonephritis-1 (nữ 28 tuổi, sốt rét run, đau hông lưng phải, tiểu buốt) | Hạng 1 (97%), mức 3/3 | |
| d-acute-pyelonephritis-2 (nữ 78 tuổi, đái tháo đường, không tiểu buốt, không đau lưng, nôn, tiểu ít) | Hạng 1 (88%), mức 2, đúng là 3 | Khuyên quá mức (an toàn): ngưỡng của người từ 75 tuổi giảm một nửa nên 1% nhiễm khuẩn huyết đã đủ lên mức 2 |
| d-acute-pyelonephritis-3 (nữ 31 tuổi, triệu chứng chính đau bụng dưới sườn phải lan ra lưng, sốt, nôn, tiểu buốt; dễ nhầm bệnh túi mật, sốt xuất huyết) | Hạng 1 (87%; viêm vùng chậu 10%), mức 3/3 | |
