# Kế hoạch dự án doctor-v

> **Trạng thái:** đã được chủ dự án duyệt ngày 2026-10-24.
> Mọi thay đổi về sau được ghi trong `docs/decisions/` (quyết định kiến trúc) và `docs/worklog.md` (nhật ký công việc).
> Căn cứ: 5 báo cáo trong `docs/research/`.

---

## 1. Các quyết định đã chốt

| Vấn đề | Quyết định | Ảnh hưởng đến kế hoạch |
|---|---|---|
| Thẩm định y khoa | Tìm bác sĩ sau | Mọi nội dung có trích dẫn và nhãn "chưa thẩm định". App chỉ chạy nội bộ cho tới khi bác sĩ duyệt. Chuẩn bị sẵn bộ hồ sơ để bác sĩ duyệt nhanh. |
| Kết quả | Hiện kèm con số | Hiện "mức phù hợp khoảng X%", kèm các lớp bảo vệ (mục 3.3). |
| Phạm vi bản đầu | ~150 bệnh, có trẻ em | 35–40 triệu chứng chính; sau đó mở rộng theo đợt lên 300–500+ bệnh. |
| AI trong app | Không | Bộ suy luận xác suất cố định, chạy ngay trên máy người dùng. |
| Định hướng | Phi lợi nhuận vĩnh viễn | Được dùng thêm dữ liệu chỉ cho phép phi thương mại: GBD (IHME), dữ liệu WHO, bộ ca bệnh Semigran. |
| Thử với người thật | Không | Bù bằng kiểm thử tự động, đánh giá theo bộ tiêu chí và việc chủ dự án tự thử trên điện thoại (mục 8). |

## 2. Định vị và nguyên tắc

Chưa app nào "chẩn đoán" giỏi bằng bác sĩ. Tỷ lệ có bệnh đúng nằm trong 3 gợi ý đầu ("top 3") trên ca bệnh mẫu:

| | Top 3 đúng |
|---|---|
| Các symptom checker thông thường | 33–58% |
| App tốt nhất (Ada) | 63–70% |
| Bác sĩ | khoảng 84% |

"Chính xác nhất có thể" được cụ thể hóa thành 3 mục tiêu đo được:
1. Không bỏ sót ca cấp cứu.
2. Bệnh đúng nằm trong top 3 càng thường xuyên càng tốt.
3. Con số % trung thực (hiệu chuẩn): trong những ca app ghi 60%, khoảng 60% đúng là bệnh đó.

**Câu định vị:** doctor-v là công cụ thông tin sức khỏe, giúp bạn biết mức độ cần đi khám, nên khám khoa nào và các tình trạng có thể liên quan. Không khám bệnh, không chẩn đoán, không kê đơn.
- Nên dùng: "định hướng đi khám", "tình trạng có thể liên quan", "mức phù hợp".
- Tránh: "chẩn đoán", "bác sĩ AI", "khám online".

**6 nguyên tắc:**
1. **An toàn trước hết.** Dấu hiệu cấp cứu được hỏi đầu tiên; thà khuyên đi khám sớm còn hơn bỏ sót.
2. **Có nguồn.** Mỗi con số, mỗi quy tắc đều ghi nguồn và bậc bằng chứng.
3. **Minh bạch.** Luôn giải thích vì sao app gợi ý như vậy.
4. **Riêng tư.** Câu trả lời không rời khỏi máy. Không tài khoản, không theo dõi, không script hay font của bên thứ ba.
5. **Dễ hiểu.** Tiếng Việt phổ thông, câu ngắn, mỗi câu một ý.
6. **Nhất quán.** Cùng câu trả lời luôn cho cùng kết quả; mỗi lần sửa nội dung, toàn bộ bộ ca kiểm thử được chạy lại.

"doctor-v" chỉ là tên dự án. Tên kiểu "bác sĩ" làm tăng rủi ro bị hiểu là khám chữa bệnh, nên tên công khai sẽ chọn trước khi ra mắt.

## 3. Trải nghiệm người dùng

