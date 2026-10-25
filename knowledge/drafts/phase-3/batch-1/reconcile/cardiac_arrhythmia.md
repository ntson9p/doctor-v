# Biên bản đối chiếu lượt C: cardiac_arrhythmia

- Giai đoạn 3, lô 1, phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-25.
- Bản nháp: `pass-a/cardiac_arrhythmia.yaml` (soạn **trước** khi tách ngoại tâm thu), `pass-b/cardiac_arrhythmia.yaml` (soạn sau khi tách).
- Nguồn mở lại: Zwietering 1998, 1996, Hoefman 2005, Weber 1996, Thavendiranathan 2009, Soteriades 2002, Alboni 2001, Del Rosso 2008 (tóm tắt, API Europe PMC); Berecki 2013, Reed 2019, Bösner 2018 (toàn văn PMC); EHRA 2011, ESC 2019 (nhịp nhanh trên thất), ESC 2024 (rung nhĩ), hướng dẫn thực hành ESC 2018 (trang OUP); NHS SVT, Atrial fibrillation, Arrhythmia (tải trang).
- Trạng thái: `source_checked`.

## Điều chỉnh theo ghi chú của lô

Bản lượt A gộp cả ngoại tâm thu. Theo ghi chú, lượt C hạ:
- prior Hồi hộp của người lớn từ P1 xuống P2, trẻ em từ P2 xuống P3 (trùng lượt B);
- tỷ lệ 'hẫng nhịp' trong `palpitation_rhythm` từ 0,30 xuống 0,08, chia lại phần còn lại theo tỷ lệ của lượt A rồi lấy trung bình với lượt B;
- phần mạch bình thường trong `pulse_measured` (ngoại tâm thu) trước khi lấy trung bình.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common, en, summary_vi | gồm cả ngoại tâm thu | sau khi tách | Bản B | Phạm vi bệnh đã đổi | scope.yaml |
| prior palpitations | P1; trẻ em P2 | P2; trẻ em P3; từ 65 tuổi P1 | Bản B | Rối loạn nhịp có ý nghĩa 8,8–10% ở tuyến ban đầu, 22% khi có máy ghi biến cố, 12/80 ở cấp cứu; tuổi là yếu tố mạnh nhất | Zwietering 1998, 1996; Hoefman 2005; Reed 2019; NHS AF |
| prior syncope, 45–64 tuổi | P2 | P3 | P2 | Ước tính của lượt C khoảng 4–6% (Berecki: 13% người ngất 40–60 tuổi ở bệnh viện là do tim; cộng đồng khoảng một nửa; phần rối loạn nhịp khoảng 70%), đúng ranh giới; ngang nguồn nên chọn mức thận trọng hơn | Berecki 2013; Soteriades 2002 |
| prior dizziness | trẻ 5–12 P4; 65–74 P2 | trẻ 5–12 P5; 65–74 P3 | Bản A | Lệch một mức, ngang nguồn (ước lượng); chọn mức thận trọng hơn | Bösner 2018; Maarsingh 2010 |
| palpitation_rhythm | 0,30/0,35/0,30/0,05 | 0,38/0,42/0,08/0,12 | 0,39/0,44/0,08/0,09 | Xem mục trên | EHRA 2011; Weber |
| palpitation_duration | (chưa có dấu hiệu) | 0,08/0,62/0,30 | 0,12/0,58/0,30 | NHS AF, Arrhythmia ghi cơn có thể chỉ vài giây; LR của 'vài giây' khoảng 0,27, thấp hơn LR 0,38 của mốc 5 phút | Thavendiranathan 2009; NHS |
| neck_pounding | occasional | frequent | occasional | Ước tính khoảng 30% cho cả nhóm (nhịp nhanh vòng vào lại nút nhĩ thất khoảng 20% nhóm, phần lớn có dấu hiệu này); câu hỏi chưa hỏi 'nhanh và đều' nên người ngoại tâm thu, lo âu cũng trả lời 'Có' | Thavendiranathan 2009; EHRA 2011 |
| pulse_measured | 0,032/0,168/0,128/0,072 | 0,04/0,12/0,12/0,12 | 0,035/0,145/0,125/0,095 | Trung bình sau khi bỏ phần ngoại tâm thu | ESC 2018 bảng 6; NHS SVT |
| palpitations (khi Ngất, Chóng mặt) | occasional; dưới 45 tuổi frequent | frequent | Bản A | Có số liệu: hồi hộp 8% ở ngất do tim (Berecki); người cao tuổi chủ yếu nhịp chậm, rung nhĩ, hồi hộp ít hơn mệt (ESC 2024) | Berecki 2013; ESC 2024; ESC 2019 |
| fainting_or_near_fainting | frequent | occasional; Chóng mặt frequent | frequent (mọi triệu chứng chính) | Ngang nguồn; là dấu hiệu cảnh báo của bệnh nên giữ liên kết mạnh hơn | EHRA 2011; NHS |
| breathing_difficulty | không liên kết | occasional | Giữ (B) | | EHRA 2011; NHS |
| chest_pain_pressure | không liên kết | occasional | Giữ (B) | | NHS AF, SVT |
| syncope_trigger | 0,08/0,05/0,12/0,03/0,13/0,10/0,49 | 0,06/0,04/0,06/0,03/0,20/0,15/0,46 | Trung bình | Lượt A gần số liệu Berecki (13%, 10%) | Berecki 2013 |
| syncope_warning | 0,25/0,20/0,55 | 0,20/0,35/0,45 | 0,22/0,28/0,50 | Trung bình | Berecki 2013; EGSYS |
| dizziness_pattern | 0,35/0,40/0,10/0,15 | 0,30/0,45/0,15/0,10 | Trung bình | | NHS SVT |
| known_heart_disease | occasional | occasional; Ngất frequent | Bản B | Khác biệt rõ theo triệu chứng chính: bệnh tim ở 87–95% ngất do tim | Berecki 2013; Alboni 2001 |
| breathless_on_exertion | occasional | không liên kết | Giữ (A) | Liên kết yếu sau khi danh mục nâng tỷ lệ nền lên 0,15 | ESC 2024; NHS AF |
| perioral_tingling | rare | không liên kết | Giữ (A) | Tê bì đi kèm kiểu lo âu | EHRA 2011 bảng 2 |
| vertigo_spinning, dizziness_positional | occasional, rare | không liên kết | Giữ (A) | Bösner: với chóng mặt kiểu quay, bệnh tim mạch không đóng vai trò nào | Bösner 2018 |
| panic_fear | occasional (nguồn ESC, JAMA) | occasional (nguồn EHRA, Loan 2022) | occasional; bỏ Loan 2022 | Loan 2022 chỉ đọc được tóm tắt và nói về lo âu ở người rung nhĩ nằm viện, không phải tần suất trong cơn | — |
| warning_signs | 4 dấu hiệu | thêm tay chân lạnh, cơn thiếu máu não thoáng qua | Bản B | Rung nhĩ gây đột quỵ; nhịp nhanh, chậm gây tụt huyết áp | NHS AF |
| self_care_vi, see_doctor_vi | | | Gộp | | NHS |

