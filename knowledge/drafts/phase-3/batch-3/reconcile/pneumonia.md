# Biên bản đối chiếu bản mở rộng: pneumonia (Viêm phổi mắc phải ở cộng đồng)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần a, 31/10/2026.
- Bản chính thức: `knowledge/conditions/pneumonia.yaml`, giữ trạng thái `source_checked` (mọi nguồn thêm vào đều đã mở: frese-jcmr-2011, verdon-smw-2008, kinkade-afp-2016).
- Không sửa giá trị đã đối chiếu trước đây, trừ việc thêm `freq_by_complaint` cho pleuritic_chest_pain (mục dưới).
- Không liên kết dấu hiệu chung `chest_pain` (quyết định của người bảo trì; lượt A đã bỏ ở vòng 2).

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Ho, 45–64 tuổi | P3 (mặc định) | P2 | P3 | GRACE: 5% người lớn ho cấp đã đi khám (tuổi trung bình 50) có viêm phổi trên phim, ở ranh giới P3/P2; người chọn Ho gồm cả cảm lạnh nhẹ không đi khám, nên thấp hơn. P2 còn đẩy viêm phổi lên gần ngưỡng mức 3 (10%) ở mọi ca cảm lạnh, viêm phế quản tuổi này | GRACE |
| Prior Ho, dưới 2 tháng | P3 (mặc định) | P2 (mặc định) | P2 | Trẻ nhỏ ho cần nghĩ nhiều tới viêm phổi (3312); chọn mức thận trọng hơn | 3312 |
| Prior Ho, các tuổi khác | P3; dưới 5 tuổi, từ 65 tuổi P2 | như lượt A (18–44 tuổi, 5–17 tuổi P3) | Giữ | Trùng | GRACE, Takahashi |
| Prior Khó thở | P2 mọi tuổi | P3; dưới 5 tuổi, từ 65 tuổi P2 | Theo lượt B | Frese 2011 (đã mở lại): viêm phổi 2,6% (Hà Lan), 3,2% (Đức) người khám vì khó thở mới, tức P3 ở người lớn | Frese 2011, 3312, Takahashi |
| Prior Đau ngực | P3 | P3 | Giữ | Trùng; thêm Verdon 2008 (hô hấp 10% đau ngực) | Verdon 2008 |
| cough_duration | {.5, .32, .16, .02} | {.55, .30, .13, .02} | Trung bình | | GRACE, Takahashi, 4235 |
| dyspnea_onset | {.08, .77, .15} | {.08, .82, .10} | Trung bình | | 4235 |
| dyspnea_severity | {.5, .42, .08} | {.55, .37, .08} | Trung bình | | GRACE (khó thở nặng 12% người viêm phổi) |
| chest_pain_duration | {.2, .15, .15, .5} | {.15, .15, .30, .40} | Trung bình | | 4235, GRACE |
| chest_pain_sudden_severe | rare | occasional | rare | Lệch một mức, cùng nhận định trên 4235; viêm phổi không thuộc nhóm không được bỏ sót, nên chọn mức để câu "đau đột ngột dữ dội" nghiêng sang tràn khí màng phổi, thuyên tắc phổi, bóc tách động mạch chủ | 4235 |
| spo2_measured | không có | {.20, .13, .07, .6} | Giữ | Giảm ô xy máu gợi ý viêm phổi hơn viêm phế quản | 4235, Kinkade |
| chest_wall_tenderness | không có | rare | Giữ | Câu "có" nghiêng sang đau thành ngực | 4235 |
| leg_swelling_both | không có | rare | Giữ | Phù gợi ý suy tim | 4235 |
| weight_loss_unintended | không có | rare | Giữ | Sụt cân nhiều tháng gợi ý lao, ung thư (4235) | 4235 |
| wheeze, chest_pain_exertional | occasional, rare | occasional, rare | Giữ | Trùng | 4235, 3312 |
| pleuritic_chest_pain (liên kết cũ, frequent) | không sửa | nêu cần tách theo triệu chứng chính | Thêm `freq_by_complaint: { chest_pain: very_frequent }` | Người viêm phổi chọn Đau ngực là nhóm đã có đau ngực, và đau của viêm phổi là đau bên tổn thương, tăng khi hít sâu, khi ho (4235). Giá trị theo triệu chứng chính được ưu tiên hơn mức theo tuổi (trẻ 5–12 tuổi chọn Đau ngực cũng dùng very_frequent) | 4235, GRACE |

## Giá trị dựa trên nhận định

- Prior Ho (GRACE châu Âu, người đã đi khám), prior Đau ngực.
- Mọi phân bố mới; wheeze occasional, chest_wall_tenderness rare, pleuritic_chest_pain very_frequent cho Đau ngực.

## Ca dev cũ của bệnh này (thêm câu trả lời lô 3 mà lời kể nói rõ)

- d-pneumonia-1: cough_duration lt_1w ("ba ngày nay"), dyspnea_onset hours_days, dyspnea_severity exertion ("thở mệt khi đi lại"), chest_pain present và chest_pain_duration days (đau ngực khi hít sâu ba ngày nay).
- d-pneumonia-2: cough_duration lt_1w, chest_pain absent ("không đau ngực").
- d-pneumonia-3: cough_duration lt_1w ("ho 2 ngày").

Kết quả: d-pneumonia-1 và -3 không đổi. **d-pneumonia-2 (78 tuổi, sốt nhẹ, ho đờm, không khó thở) tụt từ hạng 1 xuống hạng 3** (COVID-19 18%, cảm lạnh 13%, viêm phổi 11%); mức xử trí vẫn 2 như trước. Nguyên nhân: bộ suy luận hỏi thêm khò khè, thời gian ho, đau cơ, xét nghiệm COVID-19. Ba câu "không" (khò khè: viêm phổi occasional; ho dưới 1 tuần: viêm phổi 0,525 so với 0,6; đau cơ: COVID-19 occasional, viêm phổi không liên kết) cùng làm viêm phổi giảm so với COVID-19. Đây là ca viêm phổi không điển hình ở người rất già; không sửa ca vì lời kể đúng về y khoa. Không sửa dữ liệu vì mỗi liên kết đều có lý do (hai lượt cùng mức).

## Ca dev mới

- d-pneumonia-cough-1 (Ho, 40 tuổi, sốt cao, đau ngực kiểu màng phổi): mức 3, hạng 1 (77%; viêm phế quản 22%).
- d-pneumonia-shortness-of-breath-1 (Khó thở, 76 tuổi, khó thở lúc nghỉ): mức 2, hạng 1 (57%).