### 3.1 Luồng màn hình
1. **Trang chủ:** hai nút lớn "Bắt đầu kiểm tra" và "Tra cứu bệnh". Nút **Aa** (cỡ chữ) và **Gọi 115** nằm cùng vị trí trên mọi màn hình.
2. **Trước khi bắt đầu:** vài dòng cảnh báo ngắn, người dùng bấm "Tôi đã hiểu".
3. **Sàng lọc cấp cứu:** danh sách dấu hiệu nguy hiểm, kèm lựa chọn "Không có dấu hiệu nào". Chọn bất kỳ dấu hiệu nào → màn **Gọi 115** (chạy được cả khi không có mạng).
4. **Thông tin cơ bản:** kiểm tra cho ai (bản thân / người thân), tuổi, giới tính, có thai không (khi phù hợp), bệnh nền quan trọng, khu vực (không bắt buộc).
5. **Triệu chứng chính:** lưới biểu tượng theo nhóm, hoặc ô tìm kiếm hiểu chữ không dấu, từ đồng nghĩa, từ địa phương. Có hình cơ thể để chỉ vị trí đau.
6. **Câu hỏi:** mỗi màn hình một câu; nút "Cái này là gì?" và nút 🔊 Nghe.
   - Ba dạng trả lời: Có / Không / Không rõ; chọn một; chọn nhiều (có "Không có cái nào").
   - Tiến trình theo bước (không đếm câu); quay lại được mọi lúc.
   - Mục tiêu dưới 20 câu (3–5 phút); tối đa 30 câu.
7. **Xem lại câu trả lời** và sửa được trước khi xem kết quả.
8. **Kết quả** (mục 3.3).
9. **Tra cứu bệnh:** mỗi bệnh một trang tĩnh ngắn (là gì, dấu hiệu, khi nào đi cấp cứu, khám khoa nào, nguồn, ngày cập nhật, trạng thái thẩm định).
10. **Cài đặt:** cỡ chữ, chế độ tối, xóa dữ liệu, nguồn và giấy phép, điều khoản, quyền riêng tư.

Trẻ dưới 2 tháng tuổi: chỉ sàng lọc dấu hiệu nguy hiểm, luôn khuyên đi khám sớm, không xếp hạng bệnh. Trẻ từ 2 tháng đến 5 tuổi: hỏi trước các dấu hiệu nguy hiểm toàn thân theo IMCI của WHO.

### 3.2 Năm mức xử trí

| Mức | Hiển thị |
|---|---|
| 1 | 🚨 Gọi 115 ngay |
| 2 | Đến cơ sở cấp cứu ngay |
| 3 | Đi khám trong vòng 24 giờ |
| 4 | Đặt lịch khám trong vài ngày tới |
| 5 | Theo dõi tại nhà, kèm danh sách dấu hiệu cần đi khám |

Mỗi mức luôn có đủ biểu tượng, chữ và màu; màu không bao giờ là tín hiệu duy nhất.

### 3.3 Màn hình kết quả có con số
1. **Mức xử trí**, lý do, và danh sách "Đi cấp cứu ngay nếu…".
2. **Nên khám chuyên khoa nào.**
3. **3–5 tình trạng có thể liên quan:** tên dễ hiểu (kèm tên chính thức), thanh ngang + "khoảng 65%", nhãn "Cần loại trừ sớm" nếu là bệnh nguy hiểm, mục "Vì sao gợi ý". Dòng cuối: "Nguyên nhân khác chưa có trong hệ thống: khoảng 15%".
4. **Tự chăm sóc an toàn:** không nêu tên thuốc kê đơn, không nêu liều.
5. **Bản tóm tắt để đưa bác sĩ:** lưu ảnh, in, chia sẻ (chỉ khi người dùng tự bấm).

**Lớp bảo vệ cho con số:**
- Làm tròn đến 5%; dưới 5% ghi "dưới 5%"; không bao giờ hiện 0% hay 100%.
- Mức xử trí do quy tắc an toàn quyết định, không phụ thuộc bệnh đứng đầu. Bệnh nguy hiểm dù chỉ 3% vẫn có thể đẩy mức lên "đi cấp cứu" và vẫn được liệt kê với nhãn "Cần loại trừ sớm".
- Nút "Con số này nghĩa là gì?": *"Trong 100 người trả lời giống bạn, ước tính khoảng 65 người là do tình trạng này. Đây là ước tính, không phải kết luận."*
- Nhãn "chưa hiệu chuẩn" cho tới khi đạt chỉ tiêu hiệu chuẩn (mục 7).
- Công tắc cấu hình chuyển sang nhãn chữ ngay lập tức, nếu bác sĩ hoặc luật sư khuyên.

### 3.4 Thông số hiển thị cho người cao tuổi

