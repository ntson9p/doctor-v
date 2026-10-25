# Biên bản lượt R, Giai đoạn 3 lô 1: quy tắc, dấu hiệu nguy hiểm và nguồn

- Phạm vi: 3 triệu chứng chính mới (Chóng mặt, Ngất – suýt ngất, Hồi hộp). Gồm 9 nguồn mới, 15 quy tắc mới, 4 quy tắc được mở rộng phạm vi, các quy tắc không ghi phạm vi, nhóm câu hỏi và câu chữ của dấu hiệu lô 1.
- Người thực hiện: `agent:pass-r`. Ngày: 2026-10-25.
- Không sửa `knowledge/conditions/` và các bản nháp khác trong `knowledge/drafts/`. Không đọc bộ ca giữ kín.
- `npm run kb:check`:
  - trước: 0 lỗi, 29 cảnh báo, trong đó 17 cảnh báo nguồn chưa kiểm tra;
  - sau: **0 lỗi, 10 cảnh báo**, không còn cảnh báo nguồn chưa kiểm tra (chi tiết ở mục 8).
- `npm run eval -- --set dev`: kết quả **giống hệt** trước và sau, tới từng ca (mục 8).
- Mọi thay đổi vẫn **cần bác sĩ duyệt** trước khi phát hành.

---

## 1. Cách làm và hạn chế

**Trang NHS.** Tải bằng curl rồi trích chữ, để ghi đúng từng mục "Call 999", "A&E", "111", "GP". Công cụ WebFetch chỉ trả bản tóm tắt.

**ESC 2018.**
- Đọc được phần chữ trên OUP (academic.oup.com) qua WebFetch.
- Các bảng trên OUP là ảnh. Bảng 6, bảng 7 và khuyến cáo xử trí ở khoa cấp cứu được đọc trong **bản dịch chính thức tiếng Tây Ban Nha**: Rev Esp Cardiol 2018;71(10):837.e1–e92, tr. 11–13.
- Bản tiếng Anh đăng lại trên Rev Esp Cardiol chỉ có trang đầu.

**GRACE-3.** Toàn văn trên Wiley trả lỗi 403 và bài không có trong PMC. Đã đối chiếu nguyên văn 15 khuyến cáo trên trang chính thức của SAEM và tờ tóm tắt của SAEM. Chưa đọc được phần thân bài.

**NICE.**
- nice.org.uk, cks.nice.org.uk và api.nice.org.uk đều trả lỗi 403 với truy cập tự động.
- Bản trên NCBI Bookshelf bị chặn bằng reCAPTCHA; trang Europe PMC trả lỗi 403.
- Theo yêu cầu, **không** dùng dịch vụ đọc hộ. Lượt R lần trước đã dùng r.jina.ai cho NICE; lần này không dùng.
- Vì vậy CG109 và NG128 **chưa xác minh được**.

**3312/QĐ-BYT (2024).** Mở lại toàn văn trên luatvietnam.vn và đọc bài 1 (đột quỵ nhẹ và cơn thiếu máu não thoáng qua) và bài 2 (nhồi máu não cấp).

**Nguồn Việt Nam khác.** Không tìm thấy hướng dẫn của Bộ Y tế về ngất, hồi hộp hay ngộ độc khí CO; tìm 2 lần bằng WebSearch.

**Khác.**
- Đã dùng **5 lần** WebSearch.
- Tệp tải về chỉ nằm trong thư mục tạm. Không chạy mã nào từ đó và không chép tệp nào vào repo.
- Kiểm tra hành vi các quy tắc mới bằng 19 phiên mô phỏng trong thư mục tạm, không ghi vào repo.

---

## 2. Sổ nguồn

### 2.1 Chín nguồn mới

| Nguồn | Kết quả | Phiên bản, thay đổi |
|---|---|---|
| esc-syncope-2018 | ✓ đã xác minh | Xuất bản trực tuyến 19/3/2018, Eur Heart J 39(21):1883–1948. Có 1 đính chính (ehy306). Trang ESC (25/10/2026): bản 2018 vẫn là hướng dẫn ngất hiện hành. Thêm `pmid`, `supersedes` (bản 2009). Giấy phép L3 đúng. **Lưu ý cấp phép:** trang ESC ghi rằng dùng nội dung hướng dẫn ESC trong phần mềm hoặc thuật toán, kể cả chỉ trích dẫn, cần thỏa thuận cấp phép. Người bảo trì cần xem xét (ghi trong `license_note`). |
| nice-cg109 | ✗ chưa xác minh | Siêu dữ liệu Europe PMC (PMID 32207891): tên hiện hành không đổi, cập nhật tháng 11/2023 (phần hạ huyết áp tư thế). Nội dung khuyến cáo chỉ thấy qua bản tóm tắt của RCEM (01/2012, nguồn thứ cấp). **Đã bỏ khỏi mọi quy tắc và khỏi triệu chứng chính Ngất.** |
| grace3-dizziness-2023 | ✓ (qua trang SAEM) | Acad Emerg Med 2023;30(5):442–486, PMID 37166022. **Đổi giấy phép L2 → L3**: bài đọc miễn phí nhưng không có giấy phép mở. |
| nhs-dizziness | ✓ | Rà soát 21/4/2023 (hạn 21/4/2026, chưa có bản mới). **Trang không có mục "Call 999" hay "A&E"**: nhìn đôi, tê yếu tay chân chỉ được khuyên khám không khẩn. Đã bỏ khỏi `rf_dizziness_central_signs`. |
| nhs-fainting | ✓ | Rà soát 17/8/2026. |
| nhs-heart-palpitations | ✓ | Rà soát 17/3/2026. |
| nhs-carbon-monoxide-poisoning | ✓ | Rà soát 16/12/2025. |
| nhs-hypoglycaemia | ✓ | Rà soát 03/8/2023 (hạn 03/8/2026, chưa có bản mới). |
| nice-ng128 | ✗ chưa xác minh | Europe PMC (PMID 31211538): xuất bản 01/5/2019; bản Bookshelf mới nhất ghi 13/4/2022. Chưa đối chiếu được khuyến cáo về thời hạn đánh giá sau cơn thiếu máu não thoáng qua. **Đã bỏ khỏi `rf_transient_neuro`.** |

