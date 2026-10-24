# doctor-v: Bằng chứng và phương pháp luận cho engine kiểm tra triệu chứng

*Báo cáo nghiên cứu nội bộ, cập nhật 2026-10-24.*

*Phạm vi:*
- độ chính xác của symptom checker (SC) và LLM;
- các cách tiếp cận suy luận;
- chọn câu hỏi;
- mô hình xác suất;
- triage;
- phương pháp đánh giá;
- phản biện thiết kế nháp.

**Quy ước**
- **[V]**: đã đối chiếu trực tiếp với nguồn gốc (toàn văn, tóm tắt chính thức, hoặc trang tài liệu chính thức).
- **[V2]**: chỉ đối chiếu được qua nguồn thứ cấp, ví dụ tổng quan hệ thống, preprint thay cho bản in, metadata hoặc trích đoạn kết quả tìm kiếm. Nguồn thứ cấp được ghi trong ngoặc.
- **CHƯA XÁC MINH**: không kiểm chứng được. Không dùng làm căn cứ quyết định trước khi kiểm lại.
- **(PĐ)**: phán đoán kỹ thuật của người lập báo cáo, không phải kết quả nghiên cứu.
- [n] là tài liệu tham khảo số n ở mục 6.
- Số thập phân dùng dấu phẩy. Trong công thức và khối mã dùng dấu chấm.
- Giới hạn quy trình:
  - Hạn mức WebSearch (200 lượt, dùng chung) đã hết giữa chừng. Phần còn lại được xác minh bằng cách truy cập trực tiếp các URL đã biết (PMC, arXiv, trang chính thức).
  - BMJ, Nature, PubMed và thuvienphapluat.vn chặn truy cập tự động.
  - Có thể còn sót nghiên cứu công bố năm 2026.

---

## 1. Tóm tắt

**Bằng chứng chính**

1. **SC "cổ điển" (2015–2022) chẩn đoán kém hơn bác sĩ nhiều.**
   - Chẩn đoán đúng ở vị trí đầu (top-1) chỉ 19–37,9%, top-3 33–58% (tổng quan 10 nghiên cứu, 48 SC) [6].
   - Trên cùng 45 vignette, bác sĩ đạt top-1 72,1% và top-3 84,3% [2].
   - Triage khớp chính xác trung bình 49–58% [1,4,5,7], dao động 17–90% giữa các công cụ [1,5,10].
2. **Mức an toàn không ổn định theo thời gian.**
   - Năm 2015, SC vẫn khuyên đi khám ở khoảng 2/3 số lượt mà người bệnh không cần chăm sóc y tế [1].
   - Năm 2020, các app bỏ sót 42,5% ca cấp cứu (tỷ lệ over:under 1,11:1) [7].
   - Vì vậy "under-triage ca cấp cứu" và "over-triage ca tự chăm sóc" phải là hai chỉ số báo cáo riêng.
3. **Người thường là mốc so sánh thực tế.**
   - Họ tự triage đúng 47,3–62,4% (tổng quan 19 nghiên cứu) [17].
   - Họ bỏ sót khoảng 1/3 ca cấp cứu, nhưng hiếm khi đẩy ca tự chăm sóc vào cấp cứu (4,1%, so với 24,7% của SC) [8].
   - Một app tốt nâng độ chính xác tự triage của người thường từ 53,2% lên 64,5%. LLM thì không (54,8% → 54,2%) [18].
4. **Nhà cung cấp tốt nhất (Ada).**
   - Trên vignette do chính hãng tài trợ: top-3 70,5% và triage an toàn 97% [3].
   - Trên bệnh nhân cấp cứu thật tự nhập: top-3 63%, triage không an toàn 14% [11].
5. **LLM: điểm cao trên giấy, kém khi người thật sử dụng.**
   - Gần như bão hòa vignette "sạch": GPT-4o, Claude 3.5 Sonnet và Gemini 1.5 Pro đạt triage 92–94% trên 48 vignette [15].
   - Khi người thật dùng LLM, tỷ lệ nêu đúng bệnh ≤34,5% và chọn đúng hướng xử trí <44,2%, không hơn nhóm chứng (RCT 1.298 người) [19].
   - Trên vignette đại diện, LLM chỉ đúng 6,15% ca tự chăm sóc [16].
   - Trên bệnh nhân cấp cứu thật, ChatGPT-3.5/GPT-4 under-triage 41%/22% [12].
6. **AMIE và MAI-DxO.**
   - Mạnh khi mô phỏng các ca khó [21,22,24].
   - Bằng chứng thực địa duy nhất là 100 bệnh nhân, có bác sĩ giám sát trực tiếp: top-1 56%, top-3 75% [23].
7. **Mô hình Bayes do chuyên gia tham số hóa vẫn hoạt động tốt với xác suất thô.**
   - QMR-DT ánh xạ 5 mức tần suất thành 0,025/0,20/0,50/0,80/0,985 và đạt tương đương QMR [38,39].
   - Mạng noisy-OR của Babylon ngang bác sĩ (72,52% vs 71,40%) [55].
   - Độ chính xác ít nhạy với sai số tham số, nhưng rất nhạy với xác suất bằng 0 và với leak [38,84–86].

**Khuyến nghị cho engine** (chi tiết ở mục 4)

1. Giữ engine Bayes xác định (deterministic) chạy trong trình duyệt. Không dùng LLM làm engine triage.
2. Lưu tham số dạng noisy-OR:
   - link strength p_df theo 5 mức QMR-DT, trần 0,95;
   - leak ℓ_f theo từng finding, trong ngữ cảnh triệu chứng chính.

   v1 suy luận single-fault. v2 có thể chuyển sang noisy-OR đa bệnh mà không phải gợi xuất lại tham số.
3. Prior là P(bệnh | triệu chứng chính, nhóm tuổi, giới) theo thang log 6 mức. Các hệ số mùa, vùng và thai phải có giới hạn và có nguồn.
4. Chống double counting bằng ba lớp: gom finding tương quan, hệ số co theo cụm, và temperature toàn cục hiệu chỉnh trên dữ liệu kiểm định.
5. Không dùng xác suất 0 hay 1, trừ khi loại trừ giải phẫu tường minh. Với red flag, "Không rõ" nghĩa là "chưa loại trừ".
6. Triage dựa trên xác suất cộng dồn theo từng mức khẩn.
   - Ngưỡng suy ra từ tỷ lệ tổn thất: mặc định 2% cho mức cấp cứu, 1% cho bệnh "không được bỏ sót".
   - Kết hợp thêm red flag, tổ hợp dấu hiệu, và quy tắc tường minh cho nhóm nguy cơ.
7. Chọn câu hỏi theo value of information (VOI) của quyết định triage trước, theo entropy chẩn đoán sau. Dừng khi triage ổn định; trần 30 câu.
8. Kiểm định nhiều tầng, với các mục tiêu:
   - triage an toàn ≥97%;
   - under-triage cấp cứu ≤5%, tính theo cận trên KTC 95% một phía (cần ≥150 ca cấp cứu);
   - over-triage ≤35%;
   - top-3 ≥65% trên vignette giữ kín;
   - triage 3 mức ≥70% trên vignette đại diện tiếng Việt, và cao hơn người thường ≥8 điểm.

---

## 2. Bảng bằng chứng về độ chính xác

Định nghĩa dùng trong bảng:
- **Triage đúng**: khớp chính xác mức chuẩn.
- **Triage an toàn**: đúng mức, khẩn hơn, hoặc kém khẩn tối đa 1 mức (định nghĩa của Gilbert 2020 và Omaolo) [3,136].

Hai chỉ số này chênh nhau rất xa, không được so sánh lẫn với nhau.

### 2.1 Bảng tổng hợp

| Nghiên cứu | Năm | Mẫu / vignette | Chỉ số | Kết quả (xác minh) |
|---|---|---|---|---|
| Semigran et al., BMJ [1] | 2015 | 23 SC miễn phí tiếng Anh; 45 vignette chuẩn hóa (15 cấp cứu, 15 không cấp cứu, 15 tự chăm sóc) | Top-1/3/20; triage | Top-1 34% (KTC95% 31–37), top-3 51% (47–54), top-20 58% (55–62). Triage đúng 57% (52–61): cấp cứu 80% (75–86), không cấp cứu 55% (47–63), tự chăm sóc 33% (26–40). Giữa các SC: top-1 5–50%, triage 33–78%. Top-1 ở ca cấp cứu 24%, ở ca tự chăm sóc 40%. Ở ca không cần chăm sóc y tế, SC vẫn khuyên đi khám khoảng 2/3 số lượt. [V] |
| Semigran et al., JAMA Intern Med [2] | 2016 | 234 bác sĩ (nền tảng Human Dx), 1.105 lượt giải; cùng 45 vignette | Top-1/3, bác sĩ vs SC | Top-1 72,1% vs 34,0%; top-3 84,3% vs 51,2%. Ca nặng: bác sĩ 79,1%/89,2% vs SC 24,3%/39,5%. Ca nhẹ: 65,3%/78,5% vs 40,5%/57,5%. [V] |
| Gilbert et al., BMJ Open [3] | 2020 | 200 vignette chăm sóc ban đầu (32% từ bản ghi NHS Direct); 8 app; 7 GP. Ada tài trợ; đa số tác giả liên quan Ada | Độ phủ; top-3; triage an toàn | Độ phủ: Ada 99,0%, WebMD 93,0%, Buoy 88,5%, Mediktor 80,5%, K Health 74,5%, Your.MD 64,5%, Symptomate 61,5%, Babylon 51,5%. Top-3: GP 82,1%, Ada 70,5%, app khác 23,5–43,0%. Top-1: app trung bình 26,1% (18–48%), GP 71,2% [V2: 10]. Triage an toàn: GP 97,0%, Ada 97,0%, Symptomate 97,8%, Babylon 95,1%, Your.MD 92,6%, Mediktor 87,3%, K Health 81,3%, Buoy 80,0%. [V] |
| Hill et al., Med J Aust [4] | 2020 | SC miễn phí tại Úc. Số SC và số vignette (36 SC, 48 vignette): CHƯA XÁC MINH từ bản gốc | Top-1; triage | Top-1 36% (31–42), dao động 12–61%. Triage đúng 49% (44–54), dao động 17–61%. Cấp cứu 63% vs không khẩn 30%. SC dựa trên AI: top-1 46% vs 32%. [V2: 6, 10] |
| Ceney et al., PLoS One [5] | 2021 | 12 SC; 50 vignette (44 của Semigran + 6 mới) | Top-1/5; triage; an toàn; dùng dịch vụ quá mức | Top-1 37,7% (33,6–41,7), dao động 22,2% (Caidr) đến 72,0% (Ada). Top-5 51,0%; bất kỳ vị trí 54,2%. Triage 57,7% (53,2–62,2), dao động 35,6–90,0% (Doctorlink cao nhất). An toàn 82,6%, riêng ca cấp cứu 71,8%. 51,0% lượt đề xuất dùng dịch vụ quá mức cần. [V]; tên app theo [V2: 10] |
| Wallace et al., npj Digit Med (tổng quan hệ thống) [6] | 2022 | 10 nghiên cứu (5 vignette, 5 bệnh nhân thật); 48 SC | Top-1; top-3; triage | Top-1 19–37,9%; top-3 33–58%; triage 48,8–90,1%. Mức 90,1% là tỷ lệ *an toàn* của Gilbert, không phải khớp chính xác. 6 nghiên cứu có ≥1 miền nguy cơ sai lệch cao (QUADAS-2). [V] |
| Schmieding et al., JMIR [7] | 2022 | 22 app (2020) vs 15 app (2015); 45 vignette Semigran | Triage | Trung vị 55,8% (IQR 47,8–62,9) vs 59,1% (51,7–67,1). Cấp cứu đúng 57,4% vs 79,2%; bỏ sót cấp cứu 42,5% vs 20,8%. Over:under 1,11:1 vs 2,82:1. Ở quyết định "cần cấp cứu không", 4/22 app vượt trung vị người thường; không app nào vượt người thường ở cả hai quyết định. [V] |
| Schmieding et al., JMIR [8] | 2021 | 91 người Mỹ không chuyên y (MTurk) vs 15 SC; 45 vignette | Triage | Người thường 60,9% (59,5–62,3): cấp cứu 67,5%, không cấp cứu 68,4%, tự chăm sóc 46,7%. SC 58,0%: cấp cứu 80,6%, tự chăm sóc 30,6%. Over:under: người 1,5:1, SC 3,5:1. Ca tự chăm sóc bị đẩy vào cấp cứu: người 4,1%, SC 24,7%. [V] |
| Chambers et al., BMJ Open (tổng quan) [9] | 2019 | 27 nghiên cứu (SC và dịch vụ triage trực tuyến/điện thoại) | Định tính | Triage bằng thuật toán "tended to be more risk averse" so với nhân viên y tế. Bằng chứng an toàn "weak" (không có bằng chứng tác hại khác với bằng chứng không tác hại). Báo cáo Babylon chưa bình duyệt: triage 88,2% vs bác sĩ 75,5%. [V] |
| Riboli-Sasco et al., JMIR (tổng quan) [10] | 2023 | 14 nghiên cứu (7 vignette, 7 dữ liệu thật) | Top-1; triage | 9/13 nghiên cứu cho triage dưới mức tối ưu. 5/9 thấy over-triage; 5/9 thấy under-triage. Yu 2020: under-triage 24% (Drugs.com) đến 45% (FamilyDoctor). Mọi nghiên cứu có ≥1 miền nguy cơ sai lệch không rõ; 6 nghiên cứu nguy cơ cao. [V] |
| Fraser et al., JMIR mHealth uHealth [11] | 2022 | 40 bệnh nhân khoa cấp cứu (Rhode Island) tự nhập vào Ada | Top-1/3/5; triage | Ada: top-1 30%, top-3 63%, top-5 70%. Bác sĩ cấp cứu: top-1 47%, top-3 69%. Triage (n=37): đồng ý 62%, quá thận trọng 24%, không an toàn 14%. [V] |
| Fraser et al., JMIR mHealth uHealth [12] | 2023 | Cùng nhóm bệnh nhân, nhập lại vào ChatGPT-3.5/4 và WebMD | Top-1/3; triage | Top-1/top-3: ChatGPT-3.5 40%/63%, GPT-4 33%/50%, WebMD 40%/57%, Ada 30%/63%. Under-triage: GPT-3.5 41%, GPT-4 22%, WebMD 19%, Ada 14% (Ada vs GPT-3.5: P=0,009). [V] |
| Ito et al., JMIR Med Educ [13] | 2023 | 45 vignette Semigran; GPT-4 vs 3 bác sĩ | Chẩn đoán chính; triage | Chẩn đoán 97,8% vs 91,1%. Triage cùng 66,7%. Ca tự chăm sóc: GPT-4 13,3% vs bác sĩ 40%. [V] |
| Levine et al., Lancet Digit Health [14] | 2024 | 48 vignette (12 mỗi mức triage); GPT-3 vs người thường (5.000 lượt) vs bác sĩ | Top-3; triage | Top-3: GPT-3 88%, người thường 54%, bác sĩ 96%. Triage: 71%, 74%, 91%. [V; số theo preprint, khớp số đếm bản in qua 15] |
| Sorich et al., JMIR (thư) [15] | 2024 | Cùng 48 vignette của [14] | Top-1/3; triage | GPT-4o 94%/98%, triage 92%. Claude 3.5 Sonnet 96%/100%, 94%. Gemini 1.5 Pro 71%/98%, 92%. Lỗi hay gặp nhất: đánh giá quá khẩn. [V] |
| Kopka et al. (RepVig), Sci Rep [16] | 2024 | 45 vignette đại diện, lấy mẫu phân tầng từ 5.388 bài r/AskDocs, so với vignette Semigran; 198 người thường; 12 app; 5 LLM | Triage 3 mức | Bộ đại diện vs Semigran: người thường 62,4% vs 60,9%; app 67,8% vs 48,9%; LLM 67,6% vs 57,8%. LLM chỉ đúng 6,15% ca tự chăm sóc. Thứ hạng app thay đổi mạnh giữa hai bộ. [V] |
| Kopka et al., npj Digit Med (tổng quan) [17] | 2025 | 19 nghiên cứu | Độ chính xác tự triage | App 11,5–90,0%; LLM 57,8–76,0%; người thường 47,3–62,4%. [V] |
| Kopka et al., npj Health Syst [18] | 2025 | Nghiên cứu hỗn hợp có RCT với người thường | Độ chính xác khi có hỗ trợ | Với app hiệu năng cao: 53,2% → 64,5% (OR 2,52; p<0,001). Với LLM: 54,8% → 54,2% (p=0,79). [V]; cỡ mẫu và tên app/LLM CHƯA XÁC MINH |
| Bean et al., Nat Med [19] | 2026 | RCT tiền đăng ký: 1.298 người Anh, 10 kịch bản (từ cảm lạnh đến xuất huyết não); GPT-4o, Llama 3, Command R+ vs nhóm chứng | Nêu bệnh liên quan; hướng xử trí 5 mức | LLM một mình: 94,9% nêu ≥1 bệnh liên quan; hướng xử trí đúng 56,3%. Người dùng LLM: nêu bệnh ≤34,5% (chứng 47,0%); hướng xử trí <44,2%, không hơn chứng. Cả hai nhóm đánh giá thấp mức khẩn. MedQA và người dùng mô phỏng không dự đoán được kết quả với người thật. [V] |
| Johri et al. (CRAFT-MD), Nat Med [20] | 2025 | 2.000 vignette, 12 chuyên khoa, 4 LLM | Độ chính xác theo định dạng | Độ chính xác giảm khi chuyển từ trắc nghiệm sang trả lời mở, và từ tóm tắt ca sang hội thoại nhiều lượt. [V, qua trang tin HMS]. Số của GPT-4 (82% → ~49% → 26%): CHƯA XÁC MINH, chỉ thấy trên báo chí |
| Tu et al. (AMIE), Nature [21] | 2025 | 159 kịch bản OSCE qua chat; 20 bác sĩ chăm sóc ban đầu; 20 diễn viên đóng bệnh nhân | 32 trục (chuyên gia), 26 trục (bệnh nhân); top-k | AMIE vượt bác sĩ ở 30/32 và 25/26 trục; top-k cao hơn với mọi k=1–10 (P<0,05). Lợi thế đến từ diễn giải chứ không từ thu thập thông tin. Hiệu năng giảm với bệnh nhân mô phỏng kém tiếng Anh. [V] |
| McDuff et al., Nature [22] | 2025 | 302 ca NEJM CPC; 20 bác sĩ | Top-10 | AMIE 59,1% vs bác sĩ không hỗ trợ 33,6%. Bác sĩ + AMIE 51,7% vs bác sĩ + tìm kiếm 44,4%. [V, tóm tắt] |
| Brodeur et al. (AMIE thực địa), arXiv [23] | 2026 | 100 người lớn tại urgent care BIDMC; có giám sát thời gian thực | So với chẩn đoán cuối (hồ sơ 8 tuần) | Có trong danh sách chẩn đoán phân biệt (DDx) 90%, top-3 75%, top-1 56%. 0 lần phải dừng vì an toàn. Chất lượng DDx không khác bác sĩ (p=0,6). [V]. Bản in trên The Lancet: CHƯA XÁC MINH |
| Nori et al. (MAI-DxO), arXiv [24] | 2025 | SDBench: 304 ca NEJM CPC chuyển thành chẩn đoán tuần tự; 21 bác sĩ không dùng internet/LLM | Độ chính xác; chi phí | MAI-DxO (o3) 81,9% ($4.735/ca); bản tiết kiệm 79,9% (~$2.396); ensemble 85,5% ($7.184). o3 78,6%; GPT-4o 49,3%; bác sĩ 19,9% ($2.963). Không có ca khỏe mạnh nên chưa đo dương tính giả. [V] |
| Goh et al., JAMA Netw Open [25] | 2024 | RCT với 50 bác sĩ | Điểm lập luận chẩn đoán | Bác sĩ + GPT-4 76% vs 74% (không có ý nghĩa thống kê); GPT-4 một mình 92%. [V] |
| Hager et al., Nat Med [27] | 2024 | 2.400 ca bụng cấp thật (MIMIC) | Chẩn đoán | Khi đủ thông tin: LLM 58,8–~73% vs bác sĩ 87,5–92,5%. Khi LLM phải tự thu thập thông tin: 45,5–54,9%. Thứ tự đưa thông tin làm lệch tới 18 điểm. [V] |
| Masanneck et al., JMIR [28] | 2024 | 124 vignette cấp cứu (Đức), chuẩn MTS | Weighted κ | GPT-4 0,67; bác sĩ chưa đào tạo triage 0,68; GPT-3.5 0,54. LLM nghiêng về over-triage. [V2: tóm tắt qua Semantic Scholar] |
| Kaboudi et al., Arch Acad Emerg Med (phân tích gộp) [30] | 2024 | 14 nghiên cứu, 1.412 bệnh nhân/kịch bản | Triage cấp cứu | GPT-4 0,86 (0,64–0,98); GPT-3.5 0,63 (0,43–0,81). Dị biệt cao. [V] |
| Richens et al., Nat Commun [55] | 2020 | 1.671 vignette; 44 bác sĩ | Độ chính xác ở cùng độ dài danh sách | Bác sĩ 71,40%; Bayes "associative" 72,52% (top 48% bác sĩ); counterfactual 77,26% (top 25%). [V, bản preprint] |
| Baker et al., Front Artif Intell [56] | 2020 | 100 vignette; 7 GP; tác giả thuộc Babylon | Recall; triage an toàn | Recall: bác sĩ 83,9% vs AI 80,0%. Triage an toàn: 93,1% vs 97,0%. [V] |
| Liu et al. (Omaolo, Phần Lan), JMIR Hum Factors [136] | 2024 | 877 lượt tự đánh giá thật tại 18 trung tâm chăm sóc ban đầu; 119 y tá triage độc lập | Khớp chính xác; an toàn | Khớp 53,7%; tính cả khuyến nghị khẩn hơn 1 mức: 66,6%. An toàn 97,6%. 21 ca nguy kịch được hội đồng xem xét, không thấy dấu hiệu nguy hại. [V] |

