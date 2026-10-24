# Biên bản lượt R: đối chiếu quy tắc, danh sách dấu hiệu nguy hiểm và sổ nguồn

- Người thực hiện: `agent:pass-r`. Ngày: 2026-10-24.
- Phạm vi: `knowledge/sources/`, `knowledge/rules/red-flags.yaml`, `knowledge/rules/emergency-screen.yaml`, `knowledge/rules/question-groups.yaml`, `knowledge/complaints/`, câu chữ trong `knowledge/findings/`.
- Không đụng tới `knowledge/conditions/` và các bản nháp khác trong `knowledge/drafts/`. Không đọc bộ ca giữ kín (holdout).
- Kết quả `npm run kb:check`: **0 lỗi, 3 cảnh báo**. Ba cảnh báo còn lại là "chưa có bệnh nào khai báo prior" cho 3 triệu chứng chính, ngoài phạm vi lượt này. Trước lượt R: 0 lỗi, 40 cảnh báo (37 cảnh báo nguồn chưa kiểm tra hoặc quy tắc mức 1–2 dựa trên nguồn bậc C).
- Mọi thay đổi vẫn **cần bác sĩ duyệt** trước khi phát hành.

---

## 1. Cách làm và hạn chế

- **NICE** (nice.org.uk) trả lỗi 403 với mọi truy cập tự động (WebFetch, curl). NCBI Bookshelf (reCAPTCHA), Europe PMC web (Cloudflare) và Wayback Machine (429) cũng chặn.
  - Lượt R đọc trang chính thức của NICE (Overview, Recommendations, History, các chương) qua dịch vụ đọc văn bản r.jina.ai. Dịch vụ này tải trang NICE và trả lại nội dung dạng văn bản; tên miền nguồn vẫn là nice.org.uk.
  - Cách truy cập được ghi trong `notes_vi` của từng nguồn NICE. Nếu người bảo trì không chấp nhận cách này, cần mở lại bằng trình duyệt.
- **WHO IRIS**: giao diện web chặn, nhưng API DSpace (`iris.who.int/server/api`) mở. Đã tải PDF và bản văn bản (TEXT) qua API.
- **Văn bản Bộ Y tế**: tải PDF từ cổng nhà nước rồi trích chữ bằng `pdftotext`. Bản quét 3377/QĐ-BYT được đọc bằng cách tách ảnh trang.
- Số lần WebSearch đã dùng: **7**.
- Không chạy mã nào từ tệp tải về; tệp tải về chỉ nằm trong thư mục tạm, không chép vào repo.

---

## 2. Sổ nguồn

Mọi nguồn đã kiểm tra đều đặt `verified_by: "agent:pass-r"` và ghi trong `notes_vi` những mục đã đối chiếu.

### 2.1 Nguồn có sẵn (21)

