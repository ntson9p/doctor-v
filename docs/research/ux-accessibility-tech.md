# doctor-v: UX, khả năng tiếp cận, bối cảnh Việt Nam và tech stack

- **Ngày:** 2026-10-24
- **Phạm vi:** 6 mục trong brief: UX cho người cao tuổi và người ít quen chữ, mẫu UX của symptom checker, truyền đạt rủi ro, typography và giọng đọc tiếng Việt, bối cảnh Việt Nam, tech stack.
- **Phương pháp:** Ưu tiên nguồn sơ cấp: W3C, NN/g, tài liệu chính thức, release notes, npm registry, StatCounter, DataReportal. Một số số liệu được **đo trực tiếp ngày 2026-10-24**: kích thước woff2, metric glyph tiếng Việt, kích thước bundle, phiên bản npm, peerDependencies.
- **Lưu ý nguồn W3C:** w3.org trả HTTP 403 với truy cập tự động. Vì vậy văn bản WCAG và WAI được đọc từ kho nguồn chính thức của W3C trên GitHub.
- **Giới hạn:** Hạn mức WebSearch của phiên đã hết giữa chừng. Mục nào không kiểm chứng được được đánh dấu **CHƯA XÁC MINH**. Mục nào chỉ có qua tóm tắt kết quả tìm kiếm được ghi rõ "(qua kết quả tìm kiếm)".

---

## 1. Tóm tắt

1. **Người cao tuổi**
   - Theo NN/g (3 vòng nghiên cứu, 123 người từ 65 tuổi trở lên), người cao tuổi mắc lỗi nhiều hơn. Họ vướng nhất ở: chữ nhỏ, chữ nhạt màu, target nhỏ, form khắt khe và thông báo lỗi khó thấy [3].
   - W3C WAI kết luận WCAG đã bao phủ phần lớn nhu cầu của người cao tuổi [1].
   - Hệ quả cho doctor-v:
     - Chữ body 18 px, line-height ≥ 1,5.
     - Tương phản chữ ≥ 7:1.
     - Vùng chạm ≥ 48 px; nút trả lời full-width cao ≥ 56 px.
     - Mỗi màn hình chỉ một câu hỏi.
     - Không giới hạn thời gian và không tự chuyển câu.
2. **Cỡ chữ theo hệ điều hành**
   - Chrome/Edge 146 (stable 2026-03-10) có `<meta name="text-scale" content="scale">`. Thẻ này cho `rem` scale theo cỡ chữ của OS [11][12].
   - Safari và Firefox chưa hỗ trợ thẻ này [13]. iOS chỉ theo Dynamic Type khi dùng `-apple-system-body` [17].
   - Khoảng 1/5 đến 1/3 người dùng mobile đã đổi cỡ chữ hệ thống (Appt, dữ liệu Hà Lan) [15][19].
   - Hệ quả cho doctor-v:
     - Không đặt px ở `:root`.
     - Có điều khiển cỡ chữ trong app, 4 bước (100/125/150/175%).
     - Lưu lựa chọn bằng `localStorage` có try/catch. Android WebView mặc định **tắt** DOM storage [62].
3. **Mẫu symptom checker**
   - Các sản phẩm dẫn đầu dùng chung một khuôn: mỗi lượt một câu hỏi, có lựa chọn "Có / Không / Không biết" [22][27].
   - Infermedica có thêm câu hỏi nhóm chọn một và nhóm chọn nhiều [22].
   - Tiến trình hiển thị theo **giai đoạn** ("3/5 Symptoms"); kết quả **đưa mức xử trí lên trước**, danh sách bệnh sau [24].
   - Ada dừng ngay khi gặp dấu hiệu cấp cứu ("roadblock") [25].
   - Độ dài thực tế:
     - Ada khoảng 29 câu [30], median 7 phút [31].
     - NHS 111 online: median 82 giây mỗi lượt triage, 5,5% bỏ dở (2024/25) [29].
4. **Truyền đạt rủi ro**
   - Nhãn bằng lời làm người đọc ước lượng quá cao. Với cùng một nguy cơ, nhãn "common" cho ước lượng trung bình 34,2%, còn số "2,5%" cho 8,1% [38].
   - Natural frequency và icon array giúp người kém toán hiểu tốt hơn [34][36][37].
   - Engine của doctor-v chưa được hiệu chuẩn, nên khuyến nghị:
     - **Không hiển thị %.**
     - Dùng nhãn mức độ phù hợp tương đối, liệt kê tối đa 3–5 bệnh, có mục "Vì sao gợi ý".
     - Chỉ dùng "x trên 10 người" khi đã hiệu chuẩn và kiểm định.
5. **Font chữ**
   - Cả 5 font khảo sát đều là OFL 1.1 và hỗ trợ tiếng Việt.
   - Đo trực tiếp: dấu chồng trên chữ hoa cao 0,99–1,15 em; tổng chiều cao phần mực 1,23–1,37 em.
   - Vì vậy: body line-height ≥ 1,5; tiêu đề ≥ 1,3 (≥ 1,4 với Be Vietnam Pro); không viết hoa toàn bộ.
   - Khuyến nghị Be Vietnam Pro 400/600 tự host (khoảng 66 KiB cho subset latin + vietnamese), hoặc system font nếu ưu tiên tốc độ.
6. **Đọc thành tiếng (TTS)**
   - Android WebView **không có** `speechSynthesis` [48]. Đây nhiều khả năng là môi trường trình duyệt của Zalo và Facebook trên Android (CHƯA XÁC MINH).
   - Chrome desktop không có giọng mạng tiếng Việt [49].
   - Khuyến nghị: **tạo sẵn file audio lúc build** cho nội dung cố định. Web Speech chỉ là phần tăng cường.
   - Chi phí gần như bằng 0: Google Cloud TTS miễn phí 4 triệu ký tự/tháng cho giọng Standard/WaveNet [52].
7. **Việt Nam**
   - Web di động: Android 59,79%, iOS 40,19%. Mobile chiếm 68,05% lượt xem (StatCounter 09/2026) [56].
   - Zalo có 81,3 triệu MAU (Q2/2026) [61]. 84,2% dân số dùng internet [57].
   - Q1/2025, máy dưới 200 USD chiếm 50% lượng máy bán ra [58].
   - Khoảng 27% lưu lượng Android chạy Android 12 trở xuống. Khoảng 10,7% lưu lượng iOS chạy iOS 15.8 hoặc 16.7 [56].
8. **Trình duyệt trong app**
   - iOS WKWebView không có service worker [48] và không cài được PWA.
   - Android WebView không có Web Share và `speechSynthesis` [48]; `localStorage` phụ thuộc cấu hình của app [62].
   - Hệ quả: app phải **dùng tốt khi không có PWA**, kèm gợi ý "Mở bằng trình duyệt" để dùng offline hoặc cài đặt.
9. **Tech stack**
   - Khuyến nghị:
     - **Astro 7.4** (output tĩnh) + **Preact 10.29** islands.
     - **TypeScript 6.0**.
     - Service worker tạo bằng **Workbox 7.4** sau build.
     - **MiniSearch 7.2** kèm hàm bỏ dấu tiếng Việt tự viết.
     - Kiểm thử: Vitest 5, Playwright 1.64, axe-core 4.14, Lighthouse 13.5.
   - Tránh `@vite-pwa/astro`: peer chỉ hỗ trợ astro ≤ 5 [77].
   - Next.js 16.4 bị loại vì JS nặng hơn trên mọi trang và yêu cầu Safari ≥ 16.4 [72].
   - SvelteKit 3.1 là phương án dự phòng tốt, nhưng bản 3.0 mới ra ngày 2026-10-01 [78].

---

## 2. Bảng thông số thiết kế khuyến nghị

| Thông số | Khuyến nghị cho doctor-v | Chuẩn / tham chiếu | Nguồn |
|---|---|---|---|
| Cỡ chữ body mặc định | **18 px** (`1.125rem` khi trình duyệt để mặc định 16 px) | iOS: body mặc định 17 pt, tối thiểu 11 pt. M3: Body Large 16/24. NN/g: tránh chữ nhỏ | [6][9][3] |
| Câu hỏi (H1 mỗi màn hình) | **24 px**, đậm 600. Ở cỡ chữ lớn, tiêu đề tăng chậm hơn body (xem 3.1.4) | WCAG "large text" là ≥ 18 pt (≈ 24 px) chữ thường, hoặc ≥ 14 pt (≈ 18,7 px) chữ đậm | [2] |
| Nhãn nút trả lời | **20 px**, đậm 600, căn trái, cho phép xuống dòng | Không cắt chữ (không dùng ellipsis) | — |
| Chữ phụ, ghi chú | **≥ 16 px**; không dùng chữ xám nhạt | NN/g: chữ nhạt màu khó đọc trên mobile | [3] |
| Line-height body | **1,5–1,6** | WCAG 1.4.12 kiểm thử ở mức 1,5. Đo được: tổng chiều cao mực chữ Việt tới 1,37 em | [2], đo font (3.4) |
| Line-height tiêu đề | **≥ 1,3** (≥ 1,4 với Be Vietnam Pro) | Dấu chồng trên chữ hoa cao 0,99–1,15 em | đo font |
| Độ dài dòng | ≤ 70 ký tự | WCAG 1.4.8 (AAA): ≤ 80 ký tự, không căn đều hai bên | [2] |
| Tương phản chữ | **≥ 7:1** cho mọi chữ nội dung | 1.4.3 AA: 4,5:1 (chữ lớn 3:1). 1.4.6 AAA: 7:1 (chữ lớn 4,5:1) | [2] |
| Tương phản UI (viền nút, focus ring, icon có nghĩa) | **≥ 3:1** | 1.4.11 AA | [2] |
| Màu | Không dùng màu làm kênh duy nhất; mức khẩn cấp luôn có icon + chữ + màu | 1.4.1 A | [2] |
| Vùng chạm | **≥ 48×48 CSS px** cho mọi control. Nút trả lời full-width, **cao ≥ 56 px** | 2.5.8 AA: 24×24. 2.5.5 AAA: 44×44. Apple: 44×44 pt (tối thiểu 28×28). Android/M3: 48×48 dp. NN/g: ≥ 1×1 cm | [2][6][8][4] |
| Khoảng cách giữa target | **≥ 8 px** | NN/g: khoảng 2 mm. Apple: khoảng 12 pt padding quanh control có viền | [4][6] |
| Số bước cỡ chữ trong app | **4 bước**: ×1 / ×1,25 / ×1,5 / ×1,75 (18 / 22,5 / 27 / 31,5 px), kèm "Đặt lại" | Vẫn phải chịu được zoom 200% (1.4.4) và reflow ở 320 px (1.4.10) | [2] |
| Text spacing | Layout không vỡ khi line-height 1,5, khoảng đoạn 2 em, letter-spacing 0,12 em, word-spacing 0,16 em | 1.4.12 AA | [2] |
| Reflow | Không cuộn ngang ở chiều rộng 320 CSS px | 1.4.10 AA | [2] |
| Thời gian | Không giới hạn thời gian. Không auto-advance theo timer. Lưu tiến trình cục bộ > 20 giờ | 2.2.1 A, 2.2.6 AAA | [2] |
| Ngôn ngữ | Mỗi màn hình một câu hỏi; câu ngắn, một ý; trình độ ≤ THCS | 3.1.5 AAA ("lower secondary"). NN/g: mức lớp 6–8 | [2][5] |
| Icon | Kích thước tính bằng `em` (1–1,5 em) để scale cùng chữ | Apple HIG: icon có nghĩa phải to lên khi chữ to lên | [7] |
| Viewport | `width=device-width, initial-scale=1`; **không** dùng `maximum-scale` hay `user-scalable=no` | axe `meta-viewport` (1.4.4) | [84] |
| Ngân sách JS (gzip) | Trang bệnh ≤ 15 KB. Trang kiểm tra ≤ 80 KB, chưa tính JSON knowledge base | Russell 2026: thiết bị P75 tương đương Galaxy A24 4G, mạng 9 Mbps / 100 ms RTT | [60] |
| Font tải về | ≤ 70 KiB (latin + vietnamese, 2 weight), tự host, `font-display: swap` | Đo trực tiếp (3.4) | [45] |

Thông số nào không có nguồn trong bảng là **khuyến nghị thiết kế suy luận**. Cần kiểm thử với người dùng từ 60 tuổi trở lên ở Việt Nam.

---

## 3. Chi tiết theo mục 1–6

### 3.1. UX cho người cao tuổi và người ít quen chữ, ít quen công nghệ

#### 3.1.1. Bằng chứng chính

**NN/g, "Usability for Older Adults: Challenges and Changes" (Kane, 2019-09-08) [3]**

- Gồm 3 vòng nghiên cứu với tổng cộng 123 người từ 65 tuổi trở lên, ở Mỹ, Canada, Úc, Đức và Nhật:
  - 2001: 44 người, 17 website.
  - 2013: 31 người, 29 website.
  - 2018–19: 18 người với 12 website và 6 app, cộng focus group 20 người và contextual inquiry 10 người. Vòng này chủ yếu tuyển người từ 70 tuổi trở lên.
- Kết luận chính:
  - "Older users make more mistakes than younger users do."
  - Khả năng dùng web giảm khoảng 0,8%/năm trong độ tuổi 25–60.
  - Tỉ lệ dùng smartphone ở người cao tuổi tăng nhanh.
