# Biên bản lượt R, Giai đoạn 3 lô 3: quy tắc, dấu hiệu nguy hiểm và nguồn

- Phạm vi: 14 nguồn mới của lô 3, 28 quy tắc mới, 7 quy tắc cũ được mở phạm vi, danh sách dấu hiệu nguy hiểm của Ho, Khó thở, Đau ngực, các nhóm câu hỏi lô 3 và câu chữ của các dấu hiệu lô 3 (cùng 4 câu hỏi thay thế mới).
- Người thực hiện: `agent:pass-r`. Ngày: 2026-10-31.
- Không sửa `knowledge/conditions/` và các bản nháp khác trong `knowledge/drafts/`. Không đọc bộ ca giữ kín. Không chạy git.
- **Hạn chế lớn nhất: không mở được nguồn nào** (mục 1). Vì vậy không nguồn nào được đặt `verified: true`, và không thêm văn bản Bộ Y tế nào vào sổ nguồn. Các sửa đổi dưới đây chỉ dựa vào nguồn đã được xác minh từ các lượt trước và vào cách bộ suy luận hỏi. **Cần một lượt R nữa khi mạng được mở**, và bác sĩ duyệt.
- `npm run kb:check`: trước 0 lỗi, 44 cảnh báo; sau **0 lỗi, 43 cảnh báo** (mục 7).
- `npm run eval -- --set dev`: xem mục 8.

---

## 1. Cách làm và hạn chế

**Mạng bị chặn.**
- `curl` tới www.nhs.uk, ginasthma.org, goldcopd.org, nice.org.uk, iris.who.int, who.int, vnras.com, thuvienphapluat.vn, kcb.vn, moh.gov.vn, vbpl.vn, Europe PMC, NCBI, escardio.org, worldallergy.org: proxy của phiên từ chối kết nối (403 ở bước CONNECT).
- WebFetch tới www.nhs.uk và ginasthma.org: không phân giải được tên miền. Thông báo của công cụ yêu cầu dừng thử thêm trang khác.
- Muốn mở được nguồn, chủ dự án cần cho phép các tên miền trên trong phần Network access của môi trường cloud (menu môi trường ở thanh tiêu đề phiên, Edit), rồi chạy lại lượt R.
- Theo yêu cầu, không dùng dịch vụ đọc hộ. Đã dùng **0 lần** WebSearch: tìm được địa chỉ cũng không mở được trang.

**Nguồn dùng được trong lượt này** (đã xác minh từ trước, đọc `notes_vi` trong sổ nguồn):
- `nhs-chest-pain`: mục "Call 999" (đau ngực đột ngột không hết; đau lan ra tay, cổ, hàm, bụng, lưng; đau ngực kèm vã mồ hôi, buồn nôn, choáng váng, khó thở); đau lúc có lúc không hoặc đã hết nhanh thì khám bác sĩ gia đình.
- `nhs-pulmonary-embolism`: khó thở đột ngột, đau ngực, tim đập rất nhanh, ngất thì "Call 999 or go to A&E"; ho ra máu thì "urgent GP / 111".
- `nice-cg95`, `byt-qd-2187-2019`, `who-imci-chart-booklet-2014`, `nhs-heart-palpitations`, `esc-syncope-2018`, `esc-pe-2019`, `nice-ng254`, `nhs-panic-disorder`.
- Những điều ghi "theo trí nhớ" trong quy tắc là trí nhớ của người bảo trì hoặc của lượt R, **chưa đối chiếu**. Lượt R giữ nguyên các lời "theo trí nhớ người bảo trì" vì chưa kiểm được.

**Lưu ý thêm:** `nice-cg95`, `nice-ng143`, `nice-ng254` được các lượt trước xác minh qua dịch vụ đọc văn bản r.jina.ai, cách mà quy tắc hiện nay không cho phép. Lượt R có mạng nên mở lại các nguồn này.

**Kiểm tra hành vi:**
- 41 tình huống mô phỏng cho 3 triệu chứng chính mới (chạy phiên hỏi thật của bộ suy luận, rồi lặp 20 lần với 15% câu trả lời "Không rõ"). Mã nằm trong thư mục tạm, không chép vào repo.
- So từng ca của bộ dev trước và sau (mức xử trí, thứ hạng, số câu, 3 bệnh đầu; cả 5 hạt giống nhiễu).

---

## 2. Sổ nguồn

### 2.1 Mười bốn nguồn của lô 3

Cả 14 nguồn **chưa xác minh** (`verified: false`). Lượt R thêm vào `notes_vi` lý do và điều cần kiểm khi mở được.

