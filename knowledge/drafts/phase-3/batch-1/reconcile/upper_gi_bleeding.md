# Biên bản đối chiếu lượt C: upper_gi_bleeding

- Giai đoạn 3, lô 1, phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-25.
- Nguồn mở lại: Quach 2016, Stanley 2017 (toàn văn PMC); Anh 2025 (trang bài và PDF toàn văn, tự trích chữ bảng 3); Phuc 2024 (trang bài, tóm tắt; PDF không trích được chữ tiếng Việt nên chỉ dùng số liệu trong tóm tắt); Bösner 2018 (toàn văn); MSD Overview of GI bleeding (trang MSD); NHS Stomach ulcer (tải trang). ESC 2018 đã có trong sổ đăng ký (lượt R).
- Trạng thái: `source_checked`.

## Mức xử trí

Hai lượt cùng chọn **mức 2** (gợi ý là 1), giữ không được bỏ sót. Lượt C đồng ý: kb-guide mục 2.5 lấy mức của ca chưa biến chứng; NHS Stomach ulcer: phân đen, nôn ra máu thì '999 hoặc cấp cứu'; Stanley 2017: điểm Glasgow Blatchford từ 1 trở xuống có thể xử trí ngoại trú. Kèm ngất, choáng (rf_syncope_gi_bleeding) hoặc dấu hiệu sốc (rf_shock_cold_and_weak) thì quy tắc nâng lên mức 1.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| prior syncope, dizziness | (giá trị trùng ở Ngất; Chóng mặt 18–44 tuổi P6) | (Chóng mặt 18–44 tuổi P5) | Chóng mặt 18–44 tuổi P5 | Ngang nguồn; thận trọng hơn | Anh 2025; Bösner |
| prior_modifiers (giới) | nam 1,6; nữ 0,5 | nam 1,4; nữ 0,7 | Bản A | Số liệu Việt Nam (nam 74,4%, 2,2/1) và tính đúng mẫu số (khoảng 45% người ngất, chóng mặt là nam); lượt B giả định nam nữ ngang nhau | Quach 2016; Anh 2025 |
| black_stool (cơ sở) | judgment (MSD) | numeric (90%, hạ một mức) | Bản B | Có số liệu Việt Nam | Anh 2025 |
| vomiting | frequent | không liên kết | Bỏ | Nôn ra máu đã được hỏi riêng (khác cụm); liên kết 'nôn' sẽ đẩy người ngất do viêm dạ dày ruột (nôn, mất nước) lên nhóm cấp cứu chỉ vì xác suất | — |
| dizziness | frequent (bằng lời) | very_frequent (84,3%) | very_frequent | Có số liệu | Anh 2025 |
| abdominal_pain | occasional | frequent (70%, hạ một mức) | frequent | Có số liệu; đã hạ một mức; MSD: nhiều người loét chảy máu không đau | Anh 2025; MSD |
| regular_painkiller_use | occasional | frequent (37,1%) | frequent | Có số liệu; khi không có phân đen, nôn ra máu khả năng bệnh đã giảm khoảng 10 lần | Anh 2025 |
| abd_pain_location, syncope_trigger, pulse_measured, dizziness_pattern | | | Trung bình | Lệch nhỏ | — |
| cold_sweat, cold_hands_feet, severe_weakness, antithrombotic_use | occasional | không liên kết (một số trong dấu hiệu cảnh báo) | Giữ (A) | Dấu hiệu giảm thể tích, sốc; thuốc chống đông, aspirin | MSD |
| not_recovered_after_faint | (chưa có dấu hiệu) | occasional | Giữ (B) | | ESC 2018 |
| chronic_liver_disease | occasional | occasional | Trùng | | Stanley; Quach; Phuc |
| vomiting_blood (số liệu Phuc) | | 71,8% | Ghi 'trên 70%' | Chỉ đọc được tóm tắt | Phuc 2024 |
| warning_signs | 5 dấu hiệu | thêm lú lẫn | Bản B | | MSD |
| specialties | tiêu hóa trước | cấp cứu trước | Bản B | Mức 2 | — |

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Mọi prior (chưa có số liệu xuất huyết tiêu hóa trong người ngất, chóng mặt); hệ số giới.
- Các liên kết dấu hiệu sốc, thuốc chống đông; các phân bố.
- Chưa liên kết 'ợ hơi, ợ chua' dù Anh 2025 ghi 95,7% (số liệu bệnh viện, dấu hiệu không đặc hiệu).

## Kiểm tra trên bộ ca dev

- d-upper-gi-bleeding-1 (thuốc giảm đau, phân đen, suýt ngất): mức 1 đúng (rf_syncope_gi_bleeding), đứng đầu danh sách cần loại trừ (38%).
- d-upper-gi-bleeding-2 (76 tuổi, aspirin, chỉ choáng và phân đen, triệu chứng chính Chóng mặt): mức 2 đúng (rf_gi_bleeding), đứng đầu danh sách cần loại trừ.
- d-upper-gi-bleeding-3 (ngất khi đi ngoài, phân đen, dễ nhầm với ngất tình huống): mức 1 đúng, đứng thứ 2 (11%) sau rối loạn nhịp; phiên dừng ở câu thứ 2.
- Đề xuất cho người bảo trì: thêm `upper_gi_bleeding` vào `conditions` của rf_syncope_gi_bleeding và rf_gi_bleeding.
