# Chẩn đoán trong hai bộ ca đã công bố

Kế hoạch dùng hai bộ ca này để so sánh doctor-v với các nghiên cứu khác (`docs/evaluation.md`, bộ `external`). Danh sách 177 bệnh của Giai đoạn 3 (`scope.md`) được đối chiếu với chúng để đạt chỉ tiêu "bệnh đúng có trong cơ sở tri thức ≥ 95% số ca" (`docs/research/symptom-checker-methodology.md`, mục 3.5e).

## Nguồn

Tra cứu ngày 2026-10-25.

**Semigran 2015** (BMJ 2015;351:h3480), web appendix, Supplemental Table 2.
- Tải qua Europe PMC: https://www.ebi.ac.uk/europepmc/webservices/rest/PMC4496786/supplementaryFiles
- Đã đối chiếu với bản sao trong kho của nhóm Levine: https://github.com/beamlab-hsph/gpt3-clinical-vignettes/blob/main/data/raw/vignettes-2015.txt

**Levine 2024** (Lancet Digit Health 2024;6(8):e555–e561), supplementary appendix, eTable 2. Ba nguồn dưới đây trùng nhau hoàn toàn:
- bản đã xuất bản: https://ars.els-cdn.com/content/image/1-s2.0-S2589750024000979-mmc1.pdf
- phụ lục bản preprint, qua https://www.ebi.ac.uk/europepmc/webservices/rest/PMC9915829/supplementaryFiles
- kho của nhóm tác giả: https://github.com/beamlab-hsph/gpt3-clinical-vignettes/blob/main/data/raw/vignettes-2020.tsv

Ở đây chỉ ghi tên chẩn đoán và mức xử trí. Nội dung ca sẽ được chuyển thể sang bối cảnh Việt Nam khi làm bộ `external` (Giai đoạn 5).

## Độ phủ

| Bộ | Số ca | Có bệnh đúng: 33 bệnh hiện có + đề xuất ban đầu | Có bệnh đúng: sau khi thêm 7 bệnh | Còn thiếu |
|---|---|---|---|---|
| Semigran 2015 | 45 | 39 (87%) | 43 (96%), hoặc 44 nếu tính chuyển thể | Hội chứng tan máu – tăng ure máu; sốt phát ban Rocky Mountain |
| Levine 2024 | 48 | 38 (79%) | 45 (94%), hoặc 47 nếu tính chuyển thể | Hội chứng tan máu – tăng ure máu; sốt phát ban Rocky Mountain; viêm da do cây thường xuân độc |

**Bảy bệnh thêm vì hai bộ ca này:**
- suy gan cấp;
- tăng bạch cầu đơn nhân nhiễm khuẩn;
- nhiệt miệng;
- lẹo mắt;
- mụn trứng cá;
- suy giáp;
- ngưng thở khi ngủ.

**Cách chuyển thể bệnh không có ở Việt Nam:**
- sốt phát ban Rocky Mountain là bệnh do rickettsia ở Mỹ; bản chuyển thể dùng sốt mò, bệnh do rickettsia hay gặp ở Việt Nam;
- cây thường xuân độc (poison ivy) không mọc ở Việt Nam; bản chuyển thể dùng viêm da tiếp xúc, ví dụ do kiến ba khoang.

Hội chứng tan máu – tăng ure máu hiếm ở Việt Nam và để dự bị. Quy tắc an toàn "tiêu chảy có máu, kèm tiểu ít hoặc da xanh" sẽ xử trí ca này.

Nếu chủ dự án để sức khỏe tâm thần sang đợt sau (`scope.md`, mục 7), bộ Levine thiếu thêm ca trầm cảm, còn 44/48 (92%).

## Semigran 2015: 45 ca