| Nguồn | Kết quả | Ghi chú |
|---|---|---|
| `nhs-cough`, `nhs-shortness-of-breath`, `nhs-coughing-up-blood`, `nhs-asthma-attack`, `nhs-croup`, `nhs-bronchiolitis`, `nhs-whooping-cough`, `nhs-anaphylaxis`, `nhs-aortic-dissection`, `nhs-pneumothorax`, `nhs-heart-failure` | Chưa xác minh | www.nhs.uk bị chặn. Chưa ghi được các mục "Call 999", "A&E", "urgent GP / 111". Nhãn L1 (OGL v3.0) đúng như các trang NHS khác. Địa chỉ chưa kiểm được có đổi không. |
| `nice-ng9` | Chưa xác minh | nice.org.uk bị chặn. Theo trí nhớ: xuất bản 6/2015, cập nhật 8/2021; các tiêu chí chuyển cấp cứu và cân nhắc chuyển viện ghi trong `notes_vi`, cần đối chiếu. Nhãn L3 đúng như các hướng dẫn NICE khác. |
| `gina-2024` | Chưa xác minh | ginasthma.org bị chặn. Vào ngày 31/10/2026 có thể đã có bản 2025, 2026: khi xác minh nên thêm nguồn mới với id mới. Nhãn L3. |
| `gold-2025` | Chưa xác minh | goldcopd.org bị chặn. Có thể đã có bản 2026 (GOLD ra báo cáo khoảng tháng 11 hằng năm). Nhãn L3. |

### 2.2 Văn bản Bộ Y tế

Không thêm văn bản nào: không mở được, mà quy định chỉ cho trích nguồn đã mở. Danh sách để lượt R có mạng tìm (số hiệu theo trí nhớ, **chưa kiểm**, có thể sai):

| Chủ đề | Văn bản cần tìm | Dùng cho |
|---|---|---|
| Phản vệ | Thông tư 51/2017/TT-BYT (29/12/2017), hướng dẫn phòng, chẩn đoán và xử trí phản vệ: tiêu chuẩn chẩn đoán, phân độ | `rf_anaphylaxis_signs` |
| Lao | Hướng dẫn chẩn đoán, điều trị và dự phòng bệnh lao (theo trí nhớ: 1314/QĐ-BYT, 24/3/2020; kiểm tra văn bản thay thế): mốc ho từ 2 tuần | `rf_cough_2_weeks`, `chronic_cough_signs` |
| Hen phế quản | Hướng dẫn chẩn đoán và điều trị hen phế quản người lớn và trẻ từ 12 tuổi (theo trí nhớ: 1851/QĐ-BYT, 2020); hướng dẫn hen trẻ dưới 12 tuổi | `rf_asthma_reliever_fails`, `rf_dyspnea_cannot_speak` |
| Bệnh phổi tắc nghẽn mạn tính | Hướng dẫn chẩn đoán và điều trị (theo trí nhớ: bản 2018 và bản cập nhật 2023) | `rf_copd_reliever_fails`, `rf_copd_flare` |
| Ho gà | Hướng dẫn chẩn đoán, điều trị ho gà (chưa rõ số hiệu) | `rf_pertussis_infant`, `rf_pertussis_signs` |
| Suy tim | Hướng dẫn chẩn đoán và điều trị suy tim (chưa rõ số hiệu) | `rf_heart_failure_signs` |
| Dị vật đường thở ở trẻ | Kiểm tra 3312/QĐ-BYT (2015) có bài này không; nếu không, tìm hướng dẫn cấp cứu nhi | `rf_choking_episode` |

Ba văn bản đã có trong sổ (`byt-qd-4235-2012`, `byt-qd-3312-2015`, `byt-qd-2187-2019`) cũng không mở lại được. `rf_choking_episode` trước ghi "3312/QĐ-BYT, bài dị vật đường thở"; nay ghi rõ là **chưa xác nhận** văn bản có bài này.

---

## 3. Quy tắc

Quy ước như lô 1–2: NHS "Call 999" (chỉ 999) là mức 1; "Call 999 or go to A&E" là mức 2; "urgent GP / 111" là mức 3.

### 3.1 Đau ngực

**`rf_chest_pain_spreading_or_systemic`** (mức 1, giữ).
- Đúng mục "Call 999" của NHS Chest pain (đã xác minh), áp dụng cho mọi kiểu đau ngực.
- Thêm nhánh "tức nặng giữa ngực kèm khó thở", thay cho `rf_chest_pain_with_features` (nay không áp dụng cho Đau ngực, mục 3.4).
- Câu hỏi người giao việc nêu: ợ nóng kèm buồn nôn, người trẻ đau thành ngực thấy choáng vì sợ, đều thành mức 1. Lượt R **chấp nhận** khuyên quá mức này: NHS không phân biệt, và hội chứng vành cấp có thể đau như khó tiêu, kèm buồn nôn (2187/QĐ-BYT).
- Đã thử bỏ cơn đau chỉ vài giây khỏi quy tắc này, nhưng không giữ: điều kiện trên câu nhiều lựa chọn trả lời "Không rõ" làm quy tắc thành "không rõ", hạ mức 1 xuống mức 3 với người không thuộc nhóm nguy cơ cao. Lỗi này nặng hơn lợi ích.

**`rf_chest_pain_central`** (mức 2, **quy tắc mới**, tách từ `rf_chest_pain`).
- Đau, tức nặng giữa ngực, trừ khi cơn đau **chỉ kéo dài vài giây**.
- Lý do: NHS Chest pain (đã xác minh) ghi đau đã hết nhanh thì khám bác sĩ gia đình; đau nhói vài giây ở người trẻ rất hay gặp và hiếm khi do tim.
- Thời gian "Không rõ": quy tắc ở trạng thái không rõ, nên ít nhất mức 3 (mức 2 với nhóm nguy cơ cao). Chấp nhận, vì đau tức kéo dài kèm dấu hiệu khác vẫn là mức 1 qua các quy tắc không có điều kiện thời gian.

