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
