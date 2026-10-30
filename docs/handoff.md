# Bàn giao: doctor-v

> **Dành cho:** agent Claude Code tiếp tục dự án trên cloud.
> **Cập nhật:** 31/10/2026, ngay sau khi phát hành Giai đoạn 3, lô 2.
> Đọc hết tệp này trước khi làm việc. Nếu điều gì ở đây mâu thuẫn với `docs/worklog.md`, nhật ký mới hơn là đúng.

## 1. Dự án

doctor-v là ứng dụng web kiểm tra triệu chứng bằng tiếng Việt, ưu tiên điện thoại và người cao tuổi. Người dùng trả lời câu hỏi trắc nghiệm. Một bộ suy luận Bayes tất định chạy ngay trên máy người dùng trả về:
- mức xử trí: 1 gọi 115, 2 đến cấp cứu ngay, 3 khám trong 24 giờ, 4 khám trong vài ngày, 5 tự theo dõi;
- các tình trạng có thể liên quan, kèm %.

Lúc chạy, app không dùng AI hay LLM nào. An toàn (không bỏ sót cấp cứu) quan trọng hơn mọi thứ.

| Thư mục | Nội dung |
|---|---|
| `knowledge/` | Dữ liệu YAML: `findings/` (dấu hiệu, cụm), `conditions/` (bệnh), `complaints/` (triệu chứng chính), `rules/` (quy tắc an toàn, nhóm câu hỏi, màn sàng lọc cấp cứu), `sources/` (sổ đăng ký nguồn), `meta/` (thang đo, tham số), `drafts/` (bản nháp từng lô) |
| `packages/kb/` | Schema, kiểm tra, biên dịch dữ liệu |
| `packages/engine/` | Bộ suy luận: chọn câu hỏi, xác suất, mức xử trí |
| `evaluation/` | Ca kiểm thử (`vignettes/dev`, `vignettes/holdout`), bộ chấm, báo cáo (`reports/`) |
| `apps/web/` | Ứng dụng web (Astro 7.4 + Preact 10.29), kiểm thử Playwright |
| `docs/` | Kế hoạch, hướng dẫn, nhật ký (tiếng Việt) |

**Đọc theo thứ tự:**
1. `README.md`: lệnh.
2. `docs/plan.md`: kế hoạch; lộ trình ở mục 10.
3. `docs/worklog.md`: nhật ký. Đọc kỹ các mục từ "Giai đoạn 3" trở đi.
4. `docs/phase-3/scope.md`: phạm vi Giai đoạn 3, 11 lô, quyết định của chủ dự án (mục 7).
5. `docs/kb-guide.md`: hợp đồng dữ liệu. Đọc trước khi sửa `knowledge/`.
6. `docs/engine-spec.md`, `docs/evaluation.md`, `docs/style-guide-vi.md`.

## 2. Trạng thái (31/10/2026)

- **Giai đoạn 1** xong: 33 bệnh, 3 triệu chứng chính (Sốt, Đau bụng, Đau đầu). Báo cáo: `docs/reports/phase-1.md`.
- **Giai đoạn 2** xong: ứng dụng web.
- **Giai đoạn 3**, 11 lô:
  - lô 1 (Chóng mặt, Ngất, Hồi hộp): phát hành 26/10, tag `release-phase3-batch1`;
  - lô 2 (14 bệnh nguy hiểm còn thiếu cho Sốt, Đau bụng, Đau đầu…): phát hành 28/10, tag `release-phase3-batch2`;
  - **lô 3 (Ho, Khó thở, Đau ngực) là việc tiếp theo, chưa bắt đầu.**
- **Dữ liệu:** 60 bệnh, 205 dấu hiệu, 6 triệu chứng chính, 116 quy tắc, 436 nguồn.
- **Ca kiểm thử:** dev 217, giữ kín 198.
- **Lần chấm giữ kín mới nhất** (`evaluation/reports/2026-10-28-holdout-e7e084565d89.md`), đạt mọi chỉ tiêu:
  - sạch: an toàn 99,5%, bỏ sót cấp cứu 1/102, top-3 90,5%, khuyên quá mức 20,7%, tự chăm sóc nhận đúng 56,5%, ECE 0,047;
  - nhiễu: bỏ sót 13/510.
- **Kiểm tra hiện tại:** `npm run verify` qua (67 kiểm thử đơn vị; `kb:check` 0 lỗi, 13 cảnh báo cũ); `eval:check` 0 lỗi; kiểm thử giao diện 24/24.
- Tag git có thể chưa được đẩy lên GitHub. Đừng dựa vào tag nếu `git tag` không thấy.

