# Hướng dẫn soạn cơ sở tri thức (knowledge base)

Tài liệu này quy định **cách soạn mọi nội dung y khoa** của doctor-v: định dạng file, ý nghĩa từng trường, thang đo, bậc bằng chứng, giấy phép nguồn và quy trình soạn–đối chiếu–duyệt.

- Mọi file nằm trong `knowledge/`, viết bằng YAML (UTF-8, Unicode NFC).
- Kiểm tra bằng `npm run kb:check`. Biên dịch thành JSON cho bộ suy luận bằng `npm run kb:build`.
- Câu chữ tiếng Việt tuân theo `docs/style-guide-vi.md`.
- Ý nghĩa toán học của các con số: `docs/engine-spec.md`.

---

## 1. Cấu trúc thư mục

```
knowledge/
├─ meta/
│  ├─ engine-params.yaml   tham số số học của bộ suy luận (thang đo, ngưỡng…)
│  ├─ age-groups.yaml      nhóm tuổi
│  ├─ triage-levels.yaml   5 mức xử trí và lời khuyên tương ứng
│  ├─ specialties.yaml     chuyên khoa
│  └─ regions.yaml         vùng miền
├─ sources/                mỗi nguồn một file: <source-id>.yaml
├─ findings/               "dấu hiệu" = triệu chứng, yếu tố nguy cơ, phơi nhiễm… (nhóm theo hệ cơ quan)
│  └─ clusters.yaml        cụm dấu hiệu hay đi cùng nhau
├─ complaints/             mỗi triệu chứng chính một file: <complaint-id>.yaml
├─ conditions/             mỗi bệnh một file: <condition-id>.yaml
├─ rules/
│  ├─ emergency-screen.yaml   màn sàng lọc cấp cứu đầu tiên
│  ├─ question-groups.yaml    nhóm câu hỏi chọn nhiều
│  └─ red-flags.yaml          quy tắc mức xử trí (dấu hiệu nguy hiểm, tổ hợp, nhóm nguy cơ)
└─ drafts/                 dấu vết soạn thảo (lượt A, lượt B, biên bản đối chiếu)
```

**Quy ước ID:** chữ thường tiếng Anh, nối bằng `_` (ví dụ `neck_stiffness`, `acute_appendicitis`). ID nguồn dùng gạch ngang (ví dụ `byt-qd-2760-2023`). ID không bao giờ đổi sau khi đã dùng; nếu cần bỏ, đánh dấu thay vì xóa.

---

## 2. Các thang đo (dùng thống nhất)

### 2.1 Tần suất dấu hiệu trong bệnh: `freq`

Câu hỏi cho người soạn: **"Trong 100 người mắc bệnh này (ở bối cảnh người dân tự kiểm tra hoặc khám ban đầu), khoảng bao nhiêu người có dấu hiệu này?"**

| Mức | Giá trị dùng | Khi nguồn có số liệu | Khi nguồn chỉ mô tả bằng lời |
|---|---|---|---|
| `very_rare` | 0,5% | dưới 1% | "rất hiếm", "hầu như không bao giờ"; hoặc "ít gặp hơn hẳn bình thường" với dấu hiệu đặc hiệu |
| `rare` | 2,5% | 1% – dưới 7,5% | "hiếm", "ít khi", "rare", "uncommon" |
| `occasional` | 20% | 7,5% – dưới 33% | "đôi khi", "có thể có", "sometimes", "may occur" |
| `frequent` | 50% | 33% – dưới 67% | "khoảng một nửa", "khá thường gặp", "often" |
| `very_frequent` | 80% | 67% – dưới 90% | "thường gặp", "phần lớn", "common", "usually" |
| `almost_always` | 95% | từ 90% trở lên | "hầu hết", "gần như luôn có", "hallmark", "cardinal" |