**`rf_chest_pain_ongoing`** (mức 1, giữ).
- NHS: đau ngực đột ngột không hết thì gọi 999. 2187/QĐ-BYT (đã xác minh): nhồi máu cơ tim đau trên 20–30 phút; chuyển ngay khi đau trên 20 phút.
- Mốc 15 phút: theo trí nhớ của lượt R, NICE CG95 khuyến cáo 1.2.1.3 nêu "đau kéo dài trên 15 phút" là triệu chứng gợi ý hội chứng vành cấp. **Chưa đối chiếu lại được.** Giữ mốc 15 phút.

**`rf_chest_pain_breathless`** (mức 2, giữ, lệch với NHS Chest pain).
- NHS Chest pain ghi đau ngực kèm khó thở thì gọi 999 (mức 1). NHS Pulmonary embolism (đã xác minh) ghi đau ngực, khó thở đột ngột thì "999 or A&E" (mức 2).
- Giữ mức 2 cho kiểu đau không phải tức nặng giữa ngực: mức 1 sẽ khuyên gọi 115 cho rất nhiều người viêm phổi, viêm phế quản có đau kiểu màng phổi. Tức nặng giữa ngực kèm khó thở vẫn là mức 1.
- Thêm nguồn `nhs-pulmonary-embolism`, `esc-pe-2019`. **Bác sĩ cần quyết định.**

**`rf_chest_pain_sudden_severe`** (mức 2, giữ, **thu hẹp**).
- Thêm điều kiện không phải cơn đau chỉ vài giây: đau của bóc tách động mạch chủ, tràn khí màng phổi, tắc mạch phổi không tự hết sau vài giây.
- Đau đột ngột dữ dội kéo dài từ 15 phút là mức 1 (`rf_chest_pain_ongoing`). Hai trang NHS về bóc tách và tràn khí chưa mở được.

**`rf_aortic_dissection_signs`** (mức 1, giữ). Không có điều kiện thời gian. Chưa tìm được nguồn cho điểm ADD-RS (ESC 2024 bị chặn).

**`rf_chest_pain_exertional`** (mức 3, giữ). Nhận định hợp lý: câu hỏi không phân biệt đau thắt ngực ổn định với không ổn định.

### 3.2 Thuyên tắc phổi, ho ra máu

**`rf_pe_signs`** (mức 1, giữ, **thêm điều kiện tuổi từ 13**).
- Thuyên tắc phổi rất hiếm ở trẻ; trước đây khi một quy tắc mức 2 đã đúng, bộ suy luận hỏi cả người nhà bé 2 tuổi về sưng bắp chân.
- NHS Pulmonary embolism ghi "999 or A&E" (mức 2); giữ mức 1 như `rf_breathless_leg_swelling` của lô 1 vì có cùng lúc dấu hiệu huyết khối và dấu hiệu ở phổi.

**`rf_hemoptysis`** (mức 3, giữ). Thêm nguồn `nhs-pulmonary-embolism` (đã xác minh: ho ra máu thì khám khẩn hoặc gọi 111).

**`rf_hemoptysis_severe`** (mức 2, giữ). Thêm nguồn `nhs-pulmonary-embolism`. Vẫn bậc C nên còn cảnh báo của `kb:check`, tới khi có hướng dẫn chính thức.

### 3.3 Khó thở

**`rf_dyspnea_cannot_speak`** (mức 1, giữ, **chỉ từ 5 tuổi**).
- Trẻ dưới 5 tuổi chưa nói trọn câu, người nhà sẽ trả lời "Không rõ". Trẻ nhỏ thuộc nhóm nguy cơ cao, nên "Không rõ" của quy tắc mức 1 thành mức 1. Tình huống mô phỏng: trẻ 2 tuổi ho, thở nhanh (viêm phổi theo IMCI, mức 3) ra **mức 1**.
- Trẻ dưới 5 tuổi dùng nhóm `child_breathing_signs` và các quy tắc theo IMCI.

**`rf_dyspnea_at_rest`** (mức 2, giữ, **chỉ từ 5 tuổi**).
- Trẻ dưới 5 tuổi: theo IMCI, thở nhanh là viêm phổi (mức 3, `rf_child_breathing`); dấu hiệu nặng là rút lõm lồng ngực, thở rít, ngừng thở, dấu hiệu nguy hiểm toàn thân.
- Cơn hoảng sợ cũng khó thở lúc nghỉ: khuyên quá mức, chấp nhận (đề xuất dấu hiệu mới ở mục 6).

**`rf_dyspnea_sudden`** (mức 2, giữ). Thêm nguồn đã xác minh `nhs-pulmonary-embolism` (khó thở đột ngột: "999 or A&E"); đổi basis sang verbal. Cơn hoảng sợ: khuyên quá mức, chấp nhận.

**`rf_breathless_fainting`** (mức 2, giữ). Thêm `nhs-pulmonary-embolism` (ngất: "999 or A&E").

**`rf_breathless_chest_pressure`** (mức 2, giữ, lệch với NHS Chest pain).
- Người bị hen đang lên cơn có tức ngực sẽ được khuyên đi cấp cứu. Không loại được bằng câu hỏi: câu "đã xịt thuốc mà không đỡ" trả lời "Không" cả khi chưa xịt; người bị hen vẫn có thể bị hội chứng vành cấp. **Bác sĩ cần quyết định.**

