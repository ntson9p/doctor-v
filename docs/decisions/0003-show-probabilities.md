# 0003. Hiện con số % kèm lớp bảo vệ

**Ngày:** 2026-10-24 · **Trạng thái:** Đã duyệt (chủ dự án chọn "Gợi ý kèm con số %")

## Bối cảnh
Nghiên cứu cho thấy ba vấn đề với con số:
- **Hiểu sai:** người ít quen số liệu dễ hiểu sai con số.
- **Chưa hiệu chuẩn:** mô hình chưa được hiệu chuẩn bằng dữ liệu thật.
- **Rủi ro pháp lý:** xếp hạng bệnh kèm % làm tăng khả năng bị coi là thiết bị y tế.

Chủ dự án đã cân nhắc các điểm trên và vẫn chọn hiển thị con số.

## Quyết định
Hiện "mức phù hợp khoảng X%" cho 3–5 tình trạng, kèm các lớp bảo vệ:
- Làm tròn 5%. Dưới 5% ghi "dưới 5%". Không bao giờ hiện 0% hay 100%.
- **Mức xử trí do quy tắc an toàn quyết định**, không phụ thuộc bệnh đứng đầu. Bệnh nguy hiểm dù xác suất thấp vẫn có nhãn "Cần loại trừ sớm".
- Có dòng "Nguyên nhân khác chưa có trong hệ thống: khoảng Y%".
- Nút "Con số này nghĩa là gì?" giải thích bằng tần suất tự nhiên.
- Có nhãn "chưa hiệu chuẩn" (`calibrated: false`) cho tới khi đạt ECE ≤ 0,10 trên bộ ca giữ kín.
- Có công tắc cấu hình để chuyển sang nhãn chữ ngay, nếu bác sĩ hoặc luật sư khuyên.

## Hệ quả
- Hiệu chuẩn (ECE) là chỉ tiêu bắt buộc trong `docs/evaluation.md`.
- Bộ suy luận trả về `display` đã làm tròn (`packages/engine/src/result.ts`). Giao diện không tự làm tròn lại.