- Ranh giới giữa các mức là điểm giữa (theo thang log-odds) của hai giá trị kề nhau.
- **Không có mức 0% hay 100%.** Nếu một dấu hiệu "luôn luôn" có, vẫn dùng `almost_always`.
- Nếu nguồn đo ở bệnh viện, cấp cứu hoặc ca nặng, còn người dùng doctor-v là cộng đồng, thì **hạ một mức** đối với dấu hiệu của bệnh nặng, và ghi rõ trong `note`.
- Dấu hiệu thường **ít gặp hơn** ở bệnh này so với nền chung vẫn được khai báo, ví dụ ho trong viêm ruột thừa: `rare`. Khi đó trả lời "Có" sẽ làm giảm khả năng bệnh.
- **Chú ý:** mức đó phải **thấp hơn tỷ lệ nền** của dấu hiệu (mục 2.2). Ví dụ đau đầu kiểu sét đánh có tỷ lệ nền 1% (`specific`): nếu ghi `rare` (2,5%) cho đau đầu căng thẳng, trả lời "Có" lại làm **tăng** khả năng đau đầu căng thẳng. Trường hợp này dùng `very_rare` (0,5%). Bộ kiểm tra cảnh báo khi gặp lỗi này. Nếu thật sự muốn mức hiếm vẫn cao hơn tỷ lệ nền (ví dụ mất khứu giác gặp ở cảm lạnh nhiều hơn nền một chút), ghi thêm `above_leak_ok: true` vào liên kết và giải thích trong `note`.
- **Tần suất có điều kiện.** Nếu dấu hiệu chỉ được hỏi khi một dấu hiệu khác là "có" (trường `requires`), thì tần suất là **tần suất trong số người bệnh đã có dấu hiệu kia**. Ví dụ "nốt đỏ không mất khi ấn" có `requires: rash_any`: câu hỏi cho người soạn là "Trong 100 người bệnh X **đã có phát ban**, bao nhiêu người có nốt không mất khi ấn?". Tỷ lệ nền (`leak`) cũng hiểu theo cách đó. Nhờ vậy hai câu hỏi lồng nhau không bị đếm trùng.
- Tương tự, dấu hiệu nhiều lựa chọn có `requires` (ví dụ "số ngày sốt" cần "có sốt") được khai báo phân bố trong số người đã có dấu hiệu kia.

### 2.2 Tỷ lệ nền của dấu hiệu: `leak`

Câu hỏi cho người soạn: **"Trong những người có triệu chứng chính này nhưng KHÔNG mắc bệnh nào có liên kết với dấu hiệu này, khoảng bao nhiêu người vẫn có dấu hiệu này?"**

| Mức | Giá trị | Dùng cho |
|---|---|---|
| `specific` | 1% | Dấu hiệu đặc hiệu, hiếm khi có nếu không có bệnh liên quan (cứng gáy, vết loét đóng vảy đen của sốt mò, phân nhầy máu như mứt dâu) |
| `moderate` | 5% | Phần lớn dấu hiệu |
| `nonspecific` | 20% | Dấu hiệu rất phổ biến, gặp trong nhiều tình trạng (mệt mỏi, đau đầu khi sốt, chán ăn) |

- Có thể ghi số cụ thể (ví dụ `leak: 0.35`) nếu có lý do. Giới hạn 0,001–0,95; bắt buộc ghi lý do trong `leak_note`. Số lớn dùng cho yếu tố rất phổ biến, ví dụ "đã tiêm đủ vắc xin sởi" (khoảng 0,85).
- Tỷ lệ nền có thể khác theo triệu chứng chính: dùng `leak_by_complaint` (ví dụ đau đầu là `nonspecific` khi sốt nhưng không áp dụng khi chính triệu chứng chính là đau đầu).

### 2.3 Mức phổ biến ban đầu (prior): `P1`…`P6`

Câu hỏi cho người soạn: **"Trong 100 người ở nhóm tuổi này, có triệu chứng chính này, tự tìm hiểu hoặc đi khám ban đầu ở Việt Nam, khoảng bao nhiêu người là do bệnh này?"**

| Mức | Giá trị dùng | Khoảng |
|---|---|---|
| `P1` | 30% | từ 20% trở lên |
| `P2` | 10% | 5% – dưới 20% |
| `P3` | 2% | 1% – dưới 5% |
| `P4` | 0,5% | 0,2% – dưới 1% |
| `P5` | 0,06% | 0,02% – dưới 0,2% |
| `P6` | 0,01% | dưới 0,02% |