**`rf_breathless_chest_pressure_features`** (mức 1, giữ).

**`rf_asthma_reliever_fails`** (mức 1, giữ). Không mở được NHS, GINA.

**`rf_copd_reliever_fails`** (mức 2, giữ).

**`rf_copd_flare`** (mức 3, giữ, **thu hẹp**).
- Bỏ trường hợp khó thở tăng dần nhiều tuần, nhiều tháng: đợt cấp là biến cố cấp. Người bệnh phổi tắc nghẽn mạn tính vốn khó thở khi gắng sức; trước đây mọi lần họ chọn Khó thở đều thành mức 3.
- Câu khởi phát chưa hỏi (ở Ho) thì quy tắc vẫn đúng.

**`rf_heart_failure_signs`** (mức 3, giữ). Không mở được NHS, ESC, Bộ Y tế.

**`rf_anaphylaxis_signs`** (mức 1, giữ, **thu hẹp nhánh tiếp xúc dị nguyên**).
- Trước đây, với Khó thở, chỉ cần trả lời "có" câu tiếp xúc dị nguyên là mức 1 (khó thở được ngầm định). Ví dụ người viêm phổi khó thở nhiều ngày, uống thuốc cảm mới 1 giờ trước, được khuyên gọi 115.
- Nay khó thở, khò khè chỉ tính khi khó thở **bắt đầu đột ngột, trong vài phút**. Thở rít, choáng, ngất, tay chân lạnh vẫn đủ; nhánh mề đay không đổi.
- Khi một quy tắc mức 2 đã đúng, câu khởi phát được hỏi như câu lẻ (cả ở Ho, Đau ngực).
- Phản vệ điển hình vẫn được bắt ở màn sàng lọc cấp cứu (`es_anaphylaxis`, không bị nhiễu "Không rõ").
- Câu `allergen_exposure` đổi mốc: "trước khi khó chịu" thay cho "2 giờ trước" (mục 5).
- Chưa mở được NHS Anaphylaxis, Thông tư 51/2017/TT-BYT, WAO 2020.

### 3.4 Trẻ em, đường thở

**`rf_stridor`** (mức 2, giữ). Câu hỏi đã hỏi lúc ngồi yên, không khóc; lượt R thêm vào câu gợi ý "chỉ rít khi khóc, quấy thì chưa tính", nên viêm thanh quản cấp chỉ rít khi khóc không thành mức 2.

**`rf_choking_episode`** (mức 2, giữ). Sửa câu gợi ý: sặc nước rồi hết ho ngay thì không tính (người lớn sặc nước rất hay gặp). Ghi rõ 3312/QĐ-BYT chưa xác nhận có bài dị vật đường thở.

**`rf_infant_apnea`** (mức 1, giữ). Thêm nguồn đã xác minh `nice-ng254` (ngừng thở, tím: nguy cơ cao). Cơn nín thở khi khóc ở trẻ 6 tháng – 5 tuổi có thể bị trả lời "có": khuyên quá mức, chấp nhận.

**`rf_child_chest_indrawing`** (mức 2, giữ, **bác sĩ cần quyết định**).
- WHO IMCI 2014: rút lõm lồng ngực không kèm dấu hiệu nguy hiểm toàn thân, không thở rít là viêm phổi, kháng sinh uống tại nhà, khám lại sau 3 ngày (tương đương mức 3).
- NICE: rút lõm nặng là chỉ định chuyển cấp cứu ở viêm tiểu phế quản (NG9); bảng đèn giao thông của NG143 xếp rút lõm vừa – nặng vào nhóm đỏ (theo trí nhớ, chưa mở lại).
- Giữ mức 2: câu hỏi chỉ hỏi lõm **sâu** (đã sửa theo IMCI: phần ngực dưới, nhìn khi bé nằm yên, không tính hõm nhẹ giữa các xương sườn); trẻ nhỏ viêm tiểu phế quản có rút lõm rõ thường cần oxy; mức 3 sẽ bỏ sót các ca này. Nếu bác sĩ theo IMCI thì hạ xuống mức 3.

**`rf_child_breathing`** (mức 3, giữ). Sửa câu `child_feeding_reduced` về mốc 24 giờ (NG9).

**`rf_pertussis_infant`** (mức 2, giữ, **thu hẹp**).
- Trước đây trẻ dưới 6 tháng chỉ cần nôn sau ho, hoặc ho thành cơn, là mức 2. Trẻ nhỏ bị cảm lạnh vài ngày đầu cũng ho thành cơn, hay nôn trớ sau ho.
- Nay mức 2 khi có tiếng rít cuối cơn, hoặc ho thành cơn kèm nôn sau ho, hoặc ho thành cơn đã từ 1 tuần (giai đoạn cơn của ho gà bắt đầu sau 1–2 tuần).
- Phần còn lại (trẻ dưới 6 tháng ho thành cơn hoặc nôn sau ho) là mức 3 qua `rf_pertussis_signs`. Ngừng thở, tím tái vẫn mức 1.
- NHS (theo trí nhớ): trẻ dưới 6 tháng có triệu chứng ho gà cần khám khẩn (mức 3); mức 2 là nhận định, vì trẻ nhỏ bị ho gà thường phải nằm viện. **Bác sĩ cần quyết định.**

