# doctor-v: bối cảnh pháp lý, quy định và đạo đức

- **Ngày lập:** 2026-10-24
- **Phạm vi:** Việt Nam là chính. Phần đối chiếu gồm EU, Mỹ (FDA), Anh (MHRA) và WHO.
- **Giả định sản phẩm:** PWA tĩnh, suy luận chạy hoàn toàn trên trình duyệt, không có tài khoản, câu trả lời không gửi về máy chủ. Tính năng AI (LLM) mới chỉ đang được cân nhắc. Chưa chọn hướng phi lợi nhuận hay thương mại.

> **Đây là tài liệu nghiên cứu, không phải tư vấn pháp lý.** Nhiều điểm còn chưa có tiền lệ hoặc chưa có hướng dẫn chính thức, nên mỗi kết luận được gắn nhãn *Độ chắc chắn* (Cao / Trung bình / Thấp). Trước khi ra mắt công khai, trước khi bật AI gửi dữ liệu ra ngoài và trước khi thương mại hóa, cần một luật sư Việt Nam có chuyên môn về y tế và dữ liệu rà soát lại.

**Nhãn xác minh** dùng trong tài liệu:
- **[XM]**: đã đối chiếu với văn bản gốc, bản Công báo hoặc văn bản hợp nhất chính thức.
- **[TC]**: chỉ xác minh được qua nguồn thứ cấp (cơ sở dữ liệu luật, công ty luật, báo chí).
- **CHƯA XÁC MINH**: chưa kiểm chứng được trong phiên này.

**Giới hạn của phiên nghiên cứu:**
- thuvienphapluat.vn và who.int chặn truy cập tự động (HTTP 403). Vì vậy tài liệu dùng Công báo, datafiles.chinhphu.vn, LuatVietnam, bản PDF Công báo do bên thứ ba lưu và kho IRIS của WHO.
- Hạn mức tìm kiếm web hết giữa chừng. Do đó một số chi tiết sau chưa xác minh được: nội dung Luật An ninh mạng 2025, nguyên văn Nghị định 53/2022, ngày hiệu lực của một số luật.

---

## 1. Tóm tắt

### 1.1 Kết luận chính

1. **Ở Việt Nam, phần mềm có thể là "thiết bị y tế".**
   - Theo Nghị định 98/2021/NĐ-CP (bản hợp nhất 08/VBHN-BYT ngày 06/03/2026), "phần mềm (software)" là thiết bị y tế nếu được dùng "theo chỉ định của chủ sở hữu" cho mục đích "chẩn đoán, ngăn ngừa, theo dõi, điều trị…". Một công cụ trả về danh sách bệnh có thể mắc, xếp hạng cho từng người, có nguy cơ thỏa định nghĩa này.
   - Tuy nhiên Điều 3 khoản 8 điểm a của nghị định loại "phần mềm (software) sử dụng cho thiết bị y tế" khỏi các quy định về phân loại, cấp số lưu hành và công bố đủ điều kiện mua bán. Ngoại lệ này có áp dụng cho phần mềm y tế độc lập (SaMD) hay không thì **không rõ**.
   - Không tìm thấy hướng dẫn chính thức nào của Bộ Y tế về SaMD hay AI y tế. *Độ chắc chắn: Thấp.*
2. **Nếu bị coi là thiết bị y tế và phải phân loại** (theo Thông tư 05/2022/TT-BYT, đã sửa bởi Thông tư 24/2026/TT-BYT):
   - Khả năng cao là **loại A** (Quy tắc 12) hoặc **loại B** (Quy tắc 10.2.c, "chẩn đoán trực tiếp").
   - Có rủi ro nhỏ bị xếp **loại C** (Quy tắc 10.3.b, chẩn đoán khi bệnh nhân "đang trong tình trạng nguy hiểm"), vì app có phân loại cấp cứu.
   - Loại A, B cần **công bố tiêu chuẩn áp dụng**. Loại C, D cần **giấy chứng nhận đăng ký lưu hành** (Điều 21 Nghị định 98).
3. **Không phải "khám bệnh, chữa bệnh" và không phải "khám chữa bệnh từ xa", với điều kiện không có người hành nghề tham gia.**
   - Luật 15/2023/QH15 định nghĩa khám bệnh là việc của "người hành nghề" có giấy phép. Khám chữa bệnh từ xa là quan hệ giữa người hành nghề và người bệnh.
   - Rủi ro tăng mạnh nếu: gọi sản phẩm là "bác sĩ AI" hay "khám online", kê đơn hoặc liều thuốc, hoặc gắn bác sĩ tư vấn vào app mà không qua một cơ sở có giấy phép. *Độ chắc chắn: Trung bình.*
4. **Website tự đăng nội dung sức khỏe của chính mình không cần giấy phép** theo Nghị định 147/2024/NĐ-CP.
   - Trang được xếp vào loại "cung cấp dịch vụ chuyên ngành" (y tế), "nội bộ" hoặc "cá nhân".
   - Ngoại lệ: nếu đăng "thông tin tổng hợp", tức đăng lại tin của báo chí hoặc của cơ quan Đảng, Nhà nước, thì phải có giấy phép.
   - Quảng cáo thuốc, thiết bị y tế và dịch vụ khám chữa bệnh là quảng cáo "sản phẩm đặc biệt" (Luật 75/2025/QH15, Nghị định 342/2025/NĐ-CP). *Độ chắc chắn: Trung bình đến Cao.*
5. **Dữ liệu sức khỏe là dữ liệu cá nhân nhạy cảm, và dữ liệu theo dõi hành vi trên mạng cũng vậy.**
   - Nghị định 356/2025/NĐ-CP, Điều 4 khoản 1: điểm d "Tình trạng sức khỏe", điểm l "Dữ liệu theo dõi hành vi…".
   - Kiến trúc xử lý trên thiết bị là **lợi thế pháp lý lớn**: gần như không phát sinh nghĩa vụ hồ sơ.
   - Ngược lại, đưa vào **analytics theo dõi** hoặc **gửi văn bản tự do tới API AI ở nước ngoài** sẽ kéo theo cả gói nghĩa vụ: sự đồng ý rõ ràng, hồ sơ đánh giá tác động xử lý dữ liệu (DPIA) và hồ sơ đánh giá tác động chuyển dữ liệu xuyên biên giới (CTIA), nộp cho Cục A05 Bộ Công an trong 60 ngày, hợp đồng xử lý dữ liệu. Miễn trừ cho doanh nghiệp nhỏ **không áp dụng** khi trực tiếp xử lý dữ liệu nhạy cảm. *Độ chắc chắn: Trung bình (tình huống trên thiết bị) / Cao (tình huống API AI).*
6. **Việt Nam đã có Luật Trí tuệ nhân tạo**, số 134/2025/QH15, hiệu lực từ 01/03/2026.
   - Văn bản hướng dẫn: Nghị định 142/2026/NĐ-CP (hiệu lực 01/05/2026) và Quyết định 33/2026/QĐ-TTg (hiệu lực 15/08/2026, danh mục AI rủi ro cao). Trong lĩnh vực y tế, danh mục **chỉ có** AI hỗ trợ phẫu thuật và rô-bốt phẫu thuật.
   - Bộ máy suy luận dựa trên quy tắc cố định có thể **không** thuộc khái niệm "hệ thống trí tuệ nhân tạo" (luật yêu cầu "có khả năng tự thích nghi").
   - Một chatbot LLM giao tiếp với công chúng gần như chắc chắn là hệ thống AI và nhiều khả năng thuộc **rủi ro trung bình**. Khi đó phải thông báo kết quả phân loại cho Bộ Khoa học và Công nghệ trước khi đưa vào sử dụng, phải minh bạch rằng người dùng đang tương tác với AI, và nên gắn nhãn nội dung do AI tạo.
   - Các quy định về AI trong Luật Công nghiệp công nghệ số 71/2025/QH15 **đã bị bãi bỏ** (Điều 33 Luật AI). *Độ chắc chắn: Trung bình.*
7. **Nghĩa vụ lưu trữ dữ liệu tại Việt Nam theo luật an ninh mạng gần như không phát sinh** với một app không lưu dữ liệu người dùng. Luật An ninh mạng 2025 (số 116/2025/QH15, thông qua 10/12/2025) đã được ban hành, nhưng ngày hiệu lực và nội dung chi tiết **CHƯA XÁC MINH**.
8. **Đối chiếu quốc tế:**
   - EU (MDR, Quy tắc 11) và Anh (MHRA) coi công cụ tra triệu chứng có xếp hạng khả năng mắc bệnh là thiết bị y tế. Ví dụ: Ada Assess là thiết bị loại IIa, nền tảng MGP của Infermedica là loại IIb.
   - FDA (Mỹ) coi phần mềm hỗ trợ quyết định dành cho bệnh nhân là "device", nhưng áp dụng *enforcement discretion* (tạm không thực thi) cho checklist triệu chứng và công cụ gợi ý nơi khám.
   - Câu "chỉ để tham khảo" **không** tự loại trừ nghĩa vụ ở EU hay Anh.
9. **Cách định vị "thông tin sức khỏe tham khảo"** có giá trị pháp lý ở Việt Nam, vì định nghĩa thiết bị y tế dựa vào "chỉ định của chủ sở hữu". Tuy vậy, nó chỉ giảm rủi ro, không loại bỏ được. Cơ quan quản lý sẽ nhìn vào chức năng thực tế, nên mô tả, giao diện, kết quả hiển thị và marketing phải nhất quán với nhau.

### 1.2 Ma trận rủi ro

| Lĩnh vực | Thiết kế hiện tại | Nếu mở rộng (AI, analytics, thương mại) | Độ chắc chắn |
|---|---|---|---|
| Thiết bị y tế (Nghị định 98/2021) | **Trung bình** | Cao: nếu thương mại hóa kèm tuyên bố "chẩn đoán" | Thấp |
| Hành nghề khám chữa bệnh / khám chữa bệnh từ xa (Luật 15/2023) | Thấp | Cao: nếu có bác sĩ tư vấn hoặc kê đơn qua app ngoài khuôn khổ cơ sở có phép | Trung bình |
| Thông tin trên mạng (Nghị định 147/2024) | Thấp | Trung bình: nếu đăng lại tin báo chí | Cao |
| Quảng cáo (Luật 75/2025, Nghị định 342/2025) | Thấp | Trung bình đến Cao: nếu nhận quảng cáo thuốc, thiết bị y tế, phòng khám, hoặc affiliate | Trung bình |
| Bảo vệ dữ liệu cá nhân: xử lý trên thiết bị | Thấp | Không áp dụng | Trung bình |
| Bảo vệ dữ liệu cá nhân: analytics hoặc cookie theo dõi | Không áp dụng | **Cao** (dữ liệu nhạy cảm theo Điều 4.1.l) | Trung bình |
| Bảo vệ dữ liệu cá nhân: gửi văn bản tới API AI ở nước ngoài | Không áp dụng | **Cao** (dữ liệu nhạy cảm, xuyên biên giới, DPIA và CTIA) | Cao |
| Luật AI: engine quy tắc | Thấp | Không áp dụng | Trung bình |
| Luật AI: chatbot LLM | Không áp dụng | Trung bình (thông báo, minh bạch, gắn nhãn) | Trung bình |
| An ninh mạng và lưu trữ dữ liệu | Thấp | Trung bình: nếu có tài khoản hoặc lưu dữ liệu | Thấp đến Trung bình |
| Trách nhiệm dân sự khi phân loại khẩn cấp sai | Trung bình | Cao: khi thương mại hóa | Trung bình |

---

## 2. Bảng văn bản pháp lý liên quan

### 2.1 Việt Nam: thiết bị y tế, khám chữa bệnh, thông tin, quảng cáo

