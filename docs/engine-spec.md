# Đặc tả bộ suy luận

Tài liệu mô tả **chính xác những gì mã nguồn `packages/engine/` đang làm**. Khi sửa mã, phải sửa tài liệu này cùng lúc.

- Căn cứ: `docs/research/symptom-checker-methodology.md` (mục 4).
- Mọi giá trị số nằm trong `knowledge/meta/engine-params.yaml`; tên tham số trong tài liệu là tên trong file đó.
- Các điểm khác với đặc tả trong báo cáo nghiên cứu được ghi ở mục 12.

---

## 1. Tổng quan

Bộ suy luận là **mô hình Bayes đơn bệnh** ("single-fault"): giả định triệu chứng chính do **một** nguyên nhân gây ra.

- **Giả thuyết:** các bệnh trong cơ sở tri thức có khai báo prior cho triệu chứng chính, cộng một giả thuyết **"nguyên nhân khác"** (`other`) đại diện cho mọi bệnh chưa có.
- **Bằng chứng:** câu trả lời của người dùng cho các dấu hiệu (triệu chứng, yếu tố nguy cơ, phơi nhiễm).
- **Mức xử trí:** suy ra từ các **quy tắc cứng** và từ **xác suất cộng dồn**. Cách nào khẩn hơn thì lấy cách đó.
- **Tất định:** cùng dữ liệu và cùng câu trả lời luôn cho cùng kết quả. Không có yếu tố ngẫu nhiên.

## 2. Luồng một phiên kiểm tra

Hàm `nextStep` quyết định bước tiếp theo từ trạng thái hiện tại, theo thứ tự:

1. **Sàng lọc cấp cứu** (`rules/emergency-screen.yaml`): hỏi nếu chưa trả lời. Giao diện thường hỏi màn này trước cả tuổi và giới, rồi truyền câu trả lời vào khi bắt đầu phiên.
2. **Dừng ngay ("emergency")** nếu đã có quy tắc hoặc mục sàng lọc cấp cứu cho mức 1–2.
3. **Dấu hiệu nguy hiểm bắt buộc** của triệu chứng chính (`red_flags`), theo đúng thứ tự khai báo.
   - Mỗi mục là một dấu hiệu, hoặc một nhóm chọn nhiều.
   - Chỉ hỏi những mục áp dụng cho đối tượng (giới, nhóm tuổi), đã thỏa điều kiện hỏi (`requires`) và chưa được trả lời.
4. **Hỏi lại bằng cách diễn đạt khác:** mỗi dấu hiệu nguy hiểm bị trả lời "Không rõ" mà có `alt_question` thì được hỏi lại một lần. Dấu hiệu nguy hiểm gồm: mục sàng lọc cấp cứu, mục trong `red_flags`, và dấu hiệu là điều kiện duy nhất của quy tắc mức 1–2.
5. **Nhóm câu hỏi tiếp nhận** (`intake`): triệu chứng đi kèm, bệnh nền.
6. **Trẻ dưới 2 tháng tuổi** (`screen_only_age_groups`): dừng ("screen_only"), không xếp hạng bệnh.
7. **Câu hỏi thích ứng** (mục 7), cho tới khi thỏa điều kiện dừng (mục 8).

Hai việc người dùng làm được bất cứ lúc nào:
- **Quay lại:** bỏ bước cuối cùng. Trạng thái là giá trị bất biến, nên quay lại không làm mất gì.
- **Dừng sớm:** ở phiên bản giao diện, chỉ hiện khi đã hỏi từ `soft_max_questions` câu trở lên. Các câu dấu hiệu nguy hiểm bắt buộc và nhóm tiếp nhận vẫn được hỏi hết trước khi dừng.

## 3. Prior

Với triệu chứng chính $c$, nhóm tuổi $a$ và ngữ cảnh $x$ (tháng, vùng):

$$\tilde\pi(d) = \text{base}(d \mid c, a)\cdot \operatorname{clamp}\Big(\prod_k \operatorname{clamp}(m_k, 0{,}1, 10),\ 0{,}01,\ 100\Big)$$