**Danh sách trên các trang NHS** (ghi đầy đủ trong `notes_vi` từng nguồn):

- **Fainting**
  - **Call 999 if someone:**
    - không thở;
    - không đánh thức được trong 1 phút;
    - chưa hồi phục hoàn toàn, hoặc khó nói, khó cử động;
    - đau ngực, hoặc tim đập thình thịch, rung, không đều;
    - bị thương nặng trước hoặc sau khi ngất;
    - co giật;
    - ngất khi đang tập luyện;
    - ngất khi đang nằm.
  - Không tự lái xe đến cấp cứu.
  - **See a GP:** mọi người đã ngất.
- **Heart palpitations**
  - **Call 999 or go to A&E:** đang hồi hộp và cơn không hết, hoặc kèm đau ngực, khó thở, choáng hoặc ngất.
  - Nếu các triệu chứng đó đã hết: khám khẩn hoặc gọi 111.
  - **See a GP:** cơn tái lại, kéo dài hơn vài phút, có bệnh tim, hoặc gia đình có bệnh tim.
- **Carbon monoxide poisoning**
  - Ra ngoài, ngừng thiết bị phát khí, xin tư vấn y tế sớm.
  - **Call 111:** nghĩ mình có triệu chứng ngộ độc.
  - **Call 999 or go to A&E:** đã phơi nhiễm kèm khó thở, đột ngột lú lẫn, mất ý thức, mệt yếu, đau ngực hoặc đau cơ.
  - Người ngộ độc khí CO cần được kiểm tra ở bệnh viện.
- **Low blood sugar**
  - **Tự xử trí:** ăn hoặc uống ngay một cốc nhỏ nước hoa quả hoặc nước ngọt có đường (hoặc 5 viên glucose, 4 viên kẹo dẻo lớn, 2 tuýp gel glucose). Đo lại sau 10–15 phút. Chưa lên thì lặp lại và đo lại sau 10 phút. Đỡ rồi thì ăn bánh hoặc bữa ăn.
  - Bất tỉnh: không cho ăn uống, tiêm glucagon nếu có.
  - **Call 999:** đáp ứng không bình thường hoặc bất tỉnh, kèm một trong các điều sau: không có glucagon; đã tiêm glucagon mà không hồi phục trong 10 phút; đã uống rượu.
  - **See a GP (không khẩn):** hay bị, từng bị nặng, bị về đêm.

### 2.2 Nguồn mới thêm (2)

| Nguồn | Nội dung | Dùng cho |
|---|---|---|
| nhs-vertigo | Rà soát 02/5/2023, giấy phép L1. **Call 999 or go to A&E:** chóng mặt quay kèm nhìn đôi hoặc mất thị lực, nghe kém, khó nói, yếu, tê hoặc châm chích tay chân. **Khám khẩn hoặc gọi 111:** kèm đau đầu dữ dội, nôn hoặc rất buồn nôn, sốt hoặc rét run. | `rf_dizziness_central_signs`, quy tắc mới `rf_dizziness_fever_or_severe_headache`, triệu chứng chính Chóng mặt |
| nhs-tia | Rà soát 28/6/2023, giấy phép L1. Gọi 999 ngay kể cả khi triệu chứng đã hết. Cần khám chuyên khoa trong 24 giờ kể từ khi khởi phát. Nếu từng bị mà chưa đi khám: hẹn khám khẩn. | `rf_transient_neuro` |

### 2.3 Nguồn cũ được mở lại, bổ sung ghi chú

- **byt-qd-3312-2024**, bài 1 (đột quỵ nhẹ và cơn thiếu máu não thoáng qua):
  - định nghĩa: triệu chứng hết trong 24 giờ, do thiếu máu não **hoặc võng mạc**;
  - dấu hiệu dễ bỏ sót gồm chóng mặt và thất điều;
  - cần phân biệt với ngất và hạ glucose máu;
  - nguy cơ tái phát sớm rất cao; điều trị ngay, tối ưu trong 24 giờ đầu, có thể đến 7 ngày đầu.
- **byt-qd-3312-2024**, bài 2 (nhồi máu não cấp):
  - nhìn đôi, mất thị lực một hoặc hai mắt, thất điều, chóng mặt (hiếm khi đơn độc);
  - viêm mê đạo có thể nhầm với đột quỵ tiểu não;
  - cần vận chuyển nhanh đến cơ sở điều trị được đột quỵ.
- **nhs-stroke-symptoms:** "Call 999 now" khi đã có dấu hiệu đột quỵ trong 24 giờ qua, kể cả khi đã hết.
- **nhs-chest-pain, nhs-ectopic-pregnancy:** mở lại để đối chiếu, không sửa tệp. NHS Chest pain: đau ngực kèm choáng váng thì gọi 999. NHS Ectopic pregnancy: chỉ gọi 999 hoặc đến cấp cứu khi có **kết hợp** đau bụng dữ dội, chóng mặt nhiều hoặc ngất, buồn nôn, da rất tái.

---

## 3. Quy tắc

### 3.1 Căn cứ chính: ESC 2018, bảng 6

**Đặc điểm nguy cơ cao loại nặng:**
- mới xuất hiện đau ngực, khó thở, đau bụng hoặc đau đầu;
- ngất khi gắng sức hoặc khi đang nằm;
- hồi hộp đột ngột rồi ngất ngay sau đó;
- bệnh tim cấu trúc hoặc bệnh mạch vành nặng;
- huyết áp tâm thu dưới 90 mmHg;
- nghi chảy máu tiêu hóa;
- nhịp chậm dai dẳng dưới 40 lần/phút lúc thức, không do luyện tập thể thao;
- tiếng thổi tâm thu chưa rõ nguyên nhân;
- bất thường điện tim.