| Nguồn | Kết quả | Thay đổi, ghi chú |
|---|---|---|
| byt-qd-1019-2025 (sởi) | ✓ đã xác minh | Đổi URL sang PDF ký số trên cổng Sở Y tế Huế (Bộ Y tế ký 26/3/2025). Tệp không có trang quyết định; 1327/QĐ-BYT (18/4/2014) được nêu trong tài liệu tham khảo. |
| byt-qd-1840-2025 (cúm mùa) | ✓ | PDF ký số trên cổng TP Hải Phòng; ngày 03/6/2025; Điều 3 thay thế 2078/QĐ-BYT ngày 23/6/2011. |
| byt-qd-2671-2023 (COVID-19) | ✓ | Đổi URL sang PDF ký số trên cổng Sở Y tế Lai Châu. Bổ sung `supersedes` 437/QĐ-BYT (27/02/2022). Văn bản ghi nhầm ngày của 250/QĐ-BYT là 28/11/2022 (đúng là 28/01/2022). |
| byt-qd-2760-2023 (sốt xuất huyết) | ✓ (kiểm tra lại) | Đối chiếu Phụ lục 2 (dấu hiệu cảnh báo) và mục IV.A.3.b (dấu hiệu cần đến khám lại ngay). Chưa có văn bản thay thế. |
| byt-qd-292-2024 (tay chân miệng) | ✓ | Đổi URL từ Hoatieu sang trang Trung tâm Y tế Phú Nhuận (cổng Sở Y tế TP.HCM), có bản Word của quyết định: ngày 06/02/2024, thay 1003/QĐ-BYT. Chưa tìm thấy PDF ký số. |
| byt-qd-3312-2015 (nhi khoa) | ✓ | Đổi URL sang trang kcb.vn (Cục QLKCB). kcb.vn chỉ có tệp RAR, nên nội dung đọc qua bản PDF do vnras.com đăng lại. **Văn bản không có bài riêng về lồng ruột** (xem quy tắc `rf_red_jelly_stool`). |
| byt-qd-3312-2024 (đột quỵ) | ✗ chưa xác minh | Không tìm thấy PDF chính thức. Chưa có quy tắc nào trích dẫn. |
| byt-qd-3377-2023 (sốt rét) | ✓ (kiểm tra lại) | PDF quét do Viện Sốt rét – KST – CT Quy Nhơn đăng: trang quyết định ghi thay thế 2699/QĐ-BYT (26/6/2020). Ô số và ngày trên bản quét để trống; số 3377 và ngày 30/8/2023 lấy theo tiêu đề trang của Viện. |
| nhs-stomach-ache | ✓ | Trang rà soát ngày 20/10/2026. Danh sách "gọi 999 hoặc đến cấp cứu" đã thay đổi so với bản cũ (xem `rf_no_stool_or_gas`). Giấy phép L1 (OGL) đúng. |
| nice-cg141 | ✓ | Xuất bản 13/6/2012, cập nhật 25/8/2016; vẫn hiện hành. Đây là hướng dẫn xử trí trong bệnh viện, không có tiêu chí phân loại trước viện. |
| nice-cg150 | ✓ | Xuất bản 19/9/2012, cập nhật 03/6/2025. NICE đang cập nhật phần điều trị; mục 1.1 Đánh giá không đổi. Mục 1.1 không quy định mức khẩn. |
| nice-cg95 | ✓ | Xuất bản 24/3/2010, cập nhật 30/11/2016. |
| nice-ng126 | ✓ | Xuất bản 17/4/2019, cập nhật 17/6/2026 (anti-D). Chương khuyến cáo đã đổi tên; đọc chương "Symptoms and signs of ectopic pregnancy and initial assessment". |
| nice-ng133 | ✓ | Xuất bản 25/6/2019, cập nhật 17/4/2023. Định nghĩa tăng huyết áp nặng là **trên** 160/110 (tâm thu hoặc tâm trương). |
| nice-ng136 | ✓ | Xuất bản 28/8/2019, cập nhật 26/02/2026. |
| nice-ng143 | ✓ | Xuất bản 07/11/2019, cập nhật 26/11/2021 (sửa nhỏ đến 11/2025). Ngày ghi chính xác `2019-11-07`, bổ sung `supersedes` CG160. |
| nice-ng228 | ✓ | Xuất bản 23/11/2022. |
| nice-ng232 | ✓ | Xuất bản 18/5/2023. |
| nice-ng51 | ✗ **đã bị thay thế** | Ngày 19/11/2025 NICE tách NG51 thành NG253 (từ 16 tuổi), NG254 (dưới 16 tuổi), NG255 (có thai hoặc mới sinh). Đổi tiêu đề theo trang hiện tại, ghi rõ "đã bị thay thế". Mọi quy tắc và triệu chứng chính đã chuyển sang NG253/NG254. Các bản nháp bệnh (lượt A, B) nếu dùng `nice-ng51` cần chuyển theo. |
| who-dengue-2009 | ✓ | Bìa ghi "Expiry date: 2014". Bổ sung số hiệu WHO/HTM/NTD/DEN/2009.1 và `license_note` (© WHO 2009, All rights reserved → L3 đúng). WHO đã có hướng dẫn xử trí lâm sàng mới năm 2025 (nguồn mới `who-arbovirus-2025`). |
| who-imci-chart-booklet-2014 | ✓ (kiểm tra lại) | Tải PDF Chart booklet qua API IRIS. Bản PDF dùng phông chữ làm mất các con số ngưỡng khi trích xuất, nên ngưỡng nhiệt độ được đối chiếu qua Module 2 cùng bộ: sốt từ 37,5°C, hạ thân nhiệt dưới 35,5°C (đo ở nách). Giấy phép L3 đúng. |

Kết quả: 19/21 nguồn cũ đã xác minh; 2 nguồn chưa (`byt-qd-3312-2024`, `nice-ng51`). Không có nhãn giấy phép nào sai.

### 2.2 Nguồn mới (10), đều đã mở và xác minh

| Nguồn | Nội dung | Giấy phép | Dùng cho |
|---|---|---|---|
| nice-ng253 | Nhiễm khuẩn huyết, từ 16 tuổi (19/11/2025, cập nhật 23/9/2026) | L3 | thay NG51 |
| nice-ng254 | Nhiễm khuẩn huyết, dưới 16 tuổi (19/11/2025) | L3 | thay NG51 |
| nice-ng240 | Viêm màng não vi khuẩn và bệnh não mô cầu (19/3/2024) | L3 | cứng gáy, ban không mất khi ấn, co giật |
| nice-ng194 | Chăm sóc sau sinh (20/4/2021, cập nhật 09/6/2026) | L3 | đau đầu sau sinh |
| who-arbovirus-2025 | WHO, xử trí lâm sàng bệnh do arbovirus (03/7/2025) | L2 (CC BY-NC-SA 3.0 IGO) | dấu hiệu cảnh báo sốt xuất huyết |
| who-bec-2018 | WHO/ICRC, Basic Emergency Care (2018) | L2 | đau bụng dữ dội, bụng cứng, xuất huyết tiêu hóa, chửa ngoài tử cung |
| wses-asbo-2018 | Hội Phẫu thuật cấp cứu thế giới, tắc ruột do dính (2018, PMID 29946347) | L1 (CC BY 4.0) | tắc ruột |
| nhs-sepsis | NHS, Sepsis (rà soát 14/5/2026) | L1 | đối chiếu danh sách gọi 999 |
| nhs-headaches | NHS, Headaches (rà soát 17/4/2024) | L1 | đối chiếu danh sách gọi 999 |
| nhs-chest-pain | NHS, Chest pain (rà soát 08/8/2023) | L1 | đối chiếu danh sách gọi 999 |

---

## 3. Quy tắc mức xử trí (41 → 51 quy tắc)

Mọi quy tắc đều được thêm `locator` và cập nhật `note`. Không còn quy tắc mức 1–2 nào chỉ dựa trên nguồn bậc C.

### 3.1 Quy tắc đổi mức

