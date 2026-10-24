# Biên bản đối chiếu: Viêm, loét dạ dày – tá tràng (`peptic_ulcer_gastritis`)

- Người đối chiếu: `agent:pass-c` (lô 3), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/peptic_ulcer_gastritis.yaml`, `knowledge/drafts/pass-b/peptic_ulcer_gastritis.yaml`.
- Bản chính thức: `knowledge/conditions/peptic_ulcer_gastritis.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 14, lượt B 12, chung 11, hợp 15; bản chính thức 12 liên kết.
- Nguồn đã mở lại: MSD Peptic ulcer disease, NHS Stomach ulcer, Viniol 2014, Nasseri 2023 (tóm tắt), Nguyen 2026 (H. pylori, tóm tắt), Nguyen 2010, Dao 2022, Nguyen 2023 (toàn văn PMC), Cervellin 2016.
- Sổ nguồn: lượt A và lượt B trích cùng bài Nguyen 2023 (trẻ em TP.HCM) với hai ID; sổ nguồn dùng `nguyen-healthcare-2023`. Bài tổng quan H. pylori 2026 dùng ID `nguyenvk-medicine-2026`.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.en` | Gastritis and peptic ulcer disease | Peptic ulcer disease and gastritis | Lượt B | Câu chữ | — |
| `codes.icd10_verified` | false | true | true | Lượt B tra icd.kcb.vn; lượt C không tự tra lại được | — |
| `specialties` | tiêu hóa, đa khoa | tiêu hóa | Tiêu hóa, đa khoa | Phần lớn được khám ở tuyến ban đầu | — |
| Prior: bậc, cơ sở | B/judgment | A/numeric | **B/judgment** | Không có số đo tỷ lệ bệnh trong người đau bụng ở Việt Nam; số liệu nội soi là người đã được chọn đi nội soi | Viniol, Nasseri, Nguyen 2010, Dao 2022 |
| Prior 5–12 tuổi | P3 | P4 | **P4** | Lệch một mức, cùng là ước lượng. 19% loét ở Nguyen 2023 là trẻ đã được chuyển nội soi ở bệnh viện tuyến cuối; ở cộng đồng đau bụng chức năng và viêm dạ dày – ruột hay gặp hơn. Mức thấp hơn thận trọng hơn cho bệnh lành tính | Nguyen 2023, Erkan |
| Prior 13–17 tuổi | P2 (mặc định) | P3 | **P3** | Như trên | Nguyen 2023 |
| `abd_pain_meal_relation`, `abd_pain_duration`, `abd_pain_onset` | | | Trung bình | Lệch 0,02–0,05 | MSD, NHS |
| `abd_pain_colicky` | occasional | — | **Bỏ** | Mức bằng tỷ lệ nền 0,2 của câu hỏi, không mang thông tin | — |
| `abdomen_hard_swollen` | rare | — | **Bỏ** | Tỷ lệ nền 1% nên rare lại làm tăng khả năng bệnh. Thủng là biến chứng; nếu liên kết, một bệnh mức 4 có prior lớn (P2) sẽ lên đầu danh sách khi người dùng có dấu hiệu cấp cứu ngoại khoa | MSD |
| `abd_pain_radiates_back` | — | occasional | **Bỏ** | MSD chỉ nêu đau lan ra lưng khi ổ loét mặt sau tá tràng xuyên thấu vào tụy (thiểu số, lượt B ước 10%, gần tỷ lệ nền 5%). Liên kết occasional làm mờ dấu hiệu phân biệt với viêm tụy cấp (bệnh không được bỏ sót) | MSD |
| `diarrhea` | rare | — | Giữ | MSD: tiêu chảy chỉ nổi bật trong u tiết gastrin; mức rare thấp hơn tỷ lệ nền, giúp phân biệt với viêm dạ dày – ruột | MSD |
| `vomiting_blood`, `black_stool` | rare (ý "ít gặp") | rare, cố ý cao hơn tỷ lệ nền | **rare + `above_leak_ok`** | Hai lượt cùng mức; ghi rõ ý của lượt B theo lời dặn của lô: là nguyên nhân hàng đầu của xuất huyết tiêu hóa trên nên câu trả lời "Có" phải làm tăng khả năng bệnh này. Mức xử trí do quy tắc `rf_gi_bleeding` quyết định | MSD, NHS, Nguyen 2023 |
| `heartburn` | occasional (Nasseri) | occasional (NHS) | Giữ, hợp nguồn | Cùng mức | NHS, Nasseri |
| `see_doctor_vi` | | có câu "từ 60 tuổi mới bắt đầu đau" | Gộp, bỏ mốc 60 tuổi | Lượt C chưa mở được nguồn cho mốc tuổi này; dùng danh sách khám khẩn của NHS (sụt cân, chán ăn, nuốt khó, nôn kéo dài) | NHS |

Giống nhau ở hai lượt: tên, mã K27, `urgency` 4, `cant_miss` false, prior P2 ở người lớn, dưới 5 tuổi P5, dưới 2 tháng P6, vị trí đau, `abd_pain_severe` rare, `abd_pain_worse_movement` rare, `regular_painkiller_use` occasional, `fever` rare, `warning_signs`. Cả hai lượt cố ý không liên kết buồn nôn, nôn, chán ăn (tần suất gần tỷ lệ nền).

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P2 ở người lớn (bệnh gộp viêm dạ dày và loét, chồng lấn với khó tiêu chức năng); P4 ở trẻ 5–12 tuổi, P3 ở 13–17 tuổi.
- Phân bố vị trí, liên quan bữa ăn, thời gian đau, khởi phát.
- `heartburn`, `regular_painkiller_use`, `vomiting_blood`, `black_stool` (2–5%), `fever`, `diarrhea`, `abd_pain_severe`, `abd_pain_worse_movement`.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-peptic-ulcer-gastritis-1 (điển hình, dùng thuốc giảm đau) | Hạng 1 (98%), mức 4/4 | |
| d-peptic-ulcer-gastritis-2 (thiếu niên 14 tuổi) | Hạng 1 (91%), mức 4/4 | |
| d-peptic-ulcer-gastritis-3 (uống rượu, dễ nhầm viêm tụy) | Hạng 1 (98%), mức 4/4 | |

Ảnh hưởng tới ca của lô khác (prior P2 cạnh tranh mạnh ở vùng thượng vị): d-acute-coronary-syndrome-3 (hội chứng vành cấp hạng 2 sau bệnh này, vẫn mức 1), d-preeclampsia-3 (tiền sản giật hạng 3, vẫn mức 2), d-primary-dysmenorrhea-3 (mức 4 thay vì 5, bệnh này 14% dù đau bụng dưới bên phải ngày có kinh). Lượt C không sửa tham số vì các liên kết của bệnh này có nguồn; ghi lại để bác sĩ và người bảo trì xem khi hài hòa prior.

## 4. Đề xuất cho người bảo trì

- Thêm dấu hiệu "đau làm thức giấc ban đêm" (MSD: gợi ý mạnh loét tá tràng; NHS: đau nặng về đêm) và các dấu hiệu báo động của khó tiêu (sụt cân, nuốt khó) khi có bệnh ung thư dạ dày.