**Loại nhẹ** (chỉ là nguy cơ cao khi kèm bệnh tim hoặc điện tim bất thường):
- không có triệu chứng báo trước, hoặc báo trước dưới 10 giây;
- gia đình có người đột tử do tim khi còn trẻ;
- ngất khi đang ngồi.

**Khuyến cáo I, B:** có bất kỳ đặc điểm nguy cơ cao nào thì được đánh giá sớm, tích cực tại khoa cấp cứu hoặc đơn vị ngất, không cho về thẳng. **Tiền ngất được xử trí như ngất.**

ESC không nói về gọi xe cấp cứu trước viện. NHS Fainting lại ghi "Call 999" cho ngất khi gắng sức, khi nằm, kèm đau ngực hoặc hồi hộp.

**Quy ước của lượt này:**
- NHS "Call 999" (chỉ gọi 999) → mức 1.
- NHS "Call 999 or go to A&E" hoặc ESC "đánh giá tại khoa cấp cứu" → mức 2.
- Ngoại lệ được ghi trong `note` của từng quy tắc.

### 3.2 Quy tắc đổi mức

| Quy tắc | Mức | Lý do |
|---|---|---|
| `rf_palpitations_danger` | **1 → 2** | NHS Heart palpitations: hồi hộp kèm đau ngực, khó thở, choáng hoặc ngất thì "Call 999 or go to A&E" (mức 2 theo quy ước); nếu các triệu chứng đã hết thì chỉ khám khẩn. ESC: đánh giá tại khoa cấp cứu. Mức 1 cũ làm mọi cơn hoảng sợ có khó thở hoặc choáng thành "gọi 115". Đau ngực kèm khó thở, vã mồ hôi, buồn nôn hoặc choáng vẫn ở mức 1 qua `rf_chest_pain_with_features`. Thêm điều kiện "có hồi hộp" và mở phạm vi sang Chóng mặt, Ngất (mục 3.3). Câu lý do thêm: "Nhờ người đưa đi hoặc gọi 115, không tự lái xe" (NHS). |

Các quy tắc khác giữ mức. Riêng `rf_syncope_breathing` (mức 1) bị thu hẹp phạm vi, xem mục 3.3.

### 3.3 Từng quy tắc của lô 1

**`rf_dizziness_central_signs`** (mức 2, giữ)
- **Điều kiện:** nhánh "không tự đi được" giờ chỉ tính khi kiểu chóng mặt là "từng cơn vài phút đến vài giờ" hoặc "liên tục, mới vài ngày".
  - Lý do: trong cơn chóng mặt tư thế kịch phát lành tính (dưới 1 phút) người bệnh có thể không đứng được vài giây rồi hết.
  - GRACE-3 đánh giá dáng đi ở hội chứng tiền đình cấp (khuyến cáo 4).
  - Chóng mặt âm ỉ nhiều tuần không phải cấp cứu.
  - Kiểu chóng mặt "Không rõ" thì quy tắc ở trạng thái không rõ (ít nhất mức 3).
- **Nhánh nhìn đôi, mất thị lực:** giữ nguyên.
- **Nguồn:** bỏ NHS Dizziness (chỉ khuyên khám không khẩn); thêm NHS Vertigo (Call 999 or A&E), NHS Stroke, 3312/QĐ-BYT (2024) bài 2.
- **Câu lý do:** tách thành 2 câu.

**`rf_dizziness_central_signs_high_risk`** (mức 1, giữ)
- Cùng giới hạn kiểu chóng mặt như quy tắc trên.
- Cơ sở đổi thành `judgment`: mức 1 và ngưỡng 50 tuổi lấy theo cấu trúc của `rf_befast_high_risk`, không có nguồn nêu trực tiếp.

**`rf_acute_vertigo_vascular_risk`** (mức 2, giữ)
- Đối chiếu GRACE-3: chóng mặt liên tục, khởi phát cấp, kéo dài trên 24 giờ là hội chứng tiền đình cấp. GRACE-3 phân loại theo thời gian, không theo cảm giác quay hay choáng.
- Cần HINTS do người được đào tạo làm, hoặc chụp cộng hưởng từ. Ở Việt Nam ít nơi khám được HINTS, nên giữ mức 2.
- Ngưỡng 60 tuổi do người bảo trì chọn; phần GRACE-3 đọc được không nêu ngưỡng tuổi.
- Thêm 3312/QĐ-BYT: viêm mê đạo có thể nhầm với đột quỵ tiểu não.

**`rf_transient_neuro`** (mức 2, giữ)
- **Nguồn:** thay NG128 (chưa mở được) bằng 3312/QĐ-BYT bài 1 (bậc B), NHS TIA và NHS Stroke.
- **Vì sao giữ mức 2:**
  - NHS: dấu hiệu trong 24 giờ qua thì gọi 999; đã qua lâu hơn mà chưa khám thì khám khẩn.
  - Câu hỏi gộp cả 7 ngày (khoảng tái phát cao nhất theo 3312), nên mức 2 là mức chung.
- **Câu lý do:** thêm "Nếu mới xảy ra trong 24 giờ qua hoặc đang tái lại, gọi 115".
- **Câu hỏi:** sửa để không tính lúc tối sầm mắt khi sắp ngất (mục 5).

**`rf_syncope_exertion_or_lying`** (mức 2, giữ)
- **Vì sao giữ mức 2:**
  - ESC: nguy cơ cao loại nặng, đánh giá tại khoa cấp cứu (I, B). Bảng 7: có thể theo dõi tại khoa cấp cứu.
  - NHS: gọi 999. Không chọn mức 1 vì người dùng app thường đã tỉnh lại, và câu hỏi gộp cả suýt ngất.
  - Câu lý do thêm "Nhờ người đưa đi, không tự lái xe" (NHS).
- **Phạm vi:** thu hẹp về Ngất.
  - Ở Chóng mặt, lựa chọn "khi đang nằm" dễ bị chọn khi chóng mặt tư thế kịch phát lành tính lúc trở mình, nên tách thành quy tắc mới chỉ có gắng sức.
  - Ở Hồi hộp, `rf_palpitations_danger` đã ở mức 2.
