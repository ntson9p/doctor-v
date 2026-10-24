# Báo cáo Giai đoạn 1: bộ suy luận và dữ liệu thử nghiệm

> Người đọc: chủ dự án. Ngày: 25/10/2026. Mọi nội dung y khoa **chưa được bác sĩ thẩm định**.

## Tóm tắt

- **Đã có:** bộ suy luận chạy trên máy người dùng, không cần mạng, cùng dữ liệu thử nghiệm cho 3 triệu chứng chính (sốt, đau bụng, đau đầu). Dữ liệu gồm 33 bệnh, cả trẻ em và người lớn, mọi con số đều có trích dẫn nguồn.
- **Độ chính xác chẩn đoán đạt chỉ tiêu.** Trên bộ ca giữ kín do agent độc lập viết: bệnh đúng đứng đầu 75,9%, nằm trong 3 bệnh đầu 88,6% (chỉ tiêu 45% và 65%).
- **Lần chấm đầu không đạt chỉ tiêu an toàn:** 8/47 ca cấp cứu bị xếp thấp hơn mức cần. Cả 8 ca cần "gọi 115" nhưng app khuyên "đến cấp cứu ngay"; không ca nào bị khuyên ở nhà hay khám muộn. Đã tìm ra và sửa 2 nguyên nhân có tính hệ thống (mục 5).
- **Lần chấm thứ hai** (106 ca, gồm 20 ca mới): bỏ sót cấp cứu còn 1/50 (2%), đạt chỉ tiêu ≤ 5%. Mức xử trí an toàn chung đạt 94,3%, **chưa đạt** chỉ tiêu 97%: còn 6 ca bị xếp thấp, 5 trong số đó là ca không cấp cứu có triệu chứng kéo dài (mục 5.2).
- **Lần chấm thứ ba** (112 ca, sau vòng sửa thứ hai, gồm 12 ca mới): **đạt mọi chỉ tiêu an toàn**. An toàn 99,1% (≥ 97%), bỏ sót cấp cứu 0/54. Khi có nhiễu: an toàn 97,3%, bỏ sót 3%. Còn 1 ca bị xếp thấp: giai đoạn khởi phát của sởi (mục 5.3).
- **Chi phí soạn dữ liệu:** khoảng 270 nghìn token và 20 phút chạy agent cho mỗi bệnh. 150 bệnh cần khoảng 50 triệu token.
- **Cần bác sĩ quyết định** một số ngưỡng an toàn (mục 8) trước khi mở rộng.

## 1. Đã làm gì

| Phần | Nội dung |
|---|---|
| Bộ suy luận | Suy luận xác suất kiểu Bayes, mỗi lần một bệnh, có giả thuyết "nguyên nhân khác"; quy tắc dấu hiệu nguy hiểm; chọn câu hỏi theo giá trị thông tin; tất định (cùng câu trả lời luôn cho cùng kết quả). Đặc tả: `docs/engine-spec.md` |
| Dữ liệu | 33 bệnh, 141 dấu hiệu, 10 nhóm câu hỏi, 69 quy tắc (8 quy tắc "gọi 115", 40 quy tắc "đến cấp cứu ngay"), 241 nguồn |
| Công cụ | Kiểm lỗi dữ liệu tự động, bệnh nhân mô phỏng, báo cáo kiểm định, chạy thử dòng lệnh |
| Kiểm thử | 56 kiểm thử tự động cho bộ suy luận và dữ liệu; 107 ca dev; bộ ca giữ kín |

Các bệnh, theo mức xử trí khi mắc:

| Mức | Bệnh |
|---|---|
| 1 (gọi 115) | nhồi máu cơ tim, đột quỵ, xuất huyết dưới nhện, nhiễm khuẩn huyết |
| 2 (đến cấp cứu ngay) | viêm màng não mủ, viêm ruột thừa, viêm tụy cấp, tắc ruột, lồng ruột, chửa ngoài tử cung, tiền sản giật, viêm túi mật cấp |
| 3 (khám trong 24 giờ) | sốt xuất huyết, sốt rét, sốt mò, thương hàn, viêm phổi, viêm thận – bể thận, sỏi thận, tay chân miệng, sởi, viêm vùng chậu |
| 4–5 (khám trong vài ngày / theo dõi tại nhà) | cảm lạnh, cúm, COVID-19, viêm xoang, viêm tai giữa, viêm dạ dày – ruột, đau dạ dày, viêm bàng quang, đau nửa đầu, đau đầu do căng thẳng, đau bụng kinh |

