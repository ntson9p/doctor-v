# Biên bản đối chiếu: heat_stroke (Sốc nhiệt)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 2 phần b, 27/10/2026.
- Bản chính thức: `knowledge/conditions/heat_stroke.yaml`, trạng thái `source_checked`.
- Mức xử trí 1, không được bỏ sót: hai lượt thống nhất.

## Tên bệnh

- Tên chính thức "Sốc nhiệt" (hai lượt). Tên thường gọi "Say nắng, say nóng thể nặng" (theo lượt B, ghép lại): ICD-10 xếp "sunstroke" (say nắng) cùng mã T67.0. Bỏ "Đột quỵ do nóng" của lượt A vì dễ hiểu nhầm là đột quỵ não. Kiệt sức do nóng dùng "Say nắng, say nóng thể nhẹ".

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Ngất | P5; từ 75 tuổi P4 | P6; từ 65 tuổi P5 | Theo lượt B | Có số liệu theo tuổi (Mori 2026); với P4, riêng bệnh này gần 1% sau chuẩn hóa ở người từ 75 tuổi, vượt ngưỡng 0,5% của người cao tuổi trước khi hỏi câu nào | Mori 2026, MSD |
| Prior Sốt | P6; từ 75 tuổi P5 | P6; từ 65 tuổi P5 | Theo lượt B | Người từ 65 tuổi chiếm một nửa số ca chở cấp cứu | Mori 2026, MSD |
| Prior Chóng mặt | P6; từ 75 tuổi P5 | P6 | P6 | Không có số liệu ủng hộ; tránh làm câu phơi nắng bị hỏi ở mọi người cao tuổi chóng mặt | – |
| Hệ số mùa miền Bắc | không có | hè ×2, đông ×0,2 | Giữ | Như kiệt sức do nóng | Kuo 2025, Brindle 2023 |
| heat_exposure | very_frequent | almost_always | very_frequent | Giữ khả năng cho bệnh không được bỏ sót: thể cổ điển ở người cao tuổi trong nhà (Mori 2026: 39,9% ca do nóng xảy ra trong nhà), người nhà có thể trả lời "không" | MSD, Mori 2026 |
| cold_sweat | rare | không có | Giữ | Da nóng, khô hoặc còn mồ hôi nhưng nóng; "vã mồ hôi lạnh" hợp với kiệt sức do nóng | NHS, MSD, CDC NIOSH |
| dizziness | không có | frequent | Giữ | MSD: đi loạng choạng là dấu hiệu sớm | MSD |
| fever_max_temp, fever_duration, dizziness_pattern, syncope_trigger, syncope_warning | xem bản A | xem bản B | Trung bình | Ước lượng | MSD, CDC NIOSH |
| warning_signs | – | thêm mệt lả | Hợp | – | NHS |

Các liên kết trùng mức: confusion, drowsy_hard_to_wake, seizure_recent, fever, fainting_or_near_fainting, not_recovered_after_faint, breathing_difficulty, palpitations, severe_weakness.

## Giá trị dựa trên nhận định

- Mọi prior và hệ số mùa.
- Mọi tần suất (nguồn chỉ mô tả).

## Thứ tự câu hỏi (heat_exposure hỏi muộn)

- Câu phơi nắng chỉ nằm trong nhóm `fever_exposures` (hỏi khi có sốt). Với Đau đầu, Chóng mặt, Ngất không sốt, câu này chỉ được hỏi thích ứng; khi lú lẫn đã đưa mức lên 1, phiên dừng và câu này không được hỏi (lượt R đã ghi). Khi đó sốc nhiệt có thể không có trong danh sách cần loại trừ và lời dặn làm mát không hiện.
- Đề xuất cho người bảo trì (không sửa ở lượt C):
  1. Thêm heat_stroke vào `conditions` của rf_altered_consciousness và rf_heat_stroke_signs: khi lú lẫn, li bì đã thỏa, bệnh này được đưa vào danh sách cần loại trừ dù chưa hỏi phơi nắng (cách này rẻ nhất, không thêm câu hỏi).
  2. Trong pha `escalation` (đã dừng ở mức 1–2), cho hỏi thêm `heat_exposure` khi rf_heat_stroke_signs có thể thỏa, để lời dặn làm mát hiện ra; hoặc đưa `heat_exposure` lên `red_flags` của Ngất, Chóng mặt (thêm 1 câu mỗi phiên, như câu khí CO).
  3. Đưa `fever_exposures` vào `intake` của Chóng mặt, Ngất khi có sốt (lượt R đã đề xuất).

## Đề xuất dấu hiệu (không đưa vào danh mục ở lô này)

- `hot_dry_skin` ("Da nóng ran, không ra mồ hôi") và `not_better_after_cooling` ("Đã nghỉ mát, uống nước 30 phút mà chưa đỡ") của lượt B.

## Ca dev

- d-heat-stroke-1 (gắng sức), -2 (thể cổ điển, người cao tuổi), -3 (dễ nhầm với đột quỵ, viêm não).
