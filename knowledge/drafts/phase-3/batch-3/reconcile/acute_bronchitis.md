# Biên bản đối chiếu: acute_bronchitis (Viêm phế quản cấp)

- Lượt C: `agent:pass-c`, Giai đoạn 3 lô 3 phần a, 31/10/2026.
- Bản chính thức: `knowledge/conditions/acute_bronchitis.yaml`, trạng thái `source_checked`.
- Mức xử trí 5, không thuộc nhóm không được bỏ sót, không `rule_out`: hai lượt thống nhất (Kinkade 2016, NHS Bronchitis).
- 9 liên kết chung, cả 9 trùng mức. Lượt A có thêm 1 liên kết, lượt B thêm 9 (kể cả hai dấu hiệu mới thêm vào danh mục).
- Nguồn mở lại: Kinkade 2016 (trang AAFP), NHS Bronchitis, Frese 2011 (toàn văn, bảng 5), Ebell 2013 (tóm tắt), GRACE (van Vugt 2013, bảng 1 toàn văn).

## Bảng khác biệt

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| names.vi_common | Viêm phế quản | thêm "Viêm khí phế quản cấp" | Theo lượt B | Tên hay dùng ở Việt Nam | – |
| summary_vi | 3 câu | 3 câu | Gộp | Giữ ý sốt nhẹ, ho 2–3 tuần | Kinkade 2016 |
| Prior Ho, trẻ 5–17 tuổi | P2 (mặc định) | P1 (mặc định) | P2 | Lệch một mức, cùng là ước lượng; mọi nguồn đã mở nói về người lớn; trẻ ho cấp phần lớn được xếp là cảm lạnh. Chọn mức thấp hơn cho bệnh lành để cột Ho không vượt quá 85% | – |
| Prior Ho, người lớn, trẻ dưới 5 tuổi, dưới 2 tháng, từ 75 tuổi | P1, P2, P3, P2 | P1, P2, P3, P2 | Giữ | Trùng | GRACE, Kinkade |
| Prior Khó thở | không có | P2 (dưới 5 tuổi P3, dưới 2 tháng P4) | Giữ lượt B | Frese 2011 bảng 5 (đã mở lại): viêm phế quản cấp là chẩn đoán hay gặp nhất của khó thở mới ở tuyến ban đầu (24,5% Hà Lan, 24,7% Đức), nên nguồn ủng hộ (còn là P1). Hạ xuống P2 như lượt B. Không che bệnh nguy hiểm: bệnh không liên kết với khởi phát đột ngột, khó thở lúc nghỉ, tức ngực, SpO2 thấp; câu "không ho" (cough almost_always) và "đột ngột" làm khả năng giảm hàng chục lần | Frese 2011 |
| cough | không có | almost_always | Giữ | Ho định nghĩa bệnh (Kinkade); chỉ có tác dụng ở Khó thở | Kinkade, 4235 |
| cough_duration | {.35, .35, .28, .02} | {.32, .38, .28, .02} | Trung bình | Lệch dưới 0,03 | Ebell 2013 (17,8 ngày), Kinkade |
| fever_duration | {.55, .35, .07, .03} | {.60, .33, .05, .02} | Trung bình | Lệch nhỏ | Kinkade |
| fever_max_temp, fever, breathing_difficulty, dyspnea_severity, productive_cough, runny_nose, wheeze, pleuritic_chest_pain, sick_contact_respiratory, night_sweats, weight_loss_unintended | – | – | Giữ | Trùng mức; bậc của khò khè lấy B (Kinkade "có thể có ran rít"; 4235) | GRACE, Kinkade |
| sore_throat | không có | frequent | Giữ | NHS (đã mở lại) liệt kê đau họng; 4235 | NHS Bronchitis |
| hoarse_voice | không có | occasional | Giữ | 4235: có khi khàn tiếng; ngang cảm lạnh nên không làm lệch hai bệnh | 4235 |
| dyspnea_onset | không có | {.05, .85, .10} | Giữ | Bệnh cấp, khó thở tăng trong vài ngày; cần cho prior Khó thở | 4235 |
| spo2_measured | không có | {.36, .035, .005, .6} | Giữ | Viêm phế quản không gây giảm ô xy; giảm ô xy gợi ý viêm phổi (Kinkade) | Kinkade |
| hemoptysis | rare, above_leak_ok | không có | Giữ lượt A | NHS Coughing up blood xếp viêm phế quản vào nguyên nhân hay gặp; Kinkade bảng 1 (đờm có máu thì chụp phim) | NHS, Kinkade |
| asthma_known, copd_known | không có | rare | Giữ | Định nghĩa của Kinkade loại người có bệnh phổi mạn tính; ở họ là đợt cấp hen, đợt cấp bệnh phổi tắc nghẽn | Kinkade, 4235, 1851, 2767 |
| warning_signs | 4 mục | thêm cold_hands_feet | Hợp hai bản | Dấu hiệu sốc | – |
| self_care_vi, see_doctor_vi | – | – | Gộp | Theo NHS: khám khẩn khi khó thở, đau ngực khi thở, ho ra máu, từ 65 tuổi, có thai, bệnh mạn tính | NHS Bronchitis |

## Giá trị dựa trên nhận định

- Prior Ho (P1 ở người 18–74 tuổi, P2 ở trẻ em và từ 75 tuổi) và prior Khó thở (P2): chưa có số liệu Việt Nam theo lý do đi khám.
- Phân bố thời gian ho (suy từ thời gian ho trung bình 17,8 ngày), số ngày sốt, nhiệt độ, khởi phát khó thở, SpO2.
- sore_throat frequent, hoarse_voice occasional, sick_contact_respiratory frequent, hemoptysis rare (above_leak_ok), asthma_known và copd_known rare, night_sweats và weight_loss_unintended rare.

## Ca dev

- d-acute-bronchitis-1 (điển hình, Ho): mức 5, hạng 1 (75%; cảm lạnh 18%).
- d-acute-bronchitis-2 (thiếu niên, ho 16 ngày, khò khè nhẹ): mức đúng 4, app mức 3 (khuyên quá mức: viêm phổi 11,5% và hen 8,6% cộng lại vượt ngưỡng mức 3), hạng 1.
- d-acute-bronchitis-3 (Khó thở, dễ nhầm hen): mức 3, hạng 1 (85%).
