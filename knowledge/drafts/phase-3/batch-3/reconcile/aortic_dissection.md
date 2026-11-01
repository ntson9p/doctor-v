# Biên bản đối chiếu: aortic_dissection (Bóc tách động mạch chủ)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần c, 31/10/2026.
- Bản chính thức: `knowledge/conditions/aortic_dissection.yaml`, trạng thái `source_checked`.
- 21 liên kết trong bản chính thức; 16 liên kết chung trùng mức. Lượt B có thêm 4 liên kết (chest_pain_tearing, known_heart_disease, smoker, diabetes), lượt A đề xuất chest_pain_tearing (nay đã vào danh mục).
- Nguồn mở lại: toàn văn Evangelista 2016, Methorst 2026, Erhabor 2026, Saricilar 2026; tóm tắt Klompas 2002, Hagan 2000, Pape 2015, Howard 2013 (API Europe PMC); MSD Aortic dissection; NHS Costochondritis (mục Call 999); 4235/QĐ-BYT tr. 24–28. HSE đã được lượt R xác minh cùng ngày.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi | Phình tách động mạch chủ | Bóc tách động mạch chủ | Theo lượt B (tên trong scope.yaml); "phình tách" đưa vào vi_common | Chưa đối chiếu được bảng ICD-10 của Bộ Y tế; 4235/QĐ-BYT dùng "phình tách" | 4235 |
| urgency | 1 | 1 | 1 | Ghi chú của lô: HSE ghi "gọi 112 hoặc 999, hoặc đến khoa cấp cứu ngay" (quy ước của lượt R: mức 2). Lượt C giữ 1: NHS Costochondritis xếp đau ngực, lưng đột ngột như xé vào "chỉ gọi 999"; NHS Chest pain xếp đau ngực đột ngột lan ra lưng vào "Call 999"; 20% tử vong trước khi tới viện, 1–2% mỗi giờ (MSD); quy tắc rf_aortic_dissection_signs mức 1. Bác sĩ cần quyết | MSD, NHS, HSE, Howard |
| specialties | emergency, cardiology | thêm general_surgery | emergency, cardiology | Phẫu thuật mạch máu, tim mạch không thuộc ngoại tổng quát | – |
| applicability | không có | 13 tuổi trở lên | Không khai báo | Rất hiếm ở trẻ nhưng không bất khả về sinh học (bệnh mô liên kết; kb-guide mục 4.6); dùng prior P6 | MSD, Evangelista |
| Prior Đau ngực | P5; dưới 45 tuổi P6 | P5; 13–44 tuổi P6 (trẻ em loại bằng applicability) | Theo lượt A | Như nhau với người từ 13 tuổi | Saricilar, Erhabor, Howard, Haasenritter |
| Hệ số giới | nam 1,4, nữ 0,7 | nam 1,3, nữ 0,7 | Theo lượt B | Tỷ lệ nam trong người đau ngực của sáu nghiên cứu ít sai lệch là 46–51% (lượt A dùng 44% của Bösner, chỉ người từ 35 tuổi): 0,62/0,48 khoảng 1,3 | Saricilar, Hagan, Haasenritter |
| chest_pain_tearing | (đề xuất dấu hiệu) | occasional | occasional | Nguồn lệch: MSD (hay được tả như xé) và IRAD (không phổ biến). Mức occasional: 'Có' tăng khoảng 7 lần (tỷ lệ nền 0,03), 'Không' chỉ giảm nhẹ; quy tắc mức 1 đã bắt đau như xé kèm đột ngột dữ dội | Evangelista, MSD, HSE, NHS |
| known_heart_disease | không có | occasional | Giữ | Có số liệu IRAD: xơ vữa 31%, từng mổ tim 18% | Evangelista |
| smoker | không có (ước gần tỷ lệ nền) | frequent | Giữ | Đoàn hệ cộng đồng: đang hút từ 10 gói-năm 41,2% so với 18,6% (HR 6,11) | Erhabor |
| diabetes | không có | rare | Giữ | IRAD 5%; cộng đồng 2,1% so với 10,7% (HR 0,25): tách khỏi hội chứng vành cấp | Evangelista, Erhabor |
| chest_pain_sudden_severe, chest_pain_radiates_back, chest_pain_duration, chest_pain_pressure, pain_radiates_arm_jaw, abdominal_pain, fainting_or_near_fainting, es_stroke_signs, breathing_difficulty, cold_sweat, es_crushing_chest_pain, hypertension_known, known_aaa, pleuritic_chest_pain, chest_wall_tenderness, chest_pain_exertional, fever | – | – | Giữ | Trùng mức; ghép nguồn hai lượt | Klompas, Pape, Evangelista, Methorst, MSD, HSE |
| warning_signs | 7 mục | 7 mục (có chest_pain_tearing, không có breathing_difficulty) | Hợp hai bản (8 mục) | | – |
| proposed_findings | chest_pain_tearing | – | Bỏ khỏi tệp | Đã vào danh mục | – |

## Giá trị dựa trên nhận định (bác sĩ cần duyệt)

- Prior Đau ngực P5 từ 45 tuổi, P6 dưới 45 tuổi: ước từ tỷ lệ mới mắc so với hội chứng vành cấp; không có ca nào ở các nghiên cứu tuyến ban đầu.
- chest_pain_tearing occasional (nguồn lệch nhau); chest_pain_duration (phân bố ước lượng); es_crushing_chest_pain occasional; pleuritic_chest_pain, chest_wall_tenderness, chest_pain_exertional rare.
- Tần suất đau lan, ngất, vã mồ hôi, khó thở từ Methorst 2026 (týp A được mổ, ghi theo hồ sơ) và IRAD (trung tâm chuyên sâu).

## Bộ dev

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-aortic-dissection-1 (nam 64 tuổi, điển hình) | mức 1 (đúng 1); hạng 1 (25%, hội chứng vành cấp 23%) | dừng khẩn sau 3 câu |
| d-aortic-dissection-2 (nữ 74 tuổi, đau lưng, bụng, suýt ngất) | mức 1; hạng 2 sau hội chứng vành cấp (78% so với 9%) | prior hội chứng vành cấp từ 65 tuổi (P2) gấp khoảng 240 lần bệnh này |
| d-aortic-dissection-3 (dễ nhầm hội chứng vành cấp) | mức 1; hạng 2 (54% so với 15%) | như trên; cả hai đều trong danh sách cần loại trừ |