| Thông số | Giá trị |
|---|---|
| Chữ nội dung / câu hỏi / nút trả lời | 18 / 24 / 20 px; không chữ nào dưới 16 px |
| Cỡ chữ người dùng chọn | 4 bước (×1 · ×1,25 · ×1,5 · ×1,75), nút "Đặt lại", ghi nhớ trên máy, tôn trọng cỡ chữ hệ điều hành |
| Khoảng cách dòng | 1,5–1,6; tiêu đề ≥ 1,4 |
| Độ tương phản chữ | ≥ 7:1 (AAA) |
| Vùng bấm | ≥ 48 px; nút trả lời rộng hết màn hình, cao ≥ 56 px |
| Font | Be Vietnam Pro, tự lưu trữ (~66 KB) |
| Bố cục | Không vỡ ở 320 px, ở cỡ chữ lớn nhất, khi phóng to 200%; máy tính: cột giữa ≤ ~70 ký tự/dòng |
| Thời gian | Không đồng hồ đếm ngược; không tự chuyển câu khi vừa chọn |

### 3.5 Bối cảnh thực tế ở Việt Nam
- Trình duyệt trong Zalo/Facebook thiếu tính năng (iOS: không service worker; Android: không giọng đọc, không nút chia sẻ). App phải chạy trọn vẹn khi thiếu chúng và gợi ý "Mở bằng trình duyệt".
- Hỗ trợ iOS 15 (~4,7% lưu lượng iOS ở Việt Nam) và Android cấu hình thấp.
- Giới hạn JavaScript: trang bệnh ≤ 15 KB, trang kiểm tra ≤ 80 KB.

## 4. Kiến trúc kỹ thuật

### 4.1 Công nghệ (phiên bản kiểm tra trên npm ngày 2026-10-24)

| Lớp | Lựa chọn | Lý do |
|---|---|---|
| Khung web | Astro 7.4 (trang tĩnh) | Trang bệnh không cần JavaScript |
| Tương tác | Preact 10.29 (~7 KB) | Nhẹ, hợp máy yếu |
| Ngôn ngữ | TypeScript 6.0.3 | TS 7 chưa được công cụ của Astro hỗ trợ |
| Giao diện | CSS thuần + design tokens | Chạy được trên iOS 15 |
| Offline | Service worker sinh bằng workbox-build 7.4 | Plugin PWA cho Astro chưa hỗ trợ Astro 7 |
| Tìm kiếm | MiniSearch 7.2 + bộ bỏ dấu tiếng Việt tự viết | Nhỏ; xử lý đúng chữ "đ" |
| Kiểm tra dữ liệu | Zod 4.6, yaml 2.9 | Kiểm tra cơ sở tri thức lúc build |
| Kiểm thử | Vitest 5, fast-check 4, Playwright 1.64, axe-core 4.14, Lighthouse CI | Logic, giao diện, khả năng tiếp cận, hiệu năng |
| Môi trường | Node 24, npm workspaces | Không cần cài thêm công cụ |

Không có máy chủ; không analytics; không cookie.

### 4.2 Cấu trúc thư mục
```
doctor-v/
├─ docs/            tài liệu (tiếng Việt): research, decisions, engine-spec, kb-guide, style-guide-vi, legal
├─ knowledge/       nguồn gốc mọi nội dung y khoa (YAML): sources, conditions, findings, complaints, rules, lexicon
├─ packages/kb/     schema, kiểm lỗi, biên dịch YAML → JSON
├─ packages/engine/ bộ suy luận (TypeScript thuần)
├─ apps/web/        ứng dụng web (Astro + Preact)
└─ evaluation/      ca kiểm thử (dev / holdout / external) và bộ chạy "bệnh nhân mô phỏng"
```
Tài liệu viết tiếng Việt; mã nguồn, tên biến, commit viết tiếng Anh.

## 5. Bộ suy luận
Suy luận Bayes: bắt đầu từ mức phổ biến của mỗi bệnh, cập nhật theo từng câu trả lời. Đặc tả đầy đủ: `docs/engine-spec.md`.

| Bộ phận | Cách làm |
|---|---|
| Giả thuyết | ~150 bệnh + "nguyên nhân khác" |
| Mức phổ biến ban đầu | Theo triệu chứng chính × nhóm tuổi × giới, thang 6 mức; hệ số mùa/vùng/phơi nhiễm/bệnh nền giới hạn 0,1–10 lần |
| Tần suất triệu chứng | 5 mức cố định 2,5 / 20 / 50 / 80 / 95%; "tỷ lệ nền" mỗi triệu chứng 1 / 5 / 20% |
| Chống đếm trùng | Gom cụm triệu chứng tương quan; hệ số nhiệt hiệu chỉnh trên ca kiểm thử |
| Không có 0%/100% | Chỉ loại trừ tuyệt đối khi bất khả về giải phẫu |
| "Không rõ" | Không đổi kết quả; với dấu hiệu nguy hiểm thì hỏi lại cách khác, vẫn không rõ thì coi như có thể có |
| Chọn câu hỏi | Ưu tiên câu có thể đổi mức xử trí, rồi đến câu phân biệt bệnh; có chi phí câu hỏi và điều kiện hỏi |
| Dừng hỏi | Hết dấu hiệu nguy hiểm bắt buộc + mức xử trí ổn định + (top 3 ≥ 80% hoặc hết câu hữu ích); tối đa 30 câu |
| Giải thích | Đóng góp của từng câu trả lời vào mỗi bệnh |
| Nhất quán | Không ngẫu nhiên; mã phiên bản dữ liệu in trên kết quả |

