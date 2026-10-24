# Biên bản đối chiếu: pneumonia (Viêm phổi mắc phải ở cộng đồng)

- Lượt C: `agent:pass-c`, ngày 2026-10-24 (truy cập nguồn ngày 2026-10-25).
- Bản chính thức: `knowledge/conditions/pneumonia.yaml`, trạng thái `source_checked`.
- `npm run kb:check`: 0 lỗi, 0 cảnh báo ở tệp này.

## 1. Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi | Viêm phổi mắc phải cộng đồng | Viêm phổi | "Viêm phổi mắc phải ở cộng đồng" | Theo tên bài của Bộ Y tế; tên hiển thị là "Viêm phổi" (vi_common đầu tiên) | byt-qd-4235-2012 |
| names.vi_common | Viêm phổi | Viêm phổi cộng đồng, Viêm phế quản phổi | Viêm phổi, Viêm phế quản phổi | Từ thường dùng, nhất là ở trẻ em | — |
| codes.icd10_verified | false | true | false | Lượt C chưa đối chiếu được | — |
| specialties | respiratory, pediatrics, general_medicine | respiratory, general_medicine | Theo B | Bộ suy luận tự thêm "Nhi khoa" | engine-spec mục 9 |
| fever | very_frequent | frequent; trẻ 2 tháng–12 tuổi very_frequent | Theo B | Người lớn 0,61 (gộp), 59% (GRACE); trẻ em 80–92% | htun-scirep-2019, vanvugt-bmj-2013, shah-jama-2017 |
| fever_duration | 0,25/0,45/0,17/0,13 | 0,30/0,45/0,15/0,10 | 0,27/0,45/0,16/0,12 | Trung bình | vanvugt-bmj-2013, takahashi-bmcinfectdis-2013 |
| fever_max_temp | không có | 0,15/0,40/0,45 | Giữ (B), bậc C | 4235: sốt cao 39–40°C; bài viêm phổi của 4235 có thể đã bị thay thế | byt-qd-4235-2012, htun-scirep-2019 |
| cough: freq_by_age | không | elder_75p frequent | Theo B | Metlay: 17/18 triệu chứng được báo ít hơn khi tuổi cao; thận trọng (câu "không ho" ít loại trừ viêm phổi ở người rất già) | metlay-archintmed-1997 |
| breathing_difficulty | very_frequent | frequent; child_2m_5y very_frequent | Theo B | Số gộp bậc A 0,63 ở người lớn; định nghĩa viêm phổi trẻ em của 3312 cần thở nhanh hoặc rút lõm | htun-scirep-2019, shah-jama-2017, byt-qd-3312-2015 |
| pleuritic_chest_pain: freq_by_age | không | child_2m_5y rare, child_5_12 occasional | Theo B | Trẻ em 8–14%; trẻ nhỏ không tự báo được | shah-jama-2017 |
| abdominal_pain | occasional | không có | Giữ (A) | 34% trẻ trên 4 tuổi viêm phổi thùy (bệnh viện), hạ một mức | moustaki-pedpulmonol-2003, byt-qd-4235-2012 |
| drowsy_hard_to_wake | rare | không có | Bỏ | rare cao hơn tỷ lệ nền 1% (cảnh báo); very_rare là sai vì li bì gặp ở viêm phổi nặng nhiều hơn nền; đã có quy tắc mức 2 | byt-qd-3312-2015 |
| chills_rigors | không có | frequent | Giữ (B), bậc C | 4235: sốt cao kèm rét run | byt-qd-4235-2012 |
| confusion | không có | rare; từ 65 tuổi occasional | very_rare; từ 65 tuổi occasional | Mức rare của B cao hơn tỷ lệ nền 1% (cảnh báo). Giữ occasional ở người cao tuổi (4235: có khi khởi đầu bằng lú lẫn); dưới 65 tuổi để very_rare: lú lẫn ở người trẻ bị sốt cần nghĩ trước tới viêm màng não, nhiễm khuẩn huyết (thận trọng) | byt-qd-4235-2012, metlay-archintmed-1997 |
| symptoms_worsen_after_improving | không có | occasional | Giữ (B) | 1840: viêm phổi là biến chứng của cúm, khó thở tăng dần | byt-qd-1840-2025 mục II.1.2 |
| abd_pain_location | không có | phân bố | Giữ (B), bậc C | Ước lượng; đau bụng trên cùng bên ở viêm phổi thùy dưới | moustaki-pedpulmonol-2003, byt-qd-4235-2012 |
| abd_pain_worse_movement | không có | frequent | Bỏ | Không có nguồn; dấu hiệu này đặc trưng cho bệnh bụng ngoại khoa (viêm ruột thừa), liên kết mạnh ở viêm phổi có thể che bệnh không được bỏ sót | — |
| abd_pain_duration | không có | phân bố | Giữ (B), sửa ghi chú | Takahashi: khởi phát đến nhập viện trung bình 2,7–4,2 ngày (lượt B ghi "khoảng 2 ngày") | takahashi-bmcinfectdis-2013 |
| warning_signs | 7 dấu hiệu | 8 dấu hiệu (thêm severe_weakness) | Theo B | | |
| self_care_vi, see_doctor_vi | | | Gộp | | byt-qd-3312-2015, byt-qd-2760-2023 |

