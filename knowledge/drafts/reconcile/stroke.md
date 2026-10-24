# Biên bản đối chiếu: Đột quỵ não (`stroke`)

- Người đối chiếu: `agent:pass-c` (lô 4), ngày 2026-10-24.
- Bản nháp: `knowledge/drafts/pass-a/stroke.yaml`, `knowledge/drafts/pass-b/stroke.yaml`.
- Bản chính thức: `knowledge/conditions/stroke.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 15, lượt B 20, chung 14; bản chính thức 21 liên kết.
- Nguồn đã mở lại: 3312/QĐ-BYT (2024) trên luatvietnam.vn, ICHD-3 (PDF), MSD, NHS; Aroor 2017, Kumral 1995, Melo 1996, Jørgensen 1994, Vestergaard 1993, Runchey 2010, Zhelev 2019, Harriott 2020, Goldstein 2006 (tóm tắt qua API Europe PMC).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi_common` | Đột quỵ, Tai biến mạch máu não | thêm Xuất huyết não, Nhồi máu não (đứng sau "Tai biến mạch máu não") | Hợp; tên hiển thị "Đột quỵ" | | |
| `summary_vi` | | | Gộp, thêm "chóng mặt, mất thăng bằng" | 3312: chóng mặt, thất điều | 3312 |
| Prior từ 75 tuổi | P4 | P3 | **P3** | Lệch một mức, cả hai là ước lượng → mức thận trọng cho bệnh nguy hiểm; đột quỵ tăng nhanh theo tuổi trong khi đau đầu lành tính giảm | 3312, Goldstein 2006, Jørgensen 1994 |
| Prior: cách khai báo | default P6, by_age 45–64 P5, 65–74 P4 | default P5, by_age dưới 45 tuổi P6 | default P6, by_age 45–64 P5, 65–74 P4, 75+ P3 | Cùng mức ở dưới 75 tuổi | |
| `es_stroke_signs`: bậc | B (Aroor) | A (Zhelev, Cochrane) | A/numeric, very_frequent | Cùng mức | Zhelev 2019, Aroor 2017 |
| `headache_course` | 0,85/0,05/0,10 | 0,85/0,10/0,05 | 0,85/0,08/0,07 | Trung bình | ICHD-3, 3312 |
| `headache_severity` | 0,15/0,40/0,45 | 0,15/0,35/0,50 | 0,15/0,38/0,47 | Trung bình | Harriott 2020, ICHD-3, 3312 |
| `headache_location` | 0,30/0,10/0,10/0,25/0,25 | 0,35/0,12/0,10/0,23/0,20 | **0,30/0,10/0,17/0,20/0,23** | TVD 0,07. Đọc lại Kumral 1995: vùng trán là vị trí hay gặp nhất (41%), rồi lan tỏa (27%), nên tăng lựa chọn "trán" so với cả hai lượt | Kumral 1995, Jørgensen 1994, 3312 |
| `seizure_recent` | rare (B/verbal) | occasional (A/judgment) | **occasional** | Lệch một mức. Mức rare cao hơn tỷ lệ nền 1% (bộ kiểm tra cảnh báo); occasional có căn cứ: co giật kèm thiếu hụt thần kinh LR 4,7 cho xuất huyết (Runchey), nhóm biểu hiện bằng đau đầu có nhiều xuất huyết não | Runchey 2010, 3312 |
| `neck_stiffness`, `vomiting`, `confusion`, `vision_loss_or_double`, `hypertension_known`, `diabetes`, `known_heart_disease`: bậc | B hoặc C | A hoặc B | Cùng mức; bậc theo nguồn đã xác minh | | Runchey, 3312, MSD |
| `bp_measured` | 0,20/0,30/0,25/0,25 | 0,20/0,30/0,28/0,22 | 0,20/0,30/0,26/0,24 | Trung bình | 3312, Runchey |
| `sudden_loss_of_balance` | frequent (dấu hiệu đề xuất) | không liên kết (dấu hiệu chưa có trong danh mục) | **Giữ frequent** | Dấu hiệu nay đã có (chữ B của BE-FAST); Aroor 2017: 42% người không có dấu hiệu FAST bị mất thăng bằng hoặc yếu chân; 3312: thất điều, chảy máu tiểu não | Aroor 2017, 3312, MSD, NHS |
| `nausea` | không liên kết | frequent | **Giữ** | 3312: buồn nôn hay gặp trong chảy máu não; NHS | 3312, NHS |
| `drowsy_hard_to_wake` | không liên kết | occasional | **Giữ** | Hôn mê LR 6,2 cho xuất huyết (Runchey) | Runchey, 3312 |
| `blurred_vision` | không liên kết | occasional | **Giữ** | NHS: nhìn mờ | NHS |
| `fainting_or_near_fainting` | không liên kết | occasional | **Giữ** | NHS: chóng mặt hoặc ngã; 3312: chóng mặt | NHS, 3312 |
| `headache_duration` | không liên kết | phân bố | **Giữ** | 3312: tối đa sau 30 phút đến vài giờ | 3312 |
| `fever` | không liên kết | rare | **Giữ** | Không có trong triệu chứng khởi phát | 3312, NHS |
| `warning_signs` | có `persistent_vomiting`, `sudden_loss_of_balance` | không có | Hợp hai bản | | |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | | NHS, 3312 |

