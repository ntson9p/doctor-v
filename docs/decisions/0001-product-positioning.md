# 0001. Định vị: công cụ thông tin sức khỏe, không chẩn đoán

**Ngày:** 2026-10-24 · **Trạng thái:** Đã duyệt

## Bối cảnh
- Chủ dự án muốn một app giúp mọi người "chẩn đoán bệnh" qua câu hỏi trắc nghiệm.
- Theo bằng chứng, app tốt nhất chỉ gợi ý đúng bệnh trong 3 gợi ý đầu ở khoảng 63–70% số ca, còn bác sĩ khoảng 84% (`docs/research/symptom-checker-methodology.md`).
- Theo Nghị định 98/2021/NĐ-CP, phần mềm "dùng để chẩn đoán" có thể bị coi là thiết bị y tế (`docs/research/legal-regulatory.md`).

## Quyết định
- doctor-v là **công cụ thông tin sức khỏe**. App giúp người dùng biết:
  - mức độ cần đi khám;
  - nên khám chuyên khoa nào;
  - những tình trạng có thể liên quan.
- App không khám bệnh, không chẩn đoán, không kê đơn.
- Màn hình kết quả luôn đặt **mức xử trí lên đầu**.
- Không dùng các từ "chẩn đoán", "bác sĩ AI", "khám online".
- Câu định vị chính thức nằm trong `docs/legal/positioning.md`.

## Hệ quả
- Mục tiêu "chính xác" được đo bằng 3 chỉ số:
  1. không bỏ sót cấp cứu;
  2. bệnh đúng nằm trong top 3;
  3. con số % hiệu chuẩn tốt.
- Tên công khai sẽ chọn trước khi ra mắt, tránh tên kiểu "bác sĩ". "doctor-v" chỉ là tên dự án.