- Vấn đề còn tồn tại: chữ nhỏ, chữ nhạt màu (đặc biệt trên mobile), target nhỏ, form từ chối dấu gạch nối hoặc dấu ngoặc.
- Khuyến nghị: thông báo lỗi phải "focus on the error, explain it clearly, and make it as easy as possible to fix".
- Báo cáo đầy đủ có 87 guideline nhưng là tài liệu trả phí, chưa đọc.

**NN/g, "Lower-Literacy Users" (Nielsen, 2005-03-13) [5]**

- Hành vi của người đọc kém:
  - Đọc từng chữ, theo từng dòng, tầm nhìn hẹp; không quét trang nên bỏ sót những gì nằm ngoài luồng chính.
  - Gặp chữ dày đặc thì bỏ qua.
  - Cuộn trang làm họ mất tập trung.
  - Khó đánh vần truy vấn, thường bấm kết quả tìm kiếm đầu tiên.
- Khuyến nghị:
  - Viết ở mức lớp 6 cho trang chính, lớp 8 cho phần còn lại.
  - Đặt ý chính lên đầu; dùng một cột; menu tuyến tính.
  - Ô tìm kiếm phải chịu được lỗi chính tả.
- Case study: sau khi viết lại nội dung, tỉ lệ thành công tăng từ 46% lên 82%, thời gian giảm từ 22,3 xuống 9,5 phút.
- Đây là dữ liệu Mỹ năm 2005, chỉ dùng để định hướng.

**W3C WAI, "Older Users and Web Accessibility" (cập nhật 2024-03-04) [1]**

- Các suy giảm theo tuổi cần tính đến:
  - Thị lực: độ nhạy tương phản, cảm nhận màu, nhìn gần.
  - Vận động: độ khéo léo, vận động tinh.
  - Thính lực: khó nghe âm cao, khó tách âm thanh.
  - Nhận thức: trí nhớ ngắn hạn, khó tập trung, dễ phân tâm.
- Dự án WAI-AGE kết luận chuẩn WAI (WCAG) đã đáp ứng phần lớn nhu cầu của người cao tuổi.

**Hệ quả cho doctor-v**

- Kênh vào chính là liên kết gửi qua Zalo, thường do con cháu gửi cho bố mẹ (giả thuyết, cần nghiên cứu thực địa).
- Phải có chế độ **"Kiểm tra cho người khác"**. Symptomate có bước chọn người được kiểm tra (theo mô tả trên App Store, qua kết quả tìm kiếm). Ada có bước này hay không: **CHƯA XÁC MINH**.

#### 3.1.2. Các tiêu chí WCAG 2.2 quan trọng

WCAG 2.2 là W3C Recommendation ngày 2023-10-05, có bản cập nhật ngày 2024-12-12 [2].

| SC | Mức | Yêu cầu (rút gọn từ văn bản chuẩn) | Áp dụng cho doctor-v |
|---|---|---|---|
| 1.4.3 Contrast (Minimum) | AA | Chữ ≥ 4,5:1; chữ lớn ≥ 3:1 | Mức sàn |
| 1.4.6 Contrast (Enhanced) | AAA | Chữ ≥ 7:1; chữ lớn ≥ 4,5:1 | **Mục tiêu** vì người cao tuổi giảm độ nhạy tương phản |
| 1.4.4 Resize Text | AA | Phóng chữ tới 200% không cần công cụ hỗ trợ, không mất nội dung hay chức năng | Kiểm thử kết hợp cỡ chữ trong app với zoom của trình duyệt |
| 1.4.10 Reflow | AA | Không cuộn hai chiều ở chiều rộng 320 CSS px (tương đương 1280 px ở zoom 400%) | Bố cục một cột, flex-wrap |
| 1.4.11 Non-text Contrast | AA | Thành phần UI và đồ hoạ cần thiết ≥ 3:1 | Viền nút, focus ring, thanh tiến trình |
| 1.4.12 Text Spacing | AA | Không mất nội dung khi line-height 1,5×, khoảng đoạn 2×, letter 0,12×, word 0,16× | Không dùng chiều cao cố định |
| 1.4.13 Content on Hover or Focus | AA | Nội dung hiện khi hover/focus phải đóng được, di chuột vào được, và tồn tại đủ lâu | Không giải thích thuật ngữ bằng tooltip hover; dùng disclosure |
| 1.4.1 Use of Color | A | Màu không là kênh duy nhất | Mức khẩn cấp: icon + chữ + màu |
| 2.2.1 Timing Adjustable | A | Giới hạn thời gian phải tắt được, chỉnh được ≥ 10×, hoặc gia hạn được | Không đặt giới hạn thời gian |
| 2.2.6 Timeouts | AAA | Cảnh báo nếu có thể mất dữ liệu, trừ khi dữ liệu được giữ > 20 giờ | Lưu tiến trình cục bộ |
| 2.4.11 Focus Not Obscured (Min) | AA | Phần tử đang focus không bị nội dung của tác giả che hoàn toàn | Thanh dưới cố định ở cỡ chữ lớn dễ vi phạm |
| 2.5.8 Target Size (Minimum) | AA | ≥ 24×24 CSS px (có ngoại lệ về khoảng cách) | Mức sàn; doctor-v đặt mục tiêu 48 px |
| 2.5.5 Target Size (Enhanced) | AAA | ≥ 44×44 CSS px | Đạt được nhờ mục tiêu 48 px |
| 3.2.2 On Input | A | Thay đổi giá trị của một control không được tự gây đổi ngữ cảnh nếu chưa báo trước | **Radio không được tự chuyển câu.** Nút hành động thì được phép (bấm là hành động rõ ràng) |
| 3.2.6 Consistent Help | A (mới) | Cơ chế trợ giúp lặp lại phải ở cùng thứ tự trên các trang | Nút "Gọi 115", "Aa", "Hướng dẫn" ở cùng vị trí trên mọi trang |
| 3.3.1 / 3.3.3 | A / AA | Nhận diện lỗi bằng chữ; gợi ý cách sửa | Ví dụ nhập tuổi: "Nhập số, ví dụ 67" |
| 3.3.2 Labels or Instructions | A | Có nhãn hoặc hướng dẫn | Tiêu đề là câu hỏi; hint ngắn |
| 3.3.4 Error Prevention | AA | Áp dụng cả cho "submit user test responses": cho rà soát hoặc sửa trước khi chốt | Màn "Xem lại câu trả lời" trước kết quả |
| 3.3.7 Redundant Entry | A (mới) | Không bắt nhập lại thông tin đã có trong cùng quy trình | Tuổi, giới đã hỏi thì không hỏi lại |
| 3.3.8 Accessible Authentication | AA (mới) | Không bắt buộc kiểm tra nhận thức khi đăng nhập | Không có đăng nhập, nên không áp dụng |
| 3.1.5 Reading Level | AAA | Có phiên bản ≤ trình độ THCS | Mục tiêu viết |
| 4.1.3 Status Messages | AA | Thông báo trạng thái đọc được bằng trình đọc màn hình mà không cần focus | "Đã lưu", "Đang tải" dùng `role="status"` |

#### 3.1.3. Chuẩn của nền tảng

**Apple HIG [6][7]**

- Kích thước control mặc định trên iOS/iPadOS là **44×44 pt**, tối thiểu 28×28 pt.
- Nên có khoảng 12 pt padding quanh phần tử có viền.
- Cỡ chữ mặc định **17 pt**, tối thiểu 11 pt.
- Tương phản: ≤ 17 pt cần 4,5:1; từ 18 pt hoặc chữ đậm cần 3:1.
- "Increase the size of meaningful interface icons as font size increases."

**Android và Material 3 [8][9]**

- Touch target **≥ 48×48 dp**, "larger is even better".
- Chữ < 18 sp (hoặc chữ đậm < 14 sp) cần tương phản ≥ 4,5:1.
- Token M3: `body-large` 1rem / line-height 1.5rem; `body-medium` 0.875rem / 1.25rem.

**NN/g [4]**

- Target tối thiểu 1×1 cm.
- Đầu ngón tay rộng 1,6–2 cm; vùng chạm của ngón cái khoảng 2,5 cm.
- Khoảng cách giữa các target khoảng 2 mm.
- Tăng khoảng cách không bù được cho target quá nhỏ.

**Kết luận:** 48 CSS px là mức an toàn chung. Riêng nút trả lời cho người cao tuổi nên full-width và cao ≥ 56 px. Đây là suy luận, cần kiểm thử.

#### 3.1.4. Điều khiển cỡ chữ

**(a) Cơ chế của nền tảng, tính đến 10/2026**

- **Chrome/Edge ≥ 146** (Chrome stable 2026-03-10, Edge 2026-03-13) hỗ trợ `<meta name="text-scale" content="scale">`:
  - Cỡ chữ mặc định của root element scale theo cài đặt cỡ chữ của OS và của trình duyệt [11][13].
  - Bật thẻ này sẽ **tắt text autosizing trên mobile** và full-page zoom trên Windows [11].
  - Chỉ tác động lên đơn vị tương đối (`rem`, `em`, `%`); text tính bằng px giữ nguyên [18].
  - Intent to Ship liệt kê đủ 6 nền tảng Blink, gồm cả **Android WebView** [12].
  - Firefox và Safari chưa hỗ trợ [13].
  - `env(preferred-text-scale)`: ChromeStatus ghi mốc Android 138 [14].
  - Matuzović ghi nhận thẻ này gây cuộn ngang trên site của anh, nên phải kiểm thử kỹ [18].
- **Khi không có thẻ meta:**
  - Chrome không áp cỡ chữ của OS cho nội dung web [16][18].
  - Chrome Android có Page Zoom riêng (menu ⋮ → Thu phóng), áp cho mọi trang hoặc từng trang [21] (qua kết quả tìm kiếm).
- **Firefox Android:** phóng toàn trang theo cỡ chữ OS, kể cả nội dung tính bằng px [17][18].
- **iOS Safari:**
  - Không scale theo Dynamic Type, trừ khi tác giả dùng `font: -apple-system-body` [17].
  - Có Page Zoom trong menu "aA" (zoom toàn trang).
  - Dynamic Type có nhóm "Larger Accessibility Sizes" [7]. Mức tối đa mà `-apple-system-body` theo được trên web: **CHƯA XÁC MINH**.
- **Android 14 trở lên:** cỡ chữ hệ thống tới **200%**, theo đường cong phi tuyến: chữ lớn tăng chậm hơn chữ nhỏ [10].
- **Mức độ sử dụng:**
  - Appt (Hà Lan): "more than a fifth of users" tăng cỡ chữ trên iOS và Android [19].
  - Tumath dẫn Appt: khoảng 37% người dùng Android và 34% người dùng iOS đã đổi cỡ chữ hệ thống [15].
  - Số liệu Việt Nam: **CHƯA XÁC MINH**.

**(b) Pattern triển khai khuyến nghị**

Có hai tầng nhân với nhau:

- Tầng nền tảng: `rem` mặc định của trình duyệt. Trên Chrome ≥ 146 có thẻ meta thì đã gồm cỡ chữ của OS. Trên iOS thì lấy từ Dynamic Type.
- Tầng người dùng chọn trong app: `--user-scale`.

```html
<html lang="vi">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="text-scale" content="scale">
  <script>
    /* Inline trong <head>: áp cỡ chữ trước khi vẽ, tránh nhảy layout */
    (function () {
      var s = 1;
      try { s = parseFloat(localStorage.getItem('dv-co-chu')) || 1; } catch (e) {}
      document.documentElement.style.setProperty('--user-scale', String(s));
    })();
  </script>
</head>
```

```css
:root {
  --user-scale: 1;   /* 1 | 1.25 | 1.5 | 1.75, do người dùng chọn */
  --os-scale: 1;     /* chỉ đặt trên iOS (xem bên dưới) */
  font-size: calc(100% * var(--os-scale) * var(--user-scale)); /* KHÔNG đặt px */
}
body { font-size: 1.125rem; line-height: 1.55; }      /* 18 px ở mặc định */
h1   { font-size: calc(1.125rem + 6px); line-height: 1.3; }
/* h1 = body + 6 px cố định: tiêu đề tăng chậm hơn body (phi tuyến, giống Android 14) */
.icon { width: 1.25em; height: 1.25em; }               /* icon scale theo chữ */
```

**iOS (CHƯA kiểm thử trên thiết bị thật)**

- Đặt một script ở cuối `<body>`. Script tạo một phần tử ẩn có `font: -apple-system-body`, đo `fontSize`, rồi đặt `--os-scale = fontSize / 17`.
- Mốc 17 dựa trên cỡ body mặc định 17 pt của iOS [7]. Cần kiểm chứng rằng mức Dynamic Type mặc định cho ra đúng 17 px.
- Chỉ chạy script khi `CSS.supports('font','-apple-system-body')` **và** `CSS.supports('-webkit-touch-callout','default')`. Cách tách iOS khỏi macOS này theo Roselli [17].
- Lý do không làm theo nguyên mẫu `body { font: -apple-system-body }` của Roselli [17]: nguyên mẫu chỉ hợp với CSS tính bằng `em`. Tailwind và các token tính bằng `rem` cần tỉ lệ nằm ở `:root`.

**(c) Số bước và UI**

- **4 bước**: ×1 / ×1,25 / ×1,5 / ×1,75. Bước 25% đủ lớn để thấy khác biệt. Kèm nút "Đặt lại".
- Nút **"Aa"** cố định trên header của mọi màn hình, cùng vị trí ở mọi trang (3.2.6). Bấm vào mở sheet có **xem trước** bằng một câu mẫu tiếng Việt có dấu chồng, ví dụ "Bạn có bị ho nhiều không?".
- Lần đầu mở app, hỏi một lần: "Chữ này đã dễ đọc chưa?" với 3 mẫu chữ to.
- Không dùng slider: slider đòi vận động tinh và có thể khó với người cao tuổi (suy luận từ [1][3]).

