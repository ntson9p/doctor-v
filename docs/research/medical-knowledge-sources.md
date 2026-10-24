# Nguồn tri thức y khoa quốc tế và bộ dữ liệu cho doctor-v

*Báo cáo nghiên cứu, ngày 2026-10-24. Phạm vi: các nguồn quốc tế dùng để (a) xây KB bệnh–triệu chứng có ước lượng tần suất, (b) lấy danh mục và mã bệnh, (c) tham khảo khi tự viết lời giải thích tiếng Việt, (d) đánh giá độ chính xác.*

**Phương pháp và quy ước.**
- Mỗi khẳng định quan trọng được đối chiếu với trang chính thức, tệp dữ liệu, API hoặc bài báo gốc. Khi làm được, tệp được tải về và đếm trực tiếp (DDXPlus, HPO, MedlinePlus XML, Wikidata SPARQL, Zenodo).
- **CHƯA XÁC MINH** nghĩa là không kiểm được từ nguồn gốc trong phiên này.
- Một số trang chính thức chặn truy cập tự động: who.int, nice.org.uk, digital.nhs.uk, bmj.com, NCBI Bookshelf. Với các trang này, báo cáo ghi rõ đã xác minh qua trích đoạn chỉ mục tìm kiếm hoặc qua bản phản chiếu.
- Ngân sách WebSearch của phiên đã hết giữa chừng. Các mục còn lại được kiểm bằng cách truy cập trực tiếp URL hoặc DOI đã biết (Crossref, Europe PMC, NCBI ID converter, figshare, Zenodo, GitHub API). Mục nào không kiểm được thì đã đánh dấu.
- Đây không phải tư vấn pháp lý.

---

## 1. Tóm tắt

1. **Không có bảng xác suất bệnh–triệu chứng nào vừa mở, vừa phủ rộng, vừa đã thẩm định cho bệnh thường gặp.** Chỉ có ba loại nguồn tần suất "thật":
   - **HPO/Orphanet:** có tần suất (lớp, n/m, %) kèm PMID, nhưng hầu như chỉ cho bệnh hiếm.
   - **Y văn về độ chính xác chẩn đoán** (Cochrane DTA, loạt JAMA *Rational Clinical Examination*, sách McGee): có sens/spec/LR theo từng bối cảnh. Các con số là dữ kiện, dùng được nếu có trích dẫn.
   - **KB thương mại** (DXplain, Infermedica, KB gốc của DDXPlus): độc quyền, không lấy được.
2. **DDXPlus** (CC BY 4.0) chỉ phát hành bệnh nhân (BN) tổng hợp và *danh sách* evidence cho từng bệnh:
   - Quy mô: khoảng 1,3 triệu BN, trong đó tập test có 134.529 BN; 49 bệnh; 223 evidence.
   - Xác suất P(evidence|bệnh) của KB gốc **không được phát hành**. KB gốc là độc quyền, có 440 bệnh, tổng hợp từ hơn 20.000 bài báo. Trong `release_conditions.json`, mỗi evidence chỉ là object rỗng `{}` (đã tải và kiểm tra).
   - Có thể ước lượng ngược tần suất từ BN tổng hợp. Nhưng kết quả đó chỉ phản chiếu KB độc quyền cộng với bộ lọc của một hệ chẩn đoán thương mại, nên chỉ được xếp bậc bằng chứng thấp nhất (E).
3. **Mã bệnh.**
   - Việt Nam dùng ICD-10 theo **Thông tư 06/2026/TT-BYT**: ký 02/4/2026, hiệu lực 01/7/2026, theo LuatVietnam (chưa đối chiếu Công báo).
   - **ICD-11 chưa có tiếng Việt.** Bản MMS 2026-01 có 15 ngôn ngữ. Giấy phép là CC BY-ND 3.0 IGO; muốn dịch phải có thỏa thuận riêng với WHO.
   - **MONDO** (CC BY 4.0) và **Disease Ontology** (CC0) dùng làm ID nội bộ và cầu nối giữa các hệ mã.
   - **Việt Nam không phải thành viên SNOMED International** (54 thành viên, kiểm ngày 2026-10-24). Dùng bản đầy đủ có thể mất phí. Bản GPS miễn phí nhưng theo CC BY-ND 4.0.
   - **UMLS** không được nhúng vào app.
4. **Văn bản cho người dùng: tự viết tiếng Việt.** Các nguồn tham khảo:
   - Dùng lại được: MedlinePlus (phần do NLM viết là public domain; nội dung A.D.A.M. và ASHP có bản quyền), CDC (phần lớn public domain), NHS (OGL v3.0; bản dịch hoặc chuyển thể **không được** ghi là "từ NHS").
   - Chỉ để tham khảo: **MSD Manuals có bản tiếng Việt** (msdmanuals.com/vi, cả bản chuyên gia và bản cho người bệnh) nhưng ghi "All rights reserved", nên chỉ dùng để đối chiếu thuật ngữ.
   - Loại: **NICE CKS** chỉ mở cho người dùng ở UK; ngoài UK phải thuê bao qua Agilio.
5. **Không dùng làm nguồn tần suất:**
   - Các bộ Kaggle/HuggingFace: 22–42 bệnh, nguồn gốc không rõ, trọng số tự đặt, giấy phép CC BY-SA/ODbL.
   - Symcat: website trả lỗi 503; dữ liệu đang lưu hành là bản cào, không có giấy phép.
   - Columbia KB: 150 bệnh, lấy từ tóm tắt ra viện năm 2004, không có giấy phép.
   - Wikidata P780: 2.004 item; khoảng 59% phát biểu trích từ NIOSH về phơi nhiễm hóa chất; gần như không có tần suất.
6. **Đánh giá.**
   - Giấy phép thuận lợi nhất: **Levine & Mehrotra 2021** (48 ca, CC BY). Tiếp theo là **Semigran 2015** (45 ca, CC BY-NC 4.0).
   - Hill 2020 (48 ca) có công bố ca nhưng thuộc bản quyền MJA/Wiley.
   - Gilbert 2020 (200 ca) **không** công bố ca.
   - RepVig 2024: 45 ca "đại diện" lấy từ Reddit; dữ liệu trên Zenodo theo CC BY 4.0 nhưng không chứa nội dung ca.
   - Tất cả đều bằng tiếng Anh, bối cảnh Âu–Mỹ–Úc, và có thể đã lọt vào dữ liệu huấn luyện. Vì vậy doctor-v cần bộ vignette tiếng Việt riêng, có tập holdout giữ kín.
7. **Engine thương mại** (dùng làm benchmark). Không engine nào hỗ trợ tiếng Việt theo trang công khai.
   - Infermedica: trang Medical Content liệt kê 20 ngôn ngữ, không có tiếng Việt; khoảng 900 bệnh người lớn; dữ liệu xác suất do biên tập viên y khoa nhập từ y văn; được xếp EU MDR loại IIb.
   - Isabel: 14 ngôn ngữ, không có tiếng Việt.
   - EndlessMedical: có gói miễn phí, hơn 180 bệnh, chỉ định vị là hỗ trợ quyết định cho bác sĩ.
   - ApiMedic: không kết nối được.
8. **Công cụ sàng lọc nhúng được vào app.**
   - **PHQ-9, PHQ-2, GAD-7 là public domain**, với câu "No permission required to reproduce, translate, display or distribute" (đã xác minh trên PDF chính thức).
   - Có nghiên cứu tiếng Việt cho PHQ-9 (Nguyen 2016, chỉ đánh giá psychometric), EPDS (Tran 2011) và AUDIT (Giang 2005).
   - Còn CHƯA XÁC MINH: giấy phép của AUDIT-C, STOP-Bang, FINDRISC, EPDS; thẩm định tiếng Việt của GAD-7, STOP-Bang, FINDRISC, Centor/McIsaac.
9. **Đề xuất gắn nhãn cho mọi tham số KB:** **bậc bằng chứng A–E**, **nhãn giấy phép L0–L3** và metadata nguồn (mục 4.4).

---

## 2. Bảng tổng hợp

Thang phù hợp: ●●● cao · ●● trung bình · ● thấp · ✕ tránh. Cột "Thương mại?" chỉ xét theo giấy phép.

### 2.1 Tri thức cấu trúc và bộ dữ liệu

| Nguồn | Nội dung | Phạm vi (phiên bản) | Truy cập | Giấy phép | Thương mại? | Phù hợp |
|---|---|---|---|---|---|---|
| DDXPlus | BN tổng hợp, DDx kèm xác suất; danh sách evidence theo bệnh, mã ICD-10, severity. **Không có P(s\|d)** | 49 bệnh, 223 evidence, ~1,3 tr BN (figshare FR v15 ngày 2026-03-11; EN v2 ngày 2026-03-09) | Tải từ figshare | CC BY 4.0 (dữ liệu); repo code không có file license | Có, phải ghi công | ●● thiết kế câu hỏi, benchmark; ● làm xác suất |
| HPO `phenotype.hpoa` | Bệnh ↔ thuật ngữ HPO; tần suất (lớp HPO, n/m, %), onset, sex, PMID | 12.867 bệnh, 268.906 chú thích kiểu hình, 80,4% có tần suất (v2026-09-02) | TSV trên GitHub release | Giấy phép riêng của HPO: ghi công, hiển thị phiên bản, không sửa nội dung | Có vẻ được, cần xác nhận | ●● bệnh hiếm; ● bệnh thường gặp |
| Orphadata Science | Kiểu hình HPO kèm lớp tần suất; dữ liệu dịch tễ | 4.357 rối loạn có kiểu hình (bản 07/2026) | XML 7 ngôn ngữ, có API | CC BY 4.0; có điều khoản riêng cho công cụ AI | Có | ●● cờ bệnh hiếm |
| Disease Ontology (DO) | Phân loại bệnh, định nghĩa, xref | 12.335 lớp (v2026-09-30) | OWL/OBO/JSON | CC0 | Có | ●●● ID, ánh xạ |
| MONDO | Ontology bệnh hợp nhất; mapping 1:1 với OMIM/Orphanet/DOID/EFO | 29.315 bệnh, 23.214 ở người (v2026-10-06) | OWL/OBO/JSON | CC BY 4.0 | Có | ●●● ID, ánh xạ |
| Symptom Ontology | Thuật ngữ triệu chứng | 895 lớp (v2026-07-30) | OWL/OBO | CC0 | Có | ●● từ vựng |
| Wikidata P780 | Liên kết bệnh–triệu chứng, không có tần suất | 2.004 item, 11.790 phát biểu (truy vấn 2026-10-24) | SPARQL, dump | CC0 | Có | ● chỉ để gợi ý |
| Columbia Disease-Symptom KB | Xếp hạng độ liên kết bệnh–triệu chứng, trích bằng NLP từ tóm tắt ra viện (NYP, năm 2004) | 150 bệnh | Trang HTML | Không nêu | Không rõ | ✕ / ● |
| Symcat | "Xác suất" triệu chứng–bệnh, được mô tả là lấy từ dữ liệu CDC | 801 bệnh, 474 triệu chứng (thứ cấp) | Website trả 503; bản cào trên GitHub | Không có | Không | ✕ |
| Kaggle/HF disease–symptom | Ma trận nhị phân, trọng số tự đặt hoặc câu mô tả | 41–42 bệnh (Kaggle); 22 bệnh (HF) | Kaggle, HF | CC BY-SA 4.0; ODbL; Apache-2.0 | Tùy bộ, có ràng buộc share-alike | ✕ |
| SNOMED CT | Thuật ngữ lâm sàng | International Edition; GPS (mở rộng ngày 2026-03-11) | MLDS (affiliate) | Affiliate license, có thể thu phí với nước không thành viên; GPS theo CC BY-ND 4.0 | Bản đầy đủ có phí; GPS dùng được nhưng ND | ● |
| UMLS | Metathesaurus | Nhiều nguồn | Cần tài khoản UTS | UMLS License: miễn phí nhưng hạn chế theo nguồn (Cat. 1–4; SNOMED theo App. 2) | Hạn chế phân phối | ● chỉ dùng nội bộ |
| ICD-11 (WHO) | Phân loại, API, Coding Tool | MMS 2026-01; 15 ngôn ngữ, **không có tiếng Việt** | API (cần đăng ký), Docker chạy cục bộ | CC BY-ND 3.0 IGO | Có, nếu không sửa và ghi nguồn; dịch cần thỏa thuận | ●● mapping |
| ICD-10 WHO + danh mục của BYT | Mã chuẩn quốc gia | TT 06/2026/TT-BYT, hiệu lực 01/7/2026 | icd.kcb.vn; phụ lục Excel | ICD-10 bản 2019 của WHO: CC BY-ND 3.0 IGO; bản của BYT là văn bản quy phạm, quyền nhúng CHƯA XÁC MINH | Cần kiểm | ●●● mã chính |
| *Bổ sung:* DXplain | Bệnh–finding kèm tần suất và mức gợi ý bệnh | >2.400 bệnh, >5.000 finding, >230.000 điểm dữ liệu | Web, chỉ cấp license cho tổ chức | Độc quyền (MGH) | Thu phí | ● benchmark |
| *Bổ sung:* NAMCS/NHAMCS | Lượt khám ngoại trú ở Mỹ: lý do khám, chẩn đoán | Trang liệt kê 2018–2025 | Public-use files | Dữ liệu chính phủ Mỹ | Có | ● tham khảo |
| *Bổ sung:* IHME GBD | Gánh nặng bệnh, có số liệu Việt Nam | Toàn cầu | Tải về, cần tài khoản | Chỉ phi thương mại; dùng thương mại phải trả phí | Không, nếu thương mại | ●● prior (nếu phi thương mại) |
| *Bổ sung:* ICPC-3 | Phân loại chăm sóc ban đầu, mã hóa được cả lý do khám | — | Browser, coding tool | CHƯA XÁC MINH | CHƯA XÁC MINH | ●? |

