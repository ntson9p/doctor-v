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

---

## Vòng 2: đối chiếu nguồn (31/10/2026)

- Người thực hiện: `agent:pass-r`. Mạng đã mở: tải trang bằng `curl` vào thư mục tạm, đọc chữ bằng công cụ trích văn bản; PDF quét đọc bằng công cụ Read. Không dùng dịch vụ đọc hộ.
- Dùng **8 lần** WebSearch (tìm trang bóc tách động mạch chủ, tràn khí màng phổi, Thông tư 51/2017, 1851/QĐ-BYT, ho gà, định nghĩa ca bệnh ho gà của WHO).
- Không sửa `knowledge/conditions/` và bản nháp khác. Không đọc bộ ca giữ kín. Không chạy git.
- `npm run kb:check`: trước **0 lỗi, 43 cảnh báo**; sau **0 lỗi, 17 cảnh báo** (hết toàn bộ cảnh báo nguồn chưa xác minh của lô 3).
- `npm run eval -- --set dev`: trước và sau **giống hệt** (mục 2.6).

### 2.1 Nguồn của lô 3

| Nguồn | Kết quả | Ghi chú |
|---|---|---|
| `nhs-cough`, `nhs-shortness-of-breath`, `nhs-coughing-up-blood`, `nhs-croup`, `nhs-bronchiolitis`, `nhs-whooping-cough`, `nhs-anaphylaxis`, `nhs-heart-failure` | Đã xác minh | Ghi ngày rà soát và đủ các mục "Call 999", "Call 999 or go to A&E", "urgent GP / 111", "See a GP" trong `notes_vi`. |
| `nhs-asthma-attack` | Đã xác minh | Địa chỉ cũ chuyển về trang Asthma; đã đổi `url`, `title`. |
| `nhs-aortic-dissection`, `nhs-pneumothorax` | **Không xác minh được** | Hai trang đã bị gỡ khỏi www.nhs.uk (lỗi 404, không còn trong mục lục và ô tìm kiếm); NHS inform từ chối truy cập (403). Không trích nữa, giữ id. |
| `hse-aortic-dissection` (mới) | Đã xác minh | HSE Ireland, rà soát 17/02/2026. Thay trang NHS về bóc tách động mạch chủ. Nhãn L3 (© HSE). |
| `nice-ng9` | Đã xác minh | Xuất bản 01/6/2015, cập nhật 09/8/2021. Mục chuyển viện là **1.2**, không phải 1.3 như ghi theo trí nhớ; đã sửa locator. SpO2 dưới 92% từ 2021 chỉ là tiêu chí cân nhắc chuyển viện. |
| `gina-2024` | Giữ chưa xác minh | Đã có bản 2026. Thêm `gina-2026` (PDF 05/2026, đã xác minh) và đổi các quy tắc sang id mới. Bản nháp lượt A còn trích `gina-2024`: lượt C nên đổi. |
| `gold-2025` | Giữ chưa xác minh | Đã có báo cáo 2026 (bản 1.3, 08/12/2025); chưa có bản 2027. Thêm `gold-2026` (đã xác minh). Hình 4.4 (chỉ định nhập viện) là hình ảnh, không trích được chữ. |
| `who-emro-pertussis-surveillance` (mới) | Đã xác minh | Định nghĩa ca ho gà lâm sàng của WHO: ho ít nhất 2 tuần kèm ho từng cơn, rít khi hít vào hoặc nôn sau ho. Định nghĩa riêng cho trẻ dưới 1 tuổi (ghi theo trí nhớ trước đây) không có trên trang này: đã bỏ khỏi ghi chú. |

**Ba nguồn NICE cũ** (`nice-cg95`, `nice-ng143`, `nice-ng254`): nice.org.uk nay cho tải trực tiếp. Đã mở lại các trang Overview, Recommendations, History; nội dung khớp ghi chú cũ. Thay câu "đọc qua r.jina.ai" bằng ghi chú mới, thêm dữ kiện dùng ở vòng này (CG95 1.2.1.3, 1.2.1.5, 1.2.1.7, 1.2.1.8; NG143 1.2.5, 1.3.3; NG254 bảng 1).

**Nguồn cũ đọc thêm:** `who-imci-chart-booklet-2014` (thêm Module 3, Cough or difficult breathing, cùng bộ tài liệu trên IRIS); `byt-qd-3312-2015` (thêm bài Dị vật đường thở, mục Trẻ bị dị vật đường thở, bài Viêm phổi do vi khuẩn, bài Viêm tiểu phế quản). Văn bản 3312/QĐ-BYT năm 2015 vẫn đọc qua bản đăng lại trên vnras.com, vì kcb.vn chỉ có tệp RAR.

