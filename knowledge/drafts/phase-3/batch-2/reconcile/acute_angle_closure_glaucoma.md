# Biên bản đối chiếu: acute_angle_closure_glaucoma (Glôcôm góc đóng cơn cấp)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 2 phần b, 27/10/2026.
- Bản chính thức: `knowledge/conditions/acute_angle_closure_glaucoma.yaml`, trạng thái `source_checked`.
- Mức xử trí 2, không được bỏ sót: hai lượt thống nhất. 7 liên kết chung trùng mức.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| vi_common | Cơn tăng nhãn áp cấp, Cườm nước cấp | Cơn tăng nhãn áp cấp | Cơn tăng nhãn áp cấp, Thiên đầu thống | "Thiên đầu thống": lượt C mở bài báo Đại Đoàn Kết (9/4/2018) ghi "Glôcôm (thường gọi là bệnh thiên đầu thống)"; 40/QĐ-BYT không dùng tên này. Tên dân gian của glôcôm nói chung, để tìm kiếm; nguồn là báo chí nên cần bác sĩ xác nhận. "Cườm nước": chưa mở được nguồn | Đại Đoàn Kết; 40/QĐ-BYT |
| codes.mondo | có | không có | Bỏ | Chưa kiểm tra | – |
| Prior Đau đầu 65–74 tuổi | P4 | P5 | P5 | Số liệu toàn quốc Hàn Quốc (ranh giới P4/P5); P4 làm riêng bệnh này gần 0,9% sau chuẩn hóa, gần ngưỡng 1% của bệnh không được bỏ sót trước khi hỏi, và vượt đột quỵ khi phiên dừng sớm (lượt B đã thử) | Park 2019, Lai 2001 |
| Hệ số nam | 0,65 | 0,6 | 0,6 | Tỉ số 2,5 gần Singapore (2,4), Hàn Quốc (2,56) | Seah 1997, Park 2019 |
| nausea | frequent | không có | Giữ | Ba nguồn đều nêu | 40/QĐ-BYT, NHS, MSD |
| abdominal_pain | occasional | không có | Giữ | 40/QĐ-BYT: có thể đau bụng | 40/QĐ-BYT |
| cold_sweat | occasional | không có | Giữ | 40/QĐ-BYT: vã mồ hôi | 40/QĐ-BYT |
| fever | rare | không có | Không liên kết | 40/QĐ-BYT ghi "có thể ... sốt", trái với mức thấp hơn nền; để tỷ lệ nền thì sốt không làm tăng khả năng glôcôm ở mọi người sốt đau đầu | 40/QĐ-BYT |
| eye_pain, blurred_vision: nguồn số liệu | – | Lai 2001 bảng 1 (81,9%, 86,1%) | Không dùng số | Không tải được bản PDF trên hkmj.org; giữ mức very_frequent theo mô tả của 40/QĐ-BYT, NHS, MSD | – |
| Phân bố đau đầu | xem bản A | xem bản B | Trung bình | Ước lượng | 40/QĐ-BYT, ICHD-3 mục 11.3.1, Seah 1997 |
| warning_signs | đau mắt, quầng sáng, mất thị lực | thêm đỏ mắt, nôn liên tục | Theo lượt A | Đỏ mắt, nôn đơn thuần không đặc hiệu cho cơn glôcôm | – |

## Giá trị dựa trên nhận định

- Prior (suy từ tỷ suất mắc ở Hồng Kông, Singapore, Hàn Quốc và giả định số người khám vì đau đầu).
- Mọi tần suất (chỉ có mô tả; chưa đối chiếu được bảng triệu chứng của Lai 2001).
- Các phân bố đặc điểm đau đầu.

## Ca d-stroke-3

- Lượt B thấy glôcôm đứng trên đột quỵ trong danh sách cần loại trừ (nam 72 tuổi, rung nhĩ, mất thị lực nửa trái, đau đầu vùng gáy, buồn nôn). Kết quả với bản chính thức: xem báo cáo chung.

## Đề xuất

- Người bảo trì: thêm bệnh này vào `conditions` của rf_acute_glaucoma_signs, rf_vision_loss; thêm vào `cant_miss` của Đau đầu.
- Câu hỏi thuốc làm giãn đồng tử (thuốc ho, thuốc cảm), tiền sử gia đình.

## Ca dev

- d-acute-angle-closure-glaucoma-1, -2, -3.