### 2.2 Under-triage và over-triage

- **Over-triage là xu hướng chủ đạo của SC thế hệ đầu.**
  - Khoảng 2/3 lượt không cần khám vẫn được khuyên đi khám [1].
  - Over:under 3,5:1; 24,7% ca tự chăm sóc bị đẩy vào cấp cứu [8].
  - 51,0% lượt đề xuất dùng dịch vụ quá mức; 51,8% ca tự chăm sóc được khuyên đi khám [5].
  - Tổng quan 2019 kết luận triage bằng thuật toán "risk averse" hơn nhân viên y tế [9].
- **Under-triage cấp cứu không hiếm.**
  - Năm 2020, trung vị độ nhạy với ca cấp cứu chỉ 51,9%, so với 85,7% năm 2015 [7].
  - An toàn ở ca cấp cứu chỉ 71,8% [5]. Under-triage 24–45% trên hồ sơ khoa cấp cứu [10].
  - Ada đưa lời khuyên không an toàn cho 14% bệnh nhân cấp cứu thật [11]. LLM: 22–41% [12].
  - Trong RCT của Bean, cả người dùng LLM lẫn nhóm chứng đều đánh giá thấp mức khẩn [19].
- **Nguyên nhân cấu trúc.**
  - Bộ vignette Semigran đo kém năng lực nhận diện cấp cứu: cả 15 vignette cấp cứu có item-total correlation <0,2 [126].
  - Độ chính xác gộp che giấu đánh đổi: một app không bao giờ khuyên tự chăm sóc vẫn đạt điểm cao ở ca cấp cứu. 4 trong 15 SC năm 2015 được thiết kế không bao giờ khuyên tự chăm sóc [8].
- **Hệ quả cho doctor-v.**
  - Báo cáo riêng: (a) độ nhạy với mức cấp cứu; (b) under-triage ≥2 mức; (c) tỷ lệ đúng ở ca tự chăm sóc; (d) tỷ lệ over:under.
  - Mốc dung sai có sẵn trong triage chấn thương: under-triage ≤5%, over-triage ≤35% (ACS-COT, dẫn bởi Newgard 2022) [124].

### 2.3 Khả năng tự triage của người thường

| Nguồn | Kết quả |
|---|---|
| Schmieding 2021 [8] | Đúng 60,9%: cấp cứu 67,5% (bỏ sót khoảng 1/3), không cấp cứu 68,4%, tự chăm sóc 46,7%. Over:under 1,5:1. 12% người thường nhận diện cấp cứu kém hơn SC kém nhất. |
| RepVig [16] | 62,4% trên vignette đại diện: cấp cứu 78,6%, tự chăm sóc 34,6%, an toàn 90,7%. 74,6% lỗi là over-triage. |
| Levine 2024 [14] | Triage 74% (4 mức); top-3 chẩn đoán 54%. |
| Kopka 2025, tổng quan [17] | 47,3–62,4%. |
| Bean 2026 [19] | Nhóm chứng nêu bệnh liên quan 47,0%; hướng xử trí đúng khoảng 43%. Có xu hướng đánh giá thấp mức khẩn. |
| Kopka 2025, RCT [18] | Mức nền 53,2–54,8%. Có app tốt thì đạt 64,5%. |

Kết luận: đối chứng thực tế của doctor-v là phán đoán của chính người dùng, không phải bác sĩ. Một công cụ chỉ có ích nếu vượt người thường ở **cả** nhận diện cấp cứu lẫn ca tự chăm sóc. Đến năm 2020 chưa app nào làm được điều đó [7].

### 2.4 Mức chính xác thực tế có thể đạt

| Chỉ số | SC điển hình | Tốt nhất đã công bố (điều kiện) | Bác sĩ (cùng điều kiện) | Người thường | Đề xuất cho doctor-v |
|---|---|---|---|---|---|
| Top-1, vignette | 26–38% [3,5,6] | 48% Ada [3]; 72% Ada [5] | 71–72% [2,3] | — | ≥45% (tối thiểu); 55% (mục tiêu) |
| Top-3, vignette | 33–58% [6] | 70,5% Ada [3] | 82,1–84,3% [2,3] | 54% [14] | ≥65%; 75% |
| Top-3, bệnh nhân thật tự nhập | — | 63% Ada (khoa cấp cứu) [11]; 75% AMIE có giám sát [23] | 69% (bác sĩ cấp cứu chỉ dựa trên dữ liệu Ada) [11] | — | ≥55% |
| Triage khớp, 3 mức | 49–58% [1,4,5,7] | 67,8% app trên vignette đại diện [16]; 78–90% ở từng app [1,5] | 91% (4 mức) [14] | 47–62% [8,16,17] | ≥70%, và hơn người thường ≥8 điểm |
| Triage an toàn | 80–97,8% [3]; 82,6% [5] | 97,6% Omaolo thực địa [136] | 97,0% GP [3] | 90,7% [16] | ≥97% |
| Bỏ sót cấp cứu | 20,8% (2015) đến 42,5% (2020) [7]; 28,2% [5] | — | — | khoảng 32,5% [8] | ≤5% (cận trên KTC95% một phía) |
| Đúng ở ca tự chăm sóc | 30,6–45,6% [7,8] | 46,8% app [16] | 40% [13] | 34,6–46,7% [8,16] | ≥50% |

Nhận định:
- Với dữ liệu do người thường tự nhập, top-3 khoảng 55–70% và triage 3 mức khoảng 65–75% là trần thực tế cho một engine dựa trên KB.
- Mức an toàn ≥97% đã đạt được trong thực địa [136], nhưng đó là với định nghĩa "an toàn" cho phép kém khẩn 1 mức.
- Các con số >90% của LLM trên vignette sạch không chuyển sang người dùng thật [19].

---

## 3. Chi tiết theo mục 2–6

### 3.1 Các cách tiếp cận suy luận (mục 2)

#### 3.1.1 INTERNIST-1/QMR: hệ điểm heuristic [36] [V]

- **Cơ sở tri thức (KB).**
  - >500 hồ sơ bệnh, khoảng 3.550 biểu hiện, xây trong 15 năm-người.
  - Ước tính phủ 70–75% chẩn đoán chính của nội khoa.
- **Ba thang đo.**
  - Evoking strength 0–5: 0 không đặc hiệu, 5 đặc trưng tuyệt đối.
  - Frequency 1–5: 1 hiếm, 3 khoảng một nửa, 5 gần như mọi ca.
  - Import 1–5: 5 là biểu hiện bắt buộc phải được giải thích.
- **Tính điểm.**
  - Biểu hiện có mặt được cộng theo evoking strength: 0→1, 1→4, 2→10, 3→20, 4→40, 5→80.
  - Biểu hiện kỳ vọng nhưng vắng bị trừ theo frequency: 1→−1, 2→−4, 3→−7, 4→−15, 5→−30.
  - Biểu hiện có mặt mà bệnh không giải thích bị trừ theo import: 1→−2, 2→−6, 3→−10, 4→−20, 5→−40.
- **Kết luận và chiến lược hỏi.**
  - Chẩn đoán được kết luận khi hơn đối thủ gần nhất ≥90 điểm.
  - Pursuing: khi đối thủ kém 46–89 điểm; hỏi các dấu hiệu có evoking strength cao của bệnh dẫn đầu.
  - Ruling out: khi ≥5 chẩn đoán nằm trong khoảng 45 điểm; hỏi các dấu hiệu tần suất cao, kỳ vọng câu trả lời âm.
  - Discriminating: khi 2–4 chẩn đoán gần nhau; hỏi câu làm giãn điểm nhiều nhất.
  - Dừng khi mọi biểu hiện còn lại có import ≤2.
- **Đánh giá.** 19 ca CPC, 43 chẩn đoán chính.

  | | INTERNIST-1 | Bác sĩ MGH | Người thảo luận ca |
  |---|---|---|---|
  | Chẩn đoán xác định đúng | 17 | 23 | 29 |
  | Bỏ sót | 18 | 15 | 8 |

- **Bài học.**
  - Chính các tác giả viết: "the evoking strengths of each finding count redundantly". Đây là tiền lệ trực tiếp của double counting.
  - Các chiến lược hỏi (pursue / rule out / discriminate) đáng mượn.
  - Thang điểm không có nghĩa xác suất nên không hiệu chuẩn được.

#### 3.1.2 QMR-DT: noisy-OR [37–42]

- **Mô hình.**
  - Giả định: bệnh độc lập biên; dấu hiệu độc lập có điều kiện theo bệnh; noisy-OR; mọi biến nhị phân [38] [V].
  - Quy mô: khoảng 600 bệnh và khoảng 4.000 dấu hiệu [42] [V]. Các con số 534 bệnh, 4.040 dấu hiệu, 40.740 cung lấy theo [39] [V2: trích đoạn].
- **Tham số.**
  - Ánh xạ frequency → P(dấu hiệu | chỉ có bệnh này): **1→0,025; 2→0,20; 3→0,50; 4→0,80; 5→0,985**, do Randy Miller đánh giá [39] [V2: trích đoạn bảng 1].
  - Prior lấy từ khoảng 192.000 lượt xuất viện NCHS năm 1984, trong khoảng 2×10⁻⁵ đến 2×10⁻² [38] [V].
  - Leak từ 5,8×10⁻⁸ đến 0,153 [39] [V2].
- **Đánh giá trên 23 ca đơn bệnh** [38] [V]:

  | Mô hình | Top-1 | Top-10 | Top-20 |
  |---|---|---|---|
  | QMR | 48% | 91% | — |
  | noisy-OR (S) | 52% | 87% | 87% |
  | Bệnh loại trừ lẫn nhau (TB) | 57% | 96% | — |
  | Prior đồng nhất (S/UD) | 43% | 87% | — |
  | Leak đồng nhất 10⁻⁵ (S/UL) | 52% | 70% | 70% (p=0,05 so với S) |

  - Prior đồng nhất không tạo khác biệt có ý nghĩa. Tác giả kết luận mô hình "sensitive to the values of the … leak probabilities".
  - Một lỗi dữ liệu đặt prior của cường aldosteron nguyên phát ở nam bằng 0, khiến posterior của chẩn đoán đúng bằng 0.
- **Nhiều bệnh đồng thời** [41] [V]: trên 20 ca CPC có 1–4 bệnh, noisy-OR khớp chuẩn vàng tốt nhất. Simple Bayes đánh giá thấp có hệ thống ở ca nhiều bệnh.
- **Suy luận.**
  - Quickscore chính xác, chi phí tăng theo hàm mũ của số dấu hiệu dương; "efficient for cases that contain 15 or fewer findings observed to be present" [40,41].
  - Ở ca CPC, 44/48 ca có >20 dấu hiệu dương và clique lớn nhất có trung vị 151,5 nút, nên phải dùng xấp xỉ biến phân [42] [V].
- **Ưu/nhược.** Hợp lý về xác suất, có explaining away, và tham số thô do chuyên gia ước lượng là đủ. Đổi lại nhạy với leak, và suy luận chính xác bị giới hạn bởi số dấu hiệu dương.

#### 3.1.3 DXplain và Isabel

- **DXplain** [43,44] [V].
  - KB: >2.400 bệnh, >5.000 dấu hiệu, >230.000 điểm dữ liệu.
  - Mỗi cặp bệnh–dấu hiệu có 2 số: tần suất và độ gợi ý.
  - Mỗi dấu hiệu có importance 1–5. Mỗi bệnh có hạng prevalence (very common, common, rare, very rare) và importance 1–5, phản ánh cái giá của việc bỏ sót.
  - Phương pháp: "modified form of Bayesian logic".
  - Vẫn cấp phép cho tổ chức (theo năm, có dùng thử 1 tháng).
  - So sánh với LLM: 36 ca chưa công bố; correct trong top-25 [46] [V]:

    | | DXplain | GPT-4 | Gemini 1.5 |
    |---|---|---|---|
    | Không có xét nghiệm | 56% | 42% | 39% |
    | Có xét nghiệm | 72% | 64% | 58% |

    Khác biệt không có ý nghĩa thống kê.
  - Berner 1994: 105 ca, 4 hệ (DXplain, Iliad, Meditel, QMR). Tỷ lệ chẩn đoán đúng 0,52–0,71; mỗi hệ thêm khoảng 2 chẩn đoán liên quan mà chuyên gia không liệt kê [45] [V]. Số liệu từng hệ: CHƯA XÁC MINH.
- **Isabel** [47–50] [V].
  - Phương pháp: văn bản tự do + thesaurus, rồi NLP/tìm kiếm trên thư viện tham khảo (với nội khoa: 6 sách giáo khoa và 46 tạp chí), lọc theo tuổi, giới, vùng, thai.
  - Thứ tự danh sách phản ánh mức độ khớp, không phải xác suất.
  - Kết quả:
    - Nhi khoa: hiển thị chẩn đoán đúng ở 91% ca giả định và 95% ca thật [47].
    - 50 ca NEJM: 96% khi người biết đáp án nhập 3–6 dấu hiệu chính; 74–76% khi dán toàn văn [48].
    - Tổng quan phân tích gộp các DDx generator: tỷ lệ tìm ra chẩn đoán đúng gộp 0,70 (0,63–0,77), I²=97%; Isabel 0,89 (0,83–0,94); không hơn bác sĩ (SMD 0,12; −0,30 đến 0,53) [50].
  - Nhược: không có xác suất, nên không dùng được cho triage hiệu chuẩn; rất phụ thuộc chất lượng đầu vào.

#### 3.1.4 Ada và Infermedica (theo mô tả công khai)

- **Ada**
  - Theo trang trợ giúp, nay đã gỡ: >10.000 triệu chứng/thuộc tính và >120 yếu tố nguy cơ, mỗi mục gắn xác suất với >3.600 bệnh; KB do bác sĩ xây [V2: trích đoạn].
  - Điều khoản: "Ada Assess is a Class IIA medical device registered under Regulation (EU) 2017/745 (MDR)" và "does NOT provide diagnoses" [51] [V].
  - Cơ chế suy luận chi tiết chưa được công bố (CHƯA XÁC MINH).
  - Độc lập với hãng: top-3 63% và 14% lời khuyên không an toàn ở khoa cấp cứu [11]; top-1 72% trong Ceney [5].
- **Infermedica**
  - Engine "based on modified Bayesian networks and machine learning methods". KB: >900 bệnh, >1.800 triệu chứng, >340 yếu tố nguy cơ; ">160,000 hours of physician input"; chứng nhận ISO 13485 [52] [V].
  - API /diagnosis [53] [V]:
    - Phi trạng thái: mỗi lần gọi gửi lại toàn bộ evidence.
    - Loại câu hỏi: `single` (Có / Không / Không biết), `group_single`, `group_multiple`.
    - Evidence nhận `present` / `absent` / `unknown`. Tài liệu nói rõ "absent and unknown are not interchangeable"; gửi `unknown` giúp câu đó không bị hỏi lại.
    - `should_stop` là heuristic theo số câu đã hỏi và độ tự tin, cần ≥1 evidence "initial"; không công bố trần cố định.
    - Có cờ `has_emergency_evidence` và tùy chọn `interview_mode=triage`, chế độ "prioritizes a safe triage level over final condition accuracy".
  - API /triage [54] [V]:
    - 5 mức: `emergency_ambulance`, `emergency`, `consultation_24`, `consultation`, `self_care`. Vẫn có bản 3 mức cũ.
    - Danh sách `serious` gắn nhãn serious / emergency / emergency_ambulance cho từng dấu hiệu.
    - "Triage tuples": cặp dấu hiệu cùng nâng mức, có nguồn trích dẫn, ví dụ tăng huyết áp + thai 3 tháng cuối.
    - `root_cause` có các giá trị `emergency_evidence_present`, `serious_evidence_present`, `emergency_condition_likely`, **`emergency_condition_possible`**, `consultation_condition_likely`, `self_care_sufficient`, `diagnosis_unknown`. Tức là hai tầng ngưỡng "likely" và "possible".
  - API /rationale [53] [V] giải thích vì sao một câu được chọn:
    - r0: liên quan thống kê cao nhất;
    - r1: luật chuyên gia;
    - r2: triệu chứng chủ chốt định sẵn;
    - r3: quan sát bắt buộc với bệnh đủ khả năng;
    - r4: yếu tố nguy cơ có thể đổi thứ hạng;
    - r6: quan sát quan trọng liên quan evidence hiện có.

    Như vậy, hệ thương mại này là **lai giữa thống kê và luật chuyên gia**.
  - API /explain [53] [V] trả về bằng chứng ủng hộ, mâu thuẫn (được báo vắng) và chưa xác nhận (được báo "không biết").
  - NLP /parse "currently available only in English" [53] [V].
  - Trong Gilbert 2020: Symptomate (sản phẩm của Infermedica) đạt top-3 27,5% nhưng triage an toàn 97,8% [3]. Năm 2015, Symptomate là một trong 5 SC vượt người thường [8].