### 2.2 Tài liệu tham khảo lâm sàng và cho người bệnh

| Nguồn | Nội dung | Phạm vi | Truy cập | Giấy phép | Thương mại? | Phù hợp |
|---|---|---|---|---|---|---|
| MedlinePlus (NLM) | Tóm tắt chủ đề sức khỏe cho người dân | 1.017 chủ đề EN + 1.016 ES (XML ngày 2026-10-23) | XML hằng ngày; Web Service ≤85 req/phút/IP | Phần NLM: public domain; A.D.A.M., ASHP: có bản quyền | Có (phần public domain) | ●●● |
| NHS website / Content API v2 | Conditions, Symptoms, Medicines A–Z… | UK (England) | Web; API miễn phí, cần tài khoản | OGL v3.0, cộng điều khoản site và syndication | Có (theo OGL) | ●● (bối cảnh UK) |
| NICE CKS | Tóm tắt lâm sàng cho chăm sóc ban đầu | UK | Chỉ mở cho UK; nơi khác thuê bao qua Agilio | Độc quyền | Trả phí | ✕ |
| MSD Manuals (bản tiếng Việt) | Cẩm nang cho chuyên gia và người bệnh, có tiếng Việt | Hàng nghìn chủ đề | Web | © Merck, all rights reserved | Phải xin phép | ●● đối chiếu thuật ngữ |
| StatPearls | Bài tổng quan lâm sàng | Rất lớn | NCBI Bookshelf | CC BY-NC-ND 4.0 (**CHƯA XÁC MINH**) | Không | ●● tra dữ kiện |
| CDC | Trang thông tin bệnh | Mỹ | Web | Phần lớn public domain | Có | ●● |
| WHO (fact sheets, ấn phẩm) | Tờ thông tin, hướng dẫn | Toàn cầu | Web, IRIS | Web: phi thương mại; ấn phẩm: CC BY-NC-SA 3.0 IGO | Phải xin phép | ●● (bệnh nhiệt đới) |
| JAMA Rational Clinical Examination | LR của triệu chứng và dấu hiệu | Loạt bài từ 1992, kèm sách | Thuê bao | © AMA / McGraw-Hill | Dùng dữ kiện, có trích dẫn | ●●● nguồn LR |
| McGee, *Evidence-Based Physical Diagnosis* | LR, chủ yếu cho dấu hiệu thực thể | Ấn bản 5 (2021) | Sách | © Elsevier | Dùng dữ kiện, có trích dẫn | ●● |
| SR / Cochrane DTA | Sens/spec có khoảng tin cậy | Theo từng chủ đề | Web | Tùy bài (CC BY, CC BY-NC…) | Dùng dữ kiện | ●●● |

### 2.3 Engine thương mại

| Nguồn | Nội dung | Phạm vi | Truy cập | Giấy phép | Thương mại? | Phù hợp |
|---|---|---|---|---|---|---|
| Infermedica | API triage và chẩn đoán dựa trên xác suất | ~900 bệnh người lớn; 20 ngôn ngữ, không có tiếng Việt | API trả phí, phải liên hệ sales | Độc quyền | Trả phí | ● benchmark |
| Isabel | DDx Companion, Self-Triage, API | 14 ngôn ngữ, không có tiếng Việt | Thuê bao; symptom checker công khai cho đăng ký miễn phí | Độc quyền | Trả phí | ● benchmark |
| EndlessMedical | API chẩn đoán phân biệt | >180 bệnh, >830 đặc điểm | Có gói miễn phí và gói trả phí | Độc quyền | — | ● |
| ApiMedic | API symptom checker | CHƯA XÁC MINH | Không kết nối được ngày 2026-10-24 | CHƯA XÁC MINH | — | ? |

### 2.4 Công cụ tự đánh giá

| Công cụ | Giấy phép | Bản tiếng Việt / thẩm định | Phù hợp |
|---|---|---|---|
| PHQ-9, PHQ-2, GAD-7 (GAD-2) | Public domain, không cần xin phép (đã xác minh) | PHQ-9: Nguyen 2016 (chỉ psychometric). Còn lại: CHƯA XÁC MINH | ●●● |
| AUDIT-C | CHƯA XÁC MINH | Có nghiên cứu AUDIT đầy đủ ở nông thôn Việt Nam (Giang 2005) | ●● |
| STOP-Bang | CHƯA XÁC MINH (stopbang.ca đang bảo trì) | CHƯA XÁC MINH | ● (cần số đo) |
| FINDRISC | CHƯA XÁC MINH | CHƯA XÁC MINH | ●● (cần ngưỡng cho người châu Á) |
| Centor / McIsaac | Thang điểm là dữ kiện; không thấy cần license | CHƯA XÁC MINH | ● (cần khám) |
| EPDS | CHƯA XÁC MINH | Tran 2011 (miền Bắc Việt Nam) | ●● |

### 2.5 Tài nguyên đánh giá

| Bộ | Quy mô | Có công bố ca? | Giấy phép | Phù hợp |
|---|---|---|---|---|
| Semigran 2015 (BMJ) | 45 ca, 23 symptom checker | Có, trong phụ lục | Bài báo CC BY-NC 4.0 | ●● |
| Gilbert 2020 (BMJ Open) | 200 ca, 8 app, 7 GP | **Không** | Bài báo CC BY-NC 4.0 | ● (chỉ tham khảo kết quả) |
| Hill 2020 (MJA) | 48 ca, 36 symptom checker | Có, trong Supporting Information | Bản quyền MJA/Wiley | ●● (dùng nội bộ) |
| Schmieding 2022 (JMIR) | Chạy lại 45 ca Semigran trên 22 app | Dùng lại ca của Semigran | CC BY 4.0 | ●● |
| Levine & Mehrotra 2021 (JAMA Netw Open) | 48 ca | Có, ở eTable 1 | CC BY | ●●● |
| Ceney 2021 (PLOS ONE) | 50 ca, 12 công cụ | Có thể có trong S1 Appendix (CHƯA XÁC MINH) | CC BY 4.0 | ●● |
| Kopka 2024 RepVig (Sci Rep) | 45 ca "đại diện" | Zenodo chỉ có ID ca và nhãn triage | CC BY 4.0 (cả bài báo và dữ liệu) | ●● (phương pháp) |
| DDXPlus test | 134.529 BN tổng hợp | Có | CC BY 4.0 | ●● regression |

---

## 3. Chi tiết từng nguồn

### 3.1 Tri thức cấu trúc và bộ dữ liệu

#### 3.1.1 DDXPlus

**Hồ sơ.** Fansi Tchango A, Goel R, Wen Z, Martel J, Ghosn J. *DDXPlus: A New Dataset For Automatic Medical Diagnosis*. NeurIPS 2022, Datasets & Benchmarks Track; arXiv 2205.09148, bản v3 ngày 13/10/2022, CC BY 4.0 [1].
- Repo `mila-iqia/ddxplus`: lần push gần nhất 2026-10-01; GitHub không phát hiện file license. Bài báo nói license của code nằm trong phần supplementary [1][2].
- Dữ liệu trên figshare, cả hai bản đều CC BY 4.0 [3][4]:
  - Bản tiếng Pháp gốc: 20043374, v15, ngày 2026-03-11.
  - Bản tiếng Anh: 22687585, v2, ngày 2026-03-09.
- Đợt cập nhật năm 2026 thay `release_conditions.json` bằng tệp mới (ID 62561569 và 62657140). Nội dung thay đổi không được mô tả.

**Các tệp.**
- `release_evidences.json`: các trường `name`, `code_question` (nhóm câu hỏi phân cấp), `question_fr`/`question_en`, `is_antecedent`, `data_type` (B/C/M), `default_value`, `possible-values`, `value_meaning`.
- `release_conditions.json`: tên bệnh FR/EN, `icd10-id`, `severity` 1–5 (số càng nhỏ càng nặng), `symptoms`, `antecedents`.
- `release_{train,validate,test}_patients.zip` (CSV): các cột `AGE, SEX, PATHOLOGY, EVIDENCES, INITIAL_EVIDENCE, DIFFERENTIAL_DIAGNOSIS`. Cột cuối là danh sách cặp [bệnh, xác suất].
- Kèm README [3].

**Có phát hành xác suất không? Không, ở mức bệnh.**
- Trong `release_conditions.json`, mỗi triệu chứng hoặc tiền sử chỉ là `{}` (đã tải bản EN và kiểm tra ngày 2026-10-24).
- Xác suất chỉ xuất hiện trong DDx của từng BN, do một "commercial rule-based AD system" sinh ra.
- KB gốc được mô tả là "proprietary": tổng hợp từ hơn 20.000 bài báo và được bác sĩ review. KB có incidence/prevalence theo tuổi, giới và vùng, cùng p(s|d, tuổi, giới) cho 440 bệnh. KB này không được phát hành [1].

**Cách sinh dữ liệu** [1]:
- Dùng Synthea với mô hình p(tuổi, giới, vùng) · p(d | tuổi, giới, vùng) · p(E | d, tuổi, giới).
- Giả định evidence **độc lập có điều kiện** khi biết bệnh, tuổi và giới.
- Phân bố dân số theo điều tra dân số bang New York 2010–2015; vùng mặc định là Bắc Mỹ; xác suất "có đi du lịch" là 0,25.
- Cường độ đau lấy ngẫu nhiên phân bố đều trong khoảng ±3 quanh giá trị của KB.
- BN bị **loại** nếu bệnh thật không có trong DDx của hệ chẩn đoán thương mại.
- 8/49 bệnh thiếu incidence; tác giả gọi đây là "one of the major limitations".

**Quy mô.**
- 223 evidence: 110 triệu chứng (96 nhị phân, 9 phân loại, 5 đa lựa chọn) và 113 tiền sử (112 nhị phân, 1 phân loại). Trung bình 13,56 evidence mỗi BN.
- Khoảng 1,3 triệu BN, chia 80/10/10. Đếm trực tiếp: test 134.529, validate 132.448.