**`rf_pertussis_signs`** (mức 3, giữ, **sửa**).
- Bỏ "ho từ 2 tháng" khỏi nhánh ho kéo dài: ho gà kéo dài tới khoảng 10 tuần, nhưng sau vài tuần kháng sinh không còn giúp giảm lây. Ho sau nhiễm vi rút kéo dài 2–3 tháng có cơn ho dồn dập nay là mức 4 (`rf_cough_2_weeks`), không còn mức 3.
- Thêm nhánh trẻ dưới 6 tháng (mục trên).
- Ho sau nhiễm vi rút từ 2 tuần đến dưới 2 tháng có cơn ho dồn dập vẫn là mức 3: trùng định nghĩa ca bệnh lâm sàng của WHO, không phân biệt được.

**`rf_cough_2_weeks`** (mức 4, giữ). Mốc 2 tuần hợp với sàng lọc lao của Bộ Y tế (theo trí nhớ, chưa mở được văn bản).

### 3.5 Bảy quy tắc cũ được mở phạm vi

| Quy tắc | Kết quả | Lý do |
|---|---|---|
| `rf_chest_pain` (mức 2) | **Bỏ lại Đau ngực** khỏi phạm vi | Thay bằng `rf_chest_pain_central` (không tính cơn đau vài giây). Tách quy tắc để không đổi cách hỏi của 4 triệu chứng chính đã phát hành. |
| `rf_chest_pain_with_features` (mức 1) | **Bỏ lại Đau ngực** khỏi phạm vi | `rf_chest_pain_spreading_or_systemic` đã gồm mọi dấu hiệu này, thêm nhánh tức ngực kèm khó thở. |
| `rf_palpitations_danger` (mức 2) | Giữ | Với Khó thở, chỉ cần hồi hộp là mức 2: đúng NHS Heart palpitations ("999 or A&E" khi hồi hộp kèm khó thở). Cơn hoảng sợ cũng thành mức 2, chấp nhận. |
| `rf_pulse_extreme` (mức 2) | Giữ | Như ba triệu chứng chính lô 1. |
| `rf_symptomatic_bradycardia` (mức 1) | Giữ | Với Khó thở, Đau ngực, chỉ cần mạch dưới 40 lần mỗi phút. |
| `rf_shock_cold_and_weak` (mức 1) | Giữ | Dấu hiệu sốc không phụ thuộc triệu chứng chính. |
| `rf_febrile_shock_signs` (mức 1) | Giữ | Câu Sốt được đặt sau nhóm dấu hiệu nguy hiểm chung (mục 4) để quy tắc ba dấu hiệu này còn được xét. |

**Quy tắc chung** (không ghi phạm vi) đã xem: `rf_sepsis_multiple_signs` với Khó thở chỉ cần sốt kèm một nhóm nữa (khó thở đã là một nhóm), hợp với cách đếm kiểu qSOFA (thở nhanh là một tiêu chí); `rf_fever_critical_phase_signs` cần trả lời "không ho", nên ở Khó thở, Đau ngực chỉ đúng sau khi đã hỏi ho; `rf_high_risk_fever_breathing` làm người từ 65 tuổi sốt kèm khó thở thành mức 2 ngay câu Sốt (đã tính khi sắp thứ tự, mục 4). Không sửa.

### 3.6 Quy tắc thêm mới

- `rf_chest_pain_central` (mức 2, mục 3.1). Tổng số quy tắc: 144 → 145.

---

## 4. Danh sách dấu hiệu nguy hiểm và nhóm câu hỏi

Cách bộ suy luận hỏi (`packages/engine/src/session.ts`): khi một quy tắc mức 2 đã đúng, chỉ hỏi tiếp dấu hiệu lẻ làm một quy tắc mức 1 thành đúng (không giới hạn số câu), rồi cặp hai dấu hiệu trong tối đa 4 câu ở pha này; quy tắc cần từ ba dấu hiệu không còn được xét. Câu "Không rõ" chỉ được hỏi lại bằng câu thay thế khi dấu hiệu nằm trong danh sách dấu hiệu nguy hiểm (không phải nhóm hỏi tiếp). Vì vậy cần hỏi trước "nửa đầu" của các quy tắc mức 1 nhiều dấu hiệu.

**Đau ngực** (trước: tức ngực, thời gian, nhóm dấu hiệu nguy hiểm, nhóm chung, sốt, nhóm sốt, số ngày sốt):
- Nay: thời gian → `chest_pain_red_flags` → `general_danger_signs` → sốt → tức nặng giữa ngực → **sưng đau một bên bắp chân** (thêm) → nhóm sốt → số ngày sốt.
- Câu tức ngực đứng đầu thì khi trả lời "có" (mức 2), 7 dấu hiệu đi kèm phải hỏi từng câu một thay cho một danh sách đánh dấu, và tay chân lạnh kèm mệt lả, sốc khi sốt không còn được xét.
- Câu sưng bắp chân: `rf_pe_signs` là quy tắc mức 1 một dấu hiệu ở Đau ngực, nhưng câu này chỉ nằm ở nhóm hỏi tiếp `clot_risk`, nơi câu "Không rõ" không được hỏi lại. Mô phỏng nhiễu: thuyên tắc phổi ra mức 3 ở 4/20 lần; sau khi thêm: 0/20.