**(d) Lưu lựa chọn**

- Dùng `localStorage`, bọc try/catch.
- Android WebView mặc định `setDomStorageEnabled = false` [62]. Nếu không ghi được thì giữ lựa chọn trong bộ nhớ của phiên.
- Không cần server.
- Có thể đồng bộ giữa các tab bằng sự kiện `storage` (tuỳ chọn).

**(e) Lỗi hay gặp**

1. Đặt px ở `:root` hoặc dùng font-size bằng px. Cả thẻ meta lẫn zoom chữ đều mất tác dụng [15][18].
2. Chiều cao cố định (`height: 48px`) trên nút hoặc card. Dùng `min-height` + padding tính bằng `rem`.
3. `text-overflow: ellipsis`, `line-clamp` hoặc `white-space: nowrap` trên nhãn quan trọng. Ở cỡ chữ lớn, phần bị cắt đúng là thông tin cần thiết.
4. **Media query tính bằng `rem`/`em` không phản ứng với cỡ chữ đặt bằng CSS.** Spec quy định đơn vị tương đối trong media query dựa trên *initial value* (giá trị mặc định của trình duyệt), không dựa trên style của trang [20].
   - Ngược lại, đơn vị tương đối trong **container query** dựa trên giá trị computed của query container [20].
   - Vì vậy, bố cục cần đổi theo cỡ chữ trong app thì dùng container query hoặc bố cục tự co giãn (flex-wrap, grid `auto-fit`).
   - Lưu ý: Safari hỗ trợ container query từ bản 16 [48], nên iOS 15.8 cần fallback.
5. Icon và ảnh minh hoạ tính bằng px không to lên theo chữ [7].
6. Thanh dưới cố định (sticky footer) chiếm nửa màn hình ở cỡ chữ lớn và che phần tử đang focus (2.4.11). Ở bước ×1,5 trở lên, chuyển sang thanh không cố định.
7. Dùng `100vh` cho màn hình câu hỏi làm nội dung bị cắt. Dùng `min-height: 100dvh` (Safari ≥ 15.4 [48]) và cho phép cuộn.
8. Viewport có `maximum-scale=1` hoặc `user-scalable=no`, bị axe bắt bằng rule `meta-viewport` [84].
9. Hai tầng cỡ chữ nhân với nhau quá mức, ví dụ OS 200% × app 175%. Cần kiểm thử ma trận hai chiều này. Nút "Đặt lại" luôn phải nằm trong tầm nhìn.
10. Font-size của ô nhập < 16 px khiến iOS Safari tự zoom khi focus. Đây là kinh nghiệm phổ biến; nguồn chính thức **CHƯA XÁC MINH**. Với base 18 px thì không gặp.

### 3.2. Mẫu UX của các symptom checker

| | Ada | Infermedica / Symptomate | NHS 111 online (mẫu UI theo NHS service manual [28]) | K Health | Buoy |
|---|---|---|---|---|---|
| Hình thức hỏi | Hội thoại "similar to a chatbot" [25]. Mọi câu hỏi đều có "I don't know" [27] | `single` (Có/Không/Không biết), `group_single` (chọn một trong nhóm loại trừ nhau), `group_multiple` (chọn nhiều) [22]. Hỏi yếu tố nguy cơ trên một màn hình [23] | **Một câu hỏi mỗi trang**, tiêu đề là câu hỏi, nút "Continue" [28]. 111 online có áp dụng đúng mẫu này không: CHƯA XÁC MINH trực tiếp | Chat, "roughly 20 questions" (2018) [32] | Chat (qua kết quả tìm kiếm) |
| Tiến trình | CHƯA XÁC MINH | **Theo giai đoạn**: "3/5 Symptoms", "4/5 Medical history" [24] | CHƯA XÁC MINH | CHƯA XÁC MINH | CHƯA XÁC MINH |
| Body map | Không phải điểm vào chính (CHƯA XÁC MINH) | **Bản đồ vùng** dùng để định vị cơn đau bụng (Right/Left) [24] | CHƯA XÁC MINH | — | — |
| Giải thích thuật ngữ | "What does this mean?" kèm hình hoặc sơ đồ [27] | `enable_explanations` thêm trường `explication` và `instruction` cho câu hỏi [22] | Hint text [28] | — | — |
| Quay lại / sửa | CHƯA XÁC MINH | Mũi tên Back [24] | Back link trên mọi trang; không phá nút back của trình duyệt [28] | — | — |
| Kết quả | 8 mức advice tổng thể và 3 mức theo bệnh [25][26]. Danh sách bệnh kèm "6 out of 10 people with these symptoms had this condition" [27]. Dừng ngay khi có dấu hiệu cấp cứu [25] | **Triage trước** ("Self-care may be enough" + "Why this recommendation?"), sau đó "Possible conditions" gồm nhãn **Strong evidence / Moderate evidence / Less likely**, kèm disclaimer [24] | **Chỉ có hướng xử trí** (disposition): gọi xe cấp cứu, trung tâm cấp cứu, GP, nha khoa, tự chăm sóc. Không có danh sách bệnh [29] | "Outcomes of people like you" kèm % [32] | Danh sách nguyên nhân + mức chăm sóc (qua kết quả tìm kiếm) |
| Độ dài | Trung bình 29,3 câu [30]; median **7 phút** (n = 600, tuổi median 52) [31] | Không công bố; dùng cờ `should_stop` [22][23] | Median **82 giây** mỗi lượt triage; 451.200 / 8.245.200 lượt bỏ dở (5,5%) [29] | 25,2 câu [30] | 25,7 câu [30] |

[30] do nhân viên của Avey (một sản phẩm cạnh tranh) thực hiện, có xung đột lợi ích. Số câu là giá trị trung bình trên các vignette chẩn đoán đúng.

**Phân tích theo chủ đề**

- **Định dạng câu hỏi**
  - Ba dạng của Infermedica đủ cho knowledge base (KB) của doctor-v.
  - "Không biết" (`unknown`) **khác** "Không" (`absent`) về mặt toán học, nên không được gộp [22]. Engine của doctor-v phải giữ ba trạng thái này.
  - Với `group_multiple`, thêm lựa chọn "Không có triệu chứng nào ở trên" và nút "Tiếp tục".
- **Tự chuyển câu**
  - Dạng "nút hành động" (bấm "Có" là chuyển câu ngay) hợp lệ với WCAG.
  - Dạng radio tự chuyển câu vi phạm 3.2.2 nếu không báo trước [2].
  - Khuyến nghị: `single` dùng 3 nút hành động lớn; `group_single` và `group_multiple` dùng radio/checkbox lớn kèm nút "Tiếp tục".
- **Tiến trình**
  - Bảng hỏi thích ứng không biết trước tổng số câu. Hiển thị theo giai đoạn như Infermedica [24]: Bước 1 Thông tin cơ bản → Bước 2 Triệu chứng chính → Bước 3 Câu hỏi thêm → Bước 4 Kết quả.
  - Kèm ước lượng "Khoảng 3–5 phút". Đây là số đặt mục tiêu, cần đo thực tế.
  - Tránh "Câu 7/30" vì gây cảm giác sai về độ dài.
- **Body map**
  - Không dùng hình toàn thân làm điểm vào chính, vì hình toàn thân đòi target nhỏ và vận động tinh (WAI [1]).
  - Chỉ dùng bản đồ **vùng lớn có nhãn chữ** để định vị khi đã biết vùng (ví dụ bụng chia 9 vùng), như Infermedica [24].
  - Luôn có danh sách chữ thay thế, phục vụ cả trình đọc màn hình.
  - Một nghiên cứu ứng dụng vẽ triệu chứng trên hình cơ thể (tablet) nhấn mạnh cần thiết kế riêng cho người cao tuổi và người hạn chế vận động [33] (qua kết quả tìm kiếm).
- **Thuật ngữ**
  - Viết từ thông dụng trước, thuật ngữ đặt sau trong ngoặc.
  - Có nút "Cái này là gì?" mở rộng tại chỗ bằng `<details>`, kèm ảnh minh hoạ, như "What does this mean?" của Ada [27].
  - Không dùng tooltip hover (1.4.13).
- **Quay lại / sửa**
  - Nút Back trên mọi màn hình; nút back của trình duyệt cũng phải hoạt động, bằng cách mỗi câu một history entry [28].
  - Có màn "Xem lại câu trả lời" trước khi xem kết quả.
  - Khi sửa một câu, engine tính lại. Chỉ hỏi bổ sung những câu mới trở nên cần thiết.
- **Kết quả**
  - Cả Infermedica, Ada và NHS đều ưu tiên **mức xử trí** [24][25][29]. NHS bỏ hẳn danh sách bệnh [29].
  - Với doctor-v: mức xử trí là thẻ đầu tiên, kèm hành động cụ thể (`tel:115`) và mốc thời gian.
  - Danh sách bệnh đặt bên dưới, có nhãn "không phải chẩn đoán".
- **Dừng khẩn cấp**
  - Hỏi dấu hiệu cấp cứu (red flag) **trước** câu hỏi chi tiết.
  - Khi phát hiện, dừng ngay và hiện màn "Gọi 115 ngay", giống roadblock của Ada [25]. Vẫn cho phép "Tôi vẫn muốn tiếp tục".

### 3.3. Truyền đạt rủi ro

#### 3.3.1. Bằng chứng

- **Natural frequency**
  - Gigerenzer và Hoffrage (1995) cho thấy định dạng tần suất tự nhiên cải thiện suy luận Bayes so với định dạng xác suất [34].
  - Con số thường được trích là 16% lên 46% suy luận Bayes đúng. **CHƯA XÁC MINH lại từ bản gốc** vì không truy cập được.
- **Thống kê y tế cho bệnh nhân**
  - Gigerenzer và cộng sự (2007) khuyến nghị dùng nguy cơ tuyệt đối và natural frequency, tránh nguy cơ tương đối và xác suất có điều kiện [35]. Đây là nội dung đã biết rộng rãi về bài này; không đọc được bản gốc.
- **Icon array**
  - Giúp người kém toán (low numeracy) hiểu nguy cơ [36].
  - Giảm lỗi bỏ qua mẫu số (denominator neglect), với hiệu quả tương đương ở người trẻ và người cao tuổi [43] (qua kết quả tìm kiếm).
  - Tổng quan hệ thống: hình trực quan giúp tăng hiểu biết về rủi ro [39].
- **Tổng quan Zipkin và cộng sự (2014), 91 nghiên cứu [37]**
  - Icon array và biểu đồ cột cải thiện hiểu biết và sự hài lòng.
  - Nguy cơ tuyệt đối cho kết quả chính xác hơn nguy cơ tương đối.
  - NNT (số người cần điều trị) làm giảm hiểu biết.
  - So sánh "1 trên 5" với "20%" **chưa có kết luận**.
  - Không có phương pháp nào vượt trội rõ ràng (qua tóm tắt).
- **Nhãn bằng lời**
  - RCT của Knapp và cộng sự (2004), n = 120, so sánh nhãn EU với số liệu [38]:
    - "Common" (EU quy định 1–10%) so với "2,5%": ước lượng trung bình **34,2%** so với **8,1%**.
    - "Rare" (0,01–0,1%) so với "0,04%": **18%** so với **2,1%**.
  - Nhãn bằng lời làm người đọc ước lượng quá cao và nhìn thuốc tiêu cực hơn.
  - Từ đó suy ra: "khả năng cao" hay "thường gặp" không chuyển tải được một xác suất ổn định.
- **Hướng dẫn cho người làm công cụ hỗ trợ quyết định**
  - IPDAS primer [40] và Spiegelhalter (2017) [41]: dùng mẫu số nhất quán, nguy cơ tuyệt đối, kết hợp số với hình.
  - Nhãn bằng lời nếu dùng thì kèm số. Đây là nội dung đã biết; không đọc được bản đầy đủ.
- **Numeracy và tuổi:** numeracy thấp làm sai lệch cách hiểu rủi ro [42]. Số liệu numeracy của người Việt: **CHƯA XÁC MINH**.

#### 3.3.2. Các sản phẩm thực tế đang hiển thị gì

| Sản phẩm | Mức khẩn cấp | Khả năng mắc bệnh |
|---|---|---|
| Ada | 8 câu advice dạng "People with similar symptoms may require emergency care…", "…within the next 2–3 days" [26] | Natural frequency: "6 out of 10 people with these symptoms had this condition" [27] |
| Infermedica | Thẻ triage có màu và icon, giải thích, "Why this recommendation?" [24] | Nhãn mức bằng chứng: Strong / Moderate evidence, Less likely [24]. API gọi `probability` là "a match between reported evidence and conditions in the model" [22] |
| NHS 111 online | Chỉ có hướng xử trí [29] | Không hiển thị |
| K Health | — | % theo "people like you" [32] |

#### 3.3.3. Khuyến nghị cho doctor-v

1. **Engine chưa hiệu chuẩn thì không hiển thị số.**
   - Điểm số từ một KB 150–500 bệnh do người soạn **không** phải tần suất quan sát được.
   - Hiển thị "7 trên 10 người" sẽ tạo độ chính xác giả.
   - Infermedica cũng mô tả `probability` của mình là mức "match" [22].
2. **Nhãn tương đối theo câu trả lời**, không theo xác suất tuyệt đối:
   - "Phù hợp nhất với câu trả lời của bạn"
   - "Cũng có thể"
   - "Ít phù hợp hơn"
   - Kèm thanh 3 nấc không số.
   - **Tránh "khả năng cao/thấp"**, vì bị hiểu như xác suất tuyệt đối và bị ước lượng quá cao [38].