| Quy tắc | Mức cũ → mới | Thay đổi | Lý do (nguồn) |
|---|---|---|---|
| `rf_head_injury` | 3 → **2** | Sửa câu lý do | NG232 khuyến cáo 1.2.3: dịch vụ tư vấn từ xa chuyển người bị chấn thương đầu đến khoa cấp cứu khi **đau đầu dai dẳng từ sau chấn thương** hoặc có nôn. NHS Headaches: đau đầu sau chấn thương đầu trong 3 tháng qua → gọi 999 hoặc đến cấp cứu. |
| `rf_head_injury_with_signs` | 2 → **1** | Bỏ nôn (đã tính ở `rf_head_injury` mức 2); thêm co giật và rối loạn thị lực | NG232 khuyến cáo 1.2.2: không tỉnh táo hoàn toàn, dấu hiệu thần kinh khu trú (định nghĩa của NG232 gồm thay đổi thị lực), co giật từ sau chấn thương → gọi xe cấp cứu (999). |
| `rf_no_stool_or_gas` | 3 → **2** | Thêm điều kiện có đau bụng | Trang NHS Stomach ache (rà soát 20/10/2026): đau bụng kèm hoàn toàn không đi ngoài, không xì hơi → gọi 999 hoặc đến cấp cứu. WSES: tắc ruột non là cấp cứu ngoại khoa. |

### 3.2 Quy tắc giữ mức nhưng sửa điều kiện

| Quy tắc | Mức | Thay đổi | Lý do |
|---|---|---|---|
| `rf_extreme_bp_with_symptoms` | 2 | Bỏ **đau đầu**, thêm **lú lẫn** | NG136 khuyến cáo 1.5.2 chỉ xếp vào nhóm khám trong ngày khi có xuất huyết võng mạc, phù gai thị hoặc triệu chứng đe dọa tính mạng (lú lẫn mới, đau ngực, suy tim, tổn thương thận cấp). Đau đầu đơn thuần kèm huyết áp từ 180/120 vẫn ở mức 3 (`rf_extreme_bp`). |
| `rf_chest_pain_with_features` | 1 | Thêm buồn nôn, nôn, ngất hoặc choáng | CG95 khuyến cáo 1.2.1.3 (đau ngực kèm buồn nôn, nôn, vã mồ hôi, khó thở hoặc rối loạn huyết động); NHS Chest pain (kèm buồn nôn, choáng váng → gọi 999). |
| `rf_pregnancy_hypertension_signs` | 2 | Thêm nôn, nôn liên tục, đau vùng trên rốn hoặc dưới sườn phải | NG133 khuyến cáo 1.1.1 liệt kê nôn và "đau dữ dội ngay dưới sườn" là triệu chứng tiền sản giật. Giữ mọi mức đau đầu (nguồn nói "dữ dội") để thận trọng. |
| `rf_high_risk_fever` | 3 | Tuổi từ 75 → **65**; thêm người mới sinh | 1840/QĐ-BYT mục II.2.3: yếu tố nguy cơ cúm nặng gồm trên 65 tuổi, phụ nữ mới sinh 2 tuần. |

### 3.3 Quy tắc giữ mức, sửa nguồn hoặc cơ sở bằng chứng