**Mức xử trí:** cộng dồn xác suất theo mức (cấp cứu 2%, bệnh không được bỏ sót 1%, 24 giờ 10%, khám hẹn 25%), cộng quy tắc cứng (dấu hiệu nguy hiểm, tổ hợp dấu hiệu, trẻ < 3 tháng sốt, người ≥ 75 tuổi dùng nửa ngưỡng, thai ≥ 20 tuần + đau đầu/nhìn mờ/phù, suy giảm miễn dịch + sốt). Không bao giờ khuyên "theo dõi tại nhà" khi "nguyên nhân khác" > 30% hoặc còn dấu hiệu nguy hiểm "không rõ".

## 6. Cơ sở tri thức
- **Chọn ~150 bệnh:** hay gặp ở tuyến cơ sở; bệnh "không được bỏ sót" của từng triệu chứng chính; bệnh đặc thù Việt Nam; nhóm trẻ em, thai sản, tâm thần (PHQ-9, GAD-7).
- **35–40 triệu chứng chính** theo nhóm: toàn thân, đầu–thần kinh, tai mũi họng–mắt, hô hấp–tim mạch, tiêu hóa, tiết niệu–sinh dục, cơ xương khớp, da, tinh thần, tai nạn, riêng trẻ nhỏ.
- **Mỗi bệnh gồm:** tên chính thức theo ICD-10 Việt Nam + tên thường gọi + tên tiếng Anh; mã ICD-10 và MONDO; nhóm tuổi/giới áp dụng; mức phổ biến; mức xử trí; cờ "không được bỏ sót"; chuyên khoa; triệu chứng kèm tần suất, nguồn, bậc bằng chứng; dấu hiệu nguy hiểm; mô tả ≤ 3 câu; tự chăm sóc; khi nào đi khám; trạng thái thẩm định.
- **Bậc bằng chứng:** A (tổng quan hệ thống) · B (nghiên cứu gốc tốt, hướng dẫn chính thức, dịch tễ chính thức) · C (sách, cơ sở dữ liệu tần suất) · D (đồng thuận chuyên gia) · E (dữ liệu tổng hợp — không bao giờ đưa vào app).
- **Quy trình mỗi đợt:** agent A trích xuất → agent B trích xuất độc lập → agent C đối chiếu → kiểm lỗi tự động → ≥ 3 ca kiểm thử/bệnh → chạy kiểm định → nhãn "chưa thẩm định" cho tới khi bác sĩ duyệt.
- **Chi phí:** sau đợt thử nghiệm, đo chi phí thực tế mỗi bệnh và báo chủ dự án trước khi làm hàng loạt.
- **Quy tắc viết:** `docs/style-guide-vi.md`.

## 7. Kiểm định độ chính xác và an toàn
- **Bộ ca:** phát triển (~450), giữ kín (≥ 300, trong đó ≥ 150 cấp cứu; do agent riêng viết, không xem cơ sở tri thức), đã công bố (Semigran 45, Levine 48, một phần DDXPlus).
- **Bệnh nhân mô phỏng** trả lời theo dữ kiện ca; có biến thể nhiễu 10–20% "Không rõ".

| Chỉ số (bộ giữ kín) | Chỉ tiêu |
|---|---|
| Đứng đầu / top 3 / top 10 | ≥ 45% / ≥ 65% / ≥ 85% |
| Mức xử trí an toàn | ≥ 97% |
| Bỏ sót ca cấp cứu | ≤ 5% |
| Khuyên đi khám quá mức cần | ≤ 35% |
| Ca tự chăm sóc nhận đúng | ≥ 50% |
| Sai lệch hiệu chuẩn (ECE) | ≤ 0,10 |
| Số câu hỏi trung vị | ≤ 20 |

- **Cổng tự động:** chặn thay đổi làm top 3 giảm > 2 điểm hoặc thêm ca cấp cứu bị bỏ sót; kiểm thử thuộc tính.
- **Giới hạn:** bệnh nhân mô phỏng trả lời "hoàn hảo" nên độ chính xác thực tế sẽ thấp hơn; đo thật cần thử song song ở phòng khám khi có đối tác.

