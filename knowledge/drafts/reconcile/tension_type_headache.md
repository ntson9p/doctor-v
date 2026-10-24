# Biên bản đối chiếu: Đau đầu do căng thẳng (`tension_type_headache`)

- Người đối chiếu: `agent:pass-c` (lô 4), ngày 2026-10-24.
- Bản nháp: `knowledge/drafts/pass-a/tension_type_headache.yaml`, `knowledge/drafts/pass-b/tension_type_headache.yaml`.
- Bản chính thức: `knowledge/conditions/tension_type_headache.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 13, lượt B 14, chung 12; bản chính thức 18 liên kết (thêm 3 liên kết very_rare).
- Nguồn đã mở lại: ICHD-3 (PDF chính thức), NHS; Stovner 2022, Vo 2024 (toàn văn qua API Europe PMC); Rasmussen 1991, 1992, 1993, Smetana 2000, Carlsen 2024, Inan 1994, Lee 2025, Guruswamy 2022 (tóm tắt). Hai lượt đặt hai ID cho ICHD-3; sổ nguồn dùng `ihs-ichd3-2018` (bản PDF), giấy phép L2 (IHS cho sao chép tự do với mục đích khoa học, giáo dục, lâm sàng).

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi_common` | Đau đầu do căng thẳng, Đau đầu căng cơ | Đau đầu căng cơ, Đau đầu kiểu căng thẳng | Hợp; tên hiển thị "Đau đầu do căng thẳng" | Trùng pilot-scope | |
| `summary_vi` câu 3 | thêm "thường tự hết trong vài giờ đến vài ngày" | "căng thẳng, lo âu, thiếu ngủ" | Gộp | Câu chữ | ICHD-3, NHS |
| Prior: cơ sở | numeric | judgment | judgment | Tỷ lệ mắc trong dân số không phải tỷ lệ trong người đau đầu đi khám | Stovner, Vo |
| Prior 2 tháng–5 tuổi | P4 | P3 | **P3** | Lệch một mức; lượt B có số liệu (Stovner: 0–9 tuổi 5,9%) | Stovner 2022 |
| Prior 65–74 tuổi | P2 | P1 | **P1** | Lệch một mức; lượt B có số liệu tỷ lệ mắc từ 65 tuổi (32,2%, chỉ 1 nghiên cứu) | Stovner 2022 |
| Prior từ 75 tuổi | P2 | P1 | **P2** | Lệch một mức; nhóm "từ 65 tuổi" của Stovner chủ yếu là người 65–74; người lớn tuổi đau đầu có khả năng bệnh thực thể cao hơn (Goldstein 2006: trên 50 tuổi, OR 3,3) và doctor-v coi người từ 75 tuổi là nhóm nguy cơ cao, nên chọn mức thận trọng cho bệnh lành tính | Stovner 2022, Goldstein 2006 |
| `headache_location` | một bên 0,08 | 0,18 | 0,13 (trung bình) | TVD 0,15; châu Âu rất ít đau một bên, khảo sát Hàn Quốc 51,4% | Rasmussen 1991, Inan 1994, Lee 2025 |
| `headache_character` | ép chặt 0,78 | 0,75 | 0,76 | Chênh nhỏ | Rasmussen 1991, Inan 1994, Lee 2025 |
| `headache_duration` | dưới 4 giờ 0,45 | 0,50 | 0,47 | Chênh nhỏ | ICHD-3, NHS |
| `nausea`: bậc | B/verbal | A/numeric | A/numeric, rare | Cùng mức; LR 19,2 (Smetana) | Smetana 2000 |
| `photophobia`: cơ sở | judgment | numeric | numeric, occasional | Cùng mức; nhóm có sợ ánh sáng 10,4% (Lee 2025) | Lee 2025, Smetana |
| `stress_poor_sleep`: cơ sở | verbal | numeric | numeric, frequent | Cùng mức; căng thẳng 72,1%, ngủ ít 49,4% (Guruswamy 2022; chỉ dùng số liệu yếu tố khởi phát vì mẫu này có đặc điểm không khớp ICHD-3) | Guruswamy, Rasmussen 1993 |
| `neck_stiffness` | rare | không liên kết | **very_rare** | Mức rare cao hơn tỷ lệ nền 1% (bộ kiểm tra cảnh báo), ngược ý lượt A ("nghiêng về bệnh nguy hiểm"); cứng gáy thật không phải đặc điểm của bệnh | ICHD-3 |
| `visual_aura` | không liên kết | very_rare | **Giữ** | Tiền triệu thuộc về đau nửa đầu | ICHD-3, Smetana |
| `blurred_vision` | không liên kết | rare | **Giữ** | NHS: nhìn mờ, nhìn đôi là lý do khám khẩn; rare thấp hơn nền 5% | NHS |
| `headache_thunderclap` | không liên kết | không liên kết | **Thêm very_rare** | Ghi chú lô 4: tỷ lệ nền 1%; cường độ nhẹ – vừa (ICHD-3); NHS: đau đột ngột cực kỳ dữ dội thì gọi 999 | ICHD-3, NHS |
| `vision_loss_or_double` | không liên kết | không liên kết | **Thêm very_rare** | Thêm sau khi chạy ca d-stroke-3: bệnh không có triệu chứng thần kinh (ICHD-3); NHS: mất thị lực là lý do gọi 999 | ICHD-3, NHS |
| `sudden_loss_of_balance` | không liên kết | không liên kết | **Thêm very_rare** | Thêm sau khi chạy ca d-stroke-2: NHS (Headaches, Tension headaches) xếp khó giữ thăng bằng, khó đi vào nhóm gọi 999 | ICHD-3, NHS |
| `warning_signs` | có `seizure_recent` | có `es_stroke_signs` | Hợp hai bản | | |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | | NHS |