3. **Tối đa 3–5 bệnh.** Mỗi bệnh có: tên thông dụng và tên y khoa, một dòng mô tả, **"Vì sao gợi ý"** (những câu trả lời đã khớp), "Nên làm gì", "Đi khám ngay nếu…", và liên kết tới trang bệnh.
4. **Mức khẩn cấp: 4 mức + màn cấp cứu.** Số mức là quyết định thiết kế; Ada có 8 mức [25], NHS có nhiều disposition [29]. Với người đọc kém, 4 mức dễ phân biệt hơn (giả thuyết, cần kiểm thử).

| Mức | Tiêu đề (động từ + thời gian) | Hành động |
|---|---|---|
| Cấp cứu | "Gọi 115 ngay" | Nút `tel:115` cỡ lớn; "Không tự lái xe" |
| Khám trong hôm nay | "Đi khám trong hôm nay" | Gợi ý loại cơ sở y tế |
| Khám sớm | "Đi khám trong 1–3 ngày" | Cách theo dõi tại nhà |
| Tự chăm sóc | "Có thể tự chăm sóc tại nhà" | Danh sách "Đi khám ngay nếu…" (safety-netting) |

5. **Khi nào mới dùng "x trên 10 người".** Chỉ khi engine đã được hiệu chuẩn bằng dữ liệu hoặc vignette Việt Nam có kiểm định. Khi đó:
   - Dùng **cùng mẫu số 10** cho mọi bệnh.
   - Kèm icon array 10 hình người [36][43].
   - Kèm câu "Không phải chẩn đoán".

### 3.4. Typography và giọng đọc tiếng Việt

#### 3.4.1. Font: giấy phép, biến thể, dung lượng và metric đo trực tiếp

Số liệu đo ngày 2026-10-24:

- Dung lượng: Google Fonts CSS2 API với UA Chrome 146, đọc `Content-Length` của woff2 [45].
- Metric: parse TTF trong repo google/fonts, bản Regular hoặc default instance [46].
- Giấy phép, biến thể và trục variable lấy từ Fontsource [44].

| Font | Giấy phép | Variable | woff2 latin + vietnamese | Dấu chồng chữ hoa (yMax) | Tổng chiều cao mực: hoa / thường | `line-height: normal` | x-height |
|---|---|---|---|---|---|---|---|
| **Be Vietnam Pro** (Lâm Bảo, Tony Le, ViệtAnh Nguyễn; lên Google Fonts 2021-06-13) | OFL 1.1 | **Không** (file tĩnh, 9 weight + italic) | 400: 20,7 + 11,3 = **32,0 KiB**; 700: 21,6 + 12,2 = 33,8 KiB | **1,147 em** | 1,37 / 1,16 em | 1,26 | 0,530 |
| **Inter** | OFL 1.1 | Có: wght 100–900, opsz 14–32, ital | Chỉ wght: 47,1 + 10,0 = **57,1 KiB**; opsz + wght: 86,1 KiB; tĩnh 400: 28,0 KiB | 1,087 em | 1,30 / 1,12 em | 1,21 | 0,546 |
| **Noto Sans** | OFL 1.1 | Có: wght, wdth 62,5–100, ital | wght: 35,0 + 14,1 = **49,1 KiB** | 1,048 em | 1,29 / 1,12 em | 1,36 | 0,536 |
| **Roboto** | OFL 1.1 | Có: wght, wdth 75–100, ital | wght: 42,1 + 14,0 = **56,1 KiB** | 0,987 em (dấu trên chữ hoa được nén) | 1,23 / 1,08 em | 1,17 | 0,528 |
| **Lexend** | OFL 1.1 | Có: wght | wght: 38,8 + 13,5 = **52,3 KiB** | 1,051 em | 1,28 / 1,16 em | 1,25 | 0,525 |

**Cách đọc bảng**

- Subset `vietnamese` của Google Fonts chỉ chứa ký tự riêng của tiếng Việt. Chữ Latin cơ bản nằm trong subset `latin`, nên trang tiếng Việt phải tải **cả hai**.
- "Dấu chồng chữ hoa (yMax)" là điểm cao nhất của các ký tự Ẫ, Ễ, Ỗ, Ữ, Ậ, Ặ, Ợ, Ỵ.
- "Tổng chiều cao mực" tính từ điểm cao nhất của dấu chồng đến điểm thấp nhất của phần dưới chân chữ hoặc dấu nặng.

**Kết luận về line-height (từ số đo)**

- Với line-height 1,5, mỗi dòng có 1,5 em, cao hơn tổng chiều cao mực của mọi font khảo sát (≤ 1,37 em). Vì vậy không có va chạm giữa các dòng.
- Với line-height 1,2 hoặc 1,25, thường gặp ở tiêu đề:
  - Chữ hoa có dấu chồng (1,23–1,37 em) có thể chạm phần dưới chân chữ hoặc dấu nặng của dòng trên.
  - Nặng nhất với Be Vietnam Pro.
  - Do đó: tiêu đề ≥ 1,3, riêng Be Vietnam Pro ≥ 1,4; tiêu đề viết hoa đầu câu, không viết hoa toàn bộ.
- `line-height: normal` (1,17–1,36) quá chặt cho đoạn văn nhiều dòng.
- **Không** dùng `overflow: hidden` cho phần tử một dòng có line-height < 1,4 (ví dụ nút cao cố định), vì sẽ cắt mất dấu trên chữ "Ễ".

**Ghi chú thiết kế**

- Trương (Vietnamese Typography, ấn bản 2): dấu trên chữ hoa có thể thu nhỏ hoặc hạ thấp góc nhưng không được chạm vào chữ; dính dấu vào chữ làm giảm độ dễ đọc; chữ hoa có dấu gây khó khăn cho khoảng cách dòng [47].
- Roboto thể hiện đúng cách nén dấu này (yMax 0,987 em).
- x-height của 5 font gần như bằng nhau (0,525–0,546 em), nên không phải yếu tố quyết định.
- Lexend được quảng bá là font "tăng hiệu quả đọc". Bằng chứng cho tuyên bố này: **CHƯA XÁC MINH**.

**Khuyến nghị font**

- **Be Vietnam Pro** 400 + 600, tự host qua `@fontsource/be-vietnam-pro` 5.3.0, chỉ subset latin + vietnamese (khoảng 66 KiB):
  - Do người Việt thiết kế cho tiếng Việt; hiển thị nhất quán giữa các máy.
  - Được service worker cache sau lần tải đầu.
- Fallback: `system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial, sans-serif`.
- Phương án nhẹ nhất là **chỉ dùng system font** (0 KB). Rủi ro: hiển thị khác nhau giữa các hãng máy. Font hãng (ví dụ font do người dùng Samsung tự chọn) có hiển thị đúng dấu chồng hay không: **CHƯA XÁC MINH**.
- Không dùng Google Fonts CDN: vừa không chạy offline được, vừa gửi IP người dùng tới bên thứ ba.

#### 3.4.2. Web Speech API (`speechSynthesis`) với giọng vi-VN

| Môi trường | API | Giọng vi-VN | Nguồn / ghi chú |
|---|---|---|---|
| Chrome Android | Có | Phụ thuộc TTS engine của máy (Google Speech Services, Samsung TTS…). Mức hỗ trợ tiếng Việt theo từng hãng: **CHƯA XÁC MINH** | [48]. Phải kiểm tra `getVoices()` lúc chạy (danh sách có thể trả về bất đồng bộ qua sự kiện `voiceschanged`) |
| **Android WebView** (Zalo/Facebook trên Android nếu dùng WebView) | **Không** (`webview_android: false`) | — | [48] |
| iOS Safari và WKWebView (Zalo/Facebook trên iOS) | Có | iOS có VoiceOver tiếng Việt [51], tức là có giọng hệ thống tiếng Việt. Tên giọng (ví dụ "Linh") và chất lượng: **CHƯA XÁC MINH** | [48][51]. Safari 27.0 sửa lỗi `cancel()` xoá nhầm hàng đợi [69] |
| Chrome desktop | Có | **Không có giọng mạng tiếng Việt.** Component TTS của Chromium chỉ có 19 giọng (de, en, es, fr, hi, id, it, ja, ko, nl, pl, pt-BR, ru, zh) | [49]. Chỉ dùng được giọng của OS |
| Windows | — | Giọng legacy "An" (nam). **Không có** giọng natural tiếng Việt. Phải thêm qua Narrator → "Add legacy voices" | [50] |
| Edge desktop | Có | Edge có giọng "Online (Natural)" lấy từ Azure; có vi-VN hay không: **CHƯA XÁC MINH** | — |

#### 3.4.3. TTS trả phí, dùng thay thế hoặc bổ sung

| Dịch vụ | Giọng vi-VN | Giá (đọc ngày 2026-10-24) | Miễn phí | Ghi chú |
|---|---|---|---|---|
| Google Cloud TTS | Standard A–D, WaveNet A–D, Neural2 A/D, Chirp3-HD [52] | Standard và WaveNet **4 USD / 1 triệu ký tự**; Neural2 16 USD; Chirp 3 HD 30 USD; Studio 160 USD [52] | 4 triệu ký tự/tháng (Standard, WaveNet); 1 triệu (Neural2, Chirp 3 HD) [52] | Xử lý ngoài Việt Nam |
| Azure AI Speech | vi-VN-HoaiMyNeural (nữ), vi-VN-NamMinhNeural (nam), vi-VN-Linh:MAI-Voice-2-Flash (Neural HD Flash, nữ) [53] | Neural **15 USD / 1 triệu ký tự**; Neural HD 22 USD (hiệu lực 2026-03-01; Retail Prices API, vùng southeastasia) [54] | Gói F0: **CHƯA XÁC MINH** | — |
| FPT.AI Voicemaker | Chọn được theo vùng miền và giới tính: Ban Mai (Bắc, nữ), Linh San (Nam, nữ), Lê Minh (nam), Thu Minh, Gia Huy [55] | **CHƯA XÁC MINH** | Có nút "Dùng thử miễn phí" [55] | Nhà cung cấp trong nước; điều khoản dữ liệu: **CHƯA XÁC MINH** |
| Viettel AI | **CHƯA XÁC MINH** (không đọc được nội dung trang) | **CHƯA XÁC MINH** | — | — |

**Kiến trúc khuyến nghị**

- **Tạo audio lúc build** cho câu hỏi, giải thích và tóm tắt bệnh. Đây là nội dung cố định do đội ngũ soạn, nên **không có dữ liệu người dùng nào rời khỏi máy**. Cách này giữ đúng nguyên tắc "không có dữ liệu người dùng trên server".
- Ngược lại, gọi TTS lúc chạy với nội dung do người dùng nhập là gửi dữ liệu sức khoẻ (dữ liệu nhạy cảm) ra nước ngoài. Báo cáo pháp lý cùng dự án xếp việc này vào nhóm rủi ro cao (`legal-regulatory.md`).
- Chi phí, ước tính thô:
  - Giả sử 500 bệnh × 1.500 ký tự + 1.000 câu hỏi × 100 ký tự ≈ 0,85 triệu ký tự.
  - Google Standard/WaveNet: nằm trong hạn mức miễn phí. Azure Neural: khoảng 13 USD.
- Dung lượng, ước tính thô (tốc độ đọc giả định khoảng 1.000 ký tự/phút, CHƯA XÁC MINH):
  - Khoảng 850 phút audio; ở 24 kbps (khoảng 180 KB/phút) là khoảng 150 MB.
  - Vì vậy **không precache**. Dùng runtime cache cache-first, giới hạn số mục, tải theo từng câu hoặc từng bệnh.
- Web Speech chỉ dùng khi `getVoices()` có giọng `vi-*`. Trong Android WebView, phát file audio tạo sẵn thay thế.
- Phải kiểm tra điều khoản của từng nhà cung cấp về việc **lưu và phân phối lại** audio đã tổng hợp: **CHƯA XÁC MINH**.

### 3.5. Bối cảnh sử dụng tại Việt Nam

| Chỉ số | Giá trị | Kỳ | Nguồn |
|---|---|---|---|
| Hệ điều hành trên web di động | Android **59,79%**, iOS **40,19%** | 09/2026 | StatCounter [56] |
| Hãng máy (web di động) | Apple 40,19%, Samsung 20,43%, Oppo 15,39%, Xiaomi 12,25%, Vivo 5,04%, Realme 2,22% | 09/2026 | [56] |
| Loại thiết bị | Mobile 68,05%, desktop 30,93%, tablet 1,02% | 09/2026 | [56] |
| Trình duyệt di động | Chrome 60,95%, Safari 28,62%, **Cốc Cốc 4,55%**, UC Browser 3,1%, Samsung Internet 2,01% | 09/2026 | [56] |
| Phiên bản Android | 16: 28,34%; 15: 16,28%; 14: 13,68%; 13: 14,7%; 12: 9,41%; 11: 8,65%; còn lại (≤ 10, không liệt kê) khoảng 8,9% | 09/2026 | [56] |
| Phiên bản iOS | 26.6: 31,89%; 26.5: 9,14%; 18.7: 13,43%; 18.6: 3,43%; **16.7: 6,05%; 15.8: 4,67%** (6 bản đầu cộng lại 68,6%) | 09/2026 | [56] |
| Người dùng internet | 85,6 triệu (**84,2%** dân số) | 10/2025 | DataReportal [57] |
| Kết nối di động | 137 triệu (134% dân số) | cuối 2025 | [57] |
| Tốc độ tải di động (median) | 152,17 Mbps (Ookla) | cuối 2025 | [57] |
| Zalo | **81,3 triệu MAU**; hơn 2,2 tỉ tin nhắn/ngày; khoảng 401.000 người cao tuổi dùng phụ đề cuộc gọi video | Q2/2026 | VNG, qua VietnamPlus [61] |
| Máy giá thấp | Phân khúc dưới 200 USD chiếm **50%** lượng máy bán ra, mức thấp kỷ lục; 5G chiếm 46% | Q1/2025 | Counterpoint [58] |
| Thị phần lượng máy bán ra | Samsung 28%, Xiaomi 21%, OPPO 20%, Apple 16%, vivo 6% | Q2/2026 | Omdia, qua TelecomLead [59] |
| Thiết bị và mạng P75 toàn cầu (để đặt ngân sách hiệu năng) | Galaxy A24 4G (250 USD lúc ra mắt); 9 Mbps / 3 Mbps, RTT 100 ms | 11/2025 | Russell [60] |