- Prior được khai báo **theo từng triệu chứng chính**. Bệnh không khai báo prior cho một triệu chứng chính thì không được xét khi người dùng chọn triệu chứng đó (thuộc "nguyên nhân khác").
- Khai báo `default`, rồi ghi đè theo nhóm tuổi bằng `by_age` khi khác biệt rõ.
- Bộ suy luận tự chuẩn hóa: các bệnh chia nhau 85% xác suất ban đầu, "nguyên nhân khác" giữ 15% (tham số `other_prior`, xem `engine-spec.md`). Vì vậy **thứ tự tương đối** giữa các bệnh quan trọng hơn con số tuyệt đối.

### 2.4 Hệ số điều chỉnh prior: `prior_modifiers`

Chỉ dùng cho bối cảnh **biết sẵn mà không cần hỏi**: tháng trong năm (`months`), vùng miền (`regions`) và giới tính (`sex`, ví dụ viêm thận – bể thận gặp ở nữ nhiều hơn: `when: { sex: [female] }, factor: 3`).
- Mỗi hệ số trong khoảng 0,1–10 lần. Tích các hệ số bị chặn trong 0,01–100 lần.
- Phơi nhiễm, yếu tố nguy cơ, bệnh nền **không** dùng hệ số. Chúng là dấu hiệu (finding) có câu hỏi riêng, để người dùng trả lời.

### 2.5 Mức xử trí của bệnh: `urgency`

Mức phù hợp với **ca điển hình chưa biến chứng** của bệnh. Biến chứng, ca nặng được xử lý bằng quy tắc dấu hiệu nguy hiểm, không bằng `urgency`.

| Mức | Ý nghĩa | Ví dụ |
|---|---|---|
| 1 | Gọi 115 ngay | Nhồi máu cơ tim, đột quỵ, xuất huyết dưới nhện, nhiễm khuẩn huyết |
| 2 | Đến cơ sở cấp cứu ngay | Viêm ruột thừa, chửa ngoài tử cung, viêm màng não, tắc ruột |
| 3 | Đi khám trong 24 giờ | Viêm phổi, viêm thận–bể thận, sốt xuất huyết chưa có dấu hiệu cảnh báo |
| 4 | Khám trong vài ngày | Viêm loét dạ dày, viêm bàng quang không sốt |
| 5 | Theo dõi tại nhà | Cảm lạnh, đau đầu căng thẳng, đau bụng kinh điển hình |

`cant_miss: true` cho bệnh có `urgency` 1–2 mà bỏ sót có thể gây tử vong hoặc tổn hại nặng trong vài giờ đến vài ngày. Bệnh này dùng ngưỡng xử trí thấp hơn (1% thay vì 2%).

---

## 3. Bậc bằng chứng và giấy phép

### 3.1 Bậc bằng chứng `tier` (gắn cho từng con số)

| Bậc | Định nghĩa | Ví dụ |
|---|---|---|
| `A` | Tổng quan hệ thống, phân tích gộp về độ chính xác chẩn đoán, ở bối cảnh tương đương | Cochrane DTA; JAMA Rational Clinical Examination |
| `B` | Nghiên cứu gốc tốt; hướng dẫn chính thức; số liệu dịch tễ chính thức | Hướng dẫn chẩn đoán và điều trị của Bộ Y tế; WHO; CDC; STEPS 2021 |
| `C` | Sách chuyên khảo, tài liệu tham khảo lâm sàng, cơ sở dữ liệu tần suất | StatPearls; McGee; MSD Manual; HPO/Orphanet |
| `D` | Đồng thuận chuyên gia của doctor-v (bác sĩ, có biên bản) | Biên bản ước lượng của bác sĩ |
| `E` | Dữ liệu tổng hợp hoặc chưa kiểm chứng | DDXPlus, Kaggle, Wikidata |

**Cơ sở ước lượng `basis`:**
- `numeric`: nguồn có số liệu tần suất, độ nhạy hoặc LR; ghi số vào `reported`.
- `verbal`: nguồn chỉ mô tả bằng lời ("thường gặp"); chuyển sang mức theo bảng 2.1.
- `judgment`: nguồn xác nhận có liên quan nhưng không cho biết tần suất; người soạn tự ước lượng mức. **Bắt buộc ghi lý do trong `note`; bác sĩ phải duyệt sau.**