## 3. Quy tắc bắt buộc của chủ dự án

1. **Ngôn ngữ:** trả lời chủ dự án bằng tiếng Việt. Mã, định danh, lệnh, commit message bằng tiếng Anh. Tài liệu trong `docs/` viết tiếng Việt, theo `docs/style-guide-vi.md`.
2. **Khi cần chủ dự án quyết định:** hỏi bằng câu hỏi trắc nghiệm (AskUserQuestion).
   - Mỗi câu tối đa 4 phương án; phương án tốt nhất đứng đầu, ghi rõ được và mất, đánh dấu phương án khuyến nghị.
   - Chỉ hỏi điều thật sự là quyết định của chủ dự án. Việc có lời đáp mặc định hợp lý thì tự làm và báo lại.
3. **"Mọi thứ cần được làm thật cẩn thận."** Chạy kiểm tra (mục 4) trước mỗi commit. Báo kết quả trung thực, kể cả khi xấu đi.
4. **Mọi thứ nằm trong repo,** được commit vào git. Commit message tiếng Anh, kết thúc bằng dòng Co-Authored-By theo hướng dẫn của phiên.
5. **Không chạy `prettier --write`** (kể cả `--check` làm cổng kiểm tra). Mã TypeScript được định dạng tay, rộng khoảng 120 cột; Prettier sẽ đổi định dạng cả tệp. Sửa bằng thay thế chính xác theo phong cách xung quanh; kiểm tra bằng `tsc` và `eslint`.
6. **Quy tắc giữ kín** (`docs/evaluation.md`):
   - người bảo trì và các agent soạn dữ liệu không đọc `evaluation/vignettes/holdout/`; chỉ xem kết quả qua báo cáo sau khi chấm;
   - ca giữ kín nào được dùng để sửa dữ liệu thì chuyển sang dev (đổi `id` thành `d-from-<id>`, `set: dev`, chuyển tệp sang `vignettes/dev/`);
   - một agent độc lập viết ca thay thế.
7. **Không thêm dấu hiệu mới vào danh mục giữa chừng một lô,** sau khi ca giữ kín của lô đã được viết. Ca giữ kín không nhắc tới một dấu hiệu thì mặc định là "không", nên dấu hiệu mới sẽ làm kết quả chấm sai lệch. Đề xuất của các lượt được ghi vào việc tồn và đưa vào lô sau, trước khi agent viết ca giữ kín của lô đó làm việc.
8. **Chỉ phát hành khi lô đạt mọi chỉ tiêu trên bộ giữ kín.** Xem mục 6 về cách phát hành khi làm trên cloud.
9. **Quyết định nền** (24/10/2026):
   - chưa có bác sĩ duyệt: mọi nội dung ghi "chưa thẩm định", chỉ dùng nội bộ;
   - hiện con số %, kèm biện pháp an toàn (làm tròn, mức xử trí do quy tắc an toàn quyết định);
   - không dùng AI hay LLM lúc chạy;
   - phi lợi nhuận vĩnh viễn;
   - không thử nghiệm với người thật; thay bằng kiểm tra tự động và chủ dự án tự thử trên điện thoại.
10. **Quyết định của Giai đoạn 3** (`docs/phase-3/scope.md`, mục 7):
    - 41 triệu chứng chính, 177 bệnh, giữ đủ danh sách;
    - ung thư được nêu tên kèm nhãn "Bác sĩ cần loại trừ";
    - sức khỏe tâm thần ở lô 7; chưa hiện đường dây hỗ trợ nào cho tới khi xác minh được số chính thức.

## 4. Môi trường và lệnh

```bash
node --version                  # cần >= 24 (package.json "engines")
npm ci
npm run verify                  # tsc, eslint, vitest, kb:check
npm run eval:check              # kiểm tra định dạng mọi ca
npm run eval -- --set dev       # bộ dev, sạch và nhiễu (2–3 phút)
npm run eval -- --set dev --report        # ghi báo cáo vào evaluation/reports/
npm run eval -- --set dev --case <id>     # in chi tiết một ca (JSON)
npm run eval -- --set holdout --report    # chấm bộ giữ kín: chỉ khi lô đã sẵn sàng
npm run kb:check -- --drafts drafts/phase-3/batch-N/pass-a   # kiểm tra bản nháp
npm run kb:agreement -- drafts/phase-3/batch-N               # kappa giữa lượt A và B
npm run kb:priors               # so prior các bệnh dưới cùng triệu chứng chính
npx playwright install --with-deps chromium   # một lần, cho kiểm thử giao diện
npm run test:e2e -w @doctor-v/web             # 24 phép thử; build vào apps/web/dist-test/
npm run check -w @doctor-v/web                # astro check
```

