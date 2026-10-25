# Biên bản đối chiếu: Viêm dây thần kinh tiền đình, viêm mê nhĩ (`vestibular_neuritis`)

- Người đối chiếu: `agent:pass-c` (Giai đoạn 3, lô 1, phần a), ngày 2026-10-25.
- Bản nháp: `.../pass-a/vestibular_neuritis.yaml`, `.../pass-b/vestibular_neuritis.yaml`.
- Bản chính thức: `knowledge/conditions/vestibular_neuritis.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 14, lượt B 16, chung 12; bản chính thức 17 liên kết.
- Nguồn đã mở lại: Strupp 2022, Bae 2022, Tarnutzer 2011, Bösner 2018, Newman-Toker 2007, 2008, Kerber 2006 (PMC, Europe PMC); MSD Vestibular neuronitis, NHS Labyrinthitis, NHS Vertigo (curl); 5643/QĐ-BYT bài Chóng mặt; 3312/QĐ-BYT (2024) trên luatvietnam.vn.

## 1. Gộp viêm mê nhĩ (labyrinthitis)

Danh mục không có bệnh riêng cho viêm mê nhĩ. Lượt C gộp vào bệnh này vì nguồn ủng hộ:
- NHS dùng một trang cho cả hai bệnh: cùng do vi rút, cùng triệu chứng, cùng cách tự chăm sóc và cùng mức khám; khác duy nhất là viêm mê nhĩ có nghe kém, ù tai.
- Tarnutzer 2011 gộp viêm dây thần kinh tiền đình và viêm mê nhĩ thành nguyên nhân ngoại biên của hội chứng tiền đình cấp vì hai tên gọi dùng lẫn cho nhau; Newman-Toker 2008 cũng gộp (5,6% lượt chóng mặt ở cấp cứu).
- MSD: tên viêm dây thần kinh tiền đình đôi khi dùng đồng nghĩa với viêm mê nhĩ do vi rút.
- 3312/QĐ-BYT (2024): viêm mê đạo có thể nhầm với đột quỵ tiểu não.

Thay đổi theo việc gộp: tên tiếng Anh, tên thường gọi "Viêm mê nhĩ (viêm tai trong)", câu mô tả thứ 2, `hearing_loss_tinnitus` (rare thành occasional), thêm `hearing_loss_sudden` (frequent), lời khuyên đi cấp cứu khi đột ngột nghe kém. Mã ICD giữ H81.2 (viêm mê nhĩ là H83.0).

## 2. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi_common` | Viêm thần kinh tiền đình, Viêm tiền đình | Viêm thần kinh tiền đình | Viêm thần kinh tiền đình; Viêm mê nhĩ (viêm tai trong) | Bỏ "Viêm tiền đình" vì dễ lẫn với cách gọi chung "rối loạn tiền đình"; thêm viêm mê nhĩ (mục 1) | NHS Labyrinthitis |
| `names.en` | Vestibular neuritis | Vestibular neuritis (acute unilateral vestibulopathy) | Vestibular neuritis and labyrinthitis | Mục 1 | |
| `codes.icd10_verified` | true | false | **false** | Lượt C không đối chiếu được với ICD của Bộ Y tế | |
| `summary_vi` | | | Gộp, thêm viêm mê nhĩ | | NHS, Strupp |
| Prior từ 75 tuổi | P3 | P4 | **P3** | Bae 2022: bệnh gặp nhiều cả ở người trên 70 tuổi (lượt B dựa vào tuổi khởi phát 30–60 của Strupp); gộp viêm mê nhĩ làm tăng nhẹ tỷ lệ | Bae 2022 |
| `dizziness_pattern` | 0,04/0,08/0,78/0,10 | 0,03/0,09/0,80/0,08 | 0,035/0,085/0,79/0,09 | Trung bình (TVD 0,02) | Strupp 2022, NHS |
| `dizziness_positional` | frequent | occasional | **occasional** | Tarnutzer 2011: yếu tố cử động đầu không phân biệt được ngoại biên với đột quỵ; để bằng mức của đột quỵ, không để bệnh lành tính được lợi hơn | Tarnutzer 2011, Strupp 2022 |
| `sudden_loss_of_balance` | very_frequent | frequent | **frequent** | Lệch một mức; mất thăng bằng là dấu hiệu gợi ý đột quỵ (Kerber: OR 3,71), nên không để bệnh lành tính mạnh hơn đột quỵ (frequent) | Strupp 2022, Kerber 2006 |
| `similar_episodes_before` | rare | occasional | **occasional** | 1/4 người bệnh có một cơn báo trước trong 48 giờ dù nguyên nhân nào (Tarnutzer 2011); tái phát 1,9–10,7% (Strupp) | Tarnutzer 2011, Strupp 2022 |
| `hearing_loss_tinnitus` | rare | rare | **occasional** | Gộp viêm mê nhĩ (mục 1); nguyên nhân ngoại biên gộp: nghe kém 33% ở một nghiên cứu, ù tai hoặc đầy tai 31% ở một nghiên cứu cũ (Tarnutzer 2011) | Tarnutzer 2011, NHS |
| `hearing_loss_sudden` | không liên kết | không liên kết | **frequent** (thêm) | Viêm mê nhĩ: nghe kém xuất hiện đột ngột cùng chóng mặt (NHS); quy tắc rf_vertigo_sudden_hearing_loss vẫn xếp mức 2 | NHS Labyrinthitis, NHS Vertigo |
| `persistent_vomiting` | occasional | không liên kết | **Giữ** | MSD: truyền dịch khi nôn kéo dài | MSD, NHS |
| `headache` | không liên kết | occasional | **Giữ** (trung tính) | Ghi nhận 12% ở nguyên nhân ngoại biên | Tarnutzer 2011 |
| `fever` | không liên kết | rare | **Giữ** | NHS Vertigo: sốt gợi ý nguyên nhân khác | NHS Vertigo |
| `cannot_walk_unaided`: bậc | B verbal | A numeric | B numeric | Số 0% của Tarnutzer đo ở cấp cứu, bệnh viện (không phải bối cảnh tương đương) | Tarnutzer 2011, Bae 2022 |
| `warning_signs` | có es_stroke_signs, persistent_vomiting | có hearing_loss_sudden, headache_thunderclap | Hợp hai bản | | |
| `self_care_vi`, `see_doctor_vi` | | | Gộp theo NHS Labyrinthitis; tách câu "không lái xe, không uống rượu" thành hai câu | | NHS |