| Số hiệu | Tên | Ban hành | Hiệu lực | Điểm liên quan | Xác minh |
|---|---|---|---|---|---|
| 98/2021/NĐ-CP | Quản lý thiết bị y tế | 08/11/2021 | 01/01/2022 | Điều 2.1 (phần mềm); 3.8a (ngoại lệ phần mềm); 4–5 (phân loại); 21–23 (số lưu hành); 62 (quảng cáo) | [XM] qua VBHN 08/VBHN-BYT |
| 08/VBHN-BYT | Văn bản hợp nhất Nghị định 98/2021 | 06/03/2026 | Không áp dụng | Hợp nhất các Nghị định 07/2023, 96/2023, 85/2024, 04/2025, 342/2025 | [XM] |
| 07/2023/NĐ-CP | Sửa đổi Nghị định 98/2021 | 03/03/2023 | 03/03/2023 | Điều 21.2, 22 | [XM] qua VBHN |
| 96/2023/NĐ-CP | Quy định chi tiết Luật Khám bệnh, chữa bệnh | 30/12/2023 | 01/01/2024 | Đổi "trang thiết bị y tế" thành "thiết bị y tế"; Điều 87 về khám chữa bệnh từ xa | [XM] (ngày); Điều 87: [TC] |
| 04/2025/NĐ-CP | Sửa đổi Nghị định 98/2021 | 01/01/2025 | CHƯA XÁC MINH | Điều 76 (nhập khẩu); không liên quan trực tiếp | [XM] (ngày ban hành) |
| 05/2022/TT-BYT | Quy định chi tiết Nghị định 98/2021 (phân loại) | 01/08/2022 | 01/08/2022 | Phụ lục I: Quy tắc 1–16; định nghĩa thiết bị chủ động; Quy tắc 10, 12 | [XM] qua VBHN 12/2026 |
| 24/2026/TT-BYT | Mức độ rủi ro và biện pháp quản lý thiết bị y tế; sửa Thông tư 05/2022 | 30/06/2026 | 01/07/2026 | Vẫn dùng hệ A–D; bãi bỏ Thông tư 59/2025; không có quy tắc riêng cho phần mềm | [XM] VBHN + [TC] |
| 12/2026/VBHN-TT-BYT | Văn bản hợp nhất Thông tư 05/2022 | 10/07/2026 | Không áp dụng | Văn bản đang áp dụng | [XM] |
| 15/2023/QH15 | Luật Khám bệnh, chữa bệnh | 09/01/2023 | 01/01/2024 | Điều 2 (khoản 1, 2, 4, 19); Điều 7; Điều 80 | [XM] |
| 30/2023/TT-BYT | Danh mục bệnh được khám chữa bệnh từ xa | 30/12/2023 | 01/01/2024 | Khoảng 50 bệnh | [TC] |
| 16/2012/QH13, sửa bởi **75/2025/QH15** | Luật Quảng cáo (sửa đổi) | 16/06/2025 | 01/01/2026 | Điều 2.1, 19, 20.4 (điểm đ, e), 23 | [XM] |
| 342/2025/NĐ-CP | Quy định chi tiết Luật Quảng cáo | 26/12/2025 | 15/02/2026 | Danh mục sản phẩm đặc biệt (Điều 3); nội dung quảng cáo thiết bị y tế (Điều 8); dịch vụ khám chữa bệnh (Điều 9) | Hiệu lực: [XM] qua VBHN; nội dung: [TC] |
| 147/2024/NĐ-CP | Quản lý dịch vụ Internet và thông tin trên mạng | 09/11/2024 | 25/12/2024 | Điều 3 (khoản 17, 21–23), 20, 21, 24 | Nội dung: [XM]; hiệu lực: [TC] |
| 53/2014/TT-BYT | Điều kiện hoạt động y tế trên môi trường mạng | 29/12/2014 | 01/03/2015 | Hạ tầng, an toàn thông tin, nhân lực, quyền riêng tư người bệnh | [TC]; tình trạng còn hiệu lực theo nguồn thứ cấp |
| 126/2025/QH15 | Luật Báo chí 2025 | 10/12/2025 | CHƯA XÁC MINH | Không hoạt động như cơ quan báo chí | [TC] |

### 2.2 Việt Nam: dữ liệu, AI, an ninh mạng, dân sự và thương mại

| Số hiệu | Tên | Ban hành | Hiệu lực | Điểm liên quan | Xác minh |
|---|---|---|---|---|---|
| **91/2025/QH15** | Luật Bảo vệ dữ liệu cá nhân | 26/06/2025 | 01/01/2026 | Điều 2, 4, 8, 9, 11, 19–23, 26, 30, 33, 37–39 | [XM] (Công báo 971+972) |
| **356/2025/NĐ-CP** | Quy định chi tiết Luật Bảo vệ dữ liệu cá nhân | 31/12/2025 | 01/01/2026 | Điều 3–4 (danh mục dữ liệu), 6 (đồng ý), 10.3, 17.3, 21–27 (dịch vụ xử lý dữ liệu), 41 (miễn trừ), 42 | [XM] qua bản LuatVietnam + [TC] |
| 13/2023/NĐ-CP | Bảo vệ dữ liệu cá nhân (cũ) | 17/04/2023 | **Hết hiệu lực từ 01/01/2026** | Điều 42.2 Nghị định 356; Điều 39 Luật 91 (chuyển tiếp) | [XM] |
| 60/2024/QH15 | Luật Dữ liệu | 30/11/2024 | 01/07/2025 (CHƯA XÁC MINH) | Dữ liệu cốt lõi và quan trọng; Nghị định 165/2025 hướng dẫn | Số hiệu: [XM] |
| **134/2025/QH15** | Luật Trí tuệ nhân tạo | 10/12/2025 | **01/03/2026** | Điều 3, 6, 7, 9–15, 26, 29, 33–35 | [XM] |
| **142/2026/NĐ-CP** | Quy định chi tiết Luật Trí tuệ nhân tạo | 30/04/2026 | 01/05/2026 (Điều 45) | Điều 8 (rủi ro cao và loại trừ), 9 (rủi ro trung bình), 16, 18 | [XM] qua bản LuatVietnam + [TC] |
| **33/2026/QĐ-TTg** | Danh mục hệ thống AI có rủi ro cao | 30/06/2026 | 15/08/2026 | Mục III (y tế): chỉ AI hỗ trợ phẫu thuật, rô-bốt phẫu thuật | [XM] (Công báo 395) |
| 05/2026/TT-BKHCN | Khung đạo đức AI quốc gia | CHƯA XÁC MINH | 10/03/2026 | Bốn nhóm nguyên tắc | [TC] |
| 71/2025/QH15 | Luật Công nghiệp công nghệ số | 14/06/2025 | 01/01/2026 | Chương IV (AI) bị bãi bỏ bởi Điều 33 Luật AI | Bãi bỏ: [XM]; hiệu lực: [TC] |
| 24/2018/QH14 | Luật An ninh mạng 2018 | 12/06/2018 | 01/01/2019 | Lưu trữ dữ liệu tại Việt Nam (Điều 26) | [TC] |
| 53/2022/NĐ-CP | Quy định chi tiết Luật An ninh mạng | CHƯA XÁC MINH | CHƯA XÁC MINH | Điều 26 (lưu trữ dữ liệu, đặt chi nhánh) | CHƯA XÁC MINH |
| **116/2025/QH15** | Luật An ninh mạng 2025 | 10/12/2025 | CHƯA XÁC MINH (ngày 29/6/2026 LuatVietnam ghi "chưa áp dụng") | Có thể thay thế hoặc hợp nhất khung 2018/2015 | [TC] |
| 86/2015/QH13 | Luật An toàn thông tin mạng | 19/11/2015 | Hết hiệu lực một phần [TC] | Không áp dụng | [TC] |
| 19/2023/QH15 | Luật Bảo vệ quyền lợi người tiêu dùng | 20/06/2023 | CHƯA XÁC MINH | Áp dụng khi đi hướng thương mại | [TC] |
| 20/2023/QH15 | Luật Giao dịch điện tử | 22/06/2023 | CHƯA XÁC MINH | Chấp nhận điều khoản sử dụng trực tuyến | [TC] |
| 122/2025/QH15 | Luật Thương mại điện tử | 10/12/2025 | CHƯA XÁC MINH | Áp dụng khi đi hướng thương mại | [TC] |
| 91/2015/QH13 | Bộ luật Dân sự 2015 | Không áp dụng | Không áp dụng | Bồi thường ngoài hợp đồng (Điều 584) | CHƯA XÁC MINH trong phiên (theo hiểu biết) |

### 2.3 Quốc tế

| Văn bản | Ngày | Điểm liên quan | Xác minh |
|---|---|---|---|
| Quy định (EU) 2017/745 (MDR), Phụ lục VIII, Quy tắc 11 | Ban hành 05/04/2017; áp dụng 26/05/2021 (theo hiểu biết) | Phần mềm hỗ trợ quyết định chẩn đoán tối thiểu là loại IIa | Nguyên văn Quy tắc 11: [XM] qua MDCG |
| MDCG 2019-11 rev.1 | 10/2019; rev.1 06/2025 | Tiêu chí xác định và phân loại phần mềm | [XM] |
| MDCG 2025-6 | 06/2025 | Câu hỏi thường gặp về quan hệ giữa MDR/IVDR và AI Act | [XM] (tiêu đề, ngày) |
| FDA, Clinical Decision Support Software (Final) | 29/01/2026 (thay bản 06/01/2026) | Phần mềm cho bệnh nhân là "device" | [XM] |
| FDA, Policy for Device Software Functions and Mobile Medical Applications | 28/09/2022 (bản gốc 2013) | Phụ lục B, mục 7–8: tạm không thực thi với symptom checker | [XM] |
| MHRA, Medical device stand-alone software including apps v1.10g; Phụ lục 1 (Symptom checkers) | Trang cập nhật 01/07/2023 | Loại I, hoặc IIa nếu "cho phép chẩn đoán trực tiếp" | [XM] |
| WHO, *Ethics and governance of AI for health* | 25/06/2021 | Sáu nguyên tắc đạo đức | [XM] (IRIS) |
| WHO, *Guidance on large multi-modal models* | 08/01/2024 (phát hành 18/01/2024) | Rủi ro khi bệnh nhân dùng LLM | [XM] (IRIS); bản cập nhật 2025: CHƯA XÁC MINH |

---

## 3. Phân tích chi tiết

### 3.1 Luật thiết bị y tế tại Việt Nam (mục 1)

#### a) Định nghĩa có bao gồm phần mềm không? Có. [XM]

Điều 2 khoản 1 Nghị định 98/2021 (theo VBHN 08/VBHN-BYT; từ 01/01/2024 cụm "trang thiết bị y tế" đã đổi thành "thiết bị y tế"):

> "Thiết bị y tế là các loại thiết bị, vật tư cấy ghép, dụng cụ, vật liệu, thuốc thử và chất hiệu chuẩn in vitro, **phần mềm (software)** đáp ứng đồng thời các yêu cầu sau đây: a) Được sử dụng riêng lẻ hay phối hợp với nhau **theo chỉ định của chủ sở hữu** thiết bị y tế để phục vụ cho con người nhằm một hoặc nhiều mục đích sau đây: – **Chẩn đoán, ngăn ngừa, theo dõi**, điều trị và làm giảm nhẹ bệnh tật hoặc bù đắp tổn thương, chấn thương; […] b) Không sử dụng cơ chế dược lý, miễn dịch hoặc chuyển hóa trong hoặc trên cơ thể người […]"

Theo Điều 2 khoản 5 điểm b, "chủ sở hữu" là bên "xác định mục đích sử dụng của thiết bị y tế đó". Mục đích sử dụng do chủ sở hữu công bố vì vậy là yếu tố pháp lý then chốt (xem mục f).

#### b) Ngoại lệ cho phần mềm: điểm mấu chốt nhưng mơ hồ. [XM văn bản; diễn giải: Thấp]

Điều 3 khoản 8 điểm a:

> "Không áp dụng các quy định về **phân loại, cấp số lưu hành, công bố đủ điều kiện mua bán** của Nghị định này đối với: a) **Phần mềm (software) sử dụng cho thiết bị y tế**; […]"

Có hai cách đọc:
- **Cách A (rộng):** mọi phần mềm y tế, kể cả độc lập, đều không phải phân loại hay xin số lưu hành theo Nghị định 98. Nếu đúng, doctor-v không có thủ tục trước khi lưu hành. Các nguyên tắc chung về chất lượng và thông tin của nghị định vẫn có thể áp dụng.
- **Cách B (hẹp):** ngoại lệ chỉ dành cho phần mềm đi kèm, điều khiển hoặc phục vụ một thiết bị phần cứng. Khi đó phần mềm độc lập có mục đích y tế vẫn là thiết bị y tế và phải phân loại, công bố hoặc đăng ký.

Văn bản dùng chữ "sử dụng **cho** thiết bị y tế", nghiêng về cách B. Một bài nghiên cứu (Nguyễn Đăng Triết, phaply.net.vn, 28/07/2026) [TC] cũng nhận định ngoại lệ này "có thể được hiểu theo nhiều cách" và kiến nghị Bộ Y tế làm rõ ranh giới giữa phần mềm phụ trợ, phần mềm nhúng và phần mềm độc lập. **Chưa thấy văn bản hướng dẫn nào chốt cách hiểu.**

#### c) Phân loại theo Thông tư 05/2022/TT-BYT (sửa bởi Thông tư 24/2026/TT-BYT). [XM]

Khung chung trong Nghị định 98:
- Điều 4: loại A có rủi ro thấp; B trung bình thấp; C trung bình cao; D cao.
- Điều 5: nếu thiết bị có nhiều mục đích sử dụng thì áp dụng mức rủi ro cao nhất (khoản 2, 3). Việc phân loại do chính cơ sở đứng tên công bố hoặc đăng ký thực hiện (khoản 6).

Phụ lục I Thông tư 05/2022 (bản hợp nhất 12/2026/VBHN-TT-BYT ngày 10/07/2026):
- **Không có quy tắc riêng cho phần mềm.** Tìm kiếm toàn văn phụ lục không thấy chữ "phần mềm".
- Định nghĩa liên quan:
  - Thiết bị y tế chủ động là thiết bị "hoạt động theo nguyên tắc sử dụng và biến đổi nguồn năng lượng điện hoặc các nguồn năng lượng khác…"
  - "Thiết bị y tế chẩn đoán chủ động là thiết bị y tế được sử dụng độc lập hoặc kết hợp với các thiết bị y tế khác, để **cung cấp thông tin cho việc phát hiện, chẩn đoán, theo dõi** hoặc để hỗ trợ trong điều trị sinh lý, tình trạng sức khỏe, bệnh tật hoặc dị tật bẩm sinh."
