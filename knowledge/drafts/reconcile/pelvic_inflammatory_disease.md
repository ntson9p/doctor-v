# Biên bản đối chiếu: Viêm vùng chậu (`pelvic_inflammatory_disease`)

- Người đối chiếu: `agent:pass-c` (lô 4), ngày 2026-10-24.
- Bản nháp: `knowledge/drafts/pass-a/pelvic_inflammatory_disease.yaml`, `knowledge/drafts/pass-b/pelvic_inflammatory_disease.yaml`.
- Bản chính thức: `knowledge/conditions/pelvic_inflammatory_disease.yaml`, trạng thái `source_checked`.
- Liên kết: lượt A 11, lượt B 12, chung 10; bản chính thức 13 liên kết.
- Nguồn đã mở lại: 315/QĐ-BYT (PDF, bài Viêm phần phụ), CDC 2021, MSD, NHS. Hai lượt đặt hai ID khác nhau cho cùng trang CDC; sổ nguồn dùng `cdc-sti-pid`.

## 1. Bảng bất đồng

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| `names.vi_common` | Viêm vùng chậu (viêm phần phụ), Viêm phần phụ, Viêm tiểu khung | Viêm vùng chậu, Viêm phần phụ, Viêm vòi trứng | Gộp; tên hiển thị "Viêm vùng chậu (viêm phần phụ)" | Trùng tên trong phạm vi đợt thử nghiệm | pilot-scope |
| `applicability` | chỉ giới nữ (trẻ em dùng prior P6) | nữ từ 13 tuổi | **Theo lượt A** | kb-guide 4.6: chỉ loại trừ cứng khi bất khả về sinh học; MSD: "hiếm" trước kỳ kinh đầu, không phải bất khả | MSD, kb-guide |
| Prior đau bụng `by_age` | thêm P6 cho 0–12 tuổi | không có (loại trừ) | P6 cho 0–12 tuổi | Hệ quả của dòng trên | |
| Prior sốt `by_age` | thêm P6 cho 0–12 tuổi | không có | P6 cho 0–12 tuổi | Như trên | |
| `abdominal_pain` | almost_always | không liên kết | **Giữ** | Cần khi triệu chứng chính là sốt: không đau bụng thì khả năng bệnh giảm mạnh; 315 (đau bụng dưới nổi bật), CDC (tiêu chuẩn tối thiểu) | 315, CDC |
| `abd_pain_location` | hạ vị 0,53; hố chậu phải 0,15, trái 0,12 | 0,40; 0,17; 0,15 | Trung bình, hai bên hố chậu bằng nhau (hạ vị 0,46; mỗi bên 0,15; khắp bụng 0,12) | TVD 0,13; nguồn không nêu bên nào trội | 315 (90% đau hai bên), MSD |
| `abd_pain_duration` | d1_3 0,35, d4_14 0,33 | 0,33; 0,35 | 0,34; 0,34 | Chênh nhỏ | 315, CDC |
| `vaginal_bleeding`: cơ sở | judgment | numeric | numeric (occasional) | Cùng mức; ghi số 50% rối loạn kinh nguyệt và lý do hạ | 315, NHS, CDC |
| `pain_with_intercourse`: bậc | B | C | C | Nguồn chỉ là MSD, NHS, CDC mô tả bằng lời | MSD, NHS, CDC |
| `pregnant`: cơ sở | judgment | verbal | verbal (rare) | MSD: hiếm khi có thai | MSD, CDC |
| `abd_pain_severe` | không liên kết | occasional | **Giữ** | Thể nặng, áp xe vòi – buồng trứng khoảng 15% (MSD); NHS: đau dữ dội thì đi cấp cứu | MSD, NHS |
| `abd_pain_migrated_rlq` | không liên kết | rare | **Giữ** | Giúp phân biệt với viêm ruột thừa (315 mục 3); rare thấp hơn tỷ lệ nền 10% | 315 |
| `warning_signs` | có `severe_weakness` | không có | Hợp hai bản (có `severe_weakness`) | Dấu hiệu sốc khi nhiễm khuẩn nặng | |
| `self_care_vi`, `see_doctor_vi` | | | Gộp | | CDC, NHS |

Giống nhau ở hai lượt: tên chính thức (ICD-10 N73.9), `urgency` 3, `cant_miss` false, chuyên khoa, mức prior đau bụng (P3; 13–17 và 45–64 tuổi P4; từ 65 tuổi P6) và sốt (P4; P5; P6), `fever`, `abnormal_vaginal_discharge`, `abd_pain_worse_movement` (frequent), `dysuria`, `new_sexual_partner` (occasional).

## 2. Giá trị dựa trên ước lượng (cần bác sĩ duyệt)

- Prior đau bụng P3 và prior sốt P4 (ước tính thô của lượt C cho prior sốt nằm ở ranh giới P4/P5; giữ P4 vì hai lượt thống nhất).
- Phân bố `abd_pain_location` (chia theo lựa chọn) và `abd_pain_duration`.
- `abd_pain_severe` occasional, `new_sexual_partner` occasional, `abd_pain_migrated_rlq` rare.
- Không liên kết buồn nôn, nôn dù 315/QĐ-BYT và MSD ghi "có thể" (tỷ lệ nền ở người đau bụng đã 35%, 20%).

## 3. Ca phát triển

| Ca | Kết quả (sạch) | Ghi chú |
|---|---|---|
| d-pelvic-inflammatory-disease-1 (điển hình) | Hạng 1 (64%), mức 3/3 | Phiên dừng ngay sau nhóm tiếp nhận vì mức xử trí ổn định và 3 bệnh đầu đã đủ 80%; đau bụng kinh còn 21% vì chưa hỏi "đau trùng kỳ kinh" |
| d-pelvic-inflammatory-disease-2 (bán cấp, sau đặt vòng) | Hạng 1 (98%), mức 3/3 | |
| d-pelvic-inflammatory-disease-3 (dễ nhầm thai ngoài tử cung) | Hạng 1 (97%), mức 3/3 | Thai ngoài tử cung 0,2% nhờ "không có thai", "không chậm kinh" |