**Quy tắc:**
- **Bậc `E` bị cấm** trong `knowledge/conditions/` (lỗi khi kiểm tra).
- Mỗi liên kết bệnh–dấu hiệu phải có **ít nhất 1 nguồn**.
- Dấu hiệu chủ chốt (mức `very_frequent` và `almost_always`) cần bậc `C` trở lên.
- Mỗi quy tắc dấu hiệu nguy hiểm cần bậc `A`/`B`, hoặc dựa trên hướng dẫn chính thức.
- Bậc `D` chỉ dùng khi có bác sĩ thật. Agent AI không được ghi bậc `D`.

### 3.2 Nhãn giấy phép `license_class` (gắn cho từng nguồn)

| Nhãn | Ý nghĩa | Ví dụ | Được làm gì |
|---|---|---|---|
| `L0` | Public domain, CC0, văn bản hành chính nhà nước | Hướng dẫn của Bộ Y tế, phần NLM của MedlinePlus, CDC | Dùng và chuyển thể, vẫn ghi nguồn |
| `L1` | Cho phép kèm ghi công (CC BY 4.0, OGL) | Orphadata, MONDO, Levine 2021 | Dùng và chuyển thể, ghi công và nêu thay đổi |
| `L2` | Có hạn chế (NC, ND, SA, giấy phép riêng) | WHO (CC BY-NC-SA 3.0 IGO), ICD (ND), StatPearls, GBD, Semigran | Được dùng vì doctor-v phi lợi nhuận; kiểm tra điều kiện cụ thể trước khi đóng gói |
| `L3` | Độc quyền / bảo lưu mọi quyền | MSD Manual, JAMA, McGee, UpToDate | **Chỉ lấy dữ kiện kèm trích dẫn**, không dùng câu chữ |

**Không bao giờ sao chép nguyên văn câu chữ** từ nguồn `L2`/`L3`. Mọi câu tiếng Việt trong doctor-v là câu tự viết. Dữ kiện (ví dụ "đau sau hốc mắt gặp ở khoảng một nửa số ca") không bị bảo hộ, nhưng phải ghi nguồn.

### 3.3 Thứ tự ưu tiên nguồn

1. Hướng dẫn chẩn đoán và điều trị hiện hành của **Bộ Y tế** (kiểm tra văn bản thay thế mới nhất).
2. Hướng dẫn của **WHO** và các hướng dẫn quốc tế lớn.
3. **Tổng quan hệ thống** về độ chính xác của triệu chứng; nghiên cứu ở châu Á, Việt Nam được ưu tiên.
4. Tài liệu tham khảo lâm sàng (StatPearls, CDC, NHS, MSD Manual).
5. Blog bệnh viện tư, báo chí: **không** dùng làm bằng chứng.

---

## 4. Định dạng từng loại file

### 4.1 Nguồn: `knowledge/sources/<id>.yaml`

```yaml
id: byt-qd-2760-2023
type: guideline_vn        # guideline_vn | guideline_intl | systematic_review | primary_study
                          # | textbook | reference | dataset | statistic | web_page
title: "Hướng dẫn chẩn đoán, điều trị sốt xuất huyết Dengue"
publisher: "Bộ Y tế"
doc_number: "2760/QĐ-BYT" # nếu có
date: "2023-07-04"        # YYYY, YYYY-MM hoặc YYYY-MM-DD
supersedes:               # nếu có
  - "3705/QĐ-BYT (2019-08-22)"
url: "https://…"
doi: "10.…"               # nếu có
pmid: "…"                 # nếu có
license_class: L0
default_tier: B
accessed: "2026-10-24"
verified: true            # đã mở URL và đối chiếu nội dung
verified_by: "agent:pass-c"
notes_vi: "…"             # nếu cần
```

- `verified: true` chỉ khi **đã thực sự mở** nguồn (URL, PDF) và thấy nội dung được trích. Nguồn nhớ từ trí nhớ mà chưa mở được thì `verified: false`.
- Với văn bản của Bộ Y tế: ghi đúng số quyết định, ngày ký; kiểm tra xem có văn bản mới thay thế chưa.

### 4.2 Dấu hiệu: `knowledge/findings/<nhóm>.yaml`

Mỗi file là một danh sách. "Dấu hiệu" (finding) bao gồm triệu chứng, dấu hiệu quan sát được, số đo, yếu tố nguy cơ, phơi nhiễm, tiền sử.

**Dấu hiệu có/không:**