- **Nguồn:** bỏ CG109.
- **Cần bác sĩ quyết:** mức 1 hay 2.

**`rf_syncope_palpitations_first`** (mức 2, giữ)
- ESC: hồi hộp đột ngột rồi ngất ngay là nguy cơ cao loại nặng. NHS: gọi 999.
- Giữ mức 2 vì "tim đập nhanh" cũng gặp trong tiền triệu của ngất phản xạ.
- Câu lý do thêm "nhờ người đưa đi".

**`rf_syncope_heart_disease`** (mức 2, giữ)
- ESC: bệnh tim cấu trúc hoặc bệnh mạch vành nặng là nguy cơ cao loại nặng. Câu hỏi về bệnh tim rộng hơn tiêu chí này một chút; chấp nhận.
- Bỏ CG109.

**`rf_syncope_breathing`** (mức 1, giữ; phạm vi thu hẹp về Ngất)
- **Nguồn:**
  - ESC: khó thở mới kèm ngất là nguy cơ cao. Hình 5 lấy thuyên tắc phổi làm ví dụ.
  - NHS Fainting không nêu khó thở, nhưng gọi 999 khi người ngất "chưa hồi phục hoàn toàn".
- **Vì sao giữ mức 1:** là nhận định, vì thuyên tắc phổi và hội chứng vành cấp có ngất có thể xấu đi rất nhanh.
- **Phạm vi:**
  - Với Chóng mặt dùng quy tắc mới ở mức 2, vì choáng kèm thở nhanh hay gặp trong cơn hoảng sợ.
  - Với Hồi hộp dùng `rf_palpitations_danger` (mức 2).

**`rf_syncope_gi_bleeding`** (mức 1, giữ)
- **Nguồn:**
  - ESC: nghi chảy máu tiêu hóa là nguy cơ cao.
  - WHO BEC: là nguyên nhân sốc.
  - CG141 (lượt R trước đã đối chiếu) khuyến cáo dùng thang Blatchford. Lần này không mở được nội dung thang. Bản trước ghi "thang Blatchford có ngất"; câu này chưa kiểm chứng nên đã bỏ.
- **Mức 1:** là nhận định (nguy cơ sốc mất máu). Cơ sở đổi thành `judgment`.

**`rf_syncope_family_sudden_death`** (mức 3, giữ)
- ESC: đây là đặc điểm nguy cơ cao loại **nhẹ**, cần làm điện tim sớm.
- NHS Palpitations: gia đình có bệnh tim thì khám không khẩn.
- CG109 (chỉ thấy qua bản tóm tắt RCEM): chuyển khám chuyên khoa tim mạch trong 24 giờ.
- Mức 3 phù hợp các nguồn trên. Câu lý do dùng "đột tử trước 40 tuổi" cho khớp câu hỏi.

**`rf_syncope_pregnancy`** (mức 3, giữ)
- NHS Ectopic: chỉ cấp cứu khi có **kết hợp** đau bụng dữ dội, chóng mặt nhiều hoặc ngất, buồn nôn, da rất tái. Ngất đơn thuần khi có thai thì khám bác sĩ hoặc gọi 111.
- Kèm đau bụng đã có `rf_fainting_with_pain` (mức 2). Kèm da tái, tay chân lạnh đã có các quy tắc sốc.

**`rf_palpitations_danger`**: xem mục 3.2.

**`rf_pulse_extreme`** (mức 2, giữ)
- **Ngưỡng dưới 40:** đúng theo ESC bảng 6. ESC không tính người luyện tập thể thao.
- **Ngưỡng trên 150:** không có trong nguồn nào đã mở; là nhận định của người bảo trì.
- **Đã sửa:** câu gợi ý đo mạch thêm "đo lúc nghỉ, không đo ngay sau vận động". Câu lý do thêm "lúc nghỉ".
- **Vấn đề còn lại** (xem mục 7.3): khoảng 60% người dùng sẽ trả lời "Không rõ" ở câu đo mạch. Quy tắc mức 2 khi đó ở trạng thái "không rõ", nên mức xử trí ít nhất là 3, và là **mức 2 với người từ 75 tuổi, có thai hoặc suy giảm miễn dịch**.
  - Đã thử viết điều kiện "không rõ thì bỏ qua", nhưng bộ kiểm tra không cho dùng `is` với dấu hiệu nhiều lựa chọn.
  - Đã trả lại dạng cũ và ghi chú.

**`rf_hypoglycemia_suspected`** (mức 3, giữ)
- **Vì sao không nâng lên mức 2:**
  - NHS cho người còn tỉnh tự xử trí; chỉ gọi 999 khi đáp ứng không bình thường hoặc bất tỉnh.
  - Mức 2 sẽ khiến người bệnh đi viện thay vì ăn đồ ngọt ngay.
- **Vì sao giữ mức 3:** nhiều người không có máy đo đường huyết, và hạ đường huyết hay tái lại (WHO BEC).
- **Đã sửa:**
  - Câu lý do theo NHS. Bản cũ ghi "không đỡ sau 15 phút thì gọi 115"; NHS khuyên ăn đồ ngọt lần nữa và chỉ gọi 999 khi lơ mơ hoặc không nuốt được.
  - Thêm "đỡ hẳn sau khi ăn đồ ngọt" vào điều kiện.
  - Cơ sở đổi thành `judgment`.

**`rf_co_exposure`** (mức 2, giữ)
- **Với Ngất (mất ý thức):** mức 2 đúng theo NHS.
- **Với Chóng mặt:** NHS chỉ khuyên gọi 111 (tương ứng mức 3). Giữ mức 2 vì:
  - Việt Nam không có dịch vụ 111;
  - đo CO trong máu và thở oxy chỉ làm được ở bệnh viện;
  - người ở cùng có thể đang nhiễm độc.