**Danh sách 49 bệnh** (tên tiếng Anh, mã đúng như trong tệp): Spontaneous pneumothorax (J93) · Cluster headache (g44.009) · Boerhaave (K22.3) · Spontaneous rib fracture (S22.9) · GERD (K21) · HIV (initial infection) (B20) · Anemia (D64.9) · Viral pharyngitis (J02.9) · Inguinal hernia (K40) · Myasthenia gravis (G70.0) · Whooping cough (A37) · Anaphylaxis (T78.0) · Epiglottitis (J05.1) · Guillain-Barré syndrome (G61.0) · Acute laryngitis (J04.0) · Croup (J05.0) · PSVT (I47.1) · Atrial fibrillation (I48.91) · Bronchiectasis (J47) · Allergic sinusitis (J30) · Chagas (B57) · Scombroid food poisoning (T61.1) · Myocarditis (I51.4) · Laryngospasm (ghi sai chính tả là "Larygospasm"; J38.5) · Acute dystonic reactions (G24.02) · Localized edema (R60.0) · SLE (M32) · Tuberculosis (a15) · Unstable angina (I20.0) · Stable angina (I20.9) · Ebola (a98.4) · Acute otitis media (H66.90) · Panic attack (f41) · Bronchospasm / acute asthma exacerbation (J45) · Bronchitis (j40) · Acute COPD exacerbation / infection (j44.1) · Pulmonary embolism (i26) · URTI (j06.9) · Influenza (j11.1) · Pneumonia (j17, j18) · Acute rhinosinusitis (j01) · Chronic rhinosinusitis (j32) · Bronchiolitis (j21) · Pulmonary neoplasm (c34) · Possible NSTEMI / STEMI (I21) · Sarcoidosis (d86) · Pancreatic neoplasm (c25) · Acute pulmonary edema (J81.0) · Pericarditis (I30).

**Chất lượng mã.**
- Lẫn mã ICD-10 của WHO với mã ICD-10-CM: G44.009, I48.91, G24.02, H66.90 là mã CM. Chữ hoa/thường cũng không thống nhất.
- "HIV (initial infection)" được gán B20. ICD-10 của WHO dùng B23.0 cho hội chứng nhiễm HIV cấp.
- Nhãn tiếng Anh "Allergic sinusitis" không khớp với nhãn tiếng Pháp "Rhinite allergique" và mã J30.
- Vì vậy phải ánh xạ lại toàn bộ sang danh mục ICD-10 của BYT.

**Phù hợp với doctor-v.**
1. **Mẫu thiết kế câu hỏi:** evidence phân cấp, phân loại và đa lựa chọn; vị trí, tính chất và cường độ đau; khởi phát. CC BY cho phép dịch nếu ghi công và nêu rõ thay đổi.
2. **Benchmark và regression** cho engine trên 49 bệnh, phần lớn thuộc nhóm hô hấp, tim mạch và cấp cứu.
3. Tần suất ước lượng từ BN tổng hợp chỉ xếp bậc E.
4. **Không dùng làm prior:** dịch tễ là của Bắc Mỹ, có cả Ebola và Chagas.

Tác giả lưu ý dữ liệu "was built for acute care and biased toward high mortality and morbidity pathologies" và không nên đưa vào hệ thống thực tế trước khi được đánh giá nghiêm ngặt [1][3].

#### 3.1.2 Human Phenotype Ontology (HPO) và `phenotype.hpoa`

**Hồ sơ.** Tệp `phenotype.hpoa` bản 2026-09-02, ứng với HPO release v2026-09-01. Header ghi: *"HPO annotations for rare diseases [8478: OMIM; 47: DECIPHER; 4357 ORPHANET]"* [5].

**Các cột.** `database_id, disease_name, qualifier (NOT), hpo_id, reference (PMID/OMIM/ORPHA), evidence (IEA/PCS/TAS), onset, frequency, sex, modifier, aspect (P/I/C/M), biocuration`.

**Tần suất** (đếm trực tiếp trên aspect = P):
- Tổng cộng 268.906 chú thích trên 12.867 bệnh.
- 119.247 chú thích (44,3%) dùng lớp tần suất HPO.
- 96.928 (36,0%) ở dạng **n/m** (số ca có triệu chứng / số ca khảo sát), thường là chuỗi ca nhỏ.
- 102 ở dạng %.
- 52.629 (19,6%) để trống.

**Định nghĩa lớp tần suất** (theo hp.obo):

| ID | Lớp | Tần suất |
|---|---|---|
| HP:0040280 | Obligate | 100% |
| HP:0040281 | Very frequent | 80–99% |
| HP:0040282 | Frequent | 30–79% |
| HP:0040283 | Occasional | 5–29% |
| HP:0040284 | Very rare | 1–4% |
| HP:0040285 | Excluded | 0% |

**Giấy phép: không phải CC.**
- hp.obo khai báo `terms:license https://hpo.jax.org/app/license`. Trang này không mở được bằng công cụ tự động ngày 2026-10-24 (SPA, trả 404).
- Theo các bản trích lại (ART-DECOR, Leicester LAMP), được dùng tự do với ba điều kiện:
  1. Ghi công và trích dẫn HPO Consortium.
  2. Hiển thị ngày hoặc phiên bản của tệp HPO khi công bố.
  3. Không sửa nội dung hay quan hệ logic của tệp HPO.

  Ngoài ra có yêu cầu đặt câu ghi nhận và logo HPO.
- Câu chữ chính thức và điều khoản về dùng thương mại: **CHƯA XÁC MINH trực tiếp**.
- reusabledata.org (nguồn thứ cấp) xếp HPO vào loại "custom/restrictive" [6].

**Bản dịch.** Repo `hpo-translations` có các tệp babelon cho ar, cs, de, es, fr, it, ja, nl, pt, tr, zh và vài mã khác. **Không có tiếng Việt** [7].

**Phù hợp.**
- Đây là nguồn mở tốt nhất cho tần suất triệu chứng ở bệnh hiếm, vì có PMID và n/m.
- Dùng cho mô-đun "nghi bệnh hiếm, cần đi chuyên khoa" và để tham chiếu ID kiểu hình.
- Không phù hợp cho bệnh thường gặp.
- Phải hiển thị phiên bản HPO trong màn hình "Nguồn dữ liệu".

#### 3.1.3 Orphanet / Orphadata

**Hồ sơ.** Sản phẩm "Phenotypes associated with rare disorders" của INSERM/Orphanet [8]:
- Mô tả: "Orphanet rare diseases are annotated with Human Phenotype Ontology (HPO) terms".
- Bản Orphanet Knowledge base tháng 07/2026, tệp ghi ngày 23/6/2026.
- Cột "Number" ghi 4.357, khớp với 4.357 bệnh ORPHA trong HPO.
- XML có 7 ngôn ngữ: EN, FR, ES, NL, PT, DE, IT. Có API.
- Sản phẩm dịch tễ (prevalence/incidence) cũng theo CC BY 4.0 [8].

**Giấy phép** [9]:
- Orphadata Science dùng **CC BY 4.0, cho phép thương mại**.
- Phải trích dẫn "Orphadata Science: Free access data from Orphanet. © INSERM 1999", kèm link và ngày của phiên bản.
- Phải nêu rõ nếu đã thay đổi dữ liệu và không được ngụ ý Orphanet bảo trợ.
- **Nếu cung cấp công cụ LLM/AI cho bên thứ ba có dùng dữ liệu này**, phải nêu ba điều: đã dùng dữ liệu Orphanet/Orphadata; kết quả có thể không phản ánh chính xác dữ liệu; Orphanet không chịu trách nhiệm về chất lượng kết quả. Engine của doctor-v nên coi là thuộc diện này.
- Các "Orphadata Products" khác phải ký DTA hoặc hợp đồng dịch vụ.

**Phù hợp.** Tần suất ở dạng lớp (giống lớp HPO). Nên ưu tiên Orphadata hơn HPO khi cần giấy phép rõ ràng (CC BY) cho dữ liệu bệnh hiếm.

#### 3.1.4 Disease Ontology, MONDO, Symptom Ontology

- **Disease Ontology (DO)** [10]: bản v2026-09-30 có 12.335 lớp bệnh, 10.065 lớp có định nghĩa (81,6%). Có bản dịch tiếng Tây Ban Nha, không có tiếng Việt. Phân loại theo căn nguyên, có cross-reference sang các hệ mã khác (không kiểm đếm). Giấy phép CC0.
- **MONDO** [11]: bản v2026-10-06, phát hành khoảng hằng tháng. Trang chủ ghi 29.315 bệnh, gồm 23.214 bệnh ở người và 6.100 không phải ở người. Có mapping tương đương 1:1 với OMIM, Orphanet, EFO, DOID. Giấy phép CC BY 4.0. Số lượng xref sang ICD: CHƯA XÁC MINH.
- **Symptom Ontology (SYMP)** [12]: bản v2026-07-30 có 895 lớp, 424 lớp có định nghĩa (47,4%). Giấy phép CC0. Không có tần suất; nhãn là thuật ngữ lâm sàng tiếng Anh.

**Phù hợp.**
- Dùng **MONDO ID làm khóa quốc tế** cho mỗi bệnh trong KB, đi kèm mã ICD-10 của BYT và DOID. Cách này giúp nối với HPO, Orphanet và DO. Cả CC0 và CC BY đều không kéo theo ràng buộc share-alike.
- SYMP chỉ dùng để tham khảo cách phân nhóm triệu chứng. Câu hỏi cho người dùng phải tự viết bằng tiếng Việt đời thường.

#### 3.1.5 Wikidata, thuộc tính P780 ("symptoms and signs")

Kết quả truy vấn SPARQL ngày 2026-10-24 [13]:
- **2.004** item có P780, với **11.790** phát biểu; 9.171 phát biểu có ít nhất một tham chiếu.
- Tham chiếu dạng URL: 6.939 phát biểu dẫn tới cdc.gov. Trong đó:
  - 5.452 dẫn tới *NIOSH Pocket Guide to Chemical Hazards*.
  - 1.304 dẫn tới NIOSH ERSHDB.
  - 169 dẫn tới NIOSH ICSC.

  Như vậy **khoảng 59% phát biểu là triệu chứng do phơi nhiễm hóa chất**, thuộc tối đa khoảng 705 item.
- Các nguồn khác: Mayo Clinic 47 phát biểu, NCBI 37, WHO 25, NHS 17; 742 phát biểu tham chiếu DOID.
- Gần như không có qualifier tần suất (P1114 "quantity" chỉ có 18 phát biểu).
- Dữ liệu cấu trúc theo CC0.

**Phù hợp: thấp.** Chỉ dùng để gợi ý liên kết cho bác sĩ kiểm tra. Nhãn tiếng Việt, nếu có, chỉ để tham khảo.

#### 3.1.6 Columbia "Disease-Symptom Knowledge Database"

- **Nội dung:** bảng gồm bệnh (mã UMLS), số tóm tắt ra viện có nhắc tới bệnh, và các triệu chứng xếp theo độ mạnh liên kết [14].
- **Nguồn:** tóm tắt ra viện của BN NewYork-Presbyterian năm 2004, trích xuất bằng MedLEE. Chỉ gồm 150 bệnh phổ biến nhất.
- **Hạn chế của trang:** không định nghĩa thang đo độ mạnh, không nêu giấy phép, không ghi ngày cập nhật.
- **Bài phương pháp:** Wang X, Chused A, Elhadad N, Friedman C, Markatou M. AMIA Annu Symp Proc 2008:783–7 (PMC2656103). Mốc "2004" trong đề bài là năm của dữ liệu, không phải năm của bài báo.
- **Phù hợp: thấp.** Đây là BN nội trú, số liệu là độ liên kết chứ không phải P(s|d), và không có giấy phép. Nhiều notebook Kaggle lấy dữ liệu từ nguồn này.

#### 3.1.7 Symcat

- **Lịch sử:** do AHEAD Research (Craig Monsen, David Do, sinh viên Y Johns Hopkins) xây dựng, dùng dữ liệu của CDC (theo MedCityNews 2012, nguồn thứ cấp) [15].
- **Tình trạng ngày 2026-10-24:** `http://www.symcat.com` trả HTTP 503; HTTPS không phản hồi.
- **Dữ liệu đang lưu hành:** bộ dùng trong các nghiên cứu học tăng cường (801 bệnh, 474 triệu chứng, theo nguồn thứ cấp) là bản cào trên GitHub, ví dụ `teliov/SymCat-to-synthea`. Repo này không có license và không nêu cách lấy dữ liệu [15].
- **Đánh giá: tránh.** Dữ liệu không có giấy phép, không kiểm được nguồn gốc, và phản ánh dịch tễ Mỹ khoảng năm 2010. Nếu cần loại dữ liệu này, nên dùng thẳng NAMCS/NHAMCS (public domain, xem 3.1.12).

