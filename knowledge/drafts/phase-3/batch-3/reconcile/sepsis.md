# Biên bản đối chiếu lượt C: sepsis (mở rộng, Giai đoạn 3 lô 3)

- Phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-31.
- Bản nháp: `pass-a/extend/sepsis.yaml`, `pass-b/extend/sepsis.yaml`. Giữ nguyên mọi giá trị đã đối chiếu ở các lô trước.
- Nguồn mở lại: Ray 2006 (tóm tắt, toàn văn PMC1550946). NICE NG253, NG254, NHS Sepsis, Wattanapaiboon 2020, Loots 2022, 5642/QĐ-BYT đã có trong sổ, đã xác minh; Frese 2011 đã được lượt C phần a đọc lại.
- Nguồn đưa vào sổ: `ray-critcare-2006`.
- Trạng thái: giữ `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| prior shortness_of_breath | | | Trùng (P5; dưới 2 tháng và từ 65 tuổi P4; 5–17 tuổi P6) | Ghép nguồn của hai lượt | NG253; NG254; NHS; Wattanapaiboon; Frese; Ray |
| dyspnea_onset | 0,10 / 0,80 / 0,10 | 0,10 / 0,82 / 0,08 | Trung bình 0,10 / 0,81 / 0,09 | Ngang nguồn | Loots; NG253 |
| dyspnea_severity | 0,30 / 0,50 / 0,20 | 0,25 / 0,60 / 0,15 | Trung bình 0,275 / 0,55 / 0,175 | Ngang nguồn | NG253; Wattanapaiboon |
| spo2_measured | Không (dấu hiệu chưa có) | 0,12 / 0,15 / 0,13 / 0,60 | Giữ (B) | NG253, NG254: SpO2 thấp là tiêu chí nguy cơ cao | NG253; NG254 |
| grunting | Không (dấu hiệu chưa có) | occasional | Giữ (B) | NG254: thở rên là tiêu chí nguy cơ cao ở trẻ dưới 5 tuổi; NHS Sepsis | NG254; NHS |

Hai lượt cùng không liên kết khò khè, khó thở khi nằm, phù hai chân.

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Prior Khó thở. Bệnh không được bỏ sót: ở người từ 75 tuổi (ngưỡng mức 2 là 0,5%), P4 sau chuẩn hóa đã gần hoặc vượt ngưỡng trước khi hỏi; các câu sốt, khởi phát, mức khó thở kéo xác suất xuống khi không phù hợp.
- Các phân bố mới; tần suất thở rên.

## Ca dev

- Mới: d-sepsis-shortness-of-breath-1 (70 tuổi đái tháo đường, sốt rét run, ho đờm, thở nhanh lúc nghỉ, lú lẫn): mức 1 (rf_sepsis_multiple_signs), nhiễm khuẩn huyết đứng đầu danh sách cần loại trừ; chấp nhận viêm phổi.
- Ca cũ được thêm câu trả lời của lô 3 (câu chuyện ghi thở nhanh xuất hiện trong ngày): `dyspnea_onset: hours_days` ở d-sepsis-1, d-sepsis-3. Kết quả không đổi.
