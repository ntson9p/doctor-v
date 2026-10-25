# Biên bản đối chiếu phần mở rộng: Bệnh đau nửa đầu (`migraine`), triệu chứng chính Chóng mặt

- Người đối chiếu: `agent:pass-c` (Giai đoạn 3, lô 1, phần a), ngày 2026-10-25.
- Bản nháp: `.../pass-a/extend/migraine.yaml`, `.../pass-b/extend/migraine.yaml`. Biên bản Giai đoạn 1: `knowledge/drafts/reconcile/migraine.md`.
- Bản chính thức: `knowledge/conditions/migraine.yaml`, giữ trạng thái `source_checked`; mọi giá trị cũ giữ nguyên. Với Chóng mặt, bệnh này đại diện cho đau nửa đầu tiền đình.
- Nguồn mới đã mở lại: Lempert 2022, Dieterich 2016 (Europe PMC); von Brevern 2007 (PMC); Bösner 2018; 3312/QĐ-BYT (2024). NHS Migraine dùng theo sổ nguồn.

## 1. Bảng bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior 5–12 tuổi | P2 | P3 | **P2** | Dieterich 2016: nguyên nhân chóng mặt hay gặp nhất ở trẻ em (39%); lượt B không có nguồn này | Dieterich 2016 |
| Prior 45–64 tuổi | P3 | P2 | **P3** | Ngang nguồn; mức thấp hơn cho bệnh lành tính như prior Đau đầu (bệnh giảm theo tuổi, nguyên nhân mạch máu, tai trong tăng) | Lempert 2022, von Brevern 2007 |
| Prior 65–74 tuổi | P4 | P3 | **P4** | Như trên | |
| `photophobia`, `phonophobia` khi Chóng mặt | nêu vấn đề với triệu chứng của cơn đau đầu | `freq_by_complaint: { dizziness: frequent }` | **frequent** | Ít nhất một nửa số đợt có một đặc điểm đau nửa đầu (Lempert 2022); dưới 50% có cả đau đầu và chóng mặt ở mọi cơn (Dieterich 2016) | Lempert, Dieterich |
| `nausea` khi Chóng mặt | nêu vấn đề (very_frequent) | giữ | Giữ, ghi chú cho bác sĩ | Lempert: chóng mặt khi cử động đầu kèm buồn nôn là một triệu chứng tiền đình; chưa có số liệu khác biệt rõ | Lempert 2022 |
| `dizziness_pattern` | 0,12/0,60/0,13/0,15 | 0,10/0,60/0,25/0,05 | **0,10/0,58/0,25/0,07** | TVD 0,12: đọc lại Lempert (30% vài phút, 30% vài giờ, 30% vài ngày, 10% vài giây; có người hồi phục tới 4 tuần) | Lempert 2022 |
| `cannot_walk_unaided` | rare | không liên kết | **Bỏ** | Nguồn không nói bệnh hiếm khi làm người bệnh không tự đi được (Lempert: mức nặng là không làm việc được) | |
| `headache`, `vertigo_spinning`, `dizziness_positional`, `similar_episodes_before`, `hearing_loss_tinnitus`, `transient_neuro_symptoms` | frequent, frequent, occasional, very_frequent, occasional, rare (above_leak_ok) | giống | Giữ | Hai lượt giống nhau | Lempert, Dieterich, NHS |

Hai lượt cùng chọn P2 ở 13–44 tuổi và P4 từ 75 tuổi.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior Chóng mặt (không có số liệu đau nửa đầu tiền đình ở tuyến ban đầu).
- `headache`, `vertigo_spinning` (frequent); `hearing_loss_tinnitus`, `dizziness_positional` (occasional); `transient_neuro_symptoms` (rare, above_leak_ok); phân bố `dizziness_pattern`.
- Hệ số giới sẵn có (1,2/0,85) thấp hơn tỷ lệ nữ của đau nửa đầu tiền đình (65–85%).

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-migraine-dizziness-1 (28 tuổi, nhiều đợt quay cuồng 2–3 giờ kèm đau đầu, sợ ánh sáng) | Hạng 1 (93%), **mức 5/4** | Mức của bệnh (5) đặt cho cơn đau đầu quen thuộc; NHS Vertigo khuyên khám bác sĩ khi chóng mặt hay tái lại (mức 4). Không đổi mức của bệnh (ảnh hưởng Đau đầu); xem đề xuất 1 |

## 4. Ảnh hưởng tới các triệu chứng chính đã phát hành (cả 4 phần mở rộng)

- Trước lô 1 (số liệu của người điều phối): sạch top1 75,2%, top3 94,5%, 0 ca cấp cứu bị bỏ sót; nhiễu 5/235.
- Hiện tại (đủ phần a và các tệp phần b đang có), chỉ tính Sốt, Đau bụng, Đau đầu (113 ca cũ): sạch top1 76,1%, top3 94,5%, 0 bỏ sót; nhiễu 5/235.
- Cùng dữ liệu phần b nhưng bỏ toàn bộ phần mở rộng của phần a (bản sao tạm): sạch top1 76,1%, top3 94,5%, 0 bỏ sót; nhiễu 5/235. Như vậy phần mở rộng của phần a không đổi chỉ số nào; thay đổi so với trước lô (top1 tăng 0,9 điểm) đến từ phần b.
- Ở mức từng ca: không ca sạch nào đổi mức xử trí; một ca sạch tăng hạng (d-preeclampsia-3: hạng 3 lên 2). Một số biến thể nhiễu đổi thứ tự câu hỏi vì có thêm câu được hỏi (chóng mặt, choáng khi đứng dậy, ngất hoặc choáng), mức xử trí đổi theo cả hai chiều, không thêm ca cấp cứu bị bỏ sót.

## 5. Đề xuất cho người bảo trì (chung cho Chóng mặt)

1. Thêm quy tắc mức 4 cho Chóng mặt: `similar_episodes_before` có (chóng mặt hay tái lại) thì khám bác sĩ, theo NHS Vertigo ("See a GP if you have vertigo that will not go away or keeps coming back"), tương tự rf_frequent_headache của Đau đầu.
2. Thêm `migraine` vào `conditions` của `rf_transient_neuro` để danh sách cần loại trừ không bỏ sót chẩn đoán phân biệt hay gặp (tiền triệu).