Các trường giống nhau, giữ nguyên: urgency 3, cant_miss false, mọi prior (fever: P3, trẻ dưới 5 tuổi và từ 65 tuổi P2; abdominal_pain: P5, trẻ em P3, vị thành niên và người cao tuổi P4), cough (mặc định), productive_cough, pleuritic_chest_pain (mặc định), runny_nose, diarrhea.

## 2. Nguồn

- Thêm vào sổ nguồn và đã mở lại: htun-scirep-2019, vanvugt-bmj-2013, shah-jama-2017 (tóm tắt), metlay-archintmed-1997 (tóm tắt), moustaki-pedpulmonol-2003 (tóm tắt), takahashi-bmcinfectdis-2013, yoshida-jpediatr-2013 (tóm tắt), byt-qd-4235-2012 (bản PDF trên vnras.com, phông TCVN3; đối chiếu trang quyết định và bài viêm phổi tr. 34–37).
- Gộp ID trùng: `vanvugt-2013-grace-pneumonia` → `vanvugt-bmj-2013`; `moustaki-2003-pneumonia-abdominal-pain` → `moustaki-pedpulmonol-2003`; `htun-2019-pneumonia-primary-care` → `htun-scirep-2019`.
- Nguồn có sẵn, dùng lại: byt-qd-3312-2015 (lượt C mở lại bản PDF trên vnras.com, đối chiếu bài Viêm phổi do vi khuẩn ở trẻ em tr. 262–263); byt-qd-1840-2025; byt-qd-2760-2023.
- Chưa mở được: 4815/QĐ-BYT (20/11/2020) về viêm phổi cộng đồng ở người lớn và 2147/QĐ-BYT (2026, chỉ thấy trên trang thứ cấp, nói là thay thế 4815). Các liên kết chỉ dựa vào 4235 để bậc C. Đã dùng 1 lần WebSearch cho việc này.

## 3. Giá trị dựa trên ước lượng

- Mọi prior; fever_duration; abd_pain_location; abd_pain_duration; confusion (very_rare dưới 65 tuổi, occasional từ 65 tuổi); symptoms_worsen_after_improving occasional; chills_rigors frequent; cough frequent từ 75 tuổi.

## 4. Ca kiểm thử (dev)

| Ca | Kết quả (sạch) | Nhận xét |
|---|---|---|
| d-pneumonia-1 | hạng 1 (0,47), mức 2 (đúng là 3, khuyên quá mức) | Quy tắc rf_fever_critical_phase_signs (sốt ngày 3–7 kèm khó thở, viết cho sốt xuất huyết) bắt cả viêm phổi |
| d-pneumonia-2 | hạng 1 (0,22), mức 2 (đúng là 3, khuyên quá mức) | Người 78 tuổi ít triệu chứng: xác suất "nguyên nhân khác" 0,59, vượt ngưỡng mức 2 đã giảm một nửa cho người từ 75 tuổi |
| d-pneumonia-3 | hạng 1 (0,99), mức 3 đúng | Đau bụng ở trẻ, dễ nhầm viêm ruột thừa (chưa có trong dữ liệu, lô 3) |

Chạy thử trên bản sao có đủ 25 bệnh (lô 2 chưa đăng ký xong nguồn): d-pneumonia-2 lên mức 1 vì nhiễm khuẩn huyết chiếm khoảng 7% ở người 78 tuổi; d-pneumonia-3 vẫn hạng 1 (0,70; viêm thận – bể thận 0,15, sốt xuất huyết 0,14).

Mâu thuẫn ghi nhận: không sửa tham số để giảm mức ở hai ca đầu. Metlay cho thấy người cao tuổi báo ít triệu chứng hơn ở gần như mọi triệu chứng; nếu đọc được toàn văn (có tỷ lệ theo nhóm tuổi) có thể hạ thêm mức cho khó thở, đau ngực, rét run ở người từ 75 tuổi. Đề xuất người bảo trì cân nhắc thu hẹp rf_fever_critical_phase_signs (ví dụ chỉ khi không ho có đờm, hoặc khi có dấu hiệu sốt xuất huyết khác).