- **Quy tắc 10.2.c** xếp **loại B** thiết bị chủ động chẩn đoán "được sử dụng để chẩn đoán trực tiếp hoặc giám sát quá trình sinh lý học của sự sống".
- **Quy tắc 10.3.b** xếp **loại C** thiết bị "được sử dụng để chẩn đoán trong các tình huống lâm sàng khi bệnh nhân đang trong tình trạng nguy hiểm".
- **Quy tắc 12**: "Tất cả các thiết bị y tế chủ động khác được xếp vào **loại A**."

Thông tư 24/2026 (hiệu lực 01/07/2026) gắn cơ chế "mức độ rủi ro" của Luật Chất lượng sản phẩm, hàng hóa sửa đổi (78/2025/QH15) và Nghị định 37/2026/NĐ-CP vào hệ A–D của Nghị định 98. Thông tư này sửa Điều 8 Thông tư 05/2022 (lộ trình kiểm định) và bãi bỏ Thông tư 59/2025/TT-BYT [TC]. Nó **không** bổ sung quy tắc cho phần mềm.

**Nhận định cho doctor-v**, nếu phải phân loại (*Độ chắc chắn: Thấp*):
- Nếu coi phần mềm là thiết bị chủ động nhưng không "chẩn đoán trực tiếp": **loại A** (Quy tắc 12).
- Nếu danh sách bệnh xếp hạng bị coi là "chẩn đoán trực tiếp": **loại B**.
- Chức năng "gọi 115 hoặc đi cấp cứu" làm phát sinh một rủi ro nhỏ bị viện dẫn Quy tắc 10.3.b (**loại C**).
- Nguyên tắc "mục đích sử dụng rủi ro cao nhất" (Điều 5) làm rủi ro này tăng thêm.

#### d) Nghĩa vụ theo loại. [XM]

- **Điều 21 khoản 1:** số lưu hành là "a) Số công bố tiêu chuẩn áp dụng đối với thiết bị y tế thuộc loại A, B; b) Số giấy chứng nhận đăng ký lưu hành đối với thiết bị y tế thuộc loại C, D". Số lưu hành có giá trị không thời hạn (khoản 3).
- **Điều 22 (điều kiện lưu hành):** có số lưu hành; có nhãn; có hướng dẫn sử dụng bằng tiếng Việt; có thông tin bảo hành. Thông tin có thể cung cấp ở dạng điện tử.
- **Điều 23 (điều kiện công bố hoặc đăng ký):**
  - Thiết bị sản xuất trong nước phải được sản xuất tại cơ sở đã công bố đủ điều kiện sản xuất.
  - Thiết bị nhập khẩu cần ISO 13485 và đã lưu hành ở bất kỳ quốc gia nào.
  - Phù hợp quy chuẩn hoặc tiêu chuẩn mà nhà sản xuất công bố áp dụng.
  - Các thủ tục này thiết kế cho sản phẩm vật lý, rất khó áp vào một PWA. Đây là lý do nên xin ý kiến chính thức.
- **Quảng cáo thiết bị y tế:** Điều 62 Nghị định 98 dẫn chiếu pháp luật quảng cáo. Điều 20.4.e Luật Quảng cáo (sửa bởi Luật 75/2025) quy định quảng cáo thiết bị y tế "phải có số lưu hành… trừ trường hợp thiết bị y tế không phải cấp số lưu hành".

Cơ quan có thẩm quyền: **Cục Hạ tầng và Thiết bị y tế** (Bộ Y tế) [XM, theo phần căn cứ của Thông tư 24/2026].

#### e) Hướng dẫn về SaMD và AI trong y tế

- **Không tìm thấy** thông tư hay công văn hướng dẫn SaMD của Bộ Y tế trong phạm vi phiên này. Không loại trừ khả năng có công văn trả lời cá biệt cho doanh nghiệp (CHƯA XÁC MINH).
- Luật AI có các điểm áp dụng xuyên ngành:
  - Điều 6.2.a [XM]: y tế là "lĩnh vực thiết yếu", việc quản lý rủi ro phải "chặt chẽ hơn": "bảo đảm an toàn cho người bệnh; độ tin cậy trong điều kiện sử dụng thực tế; bảo vệ dữ liệu về sức khỏe".
  - Điều 6.4: các bộ được quy định yêu cầu riêng cho ngành của mình. Chưa thấy Bộ Y tế ban hành.
- Theo bài phaply.net.vn [TC]: Thông tư 24/2026 "chưa xây dựng bộ tiêu chí riêng cho AI", còn Nghị định 142/2026 cho phép dùng kết quả đánh giá sự phù hợp theo luật chuyên ngành "không làm phát sinh thủ tục hành chính trùng lặp".

#### f) "Thông tin sức khỏe tham khảo" và "chẩn đoán": phân tích trung thực

**Lập luận ủng hộ cách định vị "tham khảo":**
- Định nghĩa của Việt Nam gắn với mục đích "theo chỉ định của chủ sở hữu" (Điều 2.1.a, 2.5.b). Nếu chủ sở hữu tuyên bố nhất quán rằng mục đích là giáo dục sức khỏe và định hướng mức độ khẩn cấp, nơi khám, chuyên khoa, và không chẩn đoán, thì có cơ sở văn bản để lập luận rằng sản phẩm không phải thiết bị y tế.
- Kinh nghiệm quốc tế cho thấy chức năng chỉ hướng người dùng đến nơi khám (*signposting*) được coi là rủi ro thấp: MHRA xếp vào nhóm "unlikely to be devices", FDA xếp vào nhóm tạm không thực thi.

**Lập luận chống:**
- Danh sách tình trạng bệnh **xếp hạng theo khả năng** cho một cá nhân, về thực chất, là "cung cấp thông tin cho việc phát hiện, chẩn đoán" (định nghĩa "thiết bị chẩn đoán chủ động" ở Phụ lục I Thông tư 05/2022).
- Các cơ quan quản lý nước ngoài nói rõ lời từ chối trách nhiệm không có tác dụng loại trừ:
  - MHRA: ứng dụng ghi "for information only" vẫn phải tuân thủ UK MDR 2002 nếu đủ điều kiện là thiết bị; câu "this product is not a medical device" không được chấp nhận nếu nơi khác có tuyên bố hoặc ngụ ý y khoa.
  - Ada vừa tuyên bố "không chẩn đoán", vừa đăng ký là thiết bị loại IIa.
- Cơ quan thanh tra Việt Nam nhiều khả năng cũng nhìn vào chức năng thực tế.

**Kết luận:**
- Cách định vị "tham khảo" là **cần nhưng chưa đủ**. Nó chỉ có giá trị khi giao diện, cách diễn đạt kết quả, mô tả trên kho ứng dụng và marketing đều nhất quán với nó.
- Hai yếu tố làm tăng tính "chẩn đoán" mạnh nhất: hiển thị **xác suất hoặc %** và chỉ báo "bệnh khả năng cao nhất".
- Dù lựa chọn thế nào, Điều 3.8.a vẫn có thể (không chắc) miễn thủ tục cho phần mềm.
- Phương án an toàn nhất trước khi ra mắt rộng là **gửi văn bản hỏi ý kiến Cục Hạ tầng và Thiết bị y tế**, kèm bản mô tả mục đích sử dụng.

#### g) Diễn biến sắp tới [TC]

- **Luật Thiết bị y tế** đang soạn. Mục tiêu là Quốc hội xem xét và thông qua năm 2029 (Sức khỏe & Đời sống, 14/07/2026).
- **Dự thảo nghị định mới về quản lý thiết bị y tế** (07/2026) theo hướng chuyển "từ tiền kiểm sang hậu kiểm". Bài báo ghi dự thảo thay Nghị định 96/2023, có thể là nhầm lẫn.
- **Dự án Luật sửa đổi một số luật lĩnh vực y tế** trình Kỳ họp thứ 2 Quốc hội khóa XVI (khai mạc 17/10/2026) có "bổ sung quy định về quản lý thiết bị y tế". Nội dung cụ thể CHƯA XÁC MINH.

### 3.2 Luật Khám bệnh, chữa bệnh 2023 và khám chữa bệnh từ xa (mục 2)

**Định nghĩa** (Luật 15/2023/QH15, thông qua 09/01/2023, hiệu lực 01/01/2024, theo Điều 120) [XM]:
- Điều 2.1: "Khám bệnh là việc **người hành nghề** khám bệnh, chữa bệnh sử dụng kiến thức, phương pháp, kỹ thuật chuyên môn để đánh giá tình trạng sức khỏe, nguy cơ đối với sức khỏe và nhu cầu chăm sóc sức khỏe của người bệnh."
- Điều 2.4: người hành nghề là "người đã được cơ quan có thẩm quyền của Việt Nam cấp giấy phép hành nghề".
- Điều 2.19: "Khám bệnh, chữa bệnh từ xa là hình thức khám bệnh, chữa bệnh không trực tiếp tiếp xúc **giữa người hành nghề và người bệnh** mà việc khám bệnh, chữa bệnh được thực hiện thông qua thiết bị, công nghệ thông tin."
- Điều 80.1: khám chữa bệnh từ xa "phải thực hiện theo phạm vi hành nghề"; chữa bệnh từ xa phải theo danh mục do Bộ trưởng ban hành (Thông tư 30/2023/TT-BYT [TC]); "b) Người hành nghề phải chịu trách nhiệm về kết quả chẩn đoán bệnh, chỉ định phương pháp chữa bệnh và kê đơn thuốc của mình."
- Điều 87 Nghị định 96/2023 [TC]: chỉ người hành nghề thuộc cơ sở có giấy phép mới được khám chữa bệnh từ xa. Cơ sở phải có hạ tầng và phần mềm bảo mật và phải công bố đủ điều kiện.

**Phân tích:**
- Phần mềm tự động không phải "người hành nghề". doctor-v cũng không tạo quan hệ giữa người hành nghề và người bệnh, nên **không thuộc** định nghĩa khám chữa bệnh hay khám chữa bệnh từ xa. Không cần giấy phép hành nghề hay giấy phép hoạt động. *Độ chắc chắn: Trung bình.*
- Lưu ý: nội dung định nghĩa "khám bệnh" (đánh giá tình trạng, nguy cơ và nhu cầu chăm sóc) trùng một phần với chức năng triage. Cơ quan quản lý có thể lập luận về "khám chữa bệnh trá hình" nếu sản phẩm **tự giới thiệu** như dịch vụ khám.

**Hành vi bị cấm cần tránh (Điều 7)** [XM]:
- Khoản 3: khám chữa bệnh mà không đáp ứng điều kiện của Điều 19 (giấy phép).
- Khoản 9: gợi ý chuyển người bệnh tới cơ sở khác nhằm trục lợi. Liên quan nếu sau này có phí giới thiệu từ phòng khám.
- Khoản 15.a: cơ sở cung cấp dịch vụ khi không có giấy phép hoạt động.
- Khoản 17: lợi dụng hình ảnh, tư cách người hành nghề để khuyến khích phương pháp chưa được công nhận.
- Khoản 20: "lợi dụng kiến thức y học để quảng cáo gian dối về khám bệnh, chữa bệnh".

**Hệ quả thiết kế:**
- Không dùng "khám", "bác sĩ AI", "chẩn đoán", "kê đơn".
- Không đưa tên thuốc hay liều dùng.
- Nếu muốn thêm tư vấn với bác sĩ thật: hợp tác với một cơ sở khám chữa bệnh có giấy phép và đã công bố đủ điều kiện khám chữa bệnh từ xa. Cơ sở đó và người hành nghề chịu trách nhiệm chuyên môn.
- Dự án luật sửa đổi trình tháng 10/2026 tập trung vào hình thức tổ chức, phân cấp và giá dịch vụ. Chưa thấy nội dung về khám từ xa hay AI [TC].

### 3.3 Thông tin sức khỏe trên mạng và quảng cáo (mục 3)

**Luật Quảng cáo, sửa bởi Luật 75/2025/QH15** (thông qua 16/06/2025, hiệu lực 01/01/2026) [XM]:
- **Khái niệm quảng cáo (Điều 2.1 mới):** "việc sử dụng người, phương tiện nhằm giới thiệu đến người tiếp nhận quảng cáo về sản phẩm, hàng hóa, dịch vụ, tổ chức, cá nhân sản xuất, kinh doanh…".
  - Gợi ý một **chuyên khoa** chung chung không phải quảng cáo.
  - Giới thiệu một **phòng khám hay nhãn hàng cụ thể**, nhất là khi có thu phí, có thể trở thành quảng cáo.
- **Điều 19.1:** nội dung quảng cáo "phải trung thực, chính xác, rõ ràng; không gây hiểu nhầm về tính năng, chất lượng, công dụng, tác dụng…".
- **Điều 20.1:** quảng cáo hoạt động kinh doanh phải có giấy chứng nhận đăng ký kinh doanh.
- **Điều 20.4:** sản phẩm đặc biệt phải có giấy tờ chứng nhận được phép lưu hành. Hai điểm liên quan:
  - đ) quảng cáo dịch vụ khám chữa bệnh phải có giấy phép hành nghề hoặc giấy phép hoạt động;
  - e) quảng cáo thiết bị y tế phải có số lưu hành.