**Khó thở** (trước: các nhóm trẻ em, dị nguyên, mức độ, nhóm dấu hiệu, khởi phát, hen, bệnh phổi tắc nghẽn mạn tính, thuốc cắt cơn, nhóm chung, sốt…):
- Nay: các nhóm trẻ em → đã biết hen → dị nguyên → `general_danger_signs` → `dyspnea_red_flags` → sốt → bệnh phổi tắc nghẽn mạn tính → thuốc cắt cơn → khởi phát → mức độ → nhóm sốt → số ngày sốt.
- Trước đây câu mức độ đứng thứ hai: trả lời "ngồi nghỉ cũng khó thở" (rất hay gặp) là mức 2 ngay, rồi cặp "hen + thuốc cắt cơn không đỡ" và "tức ngực + vã mồ hôi" thường không được hỏi tới. Mô phỏng: hen đã xịt thuốc không đỡ, khó thở lúc nghỉ, ra mức 1 ở mọi lần; nhồi máu cơ tim biểu hiện bằng khó thở đột ngột: mức 1.

**Ho** (trước: các nhóm trẻ em, `cough_red_flags`, mức độ, ho ra nhiều máu, nhóm chung, sốt…):
- Nay: các nhóm trẻ em → `general_danger_signs` → `cough_red_flags` → sốt → nhóm sốt → mức độ khó thở → ho ra nhiều máu → số ngày sốt → thời gian ho.
- Khi tay chân lạnh làm quy tắc sốc mức 2 đúng, câu Sốt còn được hỏi như câu lẻ của nhiễm khuẩn huyết. Mô phỏng viêm phổi có sốc: mức 1.

**Nhóm câu hỏi:** không đổi thành phần; mọi nhóm vẫn tối đa 7 mục. Nhãn trong danh sách đánh dấu được sửa (mục 5). `chest_pain_red_flags` đã đủ 7 mục, nên "nôn" không thêm vào được; nôn hầu như luôn đi cùng buồn nôn (đã có).

---

## 5. Câu chữ dấu hiệu

Nhãn (`label_vi`) là chữ hiện trong danh sách đánh dấu của nhóm câu hỏi, nên được sửa cho người dân đọc hiểu.

