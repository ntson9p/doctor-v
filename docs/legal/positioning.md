# Định vị sản phẩm và từ ngữ

> **BẢN NHÁP — chưa qua luật sư rà soát.** Căn cứ: `docs/research/legal-regulatory.md` (mục 4.1, 4.6). Đây là tài liệu nghiên cứu, không phải ý kiến pháp lý.

## Câu mục đích sử dụng chính thức

Dùng **thống nhất** trên trang web, trong điều khoản sử dụng và mọi giới thiệu:

> doctor-v là công cụ thông tin sức khỏe giúp người dùng phổ thông sắp xếp thông tin về triệu chứng, nhận biết dấu hiệu cần cấp cứu, và lựa chọn mức độ khẩn cấp, chuyên khoa phù hợp để đi khám; đồng thời cung cấp thông tin giáo dục sức khỏe về một số tình trạng thường gặp. doctor-v không khám bệnh, không chẩn đoán, không điều trị, không kê đơn và không thay thế nhân viên y tế.

Người dùng dưới 16 tuổi nên dùng cùng cha mẹ hoặc người giám hộ.

## Từ ngữ

| Nên dùng | Tránh |
|---|---|
| định hướng đi khám | chẩn đoán, kết luận bệnh |
| mức độ cần lưu ý, mức xử trí | "bạn bị bệnh X" |
| tình trạng có thể liên quan | bác sĩ AI, bác sĩ ảo |
| mức phù hợp khoảng X% | chính xác X%, phát hiện 100% |
| thông tin tham khảo | khám online, khám từ xa |
| trao đổi với bác sĩ | thay thế bác sĩ |

## Những điều không làm

- **Thuốc:** không nêu tên thuốc kê đơn, liều dùng, phác đồ điều trị; không gợi ý mua thuốc.
- **Quảng cáo:**
  - không nhận quảng cáo thuốc, thiết bị y tế, phòng khám;
  - không có lời chứng thực của người dùng;
  - không có hình ảnh bác sĩ trong quảng cáo.
- **Dữ liệu:** không đăng lại tin báo chí; không đưa dữ liệu người dùng vào URL.
- **Theo dõi:** không dùng pixel, SDK hay analytics theo dõi.
- **Đồng ý:** không đặt ô đồng ý tick sẵn.
- **Tuyên bố mâu thuẫn:** không tuyên bố "không phải thiết bị y tế" trong khi giao diện xếp hạng khả năng mắc bệnh.

## Lưu ý về hiển thị con số %

Chủ dự án đã chọn hiển thị con số (`docs/decisions/0003-show-probabilities.md`). Báo cáo pháp lý nhận định việc **xếp hạng bệnh kèm %** làm tăng khả năng phần mềm bị coi là thiết bị y tế theo Nghị định 98/2021/NĐ-CP. Vì vậy:
- giữ công tắc chuyển sang nhãn chữ;
- trước khi công khai, cần **luật sư** đưa ra quan điểm về thiết bị y tế; có thể kèm văn bản hỏi Cục Hạ tầng và Thiết bị y tế.

## Trước khi công khai

1. Bác sĩ duyệt nội dung.
2. Luật sư rà soát định vị, điều khoản, quyền riêng tư, và quan điểm về thiết bị y tế.
3. Chọn tên công khai. Tránh từ "bác sĩ" / "doctor".
4. Có cá nhân hoặc tổ chức đứng tên chịu trách nhiệm.