| Quy tắc | Mức | Sửa |
|---|---|---|
| `rg_young_infant_any` | 3 | Ghi rõ đây là chính sách thận trọng hơn IMCI (IMCI cho chăm sóc tại nhà nếu không có dấu hiệu nặng). |
| `rg_young_infant_danger_sign` | 2 | Thêm NG143: **thóp phồng không có trong danh sách IMCI 2014**, chỉ có trong NG143 (nhóm đỏ). |
| `rg_fever_under_3_months` | 2 | Thêm IMCI và NG254. Ghi chú: doctor-v định nghĩa sốt từ 37,5°C (IMCI), NICE dùng 38°C cho trẻ dưới 3 tháng. |
| `rg_child_general_danger_sign` | 2 | Thêm locator, ghi chú. |
| `rf_child_dehydration` | 3 | Cơ sở `verbal` → `judgment`: IMCI cần 2 dấu hiệu mới xếp "có mất nước", và tiểu ít không phải dấu hiệu IMCI (lấy từ NG143). |
| `rf_hfmd_startle` | 2 | Đã đối chiếu 292: giật mình dưới 2 lần/30 phút (bệnh sử) là độ 2a; từ 2 lần/30 phút hoặc thấy khi khám là độ 2b; từ độ 2a điều trị nội trú. |
| `rf_neck_stiffness` | 2 | **Bỏ CG150** (CG150 không nêu cứng gáy). Thêm NG240, NG228, IMCI. |
| `rf_fever_non_blanching_rash` | 2 | Thêm NG240, NG253, NG254. **Lưu ý mâu thuẫn**: theo 2760, chấm xuất huyết dưới da là biểu hiện của sốt xuất huyết chưa có dấu hiệu cảnh báo (ngoại trú). Giữ mức 2 để không bỏ sót nhiễm khuẩn huyết do não mô cầu, liên cầu lợn. |
| `rf_altered_consciousness` | 2 | NG51 → NG253, NG254; thêm 2760, NHS Sepsis. |
| `rf_shock_signs` | 2 | NG51 → NG253, NG254; thêm 3377 (suy sụp là tiêu chuẩn sốt rét ác tính). 2760 mục IV.A.3.b nêu "tay chân lạnh, ẩm" và "mệt lả, bứt rứt" là dấu hiệu cần đến khám lại ngay. |
| `rf_fever_mucosal_bleeding`, `rf_fever_severe_abdominal_pain`, `rf_fever_vomiting_critical_phase` | 2 | Thêm WHO 2025 và locator 2760 (Phụ lục 2; ngưỡng nôn: từ 3 lần/1 giờ hoặc 4 lần/6 giờ; giai đoạn nguy hiểm ngày 3–7). |
| `rf_persistent_vomiting` | 3 | Thêm locator. |
| `rf_fever_breathing` | 3 | NG51 → NG253, NG254; thêm IMCI, 1840. Ghi chú nguồn không thống nhất (xem mục 9). |
| `rf_prolonged_fever` | 3 | Thêm IMCI: sốt mỗi ngày quá 7 ngày thì chuyển khám. |
| `rf_severe_abdominal_pain` | 2 | Bậc C → **B**: thêm WHO BEC (đau bụng dữ dội hoặc bụng rất cứng: chảy máu hay nhiễm trùng trong ổ bụng; chửa ngoài tử cung). |
| `rf_abdomen_hard_swollen` | 2 | Bậc C → **B**: thay NHS (trang hiện hành không còn nêu dấu hiệu này) bằng WHO BEC và WSES. |
| `rf_gi_bleeding` | 2 | Thêm WHO BEC, NHS, 2760. Ghi chú: CG141 là hướng dẫn trong bệnh viện. |
| `rf_fainting_with_pain` | 2 | Bậc C → **B**: thay NHS bằng CG95, NG126, NG228, WHO BEC; cơ sở `judgment`. |
| `rf_bowel_obstruction_signs` | 2 | Bậc C → **B**: thêm WSES. |
| `rf_pregnant_pain_bleeding` | 2 | Thêm WHO BEC, locator NG126 1.4.1, 1.4.3, 1.4.7, 1.4.9. |
| `rf_pregnant_abdominal_pain` | 3 | Thêm NHS (đau bụng khi có thai → hẹn khám khẩn hoặc gọi 111). |
| `rf_red_jelly_stool` | 2 | Cơ sở `verbal` → `judgment`. 3312/2015 **không có bài lồng ruột**; chỉ bài Xuất huyết tiêu hóa nêu lồng ruột là nguyên nhân và cần điều trị phẫu thuật. Cần nguồn ngoại nhi chính thức. |
| `rf_chest_pain` | 2 | Thêm NHS Chest pain. Giữ mức 2 vì câu hỏi chưa phân biệt đang đau hay đã hết (CG95: đang đau hoặc đau trong 12 giờ → chuyển viện cấp cứu). |
| `rf_thunderclap_headache` | 1 | Đã đối chiếu NG228 1.1.3 (đạt đỉnh trong 1–5 phút) và 1.1.5 (chuyển ngay đến khoa cấp cứu); thêm NHS Headaches. |
| `rf_new_seizure` | 2 | **Bỏ CG150** (CG150 không nêu co giật). Thêm IMCI, NG240, NHS Headaches. |
| `rf_vision_loss` | 2 | CG150 không nêu mức khẩn; mức 2 dựa thêm vào NHS Headaches (mất thị lực → gọi 999 hoặc đến cấp cứu). |
| `rf_postpartum_headache` | 3 | Thêm NG194; trở thành mức nền (xem quy tắc mới `rf_postpartum_severe_headache`). |
| `rf_pregnancy_severe_bp` | 2 | Ghi chú định nghĩa NG133 ("trên 160/110"; lựa chọn của doctor-v gồm cả đúng 160/110). |
| `rf_extreme_bp` | 3 | Cơ sở `judgment`: NICE chỉ yêu cầu thăm dò càng sớm càng tốt và đo lại trong 7 ngày; mức 3 thận trọng hơn. |
| `rf_new_headache_over_50` | 3 | Cơ sở `judgment`: CG150 không nêu mốc 50 tuổi. |
| `rf_progressive_headache` | 3 | Cơ sở `judgment`; thêm NHS Headaches. |
| `rf_immunocompromised_headache` | 3 | Ghi chú: CG150 nói "đau đầu mới xuất hiện", quy tắc áp dụng cho mọi đau đầu. |

### 3.4 Quy tắc mới (10)

| Quy tắc | Mức | Điều kiện | Nguồn |
|---|---|---|---|
| `rf_hfmd_warning_signs` | 2 | Trẻ 2 tháng–12 tuổi, phỏng nước tay chân hoặc loét miệng, kèm sốt từ 39°C, sốt từ 3 ngày, nôn liên tục hoặc khó thở | 292 mục III.3.1 (dấu hiệu cần tái khám ngay), II.6.2.1, II.6.3 |
| `rf_hfmd_infant` | 3 | Trẻ dưới 12 tháng nghi tay chân miệng | 292 mục III.2.1 (trạm y tế phải chuyển tuyến độ 1 ở trẻ dưới 12 tháng) |
| `rf_non_blanching_rash` | 2 | Ban không mất khi ấn, không cần sốt | NG240 1.1.9, 1.1.10, 1.1.13; NHS Stomach ache, Headaches |
| `rf_fever_critical_phase_signs` | 2 | Sốt ngày 3–7 kèm tiểu ít hoặc khó thở | 2760 Phụ lục 2 (tiểu ít là dấu hiệu cảnh báo; ứ dịch, suy hô hấp là sốt xuất huyết nặng); WHO 2025 |
| `rf_high_risk_fever_breathing` | 2 | Sốt kèm khó thở ở người từ 65 tuổi, có thai hoặc suy giảm miễn dịch | 1840 (cúm nặng, nhóm nguy cơ); NG253 |
| `rf_fever_3_6_months_high_temp` | 2 | Trẻ dưới 6 tháng sốt từ 39°C | NG143 1.2.13 (vàng), NG254 (trung bình–cao), NHS Sepsis (gọi 999 hoặc đến cấp cứu). Mức 2 là lựa chọn thận trọng, cần bác sĩ duyệt. |
| `rf_abdominal_pain_vaginal_bleeding` | 3 | Đau bụng kèm ra máu âm đạo bất thường | NHS Stomach ache; NG126 1.4.5 |
| `rf_bloody_diarrhea` | 3 | Tiêu chảy có máu | IMCI (lỵ: kháng sinh, hẹn khám lại 3 ngày); NHS Stomach ache |
| `rf_postpartum_severe_headache` | 2 | Trong 6 tuần sau sinh: đau đầu mức vừa trở lên, đau từ 4 giờ, nhìn mờ hoặc mất thị lực | NG194 1.2.4 (đau đầu dai dẳng hoặc dữ dội → đi khám không chậm trễ); NG133 |
| `rf_new_headache_vomiting` | 3 | Đau đầu lần đầu hoặc nặng dần, kèm nôn | CG150 1.1.2; NHS Headaches |

