# 0006. Phi lợi nhuận vĩnh viễn và chính sách giấy phép nguồn

**Ngày:** 2026-10-24 · **Trạng thái:** Đã duyệt (chủ dự án chọn "Phi lợi nhuận vĩnh viễn")

## Quyết định
- doctor-v miễn phí, phi lợi nhuận.
- Được dùng nguồn có điều kiện phi thương mại (L2), ví dụ GBD/IHME, dữ liệu WHO, bộ ca bệnh Semigran 2015, sau khi kiểm tra điều kiện cụ thể của từng nguồn.
- **Không thay đổi:**
  - Nguồn độc quyền (L3), như MSD Manual, NICE, JAMA, chỉ được lấy **dữ kiện kèm trích dẫn**, không lấy câu chữ.
  - Mọi câu tiếng Việt là câu tự viết.
- Mỗi nguồn ghi `license_class` trong `knowledge/sources/`.

## Hệ quả
- Nếu sau này đổi sang thương mại, phải rà lại mọi nguồn L2 và thay những nguồn không cho phép thương mại.
- Giấy phép công bố cho mã nguồn và cơ sở tri thức chưa chọn; quyết định khi chuẩn bị công khai. Giấy phép "share-alike" (như WHO CC BY-NC-SA) có thể ràng buộc nội dung phái sinh, nên cần kiểm tra trước khi chọn.
- Vẫn cần một cá nhân hoặc tổ chức đứng tên chịu trách nhiệm trước khi công khai (`docs/research/legal-regulatory.md`, mục 4.9).