**Diễn giải**

- StatCounter đo **lượt xem trang**, không đo số máy đang dùng. Người dùng iOS thường duyệt web nhiều hơn, nên tỉ lệ Android trên số máy thực tế có lẽ cao hơn (suy luận).
- Thiết bị cũ chiếm tỉ lệ đáng kể:
  - Khoảng 27% lưu lượng Android chạy Android 12 trở xuống.
  - iOS 15.8 (iPhone 6s/7) và 16.7 (iPhone 8/X) chiếm khoảng 10,7% lưu lượng iOS.
  - Người cao tuổi nhiều khả năng dùng máy cũ con cháu để lại. Đây là **giả thuyết**, chưa có số liệu.
  - Hệ quả trực tiếp cho tech stack: Vite 8, Tailwind 4 và Next.js 16 đều đặt mặc định Safari ≥ 16.4 [72][80][81]. iOS 15.8 (≈ 1,9% lưu lượng web di động) nằm dưới mức này.

#### 3.5.1. Trình duyệt trong app (Zalo, Facebook)

Trình duyệt trong app của Zalo và Facebook trên Android có phải WebView hay Chrome Custom Tabs: **CHƯA XÁC MINH**, không tìm được tài liệu chính thức. Bảng dưới dựa trên khả năng của engine theo MDN BCD [48].

| Khả năng | Chrome Android | Android WebView | iOS Safari | iOS WKWebView |
|---|---|---|---|---|
| Service worker / offline | Có | Engine có hỗ trợ [48]; còn phụ thuộc app | Có | **Không** [48]. Chỉ có khi app khai báo App-Bound Domains [63], theo tài liệu bên thứ ba (qua kết quả tìm kiếm) |
| Cài PWA | Có | **Không**: WebView không có UI cài; theo danh sách W3C public-webview [64] (qua kết quả tìm kiếm) | Thêm vào Màn hình chính. Từ iOS 26, mặc định mở dưới dạng web app [65] | Không |
| `speechSynthesis` | Có | **Không** [48] | Có | Có [48] |
| Web Share (`navigator.share`) | Có | **Không** [48] | Có | Có theo BCD [48] (CHƯA kiểm thử) |
| `localStorage` | Có | Chỉ khi app bật `setDomStorageEnabled` (mặc định **false**) [62] | Có. Bị xoá sau 7 ngày không tương tác (ITP), trừ web app trên Màn hình chính [68] | Có. Độ bền dữ liệu phụ thuộc data store của app (CHƯA XÁC MINH) |
| `meta text-scale` | Chrome ≥ 146 | WebView ≥ 146 theo Intent to Ship [12] | Không | Không |

**Hệ quả**

- Thiết kế theo hướng **progressive enhancement**: mọi chức năng cốt lõi (hỏi, suy luận, kết quả) phải chạy được ngay khi không có service worker, không có storage và không có TTS.
- Nhận diện môi trường trong app để hiện băng gợi ý "Mở bằng Chrome/Safari để dùng khi không có mạng".
- Cách mở trình duyệt ngoài bằng `intent://` trên Android có chạy được trong Zalo không: **CHƯA XÁC MINH**.

#### 3.5.2. PWA trên iOS năm 2026

- **iOS/iPadOS 26:** mọi website thêm vào Màn hình chính đều mở như web app theo mặc định. Người dùng có thể tắt "Open as Web App" [65].
- **Từ iOS 16.4** [66]:
  - Web Push và Badging API dành cho web app đã thêm vào Màn hình chính.
  - Trình duyệt bên thứ ba cũng có thể "Add to Home Screen", nhưng cần entitlement riêng.
- **Không có** `beforeinstallprompt` (Safari: `false` [48]), nên phải tự làm hướng dẫn cài bằng hình ảnh.
- **Lưu trữ** [67][68]:
  - Quota mỗi origin tới 60% dung lượng ổ đĩa với trình duyệt, 15% với app nhúng WebView.
  - Web app trên Màn hình chính được đối xử như trình duyệt.
  - `navigator.storage.persist()` được cấp theo heuristic, ví dụ app đang mở từ Màn hình chính.
  - Web app trên Màn hình chính **được miễn** quy tắc xoá dữ liệu sau 7 ngày của ITP.
- **Safari 27.0** (2026-09-17) và **27.1** (2026-10-23) không có thay đổi lớn cho PWA. Safari 27.0 thêm Service Worker static routing API [69].

#### 3.5.3. Kỹ năng số của người cao tuổi Việt Nam

- **CHƯA XÁC MINH**: không tìm được nguồn sơ cấp về tỉ lệ dùng smartphone hay kỹ năng số theo độ tuổi ở Việt Nam. Trang của UNFPA Việt Nam trả lỗi 403/404; hạn mức WebSearch đã hết.
- Dữ kiện gián tiếp: khoảng 401.000 người cao tuổi dùng phụ đề cuộc gọi video của Zalo (Q2/2026) [61], cho thấy Zalo là kênh tiếp cận thực tế.
- Việc cần làm:
  - Tìm số liệu của GSO, UNFPA và HelpAge.
  - Quan trọng hơn: **kiểm thử với người dùng 60+ ở cả 3 miền** trước khi chốt UI và từ vựng.

### 3.6. Tech stack (tháng 10/2026)

#### 3.6.1. Phiên bản hiện hành

Phiên bản stable lấy từ npm registry ngày 2026-10-24 [82].

| Thành phần | Bản mới nhất | Ngày phát hành | Ghi chú quan trọng |
|---|---|---|---|
| Next.js | **16.4.3** | 2026-10-23 | Bản 16.0 ra 2025-10-21. Turbopack là bundler mặc định; trình duyệt tối thiểu Chrome 111 / Safari 16.4 [72] |
| React / React DOM | **19.3.1** | 2026-10-14 | React DOM client bản production chưa minify: 610 KiB, gzip 107 KiB (đo trực tiếp). Sau minify ước tính khoảng 55–60 KB gzip (**CHƯA đo**) |
| @serwist/next / @serwist/turbopack | 9.5.13 | 2026-10-04 | Hướng dẫn chính dành cho webpack. Bản Turbopack phục vụ service worker qua route handler [74]; chạy được với `output: 'export'` hay không: **CHƯA XÁC MINH** |
| Astro | **7.4.2** | 2026-10-21 | 6.0 ra 2026-03-10, 7.0 ra 2026-06-22: Vite 8, compiler Rust, Markdown processor mới [76]. Yêu cầu Node ≥ 22.23.4 |
| @astrojs/preact / @astrojs/react | 6.1.1 / 7.1.1 | 2026-10-21 | Peer `preact` ^10.6.5 hoặc ^11 |
| Preact | **10.29.8** / 11.0.2 | 2026-08-01 / 2026-10-23 | Bản 11.0.0 mới ra 2026-09-30. Đo gzip: core 4,8 KB, hooks 1,5 KB (bản 10.29.8); core 5,0 KB (bản 11.0.2) |
| @vite-pwa/astro | 1.2.0 | 2025-11-27 | **Peer astro chỉ tới ^5.** Issue #72 (Astro 6) và #74 (Astro 7) vẫn mở [77] |
| vite-plugin-pwa | 2.0.0 | 2026-10-03 | Peer Vite tới ^8; dùng Workbox 7.4.1 |
| workbox-build | 7.4.1 | 2026-05-04 | — |
| SvelteKit | **3.1.0** | 2026-10-14 | Bản 3.0 ra 2026-10-01 với nhiều breaking change; Node ≥ 22; TypeScript ≥ 6 [78] |
| Svelte / adapter-static | 5.57.2 / 4.0.0 | 2026-10-06 / 2026-10-01 | — |
| @vite-pwa/sveltekit | 1.1.0 | 2025-11-27 | Peer kit chỉ tới ^2, chưa hỗ trợ SvelteKit 3 |
| React Router | **8.5.0** | 2026-10-19 | Bản 8.0 ra 2026-06-17: phát hành major hằng năm; Node ≥ 22.22, React ≥ 19.2.7, Vite ≥ 7; chỉ ESM; prerender mặc định dùng Vite Environment API [79] |
| Vite | 8.3.5 | 2026-10-21 | `build.target` mặc định: chrome111, edge111, firefox114, safari16.4, ios16.4 [80] |
| Tailwind CSS | **4.3.3** | 2026-07-16 | Cần Chrome 111, **Safari 16.4**, Firefox 128 [81]. Theme dùng rem: `--spacing: 0.25rem`, `--text-base: 1rem` / 1.5 |
| TypeScript | **6.0.3** (khuyến nghị) / 7.0.2 | 2026-04-16 / 2026-07-08 | `@astrojs/check` peer TS ^5 hoặc ^6; `typescript-eslint` peer < 6.1. Hệ sinh thái chưa sẵn sàng cho TS 7 |
| Vitest | 5.0.5 | 2026-10-15 | — |
| Playwright | 1.64.1 | 2026-10-14 | — |
| axe-core / @axe-core/playwright | 4.14.0 | 2026-10-05 / 2026-10-15 | Rule WCAG 2.2 (`target-size`) **tắt mặc định**; phải bật bằng tag `wcag22aa` [84] |
| Lighthouse | 13.5.0 | 2026-09-18 | Giả lập "moto g power (2022)": viewport 412×823, DPR 1,75 [85] |
| @lhci/cli | 0.15.1 | **2025-06-25** | Đóng gói sẵn **lighthouse 12.6.1**, chưa phải 13 |
| MiniSearch / Fuse.js / FlexSearch / Orama / Pagefind | 7.2.0 / 7.5.0 / 0.8.212 / 3.1.18 / 1.5.2 | — | Xem 3.6.5 |
| React Aria Components / radix-ui / @base-ui/react / @ark-ui/react / bits-ui / shadcn CLI | 1.22.1 / 1.8.1 / 1.9.0 / 5.39.3 / 2.20.2 / 4.22.1 | 10/2026 | — |
| Node.js | **24.22.1 LTS** "Krypton" (bản current: 26.12.1) | 2026-10-20 | [71] |
| Trình duyệt | Chrome **156** stable (2026-10-20), Chrome 157 đang early stable (2026-10-21), nay ra bản mới mỗi 2 tuần [70]; Safari **27.1** (2026-10-23) [69]; Firefox 158.0.1 [71] | — | — |

#### 3.6.2. So sánh các phương án

| Tiêu chí | (a) Next.js 16 + static export + Serwist | (b) **Astro 7 + Preact/React islands** | (c) SvelteKit 3 + adapter-static | (d) React Router 8 prerender / Vite SPA |
|---|---|---|---|---|
| JS trên trang bệnh (máy Android yếu) | React DOM + runtime Next + RSC payload trên **mọi trang** | **0 KB mặc định** [75]; chỉ tải island cần thiết | 0 KB nếu đặt `csr = false` cho trang [78] | Hydrate toàn bộ React trên mọi trang |
| JS trên trang kiểm tra | React (~55–60 KB gzip, ước tính) + runtime | Preact khoảng 7 KB (core + hooks + jsx) + logic | Runtime Svelte nhỏ, code biên dịch theo từng component | React + runtime của router |
| Offline / PWA | Serwist: webpack hoặc Turbopack (cách route handler); với static export: CHƯA XÁC MINH | `@vite-pwa/astro` không hỗ trợ Astro 6/7 [77] → dùng Workbox 7.4 sau build, hoặc vite-plugin-pwa 2.0 trực tiếp | **Service worker có sẵn** (`$app/service-worker`, `$app/manifest`) [78] | vite-plugin-pwa 2.0 hoặc Workbox |
| Trang SEO tĩnh | Có, cần `generateStaticParams`. Không có ISR, image optimization mặc định, redirects/headers [73] | Có: content collections + Zod schema + `getStaticPaths` [75] | Có: `prerender = true` + `entries` [78] | Có với prerender (v8 mặc định); Vite SPA thuần thì yếu |
| Thư viện a11y | Đầy đủ nhất: React Aria, Radix, Base UI, Ark | Với React: như (a). Với Preact: không có thư viện headless chính thức → HTML gốc + mẫu APG | Bits UI 2.20; compiler Svelte có cảnh báo a11y | Như (a) |
| Mức trình duyệt tối thiểu | **Safari 16.4** (Next 16) [72] | Theo Vite target (mặc định 16.4) [80]; **hạ được xuống** | Theo Vite target | Theo Vite target |
| Hệ sinh thái / bảo trì | Lớn nhất; thay đổi nhiều qua mỗi major | Trung bình–lớn; 2 major trong năm 2026 | Nhỏ hơn; bản 3.0 mới 3 tuần, plugin chưa theo kịp | Lớn (React); major hằng năm |
| Hợp với luồng kiểu quiz | Tốt | Tốt (một island `client:load`) | Tốt | Tốt |