```yaml
- id: neck_stiffness
  kind: sign              # symptom | sign | measurement | risk_factor | exposure | history
  type: binary
  label_vi: "Cứng gáy"    # nhãn ngắn, dùng trong "Vì sao gợi ý"
  question_vi: "Có bị cứng gáy (cổ cứng, khó cúi đầu xuống) không?"
  help_vi: "Cứng gáy là khi cổ cứng, đau, không cúi được cằm xuống ngực."
  alt_question:           # bắt buộc với dấu hiệu dùng trong quy tắc mức 1–2
    text_vi: "Có cúi đầu cho cằm chạm ngực được không?"
    inverted: true        # trả lời "Có" ở câu này nghĩa là KHÔNG có dấu hiệu
  leak: specific
  cluster: meningeal_signs        # nếu thuộc một cụm (xem 4.3)
  requires:                       # chỉ hỏi khi điều kiện đúng (nếu có)
    - { finding: headache, is: present }
  applies_to:                     # nếu chỉ áp dụng cho một số đối tượng
    sex: [female]
    age_groups: [teen_13_17, adult_18_44]
  cost: 1                         # 1 bình thường; 1.5 câu khó nhớ; 2 cần đo; 3 nhạy cảm
  unknown_rate: 0.1               # tỷ lệ người dùng ước tính sẽ trả lời "Không rõ"
```

**Dấu hiệu nhiều lựa chọn:**

```yaml
- id: fever_duration
  kind: history
  type: categorical
  label_vi: "Số ngày sốt"
  question_vi: "Đã sốt bao nhiêu ngày?"
  options:
    - { id: d1_2, label_vi: "1–2 ngày" }
    - { id: d3_5, label_vi: "3–5 ngày" }
    - { id: d6_7, label_vi: "6–7 ngày" }
    - { id: gt_7d, label_vi: "Hơn 7 ngày" }
  baseline: { d1_2: 0.45, d3_5: 0.35, d6_7: 0.1, gt_7d: 0.1 }  # phân bố ở người KHÔNG có bệnh liên kết
  requires:
    - { finding: fever, is: present }
```

Người dùng luôn có lựa chọn "Không rõ"; không cần khai báo lựa chọn này.

### 4.3 Cụm dấu hiệu: `knowledge/findings/clusters.yaml`

Các dấu hiệu **hay đi cùng nhau** (sổ mũi, nghẹt mũi, hắt hơi) nếu tính riêng từng cái sẽ bị "đếm trùng" và làm kết quả quá tự tin. Gom chúng vào một cụm:

```yaml
- id: upper_respiratory
  rho: medium             # low (0,2) | medium (0,5) | high (0,8): mức tương quan
  label_vi: "Triệu chứng mũi họng"
  rationale_vi: "Sổ mũi, nghẹt mũi, hắt hơi thường xuất hiện cùng nhau."
```

### 4.4 Nhóm câu hỏi chọn nhiều: `knowledge/rules/question-groups.yaml`

```yaml
- id: child_danger_signs
  title_vi: "Bé có dấu hiệu nào sau đây không?"
  findings: [unable_to_drink, vomits_everything, convulsion_now_or_recent, lethargic]
  none_label_vi: "Không có dấu hiệu nào ở trên"
  allow_unknown: true     # cho phép chọn "Tôi không rõ"
  applies_to: { age_groups: [child_2m_5y] }
```

- Mục được chọn → "có".
- Mục không chọn → "không có". Riêng khi người dùng chọn "Tôi không rõ", mọi mục → "không rõ".
- Tối đa 7 mục mỗi nhóm.

### 4.5 Triệu chứng chính: `knowledge/complaints/<id>.yaml`

```yaml
id: fever
label_vi: "Sốt"
icon: thermometer
synonyms_vi: ["nóng sốt", "sốt cao", "sốt nhẹ", "người nóng", "hâm hấp"]
implies: [fever]          # dấu hiệu tự động coi là "có" khi chọn triệu chứng chính này
red_flags:                # hỏi bắt buộc, theo thứ tự, ngay sau thông tin cơ bản
  - group: child_danger_signs
  - finding: neck_stiffness
intake: [fever_associated]  # nhóm hỏi tiếp theo (triệu chứng đi kèm)
cant_miss: [bacterial_meningitis, sepsis, malaria]   # danh sách để kiểm tra an toàn
safety_net: [neck_stiffness, purpuric_rash]          # dấu hiệu "đi cấp cứu ngay nếu…" chung
sources: [who-imci-2014]
```