- **Điều 23 (quảng cáo trên mạng):**
  - Phải có "dấu hiệu nhận diện rõ ràng" để phân biệt quảng cáo với nội dung khác.
  - Quảng cáo không ở vùng cố định phải có tính năng tắt và báo vi phạm.
  - Nội dung ở đường dẫn quảng cáo cũng phải hợp pháp.
  - Không đặt quảng cáo cạnh nội dung vi phạm.

**Nghị định 342/2025/NĐ-CP** (26/12/2025, hiệu lực 15/02/2026 [XM qua chú thích VBHN]) [TC về nội dung]:
- Danh mục sản phẩm, dịch vụ đặc biệt (Điều 3) gồm thuốc, thiết bị y tế, dịch vụ khám chữa bệnh, mỹ phẩm, thực phẩm…
- Quảng cáo thiết bị y tế (Điều 8) phải có tên, mục đích sử dụng, số lưu hành hoặc giấy phép nhập khẩu, cảnh báo, và không được dùng hình ảnh, thông tin của bác sĩ, dược sĩ hay cơ sở y tế.
- Quảng cáo dịch vụ khám chữa bệnh (Điều 9) phải nêu tên, địa chỉ, số giấy phép, thời gian hoạt động và phạm vi chuyên môn.

**Nghị định 147/2024/NĐ-CP** (09/11/2024; hiệu lực 25/12/2024 [TC]) [XM nội dung]:
- **Điều 3.23:** "Trang thông tin điện tử cung cấp dịch vụ chuyên ngành là trang thông tin điện tử cung cấp các dịch vụ liên quan đến các lĩnh vực giáo dục… **y tế**…".
- **Điều 3.21 và 3.22:** định nghĩa trang nội bộ (của tổ chức, doanh nghiệp, về chức năng và sản phẩm của chính mình) và trang cá nhân.
- **Điều 24.2:** các trang "**không phải cấp phép**" gồm trang dịch vụ chuyên ngành, trang cá nhân, trang nội bộ…
- **Điều 24.3:** các trang này "khi có cung cấp **thông tin tổng hợp** thì phải có Giấy phép thiết lập trang thông tin điện tử tổng hợp".
- **Điều 3.17:** thông tin tổng hợp là "thông tin đã được đăng, phát trên báo chí Việt Nam và thông tin đã được đăng phát trên các trang thông tin điện tử của các tổ chức của Đảng, cơ quan Nhà nước".
- **Điều 21.4:** nội dung trên trang dịch vụ chuyên ngành tuân theo pháp luật chuyên ngành, ở đây là pháp luật y tế.
- **Điều 24.4:** phải gỡ nội dung vi phạm chậm nhất **24 giờ** khi có yêu cầu.
- Bộ Văn hóa, Thể thao và Du lịch đang soạn nghị định sửa đổi Nghị định 147 (hội thảo ngày 23/7/2026) [TC].

**Trả lời câu hỏi "có cần giấy phép không?":**
- **Không**, nếu doctor-v chỉ đăng nội dung tự biên soạn.
- Nên dẫn nguồn bằng liên kết, không sao chép bài báo hay bài của cơ quan nhà nước.
- *Độ chắc chắn: Cao.*

**Quy định về nội dung thông tin y tế:**
- Không có chế độ cấp phép riêng cho nội dung thông tin sức khỏe. Ràng buộc đến từ: Luật Khám bệnh, chữa bệnh Điều 7 khoản 17 và 20; Luật Quảng cáo Điều 19; các quy định cấm tin giả (Nghị định 147, Điều 3.18).
- **Thông tư 53/2014/TT-BYT** [TC] áp dụng với "cơ quan, tổ chức, cá nhân tham gia xây dựng và triển khai các hoạt động y tế trên môi trường mạng".
  - Hoạt động này được hiểu là "thông tin y tế được cung cấp, truyền đưa, thu thập, xử lý, lưu trữ và trao đổi" qua hạ tầng thông tin.
  - Yêu cầu: hạ tầng; chính sách an toàn và bảo mật thông tin; nhân lực công nghệ thông tin; tôn trọng bí mật riêng tư của người bệnh.
  - Mức độ áp dụng với một web tĩnh nhỏ **không rõ**. Chi phí tuân thủ thấp: có văn bản chính sách an toàn thông tin, HTTPS, CSP và quy trình cập nhật.
- Luật Báo chí 2025 (126/2025/QH15) [TC]: không đưa tin thời sự, tránh hoạt động như báo chí.
- Thông tin thuốc chịu sự điều chỉnh của Luật Dược (điều khoản cụ thể CHƯA XÁC MINH), nên tránh nêu tên và liều thuốc.

### 3.4 Bảo vệ dữ liệu cá nhân (mục 4)

**Hiện trạng văn bản** [XM]:
- **Luật 91/2025/QH15**: thông qua 26/06/2025, hiệu lực 01/01/2026.
- **Nghị định 356/2025/NĐ-CP**: ban hành 31/12/2025, hiệu lực 01/01/2026.
- **Nghị định 13/2023/NĐ-CP "hết hiệu lực kể từ ngày Nghị định này có hiệu lực"** (Điều 42.2 Nghị định 356), tức từ 01/01/2026.
- Luật 91, Điều 39: sự đồng ý và hồ sơ đã lập theo Nghị định 13 vẫn tiếp tục có giá trị.

**Định nghĩa** [XM]:
- Luật 91, Điều 2.1: dữ liệu cá nhân là dữ liệu "xác định hoặc giúp xác định một con người cụ thể… Dữ liệu cá nhân sau khi **khử nhận dạng** không còn là dữ liệu cá nhân."
- Điều 2.6: xử lý dữ liệu gồm thu thập, phân tích, tổng hợp, …, chuyển giao.
- Điều 2.7: bên kiểm soát là bên "quyết định mục đích và phương tiện xử lý".
- **Nghị định 356, Điều 4.1 (dữ liệu nhạy cảm):** "d) **Tình trạng sức khỏe**"; "l) **Dữ liệu theo dõi hành vi, hoạt động sử dụng** dịch vụ viễn thông, mạng xã hội, dịch vụ truyền thông trực tuyến và **các dịch vụ khác trên không gian mạng**". Theo EY [TC], khái niệm thông tin sức khỏe được mở rộng thành "tình trạng sức khỏe", không còn giới hạn trong hồ sơ bệnh án.

**Nghĩa vụ chính** [XM, trừ khi ghi khác]:

| Nghĩa vụ | Căn cứ | Nội dung |
|---|---|---|
| Đồng ý | Luật 91 Điều 9, 11.1, 26.1.a; Nghị định 356 Điều 6 | Tự nguyện và biết rõ loại dữ liệu, mục đích, bên kiểm soát, quyền. Đồng ý **theo từng mục đích**. "Sự im lặng hoặc không phản hồi không được coi là sự đồng ý." Phải kiểm chứng được và lưu bằng chứng. "Không được thiết lập phương thức mặc định đồng ý". Với dữ liệu nhạy cảm, chủ thể "phải được thông báo rằng dữ liệu cần xử lý là dữ liệu cá nhân nhạy cảm". Thông tin sức khỏe bắt buộc có đồng ý (trừ ngoại lệ ở Điều 19.1, ví dụ trường hợp cấp bách bảo vệ tính mạng). |
| Ứng dụng y tế | Điều 26.3 | "Tổ chức, cá nhân phát triển ứng dụng về y tế… phải tuân thủ đầy đủ quy định về bảo vệ dữ liệu cá nhân." |
| Thông báo và minh bạch | Điều 4.1.a; Nghị định 356 Điều 10.3 | Chủ thể có quyền "được biết". Nếu xử lý tự động phải "thông báo… giải thích nguyên tắc hoạt động của thuật toán… đưa ra các lựa chọn để chủ thể dữ liệu có quyền không tham gia". |
| Quyền chủ thể | Điều 4; Nghị định 356 | Xem, sửa, xóa, hạn chế, phản đối, rút lại đồng ý. Thời hạn trả lời khoảng 2 ngày làm việc; xóa trong 20–30 ngày [TC: EY, Frasers]. |
| DPIA | Điều 21, 22 | Lập và gửi bản chính cho Cục A05 (Bộ Công an) trong **60 ngày** kể từ lần xử lý đầu tiên. Cập nhật 6 tháng một lần khi có thay đổi. Theo Nghị định 356, hồ sơ được tiền kiểm, A05 đánh giá trong 15 ngày [TC: EY]. |
| CTIA (chuyển dữ liệu xuyên biên giới) | Điều 20 | Gồm cả trường hợp "c) … sử dụng **nền tảng ở ngoài lãnh thổ** Việt Nam để xử lý dữ liệu cá nhân được thu thập tại Việt Nam". Lập hồ sơ và gửi trong **60 ngày** kể từ lần chuyển đầu tiên. Không phải lập nếu "c) Chủ thể dữ liệu cá nhân **tự chuyển** dữ liệu cá nhân của mình xuyên biên giới" (khoản 6) và các ngoại lệ ở Nghị định 356 Điều 17.3. |
| Thông báo vi phạm | Điều 23 | Báo A05 chậm nhất **72 giờ**. |
| Nhân sự hoặc bộ phận bảo vệ dữ liệu (DPO) | Điều 33.2; Nghị định 356 | Cơ quan, tổ chức phải chỉ định người hoặc bộ phận đủ điều kiện, hoặc thuê dịch vụ. Nhân sự cần trình độ cao đẳng trở lên và 2 năm kinh nghiệm [TC]. |
| Hợp đồng với bên xử lý | Điều 37.2.a | Bên xử lý chỉ nhận dữ liệu sau khi có thỏa thuận hoặc hợp đồng. Nghị định 356 nêu nội dung bắt buộc của thỏa thuận chuyển giao [TC]. |
| AI | Điều 30.4 | "Việc xử lý dữ liệu cá nhân bằng trí tuệ nhân tạo phải thực hiện phân loại theo mức độ rủi ro". |
| Trẻ em | Điều 24 | Người đại diện theo pháp luật thực hiện quyền thay trẻ. |
| Chế tài | Điều 8 | Phạt tối đa 3 tỷ đồng (cá nhân bằng 1/2). Vi phạm về chuyển dữ liệu xuyên biên giới phạt tối đa 5% doanh thu năm trước. Mua bán dữ liệu phạt tối đa 10 lần khoản thu. |

**Miễn trừ cho doanh nghiệp nhỏ** [XM]:
- **Điều 38.2:** doanh nghiệp nhỏ và doanh nghiệp khởi nghiệp "được quyền lựa chọn thực hiện hoặc không thực hiện" Điều 21, Điều 22 (DPIA) và Điều 33.2 (DPO) trong **5 năm** từ 01/01/2026.
- **Điều 38.3:** hộ kinh doanh và doanh nghiệp siêu nhỏ được miễn hẳn.
- **Ngoại lệ:** miễn trừ không áp dụng nếu đơn vị kinh doanh dịch vụ xử lý dữ liệu, "**trực tiếp xử lý dữ liệu cá nhân nhạy cảm**", hoặc xử lý dữ liệu của số lượng lớn chủ thể. Nghị định 356 Điều 41 đặt ngưỡng "từ **100 nghìn** chủ thể".
- Miễn trừ chỉ dành cho doanh nghiệp và hộ kinh doanh. Không có điều khoản tương đương cho cá nhân hay tổ chức phi lợi nhuận.
- Miễn trừ chỉ gồm DPIA và DPO, **không** gồm CTIA hay nghĩa vụ đồng ý.

**Rủi ro "dịch vụ xử lý dữ liệu cá nhân"** [XM qua bản LuatVietnam]:
- Nghị định 356, Điều 21.4 liệt kê "Dịch vụ thu thập, xử lý dữ liệu cá nhân qua trang web, ứng dụng, phần mềm chăm sóc sức khỏe, theo dõi sức khỏe, dịch vụ y tế".
- Điều 22–27 đặt điều kiện kinh doanh và yêu cầu giấy chứng nhận do Bộ Công an cấp.
- Phạm vi của khái niệm này đối với một ứng dụng tự xử lý dữ liệu của chính người dùng mình **chưa rõ**. Đây là rủi ro cần luật sư đánh giá nếu sau này có xử lý phía máy chủ.

**Áp dụng cho từng kịch bản của doctor-v:**

1. **Suy luận hoàn toàn trên thiết bị, không gửi gì về.**
   - doctor-v không "thu thập" (Điều 11.1) và không nắm giữ dữ liệu. Vì vậy các nghĩa vụ gắn với việc nắm giữ (đồng ý trước khi thu, DPIA, đáp ứng yêu cầu chủ thể, báo cáo vi phạm) trên thực tế không phát sinh.
   - Rủi ro lập luận ngược: doctor-v vẫn "quyết định mục đích và phương tiện" của phần xử lý do code thực hiện trên máy người dùng (Điều 2.7). Luật Việt Nam không có ngoại lệ "mục đích cá nhân, gia đình" rõ ràng như GDPR.
   - *Độ chắc chắn: Trung bình.* Cách thực hành an toàn:
     - Có thông báo quyền riêng tư nói rõ dữ liệu không rời thiết bị.
     - Mặc định không lưu lịch sử; nếu lưu thì có nút xóa.
     - Không nạp script hay font của bên thứ ba (Google Fonts, CDN, mạng quảng cáo…) vì chúng làm lộ IP và có thể lộ nội dung.
     - Dùng CSP nghiêm ngặt và *Subresource Integrity* để chặn rò rỉ ra ngoài.
     - **Không bao giờ đưa câu trả lời vào URL**, vì URL đi vào log máy chủ và CDN.
