# 0005. Công nghệ

**Ngày:** 2026-10-24 · **Trạng thái:** Đã duyệt

## Bối cảnh
App phải đáp ứng:
- chạy tốt trên Android cấu hình thấp và iOS 15;
- dùng được trong trình duyệt của Zalo/Facebook;
- dùng được offline;
- trang tra cứu bệnh được Google tìm thấy.

So sánh chi tiết các lựa chọn ở `docs/research/ux-accessibility-tech.md`, mục 3.6 và 4.2.

## Quyết định
Các phiên bản dưới đây đã kiểm tra trên npm ngày 2026-10-24.

| Lớp | Lựa chọn |
|---|---|
| Khung web | Astro 7.4, xuất trang tĩnh |
| Tương tác | Preact 10.29 |
| Ngôn ngữ | TypeScript 6.0.3: TS 7 chưa được `@astrojs/check` và typescript-eslint hỗ trợ |
| Giao diện | CSS thuần với design tokens, chạy được trên iOS 15 |
| Offline | workbox-build 7.4: plugin PWA cho Astro chỉ hỗ trợ Astro tối đa 5 |
| Tìm kiếm | MiniSearch 7.2 cộng bộ bỏ dấu tiếng Việt tự viết |
| Dữ liệu | YAML trong `knowledge/`, kiểm tra bằng Zod 4.6, biên dịch thành JSON |
| Kiểm thử | Vitest 5, fast-check 4, Playwright 1.64, axe-core 4.14, Lighthouse CI |
| Môi trường | Node 24, npm workspaces |

**Chạy TypeScript:** Node 24 chạy trực tiếp file `.ts` (type stripping), nên không cần bước build cho công cụ và kiểm thử. Mã chỉ dùng cú pháp xóa được (`erasableSyntaxOnly`).

## Phương án đã cân nhắc
- **Next.js 16:** không chọn, vì nặng hơn trên mọi trang và cần Safari 16.4.
- **SvelteKit 3:** phương án dự phòng; xem xét lại khoảng quý 1/2027.
- **Tailwind 4:** không chọn, vì cần Safari 16.4.