## 2. Dữ liệu và nguồn

- **Nguồn:** 241 nguồn, 240 đã được mở ra đối chiếu. Nguồn duy nhất chưa xác minh là NICE NG51, đã bị thay thế.
  - Theo loại: 104 nghiên cứu gốc, 42 tổng quan hệ thống, 24 hướng dẫn quốc tế, 14 hướng dẫn của Bộ Y tế, 32 trang thông tin chính thức (NHS, CDC…), 21 tài liệu tham khảo.
  - Theo giấy phép: phần lớn chỉ dùng dữ kiện kèm trích dẫn, không sao chép câu chữ.
- **Bằng chứng cho 582 liên kết bệnh – dấu hiệu:**
  - theo bậc: A (tổng quan hệ thống, nghiên cứu lớn) 10%, B 68%, C 22%;
  - theo cách lấy số: 40% từ số liệu công bố, 21% từ mô tả bằng lời trong hướng dẫn, 38% là ước lượng có căn cứ. Phần ước lượng cần bác sĩ duyệt.
- **Quy trình soạn mỗi bệnh:**
  - hai agent soạn độc lập (lượt A, lượt B);
  - agent thứ ba đối chiếu từng điểm khác nhau với nguồn gốc (lượt C) và viết 3 ca kiểm thử;
  - kiểm lỗi tự động.

  Mức đồng thuận giữa hai lượt soạn độc lập: kappa có trọng số 0,90 trên 331 cặp liên kết (≥ 0,8 là rất tốt). Lượt C đã bắt được một trích dẫn sai trong lượt A: một tỷ lệ không có trong bài báo được dẫn.
- **Quy tắc dấu hiệu nguy hiểm:** một agent riêng (lượt R) đối chiếu từng quy tắc với văn bản gốc. Người bảo trì bổ sung theo đề xuất của các lượt soạn và kết quả kiểm định.

## 3. Cách đo

- **Bệnh nhân mô phỏng:** máy chạy trọn phiên hỏi đáp và trả lời theo dữ kiện của ca. Người thật trả lời kém chính xác hơn, nên kết quả ngoài đời sẽ thấp hơn.
- **Biến thể nhiễu:** 15% câu trả lời bị đổi thành "Không rõ", chạy với 5 hạt giống ngẫu nhiên cố định.
- **Ba bộ ca:**
  - dev: do người soạn dữ liệu viết, dùng để sửa dữ liệu;
  - giữ kín: do agent độc lập viết, không được xem dữ liệu bệnh, chỉ dùng để chấm;
  - external: các bộ ca đã công bố, chưa làm.
- **Chỉ số:**
  - top-1 / top-3: bệnh đúng đứng đầu / nằm trong 3 bệnh đầu của danh sách người dùng thấy;
  - an toàn: mức khuyên khẩn bằng hoặc hơn mức cần;
  - bỏ sót cấp cứu: ca cần mức 1–2 mà bị khuyên thấp hơn;
  - ECE: độ lệch giữa con số % hiển thị và tỷ lệ đúng thật.

## 4. Kết quả

### 4.1 Bộ ca giữ kín, lần chấm đầu (94 ca)

| | Top-1 | Top-3 | Top-10 | An toàn | Bỏ sót cấp cứu | Khuyên quá mức | ECE | Số câu hỏi (trung vị) |
|---|---|---|---|---|---|---|---|---|
| Chỉ tiêu | ≥ 45% | ≥ 65% | ≥ 85% | ≥ 97% | ≤ 5% | ≤ 35% | ≤ 0,10 | ≤ 20 |
| Trả lời đúng ca | 75,9% | 88,6% | 93,7% | **88,3%** ✗ | **8/47** ✗ | 10,6% | 0,085 | 11,5 |
| 15% "Không rõ" | 72,9% | 86,3% | 92,9% | 85,5% | 54/235 | 16,6% | 0,050 | 14 |

Báo cáo chi tiết: `evaluation/reports/2026-10-24-holdout-7ab307c94b37.md`.

### 4.2 Bộ ca giữ kín, lần chấm thứ hai (106 ca: 86 ca cũ + 20 ca mới)