#### 3.6.3. Nhận định từng phương án

- **(a) Next.js 16.4**
  - Chế độ static export loại bỏ server actions, ISR, image optimization mặc định, rewrites, redirects và headers [73].
  - Đổi lại vẫn phải trả chi phí runtime React/Next trên 150–500 trang bệnh vốn chủ yếu là chữ.
  - Turbopack là bundler mặc định [72], làm việc tích hợp Serwist phức tạp hơn [74].
  - Mức trình duyệt tối thiểu Safari 16.4 [72] bỏ ngoài nhóm iPhone chạy iOS 15.8.
  - Chỉ hợp lý nếu đội ngũ đã thành thạo Next và chấp nhận các điểm trên.
- **(b) Astro 7.4 + islands**
  - Đúng hình dạng sản phẩm: nhiều trang nội dung tĩnh và **một** ứng dụng tương tác.
  - Content collections kiểm tra schema dữ liệu bệnh ngay lúc build [75].
  - Điểm yếu duy nhất là thiếu integration PWA được bảo trì [77]. Tự viết hook `astro:build:done` gọi `workbox-build` chỉ mất khoảng 30–50 dòng.
- **(c) SvelteKit 3.1**
  - Kỹ thuật tốt: `csr = false` cho trang bệnh, service worker có sẵn, compiler cảnh báo a11y.
  - Rủi ro thời điểm: bản 3.0 mới ra 2026-10-01 với hàng chục breaking change [78]; `@vite-pwa/sveltekit` chưa hỗ trợ.
  - Là **phương án dự phòng số 1**.
- **(d) React Router 8 / Vite SPA**
  - SPA thuần yếu về SEO.
  - Với prerender thì vẫn hydrate React trên mọi trang. Không có lợi thế so với (b).

#### 3.6.4. Styling, kiểm thử, CI

- **Tailwind CSS 4.3**
  - Theme dùng rem, nên hợp với cách scale bằng `:root` [81].
  - Nhưng lõi framework phụ thuộc Safari ≥ 16.4 [81]. Hai lựa chọn:
    1. CSS thuần với design token (custom property), độ phủ trình duyệt rộng nhất. **Khuyến nghị** vì UI chỉ có khoảng 10 loại màn hình.
    2. Tailwind 4.3, chấp nhận iOS 15.8 hiển thị suy giảm, tránh các utility phụ thuộc `color-mix()` hoặc `@property` cho phần tử quan trọng, và kiểm thử trên máy thật.
  - Dù chọn cách nào, cũng hạ `vite.build.target` (ví dụ thêm `safari15`/`ios15`) rồi kiểm thử.
- **Vitest 5.0**
  - Unit test cho engine suy luận, hàm bỏ dấu và schema của KB.
  - Thêm snapshot test cho các bộ câu trả lời mẫu (vignette).
- **Playwright 1.64**
  - Giả lập thiết bị (viewport, DPR, `isMobile`, `hasTouch`, locale, `colorScheme`, offline) [83].
  - **Không** giả lập CPU hay băng thông. Với Chromium phải dùng CDP; WebKit trên Windows/Linux không thay thế được iOS Safari thật.
  - Kịch bản kiểm thử:
    - Ma trận cỡ chữ: ×1 → ×1,75, kết hợp zoom 200%.
    - Ở 320 px: kiểm tra không có cuộn ngang.
    - Offline: kiểm tra service worker phục vụ được ứng dụng.
- **@axe-core/playwright 4.14**
  - Dùng `withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa'])`. Nếu thiếu `wcag22aa` thì rule `target-size` **không chạy** [84].
  - Thêm `wcag2aaa` để chạy `color-contrast-enhanced` (7:1).
  - Kiểm thử tự động không bắt được mọi lỗi [83], nên vẫn cần kiểm thử thủ công với TalkBack và VoiceOver.
- **Lighthouse**
  - LHCI 0.15.1 (bản cuối 06/2025) đóng gói Lighthouse 12.6.1. Có thể dùng nó cho assertion ngân sách, hoặc tự viết script gọi Lighthouse 13.5 qua Node API.
  - Đặt ngân sách theo bảng ở mục 2.
  - App không thu dữ liệu người dùng nên không có số liệu thực tế (RUM). Phải bù bằng kiểm thử lab trên **máy thật giá rẻ**: Galaxy A0x/A1x, OPPO A-series, iPhone 7/8.

#### 3.6.5. Tìm kiếm phía client không phân biệt dấu tiếng Việt

| Thư viện | Kích thước min+gzip (Bundlephobia) | Bỏ dấu tiếng Việt | Ghi chú |
|---|---|---|---|
| **MiniSearch 7.2.0** | **5,7 KiB** | Tự viết `processTerm` [86] | Inverted index; hỗ trợ prefix, fuzzy, boost theo field; serialize được index lúc build |
| Fuse.js 7.5.0 | 9,2 KiB | `ignoreDiacritics` từ 7.1.0 [87]. Ánh xạ **đ → d** chỉ có sau bản vá ngày 2026-04-02 [87] | Quét tuyến tính (Bitap). Đủ nhanh cho khoảng 500 mục; chịu lỗi gõ tốt |
| FlexSearch 0.8.212 | 16,4 KiB (bundle đầy đủ) | `normalize: true` = NFKD rồi bỏ U+0300–036F; **không xử lý đ** [88] | Nhanh, nhưng API phức tạp |
| Orama 3.1.18 | 23,8 KiB | Có tokenizer `vietnamese`, nhưng nhánh main đặt tiếng Việt là ngôn ngữ có dấu **mang nghĩa** (giữ dấu) [89]. Bảng bỏ dấu sẵn có chỉ phủ U+00C0–U+017F, không gồm U+1EA0–1EF9 [89] | Nặng nhất |
| Pagefind 1.5.2 | Index chia nhỏ, tải theo nhu cầu | Có UI tiếng Việt, không có stemming [90]. Có bỏ dấu không: **CHƯA XÁC MINH** | Hợp cho tìm toàn văn trên nhiều trang tĩnh |

**Khuyến nghị: MiniSearch 7.2.0**

- Index hai nhóm field:
  - Nhóm có dấu: `ten`, `tuKhoa`.
  - Nhóm không dấu: `tenKD`, `tuKhoaKD`. Trong `processTerm(term, fieldName)` lúc index, field kết thúc bằng `KD` thì đi qua `foldVi`.
- Lúc tìm, chạy hai lượt rồi gộp kết quả:
  - Truy vấn nguyên văn trên nhóm có dấu, boost ×2.
  - `foldVi(truy vấn)` trên nhóm không dấu.
  - Như vậy người gõ có dấu nhận kết quả chính xác hơn, người gõ "dau bung" vẫn tìm được.
- Thêm **từ điển đồng nghĩa và từ địa phương** lúc build, ví dụ "tiêu chảy / đi ngoài / đi cầu", "nôn / ói / mắc ói", "đau đầu / nhức đầu".
- Lưu ý: "ốm" nghĩa là "bệnh" ở miền Bắc nhưng là "gầy" ở miền Nam.

Hàm bỏ dấu `foldVi` (lưu ý NFD **không** tách "đ"; xem commit của Fuse.js [87]):

```ts
export function foldVi(s: string): string {
  return s
    .normalize('NFD')                 // tách dấu thanh và dấu phụ (kể cả input NFD từ bàn phím)
    .replace(/[̀-ͯ]/g, '')  // bỏ dấu kết hợp
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase();
}
```

Ghi chú: sau khi bỏ dấu, "hoà" và "hòa", "thuỷ" và "thủy" (vị trí dấu kiểu cũ và kiểu mới) trở thành giống nhau. Còn với so khớp có dấu, cần chuẩn hoá `NFC` cả dữ liệu lẫn truy vấn.

---

## 4. Khuyến nghị cho doctor-v

### 4.1. Nguyên tắc UX

1. **An toàn trước tiên.**
   - Màn đầu tiên hỏi dấu hiệu cấp cứu: đau ngực dữ dội, khó thở nặng, yếu hoặc liệt nửa người, co giật, chảy máu nhiều, lơ mơ.
   - Có dấu hiệu thì dừng ngay và hiện "Gọi 115 ngay" (`tel:115`), giống roadblock của Ada [25].
   - Nút "Gọi 115" có mặt ở cùng vị trí trên mọi màn hình (3.2.6) [2].
2. **Mỗi màn hình một câu hỏi.**
   - Tiêu đề chính là câu hỏi [28].
   - Câu ngắn, một ý, từ thông dụng; thuật ngữ đặt trong ngoặc.
   - Có nút "Cái này là gì?" mở rộng tại chỗ, kèm ảnh nếu cần [22][27].
3. **Ba dạng câu trả lời** [22]:
   - `single`: 3 nút hành động full-width cao ≥ 56 px: **Có / Không / Không rõ**. Bấm là chuyển câu.
   - `group_single`: danh sách lựa chọn lớn + "Tiếp tục".
   - `group_multiple`: checkbox lớn + "Không có cái nào" + "Tiếp tục".
   - "Không rõ" phải được lưu là `unknown`, không lưu thành `absent`.
4. **Không tự chuyển câu khi chọn radio** (3.2.2). Không đặt timer nào (2.2.1) [2].
5. **Back ở mọi màn hình** và nút back của trình duyệt hoạt động (mỗi câu một history entry). Có màn "Xem lại câu trả lời" trước khi xem kết quả [2][28].
6. **Tiến trình theo giai đoạn**: "Bước 2/4: Triệu chứng chính", kèm thời gian ước tính. Không hiển thị "câu x/y" [24].
7. **Mục tiêu độ dài**: dưới 20 câu hỏi, khoảng 3–5 phút. Mốc tham chiếu: Ada khoảng 29 câu, median 7 phút [30][31]. Dừng sớm khi đủ thông tin (tương tự `should_stop`) [22][23].
8. **Kết quả: mức xử trí lên đầu.**
   - 4 mức, mỗi mức gồm động từ, mốc thời gian, icon, chữ và màu (1.4.1).
   - Kèm danh sách "Đi khám ngay nếu…" [24][29].
9. **Danh sách bệnh**
   - 3–5 bệnh, dùng nhãn phù hợp tương đối, **không hiển thị %**.
   - Mỗi bệnh có "Vì sao gợi ý" và "Không phải chẩn đoán" [22][24][38].
10. **Kiểm tra cho ai?** Cho chọn "Bản thân" hoặc "Người thân" để đổi cách xưng hô. Ưu tiên câu không cần đại từ ("Có sốt không?").
11. **Thông số chữ và chạm**
    - Body 18 px, câu hỏi 24 px, line-height 1,5–1,6.
    - Tương phản chữ ≥ 7:1, tương phản UI ≥ 3:1.
    - Target ≥ 48 px, khoảng cách ≥ 8 px.
    - Không viết hoa toàn bộ (mục 2, mục 3.4).
12. **Nút "Aa" cố định** với 4 bước, xem trước, lưu cục bộ. Tôn trọng cỡ chữ của OS (thẻ meta `text-scale` + `-apple-system-body`). Kiểm thử ở ×1,75 kết hợp zoom 200% (mục 3.1.4).
13. **Nút "Nghe" cho từng câu hỏi và từng bệnh.** Dùng audio tạo sẵn; Web Speech chỉ khi máy có giọng `vi-*` (mục 3.4.3).
14. **Chạy tốt trong Zalo và Facebook.**
    - Không phụ thuộc service worker, storage hay TTS.
    - Có băng gợi ý "Mở bằng trình duyệt để dùng khi không có mạng / cài vào màn hình chính" (mục 3.5.1).
15. **Quyền riêng tư đọc được bằng mắt thường.**
    - Hiển thị câu "Câu trả lời chỉ lưu trên máy này".
    - Có nút "Xoá dữ liệu".
    - Không có tài khoản, không có analytics chứa dữ liệu cá nhân.
    - Máy thường dùng chung trong gia đình, nên phải hỏi trước khi lưu tiến trình.
16. **Lỗi nhập liệu:** nhận nhiều định dạng (ví dụ "67", "67 tuổi") và báo lỗi bằng chữ ngay cạnh ô nhập [3][2].
17. **Nghiên cứu người dùng:** mỗi vòng ít nhất 5 người từ 60 tuổi trở lên, có cả 3 miền, kiểm thử trên chính máy của họ và qua liên kết Zalo.

### 4.2. Quyết định tech stack

