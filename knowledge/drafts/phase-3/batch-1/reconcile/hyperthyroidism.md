# Biên bản đối chiếu lượt C: hyperthyroidism

- Giai đoạn 3, lô 1, phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-25.
- Nguồn mở lại: 3879/QĐ-BYT (toàn văn trên luatvietnam.vn, bài Bệnh Basedow và Cơn nhiễm độc giáp cấp; bản PDF trên cổng NCD của WHO không trích được chữ); Boelaert 2010, Nordyke 1988, Weber 1996 (tóm tắt, API Europe PMC); EHRA 2011 (trang OUP); MSD Hyperthyroidism (trang MSD); NHS Overactive thyroid (tải trang).
- Trạng thái: `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi | Nhiễm độc tuyến giáp (cường giáp) | Nhiễm độc giáp (cường giáp) | Bản A | Tên E05 trong bộ mã (lượt A tra) | ICD-10 |
| names.vi_common | Bướu giáp lồi mắt | Bướu cổ lồi mắt | Bản B | Từ người dân hay dùng | — |
| weight_loss_unintended | frequent | very_frequent | very_frequent | 3879/QĐ-BYT: 'thường' ăn nhiều mà gầy sút; thể tăng cân khoảng 5%; sụt cân không giảm theo tuổi | 3879/QĐ-BYT; Boelaert; Nordyke |
| heat_intolerance | frequent (cao tuổi occasional) | very_frequent (cao tuổi frequent) | Bản B | 3879/QĐ-BYT: 'luôn' có cảm giác nóng bức | 3879/QĐ-BYT; Boelaert |
| tremor | frequent (cao tuổi occasional) | very_frequent (cao tuổi frequent) | very_frequent; 65–74 frequent; từ 75 occasional | Run tay đầu ngón là triệu chứng chủ yếu để chẩn đoán (3879); MSD: phần lớn người cao tuổi không run; 3879 lại ghi người cao tuổi run biên độ lớn (hai nguồn chưa thống nhất) | 3879; MSD; Boelaert; Nordyke |
| goiter_visible, theo tuổi | cao tuổi occasional | không đổi theo tuổi | Bản A | 3879: người cao tuổi tuyến giáp to vừa phải | 3879/QĐ-BYT |
| eyes_bulging, theo tuổi | cao tuổi rare | không đổi theo tuổi | Bản A, thêm above_leak_ok | MSD: phần lớn người cao tuổi không lồi mắt; mức rare vẫn cao hơn tỷ lệ nền 0,01 có chủ ý | MSD; 3879 |
| palpitation_rhythm, pulse_measured | | | Trung bình | Lệch nhỏ | 3879 |
| palpitation_duration | (chưa có dấu hiệu) | 0,10/0,30/0,60 | Giữ (B) | Nhịp tim nhanh thường xuyên | 3879 |
| breathless_on_exertion | occasional | không liên kết | Giữ (A) | Khó thở không giảm theo tuổi | Boelaert 2010 |
| panic_fear | rare | không liên kết | Bỏ | MSD: cường giáp có thể gây triệu chứng giống cơn hoảng sợ; 'Có' không nên làm giảm khả năng cường giáp | MSD |
| stress_poor_sleep | không liên kết | frequent | Giữ (B) | Bồn chồn, rối loạn giấc ngủ | 3879; NHS |
| cold_sweat | không liên kết | occasional | Giữ (B) | Ra nhiều mồ hôi (thường ấm) | 3879 |
| 3879/QĐ-BYT, địa chỉ | luatvietnam.vn | PDF cổng WHO | luatvietnam.vn | Lượt C chỉ đọc được bản này | — |
| self_care_vi, see_doctor_vi | | | Gộp | | 3879; NHS |

Không đổi: prior Hồi hộp P3 (trẻ 5–12 P5, 13–17 P4), hệ số giới 1,5/0,3, mức xử trí 4 (hai lượt trùng).

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Prior (chỉ suy từ nhóm 'bệnh toàn thân' 4% của Weber); hệ số giới quy đổi từ tỷ lệ nữ/nam của bệnh.
- Tần suất triệu chứng theo mô tả bằng lời (chưa mở được toàn văn Boelaert có tỷ lệ theo tuổi); các phân bố.

## Kiểm tra trên bộ ca dev

- d-hyperthyroidism-1 (Basedow điển hình) và -3 (dễ nhầm với lo âu): mức 4, đứng đầu (gần 100%).
- d-hyperthyroidism-2 (thể vô cảm ở người 72 tuổi, rung nhĩ): mức 3, đứng đầu (45%), rối loạn nhịp 24% (chấp nhận được).
- Ở bản nhiễu, một phần phiên ra mức 3 (câu dấu hiệu nguy hiểm 'Không rõ').