| | Top-1 | Top-3 | Top-10 | An toàn | Bỏ sót cấp cứu | Khuyên quá mức | Tự chăm sóc nhận đúng | ECE | Số câu hỏi (trung vị) |
|---|---|---|---|---|---|---|---|---|---|
| Chỉ tiêu | ≥ 45% | ≥ 65% | ≥ 85% | ≥ 97% | ≤ 5% | ≤ 35% | ≥ 50% | ≤ 0,10 | ≤ 20 |
| Trả lời đúng ca | 74,4% | 88,9% | 93,3% | **94,3%** ✗ | 1/50 (2%) ✓ | 12,3% | 80% | 0,095 | 12,5 |
| 15% "Không rõ" | 74,0% | 88,0% | 93,8% | 94,3% | 10/250 (4%) ✓ | 19,1% | 52% | 0,060 | 14 |

Theo triệu chứng chính (trả lời đúng ca): đau bụng 32/35 ca có bệnh đúng trong top 3, an toàn 40/42; sốt 31/38 và 41/43; đau đầu 17/17 và 19/21. Báo cáo chi tiết: `evaluation/reports/2026-10-25-holdout-961e389d3c45.md`.

### 4.3 Bộ ca giữ kín, lần chấm thứ ba (112 ca: 80 ca gốc + 32 ca viết thêm)

| | Top-1 | Top-3 | Top-10 | An toàn | Bỏ sót cấp cứu | Khuyên quá mức | Tự chăm sóc nhận đúng | ECE | Số câu hỏi (trung vị) |
|---|---|---|---|---|---|---|---|---|---|
| Chỉ tiêu | ≥ 45% | ≥ 65% | ≥ 85% | ≥ 97% | ≤ 5% | ≤ 35% | ≥ 50% | ≤ 0,10 | ≤ 20 |
| Trả lời đúng ca | 74,7% | 89,5% | 92,6% | **99,1%** ✓ | **0/54** ✓ | 12,5% | 81% | 0,078 | 11 |
| 15% "Không rõ" | 76,0% | 88,0% | 92,2% | 97,3% ✓ | 8/270 (3%) ✓ | 18,2% | 60% | 0,055 | 14 |

Theo triệu chứng chính (trả lời đúng ca): đau bụng 35/38 ca có bệnh đúng trong top 3, an toàn 44/44; sốt 31/38 và 44/45; đau đầu 19/19 và 23/23. Báo cáo chi tiết: `evaluation/reports/2026-10-25-holdout-7f751b806e58.md`.

### 4.4 Bộ dev (107 ca, trước vòng sửa thứ hai)

| | Top-1 | Top-3 | An toàn | Bỏ sót cấp cứu | Khuyên quá mức |
|---|---|---|---|---|---|
| Trả lời đúng ca | 76,2% | 95,2% | 100% | 0/46 | 7,5% |
| 15% "Không rõ" (5 hạt giống) | 72,8% | 91,8% | 98,9% | 3/230 (1,3%) | 18,1% |

Bộ dev được dùng để sửa dữ liệu, nên số liệu của nó luôn đẹp hơn thực tế. Lần chấm đầu đã cho thấy rõ điều này: dev không bỏ sót ca cấp cứu nào, trong khi bộ giữ kín bỏ sót 8 ca.

## 5. An toàn: các ca bị xếp thấp và cách sửa

### 5.1 Lần chấm đầu

Ở lần chấm đầu, 8 ca cấp cứu bị xếp thấp. Cả 8 đều cần mức 1 (gọi 115 hoặc nhờ người đưa đi, không tự đi), nhưng app khuyên mức 2 (tự đến cấp cứu ngay). Hai nguyên nhân:

1. **Dừng quá sớm.** App dừng ngay khi thấy một dấu hiệu "đến cấp cứu", nên không kịp hỏi dấu hiệu thứ hai có thể nâng lên "gọi 115". Ví dụ: tay chân lạnh, sau đó mới tới ban xuất huyết.
   - **Đã sửa:** ở mức 2, app hỏi thêm vài câu có thể nâng lên mức 1 rồi mới dừng.
2. **Thiếu quy tắc "gọi 115"** cho các tổ hợp kinh điển. Đã thêm, có nguồn:
   - lú lẫn hoặc li bì (NHS khuyên gọi 999; người bệnh không tự đến viện an toàn được);
   - dấu hiệu sốc: tay chân lạnh, da tái kèm mệt lả, tiểu ít hoặc ngất (Quyết định 2760/QĐ-BYT);
   - nghi chửa ngoài tử cung vỡ (NHS).