- "Nhiễu": 15% câu trả lời (trừ màn sàng lọc cấp cứu) bị đổi thành "Không rõ", 5 hạt giống. Khi thêm hoặc bớt một câu hỏi, chuỗi ngẫu nhiên đổi theo, nên số ca bỏ sót có thể dao động ±1 dù không có hồi quy thật. Muốn kết luận thì liệt kê từng lượt chạy trước và sau, rồi so sánh.
- Tải tài liệu (PDF…) về một thư mục tạm ngoài repo, ví dụ `/tmp/doctor-v-scratch/<việc>/`. Không chạy gì từ đó và không chép vào repo.

## 5. Quy trình một lô

Đã dùng cho lô 1 và lô 2. "Người bảo trì" là agent chính (bạn). Lời giao việc mẫu ở `docs/phase-3/prompts/` (xem README trong đó).

| Bước | Ai làm | Việc | Đầu ra |
|---|---|---|---|
| 0 | Người bảo trì | Đọc lô N trong `scope.md` và việc tồn trong worklog | |
| 1 | Người bảo trì | Soạn danh mục (chi tiết bên dưới); chạy dev trước và sau | Commit "batch N catalog" |
| 2 | Lượt R, 1 agent | Mở từng nguồn mới, đối chiếu quy tắc và câu chữ, sửa | `drafts/phase-3/batch-N/review-rules.md` |
| 3 | Lượt A, 2 agent | Soạn bệnh mới và phần mở rộng | `drafts/.../pass-a/` |
| 4 | Agent viết ca giữ kín, độc lập | Khoảng 40 ca: 2 ca mỗi bệnh mới, ca thay thế, ca cấp cứu, ca ngoài phạm vi | `evaluation/vignettes/holdout/` |
| 5 | Lượt B, 2 agent, không đọc lượt A | Soạn lại độc lập | `drafts/.../pass-b/` |
| 6 | Người bảo trì | `npm run kb:agreement` (lô 2: kappa 0,925) | `agreement.md` |
| 7 | Lượt C, 2 agent | Đối chiếu từng trường; tệp bệnh cuối cùng; chuyển nguồn vào sổ; 3 ca dev mỗi bệnh mới | `knowledge/conditions/`, `drafts/.../reconcile/`, ca dev |
| 8 | Người bảo trì | Tích hợp: bệnh mục tiêu của quy tắc, danh sách `cant_miss`, thứ tự câu hỏi, cụm; chạy dev, đọc báo cáo, sửa có căn cứ | Commit "integrate batch N" |
| 9 | Người bảo trì | Chấm giữ kín. Không đạt thì sửa theo quy tắc giữ kín rồi chấm lại | Báo cáo holdout |
| 10 | Người bảo trì | Phát hành (mục 6); ghi worklog (kết quả, chi phí); đánh dấu lô xong trong `scope.md` | Tag `release-phase3-batchN` |

**Bước 1, soạn danh mục:**
- Triệu chứng chính mới: `knowledge/complaints/<id>.yaml` với `status: in_progress`. Bộ chấm vẫn dùng triệu chứng này; app ẩn nó, và khi tìm đúng tên thì báo "đang được soạn". Khi phát hành, bỏ trường này.
- Biểu tượng cho triệu chứng mới: SVG tự vẽ trong `ICONS` của `apps/web/src/components/check/Complaints.tsx`, và trường `icon` trong YAML.
- Dấu hiệu mới đặt cuối các tệp `knowledge/findings/*.yaml`, dưới tiêu đề "Giai đoạn 3, lô N". Câu hỏi tối đa khoảng 15 từ.
- Nhóm câu hỏi đánh dấu (`rules/question-groups.yaml`) có tối đa 7 mục. Câu thứ 8 thì hỏi riêng ngay sau nhóm, trong `red_flags` của triệu chứng.
- Quy tắc an toàn trong `rules/red-flags.yaml`, có nguồn. Nguồn người bảo trì chưa mở thì ghi `verified: false`; lượt R sẽ xác minh.
- `conditions` (bệnh mục tiêu) của quy tắc mới để trống tới bước 8, vì bệnh chưa tồn tại.
- Tệp phạm vi `knowledge/drafts/phase-3/batch-N/scope.yaml` với `new` và `extend`. `eval:check` đọc danh sách `new` này, nên ca giữ kín có thể ghi mã bệnh trước khi lượt C tạo bệnh.