#### 3.1.5 Naive Bayes: bài học từ de Dombal và Pathfinder

- **de Dombal (đau bụng cấp, Leeds).**
  - 1972: 304 bệnh nhân; máy đúng 91,8% vs bác sĩ cao cấp nhất 79,6% [60] [V].
  - Nghiên cứu đa trung tâm 1986: 8 trung tâm, >250 bác sĩ, 16.737 bệnh nhân [61] [V]:
    - độ chính xác chẩn đoán ban đầu 45,6% → 65,3%;
    - mở bụng âm tính giảm khoảng một nửa;
    - thủng ruột thừa 23,7% → 11,5%;
    - sai lầm xử trí nghiêm trọng 0,9% → 0,2%.
  - Nhận định rằng độ chính xác giảm khi chuyển sang quần thể khác, và rằng phiếu thu thập dữ liệu có cấu trúc mới là nguồn lợi ích chính: CHƯA XÁC MINH.
- **Pathfinder** (bệnh hạch lympho; >60 bệnh, >130 đặc điểm) [57] [V].
  - Chọn câu hỏi bằng myopic VOI với utility cho mọi cặp (bệnh thật, bệnh được chẩn đoán) và chi phí xét nghiệm.
  - Simple Bayes thắng certainty factors và Dempster–Shafer trong đánh giá chính thức. Phiên bản mạng Bayes sau đó "at least as good as" chuyên gia.
  - Pathfinder dẫn Fryback 1978: độ chính xác simple Bayes "deteriorated significantly as the number of features … increased" vì vi phạm giả định độc lập [V2: qua 57].
- **Lý thuyết.**
  - Naive Bayes có thể tối ưu với 0-1 loss ngay cả khi giả định độc lập bị vi phạm nặng, nhưng ước lượng xác suất chỉ tối ưu với quadratic loss khi giả định đúng [74] [V].
  - Naive Bayes đẩy xác suất về 0 và 1 [76] [V].
  - Hệ quả: dùng được để **xếp hạng**, nhưng **không dùng trực tiếp** cho ngưỡng triage nếu chưa hiệu chuẩn.

#### 3.1.6 Chẩn đoán counterfactual (Richens 2020) [55] [V, preprint arXiv:1910.06772]

- **Mô hình.** Mạng noisy-OR ba tầng (yếu tố nguy cơ → bệnh → triệu chứng). Prior từ dịch tễ; xác suất có điều kiện gợi xuất từ nhiều nguồn y văn độc lập và từ bác sĩ.
- **Bộ thử.** 1.671 vignette do một nhóm bác sĩ độc lập viết, theo độ hiếm: rất phổ biến 131, phổ biến 413, không phổ biến 546, hiếm 353, rất hiếm 210.
- **Bác sĩ so sánh.** 44 bác sĩ, mỗi người ≥50 vignette. Trung bình họ liệt kê 2,58 bệnh; thuật toán được chấm ở cùng độ dài danh sách.
- **Kết quả.**
  - Posterior thông thường (associative): 72,52%.
  - Xếp hạng counterfactual ("bệnh nào, nếu được can thiệp, giải thích được nhiều triệu chứng nhất"): 77,26%. Đứng cao hơn ở 24,7% số vignette, thấp hơn ở 1,9%.
  - Với bệnh hiếm và rất hiếm, xếp cao hơn ở 29,2% và 32,9% số vignette.
  - Chỉ đổi cách truy vấn để xếp hạng, không đổi mô hình.
- **Ý nghĩa cho doctor-v.** Sau khi có KB dạng noisy-OR, đây là cải tiến "miễn phí" về dữ liệu cho phần xếp hạng (v2). Nó không thay thế phần triage.

#### 3.1.7 Reinforcement learning và deep learning trên DDXPlus

- **Bộ dữ liệu DDXPlus** [62] [V].
  - Khoảng 1,3 triệu bệnh nhân **tổng hợp**: 49 bệnh, 110 triệu chứng, 113 tiền sử/yếu tố, xoay quanh ho, đau họng và hô hấp.
  - Sinh từ một KB độc quyền (440 bệnh, 802 evidence, tổng hợp từ >20.000 bài báo), cộng dữ liệu điều tra dân số và Synthea. DDx tham chiếu lấy từ một hệ luật thương mại.
  - Evidence được lấy mẫu độc lập theo bệnh (trừ phân cấp triệu chứng). Trần 30 lượt hỏi.
- **Kết quả nền** (% trừ IL; IL = số lượt):

  | Mô hình | IL | GTPA@1 | GTPA | PER | DDF1 |
  |---|---|---|---|---|---|
  | AARLC, huấn luyện theo DDx | 25,75 | 75,39 | 99,92 | 54,55 | 78,24 |
  | AARLC, huấn luyện theo bệnh | 6,73 | 99,21 | 99,97 | 32,78 | 31,28 |
  | BASD, huấn luyện theo DDx | 17,86 | 67,71 | 99,30 | 88,18 | 83,69 |
  | BASD, huấn luyện theo bệnh | 17,99 | 97,15 | 98,82 | 88,45 | 31,31 |

  - AARLC: RL + bộ phân loại, căn chỉnh qua entropy [63].
  - BASD: module phát hiện triệu chứng của Luo et al. 2020, bỏ knowledge graph (chi tiết nguồn CHƯA XÁC MINH).
  - CASANDE ưu tiên khám phá bệnh nặng (exploration–confirmation) [64]; số liệu CHƯA XÁC MINH.
- **LLM agent trên DDXPlus.** MEDDxAgent (GPT-4o, 100 bệnh nhân) [65] [V]:
  - Có đủ hồ sơ trong 1 lượt: GTPA@1 0,69 (zero-shot) đến 0,97 (few-shot).
  - Hỏi đáp tương tác từ hồ sơ thiếu: 0,74 sau 5 câu, 0,78 sau 10 câu, 0,86 sau 15 câu.
  - Lợi ích "plateau around n=10-15 questions".
- **Nhận định.** Benchmark tổng hợp bị bão hòa vì mô hình học lại chính KB sinh dữ liệu (99,2% top-1 trong 6,7 lượt). Nó không chứng minh được độ chính xác lâm sàng. Chỉ nên dùng làm kiểm thử hồi quy cho thuật toán chọn câu hỏi. Tác giả cũng cảnh báo không dùng các mô hình này trong hệ thống thật nếu chưa đánh giá nghiêm ngặt [62].

#### 3.1.8 LLM hội thoại và kiến trúc lai

- **Thành tựu (môi trường mô phỏng hoặc có giám sát).**
  - AMIE [21,22,23]; MAI-DxO [24]; GPT-4 một mình vượt bác sĩ về điểm lập luận [25].
  - GPT-4 chọn đúng bệnh nhân khẩn hơn (theo ESI) trong 89% của 10.000 cặp lấy từ 251.401 lượt khám cấp cứu, tương đương bác sĩ trên mẫu con 500 cặp [29] [V].
  - Vignette chẩn đoán:
    - 30 vignette với triệu chứng chính thường gặp: ChatGPT-3.5 top-10 93,3%, top-1 53,3%, so với bác sĩ top-1 93,3% [31].
    - 52 ca phức tạp: GPT-4 top-10/top-1 83%/60%, so với bác sĩ 75%/50% (không có ý nghĩa thống kê) [32].
  - HealthBench: 5.000 hội thoại, 262 bác sĩ, 48.562 tiêu chí chấm. Điểm: GPT-4o 32%, o3 60%; điểm cao nhất ở tập Hard là 32%. Chủ đề "emergency referrals" chiếm 482 ví dụ (9,6%) [26] [V].
- **Giới hạn đã đo được.**
  - Người dùng thật không hưởng lợi [18,19].
  - Định dạng hội thoại làm giảm độ chính xác [20]. LLM phải tự thu thập thông tin thì giảm còn 45,5–54,9% [27].
  - Định dạng prompt làm độ chính xác lệch tới 76 điểm (LLaMA-2-13B) [69].
  - Cài đặt "deterministic" vẫn dao động tới 15% giữa các lần chạy; chênh tốt nhất–tệ nhất tới 70% [70].
  - Ngữ cảnh gây nhiễu kéo độ chính xác từ 71,1% xuống 38,0% [34].
  - Cùng một kịch bản, người này nhận lời khuyên tự chăm sóc, người kia nhận lời khuyên cấp cứu [19].
  - Thiên lệch theo đặc điểm xã hội–nhân khẩu đã được báo cáo [35] (số liệu CHƯA XÁC MINH).
- **Phỏng vấn có cấu trúc.**
  - SymptomAI (13.917 người dùng thật, Gemini 2.0 Flash): agent chạy phỏng vấn triệu chứng có cấu trúc tốt hơn chat do người dùng dẫn dắt (p<0,001) [33] [V].
  - Lập kế hoạch hỏi dựa trên information gain tăng tỷ lệ thành công trung bình 38,1% (UoT) [67].
  - Chỉ nhắc LLM "hãy hỏi thêm" lại làm kết quả tệ hơn; module abstention tăng 22,3% độ chính xác (MediQ) [68].
- **Kiến trúc lai (LLM ánh xạ văn bản tự do → finding có cấu trúc → engine xác định).**
  - Ví dụ thương mại: Infermedica /parse, chỉ có tiếng Anh [53].
  - Trích xuất thực thể lâm sàng bằng GPT-4: relaxed F1 0,804 → 0,861 khi có khung prompt, so với BioClinicalBERT tinh chỉnh 0,901 (MTSamples) [66]. Đây là ghi chú lâm sàng tiếng Anh; khả năng chuyển sang lời kể tiếng Việt của người thường: CHƯA XÁC MINH.
  - Phương án này giữ được khả năng giải thích và tái lập của engine. Rủi ro dồn vào bộ trích xuất, nên bộ trích xuất phải được kiểm định riêng.

#### 3.1.9 Bảng so sánh

| Cách tiếp cận | Bằng chứng độ chính xác | Giải thích được | Gánh nặng kiểm định | Dữ liệu cần | Vai trò cho doctor-v |
|---|---|---|---|---|---|
| Điểm heuristic (INTERNIST-1/QMR) | 17/43 chẩn đoán đúng vs bác sĩ 23 [36] | Cao | Cao; điểm không phải xác suất | Rất nhiều công chuyên gia | Mượn chiến lược hỏi |
| Noisy-OR chuyên gia (QMR-DT, Babylon) | Top-1 52%, top-10 87% [38]; 72,52% vs bác sĩ 71,40% [55] | Cao | Trung bình; nhạy với leak | Tham số chuyên gia + prior dịch tễ | Đích cho v2 |
| Naive Bayes single-fault | de Dombal 91,8% [60]; TB 57% top-1 [38] | Rất cao (log-LR cộng được) | Thấp–trung bình; cần hiệu chuẩn | Như trên, hoặc dữ liệu địa phương | Nền v1 + biện pháp chống double counting |
| DXplain-style | Đúng 0,52–0,71 [45]; top-25 72% [46] | Trung bình | Cao (KB rất lớn) | >230.000 điểm dữ liệu | Tham khảo cấu trúc importance/prevalence |
| Khớp văn bản (Isabel) | Gộp 0,70; Isabel 0,89 [50] | Thấp | Trung bình | Thư viện văn bản | Không phù hợp cho triage |
| Thương mại (Ada, Infermedica) | Top-3 27,5–70,5%; an toàn 80–97,8% [3] | Trung bình–cao | Cao (CE IIa) | Hàng nghìn bệnh; >160.000 giờ bác sĩ | Benchmark; mẫu API/triage |
| RL/DL (DDXPlus) | 99% top-1 trên dữ liệu tổng hợp [62] | Thấp | Rất cao | Dữ liệu thật lớn (chưa có) | Không |
| LLM hội thoại | AMIE top-10 59,1% [22]; thực địa top-3 75% có giám sát [23]; người dùng ≤34,5% [19] | Thấp (giải thích hậu nghiệm) | Rất cao; không xác định | Mô hình nền | Không làm engine |
| Lai (LLM trích xuất → engine) | F1 trích xuất 0,80–0,86 (tiếng Anh) [66] | Cao | Trung bình (kiểm định bộ trích xuất) | Tập lời kể tiếng Việt có gán nhãn | Tùy chọn v2, có xác nhận của người dùng |

### 3.2 Chọn câu hỏi (mục 3)

**Cơ sở lý thuyết**
- Chẩn đoán tuần tự myopic, tức chọn câu tốt nhất cho một bước tiếp theo, có từ Gorry & Barnett 1968. Theo Pathfinder, cách rút gọn này không làm giảm đáng kể độ chính xác [57,59] [V2: qua 57].
- Pathfinder dùng myopic VOI với utility và chi phí [57]. Đã có xấp xỉ non-myopic, vì "myopic analyses are based on the assumption that only one additional test will be performed" [58].
- VOI dựa trên tổn thất của *quyết định*, nên nó trực tiếp tối ưu mục tiêu an toàn. Entropy thì chỉ đo độ bất định của chẩn đoán.

**Thực hành trong các hệ đang chạy**
- INTERNIST-1 chuyển chế độ theo khoảng cách điểm (pursue / rule out / discriminate) [36].
- Infermedica trộn liên quan thống kê với luật chuyên gia: triệu chứng chủ chốt, quan sát bắt buộc với bệnh có khả năng [53]. Có thêm chế độ ưu tiên triage an toàn [53].
- CASANDE ưu tiên khám phá bệnh nặng [64].
- Agent có phỏng vấn cấu trúc tốt hơn chat tự do [33]. Hỏi theo information gain có lợi [67].

**Tiêu chí dừng đã công bố**
- INTERNIST-1: cách biệt ≥90 điểm, hoặc mọi biểu hiện còn lại có import ≤2 [36].
- Infermedica: `should_stop` theo số câu và độ tự tin [53].
- DDXPlus: trần 30 lượt [62].
- MEDDxAgent: lợi ích chững lại ở 10–15 câu [65].

**Số câu hỏi thực tế**

| Hệ thống | Số câu / thời gian | Nguồn |
|---|---|---|
| Ada | 27,3 (2018), 31 (2020) câu | [71] [V] |
| Ada (vignette sức khỏe tâm thần) | 33,78 câu (SD 8,73); khoảng 409 giây/ca | [72] [V] |
| Ada (thấp khớp) | khoảng 7 phút/lượt | [73] [V] |
| Buoy | 31,3 (2018), 30,3 (2020) câu | [71] [V] |
| Babylon | 11 (2018), 9 (2020) câu | [71] [V] |
| Your.MD | 10 (2018), 10,3 (2020) câu | [71] [V] |
| AARLC/BASD (DDXPlus) | 6,7–25,8 lượt (trần 30) | [62] [V] |
| LLM agent (GPT-4o) | chững lại ở 10–15 câu | [65] [V] |
| Symptomate, K Health, WebMD, Mediktor | CHƯA XÁC MINH | — |

Lưu ý: Ćirković 2020 chỉ dùng 3 ca nhãn khoa, mỗi app nhập 1 lần mỗi năm [71]. Con số mang tính minh họa, không phải ước lượng chính xác.

**Hệ quả cho doctor-v.** Cửa sổ hợp lý là 10–30 câu. Hai app hỏi ít (khoảng 10 câu) không cho thấy lợi thế về độ chính xác trong [71]. Ada và Buoy hỏi khoảng 30 câu. Đề xuất cụ thể (VOI triage trước, entropy sau, mô hình hóa "Không rõ", trần 30 câu) nằm ở mục 4.2.

### 3.3 Chi tiết mô hình hóa (mục 4)

#### a. Double counting khi triệu chứng tương quan

- **Cơ chế.**
  - Naive Bayes nhân likelihood ratio (LR) của các finding như thể chúng độc lập có điều kiện theo bệnh.
  - Khi hai finding phản ánh cùng một quá trình, bằng chứng bị đếm hai lần. Ví dụ của INTERNIST-1: bilirubin liên hợp máu tăng và bilirubin niệu [36].
  - Ví dụ thường gặp trong SC (PĐ): sốt / ớn lạnh / vã mồ hôi; buồn nôn / nôn; đau họng / nuốt đau; ho / khạc đờm; vàng da / nước tiểu sẫm.
- **Hệ quả.**
  - Thứ hạng thường vẫn chấp nhận được [74,75], nhưng xác suất bị đẩy về 0 và 1 [76].
  - Triage của doctor-v dùng ngưỡng xác suất tuyệt đối, nên double counting là **rủi ro an toàn**: gây trấn an sai khi nhiều finding "lành" cộng dồn.
- **Biện pháp có trong y văn.**
  1. Spiegelhalter & Knill-Jones 1984: dùng LR chưa hiệu chỉnh làm biến dự báo, rồi tính hệ số co (shrinkage) để bù phụ thuộc [77,78] [V2: qua 78]. Giá trị co điển hình: CHƯA XÁC MINH.
  2. TAN (cây phụ thuộc giữa các finding) tốt hơn naive Bayes nhưng cần dữ liệu để học cấu trúc [79]. Chưa dùng được khi chỉ có tri thức chuyên gia.
  3. Noisy-OR xử lý "nhiều nguyên nhân cho một finding" và explaining away. Nó không xử lý tương quan giữa các finding của cùng một bệnh [37,80].
- **Đề xuất (PĐ)**, theo thứ tự ưu tiên:
  1. Khi thiết kế KB, gom các finding tương quan mạnh thành **một biến nhiều giá trị** có phân phối riêng theo bệnh. Ví dụ "kiểu sốt": không sốt / sốt nhẹ / sốt cao / sốt cao kèm rét run.
  2. Nhân tổng log-LR của mỗi cụm còn lại với **hệ số co theo cụm** w_C = 1/(1 + ρ_C(|C|−1)). ρ_C do chuyên gia chọn: 0,2 / 0,5 / 0,8. Đây là phép tương tự "số quan sát độc lập hiệu dụng".
  3. Dùng **temperature toàn cục** τ ∈ [0,5; 1] nhân vào tổng log-likelihood, ước lượng bằng cực tiểu log loss trên vignette kiểm định. Đây là dạng tương đương của shrinkage [77] và temperature scaling [95].