Theo quy tắc giữ kín, 8 ca đã dùng để sửa được chuyển sang bộ dev. Một agent độc lập đã viết 20 ca mới cho bộ giữ kín (8 ca thay thế, 12 ca bổ sung).

Trong quá trình làm, các lỗi sau cũng được phát hiện và sửa:
- app hỏi những câu không liên quan (người sốt bị hỏi về khối thoát vị);
- một quy tắc đúng cả khi câu hỏi chưa được hỏi;
- danh sách "Bác sĩ cần loại trừ" thiếu bệnh.

Chi tiết: `docs/worklog.md`.

### 5.2 Lần chấm thứ hai: 6 ca còn bị xếp thấp

| Ca | Mức cần → app ra | Vì sao |
|---|---|---|
| Trẻ 4 tuổi viêm ruột thừa, có tiêu chảy, chọn triệu chứng chính là sốt | 2 → **5** | Bẫy kinh điển: tiêu chảy làm nghiêng hẳn về viêm dạ dày – ruột (99%). App không hỏi "đau tăng khi đi lại", dấu hiệu kích thích phúc mạc. **Đây là lỗi nghiêm trọng nhất còn lại.** |
| Trẻ 8 tuổi sốt 6 ngày, đau quanh rốn, tiêu chảy (thương hàn) | 3 → 5 | Chưa có quy tắc "sốt kéo dài từ 5 ngày ở trẻ em thì đi khám" (NICE NG143) |
| Trẻ 9 tuổi sổ mũi đặc 12 ngày (viêm xoang) | 4 → 5 | Chưa có quy tắc theo thời gian kéo dài |
| Đau đầu gần như hằng ngày 2 và 4 tháng (2 ca) | 4 → 5 | Chưa có quy tắc "đau đầu mạn tính, dùng thuốc giảm đau nhiều thì đi khám" |
| Đau bụng kinh nặng dần, đau khi quan hệ (nghi lạc nội mạc tử cung, ngoài hệ thống) | 4 → 5 | Chưa có quy tắc cho đau bụng kinh có dấu hiệu bất thường |

Năm trong sáu ca có chung một nguyên nhân: thiếu các quy tắc "triệu chứng kéo dài hoặc nặng dần thì đi khám", vốn có trong mọi bộ quy trình phân loại. Việc bổ sung các quy tắc này, cùng dấu hiệu kích thích phúc mạc, sẽ làm theo quy tắc giữ kín: chuyển các ca đã dùng sang dev, viết ca thay thế, và chấm lại ở mốc sau.

**Đã làm (vòng sửa thứ hai):**
- quy tắc sốt từ 6 ngày, sổ mũi hơn 10 ngày, đau đầu nhiều lần mỗi tuần, đau bụng kinh kèm đau khi quan hệ;
- dấu hiệu kích thích phúc mạc: đau tăng khi đi lại hoặc ho, kèm sốt hoặc nôn (trẻ dưới 5 tuổi: đi cấp cứu);
- nhóm câu hỏi dấu hiệu nguy hiểm toàn thân hỏi một lần ở đầu phiên.

5/6 ca đạt đúng mức sau khi sửa. Ca còn sai là đau bụng kinh thứ phát: thiếu câu hỏi về đau nặng dần qua nhiều năm và khó có thai.

### 5.3 Lần chấm thứ ba: 1 ca còn bị xếp thấp

Ca khởi phát sởi: thiếu niên sốt 4 ngày, ho, mắt đỏ, chưa nổi ban, bạn cùng lớp bị sởi. Cần khám trong 24 giờ, app khuyên theo dõi tại nhà.

Nguyên nhân là giới hạn của mô hình: sởi gắn với dấu hiệu "phát ban: gần như luôn có", nên chưa có ban thì sởi bị loại. Mô hình chưa biết ban chỉ mọc sau vài ngày sốt.

Hướng sửa:
- quy tắc "sốt kèm tiếp xúc người bị sởi thì đi khám";
- về lâu dài, cho tần suất dấu hiệu thay đổi theo số ngày bệnh.

Chưa sửa: làm theo quy tắc giữ kín ở vòng sau.
## 6. Chi phí

Token do các agent dùng, gồm cả phần đọc lại ngữ cảnh. Chi phí tiền thực tế phụ thuộc giá và tỷ lệ dùng bộ nhớ đệm.

