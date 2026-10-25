# Biên bản đối chiếu lượt C: premature_beats

- Giai đoạn 3, lô 1, phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-25.
- Bản nháp: `pass-a/premature_beats.yaml` (một agent khác soạn sau khi tách khỏi rối loạn nhịp), `pass-b/premature_beats.yaml`.
- Nguồn mở lại: Zwietering 1998, 1996, Hoefman 2005, Klein-Wiele 2016, Dong 2022, Aman 2017, Weber 1996, Summerton 2001, Thavendiranathan 2009 (tóm tắt, API Europe PMC); Reed 2019, Gao 2025 (toàn văn PMC); EHRA 2011 (trang OUP); MSD Ventricular premature beats, Ectopic supraventricular rhythms (trang MSD; địa chỉ trang ngoại tâm thu thất đã đổi, sổ đăng ký ghi địa chỉ mới); NHS Heart palpitations (lượt R xác minh cùng ngày).
- Trạng thái: `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi | Ngoại tâm thu nhĩ hoặc ngoại tâm thu thất | Ngoại tâm thu | Bản B, tên thường gọi 'Tim hẫng nhịp' | Màn hình hiện 'Tim hẫng nhịp (Ngoại tâm thu)', dễ hiểu; mã I49.4 gộp cả nhĩ và thất | ICD-10 (lượt A tra icd.kcb.vn) |
| prior palpitations | P2 mọi tuổi | P1 người lớn; P2 dưới 18 tuổi | P2 | Phần 'rối loạn nhịp không có ý nghĩa' ở tuyến ban đầu 19,5–22% (dưới ngưỡng P1, gồm cả loại khác); cấp cứu: ngoại tâm thu 16% số nhịp ghi được lúc có triệu chứng, ngang rối loạn nhịp đáng kể; Holter thấy ngoại tâm thu ở 68% nhưng chỉ 7,7% dày. Bản A có nguồn tốt hơn | Zwietering; Reed 2019; Dong 2022; Klein-Wiele 2016 |
| palpitation_rhythm | 0,05/0,17/0,70/0,08 | 0,06/0,12/0,70/0,12 | 0,05/0,15/0,70/0,10 | Trung bình | EHRA 2011 bảng 2 |
| palpitation_duration | (đề xuất dấu hiệu) | 0,75/0,20/0,05 | 0,60/0,32/0,08 | Gao 2025 (toàn văn): ngay cả khi hồi hộp đúng do ngoại tâm thu, chỉ 29% tả cơn vài giây; nhóm của Gao là ngoại tâm thu dày ở bệnh viện, người dùng phần lớn có nhịp lẻ tẻ | Gao 2025; EHRA 2011 |
| palpitation_abrupt_onset | occasional | rare | rare | Ngang nguồn; mức thận trọng hơn (trả lời 'Có' nghiêng về rối loạn nhịp mức 3) | EHRA 2011 |
| pulse_measured | | | Trung bình | Lệch nhỏ | EHRA; MSD |
| dizziness | occasional (bằng tỷ lệ nền 0,2) | không liên kết | Bỏ | Mức bằng đúng tỷ lệ nền, không mang thông tin | — |
| stimulant_intake | (đề xuất dấu hiệu) | frequent | Giữ | MSD: cà phê, rượu, thuốc thông mũi làm tăng ngoại tâm thu; NHS | MSD; NHS |
| family_sudden_death | very_rare | không liên kết | Giữ (A) | An toàn: ngoại tâm thu chỉ lành tính khi đã loại trừ bệnh tim di truyền | EHRA 2011 bảng 4 |
| panic_fear, perioral_tingling, tremor, heat_intolerance, cold_sweat | rare | không liên kết | Giữ (A) | Kiểu ngoại tâm thu không kèm triệu chứng khác; các dấu hiệu này gợi ý lo âu, cường giáp, hạ đường huyết | EHRA 2011 bảng 1–2 |
| neck_pounding (nguồn) | EHRA, JAMA (bậc B) | NHS (bậc C) | Bản A | | EHRA 2011 |
| stress_poor_sleep (cơ sở) | judgment, bậc C | numeric (Gao), bậc B | Bản B | Có số liệu lo âu 44% | Gao 2025 |
| self_care_vi, see_doctor_vi | | | Gộp, tách câu trên 25 từ | | NHS |

Không đổi: mức xử trí 4, không thuộc nhóm không được bỏ sót (hai lượt trùng).

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Prior P2 (suy từ phần 'rối loạn nhịp không đáng kể', chưa có nghiên cứu nêu riêng ngoại tâm thu ở tuyến ban đầu).
- Mọi tần suất triệu chứng (theo bảng phân kiểu hồi hộp của EHRA), phân bố thời gian cơn, mạch.
- `stimulant_intake` frequent; `family_sudden_death` very_rare (lựa chọn an toàn).

## Kiểm tra trên bộ ca dev

- 3 ca đều đúng mức 4 và đứng đầu (94%, 95%, 93%), kể cả ca 62 tuổi dễ nhầm với rung nhĩ (rối loạn nhịp 0,3%) và ca thiếu niên tả nhịp 'lộn xộn'. Ở bản nhiễu, một phần phiên ra mức 3 (câu dấu hiệu nguy hiểm 'Không rõ').
- Đề xuất: sửa câu `neck_pounding` thành 'đập nhanh và đều ở cổ'; khi đó hạ liên kết của bệnh này xuống rare.