#### 3.1.8 Các bộ disease–symptom phổ biến trên Kaggle và HuggingFace

- **`itachi9604/disease-symptom-description-dataset`** (Pranay Patil) [16]:
  - Giấy phép CC BY-SA 4.0; cập nhật lần cuối 2020-05-24; 68.118 lượt tải.
  - Tự ghi chú: *"The data in this CSV sheet is for reference and training purposes only, and actual data may vary."*
  - Gồm bệnh, triệu chứng, "precautions" và trọng số triệu chứng tự đặt.
  - Thường được mô tả là 41 bệnh với 4.920 dòng (nguồn thứ cấp).
- **`kaushil268/disease-prediction-using-machine-learning`** [16]:
  - Giấy phép "Database: Open Database, Contents: Database Contents" (ODbL/DbCL); cập nhật 2020-05-15.
  - 132 triệu chứng nhị phân, 42 bệnh; không nêu nguồn gốc.
- **HF `gretelai/symptom_to_diagnosis`** [16]: Apache-2.0; 1.065 câu mô tả triệu chứng gán 22 chẩn đoán; sửa lần cuối 2023-05-24; metadata về kích thước tự mâu thuẫn.

**Đánh giá.** Không có tác giả lâm sàng và không mô tả phương pháp thu thập. Không có tần suất thật: chỉ là ma trận nhị phân hoặc trọng số tự đặt. Phạm vi rất hẹp. Giấy phép CC BY-SA và ODbL có điều khoản share-alike, nên nếu trộn vào KB có thể buộc cả KB phải chia sẻ theo cùng giấy phép. **Không dùng.**

#### 3.1.9 SNOMED CT

- **Thành viên** (snomed.org/members, ngày 2026-10-24): 54 thành viên, **không có Việt Nam**. Các thành viên ASEAN là Brunei, Indonesia, Malaysia, Singapore và Thái Lan [17].
- **Điều kiện cho nước không phải thành viên** [17]:
  - Phải xin license qua MLDS và nộp *Statement of Usage* hằng năm.
  - "Charges may apply". Phí tùy mức sử dụng và phân loại thu nhập của World Bank.
  - Triển khai dạng web app hoặc browser "will require special permission and fees".
  - "Fee exemptions may be applied".
- **Global Patient Set (GPS)** [17]:
  - Từ ngày 11/3/2026, GPS mở rộng ra toàn bộ concept của International Edition: SCTID, FSN, preferred term tiếng Anh và trạng thái active/inactive.
  - Không gồm quan hệ, hierarchy, refset, map, extension hay bản dịch.
  - Giấy phép **CC BY-ND 4.0**. Các hướng dẫn GPS 2022–2024 ghi CC BY 4.0, mâu thuẫn với thông báo 2026; báo cáo này theo thông báo 2026.
- **Phù hợp: thấp.** Engine không cần SNOMED. Nếu sau này cần liên thông, có thể lưu SCTID lấy từ GPS. Riêng việc dịch nhãn sang tiếng Việt rồi phân phối có thể vướng điều khoản ND, cần tư vấn.

#### 3.1.10 UMLS

- **Điều khoản chính** của UMLS Metathesaurus License (NLM) [18]:
  - Miễn phí; phải gửi báo cáo sử dụng hằng năm.
  - Các nguồn bị hạn chế theo Category 1–4. Ví dụ: Cat. 3 chỉ cho dùng nội bộ để nghiên cứu và phát triển sản phẩm; Cat. 4 chỉ cho dùng tại Mỹ.
  - SNOMED CT theo Appendix 2.
  - Chỉ được phân phối như một phần không tách rời của ứng dụng.
- **Hạn chế của một số nguồn liên quan:**
  - ICD-10 (WHO) trong UMLS thuộc Category 3.
  - ICD-10-CM thuộc Cat. 4 với người dùng ở Mỹ và Cat. 3 với người dùng ngoài Mỹ.
- **Phù hợp.** Chỉ dùng nội bộ để tra cứu và ánh xạ, mỗi người dùng tự có tài khoản UTS. **Không đóng gói nội dung UMLS vào PWA.**

#### 3.1.11 ICD-10 và ICD-11

**ICD-11** [19][20]:
- **Giấy phép:** CC BY-ND 3.0 IGO, theo trang license của ICD API.
- **Điều khoản chính** (theo bản PDF):
  - Nhúng vào phần mềm không bị coi là "adaptation", với điều kiện giữ nguyên mã, tiêu đề và URI.
  - Trường bổ sung phải ghi rõ là "additions that do not originate from WHO".
  - Bản dịch "subject to a separate written agreement from WHO".
  - Giấy phép phần mềm là royalty-free; không được bán Classifications Software như một sản phẩm độc lập.
  - Không được dùng để phát triển một tiêu chuẩn khác.
- **Dùng thương mại:** trang bản quyền của WHO viết rằng các bảng phân loại "can be used for commercial and non-commercial purposes", nếu không chỉnh sửa mã và trích dẫn đúng (xác minh qua chỉ mục tìm kiếm).
- **API:** REST, cần đăng ký, trang không nêu phí. Có thể chạy cục bộ bằng Docker (hỗ trợ ARM), Windows service hoặc systemd [19].
- **Ngôn ngữ của MMS 2026-01:** Arabic, Chinese, Czech, English, French, German (prerelease), Kazakh, Latin (chỉ có tiêu đề), Portuguese, Russian, Slovak, Spanish, Swedish, Turkish, Uzbek. **Không có tiếng Việt**, cả trong danh sách lẫn trong bảng mã ngôn ngữ [19].

**ICD-10 của WHO** [20]:
- Bản 2019 ghi CC BY-ND 3.0 IGO. Mapping, crosslink và bản dịch không thuộc phạm vi giấy phép này mà cần thỏa thuận riêng.
- FAQ cũ của WHO nói giấy phép thương mại là không độc quyền, có thời hạn, và không được sửa hay dịch. FAQ này có thể đã lỗi thời và mâu thuẫn với CC BY-ND.

**Việt Nam** [21]:
- **Thông tư 06/2026/TT-BYT** "Quy định về mã hóa bệnh tật, nguyên nhân tử vong theo ICD-10":
  - Ký ngày 02/4/2026; hiệu lực từ 01/7/2026, riêng hai khoản có hiệu lực từ 01/6/2026.
  - Phụ lục là danh mục mã dạng Excel, 29 cột. Cột 24–29 là quy tắc sử dụng, ví dụ: không dùng làm bệnh chính, chỉ dùng cho nguyên nhân tử vong, chủ yếu cho một giới.
  - Thông tin lấy từ LuatVietnam, chưa đối chiếu Công báo.
- Quyết định về ICD-10 năm 2020 của BYT được các nguồn thứ cấp ghi số hiệu khác nhau (4400 và 4469/QĐ-BYT): **CHƯA XÁC MINH**.
- Cổng tra cứu "ICD-Vietnam" (icd.kcb.vn) đang hoạt động.

**Phù hợp.**
- Dùng **mã ICD-10 theo danh mục của BYT** làm mã hiển thị và mã chuẩn.
- Lưu thêm URI của ICD-11 (tùy chọn) để chuẩn bị cho tương lai, nhưng không tự dịch ICD-11 rồi phân phối.
- Chương XVIII của ICD-10 (R00–R99) và chương 21 của ICD-11 có mã cho triệu chứng.

#### 3.1.12 Nguồn bổ sung đáng biết

- **DXplain** (MGH Laboratory of Computer Science) [37]:
  - Hơn 2.400 bệnh, hơn 5.000 finding (triệu chứng, dấu hiệu, xét nghiệm…), hơn 230.000 điểm dữ liệu.
  - Mỗi cặp bệnh–finding có hai giá trị: tần suất và mức gợi ý bệnh. Mỗi finding có điểm importance 1–5; mỗi bệnh có hạng prevalence từ very common tới very rare.
  - Chỉ cấp license cho tổ chức (bệnh viện, trường Y). Có bản dùng thử miễn phí 1 tháng; phí năm tùy tổ chức.
  - Không lấy dữ liệu ra được. Có thể dùng làm benchmark nếu hợp tác với một trường Y.
- **NAMCS/NHAMCS** (CDC/NCHS) [38]:
  - Khảo sát lượt khám ngoại trú và cấp cứu ở Mỹ, gồm lý do khám và chẩn đoán.
  - Trang liệt kê NAMCS 2018–2025; có dữ liệu public-use cho cấu phần Health Center năm 2023. Trang cập nhật ngày 28/8/2026.
  - Là dữ liệu của chính phủ Mỹ. Có thể ước lượng P(chẩn đoán | lý do khám) cho ngoại trú ở Mỹ, nhưng chỉ nên tham khảo cấu trúc, không chuyển thẳng sang Việt Nam.
- **IHME GBD** [39]:
  - Theo "Free-of-Charge Non-Commercial User Agreement", người dùng phải cam kết không phải tổ chức vì lợi nhuận và không dùng thương mại. Định nghĩa: "commercial use means any use that supports a commercial initiative, commercial advantage, financial transaction, or monetary compensation".
  - UW thu phí cho dùng thương mại; không được phân phối lại dữ liệu ngoài phạm vi cho phép.
  - Chỉ dùng làm prior nếu doctor-v phi thương mại, hoặc phải mua license.
- **ICPC-3** (WONCA ICPC-3 Foundation) [40]:
  - Phân loại cho chăm sóc ban đầu, mã hóa được cả "lý do khám" và triệu chứng; có coding tool và Browser API.
  - Giấy phép và bản tiếng Việt: CHƯA XÁC MINH (trang render bằng JavaScript, không đọc được mục "Licensing").
- **Hetionet / HSDN** [55][56]:
  - Phần nội dung gốc của Hetionet theo CC0; các nguồn tích hợp có giấy phép riêng; lần push gần nhất 2023-04.
  - Cạnh Disease–presents–Symptom lấy từ đồng xuất hiện MeSH, dựa trên Zhou và cộng sự, *Nat Commun* 2014, "Human symptoms–disease network".
  - Đây là đồng xuất hiện trong tài liệu, không phải tần suất lâm sàng. Giấy phép dữ liệu HSDN: CHƯA XÁC MINH.

### 3.2 Tài liệu tham khảo lâm sàng và cho người bệnh

#### 3.2.1 MedlinePlus (NLM)

**Nội dung và giấy phép** [22]:
- **Public domain** (cả EN và ES): trang chủ, tóm tắt health topic, thông tin xét nghiệm, tóm tắt Genetics, hình có watermark NLM, công thức nấu ăn, video MedlinePlus và các tutorial.
- **Có bản quyền:** A.D.A.M. Medical Encyclopedia (cả bài và video), chuyên luận thuốc của ASHP, và hình không có watermark NLM.
- **Ghi công:** "Courtesy of MedlinePlus from the National Library of Medicine" hoặc "Source: MedlinePlus, National Library of Medicine".
- Muốn nhúng nội dung có bản quyền vào EHR, patient portal hay hệ thống health IT thì phải có license trực tiếp từ nhà cung cấp.

**Truy cập.**
- **Web Service:** trả về XML, không cần đăng ký, tối đa 85 request/phút/IP, khuyến nghị cache 12–24 giờ, không dùng logo và không ngụ ý được bảo trợ.
- **XML toàn bộ chủ đề:** tạo mới hằng ngày. Bản 2026-10-23 có 2.033 bản ghi, gồm 1.017 EN và 1.016 ES.

**Tài liệu tiếng Việt.** Trang "Vietnamese" liên kết tài liệu của nhiều tổ chức khác (CDC, Health Information Translations, American Cancer Society, NIAMS, FDA…). Bản quyền thuộc từng tổ chức; chưa kiểm từng tài liệu.