2. **Log của dịch vụ hosting hoặc CDN (IP, user-agent).**
   - IP có thể "giúp xác định" một người. Nghị định 356 Điều 3.11 có điều khoản chung cho "thông tin khác… giúp xác định".
   - Nếu hosting ở nước ngoài, có thể bị coi là "sử dụng nền tảng ở ngoài lãnh thổ" (Điều 20.1.c), dẫn tới khả năng phải lập CTIA.
   - **Không chắc chắn.** Giảm thiểu: chọn nhà cung cấp cho tắt log hoặc giữ log ngắn hạn, hoặc hosting tại Việt Nam; ghi nhận rõ trong thông báo quyền riêng tư.
3. **Analytics hoặc cookie.**
   - Dữ liệu theo dõi hành vi gắn với định danh là **dữ liệu nhạy cảm** (Điều 4.1.l). Khi đó cần đồng ý rõ ràng, phải thông báo đây là dữ liệu nhạy cảm, phải lập DPIA (không được miễn trừ), và cần CTIA nếu công cụ ở nước ngoài, ví dụ GA4.
   - Analytics tự host, không cookie, không định danh, không lưu IP và chỉ đếm tổng hợp lượt xem trang có thể coi là dữ liệu đã khử nhận dạng (Điều 2.1).
   - **Tuyệt đối không gửi sự kiện chứa triệu chứng.**
   - Luật 91 không có quy định cookie chung. Nghĩa vụ cho người dùng tùy chọn từ chối cookie và "không theo dõi" ở Điều 29 chỉ áp dụng cho mạng xã hội và dịch vụ truyền thông trực tuyến. Dù vậy, quy định về đồng ý vẫn áp dụng cho dữ liệu cá nhân mà cookie thu.
4. **Công cụ báo lỗi (Sentry…).** Công cụ có thể chụp trạng thái chứa triệu chứng. Hoặc bỏ hẳn, hoặc cấu hình xóa toàn bộ dữ liệu ứng dụng và chỉ gửi stack trace.
5. **Tùy chọn gửi văn bản tự do tới API AI ở nước ngoài.** Đây là kịch bản nặng nhất.
   - Bản chất: văn bản là dữ liệu sức khỏe nhạy cảm, thường lẫn tên, tuổi, nơi ở; việc gửi đi là chuyển dữ liệu xuyên biên giới (Điều 20.1.b, c).
   - Nghĩa vụ phát sinh:
     - đồng ý riêng cho mục đích này, ô chưa tick sẵn, có báo rõ đây là dữ liệu nhạy cảm;
     - DPIA và CTIA nộp A05 trong 60 ngày (có tiền kiểm);
     - hợp đồng xử lý dữ liệu với nhà cung cấp AI (Điều 37.2.a), bên cạnh điều khoản chuẩn của họ;
     - mã hóa khi truyền;
     - thông báo về xử lý tự động (Nghị định 356 Điều 10.3);
     - quy trình đáp ứng quyền chủ thể và báo vi phạm trong 72 giờ;
     - DPO (không được miễn vì xử lý dữ liệu nhạy cảm);
     - có thể vướng khái niệm "dịch vụ xử lý dữ liệu cá nhân" nếu thương mại.
   - Phương án giảm nghĩa vụ:
     - chạy mô hình nhỏ ngay trên thiết bị (WebGPU), không chuyển dữ liệu đi;
     - dùng mô hình đặt tại Việt Nam (vẫn cần DPIA, nhưng tránh CTIA);
     - người dùng tự dùng khóa API của mình. Khi đó có thể lập luận theo ngoại lệ "chủ thể tự chuyển" (Điều 20.6.c), nhưng **không chắc**, và trải nghiệm kém cho người dùng phổ thông;
     - lọc thông tin định danh ngay trên thiết bị trước khi gửi; chỉ gửi mã triệu chứng có cấu trúc thay vì văn bản tự do;
     - chọn nhà cung cấp cam kết không lưu và không dùng dữ liệu để huấn luyện.
6. **Phản hồi hoặc liên hệ tự nguyện (email).** Có thu dữ liệu nên cần thông báo và đồng ý. Nếu người dùng tự mô tả bệnh trong thư thì đó là dữ liệu nhạy cảm, nên tách kênh và hạn chế.

**Những gì vẫn còn khi mọi xử lý nằm trên thiết bị:**
- minh bạch và thông báo quyền riêng tư;
- bảo mật chuỗi cung ứng code;
- không thu ngầm;
- các nghĩa vụ theo Luật AI (nếu là hệ thống AI);
- vấn đề thiết bị y tế: kiến trúc on-device **không** thay đổi bản chất thiết bị y tế;
- trách nhiệm dân sự và quyền lợi người tiêu dùng;
- nghĩa vụ gỡ nội dung theo Nghị định 147.

### 3.5 Quy định về trí tuệ nhân tạo (mục 5)

**Các văn bản và hiệu lực** [XM]:
- **Luật Trí tuệ nhân tạo số 134/2025/QH15**: thông qua 10/12/2025, hiệu lực **01/03/2026** (Điều 34). Gồm 8 chương, 35 điều.
- **Nghị định 142/2026/NĐ-CP**: ban hành 30/04/2026, hiệu lực 01/05/2026 (Điều 45).
- **Quyết định 33/2026/QĐ-TTg**: ban hành 30/06/2026, hiệu lực 15/08/2026, đăng Công báo số 395.
- **Khung đạo đức AI quốc gia**: Thông tư 05/2026/TT-BKHCN, hiệu lực 10/03/2026 [TC].
- Cơ quan đầu mối là Bộ Khoa học và Công nghệ (Điều 30.2.b).

**Định nghĩa và vai trò** (Điều 3) [XM]:
- **Hệ thống AI:** "hệ thống dựa trên máy, được thiết kế để thực hiện các năng lực trí tuệ nhân tạo với các mức độ tự chủ khác nhau, **có khả năng tự thích nghi sau khi được triển khai**; … suy luận từ dữ liệu đầu vào để tạo ra các đầu ra như dự đoán, nội dung, khuyến nghị hoặc quyết định…".
- **Nhà cung cấp:** bên đưa hệ thống AI "vào sử dụng dưới tên, thương hiệu… của mình, không phụ thuộc hệ thống đó do họ tự phát triển hay được phát triển bởi bên thứ ba". Một app tích hợp LLM của bên thứ ba dưới thương hiệu doctor-v vì vậy là nhà cung cấp.
- **Bên triển khai:** bên dùng hệ thống "trong hoạt động nghề nghiệp, thương mại hoặc cung cấp dịch vụ; **không bao gồm** trường hợp sử dụng cho mục đích cá nhân, phi thương mại".

**Phân loại rủi ro** [XM]:
- **Luật, Điều 9.1:**
  - rủi ro **cao**: có thể gây thiệt hại đáng kể đến tính mạng, sức khỏe…;
  - rủi ro **trung bình**: "có khả năng gây nhầm lẫn, tác động hoặc thao túng người sử dụng do không nhận biết được chủ thể tương tác là hệ thống trí tuệ nhân tạo hoặc nội dung do hệ thống tạo ra";
  - rủi ro **thấp**: các trường hợp còn lại.
- **Nghị định 142, Điều 8.1:** tiêu chí rủi ro cao gồm cả việc "Triển khai trong lĩnh vực thiết yếu", trong đó có y tế.
- **Nghị định 142, Điều 8.2:** hệ thống được loại trừ nếu, ví dụ, "d) chỉ thực hiện chức năng phân tích, dự báo, đánh giá, khuyến nghị mang tính tham khảo; nhà cung cấp và bên triển khai không được sử dụng kết quả đầu ra làm căn cứ duy nhất để ra quyết định cuối cùng".
- **Nghị định 142, Điều 9.3:** loại trừ khỏi rủi ro trung bình các hệ thống, ví dụ, "không tương tác, cung cấp trực tiếp dịch vụ hoặc nội dung ra công chúng".
- **Quyết định 33/2026, Mục III (y tế):** chỉ có "Hệ thống trí tuệ nhân tạo hỗ trợ phẫu thuật/rô-bốt phẫu thuật" ở hai biến thể: tích hợp vào rô-bốt can thiệp hoặc dẫn hướng thao tác, và rô-bốt thực thi điều trị mà không cần xác nhận của nhân viên y tế. **Công cụ tra triệu chứng hay triage không có trong danh mục.** Danh mục có thể được sửa; Nghị định 142 Điều 11.5 cho tối đa 12 tháng chuyển tiếp.

**Nghĩa vụ** [XM]:
- **Điều 10.1, 10.3:** nhà cung cấp **tự phân loại** trước khi đưa vào sử dụng. Hệ thống rủi ro trung bình hoặc cao phải có hồ sơ phân loại và **thông báo cho Bộ Khoa học và Công nghệ qua Cổng thông tin một cửa trước khi đưa vào sử dụng**. Hệ thống rủi ro thấp được khuyến khích công khai thông tin cơ bản.
- **Điều 11 (minh bạch):**
  - khoản 1: hệ thống tương tác trực tiếp với con người phải được thiết kế để người dùng "nhận biết khi đang tương tác với hệ thống";
  - khoản 2: âm thanh, hình ảnh, video do AI tạo phải đánh dấu ở định dạng máy đọc;
  - khoản 3: bên triển khai phải "thông báo rõ ràng khi cung cấp ra công cộng văn bản… được tạo ra hoặc chỉnh sửa bằng hệ thống trí tuệ nhân tạo nếu nội dung đó có khả năng gây nhầm lẫn về tính xác thực của sự kiện, nhân vật".
  - Theo Frasers [TC], Nghị định 142 miễn gắn nhãn cho văn bản chỉ được "sửa lỗi chính tả, ngữ pháp, tóm tắt, diễn giải hoặc dịch thuật mà không làm sai lệch nội dung cơ bản".
- **Điều 15:** hệ thống rủi ro trung bình phải minh bạch và giải trình khi cơ quan nhà nước yêu cầu. Hệ thống rủi ro thấp chỉ giải trình khi có dấu hiệu vi phạm.
- **Điều 12 (sự cố):** theo Nghị định 142 [TC], báo cáo sơ bộ trong 72 giờ với sự cố khẩn cấp hoặc 5 ngày làm việc với sự cố khác, báo cáo chính thức trong 15 ngày.
- **Điều 7.2.c (hành vi cấm):** lợi dụng điểm yếu của nhóm dễ tổn thương như trẻ em, người cao tuổi…
- **Điều 29 (bồi thường):** cơ chế bồi thường đặc thù chỉ dành cho hệ thống rủi ro cao. Các trường hợp khác áp dụng luật dân sự.
- **Điều 35 (chuyển tiếp):** hệ thống y tế đã hoạt động trước 01/03/2026 có 18 tháng để tuân thủ. Không áp dụng cho sản phẩm ra mắt mới.

**Luật Công nghiệp công nghệ số (71/2025/QH15, hiệu lực 01/01/2026 [TC]):** Điều 33 Luật AI "Bãi bỏ khoản 9 Điều 3, khoản 7 Điều 4, khoản 6 Điều 12, điểm đ khoản 2 Điều 34 và **Chương IV** của Luật Công nghiệp công nghệ số" [XM]. Các quy định về AI, kể cả việc đánh dấu sản phẩm do AI tạo, giờ chỉ còn nằm trong Luật AI và Nghị định 142.

**Áp dụng cho doctor-v:**

| Thành phần | Có là hệ thống AI không? | Mức rủi ro dự kiến | Nghĩa vụ |
|---|---|---|---|
| Engine quy tắc hoặc Bayes cố định, chạy trên thiết bị | Có thể **không**: không tự thích nghi sau triển khai, nhưng có "suy luận… khuyến nghị" (*Độ chắc chắn: Trung bình*) | Nếu là AI: **thấp** (không có trong danh mục rủi ro cao, thuộc loại trừ 8.2.d, không giả lập con người) | Lưu nội bộ hồ sơ tự phân loại; khuyến khích công khai thông tin cơ bản; giải trình khi được yêu cầu |
| Chatbot hoặc giải thích bằng LLM cho công chúng | **Có** | Nhiều khả năng **trung bình** (giao tiếp với công chúng; không thuộc loại trừ 9.3) | Hồ sơ phân loại; **thông báo Bộ Khoa học và Công nghệ trước khi sử dụng**; báo người dùng đang tương tác với AI; gắn nhãn nội dung AI; giải trình; quy trình sự cố. Theo Nghị định 142, có thể dùng DPIA làm một phần hồ sơ phân loại [TC] |

Lưu ý thêm về lĩnh vực y tế: Điều 6.2.a buộc quản lý rủi ro chặt hơn, trọng tâm là an toàn người bệnh, độ tin cậy thực tế và bảo vệ dữ liệu sức khỏe. Bộ Y tế có thể ra quy định riêng (Điều 6.4). Cần theo dõi.

### 3.6 An ninh mạng và lưu trữ dữ liệu tại Việt Nam (mục 6)

