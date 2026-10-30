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
- Mục "Read first" của các tệp trong `batch-2/` bảo agent đọc toàn bộ `knowledge/findings/`, `knowledge/conditions/` (các bệnh cần phân biệt), `red-flags.yaml` và `knowledge/sources/`. Vì vậy, sau 25 lượt gọi, ngữ cảnh đã lên 160–290 nghìn token, trước khi agent bắt đầu soạn. Từ lô 3, thay phần này bằng mục lục gọn (`docs/handoff.md` mục 7, phần chuẩn bị). Chỉ mở tệp đầy đủ của 1–2 bệnh mẫu và của bệnh cần mở rộng.