#### b. Nhiều bệnh đồng thời

- **Bằng chứng.**
  - Single-fault (loại trừ lẫn nhau) cho kết quả tốt ở ca đơn bệnh: TB đạt top-1 57%, noisy-OR 52% [38].
  - Nhưng nó đánh giá thấp có hệ thống ở ca nhiều bệnh [41].
  - Hepar II: chuyển sang mô hình đa rối loạn không làm giảm, thậm chí hơi tăng độ chính xác ở ca đơn rối loạn [87] [V].
  - Quickscore khả thi khi có ≤15 finding dương [40,41].
- **Đề xuất (PĐ).**
  - **v1**: single-fault + "other".
    - Bệnh nền, thai và ức chế miễn dịch là **biến ngữ cảnh** (risk factor), không phải giả thuyết cạnh tranh.
    - Bật cờ "finding chưa được giải thích" khi một finding dương quan trọng có LR < 2 với mọi bệnh trong top-3. Cờ này mô phỏng khái niệm import của INTERNIST-1.
    - Thêm một số cặp bệnh hay đi cùng làm giả thuyết ghép, ví dụ cúm + viêm phổi thứ phát.
  - **v2**: noisy-OR + Quickscore khi số finding dương ≤15. Chi phí khoảng 2¹⁵ × 500 bệnh ≈ 1,6×10⁷ phép tính, khả thi bằng JavaScript; quá ngưỡng thì dùng xấp xỉ.
  - Ở cả hai phiên bản, triage dùng xác suất biên của các bệnh nguy hiểm, nên không phụ thuộc giả định loại trừ lẫn nhau.

#### c. Leak

- **Định nghĩa.** Leak là P(finding | không có nguyên nhân nào được mô hình hóa): một nút "mọi nguyên nhân khác" luôn hiện diện [80,81] [V2]. Henrion tổng quát hóa noisy-OR. Tham số hóa của Henrion và của Díez tương đương về toán học, nhưng dẫn tới câu hỏi gợi xuất khác nhau [80,81].
- **Bằng chứng.**
  - Leak đồng nhất 10⁻⁵ làm top-20 giảm từ 87% xuống 70% [38].
  - Y văn thường chỉ báo cáo P(triệu chứng | bệnh), hiếm khi báo cáo P(triệu chứng | không bệnh). Vì vậy leak phải được gợi xuất riêng [82] [V].
  - Y văn còn hay đưa xác suất "ngược chiều", ví dụ "70% bệnh nhân ung thư thực quản hút thuốc" là P(yếu tố nguy cơ | bệnh) [82].
- **Đề xuất.**
  - Leak gắn với từng finding và ngữ cảnh triệu chứng chính, **không gắn theo cặp**.
  - Với single-fault, P(f | d không liên kết) = ℓ_f, nên leak quá nhỏ biến mỗi finding thành bằng chứng loại trừ mạnh.
  - Giá trị mặc định ở bảng f.

#### d. Prior: prevalence hay presentation frequency

- **Phân biệt.** Prevalence là tỷ lệ mắc trong dân số. Presentation frequency là tỷ lệ chẩn đoán cuối trong số người đến khám vì một lý do. SC cần cái thứ hai, có điều kiện theo triệu chứng chính.
- **Okkes 2002** (54 bác sĩ gia đình Hà Lan, 93.297 người-năm, 267.897 lượt khám) [88] [V]:

  | Lý do khám | Chẩn đoán cuối | Toàn bộ | Theo nhóm tuổi |
  |---|---|---|---|
  | Ho (N=11.092) | Nhiễm khuẩn hô hấp trên | 32,9% | |
  | | Viêm phế quản cấp | 25,4% | 39,5% ở ≥75 tuổi |
  | | Viêm phổi | 1,9% | 3,7% ở ≥75 tuổi |
  | | Suy tim | 0,3% | |
  | Khó thở (N=2.505) | Viêm phế quản cấp | 27,3% | |
  | | Hen | 9,7% | 23,5% ở 15–24 tuổi |
  | | Suy tim | 8,9% | 4,5% (45–64) → 12,6% (65–74) → 21,0% (≥75) |
  | | Tăng thông khí | 8,0% | 18,8% ở 15–24 tuổi |
  | | Viêm phổi | 3,2% | |

  Tác giả khuyến nghị mỗi nước tự xây cơ sở dữ liệu xác suất riêng.
- **Spectrum effect.**
  - Độ nhạy/đặc hiệu đổi theo tỷ lệ bệnh: chênh 0–40 điểm phần trăm (23 phân tích gộp, 416 nghiên cứu) [89].
  - Trên 6.909 nghiên cứu, tứ phân vị tỷ lệ cao so với thấp có OR độ nhạy 1,47 và OR độ đặc hiệu 0,47 [90].
  - Test phát triển ở nhóm tỷ lệ cao thường có độ nhạy thấp hơn và độ đặc hiệu cao hơn khi dùng ở cộng đồng [91].
  - Hệ quả: P(f|d) lấy từ loạt ca bệnh viện phóng đại độ nhạy cho người dùng cộng đồng, nên finding vắng mặt bị phạt quá mức.
- **Việt Nam (ví dụ có nguồn).**
  - Sốt xuất huyết Dengue (SXHD) miền Nam 2001–2010 (19 tỉnh, 592.938 ca): có quanh năm, đỉnh tháng 6–12. Mùa mưa chiếm 82% số ca (74–92%). TP.HCM đạt đỉnh muộn 2–3 tháng so với nông thôn [92] [V].
  - Tay chân miệng 2011–2012: 174.677 ca, 200 tử vong. Ở nhóm nhập viện tại TP.HCM (n=3.791), tuổi trung vị 20 tháng, 95% từ 1–4 tuổi [93] [V].
  - Mùa cúm Bắc–Nam, sốt mò, Whitmore, leptospira: CHƯA XÁC MINH.
- **Đề xuất.**
  1. Prior có điều kiện theo triệu chứng chính × nhóm tuổi × giới.
  2. Hệ số mùa suy ra từ dữ liệu giám sát. Ví dụ, nếu 82% ca SXHD rơi vào 6–7 tháng mùa mưa, hệ số tháng mùa mưa khoảng 1,4–1,6 và tháng mùa khô khoảng 0,35–0,45 (tính số học từ [92]).
  3. Tái ước lượng prior từ dữ liệu kết cục của chính doctor-v, vì dân số dùng app khác dân số đi khám. Ví dụ Ada tại Sutter Health: 29,0% lượt đánh giá ở mức khẩn cao, 46,4% ngoài giờ hành chính, 66,9% nữ [105].

#### e. Calibration

- **Khung đánh giá** (Van Calster 2019) [94] [V].
  - 4 cấp: trung bình (mean); weak (intercept và slope); moderate (đường cong); strong.
  - Đường cong cần ≥200 ca có và ≥200 ca không có sự kiện. Dữ liệu nhỏ chỉ nên đánh giá weak calibration.
  - Không dùng kiểm định Hosmer–Lemeshow.
  - Ước lượng nguy cơ quá cao dẫn tới điều trị quá mức. Ví dụ: Framingham có AUC cao hơn (0,776 vs 0,771) nhưng ước lượng quá cao, chọn 206 vs 110/1.000 người ở ngưỡng 20%.
- **Phương pháp hiệu chỉnh.**
  - Với naive Bayes, isotonic tốt hơn sigmoid. Nhưng khi tập hiệu chỉnh nhỏ (dưới khoảng 200–1.000 ca), Platt tốt hơn isotonic với cả 9 phương pháp được thử [76] [V].
  - Temperature scaling một tham số "surprisingly effective" [95].
- **Đề xuất cho doctor-v.**
  - Chỉ hiệu chỉnh 1–2 tham số: τ toàn cục, và intercept cho "other".
  - Báo cáo Brier, top-label ECE, và calibration-in-the-large theo từng mức triage.
  - Chỉ dựng đường cong khi đủ ≥200 sự kiện mỗi kết cục.
  - Ngưỡng triage chỉ áp lên xác suất **đã hiệu chỉnh**.

#### f. Gợi xuất xác suất từ chuyên gia và bảng ánh xạ số

- **Thang chữ–số** (van der Gaag/Renooij) [96,97] [V].
  - 7 mốc 0/15/25/50/75/85/100%, nhãn: (gần như) không thể / khó xảy ra / không chắc / năm ăn năm thua / được kỳ vọng / có thể xảy ra / (gần như) chắc chắn.
  - Cho phép gợi xuất nhiều xác suất trong thời gian ngắn.
  - Thiên lệch chính: overconfidence (nặng nhất ở xác suất cực trị) và bỏ qua base rate. Có thêm hiệu ứng thang đo (centering, spacing).
  - Với sự kiện hiếm nên hỏi dạng odds hoặc tần suất. Mỗi phiên ≤1 giờ.
- **Gợi xuất nhóm và kiểm định.**
  - SHELF: bộ tài liệu, mẫu và phần mềm cho gợi xuất nhóm; gói R v1.13.0 (4/2026) [99].
  - Sách O'Hagan et al. 2006 [98].
  - Khung kiểm định mạng Bayes do chuyên gia xây khi "no objective dataset exists" [100].
- **Nhãn tần suất sẵn có.**
  - HPO, căn theo Orphanet [102] [V]: Obligate 100% (HP:0040280); Very frequent 80–99% (HP:0040281); Frequent 30–79% (HP:0040282); Occasional 5–29% (HP:0040283); Very rare 1–4% (HP:0040284); Excluded 0% (HP:0040285).
  - Quy ước SmPC châu Âu cho tác dụng phụ [101] [V]: rất thường gặp ≥1/10; thường gặp ≥1/100 đến <1/10; ít gặp ≥1/1.000 đến <1/100; hiếm ≥1/10.000 đến <1/1.000; rất hiếm <1/10.000.
  - "Hiếm" theo SmPC (0,01–0,1%) thấp hơn khoảng 50 lần so với "rare ≈0,05" của bản nháp. **Không dùng** bộ nhãn này cho P(f|d).
  - Mosteller & Youtz 1990 (giá trị số của các từ chỉ tần suất): CHƯA XÁC MINH.
- **Độ bền với sai số tham số.**
  - Sai lệch lớn trong ánh xạ xác suất và nhiễu lớn chỉ làm giảm nhẹ hiệu năng chẩn đoán [84,85] [V2/V].
  - Làm tròn tham số làm độ chính xác giảm theo hàm mũ, chủ yếu vì xác suất nhỏ bị làm tròn về 0. Khi thay 0 bằng ε (0,0001–0,01; giá trị cụ thể ít quan trọng), Hepar II "barely affected by rounding, even when n = 1" [86] [V].
  - Cấu trúc đồ thị là phần quan trọng nhất của mạng [82]. Noisy-MAX khớp tốt tới 50% số CPT trong 3 mạng thực [83].
- **Bảng ánh xạ đề xuất cho link strength p_df** (tham số noisy-OR; P(f|d) = 1 − (1 − ℓ_f)(1 − p_df)):

  | Mức (nhãn cho chuyên gia) | Mốc số khi hỏi ("trong 100 người bệnh X, bao nhiêu người có Y?") | p_df | Căn cứ |
  |---|---|---|---|
  | 0. Không liên quan | — | 0 (chỉ còn leak) | — |
  | 1. Hiếm | ≤5 | 0,025 | QMR-DT [39]; HPO Very rare 1–4% |
  | 2. Thỉnh thoảng | 6–35 | 0,20 | QMR-DT; HPO Occasional 5–29% |
  | 3. Khoảng một nửa | 36–65 | 0,50 | QMR-DT; HPO Frequent 30–79% |
  | 4. Đa số | 66–90 | 0,80 | QMR-DT; HPO Very frequent 80–99% |
  | 5. Hầu như luôn có | >90 | 0,95 | QMR-DT dùng 0,985; hạ trần vì dữ liệu do người dùng tự báo (PĐ) |

- **Leak ℓ_f** (PĐ, trong ngữ cảnh triệu chứng chính; neo vào [38,39]):

  | Loại finding | Mặc định | Khoảng | Ví dụ |
  |---|---|---|---|
  | Đặc hiệu | 0,01 | 0,005–0,02 | cổ cứng, nôn ra máu, liệt nửa người |
  | Đặc hiệu vừa | 0,05 | 0,02–0,10 | tiểu buốt, đau hố chậu phải |
  | Không đặc hiệu | 0,20 | 0,10–0,30 | mệt mỏi, đau đầu |

  Sàn chung: 0,001.
- **Quy tắc kèm theo** (PĐ).
  - Phân phối của biến phân loại (ví dụ thời gian sốt) được làm trơn với α = 0,02.
  - Không dùng 0/1 ngoài loại trừ giải phẫu.
  - Nếu nguồn là loạt ca bệnh viện mà người dùng là cộng đồng, hạ p_df một mức (theo chiều tác động trong [89–91]).

### 3.4 Triage (mục 5)

#### a. Các thang mức

| Hệ thống | Các mức | Ghi chú |
|---|---|---|
| NHS 111 online [103] | Y tá gọi lại (có khung giờ); chuyển chăm sóc khẩn (UTC, GP ngoài giờ, A&E…); liên hệ GP; nha sĩ/bác sĩ mắt; dược sĩ; tự chăm sóc | Dùng chung thuật toán với 111 qua điện thoại; dành cho người ≥5 tuổi. Trang không liệt kê 999 như một kết cục. [V] |
| NHS Pathways [104] | "Disposition" = kỹ năng cần + khung thời gian, có mã Dx (ví dụ Dx012 = xe cứu thương hạng 3) | Thiết bị y tế loại I theo UK MDR 2002; bắt buộc ký giấy phép [V]. Danh sách mã đầy đủ: CHƯA XÁC MINH |
| Ada [105] | Gọi cấp cứu; đến cơ sở cấp cứu; khám trong 4 giờ; trong ngày; trong 2–3 ngày; hỏi dược sĩ; trong 2–3 tuần; tự xử trí tại nhà | 8 nhãn, gộp thành 3 nhóm cao/trung bình/thấp [V] |
| Chuẩn vàng của Gilbert 2020 [3] | Gọi cấp cứu; đến ED; khám ban đầu trong 4 giờ; trong ngày; không khẩn; chăm sóc tại nhà | 6 mức; "an toàn" = kém khẩn tối đa 1 mức [V] |
| Infermedica [54] | emergency_ambulance; emergency; consultation_24; consultation; self_care | Có bản 3 mức cũ; danh sách `serious`; tổ hợp dấu hiệu (triage tuples) [V] |
| Bean 2026 [19] | Xe cứu thương; A&E; khám ban đầu khẩn; GP thường quy; tự chăm sóc | 5 mức [V] |
| **Đề xuất doctor-v** | 1 Gọi 115 ngay; 2 Đến khoa cấp cứu ngay; 3 Đi khám trong 24 giờ; 4 Khám theo hẹn (trong vài ngày); 5 Tự chăm sóc tại nhà, kèm danh sách "đi khám ngay nếu…" | Ánh xạ 1–1 với Infermedica. Khi so sánh với Semigran/RepVig thì gộp thành 3 mức: 1–2 / 3–4 / 5 |

#### b. Giao thức mở và giao thức độc quyền

| Giao thức | Nội dung chính | Tình trạng sử dụng | Bằng chứng |
|---|---|---|---|
| WHO IMCI (2014) [107] | Trẻ 0–5 tuổi. Dấu hiệu nguy hiểm toàn thân: không uống/bú được, nôn tất cả, co giật, li bì/hôn mê, đang co giật. Có bất kỳ dấu hiệu nào → mức hồng (chuyển viện khẩn); vàng = điều trị đặc hiệu; xanh = chăm sóc tại nhà [V2] | Tài liệu WHO; giấy phép cụ thể CHƯA XÁC MINH | — |
| WHO ETAT (2016) [108] | Ba nhóm: dấu hiệu cấp cứu (xử trí ngay), dấu hiệu ưu tiên (khám trước), không khẩn. Dấu hiệu ưu tiên: trẻ <3 tháng; nhiệt độ >38 hoặc <36,4 °C; chấn thương/bệnh ngoại khoa khẩn; xanh xao nặng; ngộ độc; đau nhiều; suy hô hấp; li bì hoặc kích thích; chuyển viện khẩn; gầy mòn nặng; phù hai chân; bỏng nặng [V2]. Nhóm dấu hiệu cấp cứu (ABCD): CHƯA XÁC MINH ở bản gốc | Tài liệu WHO; giấy phép CHƯA XÁC MINH | Y tá áp dụng cho 3.837 trẻ: độ nhạy 96,7% so với đánh giá APLS [109] [V] |
| IITT (WHO/ICRC/MSF) [110,111] | Đỏ / vàng / xanh; có bản cho người lớn và cho trẻ <12 tuổi | Công cụ WHO; giấy phép CHƯA XÁC MINH | Papua New Guinea: độ nhạy với bệnh nguy cấp theo thời gian 70,0–77,8%; với tử vong 87,0–92,2%; κ >0,8 [111] [V] |
| SATS [112] | Thang tại khoa cấp cứu: TEWS + discriminator | CC BY-NC-SA 3.0, **chỉ phi thương mại** [V] | — |
| Manchester Triage System | Thang tại khoa cấp cứu | Độc quyền (Wiley). Một NHS trust trả £17.500 cho giai đoạn 2025–2030 [113] [V2] | — |
| NHS Pathways | 111/999 | Bắt buộc giấy phép [104] [V] | — |
| Schmitt-Thompson | Triage qua điện thoại | Thu phí giấy phép [114] [V2] | — |
| ESI v5 | Thang tại khoa cấp cứu | © ENA 2023; không sao chép khi chưa có văn bản cho phép [115] [V2] | — |
| CTAS | Thang tại khoa cấp cứu | CHƯA XÁC MINH | — |

Diễn giải, không phải tư vấn pháp lý:
- doctor-v **không** sao chép nội dung hay logic của MTS, NHS Pathways, Schmitt-Thompson, ESI.
- SATS không dùng được cho sản phẩm thương mại.
- Tài liệu WHO cần kiểm tra giấy phép theo từng văn bản.
- Cách an toàn: tự viết lại tiêu chí bằng lời của mình, trích nguồn từng tiêu chí, và nhờ luật sư rà soát.

#### c. Nguồn red flag và điều khoản tái sử dụng