**Hiện trạng văn bản:**
- **Luật An ninh mạng 2018** (24/2018/QH14, hiệu lực 01/01/2019 [TC]) và **Nghị định 53/2022/NĐ-CP** (Điều 26 về lưu trữ dữ liệu và đặt chi nhánh; ngày ban hành, ngày hiệu lực và nguyên văn: **CHƯA XÁC MINH** trong phiên).
- Theo hiểu biết của người viết (chưa đối chiếu nguyên văn), Điều 26 Nghị định 53/2022 có ba ý:
  - Doanh nghiệp trong nước thu, khai thác, phân tích hoặc xử lý dữ liệu người dùng tại Việt Nam phải lưu trữ dữ liệu đó tại Việt Nam. Dữ liệu này gồm thông tin cá nhân, dữ liệu do người dùng tạo ra và dữ liệu về các mối quan hệ của người dùng.
  - Doanh nghiệp nước ngoài thuộc một số ngành chỉ phải lưu trữ tại Việt Nam khi Bộ Công an có yêu cầu, sau khi doanh nghiệp không hợp tác xử lý vi phạm.
  - Thời gian lưu trữ tối thiểu 24 tháng.
- **Luật An ninh mạng 2025** (116/2025/QH15, thông qua 10/12/2025) [TC]. Ngày hiệu lực, việc thay thế Luật 2018 và Luật An toàn thông tin mạng 2015, và văn bản hướng dẫn mới: **CHƯA XÁC MINH**. Ngày 29/06/2026, LuatVietnam vẫn xếp luật này vào nhóm "chưa áp dụng", phù hợp với thông tin hiệu lực dự kiến từ 01/07/2026, nhưng thông tin này chưa được kiểm chứng.

**Áp dụng cho doctor-v:**
- App không thu và không lưu dữ liệu người dùng nên **không phát sinh** nghĩa vụ lưu trữ dữ liệu tại Việt Nam. *Độ chắc chắn: Trung bình*, vì chưa đối chiếu luật 2025.
- Vẫn còn các nghĩa vụ chung:
  - phối hợp gỡ nội dung vi phạm trong 24 giờ (Nghị định 147 Điều 24.4);
  - không đăng nội dung bị cấm hay tin giả;
  - vệ sinh an ninh cơ bản. Code tĩnh chứa logic y khoa, nên **tính toàn vẹn** của code (build có ký, SRI, kiểm soát quyền deploy) là vấn đề an toàn người bệnh.
- Nếu sau này có tài khoản hoặc đồng bộ dữ liệu, phải rà soát lại nghĩa vụ lưu trữ trong nước theo Luật An ninh mạng 2025 và Luật Dữ liệu 60/2024/QH15. Nghị định 356 đã sửa Nghị định 165/2025: với dữ liệu cá nhân thuộc nhóm dữ liệu cốt lõi hoặc quan trọng, chỉ cần DPIA và CTIA theo luật bảo vệ dữ liệu cá nhân [TC: EY].

### 3.7 Đối chiếu quốc tế (mục 7)

**EU: MDR 2017/745, Phụ lục VIII, Quy tắc 11** (nguyên văn qua MDCG 2019-11 rev.1, 06/2025) [XM]:

> "Software intended to provide information which is used to take decisions with diagnosis or therapeutic purposes is classified as **class IIa**, except if such decisions have an impact that may cause: death or an irreversible deterioration of a person's state of health, in which case it is in **class III**; or a serious deterioration of a person's state of health or a surgical intervention, in which case it is classified as **class IIb**. […] All other software is classified as class I."

- MDCG cho rằng Quy tắc 11a mô tả "mode of action" của hầu hết phần mềm y tế, nên gần như mọi phần mềm có mục đích y tế đều từ IIa trở lên. Loại IIa trở lên cần tổ chức chứng nhận (*notified body*).
- Bước 4 trong cây quyết định của MDCG: phần mềm **không** vì lợi ích của từng bệnh nhân (chỉ đưa "generic diagnostic or treatment pathways", tài liệu khoa học…) thì không phải thiết bị y tế.
- Bản rev.1 có ví dụ: phần mềm chấm điểm trầm cảm từ triệu chứng là loại IIb.
- Có thêm MDCG 2025-6 về quan hệ giữa MDR và AI Act (06/2025, chưa đọc nội dung).

**Doanh nghiệp tiêu biểu** [XM]:
- **Ada:** "Ada Assess is a **Class IIA** medical device registered under Regulation (EU) 2017/745 (MDR)". Cùng văn bản ghi "NEITHER ADA ASSESS, NOR OUR WEBSITE MAKE ANY MEDICAL DIAGNOSES."
- **Infermedica:** "MGP is certified as a **Class IIb** medical device under EU MDR and registered with the UK MHRA". MGP gồm các mô-đun Triage, Intake và Follow-up; mục đích sử dụng là "guiding users via symptom questionnaires to recommend appropriate care settings". Tại Mỹ, Infermedica cho biết sản phẩm "operates under FDA **enforcement discretion**".
- **Ý nghĩa cho doctor-v:** một sản phẩm tương tự ở EU sẽ là IIa hoặc IIb, cần hệ thống quản lý chất lượng ISO 13485, quy trình phần mềm IEC 62304, quản lý rủi ro ISO 14971 và đánh giá lâm sàng.

**Mỹ: FDA** [XM]:
- Hướng dẫn CDS bản cuối ngày **29/01/2026** (thay bản 06/01/2026), số hồ sơ FDA-2017-D-6569: "Software functions that support or provide recommendations to **patients or caregivers – not HCPs – meet the definition of a device**." Như vậy phần mềm dành cho bệnh nhân không thể là "Non-Device CDS", vì Tiêu chí 3 yêu cầu người dùng là nhân viên y tế.
- Hướng dẫn *Policy for Device Software Functions and Mobile Medical Applications* (28/09/2022), Phụ lục B, liệt kê những chức năng FDA "intends to exercise enforcement discretion":
  - "7. Software functions that use a checklist of common signs and symptoms to provide a list of possible medical conditions and advice on when to consult a health care professional."
  - "8. Software functions that guide a user through a questionnaire of signs and symptoms to provide a recommendation for the type of health care facility most appropriate to their needs."
- Đây là chính sách tạm thời, không phải miễn trừ. Hướng dẫn của FDA "do not establish legally enforceable responsibilities".

**Anh: MHRA** [XM] (*Medical device stand-alone software including apps* v1.10g; trang cập nhật 01/07/2023; Phụ lục 1 v1.10f):
- Kết quả "có thể là thiết bị": "Software intended to output a subset of those medical conditions that match the input symptoms", "Software that indicates the likelihood of a match", phần mềm có bộ lọc theo dấu hiệu nguy hiểm, mức độ nặng hoặc xác suất.
- "Unlikely to be devices": "Software that only signposts the user to suitable care e.g. see your GP, go to A&E"; danh sách xếp theo thứ tự alphabet, không theo khả năng mắc.
- "Symptom checker devices will be **class I** unless considered to 'allow direct diagnosis', in which case they will be **class IIa**". Với người dùng không chuyên: "provision of an indicative diagnosis may be enough to imply that the device is allowing direct diagnosis".
- Về lời từ chối trách nhiệm: "if an app qualifies as a medical device… it will still need to comply with UK MDR 2002".
- Kế hoạch cải cách sau năm 2023 của MHRA: CHƯA XÁC MINH.

### 3.8 Hướng dẫn đạo đức của WHO (mục 8)

**WHO, *Ethics and governance of artificial intelligence for health*** (25/06/2021, ISBN 9789240029200) [XM]. Sáu nguyên tắc và cách áp dụng cho doctor-v:

| Nguyên tắc | Áp dụng cho doctor-v |
|---|---|
| 1. Bảo vệ quyền tự chủ của con người | Người dùng quyết định; không thúc ép. Bác sĩ vẫn là người kết luận. |
| 2. Thúc đẩy phúc lợi, an toàn con người và lợi ích công cộng | Thận trọng: ưu tiên phân loại khẩn cấp quá mức hơn là bỏ sót; nguồn tri thức có kiểm định; giám sát sau ra mắt. |
| 3. Minh bạch, có thể giải thích và dễ hiểu | Giải thích "vì sao gợi ý"; công bố phương pháp, nguồn và giới hạn; viết bằng tiếng Việt dễ hiểu. |
| 4. Trách nhiệm và trách nhiệm giải trình | Có bác sĩ duyệt nội dung; ghi phiên bản và nhật ký thay đổi; có kênh báo lỗi an toàn. |
| 5. Hòa nhập và công bằng | Kiểm thử với người cao tuổi, người dân tộc thiểu số, người dùng trình độ đọc thấp; khả năng truy cập; chạy offline, máy cấu hình yếu. |
| 6. AI đáp ứng và bền vững | Cập nhật theo phác đồ mới; đánh giá định kỳ; tối ưu tài nguyên. |

**WHO, *Guidance on large multi-modal models*** (phát hành 18/01/2024, ISBN 9789240084759) [XM]. Các rủi ro nêu cho ứng dụng hướng tới bệnh nhân:
- "Inaccurate, incomplete or false statements" (phát biểu sai, thiếu hoặc không chính xác). Rủi ro tăng khi người dùng không có chuyên môn, "who will have no basis for challenging the response".
- "Manipulation" (thao túng).
- "Privacy": "if a person's identifiable medical information is fed into an LMM, it could be disclosed to third parties".
- "Degradation of interactions between clinicians… and patients" (suy giảm quan hệ thầy thuốc và người bệnh).
- Thiên lệch do tự động hóa (*automation bias*).

Từ đó, nếu doctor-v dùng LLM: LLM chỉ được **diễn giải** kết quả của engine đã kiểm định, không tự chẩn đoán. Không bao giờ được hạ mức khẩn cấp. Có cảnh báo và guardrail cho tình huống cấp cứu. Cần red-team bằng tiếng Việt. Bản cập nhật năm 2025 của hướng dẫn này: CHƯA XÁC MINH.

Thông tư 05/2026/TT-BKHCN [TC] cũng nhấn mạnh việc "kiểm chứng đầu ra của AI cần được chú trọng đối với các nội dung liên quan đến sức khỏe".

---

## 4. Khuyến nghị cho doctor-v

### 4.1 Định vị sản phẩm

**Câu mục đích sử dụng chính thức** (dùng thống nhất trên web, kho ứng dụng, điều khoản sử dụng):

> "doctor-v là công cụ thông tin sức khỏe giúp người dùng phổ thông (từ 16 tuổi) sắp xếp thông tin về triệu chứng, nhận biết dấu hiệu cần cấp cứu và lựa chọn mức độ khẩn cấp, chuyên khoa phù hợp để đi khám; đồng thời cung cấp thông tin giáo dục sức khỏe về một số tình trạng thường gặp. doctor-v không khám bệnh, không chẩn đoán, không điều trị, không kê đơn và không thay thế nhân viên y tế."

**Từ ngữ:**
- Nên dùng: "định hướng đi khám", "mức độ cần lưu ý", "tình trạng có thể liên quan", "thông tin tham khảo", "trao đổi với bác sĩ".
- Tránh: "chẩn đoán", "kết luận bệnh", "bác sĩ AI", "khám online", "chính xác X%".

**Thứ tự hiển thị kết quả:**
1. Hành động và mức khẩn cấp.
2. Lý do.
3. Chuyên khoa nên đến.
4. Danh sách "tình trạng có thể liên quan để trao đổi với bác sĩ".

**Cách trình bày danh sách:** cân nhắc **không hiển thị xác suất hay %**. Thay vào đó gom nhóm, ví dụ "thường gặp", "cần được loại trừ sớm". Đây là đánh đổi có ý thức: xếp hạng theo khả năng là yếu tố chính khiến EU và Anh coi sản phẩm là thiết bị y tế.

### 4.2 Thiết kế giảm rủi ro

**An toàn lâm sàng:**
- Dấu hiệu nguy hiểm được kiểm **trước tiên**. Kết quả 115 hiện ngay, có nút `tel:115`, chạy được offline, không bị chặn bởi bất cứ bước nào.
- Ưu tiên phân loại khẩn cấp quá mức hơn là bỏ sót.
- Mọi kết quả tự chăm sóc đều có hướng dẫn an toàn kèm theo ("nếu sau 48 giờ không đỡ hoặc xuất hiện… thì đi khám").
- Một bác sĩ có giấy phép duyệt nội dung và quy tắc. Ghi nguồn cho từng quy tắc (hướng dẫn của Bộ Y tế, WHO…).
- Bộ ca kiểm thử (*vignettes*) có ngưỡng đạt trước mỗi lần phát hành.
- Ghi phiên bản cho cơ sở tri thức; công khai nhật ký thay đổi; có kênh báo lỗi an toàn.

**Dữ liệu:**
- Chỉ xử lý trên thiết bị. Không đưa dữ liệu vào URL. Mặc định không lưu; nếu lưu thì có nút "Xóa dữ liệu".
- Không dùng script, font hay CDN của bên thứ ba. Dùng CSP và SRI.
- Không dùng analytics theo dõi. Nếu cần thì tự host, không cookie, chỉ đếm tổng hợp, không bao giờ gửi triệu chứng.
- Chọn hosting không lưu log IP, hoặc lưu ngắn hạn.