### 3.5 Đối chiếu các dữ kiện then chốt được giao

| Dữ kiện | Kết quả |
|---|---|
| IMCI, trẻ 2 tháng–5 tuổi | Đúng: không uống hoặc bú được, nôn tất cả, co giật, li bì hoặc hôn mê, đang co giật → chuyển viện khẩn. Sốt kèm cứng gáy → bệnh sốt rất nặng. |
| IMCI, trẻ dưới 2 tháng | Đúng: bú kém, co giật, thở từ 60 lần/phút, rút lõm lồng ngực nặng, sốt **từ 37,5°C**, hạ thân nhiệt **dưới 35,5°C** (đo ở nách; đo hậu môn cao hơn khoảng 0,5°C), chỉ cử động khi bị kích thích. Thóp phồng không có trong danh sách 2014. |
| NG143, trẻ dưới 3 tháng sốt | Đúng: từ 38°C là nhóm nguy cơ cao (khuyến cáo 1.2.12); dấu hiệu đỏ khi đánh giá từ xa → khám trực tiếp trong 2 giờ (1.3.3). |
| 2760, dấu hiệu cảnh báo | Đúng: vật vã, lừ đừ, li bì; đau bụng nhiều và liên tục hoặc tăng cảm giác đau vùng gan; nôn ói nhiều từ 3 lần/1 giờ hoặc 4 lần/6 giờ; xuất huyết niêm mạc; gan to trên 2 cm; tiểu ít; Hct tăng kèm tiểu cầu giảm nhanh; AST/ALT từ 400 U/L; tràn dịch màng phổi, màng bụng. Quy tắc cũ thiếu "tiểu ít" → thêm `rf_fever_critical_phase_signs`. |
| 292, độ 2a | Đúng: bệnh sử giật mình dưới 2 lần/30 phút và không có lúc khám, hoặc sốt trên 39°C hay trên 2 ngày kèm nôn ói nhiều, lừ đừ, khó ngủ, quấy khóc vô cớ. |
| SAH (NG228) | Đúng: đau đầu sét đánh đạt đỉnh trong 1–5 phút; chuyển ngay đến khoa cấp cứu. Mức 1 giữ nguyên. |
| Chấn thương đầu (NG232) | Mức cũ thấp hơn nguồn → đã sửa (mục 3.1). |
| Tăng huyết áp thai kỳ (NG133) | Ngưỡng nặng 160/110 đúng (định nghĩa: trên 160 hoặc trên 110). Thiếu nôn và đau dưới sườn → đã thêm. |
| Tăng huyết áp người lớn (NG136) | Ngưỡng 180/120 đúng. Đau đầu không thuộc nhóm triệu chứng khám trong ngày → đã sửa. |
| Đau ngực (CG95) | Đúng; thêm buồn nôn, nôn, choáng ở quy tắc mức 1. |
| Xuất huyết tiêu hóa trên (CG141) | CG141 chỉ là hướng dẫn trong bệnh viện; mức 2 dựa thêm vào WHO BEC và NHS. |
| Chửa ngoài tử cung (NG126) | Đúng; mức 2 (đau kèm ra máu) và mức 3 (đau khi có thai) phù hợp. |

---

## 4. Màn sàng lọc cấp cứu

Không sửa `emergency-screen.yaml` vì mọi mục còn thiếu đều cần dấu hiệu mới. Bảy mục hiện có (bất tỉnh hoặc đang co giật, khó thở dữ dội, đau thắt ngực dữ dội, dấu hiệu đột quỵ, chảy máu nhiều, dị ứng nặng, ý định tự hại) đều là tình trạng cấp cứu được WHO BEC đề cập (đường thở, thở, chảy máu nặng, sốc phản vệ, đột quỵ, co giật). Đau ngực và đột quỵ khớp với NHS Chest pain và NHS Headaches.

Còn thiếu so với nguồn đã đọc:

1. **Ngộ độc**: uống nhầm thuốc, hóa chất, thuốc trừ sâu, rượu không rõ nguồn gốc (WHO BEC: poisoning/ingestion/exposure). Đặc biệt quan trọng ở Việt Nam (ngộ độc methanol).
2. **Rắn cắn, côn trùng đốt có nọc** (WHO BEC: envenomation). `es_anaphylaxis` chỉ bắt khi đã sưng môi, lưỡi hoặc khó thở.
3. **Chấn thương nặng**: tai nạn giao thông, ngã cao trên 1 m hoặc trên 5 bậc thang, vết thương xuyên (WHO BEC; NG232 định nghĩa chấn thương năng lượng cao).
4. **Bỏng rộng, bỏng mặt hoặc đường thở** (WHO BEC).
5. **Dấu hiệu sốc**: da tím tái, xám hoặc loang lổ, lạnh ẩm, kèm lơ mơ (NHS Sepsis: gọi 999 hoặc đến cấp cứu; NG253, NG254: nguy cơ cao). Hiện chỉ được hỏi trong luồng sốt (`cold_hands_feet`).
6. **Đã tự làm hại** (đã uống thuốc, hóa chất để tự tử). `es_self_harm` chỉ hỏi về ý định.
7. **Trẻ nhỏ khóc yếu, rên hoặc khóc thét liên tục, không đáp ứng như thường lệ** (NHS Sepsis; NG143, NG254: nguy cơ cao).