| Nguồn | Nội dung hữu ích | Điều khoản / trạng thái |
|---|---|---|
| Trang NHS ("call 999/111 if…") [116] | Dấu hiệu nguy hiểm theo từng triệu chứng | OGL v3: dùng miễn phí, kể cả thương mại, có ghi nguồn. Dịch thuật được tính là "adaptation", nên bản dịch không được ghi là nội dung NHS. Logo và "medical devices" bị loại trừ. Trang dành cho người sống ở Anh. [V] |
| NICE CKS [117] | Red flag theo chủ đề | Cần giấy phép qua Agilio. Dùng ngoài UK phải trả phí và ký giấy phép. Có mẫu xin phép riêng cho dùng trong AI. [V2] |
| NICE NG143 [118] | Bảng "đèn giao thông" cho trẻ <5 tuổi bị sốt | © NICE 2019. Rà soát 4/2025 quyết định không cập nhật phần này. [V2] |
| NICE NG253 / NG254 [119] | Sepsis ≥16 tuổi / <16 tuổi, ban hành 19/11/2025, thay một phần NG51 | [V2] |
| WHO 2009 (dengue) [120] | Dấu hiệu cảnh báo: đau bụng hoặc ấn đau; nôn liên tục; ứ dịch trên lâm sàng; chảy máu niêm mạc; li bì/vật vã; gan to >2 cm; Hct tăng kèm tiểu cầu giảm nhanh | [V2] |
| Bộ Y tế, QĐ 2760/QĐ-BYT (04/07/2023) [121] | Hướng dẫn chẩn đoán, điều trị SXHD, thay QĐ 3705/QĐ-BYT (2019). Dấu hiệu cảnh báo theo tài liệu thứ cấp: đau bụng nhiều hoặc ấn đau vùng gan; vật vã/li bì; gan to >2 cm; nôn nhiều; xuất huyết niêm mạc; tiểu ít; Hct tăng kèm tiểu cầu giảm nhanh | Số hiệu, ngày [V2]; nội dung bản gốc CHƯA XÁC MINH |
| Bộ Y tế, QĐ 292/QĐ-BYT (2024) [122] | Tay chân miệng, phân độ; thay QĐ 1003/QĐ-BYT (2012) | [V2]; nội dung và ngày chính xác CHƯA XÁC MINH |

Khuyến nghị:
- Red flag đặc thù Việt Nam phải lấy từ văn bản Bộ Y tế bản gốc.
- Red flag phổ quát có thể tham khảo trang NHS (OGL) và WHO, nhưng viết lại bằng lời của mình và trích nguồn.
- Bảng NICE chỉ dùng làm tài liệu đối chiếu nội bộ cho tới khi có giấy phép.

#### d. Ngưỡng ưu tiên an toàn

- **Threshold approach** (Pauker & Kassirer 1980) [123]. Hành động khi P(bệnh) > p* = C/(C + B):
  - C = tổn hại ròng khi hành động ở người không bệnh;
  - B = lợi ích ròng khi hành động ở người có bệnh.

  Trích dẫn [V]; công thức theo dạng chuẩn, văn bản gốc chưa đọc lại.
- **Áp vào triage.** Nâng lên mức k khi P(cần ≥ mức k) > 1/(1 + R), với R = tổn thất under-triage / tổn thất over-triage. Ví dụ:

  | R | Ngưỡng p* |
  |---|---|
  | 99 | 1% |
  | 49 | 2% |
  | 9 | 10% |
  | 3 | 25% |

- **Mốc dung sai.** Under-triage ≤5%, over-triage ≤35% [124] [V].
- **Hai tầng ngưỡng.** Infermedica dùng "likely" và "possible" [54].
- **Điều kiện tiên quyết.** Ngưỡng chỉ có nghĩa trên xác suất đã hiệu chỉnh [94]. Giá trị R do hội đồng lâm sàng quyết định, rồi tinh chỉnh trên dữ liệu kiểm định để đạt mốc dung sai.

### 3.5 Phương pháp đánh giá (mục 6)

#### a. Vignette và các giới hạn

- **Người nhập liệu là nguồn biến thiên lớn.**
  - Healthily, 139 vignette, 6 người nhập: κ giữa người nhập cho triage 0,48 [128] [V].
  - Hai bác sĩ đặt chuẩn vàng chỉ đồng thuận ở mức "fair" về chẩn đoán đầu (κ 0,35) [128].
  - Hướng dẫn nhập chặt hơn nâng κ của bệnh đầu từ 0,49 lên 0,72 và của triage từ 0,51 lên 0,71. Độ chính xác từng người thử dao động 43,9–57% [129] [V].
  - Với Ada: κ của chuyên gia 0,78 so với người thường 0,60 (ca người lớn) [72] [V].
- **Chất lượng đo lường của bộ vignette cũ yếu.**
  - Bộ Semigran: 12/41 vignette có item-total correlation âm; cả 15 vignette cấp cứu <0,2 [126] [V].
  - Độ chính xác thô 58,0% so với Capability Comparison Score (CCS) 50%. 9–10 trên 15–16 SC đổi thứ hạng khi đổi chỉ số [126].
- **Bộ vignette quyết định thứ hạng.** Thứ hạng app đổi mạnh giữa vignette đại diện và vignette Semigran [16].
- **Bổ sung vignette làm lệch kết quả.** Nhà nghiên cứu thường thêm chi tiết mà app sẽ hỏi, nên vignette có xu hướng phóng đại độ chính xác thực tế [7].
- **Mô phỏng không thay được người thật.** Người dùng mô phỏng và MedQA không dự đoán được kết quả với người thật [19].
- **Xung đột lợi ích phổ biến.** Ví dụ: [3] do Ada tài trợ; [56] có tác giả thuộc Babylon; [10] cũng ghi nhận vấn đề này.

#### b. Chuẩn và công cụ

- **Painter et al. 2022** [125] [V] đề xuất 15 yêu cầu cho một chuẩn đánh giá bằng vignette:
  1. phương pháp xác định số vignette tối thiểu;
  2. nội dung tối thiểu của vignette (nhân khẩu, bệnh kèm, thuốc);
  3. phân bố bệnh và triệu chứng;
  4. vignette lấy từ ca thật hoặc đồng sáng tạo với bệnh nhân, không phải ca "giáo khoa";
  5. ai đặt chuẩn vàng (vai trò, chuyên khoa, thâm niên);
  6. cách tổng hợp chuẩn vàng (đa số, mức nặng nhất, hay đồng thuận);
  7. danh mục triage chuẩn hóa, có nơi khám và khung thời gian;
  8. chuẩn vàng là một *khoảng* chấp nhận được;
  9. cách so DDx với chuẩn vàng;
  10. cách tính điểm chính xác và an toàn, tính cả over- và under-triage;
  11. **ngưỡng tối thiểu chấp nhận** cho chính xác và an toàn;
  12. cách tính lời khuyên safety-netting vào điểm an toàn;
  13. độ tin cậy liên người nhập tối thiểu;
  14. số lần thử và số người nhập cho mỗi vignette;
  15. đặc điểm người nhập (người không chuyên thì đại diện hơn).

  Đánh giá độc lập và đánh giá tiến cứu thực địa được để cho công việc tương lai.
- **RepVig** [16] [V].
  - Lấy mẫu ngẫu nhiên phân tầng theo cụm triệu chứng từ câu hỏi thật của người dùng (8.794 bài, còn 5.388 sau làm sạch). Gần như giữ nguyên văn. 45 vignette; 2 bác sĩ đặt chuẩn; 3 mức triage.
  - Áp dụng cho doctor-v: lấy câu hỏi thật của người Việt (từ diễn đàn sức khỏe, nhóm mạng xã hội, hotline), có đồng ý và ẩn danh.
- **Lý thuyết test** [126] và gói R symptomcheckR [127] [V].
  - Item difficulty; item-total correlation (đạt nếu >0,2); CCS (tổng difficulty của ca giải đúng trừ ca giải sai, chuẩn hóa về 0–100%).
  - Safety = tỷ lệ ca cần cấp cứu/khẩn được nhận diện đúng.
  - Inclination to overtriage = tỷ lệ lỗi over-triage so với under-triage.
  - Comprehensiveness = tỷ lệ vignette nhập được.
- **ITU/WHO FG-AI4H** [130] [V].
  - Tài liệu mô tả chủ đề "Symptom assessment" (DEL10.14) đã công bố; nhóm có Ada, Babylon, Infermedica, Isabel, Healthily tham gia.
  - Nhóm đóng ngày 30/09/2023; nhóm kế nhiệm GI-AI4H khởi động 05/07/2023.
- **Hướng dẫn báo cáo** [131–135] [V].
  - DECIDE-AI (đánh giá lâm sàng sớm, live): 17 mục riêng cho AI và 10 mục chung.
  - TRIPOD+AI: 27 mục.
  - TRIPOD-LLM: 19 mục chính.
  - STARD 2015 (độ chính xác chẩn đoán).
  - CONSORT-AI / SPIRIT-AI (thử nghiệm ngẫu nhiên).
  - CHART (chatbot health advice, 2025): CHƯA XÁC MINH.

#### c. Chỉ số (định nghĩa dùng cho doctor-v)

- **Chẩn đoán**
  - **Top-k** (k = 1, 3, 10) cho bệnh trong KB.
  - **Độ phủ** = tỷ lệ ca có chẩn đoán cuối nằm trong KB, đo riêng.
  - **Tỷ lệ "other" đúng** = ca ngoài KB được xếp "other" ở top-3.
- **Triage**
  - **Triage khớp**, trên 5 mức và 3 mức.
  - **An toàn chặt**:
    - với chuẩn vàng mức 1–2, chỉ chấp nhận mức 1–2;
    - với chuẩn vàng mức 3–5, chấp nhận kém khẩn tối đa 1 mức.

    Chặt hơn định nghĩa của Gilbert/Omaolo, vì ở đó cấp cứu → 24 giờ vẫn được tính là "an toàn".
  - **Độ nhạy với mức cấp cứu**; **under-triage ≥2 mức**; **over-triage**; **đúng ở ca tự chăm sóc**; **tỷ lệ over:under**.
  - **Weighted κ** (trọng số tuyến tính) giữa engine và chuẩn vàng.
- **Hiệu chuẩn**: Brier; top-label ECE (10 bin); calibration-in-the-large của P(mức ≤2).
- **Tin cậy**: κ hoặc ICC giữa người nhập; comprehensiveness; CCS.
- **Khoảng tin cậy**: luôn báo KTC 95% Clopper–Pearson; với under-triage, báo cận trên một phía.

#### d. Thiết kế kiểm định thực địa

| Nghiên cứu | Thiết kế | Kết quả chính | Bài học |
|---|---|---|---|
| Omaolo [136] | Bệnh nhân tự dùng khi tới 18 trung tâm chăm sóc ban đầu; y tá triage độc lập; 877 lượt | Khớp 53,7%; an toàn 97,6%. Phần Thảo luận và phần Kết quả mâu thuẫn về tỷ lệ over-/under-triage | Mô hình mẫu cho Việt Nam. Chuẩn vàng là y tá chứ không phải kết cục |
| Fraser 2022 [11] | Bệnh nhân khoa cấp cứu tự nhập trước khi gặp bác sĩ; 3 bác sĩ đánh giá | Top-3 63%; 14% không an toàn | Cỡ mẫu nhỏ (n=40) |
| Miller 2020 [137] | 523 người dùng trong phòng chờ GP ở Anh | 97,9% thấy dễ dùng. Mức "hữu ích": 93% ở 18–24 tuổi, 59% ở ≥70 tuổi. 12,8% sẽ chọn mức chăm sóc thấp hơn | Không đo độ chính xác; người cao tuổi khó dùng hơn |
| Winn 2019 [106] | 158.083 phiên Buoy: ý định trước và sau | Ý định "chưa chắc" giảm từ 34% còn 21%. Trong số có ý định rõ: hạ mức 32%, giữ 65%, tăng 4% | Không quan sát hành vi thật |
| Morse 2020 [105] | Ada tại Sutter Health, 26.646 lượt | 29,0% mức khẩn cao; 46,4% ngoài giờ hành chính | Mô tả dân số người dùng |
| Knitza 2021 [73] | RCT chéo, 164 bệnh nhân thấp khớp | Ada phát hiện bệnh thấp viêm: độ nhạy 42,6%, độ đặc hiệu 63,6% | Ở chuyên khoa hẹp, độ chính xác thấp |

Thiết kế đề xuất (PĐ):
1. **Silent mode**: kết quả của engine không hiển thị cho người dùng.
2. Bệnh nhân liên tiếp tự nhập khi đến cơ sở, trước khi được triage.
3. Y tá hoặc bác sĩ triage độc lập, không biết kết quả của engine.
4. Theo dõi kết cục 7–14 ngày qua điện thoại hoặc hồ sơ: nhập viện, quay lại cấp cứu, chẩn đoán cuối.
5. Hội đồng mù xét mọi ca bất đồng ≥2 mức.
6. Báo cáo theo DECIDE-AI.
7. Sau đó có thể triển khai stepped-wedge, có hiển thị kết quả, để đo hành vi và tải dịch vụ.

#### e. Mục tiêu chấp nhận đề xuất cho doctor-v

| Tầng | Dữ liệu | Ngưỡng tối thiểu (mục tiêu) | Căn cứ |
|---|---|---|---|
| G0. Kiểm tra tĩnh KB | Toàn bộ KB | 0 vi phạm lint: không có 0/1 ngoài loại trừ giải phẫu; mọi liên kết có nguồn, người duyệt, ngày; phân phối phân loại có tổng = 1. 100% bệnh "không được bỏ sót" có red flag hoặc tổ hợp dấu hiệu | [38,54,86] |
| G1. Vignette giữ kín | ≥300 vignette do bác sĩ không tham gia xây KB viết, trong đó ≥150 ca mức 1–2. Mỗi vignette do ≥3 người không chuyên nhập | Top-1 ≥45% (55%); top-3 ≥65% (75%); top-10 ≥85% (90%) với bệnh trong KB. Triage 5 mức khớp ≥55% (65%). An toàn chặt ≥97%. Under-triage cấp cứu ≤5% theo cận trên một phía (tức ≤2 ca sót trên 150). Over-triage ≤35%. Ca tự chăm sóc đúng ≥50%. Comprehensiveness ≥95% | [2,3,124,136] |
| G2. Vignette đại diện kiểu RepVig | ≥150 câu hỏi thật tiếng Việt, lấy mẫu phân tầng; 2 bác sĩ đặt chuẩn | Triage 3 mức ≥70%; hơn người thường trên cùng bộ ≥8 điểm; mức cấp cứu ≥90%; tự chăm sóc ≥45% | [16,18] |
| G3. Tiến cứu thực địa (silent mode) | ≥800 lượt tại ≥2 cơ sở (cấp cứu + chăm sóc ban đầu) | An toàn chặt ≥97% (cận dưới KTC ≥95,5%). 0 ca nguy kịch bị under-triage ≥2 mức. Under-triage cấp cứu ≤5%. Top-3 so với chẩn đoán cuối ≥55%. Calibration-in-the-large của P(mức ≤2) lệch tương đối ≤20% | [11,94,136] |
| G4. Sau triển khai | Nhật ký ẩn danh + mẫu có kết cục | Giám sát under-triage và drift. Chạy lại G1 sau mỗi thay đổi KB lớn | [131] |

Cỡ mẫu (tính theo phân phối nhị thức, Clopper–Pearson một phía 95%):

| Kết quả quan sát | Cận trên 95% của under-triage |
|---|---|
| 0/59 | 5,0% |
| 0/100 | 3,0% |
| 2/150 | 4,1% |
| 3/150 | 5,1% (không đạt) |
| 4/200 | 4,5% |

Với 300 vignette, KTC 95% của độ chính xác 65% là khoảng 59–70%.

---

## 4. Phản biện thiết kế và khuyến nghị cho doctor-v

### 4.1 Phản biện từng điểm