**Khi chạy agent:**
- **Giới hạn sử dụng.** Agent hay bị dừng, theo phiên và theo tuần; lô 2 đã chạm giới hạn tuần.
  - Chỉ chạy tối đa 2 agent cùng lúc. Mỗi lần bị dừng, agent phải đọc lại toàn bộ ngữ cảnh, nên càng nhiều agent song song thì càng tốn.
  - Khi agent bị dừng, gửi SendMessage cho chính agent đó để nó làm tiếp, không tạo agent mới.
- **Ngân sách WebSearch nhỏ:** ghi rõ số lần cho phép trong lời giao việc.
- **Trang hay chặn truy cập tự động:** NICE, NCBI và StatPearls, WHO, AHA, một số trang tạp chí.
  - Europe PMC API là đường hợp lệ tới các bài trên PubMed.
  - Không dùng dịch vụ proxy hay trình đọc trung gian.
  - icd.kcb.vn hiện chuyển hướng sang medsen.vn và không tra được, nên mã ICD-10 để `icd10_verified: false`.
- **Agent soạn dữ liệu không chạy git.** Lịch sử git có bản nháp của lượt kia, nên mở ra là mất tính độc lập.
- **Chi phí đã đo:** lô 1 khoảng 6,6 triệu token agent, lô 2 khoảng 5,4 triệu (khoảng 380 nghìn mỗi bệnh mới, tính cả lượt R và ca giữ kín). Số này chưa tính phần của agent chính.

## 6. Phát hành khi làm trên cloud

- Chủ dự án thử app trên điện thoại qua server chạy trên máy Windows của họ: `npm run web:phone` phục vụ `apps/web/dist/` và không tự build lại.
- `npm run web:release` (build vào `dist/`) mà chạy trên cloud thì chỉ build trong máy cloud, không tới điện thoại.
- Kiểm thử và `npm run web:build` luôn build vào `apps/web/dist-test/`, nên không bao giờ đụng bản đã phát hành.

**Khi một lô đạt chỉ tiêu trên bộ giữ kín:**
1. Bỏ `status: in_progress` của các triệu chứng mới; chạy lại `verify` và kiểm thử giao diện.
2. Commit, tạo tag `release-phase3-batchN`, đẩy nhánh và tag lên GitHub (`git push`, `git push origin <tag>`).
3. Báo chủ dự án bằng tiếng Việt:
   - đưa nhánh về máy (merge hoặc pull);
   - chạy `npm ci` nếu phụ thuộc đổi, rồi `npm run web:release`;
   - tải lại trang trên điện thoại. Nếu server chưa chạy thì `npm run web:phone`.

Không đưa lên `main` một bản chưa qua chấm giữ kín mà chưa báo chủ dự án. Bản nháp của lô đang soạn phải để trên nhánh làm việc.

## 7. Việc tiếp theo: lô 3 (Ho, Khó thở, Đau ngực)

Phạm vi chi tiết: `docs/phase-3/scope.md`, mục "Lô 3".

- **15 bệnh mới:**
  - viêm phế quản cấp; hen phế quản (cơn hen); đợt cấp COPD; lao phổi; ho gà; viêm tiểu phế quản; viêm thanh quản cấp (croup);
  - suy tim; tràn khí màng phổi; bóc tách động mạch chủ; phản vệ;
  - trào ngược dạ dày – thực quản; đau thành ngực; zona thần kinh;
  - ung thư phổi, kèm nhãn "Bác sĩ cần loại trừ".