- **Câu lý do:** thêm đưa mọi người ra chỗ thoáng, không quay lại phòng, không tự lái xe.
- **Câu hỏi phơi nhiễm:** đổi "Gần đây" thành "24 giờ qua".
- **Còn cảnh báo bậc C:** chưa tìm thấy nguồn bậc A/B về mức xử trí ngộ độc khí CO.

### 3.4 Quy tắc mới (5)

| Quy tắc | Mức | Phạm vi | Điều kiện | Nguồn |
|---|---|---|---|---|
| `rf_fainting_with_headache` | 2 | Đau bụng, Sốt, Đau đầu, Ngất | ngất hoặc choáng kèm đau đầu | NG228 (căn cứ của quy tắc gốc), ESC bảng 6 |
| `rf_dizziness_faint_on_exertion` | 2 | Chóng mặt | choáng hoặc ngất **khi đang gắng sức** | ESC bảng 6, mục 4.2.9; NHS Fainting |
| `rf_dizziness_near_syncope_breathing` | 2 | Chóng mặt | choáng như sắp ngất kèm khó thở | ESC bảng 6 và lời khuyên "tiền ngất như ngất" |
| `rf_dizziness_chest_pain` | 1 | Chóng mặt | đau, tức ngực | NHS Chest pain (đau ngực kèm choáng váng: gọi 999), CG95 |
| `rf_dizziness_fever_or_severe_headache` | 3 | Chóng mặt | sốt, hoặc đau đầu "rất đau, không làm gì được" | NHS Vertigo (khám khẩn hoặc gọi 111) |

**`rf_fainting_with_headache`** là phần đau đầu được tách ra từ `rf_fainting_with_pain`.
- `rf_fainting_with_pain` vẫn không ghi phạm vi, nhưng chỉ còn đau bụng và đau ngực. Bỏ xuất huyết dưới nhện khỏi `conditions` của nó.
- Với 3 triệu chứng chính cũ, hai quy tắc gộp lại cho đúng điều kiện và mức như trước.
- Lý do tách: với Chóng mặt và Hồi hộp, "choáng như sắp ngất" gần như là chính triệu chứng chính, còn đau đầu kèm chóng mặt rất hay gặp. Trước đây mọi người chóng mặt có choáng kèm đau đầu bất kỳ đều thành mức 2; NHS Vertigo chỉ khuyên khám khẩn khi đau đầu dữ dội.
- Đau đầu đột ngột, dữ dội vẫn ở mức 1 qua `rf_thunderclap_headache`.
- Khi thêm triệu chứng chính mới, cần cân nhắc thêm vào phạm vi của `rf_fainting_with_headache` (đã ghi chú trong YAML).

### 3.5 Bốn quy tắc mở rộng phạm vi

| Quy tắc | Kết quả |
|---|---|
| `rf_gi_bleeding` (mức 2) | Phù hợp: ESC bảng 6 (nghi chảy máu tiêu hóa) và NHS Stomach ache (Call 999 or A&E). Thêm ESC vào nguồn và ghi chú. Người uống viên sắt có phân đen nhưng không dính như hắc ín; câu hỏi đã nêu "như hắc ín". |
| `rf_chest_pain` (mức 2) | Phù hợp: NHS Palpitations (Call 999 or A&E), ESC. |
| `rf_chest_pain_with_features` (mức 1) | Phù hợp: NHS Fainting (người ngất bị đau ngực: gọi 999). Với Ngất, ngất được ngầm định nên mọi đau ngực đều thành mức 1. |
| `rf_thunderclap_headache` (mức 1) | Phù hợp: 3312/QĐ-BYT (chảy máu tiểu não gây đau đầu dữ dội, thất điều, nôn), ESC. Với Chóng mặt, câu đau đầu được đưa vào phần dấu hiệu nguy hiểm để câu này chắc chắn được hỏi khi có đau đầu (mục 4). |

### 3.6 Quy tắc không ghi phạm vi, nay áp dụng cho 3 triệu chứng chính mới

| Quy tắc | Đánh giá |
|---|---|
| `rf_fainting_with_pain` | Đã tách phần đau đầu (mục 3.4). Phần đau bụng, đau ngực phù hợp ESC. |
| `rf_altered_consciousness` (mức 1) | Phù hợp NHS Fainting: chưa hồi phục hoàn toàn, khó nói thì gọi 999. |
| `rf_shock_signs` (mức 2), `rf_shock_multiple_signs` (mức 1) | **Có nguy cơ xếp quá cao ngất phản xạ.** Nhóm dấu hiệu toàn thân của Ngất hỏi "tay chân lạnh ngắt, da tái hoặc nổi vân tím". Người vừa ngất phản xạ thường còn tái, lạnh vài phút. Với Ngất, choáng hoặc ngất được ngầm định, nên chọn mục này là đủ cho mức 1. NHS Fainting ("chưa hồi phục hoàn toàn": gọi 999) ủng hộ phần nào, nên **chưa sửa**. Đề xuất ở mục 7.2. |
| `rf_persistent_vomiting` (mức 3) | Phù hợp NHS Vertigo (nôn: khám khẩn). |
| `rf_new_headache_over_50`, `rf_new_headache_vomiting`, `rf_immunocompromised_headache`, `rf_pregnancy_hypertension_signs`, các quy tắc sốt, đau bụng | Phù hợp hoặc không liên quan; không sửa. |
| `rf_neck_stiffness`, `rf_non_blanching_rash` | Phù hợp; không sửa. |

---

## 4. Dấu hiệu nguy hiểm, nhóm câu hỏi, danh sách "đi cấp cứu ngay nếu"

**Đối chiếu với các danh sách gốc:**
- **ESC bảng 6, loại nặng:** đã có câu hỏi cho mọi đặc điểm, trừ 3 đặc điểm cần đo hoặc khám (huyết áp dưới 90, tiếng thổi ở tim, điện tim).
- **NHS Fainting, Call 999:** thiếu "bị thương nặng khi ngất".
- **NHS Vertigo, Call 999 or A&E:** thiếu "nghe kém đột ngột".
- **NHS Palpitations:** thiếu "cơn hồi hộp không dứt".