| # | Thiết kế nháp | Vấn đề (bằng chứng) | Thay đổi đề xuất |
|---|---|---|---|
| 1 | Prior theo hạng "presentation frequency", chỉnh theo tuổi, giới, thai, mùa, vùng | Đúng hướng. Nhưng một hạng toàn cục không phản ánh phân bố bệnh vốn đổi mạnh theo triệu chứng chính và tuổi: suy tim trong nhóm khó thở tăng từ 4,5% lên 21,0% theo tuổi [88]. Hệ số nhân không giới hạn có thể làm prior bùng nổ | Prior P(d \| CC, tuổi, giới) theo thang log 6 mức (4.3). Mỗi hệ số trong [0,1; 10], tích các hệ số trong [0,01; 100]. Mỗi hệ số phải có nguồn, ví dụ mùa SXHD từ [92]. Chuẩn hóa sau cùng |
| 2 | P(f\|c) theo bucket (very common 0,8–0,95; common 0,5; occasional 0,15–0,2; rare 0,05) | Bucket là đúng: độ chính xác bền với sai số tham số [84–86]. Nhưng giá trị theo khoảng thì không xác định, và "rare 0,05" gấp đôi QMR-DT (0,025) | 5 điểm cố định 0,025 / 0,20 / 0,50 / 0,80 / 0,95, có mốc số cho chuyên gia (3.3-f). Hạ một mức nếu nguồn là bệnh viện mà người dùng là cộng đồng [89–91] |
| 3 | Leak cho mọi cặp bệnh–finding không liên kết | Gánh nặng N×M, dễ thiếu nhất quán. Leak là thuộc tính của finding [80–82]. Leak đồng nhất quá nhỏ làm hỏng xếp hạng [38] | ℓ_f theo finding × ngữ cảnh triệu chứng chính. P(f\|d) = 1 − (1 − ℓ_f)(1 − p_df), nên tự động có P(f\|d) ≥ ℓ_f (đơn điệu) |
| 4 | Naive Bayes trên các giả thuyết loại trừ lẫn nhau, cộng "other" | Double counting [36,57]; quá tự tin [76]; đánh giá thấp ca nhiều bệnh [41]. "Other" chưa có likelihood và chưa có mức khẩn | Cụm finding, w_C, τ (3.3-a). "Other" có prior ρ_CC (0,10–0,20) và likelihood bằng leak. Thêm cờ "finding chưa giải thích". Thiết kế sẵn lộ trình sang noisy-OR (3.3-b) |
| 5 | Bỏ qua câu trả lời "Không rõ" | Đúng cho suy luận nếu dữ liệu thiếu ngẫu nhiên. Với red flag thì "không rõ" khác "không"; Infermedica cũng tách absent và unknown [53]. Người cao tuổi, người không có nhiệt kế thì thiếu dữ liệu không ngẫu nhiên | Khi suy luận: vẫn bỏ qua. Red flag mức 1–2: hỏi lại bằng cách diễn đạt khác hoặc bằng quan sát thay thế. Nếu vẫn "không rõ" thì coi là "có thể có" khi tính triage: ít nhất mức 3, hoặc bằng mức của red flag nếu bối cảnh nguy cơ cao. Khi chọn câu hỏi: đưa xác suất "không rõ" vào VOI |
| 6 | Loại trừ cứng bằng prior = 0 | QMR-DT: một lỗi dữ liệu đặt prior = 0 làm posterior của chẩn đoán đúng = 0 [38]. Giá trị 0 là nguồn lỗi chính [86]. Câu tự khai "không có thai" không loại trừ được chửa ngoài tử cung | Chỉ loại trừ khi bất khả về giải phẫu, dựa trên câu hỏi giải phẫu tường minh. Mọi trường hợp khác dùng hệ số ≥0,01. Với nữ trong độ tuổi sinh sản, "không có thai" chỉ nhân 0,1–0,2 cho các bệnh liên quan thai, trừ khi có xét nghiệm âm tính gần đây (PĐ; cần bác sĩ sản duyệt) |
| 7 | Hỏi red flag bắt buộc trước | Đúng hướng: IMCI và ETAT đều mở đầu bằng dấu hiệu nguy hiểm [107,108]; Infermedica có r2/r3 [53]. Rủi ro: danh sách dài gây mệt, người dùng chọn "không" hàng loạt | Một câu red flag phổ quát dạng multi-select, có lựa chọn tường minh "Không có dấu hiệu nào ở trên", cộng 1–2 câu theo triệu chứng chính và tuổi. ≤6–7 mục mỗi nhóm. Diễn đạt bằng hành vi quan sát được ("không nói trọn câu vì khó thở"). Chế độ người cao tuổi hỏi có/không từng mục |
| 8 | EIG cộng trọng số cho bệnh nguy hiểm | EIG ưu tiên phân biệt bệnh phổ biến. Trọng số tùy ý không gắn với mục tiêu an toàn | VOI của quyết định triage với ma trận tổn thất nhất quán với ngưỡng; Pathfinder đã dùng utility [57]. EIG chẩn đoán chỉ dùng sau khi triage ổn định. Chia điểm cho chi phí câu hỏi (4.2) |
| 9 | Dừng khi tự tin, khi IG thấp, hoặc khi đủ số câu tối đa | Không có tiêu chí "triage ổn định": có thể dừng khi chẩn đoán đã tự tin nhưng triage vẫn dao động | 4 điều kiện dừng (4.2). Trần 30 câu (Ada 27–34, Buoy khoảng 30 [71,72]); trần mềm 20 |
| 10 | Triage = max(red flag, bệnh khẩn nhất vượt ngưỡng riêng của bệnh) | Ngưỡng theo từng bệnh bỏ sót nguy cơ cộng dồn: 5 bệnh cấp cứu, mỗi bệnh 0,8%, cộng lại là 4%. "Other" không có mức khẩn. Posterior chưa hiệu chỉnh [76] | Xác suất cộng dồn theo mức, P_k (4.2). Ngưỡng θ_k suy từ tổn thất [123]. Hai tầng "possible" / "likely" như Infermedica [54]. Thêm tổ hợp dấu hiệu. Không bao giờ ra "tự chăm sóc" khi P(other) > 0,3 hoặc còn red flag "không rõ" |
| 11 | Điều chỉnh theo tuổi, thai, ức chế miễn dịch | Dạng hệ số chung chung, khó kiểm tra | Quy tắc tường minh có nguồn, ví dụ: trẻ <3 tháng có sốt → ít nhất mức 2 (ETAT "trẻ <3 tháng" [108]; NICE NG143 [118], cần duyệt nội dung và giấy phép); ≥75 tuổi → giảm θ một nửa; thai ≥20 tuần + đau đầu/nhìn mờ/phù → mức 2 (dạng triage tuple [54]); ức chế miễn dịch + sốt → ít nhất mức 3. Mọi quy tắc cần bác sĩ duyệt |
| 12 | Giải thích bằng các finding làm tăng hoặc giảm khả năng | Tốt; với naive Bayes, đóng góp log-LR là chính xác | Thêm bằng chứng mâu thuẫn và chưa xác nhận (như /explain [53]). Thêm "điều gì sẽ làm thay đổi khuyến nghị". Mức triage được giải thích bằng red flag hoặc tổ hợp cụ thể. Hiển thị khả năng bằng nhãn chữ thay vì % khi chưa hiệu chuẩn |
| 13 | Chạy deterministic bằng TypeScript trong trình duyệt | Tốt cho tái lập và quyền riêng tư | Tính trong log-space với logsumexp. Thứ tự duyệt ổn định; tie-break theo ID. Không dùng Math.random. Hiển thị hash phiên bản KB trong kết quả. Có kiểm thử hồi quy và kiểm thử thuộc tính (4.4) |
| 14 | KB lấy từ hướng dẫn và tài liệu, bác sĩ duyệt | Thiếu quy trình gợi xuất có cấu trúc; rủi ro chỉ có một chuyên gia quyết định | Thứ bậc nguồn: tổng quan hệ thống ở bối cảnh cộng đồng > cohort > hướng dẫn (BYT/WHO) > đồng thuận chuyên gia. Mỗi bệnh do 2 bác sĩ độc lập gợi xuất, có trọng tài. Đo weighted κ trên bucket. Mỗi phiên ≤1 giờ [96]. Ghi bối cảnh nguồn. Theo dõi văn bản BYT mới (ví dụ QĐ 2760/2023 đã thay QĐ 3705/2019 [121]) |

### 4.2 Đặc tả engine đề xuất (v1)

```text
ĐẦU VÀO: CC (triệu chứng chính), tuổi, giải phẫu/giới, thai (có / không / không rõ),
         vùng, tháng, yếu tố nguy cơ, các câu trả lời
GIẢ THUYẾT: D = {d1..dN} ∪ {other}

PRIOR
  π(d)     = base(d | CC, nhóm_tuổi, giới) × Π_k clamp(m_k(d, ngữ_cảnh), 0.1, 10)
             (tích các hệ số clamp trong [0.01, 100])
  π(other) = ρ_CC                      # mặc định 0.15
  chuẩn hóa để Σ π = 1

LIKELIHOOD
  finding nhị phân f:
    trả lời "có":     L(f+ | d) = 1 − (1 − ℓ_f)(1 − p_df)    # p_df = 0 nếu không liên kết
    trả lời "không":  L(f− | d) = (1 − ℓ_f)(1 − p_df)
    "không rõ":       bỏ qua (L = 1)
  finding phân loại g, giá trị v (K giá trị):
    L(v | d) = (θ_dv + α) / (1 + K·α),  α = 0.02
  cụm tương quan C:
    đóng_góp_C(d) = w_C · Σ_{f∈C} log L(f | d),  w_C = 1 / (1 + ρ_C·(|C| − 1))

POSTERIOR
  log P(d | E) = log π(d) + τ · Σ đóng_góp(d) − logsumexp(...)
  τ ∈ [0.5, 1], ước lượng bằng cực tiểu log loss trên vignette kiểm định

TRIAGE (mức 1 = gọi 115 … 5 = tự chăm sóc; u(d) = mức của bệnh d)
  P_k    = Σ_{d: u(d) ≤ k} P(d) + P(other) · q_k            # k = 1..4
  L_prob = k nhỏ nhất thỏa P_k ≥ θ_k (không có k nào thì L_prob = 5)
  L      = min(L_redflag, L_tuple, L_quy_tắc_nhóm_nguy_cơ, L_prob)
  nếu L = 5 và (P(other) > 0.3 hoặc còn red flag mức 1–2 "không rõ"): L = 4
  luôn kèm safety-netting: các dấu hiệu "đi cấp cứu ngay nếu…"
                           của những bệnh có P ≥ 0.005 và u ≤ 2

CHỌN CÂU HỎI (q có tập đáp án A, gồm "không rõ" với xác suất u_q)
  Loss(k, u) = (u − k) · 1                  nếu k < u   (over-triage)
             = (k − u) · W(u)               nếu k > u   (under-triage)
               W(1–2) = 49 (99 nếu là bệnh "không được bỏ sót"); W(3) = 9; W(4) = 3
  R(P)     = min_k Σ_d P(d) · Loss(k, u(d))
  VOI_T(q) = R(P) − Σ_{a∈A} P(a) · R(P | a)
  EIG(q)   = H(P) − Σ_{a∈A} P(a) · H(P | a)
  score(q) = [VOI_T(q) + λ · EIG(q)] / c_q
             λ nhỏ (0.1) cho tới khi triage ổn định, sau đó λ = 1
  chỉ xét các câu đã thỏa điều kiện tiên quyết (prerequisite)

DỪNG KHI
  (1) đã hỏi hết red flag bắt buộc, không còn red flag mức 1–2 "không rõ" chưa xử lý, VÀ
  (2) triage ổn định: với mọi câu còn lại, P(đáp án làm đổi L) < 0.05, VÀ
  (3) top-3 tích lũy ≥ 0.80, hoặc max EIG < 0.05 bit, hoặc max VOI_T < 0.01;
  HOẶC (4) đã hỏi 30 câu. Từ câu 20 trở đi, cho người dùng chọn dừng với triage thận trọng.

GIẢI THÍCH
  contrib_f(d) = τ · w · [log L(f | d) − log L(f | other)]
  hiển thị: top-3 đóng góp dương, top-2 đóng góp âm,
            red flag / tổ hợp quyết định mức triage,
            "câu trả lời nào sẽ đổi khuyến nghị"
```

Tính nhất quán:
- Với ma trận tổn thất ở trên, quy tắc tối thiểu hóa tổn thất kỳ vọng trùng với ngưỡng θ khi so sánh hai mức kề nhau: p* = 1/(1 + W). Ví dụ W = 49 cho θ = 0,02 [123].
- Như vậy, ngưỡng triage và tiêu chí chọn câu hỏi tối ưu cùng một mục tiêu.

### 4.3 Bảng tham số mặc định

| Tham số | Mặc định | Khoảng / ghi chú | Căn cứ |
|---|---|---|---|
| p_df cho mức 1…5 | 0,025 / 0,20 / 0,50 / 0,80 / 0,95 | Cố định, không dùng khoảng | QMR-DT [39]; trần 0,95 là PĐ |
| Leak ℓ_f: đặc hiệu / vừa / không đặc hiệu | 0,01 / 0,05 / 0,20 | 0,005–0,02 / 0,02–0,10 / 0,10–0,30; sàn 0,001 | PĐ; [38,39] |
| α (làm trơn biến phân loại) | 0,02 | 0,01–0,05 | PĐ; tránh giá trị 0 [86] |
| Prior 6 mức theo CC × tuổi | 0,30 / 0,10 / 0,02 / 0,005 / 0,0006 / 0,0001 | Ranh giới: ≥20% / 5–20% / 1–5% / 0,2–1% / 0,02–0,2% / <0,02% | PĐ, neo vào [88] |
| Hệ số ngữ cảnh m_k | — | Mỗi hệ số trong [0,1; 10]; tích trong [0,01; 100] | PĐ |
| ρ_CC (prior của "other") | 0,15 | 0,10–0,20; tái ước lượng bằng tỷ lệ chẩn đoán cuối nằm ngoài KB | PĐ. Tham chiếu: QMR từ chối 21/62 ca vì nằm ngoài KB [38]; độ phủ của app 51,5–99% [3] |
| ρ_C (tương quan trong cụm) | 0,5 | 0,2 / 0,5 / 0,8 | PĐ; cùng ý tưởng với [77,78] |
| τ (temperature) | ước lượng từ dữ liệu | 0,5–1,0 | [76,95]; PĐ |
| θ_1 (gọi 115) | Chủ yếu qua red flag/tổ hợp; hoặc P(bệnh cần vận chuyển cấp cứu) ≥ 0,10 | 0,05–0,20 | PĐ |
| θ_2 (đến cấp cứu) | 0,02; với bệnh "không được bỏ sót" là 0,01 | 0,01–0,05 | [123]; tinh chỉnh để đạt [124] |
| θ_3 (khám trong 24 giờ) | 0,10 | 0,05–0,20 | [123] |
| θ_4 (khám theo hẹn) | 0,25 | 0,15–0,35 | [123] |
| q_1..q_4 (mức khẩn của "other") | 0,01 / 0,05 / 0,20 / 0,50 | Ước lượng lại từ dữ liệu | PĐ |
| Cấm khuyên "tự chăm sóc" khi | P(other) > 0,3, hoặc còn red flag "không rõ" | — | PĐ; tương tự diagnosis_unknown [54] |
| Ngưỡng safety-netting | P(d) ≥ 0,005 với u(d) ≤ 2 | — | PĐ |
| Tiêu chí dừng | P(đổi triage) < 0,05; top-3 ≥ 0,80; EIG < 0,05 bit; trần 30, trần mềm 20 | — | [65,71,72]; PĐ |
| Số mục mỗi nhóm multi-select | ≤6–7 | Chế độ người cao tuổi: hỏi có/không từng mục | PĐ |
| Chi phí câu hỏi c_q | 1 có/không; 1,5 multi-select; 2 cần đo (nhiệt độ); 3 nhạy cảm | — | PĐ |
| u_q (xác suất "không rõ") | 0,1 | 0,2–0,3 với câu cần đo hoặc quan sát ở người cao tuổi; cập nhật từ nhật ký | PĐ |
| Cờ "finding chưa giải thích" | Finding dương quan trọng có LR < 2 với mọi bệnh trong top-3 → triage ít nhất mức 4 | — | PĐ; theo khái niệm import [36] |

### 4.4 Failure mode lớn nhất và cách giảm thiểu

