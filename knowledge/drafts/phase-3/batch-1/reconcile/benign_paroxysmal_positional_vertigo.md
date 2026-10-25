# Biên bản đối chiếu: Chóng mặt tư thế kịch phát lành tính (`benign_paroxysmal_positional_vertigo`)

- Người đối chiếu: `agent:pass-c` (Giai đoạn 3, lô 1, phần a), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/phase-3/batch-1/pass-a/benign_paroxysmal_positional_vertigo.yaml`, `.../pass-b/benign_paroxysmal_positional_vertigo.yaml`.
- Bản chính thức: `knowledge/conditions/benign_paroxysmal_positional_vertigo.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 13, lượt B 15, chung 13; bản chính thức 16 liên kết. 12/12 liên kết chung trùng mức (agreement.md).
- Nguồn đã mở lại: Bösner 2018, von Brevern 2007, Maarsingh 2010, Dieterich 2016, Strupp 2022, Lempert 2022, Newman-Toker 2007 (Europe PMC, PMC); MSD BPPV, NHS Vertigo (curl); 5643/QĐ-BYT bài Chóng mặt tr. 72–78 (PDF trên vnras.com; đã ghi thêm vào sổ nguồn); 3312/QĐ-BYT (2024) và GRACE-3 dùng theo sổ nguồn (lượt R đã mở cùng ngày; 3312 được mở lại).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi_common` | thêm "Chóng mặt do sỏi tai" | thêm "Chóng mặt do thay đổi tư thế đầu" | Gộp cả hai | Hai cách gọi dân gian đều dễ hiểu | |
| `codes.icd10_verified` | true (ghi đã tra icd.kcb.vn) | false | **false** | Lượt C không mở được dữ liệu ICD của Bộ Y tế (ứng dụng web; API nội bộ không trả mã H81.1); không đánh dấu khi chưa tự đối chiếu | |
| `summary_vi` câu 3 | chữa bằng động tác xoay đầu | tự hết sau vài tuần, đỡ nhanh nhờ động tác xoay đầu | Gộp: tự hết sau vài tuần đến vài tháng, đỡ nhanh nhờ động tác xoay đầu | MSD: tự hết sau vài tuần đến vài tháng | MSD |
| `specialties` | ent, neurology, general_medicine | ent, neurology | Giữ của lượt A | Tuyến ban đầu làm được nghiệm pháp, MSD: người bệnh tự làm được | MSD |
| Prior: bậc | B | A | **B** | Cơ sở là ước lượng từ số liệu không gộp được, bối cảnh châu Âu, Mỹ (không phải bối cảnh tương đương) | Bösner 2018 |
| `prior_modifiers` theo giới | nữ 1,2, nam 0,85 | không có | **Không dùng** | Nữ chiếm 70% số ca (von Brevern), nhưng người khám vì chóng mặt đã 58–80% là nữ (Bösner); hệ số tính ra chỉ khoảng 1,1 và 0,85, không phải khác biệt rõ (kb-guide 2.4) | von Brevern 2007, Bösner 2018 |
| `dizziness_pattern` | 0,60/0,18/0,07/0,15 | 0,72/0,16/0,04/0,08 | **0,66/0,17/0,05/0,12** | TVD 0,12: đọc lại nguồn; cơn dưới 1 phút theo định nghĩa, nhưng đợt bệnh 4–12 tuần ở 18,8%, trên 12 tuần ở 12,5%, mất thăng bằng giữa các cơn 49% (von Brevern), NHS ghi cơn có thể vài giờ | von Brevern 2007, NHS Vertigo |
| `transient_neuro_symptoms`: nguồn, bậc | MSD, NHS (C) | von Brevern, 3312 (B) | B, gộp nguồn | Cùng mức very_rare | von Brevern 2007, 3312/QĐ-BYT |
| `dizziness_on_standing` | không liên kết | occasional | **Giữ** | von Brevern: 58% cơn xuất hiện khi ngồi dậy; mức gần trung tính (0,2 so với nền 0,15) | von Brevern 2007 |
| `syncope_trigger` | không liên kết | phân bố | **Giữ** | Theo yếu tố khởi phát của cơn (khi nằm, khi ngồi dậy) | von Brevern 2007 |
| `warning_signs` | có es_stroke_signs | có hearing_loss_sudden, headache_thunderclap | Hợp hai bản | | NHS Vertigo |
| `self_care_vi` | 6 câu theo NHS | 5 câu | Gộp 8 câu, đều có trong NHS Vertigo hoặc MSD | | NHS Vertigo, MSD |
| `see_doctor_vi` | gọi 115 khi có dấu hiệu thần kinh | khám lại sau 1 tháng (AAO-HNS 2017); cấp cứu khi có dấu hiệu thần kinh | Bỏ mốc 1 tháng (nguồn AAO-HNS không có trong sổ, lượt B chỉ đọc tóm tắt), thay bằng "không hết hoặc hay tái lại" (NHS); dấu hiệu thần kinh: "đến cơ sở cấp cứu ngay" (NHS: 999 hoặc cấp cứu, mức 2; quy tắc nâng lên mức 1 khi có nguy cơ) | NHS Vertigo |

Giống nhau ở hai lượt: tên chính thức, mã H81.1, MONDO, `urgency` 4, `cant_miss` false, prior (P2; 13–17 tuổi P3; 5–12 tuổi P4), và 12 liên kết chung cùng mức.

**Ảnh hưởng của tỷ lệ nền mới.** `fainting_or_near_fainting` để rare ở cả hai lượt khi tỷ lệ nền còn là 5%. Nay tỷ lệ nền khi chóng mặt là 0,25, nên trả lời "Có" làm khả năng bệnh giảm khoảng 10 lần thay vì 2 lần. Lượt C giữ mức rare vì hướng giảm là an toàn (nghiêng về nguyên nhân tim mạch, huyết áp) và lượt B đã cân nhắc tỷ lệ nền cao hơn khi chọn mức này. `vertigo_spinning` (very_frequent so với nền 0,4) và `sudden_loss_of_balance` (frequent so với nền 0,4) vẫn đúng hướng.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P2 ở người lớn, P3 ở 13–17 tuổi, P4 ở 5–12 tuổi; không có số liệu Việt Nam.
- Phân bố `dizziness_pattern` và `syncope_trigger`.
- `fainting_or_near_fainting`, `fever`, `hearing_loss_tinnitus`, `cannot_walk_unaided` (rare); `dizziness_on_standing` (occasional).
- `dizziness_positional` almost_always: người hiểu sai câu hỏi bị giảm khả năng bệnh rất mạnh.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-benign-paroxysmal-positional-vertigo-1 (điển hình, 57 tuổi) | Hạng 1 (98%), mức 4/4 | |
| d-benign-paroxysmal-positional-vertigo-2 (79 tuổi, tăng huyết áp, không thấy quay) | Hạng 1 (95%), mức 4/4 | Ngưỡng của người từ 75 tuổi không đẩy lên mức 2 |
| d-benign-paroxysmal-positional-vertigo-3 (dễ nhầm hạ huyết áp tư thế do thuốc) | Hạng 1 (98%), mức 4/4 | Đối thủ là reflex_orthostatic_syncope (phần b), xếp thứ 2 |

Biến thể nhiễu: không có ca nào thiếu mức.

## 4. Đề xuất cho người bảo trì

- Không có đề xuất riêng cho bệnh này (xem đề xuất chung ở biên bản `migraine.md`: quy tắc mức 4 cho chóng mặt hay tái lại theo NHS Vertigo).