Các dấu hiệu còn thiếu được đề xuất ở mục 7.1.

**Chóng mặt**
- **Dấu hiệu nguy hiểm:**
  - Hỏi **kiểu chóng mặt trước tiên** (GRACE-3 dựa vào thời gian và yếu tố khởi phát; quy tắc "không tự đi được" cần biết kiểu chóng mặt).
  - Thêm **đau đầu** và **đau đầu đột ngột, dữ dội**. Trước đây câu sau có tỷ lệ nền 0,002 và không có bệnh liên kết, nên có thể không bao giờ được hỏi.
  - Thêm **đang dùng thuốc hạ đường huyết**: câu này được hỏi ngay sau khi người dùng chọn đái tháo đường ở nhóm bệnh nền.
- **Nhóm `dizziness_red_flags`:** thêm "ngất hoặc choáng như sắp ngất" (6 mục).
  - NHS Dizziness: ngất hoặc ngã quỵ là lý do đi khám.
  - ESC: tiền ngất xử trí như ngất.
  - Đây là điều kiện của 7 quy tắc.
- **Danh sách "đi cấp cứu ngay nếu":** thêm đau đầu đột ngột, dữ dội.
- **Nguồn của triệu chứng chính:** thêm NHS Vertigo, NHS Stroke.

**Ngất**
- **Nhóm `syncope_red_flags`:** thêm **hồi hộp** (7 mục). NHS Fainting: người ngất có hồi hộp thì gọi 999. ESC: hồi hộp lúc ngất là nguy cơ cao.
- **Dấu hiệu nguy hiểm:** thêm câu thuốc hạ đường huyết.
- **Danh sách "đi cấp cứu ngay nếu":** thêm "bất tỉnh hoặc đang co giật" và đau đầu đột ngột, dữ dội.
- **Nguồn của triệu chứng chính:** bỏ CG109.

**Hồi hộp**
- **Dấu hiệu nguy hiểm:** thêm nhóm dấu hiệu nguy hiểm toàn thân (lú lẫn, li bì, khó thở, tay chân lạnh, mệt lả).
  - Nhịp nhanh hoặc chậm gây tụt huyết áp cần cấp cứu.
  - Hỏi một lần ở đầu phiên, thay vì hỏi lẻ từng câu giữa phiên.
- **Dấu hiệu nguy hiểm:** thêm câu thuốc hạ đường huyết.
- **Nhóm `palpitations_red_flags`:** giữ 3 mục; danh sách này đủ theo NHS.

Mười chín phiên mô phỏng xác nhận: nhóm câu hỏi được hỏi đúng thứ tự, và các quy tắc cho mức như mong đợi.
- Chóng mặt tư thế, không tự đi được trong cơn ngắn: không còn mức 2.
- Chóng mặt kèm choáng và đau đầu thường: mức 3.
- Ngất khi chạy: mức 2.
- Ngất kèm khó thở: mức 1.
- Cơn hoảng sợ có hồi hộp, khó thở, choáng: mức 2 (trước là 1).

---

## 5. Câu chữ của dấu hiệu lô 1

| Dấu hiệu | Trường | Trước | Sau | Lý do |
|---|---|---|---|---|
| `transient_neuro_symptoms` | label_vi | Có lúc yếu, tê, nói khó, mất thị lực rồi tự hết | Yếu, tê nửa người hoặc nói khó, dù đã tự hết | "Mất thị lực" không rõ một bên hay hai bên. Người vừa suýt ngất hay "tối sầm mắt" sẽ chọn mục này, làm ngất phản xạ thành mức 2. Nhãn mới đọc đúng cả trong danh sách "đi cấp cứu ngay nếu". |
| | question_vi | Trong 7 ngày qua, có lúc nào bỗng yếu hoặc tê một bên người, méo miệng, nói khó, mất thị lực rồi tự hết không? (25 từ) | 7 ngày qua, có lúc yếu, tê nửa người, nói khó rồi tự hết không? (15 từ) | Như trên; hết cảnh báo độ dài. |
| | help_vi | (không có) | Tính các lần trong 7 ngày qua, kể cả khi chỉ kéo dài vài phút. Gồm cả méo miệng, mất thị lực một mắt hoặc nhìn đôi rồi tự hết. Không tính lúc tối sầm mắt khi sắp ngất. | 3312/QĐ-BYT: thiếu máu **não hoặc võng mạc** (mất thị lực một mắt), triệu chứng hết trong 24 giờ, cần phân biệt với ngất. Khung 7 ngày là khoảng tái phát cao nhất (3312: điều trị tối ưu trong 24 giờ, tối đa 7 ngày). |
| `cannot_walk_unaided` | help_vi | (thêm câu) | … Không tính lúc đang trong cơn quay cuồng ngắn dưới 1 phút. | Tránh xếp cơn chóng mặt tư thế kịch phát lành tính vào dấu hiệu đột quỵ (GRACE-3 đánh giá dáng đi ngoài cơn). |
| `dizziness_positional` | help_vi | (không có) | Thường là cơn quay cuồng ngắn khi đổi tư thế đầu. Không tính choáng, tối sầm mắt khi vừa đứng dậy. | Phân biệt yếu tố tư thế đầu (NHS Vertigo: một số cử động đầu gây chóng mặt) với hạ huyết áp tư thế khi đứng dậy (NHS Dizziness). |
| `pulse_measured` | help_vi | (thêm câu) | … Đo lúc đang ngồi hoặc nằm nghỉ, không đo ngay sau khi vận động. | Ngưỡng của ESC là lúc thức, không do luyện tập; mạch trên 150 ngay sau khi chạy là bình thường. |
| `family_sudden_death` | label_vi, question_vi, help_vi | "Người thân chết đột ngột khi còn trẻ"; "…hay con có ai chết đột ngột trước 40 tuổi…" (16 từ) | "Bố mẹ, anh chị em hoặc con đột tử trước 40 tuổi"; "Bố mẹ, anh chị em hoặc con có ai đột tử trước 40 tuổi không?" (15 từ); "Đột tử là chết đột ngột…" | Nhãn khớp câu hỏi (người thân bậc 1, dưới 40 tuổi; tiêu chí của CG109 theo bản tóm tắt RCEM). Hết cảnh báo độ dài. |
| `co_exposure` | question_vi, help_vi | "Gần đây có ở phòng kín…"; "Ví dụ đốt than sưởi, bếp củi, lò sưởi hoặc máy phát điện…" | "24 giờ qua, có ở phòng kín đốt than, củi hoặc chạy máy nổ không?"; "Ví dụ đốt than sưởi, bếp than, bếp củi, chạy máy phát điện hoặc nổ máy xe trong phòng, nhà để xe đóng kín." | Mốc thời gian cụ thể (quy tắc viết; tránh tính lần đốt than từ nhiều tuần trước). NHS nêu thêm nổ máy xe trong chỗ kín. |
| `palpitations` | alt_question.text_vi | (không có) | Có thấy tim đập thình thịch trong ngực, ở cổ hoặc họng không? | Hồi hộp nay thuộc nhóm dấu hiệu nguy hiểm của Ngất, nên cần câu hỏi thay thế. Cách mô tả theo NHS Heart palpitations. |