- $\text{base}$ lấy từ `by_age` nếu có, nếu không thì `default`. Các mức `P1`…`P6` đổi sang số theo `prior_levels`.
- $m_k$ là hệ số `prior_modifiers` có điều kiện (tháng, vùng, giới) khớp ngữ cảnh. Khi không biết tháng hoặc vùng, hệ số phụ thuộc thông tin đó không được áp dụng.
- Chỉ xét bệnh có prior cho $c$ và thỏa `applicability`. Loại trừ cứng chỉ dùng khi bất khả về sinh học.

**Chuẩn hóa:**

$$\pi(\text{other}) = \rho_c, \qquad \pi(d) = (1-\rho_c)\,\frac{\tilde\pi(d)}{\sum_{d'} \tilde\pi(d')}$$

trong đó $\rho_c$ là `other_prior` của triệu chứng chính, mặc định `other_prior` chung (0,15).

## 4. Likelihood

Với dấu hiệu $f$ có câu trả lời $v$ (bỏ qua câu "Không rõ" và dấu hiệu được triệu chứng chính ngầm định):

**Dấu hiệu có/không:**

$$P(f{=}\text{có} \mid h) = \begin{cases} p_{hf} & \text{nếu bệnh } h \text{ có liên kết với } f \\ \ell_{f,c} & \text{nếu không (kể cả "other")} \end{cases}, \qquad P(f{=}\text{không} \mid h) = 1 - P(f{=}\text{có}\mid h)$$

- $p_{hf}$ là **tần suất quan sát** của dấu hiệu trong bệnh: 6 mức `frequency_levels` 0,005 / 0,025 / 0,20 / 0,50 / 0,80 / 0,95. Mức 0,005 (`very_rare`) dùng khi dấu hiệu ít gặp ở bệnh này hơn cả tỷ lệ nền 1% của dấu hiệu đặc hiệu. Nếu liên kết có `freq_by_age` cho nhóm tuổi của người bệnh, giá trị đó thay cho giá trị chung.
- $\ell_{f,c}$ là tỷ lệ nền (`leak`) của dấu hiệu, có thể khác theo triệu chứng chính (`leak_by_complaint`), tối thiểu `leak_floor`.
- Dấu hiệu có điều kiện (`requires`) dùng **tần suất có điều kiện** (kb-guide §2.1). Vì điều kiện luôn được thỏa trước khi hỏi, tích các likelihood chính là xác suất đồng thời.

**Dấu hiệu nhiều lựa chọn** ($K$ lựa chọn, phân bố $\theta_h$; bệnh không liên kết dùng `baseline`):

$$P(f{=}v \mid h) = \frac{\theta_{hv} + \alpha}{1 + K\alpha}, \qquad \alpha = \texttt{categorical\_smoothing} = 0{,}01$$

## 5. Chống đếm trùng và hệ số nhiệt

**Cụm** (`clusters.yaml`): các dấu hiệu tương quan trong cùng cụm $C$ có $n$ câu trả lời (không tính "Không rõ") được nhân trọng số

$$w_C = \frac{1}{1 + \rho_C (n - 1)}, \qquad \rho_C \in \{0{,}2;\ 0{,}5;\ 0{,}8\}.$$

**Hệ số nhiệt** $\tau$ (`temperature`) nhân vào tổng bằng chứng, không nhân vào prior:

$$\log P(h \mid E) = \log \pi(h) + \tau \sum_{f} w_f \log P(v_f \mid h) - Z$$

Toàn bộ tính trong không gian log. Bước chuẩn hóa dùng `logsumexp`. $\tau$ được chọn bằng `npm run eval:tune` (cực tiểu log loss trên bộ ca phát triển), trong khoảng 0,5–1. Giá trị khởi đầu là 1, nghĩa là chưa hiệu chỉnh.

## 6. Mức xử trí

**Mức 1 (gọi 115) … 5 (theo dõi tại nhà).** Mức cuối cùng là **mức khẩn nhất** trong các lý do sau.

### 6.1 Sàng lọc cấp cứu và quy tắc

