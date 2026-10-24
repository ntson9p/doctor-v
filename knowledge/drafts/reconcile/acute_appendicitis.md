# Biên bản đối chiếu: Viêm ruột thừa cấp (`acute_appendicitis`)

- Người đối chiếu: `agent:pass-c` (lô 3), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/acute_appendicitis.yaml`, `knowledge/drafts/pass-b/acute_appendicitis.yaml`.
- Bản chính thức: `knowledge/conditions/acute_appendicitis.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 18, lượt B 15, chung 15, hợp 18; bản chính thức 15 liên kết.
- Nguồn đã mở lại: Bundy 2007 (toàn văn PMC), AAFP Snyder 2018 (Bảng 1 và danh mục tài liệu tham khảo: số liệu người lớn theo Wagner 1996, trẻ em theo Benabbas 2017), Wagner 1996 và Benabbas 2017 (tóm tắt qua API Europe PMC), Cartwright 2008 (Bảng 2), Humes 2006 (toàn văn PMC), MSD, NHS, Viniol 2014, Blok 2021, Erkan 2004, Wickramasinghe 2021 (tóm tắt), Cervellin 2016 (toàn văn PMC), Reust 2016.
- Sổ nguồn: lượt A và lượt B đặt hai ID cho Bundy 2007 và Snyder 2018; sổ nguồn dùng `bundy-jama-2007`, `snyder-afp-2018`, `wagner-jama-1996`.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi` | Viêm ruột thừa cấp | Viêm ruột thừa cấp tính | Lượt B | Tên ICD-10 tiếng Việt lượt B đã tra | — |
| `codes.icd10_verified` | false | true | true | Lượt B tra icd.kcb.vn ngày 24/10/2026; lượt C không tự tra lại được | — |
| `specialties` | ngoại, cấp cứu, nhi | ngoại, cấp cứu | Ngoại, cấp cứu | Bộ suy luận tự thêm nhi khoa cho trẻ dưới 16 tuổi | — |
| Prior đau bụng: bậc | B/numeric | A/numeric | **B/judgment** | Mức là ước lượng từ số liệu nước ngoài, không phải số đo trực tiếp ở Việt Nam | Viniol, Blok, Erkan, Cervellin |
| Prior đau bụng, 2 tháng – 5 tuổi | P4 | P5 | **P4** | Lệch một mức, cùng là ước lượng; chọn mức thận trọng cho bệnh không được bỏ sót: hiếm (NHS) nhưng phần lớn đã thủng khi được chẩn đoán (Bundy). Chạy thử P5: không ca dev nào đổi kết quả | NHS, Bundy |
| Prior đau bụng, 65–74 tuổi | P4 | P3 (mặc định) | **P4** | Có số liệu: ở cấp cứu, 1,5% người từ 65 tuổi so với 4,5% người trẻ hơn (Cervellin); đỉnh mắc 15–19 tuổi (Wickramasinghe) | Cervellin, Wickramasinghe |
| Prior sốt, 5–17 tuổi | P4 | P5 (mặc định) | **P5** | Lời dặn của lô yêu cầu kiểm tra mức P5 của lượt B theo nguồn. Tỷ lệ mắc khoảng 228/100.000 mỗi năm (Wickramasinghe) trong khi lượt đi khám vì sốt nhiều hơn hàng trăm lần; đau bụng là triệu chứng nổi bật (NHS), sốt nhẹ (Humes) và đến sau đau (Reust), nên chỉ một phần nhỏ người bệnh chọn "Sốt": dưới 0,2%. Số 75% trẻ có sốt (Bundy) là tần suất sốt trong bệnh, không phải tỷ lệ bệnh trong người đi khám vì sốt. Chạy thử P4: không ca dev nào đổi kết quả | Wickramasinghe, Humes, Reust, NHS, Bundy |
| `abd_pain_location` | hố chậu phải 0,68 | 0,62 | Trung bình (0,65) | TVD 0,05 | AAFP, Bundy |
| `abdomen_hard_swollen` | rare (A/numeric, hạ một mức) | occasional | **occasional** | Lệch một mức. Dấu hiệu nguy hiểm của bệnh không được bỏ sót nên giữ liên kết mạnh hơn; mức rare (2,5%) lại cao hơn tỷ lệ nền 1% nên không đạt ý "ít gặp" của lượt A. Co cứng thành bụng có độ nhạy khoảng 23% ở bệnh viện | AAFP (Wagner) |
| `abd_pain_duration`, `fever_max_temp`, `fever_duration` | | | Trung bình | Lệch nhỏ | Humes, MSD, AAFP |
| `dysuria` | rare (A/numeric) | — | **Bỏ** | Bundy: độ nhạy 0 ở trẻ (LR+ 0,59, khoảng tin cậy 0,03–10,1); chưa có số liệu ở người lớn, trong khi NHS ghi đi tiểu nhiều lần và MSD ghi nước tiểu có thể có hồng cầu, bạch cầu (ruột thừa sát bàng quang). Không hạ một bệnh không được bỏ sót bằng liên kết thiếu số liệu ở người lớn | Bundy, NHS, MSD |
| `abd_pain_colicky` | occasional | — | **Bỏ** | Mức occasional bằng đúng tỷ lệ nền 0,2 của câu hỏi, liên kết không mang thông tin | — |
| `abd_pain_meal_relation` | {0,03; 0,12; 0,85} | — | **Bỏ** | Ước lượng không có nguồn; lựa chọn "đau tăng sau ăn" sẽ hạ bệnh không được bỏ sót khoảng 2 lần | — |
| `warning_signs` | 7 dấu hiệu | 5 dấu hiệu | Hợp hai bản (9 dấu hiệu) | Đau chuyển xuống bụng dưới bên phải, đau tăng khi cử động là lý do cần khám ngay (NHS); lú lẫn, tay chân lạnh, ngất là dấu hiệu nhiễm khuẩn huyết, viêm phúc mạc | NHS |
| `self_care_vi` | 2 câu | — | Giữ, viết lại câu về thuốc | Bỏ tên nhóm thuốc (giảm đau, nhuận tràng) vì chưa có nguồn chính thức đã mở; giữ ý không tự dùng thuốc trước khi được khám | — |
| `see_doctor_vi` | 3 câu | 2 câu | Gộp | Câu chữ | NHS |

Giống nhau ở hai lượt: mã K35, `urgency` 2, `cant_miss` true, prior đau bụng P3 (người lớn), dưới 2 tháng P6, từ 75 tuổi P4, prior sốt P5 (dưới 2 tháng P6), `abdominal_pain` almost_always, `abd_pain_migrated_rlq` frequent, `abd_pain_worse_movement` frequent, `abd_pain_severe` occasional, `abd_pain_onset`, `nausea`, `vomiting`, `loss_of_appetite`, `fever` frequent, `diarrhea` occasional.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Mọi mức prior (chưa có số liệu Việt Nam ở tuyến ban đầu); prior khi sốt tính bằng suy luận từ tỷ lệ mắc.
- Độ nhạy ở người lớn suy từ cặp LR+ và LR− trong bảng của AAFP (theo Wagner 1996), chưa đọc được toàn văn JAMA.
- Phân bố vị trí đau, thời gian đau, khởi phát, nhiệt độ, số ngày sốt (hạ tỷ lệ hố chậu phải xuống 0,65 cho người đến sớm).
- `abd_pain_severe`, `abdomen_hard_swollen` (occasional cho bối cảnh cộng đồng).
- Trẻ em nôn (0,79) và sốt (0,75) nhiều hơn người lớn (Bundy) nhưng chưa khai báo `freq_by_age`: mức very_frequent ở trẻ sẽ làm câu trả lời "Không" hạ bệnh mạnh hơn ở khoảng 20% trẻ không nôn.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-acute-appendicitis-1 (điển hình, 19 tuổi) | Hạng 1 (74%), mức 2/2 | |
| d-acute-appendicitis-2 (nữ 77 tuổi, ít triệu chứng) | Hạng 1 (56%), mức 2/2 | "Nguyên nhân khác" 27% |
| d-acute-appendicitis-3 (trẻ 9 tuổi có tiêu chảy, dễ nhầm viêm dạ dày – ruột) | Hạng 2 (7%; viêm dạ dày – ruột 90%), mức 2/2 | Phiên dừng sau 11 câu, chưa hỏi vị trí đau và đau tăng khi cử động (đã có trong ca); khi thử hỏi bắt buộc vị trí đau, ca này lên hạng 1. Xem đề xuất 1 |

## 4. Đề xuất cho người bảo trì

1. Hỏi bắt buộc vị trí đau ở triệu chứng chính đau bụng (chi tiết ở biên bản `acute_gastroenteritis.md`, mục 4).
2. Cân nhắc `freq_by_age` cho nôn và sốt ở trẻ em khi có bác sĩ duyệt.
3. Tổng prior của cột đau bụng chỉ 31–50% (kb:priors), nên mỗi bệnh được nhân lên khoảng 2–2,7 lần khi chuẩn hóa; ở người lớn tuổi, viêm ruột thừa, tắc ruột, viêm tụy bắt đầu sát hoặc trên ngưỡng 1% của bệnh không được bỏ sót. Cần xem khi hài hòa prior (khoảng một phần ba người đau bụng ở chăm sóc ban đầu không rõ nguyên nhân, Viniol; hội chứng ruột kích thích, táo bón chưa có trong hệ thống).