| # | Chẩn đoán (nguyên văn) | Mức xử trí gốc | Bệnh tương ứng trong doctor-v | Lô |
|---|---|---|---|---|
| 1 | Acute liver failure | Emergent | Suy gan cấp | 4 (thêm) |
| 2 | Appendicitis | Emergent | Viêm ruột thừa cấp | đã có |
| 3 | Asthma | Emergent | Hen phế quản | 3 |
| 4 | COPD flare (more severe) | Emergent | Đợt cấp COPD | 3 |
| 5 | Deep vein thrombosis | Emergent | Huyết khối tĩnh mạch sâu | 8 |
| 6 | Heart Attack | Emergent | Hội chứng vành cấp | đã có |
| 7 | Hemolytic uremic syndrome | Emergent | — (dự bị) | — |
| 8 | Kidney stones | Emergent | Cơn đau quặn thận | đã có |
| 9 | Malaria | Emergent | Sốt rét | đã có |
| 10 | Meningitis | Emergent | Viêm màng não do vi khuẩn | đã có |
| 11 | Pneumonia | Emergent | Viêm phổi | đã có |
| 12 | Pulmonary embolism | Emergent | Thuyên tắc phổi | 1 |
| 13 | Rocky Mountain Spotted Fever | Emergent | Chuyển thể thành sốt mò | đã có |
| 14 | Stroke | Emergent | Đột quỵ não | đã có |
| 15 | Tetanus | Emergent | Uốn ván | 10 |
| 16 | Acute otitis media | Non-emergent | Viêm tai giữa cấp | đã có |
| 17 | Acute pharyngitis | Non-emergent | Viêm họng do liên cầu hoặc do vi rút | 5 |
| 18 | Acute pharyngitis | Non-emergent | Viêm họng do liên cầu hoặc do vi rút | 5 |
| 19 | Acute sinusitis | Non-emergent | Viêm xoang cấp | đã có |
| 20 | Back pain (có liệt bàn chân) | Non-emergent | Thoát vị đĩa đệm, đau thần kinh tọa | 8 |
| 21 | Cellulitis | Non-emergent | Viêm mô tế bào | 8 |
| 22 | COPD flare (milder) | Non-emergent | Đợt cấp COPD | 3 |
| 23 | Influenza | Non-emergent | Cúm | đã có |
| 24 | Mononucleosis | Non-emergent | Tăng bạch cầu đơn nhân nhiễm khuẩn | 5 (thêm) |
| 25 | Peptic Ulcer Disease | Non-emergent | Viêm loét dạ dày – tá tràng | đã có |
| 26 | Pneumonia | Non-emergent | Viêm phổi | đã có |
| 27 | Salmonella | Non-emergent | Viêm dạ dày ruột cấp | đã có |
| 28 | Shingles | Non-emergent | Zona thần kinh | 3 |
| 29 | Urinary tract infection | Non-emergent | Viêm bàng quang | đã có |
| 30 | Vertigo | Non-emergent | Chóng mặt tư thế kịch phát lành tính, viêm dây thần kinh tiền đình | 1 |
| 31 | Acute bronchitis | Self-care | Viêm phế quản cấp | 3 |
| 32 | Acute bronchitis | Self-care | Viêm phế quản cấp | 3 |
| 33 | Acute conjunctivitis | Self-care | Viêm kết mạc | 5 |
| 34 | Acute pharyngitis | Self-care | Viêm họng do vi rút | 5 |
| 35 | Allergic rhinitis | Self-care | Viêm mũi dị ứng | 5 |
| 36 | Back pain | Self-care | Đau thắt lưng không đặc hiệu | 8 |
| 37 | Bee sting without anaphylaxis | Self-care | Côn trùng đốt, cắn | 9 |
| 38 | Canker sore | Self-care | Nhiệt miệng | 5 (thêm) |
| 39 | Candidal yeast infection | Self-care | Viêm âm đạo | 6 |
| 40 | Constipation (trẻ 5 tháng) | Self-care | Táo bón chức năng | 4 |
| 41 | Eczema | Self-care | Viêm da cơ địa | 9 |
| 42 | Stye | Self-care | Lẹo mắt | 5 (thêm) |
| 43 | Viral upper respiratory illness | Self-care | Cảm lạnh | đã có |
| 44 | Viral upper respiratory illness | Self-care | Cảm lạnh | đã có |
| 45 | Vomiting (trẻ 2 tuổi) | Self-care | Viêm dạ dày ruột cấp | đã có |

## Levine 2024: 48 ca