### 2.2 Văn bản Bộ Y tế thêm vào sổ nguồn

| Id | Văn bản | Bản đã mở | Dùng cho |
|---|---|---|---|
| `byt-qd-162-2024` | 162/QĐ-BYT ngày 19/01/2024, Hướng dẫn chẩn đoán, điều trị và dự phòng bệnh lao; thay 1314/QĐ-BYT (24/3/2020) | PDF có chữ ký số, cổng thông tin một tỉnh (vnPortal) | `rf_cough_2_weeks`, `rf_hemoptysis` |
| `byt-qd-1851-2020` | 1851/QĐ-BYT ngày 24/4/2020, hen người lớn và trẻ từ 12 tuổi | PDF trên vilaphoikhoe.kcb.vn | `rf_dyspnea_cannot_speak`, `rf_dyspnea_at_rest`, `rf_asthma_reliever_fails` |
| `byt-qd-4888-2016` | 4888/QĐ-BYT ngày 12/9/2016, hen trẻ em dưới 5 tuổi | PDF trên vilaphoikhoe.kcb.vn | `rf_asthma_reliever_fails`, `rf_child_chest_indrawing` |
| `byt-qd-2767-2023` | 2767/QĐ-BYT ngày 04/7/2023, bệnh phổi tắc nghẽn mạn tính | PDF có chữ ký số trên kcb.vn | `rf_copd_reliever_fails`, `rf_copd_flare`, `rf_dyspnea_at_rest` |
| `byt-qd-1857-2022` | 1857/QĐ-BYT ngày 05/7/2022, suy tim cấp và mạn | PDF có chữ ký trên kcb.vn | `rf_heart_failure_signs` |
| `byt-tt-51-2017` | Thông tư 51/2017/TT-BYT ngày 29/12/2017, phòng, chẩn đoán và xử trí phản vệ; hiệu lực 15/02/2018; thay Thông tư 08/1999/TT-BYT | Bản quét có dấu trên kcb.vn (đọc trang 1–7) | `rf_anaphylaxis_signs` |

- Ba id trùng bản nháp của lượt A (`byt-qd-162-2024`, `byt-qd-1851-2020`, `byt-qd-2767-2023`): bản trong `knowledge/sources/` nay đã xác minh; lượt C dùng bản này, bỏ bản nháp.
- Số hiệu theo trí nhớ ở vòng 1: lao **sai** (1314/QĐ-BYT đã bị 162/QĐ-BYT thay); hen 1851/QĐ-BYT đúng; bệnh phổi tắc nghẽn mạn tính là 2767/QĐ-BYT năm 2023; Thông tư 51/2017 đúng ngày.
- **Ho gà:** không tìm được hướng dẫn chẩn đoán, điều trị của Bộ Y tế (hai lần tìm trên các trang của Bộ, Cục và Viện); chỉ có công văn chỉ đạo phòng chống dịch. Dùng NHS và WHO.
- **Dị vật đường thở ở trẻ:** có trong 3312/QĐ-BYT năm 2015 (đã có trong sổ), không cần văn bản riêng.

### 2.3 Quy tắc đã sửa

Chỉ **một** quy tắc đổi mức. Các quy tắc khác giữ mức, được thay nguồn chưa xác minh bằng nguồn đã mở, ghi locator và bỏ mọi lời "theo trí nhớ".

