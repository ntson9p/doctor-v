# Biên bản đối chiếu: Tắc ruột (`bowel_obstruction`)

- Người đối chiếu: `agent:pass-c` (lô 3), ngày 2026-10-25.
- Bản nháp: `knowledge/drafts/pass-a/bowel_obstruction.yaml`, `knowledge/drafts/pass-b/bowel_obstruction.yaml`.
- Bản chính thức: `knowledge/conditions/bowel_obstruction.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 17, lượt B 15, chung 14, hợp 18; bản chính thức 16 liên kết.
- Nguồn đã mở lại: WSES 2018 (toàn văn PMC, mục Diagnosis và Background), Böhner 1998, Taylor 2013, Rami Reddy 2017, Eskelinen 1994 (tóm tắt qua API Europe PMC), Cartwright 2008 (Bảng 2), Jackson 2011 (AAFP), MSD Intestinal obstruction, Cervellin 2016, Bines 2006, Reust 2016, NHS Stomach ache (lượt R đã kiểm tra; lượt C dùng lại).
- Sổ nguồn: lượt A gọi hướng dẫn WSES là `tenbroek-wjes-2018`, trùng với `wses-asbo-2018` đã có trong sổ (cùng DOI); dùng ID có sẵn. Các nguồn còn lại thêm mới với ID `bohner-ejs-1998`, `taylor-aem-2013`, `ramireddy-cgr-2017`, `eskelinen-sjg-1994`, `jackson-afp-2011`, `msd-intestinal-obstruction`.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi_common` | Bán tắc ruột, Xoắn ruột, Tắc ruột do dính | không có | "Bán tắc ruột", "Tắc ruột do dính" | Xoắn ruột là một nguyên nhân riêng, không phải tên khác của tắc ruột | — |
| `names.en` | Intestinal obstruction | Bowel obstruction | Lượt B | Câu chữ | — |
| `codes.icd10` | K56 (nhóm), chưa đối chiếu | K56.7 (tắc ruột, không xác định), đã đối chiếu | **K56.7** | Bệnh là tắc ruột chưa rõ nguyên nhân; nhóm K56 gồm cả lồng ruột (K56.1), đã là bệnh riêng | — |
| Prior: bậc | B/numeric | A/numeric | **B/judgment** | Mức giống nhau; số liệu ở cấp cứu và bệnh viện được hạ cho cộng đồng | Taylor, Böhner, Cervellin |
| `abd_pain_colicky` | frequent (B/numeric, Böhner LR+ 2,8) | very_frequent (B/verbal: "kinh điển") | **frequent** | Lệch một mức. Cặp LR của Böhner cho độ nhạy chỉ khoảng 0,3; mức very_frequent làm câu "Không" hạ bệnh không được bỏ sót này khoảng 4 lần | Böhner, Cartwright, Eskelinen |
| `abd_pain_severe` | frequent | occasional | **occasional** | Lệch một mức. WSES: người già đau ít rõ; "không chịu nổi" là ngưỡng cao; câu "Có" đã được quy tắc xếp mức 2, nên mức thấp hơn làm câu "Không" ít hạ bệnh này | WSES, MSD |
| `abd_pain_location`, `abd_pain_onset`, `abd_pain_duration` | | | Trung bình | Lệch nhỏ | MSD, WSES |
| `abd_pain_meal_relation` | {0,03; 0,35; 0,62} | — | **Bỏ** | Ước lượng không có nguồn; lựa chọn "đau lúc đói, ăn vào đỡ" sẽ hạ bệnh không được bỏ sót khoảng 5 lần | — |
| `fever` | occasional (sốt gợi ý thắt nghẹt) | — | **Bỏ** | MSD (đã mở lại) không nêu sốt là dấu hiệu thắt nghẹt; tắc ruột đơn thuần thường không sốt | MSD |
| `loss_of_appetite` | frequent | — | Giữ | Người bệnh thường bỏ ăn vì đau, nôn | MSD |
| `hernia_lump_painful` | — (dấu hiệu chưa có) | occasional | Giữ | Thoát vị gây khoảng 10% tắc ruột; WSES nhắc khám tìm thoát vị | Rami Reddy, Jackson, WSES |
| `vomiting_bilious` | frequent (dấu hiệu đề xuất) | frequent | Giữ | Hai lượt giống nhau; nguồn: Bines (nôn dịch mật là bằng chứng tắc ruột), Reust, NHS | Bines, Reust, NHS |
| `warning_signs` | 7 dấu hiệu, có sốt | 6 dấu hiệu, có nôn dịch xanh | Hợp, **bỏ sốt, thêm** `hernia_lump_painful` | Sốt đơn thuần không phải dấu hiệu "đi cấp cứu ngay"; khối thoát vị đau là dấu hiệu của quy tắc `rf_painful_hernia` | WSES |
| `self_care_vi` | 2 câu | — | Giữ, viết lại câu về thuốc | Bỏ tên nhóm thuốc (nhuận tràng) vì chưa có nguồn đã mở | — |
| `proposed_findings` | `vomiting_bilious` | `hernia_lump_painful` | Bỏ khỏi tệp | Cả hai đã có trong danh mục | — |

Giống nhau ở hai lượt: tên, `urgency` 2, `cant_miss` true, mọi mức prior, `no_stool_or_gas`, `abdomen_hard_swollen`, `previous_abdominal_surgery`, `persistent_vomiting` frequent, `vomiting`, `nausea` very_frequent, `abd_pain_worse_movement`, `diarrhea` occasional.

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P4 (người lớn dưới 65 tuổi), P3 (từ 65 tuổi), P5 (trẻ em).
- Độ nhạy suy từ cặp LR của Böhner qua bảng Cartwright và RR của Eskelinen (chưa đọc được toàn văn); bệnh gộp tắc ruột non, tắc đại tràng, thoát vị nghẹt, xoắn ruột.
- Các phân bố; `persistent_vomiting`, `vomiting_bilious` (ước khoảng một nửa số người nôn), `abd_pain_severe`, `abd_pain_worse_movement`, `loss_of_appetite`.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-bowel-obstruction-1 (điển hình, từng mổ) | Hạng 1 trong danh sách cần loại trừ, mức 2/2 | Dừng sau nhóm dấu hiệu nguy hiểm (bụng chướng, không xì hơi) |
| d-bowel-obstruction-2 (ông 82 tuổi, đau ít) | Hạng 1 trong danh sách cần loại trừ, mức 2/2 | Như trên |
| d-bowel-obstruction-3 (bán tắc có tiêu chảy, dễ nhầm viêm dạ dày – ruột) | **Hạng 6** (viêm dạ dày – ruột 83%), mức 2/2 | Phiên dừng sau 7 câu khi viêm dạ dày – ruột đạt trên 70%, chưa hỏi tiền sử mổ bụng, nôn dịch mật, đau quặn (đều có trong ca). Mức xử trí vẫn đúng nhờ ngưỡng bệnh không được bỏ sót. Không sửa tham số; cùng vấn đề điều kiện dừng ghi ở biên bản `acute_gastroenteritis.md` và `acute_pancreatitis.md` |
