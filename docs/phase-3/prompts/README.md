# Lời giao việc mẫu cho các agent của một lô

Thư mục `batch-2/` chứa nguyên văn lời giao việc đã dùng ở Giai đoạn 3, lô 2 (26–27/10/2026), theo thứ tự chạy:

| Tệp | Agent | Ghi chú |
|---|---|---|
| `1-pass-r.md` | Lượt R: xác minh quy tắc, nguồn, câu chữ | Chạy sau khi người bảo trì soạn danh mục của lô |
| `2-pass-a-part-a.md`, `2-pass-a-part-b.md` | Lượt A, 2 phần | Có thể chạy cùng lượt R |
| `3-holdout-writer.md` | Agent viết ca giữ kín, độc lập | Không đọc dữ liệu bệnh, bản nháp, quy tắc, ca dev, báo cáo |
| `4-pass-b-part-a.md`, `4-pass-b-part-b.md` | Lượt B, 2 phần | Không đọc bản nháp lượt A; ít gợi ý nguồn hơn lượt A, để hai lượt không cùng bám một bài báo |
| `5-pass-c-part-a.md`, `5-pass-c-part-b.md` | Lượt C, 2 phần | Mục "Batch notes" viết riêng cho từng lô, sau khi đọc tóm tắt của lượt A và B |

Khi dùng cho lô mới, sửa:
- số lô, ngày, danh sách bệnh mới và bệnh mở rộng (lấy từ `knowledge/drafts/phase-3/batch-N/scope.yaml`);
- danh sách đối thủ cần phân biệt, các gợi ý nguồn của lượt A (lượt B ít gợi ý hơn);
- mục "Batch notes" và số liệu mốc của bộ dev trong lời giao việc lượt C;
- `<scratch>`: một thư mục tạm ngoài repo, ví dụ `/tmp/doctor-v-scratch`.

Triệu chứng chính mới (như lô 1 và lô 3) cần thêm vào lời giao việc: `status: in_progress`, nhóm tuổi áp dụng, và các dấu hiệu "ngầm định" của triệu chứng đó.

## Từ lô 3

Chủ dự án quyết định ngày 31/10/2026 (`docs/handoff.md` mục 5):
- Khi tạo agent, ghi `model: "opus"` và `effort`: xhigh cho lượt C và agent viết ca giữ kín; high cho lượt A, B, R.
- Mỗi agent khoảng 5 bệnh mới, nên một lượt có thể cần 3 agent thay vì 2.
- Mục "Read first" của các tệp trong `batch-2/` bảo agent đọc toàn bộ `knowledge/findings/`, `knowledge/conditions/` (các bệnh cần phân biệt), `red-flags.yaml` và `knowledge/sources/`. Vì vậy, sau 25 lượt gọi, ngữ cảnh đã lên 160–290 nghìn token, trước khi agent bắt đầu soạn. Từ lô 3, thay phần này bằng mục lục gọn, như các khối dưới đây.

**Mục lục gọn** (`npm run kb:index -- --out-dir <thư mục>`, mã ở `packages/kb/src/catalog.ts`) ghi 4 tệp:

| Tệp | Nội dung | Cách dùng | Cỡ ngày 31/10/2026 (60 bệnh) |
|---|---|---|---|
| `index.md` | Thang đo, dấu hiệu, nhóm câu hỏi, triệu chứng chính, mỗi bệnh một dòng (mức, prior) | Đọc hết | 49 nghìn ký tự; đo được 28 nghìn token |
| `links.md` | Mọi liên kết của từng bệnh | Tìm dòng của bệnh cần so | 52 nghìn ký tự |
| `rules.md` | Quy tắc an toàn, điều kiện viết gọn | Tìm; lượt R đọc hết | 17 nghìn ký tự |
| `sources.md` | Sổ nguồn | Tìm id để dùng lại | 68 nghìn ký tự |

Đo bằng một agent chỉ đọc tệp: ngữ cảnh khởi đầu khoảng 45 nghìn token (lời nhắc hệ thống và mô tả công cụ trên cloud); đọc `kb-guide.md` thêm 17,5 nghìn, `style-guide-vi.md` 4,7 nghìn, `index.md` 28 nghìn. Tổng khoảng 96 nghìn, dưới mục tiêu 100 nghìn.

Mỗi agent ghi mục lục vào thư mục tạm riêng (`<scratch>/<vai>/kb-index`), vì các agent chạy song song.

**Khối "Read first" cho lượt A và B** (thay mục 3–6 của `batch-2/2-pass-a-*.md`, `4-pass-b-*.md`):

```
## Read first (mandatory)
1. docs/kb-guide.md and docs/style-guide-vi.md, the whole files. kb-guide is the contract: file format, scales, …
2. The compact index of the knowledge base, instead of the YAML files under knowledge/. Run
   `npm run -s kb:index -- --out-dir <scratch>/<role>/kb-index`, then:
   - read `index.md` whole: scales and age groups, every finding (type, options, `requires`, cluster, question),
     question groups, complaints (question order), one line per condition (urgency, priors);
   - search, do not read whole: `links.md` (all links of a condition; use it to compare with competitors),
     `rules.md` (triage rules), `sources.md` (source registry; reuse existing ids).
3. Open full YAML files only when you need the detail: 1–2 conditions you take as a model (e.g. <id>), each
   condition you extend, a source you cite, a finding's help text in knowledge/findings/.
```

**Lượt R:** như trên, nhưng đọc hết `rules.md`, và mở đầy đủ khối quy tắc của lô trong `red-flags.yaml`, các tệp triệu chứng chính mới và `question-groups.yaml`.

**Lượt C:** như lượt A, cộng hai bản nháp của từng bệnh, `scope.yaml`, `review-rules.md`, `agreement.md` và `docs/evaluation.md`.

**Agent viết ca giữ kín:** không đọc dữ liệu bệnh và quy tắc, nên chỉ in các mục được phép:
`npm run -s kb:index -- --only meta,findings,complaints --out <scratch>/holdout/kb-index.md`, rồi đọc hết tệp này cùng `docs/evaluation.md`, `docs/style-guide-vi.md` và `scope.yaml` của lô.