| Quy tắc | Thay đổi | Lý do |
|---|---|---|
| `rf_pe_signs` | **Mức 1 → mức 2**; `reason_vi` bỏ "gọi 115 ngay" | Không nguồn nào xếp tổ hợp này vào "chỉ gọi 999": NHS Pulmonary embolism và NHS Coughing up blood ghi "Call 999 or go to A&E" (mức 2), NHS Shortness of breath ghi khó thở kèm đau, sưng một bên chân thì gọi 111 (mức 3). ESC 2019 chỉ nói khả năng bệnh cao. Tình huống mức 1 vẫn có quy tắc riêng (tức ngực kèm khó thở, choáng, nói không trọn câu, sốc). `rf_breathless_leg_swelling` của lô 1 (đã phát hành) vẫn mức 1: bác sĩ nên xem cho thống nhất. |
| `rf_chest_pain_ongoing` | Nguồn, ghi chú | CG95 1.2.1.3 xác nhận mốc **15 phút**. |
| `rf_chest_pain_central`, `rf_chest_pain_spreading_or_systemic`, `rf_chest_pain_exertional` | Nguồn, ghi chú | CG95 mở lại; thêm NHS Shortness of breath (ngực tức, nặng: "999 or A&E"). |
| `rf_chest_pain_sudden_severe`, `rf_aortic_dissection_signs` | Thay `nhs-aortic-dissection`, `nhs-pneumothorax` bằng `hse-aortic-dissection` | Trang NHS đã bị gỡ. HSE: đau ngực, lưng trên đột ngột, dữ dội, như xé; gọi cấp cứu hoặc đến khoa cấp cứu ngay. Bóc tách giữ mức 1 theo NHS Chest pain (đau lan ra lưng). |
| `rf_hemoptysis`, `rf_hemoptysis_severe` | Nguồn, ghi chú | NHS Coughing up blood đúng cả hai mức và ngưỡng "hơn vài vệt máu". `rf_hemoptysis_severe` vẫn bậc C (còn 1 cảnh báo). |
| `rf_dyspnea_cannot_speak` | Nguồn | NHS Heart failure (chỉ 999), 1851/QĐ-BYT (nói từng từ là cơn nặng), GINA 2026. NHS Shortness of breath ghi "999 or A&E": giữ mức 1 như màn sàng lọc cấp cứu. |
| `rf_dyspnea_at_rest` | Nguồn | 2767/QĐ-BYT Bảng 3.2: khó thở khi nghỉ là triệu chứng nặng, cần nhập viện; 1851/QĐ-BYT Bảng 9. |
| `rf_dyspnea_sudden`, `rf_breathless_fainting` | Bỏ nguồn không hợp | NHS Collapsed lung đã bị gỡ; NHS Shortness of breath không nói về khởi phát đột ngột, ngất. |
| `rf_breathless_chest_pressure` | Nguồn, basis judgment → verbal | Xem quyết định 2 (mục 2.4). |
| `rf_asthma_reliever_fails` | Nguồn | NHS Asthma: không đỡ sau liều tối đa (10 nhát) thì chỉ gọi 999; 1851/QĐ-BYT, 4888/QĐ-BYT, GINA 2026 tr. 181. |
| `rf_copd_reliever_fails` | Nguồn, basis judgment → verbal | 2767/QĐ-BYT Bảng 3.2: đáp ứng không tốt với xử trí ban đầu thì điều trị nội trú. |
| `rf_copd_flare` | Nguồn | 2767/QĐ-BYT mục 3.1, GOLD 2026 tr. 39: đợt cấp nặng lên trong vòng 14 ngày. Việc vòng 1 bỏ "khó thở tăng dần nhiều tuần" đúng với định nghĩa này. |
| `rf_heart_failure_signs` | Nguồn | NHS Heart failure: khó thở khi nằm thì khám khẩn hoặc gọi 111 (mức 3); 1857/QĐ-BYT Bảng 3. NHS Shortness of breath xếp thấp hơn (mức 4): giữ mức 3. |
| `rf_anaphylaxis_signs` | Nguồn, ghi chú | Thông tư 51/2017 Phụ lục I, II thay tiêu chuẩn WAO ghi theo trí nhớ; NHS Anaphylaxis "Call 999". Nhánh mề đay đúng bệnh cảnh 1, 2. Nhánh tiếp xúc dị nguyên kèm một dấu hiệu hô hấp hoặc tuần hoàn rộng hơn bệnh cảnh 2 nhưng đúng danh sách "Call 999" của NHS. |
| `rf_stridor` | Nguồn | IMCI Module 3: thở rít khi trẻ nằm yên thì chuyển viện khẩn cấp; NHS Croup. |
| `rf_choking_episode` | Nguồn, basis judgment → verbal | 3312/QĐ-BYT năm 2015 **có** hai phần về dị vật đường thở: trẻ tắc nghẽn đường thở chưa rõ nguyên nhân nhưng vẫn tự thở cần đưa ngay tới bệnh viện (tr. 44–45); bài Dị vật đường thở (tr. 279–282). |
| `rf_infant_apnea` | Nguồn, locator | NG9 1.2.1 (không phải 1.3); NHS Bronchiolitis (chỉ 999). |
| `rf_child_breathing` | Nguồn | IMCI Module 3, 3312/QĐ-BYT, NG9 1.2.2, NHS Bronchiolitis. |
| `rf_pertussis_infant` | Ghi chú | NHS: trẻ dưới 6 tháng có triệu chứng ho gà thì khám khẩn (mức 3), nhưng thường phải điều trị ở bệnh viện. Giữ mức 2 (nhận định), **bác sĩ cần quyết định**. |
| `rf_pertussis_signs` | Nguồn | Định nghĩa ca lâm sàng của WHO (trang EMRO) đúng nhánh "ho từ 2 tuần kèm cơn ho hoặc nôn sau ho". NHS: kháng sinh khi chẩn đoán trong 3 tuần đầu. |
| `rf_cough_2_weeks` | Nguồn | 162/QĐ-BYT: ho kéo dài trên 2 tuần là triệu chứng nghi lao quan trọng nhất; IMCI: ho trên 2 tuần thì chuyển khám lao, hen; NHS Cough: ho trên 3 tuần thì khám bác sĩ gia đình (mức 4). |
| `rf_palpitations_danger` (mở phạm vi) | Ghi chú | NHS Shortness of breath xếp khó thở kèm hồi hộp vào "gọi 111" (mức 3), thấp hơn NHS Heart palpitations ("999 or A&E"). Giữ mức 2, bác sĩ cần xem. |