**Đã kiểm tra, không sửa:**
- `heavy_periods`: ngưỡng "thay băng sau mỗi 1–2 giờ", "hơn 7 ngày" đúng theo NHS Heavy periods (rà soát 19/9/2024).
- `pallor`: cách nhìn mặt trong mí mắt dưới (hồng đỏ bình thường, nhợt khi thiếu máu) đúng.
- `better_after_sugar`: mốc 15 phút khớp NHS (đo lại sau 10–15 phút).
- `dizziness_pattern`: lựa chọn "liên tục, mới vài ngày" khớp định nghĩa hội chứng tiền đình cấp của GRACE-3.
- `syncope_trigger`, `syncope_warning`: các lựa chọn khớp bảng 6 của ESC (tiền triệu phản xạ, khi đứng dậy, khi ho hoặc đi tiểu, gắng sức, khi nằm, khi ngồi).
- Các dấu hiệu lô 1 còn lại: không thấy sai.

---

## 6. Không xác minh được

- **NICE CG109.** Không mở được bản hiện hành (cập nhật 11/2023). Chỉ thấy bản tóm tắt của RCEM năm 2012 (thứ cấp). Đã bỏ khỏi quy tắc và triệu chứng chính; giữ tệp nguồn với `verified: false`.
- **NICE NG128.** Không mở được. Đã bỏ khỏi `rf_transient_neuro`. Khung thời gian đánh giá sau cơn thiếu máu não thoáng qua dựa vào NHS TIA và 3312/QĐ-BYT.
- **GRACE-3, phần thân bài** (tỷ lệ đột quỵ, cách phân độ đi không vững): chỉ đọc được 15 khuyến cáo.
- **Nội dung thang Blatchford** (mục ngất) của CG141: không mở lại được.
- **Ngưỡng mạch trên 150 lần/phút:** không có nguồn.
- **Nguồn bậc A/B về mức xử trí ngộ độc khí CO:** không tìm thấy (Bộ Y tế, CDC).

Người bảo trì nên mở lại CG109 và NG128 bằng trình duyệt.

---

## 7. Đề xuất

### 7.1 Dấu hiệu còn thiếu (lượt R không được tạo dấu hiệu)

| Đề xuất | Căn cứ | Dùng để |
|---|---|---|
| Hồi hộp **vẫn đang có, chưa dứt** (ví dụ kéo dài trên 15 phút) | NHS Palpitations: cơn không hết thì gọi 999 hoặc đến cấp cứu; đã hết thì khám khẩn | Phân biệt mức 2 với mức 3 cho `rf_palpitations_danger`; hiện cơn nhịp nhanh kéo dài không kèm triệu chứng khác chưa có quy tắc |
| Thời điểm của cơn thiếu máu não thoáng qua: **trong 24 giờ qua** hay 1–7 ngày | NHS Stroke, NHS TIA | Mức 1 khi trong 24 giờ, mức 2 khi 1–7 ngày |
| **Bị thương khi ngất** (đập đầu, ngã) | NHS Fainting (Call 999) | Quy tắc mức 1–2 cho Ngất |
| **Đã tỉnh táo hoàn toàn chưa** sau khi ngất | NHS Fainting (chưa hồi phục hoàn toàn: gọi 999) | Tách ngất phản xạ đã hồi phục khỏi trường hợp cần gọi 115; có thể dùng cho quy tắc sốc ở mục 7.2 |
| **Nghe kém đột ngột một bên tai** (tách khỏi "ù tai, đầy tai") | NHS Vertigo (kèm nghe kém: 999 hoặc cấp cứu); NHS Labyrinthitis (nghe kém đột ngột một tai: khám khẩn) | Quy tắc mức 2 hoặc 3 cho Chóng mặt |
| **Đang đặt máy tạo nhịp hoặc máy khử rung** | ESC bảng 6 (máy hỏng là nguy cơ cao); ESC: kiểm tra máy ngay khi người có máy bị ngất | Quy tắc cho Ngất |
| **Đã được nói tim có tiếng thổi** | ESC bảng 6 (tiếng thổi tâm thu chưa rõ nguyên nhân); CG109 (theo bản RCEM) | Quy tắc cho Ngất |
| **Huyết áp tâm thu dưới 90** (thêm lựa chọn thấp cho `bp_measured`, hoặc dấu hiệu mới) | ESC bảng 6 | Quy tắc cho Ngất, Chóng mặt |
| `on_glucose_lowering_meds`: tách insulin hoặc sulfonylurê khỏi metformin | NHS: hạ đường huyết hay gặp với insulin, gliclazide, glimepiride | Bớt xếp quá cao người chỉ dùng metformin |
| `fainting_or_near_fainting`: thêm `leak_by_complaint` cho Chóng mặt (ước khoảng 0,3) | Choáng như sắp ngất là một kiểu của chóng mặt | Tỷ lệ nền 5% là quá thấp với Chóng mặt |