**Quy tắc** (`rules/red-flags.yaml`) được đánh giá bằng **logic ba trị**:
- dấu hiệu chưa hỏi: không có bằng chứng (sai);
- dấu hiệu trả lời "Không rõ": chưa xác định (U);
- dấu hiệu triệu chứng chính ngầm định: có.

| Kết quả đánh giá | Mức đóng góp |
|---|---|
| Mục sàng lọc cấp cứu trả lời "có" | Mức của mục (1) |
| Quy tắc đúng | Mức của quy tắc |
| Quy tắc mức 1–2 ở trạng thái U, hoặc mục sàng lọc "Không rõ" | Mức 3. **Đúng mức của quy tắc** nếu người bệnh thuộc nhóm nguy cơ cao: nhóm tuổi trong `high_risk_age_groups`, hoặc có dấu hiệu trong `high_risk_findings` (có thai, suy giảm miễn dịch) |

### 6.2 Mức theo xác suất

Với $u(d)$ là mức xử trí của bệnh (`urgency`) và $q_k$ là `other_urgency_cumulative`:

$$P_k = \sum_{d:\ u(d) \le k} P(d) + P(\text{other})\cdot q_k, \qquad k = 1..4$$

- Mức theo xác suất là $k$ nhỏ nhất thỏa $P_k \ge \theta_k$, với `thresholds` = 0,10 / 0,02 / 0,10 / 0,25.
- **Ở mức 2**, thêm điều kiện riêng cho bệnh "không được bỏ sót":

$$\sum_{d:\ \text{cant\_miss},\ u(d)\le 2} P(d) \ge \texttt{cant\_miss\_threshold}\ (0{,}01)$$

- **Người từ 75 tuổi** (`elder_age_groups`): mọi ngưỡng nhân với `elder_threshold_factor` (0,5).
- Ngưỡng $\theta_k$ nhất quán với ma trận tổn thất ở mục 7: khi so hai mức kề nhau, $p^* = 1/(1+W)$; với $W = 49$ thì $p^* = 0{,}02$.

### 6.3 Chốt an toàn

Áp dụng sau cùng:
- Mức 5 nhưng $P(\text{other}) >$ `self_care_block_other` (0,30): đổi thành mức 4.
- Mức 5 khi phiên **dừng sớm** (người dùng dừng, chạm trần số câu, hoặc lấy kết quả khi chưa xong): đổi thành mức 4.

## 7. Chọn câu hỏi thích ứng

**Ứng viên** là dấu hiệu thỏa đủ 4 điều kiện:
- chưa trả lời, không bị ngầm định, không thuộc màn sàng lọc;
- áp dụng cho đối tượng;
- đã thỏa `requires`;
- có liên kết với ít nhất một bệnh có $P \ge$ `candidate_min_prob`, hoặc được dùng trong quy tắc của triệu chứng chính.

Với mỗi ứng viên $q$:
- tập trả lời $A$: có/không, hoặc các lựa chọn;
- tỷ lệ "Không rõ" dự kiến $u_q$ (`unknown_rate`);
- xác suất dự đoán $P(a) = \sum_h P(h) P(a \mid h)$.

**Rủi ro quyết định:** ma trận tổn thất giữa mức gợi ý $k$ và mức cần thật $u$:

$$\text{Loss}(k,u) = \begin{cases} u - k & k < u \ (\text{quá mức}) \\ (k-u)\,W(u) & k > u \ (\text{thấp hơn mức cần}) \end{cases}$$

- $W(u)$ lấy từ `under_triage_weights` = 49 / 49 / 9 / 3 (với $u$ = 1..4).
- Bệnh "không được bỏ sót" dùng `cant_miss_weight` = 99.
- Người từ 75 tuổi dùng $W' = 2W + 1$, tương ứng với nửa ngưỡng ở mục 6.2.
- "Nguyên nhân khác" dùng phân bố mức suy từ $q_k$.