Sáu quy tắc mở phạm vi còn lại (`rf_chest_pain`, `rf_chest_pain_with_features`, `rf_pulse_extreme`, `rf_symptomatic_bradycardia`, `rf_shock_cold_and_weak`, `rf_febrile_shock_signs`): không có nguồn lô 3 nào nói khác, không sửa. Logic của vòng 1 giữ nguyên: không nguồn nào mâu thuẫn.

Ghi chú đầu khối lô 3 trong `red-flags.yaml` và chú thích của `chest_pain.yaml` (câu sưng bắp chân) được cập nhật. Thêm `byt-qd-162-2024` vào `sources` của `cough.yaml`.

### 2.4 Ba quyết định

**1. `rf_chest_pain_breathless` (đau ngực kèm khó thở): giữ mức 2.**
- Chỉ NHS Chest pain ghi "Call 999" (mức 1); danh sách đó nhằm nhồi máu cơ tim.
- Ba trang NHS khác đều ghi "Call 999 or go to A&E" (mức 2): Shortness of breath (ngực tức, nặng, đau lan), Pulmonary embolism (đau ngực, khó thở đột ngột), Whooping cough (thở khó kèm đau ngực tăng khi thở, ho).
- Phần nhồi máu cơ tim của CG95 1.2.1.3 đã là mức 1 qua các quy tắc khác: tức nặng giữa ngực kèm khó thở, đau từ 15 phút, kèm vã mồ hôi, buồn nôn, choáng, đau lan.
- Được: không khuyên gọi 115 cho người viêm phổi, viêm phế quản đau kiểu màng phổi. Mất: lệch với NHS Chest pain.

**2. `rf_breathless_chest_pressure` (khó thở kèm tức ngực, ở Khó thở và Ho): giữ mức 2.**
- NHS Shortness of breath, trang dành đúng cho triệu chứng chính này, ghi khó thở kèm ngực tức hoặc nặng thì gọi 999 hoặc đến cấp cứu: đúng mức 2.
- Kèm vã mồ hôi, đau lan, buồn nôn, choáng vẫn mức 1.
- Ngực tức là triệu chứng chính của hen (NHS Asthma), nên mức 1 sẽ khuyên gọi 115 cho mọi cơn hen có tức ngực.

**3. `rf_child_chest_indrawing` (rút lõm lồng ngực ở trẻ dưới 5 tuổi): giữ mức 2.**
- Nguồn cho người chăm trẻ đều khuyên đi ngay: NHS Shortness of breath và Croup ("999 or A&E" khi bụng hõm vào dưới bờ sườn), NHS Bronchiolitis (chỉ 999), 4888/QĐ-BYT (thở co kéo: đưa đến phòng cấp cứu gần nhất).
- NICE: NG143 xếp rút lõm vừa, nặng vào nhóm đỏ, phải được khám trực tiếp trong 2 giờ; NG9 chuyển cấp cứu khi rút lõm rõ.
- IMCI 2014 và 3312/QĐ-BYT xếp rút lõm (không có dấu hiệu nguy hiểm) là viêm phổi, điều trị ngoại trú. Nhưng đó là sau khi nhân viên y tế đã khám và cho kháng sinh; IMCI cũng dặn người chăm trẻ đưa trẻ trở lại **ngay** khi trẻ khó thở.
- Được: không bỏ sót viêm tiểu phế quản, viêm phổi nặng cần oxy. Mất: một số trẻ viêm phổi nhẹ được khuyên đi ngay thay vì trong 24 giờ.