Giống nhau ở hai lượt: tên chính thức, mã I64, `urgency` 1, `cant_miss` true, chuyên khoa, prior dưới 75 tuổi, `headache_thunderclap` occasional, `es_stroke_signs` very_frequent.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P6/P5/P4/P3 cho "đột quỵ có đau đầu là triệu chứng chính". Ước tính thô của lượt C (tỷ suất đột quỵ, tỷ lệ đau đầu lúc khởi phát 18–28%, tỷ lệ chọn "đau đầu") cho rằng ở 45–64 tuổi có thể ngang hoặc cao hơn xuất huyết dưới nhện (P4); hai lượt cùng chọn P5 nên giữ, nhưng cần xem khi gộp prior các lô.
- `es_stroke_signs` very_frequent và `sudden_loss_of_balance` frequent ở nhóm biểu hiện bằng đau đầu (dùng số của nhồi máu não chung).
- `headache_thunderclap`, `confusion`, `drowsy_hard_to_wake`, `seizure_recent`, `neck_stiffness`, `vision_loss_or_double`, `blurred_vision`, `fainting_or_near_fainting` (occasional); `vomiting`, `nausea`, `hypertension_known` (frequent).

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-stroke-1 (FAST dương tính) | Hạng 1 (39%), mức 1/1 | Dừng ở màn sàng lọc cấp cứu |
| d-stroke-2 (66 tuổi, đau gáy, mất thăng bằng, nôn, không FAST) | Hạng 6 (3,9%), **mức 2/1** | Dừng cấp cứu theo rf_sudden_balance_loss (mức 2) ngay sau nhóm dấu hiệu nguy hiểm. Xác suất đột quỵ + xuất huyết dưới nhện chưa tới ngưỡng mức 1 (10%) |
| d-stroke-3 (72 tuổi, rung nhĩ, mất nửa thị trường) | Hạng 7 (1,1%), **mức 2/1** | Dừng theo rf_vision_loss (mức 2) |

Hai ca thiếu mức (mức 2 thay vì mức 1). Ca đúng về lâm sàng (3312/QĐ-BYT, NHS Stroke: nghi đột quỵ thì gọi cấp cứu ngay), nên giữ nguyên. Lượt C đã thêm hai liên kết very_rare cho đau đầu căng thẳng (mất thị lực, mất thăng bằng; có căn cứ ICHD-3 và NHS), xác suất đột quỵ tăng nhẹ (2,9% lên 3,9%; 0,8% lên 1,1%) nhưng không đổi mức. Không nâng prior đột quỵ (hai lượt thống nhất P4 ở 65–74 tuổi) chỉ để ca đạt.

## 4. Đề xuất cho người bảo trì

1. Nâng `rf_sudden_balance_loss` và `rf_vision_loss` lên **mức 1** khi kèm đau đầu ở người từ 60 tuổi hoặc có tăng huyết áp, hoặc thêm chữ B (thăng bằng) và E (mắt) vào mục `es_stroke_signs` của màn sàng lọc (BE-FAST, Aroor 2017: giảm tỷ lệ bỏ sót từ 14,1% xuống 4,4%). NHS Stroke khuyên gọi cấp cứu khi có các triệu chứng này.
2. Xem lại tỷ lệ nền 1% của `vision_loss_or_double` và `sudden_loss_of_balance` khi triệu chứng chính là đau đầu: các bệnh lành tính không liên kết (cảm lạnh, cúm, viêm xoang, đau nửa đầu) đang được tính 1%, làm loãng khả năng đột quỵ.