**Phù hợp: cao.** Là mẫu tham chiếu về cấu trúc và độ dễ đọc. Phần public domain có thể chuyển thể (vẫn ghi công), nhưng nên viết lại cho phù hợp bối cảnh Việt Nam.

#### 3.2.2 NHS website và NHS Website Content API

**Điều khoản của nhs.uk** [23]:
- **Giấy phép:** nội dung "released free-of-charge under the current version of the Open Government Licence" và được dùng "for any purpose, including commercially".
- **Loại trừ:** logo, hình ảnh, nhãn hiệu, dữ liệu của bên thứ ba, medical devices.
- **Bản sao giữ nguyên:**
  - Ghi "Information from the NHS website", thêm "as at DDMMYY" nếu không làm mới.
  - Làm mới ít nhất 7 ngày một lần; khuyến nghị mỗi 24 giờ.
- **Bản chuyển thể:**
  - Sửa nội dung, tách khỏi ngữ cảnh hoặc **dịch** đều tính là adaptation.
  - Phải ghi "Contains public sector information licensed under the Open Government Licence v3.0" và **không được** ghi NHS là nguồn.
  - Nội dung đã chuyển thể có thể mất phần thẩm định lâm sàng; rủi ro thuộc về người dùng.
- Trang ghi "last reviewed" ngày 12/01/2021, hạn review tiếp theo 12/01/2024 (đã quá hạn).
- Website hướng tới người dân ở England. Điều khoản không đề cập việc dùng ngoài UK.

**API.**
- v1 đã ngừng; v2 "in production" (trang sửa ngày 06/03/2026).
- Nội dung gồm Conditions, Symptoms, Tests and treatments, Medicines A–Z, Mental health, Live Well…
- Miễn phí, nhưng cần tài khoản developer portal và phải đồng ý điều khoản syndication. Không đọc được nội dung các điều khoản đó: trang gốc chặn truy cập tự động, phần mô tả được đọc qua bản phản chiếu `nhsd-proxy.openprescribing.net`.
- Việc dùng API ngoài UK: **CHƯA XÁC MINH**.

**Phù hợp: trung bình–cao.** Tốt để tham khảo cách viết hướng dẫn "khi nào cần đi khám, khi nào cấp cứu". Lộ trình chăm sóc của NHS (GP, 111, A&E) không áp dụng cho Việt Nam. Không nên dịch nguyên văn.

#### 3.2.3 NICE CKS

- Chỉ dành cho "users in the UK, Crown Dependencies and British Overseas Territories" [24].
- Nội dung do Clarity Informatics (Agilio Software | Primary Care) sản xuất. Ngoài UK phải thuê bao qua Agilio/Prodigy.
- Open content licence của NICE, kể cả mẫu đơn quốc tế, không bao gồm CKS. Muốn dùng API của CKS phải liên hệ Agilio. Dùng cho mục đích thương mại hoặc tổ chức cần license.
- Các thông tin trên xác minh qua chỉ mục tìm kiếm vì nice.org.uk chặn truy cập tự động.
- **Loại.**

#### 3.2.4 MSD Manuals (Merck Manuals)

- **Bản tiếng Việt:** msdmanuals.com/vi đang hoạt động, cho chọn bản Chuyên gia, Người tiêu dùng hoặc Thú y [25]. Ngày ra mắt bản tiếng Việt: CHƯA XÁC MINH.
- **Bản quyền:** footer ghi "Copyright© 2026 Merck & Co., Inc., Rahway, NJ, USA and its affiliates. All rights reserved."
- **Điều khoản:** điều khoản chung của MSD ghi "may not distribute, modify, transmit, reuse, repost, or use the content … for public or commercial purposes … without the written permission of MSD" (xác minh qua chỉ mục tìm kiếm; trang điều khoản của msdmanuals render bằng JavaScript nên không đọc được). Muốn dùng lại phải xin phép qua form Permissions.
- Không có API.
- **Phù hợp.** Bác sĩ dùng để đối chiếu thuật ngữ tiếng Việt và kiểm tra dữ kiện. Không sao chép, không dịch lại.

#### 3.2.5 StatPearls

- Đăng trên NCBI Bookshelf (NBK430685), do StatPearls Publishing xuất bản [26].
- Giấy phép theo hiểu biết là CC BY-NC-ND 4.0: **CHƯA XÁC MINH trực tiếp**, vì NCBI chặn bằng reCAPTCHA và bộ lọc lạm dụng trong phiên này.
- Nếu đúng là NC + ND thì không được dịch, chuyển thể hay dùng thương mại; chỉ trích dữ kiện kèm trích dẫn.
- Bài do bác sĩ viết nhưng độ sâu không đồng đều. Nên dùng để định hướng tới nguồn gốc.

#### 3.2.6 CDC

Theo trang "Use of Agency Materials", review lần cuối 01/5/2023 [27]:
- Phần lớn nội dung CDC/ATSDR không có bản quyền và được dùng tự do.
- **Ngoại lệ:** tài liệu của nhà thầu hoặc bên thứ ba, tài liệu của chính quyền bang, ảnh có license riêng.
- **Điều kiện khi tái bản:** ghi công (ví dụ "Source: CDC"); có tuyên bố rằng việc dùng không ngụ ý được bảo trợ; không sửa nội dung thực chất; không dùng logo.
- Trang không đề cập việc dịch.
- **Phù hợp.** Lấy dữ kiện tốt, đặc biệt về bệnh truyền nhiễm.

#### 3.2.7 WHO (fact sheets và ấn phẩm)

- **Ấn phẩm WHO:** CC BY-NC-SA 3.0 IGO; "Permission is required for commercial uses" [20].
- **Nội dung website:** "Reproduction or translation of substantial portions of the web site, or any use other than for educational or other non-commercial purposes, require explicit, prior authorization in writing" (trích qua chỉ mục tìm kiếm; who.int chặn truy cập tự động) [20].
- Fact sheet là một phần website, nên muốn dịch hoặc tái bản phần đáng kể thì phải xin phép.
- **Phù hợp.** Lấy dữ kiện, định nghĩa ca bệnh và dấu hiệu cảnh báo cho bệnh nhiệt đới và bệnh truyền nhiễm; viết lại bằng lời của mình và trích dẫn. Nếu doctor-v là sản phẩm thương mại thì không dùng lại văn bản của WHO.

#### 3.2.8 JAMA "The Rational Clinical Examination" (RCE)

- **Nội dung:** loạt bài trên JAMA, bắt đầu từ Sackett & Rennie, JAMA 1992;267:2650. Mỗi bài dạng "Does this patient have…?" tổng hợp y văn thành LR [28]. Ví dụ đã xác minh DOI: viêm họng liên cầu (Ebell 2000), viêm màng não người lớn (Attia 1999), viêm phổi cộng đồng (Metlay 1997).
- **Sách:** Simel, Rennie, Keitz, *The Rational Clinical Examination: Evidence-Based Clinical Diagnosis*, McGraw-Hill, ISBN 9780071590303 (OpenLibrary ghi năm 2008).
- **Bản quyền:** AMA / McGraw-Hill.
- **Cách dùng dữ kiện.** Sens/spec/LR là dữ kiện khoa học, và trích từng giá trị kèm trích dẫn thường được chấp nhận. Tuy vậy, sao chép hàng loạt bảng có thể vi phạm quyền đối với cách tuyển chọn và trình bày, cũng như quyền cơ sở dữ liệu ở EU. **Cần ý kiến pháp lý theo luật Việt Nam (CHƯA XÁC MINH).**
- **Thực hành an toàn:** lấy giá trị, truy về nghiên cứu gốc, rồi lưu cả PMID/DOI của nghiên cứu gốc lẫn của bài RCE.

#### 3.2.9 McGee, *Evidence-Based Physical Diagnosis*

- Elsevier. Ấn bản 5: ISBN 9780323754835 (OpenLibrary ghi 2021). Ấn bản 4: ISBN 9780323392761 (2017) [29].
- Bảng LR chủ yếu dành cho dấu hiệu khám thực thể. Vì người dùng doctor-v tự khai, app chỉ dùng được phần bệnh sử, triệu chứng và những dấu hiệu người dân tự quan sát được.
- Bản quyền xử lý như với RCE.

#### 3.2.10 Systematic review về độ chính xác chẩn đoán của triệu chứng

Các ví dụ đã xác minh:
- **Struyf và cộng sự, Cochrane 2022** (CD013665.pub3; CC BY-NC) [30]:
  - 42 nghiên cứu tiến cứu, 52.608 người tham gia.
  - Ho: sens 62,4%, spec 45,4%, **LR+ 1,14**. Sốt: sens 37,6%, spec 75,2%.
  - Kết luận: từng triệu chứng riêng lẻ phân biệt rất kém.
- **Aalbers và cộng sự, BMC Med 2011** (CC BY 2.0) [31]:
  - Viêm họng do liên cầu ở người lớn: 21 nghiên cứu, 4.839 BN.
  - LR+ 1,45–2,33; LR− 0,54–0,72. Centor ≥3 có spec 0,82.
- **Wallace và cộng sự, npj Digit Med 2022** (CC BY 4.0), tổng quan về symptom checker [32]:
  - Độ chính xác của chẩn đoán chính 19–37,9%.
  - Độ chính xác triage 48,8–90,1%.

**Hàm ý cho doctor-v.**
- LR phụ thuộc bối cảnh và quần thể (spectrum bias), và được đo **trong nhóm BN có cùng than phiền chính**. Vì vậy nên áp dụng LR theo từng mô-đun than phiền chính.
- Nhân nhiều LR với nhau dưới giả định độc lập có điều kiện là nguồn sai số lớn nhất. Cần hiệu chỉnh (calibration) lại bằng vignette.

### 3.3 Engine thương mại (chỉ thông tin công khai)

- **Infermedica** [33]:
  - **Sản phẩm:** "Clinical AI Triage" và Infermedica API. Platform MGP được xếp **Class IIb theo EU MDR**, đăng ký với MHRA, đạt ISO 13485:2016. Tự công bố hơn 30 triệu lượt kiểm tra ở hơn 30 nước.
  - **Cách xây KB** (theo trang Medical Content):
    - Biên tập viên y khoa thu thập bằng chứng từ y văn và nhập dữ liệu xác suất, mỗi mục có tham chiếu; sau đó qua peer review.
    - Ca kiểm thử lấy từ case report; một ca đạt nếu bệnh đúng nằm trong top 3 hoặc top 5. Có regression test.
    - Tự công bố "condition accuracy" 96% trên bộ ca nội bộ (cập nhật 10/2025).
    - Mỗi ngôn ngữ do người bản ngữ có đào tạo y khoa dịch, mất 120–160 giờ.
  - **Ngôn ngữ:** trang Medical Content liệt kê Arabic, Chinese (Simplified), Czech, Dutch, English, Estonian, French, German, Greek, Italian, Polish, Portuguese (cả Brazil), Romanian, Russian, Slovak, Spanish (cả Mỹ Latin), Turkish, Ukrainian. **Không có tiếng Việt.** Trang developer lại ghi "available in 26 languages", mâu thuẫn với danh sách trên.
  - **Quy mô:** danh mục bệnh người lớn khoảng 900 mục (đếm thủ công, xấp xỉ).
  - **Mô hình:** endpoint `/diagnosis` trả danh sách xếp theo "estimated probability". Trang hiện tại không nêu tên mô hình; việc dùng "Bayesian network": CHƯA XÁC MINH.
  - **Giá:** không công bố; phải đặt demo hoặc liên hệ sales.
- **Isabel** [34]:
  - **Sản phẩm:** DDx Companion (cho bác sĩ), Self-Triage (11 câu hỏi chuẩn, bán cho tổ chức), Clinical Educator. Có API từ 2010.
  - **Ngôn ngữ:** 14 ngôn ngữ (EN, ES, DE, FR, NL, PT-BR, RU, RO, Tagalog, AR, ZH-Hans, Malayalam, Urdu, Hindi). **Không có tiếng Việt.**
  - **Mô hình:** tự mô tả là dùng "machine learning since 1999".
  - **Giá:** symptom checker công khai cho đăng ký miễn phí; bản chuyên nghiệp dùng thử 30 ngày; trang giá không đọc được.
