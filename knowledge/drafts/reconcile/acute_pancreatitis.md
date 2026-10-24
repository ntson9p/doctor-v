# Biên bản đối chiếu: Viêm tụy cấp (`acute_pancreatitis`)

- Người đối chiếu: `agent:pass-c` (lô 3), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/acute_pancreatitis.yaml`, `knowledge/drafts/pass-b/acute_pancreatitis.yaml`.
- Bản chính thức: `knowledge/conditions/acute_pancreatitis.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 19, lượt B 21, chung 15, hợp 25; bản chính thức 23 liên kết.
- Nguồn đã mở lại: ACG 2024 (toàn văn PMC), MSD Acute pancreatitis, NHS Acute pancreatitis, Phan 2024 và Nguyen 2025 (toàn văn PMC), Viniol 2014, Cervellin 2016.
- Sổ nguồn: hai lượt đặt hai ID cho ACG 2024 và Nguyen 2025; sổ nguồn dùng `acg-pancreatitis-2024`, `nguyen-bmcgastro-2025`, `phan-medicine-2024`.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi`, `vi_common` | Viêm tụy cấp / Viêm tụy | Viêm tụy cấp tính / Viêm tụy cấp | Tên ICD theo lượt B; hợp tên thường gọi | | — |
| `codes.icd10_verified` | false | true | true | Lượt B tra icd.kcb.vn | — |
| `specialties` | tiêu hóa, cấp cứu, ngoại | tiêu hóa, cấp cứu | Tiêu hóa, cấp cứu | | — |
| Prior 5–12 tuổi | P6 | P5 | **P5** | Lệch một mức, cùng là ước lượng; chọn mức thận trọng cho bệnh không được bỏ sót | — |
| Prior: bậc | B/judgment | A/judgment | **B/judgment** | Không có tổng quan hệ thống cho tỷ lệ này | Viniol, Cervellin |
| `prior_modifiers` (giới) | không có | nam 1,3, nữ 0,7 | **Giữ của lượt B** | Hai nghiên cứu Việt Nam: nam/nữ 2,8/1 và nam 62,3% (bệnh viện tuyến cuối); khác biệt rõ theo kb-guide mục 2.4 | Phan 2024, Nguyen 2025 |
| `abd_pain_severe` | very_frequent (B/verbal: ACG "thường dữ dội") | frequent | **frequent** | Lệch một mức. ACG mô tả người bệnh nhập viện; hạ một mức cho người tự kiểm tra (kb-guide mục 2.1) và vì "không chịu nổi" là ngưỡng cao. Câu "Có" đã được quy tắc xếp mức 2; very_frequent làm câu "Không" hạ bệnh không được bỏ sót khoảng 4 lần | ACG, MSD |
| `fever` | occasional | frequent | **occasional** | Lệch một mức. MSD: trên 60% có sốt trong quá trình bệnh, nhưng sốt thường xuất hiện muộn; lúc mới đau ít hơn. Mức thấp hơn cũng làm câu "Không sốt" ít hạ bệnh này | MSD |
| `abd_pain_location`, `abd_pain_duration` | | | Trung bình | Lệch rất nhỏ | ACG, MSD, NHS |
| `abd_pain_colicky` | occasional | — | **Bỏ** | Mức bằng tỷ lệ nền 0,2 (lượt A cố ý để "gần bằng nền"); không mang thông tin. ACG: đau quặn không phù hợp viêm tụy | ACG |
| `diarrhea` | rare | — | **Bỏ** | Ước lượng không có nguồn, hạ một bệnh không được bỏ sót | — |
| `loss_of_appetite` | frequent | — | Giữ | Nôn nhiều nên thường bỏ ăn | MSD |
| `pain_after_fatty_meal` | occasional | — | Giữ | Viêm tụy do sỏi mật hoặc tăng triglycerid (23,6% ở Chợ Rẫy) có thể khởi phát sau bữa nhiều dầu mỡ; liên kết làm tăng bệnh nguy hiểm nên an toàn | ACG, Nguyen 2025 |
| `abd_pain_radiates_right_shoulder` | — | occasional | Giữ | Câu hỏi gồm cả "sau lưng bên phải"; cùng cụm pain_radiation | NHS, ACG |
| `flank_pain` | — | occasional | Giữ | ACG: lan ra hai bên hông; NHS: lan ra hai bên | ACG, NHS |
| `vomiting_bilious` | — (dấu hiệu chưa có) | occasional | Giữ | Nôn nhiều lần hay ra dịch vàng đắng | MSD |
| `fever_max_temp`, `fever_duration` | — | có | Giữ | Phân bố trong số người có sốt | MSD |
| `diabetes` | — | occasional | Giữ | Đái tháo đường 43,7% và 26,8% (tuyến cuối), hạ một mức | Phan, Nguyen |
| `warning_signs` | 8 dấu hiệu | 7 dấu hiệu | Hợp hai bản | | NHS |
| `self_care_vi` | 2 câu | 1 câu | Gộp | | |

Giống nhau ở hai lượt: mã K85, `urgency` 2, `cant_miss` true, prior P4 ở người lớn, `abd_pain_radiates_back` frequent, `abd_pain_onset`, `abd_pain_meal_relation`, `abd_pain_worse_movement`, `abdomen_hard_swollen`, `persistent_vomiting`, `jaundice`, `gallstones_known` occasional, `nausea`, `vomiting` very_frequent, `heavy_alcohol` frequent.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P4 (người lớn), P5 (5–17 tuổi); hệ số giới tính từ bệnh viện tuyến cuối.
- `abd_pain_radiates_back` frequent (không có số liệu, theo chữ "thường" của ACG áp dụng chung cho ba hướng lan); `abd_pain_severe` frequent; `fever` occasional.
- Các phân bố; `pain_after_fatty_meal`, `abd_pain_radiates_right_shoulder`, `flank_pain`, `vomiting_bilious`, `persistent_vomiting`, `loss_of_appetite`, `gallstones_known`.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-acute-pancreatitis-1 (điển hình, uống rượu, đau dữ dội lan lưng) | Hạng 2 trong danh sách "bác sĩ cần loại trừ" (sau viêm ruột thừa), mức 2/2 | Phiên dừng ngay sau nhóm dấu hiệu nguy hiểm (đau dữ dội), nên chưa hỏi vị trí, lan lưng, rượu; xếp hạng chỉ dựa vào tuổi, giới và câu đau dữ dội. Lượt C bỏ `abd_pain_severe` khỏi dấu hiệu cảnh báo của viêm dạ dày – ruột và cơn đau quặn thận để hai bệnh này không chiếm danh sách cần loại trừ (trước đó viêm tụy không vào danh sách). Người bảo trì sửa cách lập danh sách này trong lúc lượt C làm việc, nên kết quả có thể còn đổi |
| d-acute-pancreatitis-2 (nữ, đái tháo đường, không rượu, đau không dữ dội) | Hạng 3 (4%; viêm loét dạ dày 63%), mức 2/2 | Ca không điển hình: thiếu đau lan lưng, đau dữ dội; mức 2 nhờ ngưỡng bệnh không được bỏ sót |
| d-acute-pancreatitis-3 (dễ nhầm viêm loét dạ dày) | Hạng 3 (4%; viêm loét dạ dày 81%), mức 2/2 | Phiên dừng "confident" sau 8 câu khi viêm loét dạ dày đạt 81%, **chưa hỏi đau lan ra lưng và uống rượu** (cả hai có trong ca, sẽ tăng viêm tụy khoảng 30 lần). Mức xử trí vẫn đúng; không sửa tham số vì tri thức không sai. Đề xuất: điều kiện dừng theo bệnh đứng đầu (0,70) nên không áp dụng khi bệnh đứng đầu là bệnh lành tính mà mức xử trí đang do bệnh không được bỏ sót quyết định |