**AI (nếu làm):**
- Bật theo lựa chọn của người dùng (opt-in), mặc định tắt.
- Lọc thông tin định danh ngay trên thiết bị.
- LLM chỉ diễn giải kết quả của engine. Không thay đổi phân loại khẩn cấp theo hướng giảm.
- Gắn nhãn "Nội dung do AI tạo".
- Hoàn tất DPIA, CTIA và thông báo phân loại cho Bộ Khoa học và Công nghệ **trước** khi bật. Dự trù vài tuần vì A05 tiền kiểm hồ sơ.

**Đối tượng:** khuyến cáo người dùng dưới 16 tuổi dùng cùng cha mẹ. Hướng dẫn riêng cho trẻ nhỏ, phụ nữ mang thai và người cao tuổi: nên đi khám sớm hơn mức gợi ý.

### 4.3 Văn bản cảnh báo (bản nháp tiếng Việt)

**(1) Thanh cảnh báo cố định trên màn hình kết quả:**
> doctor-v cung cấp thông tin sức khỏe tham khảo, **không phải chẩn đoán** và không thay thế việc khám bệnh. Nếu có dấu hiệu nguy hiểm, **gọi 115 ngay**.

**(2) Màn hình trước khi bắt đầu** (người dùng phải bấm "Tôi đã hiểu"):
> **Trước khi bắt đầu**
> - doctor-v giúp bạn sắp xếp thông tin triệu chứng và gợi ý mức độ cần đi khám. Công cụ **không khám bệnh, không chẩn đoán, không kê đơn**.
> - Kết quả chỉ dựa trên câu trả lời của bạn và **có thể sai hoặc thiếu**. Chỉ nhân viên y tế, sau khi thăm khám, mới kết luận được bạn bị bệnh gì.
> - Nếu bạn hoặc người bên cạnh **khó thở, đau ngực, ngất, co giật, yếu hoặc liệt một bên người, nói khó, chảy máu nhiều, lơ mơ**: hãy **gọi 115** hoặc đến cơ sở cấp cứu gần nhất ngay, đừng chờ kết quả.
> - Với trẻ nhỏ, phụ nữ mang thai, người cao tuổi hoặc người có bệnh mạn tính, hãy liên hệ nhân viên y tế **sớm hơn** mức gợi ý.
> - Câu trả lời của bạn được xử lý **ngay trên thiết bị này** và không được gửi về máy chủ của chúng tôi.

**(3) Phía trên danh sách tình trạng:**
> Đây là một số tình trạng **có thể liên quan** đến triệu chứng bạn mô tả, **không phải kết luận bạn mắc bệnh**. Hãy mang danh sách này khi đi khám để trao đổi với bác sĩ.

**(4) Khi kết quả là cấp cứu:**
> **CẢNH BÁO:** Dấu hiệu bạn mô tả có thể là tình trạng cấp cứu. **Gọi 115 ngay** hoặc đến khoa cấp cứu gần nhất. Không tự lái xe nếu bạn thấy choáng, đau ngực hoặc khó thở.

**(5) Kết quả tự chăm sóc:**
> Bạn có thể theo dõi tại nhà, nhưng **hãy đi khám** nếu sau [48 giờ] triệu chứng không đỡ, nặng thêm, hoặc xuất hiện: [danh sách dấu hiệu]. Không tự ý dùng thuốc kê đơn; hãy hỏi dược sĩ hoặc bác sĩ trước khi dùng thuốc.

**(6) Tính năng AI** (mặc định tắt):
> **Tính năng thử nghiệm dùng trí tuệ nhân tạo (AI).** Câu trả lời do AI tạo ra, có thể sai và không phải ý kiến của bác sĩ. Khi bật, đoạn văn bạn nhập sẽ được gửi tới [Tên nhà cung cấp] tại [quốc gia] để xử lý. Đây là **dữ liệu sức khỏe, thuộc dữ liệu cá nhân nhạy cảm**. Đừng nhập họ tên, số điện thoại, địa chỉ hay số giấy tờ.
> ☐ Tôi đồng ý gửi nội dung này để AI xử lý cho mục đích giải thích kết quả. Tôi có thể rút lại đồng ý bất cứ lúc nào trong Cài đặt.

**(7) Chân trang:**
> Nội dung trên doctor-v do [đơn vị hoặc cá nhân] biên soạn, được rà soát chuyên môn bởi [họ tên, chức danh] lần gần nhất ngày [..]. Thông tin chỉ mang tính tham khảo, không dùng để tự chẩn đoán hay tự điều trị. Liên hệ: [email].

### 4.4 Điều khoản sử dụng: nội dung cốt lõi

- Bên cung cấp: tên pháp lý, địa chỉ, liên hệ.
- Bản chất dịch vụ: thông tin, không có quan hệ thầy thuốc và người bệnh, không chẩn đoán, không kê đơn.
- Hướng dẫn khi cấp cứu.
- Độ tuổi: dưới 16 tuổi dùng cùng người đại diện.
- Trách nhiệm của người dùng: trả lời trung thực; không dùng thay ý kiến nhân viên y tế.
- Giới hạn trách nhiệm. **Lưu ý:** điều khoản miễn trừ có thể không có hiệu lực với thiệt hại về tính mạng, sức khỏe hoặc với người tiêu dùng (CHƯA XÁC MINH), cần luật sư soạn.
- Sở hữu trí tuệ và giấy phép nội dung hoặc mã nguồn.
- Thay đổi dịch vụ và điều khoản.
- Luật áp dụng là luật Việt Nam; cơ chế giải quyết tranh chấp.
- Cách chấp nhận điều khoản điện tử (Luật Giao dịch điện tử 20/2023/QH15).

### 4.5 Thông báo quyền riêng tư: nội dung cốt lõi

Căn cứ: Luật 91/2025 Điều 4, 9; Nghị định 356 Điều 6, 10.

- Ai là bên kiểm soát dữ liệu và cách liên hệ.
- Tuyên bố "**xử lý trên thiết bị**": câu trả lời không rời máy; nếu có lưu cục bộ thì lưu gì, ở đâu, xóa thế nào.
- Danh sách đầy đủ những gì có thể rời máy: log của hosting (IP; nhà cung cấp và quốc gia), số liệu tổng hợp nếu có, email phản hồi.
- Tính năng AI (nếu có):
  - loại dữ liệu và mục đích;
  - ghi rõ đây là **dữ liệu nhạy cảm**;
  - nhà cung cấp, quốc gia, thời gian lưu, cam kết không huấn luyện;
  - chuyển dữ liệu xuyên biên giới;
  - cách rút lại đồng ý;
  - thông báo về xử lý tự động.
- Quyền của chủ thể dữ liệu và thời hạn trả lời.
- Dữ liệu của trẻ em.
- Không bán dữ liệu, không quảng cáo theo hành vi.
- Ngày hiệu lực và lịch sử thay đổi.

### 4.6 Những điều cần tránh

- Gọi là "chẩn đoán", "bác sĩ AI", "khám online". Đưa ra "% chính xác" hay cam kết "phát hiện sớm 100%".
- Tên thuốc, liều dùng, phác đồ điều trị, gợi ý mua thuốc.
- Lời chứng thực của người dùng, hình ảnh bác sĩ trong quảng cáo, phần thưởng giới thiệu từ phòng khám (Luật Khám bệnh, chữa bệnh Điều 7 khoản 9, 17, 20; Nghị định 342/2025).
- Nhận quảng cáo thuốc, thiết bị y tế hoặc phòng khám cạnh kết quả triệu chứng.
- Đăng lại tin báo chí (cần giấy phép trang thông tin tổng hợp).
- Pixel, SDK hay analytics theo dõi; đưa dữ liệu vào URL; A/B test có kèm dữ liệu sức khỏe.
- Ô đồng ý tick sẵn; giao diện mập mờ giữa "đồng ý" và "không đồng ý".
- Thu dữ liệu phía máy chủ "cho tương lai".
- Để LLM tự kết luận bệnh hoặc hạ mức khẩn cấp.
- Tuyên bố "không phải thiết bị y tế" trong khi giao diện xếp hạng khả năng mắc bệnh.

### 4.7 Tính năng và nghĩa vụ phát sinh

| Tính năng | Nghĩa vụ phát sinh chính |
|---|---|
| Engine trên thiết bị (hiện tại) | Minh bạch; định vị nhất quán; vấn đề thiết bị y tế còn mở; hồ sơ tự phân loại AI (nếu là AI) |
| Lưu lịch sử cục bộ | Thông báo; nút xóa |
| Analytics tổng hợp tự host | Thông báo; bảo đảm khử nhận dạng |
| Analytics hoặc cookie theo dõi | Đồng ý dữ liệu nhạy cảm, DPIA, CTIA. **Không nên làm.** |
| LLM qua API ở nước ngoài | Đồng ý, DPIA, CTIA nộp A05; hợp đồng xử lý dữ liệu; DPO; thông báo Bộ Khoa học và Công nghệ (rủi ro trung bình); gắn nhãn |
| Tài khoản hoặc đồng bộ | Như trên, cộng thêm rà soát lưu trữ trong nước (Luật An ninh mạng 2025) và rủi ro "dịch vụ xử lý dữ liệu cá nhân" |
| Quảng cáo, affiliate | Luật Quảng cáo (sản phẩm đặc biệt); đăng ký kinh doanh; Luật Khám bệnh, chữa bệnh Điều 7.9 |
| Đặt lịch hoặc giới thiệu phòng khám | Dễ bị coi là quảng cáo dịch vụ khám chữa bệnh; hợp đồng với cơ sở; minh bạch về phí |
| Chat với bác sĩ | Khám chữa bệnh từ xa (Điều 80; Nghị định 96/2023 Điều 87; Thông tư 30/2023) qua cơ sở có phép |

### 4.8 Khi nào cần luật sư

1. **Trước khi ra mắt công khai** (bắt buộc nên làm, ở mức rà soát giới hạn):
   - rà định vị, điều khoản sử dụng, thông báo quyền riêng tư;
   - lập quan điểm về thiết bị y tế;
   - soạn văn bản hỏi Cục Hạ tầng và Thiết bị y tế.
2. **Trước khi bật bất kỳ tính năng nào gửi dữ liệu ra ngoài** (AI, tài khoản, analytics): DPIA, CTIA, hợp đồng xử lý dữ liệu, thông báo theo Luật AI.
3. **Trước khi thương mại hóa hoặc gọi vốn:**
   - pháp nhân;
   - chiến lược thiết bị y tế (công bố loại A/B nếu cần);
   - rủi ro "dịch vụ xử lý dữ liệu cá nhân";
   - bảo vệ người tiêu dùng, thương mại điện tử, quảng cáo, thuế.
4. **Trước khi hợp tác** với phòng khám, bác sĩ, công ty bảo hiểm hoặc nhà tài trợ.
5. **Khi quy mô gần 100.000 người dùng** có dữ liệu được xử lý, hoặc khi có sự cố an toàn.
6. **Khi mở rộng ra EU, Anh hoặc Mỹ:** cần tư vấn regulatory chuyên về thiết bị y tế (MDR, UKCA, FDA).

### 4.9 Phi lợi nhuận hay thương mại

| Khía cạnh | Phi lợi nhuận (dự án cá nhân, cộng đồng, mã nguồn mở, miễn phí) | Thương mại |
|---|---|---|
| Thiết bị y tế | Không có miễn trừ riêng cho bản miễn phí. Rủi ro thực thi thấp hơn vì không "mua bán" | "Lưu hành" vì mục đích thương mại làm câu hỏi về số lưu hành trở nên cấp thiết |
| Luật AI | "Bên triển khai" loại trừ việc dùng "cá nhân, phi thương mại", nhưng khái niệm "nhà cung cấp" **không** có loại trừ này | Đầy đủ vai trò nhà cung cấp và bên triển khai |
| Bảo vệ dữ liệu cá nhân | Áp dụng cả với cá nhân. Miễn trừ doanh nghiệp nhỏ **không** dùng được (chỉ dành cho doanh nghiệp, và không áp dụng với dữ liệu nhạy cảm) | Như bên trái; cộng rủi ro "dịch vụ xử lý dữ liệu cá nhân" (Nghị định 356 Điều 21–27) nếu xử lý phía máy chủ |
| Quảng cáo | Hầu như không áp dụng nếu không có quảng cáo | Đăng ký kinh doanh (Điều 20.1); quy định sản phẩm đặc biệt |
| Người tiêu dùng, thương mại điện tử | Hạn chế | Luật 19/2023/QH15, Luật 122/2025/QH15 (hiệu lực CHƯA XÁC MINH) |
| Trách nhiệm dân sự | Vẫn có. Tình nguyện không tự loại trừ trách nhiệm | Cao hơn; nên cân nhắc bảo hiểm trách nhiệm (Điều 14.5 Luật AI khuyến khích điều này với hệ thống rủi ro cao) |
| Gợi ý | Phù hợp để ra mắt sớm với rủi ro thấp; nên có một pháp nhân hoặc tổ chức chủ quản để đứng tên và nhận trách nhiệm (hình thức cụ thể: CHƯA XÁC MINH) | Lập pháp nhân trước khi có doanh thu; quyết định chiến lược thiết bị y tế trước khi marketing |

---

## 5. Câu hỏi mở và rủi ro

