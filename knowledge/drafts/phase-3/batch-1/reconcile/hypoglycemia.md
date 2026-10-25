# Biên bản đối chiếu: Hạ đường huyết (`hypoglycemia`)

- Người đối chiếu: `agent:pass-c` (Giai đoạn 3, lô 1, phần a), ngày 2026-10-25.
- Bản nháp: `.../pass-a/hypoglycemia.yaml`, `.../pass-b/hypoglycemia.yaml`.
- Bản chính thức: `knowledge/conditions/hypoglycemia.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 23, lượt B 26, chung 19; bản chính thức 27 liên kết.
- Nguồn đã mở lại: 5481/QĐ-BYT phần 6 và phần thuốc insulin (caselaw.vn); NHS Low blood sugar (curl); Bonds 2012 (Europe PMC); Vo 2019 (trang bài); Weber 1996, Maarsingh 2010 (tóm tắt Europe PMC, PMC); Newman-Toker 2008 (PMC). STEPS 2021 (lượt A dùng cho prior) không trích được chữ từ PDF, nên không dùng.

## 1. Mức xử trí

Hai lượt cùng chọn **mức 3, không thuộc nhóm "không được bỏ sót"**, trái với gợi ý (mức 2, không được bỏ sót). Lượt C đồng ý sau khi đọc lại nguồn:
- 5481/QĐ-BYT (phần 6 mục 1c) và NHS: người tỉnh, nuốt được tự ăn uống 15–20 g đường hoặc đồ ngọt, thử lại sau 15 phút, nhắc lại nếu còn thấp, rồi ăn nhẹ; NHS chỉ gọi 999 khi đáp ứng không bình thường hoặc bất tỉnh (không có glucagon, đã tiêm mà không hồi phục trong 10 phút, đã uống rượu).
- Mức 3 của 5481 (rối loạn ý thức) cần cấp cứu, nhưng đã có quy tắc: rf_altered_consciousness (mức 1), rf_syncope_not_recovered (mức 2), màn sàng lọc cấp cứu.
- Mức 3 khớp rf_hypoglycemia_suspected (khám trong 24 giờ để xem lại thuốc; NHS khám không khẩn khi hay bị, bị nặng, bị về đêm).
- Mức 2 kèm ngưỡng 1% sẽ khuyên đi viện ngay gần như mọi người tiểu đường dùng thuốc có chóng mặt, làm chậm việc ăn đồ ngọt.
- Còn lại cho bác sĩ: 5481 ghi người dùng sulfonylurea hoặc insulin tác dụng chậm bị cơn nặng cần được theo dõi trong bệnh viện.

## 2. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi` | Hạ đường huyết | Hạ glucose máu (hạ đường huyết) | **Hạ đường huyết** | Đúng tên phần 6 của 5481/QĐ-BYT; "hạ glucose máu" đưa vào tên thường gọi | 5481 |
| `codes.icd10_verified` | true | false | **false** | Không đối chiếu được | |
| Prior Chóng mặt 13–17 tuổi | P5 | P4 | **P4** | Lệch một mức, nguồn ngang nhau (đều ước lượng) → mức cao hơn; ở thiếu niên, tỷ lệ nền 7% của câu đái tháo đường (theo người lớn) làm câu trả lời "Có" yếu hơn thực tế | 5481, NHS |
| Prior Chóng mặt 18–44 tuổi | P4 | P3 | **P3** | Lượt A dựa vào tỷ lệ dùng thuốc theo tuổi của STEPS 2021 nhưng lượt C không mở lại được số liệu này, nên coi là ngang nguồn → mức cao hơn | |
| Prior Ngất 13–17 tuổi | P5 | P4 | **P4** | Như trên | |
| Prior Ngất 18–44 tuổi | P5 | P3 | **P4** | Lệch hai mức: đọc lại nguồn; mất ý thức chỉ ở 25% cơn nặng (Bonds), người chọn Ngất phần lớn là ngất phản xạ, nhưng người dùng insulin ở tuổi này vẫn lịm đi | Bonds 2012, 5481, NHS |
| Prior Ngất từ 45 tuổi | P4 | P3 | **P3** | Lệch một mức, ngang nguồn → mức cao hơn | Bonds, Vo 2019 |
| Prior Hồi hộp 13–44 tuổi | P5 | P4 | **P4** | Lệch một mức, ngang nguồn → mức cao hơn | Weber 1996, 5481, NHS |
| `glucose_measured` | bản đề xuất riêng (dưới 3,9 / 3,9–10 / trên 10) | bản danh mục | **Chuyển sang bản danh mục**: thấp 0,355, bình thường 0,038, cao 0,007, chưa đo 0,6 | Ghi chú của lô: dùng bản danh mục; 'Chưa đo' bằng nền 0,6; trung bình hai lượt sau khi quy đổi | 5481, NHS |
| `cold_sweat` | frequent | very_frequent | **frequent** | Nguồn chất lượng tốt hơn (Bonds 26–27%) thấp; Vo 2019 (83%) chất lượng thấp; mức giữa | Bonds, Vo, 5481, NHS |
| `palpitations` | occasional | frequent | **occasional** | Bonds 4%; NHS chỉ ghi "có thể có" (mức occasional theo bảng 2.1) | Bonds, 5481, NHS |
| `severe_weakness`, `vertigo_spinning`, `palpitation_rhythm` | có | không liên kết | **Giữ** | Có nguồn ủng hộ (Bonds, 5481) | |
| `perioral_tingling`, `panic_fear`, `heavy_alcohol`, `seizure_recent`, `not_recovered_after_faint` | không liên kết | có | **Giữ**; `seizure_recent` dùng số của Bonds (2–3%) thay cho số nằm viện của Vo (chỉ có trong hình) | NHS, Bonds, 5481 |
| `dizziness_pattern`, `syncope_trigger`, `syncope_warning`, `pulse_measured` | | | Trung bình hai lượt | | |
| `see_doctor_vi` | gọi 115 nếu không đỡ sau 15 phút | gọi 115 nếu lơ mơ, co giật, bất tỉnh, không nuốt được | **Lượt B** | NHS khuyên ăn đồ ngọt lần nữa, chỉ gọi 999 khi không đáp ứng (như lượt R đã sửa câu lý do của quy tắc) | NHS |
| `warning_signs` | | thêm not_recovered_after_faint | Hợp hai bản | | |