Giống nhau ở hai lượt: tên chính thức, mã H81.2, `urgency` 3, `cant_miss` false, chuyên khoa, prior P3 (5–12 tuổi P4), các liên kết còn lại cùng mức.

## 3. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P3, gồm cả viêm mê nhĩ.
- `cannot_walk_unaided` occasional (giữa "vẫn đi được" của MSD và "phần lớn phải có người đỡ" của Bae).
- `hearing_loss_tinnitus` occasional, `hearing_loss_sudden` frequent (số liệu nghe kém ở nhóm ngoại biên gộp ít tin cậy).
- `dizziness_positional`, `persistent_vomiting`, `headache` (occasional); `fainting_or_near_fainting`, `fever` (rare); phân bố `dizziness_pattern`.

## 4. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-vestibular-neuritis-1 (điển hình, 42 tuổi) | Hạng 1 (77%), mức 3/3 | |
| d-vestibular-neuritis-2 (70 tuổi, tăng huyết áp, mới 6 giờ) | Mức 2/2 (rf_acute_vertigo_vascular_risk); hạng 1 với bệnh chấp nhận được là đột quỵ | Ban đầu hạng trống: phiên dừng cấp cứu chỉ hiện bệnh mức 1–2, nên bệnh mức 3 này không bao giờ có mặt. Lượt C thêm `acceptable: [stroke]` vì tại nhà ca này thật sự không phân biệt được với đột quỵ (GRACE-3, Tarnutzer); không sửa tham số |
| d-vestibular-neuritis-3 (viêm mê nhĩ, nghe kém đột ngột) | Hạng 1 (83%), mức 2/2 (rf_vertigo_sudden_hearing_loss) | Biến thể nhiễu hạt 3 và 5: mức 3/2, vì câu nghe kém đột ngột bị đổi thành "Không rõ" (quy tắc ở trạng thái không rõ cho mức 3 ở người không thuộc nhóm nguy cơ cao). Đây là cách bộ suy luận xử lý câu không rõ, không phải lỗi của tần suất |

## 5. Đề xuất cho người bảo trì

- Thêm `vestibular_neuritis` vào `conditions` của `rf_vertigo_sudden_hearing_loss` (hiện chỉ có `stroke`), vì viêm mê nhĩ là nguyên nhân hay gặp hơn của chóng mặt kèm nghe kém đột ngột.