**Quy tắc nguy hiểm là "sự thật":** khi với câu trả lời $a$ có quy tắc hoặc mục sàng lọc cấp cứu mức $c_a$ thỏa (không tính mức do câu trả lời "Không rõ"), mức cần thật của mọi giả thuyết bị chặn ở $c_a$: $u_h \to \min(u_h, c_a)$. Nhờ vậy giá trị câu hỏi thấy được quy tắc, không chỉ xác suất bệnh.

Tổn thất kỳ vọng của mức $k$ dưới phân bố $P$, với mức chặn $c$:

$$R_k(P, c) = \sum_h P(h)\, \mathbb{E}[\text{Loss}(k, \min(u_h, c))]$$

**Các đại lượng cho mỗi ứng viên** ($L$ là mức xử trí đầy đủ hiện tại, mục 6; $L_a$ là mức khi trả lời $a$; $L_?$ là mức khi trả lời "Không rõ"):

$$\text{VOI}(q) = \sum_a P(a)\Big[R_L(P\mid a, c_a) - (1-u_q)\,R_{L_a}(P\mid a, c_a) - u_q\,R_{L_?}(P\mid a, c_a)\Big]$$

- Số hạng đầu: không hỏi, giữ mức $L$, trong khi câu trả lời thật vẫn có thể là $a$.
- Số hạng sau: hỏi và được trả lời, hoặc bị trả lời "Không rõ" (khi đó quy tắc mức 1–2 có dấu hiệu "Không rõ" nâng mức lên ít nhất 3, mục 6.1). Vì vậy câu hỏi về một dấu hiệu nguy hiểm rất hiếm có thể có VOI âm: rủi ro bị "Không rõ" rồi khuyên quá mức lớn hơn giá trị câu trả lời.

$$\text{EIG}(q) = (1-u_q)\Big[H(P) - \sum_a P(a) H(P\mid a)\Big], \qquad \text{Pđổi}(q) = (1-u_q)\sum_a P(a)\,\mathbb{1}[L_a \ne L]$$

$H$ là entropy (bit) trên mọi giả thuyết. Pđổi **không** tính nhánh "Không rõ": mức tăng do "Không rõ" là hệ quả của việc hỏi, không phải dấu hiệu mức xử trí chưa ổn định.

**Mức xử trí ổn định** khi mọi ứng viên có Pđổi < `triage_change_prob` (0,05).

**Điểm chọn câu**, chia cho chi phí `cost` của câu hỏi. Giá trị an toàn chỉ tính phần vượt `min_voi` (0,1), coi như "gánh nặng" của một câu hỏi: $V^+ = \max(0, \text{VOI} - \text{min\_voi})$.
- Khi **chưa ổn định**: chỉ xét ứng viên có Pđổi ≥ 0,05, điểm = ($V^+$ + λ₁·EIG + Pđổi) / cost, với λ₁ = `lambda_before_stable` (0,1).
- Khi **đã ổn định**: điểm = ($V^+$ + λ₂·EIG) / cost, với λ₂ = `lambda_after_stable` (1).

**Ưu tiên loại trừ nhóm bệnh khẩn:** khi mức 1–2 chỉ dựa vào xác suất (không có quy tắc, mục sàng lọc hay dấu hiệu nguy hiểm "Không rõ" nào giữ mức đó), gọi $m$ là xác suất của nhóm đã đặt mức: các bệnh "không được bỏ sót" (nếu mức do ngưỡng `cant_miss_threshold`), hoặc mọi bệnh có mức cần từ mức đó trở lên, kể cả phần tương ứng của "nguyên nhân khác". Với mỗi ứng viên:

$$\text{EIG}_m(q) = (1-u_q)\Big[H_b(m) - \sum_a P(a)\, H_b(m \mid a)\Big]$$

với $H_b$ là entropy nhị phân. Điểm khi đã ổn định dùng EIG + `urgent_focus_weight` · EIG$_m$ thay cho EIG. Lý do: thường không câu đơn lẻ nào kéo được nhóm bệnh khẩn xuống dưới ngưỡng (viêm ruột thừa ở người đau quanh rốn kèm tiêu chảy), nên VOI một bước bằng 0. Muốn loại trừ hay xác nhận, phải hỏi vài câu liên tiếp như vị trí đau, đau có chuyển xuống hố chậu phải, đau tăng khi cử động.

