# Biên bản đối chiếu: Cơn đau quặn thận (`renal_colic`)

- Người đối chiếu: `agent:pass-c` (lô 3), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/renal_colic.yaml`, `knowledge/drafts/pass-b/renal_colic.yaml`.
- Bản chính thức: `knowledge/conditions/renal_colic.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 20, lượt B 17, chung 17, hợp 20; bản chính thức 20 liên kết.
- Nguồn đã mở lại: 3931/QĐ-BYT (PDF đăng lại trên vnras.com: bài Sỏi thận tiết niệu, Ứ nước – ứ mủ bể thận, Viêm bàng quang cấp), STONE (Moore 2014, toàn văn PMC, lượt C tự tính lại tỷ lệ trong 515 người có sỏi từ Bảng 2), NHS Kidney stones, Viniol 2014, Cervellin 2016.
- Sổ nguồn: `byt-qd-3931-2015` đã có (lượt A thêm); lượt C cập nhật `accessed`, `verified_by` và ghi chú các bài đã đối chiếu. Lượt B gọi STONE là `moore-2014-bmj-stone-score`; sổ nguồn dùng `moore-bmj-2014`.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi` | Cơn đau quặn thận do sỏi tiết niệu | Cơn đau quặn thận | Lượt B | Tên ICD-10 tiếng Việt của N23 | — |
| `codes.icd10` | N20 (sỏi thận và niệu quản), chưa đối chiếu | N23 (cơn đau quặn thận không đặc hiệu), đã đối chiếu | **N23** | Đúng với tình huống chưa xác định có sỏi khi người dùng tự kiểm tra; ghi N20 là phương án khác trong ghi chú | — |
| `specialties` | tiết niệu, cấp cứu | tiết niệu | Tiết niệu | | — |
| Prior từ 75 tuổi | P3 (mặc định) | P4 | **P4** | Lệch một mức, cùng là ước lượng. Tỷ lệ giảm theo tuổi (Cervellin: 34,5% → 20,8% ở cấp cứu) và ở người già các bệnh nguy hiểm giống cơn đau quặn thận nhiều hơn, nên mức thấp hơn thận trọng hơn | Cervellin |
| `prior_modifiers` (giới) | không có (ghi là chưa khai báo được) | nam 1,3, nữ 0,7 | **Giữ của lượt B** | 3931: nam nhiều hơn nữ; STONE: 72% người có sỏi là nam | 3931, STONE |
| `abd_pain_radiates_back` | frequent (ước lượng) | occasional (STONE: 26%) | **occasional** | Có số liệu | STONE |
| `abd_pain_colicky` | very_frequent (3931: "cơn đau quặn thận điển hình") | frequent (STONE: không liên tục 57%) | **frequent** | Có số liệu | STONE |
| `abd_pain_onset` | 0,75 đột ngột | 0,80 (STONE 82%) | **0,80** | Có số liệu | STONE, 3931 |
| `abd_pain_severe` | very_frequent | frequent (STONE 86% ở cấp cứu, hạ một mức) | **frequent** | Số liệu cấp cứu, hạ một mức cho người tự kiểm tra; mức thấp hơn để đau dữ dội không bị quy hết cho bệnh mức 3 này | STONE, 3931 |
| `abd_pain_duration` | theo STONE (dưới 6 giờ 0,55) | tăng "tái đi tái lại" (0,12) | Trung bình | TVD 0,12. Sỏi hay tái phát (38% đã từng bị) và người dùng có thể kiểm tra giữa các cơn | STONE, NHS |
| `abd_pain_worse_movement` | rare (ước lượng) | occasional (STONE: 18%) | **occasional** | Có số liệu | STONE |
| `fever` | occasional (3931: "có thể sốt, rét run nếu có nhiễm trùng") | rare (cơn đau chưa biến chứng thường không sốt) | **occasional** | Lệch một mức, nguồn ngang nhau (cùng 3931). Theo bảng đổi lời của kb-guide mục 2.1, "có thể" là occasional; STONE loại người sốt nên không có số. Sốt kèm cơn đau quặn hông lưng đã có quy tắc `rf_fever_obstructing_stone` (mức 2) | 3931, NHS |
| `chills_rigors` | frequent (trong số người có sốt) | — | Giữ | Sốt ở người có sỏi thường do nhiễm khuẩn, khi đó hay rét run | 3931, NHS |
| `abdomen_hard_swollen` | rare | — | **rare + `above_leak_ok`** | 3931 nêu chướng bụng do liệt ruột là triệu chứng kèm theo; tỷ lệ nền 1% nên rare cao hơn nền là có chủ ý | 3931 |
| `abd_pain_meal_relation` | {0,03; 0,07; 0,90} | — | Giữ | Cơn đau do tắc niệu quản, không liên quan bữa ăn | 3931 |
| `abd_pain_location` | | | Trung bình | TVD 0,06 | 3931 |
| `warning_signs` | 5 dấu hiệu | cùng 5 dấu hiệu | Giữ, **bỏ** `abd_pain_severe` | Đau dữ dội là biểu hiện thường của bệnh này (86% ở cấp cứu), không phải biến chứng; NHS xếp đau dữ dội vào nhóm khám khẩn trong ngày, không phải 999. Dấu hiệu này đã có trong danh sách an toàn chung của triệu chứng đau bụng; nếu giữ, bộ suy luận mới sẽ đưa cơn đau quặn thận lên đầu danh sách "bác sĩ cần loại trừ" ở mọi người đau bụng dữ dội | NHS |
| `proposed_findings` | `kidney_stones_known` | — | Bỏ khỏi tệp | Dấu hiệu đã có trong danh mục | — |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | Giảm nước uống khi đang đau (3931); uống đủ nước sau khi đã được khám để phòng tái phát | 3931, NHS |

Giống nhau ở hai lượt: `urgency` 3, `cant_miss` false, prior P3 ở người lớn, `flank_pain` very_frequent, `abd_pain_radiates_groin` frequent, `hematuria`, `dysuria`, `urinary_frequency` occasional, `nausea` very_frequent, `vomiting` frequent, `diarrhea` rare, `kidney_stones_known` frequent.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P3, hệ số giới tính (tỷ số nam/nữ khoảng 2/1 cho cộng đồng).
- Phân bố vị trí đau (danh mục không có lựa chọn "hông lưng"), thời gian đau, liên quan bữa ăn.
- `fever` occasional, `chills_rigors` frequent, `urinary_frequency`, `abdomen_hard_swollen`.
- Mọi tỷ lệ của STONE do các lượt tự tính từ Bảng 2 (ở khoa cấp cứu Mỹ, đã loại người sốt).

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-renal-colic-1 (điển hình, từng bị sỏi) | Hạng 1 (99%), mức 3/3 | Ca chọn "đau nhiều nhưng chịu được"; nếu trả lời "đau dữ dội", phiên dừng ở mức 2 sau nhóm dấu hiệu nguy hiểm |
| d-renal-colic-2 (nữ, đau vừa, tiểu nhiều lần, tiểu máu) | Hạng 3 (4%; viêm bàng quang 70%, viêm thận – bể thận 25%), mức 3/3 | Ca không điển hình: khởi phát từ từ, 2 ngày, không buồn nôn, không từng bị sỏi; suy luận nghiêng về nhiễm khuẩn tiết niệu là hợp lý |
| d-renal-colic-3 (đau hố chậu phải lan bẹn, dễ nhầm viêm ruột thừa) | Hạng 1 (97%), mức 3/3 | Bản nhiễu cho mức 2 (an toàn) |

## 4. Đề xuất cho người bảo trì

- Quy tắc `rf_fever_obstructing_stone` (mức 2) trích 3931/QĐ-BYT, nhưng bài Ứ nước – ứ mủ bể thận không dùng chữ "cấp cứu", và NHS Kidney stones xếp sỏi kèm sốt, rét run vào nhóm khám khẩn trong ngày. Cần thêm hướng dẫn tiết niệu chính thức nếu giữ mức 2.
