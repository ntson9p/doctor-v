# Biên bản đối chiếu: Viêm túi mật cấp (`acute_cholecystitis`)

- Người đối chiếu: `agent:pass-c` (lô 3), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/acute_cholecystitis.yaml`, `knowledge/drafts/pass-b/acute_cholecystitis.yaml`.
- Bản chính thức: `knowledge/conditions/acute_cholecystitis.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 22, lượt B 16, chung 16, hợp 22; bản chính thức 19 liên kết.
- Nguồn đã mở lại: MSD Acute cholecystitis, NHS Acute cholecystitis, Cartwright 2008 (Bảng 2), Trowbridge 2003, Jain 2017, Gallaher 2022 (tóm tắt qua API Europe PMC), Viniol 2014, Cervellin 2016 (toàn văn PMC).
- Sổ nguồn: lượt B gọi Jain 2017 là `jain-2017-cholecystitis-dta`; sổ nguồn dùng `jain-aem-2017`.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi` | Viêm túi mật cấp | Viêm túi mật cấp tính | Lượt B | Tên ICD-10 tiếng Việt lượt B đã tra | — |
| `names.vi_common` | có "Viêm túi mật do sỏi" | 1 tên | Giữ 2 tên | Tên hay dùng | — |
| `codes.icd10_verified` | false | true | true | Lượt B tra icd.kcb.vn | — |
| `specialties` | ngoại, tiêu hóa, cấp cứu | ngoại, tiêu hóa | Ngoại, tiêu hóa | Bộ suy luận tự thêm cấp cứu khi mức 1–2 | — |
| Prior đau bụng | mặc định P4, từ 45 tuổi P3 | mặc định P3, 18–44 tuổi P4 | Cùng mức theo từng nhóm tuổi; khai báo theo lượt B, bậc **B/judgment** | Hai cách viết cho cùng kết quả. Chỉ có số liệu nhóm mật – tụy (Viniol 4,0%) và cấp cứu ở Ý (6,0% / 13,2%) | Viniol, Cervellin |
| `abdominal_pain` | very_frequent | almost_always | **very_frequent** | Lệch một mức. MSD: người già có thể chỉ có triệu chứng toàn thân; almost_always làm câu "Không đau bụng" loại trừ quá mạnh ở nhóm này (khi triệu chứng chính là sốt) | MSD |
| `abd_pain_location`, `abd_pain_onset`, `abd_pain_duration`, `fever_max_temp`, `fever_duration` | | | Trung bình | Khởi phát: A 0,35, B 0,50 đột ngột; các phân bố khác lệch nhỏ | NHS, MSD, Jain |
| `abd_pain_meal_relation` | {0,03; 0,50; 0,47} | — | Giữ, hạ "đau tăng sau ăn" còn **0,42** | Gallaher: đôi khi tăng sau ăn. Một phần thông tin đã có trong câu "đau sau bữa ăn nhiều dầu mỡ" (hai câu không cùng cụm), nên hạ để giảm đếm trùng | Gallaher |
| `abd_pain_colicky` | occasional | — | **Bỏ** | Mức bằng tỷ lệ nền 0,2, không mang thông tin | — |
| `abd_pain_severe` | frequent | occasional | **occasional** | Lệch một mức; "không chịu nổi" là ngưỡng cao. Khi trả lời "Có", quy tắc `rf_severe_abdominal_pain` đã xếp mức 2, nên tác dụng chính của liên kết là ở câu trả lời "Không": mức thấp hơn làm câu "Không" ít hạ bệnh nguy hiểm này hơn | NHS, MSD |
| `abdomen_hard_swollen` | rare | — | **rare + `above_leak_ok`** | MSD: không điều trị, khoảng 10% thủng, viêm phúc mạc. Mức rare cao hơn tỷ lệ nền 1% có chủ ý để câu "Có" không hạ bệnh nguy hiểm | MSD |
| `chills_rigors` | occasional (trong số người có sốt) | — | **Bỏ liên kết**, giữ trong `warning_signs` | Mức bằng tỷ lệ nền 0,2 của câu hỏi, không mang thông tin; rét run vẫn là dấu hiệu cảnh báo (mủ túi mật, viêm đường mật) | MSD |
| `nausea` | very_frequent | frequent | **frequent** | Lệch một mức. NHS chỉ ghi "một số người"; tỷ lệ nền 35% cao, very_frequent làm câu "Không" hạ bệnh khoảng 3 lần | NHS, Gallaher, MSD |
| `vomiting` | very_frequent (MSD "thường gặp") | frequent | **frequent** | Lệch một mức; NHS ghi "một số người"; cùng lý do thận trọng | MSD, NHS |
| `loss_of_appetite` | frequent | — | Giữ | NHS liệt kê chán ăn; MSD: người già chán ăn | NHS, MSD |
| `diarrhea` | rare | — | **Bỏ** | Ước lượng không có nguồn, sẽ hạ một bệnh nguy hiểm khi có tiêu chảy | — |
| `jaundice` | occasional (C/verbal) | occasional (A/numeric, Jain 11–14%) | Giữ, bậc A | Cùng mức, theo nguồn tốt hơn | Jain |
| `warning_signs` | 7 dấu hiệu | 6 dấu hiệu | Hợp hai bản | | MSD, NHS |
| `proposed_findings` | `abd_pain_radiates_right_shoulder` | — | Bỏ khỏi tệp | Dấu hiệu đã có trong danh mục | — |
| `self_care_vi` | 2 câu | — | Giữ | | |

Giống nhau ở hai lượt: mã K81.0, `urgency` 2, `cant_miss` false, prior khi sốt, `abd_pain_radiates_right_shoulder` frequent, `abd_pain_radiates_back` occasional, `pain_after_fatty_meal` occasional, `abd_pain_worse_movement` occasional, `fever` frequent, `gallstones_known` frequent.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior (P4 ở 18–44 tuổi, P3 từ 45 tuổi; P4 khi sốt ở người từ 65 tuổi).
- Các phân bố; `abd_pain_radiates_right_shoulder`, `abd_pain_radiates_back`, `pain_after_fatty_meal`, `abd_pain_meal_relation`, `abd_pain_severe`, `abd_pain_worse_movement`, `abdomen_hard_swollen`, `nausea`, `vomiting`, `loss_of_appetite`, `gallstones_known` (ước khoảng một nửa người bệnh đã biết có sỏi).
- Giữ `cant_miss: false` như hai lượt; nên cân nhắc lại cho người già, người đái tháo đường.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-acute-cholecystitis-1 (điển hình, có sỏi, lan vai phải, sốt) | Hạng 1 (75%), mức 2/2 | |
| d-acute-cholecystitis-2 (ông 80 tuổi, đái tháo đường, chọn "Sốt") | Hạng 1 (59%), mức 2/2 | Trước khi người bảo trì đổi `min_voi` (0,01 → 0,1) trong lúc lượt C làm việc, ca này cho mức 1 (nhiễm khuẩn huyết 6%) và hạng 3 |
| d-acute-cholecystitis-3 (đái tháo đường, tăng huyết áp, dễ nhầm hội chứng vành cấp) | Hạng 2 (21%; viêm loét dạ dày 23%), mức 2/2 | Thiếu nhiều dấu hiệu điển hình (không sốt, không lan vai, không biết có sỏi); "nguyên nhân khác" 36%. Hội chứng vành cấp không vào 5 bệnh đầu |
