# Biên bản đối chiếu: leptospirosis (Bệnh do xoắn khuẩn Leptospira)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 2 phần b, 27/10/2026.
- Bản chính thức: `knowledge/conditions/leptospirosis.yaml`, trạng thái `source_checked`.
- Mức xử trí 3, không thuộc nhóm không được bỏ sót: hai lượt thống nhất. 10 liên kết chung trùng mức.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi | Bệnh do Leptospira | Bệnh do xoắn khuẩn Leptospira | Theo lượt B (tên trong scope.yaml) | Chưa đối chiếu được ICD-10 tiếng Việt | – |
| codes | A27.9 + MONDO | A27 | A27, bỏ MONDO | Bệnh gộp cả nhóm; MONDO chưa kiểm tra | – |
| Prior Sốt, từ 75 tuổi | P5 | P4 (mặc định) | P4 | Không có số liệu theo tuổi; câu phơi nhiễm sẽ tách nhóm này; WHO: người cao tuổi dễ bị nặng | WHO 2003 |
| Prior Đau đầu, thiếu niên | P6 | P5 (mặc định) | P6 | Đúng nguyên tắc chung của cả hai lượt (Đau đầu thấp hơn Sốt một bậc; Sốt ở thiếu niên P5) | – |
| fever | không có | almost_always | Giữ | Sốt 95% (Sri Lanka); chỉ dùng khi triệu chứng chính là Đau đầu | Rajapakse 2016 |
| bleeding_gums_nose | không có | rare, above_leak_ok | Giữ | Xuất huyết ở thể nặng (WHO) | WHO 2003, Le-Viet 2019 |
| neck_stiffness | không có | rare, above_leak_ok | Giữ | Viêm màng não vô khuẩn tới 25% ca (Levett), cứng gáy 13,3% (Rajapakse) | Levett 2001, Rajapakse 2016 |
| cough, vomiting, abdominal_pain, lymph_node_swelling, rash_any | có | không có | Giữ cả 5 | Có số liệu (bảng 7 Levett, gồm Việt Nam 1973) | Levett 2001, Le-Viet 2019, Haake 2015 |
| headache_location | có | không có | Giữ | Levett: đau đầu giống sốt xuất huyết | Levett 2001 |
| Phân bố sốt, đau đầu | xem bản A | xem bản B | Trung bình | Ước lượng | Le-Viet 2019 |
| warning_signs | có cứng gáy | không cứng gáy; thêm li bì, tay chân lạnh | Theo lượt B | Cứng gáy đã ở mức 2 (nêu viêm màng não); để ở đây thì Leptospira (mức 3) có thể chiếm chỗ trong danh sách "Bác sĩ cần loại trừ" | Quy tắc rf_neck_stiffness |
| Ghi chú Haake (OR 5,29) | "tiếp xúc chuột trong nhà" | – | Sửa | Bài ghi OR 5,29 là sống cùng nhà với người bệnh, không phải tiếp xúc chuột | Haake 2015 |

## Giá trị dựa trên nhận định

- Prior (suy từ 4,8% người lớn sốt không rõ ổ nằm viện ở Quảng Nam).
- Tần suất phơi nhiễm (very_frequent) và đau bắp chân (frequent): chuyển từ mô tả của WHO.
- Hạ mức cho cộng đồng: rét run, tiểu ít, ho ra máu.
- Các phân bố số ngày sốt và đặc điểm đau đầu.

## Đề xuất

- Người bảo trì: thêm leptospirosis vào `conditions` của rf_lepto_severe.
- Câu phơi nhiễm chưa hỏi chăm sóc, giết mổ gia súc (lượt R đã đề xuất); chưa có câu "đau thắt lưng".

## Ca dev

- d-leptospirosis-1, -2, -3.
