# Biên bản đối chiếu: Thai ngoài tử cung (`ectopic_pregnancy`)

- Người đối chiếu: `agent:pass-c` (lô 4), ngày 2026-10-24.
- Bản nháp: `knowledge/drafts/pass-a/ectopic_pregnancy.yaml`, `knowledge/drafts/pass-b/ectopic_pregnancy.yaml`.
- Bản chính thức: `knowledge/conditions/ectopic_pregnancy.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 11, lượt B 12, chung 10; bản chính thức 13 liên kết.
- Nguồn đã mở lại: 315/QĐ-BYT (PDF toàn văn), MSD, NHS, Crochet 2013, Joshi 2025, Nalini 2023, Viniol 2014 (tóm tắt qua API Europe PMC).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `codes.icd10` | O00 | O00.9 | O00 | Bệnh gồm mọi vị trí làm tổ; dùng mã nhóm, không dùng mã "không xác định" | ICD-10 |
| `summary_vi` câu 2 | đau bụng dưới, chậm kinh, ra máu ít sẫm màu | chậm kinh, ra máu ít một, đau bụng dưới một bên | Gộp hai câu | Câu chữ | 315/QĐ-BYT |
| Prior đau bụng: bậc | C | B | B (cơ sở judgment) | Có hướng dẫn Bộ Y tế và số liệu NHS; mức P4/P5/P6 hai lượt giống nhau | 315, NHS, MSD, Viniol |
| `missed_period` | very_frequent (numeric: 63,4%; 97,3%) | frequent (verbal) | **frequent** | Lệch một mức. Số liệu của A ở bệnh viện tuyến cuối Ấn Độ, phần lớn đã vỡ; hạ một mức theo kb-guide 2.1 cho người tự kiểm tra (đến sớm, kinh mới chậm vài ngày); 315: "chậm kinh nhiều trường hợp không rõ" | Joshi 2025, Nalini 2023, 315 |
| `gestational_age` | lt_20w 0,98 / ge_20w 0,02 (C) | 0,97 / 0,03 (B) | 0,97 / 0,03, bậc B | Chênh rất nhỏ; để khoảng cho người ước sai tuổi thai | NHS, MSD, 315 |
| `abd_pain_location` | hố chậu mỗi bên 0,30; hạ vị 0,21 | 0,28; 0,20 | Trung bình (0,29; 0,20; khắp bụng 0,11) | TVD 0,05 | 315, NHS |
| `abd_pain_onset`: bậc | C | B | B | Hai lượt cùng 0,35/0,65; 315 là hướng dẫn chính thức | 315, NHS |
| `abd_pain_severe`: bậc, cơ sở | B/judgment | C/verbal | B/judgment, occasional | Cùng mức; ghi số vỡ 84,6% ở bệnh viện và lý do hạ cho cộng đồng | Joshi 2025, 315, NHS |
| `pain_with_menses` | occasional | không liên kết | **Giữ occasional** | Nguồn ủng hộ (máu ra trước ngày dự kiến có kinh, bị tưởng là kinh). Mức 20% gần bằng tỷ lệ nền 18% nên trung tính, đúng ý cả hai lượt (không để câu trả lời "đau trùng kỳ kinh" loại trừ bệnh) | 315 |
| `abd_pain_worse_movement` | không liên kết | occasional | **Giữ** | 315: máu trong ổ bụng gây kích thích phúc mạc, phản ứng thành bụng | 315 |
| `abd_pain_radiates_right_shoulder` | không liên kết | occasional | **Giữ** | NHS liệt kê đau đầu vai | NHS |
| `warning_signs` | 5 dấu hiệu | cùng 5 dấu hiệu | Giữ | Giống nhau | |
| `self_care_vi`, `see_doctor_vi` | | | Gộp, viết lại | Câu chữ, không đổi ý | NHS, 315 |

Các trường giống nhau ở hai lượt: tên, `urgency` 2, `cant_miss` true, chuyên khoa, `applicability`, mức prior, `pregnant` very_frequent (đúng ghi chú lô 4), `vaginal_bleeding` frequent, `abdomen_hard_swollen`, `fainting_or_near_fainting` occasional, `fever` rare.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior đau bụng P4 (13–17 tuổi P5, 45–64 tuổi P6): suy từ tỷ lệ có thai và tỷ lệ thai ngoài tử cung, chưa có số liệu người đau bụng đi khám ở Việt Nam.
- `pregnant` very_frequent: cố ý thấp hơn almost_always để người chưa biết mình có thai vẫn được xét.
- Phân bố `abd_pain_location`, `abd_pain_onset`.
- `abd_pain_severe`, `abd_pain_worse_movement`, `pain_with_menses` (occasional); `fever` (rare); `abd_pain_radiates_right_shoulder` (occasional, mô tả bằng lời).

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-ectopic-pregnancy-1 (điển hình) | Hạng 1 (88%), mức 2/2 | Dừng cấp cứu theo rf_pregnant_pain_bleeding |
| d-ectopic-pregnancy-2 (16 tuổi, chưa thử thai) | Hạng 1 (7%), mức 2/2 | Mức 2 nhờ ngưỡng bệnh không được bỏ sót. "Nguyên nhân khác" 84% vì lô 3 (viêm ruột thừa, viêm dạ dày – ruột) chưa có |
| d-ectopic-pregnancy-3 (dễ nhầm viêm ruột thừa) | Hạng 2 (12%, sau viêm vùng chậu 69%), mức 2/2 | Phiên dừng "confident" sau 3 câu thích ứng, **chưa hỏi chậm kinh**, vì mức xử trí đã ổn định ở mức 2. Không sửa tham số vì mức xử trí đúng và tri thức không sai; xem đề xuất 1 |

## 4. Đề xuất cho người bảo trì

1. Hỏi `missed_period` bắt buộc ngay sau `pregnant` khi đau bụng ở nữ 13–64 tuổi (ít nhất khi `pregnant` là "Không rõ"); câu giúp của `pregnant` đã hướng người chậm kinh chưa thử thai chọn "Không rõ".
2. Thêm dấu hiệu yếu tố nguy cơ: từng bị thai ngoài tử cung hoặc mổ vòi trứng; đang đặt vòng tránh thai (MSD: khoảng 53% thai khi đang đặt vòng là thai ngoài tử cung).
3. Câu đau vai chỉ hỏi bên phải; đề xuất của lượt R (`shoulder_tip_pain`, NG126 1.4.3) bắt được cả hai bên.
