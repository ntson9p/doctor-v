# Biên bản đối chiếu: asthma (Hen phế quản, cơn hen)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần a, 31/10/2026.
- Bản chính thức: `knowledge/conditions/asthma.yaml`, trạng thái `source_checked`.
- Mức xử trí 3, không thuộc nhóm không được bỏ sót: hai lượt thống nhất.
- 9 liên kết chung, 7 trùng mức. Lượt A có thêm 3 liên kết, lượt B thêm 6.
- Nguồn mở lại: Australian Asthma Handbook, Frese 2011 (bảng 5), Lâm 2011, Verdon 2008 (tóm tắt). 1851/QĐ-BYT, 4888/QĐ-BYT, GINA 2026, NHS Asthma đã được lượt R xác minh và có trong sổ nguồn. Bỏ ijgm-gina-vn-2017 (số tỷ lệ hen trong bài là số dẫn lại; Lâm 2011 là nguồn gốc).

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi | Hen phế quản | Hen phế quản (cơn hen) | Theo lượt B | Tên trong scope.yaml | – |
| codes | J45 | J45.9 + MONDO:0004979 | J45 + MONDO | Bệnh gồm mọi thể hen; MONDO là mục asthma | – |
| specialties | respiratory, general_medicine | respiratory, pediatrics | Hợp hai bản | Bệnh gặp cả ở trẻ em | – |
| Prior Khó thở, trẻ 2 tháng–5 tuổi | P3 | P2 (mặc định) | P3 | Nhóm gồm trẻ dưới 2 tuổi, khò khè chủ yếu do vi rút, viêm tiểu phế quản; chẩn đoán hen dưới 5 tuổi khó (4888) | 4888, Frese |
| Prior Khó thở, các tuổi khác | P2, 5–17 tuổi P1, từ 65 tuổi P3 | như lượt A | Giữ | Trùng | Frese 2011 |
| Prior Ho | P3, 5–17 tuổi P2 | như lượt A | Giữ | Trùng | 4235, Lâm 2011 |
| Prior Đau ngực, trẻ 5–17 tuổi | P2 | P3 (mặc định) | P3 | Không có nguồn đã mở về đau ngực ở trẻ; chọn mức thấp hơn cho bệnh không nguy hiểm, để Đau ngực ở trẻ không bị lấn bởi hen | Verdon 2008 |
| Prior Đau ngực, từ 65 tuổi | P4 | P3 (mặc định) | P4 | Đau ngực ở người cao tuổi chủ yếu do tim mạch, tiêu hóa, thành ngực | Verdon 2008 |
| breathing_difficulty | frequent | very_frequent; Ho: frequent | Theo lượt B | Người hen tức ngực hầu như cũng khó thở; nhóm chọn Ho là nhóm con khác (4235: chỉ ca điển hình mới khó thở cò cử) | 1851, 4235 |
| cough_duration | {.35, .2, .25, .2} | {.30, .20, .30, .20} | Trung bình | Lệch 0,05 | 4235 |
| chest_pain_pressure | occasional | frequent | frequent | Lệch một mức. Nặng ngực, tức ngực là một trong bốn triệu chứng điển hình (1851, GINA Box 1-2, NHS); câu hỏi gồm "tức nặng giữa ngực". Hen không nguy hiểm nên quy tắc "giữ liên kết mạnh" không áp dụng; chọn theo nguồn. Mức xử trí do quy tắc rf_breathless_chest_pressure | 1851, GINA, NHS |
| chest_pain_duration | {.05, .25, .35, .35} | {.05, .30, .40, .25} | Trung bình | Ước lượng | 1851 |
| pleuritic_chest_pain | occasional | không có | Bỏ | Không có nguồn; đau khi hít sâu, khi ho hướng về viêm phổi, thuyên tắc phổi, tràn khí màng phổi; mức occasional (gấp 4 tỷ lệ nền) làm hen chiếm chỗ của các bệnh này | – |
| night_respiratory_symptoms | (đề xuất dấu hiệu) | frequent | frequent | Dấu hiệu nay có trong danh mục; nặng về đêm, sáng sớm làm tăng khả năng hen | Australian Asthma Handbook, 1851, 4235 |
| asthma_known, trẻ dưới 5 tuổi | occasional | frequent | frequent | Lệch hai mức: đọc lại 4888 (chẩn đoán hen ở trẻ dưới 5 tuổi dựa trên các đợt khò khè tái lại, khó chẩn đoán). Bé đã lên cơn nhiều lần thường đã được nói; bé khò khè lần đầu thì phần lớn là viêm tiểu phế quản, không phải hen. Chọn mức giữa | 4888, 1851 |
| asthma_known, trẻ 5–12 tuổi | frequent | very_frequent (mặc định) | frequent | Kiểm soát, chẩn đoán hen ở Việt Nam còn kém; để câu "không" không loại quá mạnh trẻ chưa được chẩn đoán | 1851 |
| dyspnea_onset | {.25, .6, .15} | {.30, .60, .10} | Trung bình | | 4235, 1851 |
| dyspnea_severity | {.55, .37, .08} | {.50, .42, .08} | Trung bình | | 1851, 4888 |
| spo2_measured | không có | {.25, .11, .04, .6} | Giữ | SpO2 92–95% cơn vừa, dưới 92% cơn nặng | 4888, GINA |
| chest_pain_exertional | không có | occasional | Giữ | Hen hay khởi phát khi gắng sức | 1851, NHS |
| chest_pain_sudden_severe | không có | rare | Giữ | Câu "có" nghiêng sang tim mạch, tràn khí | 1851 |
| leg_swelling_both | không có | rare | Giữ | Phù gợi ý suy tim | 4235 |
| allergen_exposure | không có | rare | Giữ | Câu này nhằm phản vệ; dị ứng thức ăn khởi phát hen dưới 2% | 1851 |
| weight_loss_unintended, hemoptysis | rare, very_rare | không có | Giữ | Nhận định: hen không gây sụt cân, ho ra máu; câu "có" nghiêng về lao, ung thư | – |
| wheeze, cough, similar_episodes_before, reliever_no_relief, orthopnea, fever | – | – | Giữ | Trùng mức | 1851, GINA, Australian Asthma Handbook |
| warning_signs | 4 mục | thêm chest_indrawing | Hợp hai bản | Rút lõm ở trẻ là cơn nặng (4888) | 4888 |
| see_doctor_vi | khám trong 24 giờ sau cơn | khám trong 2 ngày | Theo lượt B | Đúng NHS Asthma (đã đỡ thì khám khẩn trong 2 ngày) | NHS Asthma |

## Giá trị dựa trên nhận định

- Mọi prior (Khó thở có số Frese nhưng của châu Âu, mọi lứa tuổi); prior Ho, Đau ngực là ước lượng.
- asthma_known (very_frequent người lớn, frequent dưới 13 tuổi): quyết định nhiều nhất tới kết quả.
- Mọi tần suất từ hướng dẫn (1851, 4888, GINA, NHS) chỉ mô tả bằng lời; mọi phân bố (thời gian ho, đau ngực, khởi phát, mức khó thở, SpO2).
- Không liên kết hút thuốc (Australian Asthma Handbook: hút thuốc nhiều làm giảm khả năng hen) vì cả hai lượt đều không có.

## Ca dev

- d-asthma-1 (điển hình, Khó thở): mức 3, hạng 1 (98%).
- d-asthma-2 (trẻ 7 tuổi, hen dạng ho, chưa chẩn đoán): mức đúng 4, app mức 3 (khuyên quá mức vì urgency của hen là 3; lượt B đã nêu), hạng 1.
- d-asthma-3 (Ho, dễ nhầm viêm phế quản cấp): mức 3, hạng 1 (78%; viêm phế quản 20%).