Giống nhau ở hai lượt: mã E16.2, `urgency` 3, `cant_miss` false, chuyên khoa, các liên kết chung khác.

## 3. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Toàn bộ prior theo tuổi (không có số liệu tỷ lệ hạ đường huyết ở người chóng mặt, ngất, hồi hộp ở tuyến ban đầu).
- Tần suất triệu chứng: cơn nặng trong thử nghiệm ACCORD và mô tả bằng lời của 5481, NHS; chưa có số liệu cơn nhẹ ở cộng đồng.
- `glucose_measured` (phân bố trong số người đã đo), `fainting_or_near_fainting`, `heavy_alcohol`, `panic_fear`, các phân bố.

## 4. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-hypoglycemia-1 (62 tuổi, tiêm insulin, bỏ bữa, đường huyết 3,1) | Hạng 1 (98%), mức 3/3 | |
| d-hypoglycemia-2 (15 tuổi, típ 1, hồi hộp sau đá bóng) | Hạng 1 (92%), mức 3/3 | Với prior P5 cho thiếu niên (lượt A), ca xếp hạng 2 sau cơn hoảng sợ (49% so với 46%). Lượt C chọn P4 theo quy tắc đối chiếu (hai lượt ngang nguồn), không phải để ca đạt; nguyên nhân gốc là tỷ lệ nền của câu đái tháo đường không theo tuổi (xem đề xuất) |
| d-hypoglycemia-3 (50 tuổi, dễ nhầm cơn hoảng sợ) | Hạng 1 (92%), mức 3/3 | Cơn hoảng sợ (phần b) xếp thứ 2 |

## 5. Đề xuất cho người bảo trì

- Tỷ lệ nền của `diabetes` (0,07, theo STEPS cho 18–69 tuổi) quá cao ở thiếu niên, làm câu trả lời "Có" ở người 13–17 tuổi yếu hơn thực tế nhiều lần; cần tỷ lệ nền theo tuổi (bộ kiểm tra hiện chỉ có leak_by_complaint).
- Tách `on_glucose_lowering_meds` thành insulin hoặc sulfonylurea và thuốc khác (đề xuất của lượt R).
- Không thêm `hypoglycemia` vào `cant_miss` của ba triệu chứng chính (bệnh mức 3).