### 2.5 Câu chữ dấu hiệu

Không sửa câu chữ nào: không nguồn nào cho thấy sai.
- `allergen_exposure` (mốc 2 giờ trước khi khó chịu): Thông tư 51/2017 ghi phản vệ xuất hiện từ vài giây đến vài giờ; NHS ghi thường trong vài phút. Mốc 2 giờ nằm trong khoảng đó.
- `chest_pain_duration` (mốc 15 phút): đúng CG95 1.2.1.3.
- `cough_duration` (mốc 2 tuần): 162/QĐ-BYT ghi "trên 2 tuần", IMCI "more than 2 weeks"; lựa chọn "Từ 2 tuần" khác không đáng kể.
- `hemoptysis_large` ("hơn vài vệt máu"): đúng NHS Coughing up blood.
- `stridor`, `chest_indrawing`: đúng IMCI Module 3 (rít khi trẻ yên; thành ngực dưới lõm vào khi hít vào).
- `child_feeding_reduced` ("24 giờ qua, khoảng một nửa"): NG9 1.2.2 ghi 50–75% lượng thường ngày, không nêu 24 giờ; NHS ghi "ít hơn hẳn bình thường". Mốc 24 giờ là theo quy tắc viết tiếng Việt, không mâu thuẫn nguồn; giữ.

### 2.6 Kiểm tra

- `npm run kb:check`: 0 lỗi, 17 cảnh báo. Còn 1 cảnh báo của lô 3 (`rf_hemoptysis_severe` bậc C); các cảnh báo khác có từ trước, không thuộc lô 3.
- `npm run test`: 77/77 đạt.
- `npm run eval -- --set dev`, trước và sau giống hệt: sạch top1 75,7% · top3 94,9% · an toàn 99,5% · bỏ sót cấp cứu 0/106 · quá mức 6,9%; nhiễu top1 71,2% · an toàn 98,1% · bỏ sót cấp cứu 10/530 · quá mức 18,7%. Bộ dev chưa có ca cho Ho, Khó thở, Đau ngực; các triệu chứng đã phát hành không đổi.

### 2.7 Dấu hiệu còn thiếu (đề xuất cho người bảo trì)

Bổ sung cho danh sách ở mục 6, xếp theo ích lợi:
1. **`grunting`** (thở rên, trẻ dưới 5 tuổi): nay có đủ nguồn (NHS Shortness of breath, Croup, Bronchiolitis; NG9 1.2.1; NG143 1.2.5; NG254 bảng 1; 3312/QĐ-BYT viêm phổi nặng). Nên ưu tiên.
2. **`spo2_measured`**: ngưỡng dưới 92% có trong GINA 2026, 1851/QĐ-BYT, 4888/QĐ-BYT, 2767/QĐ-BYT, NG9; dưới 90% trong NG254 và 3312/QĐ-BYT.
3. **`cyanosis`** cho người lớn (môi, da tím tái, xám): NHS Shortness of breath, Heart failure, Anaphylaxis. Hiện chỉ có ở màn sàng lọc cấp cứu và ở `apnea_cyanosis_spells` (trẻ dưới 5 tuổi).
4. **`drooling_cannot_swallow`** (chảy dãi, khó nuốt, muốn ngồi hơn nằm): NHS Croup xếp "999 or A&E".
5. **`chest_pain_tearing`** (đau như xé): nay có nguồn HSE.
6. **`no_reliever_inhaler`** hoặc `reliever_used`: NHS Asthma ghi đang lên cơn mà không có bình xịt thì gọi 999.
7. **`frothy_pink_sputum`** (ho ra đờm hồng có bọt) và **`sudden_weight_gain`**: NHS Heart failure (khám khẩn), 1857/QĐ-BYT (tăng trên 2 kg/tuần).
8. **`throat_tightness`** (họng thắt, khó nuốt, sưng môi lưỡi): NHS Anaphylaxis "Call 999"; hiện chỉ có ở màn sàng lọc cấp cứu.

Các đề xuất `dyspnea_now`, `chest_pain_now`, `respiratory_rate_counted` của vòng 1 vẫn giữ.

### 2.8 Việc cho bác sĩ

- Duyệt `rf_pe_signs` mức 2 và cân nhắc hạ `rf_breathless_leg_swelling` (lô 1) cho thống nhất.
- Ba quyết định ở mục 2.4.
- `rf_pertussis_infant` (mức 2 so với mục khám khẩn của NHS) và `rf_palpitations_danger` ở Khó thở (mức 2 so với "gọi 111" của NHS Shortness of breath).