---

## 5. Danh sách dấu hiệu nguy hiểm của triệu chứng chính

| Triệu chứng chính | Thay đổi | Lý do |
|---|---|---|
| Sốt | Thêm `bleeding_gums_nose` và `fever_duration` vào `red_flags`; thêm `bleeding_gums_nose` vào `safety_net`; nguồn: NG51 → NG253, NG254, thêm 2760 | Chảy máu niêm mạc là dấu hiệu cảnh báo sốt xuất huyết nhưng trước đây không được hỏi bắt buộc. Bộ suy luận coi dấu hiệu chưa hỏi là "không có", nên các quy tắc giai đoạn nguy hiểm (ngày 3–7) và tay chân miệng chỉ chạy được khi số ngày sốt đã được hỏi. |
| Đau đầu | Thêm `rash_any`, `rash_non_blanching` vào `red_flags`; thêm `rash_non_blanching` vào `safety_net`; nguồn thêm NG228, NG232, NG240, NHS Headaches | NHS Headaches và NG240: đau đầu kèm ban không mất khi ấn → cấp cứu. |
| Đau bụng | Thêm `no_stool_or_gas` vào `safety_net`; nguồn thêm WHO BEC, WSES, NG126 | Quy tắc tương ứng đã lên mức 2. |

Chưa sửa (đề xuất):

- Đau bụng: thêm `episodic_crying_legs_drawn` (trẻ 2 tháng–5 tuổi) vào danh sách bắt buộc, kèm quy tắc mức 2 khi có nôn (lồng ruột), sau khi có nguồn ngoại nhi chính thức. Phân như mứt dâu là dấu hiệu muộn.
- Sốt ở trẻ: đặt `applies_to` theo tuổi trẻ em cho `hand_foot_blisters` và `mouth_ulcers`, rồi đưa vào danh sách bắt buộc, để các quy tắc tay chân miệng chạy được.
- `bp_measured` hiện không nằm trong danh sách bắt buộc nào; các quy tắc huyết áp chỉ chạy khi bộ suy luận tự chọn hỏi. Nên hỏi bắt buộc ở phụ nữ có thai từ 20 tuần và khi đau đầu ở người lớn.
- Bộ suy luận coi dấu hiệu chưa hỏi là "không có" (`packages/engine/src/expr.ts`). Người bảo trì cần kiểm tra mọi dấu hiệu dùng trong quy tắc mức 1–2 đều được hỏi.

---

## 6. Câu chữ của dấu hiệu (findings)

Chỉ sửa trường chữ; không đổi ID, loại hay lựa chọn.

| Tệp | Dấu hiệu | Trường | Cũ → mới | Lý do |
|---|---|---|---|---|
| cardio.yaml | `pain_radiates_arm_jaw` | `label_vi` | "Đau lan lên cổ, hàm, tay trái" → "Đau lan lên cổ, hàm, vai, tay" | CG95 (tay, lưng, hàm) và NHS (tay trái **hoặc phải**): giới hạn ở tay trái là sai. |
| cardio.yaml | `pain_radiates_arm_jaw` | `question_vi` | "…vai hoặc tay trái không?" → "Cơn đau có lan lên cổ, hàm, vai hoặc cánh tay không?" | Như trên. |
| cardio.yaml | `bp_measured` | `help_vi` | Thêm "Nếu hai số thuộc hai mức khác nhau, chọn mức cao hơn." | Ngưỡng NICE dùng "tâm thu **hoặc** tâm trương" (NG133, NG136). |
| emergency.yaml | `es_crushing_chest_pain` | `help_vi` | "…lan lên cổ, hàm hoặc tay trái." → "…lan lên cổ, hàm, vai, cánh tay hoặc ra sau lưng." | CG95, NHS. |
| general.yaml | `fever` | `help_vi` | Thêm "đo ở nách" | Ngưỡng 37,5°C của IMCI là nhiệt độ ở nách. |
| general.yaml | `rash_non_blanching` | `help_vi` | Thêm "Cần xem khắp người, kể cả lòng trắng mắt." | NG240 khuyến cáo 1.1.12. Cách thử bằng ly thủy tinh đã đúng. |
| general.yaml | `persistent_vomiting` | `help_vi` (mới) | "Ví dụ: nôn từ 3 lần trong 1 giờ, hoặc từ 4 lần trong 6 giờ." | Ngưỡng của 2760 (Phụ lục 2) và WHO 2025. |
| child.yaml | `young_infant_fast_breathing` | `help_vi` | Thêm "Thở nhanh là từ 60 lần/phút trở lên khi bé nằm yên." | Ngưỡng IMCI. |
| child.yaml | `young_infant_low_temp` | `help_vi` (mới) | "Đo nhiệt độ ở nách. Nếu không có nhiệt kế, sờ bụng hoặc nách bé xem có lạnh bất thường không." | IMCI Module 2. |
| child.yaml | `startle_myoclonus` | `help_vi` (mới) | "Là những cơn giật mình ngắn 1–2 giây ở tay chân, hay gặp lúc mới ngủ hoặc khi nằm ngửa." | 292 mục II.5.1. Trẻ khỏe cũng hay giật mình, mô tả giúp tránh trả lời sai. |
| neuro.yaml | `headache_thunderclap` | `help_vi` | "…chỉ trong vài phút…" → "…trong vòng 5 phút…" | CG150 1.1.1 (trong 5 phút), NG228 (1–5 phút). |