Dấu hiệu trong `implies` **không được tính lại** khi suy luận, vì prior đã tính theo triệu chứng chính. Chúng chỉ dùng cho điều kiện hỏi và quy tắc.

`status: in_progress` dùng cho triệu chứng chính đang được soạn trong một lô:
- bộ kiểm định chấm được triệu chứng này;
- app chưa cho chọn. Khi người dùng tìm đúng triệu chứng này, app báo "đang được soạn".

Khi lô đạt chỉ tiêu trên bộ ca giữ kín, bỏ trường này đi (mặc định là `released`).

### 4.6 Bệnh: `knowledge/conditions/<id>.yaml`

```yaml
id: dengue
names:
  vi: "Sốt xuất huyết Dengue"       # tên chính thức (ICD-10 tiếng Việt nếu tra được)
  vi_common: ["Sốt xuất huyết"]     # tên thường gọi
  en: "Dengue"
codes:
  icd10: "A97"
  icd10_verified: false             # true chỉ khi đã đối chiếu với ICD-10 của Bộ Y tế
  mondo: "MONDO:0005502"            # nếu tra được
summary_vi:                         # tối đa 3 câu ngắn
  - "Bệnh do vi rút Dengue, lây qua muỗi vằn đốt."
  - "Thường sốt cao 2–7 ngày, đau nhức người, có thể phát ban."
  - "Giai đoạn nguy hiểm thường từ ngày thứ 3 đến ngày thứ 7."
urgency: 3
cant_miss: false
specialties: [infectious_disease]
applicability:                      # chỉ khai báo khi bất khả về sinh học
  sex: [female]
  age_groups: [teen_13_17, adult_18_44, adult_45_64]
  reason_vi: "Chỉ gặp ở phụ nữ trong độ tuổi có thể mang thai."
priors:
  - complaint: fever
    default: P2
    by_age: { infant_0_2m: P4, elder_75p: P3 }
    evidence:
      tier: B
      basis: judgment
      sources: [byt-qd-2760-2023]
      note: "Bệnh lưu hành, là nguyên nhân sốt hàng đầu trong mùa mưa."
  - complaint: headache
    default: P4
    evidence: { tier: C, basis: judgment, sources: [], note: "…" }
prior_modifiers:
  - when: { months: [6, 7, 8, 9, 10, 11] }
    factor: 2
    evidence: { tier: B, basis: verbal, sources: [byt-qd-2760-2023], note: "Mùa mưa." }
findings:
  - finding: retro_orbital_pain
    freq: frequent
    evidence:
      tier: C
      basis: numeric
      sources: [statpearls-dengue]
      locator: "History and Physical"
      reported: "khoảng 50–60%"
      population: "người lớn"
  - finding: neck_stiffness
    freq: very_frequent
    freq_by_age:                     # chỉ khi tần suất khác rõ ở một nhóm tuổi (có nguồn)
      infant_0_2m: occasional
      child_2m_5y: frequent
    evidence: { tier: B, basis: numeric, sources: [nice-ng240], note: "Trẻ nhỏ ít có cứng gáy." }
  - finding: fever_duration          # dấu hiệu nhiều lựa chọn: khai báo phân bố
    dist: { d1_2: 0.35, d3_5: 0.5, d6_7: 0.13, gt_7d: 0.02 }
    evidence: { tier: B, basis: verbal, sources: [byt-qd-2760-2023], note: "Sốt 2–7 ngày." }
warning_signs: [persistent_vomiting, mucosal_bleeding, severe_abdominal_pain, lethargic]
self_care_vi:
  - "Nghỉ ngơi, uống nhiều nước."
  - "Không tự dùng aspirin hoặc ibuprofen."
see_doctor_vi:
  - "Đi khám trong 24 giờ để được xét nghiệm và hẹn theo dõi."
review:
  status: draft             # draft | source_checked | doctor_reviewed
  authors: ["agent:pass-a", "agent:pass-b"]
  reconciler: "agent:pass-c"
  doctor_reviewer: null
  updated: "2026-10-24"
  notes_vi: ""
```