### 7.2 Quy tắc nên xem lại

- **`rf_shock_multiple_signs` với Ngất.** Ở Ngất, ngất được ngầm định, nên chỉ cần "tay chân lạnh, da tái" là mức 1. Người vừa ngất phản xạ thường còn tái vài phút. Khi có dấu hiệu "đã tỉnh táo hoàn toàn" (mục 7.1), nên thêm điều kiện "chưa hồi phục" cho Ngất.
- **`rf_syncope_exertion_or_lying`, `rf_syncope_palpitations_first`:** cần bác sĩ quyết mức 1 hay 2. NHS ghi gọi 999, ESC ghi đánh giá tại khoa cấp cứu. Lượt R chọn mức 2 kèm dặn "nhờ người đưa đi, không tự lái xe".
- **`rf_co_exposure`:** cần nguồn bậc A/B, ví dụ hướng dẫn chống độc của Bộ Y tế nếu có.

### 7.3 Bộ suy luận và bộ kiểm tra

**Số đo chưa đo bị coi như dấu hiệu nguy hiểm "có thể có".**
- Một quy tắc mức 1–2 dựa trên số đo trả lời "Không rõ" thì luôn đẩy mức xử trí lên ít nhất 3, và lên đúng mức quy tắc với nhóm nguy cơ cao (từ 75 tuổi, có thai, suy giảm miễn dịch). Đó là trường hợp của `rf_pulse_extreme` (mạch) và các quy tắc huyết áp khi có thai.
- Với mạch (tỷ lệ "không rõ" 0,6), mọi người từ 75 tuổi bị hồi hộp mà chưa đo mạch sẽ ra mức 2.
- Đề xuất một trong hai cách:
  - cho phép `is: unknown` với dấu hiệu nhiều lựa chọn trong bộ kiểm tra;
  - thêm cờ cho dấu hiệu đo được: "không rõ = chưa đo, không phải bằng chứng".

### 7.4 Cho lượt C và người bảo trì

**Thêm bệnh vào `conditions` của các quy tắc:**

| Bệnh mới | Quy tắc |
|---|---|
| `transient_ischemic_attack` | `rf_transient_neuro` |
| `cardiac_arrhythmia` | `rf_syncope_exertion_or_lying`, `rf_dizziness_faint_on_exertion`, `rf_syncope_palpitations_first`, `rf_syncope_heart_disease`, `rf_palpitations_danger`, `rf_pulse_extreme` |
| `pulmonary_embolism` | `rf_syncope_breathing`, `rf_dizziness_near_syncope_breathing` |
| `upper_gi_bleeding` | `rf_syncope_gi_bleeding`, `rf_gi_bleeding` |
| `carbon_monoxide_poisoning` | `rf_co_exposure` |

**Mức xử trí gợi ý trong `scope.yaml`, so với nguồn:**
- **Hạ đường huyết (mức 2, không được bỏ sót):** NHS cho người còn tỉnh tự xử trí. Nếu khai báo mức 2 và "không được bỏ sót", xác suất sẽ đẩy mọi người tiểu đường có chóng mặt lên mức 2. Nên cân nhắc mức 3.
- **Ngộ độc khí CO (mức 1):** NHS chỉ ghi 111 khi có triệu chứng, và "999 hoặc cấp cứu" khi có dấu hiệu nặng. Mức 2 khớp hơn.
- **Xuất huyết tiêu hóa trên (mức 1):** NHS ghi "999 hoặc cấp cứu". Quy tắc đang để mức 2, và mức 1 khi kèm ngất.

### 7.5 Giấy phép ESC

Trang ESC ghi rằng dùng nội dung hướng dẫn ESC trong phần mềm hoặc thuật toán, kể cả chỉ trích dẫn, cần thỏa thuận cấp phép. doctor-v chỉ dùng dữ kiện kèm trích dẫn (L3), nhưng nên hỏi ý kiến về điều khoản này trước khi phát hành.

---

## 8. Kiểm tra

**`npm run kb:check`: 0 lỗi, 10 cảnh báo.**
- 3 cảnh báo "chưa có bệnh khai báo prior" cho 3 triệu chứng chính mới (chờ lượt C).
- 1 cảnh báo `recent_immobility` dài 16 từ (không phải lỗi y khoa, không sửa).
- 5 cảnh báo bậc C có từ trước, ngoài lô 1: `rf_cholangitis_triad`, `rf_swelling_behind_ear`, `rf_periorbital_swelling`, `rf_child_bilious_vomiting`, `rf_ectopic_rupture_signs`.
- 1 cảnh báo bậc C của `rf_co_exposure` (mục 6).

Đã hết 17 cảnh báo nguồn chưa kiểm tra và 2 cảnh báo độ dài câu hỏi.

**`npm run eval -- --set dev` (113 ca): giống hệt trước và sau.**
- Sạch: top1 75,2%, top3 94,5%, top10 99,1%; an toàn 99,1%; bỏ sót cấp cứu 0/47; quá mức 8,0%; ECE 0,121; trung vị 14 câu.
- Nhiễu: top1 70,8%, top3 91,6%, top10 98,3%; an toàn 97,5%; bỏ sót cấp cứu 5/235; quá mức 15,0%; ECE 0,084; trung vị 16 câu.

**So sánh từng ca:** đã so sánh 678 phiên (sạch và 5 hạt giống nhiễu), gồm mức xử trí, thứ hạng, 3 bệnh đầu, số câu và thứ tự câu hỏi. Mọi phiên giống hệt. Khác biệt duy nhất là tên quy tắc trong lý do của 10 phiên nhiễu: `rf_fainting_with_pain` thành `rf_fainting_with_headache`, ở trạng thái "không rõ", vẫn mức 3.