| Lớp | Lựa chọn (phiên bản) | Lý do |
|---|---|---|
| Framework | **Astro 7.4.x**, `output: 'static'` | Trang bệnh không có JS; content collections có Zod schema; SEO tĩnh [75][76] |
| UI tương tác | **Preact 10.29.x** qua @astrojs/preact 6.1.x; nâng lên Preact 11.x sau khi có thêm vài bản vá | Khoảng 7 KB gzip cho core + hooks + jsx (đo trực tiếp). Preact 11.0.0 mới 3 tuần tuổi |
| Phương án React | React 19.3 + React Aria Components 1.22, nếu cần widget phức tạp | Đổi lại khoảng 8–10 lần JS so với Preact (ước tính) |
| Component | **HTML gốc** (`button`, `fieldset`/`legend`, `details`, `dialog`, `progress`) theo mẫu APG | Ít JS, a11y có sẵn từ trình duyệt; không cần thư viện headless |
| Ngôn ngữ | **TypeScript 6.0.3** | Tương thích `@astrojs/check` và `typescript-eslint`; TS 7 chưa được hệ sinh thái hỗ trợ (mục 3.6.1) |
| Engine suy luận | Module TS thuần, không phụ thuộc framework. Chạy trên main thread; chuyển sang Web Worker nếu INP > 200 ms trên máy yếu | 500 bệnh × vài trăm triệu chứng là phép tính nhỏ |
| Knowledge base | JSON có schema, kiểm tra lúc build. Tải lười khi bắt đầu kiểm tra; được precache | — |
| Service worker | **workbox-build 7.4.1**, gọi trong hook `astro:build:done` (hoặc vite-plugin-pwa 2.0.0 trực tiếp). **Không** dùng `@vite-pwa/astro` 1.2.0 | Plugin này chỉ hỗ trợ astro ≤ 5 [77] |
| Chiến lược cache | Precache: app shell, trang kiểm tra, KB, font. Runtime stale-while-revalidate cho trang bệnh đã xem. Có nút "Tải toàn bộ để dùng offline" do người dùng chủ động bấm | Tránh precache hàng MB trên máy yếu |
| CSS | **CSS thuần với token** (custom property; dùng `rem` và container query). Tailwind 4.3.3 là phương án thay thế nếu chấp nhận mức tối thiểu Safari 16.4 | iOS 15.8 chiếm khoảng 4,7% lưu lượng iOS ở Việt Nam [56][81] |
| Build target | Hạ `vite.build.target` xuống để phủ Safari/iOS 15 rồi kiểm thử | Mặc định là safari16.4 [80] |
| Font | `@fontsource/be-vietnam-pro` 5.3.0 (400/600, subset latin + vietnamese) với fallback `system-ui` | Khoảng 66 KiB; dấu chồng ổn định (mục 3.4.1) |
| Tìm kiếm | **MiniSearch 7.2.0** + `foldVi` + từ điển đồng nghĩa và từ địa phương; index tạo lúc build | 5,7 KiB; có boost, prefix, fuzzy (mục 3.6.5) |
| TTS | Audio tạo lúc build bằng Google Cloud TTS (vi-VN Standard/WaveNet, trong hạn mức miễn phí) hoặc FPT.AI (sau khi xác minh điều khoản); Web Speech làm tăng cường | Không có dữ liệu người dùng rời khỏi máy (mục 3.4.3) |
| Kiểm thử | Vitest 5.0.x; Playwright 1.64.x; @axe-core/playwright 4.14.0 (bật `wcag22aa` và `wcag2aaa`); kiểm thử thủ công với TalkBack và VoiceOver | Mục 3.6.4 |
| CI hiệu năng | @lhci/cli 0.15.1 (Lighthouse 12.6.1) với ngân sách: trang bệnh JS ≤ 15 KB, trang kiểm tra ≤ 80 KB, LCP ≤ 2,5 s ở preset mobile. Chạy Lighthouse 13.5 định kỳ | — |
| Runtime | Node.js 24 LTS | Astro 7 yêu cầu Node ≥ 22.23.4 |
| HTML | `<html lang="vi">` (giúp TTS và trình đọc màn hình chọn đúng giọng); JSON-LD cho trang bệnh (cần nghiên cứu riêng) | — |

**Phương án dự phòng**

- **SvelteKit 3.x + adapter-static 4**, với `csr = false` cho trang bệnh và service worker có sẵn. Nên xét lại vào khoảng Q1/2027, khi hệ sinh thái đã theo kịp bản 3.

---

## 5. Câu hỏi mở và rủi ro

1. **Hiệu chuẩn xác suất.** Engine và KB chưa được kiểm định trên vignette hoặc ca bệnh thật ở Việt Nam. Trước khi có kiểm định: không hiển thị số; nhãn tương đối cũng phải được kiểm thử về mức độ hiểu.
2. **An toàn lâm sàng.**
   - Độ phủ của danh sách dấu hiệu cấp cứu, tỉ lệ triage quá mức và dưới mức chưa được đo.
   - Cần quy trình bác sĩ duyệt nội dung.
   - Phần mềm có thể bị xếp là thiết bị y tế (SaMD) tại Việt Nam hay không: xem báo cáo cùng dự án `docs/research/legal-regulatory.md` (Nghị định 98/2021/NĐ-CP). Tôi không kiểm chứng lại.
   - Hệ quả cho UX: cách mô tả, giao diện và nhãn kết quả ("Một số bệnh có thể gây ra…", "Không phải chẩn đoán") phải nhất quán với cách định vị sản phẩm là "thông tin sức khoẻ tham khảo".
3. **Pháp lý về dữ liệu.**
   - Theo `legal-regulatory.md`: Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 có hiệu lực từ 2026-01-01; dữ liệu sức khoẻ là dữ liệu nhạy cảm.
   - Mức rủi ro: xử lý trên thiết bị là thấp; analytics hoặc cookie theo dõi là cao; gửi văn bản tới API ở nước ngoài là cao.
   - Hệ quả cho UX và TTS:
     - Chỉ tạo audio lúc build từ nội dung cố định.
     - **Không** gọi TTS hay API ngoài với nội dung do người dùng nhập.
     - Không dùng analytics có định danh.
     - Lưu cục bộ phải có đồng ý và nút xoá.
4. **Trình duyệt trong app của Zalo và Facebook.** Loại engine và mức hỗ trợ service worker, storage, audio autoplay và `intent://` đều **CHƯA XÁC MINH**. Cần thử trên máy thật: Samsung A-series, OPPO A-series, Xiaomi Redmi, iPhone 7/8/11, mở bằng cả Zalo Android và Zalo iOS.
5. **TTS trên Android.** Có giọng vi-VN trong TTS engine mặc định của từng hãng hay không: **CHƯA XÁC MINH**. Điều khoản phân phối lại audio của Google, Azure, FPT và Viettel: **CHƯA XÁC MINH**. Giá của FPT và Viettel: **CHƯA XÁC MINH**.
6. **Máy cũ.** iOS 15.8 không đạt mức Safari 16.4 mà Vite 8, Tailwind 4 và Next 16 mặc định nhắm tới; Safari 15 cũng không có container query. Cần quyết định có hỗ trợ nhóm này không và kiểm thử trên máy thật.
7. **Phiên bản quá mới.** Preact 11 (3 tuần), SvelteKit 3 (3 tuần), Astro 7 (4 tháng), React Router 8 (4 tháng). Nên khoá phiên bản và cập nhật có kiểm soát (ví dụ dùng Renovate).
8. **Công cụ bị bỏ ngỏ.** `@vite-pwa/astro` chưa hỗ trợ Astro 6/7 [77]. `@lhci/cli` dừng ở 06/2025 (Lighthouse 12.6.1). TypeScript 7 chưa được Astro và `typescript-eslint` hỗ trợ.
9. **Thẻ meta `text-scale`.** Có tác dụng phụ: tắt text autosizing, và đã có báo cáo gây cuộn ngang [18]. Cách lấy tỉ lệ Dynamic Type trên iOS ở mục 3.1.4 cần kiểm thử thực tế.
10. **Số liệu người cao tuổi Việt Nam.** Chưa có nguồn về kỹ năng số, numeracy hay mức độ dùng smartphone theo tuổi. Từ vựng vùng miền cho các triệu chứng cần thu thập có hệ thống.
11. **SEO cho nội dung y tế.** Nội dung sức khoẻ cần thể hiện chuyên môn và người duyệt, đồng thời cần schema markup. Chưa nghiên cứu trong báo cáo này.
12. **Ngân sách dung lượng KB.** Kích thước JSON knowledge base cho 500 bệnh chưa biết; cần đặt mức trần (ví dụ ≤ 300 KB gzip) và đo.

---

## 6. Tài liệu tham khảo

Tất cả nguồn truy cập ngày 2026-10-24.

**Khả năng tiếp cận và người cao tuổi**

1. W3C WAI. *Older Users and Web Accessibility: Meeting the Needs of Ageing Web Users*. Cập nhật 2024-03-04. https://www.w3.org/WAI/older-users/ (đọc từ nguồn https://github.com/w3c/wai-older-users), truy cập 2026-10-24.
2. W3C. *Web Content Accessibility Guidelines (WCAG) 2.2*. W3C Recommendation 2023-10-05, cập nhật 2024-12-12. https://www.w3.org/TR/WCAG22/ (văn bản tiêu chí đọc từ https://github.com/w3c/wcag/tree/main/guidelines/sc), truy cập 2026-10-24.
3. Kane L. *Usability for Older Adults: Challenges and Changes*. NN/g, 2019-09-08. https://www.nngroup.com/articles/usability-for-senior-citizens/, truy cập 2026-10-24.
4. Harley A. *Touch Targets on Touchscreens*. NN/g, 2019-05-05. https://www.nngroup.com/articles/touch-target-size/, truy cập 2026-10-24.
5. Nielsen J. *Lower-Literacy Users: Writing for a Broad Consumer Audience*. NN/g, 2005-03-13. https://www.nngroup.com/articles/writing-for-lower-literacy-users/, truy cập 2026-10-24.
6. Apple. *Human Interface Guidelines: Accessibility*. https://developer.apple.com/design/human-interface-guidelines/accessibility, truy cập 2026-10-24.
7. Apple. *Human Interface Guidelines: Typography*. https://developer.apple.com/design/human-interface-guidelines/typography, truy cập 2026-10-24.
8. Android Developers. *Make apps more accessible*. https://developer.android.com/guide/topics/ui/accessibility/apps, truy cập 2026-10-24.
9. Material Web. *Material 3 typescale tokens (v0_192)*. https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-typescale.scss, truy cập 2026-10-24.
10. Android Developers. *Android 14 features: Non-linear font scaling to 200%*. https://developer.android.com/about/versions/14/features, truy cập 2026-10-24.
11. Chrome for Developers. *Chrome 146 release notes* (stable 2026-03-10). https://developer.chrome.com/release-notes/146, truy cập 2026-10-24.
12. blink-dev. *Intent to Ship: meta name="text-scale"* (2026-01-16). https://groups.google.com/a/chromium.org/g/blink-dev/c/0yp2ygJK5HE, truy cập 2026-10-24.
13. web-platform-dx. *developer-signals #517: <meta name="text-scale">*. https://github.com/web-platform-dx/developer-signals/issues/517, truy cập 2026-10-24.
14. ChromeStatus API. *Features: text-scale*. https://chromestatus.com/api/v0/features?q=text-scale, truy cập 2026-10-24.
15. Tumath J. *Try text scaling support in Chrome Canary* (2026-01-27). https://joshtumath.uk/posts/2026-01-27-try-text-scaling-support-in-chrome-canary, truy cập 2026-10-24.
16. Tumath J. *Let's fix the web's text size* (2026-07-02). https://www.joshtumath.uk/posts/2026-07-02-lets-fix-the-webs-text-size/, truy cập 2026-10-24.
17. Roselli A. *Honoring Mobile OS Text Size* (02/2026). https://adrianroselli.com/2026/02/honoring-mobile-os-text-size.html, truy cập 2026-10-24.
18. Matuzović M. *A new meta tag for respecting text scaling on mobile* (2026-02-06). https://matuzo.at/blog/2026/text-scaling-meta-tag, truy cập 2026-10-24.
19. Appt. *Font size statistics* (cập nhật 2023-01-27). https://appt.org/en/stats/font-size, truy cập 2026-10-24.
20. W3C CSSWG. *CSS Conditional Rules Level 5* (đơn vị tương đối trong container query) và *Media Queries Level 4* (đơn vị tương đối trong media query). https://drafts.csswg.org/css-conditional-5/ và https://drafts.csswg.org/mediaqueries-4/ (đọc từ https://github.com/w3c/csswg-drafts), truy cập 2026-10-24.
21. 9to5Google. *Google Global Accessibility Awareness Day 2025* (2025-05-15). https://9to5google.com/2025/05/15/google-global-accessibility-awareness-day-2025/ (qua kết quả tìm kiếm), truy cập 2026-10-24.

**Symptom checker**

22. Infermedica. *Engine API v3: /diagnosis*. https://developer.infermedica.com/docs/v3/diagnosis, truy cập 2026-10-24.
23. Infermedica Help Center. *Why is the interview in my implementation so long?* https://help.infermedica.com/why-is-the-interview-in-my-implementation-so-long, truy cập 2026-10-24.
24. Infermedica. *Infermedica for health systems* (brochure, ảnh màn hình ©2024). https://contact.infermedica.com/hubfs/solutions/infermedica-for-health-systems.pdf, truy cập 2026-10-24.
25. Ada Health. *Ada Assess: Instructions for Use*, Version 9 (2026-04-20). https://ada.com/ifu/ada-assess/, truy cập 2026-10-24.
26. Ada Health. *Ada Assess: Instructions for Use*, Version 3 (2023-11-13). https://ada.com/ifu/ada-assess/3/, truy cập 2026-10-24.
27. Healthify He Puna Waiora. *Ada: check your health* (đánh giá ngày 2024-08-15). https://healthify.nz/apps/a/ada-check-your-health, truy cập 2026-10-24.
28. NHS England. *NHS digital service manual: Question pages* (cập nhật 06/2026). https://service-manual.nhs.uk/design-system/patterns/question-pages, truy cập 2026-10-24.
29. NHS England. *111 online flow diagram 2024/25*. https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2025/05/111-online-flow-diagram-2024-25.pdf, truy cập 2026-10-24.
30. Hammoud M, Douglas S, Darmach M, et al. *Evaluating the Diagnostic Performance of Symptom Checkers: Clinical Vignette Study*. JMIR AI 2024;3:e46875. doi:10.2196/46875. https://pmc.ncbi.nlm.nih.gov/articles/PMC11091811/ (tác giả là nhân viên Avey), truy cập 2026-10-24.
31. Knitza J, Muehlensiepen F, Ignatyev Y, et al. *Patient's Perception of Digital Symptom Assessment Technologies in Rheumatology: Results From a Multicentre Study*. Front Public Health 2022;10:844669. doi:10.3389/fpubh.2022.844669. https://cris.fau.de/publications/271007246, truy cập 2026-10-24.
32. VentureBeat. *K Health raises $25 million to expand its self-diagnostic platform* (2018-12-17). https://venturebeat.com/2018/12/17/k-health-raises-25-million-to-expand-its-self-diagnostic-platform, truy cập 2026-10-24.
33. *Designing a Tablet-Based Software App for Mapping Bodily Symptoms: Usability Evaluation and Reproducibility Analysis*. JMIR mHealth uHealth 2018;6(5):e127. https://mhealth.jmir.org/2018/5/e127/ (qua kết quả tìm kiếm), truy cập 2026-10-24.