| # | Chẩn đoán (nguyên văn) | Mức xử trí gốc | Bệnh tương ứng trong doctor-v | Lô |
|---|---|---|---|---|
| 1 | Liver failure | Emergent | Suy gan cấp | 4 (thêm) |
| 2 | Appendicitis | Emergent | Viêm ruột thừa cấp | đã có |
| 3 | Heart attack | Emergent | Hội chứng vành cấp | đã có |
| 4 | Kidney stones | Emergent | Cơn đau quặn thận | đã có |
| 5 | Meningitis | Emergent | Viêm màng não do vi khuẩn | đã có |
| 6 | Pulmonary embolism | Emergent | Thuyên tắc phổi | 1 |
| 7 | Rocky Mountain Spotted Fever | Emergent | Chuyển thể thành sốt mò | đã có |
| 8 | Stroke | Emergent | Đột quỵ não | đã có |
| 9 | Tetanus | Emergent | Uốn ván | 10 |
| 10 | COPD exacerbation | Emergent | Đợt cấp COPD | 3 |
| 11 | Asthma exacerbation | Emergent | Hen phế quản | 3 |
| 12 | Heart failure exacerbation | Emergent | Suy tim | 3 |
| 13 | Cellulitis | 1 day | Viêm mô tế bào | 8 |
| 14 | Strep throat | 1 day | Viêm họng do liên cầu | 5 |
| 15 | Asthma exacerbation | 1 day | Hen phế quản | 3 |
| 16 | COPD exacerbation | 1 day | Đợt cấp COPD | 3 |
| 17 | Deep vein thrombosis | 1 day | Huyết khối tĩnh mạch sâu | 8 |
| 18 | Hemolytic uremic syndrome | 1 day | — (dự bị) | — |
| 19 | Malaria | 1 day | Sốt rét | đã có |
| 20 | Pneumonia | 1 day | Viêm phổi | đã có |
| 21 | Mononucleosis | 1 day | Tăng bạch cầu đơn nhân nhiễm khuẩn | 5 (thêm) |
| 22 | Salmonella | 1 day | Viêm dạ dày ruột cấp | đã có |
| 23 | Shingles | 1 day | Zona thần kinh | 3 |
| 24 | Urinary tract infection | 1 day | Viêm bàng quang | đã có |
| 25 | Acne | 1 week | Mụn trứng cá | 9 (thêm) |
| 26 | Acute sinusitis | 1 week | Viêm xoang cấp | đã có |
| 27 | Peptic ulcer disease | 1 week | Viêm loét dạ dày – tá tràng | đã có |
| 28 | Vertigo | 1 week | Chóng mặt tư thế kịch phát lành tính, viêm dây thần kinh tiền đình | 1 |
| 29 | Diabetes | 1 week | Đái tháo đường típ 2 | 7 |
| 30 | Hemorrhoids | 1 week | Trĩ, nứt kẽ hậu môn | 4 |
| 31 | Osteoarthritis | 1 week | Thoái hóa khớp | 8 |
| 32 | Depression | 1 week | Trầm cảm | 7 |
| 33 | Obstructive sleep apnea | 1 week | Ngưng thở khi ngủ | 7 (thêm) |
| 34 | Heart failure exacerbation | 1 week | Suy tim | 3 |
| 35 | Hypothyroidism | 1 week | Suy giáp | 7 (thêm) |
| 36 | Gastroesophageal reflux disease | 1 week | Trào ngược dạ dày – thực quản | 3 |
| 37 | Common cold | Self-care | Cảm lạnh | đã có |
| 38 | Viral conjunctivitis | Self-care | Viêm kết mạc | 5 |
| 39 | Viral pharyngitis | Self-care | Viêm họng do vi rút | 5 |
| 40 | Allergic rhinitis | Self-care | Viêm mũi dị ứng | 5 |
| 41 | Musculoskeletal low back pain | Self-care | Đau thắt lưng không đặc hiệu | 8 |
| 42 | Bee sting without anaphylaxis | Self-care | Côn trùng đốt, cắn | 9 |
| 43 | Canker sore | Self-care | Nhiệt miệng | 5 (thêm) |
| 44 | Candidal yeast infection | Self-care | Viêm âm đạo | 6 |
| 45 | Eczema | Self-care | Viêm da cơ địa | 9 |
| 46 | Stye | Self-care | Lẹo mắt | 5 (thêm) |
| 47 | Influenza | Self-care | Cúm | đã có |
| 48 | Poison Ivy | Self-care | Chuyển thể thành viêm da tiếp xúc | 9 |