- **Bệnh đã có cần mở rộng:** viêm phổi, cảm lạnh, cúm, COVID-19, sởi (ho), hội chứng vành cấp (đau ngực, khó thở), nhiễm khuẩn huyết (khó thở); thuyên tắc phổi, rối loạn nhịp tim, cơn hoảng sợ, thiếu máu.
- **3 triệu chứng chính mới:** làm như lô 1, với `status: in_progress`, biểu tượng mới, nhóm dấu hiệu nguy hiểm riêng, và quy tắc theo hướng dẫn chính thức (Bộ Y tế, NHS, NICE, ESC, GINA, GOLD; WHO IMCI cho trẻ thở nhanh, rút lõm lồng ngực).
- **Dấu hiệu đã có trong danh mục:** cough, productive_cough, breathing_difficulty, pleuritic_chest_pain, hemoptysis, chest_pain_pressure, pain_radiates_arm_jaw, cold_sweat, leg_swelling_one_side, breathless_on_exertion, sore_throat, runny_nose, weight_loss_unintended, smoker, es_severe_breathing, es_crushing_chest_pain, es_anaphylaxis.
- **Chưa có:** khò khè, thở rít, ho từng cơn kèm thở rít (ho gà), ho kéo dài trên 2–3 tuần, ra mồ hôi đêm, đau ngực khi ấn, đau ngực kiểu xé lan ra lưng, phù hai chân, khó thở khi nằm, nổi ban dải một bên… Lượt A, B có thể đề xuất thêm, nhưng đề xuất phải được thêm vào danh mục **trước** khi agent viết ca giữ kín làm việc (quy tắc 7).
- **Quy tắc đau ngực đã có** (rf_chest_pain, rf_chest_pain_with_features…) đang giới hạn ở `complaints: [abdominal_pain, dizziness, syncope, palpitations]`. Cần mở rộng sang triệu chứng mới, và xem lại mức của từng quy tắc với Đau ngực là triệu chứng chính.
- **Bệnh mới có prior cho triệu chứng đã phát hành** (ví dụ lao, ho gà với Sốt) sẽ đổi kết quả của triệu chứng đó. So sánh bộ dev trước và sau, và giải thích mọi thay đổi.

**Cân nhắc trước lô 3:** các dấu hiệu để dành từ lô 2 (mục 8, ý 1) nay thêm được, vì lô 2 đã chấm xong. Nhưng ca giữ kín cũ không nhắc tới chúng, nên sẽ mặc định "không". Nếu một dấu hiệu mới gắn mạnh với một bệnh đã có ca giữ kín (ví dụ "da nóng khô" với sốc nhiệt), hãy nhờ một agent độc lập (vai agent viết ca giữ kín) rà các ca cũ của bệnh đó và bổ sung câu trả lời theo lời kể (narrative), không theo dữ liệu bệnh.

## 8. Việc tồn

Theo thứ tự ưu tiên. Chi tiết trong `docs/worklog.md`.

1. **Dấu hiệu còn thiếu**, để dành từ lô 1–2:
   - da nóng khô, không đổ mồ hôi; không đỡ sau 30 phút làm mát; nhiệt độ từ 40°C;
   - đau lưng dữ dội đột ngột; khối đập theo nhịp tim ở bụng; "đau dữ dội" là dấu hiệu báo trước khi ngất (`syncope_warning`);
   - thở sâu nhanh (kiểu nhiễm toan); đang dùng insulin; bỏ liều insulin;
   - thay đổi hành vi hoặc khó tìm từ trong vài ngày (viêm não); đã tiêm vắc xin viêm não Nhật Bản; tiếp xúc lợn, ruộng lúa, động vật trang trại;
   - huyết áp thấp (dưới 90/60) trong `bp_measured`;
   - nước tiểu sẫm, phân bạc màu;
   - tiết dịch niệu đạo; `new_sexual_partner` cho nam; thụ tinh trong ống nghiệm; thai đã xác định trong tử cung;
   - trẻ quấy khóc; sốt dù đã uống kháng sinh; hạt Koplik; đã từng mắc sởi;
   - cháy nắng, chuột rút; chảy máu mũi riêng (hiện gộp với chảy máu chân răng);
   - từ lô 1: cắn lưỡi, tiểu không tự chủ khi ngất; bệnh van tim; thuốc mới dùng; đỏ bừng mặt; phù hai chân; thuốc tránh thai; hỏi "đái tháo đường" cho trẻ 5–12 tuổi; bệnh tim, tăng huyết áp cho người dưới 18 tuổi.
2. **Tổng xác suất nhóm bệnh cần cấp cứu tăng dần theo số bệnh.**
   - Mức 2 bật khi tổng xác suất các bệnh mức 1–2 (cộng phần tương ứng của "nguyên nhân khác") từ 2% trở lên.
   - Mỗi bệnh nguy hiểm mới góp thêm một phần nhỏ, nên ca nhẹ dễ bị đẩy lên mức 2. Trong bộ dev: d-renal-colic-3, d-primary-dysmenorrhea-3.
   - Cần xem lại ngưỡng hoặc cách tính khi thêm nhiều bệnh. Đây là quyết định an toàn: đề xuất cho chủ dự án, kèm số liệu.