| Việc | Token | Thời gian chạy agent |
|---|---|---|
| Lượt A (soạn lần 1) | khoảng 79 nghìn/bệnh | khoảng 7 phút/bệnh |
| Lượt B (soạn lần 2, độc lập) | khoảng 91 nghìn/bệnh | khoảng 4–5 phút/bệnh |
| Lượt C (đối chiếu + 3 ca dev) | khoảng 104 nghìn/bệnh | khoảng 9 phút/bệnh |
| **Cộng mỗi bệnh** | **khoảng 270 nghìn** | **khoảng 20 phút** |
| Một lần cho cả giai đoạn | nghiên cứu ban đầu 2,0 triệu; rà soát quy tắc 0,64 triệu; bộ ca giữ kín 0,42 triệu | |

Số liệu lượt A lấy từ 3 lô, lượt B từ 2 lô; các lô còn lại bị gián đoạn vì giới hạn sử dụng nên không đo được. Chưa tính phần việc của người bảo trì (agent chính).

**Ước tính cho 150 bệnh:** khoảng 41 triệu token cho ba lượt soạn, cộng khoảng 20% cho quy tắc, nguồn và ca kiểm thử, tổng khoảng 50 triệu token. Chạy 3 agent song song thì mất khoảng 17 giờ.

## 7. Hạn chế đã biết

- **Chưa thử với người thật.** Người bệnh mô phỏng trả lời rất chuẩn, nên độ chính xác ngoài đời sẽ thấp hơn.
- **Bộ ca giữ kín còn nhỏ:** 112 ca, trong khi chỉ tiêu cuối là từ 300 ca, trong đó từ 150 ca cấp cứu.
- **Mỗi lần chỉ xét một bệnh:** chưa xử lý người mắc nhiều bệnh cùng lúc (người già đa bệnh).
- **Đau bụng:** 33 bệnh thí điểm mới bao phủ một phần nguyên nhân đau bụng (chưa có đau bụng không đặc hiệu, táo bón, hội chứng ruột kích thích…). Vì vậy con số % của các bệnh đau bụng có thể cao hơn thực tế.
- **Sốt rét ở người từ nước ngoài về:** câu phơi nhiễm đang gộp "đi rừng trong nước" (nguy cơ thấp) với "từ châu Phi về" (nguy cơ cao). Mức xử trí vẫn đúng (khuyên xét nghiệm trong ngày), nhưng sốt rét chưa lên đầu danh sách.
- **Nhồi máu cơ tim không điển hình** (đau thượng vị, không đè ép ngực) đôi khi được khuyên "đến cấp cứu" thay vì "gọi 115", khi câu trả lời then chốt bị "Không rõ".

## 8. Việc cần bác sĩ quyết định

1. **Ngưỡng 1% cho bệnh "không được bỏ sót".** Ngưỡng này hợp với bệnh diễn tiến trong vài giờ (nhiễm khuẩn huyết, viêm màng não). Với viêm ruột thừa, nó làm người viêm dạ dày – ruột có sốt và đau quanh rốn bị khuyên đi cấp cứu (viêm ruột thừa còn khoảng 2%). Có nên dùng ngưỡng riêng cho bệnh ngoại khoa có "cửa sổ" 1–2 ngày?
2. **Mức 1 hay mức 2** cho từng dấu hiệu nguy hiểm đơn lẻ. NHS gộp "gọi 999 hoặc đến cấp cứu"; app tách thành hai mức.
3. **Khoảng 38% liên kết là ước lượng có căn cứ**, đều được đánh dấu chờ duyệt.
4. Các quy tắc chỉ có nguồn bậc C (5 quy tắc, bộ kiểm tra đã cảnh báo).

## 9. Chạy thử dòng lệnh

```
cd D:\Code\doctor-v
npm run play
```

Trả lời bằng cách nhập số. Có thể quay lại (b) hoặc dừng xem kết quả (q). Kết quả gồm mức xử trí, lý do, các dấu hiệu cần đi cấp cứu ngay, và các bệnh có thể liên quan kèm con số % (chưa hiệu chuẩn).

## 10. Bước tiếp theo

Giai đoạn 2: giao diện bản đầu trên điện thoại, chạy toàn bộ luồng hỏi đáp trên dữ liệu thử nghiệm. Mốc duyệt: thử trên điện thoại.
