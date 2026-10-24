# Biên bản đối chiếu: Viêm bàng quang cấp (`cystitis`)

- Người đối chiếu: `agent:pass-c` (lô 3), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/cystitis.yaml`, `knowledge/drafts/pass-b/cystitis.yaml`.
- Bản chính thức: `knowledge/conditions/cystitis.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 15, lượt B 13, chung 12, hợp 16; bản chính thức 16 liên kết.
- Nguồn đã mở lại: 3931/QĐ-BYT (bài Viêm bàng quang cấp), 3312/QĐ-BYT (bài Nhiễm trùng đường tiểu ở trẻ em), Giesen 2010 và Little 2010 (toàn văn PMC), Bent 2002 (tóm tắt), NHS UTIs, Viniol 2014, Erkan 2004.
- Sổ nguồn: `nhs-utis` có sẵn nhưng chưa kiểm tra; lượt C mở trang và đặt `verified: true` (lượt A trích cùng trang với ID `nhs-uti`, đường dẫn /conditions/cystitis/). Lượt B gọi Little 2010 và Bent 2002 là `little-2010-bmj-uti-symptoms`, `bent-2002-jama-uti`; sổ nguồn dùng `little-bmj-2010`, `bent-jama-2002`.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi` | Viêm bàng quang cấp | Viêm bàng quang cấp tính | Lượt B | Tên ICD-10 tiếng Việt | — |
| `codes.icd10_verified` | false | true | true | Lượt B tra icd.kcb.vn | — |
| `specialties` | đa khoa, tiết niệu, nhi | đa khoa, tiết niệu | Đa khoa, tiết niệu | Bộ suy luận tự thêm nhi khoa cho trẻ | — |
| `prior_modifiers` (giới) | không có (ghi là chưa khai báo được) | nữ 1,8, nam 0,2 | **Giữ của lượt B** | 3931: nữ/nam 9/1; 3312: trẻ gái 5%, trẻ trai 1–2% | 3931, 3312 |
| `fever` | occasional (A/numeric, Giesen 0,10) | rare (B/verbal, 3931) | **rare** | Lệch một mức. Số của Giesen gộp cả nhiễm khuẩn tiết niệu trên, trong khi hệ thống đã có viêm thận – bể thận riêng; 3931: thường không sốt hoặc chỉ sốt nhẹ dưới 38°C. Mức occasional (cao hơn tỷ lệ nền 5%) sẽ làm sốt tăng khả năng viêm bàng quang, kéo người sốt, tiểu buốt về mức 4 thay vì mức 3 | 3931, Giesen |
| `fever_max_temp`, `abd_pain_location` | | | Trung bình | Lệch nhỏ | 3931, 3312 |
| `abd_pain_duration` | dưới 24 giờ 0,40 | dưới 24 giờ 0,18 (theo Little) | Theo số liệu của Little, dịch nhẹ về phía sớm: {0,06; 0,20; 0,42; 0,24; 0,08} | TVD 0,22. Little: triệu chứng trung vị 3 ngày (3–7) trước khi khám, 13% trên 10 ngày; người tự kiểm tra có thể kiểm tra sớm hơn người đi khám | Little 2010 |
| `abd_pain_worse_movement` | rare | — | Giữ | Không có kích thích phúc mạc; giúp phân biệt với viêm ruột thừa, viêm vùng chậu; hạ một bệnh lành tính nên an toàn | 3931 |
| `abd_pain_meal_relation` | {0,03; 0,05; 0,92} | — | Giữ | Đau do bàng quang không liên quan bữa ăn | 3931 |
| `diarrhea` | rare | — | Giữ | Giúp phân biệt với viêm dạ dày – ruột | 3931 |
| `abnormal_vaginal_discharge` | — (không liên kết vì khi đó tỷ lệ nền là 5%) | rare (A/numeric, Bent LR 0,3) | **Giữ rare** | Với tỷ lệ nền mới 0,15, rare cho LR khoảng 0,17 (mạnh hơn y văn 0,3–0,65), còn occasional làm câu "Có" tăng khả năng, sai chiều. Khí hư gợi ý viêm âm đạo, viêm vùng chậu (mức 3) hơn là viêm bàng quang | Bent, Giesen |
| `dysuria`, `urinary_frequency`, `hematuria`, `flank_pain` | cùng mức, nguồn Giesen | cùng mức, nguồn Little, Bent | Giữ mức, hợp nguồn | | Giesen, Little, Bent |
| `warning_signs` | 3 dấu hiệu | 4 dấu hiệu | Hợp hai bản | | NHS |
| `self_care_vi` | 3 câu (có "không nhịn tiểu quá 6 giờ", "hạn chế cà phê, rượu bia") | 1 câu | Gộp còn 2 câu | Bỏ hai ý lượt C chưa mở được nguồn | — |
| `see_doctor_vi` | | | Gộp theo danh sách khám khẩn của NHS (nam, có thai, trẻ em, từ 65 tuổi, sốt, đau hông lưng, tiểu máu) | | NHS |

Giống nhau ở hai lượt: mã N30.0, `urgency` 4, `cant_miss` false, prior P3 (dưới 5 tuổi P4, dưới 2 tháng P5), `dysuria`, `urinary_frequency` very_frequent, `hematuria`, `flank_pain` occasional, `abd_pain_severe` rare, `abd_pain_onset`, `nausea` occasional, `vomiting` rare.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P3 cho triệu chứng chính đau bụng (phần lớn người viêm bàng quang sẽ chọn triệu chứng tiểu buốt); hệ số giới tính áp dụng cho mọi tuổi dù ở trẻ em tỷ số chỉ khoảng 3/1.
- `fever` rare; `abnormal_vaginal_discharge` rare; `nausea` occasional; các phân bố.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-cystitis-1 (điển hình) | Hạng 1 (97%), mức 4/4 | |
| d-cystitis-2 (nam 55 tuổi) | Hạng 1 (90%), mức 3/3 | Mức 3 nhờ quy tắc `rf_uti_high_risk` |
| d-cystitis-3 (đau bụng dưới lệch phải, buồn nôn, dễ nhầm viêm ruột thừa) | Hạng 1 (74%), **mức 2** (đúng là 4) | Khuyên quá mức: viêm ruột thừa còn 3,6% (trên ngưỡng 1%) vì đau hố chậu phải kèm buồn nôn. Tri thức không sai (NHS ghi viêm ruột thừa có thể gây đi tiểu nhiều lần), nên không sửa |

## 4. Đề xuất cho người bảo trì

- NHS khuyên người từ 65 tuổi có triệu chứng nhiễm khuẩn tiết niệu đi khám khẩn trong ngày, nhưng quy tắc `rf_uti_high_risk` chỉ gồm nam giới, có thai, trẻ em. Đề xuất thêm điều kiện `{ age_years_gte: 65 }` và đổi nguồn sang `nhs-utis` (nay đã kiểm tra).