**Truyền đạt rủi ro**

34. Gigerenzer G, Hoffrage U. *How to improve Bayesian reasoning without instruction: Frequency formats*. Psychol Rev 1995;102(4):684–704. doi:10.1037/0033-295X.102.4.684, truy cập 2026-10-24 (metadata).
35. Gigerenzer G, Gaissmaier W, Kurz-Milcke E, Schwartz LM, Woloshin S. *Helping Doctors and Patients Make Sense of Health Statistics*. Psychol Sci Public Interest 2007;8(2):53–96. doi:10.1111/j.1539-6053.2008.00033.x, truy cập 2026-10-24 (metadata).
36. Galesic M, Garcia-Retamero R, Gigerenzer G. *Using icon arrays to communicate medical risks: Overcoming low numeracy*. Health Psychol 2009;28(2):210–216. doi:10.1037/a0014474, truy cập 2026-10-24 (metadata).
37. Zipkin DA, Umscheid CA, Keating NL, et al. *Evidence-Based Risk Communication: A Systematic Review*. Ann Intern Med 2014;161(4):270–280. doi:10.7326/M14-0295, truy cập 2026-10-24 (metadata và tóm tắt).
38. Knapp P, Raynor DK, Berry DC. *Comparison of two methods of presenting risk information to patients about the side effects of medicines*. Qual Saf Health Care 2004;13(3):176–180. doi:10.1136/qshc.2003.009076. https://pmc.ncbi.nlm.nih.gov/articles/PMC1743828/, truy cập 2026-10-24.
39. Garcia-Retamero R, Cokely ET. *Designing Visual Aids That Promote Risk Literacy: A Systematic Review of Health Research and Evidence-Based Design Heuristics*. Hum Factors 2017;59(4):582–627. doi:10.1177/0018720817690634, truy cập 2026-10-24 (metadata).
40. Trevena LJ, Zikmund-Fisher BJ, Edwards A, et al. *Presenting quantitative information about decision outcomes: a risk communication primer for patient decision aid developers*. BMC Med Inform Decis Mak 2013;13(Suppl 2):S7. doi:10.1186/1472-6947-13-S2-S7, truy cập 2026-10-24 (metadata).
41. Spiegelhalter D. *Risk and Uncertainty Communication*. Annu Rev Stat Appl 2017;4:31–60. doi:10.1146/annurev-statistics-010814-020148, truy cập 2026-10-24 (metadata).
42. Reyna VF, Nelson WL, Han PK, Dieckmann NF. *How numeracy influences risk comprehension and medical decision making*. Psychol Bull 2009;135(6):943–973. doi:10.1037/a0017327, truy cập 2026-10-24 (metadata).
43. Garcia-Retamero R, Galesic M, Gigerenzer G. *Do icon arrays help reduce denominator neglect?* Med Decis Making 2010;30(6):672–684. doi:10.1177/0272989X10369000 (qua kết quả tìm kiếm), truy cập 2026-10-24.

**Typography và TTS**

44. Fontsource API. https://api.fontsource.org/v1/fonts/{id} và https://api.fontsource.org/v1/variable/{id}, truy cập 2026-10-24.
45. Google Fonts CSS2 API (đo woff2 với UA Chrome 146). https://fonts.googleapis.com/css2, truy cập 2026-10-24.
46. google/fonts repository (TTF, METADATA.pb). https://github.com/google/fonts, truy cập 2026-10-24.
47. Trương D. *Vietnamese Typography* (ấn bản 2), chương *Design Challenges*. https://vietnamesetypography.com/ và https://vietnamesetypography.com/design-challenges/, truy cập 2026-10-24.
48. MDN. *browser-compat-data* (api/SpeechSynthesis, api/Navigator.share, api/ServiceWorkerContainer, api/Window.localStorage, api/BeforeInstallPromptEvent, css/at-rules/container, css/types/length). https://github.com/mdn/browser-compat-data, truy cập 2026-10-24.
49. Chromium. *network_speech_synthesis/mv3/manifest.json*. https://github.com/chromium/chromium/blob/main/chrome/browser/resources/network_speech_synthesis/mv3/manifest.json, truy cập 2026-10-24.
50. Microsoft Support. *Appendix A: Supported languages and voices*. https://support.microsoft.com/en-us/windows/appendix-a-supported-languages-and-voices-4486e345-7730-53da-fcfe-55cc64300f01, truy cập 2026-10-24.
51. Apple. *iOS Feature Availability*. https://www.apple.com/ios/feature-availability/, truy cập 2026-10-24.
52. Google Cloud. *Text-to-Speech: Supported voices and languages* và *Pricing*. https://cloud.google.com/text-to-speech/docs/list-voices-and-types và https://cloud.google.com/text-to-speech/pricing, truy cập 2026-10-24.
53. Microsoft Learn. *Language and voice support for the Speech service* (tab TTS). https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts, truy cập 2026-10-24.
54. Microsoft. *Azure Retail Prices API* (Azure Speech, southeastasia). https://prices.azure.com/api/retail/prices, truy cập 2026-10-24.
55. FPT.AI. *Hướng dẫn chuyển văn bản thành giọng đọc bằng FPT.AI Voicemaker* (2026-01-10). https://fpt.ai/vi/bai-viet/huong-dan-chuy-van-ban-thanh-giong-doc-bang-fptai-voicemaker/, truy cập 2026-10-24.

**Bối cảnh Việt Nam và nền tảng**

56. StatCounter Global Stats. *Viet Nam, 09/2026*: mobile OS, hãng máy, loại thiết bị, trình duyệt di động, phiên bản Android, phiên bản iOS. https://gs.statcounter.com/os-market-share/mobile/viet-nam ; https://gs.statcounter.com/vendor-market-share/mobile/viet-nam ; https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/viet-nam ; https://gs.statcounter.com/browser-market-share/mobile/viet-nam ; https://gs.statcounter.com/os-version-market-share/android/mobile-tablet/viet-nam ; https://gs.statcounter.com/os-version-market-share/ios/mobile-tablet/viet-nam, truy cập 2026-10-24.
57. DataReportal (Kepios). *Digital 2026: Vietnam* (2025-11-08). https://datareportal.com/reports/digital-2026-vietnam, truy cập 2026-10-24.
58. Counterpoint Research. *Vietnam Smartphone Shipments Decline in Q1 2025* (2025-05-13). https://counterpointresearch.com/en/insights/vietnam-smartphone-market-q1-2025, truy cập 2026-10-24.
59. TelecomLead (số liệu Omdia). *Vietnam Smartphone Market Q2 2026* (2026-08-27). https://telecomlead.com/smart-phone/vietnam-smartphone-market-q2-2026-samsung-leads-with-28-as-xiaomi-and-oppo-gain-on-apple-127483, truy cập 2026-10-24.
60. Russell A. *The Performance Inequality Gap, 2026* (2025-11-24). https://infrequently.org/2025/11/performance-inequality-gap-2026/, truy cập 2026-10-24.
61. VietnamPlus. *Zalo có 81,3 triệu người dùng hàng tháng* (2026-07-30). https://www.vietnamplus.vn/zalo-co-813-trieu-nguoi-dung-hang-thang-post1127226.vnp, truy cập 2026-10-24.
62. Android Developers. *WebSettings#setDomStorageEnabled*. https://developer.android.com/reference/android/webkit/WebSettings#setDomStorageEnabled(boolean), truy cập 2026-10-24.
63. WebKit. *App-Bound Domains* (2020-06-26). https://webkit.org/blog/10882/app-bound-domains/, truy cập 2026-10-24.
64. W3C public-webview mailing list (03/2024). https://lists.w3.org/Archives/Public/public-webview/2024Mar/0003.html (qua kết quả tìm kiếm), truy cập 2026-10-24.
65. WebKit. *News from WWDC25: Web technology coming this fall in Safari 26 beta*. https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/, truy cập 2026-10-24.
66. WebKit. *Web Push for Web Apps on iOS and iPadOS* (2023-02-16). https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/, truy cập 2026-10-24.
67. WebKit. *Updates to Storage Policy* (2023-08-10). https://webkit.org/blog/14403/updates-to-storage-policy/, truy cập 2026-10-24.
68. WebKit. *Tracking Prevention in WebKit*. https://webkit.org/tracking-prevention/, truy cập 2026-10-24.
69. WebKit. *WebKit Features for Safari 27.0* (2026-09-17) và *Safari 27.1* (2026-10-23). https://webkit.org/blog/18325/webkit-features-for-safari-27-0/ và https://webkit.org/blog/18486/webkit-features-for-safari-27-1/, truy cập 2026-10-24.
70. ChromiumDash (lịch phát hành và milestone). https://chromiumdash.appspot.com/, truy cập 2026-10-24.
71. Mozilla product-details và Node.js release index. https://product-details.mozilla.org/1.0/firefox_versions.json và https://nodejs.org/dist/index.json, truy cập 2026-10-24.

**Tech stack**

72. Vercel. *Next.js 16* (2025-10-21). https://nextjs.org/blog/next-16, truy cập 2026-10-24.
73. Vercel. *Next.js: How to create a static export* (cập nhật 2026-08-09). https://nextjs.org/docs/app/guides/static-exports, truy cập 2026-10-24.
74. Serwist. *Next.js: Getting started* và *Turbopack*. https://serwist.pages.dev/docs/next/getting-started và https://serwist.pages.dev/docs/next/turbo, truy cập 2026-10-24.
75. Astro. *Islands architecture* và *Content collections*. https://docs.astro.build/en/concepts/islands/ và https://docs.astro.build/en/guides/content-collections/, truy cập 2026-10-24.
76. Astro. *CHANGELOG* (7.0.0). https://github.com/withastro/astro/blob/main/packages/astro/CHANGELOG.md, truy cập 2026-10-24.
77. vite-pwa/astro. *Issues #72 (Astro 6 peer dependency range blocks installation) và #74 (Astro 7 support)*. https://github.com/vite-pwa/astro/issues, truy cập 2026-10-24.
78. Svelte. *SvelteKit: Service workers*, *Page options*, *CHANGELOG 3.0.0*. https://svelte.dev/docs/kit/service-workers ; https://svelte.dev/docs/kit/page-options ; https://github.com/sveltejs/kit/blob/main/packages/kit/CHANGELOG.md, truy cập 2026-10-24.
79. Remix/Shopify. *React Router CHANGELOG v8.0.0* (2026-06-17). https://github.com/remix-run/react-router/blob/main/CHANGELOG.md, truy cập 2026-10-24.
80. Vite. *Build Options* (v8.3.4). https://vite.dev/config/build-options, truy cập 2026-10-24.
81. Tailwind Labs. *Compatibility* và `theme.css` trong gói tailwindcss@4.3.3. https://tailwindcss.com/docs/compatibility, truy cập 2026-10-24.
82. npm registry (phiên bản, ngày phát hành, peerDependencies, engines). https://registry.npmjs.org/, truy cập 2026-10-24.
83. Microsoft. *Playwright: Emulation* và *Accessibility testing*. https://playwright.dev/docs/emulation và https://playwright.dev/docs/accessibility-testing, truy cập 2026-10-24.
84. Deque. *axe-core rule descriptions (4.14)* và *API (tags)*. https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md và https://github.com/dequelabs/axe-core/blob/develop/doc/API.md, truy cập 2026-10-24.
85. Google. *Lighthouse: core/config/constants.js*. https://github.com/GoogleChrome/lighthouse/blob/main/core/config/constants.js, truy cập 2026-10-24.
86. Luca Ongaro. *MiniSearch README*. https://github.com/lucaong/minisearch, truy cập 2026-10-24.
87. Kiro Risk. *Fuse.js CHANGELOG* và commit 5a01f29 (đ/Đ không tách được bằng NFD). https://github.com/krisk/Fuse/blob/main/CHANGELOG.md, truy cập 2026-10-24.
88. Nextapps. *FlexSearch: Encoder*. https://github.com/nextapps-de/flexsearch/blob/master/doc/encoder.md, truy cập 2026-10-24.
89. Orama. *tokenizer/languages.ts, diacritics.ts* (nhánh main). https://github.com/oramasearch/orama/tree/main/packages/orama/src/components/tokenizer, truy cập 2026-10-24.
90. CloudCannon. *Pagefind: Multilingual search*. https://pagefind.app/docs/multilingual/, truy cập 2026-10-24.
91. Bundlephobia API (kích thước min+gzip). https://bundlephobia.com/, truy cập 2026-10-24.
