# doctor-v

Ứng dụng web giúp người Việt Nam **định hướng đi khám** dựa trên triệu chứng: trả lời các câu hỏi trắc nghiệm ngắn, app cho biết:
- **mức độ cần đi khám** (gọi 115, đi cấp cứu, khám trong 24 giờ, khám trong vài ngày, theo dõi tại nhà);
- **nên khám chuyên khoa nào**;
- **các tình trạng có thể liên quan**, kèm mức phù hợp ước tính.

> ⚠️ **Bản thử nghiệm nội bộ.**
> - Nội dung y khoa **chưa được bác sĩ thẩm định**, chưa được phát hành công khai.
> - doctor-v là công cụ thông tin sức khỏe: không khám bệnh, không chẩn đoán, không kê đơn, không thay thế nhân viên y tế.
> - Nếu có dấu hiệu nguy hiểm, hãy **gọi 115**.

"doctor-v" là tên dự án; tên công khai sẽ chọn trước khi ra mắt.

## Nguyên tắc

1. **An toàn trước hết:** dấu hiệu cấp cứu được hỏi đầu tiên; thà khuyên đi khám sớm còn hơn bỏ sót.
2. **Có nguồn:** mỗi con số, mỗi quy tắc đều có nguồn và bậc bằng chứng.
3. **Minh bạch:** luôn giải thích vì sao app gợi ý như vậy.
4. **Riêng tư:** mọi xử lý diễn ra trên máy người dùng; không tài khoản, không theo dõi.
5. **Dễ hiểu:** tiếng Việt phổ thông, câu ngắn, cỡ chữ lớn, phù hợp người cao tuổi.
6. **Nhất quán:** cùng câu trả lời luôn cho cùng kết quả; mọi thay đổi dữ liệu đều chạy lại bộ ca kiểm thử.

## Cấu trúc

```
docs/          tài liệu (tiếng Việt)
  plan.md            kế hoạch đã duyệt
  research/          5 báo cáo nghiên cứu
  decisions/         các quyết định kiến trúc
  engine-spec.md     đặc tả toán học của bộ suy luận
  kb-guide.md        hướng dẫn soạn cơ sở tri thức
  style-guide-vi.md  quy tắc viết tiếng Việt
  evaluation.md      cách kiểm định độ chính xác và an toàn
  legal/             bản nháp định vị, cảnh báo, điều khoản, quyền riêng tư
  worklog.md         nhật ký công việc
knowledge/     nội dung y khoa (YAML): nguồn, dấu hiệu, triệu chứng chính, bệnh, quy tắc
packages/
  engine/      bộ suy luận (TypeScript thuần, không phụ thuộc)
  kb/          schema, kiểm lỗi, biên dịch knowledge/ → JSON
apps/
  web/         ứng dụng web (Astro + Preact), chạy hoàn toàn trên máy người dùng
evaluation/    bộ ca kiểm thử, bệnh nhân mô phỏng, báo cáo
```

## Lệnh thường dùng

Cần Node.js 24 trở lên. Cài đặt: `npm install`.

| Lệnh | Việc |
|---|---|
| `npm run verify` | Kiểm tra kiểu, lint, kiểm thử, kiểm tra dữ liệu |
| `npm run kb:check` | Kiểm tra `knowledge/` |
| `npm run kb:check -- --drafts drafts/pass-a` | Kiểm tra bản nháp của một lượt soạn |
| `npm run kb:build` | Biên dịch dữ liệu thành `packages/kb/dist/kb.json` |
| `npm run eval:check` | Kiểm tra định dạng các ca kiểm thử |
| `npm run eval -- --set dev --report` | Chạy bộ ca phát triển và ghi báo cáo vào `evaluation/reports/` |
| `npm run eval:tune` | Thử các hệ số nhiệt trên bộ ca phát triển |
| `npm run play` | Chạy thử một phiên hỏi đáp ngay trong terminal |
| `npm run web:dev` | Chạy ứng dụng web ở chế độ phát triển (mặc định http://localhost:4321) |
| `npm run web:build` | Build ứng dụng web thành trang tĩnh trong `apps/web/dist/` |
| `npm run web:phone` | Build rồi mở ứng dụng cho điện thoại trong cùng mạng Wi-Fi (xem địa chỉ "Network" hiện ra; lần đầu Windows có thể hỏi cho phép Node.js) |
| `npm run test:e2e -w @doctor-v/web` | Kiểm thử giao diện bằng Playwright và axe (điện thoại, màn 320 px, cỡ chữ lớn nhất) |

Trên Windows, nên dùng Windows Terminal để hiển thị đúng tiếng Việt.

## Trạng thái

Xem `docs/worklog.md` (việc đã làm, việc tiếp theo) và lộ trình trong `docs/plan.md`, mục 10.