**Yêu cầu tối thiểu cho mỗi bệnh:**
- ít nhất 1 prior;
- ít nhất 5 liên kết dấu hiệu, mỗi liên kết có nguồn;
- `summary_vi` tối đa 3 câu;
- `warning_signs` (có thể rỗng nếu bệnh nhẹ, nhưng phải cân nhắc);
- `review.status`.

**Chọn dấu hiệu để liên kết:**
- Liên kết **mọi dấu hiệu có ý nghĩa phân biệt**, gồm cả dấu hiệu phổ biến ở bệnh này và dấu hiệu thường **không** có (để câu trả lời "Có" làm giảm khả năng).
- Dấu hiệu không liên kết sẽ dùng tỷ lệ nền (`leak`).
- Chỉ dùng dấu hiệu đã có trong `knowledge/findings/`. Thiếu dấu hiệu nào thì đề xuất (mục 6).

### 4.7 Quy tắc mức xử trí: `knowledge/rules/red-flags.yaml`

```yaml
- id: rf_fever_neck_stiffness
  level: 2
  when:
    all:
      - { finding: fever, is: present }
      - { finding: neck_stiffness, is: present }
  reason_vi: "Sốt kèm cứng gáy có thể là dấu hiệu viêm màng não."
  complaints: [fever, headache]   # nếu bỏ trống: áp dụng mọi triệu chứng chính
  evidence: { tier: B, basis: verbal, sources: [who-imci-2014] }
```

Điều kiện `when` gồm:
- **toán tử:** `all`, `any`, `not`, và `{ at_least: n, of: [...] }` (đúng khi ít nhất n điều kiện con đúng; ví dụ "sốt kèm từ 2 nhóm dấu hiệu nặng");
- **điều kiện dấu hiệu:** `{ finding: X, is: present | absent | unknown }`, `{ finding: X, in: [lựa chọn…] }`;
- **điều kiện đối tượng:** `{ age_groups: [...] }`, `{ age_months_lt: 3 }`, `{ age_years_gte: 75 }`, `{ sex: female }`.

Dấu hiệu **chưa được hỏi** được tính là "không có bằng chứng" (sai). Vì vậy:
- Muốn "không kèm ho", viết `{ finding: cough, is: absent }` (phải có câu trả lời "không"), **không** viết `not: { finding: cough, is: present }`: dạng sau đúng ngay cả khi chưa hỏi ho. Bộ kiểm tra cảnh báo dạng này trong quy tắc.
- Với `at_least`, mỗi nhóm dấu hiệu cùng phản ánh một tình trạng (lú lẫn và li bì) nên gộp bằng `any` thành một điều kiện con, để hai câu trả lời về cùng một tình trạng không tự đủ ngưỡng.

**Bệnh mục tiêu `conditions`** (quy tắc mức 1–2): các bệnh mà quy tắc nhằm phát hiện, ví dụ `[bacterial_meningitis, sepsis, dengue]` cho sốt kèm ban xuất huyết. Khi quy tắc thỏa, các bệnh này được đưa vào danh sách "Bác sĩ cần loại trừ" kể cả khi xác suất thấp. Trường này chỉ dùng để hiển thị, không đổi mức xử trí.

**Phạm vi `complaints`:** quy tắc không ghi phạm vi áp dụng cho mọi triệu chứng chính, và dấu hiệu của nó có thể được hỏi thích ứng ở mọi triệu chứng chính (bộ suy luận tính giá trị câu hỏi theo quy tắc). Quy tắc chỉ hợp với một số triệu chứng chính phải ghi phạm vi. Ví dụ khối thoát vị đau chỉ ghi `[abdominal_pain]`, nếu không người sốt cũng bị hỏi về thoát vị.

**Tỷ lệ nền của dấu hiệu nguy hiểm:** dấu hiệu dùng trong quy tắc mức 1–2 được hỏi khi xác suất có dấu hiệu đủ lớn so với trọng số bỏ sót (49). Với `leak: specific` (1%), câu hỏi gần như luôn được hỏi. Nếu dấu hiệu rất hiếm ở người có triệu chứng chính đó mà không mắc bệnh liên kết, ghi `leak` hoặc `leak_by_complaint` thực tế (0,001–0,003) kèm `leak_note`.

