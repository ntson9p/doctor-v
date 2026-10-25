# Biên bản đối chiếu: Thiếu máu (`anemia`)

- Người đối chiếu: `agent:pass-c` (Giai đoạn 3, lô 1, phần a), ngày 2026-10-25.
- Bản nháp: `.../pass-a/anemia.yaml`, `.../pass-b/anemia.yaml`.
- Bản chính thức: `knowledge/conditions/anemia.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 15, lượt B 15, chung 13; bản chính thức 17 liên kết.
- Nguồn đã mở lại: 1832/QĐ-BYT (caselaw.vn); NHS Iron deficiency anaemia, NHS Dizziness, MSD Evaluation of anemia (curl); GHO (API chính thức); GBD 2023, Chalco 2005, Kalantri 2010 (Europe PMC); Maarsingh 2010, Newman-Toker 2008 (PMC); Weber 1996, Bösner 2018 (Europe PMC). ESC 2018 dùng theo sổ nguồn (lượt R đã mở cùng ngày).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi_common` | Thiếu máu thiếu sắt | Thiếu máu, Thiếu máu thiếu sắt | **Thiếu máu thiếu sắt** | "Thiếu máu" trùng tên chính thức | |
| `codes.icd10_verified` | true | false | **false** | Không đối chiếu được | |
| `summary_vi` | có ghi khác với "thiếu máu não" | không | Gộp, giữ câu phân biệt với "thiếu máu não" | Người Việt hay gọi chóng mặt là thiếu máu não | |
| `prior_modifiers` nữ | 1,4 | 1,2 | **1,2** (nam 0,7 như hai lượt) | Hệ số tính so với các nguyên nhân khác của cùng triệu chứng chính; người khám vì chóng mặt đã 58–80% là nữ, nên P(nữ \| thiếu máu)/P(nữ \| chóng mặt) chỉ khoảng 0,75/0,65 | GBD 2023, Bösner 2018 |
| `palpitations` | occasional | frequent | **occasional** | Nguồn chỉ liệt kê bằng lời; tránh đếm trùng với mệt, hụt hơi, da xanh; mức thấp hơn không kéo khả năng khỏi các nguyên nhân tim | 1832, NHS |
| `dizziness_on_standing` | không liên kết | frequent | **Bỏ** | 1832, NHS chỉ ghi hoa mắt, chóng mặt chung, không mô tả riêng choáng khi đứng dậy | 1832, NHS Dizziness |
| `black_stool` | rare (above_leak_ok) | occasional | **rare (above_leak_ok)** | Phân đen như hắc ín gợi ý chảy máu cấp (xuất huyết tiêu hóa trên, bệnh nguy hiểm, có quy tắc mức 1–2); bệnh lành tính không nên tăng mạnh theo dấu hiệu này; viên sắt cũng làm phân sẫm | 1832, NHS, MSD |
| `anemia_known` | occasional | frequent | **occasional** | Không có số liệu; mức thấp hơn cho bệnh lành tính | 1832, GHO |
| `weight_loss_unintended` | không liên kết | occasional | **Giữ** | MSD: sụt cân gợi ý ung thư là nguyên nhân | MSD, 1832 |
| `vertigo_spinning`, `palpitation_rhythm` | có | không liên kết | **Giữ** | Chóng mặt do thiếu máu thường là choáng váng; tim nhanh, mạnh để bù | MSD, NHS |
| Nguồn GHO | who-gho-anaemia-vn | who-gho-anaemia | **who-gho-anaemia-vn** | Cùng chỉ số; đã truy vấn lại API | GHO |
| `fatigue`, `breathless_on_exertion`: nguồn, bậc | MSD, NHS (C) | 1832 (B) | B, gộp nguồn | Cùng mức | 1832, MSD, NHS |
| `dizziness_pattern`, `syncope_trigger`, `syncope_warning`, `pulse_measured` | | | Trung bình hai lượt | | |
| `warning_signs` | có es_severe_bleeding | có fainting_or_near_fainting | Hợp hai bản | | |
| `self_care_vi`, `see_doctor_vi` | | | Gộp; giữ lời khuyên ăn uống, viên sắt xa tầm tay trẻ em theo NHS | | NHS |

Giống nhau ở hai lượt: tên chính thức, mã D64.9, `urgency` 4, `cant_miss` false, prior (Chóng mặt P3, Hồi hộp P3, Ngất P4), hệ số nam 0,7, các liên kết chung khác.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P3, P4 và hệ số giới 1,2/0,7 cho mọi lứa tuổi.
- `pallor`, `breathless_on_exertion`, `heavy_periods`, `dizziness` (frequent); `anemia_known`, `palpitations`, `weight_loss_unintended`, `fainting_or_near_fainting` (occasional); `black_stool` (rare); các phân bố.
- Thalassemia hay gặp ở Việt Nam chưa có câu hỏi.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-anemia-1 (32 tuổi, kinh nhiều, da xanh, chóng mặt âm ỉ) | Hạng 1 (97%), mức 4/4 | Ca có choáng khi đứng dậy; không có liên kết này vẫn xếp đúng |
| d-anemia-2 (74 tuổi, bệnh thận mạn, đã biết thiếu máu) | Hạng 1 (83%), mức 4/4 | |
| d-anemia-3 (38 tuổi, hồi hộp, mạch 108, dễ nhầm rối loạn nhịp, cường giáp) | Hạng 1 (95%), mức 4/4 | Đối thủ của phần b xếp sau |

## 4. Đề xuất cho người bảo trì

- Cân nhắc câu hỏi về bệnh tan máu bẩm sinh trong gia đình (thalassemia), hay gặp ở Việt Nam.