1. **Điều 3.8.a Nghị định 98/2021** có miễn cho phần mềm y tế độc lập không? Cần Cục Hạ tầng và Thiết bị y tế trả lời bằng văn bản. Đây là câu hỏi quan trọng nhất.
2. Nếu doctor-v là thiết bị y tế: loại A, B hay C? Thủ tục "công bố đủ điều kiện sản xuất" áp dụng cho phần mềm thế nào? Hồ sơ công bố tiêu chuẩn cho phần mềm gồm những gì?
3. Engine quy tắc cố định có phải "hệ thống trí tuệ nhân tạo" (Điều 3.2) không? Bộ Khoa học và Công nghệ có thể hướng dẫn khi được hỏi (Điều 10.4).
4. Nhà phát triển một app xử lý dữ liệu trên thiết bị có phải "bên kiểm soát" đối với phần xử lý đó không?
5. Log IP ở hosting nước ngoài có cấu thành "chuyển dữ liệu xuyên biên giới" phải lập CTIA không?
6. Phạm vi của "dịch vụ xử lý dữ liệu cá nhân" qua ứng dụng chăm sóc sức khỏe (Nghị định 356 Điều 21.4)?
7. Thông tư 53/2014/TT-BYT có áp dụng cho một PWA tĩnh không? Văn bản còn hiệu lực đến nay không (vbpl.vn)?
8. Luật An ninh mạng 2025 (116/2025/QH15): ngày hiệu lực, nghĩa vụ lưu trữ dữ liệu mới, nghị định hướng dẫn. Nội dung Nghị định 53/2022 còn áp dụng không?
9. Các thay đổi đang chờ:
   - luật sửa nhiều luật y tế (Kỳ họp thứ 2, khóa XVI);
   - dự thảo nghị định thiết bị y tế 2026;
   - Luật Thiết bị y tế (dự kiến 2029);
   - sửa Nghị định 147/2024;
   - khả năng sửa danh mục AI rủi ro cao;
   - quy định riêng của Bộ Y tế theo Điều 6.4 Luật AI.
10. Trách nhiệm dân sự khi bỏ sót ca cấp cứu: lời từ chối trách nhiệm có tác dụng đến đâu (Bộ luật Dân sự, luật người tiêu dùng; CHƯA XÁC MINH)?
11. Luật Phòng bệnh 114/2025/QH15 có quy định về truyền thông, giáo dục sức khỏe ảnh hưởng tới nội dung không? (CHƯA XÁC MINH)
12. Bằng chứng an toàn lâm sàng: chưa có chuẩn bắt buộc ở Việt Nam, nhưng sẽ là câu hỏi đầu tiên của cơ quan quản lý hoặc tòa án nếu có sự cố.
13. Bản quyền nội dung y khoa sử dụng (phác đồ, hình ảnh, bộ câu hỏi đã công bố): kiểm tra giấy phép của từng nguồn.

---

## 6. Tài liệu tham khảo

Tất cả truy cập ngày 2026-10-24.

1. Bộ Y tế, Văn bản hợp nhất 08/VBHN-BYT (06/03/2026): Nghị định về quản lý thiết bị y tế (Nghị định 98/2021 đã sửa đổi). https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/08-vbhn-byt.pdf
2. Bộ Y tế, Văn bản hợp nhất 12/2026/VBHN-TT-BYT (10/07/2026): Thông tư 05/2022/TT-BYT sửa bởi Thông tư 24/2026/TT-BYT. https://luatvietnam.vn/y-te/van-ban-hop-nhat-12-2026-vbhn-tt-byt-2026-quy-dinh-chi-tiet-thi-hanh-nghi-dinh-98-2021-nd-cp-ve-quan-ly-thiet-bi-y-te-441166-d5.html
3. LuatVietnam (EN), Circular 24/2026/TT-BYT (tóm tắt). https://english.luatvietnam.vn/circular-no-24-2026-tt-byt-dated-june-30-2026-of-the-ministry-of-health-providing-for-risk-classification-and-management-measures-applicable-to-medi-439150-doc1.html
4. Công báo, Nghị định 04/2025/NĐ-CP (trang văn bản). https://congbao.chinhphu.vn/van-ban/nghi-dinh-so-04-2025-nd-cp-43877.htm
5. Nguyễn Đăng Triết, "Quản trị rủi ro đối với thiết bị y tế tích hợp trí tuệ nhân tạo theo pháp luật Việt Nam…", phaply.net.vn (28/07/2026). https://phaply.net.vn/quan-tri-rui-ro-doi-voi-thiet-bi-y-te-tich-hop-tri-tue-nhan-tao-theo-phap-luat-viet-nam-tu-khung-phap-ly-da-tang-den-giam-sat-vong-doi-a262094.html
6. Sức khỏe & Đời sống (13/07/2026), dự thảo nghị định quản lý thiết bị y tế. https://suckhoedoisong.vn/xay-dung-chuoi-cung-ung-thiet-bi-y-te-hien-dai-minh-bach-169260713145647575.htm
7. Sức khỏe & Đời sống (14/07/2026), xây dựng Luật Thiết bị y tế. https://suckhoedoisong.vn/xay-dung-luat-thiet-bi-y-te-chinh-sach-phai-bat-nguon-tu-thuc-tien-lay-nguoi-benh-lam-trung-tam-16926071414270511.htm
8. Đại biểu Nhân dân (01/10/2026), Bộ Y tế trình 4 dự án luật tại Kỳ họp thứ 2. https://daibieunhandan.vn/bo-y-te-trinh-quoc-hoi-4-du-an-luat-ve-y-te-tai-ky-hop-thu-2-10432402.html
9. Luật Khám bệnh, chữa bệnh 15/2023/QH15 (toàn văn). https://hoatieu.vn/phap-luat/luat-kham-benh-chua-benh-so-15-2023-qh15-218974
10. Thông tư 30/2023/TT-BYT (tệp trên vbpl.vn; chưa mở tệp gốc). https://vbpl.vn/TW/Lists/vbpq/Attachments/178262/30_2023_TT-BYT_593328.doc
11. Luật 75/2025/QH15 sửa đổi Luật Quảng cáo (PDF). https://cdn.thuvienphapluat.vn/uploads/tintuc/2025/07/01/luat-so-75-sd-bs-quang-cao.pdf. Trang Công báo: https://congbao.chinhphu.vn/van-ban/luat-so-75-2025-qh15-45566/57708.htm
12. LuatVietnam, "07 điểm mới của Nghị định 342/2025/NĐ-CP". https://luatvietnam.vn/linh-vuc-khac/diem-moi-cua-nghi-dinh-342-2025-nd-cp-quy-dinh-chi-tiet-luat-quang-cao-883-107004-article.html
13. Nghị định 147/2024/NĐ-CP (bản Công báo 1261+1262, phần 1). https://legalzone.vn/wp-content/uploads/legal-sources/social-media-speech/nghi-dinh-147-2024-nd-cp-internet-thong-tin-mang-phan-1.pdf
14. LuatVietnam, "Có những loại trang thông tin điện tử nào? Loại trang nào không cần cấp phép?". https://luatvietnam.vn/linh-vuc-khac/co-nhung-loai-trang-thong-tin-dien-tu-nao-loai-trang-nao-khong-can-cap-phep-883-100184-article.html
15. Bộ Văn hóa, Thể thao và Du lịch, sửa đổi Nghị định 147/2024 (tin; chưa mở). https://bvhttdl.gov.vn/sua-doi-bo-sung-mot-so-dieu-cua-nghi-dinh-so-1472024nd-cp-xay-dung-mot-khuon-kho-phap-ly-so-hien-dai-minh-bach-on-dinh.htm
16. Thông tư 53/2014/TT-BYT (LuatVietnam). https://luatvietnam.vn/y-te/thong-tu-53-2014-tt-byt-bo-y-te-92156-d1.html
17. Công báo, Luật 91/2025/QH15 Bảo vệ dữ liệu cá nhân. https://congbao.chinhphu.vn/van-ban/luat-so-91-2025-qh15-45578.htm
18. Nghị định 356/2025/NĐ-CP (toàn văn, LuatVietnam). https://luatvietnam.vn/dan-su/nghi-dinh-356-2025-nd-cp-quy-dinh-chi-tiet-luat-bao-ve-du-lieu-ca-nhan-422896-d1.html
19. EY Việt Nam, Tin nhanh pháp lý tháng 3/2026 về Nghị định 356. https://www.ey.com/content/dam/ey-unified-site/ey-com/vi-vn/technical/tax/documents/ey-vietnam-legal-alert-march-2026-decree-no356-2025-nd-cp-providing-detailed-guidance-for-implementation-of-personal-data-protection-law-viet.pdf
20. Frasers, "Chương mới của bảo vệ dữ liệu cá nhân: Nghị định hướng dẫn…". https://www.frasersvn.com/vi/legal-updates-and-publications/the-next-chapter-in-data-protection-new-decree-guiding-the-personal-data-protection-law
21. Luật Trí tuệ nhân tạo 134/2025/QH15 (DOCX). https://static3.luatvietnam.vn/uploaded/others/2025/12/25/luat-134-2025-qh15_2512152052.docx
22. Nghị định 142/2026/NĐ-CP (toàn văn, LuatVietnam). https://luatvietnam.vn/khoa-hoc/nghi-dinh-142-2026-nd-cp-quy-dinh-chi-tiet-thi-hanh-luat-tri-tue-nhan-tao-433912-d1.html
23. Bộ Tư pháp, giới thiệu Nghị định 142/2026/NĐ-CP. https://khpl.moj.gov.vn/portal/tin-tuc/chi-tiet/gioi-thieu-nghi-inh-so-1422026n-cp-quy-inh-chi-tiet-mot-so-ieu-va-bien-phap-thi-hanh-luat-tri-tue-nhan-tao-th2pbneb5f.html
24. Frasers, cập nhật pháp lý về Nghị định 142 (06/2026). https://www.frasersvn.com/api/uploads/Legal_Update_Decree_142_on_detailed_regulations_and_implementation_measures_VN_7c3dea7e03.PDF
25. Công báo, Quyết định 33/2026/QĐ-TTg. https://congbao.chinhphu.vn/van-ban/quyet-dinh-so-33-2026-qd-ttg-469951/66726.htm
26. LuatVietnam, "Văn bản nào quy định về Khung đạo đức trí tuệ nhân tạo quốc gia?". https://luatvietnam.vn/tin-phap-luat/van-ban-nao-quy-dinh-ve-khung-dao-duc-tri-tue-nhan-tao-quoc-gia-230-112410-article.html
27. LuatVietnam, "Luật Công nghiệp công nghệ số mới nhất và văn bản hướng dẫn". https://luatvietnam.vn/linh-vuc-khac/luat-cong-nghiep-cong-nghe-so-moi-nhat-va-van-ban-huong-dan-883-112293-article.html
28. LuatVietnam, "Danh sách 150 Luật được Quốc hội khóa XV ban hành". https://luatvietnam.vn/linh-vuc-khac/danh-sach-luat-duoc-quoc-hoi-khoa-xv-ban-hanh-883-106039-article.html
29. LuatVietnam, "Danh mục 322 Bộ luật, Luật của Việt Nam". https://luatvietnam.vn/tin-phap-luat/danh-muc-cac-bo-luat-luat-cua-viet-nam-230-18136-article.html
30. MDCG 2019-11 rev.1 (06/2025). https://health.ec.europa.eu/document/download/b45335c5-1679-4c71-a91c-fc7a4d37f12b_en?filename=mdcg_2019_11_en.pdf
31. Ủy ban châu Âu, danh mục hướng dẫn MDCG (gồm MDCG 2025-6). https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en
32. Quy định (EU) 2017/745 (MDR), EUR-Lex. https://eur-lex.europa.eu/eli/reg/2017/745/oj (Quy tắc 11 trích qua tài liệu [30])
33. Ada Health, Terms and Conditions. https://ada.com/terms-and-conditions/
34. Infermedica, trang chủ và Regulatory compliance. https://infermedica.com/ ; https://infermedica.com/regulatory-compliance
35. FDA, Clinical Decision Support Software (29/01/2026). https://www.fda.gov/regulatory-information/search-fda-guidance-documents/clinical-decision-support-software (PDF: https://www.fda.gov/media/109618/download)
36. FDA, Policy for Device Software Functions and Mobile Medical Applications (28/09/2022). https://www.fda.gov/regulatory-information/search-fda-guidance-documents/policy-device-software-functions-and-mobile-medical-applications (PDF: https://www.fda.gov/media/80958/download)
37. MHRA, Medical devices: software applications (apps). https://www.gov.uk/government/publications/medical-devices-software-applications-apps. Phụ lục 1: https://assets.publishing.service.gov.uk/media/64a7d235c531eb000c650051/Appendix_1_-_symptom_checkers.pdf. Hướng dẫn chính: https://assets.publishing.service.gov.uk/media/6abf6c8c943e890cb55e5e52/Medical_device_stand-alone_software_including_apps__including_IVDMDs.pdf
38. WHO (2021), Ethics and governance of artificial intelligence for health. https://iris.who.int/handle/10665/341996 ; https://www.who.int/publications/i/item/9789240029200
39. WHO (2024), Ethics and governance of AI for health: guidance on large multi-modal models. https://iris.who.int/handle/10665/375579 ; https://www.who.int/publications/i/item/9789240084759