3. **Ở mức 1, bộ suy luận dừng ngay,** không hỏi câu phân biệt nguyên nhân (phơi nắng, khí CO…). Vì vậy danh sách cần loại trừ và lời khuyên sơ cứu (làm mát, ra chỗ thoáng) có thể thiếu.
   - Cách xử lý tạm: hỏi các câu đó sớm trong `red_flags` (đã làm cho khí CO và phơi nắng).
   - Hỏi thêm 1–2 câu sau khi đã ở mức 1 sẽ làm chậm lời khuyên gọi 115: cần chủ dự án quyết định.
4. **Ca giữ kín đang bỏ sót:** h-abd-051, thiếu máu mạc treo trên nền mạn ở người 74 tuổi; cần mức 1, app ra mức 2. Chưa sửa. Nếu sửa thì theo quy tắc giữ kín.
5. **Giao diện:**
   - header xuống 2 dòng ở màn 320 px với cỡ chữ lớn nhất;
   - chữ trong ô đánh dấu xuống dòng gần như từng từ ở 320 px với cỡ chữ lớn nhất;
   - gợi ý "Ở trẻ nhỏ: …" của câu khó thở hiện cả với người lớn;
   - Chóng mặt và Ngất mở đầu bằng câu "phòng kín đốt than" (cách xử lý tạm cho bước nâng mức).
6. **Tìm triệu chứng:** thêm từ điển cách gọi dân gian.
7. **Pháp lý:** trang ESC ghi rằng dùng nội dung hướng dẫn trong phần mềm cần giấy phép. Ghi chú này nằm ở `knowledge/sources/esc-syncope-2018.yaml` và trong worklog. Cần đưa vào phần luật sư rà soát trước khi công khai (`docs/plan.md`; bản nháp pháp lý ở `docs/legal/`).
8. **Bác sĩ duyệt:** chưa có bác sĩ. Các điểm cần bác sĩ quyết định nằm ở `docs/reports/phase-1.md` mục 8 và trong `review.notes_vi` của từng bệnh.
9. **Hiệu chuẩn:** con số % chưa được hiệu chuẩn (`calibrated: false`).

## 9. Bẫy đã gặp

- **Quy tắc và câu trả lời:** dấu hiệu chưa hỏi được coi là "không" (F). Trả lời "Không rõ" thì điều kiện thành không xác định (U). Quy tắc mức 1–2 đang U thì đẩy lên ít nhất mức 3; với người nguy cơ cao thì lên đúng mức của quy tắc.
- **Bước nâng mức** (đã ở mức 2): hỏi các dấu hiệu tự mình làm một quy tắc mức 1 thành đúng. Từ lô 2, bước này hỏi thêm cả quy tắc mức 1 còn thiếu hai dấu hiệu, tối đa 4 câu (`max_escalation_questions`). Quy tắc cần ba dấu hiệu trở lên vẫn không được xét, nên câu then chốt phải được hỏi sớm.
- **Danh sách "Bác sĩ cần loại trừ":** tối đa 3 bệnh, sắp theo xác suất. Danh sách luôn giữ ít nhất một bệnh do quy tắc đã quyết định mức xử trí nêu tên. Không gắn bệnh hẹp cho quy tắc rộng: ví dụ gắn "phình động mạch chủ" cho quy tắc "đau bụng dữ dội" thì người trẻ bị viêm ruột thừa cũng sẽ thấy nó.
- **Lựa chọn trung tính** (`neutral`, ví dụ "Chưa đo" của mạch, đường huyết): mọi bệnh phải cho lựa chọn này đúng tỷ lệ nền.
- **Tần suất có điều kiện:** dấu hiệu có `requires` thì tần suất tính trong số người đã có dấu hiệu điều kiện.
- **Ca dev viết trước khi có bệnh** ghi bệnh đúng là `other`. Đổi sang mã bệnh khi bệnh đã có.
- **Lượt C không sửa** findings, rules, complaints, meta. Họ đề xuất; người bảo trì quyết định.
- **Agent có thể ghi ngày theo giờ máy** (lệch một ngày qua nửa đêm). Thống nhất ngày khi tích hợp.
- **Câu chữ:** mỗi câu `reason_vi` tối đa 25 từ, câu hỏi tối đa khoảng 15 từ (`kb:check` cảnh báo).
- **Từ dễ nhầm:** "thiên đầu thống" thường chỉ glôcôm, không phải đau nửa đầu.
