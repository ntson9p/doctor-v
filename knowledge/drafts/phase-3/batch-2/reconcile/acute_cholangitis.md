# Biên bản đối chiếu: acute_cholangitis (Viêm đường mật cấp)

- Lượt C (`agent:pass-c`), Giai đoạn 3 lô 2 phần a, 27/10/2026. Trạng thái: `source_checked`.
- Nguồn đã mở lại: toàn văn Hue 2025 (PMC12035265), Dang 2026 (PMC13118026), Wada 2007 (PMC2784515), Kimura 2007 (PMC2784509), Kiriyama 2012 (PMC3429782). `hue-theradvgastro-2025` (A) và `hue-tag-2025` (B) là cùng một bài: chỉ giữ `hue-tag-2025`. Không dẫn các số "đã cắt túi mật 15–19%, đã nội soi mật tụy 16–22%" vì không tìm thấy trong toàn văn.

## Bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| Prior Đau bụng | mặc định P4, 18–44 P5, trẻ P6 | mặc định P5, từ 45 tuổi P4, trẻ P6 | Cùng giá trị theo tuổi | Hai cách khai báo cho cùng mức | — |
| Prior Sốt 18–44 tuổi | P6 | P5 | P6 | Người bệnh chủ yếu từ 40 tuổi (49,4% từ 60 tuổi); người trẻ sốt chủ yếu do vi rút, sốt xuất huyết; mỗi bệnh "không được bỏ sót" cộng vào ngưỡng 1% | Dang 2026 |
| confusion theo tuổi | rare; từ 75 tuổi occasional | rare | rare | Số liệu thể nặng ở người cao tuổi (Hue) chưa tìm thấy khi mở lại | Wada 2007 |
| fever_max_temp, fever_duration, abd_pain_location, abd_pain_duration | phân bố A | phân bố B | Trung bình | Lệch dưới 0,1 | Kiriyama, Wada |
| abd_pain_onset, abd_pain_severe | không | có | Giữ | Gần nền; như viêm túi mật cấp | MSD |
| warning_signs | có persistent_vomiting | có decreased_urine | Gộp | — | — |

Mức xử trí 2, không được bỏ sót, sốt, rét run, vàng da, đau bụng, đau lan vai phải, đã biết sỏi mật, tay chân lạnh: hai lượt giống nhau.

## Giá trị dựa trên nhận định

- Prior (chưa có số liệu tuyến ban đầu); rét run frequent; đã biết sỏi mật frequent; lú lẫn, tay chân lạnh rare (above_leak_ok).
- Các phân bố.

## Kiểm thử

- d-acute-cholangitis-1 (mức 2, hạng 2 sau viêm túi mật cấp), -2 (người rất cao tuổi, triệu chứng chính Sốt: mức 2, hạng 1), -3 (dễ nhầm viêm túi mật: mức 2, hạng 1).
- Đề xuất: thêm bệnh này vào `conditions` của rf_cholangitis_triad.
