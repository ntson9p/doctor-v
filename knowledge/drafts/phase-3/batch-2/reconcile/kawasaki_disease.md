# Biên bản đối chiếu: kawasaki_disease (Bệnh Kawasaki)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 2 phần b, 27/10/2026.
- Bản chính thức: `knowledge/conditions/kawasaki_disease.yaml`, trạng thái `source_checked`.
- Mức xử trí 3, không thuộc nhóm không được bỏ sót: hai lượt thống nhất.

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common | Hội chứng hạch, da, niêm mạc | không có | Giữ | 3312/QĐ-BYT (2015) tr. 716 ghi "Kawasaki: hội chứng hạch-da-niêm mạc" | 3312 |
| codes.mondo | có | không có | Bỏ | Chưa kiểm tra | – |
| applicability | gồm thiếu niên | đến 12 tuổi | Theo lượt B | Các câu đặc trưng chỉ hỏi trẻ dưới 13 tuổi; ở thiếu niên rất hiếm. Lưu ý: kb-guide chỉ cho phép khi bất khả về sinh học; cần người bảo trì quyết định | Kim 2020, 3312 |
| Prior Sốt | mặc định P5, nhóm khác P6 | mặc định P6, 2 tháng–5 tuổi P5 | Cùng giá trị | Chỉ khác cách ghi | Makino 2015, Kim 2020 |
| Hệ số nữ | 0,82 | 0,85 | 0,85 | Tỉ số 1,35, gần số liệu (1,37–1,41); trung bình hai hệ số gần 1 | Makino 2015, Kim 2020 |
| lymph_node_swelling | occasional | frequent | occasional | Số liệu riêng trẻ gốc Việt 20% (Doan 2022); biểu hiện chính ít gặp nhất; tránh làm giảm mạnh khả năng bệnh ở số đông trẻ không có hạch | Doan 2022, Park 2021 (44%), 3312 |
| bcg_scar_red | occasional | occasional | occasional (hiệu chỉnh theo tỷ lệ nền mới 0,05) | Tỉ số khi trả lời "Có" khoảng 4 lần, bằng số liệu duy nhất có nhóm chứng (Singapore 42,7% so với 9,9%) | Khreis 2026 |
| cough | frequent | không liên kết (Park: hô hấp 9,9%) | frequent | Mục "triệu chứng hô hấp" của Park là trong nghiên cứu hội chứng sốc (nhóm sốc 76,9%), có lẽ là tổn thương hô hấp; Lee 2022 dẫn hai nghiên cứu đo riêng ho (69%, 46%) | Lee 2022, Park 2021 |
| runny_nose | frequent | không liên kết | Không liên kết | Số liệu 31–58%, ngang tỷ lệ nền, không phân biệt | Lee 2022 |
| rash_spreads_from_face | rare | không có | Giữ | Ban Kawasaki bắt đầu ở thân (phân biệt với sởi) | Lee 2022, 1019 |
| mouth_ulcers | rare | không có | Giữ | 3312 không mô tả loét, phỏng nước trong miệng (phân biệt với tay chân miệng) | 3312 |
| Phân bố số ngày sốt, nhiệt độ | xem bản A | xem bản B | Trung bình | Ước lượng | 3312, Doan 2022 |
| warning_signs | có co giật, nôn tất cả | có mệt lả, tiểu ít | Hợp, bỏ co giật | 3312: biểu hiện thần kinh (li bì, co giật) ít gặp; giữ dấu hiệu sốc, mất nước, khó thở | 3312 |
| self_care | có lời dặn không tự dùng aspirin | không có | Giữ | NHS Kawasaki disease: không cho trẻ dưới 16 tuổi uống aspirin khi không có chỉ định | NHS |

Các liên kết trùng mức: red_eyes, red_lips_strawberry_tongue, rash_any, rash_non_blanching, hands_feet_swelling_peeling, hand_foot_blisters, bcg_scar_red, vomiting, diarrhea.

## Giá trị dựa trên nhận định

- Prior (suy từ Nhật Bản, Hàn Quốc; chưa có số liệu Việt Nam).
- Tần suất red_lips (very_frequent) và các mức thấp hơn nền (rash_non_blanching, rash_spreads_from_face, mouth_ulcers, hand_foot_blisters).
- Phân bố số ngày sốt theo thời điểm hỏi.
- Tỷ lệ nền 0,05 của sẹo BCG (người bảo trì) và cách hiệu chỉnh liên kết theo nó.

## Đề xuất

- Người bảo trì: thêm kawasaki_disease vào `conditions` của rf_kawasaki_signs; xem lại việc dùng applicability cho tuổi.
- Câu "quấy khóc nhiều bất thường" và "hạch cổ một bên to" (lượt B ghi).

## Ca dev

- d-kawasaki-disease-1, -2, -3.