- **EndlessMedical** [35]:
  - **Giá:** có API "Free" và sandbox thuộc gói miễn phí.
  - **Quy mô:** hơn 2.000 điểm dữ liệu lâm sàng, hơn 830 đặc điểm có cấu trúc, hơn 180 bệnh trong mô hình DDx.
  - **Định vị:** "Decision support for licensed clinicians — never a diagnosis". Đang chờ cấp bằng sáng chế.
  - **Ngôn ngữ:** không nêu.
- **ApiMedic (Priaid)** [36]: apimedic.com và priaid.com từ chối kết nối hoặc không phản hồi ngày 2026-10-24. Tình trạng, ngôn ngữ và giá: **CHƯA XÁC MINH**.

**Kết luận.** Theo trang công khai, không engine nào ở trên có tiếng Việt. Nên dùng chúng làm benchmark bằng tiếng Anh trên cùng bộ vignette.

### 3.4 Công cụ tự đánh giá đã được thẩm định

| Công cụ | Bài gốc (đã xác minh DOI) | Giấy phép / điều kiện | Bản tiếng Việt và thẩm định | Lưu ý khi dùng trong app |
|---|---|---|---|---|
| PHQ-9 | Kroenke 2001, *J Gen Intern Med* 16:606 | **Public domain.** PDF PHQ-9 và "PHQ and GAD-7 Instructions": "All of the measures included in Table 1 are in the public domain. No permission is required to reproduce, translate, display or distribute." [41] | Nguyen TQ và cộng sự 2016 [43]: phụ nữ thiểu số tình dục, khảo sát online; thang đo gần như đơn chiều, độ tin cậy và giá trị cấu trúc tốt. Không phải thẩm định ngưỡng so với phỏng vấn lâm sàng. Bản dịch tiếng Việt chính thức trên phqscreeners: CHƯA XÁC MINH | Câu 9 (ý nghĩ tự hại) phải dẫn tới luồng an toàn bắt buộc |
| PHQ-2 | Kroenke 2003, *Med Care* 41:1284 | Như PHQ ("abbreviated versions") | CHƯA XÁC MINH | Dùng làm bước sàng lọc trước PHQ-9 |
| GAD-7 / GAD-2 | Spitzer 2006, *Arch Intern Med* 166:1092 | Public domain (Instructions PDF). GAD-2 là 2 câu đầu của GAD-7 | CHƯA XÁC MINH | — |
| AUDIT-C | Bush 1998, *Arch Intern Med* 158:1789; AUDIT gốc của WHO | CHƯA XÁC MINH (WHO và IRIS chặn truy cập) | Giang KB và cộng sự 2005, *Alcohol Alcohol* 40:578 (AUDIT đầy đủ, nông thôn Việt Nam; đã xác minh thư mục) [45]. AUDIT-C riêng: CHƯA XÁC MINH | Ngưỡng khác nhau theo giới; cần quy đổi "ly/chén" theo thói quen Việt Nam |
| STOP-Bang | Chung 2008, *Anesthesiology* 108:812 (bài "STOP Questionnaire") | stopbang.ca đang bảo trì (HTTP 503), nên **CHƯA XÁC MINH**. Theo hiểu biết, thuộc University Health Network và cần phép khi dùng thương mại | CHƯA XÁC MINH | Mục B (BMI) và N (vòng cổ) cần số đo |
| FINDRISC | Lindström & Tuomilehto 2003, *Diabetes Care* 26:725 | CHƯA XÁC MINH | CHƯA XÁC MINH | Ngưỡng BMI và vòng eo cần điều chỉnh cho người châu Á |
| Centor / McIsaac | Centor 1981, *Med Decis Making* 1:239; McIsaac 1998 (*CMAJ*; thư mục CHƯA XÁC MINH) | Thang điểm là dữ kiện; không thấy cần license (nhận định, không phải tư vấn pháp lý) | CHƯA XÁC MINH | Cần khám (xuất tiết amidan, hạch cổ); bản tự khai chưa được thẩm định |
| EPDS | Cox 1987, *Br J Psychiatry* 150:782 | CHƯA XÁC MINH (thường in kèm ghi chú cho phép tái bản nếu trích dẫn tác giả) | Tran TD và cộng sự 2011, *J Affect Disord* 133:281 (miền Bắc Việt Nam, so sánh 3 thang đo; đã xác minh thư mục) [44] | Câu 10 (tự hại) phải dẫn tới luồng an toàn |

Ghi chú: phần "thẩm định tiếng Việt" chưa đầy đủ vì ngân sách tìm kiếm đã hết (xem mục 5).

### 3.5 Tài nguyên đánh giá

- **Semigran 2015, BMJ** (doi:10.1136/bmj.h3480; PMC4496786) [47]:
  - Bài báo theo **CC BY-NC 4.0**.
  - Có 45 vignette, chia đều 15 ca cho mỗi mức: cần cấp cứu, không cấp cứu, tự chăm sóc.
  - Ca lấy từ "materials used to educate health professionals and a medical resource website", nên bản quyền gốc của ca có thể thuộc bên thứ ba.
  - **Supplementary appendix** ghi nguồn, triệu chứng cốt lõi và triệu chứng bổ sung của từng ca.
  - Kết quả trên 23 symptom checker: chẩn đoán đúng ở vị trí đầu 34%, trong top 20 là 58%, triage đúng 57% (cấp cứu 80%, không cấp cứu 55%, tự chăm sóc 33%).
- **Schmieding 2022, JMIR** (CC BY 4.0) [50]:
  - Chạy lại 45 ca của Semigran trên 22 app năm 2020.
  - Độ chính xác triage trung vị 55,8%, so với 59,1% năm 2015; các app bỏ sót hơn 40% ca cấp cứu.
  - Cảnh báo: ca đã công khai có thể đã được dùng để huấn luyện thuật toán.
- **Hill 2020, MJA 212(11):514** [49]:
  - 48 ca: 30 ca chuyển thể từ Semigran, 18 ca mới (có bệnh đặc thù của Úc).
  - Danh sách ca nằm ở bảng 1 của tệp Supporting Information.
  - Bài được đánh dấu "Free", không phải open access; Crossref ghi điều khoản Wiley. Vì vậy ca thuộc bản quyền, chỉ nên dùng nội bộ.
  - Kết quả trên 36 symptom checker: đúng ở vị trí đầu 36%, top 3 là 52%, top 10 là 58%, triage đúng 49%.
- **Gilbert 2020, BMJ Open** (CC BY-NC 4.0) [48]:
  - 200 ca chăm sóc ban đầu; so sánh 8 app với 7 GP; thang khẩn cấp 6 mức.
  - **Ca không được công bố.** Phần data availability ghi rõ "with the exception of the case vignettes".
  - Nghiên cứu do Ada Health tài trợ; hầu hết tác giả là nhân viên, nhà thầu hoặc cổ đông của Ada.
  - Độ chính xác top 3: GP 82,1%, Ada 70,5%, các app khác 23,5–43%.
- **Levine & Mehrotra 2021, JAMA Netw Open** (**CC BY**; PMC8008286) [51]:
  - 48 ca kiểm định, mỗi ca gồm than phiền chính và các chi tiết liên quan.
  - Toàn bộ ca nằm ở **eTable 1** của Supplement.
  - Đây là bộ tốt nhất về mặt giấy phép.
- **Ceney 2021, PLOS ONE** (CC BY 4.0) [52]:
  - 50 ca, 12 công cụ.
  - Bài ghi "All relevant data are within the manuscript and its Supporting Information files" (S1 Appendix). S1 có chứa toàn văn ca hay không: CHƯA XÁC MINH.
  - Độ chính xác top 5: 51,0% (dao động 22,2–84,0%).
- **Kopka 2024, Sci Rep, RepVig** (CC BY 4.0) [53]:
  - Ca "đại diện" được lấy mẫu từ subreddit r/AskDocs, so sánh với ca chuẩn do bác sĩ viết.
  - Đối tượng so sánh: người không chuyên, 12 SAA và 5 LLM (ChatGPT, Claude 2, PaLM 2, Llama 2, Pi).
  - Dữ liệu trên Zenodo (doi:10.5281/zenodo.12805049, **CC BY 4.0**) chỉ gồm ID ca, câu trả lời triage và lời giải. 45 ca có lời giải EM 2 / NE 30 / SE 13 (đếm trực tiếp). **Không có nội dung ca.**
  - Phương pháp lấy mẫu "đại diện" đáng áp dụng cho Việt Nam, với điều kiện thu thập ca có đồng thuận và xử lý quyền riêng tư.
- **DDXPlus test set** [3]: 134.529 BN tổng hợp, theo CC BY 4.0. Chỉ dùng để kiểm thử engine và chạy regression; không đo được giá trị lâm sàng.
- **Phương pháp:**
  - Painter 2022, JMIR (CC BY 4.0) [54]: 15 khuyến nghị cho một chuẩn đánh giá bằng vignette, ủng hộ đánh giá độc lập và nghiên cứu tiến cứu trên dữ liệu thực.
  - Wallace 2022 (mục 3.2.10) cung cấp các mốc so sánh.

---

## 4. Khuyến nghị cho doctor-v

### 4.1 Nên dùng nguồn nào cho việc gì

| Mục đích | Nên dùng | Không dùng | Ghi chú |
|---|---|---|---|
| Tần suất P(f\|d), LR | (1) Cochrane DTA/SR và RCE (truy về nghiên cứu gốc); nghiên cứu chẩn đoán tiến cứu, ưu tiên ở châu Á hoặc Việt Nam. (2) McGee, phần bệnh sử. (3) HPO/Orphadata cho bệnh hiếm. (4) Bác sĩ ước lượng có cấu trúc | DDXPlus (trừ khi xếp bậc E), Kaggle, Symcat, Columbia, Wikidata | Luôn lưu bối cảnh, quần thể và khoảng tin cậy |
| Prior / dịch tễ | Số liệu Việt Nam (ngoài phạm vi báo cáo này); Orphadata epidemiology (CC BY) cho bệnh hiếm; GBD chỉ khi phi thương mại hoặc đã mua license | Incidence trong KB DDXPlus (Bắc Mỹ) | Prior phải điều chỉnh theo tuổi, giới, mùa và vùng |
| Danh mục và mã | ICD-10 theo TT 06/2026/TT-BYT làm mã hiển thị; MONDO ID làm khóa quốc tế, kèm DOID; URI ICD-11 (tùy chọn) | Nhúng UMLS; SNOMED bản đầy đủ | Không tự dịch ICD-11 để phân phối |
| Từ vựng triệu chứng | Tự viết câu hỏi tiếng Việt; ánh xạ tham chiếu sang SYMP/HPO; lấy cấu trúc câu hỏi theo DDXPlus (ghi công CC BY) | Dịch máy nhãn HPO/SYMP | Nhãn ontology là thuật ngữ lâm sàng, không phải lời người dân |
| Lời giải thích | Viết mới, có trích dẫn. Tham khảo MedlinePlus (public domain), CDC (public domain), NHS (OGL), WHO, MSD bản tiếng Việt (đối chiếu thuật ngữ), StatPearls (dữ kiện) | Sao chép hoặc dịch MSD, StatPearls, văn bản web WHO, NICE CKS, A.D.A.M. | Mỗi bài ghi nguồn dữ kiện và ngày review |
| Red flag / triage | Hướng dẫn chính thức (BYT, WHO, guideline quốc tế; kiểm giấy phép từng tài liệu); RCE | Kaggle, Wikidata | Red flag là **quy tắc tất định, ưu tiên hơn suy luận xác suất** |
| Đánh giá | Bộ vignette tiếng Việt tự xây (có holdout kín); Levine 48 ca (CC BY); Semigran 45 và Hill 48 (nội bộ); phương pháp RepVig; DDXPlus test (regression) | Gilbert 200 (không có ca) | Theo checklist 15 khuyến nghị của Painter 2022; đo cả top-1/top-3, độ đúng triage, **tỉ lệ undertriage** và tỉ lệ overtriage |