Điểm bằng nhau thì chọn dấu hiệu đứng trước trong danh mục. Không câu nào có điểm dương thì dừng ("no_more_questions").

## 8. Điều kiện dừng

Phiên thích ứng dừng khi:
- **"confident":** đủ cả bốn điều kiện:
  1. mức xử trí ổn định;
  2. max VOI < `min_voi` (0,1);
  3. khi đang ưu tiên loại trừ nhóm bệnh khẩn (mục 7): max EIG$_m$ < `min_eig_bits`;
  4. xác suất bệnh đứng đầu ≥ `top1_mass` (0,70), **hoặc** max EIG < `min_eig_bits` (0,05 bit);
- **"no_more_questions":** không còn ứng viên;
- **"max_questions":** đã hỏi `max_questions` (30) bước. Trần mềm `soft_max_questions` (20) chỉ để giao diện cho phép dừng sớm.

## 9. Kết quả

**Danh sách bệnh:** mọi giả thuyết bệnh xếp theo xác suất giảm dần, kèm dòng "nguyên nhân khác".

**Con số hiển thị:**
- làm tròn tới bội số `round_to` (5%);
- dưới `min_shown` (5%) hiển thị "dưới 5%";
- không vượt `max_shown` (95%);
- không bao giờ hiện 0% hay 100%.

**Giải thích:** đóng góp của câu trả lời $v$ cho bệnh $d$ so với "nguyên nhân khác":

$$\text{contrib}_f(d) = \tau\, w_f \big[\log P(v\mid d) - \log P(v \mid \text{other})\big]$$

Hiển thị tối đa 5 đóng góp dương ("vì sao gợi ý") và 5 đóng góp âm.

**Danh sách "Đi cấp cứu ngay nếu…" (safety net):**
- gồm `safety_net` của triệu chứng chính, cộng `warning_signs` của:
  - các bệnh mức xử trí 1–2 có $P \ge$ `safety_net_min_prob` (0,5%);
  - mọi bệnh có $P \ge$ `safety_net_likely_prob` (10%). Ví dụ sốt xuất huyết (mức 3) vẫn có dấu hiệu cảnh báo cần dặn;
- bỏ dấu hiệu đã trả lời "có" hoặc không áp dụng cho đối tượng.

**Chuyên khoa:** theo thứ tự:
1. "Cấp cứu" nếu mức xử trí 1–2;
2. "Nhi khoa" nếu dưới 16 tuổi;
3. chuyên khoa của các bệnh có $P \ge 15\%$;
4. mặc định "Khám bệnh đa khoa".

**Trẻ dưới 2 tháng:** `rankingSuppressed = true`, giao diện không hiện danh sách bệnh.

**Dừng vì cấp cứu** (`emergencyStop = true`):
- Lúc dừng mới có vài câu trả lời, nên danh sách xếp hạng chưa đáng tin; bệnh lành tính có thể vẫn đứng đầu.
- Giao diện **không hiện danh sách xếp hạng và con số %**. Thay vào đó chỉ hiện `urgentConditions`, với tiêu đề "Bác sĩ cần loại trừ": tối đa 3 tình trạng có $P \ge$ `safety_net_min_prob`, là bệnh mức 1–2, **hoặc** bệnh mức 3 đang có dấu hiệu cảnh báo của chính nó (`warning_signs`, tức thể nặng của bệnh), ví dụ sốt xuất huyết có tiểu ít ở ngày thứ 4. Bệnh mức 4–5 không được thêm: với chúng, dấu hiệu cảnh báo (như cứng gáy ở cảm lạnh) chỉ ra một bệnh khác. Sắp theo xác suất.

## 10. Tính tất định và kiểm thử

