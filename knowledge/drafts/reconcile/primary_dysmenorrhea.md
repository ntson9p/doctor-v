# Biên bản đối chiếu: Đau bụng kinh nguyên phát (`primary_dysmenorrhea`)

- Người đối chiếu: `agent:pass-c` (lô 4), ngày 2026-10-24.
- Bản nháp: `knowledge/drafts/pass-a/primary_dysmenorrhea.yaml`, `knowledge/drafts/pass-b/primary_dysmenorrhea.yaml`.
- Bản chính thức: `knowledge/conditions/primary_dysmenorrhea.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 17, lượt B 15, chung 14; bản chính thức 16 liên kết.
- Nguồn đã mở lại: Pham 2025 (toàn văn, bảng triệu chứng), Jang 2013 (tóm tắt), MSD, NHS. Hai lượt đặt hai ID cho bài Pham 2025; sổ nguồn dùng `pham-fgwh-2025`; bài Jang 2013 đổi ID thành `jang-ogs-2013`.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `summary_vi` | 3 câu | 3 câu, khác ý thứ 2–3 | Gộp | Câu chữ | MSD, NHS |
| Prior đau bụng: cơ sở, nguồn | numeric (Pham, MSD) | judgment (Pham, Jang) | judgment; nguồn Pham, Jang, MSD | Số liệu tỷ lệ mắc không phải tỷ lệ trong người đau bụng đi khám | Pham 2025, Jang 2013 |
| `abd_pain_location` | hạ vị 0,75 | 0,60 | Trung bình (0,68) | TVD 0,15 | Pham 2025 (đau bụng dưới 97%) |
| `abd_pain_colicky` | very_frequent (C/verbal) | frequent (C/verbal) | **frequent** | Lệch một mức, nguồn ngang nhau (mô tả bằng lời). Chọn mức thận trọng cho bệnh lành tính để câu trả lời "Có" không đẩy mạnh bệnh này lên trên các bệnh cần khám | MSD, NHS |
| `abd_pain_duration` | lt_6h 0,20, h6_24 0,25, "tái đi tái lại" 0,22 | 0,19; 0,37; 0,13 | 0,20; 0,31; 0,29; 0,03; 0,17 | TVD 0,12; lấy trung bình | Pham 2025, NHS |
| `fainting_or_near_fainting` | occasional (judgment từ "chóng mặt" 10,5%) | không liên kết | **Bỏ** | Nguồn chỉ ghi chóng mặt, không phải ngất hay choáng sắp ngất (lượt A cũng ghi số thật có thể thấp hơn). Ngất kèm đau bụng là dấu hiệu nguy hiểm của thai ngoài tử cung vỡ; liên kết occasional (cao hơn nền 5%) sẽ kéo bệnh lành tính lên trong danh sách cần loại trừ | Pham 2025 |
| `abnormal_vaginal_discharge` | rare | không liên kết | **Bỏ** | Viêm âm đạo đi kèm vẫn gặp ở người đau bụng kinh với tỷ lệ gần nền (15%); mức rare (2,5%) làm giảm khả năng bệnh khoảng 6 lần, quá mạnh. Viêm vùng chậu đã có liên kết frequent để phân biệt | MSD |
| `pain_with_intercourse` | rare | không liên kết | **Giữ** | MSD: gợi ý lạc nội mạc tử cung; NHS: lý do đi khám; mức rare chỉ thấp hơn nền một nửa | MSD, NHS |
| `abd_pain_worse_movement` | không liên kết | rare | **Giữ** | Dấu hiệu viêm phúc mạc gợi ý nguyên nhân khác (MSD); giúp phân biệt với viêm ruột thừa, viêm vùng chậu | MSD, NHS |
| `fever`, `pregnant`, `missed_period`, `vaginal_bleeding`: nguồn | MSD | NHS (và Jang) | Hợp nguồn | Cùng mức rare | MSD, NHS |
| `warning_signs` | có `persistent_vomiting` | không có | Hợp hai bản | MSD: đôi khi nôn; nôn liên tục là dấu hiệu cần khám | MSD |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | Không nêu tên thuốc | NHS |

Giống nhau ở hai lượt: tên, mã, `urgency` 5, `cant_miss` false, chuyên khoa, `applicability` (nữ 13–64 tuổi), mức prior (P2; 13–17 tuổi P1; 45–64 tuổi P4), `pain_with_menses` almost_always, `abd_pain_radiates_back`, `fatigue` (frequent), `abd_pain_severe`, `headache`, `nausea`, `diarrhea` (occasional).

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P1/P2/P4: chưa có số liệu lý do đi khám; phần lớn người bệnh tự chịu đựng (Pham 2025: 50% không làm gì để giảm đau).
- Phân bố `abd_pain_location` và lựa chọn "đau tái đi tái lại" của `abd_pain_duration` (0,17).
- Các liên kết "ít gặp hơn nền" (`fever`, `vaginal_bleeding`, `pregnant`, `missed_period`, `pain_with_intercourse`, `abd_pain_worse_movement`: rare).

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-primary-dysmenorrhea-1 (điển hình) | Hạng 1 (99%), mức 5/5 | |
| d-primary-dysmenorrhea-2 (14 tuổi, tiêu chảy, đau quanh rốn) | Hạng 1 (99%), mức 5/5 | Khi lô 3 có viêm dạ dày – ruột, ca này sẽ khó hơn |
| d-primary-dysmenorrhea-3 (dễ nhầm viêm ruột thừa) | Hạng 1 (86%), mức 5/5 | Phiên dài 29 câu (gần trần 30) vì bộ suy luận hỏi các dấu hiệu của quy tắc để ổn định mức 5; bản nhiễu cho mức 2 (an toàn) |

## 4. Đề xuất cho người bảo trì

- Mở `pain_with_menses` cho nhóm 5–12 tuổi (khoảng một phần tư nữ sinh trong Pham 2025 có kinh trước 13 tuổi), rồi mới mở `applicability` của bệnh cho nhóm này.