### 4.2 Quy trình xây KB tần suất (đề xuất)

1. Chia KB thành **mô-đun theo than phiền chính**: sốt, ho, đau họng, đau ngực, khó thở, đau bụng, tiêu chảy, đau đầu, phát ban, tiểu buốt…
2. Với mỗi cặp (finding, bệnh) trong một mô-đun:
   - Tìm DTA review hoặc RCE.
   - Lấy sens làm P(f|d) và 1 − spec làm P(f|¬d trong mô-đun), lưu kèm khoảng tin cậy.
3. Nếu nguồn chỉ có lớp tần suất (HPO/Orphanet hoặc sách), dùng khoảng của lớp và một giá trị điểm có chú thích (xem bảng dưới).
4. Nếu không có nguồn nào, cho ít nhất 2 bác sĩ ước lượng độc lập, rồi hòa giải và ghi lại lý do.
5. Dùng DDXPlus (49 bệnh) để kiểm tra độ hợp lý (sanity check), **không** lấy giá trị từ đó.
6. Mỗi lần thay đổi KB phải chạy lại toàn bộ bộ vignette (regression) và theo dõi calibration.

**Bảng gợi ý chuyển lớp tần suất HPO/Orphanet sang giá trị số.** Các giá trị điểm là đề xuất, cần bác sĩ duyệt.

| Lớp | Khoảng | Giá trị điểm gợi ý |
|---|---|---|
| Obligate | 100% | 0,99 (tránh dùng đúng 1,0 trong suy luận Bayes) |
| Very frequent | 80–99% | 0,90 |
| Frequent | 30–79% | 0,55 |
| Occasional | 5–29% | 0,17 |
| Very rare | 1–4% | 0,025 |
| Excluded | 0% | khoảng 0,001, hoặc loại trừ cứng nếu chắc chắn |

### 4.3 Các nguồn nên tránh và lý do

- **Kaggle/HF disease–symptom:** không rõ nguồn gốc, không có tần suất, phạm vi rất hẹp. Giấy phép share-alike (CC BY-SA, ODbL) có thể "lây" sang KB.
- **Symcat:** website đã ngừng; dữ liệu đang lưu hành là bản cào, không có giấy phép.
- **Columbia DSKB:** BN nội trú năm 2004; số liệu là độ liên kết, không phải xác suất; không có giấy phép.
- **Wikidata P780** (nếu dùng làm nguồn chính): không có tần suất, và khoảng 59% phát biểu là về phơi nhiễm hóa chất.
- **NICE CKS:** chỉ mở cho UK, phải thuê bao.
- **Văn bản MSD, StatPearls, WHO web, A.D.A.M.:** có bản quyền hoặc giấy phép NC/ND. Chỉ lấy dữ kiện.
- **Nhúng UMLS hoặc SNOMED CT bản đầy đủ:** vướng giấy phép và phí; doctor-v không cần.
- **GBD** (nếu doctor-v có bất kỳ yếu tố thương mại nào): điều khoản phi thương mại rất rộng.
- **DDXPlus làm nguồn xác suất hoặc prior:** dữ liệu tổng hợp, có giả định độc lập, bị lọc qua một hệ thương mại, và dịch tễ là của Bắc Mỹ.

### 4.4 Hệ thống bậc nguồn

**Bậc bằng chứng (E-tier)**, gắn cho từng tham số số:

| Bậc | Định nghĩa | Ví dụ |
|---|---|---|
| **A** | SR hoặc meta-analysis DTA ở bối cảnh tương đương (chăm sóc ban đầu hoặc cấp cứu, đúng nhóm tuổi), có khoảng tin cậy; ưu tiên dữ liệu châu Á hoặc Việt Nam | Cochrane DTA, JAMA RCE |
| **B** | Nghiên cứu chẩn đoán gốc chất lượng tốt (tiến cứu, BN liên tiếp, chuẩn tham chiếu rõ, nguy cơ sai lệch QUADAS-2 thấp); số liệu dịch tễ chính thức cho prior; guideline quốc gia hoặc của WHO cho red flag | Nghiên cứu đơn lẻ, số liệu của BYT |
| **C** | Sách chuyên khảo hoặc ontology có trích dẫn; giá trị dạng khoảng | McGee, MSD, StatPearls, lớp tần suất HPO/Orphanet |
| **D** | Đồng thuận chuyên gia của doctor-v (elicitation có cấu trúc, ít nhất 2 bác sĩ, có ghi lý do) | Biên bản Delphi nội bộ |
| **E** | Dữ liệu tổng hợp hoặc chưa kiểm chứng; **không đưa vào production nếu chưa được nâng bậc** | Tần suất suy từ DDXPlus, Wikidata, Columbia, Kaggle, Symcat |

**Quy tắc đề xuất.**
- Mỗi bệnh đưa vào production phải có tham số cho mọi finding "chủ chốt" ở bậc C trở lên.
- Mọi red flag phải dựa trên nguồn bậc A/B hoặc guideline chính thức.
- Tham số bậc D/E được gắn cờ để ưu tiên tìm bằng chứng tốt hơn.

**Nhãn giấy phép (L-class)**, gắn cho từng nguồn:

| Nhãn | Ý nghĩa | Ví dụ | Được làm gì |
|---|---|---|---|
| **L0** | Public domain / CC0 | Phần NLM của MedlinePlus, CDC, DO, SYMP, Wikidata, NAMCS | Nhúng và chuyển thể, vẫn ghi nguồn |
| **L1** | Cho phép kèm ghi công (CC BY 4.0, OGL v3.0) | DDXPlus, MONDO, Orphadata, dữ liệu RepVig, Levine 2021 | Nhúng và chuyển thể, có ghi công và nêu thay đổi |
| **L2** | Có hạn chế (ND, NC, SA hoặc giấy phép riêng) | ICD-10/ICD-11 (ND), SNOMED GPS (ND), HPO (không được sửa), Semigran/Gilbert/Cochrane (NC), StatPearls (NC-ND, chưa xác minh), WHO (NC-SA), Kaggle (SA), IHME (NC) | Kiểm điều kiện cụ thể trước khi nhúng; với NC phụ thuộc mô hình kinh doanh |
| **L3** | Độc quyền / all rights reserved / thuê bao | MSD, JAMA RCE, McGee, NICE CKS, DXplain, Infermedica, Isabel, Hill 2020 | Chỉ trích dữ kiện kèm trích dẫn, không dùng văn bản |

**Metadata bắt buộc cho mỗi tham số:**
- `value`; `ci_low`/`ci_high` hoặc `range`
- `measure` (sens / spec / LR+ / LR− / lớp tần suất)
- `setting`, `population` (tuổi, giới, quốc gia), `n`
- `source_id` (DOI, PMID hoặc URL kèm phiên bản)
- `evidence_tier`, `license_class`
- `extracted_by`, `reviewed_by`, `review_date`, `notes`

### 4.5 Ghi công trong app

Cần một màn hình "Nguồn dữ liệu và giấy phép", có ít nhất:
- **HPO:** câu ghi nhận kèm phiên bản.
- **Orphadata:** câu trích dẫn, phiên bản, và tuyên bố cho công cụ AI.
- **DDXPlus:** ghi CC BY, kèm ghi chú "đã dịch và chỉnh sửa".
- **MONDO:** ghi CC BY.
- **ICD:** trích dẫn WHO kèm URI.
- **NHS:** câu OGL dành cho bản chuyển thể, nếu có dùng.
- **MedlinePlus:** "Courtesy of MedlinePlus…".
- **CDC:** "Source: CDC".

Vì app là PWA chạy offline, KB đóng gói trong app được tính là **phân phối**. Do đó mọi nguồn L2 phải được kiểm điều kiện trước khi đóng gói.

---

## 5. Câu hỏi mở và rủi ro

1. **Tư cách thương mại của doctor-v** quyết định có dùng được các nguồn CC BY-NC (Semigran, Gilbert, Cochrane Struyf), WHO, IHME GBD và StatPearls hay không. Quảng cáo, gói trả phí hay tài trợ đều có thể bị coi là thương mại. Cần chốt sớm.
2. **Giấy phép HPO:** cần câu chữ chính thức, phạm vi của điều kiện "không sửa", và điều khoản về thương mại. Phải đọc trực tiếp hpo.jax.org/app/license hoặc hỏi nhóm HPO.
3. **ICD-10 tiếng Việt:**
   - Quyền nhúng danh mục của BYT vào app.
   - Quan hệ giữa bản của BYT với giấy phép dịch của WHO.
   - Đối chiếu TT 06/2026/TT-BYT trên Công báo hoặc vbpl.vn.
   - Xác định đúng số hiệu quyết định năm 2020 (4400 hay 4469).
4. **NHS API:** chưa biết điều khoản syndication và việc dùng ngoài UK.
5. **Giấy phép chưa xác minh:** StatPearls, AUDIT/AUDIT-C, STOP-Bang (website đang bảo trì), FINDRISC, EPDS, ICPC-3, dữ liệu HSDN. Tình trạng ApiMedic cũng chưa rõ.
6. **Thẩm định tiếng Việt chưa xác minh:** GAD-7/GAD-2, PHQ-2, STOP-Bang, FINDRISC, Centor/McIsaac; chi tiết ngưỡng và AUC của PHQ-9, EPDS, AUDIT ở Việt Nam. Lý do là ngân sách WebSearch đã hết. Cần tìm tiếp trên PubMed và tạp chí y học trong nước.
7. **Tính chuyển giao:** LR đo ở Âu–Mỹ chưa chắc đúng ở Việt Nam, do spectrum bias và cơ cấu bệnh khác (sốt xuất huyết, lao, nhiễm khuẩn tiêu hóa…). Giả định độc lập có điều kiện dễ làm kết quả quá tự tin. Cần calibration bằng vignette Việt Nam.
8. **DDXPlus:** có thể bị lệch do bộ lọc (loại BN không xuất hiện trong DDx của hệ thương mại) và do giả định độc lập; không phản ánh lâm sàng Việt Nam.
9. **Rò rỉ benchmark:** vignette công khai có thể đã nằm trong dữ liệu huấn luyện của engine hoặc LLM (Schmieding 2022). Cần giữ holdout kín và tạo ca mới định kỳ.
10. **Quyền đối với dữ kiện** trích từ sách hoặc tạp chí có bản quyền (RCE, McGee), xét theo luật Sở hữu trí tuệ Việt Nam và luật của nước xuất bản: cần ý kiến luật sư.
11. **Quy định thiết bị y tế / phần mềm y tế** tại Việt Nam đối với symptom checker (Infermedica được xếp Class IIb ở EU): ngoài phạm vi báo cáo này, cần đối chiếu với báo cáo pháp lý riêng.
12. **Thay đổi giấy phép gần đây:** SNOMED GPS chuyển sang CC BY-ND 4.0 (2026). Nên kiểm lại toàn bộ giấy phép trước mỗi lần phát hành KB.

---

## 6. Tài liệu tham khảo

Tất cả truy cập ngày 2026-10-24.