- **Thứ tự cố định:** mọi phép cộng dồn duyệt theo thứ tự trong cơ sở tri thức, không theo thứ tự trả lời. Đã kiểm thử: đổi thứ tự trả lời không đổi kết quả.
- **Truy vết:** mỗi kết quả mang mã phiên bản dữ liệu (`kbVersion`, băm nội dung).
- **Kiểm thử thuộc tính (fast-check):**
  - xác suất luôn hữu hạn, nằm trong (0, 1) và cộng lại bằng 1;
  - thêm dấu hiệu có liên kết mạnh hơn tỷ lệ nền không làm giảm odds của bệnh đó;
  - thêm dấu hiệu nguy hiểm không bao giờ làm giảm mức khẩn.
- **Cổng chất lượng:** mỗi thay đổi dữ liệu phải chạy `npm run verify` và `npm run eval -- --set dev` (docs/evaluation.md).

## 11. Bảng tham số

| Tham số | Giá trị | Ghi chú |
|---|---|---|
| `frequency_levels` | 0,005 / 0,025 / 0,20 / 0,50 / 0,80 / 0,95 | Theo ánh xạ của QMR-DT, thêm mức 0,005 dưới tỷ lệ nền đặc hiệu; trần 0,95 |
| `leak_levels` | 0,01 / 0,05 / 0,20; sàn 0,001 | Theo dấu hiệu, có thể theo triệu chứng chính |
| `prior_levels` | 0,30 / 0,10 / 0,02 / 0,005 / 0,0006 / 0,0001 | Thang log 6 mức |
| `cluster_rho` | 0,2 / 0,5 / 0,8 | |
| `other_prior` | 0,15 | Tinh chỉnh theo tỷ lệ ca ngoài hệ thống |
| `other_urgency_cumulative` | 0,002 / 0,01 / 0,20 / 0,50 | q₂ = 0,05 khiến "nguyên nhân khác" ≥ 40% tự đẩy lên mức 2; q₂ = 0,02 bằng ngưỡng mức 2 nên chỉ cần 0,3–0,5% của bệnh mức 1–2 là lên mức 2; đã hạ xuống 0,01 |
| `safety_net_likely_prob` | 0,10 | Bệnh có khả năng cao thêm dấu hiệu cảnh báo vào safety net |
| `temperature` | 1,0 | Tinh chỉnh bằng `eval:tune` |
| `categorical_smoothing` | 0,01 | 0,02 làm "sốt hơn 7 ngày" chỉ giảm sốt xuất huyết khoảng 3 lần |
| `thresholds` | 0,10 / 0,02 / 0,10 / 0,25 | Từ ma trận tổn thất |
| `cant_miss_threshold` | 0,01 | |
| `elder_threshold_factor` | 0,5 | Áp dụng từ 75 tuổi |
| `self_care_block_other` | 0,30 | |
| `under_triage_weights` / `cant_miss_weight` | 49 / 49 / 9 / 3; 99 | |
| `lambda_before_stable` / `lambda_after_stable` | 0,1 / 1 | |
| `urgent_focus_weight` | 2 | Trọng số thông tin về nhóm bệnh khẩn khi mức 1–2 chỉ dựa vào xác suất (mục 7) |
| `stop` | Pđổi 0,05; bệnh đầu 0,70; EIG 0,05 bit; VOI 0,1; trần 30 (mềm 20) | `min_voi` cũng là "gánh nặng" trừ vào giá trị an toàn khi chọn câu (mục 7) |
| `safety_net_min_prob` | 0,005 | |
| `display` | làm tròn 5%; tối thiểu 5%; tối đa 95% | |

## 12. Khác biệt so với đặc tả trong báo cáo nghiên cứu