Không đổi: mức xử trí 3, không thuộc nhóm không được bỏ sót (hai lượt trùng).

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Prior Ngất, Chóng mặt; prior Hồi hộp từ 65 tuổi (P1).
- Mọi phân bố (kiểu hồi hộp, thời gian cơn, mạch, hoàn cảnh ngất, dấu hiệu trước ngất, kiểu chóng mặt).
- `neck_pounding` occasional; `fainting_or_near_fainting` frequent; `family_sudden_death` theo tuổi; `panic_fear` occasional.
- Mức 3 của bệnh so với NHS (khám bác sĩ gia đình, không khẩn): giữ vì hai lượt trùng và rung nhĩ mới cần điện tim sớm (ESC 2024); bác sĩ nên quyết.

## Kiểm tra trên bộ ca dev

- d-cardiac-arrhythmia-1 (rung nhĩ kịch phát, 68 tuổi): mức 3, đứng đầu (86%).
- d-cardiac-arrhythmia-2 (78 tuổi, ngất không báo trước, mạch 38): mức 2, đứng đầu (59%).
- d-cardiac-arrhythmia-3 (nhịp nhanh vòng vào lại dễ nhầm hoảng sợ): mức 3, đứng đầu (75%), cơn hoảng sợ thứ hai (18%).
- Bệnh cũng đứng đầu bảng xác suất ở nhiều ca ngất khác bị dừng sớm vì quy tắc (d-pulmonary-embolism-1, d-acute-coronary-syndrome-syncope-1), vì các câu phân biệt chưa được hỏi.