1. Fansi Tchango A, Goel R, Wen Z, Martel J, Ghosn J. *DDXPlus: A New Dataset For Automatic Medical Diagnosis*. NeurIPS 2022 D&B; arXiv:2205.09148 v3 (13/10/2022), CC BY 4.0. https://arxiv.org/abs/2205.09148 · HTML: https://ar5iv.labs.arxiv.org/html/2205.09148
2. DDXPlus GitHub repository. https://github.com/mila-iqia/ddxplus
3. DDXPlus Dataset (bản tiếng Pháp gốc), figshare v15, 2026-03-11, CC BY 4.0. https://doi.org/10.6084/m9.figshare.20043374 · metadata: https://api.figshare.com/v2/articles/20043374 · README: https://ndownloader.figshare.com/files/40495496
4. DDXPlus Dataset (English), figshare v2, 2026-03-09, CC BY 4.0. https://figshare.com/articles/dataset/DDXPlus_Dataset_English_/22687585 · conditions file: https://ndownloader.figshare.com/files/62561569
5. Human Phenotype Ontology, release v2026-09-01; `phenotype.hpoa` v2026-09-02. https://github.com/obophenotype/human-phenotype-ontology/releases/tag/v2026-09-01 · http://purl.obolibrary.org/obo/hp.obo
6. Trang giấy phép HPO (không truy cập được bằng công cụ): https://hpo.jax.org/app/license · OBO Foundry: https://obofoundry.org/ontology/hp.html · ART-DECOR: https://terminology.art-decor.org/codesystems/terminology-stable-hpo-data · reusabledata (thứ cấp): https://github.com/reusabledata/reusabledata/blob/master/data-sources/hpo.yaml
7. HPO translations. https://github.com/obophenotype/hpo-translations
8. Orphadata Science, "Phenotypes associated with rare disorders" (bản 07/2026). https://sciences.orphadata.com/phenotypes/ · Epidemiology: https://sciences.orphadata.com/epidemiology/
9. Orphadata, Legal notice. https://www.orphadata.com/legal-notice/
10. Human Disease Ontology, v2026-09-30, CC0. https://github.com/DiseaseOntology/HumanDiseaseOntology/releases · https://obofoundry.org/ontology/doid.html
11. Mondo Disease Ontology, v2026-10-06, CC BY 4.0. https://mondo.monarchinitiative.org/ · https://github.com/monarch-initiative/mondo/releases · https://obofoundry.org/ontology/mondo.html
12. Symptom Ontology, v2026-07-30, CC0. https://github.com/DiseaseOntology/SymptomOntology · https://obofoundry.org/ontology/symp.html
13. Wikidata, Property P780 và Wikidata:Licensing; truy vấn qua https://query.wikidata.org/sparql. https://www.wikidata.org/wiki/Property:P780 · https://www.wikidata.org/wiki/Wikidata:Licensing
14. Columbia DBMI, Disease-Symptom Knowledge Database. https://people.dbmi.columbia.edu/~friedma/Projects/DiseaseSymptomKB/index.html · Wang X và cộng sự, AMIA Annu Symp Proc 2008:783–7, PMC2656103.
15. Symcat: http://www.symcat.com/ (HTTP 503) · MedCityNews (2012): https://medcitynews.com/2012/07/a-new-kind-of-webmd-symptom-checker-for-the-big-data-digital-health-era/ · https://github.com/teliov/SymCat-to-synthea
16. Kaggle: https://www.kaggle.com/datasets/itachi9604/disease-symptom-description-dataset · https://www.kaggle.com/datasets/kaushil268/disease-prediction-using-machine-learning (metadata qua https://www.kaggle.com/api/v1/datasets/view/…) · HF: https://huggingface.co/datasets/gretelai/symptom_to_diagnosis
17. SNOMED International: Members https://www.snomed.org/members · Get SNOMED https://www.snomed.org/get-snomed · GPS expansion (11/3/2026) https://www.snomed.org/news/snomed-international-significantly-expands-the-scope-of-the-global-patient-set
18. NLM, UMLS Metathesaurus License Agreement và Appendix. https://www.nlm.nih.gov/research/umls/knowledge_sources/metathesaurus/release/license_agreement.html · https://www.nlm.nih.gov/research/umls/knowledge_sources/metathesaurus/release/license_agreement_appendix.html
19. WHO ICD-11: License PDF https://icd.who.int/en/docs/ICD11-license.pdf · ICD API license https://icd.who.int/docs/icd-api/license · ICD API https://icd.who.int/icdapi · Supported classifications/languages https://icd.who.int/docs/icd-api/SupportedClassifications/
20. WHO: Copyright https://www.who.int/about/policies/publishing/copyright · Terms of use https://www.who.int/about/policies/terms-of-use (cả hai xác minh qua chỉ mục tìm kiếm) · FAQ Licensing ICD-10 https://cdn.who.int/media/docs/default-source/publishing-policies/copyright/who-faq-licensing-icd-10.pdf · ICD-10 Vol. 2 (2019) https://icd.who.int/browse10/Content/statichtml/ICD10Volume2_en_2019.pdf
21. Thông tư 06/2026/TT-BYT (LuatVietnam): https://luatvietnam.vn/y-te/thong-tu-06-2026-tt-byt-quy-dinh-ma-hoa-benh-tat-nguyen-nhan-tu-vong-theo-icd-10-430742-d1.html · Cổng ICD-Vietnam: https://icd.kcb.vn/ · Các nguồn thứ cấp về quyết định năm 2020 (mâu thuẫn số hiệu): https://luatvietnam.vn/y-te/quyet-dinh-4400-qd-byt-2020-bang-phan-loai-quoc-te-ma-hoa-benh-tat-nguyen-nhan-tu-vong-icd-10-315051-d1.html · https://hoatieu.vn/phap-luat/quyet-dinh-4469-qd-byt-2020-phan-loai-quoc-te-ma-hoa-benh-tat-nguyen-nhan-tu-vong-icd-10-204000
22. MedlinePlus: Using content https://medlineplus.gov/about/using/usingcontent/ · Web Service https://medlineplus.gov/about/developers/webservices/ · XML https://medlineplus.gov/xml.html (mplus_topics_2026-10-23.xml) · Vietnamese https://medlineplus.gov/languages/vietnamese.html
23. NHS website: Terms and conditions https://www.nhs.uk/our-policies/terms-and-conditions/ · Content not licensed for re-use https://www.nhs.uk/our-policies/terms-and-conditions/content-not-licensed-for-re-use/ · NHS Website Content API https://digital.nhs.uk/developer/api-catalogue/nhs-website-content (đọc qua bản phản chiếu https://nhsd-proxy.openprescribing.net/developer/api-catalogue/nhs-website-content)
24. NICE, "CKS is only available in the UK" https://www.nice.org.uk/cks-uk-only · Use of NICE content in the UK https://www.nice.org.uk/re-using-our-content/uk-open-content-licence (xác minh qua chỉ mục tìm kiếm)
25. MSD Manuals (tiếng Việt): https://www.msdmanuals.com/vi · Permissions https://www.msdmanuals.com/home/content/permissions · MSD Terms of Use https://msd.com/terms-of-use/ (xác minh qua chỉ mục tìm kiếm)
26. StatPearls, NCBI Bookshelf NBK430685: https://www.ncbi.nlm.nih.gov/books/NBK430685/ (không truy cập được; giấy phép CHƯA XÁC MINH)
27. CDC, Use of Agency Materials (review 01/5/2023). https://www.cdc.gov/other/agencymaterials.html
28. Sackett DL, Rennie D. JAMA 1992;267:2650, doi:10.1001/jama.1992.03480190092040 · Ebell MH và cộng sự. JAMA 2000;284:2912, doi:10.1001/jama.284.22.2912 · Attia J và cộng sự. JAMA 1999;282:175, doi:10.1001/jama.282.2.175 · Metlay JP và cộng sự. JAMA 1997;278:1440, doi:10.1001/jama.1997.03550170070035 · Simel DL, Rennie D, Keitz SA. *The Rational Clinical Examination*, McGraw-Hill, ISBN 9780071590303 (https://openlibrary.org/isbn/9780071590303)
29. McGee S. *Evidence-Based Physical Diagnosis*, Elsevier, ấn bản 5, ISBN 9780323754835 (https://openlibrary.org/isbn/9780323754835); ấn bản 4, ISBN 9780323392761.
30. Struyf T và cộng sự. Cochrane Database Syst Rev 2022, CD013665.pub3, doi:10.1002/14651858.CD013665.pub3 (PMC9121352).
31. Aalbers J và cộng sự. BMC Med 2011;9:67, doi:10.1186/1741-7015-9-67 (PMC3127779).
32. Wallace W và cộng sự. npj Digit Med 2022, doi:10.1038/s41746-022-00667-w (PMC9385087).
33. Infermedica: https://infermedica.com/ · https://developer.infermedica.com/ · https://developer.infermedica.com/documentation/engine-api/ · https://developer.infermedica.com/documentation/overview/medical-content/ · https://developer.infermedica.com/documentation/overview/medical-content/available-conditions/
34. Isabel Healthcare: https://www.isabelhealthcare.com/ · https://symptomchecker.isabelhealthcare.com/
35. EndlessMedical: https://www.endlessmedical.com/
36. ApiMedic: https://apimedic.com/ (không kết nối được ngày 2026-10-24)
37. MGH LCS, DXplain: http://www.mghlcs.org/projects/dxplain
38. CDC/NCHS, NAMCS datasets and documentation (cập nhật 28/8/2026). https://www.cdc.gov/nchs/ahcd/datasets_documentation_related.htm
39. IHME, Free-of-Charge Non-Commercial User Agreement. https://www.healthdata.org/data-tools-practices/data-practices/ihme-free-charge-non-commercial-user-agreement
40. ICPC-3: https://www.icpc-3.info/
41. PHQ Screeners: https://www.phqscreeners.com/ · PHQ-9 (EN) PDF: https://www.phqscreeners.com/images/sites/g/files/g10060481/f/201412/PHQ-9_English.pdf · Instructions: https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/instructions.pdf
42. Bài gốc của các công cụ: Kroenke 2001, doi:10.1046/j.1525-1497.2001.016009606.x · Kroenke 2003 (PHQ-2), doi:10.1097/01.MLR.0000093487.78664.3C · Spitzer 2006 (GAD-7), doi:10.1001/archinte.166.10.1092 · Bush 1998 (AUDIT-C), doi:10.1001/archinte.158.16.1789 · Chung 2008 (STOP), doi:10.1097/ALN.0b013e31816d83e4 · Lindström 2003 (FINDRISC), doi:10.2337/diacare.26.3.725 · Centor 1981, doi:10.1177/0272989X8100100304 · Cox 1987 (EPDS), doi:10.1192/bjp.150.6.782
43. Nguyen TQ, Bandeen-Roche K, Bass JK, German D, Nguyen NTT, Knowlton AR. J Gay Lesbian Ment Health 2016;20(2):173–191, doi:10.1080/19359705.2015.1080204 (PMC5019570).
44. Tran TD, Tran T, La B, Lee D, Rosenthal D, Fisher J. J Affect Disord 2011;133(1–2):281–293, doi:10.1016/j.jad.2011.03.038.
45. Giang KB, Spak F, Dzung TV, Allebeck P. Alcohol Alcohol 2005;40(6):578–583, doi:10.1093/alcalc/agh198.
46. STOP-Bang: http://www.stopbang.ca/ (HTTP 503, đang bảo trì)
47. Semigran HL, Linder JA, Gidengil C, Mehrotra A. BMJ 2015;351:h3480, doi:10.1136/bmj.h3480 (PMC4496786; CC BY-NC 4.0).
48. Gilbert S và cộng sự. BMJ Open 2020;10:e040269, doi:10.1136/bmjopen-2020-040269 (PMC7745523; CC BY-NC 4.0).
49. Hill MG, Sim M, Mills B. Med J Aust 2020;212(11):514–519, doi:10.5694/mja2.50600 · https://www.mja.com.au/journal/2020/212/11/quality-diagnosis-and-triage-advice-provided-free-online-symptom-checkers-and
50. Schmieding ML và cộng sự. J Med Internet Res 2022, doi:10.2196/31810 (PMC9131144; CC BY 4.0).
51. Levine DM, Mehrotra A. JAMA Netw Open 2021, doi:10.1001/jamanetworkopen.2021.3287 (PMC8008286; CC-BY).
52. Ceney A và cộng sự. PLOS ONE 2021, doi:10.1371/journal.pone.0254088 (PMC8282353; CC BY 4.0).
53. Kopka M, Napierala H, Privoznik M, Sapunova D, Zhang S, Feufel MA. Sci Rep 2024, doi:10.1038/s41598-024-83844-z (PMC11666565; CC BY 4.0) · Dataset: https://doi.org/10.5281/zenodo.12805049 (CC BY 4.0)
54. Painter A và cộng sự. J Med Internet Res 2022, doi:10.2196/37408 (PMC9647454; CC BY 4.0).
55. Hetionet: https://github.com/hetio/hetionet
56. Zhou X, Menche J, Barabási AL, Sharma A. Human symptoms–disease network. Nat Commun 2014;5:4212, doi:10.1038/ncomms5212.
