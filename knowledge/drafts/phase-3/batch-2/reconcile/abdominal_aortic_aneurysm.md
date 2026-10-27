# Biên bản đối chiếu: abdominal_aortic_aneurysm (Phình động mạch chủ bụng dọa vỡ hoặc vỡ)

- Lượt C (`agent:pass-c`), Giai đoạn 3 lô 2 phần a, 27/10/2026.
- Bản chính thức: `knowledge/conditions/abdominal_aortic_aneurysm.yaml`. Trạng thái: `source_checked`.
- Nguồn đã mở lại (API Europe PMC: Fernando 2022, Azhar 2014, Chan 2021, Kärkkäinen 2015, Akkersdijk 1998; toàn văn van den Dries 2025, Hai 2025; trang MSD bằng curl). Hai id `azhar-jendovascther-2014` (A) và `azhar-jet-2014` (B) là cùng một bài: chỉ giữ `azhar-jet-2014`.

## Bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Tên chính | "…vỡ hoặc dọa vỡ" | "…dọa vỡ hoặc vỡ" | B | Trùng tên trong scope.yaml | scope.yaml |
| Prior Đau bụng 45–64 tuổi | P5 | P6 | P6 | Lệch một mức; B có số liệu cộng đồng Việt Nam (0,12%), đỉnh 70–80 tuổi | Hai 2025, MSD |
| Prior Đau bụng từ 75 tuổi | P4 | P5 | P5 | Như trên; P4 cộng vào ngưỡng 0,5% của người từ 75 tuổi làm gần như mọi người cao tuổi đau bụng lên mức 2 | Hai 2025, Chan 2021 |
| Prior Chóng mặt từ 65 tuổi | P5 | P6 | P6 | Ước tính của lượt C dưới 0,02% (10% ca vỡ phình biểu hiện bằng chóng mặt) | van den Dries 2025 |
| Hệ số giới | 1,5 / 0,5 | 1,6 / 0,55 | B | Cùng tỷ số 3; B tính theo tỷ lệ nam 40% ở người cao tuổi Việt Nam | MSD, Hai 2025 |
| abd_pain_onset | 0,70 | 0,75 | 0,725 | Trung bình | NHS, van den Dries |
| abd_pain_duration, abd_pain_location, syncope_trigger, pulse_measured | phân bố A | phân bố B | Trung bình | Lệch dưới 0,1 | MSD, van den Dries |
| abd_pain_meal_relation | {0,03; 0,07; 0,90} | không | Bỏ | Không nguồn nào nói về bữa ăn; liên kết hạ bệnh nguy hiểm khi "đau tăng sau ăn" | — |
| cold_sweat | frequent | không | Giữ frequent | Mở lại toàn văn: vã mồ hôi 11/12 người được hỏi, OR 10,1 | van den Dries 2025 |
| pallor | occasional (Ngất, Chóng mặt frequent) | không | Bỏ | Câu tay chân lạnh đã gồm "da tái" (hai câu khác cụm, đếm trùng); tái, xám 3/11, không khác nhóm chứng | van den Dries 2025 |
| severe_weakness | occasional | không | Giữ | Sốc 46%, tụt huyết áp 31% | Azhar, Fernando |
| dizziness | occasional (Ngất frequent) | không | Giữ | Choáng, suýt ngất 3/8 | van den Dries |
| nausea | frequent | không | Giữ | Buồn nôn hoặc nôn 11/16 | van den Dries |
| cold_hands_feet theo Chóng mặt | không ghi đè (occasional) | frequent | frequent | Ngang nguồn; dấu hiệu cảnh báo của bệnh nguy hiểm: giữ mức mạnh hơn | Azhar, Fernando |
| dizziness_on_standing với Đau bụng | occasional | frequent | frequent | Ngang nguồn (ước lượng); bệnh nguy hiểm | MSD |
| syncope_warning, dizziness_pattern, vertigo_spinning, fever | không | có | Giữ | Hướng sinh lý rõ (mất máu: choáng, không quay; vỡ phình không sốt); gần trung tính hoặc giảm nhẹ | MSD, Fernando |
| warning_signs | có cold_sweat | có confusion | Danh sách B | Bỏ vã mồ hôi (đau quặn thận cũng vã mồ hôi, như lượt R đã bỏ khỏi quy tắc) | review-rules.md |

## Dấu hiệu đề xuất (không đưa vào lô này)

- `back_pain_sudden_severe` ("Đau lưng, hông lưng đột ngột, dữ dội", lượt B; lượt R cũng nêu): không đưa vào danh mục ở lô này vì bộ ca giữ kín được viết khi chưa có câu này (câu không có trong ca sẽ bị coi là "không"). Đề xuất người bảo trì thêm ở lô sau và dùng trong rf_aaa_rupture_signs.

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Mọi prior (chưa có số liệu theo triệu chứng chính); hệ số giới.
- abd_pain_radiates_groin occasional, known_aaa occasional (mỗi câu "Có" tăng khả năng khoảng 20 lần).
- not_recovered_after_faint frequent; dizziness_on_standing frequent; các ghi đè theo triệu chứng chính (Ngất, Chóng mặt).
- Mọi phân bố (vị trí đau, thời gian đau, hoàn cảnh ngất, mạch, kiểu chóng mặt).

## Kiểm thử

- Ca dev mới: d-abdominal-aortic-aneurysm-1 (mức 1, đúng; dừng cấp cứu ngay ở rf_aaa_rupture_signs nên bệnh chưa vào danh sách "bác sĩ cần loại trừ": quy tắc chưa ghi bệnh mục tiêu), -2 (mức 1, hạng 2), -3 (mức 1, hạng 1).
- d-from-h-syncope-017: đổi bệnh đúng từ "other" sang bệnh này; mức 1, hạng 1.
- Bản đầu của ca -2 dùng kiểu chóng mặt "liên tục": quy tắc rf_acute_vertigo_vascular_risk (mức 2) dừng phiên trước khi hỏi tay chân lạnh và đau hông lưng, nên chỉ ra mức 2 (bỏ sót). Đã viết lại thành choáng từng cơn khi đứng dậy (kiểu chóng mặt của mất máu), và đề xuất người bảo trì xem lại thứ tự câu hỏi (xem báo cáo tổng).
