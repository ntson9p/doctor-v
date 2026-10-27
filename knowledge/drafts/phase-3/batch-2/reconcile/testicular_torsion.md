# Biên bản đối chiếu: testicular_torsion (Xoắn tinh hoàn)

- Lượt C (`agent:pass-c`), Giai đoạn 3 lô 2 phần a, 27/10/2026. Trạng thái: `source_checked`.
- Nguồn đã mở lại: tóm tắt Zhao 2011, Vasconcelos-Castro 2020, Pogorelić 2013, Mantica 2025, Huang 2013, Lukosiute-Urboniene 2023, Moran 2024; toàn văn Choi 2022, Murali 2022, Deng 2024 (API Europe PMC). Tóm tắt Lukosiute-Urboniene bị cắt: không dẫn các tỷ số chênh không đọc được.

## Bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior dưới 2 tháng | P6 (mặc định) | P5 | P5 | B có số liệu (đỉnh ở nhũ nhi); nhóm này chỉ sàng lọc, câu đau bìu vẫn được hỏi | Huang 2013 |
| scrotal_pain | frequent | very_frequent | very_frequent | Lệch một mức; B có số liệu (92–95%); chỉ 6–11% chưa đau bìu lúc đầu, kể cả theo cách ước của A thì nhóm này chỉ khoảng một phần tư người chọn Đau bụng | Murali, Deng, Pogorelić, Mantica |
| vomiting | frequent | occasional | occasional | B có số liệu (12–19% ở mọi người xoắn) | Murali, Deng |
| abd_pain_severe | occasional | frequent | frequent | Ngang nguồn; dấu hiệu cảnh báo của bệnh nguy hiểm | EAU, NHS |
| abd_pain_location, onset, duration | phân bố A | phân bố B | Trung bình | Lệch tới 0,1 | Murali, Deng |
| dysuria | không | rare | Giữ | Triệu chứng tiết niệu 3,1% | Murali |
| abd_pain_migrated_rlq | không | rare | Giữ | Kiểu đau của viêm ruột thừa; hướng sinh lý rõ (đã thử bỏ: không đổi kết quả) | — |
| abd_pain_meal_relation | không | {0,03; 0,05; 0,92} | Bỏ | Không nguồn nào nói về bữa ăn; nhất quán với phình động mạch chủ bụng | — |
| vi_common | thêm "Xoắn dịch hoàn" | — | Giữ của A | Tên thường gọi | — |

## Giá trị dựa trên nhận định

- Prior (suy từ tỷ lệ mới mắc ở Hàn Quốc, Đài Loan, Mỹ; giả định phần lớn người đau bìu chọn Đau bụng).
- abd_pain_radiates_groin frequent; mức very_frequent của đau bìu (trả lời "Không" giảm khả năng khoảng 5 lần).
- Các phân bố.

## Kiểm thử

- d-testicular-torsion-1 (mức 2, hạng 3), -2 (người lớn, mức 2, hạng 2), -3 (dễ nhầm viêm ruột thừa: mức 2, hạng 1).
- d-renal-colic-3 (nam 26 tuổi, đau quặn lan xuống bẹn, không đau bìu): mức 3 thành 2 (mức đúng 3). Bệnh này chỉ còn 0,6% (đau bìu "Không"), nhưng phiên dừng sau 13 câu, trước khi hỏi cách khởi phát, đau di chuyển, nên viêm ruột thừa còn 6%. Bỏ riêng bệnh này hoặc bỏ riêng phình động mạch chủ bụng thì ca trở lại mức 3: hai bệnh cùng liên kết với đau lan xuống bẹn, làm giảm giá trị các câu hỏi loại trừ viêm ruột thừa (câu trả lời làm viêm ruột thừa giảm lại làm hai bệnh này tăng), nên phiên coi là đã đủ thông tin. Lượt C không đổi tham số vì không có nguồn; đề xuất người bảo trì thêm cụm cho scrotal_pain và abd_pain_radiates_groin (lượt B đề xuất), và xem lại điều kiện dừng khi mức 2 chỉ dựa vào xác suất.
