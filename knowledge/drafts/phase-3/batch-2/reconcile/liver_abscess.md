# Biên bản đối chiếu: liver_abscess (Áp xe gan do amip, do vi khuẩn)

- Lượt C (`agent:pass-c`), Giai đoạn 3 lô 2 phần a, 27/10/2026. Trạng thái: `source_checked`.
- Nguồn đã mở lại: toàn văn Mai-Phan 2026, Yu 2022, Tsai 2008, Do 2026; tóm tắt Blessmann 2002, Lodhi 2004 (API Europe PMC); trang MSD Amebiasis (curl).
- Sửa nguồn: lượt B ghi Tsai 2008 "14,87/100.000/năm"; đó là độ lệch chuẩn của tuổi. Số đúng: 11,15 (1996) tăng lên 17,59/100.000 (2004).

## Bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Tên chính | "Áp xe gan (do amip, do vi khuẩn)" | "Áp xe gan" | A | Trùng scope.yaml | — |
| Prior Sốt từ 65 tuổi | P4 | P5 | P4 | Áp xe do vi khuẩn tăng theo tuổi (tuổi trung vị 61); bệnh không thuộc nhóm "không được bỏ sót" nên không đẩy mức xử trí | Tsai, Lodhi |
| Hệ số giới | 1,45 / 0,55 | 1,4 / 0,6 | B | Gộp khoảng 70% là nam | Mai-Phan, Tsai, Blessmann |
| chills_rigors | frequent | very_frequent | very_frequent | Mở lại Yu 2022: rét run 74,7% (khoảng 80% người có sốt) | Yu 2022 |
| fever_max_temp | {0,15; 0,40; 0,45} (số trẻ em) | {0,08; 0,37; 0,55} | B | Số liệu người lớn: trên 39°C 57,3% | Yu 2022 |
| fever_duration, abd_pain_location, abd_pain_onset, abd_pain_duration | phân bố A | phân bố B | Trung bình | Lệch dưới 0,1 | MSD |
| diarrhea | occasional | không | Bỏ | Chỉ có số liệu trẻ em (Do 2026); người lớn chủ yếu áp xe do vi khuẩn | — |
| vomiting | occasional | không | Giữ | Yu 2022: buồn nôn, nôn 33,3% (người lớn) | Yu, MSD |
| pleuritic_chest_pain, gallstones_known, immunocompromised | không | occasional | Giữ | Nhiễm trùng phổi 27,4%; bệnh đường mật 22,3%; ung thư 11,1% | Mai-Phan, Yu |
| warning_signs | có abdomen_hard_swollen | có jaundice | Gộp | — | — |

## Giá trị dựa trên nhận định

- Prior; hệ số giới; số ngày sốt, số ngày đau; đau lan vai phải, đau khi hít sâu, sụt cân (occasional).

## Kiểm thử

- d-liver-abscess-1 (mức 3, hạng 1), -2 (thể amip, triệu chứng chính Đau bụng: mức 2, khuyên quá mức vì viêm túi mật cấp 46%; hạng 2), -3 (dễ nhầm sốt xuất huyết: mức 3, hạng 3).