| Dấu hiệu | Trường | Cũ | Mới | Lý do |
|---|---|---|---|---|
| `wheeze` | help_vi | "Tiếng rít nhỏ, kéo dài, nghe rõ hơn khi thở ra…" | "Tiếng kêu như huýt sáo nhỏ trong ngực, nghe rõ hơn khi thở ra…" | Tránh chữ "rít" (dành cho thở rít khi hít vào); cha mẹ dễ lẫn hai dấu hiệu. |
| `wheeze` | alt_question | "…có nghe tiếng rít nhỏ kéo dài trong ngực không?" | "Khi thở ra, trong ngực có tiếng kêu như huýt sáo nhỏ không?" | Như trên. |
| `stridor` | label_vi | "Thở rít khi ngồi yên" | "Thở rít khi hít vào, cả lúc nằm, ngồi yên" | Nhãn hiện trong nhóm trẻ dưới 5 tuổi: trẻ nhỏ nằm nhiều hơn ngồi; nói rõ thì hít vào. |
| `stridor` | help_vi | "…Trẻ bị viêm thanh quản hay kèm ho ông ổng." | "Tiếng rít to, thô khi hít vào, khác tiếng khò khè như huýt sáo khi thở ra. Chỉ rít khi khóc, quấy thì chưa tính." | Viêm thanh quản cấp nhẹ chỉ rít khi khóc: không phải dấu hiệu mức 2 (IMCI: thở rít khi nằm yên). |
| `choking_episode` | label_vi | "Bắt đầu sau khi bị sặc, hóc" | "Bắt đầu ngay sau khi bị hóc, sặc đồ ăn, đồ vật" | Dị vật là đồ ăn, đồ vật; nhãn hiện trong nhóm. |
| `choking_episode` | help_vi | (thêm câu) | "Sặc nước rồi hết ho ngay thì không tính." | Người lớn sặc nước rất hay gặp, không phải dị vật. |
| `hemoptysis_large` | question_vi | "Máu ho ra có nhiều không, hơn vài vệt máu lẫn trong đờm?" | "Có ho ra máu tươi, nhiều hơn vài vệt máu lẫn trong đờm không?" | Câu cũ không trả lời được bằng Có/Không. Ngưỡng giữ "hơn vài vệt máu" (theo trí nhớ, NHS dùng ngưỡng này). |
| `hemoptysis_large` | alt_question | "Mỗi lần ho có ra máu tươi nhiều, từ một thìa trở lên không?" | "Có lần ho ra máu tươi, từ khoảng một thìa (muỗng) trở lên không?" | "Một lần" thay cho "mỗi lần" (một lần ra nhiều đã là dấu hiệu); thêm từ miền Nam. |
| `allergen_exposure` | question_vi | "Trong 2 giờ trước, có ăn món lạ…" | "Trước khi khó chịu, có ăn món lạ, dùng thuốc mới, bị ong đốt không?" | Câu cũ hỏi 2 giờ trước lúc dùng app, không phải trước lúc khởi phát; người khó thở nhiều ngày vừa uống thuốc mới cũng trả lời "có". |
| `allergen_exposure` | help_vi | (thêm câu đầu) | "Tính trong khoảng 2 giờ trước khi bắt đầu thấy khó chịu." | Phản vệ thường khởi phát trong vài phút đến 2 giờ sau tiếp xúc: giữ mốc 2 giờ. |
| `allergen_exposure` | alt_question | (mới) | "Trước khi khó chịu, có ăn, dùng thứ gì lạ, hoặc bị đốt không?" | Dùng trong quy tắc mức 1; câu "Không rõ" được hỏi lại. |
| `chest_indrawing` | label_vi | "Rút lõm lồng ngực" | "Ngực dưới lõm sâu mỗi lần hít vào (rút lõm lồng ngực)" | Từ thông dụng trước, thuật ngữ trong ngoặc; nhãn hiện trong nhóm. |
| `chest_indrawing` | question_vi | "…phần ngực dưới sườn có lõm sâu vào không?" | "Khi bé hít vào, phần ngực dưới (vùng bờ sườn) có lõm sâu vào không?" | IMCI: rút lõm là thành ngực dưới; "dưới sườn" dễ hiểu là bụng. |
| `chest_indrawing` | help_vi | "Nhìn khi bé nằm yên, không khóc: chỗ dưới sườn…" | "Nhìn khi bé nằm yên, không khóc, không bú: phần ngực dưới bị kéo lõm vào mỗi lần hít vào. Chỉ hõm nhẹ giữa các xương sườn thì chưa tính." | IMCI: chỉ phần mềm giữa các xương sườn lõm vào thì không phải rút lõm lồng ngực. |
| `chest_indrawing` | alt_question | "…chỗ dưới sườn hoặc giữa các xương sườn có hõm vào không?" | "Khi bé hít vào, vùng bờ sườn có bị hút lõm vào không?" | Câu cũ tính cả hõm giữa các xương sườn: sai theo IMCI, làm quy tắc mức 2 đúng quá rộng. |
| `apnea_cyanosis_spells` | help_vi | (mới) | "Kể cả lúc đang ho hoặc đang ngủ." | Ho gà ở trẻ nhỏ gây ngừng thở, tím trong cơn ho. |
| `child_feeding_reduced` | label_vi | "Bú, ăn chỉ khoảng một nửa" | "24 giờ qua chỉ bú, ăn được khoảng một nửa" | Mốc thời gian cụ thể. |
| `child_feeding_reduced` | question_vi | "Mấy ngày nay bé chỉ bú hoặc ăn được khoảng một nửa mọi ngày không?" | "Trong 24 giờ qua, bé chỉ bú, ăn được khoảng một nửa mọi ngày không?" | NG9 (theo trí nhớ) xét lượng bú 50–75% trong 24 giờ qua; quy tắc viết tiếng Việt yêu cầu mốc cụ thể. |
| `asthma_known` | alt_question | (mới) | "Có được bác sĩ cho bình xịt dùng khi lên cơn khó thở không?" | Dùng trong quy tắc mức 1. Mô phỏng nhiễu: hen xịt thuốc không đỡ ra mức 2–3 ở 8/20 lần; sau khi thêm hai câu thay thế: 0/20. |
| `reliever_no_relief` | alt_question | (mới) | "Sau khi xịt thuốc vài lần, vẫn còn khó thở như trước không?" | Như trên. |
| `pain_radiates_arm_jaw` | alt_question | "Lúc đau, có thấy đau hoặc tê lan lên cổ, hàm, vai, tay không?" | "Ngoài chỗ đau chính, có đau lan cả lên cổ, hàm, vai hoặc tay không?" | "Tê" không phải đau lan; tê tay, tê quanh miệng rất hay gặp khi thở nhanh do lo âu, làm quy tắc mức 1 đúng sai. |

Đã xem, **không sửa**:
- `cough_duration`: các mốc 1 tuần, 2 tuần (sàng lọc lao), 2 tháng (8 tuần, ho mạn tính) đúng và dễ hiểu.
- `chest_pain_duration`: mốc 15 phút (mục 3.1); "hoặc vẫn đang đau" hợp với ý "không hết" của NHS. Lựa chọn "Chỉ vài giây rồi hết" nay có ý nghĩa cho hai quy tắc mức 2.
- `cold_sweat`, `nausea`, `leg_swelling_one_side`: câu thay thế đúng, dễ hiểu.
- `inspiratory_whoop`, `barking_cough`, `cough_paroxysms`, `post_tussive_vomiting`, `dyspnea_onset`, `dyspnea_severity`, `orthopnea`, `leg_swelling_both`, `chest_pain_*`, `night_sweats`, `hives`, `dermatomal_rash`, `tb_contact`, `copd_known`, `estrogen_use`: đúng về y khoa.

---

## 6. Dấu hiệu, quy tắc đề xuất (người bảo trì quyết định)

Lượt R không được tạo dấu hiệu mới. Đề xuất, xếp theo ích lợi:

1. **`dyspnea_now`** (có/không): "Lúc này có còn khó thở không?". `dyspnea_severity` hỏi lúc khó thở nhất, nên cơn hoảng sợ đã qua vẫn thành mức 2. Cần thận trọng: thuyên tắc phổi có thể đỡ tạm thời.
2. **`chest_pain_now`** (có/không): "Lúc này có còn đau ngực không?". CG95 phân biệt đang đau, đau trong 12 giờ qua, đau từ 12–72 giờ trước; NHS phân biệt đau không hết với đau đã hết nhanh. Lựa chọn "từ 15 phút trở lên, hoặc vẫn đang đau" đang gộp hai ý.
3. **`spo2_measured`** (nhiều lựa chọn, có "Chưa đo" trung tính): từ 95%, 92–94%, dưới 92%. Nhiều nhà đã có máy đo sau COVID-19; dưới 92% là chỉ định chuyển cấp cứu ở viêm tiểu phế quản (NG9, theo trí nhớ) và là dấu hiệu nặng ở viêm phổi, đợt cấp bệnh phổi tắc nghẽn mạn tính.
4. **`grunting`** (có/không, trẻ dưới 5 tuổi): "Mỗi lần thở ra, bé có rên khe khẽ không?". Thở rên là dấu hiệu nguy cơ cao (NG254, đã xác minh; NG9 theo trí nhớ). Nhóm `child_breathing_signs` đã đủ 7 mục: cần bỏ `wheeze` hoặc `choking_episode` ra nhóm khác.
5. **`respiratory_rate_counted`** (nhiều lựa chọn, có "Chưa đếm"): nhịp thở đếm trong 1 phút, theo ngưỡng IMCI (từ 60 dưới 2 tháng, từ 50 khi 2–12 tháng, từ 40 khi 1–5 tuổi). `breathing_difficulty` hiện gộp mọi mức.
6. **`reliever_used`** (có/không): "Đã xịt thuốc cắt cơn chưa?", đặt trước `reliever_no_relief`, để "Không" không còn hai nghĩa (đã xịt mà đỡ, hoặc chưa xịt). Khi đó có thể hạ `rf_breathless_chest_pressure` cho người bị hen đã xịt thuốc và đỡ.
7. **`chest_pain_tearing`** (có/không): đau như xé (ADD-RS). Chờ có nguồn ESC 2024.

Quy tắc đề xuất cho bác sĩ xem: hạ `rf_child_chest_indrawing` xuống mức 3 nếu theo IMCI (mục 3.4); nâng `rf_chest_pain_breathless`, `rf_breathless_chest_pressure` lên mức 1 nếu theo NHS Chest pain.

---

## 7. Kiểm tra tự động

`npm run kb:check`: **0 lỗi, 43 cảnh báo** (trước: 0 lỗi, 44 cảnh báo).
- Còn 26 cảnh báo nguồn chưa xác minh dùng cho bậc B ở lô 3 (trước: 27): không bớt thêm được, vì không mở được nguồn nào.
- Bớt 1 cảnh báo: `rf_chest_pain_breathless` thay `nhs-shortness-of-breath` (chưa xác minh) bằng `nhs-pulmonary-embolism` và `esc-pe-2019` (đã xác minh).
- `rf_hemoptysis_severe`: quy tắc mức 2 bậc C (đã có từ trước). Các cảnh báo khác không thuộc lô 3, không đổi.

---

## 8. Bộ dev

Bộ dev chưa có ca nào cho 3 triệu chứng chính mới. Thay đổi chỉ chạm tới các triệu chứng đã phát hành ở chỗ `rf_chest_pain`, `rf_chest_pain_with_features` trở về phạm vi cũ (bỏ Đau ngực).

| | Trước | Sau |
|---|---|---|
| Sạch | top1 75,7% · top3 94,9% · top10 98,1% · an toàn 99,5% · bỏ sót cấp cứu 0/106 · quá mức 6,9% · ECE 0,088 · 14 câu | giống hệt |
| Nhiễu | top1 71,2% · top3 90,5% · top10 96,3% · an toàn 98,1% · bỏ sót cấp cứu 10/530 · quá mức 18,7% · ECE 0,068 · 16 câu | giống hệt |

So từng ca (217 ca, chế độ sạch và 5 hạt giống nhiễu: mức xử trí, thứ hạng, số câu, 3 bệnh đầu): **không ca nào đổi**. Không ca cấp cứu nào bị bỏ sót thêm.

Mô phỏng 41 tình huống cho Ho, Khó thở, Đau ngực (mục 1): mọi tình huống cấp cứu ra đúng mức 1 hoặc 2 ở chế độ sạch. Khi lặp 20 lần với 15% "Không rõ", hầu hết giữ mức 1–2; còn có lần ra mức 3: phản vệ có khởi phát đột ngột (1/20 mức 3, 2/20 mức 2), phản vệ đã cho khởi phát "Không rõ" (5/20 mức 3, khi câu nổi ban hoặc mề đay ở phần hỏi tiếp cũng bị "Không rõ"). Trong mô phỏng, màn sàng lọc cấp cứu được trả lời "không"; người phản vệ thật thường chọn ngay mục dị ứng nặng ở màn này (không có nhiễu "Không rõ"). Mức 3 ở các tình huống bệnh nhẹ (cảm lạnh, lao, ho mạn tính) là do lô 3 chưa có bệnh nào: "nguyên nhân khác" chiếm toàn bộ xác suất.
