# Biên bản đối chiếu lượt C: pertussis (Ho gà)

- Giai đoạn 3 lô 3, phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-31.
- Bản nháp: `pass-a/pertussis.yaml`, `pass-b/pertussis.yaml`.
- Nguồn mở lại: MSD Pertussis (tải trang, cập nhật 9/2026); NHS Whooping cough (tải trang, rà soát 06/8/2026: đau sườn do ho ở trẻ lớn, người lớn; đau ngực tăng khi thở, ho thì đi cấp cứu vì có thể là viêm phổi; nghỉ học, nghỉ làm 48 giờ sau kháng sinh hoặc 3 tuần); Moore 2017, Cornia 2010, Pham 2020, Wang 2014, Toizumi 2024 (tóm tắt qua API Europe PMC); Pham 2024 (toàn văn PMC10809638: bảng 1, hình 1, bảng 3); Thư 2023 (PDF toàn văn). WHO EMRO (định nghĩa ca) đã được lượt R xác minh trong ngày.
- Nguồn đưa vào sổ: `msd-pertussis`, `moore-chest-2017`, `cornia-jama-2010`, `pham-bmcpublichealth-2024`, `pham-actapaediatr-2020`, `wang-bmj-2014`, `toizumi-vaccines-2024`, `thu-tcncyh-2023` (đều đã mở, `verified: true`).
- Trạng thái: `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common | "Ho gà", "Ho kéo dài 100 ngày" | "Ho gà", "Ho rũ rượi" | Bỏ trường này | Trùng tên chính; hai tên kia không phải tên thường gọi phổ biến ở Việt Nam | |
| prior cough, từ 65 tuổi | P4 (mặc định) | P5 | P5 | Ngang nguồn (ước lượng); ở tuổi này ho có nhiều nguyên nhân khác (bệnh phổi tắc nghẽn, suy tim, ung thư phổi) | Toizumi 2024; MSD |
| prior_modifiers mùa (miền Bắc) | Không dùng | Tháng 4–7 ×1,4; tháng 8–11 ×0,5 | Dùng (B) | Số ca theo mùa khác rõ và ổn định qua 4 năm (47,9% / 37,4% / 14,7%); mô hình hồi quy lượt A dẫn đo tỷ lệ ho gà trong số lượt nhập viện, không đo số ca | Pham 2024 bảng 1, hình 1 |
| inspiratory_whoop, dưới 2 tháng | (occasional) | rare | rare (B) | NHS: trẻ dưới 3 tháng có thể không rít; MSD: ở nhũ nhi cơn nghẹn, tím nhiều hơn tiếng rít | NHS; MSD |
| post_tussive_vomiting, người lớn | (frequent) | occasional | occasional (B) | Moore: người lớn 32,5% (dưới ranh giới 33%), trẻ em 60% | Moore 2017 |
| apnea_cyanosis_spells, dưới 2 tháng | (occasional) | frequent | frequent (B) | MSD: ở nhũ nhi cơn nghẹn có hay không tím có thể nhiều hơn tiếng rít; nhóm này chỉ sàng lọc dấu hiệu nguy hiểm | MSD |
| fever | occasional | rare (người lớn occasional) | occasional mọi tuổi (A) | Hai nguồn có số liệu cùng ở mức này (người lớn khoảng 18%, trẻ Việt Nam nằm viện 23%); NHS chỉ nói sốt cao ít gặp; rare (thấp hơn nền 5%) sẽ làm câu 'có sốt nhẹ' hạ ho gà ở trẻ | Moore 2017; Thư 2023; NHS |
| fever_max_temp | 0,60 / 0,32 / 0,08 | 0,70 / 0,25 / 0,05 | Trung bình 0,65 / 0,285 / 0,065 | Hai bản cùng mô tả bằng lời | NHS; MSD |
| night_respiratory_symptoms | Không (dấu hiệu chưa có) | frequent | Giữ (B) | MSD: ho khan về đêm; NHS: cơn ho nặng hơn về đêm | MSD; NHS |
| child_feeding_reduced | occasional | Không | Giữ (A) | NHS: mất nước ở trẻ dưới 6 tháng; MSD: chán ăn giai đoạn viêm long | NHS; MSD |
| pleuritic_chest_pain | occasional (dưới 5 tuổi rare) | Không | Giữ (A) | NHS: ho gây đau sườn ở trẻ lớn, người lớn. NHS cũng xếp đau ngực tăng khi thở, ho vào nhóm cần cấp cứu (viêm phổi): viêm phổi có liên kết mạnh hơn | NHS |
| dtp_vaccinated | Đề xuất dấu hiệu | occasional; 5–12 tuổi very_frequent | Giữ (B) | Dấu hiệu đã vào danh mục; trẻ dưới 5 tuổi nằm viện phần lớn chưa tiêm đủ, trẻ 5–15 tuổi ho gà 70% đã tiêm đủ | Pham 2024; Thư 2023; Pham 2020; Wang 2014 |
| warning_signs | 7 mục | 8 mục (thêm grunting) | Hợp (8 mục) | Thở rên là dấu hiệu suy hô hấp nặng ở trẻ nhỏ | |
| self_care_vi, see_doctor_vi | | | Ghép hai bản | Nghỉ học, nghỉ làm theo NHS; trẻ dưới 6 tháng khám trong ngày | NHS |

Các trường còn lại trùng nhau (mã, mức xử trí 3, không thuộc nhóm không được bỏ sót, chuyên khoa, prior đến 64 tuổi, cough_duration, cough_paroxysms, runny_nose, breathing_difficulty, sick_contact_respiratory, wheeze).

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Prior Ho ở mọi nhóm tuổi (huyết thanh học, ca nằm viện, số liệu Anh cho 5–15 tuổi).
- Hệ số mùa: chỉ có số liệu trẻ nằm viện ở miền Bắc.
- Phân bố thời gian ho, sốt cao nhất; tần suất ngừng thở, tím ở trẻ dưới 2 tháng; bú kém; đau khi hít sâu; ho về đêm; tiếp xúc người ho.
- Mức xử trí 2 của quy tắc rf_pertussis_infant so với mục khám khẩn (mức 3) của NHS (ca d-pertussis-2).

## Ca dev và ảnh hưởng

- d-pertussis-1 (8 tuổi, điển hình): đứng đầu, mức 3. d-pertussis-3 (15 tuổi, dễ nhầm viêm phế quản cấp): đứng đầu, mức 3.
- d-pertussis-2 (4 tháng, chưa có tiếng rít): mức 2 (đúng là 3 theo NHS; rf_pertussis_infant), khuyên quá mức có chủ đích. Phiên dừng sớm, chỉ hiện danh sách 'bác sĩ cần loại trừ' (bệnh mức 1–2) nên ho gà không hiện: đề xuất ghi `conditions: [pertussis]` cho rf_pertussis_infant, rf_pertussis_signs.