Khi một dấu hiệu trong quy tắc mức 1–2 được trả lời "Không rõ" (kể cả sau câu hỏi thay thế), bộ suy luận coi như "có thể có": ít nhất mức 3, hoặc đúng mức của quy tắc nếu người bệnh thuộc nhóm nguy cơ cao (trẻ nhỏ, người từ 75 tuổi, có thai, suy giảm miễn dịch).

### 4.8 Sàng lọc cấp cứu: `knowledge/rules/emergency-screen.yaml`

Danh sách dấu hiệu cấp cứu hỏi **trước tiên**, trước cả tuổi và giới. Mỗi mục là một dấu hiệu trong `findings/` kèm mức (1 hoặc 2). Chọn bất kỳ mục nào → dừng và hiện màn cấp cứu.

---

## 5. Quy trình soạn một đợt bệnh

Mỗi đợt khoảng 10–20 bệnh.

1. **Lượt A.** Agent A đọc nguồn và viết bản nháp vào `knowledge/drafts/pass-a/<id>.yaml`. Mọi con số phải có nguồn đã thực sự mở được.
2. **Lượt B.** Agent B làm **độc lập**, không đọc bản của A, viết vào `knowledge/drafts/pass-b/<id>.yaml`.
3. **Lượt C (đối chiếu).** Agent C so sánh hai bản theo từng liên kết:
   - Hai bản giống nhau: giữ nguyên.
   - Lệch một mức: chọn theo nguồn tốt hơn; nếu ngang nhau thì chọn mức thận trọng hơn cho an toàn (dấu hiệu của bệnh nguy hiểm: nghiêng về giữ liên kết mạnh).
   - Lệch từ hai mức trở lên, hoặc một bản có liên kết mà bản kia không: đọc lại nguồn rồi quyết định.

   Agent C ghi biên bản vào `knowledge/drafts/reconcile/<id>.md` và viết bản chính thức vào `knowledge/conditions/<id>.yaml`. Agent C cũng kiểm tra lại từng nguồn được trích (mở URL), rồi mới đặt `verified: true`.
4. **Kiểm tra tự động:** `npm run kb:check` phải không còn lỗi.
5. **Ca kiểm thử:** ít nhất 3 ca cho mỗi bệnh (điển hình, không điển hình, dễ nhầm với bệnh nguy hiểm), trong `evaluation/vignettes/dev/`.
6. **Chạy kiểm định:** không được làm giảm chỉ số an toàn (xem `engine-spec.md`, mục kiểm định).
7. **Trạng thái:**
   - `draft`: còn nháp.
   - `source_checked`: đã qua lượt C, mọi nguồn đã kiểm tra.
   - `doctor_reviewed`: bác sĩ đã duyệt (khi có bác sĩ).

   Chỉ `doctor_reviewed` mới được phát hành công khai.

---

## 6. Đề xuất dấu hiệu mới

Agent soạn bệnh **không tự thêm** dấu hiệu vào `knowledge/findings/`. Nếu cần dấu hiệu chưa có, ghi vào cuối bản nháp:

```yaml
proposed_findings:
  - id: calf_pain
    kind: symptom
    type: binary
    label_vi: "Đau bắp chân"
    question_vi: "Có đau nhức bắp chân không?"
    leak: moderate
    notes_vi: "Đặc trưng của bệnh do Leptospira; giúp phân biệt với sốt xuất huyết."
```

Người đối chiếu (lượt C) hoặc người bảo trì quyết định thêm vào danh mục chung, để mọi bệnh dùng cùng một dấu hiệu.

---

## 7. Những lỗi thường gặp cần tránh

- **Bịa nguồn.** Mọi DOI, URL, số quyết định phải mở được. Nếu không mở được, ghi `verified: false` và không nâng bậc bằng chứng.
- **Dùng số liệu bệnh viện cho cộng đồng** mà không hạ mức (xem 2.1).
- **Ghi 0% hoặc 100%.** Không có mức nào như vậy.
- **Đếm trùng.** Hai câu hỏi hỏi cùng một điều bằng hai cách thì gộp lại, hoặc đưa vào cùng cụm.
- **Dùng hệ số prior cho phơi nhiễm.** Phơi nhiễm là câu hỏi, không phải hệ số.
- **Sao chép câu chữ** từ nguồn có bản quyền.
- **Câu hỏi hai ý** ("Có sốt và đau đầu không?").