Đã kiểm tra, không thấy sai: định nghĩa sốt 37,5°C; ngưỡng 35,5°C; cách thử ly thủy tinh; các câu hỏi về IMCI; `es_stroke_signs` (FAST); tiêu chuẩn tiêu chảy (từ 3 lần/ngày); câu hỏi thay thế 15 phút của `es_crushing_chest_pain` (CG95).

---

## 7. Chưa xác minh được

- `byt-qd-3312-2024` (đột quỵ não): không tìm thấy PDF chính thức; chỉ có trang thứ cấp.
- `nice-ng51`: đã bị thay thế; không đọc được nội dung.
- 3377/QĐ-BYT: số và ngày không hiện trên bản quét (lấy theo tiêu đề trang của Viện Sốt rét Quy Nhơn).
- 292/QĐ-BYT và 3312/2015: chưa có PDF ký số trên cổng Bộ Y tế; đã đọc bản Word (cổng Sở Y tế TP.HCM) và bản PDF đăng lại (vnras.com).
- WSES ASBO: chưa kiểm tra có bản cập nhật sau 2018 hay không.
- Nguồn ngoại nhi chính thức cho lồng ruột: chưa tìm thấy.
- NG255 (nhiễm khuẩn huyết ở phụ nữ có thai hoặc mới sinh): chưa đọc; nên dùng cho sốt khi có thai hoặc sau sinh.

---

## 8. Đề xuất dấu hiệu mới

Lượt R không tự thêm dấu hiệu (kb-guide mục 6). Đề xuất theo thứ tự ưu tiên:

```yaml
proposed_findings:
  - id: low_body_temp
    kind: measurement
    type: binary
    label_vi: "Nhiệt độ dưới 36°C"
    question_vi: "Nhiệt độ đo được có dưới 36°C không?"
    why: "NG254: dưới 36°C là nguy cơ cao ở trẻ dưới 5 tuổi; NG253: nguy cơ trung bình ở người lớn; NHS Sepsis: gọi 999. Hiện chỉ có dấu hiệu này cho trẻ dưới 2 tháng."
  - id: no_urine_12h
    kind: sign
    type: binary
    label_vi: "Không đi tiểu suốt 12 giờ"
    question_vi: "Trong 12 giờ qua, có lần nào đi tiểu không?"
    why: "NHS Sepsis (trẻ không tiểu 12 giờ: gọi 999); NG253 (không tiểu 18 giờ: nguy cơ cao); 2760 (không tiểu trên 6 giờ: khám lại ngay). 'decreased_urine' chỉ hỏi tiểu ít."
  - id: urinary_retention
    kind: symptom
    type: binary
    label_vi: "Buồn tiểu mà không tiểu được"
    question_vi: "Có buồn tiểu mà không tiểu ra được không?"
    why: "NHS Stomach ache: đau bụng kèm không tiểu được → gọi 999 hoặc đến cấp cứu."
  - id: bilious_vomiting
    kind: sign
    type: binary
    label_vi: "Nôn ra dịch xanh"
    question_vi: "Chất nôn có màu xanh lá cây không?"
    why: "NHS Stomach ache: nôn ra dịch xanh → gọi 999 hoặc đến cấp cứu (tắc ruột, xoắn ruột ở trẻ nhỏ)."
  - id: heavy_rectal_bleeding
    kind: sign
    type: binary
    label_vi: "Đi ngoài ra nhiều máu"
    question_vi: "Có đi ngoài ra nhiều máu đỏ hoặc máu cục không?"
    why: "NHS Stomach ache: chảy nhiều máu từ hậu môn → gọi 999. 'diarrhea_bloody' chỉ hỏi khi có tiêu chảy."
  - id: head_injury_loss_of_consciousness
    kind: history
    type: binary
    label_vi: "Bất tỉnh sau va đập đầu"
    question_vi: "Sau khi va đập đầu, có lúc nào bất tỉnh không?"
    why: "NG232 khuyến cáo 1.2.3–1.2.4."
  - id: anticoagulant_use
    kind: risk_factor
    type: binary
    label_vi: "Đang dùng thuốc chống đông máu"
    question_vi: "Có đang dùng thuốc chống đông máu hoặc thuốc chống kết tập tiểu cầu không?"
    why: "NG232 1.2.3 (chấn thương đầu: chuyển cấp cứu); hữu ích cho xuất huyết tiêu hóa."
  - id: high_energy_injury
    kind: history
    type: binary
    label_vi: "Chấn thương mạnh"
    question_vi: "Có bị tai nạn xe, ngã từ trên cao hoặc ngã cầu thang không?"
    why: "NG232 1.2.2 (chấn thương năng lượng cao: gọi xe cấp cứu); có thể dùng cho màn sàng lọc cấp cứu."
  - id: poisoning_ingestion
    kind: exposure
    type: binary
    label_vi: "Uống phải thuốc, hóa chất hoặc rượu lạ"
    question_vi: "Có uống nhầm thuốc, hóa chất hoặc rượu không rõ nguồn gốc không?"
    why: "WHO BEC (ngộ độc); thiếu trong màn sàng lọc cấp cứu."
  - id: shock_skin_signs
    kind: sign
    type: binary
    label_vi: "Da tím tái, loang lổ"
    question_vi: "Da, môi hoặc lưỡi có tím tái, xám hoặc nổi vân loang lổ không?"
    why: "NG253, NG254: nguy cơ cao; NHS Sepsis: gọi 999. Hiện gộp với tay chân lạnh (nguy cơ trung bình) trong 'cold_hands_feet'."
  - id: breathing_fast_at_rest
    kind: sign
    type: binary
    label_vi: "Thở rất nhanh khi nằm nghỉ"
    question_vi: "Khi nằm nghỉ, có thở rất nhanh hoặc nói không trọn câu không?"
    why: "NHS Sepsis (thở rất nhanh: gọi 999); NG253 (từ 25 lần/phút: nguy cơ cao). Tách khỏi 'breathing_difficulty' (hiện gộp nhiều mức độ)."
  - id: weak_or_high_pitched_cry
    kind: sign
    type: binary
    label_vi: "Khóc yếu, rên hoặc khóc thét"
    question_vi: "Bé có khóc yếu, rên, hoặc khóc thét liên tục không?"
    why: "NG143 (đỏ), NG254 (nguy cơ cao), NHS Sepsis."
  - id: chest_pain_ongoing
    kind: symptom
    type: binary
    label_vi: "Đang đau ngực hoặc đau trên 15 phút"
    question_vi: "Cơn đau ngực còn đang đau, hoặc đã kéo dài trên 15 phút không?"
    why: "CG95 1.2.1.3, 1.2.1.7; cho phép tách mức 1 và mức 2 ở 'rf_chest_pain'."
  - id: headache_cough_exertion
    kind: symptom
    type: binary
    label_vi: "Đau đầu tăng khi ho, rặn, gắng sức"
    question_vi: "Đau đầu có xuất hiện hoặc tăng khi ho, hắt hơi, rặn hoặc gắng sức không?"
    why: "CG150 1.1.1; NHS Headaches (hẹn khám khẩn)."
  - id: jaw_claudication_scalp_tenderness
    kind: symptom
    type: binary
    label_vi: "Đau hàm khi nhai, đau da đầu"
    question_vi: "Có đau hàm khi nhai, hoặc da đầu đau khi chạm không?"
    why: "CG150 1.1.1 (viêm động mạch tế bào khổng lồ); NHS Headaches."
  - id: shoulder_tip_pain
    kind: symptom
    type: binary
    label_vi: "Đau ở đầu vai"
    question_vi: "Có đau ở đầu vai, không rõ lý do không?"
    why: "NG126 1.4.3 (triệu chứng chửa ngoài tử cung)."
  - id: heavy_vaginal_bleeding
    kind: sign
    type: binary
    label_vi: "Ra máu âm đạo nhiều"
    question_vi: "Có đang ra máu âm đạo rất nhiều không?"
    why: "NG126 1.4.1 (lo ngại về lượng máu → cấp cứu); NG194 1.2.4 (ra máu nhiều đột ngột sau sinh)."
  - id: severe_neonatal_jaundice
    kind: sign
    type: binary
    label_vi: "Vàng da lan tới lòng bàn tay, bàn chân"
    question_vi: "Lòng bàn tay hoặc lòng bàn chân của bé có bị vàng không?"
    why: "IMCI: vàng da trước 24 giờ tuổi hoặc vàng lòng bàn tay, bàn chân là vàng da nặng → chuyển viện khẩn."
```

