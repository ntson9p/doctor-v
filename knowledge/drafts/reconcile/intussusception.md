# Biên bản đối chiếu: Lồng ruột (`intussusception`)

- Người đối chiếu: `agent:pass-c` (lô 3), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/intussusception.yaml`, `knowledge/drafts/pass-b/intussusception.yaml`.
- Bản chính thức: `knowledge/conditions/intussusception.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 13, lượt B 13, chung 12, hợp 14; bản chính thức 14 liên kết.
- Nguồn đã mở lại: Tran 2013, Jiang 2013, Park 2021, Burnett 2018 (toàn văn PMC), Van Trang 2014 (tóm tắt), Bines 2006 và WHO 2002 (bản văn bản qua API kho IRIS), Reust 2016.
- Sổ nguồn: hai lượt đặt hai ID cho Jiang 2013 và Park 2021; sổ nguồn dùng `jiang-plosone-2013`, `park-frontpediatr-2021`, `bines-bwho-2006`, `burnett-vaccine-2018`, `who-intussusception-2002`.
- Sửa câu chữ: lượt B ghi Bines 2006 là "đau bụng hoặc biểu hiện tương đương"; bảng gốc chỉ ghi "đau bụng" (tiêu chuẩn phụ). Lượt C sửa lại ở sổ nguồn và trong bệnh.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi_common` | Lồng ruột cấp, Lồng ruột ở trẻ nhỏ | không có | "Lồng ruột cấp" | "Lồng ruột ở trẻ nhỏ" là mô tả, không phải tên | — |
| `codes.icd10_verified` | false | true | true | Lượt B tra icd.kcb.vn; Van Trang 2014 cũng dùng K56.1 | Van Trang |
| `specialties` | nhi, ngoại, cấp cứu | nhi, ngoại | Nhi, ngoại | | — |
| `vomiting` | very_frequent | very_frequent, `freq_by_age` 5–12 tuổi: occasional | **Giữ `freq_by_age`** | Park: nôn 71,8% dưới 1 tuổi, 42,8% từ 1–2 tuổi, 24,0% từ 2 tuổi; khác biệt rõ | Park 2021 |
| `red_jelly_stool` | occasional | occasional, `freq_by_age` 5–12 tuổi: rare | **Giữ `freq_by_age`** | Park: phân máu 44,8% dưới 1 tuổi, 6,9% từ 2 tuổi. Mức rare vẫn cao hơn tỷ lệ nền 1% nên câu "Có" vẫn làm tăng khả năng bệnh | Park 2021 |
| `child_vomits_everything` | occasional | — | Giữ | Nôn rất hay gặp nhưng nôn tất cả ít hơn; liên kết làm tăng bệnh không được bỏ sót nên an toàn | Tran 2013 |
| `vomiting_bilious` | — (dấu hiệu chưa có) | occasional | Giữ | Bines: 30% trẻ lồng ruột ở Hà Nội nôn dịch mật (khoảng một phần ba số trẻ có nôn); hạ một mức cho người dùng đến sớm | Bines 2006 |
| `abd_pain_severe` | frequent | occasional | **occasional** | Lệch một mức. Phần lớn thông tin đã nằm trong câu "khóc thét từng cơn"; câu "Có" đã được quy tắc xếp mức 2, nên mức thấp hơn làm câu "Không" ít hạ bệnh không được bỏ sót | Park, Tran |
| `abd_pain_duration`, `abd_pain_onset`, `abd_pain_location` | | | Trung bình | Lệch nhỏ (TVD 0,05–0,10) | Tran, Park |
| `warning_signs` | 7 dấu hiệu | 6 dấu hiệu | Hợp hai bản (9 dấu hiệu) | | WHO 2002, Reust |
| `self_care_vi` | 2 câu | — | Giữ | | |
| `see_doctor_vi` | 2 câu | 2 câu | Gộp, thêm câu về phân máu, nôn dịch xanh, lừ đừ | | WHO 2002 |

Giống nhau ở hai lượt: tên, `urgency` 2, `cant_miss` true, mọi mức prior (2 tháng – 5 tuổi P3), `episodic_crying_legs_drawn` very_frequent, `abd_pain_colicky` very_frequent, `abdomen_hard_swollen`, `drowsy_hard_to_wake`, `fever`, `diarrhea` occasional.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P3 ở trẻ 2 tháng – 5 tuổi (ước từ tỷ lệ mắc; nhóm tuổi gộp trẻ 4–24 tháng nguy cơ cao với trẻ 3–5 tuổi nguy cơ thấp), P5 ở dưới 2 tháng và 5–12 tuổi.
- `child_vomits_everything`, `vomiting_bilious` (hạ một mức), `abd_pain_severe`, các phân bố vị trí, khởi phát, thời gian.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-intussusception-1 (bé 8 tháng, khóc thét từng cơn, nôn) | Hạng 1 (74%), mức 2/2 | Mức 2 nhờ xác suất, không cần quy tắc |
| d-intussusception-2 (bé 5 tháng, lừ đừ, phân mứt dâu) | Hạng 1 trong danh sách cần loại trừ, mức 2/2 | Dừng ở quy tắc `rf_red_jelly_stool` |
| d-intussusception-3 (bé 14 tháng có tiêu chảy, dễ nhầm viêm dạ dày – ruột) | Hạng 2 (10%; viêm dạ dày – ruột 87%), mức 2/2 | Ở cộng đồng viêm dạ dày – ruột phổ biến hơn nhiều; khoảng 10% là hợp lý. Mức 2 nhờ ngưỡng bệnh không được bỏ sót |

## 4. Đề xuất cho người bảo trì

1. Gom `episodic_crying_legs_drawn` và `abd_pain_colicky` vào một cụm (hỏi gần cùng một điều ở trẻ nhỏ); hiện hai câu được tính độc lập (đếm trùng, LR khoảng 32 khi cả hai "Có").
2. Ghi chú tỷ lệ nền của `episodic_crying_legs_drawn` (child.yaml) viết "khoảng 18% trẻ có cơn quấy khóc" theo Bines 2006, nhưng bảng gốc chỉ ghi "đau bụng"; nên sửa câu chữ.
3. Quy tắc `rf_red_jelly_stool` có thể thêm nguồn WHO 2002 và Bines 2006 (đều đã kiểm tra).