| Báo cáo đề xuất | Mã nguồn làm | Lý do |
|---|---|---|
| Lưu tham số dạng noisy-OR: $P(f\mid d) = 1-(1-\ell_f)(1-p_{df})$ | Lưu **tần suất quan sát** $P(f\mid d) = p_{df}$; bệnh không liên kết dùng $\ell_f$ | Nguồn y văn và bác sĩ cho tần suất quan sát (độ nhạy). Công thức noisy-OR sẽ làm lệch các tần suất này, ví dụ 20% thành 36% khi $\ell = 0{,}2$. Cách lưu này còn cho phép khai báo dấu hiệu **ít gặp hơn nền** (ho trong viêm ruột thừa). Khi chuyển sang mô hình nhiều bệnh, đổi $p = 1-(1-F)/(1-\ell)$ cho các liên kết có $F > \ell$ |
| Trọng số cụm theo kích thước cụm $\lvert C\rvert$ | Theo **số câu đã trả lời** $n$ trong cụm | Câu chưa hỏi không đóng góp bằng chứng, nên không có lý do giảm trọng số câu đã hỏi vì chúng |
| Dừng khi top-3 ≥ 0,80, **hoặc** EIG < 0,05, **hoặc** VOI < 0,01 | Dừng khi ổn định **và** VOI < 0,01 **và** (**bệnh đứng đầu ≥ 0,70** hoặc EIG < 0,05) | Với điều kiện "hoặc VOI < 0,01", phiên sẽ dừng ngay khi mức xử trí ổn định, trước khi kịp phân biệt bệnh. Còn với "top-3 ≥ 0,80", các bệnh cùng mức xử trí (cảm lạnh, cúm, COVID-19) chiếm hết top 3, nên câu phân biệt như kết quả tự xét nghiệm không bao giờ được hỏi (lượt C lô 1 phát hiện). Cách mới vừa giữ được câu hỏi an toàn, vừa giữ được câu hỏi phân biệt |
| Chưa nêu | **Dừng ngay** khi có quy tắc mức 1–2 | Người cần đi cấp cứu không nên phải trả lời thêm câu hỏi |
| Chưa nêu | Khi mức xử trí chưa ổn định, cộng thêm Pđổi vào điểm câu hỏi | Bảo đảm phiên tiến về trạng thái ổn định |
| Chưa nêu | Khi mức 1–2 chỉ dựa vào xác suất, ưu tiên câu hỏi về nhóm bệnh khẩn (EIG$_m$) và chưa dừng khi các câu đó còn mang thông tin | VOI một bước không thấy giá trị của chuỗi câu loại trừ (lượt C lô 3). Trên 99 ca dev: Brier 0,494 → 0,477, log loss 1,242 → 1,209, khuyên quá mức 9 → 8; số câu trung vị không đổi. Đã thử thêm câu bắt buộc "vị trí đau" cho đau bụng: chính xác hơn chút, nhưng qua 10 hạt giống nhiễu số ca cấp cứu bị bỏ sót tăng 8 → 11/380, nên không dùng |
| VOI tính trên rủi ro $R(P)$ của xác suất bệnh; Pđổi gồm cả nhánh "Không rõ" | VOI có **quy tắc nguy hiểm** (chặn mức cần thật) và **chi phí của "Không rõ"**; Pđổi bỏ nhánh "Không rõ"; giá trị an toàn chỉ tính phần vượt `min_voi` = 0,1 | Cách cũ làm mọi câu hỏi dấu hiệu nguy hiểm có Pđổi ≥ `unknown_rate` (0,1), nên mức xử trí luôn "chưa ổn định" và phiên hỏi lần lượt từng dấu hiệu nguy hiểm của mọi quy tắc, kể cả khối thoát vị ở người sốt (người bảo trì, lô 2). Trên 72 ca dev (24 bệnh), sau thay đổi này cùng với phạm vi quy tắc: số câu trung vị 15 (thích ứng 7), không bỏ sót ca cấp cứu |

## 13. Hạn chế đã biết

- **Một nguyên nhân:** chưa xử lý trường hợp mắc nhiều bệnh cùng lúc. Người cao tuổi đa bệnh có thể bị đánh giá kém.
- **Prior và nhiều tham số là ước lượng có căn cứ**, chưa có dữ liệu Việt Nam về lý do đi khám ở tuyến ban đầu.
- **Chưa hiệu chuẩn:** con số % chỉ được coi là đạt khi qua chỉ tiêu ECE trên bộ ca giữ kín (`calibrated: false` cho tới lúc đó).
- **Phụ thuộc có điều kiện** chỉ được mô hình hóa qua cụm và tần suất có điều kiện, không có mạng Bayes đầy đủ.