## 8. Bù cho việc không thử với người thật
Đánh giá theo tiêu chí Nielsen và hướng dẫn W3C cho người cao tuổi; đi lại từng thao tác như người dùng mới; kiểm thử tự động WCAG 2.2 AA (tương phản AAA); chụp ảnh giao diện 320/375/414 px × 4 cỡ chữ + phóng to 200%; giả lập máy yếu, mạng chậm; "nhân vật mô phỏng" rà câu chữ; chủ dự án tự thử qua link Zalo ở mỗi mốc.

## 9. Pháp lý và minh bạch
- Dùng câu định vị và mẫu cảnh báo trong báo cáo pháp lý. Không tên thuốc kê đơn, không liều, không quảng cáo.
- Chỉ hiện số điện thoại đã xác minh (115; 111 khi liên quan bảo vệ trẻ em).
- Trang "Nguồn dữ liệu và giấy phép", nhật ký thay đổi nội dung, email báo lỗi an toàn.
- CSP chặn tài nguyên ngoài; không đưa dữ liệu vào URL; chỉ lưu tiến trình khi người dùng đồng ý; nút "Xóa dữ liệu".
- **Trước khi công khai:** bác sĩ duyệt; luật sư rà soát (kể cả quan điểm "thiết bị y tế"); chọn tên công khai; có người/tổ chức đứng tên chịu trách nhiệm.

## 10. Lộ trình

| Giai đoạn | Bàn giao | Mốc duyệt |
|---|---|---|
| 0. Nền móng | Repo, công cụ build/test, tài liệu nền (đặc tả, hướng dẫn soạn, quy tắc tiếng Việt, quyết định, bản nháp pháp lý) | Xem tài liệu |
| 1. Bộ suy luận + thử nghiệm | Bộ suy luận có kiểm thử; dữ liệu thử nghiệm (sốt, đau bụng, đau đầu; ~25–30 bệnh; người lớn + trẻ em); báo cáo chỉ số đầu; chi phí mỗi bệnh | Xem báo cáo, chạy thử dòng lệnh |
| 2. Giao diện bản đầu | Toàn bộ luồng mục 3 trên dữ liệu thử nghiệm | Thử trên điện thoại |
| 3. Mở rộng ~150 bệnh | 8–10 đợt theo nhóm triệu chứng | Duyệt danh sách bệnh; báo cáo định kỳ |
| 4. Hoàn thiện trải nghiệm | Tra cứu bệnh, hình cơ thể, nút Nghe, tóm tắt chia sẻ/in, offline, Zalo, chế độ tối | Thử trên điện thoại |
| 5. Kiểm định tổng | Chấm điểm, hiệu chuẩn, báo cáo độ chính xác, hồ sơ cho bác sĩ | Duyệt báo cáo |
| 6. Thẩm định và ra mắt | Bác sĩ duyệt; rà soát pháp lý; chọn tên; hosting | Quyết định ra mắt |
| Sau đó | 300–500+ bệnh; mô hình nhiều bệnh cùng lúc; AI tùy chọn (khi đã chuẩn bị pháp lý) | — |

## 11. Rủi ro chính

| Rủi ro | Cách giảm |
|---|---|
| Bỏ sót cấp cứu | Hỏi dấu hiệu nguy hiểm đầu tiên; quy tắc cứng; ngưỡng thấp; cổng chặn |
| Sai sót nội dung khi chưa có bác sĩ | Bắt buộc trích dẫn; 2 lần trích xuất độc lập + đối chiếu; nhãn "chưa thẩm định"; không công khai trước khi bác sĩ duyệt |
| Bệnh chưa có trong hệ thống | Giả thuyết "nguyên nhân khác"; không khuyên tự theo dõi khi không chắc |
| Con số % quá tự tin | Hệ số nhiệt, gom cụm; chỉ tiêu hiệu chuẩn; làm tròn; công tắc dự phòng |
| Người dùng hiểu sai câu hỏi | Quy tắc tiếng Việt; "Cái này là gì?"; kiểm tra ở mục 8 |
| Hướng dẫn Bộ Y tế thay đổi | Sổ đăng ký nguồn; kiểm tra hằng tháng |
| Pháp lý | Xử lý trên máy; câu định vị nhất quán; luật sư trước khi công khai |

## 12. Việc còn phải xác minh
Thông tư 06/2026/TT-BYT (tên, ngày); đường dây chống độc và hỗ trợ tâm lý; phạm vi Điều 3.8(a) Nghị định 98/2021; văn bản IMCI Việt Nam; niên giám thống kê y tế mới nhất; giấy phép HPO và StatPearls; bản tiếng Việt đã kiểm định của GAD-7.