Giống nhau ở hai lượt: tên chính thức, mã G44.2, `urgency` 5, `cant_miss` false, chuyên khoa, prior P1 (5–12 tuổi P2), `headache_severity`, `headache_course`, `headache_worse_activity` (occasional), `vomiting`, `fever` (rare), `phonophobia` (occasional). Không dùng hệ số theo giới (hai lượt thống nhất): trong số người đau đầu, tỷ lệ đau đầu căng thẳng ở nữ khoảng 0,9 lần nam (Stovner 2022; Vo 2024).

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior P1 ngang đau nửa đầu; từ 75 tuổi P2; trẻ 5–12 tuổi P2, dưới 5 tuổi P3.
- `headache_duration`, `headache_course` (phân bố ước lượng từ tiêu chuẩn ICHD-3).
- `phonophobia` occasional, `blurred_vision` rare, `fever` rare.
- Bốn liên kết very_rare (đau đầu sét đánh, cứng gáy, mất thị lực, mất thăng bằng): suy từ tiêu chuẩn ICHD-3 và hướng dẫn NHS, không có tần suất trực tiếp.

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-tension-type-headache-1 (điển hình) | Hạng 1 (89%), mức 5/5 | |
| d-tension-type-headache-2 (bé 10 tuổi) | Hạng 1 (86%), mức 5/5 | |
| d-tension-type-headache-3 (62 tuổi, tăng huyết áp, dễ nhầm đột quỵ) | Hạng 1 (90%), mức 5/5 | |

Bản nhiễu của hai ca đầu cho mức 3: một dấu hiệu nguy hiểm không có câu hỏi thay thế (ví dụ va đập đầu) bị đổi thành "Không rõ"; đây là chủ ý an toàn của bộ suy luận.

## Ghi chú của người bảo trì (2026-10-25)

Tỷ lệ nền của `headache_thunderclap` được hạ từ 1% xuống 0,2% theo đề xuất của lượt C (Linn 1994). Liên kết `very_rare` (0,5%) vì vậy đã cao hơn tỷ lệ nền, nên đã bỏ: bệnh lành tính dùng tỷ lệ nền.
