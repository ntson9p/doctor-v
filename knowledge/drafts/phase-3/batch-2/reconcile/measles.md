# Biên bản đối chiếu: measles (bản mở rộng, Giai đoạn 3 lô 2)

- Lượt C: `agent:pass-c`, 27/10/2026. Bản chính thức sửa tại chỗ: `knowledge/conditions/measles.yaml`, giữ `source_checked`.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| rash_any | very_frequent → frequent (basis numeric, giữ nguồn CDC) | very_frequent → frequent (basis judgment, bỏ CDC vì không mở lại) | frequent, basis judgment, nguồn 1019 và Del Moral | Cả hai lượt cùng đưa bằng chứng mạnh rằng giá trị cũ sai theo thời điểm hỏi: ban mọc sau 3–4 ngày sốt (1019), 98% là tỷ lệ có ban cuối cùng ở ca đã xác định (Del Moral); ghép với phân bố số ngày sốt cho khoảng 0,5. Mức cũ làm "chưa có ban" giảm khả năng sởi khoảng 5 lần (ca d-from-h-fever-009 xếp sau cúm) | 1019/QĐ-BYT mục 2.1.1, 2.4.2; Del Moral 2026 |
| measles_contact | giữ occasional | giữ occasional | Giữ | 22,7–24,8% ca có tiếp xúc đã biết; quy tắc rf_measles_contact_fever đã đưa mức lên 3 | Del Moral 2026 |
| Dấu hiệu Kawasaki (môi đỏ nứt, bàn tay chân, sẹo BCG) | không liên kết | không liên kết | Không liên kết | 1019 nêu là điểm phân biệt với Kawasaki; chưa có tần suất ở sởi | 1019 |

## Thay đổi giá trị cũ (ghi nhận theo yêu cầu)

- rash_any: very_frequent → frequent. Cả hai lượt độc lập cùng đề xuất và cùng lý do có nguồn.

## Giá trị dựa trên nhận định

- Mức frequent của rash_any (ghép mốc của 1019 với phân bố số ngày sốt).

## Ca dev

- d-measles-fever-1 (trẻ 2 tuổi chưa tiêm, giai đoạn khởi phát, có tiếp xúc).
- Ca d-from-h-fever-009: xem báo cáo chung.
