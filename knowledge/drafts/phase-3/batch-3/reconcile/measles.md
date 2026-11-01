# Biên bản đối chiếu lượt C: measles (mở rộng, Giai đoạn 3 lô 3)

- Phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-31.
- Bản nháp: `pass-a/extend/measles.yaml`, `pass-b/extend/measles.yaml`. Giữ nguyên mọi giá trị đã đối chiếu ở các lô trước.
- Nguồn mở lại: MSD Measles (tải trang, cập nhật 10/2026: khởi phát 3–7 ngày với ho khan; bội nhiễm gồm viêm phổi, viêm thanh khí phế quản). 1019/QĐ-BYT, 3312/QĐ-BYT đã có trong sổ, đã xác minh.
- Nguồn đưa vào sổ: `msd-measles`.
- Trạng thái: giữ `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| prior cough, 2 tháng–12 tuổi | P4 (cùng mức prior Sốt) | P5 | P5 (B) | Người sốt cao, phát ban thường chọn Sốt; người chọn Ho phần lớn bị cảm lạnh, viêm phế quản, nên tỷ lệ sởi thấp hơn ở Sốt | 1019; 3312; MSD |
| prior cough, dưới 2 tháng | P5 (mặc định) | P6 | P6 (B) | Còn kháng thể từ mẹ | 1019 |
| cough_duration | 0,60 / 0,30 / 0,09 / 0,01 | 0,62 / 0,28 / 0,095 / 0,005 | Trung bình 0,61 / 0,29 / 0,0925 / 0,0075 | Ngang nguồn | 1019 mục 2.1.1; MSD |
| hoarse_voice | Không (dấu hiệu chưa có) | occasional | Giữ (B) | 3312: viêm thanh quản do sởi; MSD: bội nhiễm viêm thanh khí phế quản | 3312; MSD |

Hai lượt cùng giữ mặc định P5 và P6 từ 45 tuổi; cùng không liên kết khò khè, thở rít, ho ông ổng, ho từng cơn (không có tỷ lệ).

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Prior Ho (phụ thuộc mạnh vào đợt dịch); phân bố thời gian ho; tần suất khàn tiếng.
- Với Ho, liên kết cũ sốt (almost_always) làm trẻ ho không sốt gần như loại sởi.

## Ca dev

- Mới: d-measles-cough-1 (3 tuổi chưa tiêm, ho 4 ngày, sốt cao, đỏ mắt, ban từ sau tai, có tiếp xúc): sởi 75%, mức 3.
- Ca cũ được thêm câu trả lời của lô 3 (câu chuyện ghi rõ ho trong vài ngày): `cough_duration: lt_1w` ở d-measles-1, d-measles-2, d-measles-3, d-measles-fever-1, d-from-h-fever-009. Kết quả chế độ sạch không đổi; d-measles-2, d-measles-fever-1 tụt một bậc ở một phiên nhiễu (8 → 9, 9 → 10).