| # | Failure mode | Cơ chế | Giảm thiểu | Chỉ số giám sát |
|---|---|---|---|---|
| 1 | **Under-triage cấp cứu** | Red flag không được hỏi, bị hiểu sai, hoặc "không rõ". Biểu hiện không điển hình ở người cao tuổi (nhồi máu cơ tim không đau ngực, nhiễm khuẩn huyết không sốt). KB thiếu bệnh | Red flag phổ quát + theo triệu chứng chính + theo tuổi. Câu chữ đã qua phỏng vấn nhận thức (cognitive interview). Xử lý "không rõ" (4.1 #5). Tổ hợp dấu hiệu. Quy tắc riêng cho ≥75 tuổi. Ngưỡng 1–2% | Độ nhạy với mức cấp cứu ≥95%; 0 ca under-triage ≥2 mức với ca nguy kịch |
| 2 | **Bệnh ngoài KB** | Thiếu độ phủ (độ phủ ở các app dao động 51,5–99% [3]) | Giả thuyết "other" + quy tắc cấm tự chăm sóc. Kiểm toán độ phủ trên dữ liệu thật. Ưu tiên bệnh "không được bỏ sót" và bệnh hay gặp ở Việt Nam | Tỷ lệ chẩn đoán cuối nằm ngoài KB; tỷ lệ "other" đúng |
| 3 | **Posterior quá tự tin** | Double counting; leak quá nhỏ; xác suất 0 | Cụm biến, w_C, τ; sàn leak; lint chặn xác suất 0 | ECE, Brier; tỷ lệ ca sai có top-1 > 0,8 |
| 4 | **Prior sai cho Việt Nam** | Không có dữ liệu presentation frequency tại Việt Nam; spectrum effect | Prior theo CC × tuổi do chuyên gia ước lượng, kèm phân tích độ nhạy ±1 mức. Hệ số mùa lấy từ giám sát dịch tễ. Tái ước lượng từ dữ liệu kết cục | Calibration-in-the-large theo nhóm bệnh |
| 5 | **Over-triage quá mức** | Ngưỡng thấp kết hợp posterior chưa hiệu chỉnh. Người dùng mất tin và bỏ qua lời khuyên | Ngưỡng suy từ tổn thất rồi tinh chỉnh; mục tiêu ca tự chăm sóc đúng ≥50%. Safety-netting chi tiết cho phép chọn mức thấp hơn một cách an toàn | Over-triage ≤35%; tỷ lệ over:under |
| 6 | **Ngôn ngữ và văn hóa** | Từ dân gian ("cảm", "trúng gió", "nóng trong", "đau bao tử", "tức ngực"); khác biệt vùng miền; người cao tuổi đọc chậm | Từ điển đồng nghĩa có bác sĩ duyệt. Thử nghiệm với người dùng 3 miền. Ví dụ và hình minh họa. Kiểm định riêng cho ≥65 tuổi (Miller 2020: chỉ 59% người ≥70 tuổi thấy hữu ích [137]) | κ giữa người nhập; tỷ lệ "không rõ" |
| 7 | **Overfit vào vignette** | Người xây KB cũng là người viết vignette | Bộ giữ kín do bác sĩ độc lập viết; bộ RepVig từ câu hỏi thật; nghiên cứu tiến cứu [16,125] | Chênh lệch kết quả nội bộ và giữ kín |
| 8 | **Hồi quy khi sửa KB** | Một thay đổi cục bộ phá hỏng ca khác | CI: chạy toàn bộ vignette sau mỗi thay đổi; chặn merge nếu top-3 giảm >2 điểm hoặc có thêm ca sót cấp cứu. Kiểm thử thuộc tính, ví dụ thêm red flag "có" không bao giờ làm giảm mức khẩn; thêm finding có liên kết không làm giảm odds của bệnh đó so với bệnh không liên kết | Số lỗi hồi quy theo phiên bản |
| 9 | **Hướng dẫn thay đổi** | Văn bản BYT/WHO mới | Lịch rà soát hằng quý; trường "văn bản nguồn + ngày" trên mỗi luật | Số luật quá hạn rà soát |
| 10 | **Pháp lý** | Có thể bị coi là thiết bị y tế; bản quyền giao thức | Rà soát pháp lý theo NĐ 98/2021 và văn bản liên quan (CHƯA XÁC MINH [139]). Không dùng MTS/Pathways/Schmitt-Thompson/ESI/NICE khi chưa có giấy phép | — |
| 11 | **Rủi ro LLM** (nếu thêm vào) | Bịa finding, không tái lập, dễ bị dẫn dắt [34,69,70] | Chỉ dùng để gợi ý finding; người dùng phải xác nhận; không bao giờ tự đặt red flag thành "không". Kiểm định precision/recall cho từng red flag (≥0,95 recall) | Recall red flag trên tập kiểm định tiếng Việt |

### 4.5 Lộ trình đề xuất (PĐ)

1. **Nền tảng**
   - Schema KB dạng noisy-OR (p_df, ℓ_f, cụm, nguồn, người duyệt, ngày).
   - Danh sách 30–50 triệu chứng chính.
   - Danh sách bệnh "không được bỏ sót" cho từng triệu chứng chính.
   - Bộ lint; giao thức gợi xuất (2 bác sĩ + trọng tài).
2. **Bộ dữ liệu kiểm định**
   - ≥300 vignette giữ kín và ≥150 vignette kiểu RepVig tiếng Việt.
   - Đo người thường trên cùng bộ để có đối chứng.
3. **Hiệu chuẩn**
   - Ước lượng τ, ρ_CC, θ_k trên một phần dữ liệu.
   - Kiểm tra G1/G2 trên phần còn lại.
4. **Thực địa silent mode**
   - ≥800 lượt tại ≥2 cơ sở, kiểm tra G3.
5. **Ra mắt có giám sát (G4)**
   - Sau đó mới cân nhắc noisy-OR đa bệnh, xếp hạng counterfactual [55], và bộ trích xuất LLM.

---

## 5. Câu hỏi mở / rủi ro

1. **Dữ liệu Việt Nam**
   - Không tìm thấy cơ sở dữ liệu P(chẩn đoán | lý do khám) của Việt Nam tương tự Okkes [88] (CHƯA XÁC MINH là không tồn tại). Cần hợp tác với phòng khám hoặc bệnh viện để ước lượng prior và độ phủ.
   - Mùa cúm, sốt mò, Whitmore, leptospira theo vùng: CHƯA XÁC MINH.
2. **Pháp lý**
   - Trạng thái thiết bị y tế theo NĐ 98/2021/NĐ-CP, NĐ 07/2023/NĐ-CP và Thông tư 05/2022/TT-BYT: phần mềm hỗ trợ triage có thể thuộc loại B/C [139]. CHƯA XÁC MINH; cần chuyên gia pháp chế.
   - EU MDR Rule 11 (IIa/IIb/III) [138]: CHƯA XÁC MINH văn bản, nhưng Ada tự công bố là IIa [51]. Tổng quan [6] ghi nhận MHRA (UK) xếp các công cụ này vào nhóm nguy cơ thấp, tự chứng nhận.
   - Quy định bảo vệ dữ liệu cá nhân (Nghị định 13/2023/NĐ-CP; luật năm 2025): CHƯA XÁC MINH chi tiết. Kiến trúc chạy trong trình duyệt giảm rủi ro này.
3. **Bản quyền nội dung**
   - Giấy phép của WHO IMCI/ETAT/IITT: CHƯA XÁC MINH.
   - Nội dung NICE dùng ngoài UK phải trả phí.
   - Bản dịch nội dung NHS không được gọi là nội dung NHS [116,117].
4. **Văn bản BYT**: chưa đối chiếu nguyên văn dấu hiệu cảnh báo trong QĐ 2760/QĐ-BYT và phân độ trong QĐ 292/QĐ-BYT [121,122].
5. **Lỗ hổng tài liệu do hết hạn mức tìm kiếm**
   - Một đánh giá năm 2026 về triage của "ChatGPT Health" (nghi có under-triage cấp cứu): CHƯA XÁC MINH.
   - Việc AMIE thực địa đã in trên The Lancet: CHƯA XÁC MINH.
   - Số liệu chi tiết của CRAFT-MD: CHƯA XÁC MINH.
   - Chưa tìm được đánh giá triage nào đã kiểm chứng cho các mô hình thế hệ 2025–2026 (GPT-5, Claude 4.x, Gemini 2.5+). Mô hình mới nhất có số liệu kiểm chứng trong báo cáo này là o3 [24] và Gemini 2.0 Flash [33].
   - Không tìm thấy đánh giá SC/LLM nào bằng tiếng Việt hoặc tại Việt Nam.
6. **Hiệu chuẩn khi thiếu kết cục thật**: vignette chỉ cho phép hiệu chỉnh 1–2 tham số. Ngưỡng 1–2% có thể gây over-triage cho tới khi có dữ liệu thực địa.
7. **Đa bệnh và bệnh mạn**: v1 single-fault sẽ yếu với người cao tuổi đa bệnh. Cần đo riêng nhóm ≥65 tuổi.
8. **Chuẩn vàng**: bác sĩ cũng bất đồng (κ 0,35 cho chẩn đoán đầu [128]). Nên dùng chuẩn vàng dạng khoảng, theo Painter [125], cộng kết cục theo dõi.
9. **Hành vi người dùng**: không nghiên cứu nào trong tài liệu đo tỷ lệ người dùng làm theo lời khuyên trong thực tế [10]. Ý định không phải hành vi [106].
10. **LLM front-end**: chưa có bằng chứng về độ chính xác trích xuất triệu chứng từ lời kể tiếng Việt của người thường.

---

## 6. Tài liệu tham khảo

Tất cả truy cập ngày 2026-10-24.

**A. Độ chính xác của SC và của người thường**

1. Semigran HL, Linder JA, Gidengil C, Mehrotra A. Evaluation of symptom checkers for self diagnosis and triage: audit study. BMJ 2015;351:h3480. doi:10.1136/bmj.h3480. https://pmc.ncbi.nlm.nih.gov/articles/PMC4496786/
2. Semigran HL, Levine DM, Nundy S, Mehrotra A. Comparison of physician and computer diagnostic accuracy. JAMA Intern Med 2016;176(12):1860–1861. doi:10.1001/jamainternmed.2016.6001. https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2565684
3. Gilbert S, Mehl A, Baluch A, et al. How accurate are digital symptom assessment apps for suggesting conditions and urgency advice? A clinical vignettes comparison to GPs. BMJ Open 2020;10:e040269. doi:10.1136/bmjopen-2020-040269. https://pmc.ncbi.nlm.nih.gov/articles/PMC7745523/
4. Hill MG, Sim M, Mills B. The quality of diagnosis and triage advice provided by free online symptom checkers and apps in Australia. Med J Aust 2020;212(11):514–519. doi:10.5694/mja2.50600 (metadata qua api.crossref.org; toàn văn không truy cập được)
5. Ceney A, Tolond S, Glowinski A, Marks B, Swift S, Palser T. Accuracy of online symptom checkers and the potential impact on service utilisation. PLoS One 2021;16(7):e0254088. doi:10.1371/journal.pone.0254088. https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0254088
6. Wallace W, Chan C, Chidambaram S, et al. The diagnostic and triage accuracy of digital and online symptom checker tools: a systematic review. npj Digit Med 2022;5:118. doi:10.1038/s41746-022-00667-w. https://pmc.ncbi.nlm.nih.gov/articles/PMC9385087/
7. Schmieding ML, Kopka M, Schmidt K, Schulz-Niethammer S, Balzer F, Feufel MA. Triage accuracy of symptom checker apps: 5-year follow-up evaluation. J Med Internet Res 2022;24(5):e31810. doi:10.2196/31810. https://pmc.ncbi.nlm.nih.gov/articles/PMC9131144/
8. Schmieding ML, Mörgeli R, Schmieding MAL, Feufel MA, Balzer F. Benchmarking triage capability of symptom checkers against that of medical laypersons: survey study. J Med Internet Res 2021;23(3):e24475. doi:10.2196/24475. https://pmc.ncbi.nlm.nih.gov/articles/PMC7991983/
9. Chambers D, Cantrell AJ, Johnson M, Preston L, Baxter SK, Booth A, Turner J. Digital and online symptom checkers and health assessment/triage services for urgent health problems: systematic review. BMJ Open 2019;9(8):e027743. doi:10.1136/bmjopen-2018-027743. https://pmc.ncbi.nlm.nih.gov/articles/PMC6688675/
10. Riboli-Sasco E, El-Osta A, Alaa A, et al. Triage and diagnostic accuracy of online symptom checkers: systematic review. J Med Internet Res 2023;25:e43803. doi:10.2196/43803. https://pmc.ncbi.nlm.nih.gov/articles/PMC10276326/
11. Fraser HSF, Cohan G, Koehler C, et al. Evaluation of diagnostic and triage accuracy and usability of a symptom checker in an emergency department: observational study. JMIR Mhealth Uhealth 2022;10(9):e38364. doi:10.2196/38364
12. Fraser H, Crossland D, Bacher I, Ranney M, Madsen T, Hilliard R. Comparison of diagnostic and triage accuracy of Ada Health and WebMD symptom checkers, ChatGPT, and physicians for patients in an emergency department: clinical data analysis study. JMIR Mhealth Uhealth 2023;11:e49995. doi:10.2196/49995. https://pmc.ncbi.nlm.nih.gov/articles/PMC10582809/

**B. LLM và nghiên cứu 2023–2026**

13. Ito N, Kadomatsu S, Fujisawa M, et al. The accuracy and potential racial and ethnic biases of GPT-4 in the diagnosis and triage of health conditions: evaluation study. JMIR Med Educ 2023;9:e47532. doi:10.2196/47532. https://pmc.ncbi.nlm.nih.gov/articles/PMC10654908/
14. Levine DM, Tuwani R, Kompa B, et al. The diagnostic and triage accuracy of the GPT-3 artificial intelligence model: an observational study. Lancet Digit Health 2024;6(8):e555–e561. doi:10.1016/S2589-7500(24)00097-9. Preprint: https://pmc.ncbi.nlm.nih.gov/articles/PMC9915829
15. Sorich MJ, Mangoni AA, Bacchi S, Menz BD, Hopkins AM. The triage and diagnostic accuracy of frontier large language models: updated comparison to physician performance. J Med Internet Res 2024;26:e67409. doi:10.2196/67409. https://pmc.ncbi.nlm.nih.gov/articles/PMC11662182/
16. Kopka M, Napierala H, Privoznik M, Sapunova D, Zhang S, Feufel MA. The RepVig framework for designing use-case specific representative vignettes and evaluating triage accuracy of laypeople and symptom assessment applications. Sci Rep 2024;14:30614. doi:10.1038/s41598-024-83844-z. https://pmc.ncbi.nlm.nih.gov/articles/PMC11666565/
17. Kopka M, von Kalckreuth N, Feufel MA. Accuracy of online symptom assessment applications, large language models, and laypeople for self-triage decisions. npj Digit Med 2025;8:178. doi:10.1038/s41746-025-01566-6. https://depositonce.tu-berlin.de/items/ffd424b7-a353-4dd9-bc54-03f9b719f43d/full
18. Kopka M, Wang SM, Kunz S, Schmid C, Feufel MA. Technology-supported self-triage decision making. npj Health Syst 2025;2:3. doi:10.1038/s44401-024-00008-x. https://depositonce.tu-berlin.de/items/df18b72e-37ea-4b48-ab7e-0d54160b06ed/full
19. Bean AM, Payne RE, Parsons G, et al. Reliability of LLMs as medical assistants for the general public: a randomized preregistered study. Nat Med 2026;32:609–615. doi:10.1038/s41591-025-04074-y. Preprint arXiv:2504.18919. https://syntheticsociety.oii.ox.ac.uk/research/reliability-llms-medical-assistants/
20. Johri S, Jeong J, Tran BA, et al. An evaluation framework for clinical use of large language models in patient interaction tasks. Nat Med 2025;31:77–86. doi:10.1038/s41591-024-03328-5. Trang tin: https://hms.harvard.edu/news/how-good-are-ai-clinicians-medical-conversations
21. Tu T, Schaekermann M, Palepu A, et al. Towards conversational diagnostic artificial intelligence. Nature 2025. doi:10.1038/s41586-025-08866-7. https://pmc.ncbi.nlm.nih.gov/articles/PMC12158756/
22. McDuff D, Schaekermann M, Tu T, et al. Towards accurate differential diagnosis with large language models. Nature 2025. doi:10.1038/s41586-025-08869-4. arXiv:2312.00164
23. Brodeur P, Koshy JM, Palepu A, et al. A prospective clinical feasibility study of a conversational diagnostic AI in an ambulatory primary care clinic. arXiv:2603.08448 (2026). https://arxiv.org/abs/2603.08448
24. Nori H, Daswani M, Kelly C, et al. Sequential diagnosis with language models. arXiv:2506.22405 (2025). https://arxiv.org/html/2506.22405v2
25. Goh E, Gallo R, Hom J, et al. Large language model influence on diagnostic reasoning: a randomized clinical trial. JAMA Netw Open 2024;7(10):e2440969. doi:10.1001/jamanetworkopen.2024.40969. https://pmc.ncbi.nlm.nih.gov/articles/PMC11519755/
26. Arora RK, Wei J, Hicks RS, et al. HealthBench: evaluating large language models towards improved human health. arXiv:2505.08775 (2025). https://arxiv.org/abs/2505.08775
27. Hager P, Jungmann F, Holland R, et al. Evaluation and mitigation of the limitations of large language models in clinical decision-making. Nat Med 2024;30:2613–2622. doi:10.1038/s41591-024-03097-1. https://pmc.ncbi.nlm.nih.gov/articles/PMC11405275/
28. Masanneck L, et al. Triage performance across large language models, ChatGPT, and untrained doctors in emergency medicine: comparative study. J Med Internet Res 2024;26:e53297. doi:10.2196/53297
29. Williams CYK, et al. Use of a large language model to assess clinical acuity of adults in the emergency department. JAMA Netw Open 2024;7(5):e248895. doi:10.1001/jamanetworkopen.2024.8895. Số liệu [V]; tiêu đề ghi theo trí nhớ
30. Kaboudi N, Firouzbakht S, Eftekhar MS, et al. Diagnostic accuracy of ChatGPT for patients' triage; a systematic review and meta-analysis. Arch Acad Emerg Med 2024;12(1):e60. doi:10.22037/aaem.v12i1.2384. https://pmc.ncbi.nlm.nih.gov/articles/PMC11407534/
31. Hirosawa T, et al. Diagnostic accuracy of differential-diagnosis lists generated by generative pretrained transformer 3 chatbot for clinical vignettes with common chief complaints: a pilot study. Int J Environ Res Public Health 2023;20(4):3378. doi:10.3390/ijerph20043378. https://pmc.ncbi.nlm.nih.gov/articles/PMC9967747. Số liệu [V]; tiêu đề ghi theo trí nhớ. Lưu ý: tóm tắt đảo ngược hai số top-1; dùng bảng 1
32. Hirosawa T, et al. ChatGPT-generated differential diagnosis lists for complex case–derived clinical vignettes: diagnostic accuracy evaluation. JMIR Med Inform 2023;11:e48808. doi:10.2196/48808. https://pmc.ncbi.nlm.nih.gov/articles/PMC10594139/. Số liệu [V]; tiêu đề ghi theo trí nhớ
33. Breda J, et al. SymptomAI (tiêu đề đầy đủ chưa ghi nhận). arXiv:2605.04012 (2026)
34. Zhou H, et al. MedMisBench (tiêu đề đầy đủ chưa ghi nhận). arXiv:2606.12291 (2026)
35. Omar M, et al. Sociodemographic biases in medical decision making by large language models. Nat Med 2025. doi:10.1038/s41591-025-03626-6 (trích dẫn [V]; số liệu CHƯA XÁC MINH)

**C. Cách tiếp cận và chọn câu hỏi**

36. Miller RA, Pople HE Jr, Myers JD. Internist-1, an experimental computer-based diagnostic consultant for general internal medicine. N Engl J Med 1982;307(8):468–476. doi:10.1056/NEJM198208193070803. Bản in lại: https://impact.dbmi.columbia.edu/~ehs7001/Clancey-Shortliffe-1984/Ch8.pdf
37. Shwe MA, Middleton B, Heckerman DE, Henrion M, Horvitz EJ, Lehmann HP, Cooper GF. Probabilistic diagnosis using a reformulation of the INTERNIST-1/QMR knowledge base. I. The probabilistic model and inference algorithms. Methods Inf Med 1991;30(4):241–255
38. Middleton B, Shwe MA, Heckerman DE, et al. Probabilistic diagnosis using a reformulation of the INTERNIST-1/QMR knowledge base. II. Evaluation of diagnostic performance. Methods Inf Med 1991;30(4):256–267. doi:10.1055/s-0038-1634847. https://www.erichorvitz.com/QMR-DT2.pdf
39. Shwe M, Cooper G. An empirical analysis of likelihood-weighting simulation on a large, multiply connected medical belief network. UAI 1990. arXiv:1304.1141. Bảng ánh xạ tần suất [V2: trích đoạn]
40. Heckerman D. A tractable inference algorithm for diagnosing multiple diseases (Quickscore). UAI 1989:174–181. arXiv:1304.1511
41. Heckerman D, Shwe M. Diagnosis of multiple faults: a sensitivity analysis. UAI 1993. arXiv:1303.1463
42. Jaakkola TS, Jordan MI. Variational probabilistic inference and the QMR-DT network. J Artif Intell Res 1999;10:291–322. doi:10.1613/jair.583
43. Barnett GO, Cimino JJ, Hupp JA, Hoffer EP. DXplain: an evolving diagnostic decision-support system. JAMA 1987;258(1):67–74. doi:10.1001/jama.258.1.67
44. MGH Laboratory of Computer Science. DXplain. https://www.mghlcs.org/projects/dxplain/index.html
45. Berner ES, Webster GD, Shugerman AA, et al. Performance of four computer-based diagnostic systems. N Engl J Med 1994;330(25):1792–1796. doi:10.1056/NEJM199406233302506. https://scholars.duke.edu/publication/676687
46. Feldman MJ, Hoffer EP, Conley J, et al. Dedicated AI expert system vs generative AI with large language model for clinical diagnoses. JAMA Netw Open 2025;8(5):e2512994. doi:10.1001/jamanetworkopen.2025.12994
47. Ramnarayan P, Tomlinson A, Rao A, Coren M, Winrow A, Britto J. ISABEL: a web-based differential diagnostic aid for paediatrics: results from an initial performance evaluation. Arch Dis Child 2003;88(5):408–413. doi:10.1136/adc.88.5.408. https://pmc.ncbi.nlm.nih.gov/articles/PMC1719548/
48. Graber ML, Mathew A. Performance of a web-based clinical diagnosis support system for internists. J Gen Intern Med 2008;23(Suppl 1):37–40. doi:10.1007/s11606-007-0271-8. https://pmc.ncbi.nlm.nih.gov/articles/PMC2150633/
49. Bond WF, Schwartz LM, Weaver KR, Levick D, Giuliano M, Graber ML. Differential diagnosis generators: an evaluation of currently available computer programs. J Gen Intern Med 2012;27(2):213–219. doi:10.1007/s11606-011-1804-8. https://pmc.ncbi.nlm.nih.gov/articles/PMC3270234/
50. Riches N, Panagioti M, Alam R, et al. The effectiveness of electronic differential diagnoses (DDX) generators: a systematic review and meta-analysis. PLoS One 2016;11(3):e0148991. doi:10.1371/journal.pone.0148991. https://pmc.ncbi.nlm.nih.gov/articles/PMC4782994/
51. Ada Health. Terms and conditions. https://ada.com/terms-and-conditions/
52. Infermedica. Inference engine. https://infermedica.com/inference-engine
53. Infermedica. API v3 documentation: /diagnosis, /rationale, /explain, FAQ. https://developer.infermedica.com/docs/v3/diagnosis
54. Infermedica. API v3 documentation: /triage. https://developer.infermedica.com/docs/v3/triage ; https://developer.infermedica.com/documentation/api-triage/triage
55. Richens JG, Lee CM, Johri S. Improving the accuracy of medical diagnosis with causal machine learning. Nat Commun 2020;11:3923. doi:10.1038/s41467-020-17419-7. Preprint arXiv:1910.06772
56. Baker A, Perov Y, Middleton K, et al. A comparison of artificial intelligence and human doctors for the purpose of triage and diagnosis. Front Artif Intell 2020;3:543405. doi:10.3389/frai.2020.543405
57. Heckerman DE, Horvitz EJ, Nathwani BN. Toward normative expert systems: Part I. The Pathfinder project. Methods Inf Med 1992;31(2):90–105. https://www.erichorvitz.com/Toward_Normative_Systems_MIM.pdf
58. Heckerman D, Horvitz E, Middleton B. An approximate nonmyopic computation for value of information. IEEE Trans Pattern Anal Mach Intell 1993;15(3):292–298. https://www.erichorvitz.com/nonmyopevi.htm
59. Gorry GA, Barnett GO. Experience with a model of sequential diagnosis. Comput Biomed Res 1968;1(5):490–507 (nội dung [V2] qua 57)
60. de Dombal FT, Leaper DJ, Staniland JR, McCann AP, Horrocks JC. Computer-aided diagnosis of acute abdominal pain. BMJ 1972;2(5804):9–13. doi:10.1136/bmj.2.5804.9. https://pmc.ncbi.nlm.nih.gov/articles/PMC1789017/
61. Adams ID, Chan M, Clifford PC, et al. Computer aided diagnosis of acute abdominal pain: a multicentre study. BMJ 1986;293(6550):800–804. doi:10.1136/bmj.293.6550.800. https://pmc.ncbi.nlm.nih.gov/articles/PMC1341582/
62. Fansi Tchango A, Goel R, Wen Z, Martel J, Ghosn J. DDXPlus: a new dataset for automatic medical diagnosis. NeurIPS 2022 Datasets and Benchmarks. arXiv:2205.09148
63. Yuan H, Yu S. Efficient symptom inquiring and diagnosis via adaptive alignment of reinforcement learning and classification. arXiv:2112.00733 (2021)
64. Fansi Tchango A, Goel R, Martel J, Wen Z, Marceau Caron G, Ghosn J. Towards trustworthy automatic diagnosis systems by emulating doctors' reasoning with deep reinforcement learning. NeurIPS 2022. arXiv:2210.07198
65. Rose D, et al. MEDDxAgent: a unified modular agent framework for explainable automatic differential diagnosis. ACL 2025. arXiv:2502.19175
66. Hu Y, Chen Q, Du J, et al. Improving large language models for clinical named entity recognition via prompt engineering. arXiv:2303.16416
67. Hu Z, et al. Uncertainty of Thoughts: uncertainty-aware planning enhances information seeking in large language models. NeurIPS 2024. arXiv:2402.03271
68. Li SS, et al. MediQ: question-asking LLMs and a benchmark for reliable interactive clinical reasoning. arXiv:2406.00922
69. Sclar M, Choi Y, Tsvetkov Y, Suhr A. Quantifying language models' sensitivity to spurious features in prompt design or: how I learned to start worrying about prompt formatting. ICLR 2024. arXiv:2310.11324
70. Atil B, Aykent S, Chittams A, et al. Non-determinism of "deterministic" LLM settings. arXiv:2408.04667 (v5, 2025). https://arxiv.org/abs/2408.04667
71. Ćirković A. Evaluation of four artificial intelligence–assisted self-diagnosis apps on three diagnoses: two-year follow-up study. J Med Internet Res 2020;22(12):e18097. doi:10.2196/18097. https://pmc.ncbi.nlm.nih.gov/articles/PMC7748958/
72. Jungmann SM, Klan T, Kuhn S, Jungmann F. Accuracy of a chatbot (Ada) in the diagnosis of mental disorders: comparative case study with lay and expert users. JMIR Form Res 2019;3(4):e13863. doi:10.2196/13863. https://pmc.ncbi.nlm.nih.gov/articles/PMC6914276/
73. Knitza J, et al. Thử nghiệm ngẫu nhiên chéo, Ada trong thấp khớp (164 bệnh nhân). Arthritis Res Ther 2021;23:112. Tiêu đề và DOI: CHƯA XÁC MINH

**D. Mô hình hóa, hiệu chuẩn, gợi xuất**

74. Domingos P, Pazzani M. On the optimality of the simple Bayesian classifier under zero-one loss. Mach Learn 1997;29:103–130. doi:10.1023/A:1007413511361
75. Hand DJ, Yu K. Idiot's Bayes: not so stupid after all? Int Stat Rev 2001;69(3):385–398. doi:10.1111/j.1751-5823.2001.tb00465.x
76. Niculescu-Mizil A, Caruana R. Predicting good probabilities with supervised learning. ICML 2005:625–632. doi:10.1145/1102351.1102430. https://www.cs.cornell.edu/~alexn/papers/calibration.icml05.crc.rev3.pdf
77. Spiegelhalter DJ, Knill-Jones RP. Statistical and knowledge-based approaches to clinical decision-support systems, with an application in gastroenterology. J R Stat Soc A 1984;147(1):35–77. doi:10.2307/2981737 (toàn văn chưa đọc)
78. Chan SF, Deeks JJ, Macaskill P, Irwig L. Three methods to construct predictive models using logistic regression and likelihood ratios to facilitate adjustment for pretest probability give similar results. J Clin Epidemiol 2008;61(1):52–63. doi:10.1016/j.jclinepi.2007.02.012
79. Friedman N, Geiger D, Goldszmidt M. Bayesian network classifiers. Mach Learn 1997;29:131–163. doi:10.1023/A:1007465528199
80. Henrion M. Some practical issues in constructing belief networks. UAI 1987. arXiv:1304.2725
81. Díez FJ, Druzdzel MJ. Canonical probabilistic models for knowledge engineering. Technical Report CISIAD-06-01, UNED; 2006. https://www.cisiad.uned.es/techreports/canonical.php
82. Druzdzel MJ, van der Gaag LC. Building probabilistic networks: "Where do the numbers come from?" (guest editors' introduction). IEEE Trans Knowl Data Eng 2000;12(4):481–486. https://sites.pitt.edu/~druzdzel/psfiles/tkde00.pdf
83. Zagorecki A, Druzdzel MJ. Knowledge engineering for Bayesian networks: how common are noisy-MAX distributions in practice? ECAI 2006:482–489. https://sites.pitt.edu/~druzdzel/psfiles/ecai06.pdf
84. Pradhan M, Henrion M, Provan G, Del Favero B, Huang K. The sensitivity of belief networks to imprecise probabilities: an experimental investigation. Artif Intell 1996;85:363–397. doi:10.1016/0004-3702(96)00002-1
85. Henrion M, Pradhan M, Del Favero B, Huang K, Provan G, O'Rorke P. Why is diagnosis using belief networks insensitive to imprecision in probabilities? UAI 1996. arXiv:1302.3582
86. Oniśko A, Druzdzel MJ. Impact of precision of Bayesian network parameters on accuracy of medical diagnostic systems. Artif Intell Med 2013;57(3):197–206. doi:10.1016/j.artmed.2013.01.004. https://pmc.ncbi.nlm.nih.gov/articles/PMC4486041
87. Oniśko A, Druzdzel MJ, Wasyluk H. Extension of the Hepar II model to multiple-disorder diagnosis. In: Intelligent Information Systems 2000:303–313. https://sites.pitt.edu/~druzdzel/psfiles/springer00.pdf
88. Okkes IM, Oskam SK, Lamberts H. The probability of specific diagnoses for patients presenting with common symptoms to Dutch family physicians. J Fam Pract 2002;51(1):31–36. https://cdn.mdedge.com/files/s3fs-public/Document/September-2017/5101JFP_OriginalResearch2.pdf
89. Leeflang MMG, Rutjes AWS, Reitsma JB, Hooft L, Bossuyt PMM. Variation of a test's sensitivity and specificity with disease prevalence. CMAJ 2013;185(11):E537–E544. https://pmc.ncbi.nlm.nih.gov/articles/PMC3735771
90. Murad MH, Lin L, Chu H, et al. The association of sensitivity and specificity with disease prevalence: analysis of 6909 studies of diagnostic test accuracy. CMAJ 2023;195(27):E925–E931. https://pmc.ncbi.nlm.nih.gov/articles/PMC10356012
91. Usher-Smith JA, Sharp SJ, Griffin SJ. The spectrum effect in tests for risk prediction, screening, and diagnosis. BMJ 2016;353:i3139. https://pmc.ncbi.nlm.nih.gov/articles/PMC4916916
92. Cuong HQ, Vu NT, Cazelles B, et al. Spatiotemporal dynamics of dengue epidemics, southern Vietnam. Emerg Infect Dis 2013;19(6):945–953. doi:10.3201/eid1906.121323. https://wwwnc.cdc.gov/eid/article/19/6/12-1323_article
93. Khanh TH, Sabanathan S, Thanh TT, et al. Enterovirus 71–associated hand, foot, and mouth disease, southern Vietnam, 2011. Emerg Infect Dis 2012;18(12):2002–2005. doi:10.3201/eid1812.120929
94. Van Calster B, McLernon DJ, van Smeden M, Wynants L, Steyerberg EW. Calibration: the Achilles heel of predictive analytics. BMC Med 2019;17:230. doi:10.1186/s12916-019-1466-7. https://pmc.ncbi.nlm.nih.gov/articles/PMC6912996/
95. Guo C, Pleiss G, Sun Y, Weinberger KQ. On calibration of modern neural networks. ICML 2017. arXiv:1706.04599
96. Renooij S. Probability elicitation for belief networks: issues to consider. Knowl Eng Rev 2001;16(3):255–269. doi:10.1017/S0269888901000145. https://webspace.science.uu.nl/~renoo101/Prof/PDF/Jour/KERpaper-final.pdf
97. van der Gaag LC, Renooij S, Witteman CLM, Aleman BMP, Taal BG. How to elicit many probabilities. UAI 1999:647–654. arXiv:1301.6745
98. O'Hagan A, Buck CE, Daneshkhah A, et al. Uncertain Judgements: Eliciting Experts' Probabilities. Wiley; 2006. doi:10.1002/0470033312
99. O'Hagan A, Oakley J. SHELF: the Sheffield Elicitation Framework. https://shelf.sites.sheffield.ac.uk/
100. Pitchforth J, Mengersen K. A proposed validation framework for expert elicited Bayesian networks. Expert Syst Appl 2013;40(1):162–167. doi:10.1016/j.eswa.2012.07.026
101. European Commission. A guideline on summary of product characteristics (SmPC), Rev. 2, 2009. https://health.ec.europa.eu/system/files/2016-11/smpc_guideline_rev2_en_0.pdf
102. Human Phenotype Ontology. Frequency (HP:0040279) và các thuật ngữ con HP:0040280–HP:0040285. http://purl.obolibrary.org/obo/HP_0040279 (đọc qua EBI OLS4)

**E. Triage, giao thức, đánh giá, quy định**

103. NHS. How NHS 111 online works. https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-use-111/how-nhs-111-online-works/
104. NHS Digital. NHS Pathways is a Class 1 medical device. https://digital.nhs.uk/services/nhs-pathways/nhs-pathways-is-a-class-1-medical-device (đọc qua bản sao nhsd-proxy.openprescribing.net vì trang gốc trả 403)
105. Morse KE, Ostberg NP, Jones VG, Chan AS. Use characteristics and triage acuity of a digital symptom checker in a large integrated health system: population-based descriptive study. J Med Internet Res 2020;22(11):e20549. doi:10.2196/20549. https://pmc.ncbi.nlm.nih.gov/articles/PMC7717918/
106. Winn AN, Somai M, Fergestrom N, Crotty BH. Association of use of online symptom checkers with patients' plans for seeking care. JAMA Netw Open 2019;2(12):e1918561. https://pmc.ncbi.nlm.nih.gov/articles/PMC6991310/
107. WHO. Integrated Management of Childhood Illness: chart booklet. 2014. ISBN 978 92 4 150682 3. https://apo.who.int/publications/i/item/9789241506823 (trang trả 404 khi truy cập; nội dung [V2])
108. WHO. Paediatric emergency triage, assessment and treatment: care of critically-ill children. 2016. https://www.who.int/publications/i/item/9789241510219
109. Tamburlini G, Di Mario S, Maggi RS, Vilarim JN, Gove S. Evaluation of guidelines for emergency triage assessment and treatment in developing countries. Arch Dis Child 1999;81(6):478–482. doi:10.1136/adc.81.6.478
110. WHO. Triage tools (Interagency Integrated Triage Tool). https://www.who.int/tools/triage
111. Mitchell R, O'Reilly GM, Banks C, et al. Triage systems in low-resource emergency care settings. Bull World Health Organ 2025;103(3):204–212. doi:10.2471/BLT.23.290863. https://pmc.ncbi.nlm.nih.gov/articles/PMC11865852/
112. Emergency Medicine Society of South Africa. South African Triage Scale (giấy phép CC BY-NC-SA 3.0). https://emssa.org.za/?p=48
113. Find a Tender (UK). Manchester Triage System licence notice 030312-2025. https://www.find-tender.service.gov.uk/Notice/030312-2025 [V2]
114. TriageLogic. Frequently asked questions (Schmitt-Thompson licensing). https://triagelogic.com/frequently-asked-questions/ [V2]
115. Emergency Nurses Association. Emergency Severity Index Handbook, 5th ed. 2023 (trang bản quyền [V2]; không có URL đã kiểm)
116. NHS website. Terms and conditions (Open Government Licence v3.0). https://www.nhs.uk/our-policies/terms-and-conditions/
117. NICE. Use of our content internationally. https://www.nice.org.uk/reusing-our-content/use-of-our-content-internationally [V2]
118. NICE. NG143: Fever in under 5s: assessment and initial management. https://www.nice.org.uk/guidance/ng143 [V2]
119. NICE. NG253 (sepsis, ≥16 tuổi) và NG254 (sepsis, <16 tuổi), 19/11/2025. https://www.nice.org.uk/guidance/ng253 ; https://www.nice.org.uk/guidance/ng254 [V2]
120. WHO. Dengue: guidelines for diagnosis, treatment, prevention and control. New edition. Geneva: WHO; 2009 (dấu hiệu cảnh báo [V2]; URL chưa kiểm)
121. Bộ Y tế. Quyết định 2760/QĐ-BYT ngày 04/07/2023 ban hành Hướng dẫn chẩn đoán, điều trị sốt xuất huyết Dengue (thay QĐ 3705/QĐ-BYT ngày 22/08/2019). [V2; nguyên văn CHƯA XÁC MINH]
122. Bộ Y tế. Quyết định 292/QĐ-BYT (2024) về hướng dẫn chẩn đoán, điều trị bệnh tay chân miệng (thay QĐ 1003/QĐ-BYT năm 2012). [V2; ngày và nội dung CHƯA XÁC MINH]
123. Pauker SG, Kassirer JP. The threshold approach to clinical decision making. N Engl J Med 1980;302(20):1109–1117. doi:10.1056/NEJM198005153022003
124. Newgard CD, Fischer PE, Gestring M, et al. National guideline for the field triage of injured patients: recommendations of the National Expert Panel on Field Triage, 2021. J Trauma Acute Care Surg 2022;93(2):e49–e60. doi:10.1097/TA.0000000000003627. https://pmc.ncbi.nlm.nih.gov/articles/PMC9323557/
125. Painter A, Hayhoe B, Riboli-Sasco E, El-Osta A. Online symptom checkers: recommendations for a vignette-based clinical evaluation standard. J Med Internet Res 2022;24(10):e37408. doi:10.2196/37408. https://pmc.ncbi.nlm.nih.gov/articles/PMC9647454/
126. Kopka M, Feufel MA, Berner ES, Schmieding ML. How suitable are clinical vignettes for the evaluation of symptom checker apps? A test theoretical perspective. Digit Health 2023;9:20552076231194929. doi:10.1177/20552076231194929. https://pmc.ncbi.nlm.nih.gov/articles/PMC10444026/
127. Kopka M, Feufel MA. Software symptomcheckR: an R package for analyzing and visualizing symptom checker triage performance. BMC Digit Health 2024;2:43. doi:10.1186/s44247-024-00096-7. https://cran.r-project.org/web/packages/symptomcheckR/
128. El-Osta A, Webber I, Alaa A, et al. What is the suitability of clinical vignettes in benchmarking the performance of online symptom checkers? An audit study. BMJ Open 2022;12(4):e053566. doi:10.1136/bmjopen-2021-053566. https://pmc.ncbi.nlm.nih.gov/articles/PMC9047920/
129. Meczner A, et al. Controlling inputter variability in vignette studies assessing web-based symptom checkers: evaluation of current practice and recommendations for isolated accuracy metrics. JMIR Form Res 2024;8:e49907. doi:10.2196/49907. https://pmc.ncbi.nlm.nih.gov/articles/PMC11179013/
130. ITU/WHO Focus Group on AI for Health. Deliverables (DEL10.14, Topic Description Document "Symptom assessment"). https://www.itu.int/en/ITU-T/focusgroups/ai4h/Pages/deliverables.aspx ; https://handle.itu.int/11.1002/plink/7469210835
131. Vasey B, Nagendran M, Campbell B, et al. Reporting guideline for the early-stage clinical evaluation of decision support systems driven by artificial intelligence: DECIDE-AI. Nat Med 2022;28(5):924–933. doi:10.1038/s41591-022-01772-9
132. Collins GS, Moons KGM, Dhiman P, et al. TRIPOD+AI statement: updated guidance for reporting clinical prediction models that use regression or machine learning methods. BMJ 2024;385:e078378. doi:10.1136/bmj-2023-078378
133. Gallifant J, Afshar M, Ameen S, et al. The TRIPOD-LLM reporting guideline for studies using large language models. Nat Med 2025;31(1):60–69. doi:10.1038/s41591-024-03425-5
134. Bossuyt PM, Reitsma JB, Bruns DE, et al. STARD 2015: an updated list of essential items for reporting diagnostic accuracy studies. BMJ 2015;351:h5527. https://pmc.ncbi.nlm.nih.gov/articles/PMC4623764/
135. Liu X, Cruz Rivera S, Moher D, Calvert MJ, Denniston AK. Reporting guidelines for clinical trial reports for interventions involving artificial intelligence: the CONSORT-AI extension. Nat Med 2020;26. doi:10.1038/s41591-020-1034-x. Cruz Rivera S, Liu X, Chan AW, et al. Guidelines for clinical trial protocols for interventions involving artificial intelligence: the SPIRIT-AI extension. Nat Med 2020;26. doi:10.1038/s41591-020-1037-7
136. Liu V, Kaila M, Koskela T. Triage accuracy and the safety of user-initiated symptom assessment with an electronic symptom checker in a real-life setting: instrument validation study. JMIR Hum Factors 2024;11:e55099. doi:10.2196/55099. https://pmc.ncbi.nlm.nih.gov/articles/PMC11467609/
137. Miller S, Gilbert S, Virani V, Wicks P. Patients' utilization and perception of an artificial intelligence-based symptom assessment and advice technology in a British primary care waiting room: exploratory pilot study. JMIR Hum Factors 2020;7(3):e19713. doi:10.2196/19713
138. Regulation (EU) 2017/745 on medical devices (MDR), Annex VIII, Rule 11. Văn bản chưa đọc được (CHƯA XÁC MINH)
139. Chính phủ Việt Nam. Nghị định 98/2021/NĐ-CP về quản lý trang thiết bị y tế; Nghị định 07/2023/NĐ-CP sửa đổi; Thông tư 05/2022/TT-BYT. Số hiệu và nội dung CHƯA XÁC MINH (thuvienphapluat.vn trả 403)