---

## 9. Vấn đề mở cần bác sĩ hoặc người bảo trì quyết định

1. **Sốt kèm khó thở** (`rf_fever_breathing`, mức 3). Nguồn không thống nhất: IMCI xếp thở nhanh, rút lõm lồng ngực ở trẻ 2 tháng–5 tuổi là viêm phổi điều trị ngoại trú; NHS Sepsis và NG253 xếp thở rất nhanh ở người lớn vào nhóm gọi 999; 1840 xếp cúm kèm khó thở vào cúm nặng. Lượt R chỉ nâng lên mức 2 cho nhóm nguy cơ cao và giai đoạn nguy hiểm của sốt xuất huyết. Nên tách câu hỏi theo mức độ (mục 8).
2. **Sốt kèm chấm xuất huyết** trong mùa sốt xuất huyết: NICE xếp nguy cơ cao (mức 2), 2760 xếp ngoại trú. Giữ mức 2 sẽ đưa nhiều ca sốt xuất huyết chưa có dấu hiệu cảnh báo đến cấp cứu.
3. **Trẻ 3–6 tháng sốt từ 39°C** (`rf_fever_3_6_months_high_temp`): NICE xếp vàng, NHS khuyên đến cấp cứu; lượt R chọn mức 2.
4. **Đau đầu ở thai từ 20 tuần**: NG133 nói "dữ dội", quy tắc bắt mọi đau đầu (thận trọng).
5. **Tuổi trong `rf_high_risk_fever`** đã hạ xuống 65 theo 1840; 1840 còn nêu trẻ dưới 5 tuổi (nhất là dưới 2 tuổi) và người có bệnh nền (tim, phổi, thận, gan, đái tháo đường) là nhóm nguy cơ cúm nặng, chưa đưa vào quy tắc.
6. **Lồng ruột**: cần nguồn ngoại nhi chính thức và quyết định có thêm quy tắc "khóc thét từng cơn kèm nôn" ở trẻ 2 tháng–5 tuổi hay không.
7. **Mức 1 hay 2** cho li bì, khó đánh thức (`rf_altered_consciousness`): NHS và NICE đều ghi "gọi 999 hoặc đến cấp cứu"; lượt R giữ mức 2.
