# Nguồn y khoa đặc thù Việt Nam cho doctor-v

- Ngày rà soát: 2026-10-24.
- Phạm vi: 8 nhóm câu hỏi trong brief "Vietnam-specific medical sources".
- Quy ước trạng thái:
  - **[XM]**: đã xác minh trực tiếp trên văn bản gốc hoặc trang của cơ quan chủ quản.
  - **[TC]**: xác minh qua nguồn thứ cấp (CSDL pháp luật tư nhân, báo, trang bệnh viện). Phải đối chiếu bản ký số trước khi dùng làm căn cứ.
  - **CHƯA XÁC MINH**: chưa kiểm chứng được, không dùng làm căn cứ.
- Hạn chế của phiên làm việc:
  - Hạn mức WebSearch hết giữa chừng.
  - who.int, iris.who.int (giao diện HTML), thuvienphapluat.vn và mdpi.com chặn truy cập tự động (403).
  - moh.gov.vn chỉ hiển thị qua JavaScript, không đọc được.
  - Vì vậy một số mục còn CHƯA XÁC MINH (liệt kê ở mục 5).
- Các vấn đề thiết bị y tế (Nghị định 98/2021/NĐ-CP) và dữ liệu cá nhân (Luật 91/2025/QH15) không thuộc phạm vi báo cáo này; xem `docs/research/legal-regulatory.md`.

---

## 1. Tóm tắt

1. **Cơ cấu Bộ Y tế hiện hành** theo Nghị định 313/2026/NĐ-CP, ban hành 08/8/2026, hiệu lực 18/8/2026, thay Nghị định 42/2025/NĐ-CP. Bộ có 19 đơn vị [1][2][3].
   - Vẫn còn **Cục Quản lý Khám, chữa bệnh** (Cục QLKCB, ban hành phác đồ) và **Cục Phòng bệnh** (giám sát dịch; tên cũ "Cục Y tế dự phòng" không còn).
   - Có thêm Cục Bà mẹ và Trẻ em, Cục Bảo trợ xã hội và Trung tâm Thông tin y tế Quốc gia. **[TC]**: VOV và Cổng PBGDPL Cần Thơ; PDF gốc có trên datafiles.chinhphu.vn.
2. **Hướng dẫn chẩn đoán và điều trị (HDCĐ&ĐT) của Bộ Y tế thay đổi nhanh trong 2023–2026.**
   - Bản mới: cúm mùa 1840/QĐ-BYT (2025); sởi 1019/QĐ-BYT (2025); đột quỵ não 3312/QĐ-BYT (2024); viêm gan B 1740/QĐ-BYT (16/6/2026); tay chân miệng 292/QĐ-BYT (2024); lao 162/QĐ-BYT (2024); Dengue 2760/QĐ-BYT (2023); sốt rét 3377/QĐ-BYT (2023); COVID-19 2671/QĐ-BYT (2023); Nipah 493/QĐ-BYT (2026).
   - Nhiều bộ theo chuyên khoa vẫn là bản 2012–2015, và hướng dẫn tăng huyết áp vẫn là **3192/QĐ-BYT (2010)**.
3. **Ba bệnh chưa có HDCĐ&ĐT riêng của Bộ Y tế:**
   - **Ngộ độc methanol**: chỉ là một mục trong "Hướng dẫn chẩn đoán và xử trí ngộ độc" (3610/QĐ-BYT, 2015).
   - **Bệnh dại**: chỉ có "Hướng dẫn giám sát, phòng chống bệnh dại trên người" (1622/QĐ-BYT, 2014), trong đó có phần điều trị dự phòng sau phơi nhiễm.
   - **Liên cầu lợn**: chưa tìm thấy hướng dẫn riêng; chỉ có công văn chỉ đạo của Cục Phòng bệnh (2025).
4. **Bản quyền.** Khoản 2 Điều 15 Luật SHTT loại trừ "văn bản quy phạm pháp luật, văn bản hành chính, văn bản khác thuộc lĩnh vực tư pháp và bản dịch chính thức" khỏi phạm vi bảo hộ.
   - Hướng dẫn chuyên môn "ban hành kèm theo Quyết định" của Bộ trưởng **rất có khả năng là văn bản hành chính**, nên không được bảo hộ quyền tác giả và tái sử dụng được. Ba ngoại lệ cần lưu ý: hình/bảng của bên thứ ba; phần biên tập riêng của bản in NXB Y học hoặc của CSDL pháp luật tư nhân; nghĩa vụ trích dẫn đúng.
   - **Lưu ý:** bản "hiện hành" của Điều 15 không còn là bản sau 2022. Luật 131/2025/QH15 (hiệu lực 01/4/2026) đã bổ sung **khoản 4** (ý tưởng, khẩu hiệu, tiêu đề) và thêm **khoản 5 Điều 7** về khai thác văn bản/dữ liệu cho nghiên cứu và huấn luyện AI [55].
   - Cần ý kiến luật sư SHTT bằng văn bản.
5. **ICD.**
   - Hệ thống **ICD-Vietnam (icd.kcb.vn)** của Cục QLKCB hiện dùng bộ mã **"ICD-10 – 06/2026/TT-BYT"**; bộ cũ được gắn nhãn "Bản trước". Hệ thống có tra cứu song ngữ và một API JSON phục vụ giao diện web, nhưng không công bố giấy phép; chưa thấy file Excel tải về chính thức.
   - Bộ mã nay đi kèm một **Thông tư**, tức là văn bản quy phạm pháp luật (VBQPPL) → nằm ngoài phạm vi bảo hộ quyền tác giả tại Việt Nam.
   - **ICD-11**: trình duyệt WHO bản 2026-01 có 15 ngôn ngữ, không có tiếng Việt. Lộ trình áp dụng tại Việt Nam: CHƯA XÁC MINH.
6. **Dữ liệu cho prior.**
   - **STEPS 2021 [XM]**: tăng huyết áp **26,2%**, đường huyết lúc đói ≥7,0 mmol/L hoặc đang điều trị **7,1%** (18–69 tuổi). Năm 2015 lần lượt là 18,9% và 4,1%. Khoảng 6/10 người tăng huyết áp chưa từng được chẩn đoán.
   - **IHME GBD [XM]**: miễn phí chỉ cho mục đích phi thương mại; thương mại phải trả phí; cấm phân phối lại và cấm tạo bộ dữ liệu phái sinh hoặc tương tự.
   - **WHO data.who.int [XM]**: điều khoản sử dụng ghi dataset theo **CC BY 4.0**, nhưng trang quốc gia lại ghi **CC BY-NC-SA 3.0 IGO**. Hai nguồn mâu thuẫn nên phải xử lý thận trọng.
   - **Niên giám thống kê y tế**: chưa xác minh được bản mới nhất.
7. **Giám sát bệnh truyền nhiễm.** Khung pháp lý mới gồm **Luật Phòng bệnh 114/2025/QH15** và **Thông tư 15/2026/TT-BYT** (hiệu lực 01/7/2026, thay Thông tư 54/2015/TT-BYT), quy định giám sát, báo cáo và phân nhóm bệnh A/B/C [69]. Không có dataset dịch tễ mở theo tuần hoặc tháng; số liệu chỉ rải rác trong công văn và tin báo.
8. **Nhi khoa.**
   - WHO IMCI Chart Booklet 2014 ghi "© WHO 2014. All rights reserved"; sao chép hoặc dịch đều phải xin phép. Đã xác minh nguyên văn các **dấu hiệu nguy hiểm toàn thân** từ văn bản này [72].
   - Bản IMCI của Bộ Y tế ("Xử trí lồng ghép các bệnh thường gặp ở trẻ em"): CHƯA XÁC MINH.
9. **MSD Manuals.** Có **bản tiếng Việt cho chuyên gia** (/vi/professional). Trên cổng tiếng Việt, nút "Phiên bản dành cho Người tiêu dùng" lại dẫn sang **bản tiếng Anh**, nên **hiện chưa có bản tiếng Việt cho người tiêu dùng**. Nội dung © Merck; tái sử dụng phải xin phép [73].
10. **Số khẩn cấp.**
    - **115** (cấp cứu) **[XM]**.
    - **111** (Tổng đài Quốc gia Bảo vệ Trẻ em, nay thuộc Cục Bà mẹ và Trẻ em; miễn phí, 24/7) **[XM]**.
    - Chưa xác minh được: đường dây chống độc chuyên biệt của Bạch Mai, đường dây nóng Bộ Y tế 1900 9095, và các đường dây sức khỏe tâm thần/phòng chống tự tử. Không hiển thị các số này trong ứng dụng cho tới khi xác minh xong.
11. **Độ tin cậy.**
    - Ngay nguồn chính thức cũng sai ngày: kcb.vn ghi 3310/QĐ-BYT với hai ngày khác nhau; văn bản 2671/QĐ-BYT ghi ngày của 250/QĐ-BYT là "28/11/2022" thay vì 28/01/2022.
    - Nguồn tư nhân sai nhiều hơn: Long Châu ghi 2760/QĐ-BYT ngày "07/04/2023"; Hoatieu ghi 292/QĐ-BYT ngày "02/06/2024".
    - Nhiều trang nhà nước hỏng kỹ thuật sau tái cơ cấu: vncdc.gov.vn hết hạn chứng chỉ và vẫn mang tên "Cục Y tế dự phòng"; pasteurhcm.gov.vn dùng chứng chỉ tự ký; trang cấp huyện cũ không còn phân giải DNS.
    - Vì vậy phải lưu bản PDF, kèm hash và ngày truy cập.

---

## 2. Bảng tổng hợp nguồn

| Nguồn | Cơ quan | Nội dung | Năm / số hiệu | Truy cập | Quyền sử dụng | Mức tin cậy |
|---|---|---|---|---|---|---|
| HDCĐ&ĐT của Bộ Y tế (theo bệnh và theo chuyên khoa) | Bộ Y tế, Cục QLKCB soạn | Phác đồ quốc gia | Xem 3.1 | kcb.vn/phac-do; PDF ký số trên kcb.vn và cổng Sở Y tế | Văn bản hành chính, không thuộc phạm vi bảo hộ (khoản 2 Điều 15). Đây là phân tích, cần luật sư xác nhận | Rất cao (nhưng nhiều bản cũ) |
| Nghị định 313/2026/NĐ-CP | Chính phủ | Cơ cấu Bộ Y tế | 08/8/2026 | datafiles.chinhphu.vn [1] | VBQPPL, tự do sử dụng | Rất cao |
| Luật SHTT, Điều 15 và Điều 7 | Quốc hội | Đối tượng không bảo hộ; ngoại lệ khai thác dữ liệu/AI | Luật 2005 sửa đổi 2009, 2019, 2022, 2025 (Luật 131/2025/QH15) | cov.gov.vn [55] | VBQPPL | Rất cao; nội dung sửa đổi 2025 mới qua tóm tắt [TC] |
| ICD-Vietnam (icd.kcb.vn) | Cục QLKCB (đơn vị phát triển theo mã nguồn: White Neuron) | ICD-10 song ngữ (Thông tư 06/2026/TT-BYT), ICD-9-CM, ICF, danh mục bệnh YHCT | 2026 | Web; API JSON nội bộ, không có tài liệu | Bảng mã kèm Thông tư là VBQPPL. Phần mềm/API chưa có giấy phép công bố, cần xin phép | Rất cao |
| ICD-11 MMS | WHO | Phân loại bệnh | Bản 2026-01 | icd.who.int [61] | CC BY-ND 3.0 IGO (theo Wikipedia dẫn WHO) [TC] | Rất cao; không có tiếng Việt |
| STEPS 2021 Việt Nam | Bộ Y tế, WHO WPRO | Yếu tố nguy cơ bệnh không lây nhiễm, tăng huyết áp, đái tháo đường | Thu thập 01–03/2021; báo cáo 2025 | extranet.who.int, catalog 948 [66][67] | Báo cáo: CC BY-NC-SA 3.0 IGO. Vi dữ liệu: chỉ phi thương mại, phải chia sẻ bài báo với WHO | Cao |
| STEPS 2015, 2009 | Bộ Y tế, WHO | Như trên | 2015, 2009 | Catalog 590, 719 [68] | Như trên | Cao |
| IHME GBD 2023 | IHME / Đại học Washington | Gánh nặng bệnh tật theo tuổi, giới | GBD 2023 | healthdata.org [63] | Phi thương mại: miễn phí. Thương mại: trả phí. Cấm phân phối lại và cấm tạo dữ liệu phái sinh | Cao (ước tính mô hình) |
| WHO data.who.int / GHO | WHO | Chỉ số quốc gia | Cập nhật liên tục | data.who.int/countries/704 [64][65] | Điều khoản sử dụng: CC BY 4.0. Trang quốc gia: CC BY-NC-SA 3.0 IGO (mâu thuẫn). Dữ liệu của bên thứ ba bị loại trừ | Cao |
| Niên giám thống kê y tế | Bộ Y tế | Mắc và chết tại bệnh viện theo ICD-10 | Bản mới nhất CHƯA XÁC MINH | moh.gov.vn (JS) | Văn bản hành chính; số liệu không được bảo hộ (khoản 3 Điều 15) | Trung bình (chỉ dữ liệu bệnh viện) |
| Luật Phòng bệnh 114/2025/QH15; Thông tư 15/2026/TT-BYT | Quốc hội, Bộ Y tế | Giám sát, báo cáo, phân nhóm A/B/C | Thông tư 17/5/2026, hiệu lực 01/7/2026 | dulieuphapluat.vn [69] [TC] | VBQPPL | Rất cao |
| Công văn, công điện của Bộ Y tế và Cục Phòng bệnh | Bộ Y tế | Tình hình dịch (tay chân miệng, liên cầu lợn…) | 2025–2026 | Cổng Sở Y tế, báo chí [8][70] | Văn bản hành chính | Cao, nhưng số liệu rời rạc |
| NIHE | Viện Vệ sinh dịch tễ Trung ương | Giám sát và xét nghiệm, miền Bắc | — | nihe.org.vn [82] | © NIHE (tin bài) | Cao |
| Viện Pasteur TP.HCM; Viện Pasteur Nha Trang; Viện VSDT Tây Nguyên | Bộ Y tế | Giám sát các vùng Nam, Trung, Tây Nguyên | — | [86][83][84] | © từng viện | Cao |
| Viện Sốt rét – KST – CT Quy Nhơn (và các viện Trung ương, TP.HCM) | Bộ Y tế | Sốt rét, ký sinh trùng | — | impe-qn.org.vn [23] | © viện | Cao |
| WHO IMCI Chart Booklet | WHO | Xử trí lồng ghép trẻ bệnh | 2014, ISBN 978 92 4 150682 3 | iris.who.int, handle 10665/104772 [72] | © WHO 2014, All rights reserved; xin phép khi sao chép/dịch | Rất cao (nhưng cũ) |
| HDCĐ&ĐT một số bệnh thường gặp ở trẻ em | Bộ Y tế | Nhi khoa | 3312/QĐ-BYT, 07/8/2015 | [42] | Văn bản hành chính | Cao |
| MSD Manual tiếng Việt (bản chuyên gia) | Merck & Co. | Kiến thức y khoa | 2026 | msdmanuals.com/vi/professional [73] | © Merck, bảo lưu mọi quyền; phải xin phép | Cao (không đặc thù Việt Nam) |
| ICD-10 và ICF song ngữ | Cục QLKCB | Tên bệnh chuẩn tiếng Việt | 2026 | icd.kcb.vn [60] | Xem dòng ICD-Vietnam | Rất cao (thuật ngữ) |
| Nghiên cứu hiểu biết sức khỏe (HLS-EU-Q47, HLS-SF12) | Duong TV, Nguyen HC và cộng sự | Đo hiểu biết sức khỏe ở Việt Nam | 2017, 2019, 2020 | DOI [74][75][76] | Theo giấy phép của tạp chí | Trung bình – cao |
| Tổng đài 111 | Cục Bà mẹ và Trẻ em | Bảo vệ trẻ em, mua bán người | Từ 2017 thay số 18001567 | tongdai111.vn [77] | — | Rất cao |
| Trung tâm Cấp cứu 115 TP.HCM | Sở Y tế TP.HCM | Cấp cứu 115 | — | ttcc115.medinet.gov.vn [78] | — | Rất cao |
| Bệnh viện Bạch Mai | Bộ Y tế | Hotline, Trung tâm Cấp cứu A9 | — | bachmai.gov.vn [79] | © BV Bạch Mai | Rất cao |
| CSDL pháp luật tư nhân (thuvienphapluat, luatvietnam, caselaw, hoatieu, vnras, hethongphapluat) | Doanh nghiệp, hội | Tra số hiệu và tình trạng hiệu lực | — | Web (một số chặn bot hoặc bắt đăng nhập) | Văn bản gốc tự do; phần biên tập, định dạng, ghi chú có điều khoản riêng | Trung bình (đã gặp lỗi) |
| Blog bệnh viện, nhà thuốc tư nhân (Vinmec, Long Châu, Medlatec…) | Tư nhân | Bài phổ thông | — | Web | © tác giả, không sao chép | Thấp – trung bình |
| Báo Sức khỏe và Đời sống | Đơn vị thuộc Bộ Y tế (Nghị định 313/2026) | Tin chính sách | — | suckhoedoisong.vn [10] | © báo | Cao (với tin chính sách) |

---

## 3. Chi tiết theo từng mục

### 3.1. Hướng dẫn chẩn đoán và điều trị của Bộ Y tế

**Bối cảnh ban hành**

- Các HDCĐ&ĐT là "tài liệu chuyên môn" ban hành kèm một Quyết định của Bộ trưởng, thường do Thứ trưởng ký thay, theo đề nghị của Cục trưởng Cục QLKCB.
- Điều 2 của các quyết định này thường có câu: Giám đốc cơ sở khám chữa bệnh "căn cứ tài liệu này… xây dựng và ban hành tài liệu hướng dẫn… phù hợp để thực hiện tại đơn vị". Ví dụ: Quyết định 5642/QĐ-BYT [29] và Quyết định 493/QĐ-BYT [30], đều [XM].
- Từ 2024, căn cứ ban hành là "Luật Khám bệnh, chữa bệnh năm 2023" và Nghị định 42/2025/NĐ-CP [30] [XM]. Văn bản ban hành sau ngày 18/8/2026 sẽ căn cứ Nghị định 313/2026/NĐ-CP.

#### Bảng A. 13 bệnh trọng tâm

| Bệnh | Văn bản hiện hành (theo kết quả rà soát) | Ngày | Thay thế | Nguồn | Trạng thái |
|---|---|---|---|---|---|
| Sốt xuất huyết Dengue | 2760/QĐ-BYT, HDCĐ, ĐT sốt xuất huyết Dengue | 04/7/2023 | 3705/QĐ-BYT ngày 22/8/2019 | PDF ký số trên cổng Sở Y tế Lai Châu [6]; caselaw [7] | [XM] số và ngày. Chưa thấy bản thay thế tính đến 10/2026 |
| Tay chân miệng | 292/QĐ-BYT | 06/02/2024 | 1003/QĐ-BYT ngày 30/3/2012 | Đại biểu Nhân dân [8]; công văn hỏa tốc của Bộ Y tế ngày 31/3/2026 vẫn viện dẫn; Hoatieu [9] ghi nhầm "02/06/2024" | [TC] |
| Cúm mùa | 1840/QĐ-BYT | 03/6/2025 | 2078/QĐ-BYT ngày 23/6/2011 | Sức khỏe và Đời sống [10]; PDF trên cổng Hải Phòng [11] | [TC] |
| COVID-19 | 2671/QĐ-BYT | 26/6/2023 | 250/QĐ-BYT ngày 28/01/2022 (văn bản 2671 ghi nhầm "28/11/2022") | caselaw [12]; Sở Y tế Lai Châu [13] | [TC]. Chưa thấy bản mới sau 2023 |
| Sởi | 1019/QĐ-BYT | 26/3/2025 | 1327/QĐ-BYT ngày 18/4/2014 | luatvietnam [14]; TTYT Hóc Môn [15] | [TC] |
| Lao | 162/QĐ-BYT, HD chẩn đoán, điều trị và dự phòng bệnh lao | 19/01/2024 | 1314/QĐ-BYT ngày 24/3/2020 | luatvietnam [16]; PDF [17] | [TC] |
| Viêm gan vi rút B | 1740/QĐ-BYT | 16/6/2026 | 3310/QĐ-BYT ngày 29/7/2019 (kcb.vn ghi lẫn "27/10/2019") | kcb.vn, có PDF ký số [5] | [XM] |
| Tăng huyết áp | 3192/QĐ-BYT | 31/8/2010 | — | PDF lưu trên kcb.vn [18]. Tuyến xã: 5904/QĐ-BYT ngày 20/12/2019 (THA, ĐTĐ, COPD, hen) [19] | [XM] văn bản có trên kcb.vn. Chưa thấy bản thay thế |
| Đái tháo đường típ 2 | 5481/QĐ-BYT | 30/12/2020 | 3319/QĐ-BYT ngày 19/7/2017 | kcb.vn, caselaw [20]. Được sửa đổi bởi 1353/QĐ-BYT năm 2021, nội dung sửa là bổ sung thành viên ban soạn thảo [21] | [TC]. Liên quan: tiền đái tháo đường 3087/QĐ-BYT năm 2020 (ngày CHƯA XÁC MINH) [41]; bệnh thần kinh do đái tháo đường 3510/QĐ-BYT ngày 11/11/2025 [53] |
| Đột quỵ | 3312/QĐ-BYT, HDCĐ&ĐT đột quỵ não | 05/11/2024 | 5331/QĐ-BYT ngày 23/12/2020 | luatvietnam, thuvienphapluat [22] | [TC]. Trùng số với 3312/QĐ-BYT năm 2015 (nhi khoa): luôn ghi kèm năm |
| Sốt rét | 3377/QĐ-BYT | 30/8/2023 | 2699/QĐ-BYT ngày 26/6/2020 | Viện Sốt rét – KST – CT Quy Nhơn [23] | [XM] |
| Dại và phơi nhiễm dại | 1622/QĐ-BYT, HD giám sát, phòng chống bệnh dại trên người (có điều trị dự phòng sau phơi nhiễm: xử lý vết thương, vắc xin, huyết thanh) | 08/5/2014 | — | luatvietnam [24] | [TC]. Không tìm thấy HDCĐ&ĐT riêng; chưa thấy bản thay thế |
| Ngộ độc methanol | Mục "Ngộ độc rượu methanol" trong HD chẩn đoán và xử trí ngộ độc, 3610/QĐ-BYT | 31/8/2015 | — | vnras [25]; Trung tâm DI&ADR Quốc gia [26]. Bài giảng ĐHYD TP.HCM dẫn mục này ở tr. 176–183 [27] | [TC]. Không có hướng dẫn riêng; chưa thấy bản thay thế |

#### Bảng B. Bộ hướng dẫn theo chuyên khoa

| Chuyên khoa | Văn bản | Ngày | Ghi chú | Trạng thái |
|---|---|---|---|---|
| Hô hấp | 4235/QĐ-BYT, HDCĐ&ĐT bệnh hô hấp | 31/10/2012 (luatvietnam [31]); vnras ghi 31/12/2012 [32] | Mâu thuẫn ngày giữa hai nguồn. Phần COPD đã bị bãi bỏ | [TC] |
| Hô hấp: COPD | 2767/QĐ-BYT | 04/7/2023 | — | [XM] kcb.vn [33] |
| Hô hấp: hen (người lớn, trẻ từ 12 tuổi) | 1851/QĐ-BYT | 24/4/2020 | — | [TC] [34] |
| Tiêu hóa, gan mật | Không tìm thấy bộ chung của Bộ Y tế | — | Có các văn bản theo bệnh: viêm gan B 1740/QĐ-BYT (2026); viêm gan C 2065/QĐ-BYT ngày 29/4/2021 (thay 5012/QĐ-BYT ngày 20/9/2016) [51]; ung thư gan 3129/QĐ-BYT ngày 17/7/2020 [4]; ung thư dạ dày 3127/QĐ-BYT (2020) [41] | [TC] / [XM] |
| Tim mạch | THA 3192/QĐ-BYT; HC mạch vành cấp 2187/QĐ-BYT; HC mạch vành mạn 2248/QĐ-BYT; suy tim cấp và mạn 1857/QĐ-BYT; dự phòng thuyên tắc huyết khối tĩnh mạch 3908/QĐ-BYT | 31/8/2010; 03/6/2019; 19/5/2023; 05/7/2022; 20/10/2023 | Không có bộ "tim mạch" chung | 1857, 3908: [XM] kcb.vn [36][4]. Còn lại: [TC] [37][38] |
| Thận – tiết niệu | 3931/QĐ-BYT, một số bệnh thận – tiết niệu; 2388/QĐ-BYT, bệnh thận mạn và một số bệnh lý thận | 21/9/2015; 12/8/2024 | — | 3931: [TC] [41]. 2388: [XM] [35] |
| Nội tiết – chuyển hóa | 3879/QĐ-BYT | 30/9/2014 | Phần đái tháo đường đã có hướng dẫn riêng (5481/QĐ-BYT) | [TC] [39] |
| Cơ xương khớp | 361/QĐ-BYT | 25/01/2014 | — | [TC] [40] |
| Huyết học | 1832/QĐ-BYT, một số bệnh lý huyết học | 01/7/2022 | Thay 1494/QĐ-BYT (2015) | [TC] [50] |
| Nhi khoa | 3312/QĐ-BYT, một số bệnh thường gặp ở trẻ em | 07/8/2015 | Trùng số với văn bản đột quỵ năm 2024 | [TC] [42] |
| Sản phụ khoa | 315/QĐ-BYT | 29/01/2015 | — | [TC] [43] |
| Da liễu | 75/QĐ-BYT, các bệnh da liễu | 13/01/2015 | Có PDF trên kcb.vn | [TC] [44] |
| Tai mũi họng | 5643/QĐ-BYT | 31/12/2015 | — | [TC] [45] |
| Mắt | 40/QĐ-BYT, các bệnh về mắt | 12/01/2015 | — | [TC] [46] |
| Răng hàm mặt | 3108/QĐ-BYT | 28/7/2015 | — | [TC] [47] |
| Truyền nhiễm | 5642/QĐ-BYT, một số bệnh truyền nhiễm (14 bài) | 31/12/2015 | Bản PDF trên kcb.vn chính là bản in NXB Y học 2016. Gồm: viêm não do HSV, viêm màng não nhiễm khuẩn, thủy đậu, uốn ván, sốt rét kháng thuốc, thương hàn, lỵ trực khuẩn, cúm mùa, viêm màng não tăng bạch cầu ái toan, sốt mò, nhiễm trùng da và mô mềm, dịch hạch, tiêu chảy do vi khuẩn, nhiễm khuẩn huyết. Các bài cúm và sốt rét đã có bản mới | [XM] [29] |
| Tâm thần | 2058/QĐ-BYT, một số rối loạn tâm thần thường gặp | 14/5/2020 | — | [TC] [48] |
| Cấp cứu, hồi sức, chống độc | 1493/QĐ-BYT, chẩn đoán và xử trí hồi sức tích cực; 3610/QĐ-BYT, chẩn đoán và xử trí ngộ độc | 22/4/2015; 31/8/2015 | — | [TC] [49][25] |
| Thần kinh | Không tìm thấy bộ chung | — | Có: đột quỵ não 3312/QĐ-BYT (2024); bệnh thần kinh do đái tháo đường 3510/QĐ-BYT (2025) | [TC] |
| Ung bướu | 1514/QĐ-BYT, một số bệnh ung bướu; 3128 (vú), 3129 (gan), 3130 (tiền liệt tuyến), 3127 (dạ dày) | 01/4/2020; 17/7/2020 | — | 3128–3130: [XM] kcb.vn [4]. Còn lại: [TC] [52][41] |

#### Văn bản bổ sung hữu ích cho doctor-v

- **3756/QĐ-BYT ngày 21/6/2018**: dự phòng, phát hiện sớm, chẩn đoán, điều trị và quản lý một số bệnh không lây nhiễm phổ biến cho tuyến y tế cơ sở [90] [TC].
- **5904/QĐ-BYT ngày 20/12/2019**: chẩn đoán, điều trị và quản lý THA, ĐTĐ, COPD, hen tại trạm y tế xã. Có tiêu chí chuyển tuyến (ví dụ: THA ở người dưới 40 tuổi, phụ nữ có thai, nghi THA thứ phát) [19] [TC].
- **6101/QĐ-BYT ngày 30/12/2019**: chẩn đoán, điều trị bệnh Whitmore (melioidosis) [28] [TC].
- **493/QĐ-BYT ngày 13/02/2026** (chẩn đoán và điều trị bệnh do vi rút Nipah) và **499/QĐ-BYT ngày 13/02/2026** (hướng dẫn tạm thời giám sát và phòng, chống bệnh do vi rút Nipah ở người) [30] [XM].
- **Hướng dẫn chẩn đoán và điều trị bệnh do vi rút Ebola**: có trên trang chủ kcb.vn năm 2026; số hiệu CHƯA XÁC MINH [54].
- **1996/QĐ-BYT ngày 18/6/2025**: hướng dẫn ghi phiếu chẩn đoán nguyên nhân tử vong, thay 1921/QĐ-BYT ngày 12/7/2022 [89] [TC]. Liên quan chất lượng dữ liệu tử vong.
- **Công văn 7780/BYT-KCB ngày 14/10/2026**: thí điểm hướng dẫn khám bệnh, chữa bệnh từ xa [54] [XM tiêu đề]. Cần theo dõi để doctor-v không bị coi là khám bệnh từ xa.

#### Nơi lấy PDF chính thức

1. **kcb.vn**
   - Mục "Hướng dẫn chẩn đoán, điều trị" (/phac-do), "Quy trình kỹ thuật" (/quy-trinh) và "Tài liệu" (/tai-lieu).
   - PDF ký số nằm dưới `kcb.vn/upload/2005611/...`.
   - Danh mục hiển thị **không đầy đủ**: trang /phac-do chỉ có 12 mục và không phân trang được [4].
   - Liên hệ Cục QLKCB: 138A Giảng Võ, Hà Nội; ĐT 024 6273 2093; kcb@moh.gov.vn [54] [XM].
2. **Cổng Sở Y tế, CDC tỉnh, bệnh viện**: thường đăng lại bản ký số, ví dụ Lai Châu, Hải Phòng, Bắc Giang, Đồng Nai, Hà Nội. Nhiều đường dẫn cấp huyện cũ đã chết sau sắp xếp 2025, ví dụ vinhcuu.dongnai.gov.vn trả ENOTFOUND.
3. **moh.gov.vn**: có kho văn bản nhưng render bằng JavaScript, không đọc tự động được trong phiên này.
4. **vanban.chinhphu.vn, datafiles.chinhphu.vn**: văn bản cấp Chính phủ và Thủ tướng (ví dụ Nghị định 313/2026 [1]). Quyết định chuyên môn của Bộ Y tế thường không có ở đây.
5. **CSDL pháp luật tư nhân** (thuvienphapluat, luatvietnam, caselaw, hoatieu, vnras, hethongphapluat):
   - Tốt nhất để tra chuỗi "bị thay thế bởi".
   - Nhưng chặn bot (403), bắt đăng nhập và có điều khoản riêng cho phần biên tập.
   - Đã gặp lỗi ngày tháng; xem mục 1, ý 11.
6. **Bản in NXB Y học**: chứa thêm lời giới thiệu và danh sách ban biên soạn, ví dụ bản in 5642/QĐ-BYT năm 2016 [29].

---

### 3.2. Bản quyền và tái sử dụng hướng dẫn của Bộ Y tế

**Điều 15 Luật SHTT**

Nguyên văn theo Luật 2005, được trích lại trong các nguồn [57][58]; chưa đối chiếu được văn bản hợp nhất mới nhất trong phiên:

> "Điều 15. Các đối tượng không thuộc phạm vi bảo hộ quyền tác giả
> 1. Tin tức thời sự thuần tuý đưa tin.
> 2. Văn bản quy phạm pháp luật, văn bản hành chính, văn bản khác thuộc lĩnh vực tư pháp và bản dịch chính thức của văn bản đó.
> 3. Quy trình, hệ thống, phương pháp hoạt động, khái niệm, nguyên lý, số liệu."

**Các lần sửa đổi**

- Không nguồn nào trong phiên cho thấy Luật 07/2022/QH15 sửa Điều 15. Kết luận này CHƯA XÁC MINH bằng văn bản hợp nhất.
- **Luật 131/2025/QH15** (thông qua 10/12/2025, hiệu lực 01/4/2026) đã sửa Điều 15, **bổ sung khoản 4** làm rõ ý tưởng, khẩu hiệu, tiêu đề đứng riêng không được bảo hộ. Luật này cũng bổ sung **khoản 5 Điều 7**: cho phép sử dụng văn bản và dữ liệu về đối tượng SHTT đã công bố hợp pháp cho nghiên cứu, thử nghiệm, huấn luyện AI, với điều kiện không ảnh hưởng bất hợp lý tới chủ thể quyền; với đối tượng có quyền tác giả, Chính phủ sẽ quy định điều kiện [55] [TC: tóm tắt của Cục Bản quyền tác giả]. Lawgical xác nhận ngày ban hành nhưng không hiển thị toàn văn [56].
- **Văn bản hướng dẫn**: Nghị định 17/2023/NĐ-CP (26/4/2023) [59], được sửa đổi bởi **Nghị định 134/2026/NĐ-CP (06/4/2026)** [55] [TC].

**Định nghĩa "văn bản hành chính"**

- Nghị định 22/2018/NĐ-CP, Điều 19 (đã được thay thế), định nghĩa "văn bản hành chính" tại khoản 2 Điều 15 gồm văn bản của "cơ quan nhà nước, tổ chức chính trị, tổ chức chính trị – xã hội…, đơn vị vũ trang nhân dân và các tổ chức khác"; định nghĩa "tin tức thời sự thuần túy đưa tin" là "các thông tin báo chí ngắn hàng ngày, chỉ mang tính chất đưa tin không có tính sáng tạo" [57] [TC].
- Điều khoản tương ứng trong Nghị định 17/2023: CHƯA XÁC MINH, vì bản PDF trên cổng Nghệ An là ảnh quét.
- Về hình thức, Nghị định 30/2020/NĐ-CP về công tác văn thư (Điều 7) liệt kê các loại văn bản hành chính, trong đó có "quyết định (cá biệt)" và "hướng dẫn". Nội dung này lấy từ hiểu biết, CHƯA XÁC MINH trong phiên, kể cả tình trạng hiệu lực năm 2026.

**Phân tích: hướng dẫn kèm Quyết định có thuộc khoản 2 Điều 15 không?**

1. Quyết định của Bộ trưởng ban hành tài liệu chuyên môn **không phải VBQPPL**, vì VBQPPL của Bộ trưởng là Thông tư. Đó là một **văn bản hành chính** của cơ quan nhà nước.
2. Tài liệu "ban hành kèm theo" là bộ phận của quyết định: quyết định ghi "Ban hành kèm theo Quyết định này tài liệu chuyên môn…", và có hiệu lực áp dụng tại các cơ sở khám chữa bệnh trong cả nước [29][30]. Vì vậy cách hiểu hợp lý nhất là toàn bộ văn bản kèm theo **không được bảo hộ quyền tác giả**.
3. Bảng mã **ICD-10 theo Thông tư 06/2026/TT-BYT** là phụ lục của một VBQPPL, nên thuộc khoản 2 Điều 15, kể cả với tư cách "bản dịch chính thức".
4. **Ngoại lệ và rủi ro:**
   - Hình, bảng, thang điểm trích từ tổ chức nước ngoài (ESC, KDIGO, GINA, WHO…) vẫn thuộc quyền của bên thứ ba ngoài lãnh thổ Việt Nam. Khi phát hành quốc tế, hoặc khi dùng bản gốc của tổ chức đó thay vì bản trong văn bản Bộ Y tế, nên vẽ lại hoặc diễn đạt lại.
   - Bản in NXB Y học và bản trình bày lại của CSDL tư nhân có thể chứa phần sáng tạo riêng như lời giới thiệu, chú giải, định dạng. Hãy lấy PDF ký số từ cơ quan nhà nước.
   - Phác đồ do bệnh viện công tự ban hành (theo Điều 2 của các quyết định) cũng là văn bản của đơn vị sự nghiệp công. Có lập luận xếp chúng vào văn bản hành chính, nhưng mức chắc chắn thấp hơn. Bài blog của bệnh viện hoặc nhà thuốc tư nhân thì **được bảo hộ**.
   - Không được bảo hộ quyền tác giả không có nghĩa là được trình bày như thể cơ quan nhà nước xác nhận ứng dụng. Phải ghi rõ "theo Hướng dẫn… ban hành kèm Quyết định số…/QĐ-BYT ngày…", và không được sửa nội dung rồi vẫn gán cho Bộ Y tế.
5. **Dữ kiện y khoa** (tần suất triệu chứng, ngưỡng xét nghiệm) là "số liệu, khái niệm, nguyên lý" (khoản 3 Điều 15), không được bảo hộ dù lấy từ nguồn có bản quyền.
   - Nhưng **sưu tập dữ liệu có tính sáng tạo** (cơ sở dữ liệu) và các **ràng buộc hợp đồng** vẫn áp dụng, như điều khoản của IHME hay MSD.
   - Ý này lấy từ hiểu biết về Điều 14 Luật SHTT, CHƯA XÁC MINH nguyên văn trong phiên.

**Kết luận tạm**: doctor-v có thể diễn đạt lại và trích dẫn nội dung các HDCĐ&ĐT của Bộ Y tế để làm nền tri thức. Cần lấy **ý kiến pháp lý bằng văn bản** trước khi thương mại hóa.

---

### 3.3. Phân loại bệnh

#### ICD-10 tiếng Việt

- **Hệ thống ICD-Vietnam** [60] [XM: đọc trực tiếp mã nguồn giao diện và API công khai]:
  - Địa chỉ icd.kcb.vn, tiêu đề "Hệ thống quản lý mã hóa lâm sàng khám chữa bệnh".
  - Menu hiện có "**ICD-10 – 06/2026/TT-BYT**" (tra cứu, tra cứu song ngữ, danh mục YHCT 1978/QĐ-BYT, tài liệu ICD-10). Ghi chú cập nhật trong mã nguồn: "hỗ trợ bộ mã ICD-10 mới theo Thông tư 06/2026/TT-BYT".
  - Bộ cũ ghi "**ICD-10 – Bản trước**" (kèm danh mục YHCT 7603/QĐ-BYT).
  - Hệ thống còn có ICD-9-CM tập 3 song ngữ, ICF song ngữ, công cụ "UCOD Việt Nam" (nguyên nhân tử vong gốc) và "DRG Việt Nam".
- **Văn bản hiện hành**: Thông tư 06/2026/TT-BYT. Tên đầy đủ, ngày ký và ngày hiệu lực: CHƯA XÁC MINH.
- **Bản trước**: theo hiểu biết là bảng ICD-10 và hướng dẫn mã hóa ban hành kèm **Quyết định 4469/QĐ-BYT ngày 28/10/2020**. CHƯA XÁC MINH trong phiên.
- **Ngày của các quyết định YHCT** (7603/QĐ-BYT, 1978/QĐ-BYT): CHƯA XÁC MINH.
- **Dạng máy đọc được**:
  - Giao diện gọi một API JSON không có tài liệu, ví dụ `ccs.whiteneuron.com/api/ICD10_TT06/root` trả về 22 chương tiếng Việt. Đây là hạ tầng của đơn vị phát triển, **không có giấy phép công bố**. Không nên cào dữ liệu; hãy xin Cục QLKCB cấp file dữ liệu.
  - Chưa tìm thấy file Excel chính thức để tải về.
  - Trang cũ icd10ev.kcb.vn không còn phân giải DNS.

#### ICD-11

- Trình duyệt WHO bản **2026-01** có các ngôn ngữ: Ả Rập, Trung, Séc, Anh, Pháp, Đức (bản tiền phát hành), Kazakh, Latin, Bồ Đào Nha, Nga, Slovak, Tây Ban Nha, Thụy Điển, Thổ Nhĩ Kỳ, Uzbek. **Không có tiếng Việt** [61] [XM].
- Giấy phép: **CC BY-ND 3.0 IGO** [62] [TC: Wikipedia dẫn điều khoản của WHO; who.int chặn truy cập].
- Bản dịch tiếng Việt và lộ trình chuyển đổi của Bộ Y tế: **CHƯA XÁC MINH**.

---

### 3.4. Dịch tễ học cho prior

#### Niên giám thống kê y tế (Bộ Y tế)

- Bản mới nhất: CHƯA XÁC MINH, vì moh.gov.vn không đọc được tự động và hạn mức tìm kiếm đã hết.
- Theo hiểu biết (CHƯA XÁC MINH), các bản 2015–2019 có bảng "10 bệnh mắc cao nhất" và "10 bệnh chết cao nhất" tính trên 100.000 dân, lấy từ báo cáo bệnh viện và phân theo chương/mã ICD-10.
- Dữ liệu dựa trên bệnh viện nên **thiên lệch về bệnh nặng** và không phản ánh tần suất ở tuyến ban đầu.
- Đơn vị biên soạn hiện nay (Vụ Kế hoạch – Tài chính hay Trung tâm Thông tin y tế Quốc gia mới thành lập): CHƯA XÁC MINH. Cả hai đơn vị đều có trong Nghị định 313/2026 [2].

#### IHME GBD [XM] [63]

Nguồn là "Free-of-Charge Non-Commercial User Agreement". Nội dung chính:

- **Người dùng phải cam kết**: không phải tổ chức vì lợi nhuận; không dùng thương mại; không cung cấp dữ liệu cho tổ chức thương mại.
- **"Commercial use"** = "any use that supports a commercial initiative, commercial advantage, financial transaction, or monetary compensation". IHME **thu phí** khi dùng thương mại.
- **Phạm vi cho phép**: chỉ nghiên cứu nội bộ và "Publication". Website có nằm trong khái niệm Publication, nhưng kết quả chỉ được chứa phần dữ liệu cần thiết.
- **Bị cấm**: sao chép hoặc phân phối dữ liệu; tạo tác phẩm phái sinh; "develop data sets similar in function"; cho bên thứ ba tải dữ liệu.
- **Thời hạn**: 5 năm.
- **Ghi nguồn bắt buộc**: "Source: Institute for Health Metrics and Evaluation. Used with permission. All rights reserved."
- **Hệ quả**: nhúng prior suy từ GBD vào ứng dụng là rủi ro cao nếu doctor-v có bất kỳ yếu tố thương mại nào. Cần giấy phép bằng văn bản.

#### WHO data.who.int / GHO [XM] [64][65]

- **Điều khoản sử dụng**: dataset "provided to you under a Creative Commons Attribution 4.0 International License (CC BY 4.0)".
  - Ghi nguồn theo metadata, hoặc theo mẫu "World Health Organization {YEAR} data.who.int, {ITEM}… (Accessed on …)".
  - Dữ liệu ghi nguồn ngoài WHO **không** thuộc giấy phép này.
  - Không dùng tên hoặc biểu trưng WHO.
- **Trang Viet Nam** lại ghi "Copyright: CC BY-NC-SA 3.0 IGO" và cảnh báo chất lượng dữ liệu đăng ký tử vong của Việt Nam.
- **Mâu thuẫn**: áp dụng giấy phép ghi ở metadata từng dataset. Phần nội dung trang và báo cáo nên coi là phi thương mại.

#### STEPS [XM] [66][67][68]

- **Thiết kế**:
  - Vòng 2021 do Bộ Y tế thực hiện, thu thập 01–03/2021.
  - Tiếp cận 5.000 hộ, có **4.738** người tham gia, độ tuổi 18–69.
  - Báo cáo do WHO WPRO xuất bản năm 2025, ISBN 978 92 9062 026 6, giấy phép CC BY-NC-SA 3.0 IGO.
- **Kết quả chính**:
  - Huyết áp cao (≥140/90 mmHg hoặc đang dùng thuốc): **26,2%**; năm 2015 là 18,9%.
  - Đường huyết lúc đói ≥7,0 mmol/L hoặc đang điều trị: **7,1%**; năm 2015 là 4,1%.
  - Thừa cân (BMI ≥25): 19,5%. Hút thuốc: 41,1% ở nam, 0,6% ở nữ.
  - Trong số người huyết áp cao: khoảng **6/10 chưa từng được chẩn đoán**; 30,7% đang dùng thuốc; 11,2% đã kiểm soát được huyết áp.
- **Vi dữ liệu**: chỉ cho "non-commercial, not-for-profit public health purposes", phải chia sẻ bài báo với WHO và mời đồng tác giả.
- **Lưu ý**: con số tổng hợp là dữ kiện, dùng làm prior được và phải trích dẫn.

#### Giám sát truyền nhiễm: khung pháp lý và cơ quan

- **Khung pháp lý**: Luật Phòng bệnh 114/2025/QH15 và Thông tư 15/2026/TT-BYT [69] [TC].
  - Thông tư ban hành 17/5/2026, hiệu lực 01/7/2026.
  - Quy định loại hình giám sát, báo cáo và công bố dịch; phân nhóm bệnh A/B/C (chấm điểm theo Phụ lục I); ngưỡng dịch; trách nhiệm của các tuyến.
  - Bãi bỏ Thông tư 54/2015/TT-BYT, Thông tư 17/2019/TT-BYT, Thông tư liên tịch 16/2013 và Quyết định 25/2006.
- **Cơ quan**:
  - Cục Phòng bệnh (Bộ Y tế) chủ trì. Website hiện hành: CHƯA XÁC MINH. vncdc.gov.vn vẫn mang tên "Cục Y tế dự phòng", tin mới nhất từ 2024 và chứng chỉ đã hết hạn [85].
  - NIHE: miền Bắc [82].
  - Viện Pasteur TP.HCM: miền Nam; chứng chỉ tự ký khi kiểm tra [86].
  - Viện Pasteur Nha Trang: miền Trung [83].
  - Viện Vệ sinh dịch tễ Tây Nguyên [84].
  - Hệ thống Viện Sốt rét – Ký sinh trùng – Côn trùng (Trung ương, Quy Nhơn [23], TP.HCM).
  - CDC tỉnh (ví dụ TT Kiểm soát bệnh tật TP.HCM [88]).
  - Bệnh viện Bệnh Nhiệt đới Trung ương [80].
  - Bệnh lây từ động vật (dại, liên cầu lợn) cần phối hợp với ngành thú y. Tên cơ quan sau sắp xếp 2025: CHƯA XÁC MINH.

| Bệnh | Dữ liệu đã kiểm chứng | Mùa, vùng, nhóm nguy cơ (kiến thức nền, CHƯA XÁC MINH bằng số liệu trong phiên) | Gợi ý dùng cho prior |
|---|---|---|---|
| Tay chân miệng | Gần 3 tháng đầu 2026: **25.094 ca, 4 tử vong**; phía Nam 18.031 ca (**71,9%**) [8] [TC: báo Đại biểu Nhân dân dẫn Bộ Y tế] | Trẻ dưới 5 tuổi; phía Nam có 2 đỉnh trong năm | Hệ số theo tháng, vùng và nhóm tuổi trẻ nhỏ |
| Sốt xuất huyết Dengue | Hướng dẫn 2760/QĐ-BYT [6] | Phía Nam lưu hành quanh năm, đỉnh vào mùa mưa; phía Bắc tập trung khoảng tháng 7–11 | Hệ số theo tháng và vùng; luôn kiểm tra dấu hiệu cảnh báo |
| Sởi | Hướng dẫn mới 1019/QĐ-BYT ban hành 3/2025 [14] | Đông – xuân; trẻ chưa tiêm hoặc tiêm chưa đủ | Phơi nhiễm và tình trạng tiêm chủng là biến chính |
| Sốt rét | 3377/QĐ-BYT [23] | Rừng núi và biên giới Tây Nguyên, Nam Trung Bộ, Đông Nam Bộ; người đi rừng, ngủ rẫy; ca ngoại nhập | Prior gần 0 nếu không có phơi nhiễm; dùng câu hỏi phơi nhiễm (đi rừng, đi nước ngoài) |
| Liên cầu lợn (S. suis) | Cục Phòng bệnh có công văn tăng cường phòng chống (tệp "942-Cuc-PB", đăng 07/8/2025; số hiệu đầy đủ CHƯA XÁC MINH) [70]; báo chí đưa tin ca tăng ở Huế và Hưng Yên [71] | Ăn tiết canh hoặc thịt lợn chưa chín; giết mổ lợn ốm; nam trung niên | Phơi nhiễm là yếu tố quyết định; sốt kèm cứng gáy hoặc xuất huyết → cấp cứu |
| Dại | 1622/QĐ-BYT [24] | Bị chó hoặc mèo cắn, cào | Không "chẩn đoán dại". Mọi phơi nhiễm → xử lý vết thương và tiêm phòng ngay (red flag) |
| Whitmore | 6101/QĐ-BYT [28] | Mùa mưa; tiếp xúc đất, nước; người đái tháo đường, nghiện rượu | Yếu tố nguy cơ cộng với sốt kéo dài, áp xe, viêm phổi |
| Ngộ độc methanol | 3610/QĐ-BYT [25] | Rượu không rõ nguồn gốc; dịp lễ Tết | Hỏi "uống rượu không rõ nguồn" cộng nhìn mờ, khó thở → 115 |
| Rắn cắn | — | Nông thôn, mùa mưa | Luôn là cấp cứu; không có prior |

- **Sắp xếp địa giới**: từ 2025, chính quyền địa phương còn 2 cấp, không còn cấp huyện. Các địa chỉ thu thập được đã theo dạng "Phường Kim Liên, TP Hà Nội", "Phường Nha Trang, Tỉnh Khánh Hòa", "Phường Diên Hồng, TP.HCM" [78][79][83].
  - Prior theo vùng phải dùng danh mục tỉnh mới, kèm bảng chuyển đổi từ tỉnh cũ (số liệu lịch sử theo 63 tỉnh).
  - Văn bản về sắp xếp và danh sách tỉnh mới: CHƯA XÁC MINH trong phiên.
- **Lý do khám thường gặp ở tuyến ban đầu, tuyến huyện**: không tìm thấy nguồn kiểm chứng được trong phiên (CHƯA XÁC MINH). Hướng thay thế: dữ liệu thanh toán BHYT, nghiên cứu dùng ICPC-2 tại trạm y tế xã, hoặc hợp tác với một vài trạm y tế hay phòng khám để lấy phân bố mã ICD-10 ngoại trú.

---

### 3.5. Nhi khoa (IMCI)

**WHO IMCI Chart Booklet (2014)** [72] [XM qua API kho IRIS và bản văn bản trích xuất]

- Đây là một phần của bộ "IMCI distance learning course" (15 tập), xuất bản 06/3/2014, ISBN 978 92 4 150682 3. Metadata ghi chú: "only Chart booklet is WHO guideline".
- **Bản quyền**: "© World Health Organization 2014. All rights reserved… Requests for permission to reproduce or translate WHO publications – whether for sale or for non-commercial distribution – should be addressed to WHO Press". Tức là không phải giấy phép CC; cần xin phép nếu sao chép hoặc dịch biểu đồ.
- Có bản mới hơn hay không (ví dụ bản riêng cho trẻ dưới 2 tháng năm 2019): CHƯA XÁC MINH.

**Dấu hiệu nguy hiểm toàn thân, trẻ từ 2 tháng đến 5 tuổi** (nguyên văn tiếng Anh [XM]):

- "Is the child able to drink or breastfeed?"
- "Does the child vomit everything?"
- "Has the child had convulsions?"
- "See if the child is lethargic or unconscious."
- "Is the child convulsing now?"
- Hành động: "Any general danger sign → URGENT attention… Refer URGENTLY."

Đề xuất diễn đạt cho ứng dụng: "Trẻ **không uống được hoặc bỏ bú**; **nôn ra tất cả mọi thứ**; **co giật** trong lần bệnh này hoặc **đang co giật**; **li bì, lờ đờ, khó đánh thức** hoặc bất tỉnh → **gọi 115 hoặc đi cấp cứu ngay**."

**Trẻ dưới 2 tháng: "Very severe disease"** [XM, trừ ngưỡng nhiệt độ]

- Bú kém, bỏ bú.
- Co giật.
- Thở nhanh từ 60 lần/phút trở lên.
- Rút lõm lồng ngực nặng.
- Sốt hoặc hạ thân nhiệt. Bản trích xuất mất ngưỡng; theo hiểu biết là ≥37,5°C và <35,5°C, phải đối chiếu PDF.
- Chỉ cử động khi bị kích thích, hoặc không cử động.

**Bản IMCI của Việt Nam** ("Xử trí lồng ghép các bệnh thường gặp ở trẻ em")

- Số văn bản và năm: **CHƯA XÁC MINH**.
- Theo hiểu biết, nội dung này nằm trong "Hướng dẫn quốc gia về các dịch vụ chăm sóc sức khỏe sinh sản" (Quyết định 4128/QĐ-BYT năm 2016). CHƯA XÁC MINH, không được trích làm căn cứ.
- Đơn vị phụ trách hiện nay là Cục Bà mẹ và Trẻ em [2].
- Phác đồ nhi đã xác minh được: 3312/QĐ-BYT ngày 07/8/2015 [42].

---

### 3.6. Thuật ngữ tiếng Việt và ngôn ngữ dễ hiểu

**MSD Manuals** [73] [XM]

- msdmanuals.com/vi là cổng tiếng Việt, với "Cẩm nang MSD – Phiên bản dành cho chuyên gia" (lang="vi").
- Nút "Phiên bản dành cho Người tiêu dùng" trên cổng này dẫn tới msdmanuals.com/home (tiếng Anh); đường dẫn /vi/home bị chuyển hướng sang /home. Vì vậy **chưa có bản tiếng Việt cho người tiêu dùng**.
- **Điều kiện sử dụng**: "Bản quyền © 2026 Merck & Co., Inc.… Bảo lưu mọi quyền".
  - Trang "Quyền" yêu cầu gửi đề nghị tái sử dụng, kèm tiêu đề tài liệu, đường dẫn, kế hoạch xuất bản và phân phối.
  - Terms of Use dẫn người dùng về "MSD country website" của từng nước.
  - Chỉ nên **liên kết**; dùng làm tham chiếu thuật ngữ, không sao chép nội dung.

**Tài nguyên thuật ngữ**

- ICD-10 song ngữ và ICF song ngữ trên icd.kcb.vn: chuẩn tên bệnh chính thức, ví dụ "Bệnh nội tiết, dinh dưỡng và chuyển hoá" [60] [XM].
- Danh mục chữ viết tắt và thuật ngữ trong từng HDCĐ&ĐT.
- Dược thư quốc gia Việt Nam và các từ điển y học Anh–Việt của NXB Y học: CHƯA XÁC MINH ấn bản hiện hành.

**Nghiên cứu hiểu biết sức khỏe (health literacy)** [XM metadata qua Crossref; chưa đọc toàn văn nên không trích số liệu]

- Duong TV và cộng sự, 2017: kiểm định bộ HLS-EU-Q47 ở 6 nước châu Á, có Việt Nam. *J Epidemiol* 27(2):80–86 [74].
- Duong TV và cộng sự, 2019: phát triển bộ ngắn **HLS-SF12** cho 6 nước châu Á. *HLRP* 3(2) [75]. Phù hợp để thử nghiệm người dùng doctor-v.
- Nguyen HC và cộng sự, 2020: người có triệu chứng nghi COVID-19, trầm cảm, chất lượng sống và vai trò của hiểu biết sức khỏe tại Việt Nam. *J Clin Med* 9(4):965 [76].

**Từ ngữ chỉ triệu chứng theo vùng miền**

- Không tìm được nghiên cứu ngôn ngữ học kiểm chứng trong phiên.
- Bảng dưới là **danh sách suy luận**, CHƯA XÁC MINH, cần khảo sát người dùng ở cả ba miền.
- Nguồn nên đối chiếu: Từ điển tiếng Việt (Hoàng Phê chủ biên), các từ điển phương ngữ Nam Bộ. Thông tin xuất bản CHƯA XÁC MINH.

| Khái niệm (từ hiển thị đề xuất) | Hay gặp ở miền Bắc | Hay gặp ở miền Nam (miền Trung thường dùng lẫn) | Rủi ro hiểu nhầm, cách xử lý |
|---|---|---|---|
| Nôn (ói) | nôn, nôn mửa, buồn nôn | ói, ói mửa, mắc ói | Hiển thị "nôn (ói)" |
| Bị bệnh, không khỏe | ốm, bị ốm, ốm đau | bệnh, "bịnh", đau | Ở miền Nam "ốm" nghĩa là **gầy**. Tránh từ "ốm"; sụt cân viết "gầy đi, sụt cân" |
| Đau đầu (nhức đầu) | đau đầu, nhức đầu | nhức đầu | — |
| Tiêu chảy | ỉa chảy, đi ngoài phân lỏng | tiêu chảy, đi cầu (đi tiêu) lỏng | "Đi ngoài" ở miền Bắc nghĩa là đại tiện. Hiển thị "đi ngoài (đi cầu)" |
| Táo bón | táo bón | bón | — |
| Đờm (đàm) | đờm | đàm | — |
| Ngạt mũi (nghẹt mũi) | ngạt mũi, tắc mũi | nghẹt mũi | — |
| Rét run, ớn lạnh | gai rét, rét run | ớn lạnh, lạnh run | Trong dân gian "sốt rét" có thể chỉ sốt kèm rét run. Hỏi "sốt kèm run lạnh" thay vì "sốt rét" |
| Chóng mặt | chóng mặt, hoa mắt, choáng | chóng mặt, xây xẩm | Tách riêng câu hỏi "ngất hoặc suýt ngất" |
| Mệt | mệt mỏi, uể oải | mệt, đuối | — |
| Đau dạ dày (bao tử) | dạ dày | bao tử | — |
| Đầy bụng | đầy bụng, chướng bụng | sình bụng, đầy hơi | — |
| Nổi mẩn, mề đay | mẩn ngứa, nổi mẩn | nổi mề đay, nổi mẩn | — |
| Hắc lào (lác) | hắc lào | lác | — |
| Thủy đậu (trái rạ) | thủy đậu | trái rạ | — |
| Ngã (té) | ngã | té | — |
| Bỏng (phỏng) | bỏng | phỏng | — |
| Li bì, lờ đờ (trẻ) | li bì, lờ đờ | lừ đừ, mê man | Dấu hiệu nguy hiểm: dùng nhiều từ đồng nghĩa trong cùng câu |
| Co giật | co giật, lên cơn giật | co giật, giật kinh | — |
| Tiểu buốt, tiểu rắt | đi tiểu, đi giải | đi tiểu, đi tè; tiểu gắt | — |
| Tê bì (tê rần) | tê bì | tê rần | — |
| Tăng huyết áp | cao huyết áp | "lên máu", "lên tăng-xông" | Hiển thị "tăng huyết áp (cao huyết áp)" |
| Đái tháo đường (tiểu đường) | tiểu đường | tiểu đường | Bộ Y tế dùng "đái tháo đường"; hiển thị cả hai |
| Cảm, trúng gió | cảm, cảm cúm | cảm, trúng gió | "Trúng gió" có thể che lấp đột quỵ hoặc ngộ độc khí: nếu yếu liệt hay méo miệng → 115 |

**Danh mục chuyên khoa cho câu "nên khám chuyên khoa nào"**

- Văn bản pháp lý chuẩn hóa danh mục chuyên khoa: **CHƯA XÁC MINH**. Ứng viên cần kiểm tra: danh mục kỹ thuật và phân tuyến của Bộ Y tế (Thông tư 43/2013/TT-BYT và văn bản thay thế theo Luật Khám bệnh, chữa bệnh 2023); trang dmkt.kcb.vn yêu cầu đăng nhập.
- Đề xuất dùng danh sách sau, bám theo cấu trúc các bộ HDCĐ&ĐT ở mục 3.1 và tên khoa phổ biến:
  - Cấp cứu (Hồi sức cấp cứu – Chống độc)
  - Khám bệnh / Nội tổng quát
  - Y học gia đình, Trạm y tế xã/phường
  - Tim mạch
  - Hô hấp (Phổi), kể cả Lao và bệnh phổi
  - Tiêu hóa – Gan mật
  - Thận – Tiết niệu (nội thận, ngoại tiết niệu)
  - Nội tiết – Đái tháo đường
  - Cơ xương khớp
  - Chấn thương chỉnh hình
  - Thần kinh (Đột quỵ)
  - Truyền nhiễm – Bệnh nhiệt đới
  - Da liễu
  - Tai Mũi Họng
  - Mắt
  - Răng Hàm Mặt
  - Sản phụ khoa
  - Nhi khoa
  - Sức khỏe tâm thần
  - Ngoại tổng quát
  - Ung bướu
  - Huyết học
  - Dị ứng – Miễn dịch lâm sàng
  - Lão khoa
  - Y học cổ truyền
  - Phục hồi chức năng
- Mặc định gán mỗi bệnh vào chuyên khoa của bộ hướng dẫn Bộ Y tế chứa bệnh đó. Trẻ dưới 16 tuổi gán vào Nhi khoa.

---

### 3.7. Số khẩn cấp và đường dây nóng

| Số | Dịch vụ | Đơn vị | Nguồn | Trạng thái |
|---|---|---|---|---|
| **115** | Cấp cứu y tế | Hệ thống cấp cứu ngoại viện, ví dụ TT Cấp cứu 115 TP.HCM | ttcc115.medinet.gov.vn: "Để gọi cấp cứu, nhấn số 115 trên điện thoại" [78] | [XM] |
| 0965 110 115 | Đường dây nóng phản ánh, kiến nghị | TT Cấp cứu 115 TP.HCM | [78] | [XM] (không phải số cấp cứu) |
| **111** | Tổng đài Quốc gia Bảo vệ Trẻ em; nhận cả tin về mua bán người; miễn phí 24/7. Từ 2017 thay số 18001567 | Cục Bà mẹ và Trẻ em, 35 Trần Phú, Hà Nội | tongdai111.vn [77] | [XM] |
| 113, 114, 112 | Công an; cứu hỏa và cứu nạn cứu hộ; tìm kiếm cứu nạn | — | Wikipedia [81] | CHƯA XÁC MINH bằng nguồn chính thức |
| 096.985.1616 | Hotline Bệnh viện Bạch Mai | BV Bạch Mai | bachmai.gov.vn [79] | [XM] (đường dây chung, không phải chống độc) |
| 1900.888.866 | Tổng đài đặt lịch khám | BV Bạch Mai | [79] | [XM] |
| 086 958 7707 | Trung tâm Cấp cứu A9 (lịch sử nhiệm vụ: "hồi sức cấp cứu và chống độc") | BV Bạch Mai | [79] | [XM] số điện thoại của đơn vị; giờ trực chưa rõ |
| ? | Tư vấn chống độc, Trung tâm Chống độc BV Bạch Mai | — | — | **CHƯA XÁC MINH** |
| 0395.135.099 | Hotline | BV Bệnh Nhiệt đới Trung ương | benhnhietdoi.vn [80] | [XM] |
| 1900 9095 | Đường dây nóng Bộ Y tế | Bộ Y tế | — | **CHƯA XÁC MINH** (moh.gov.vn render bằng JS) |
| 024 6273 2093 | Điện thoại Cục QLKCB | Cục QLKCB | kcb.vn [54] | [XM] (máy văn phòng) |
| 1900 6233 | "Tam Ngay Tro Chuyen Lifeline", Wikipedia ghi là đường dây quốc gia về sức khỏe tâm thần và phòng chống tự tử | ? | Wikipedia [81]; tên miền tamngay.vn **không phân giải DNS** | **CHƯA XÁC MINH, không dùng** |
| — | Các đường dây hỗ trợ tâm lý khác (dự án, bệnh viện tâm thần) | — | — | **CHƯA XÁC MINH** |

---

### 3.8. Trang thông tin y tế công uy tín

| Trang | Chủ quản | Dùng cho | Độ tin cậy | Ghi nhận khi kiểm tra (2026-10-24) |
|---|---|---|---|---|
| moh.gov.vn | Bộ Y tế | Văn bản, tin chính thức | Rất cao | Chỉ hiển thị qua JS, khó lưu trữ tự động |
| kcb.vn, icd.kcb.vn | Cục QLKCB | HDCĐ&ĐT, quy trình kỹ thuật, ICD | Rất cao | Danh mục /phac-do không đầy đủ; có lỗi ngày nhỏ |
| vncdc.gov.vn | Cổng cũ của Cục Y tế dự phòng | Tin lịch sử | Trung bình | Chứng chỉ hết hạn; vẫn tên cũ; tin mới nhất 2024 |
| nihe.org.vn | NIHE | Giám sát, xét nghiệm | Cao | Hoạt động bình thường |
| pasteurhcm.gov.vn | Viện Pasteur TP.HCM | Giám sát phía Nam | Cao (nội dung) | Chứng chỉ tự ký |
| ipn.org.vn; tihe.org.vn | Viện Pasteur Nha Trang; Viện VSDT Tây Nguyên | Giám sát miền Trung, Tây Nguyên | Cao | Hoạt động bình thường |
| impe-qn.org.vn | Viện Sốt rét – KST – CT Quy Nhơn | Sốt rét | Cao | Chứng chỉ sai tên miền |
| bachmai.gov.vn; benhviennhitrunguong.gov.vn; benhnhietdoi.vn | BV Bạch Mai; BV Nhi Trung ương; BV Bệnh Nhiệt đới Trung ương | Thông tin bệnh viện, bài phổ thông có chuyên gia | Cao | Hoạt động bình thường |
| choray.vn | BV Chợ Rẫy | Như trên | Cao (dự kiến) | Không kết nối được từ môi trường kiểm tra, CHƯA XÁC MINH |
| medinet.hochiminhcity.gov.vn | Sở Y tế TP.HCM | Thông tin địa phương, 115 | Cao | Hoạt động bình thường |
| suckhoedoisong.vn | Báo Sức khỏe và Đời sống (thuộc Bộ Y tế) | Tin chính sách | Cao với tin chính sách; bài phổ thông cần đối chiếu | — |
| who.int/vietnam, data.who.int | WHO | Dữ liệu, khuyến cáo | Rất cao | who.int chặn bot; data.who.int đọc được |
| Blog BV, nhà thuốc tư nhân | Tư nhân | Tham khảo cách diễn đạt | Thấp – trung bình | Có lỗi số hiệu, ngày; mục tiêu SEO và bán hàng; không dùng làm bằng chứng |

---

## 4. Khuyến nghị cho doctor-v

1. **Thứ bậc nguồn**, ghi vào metadata của từng mục trong nền tri thức:
   1. HDCĐ&ĐT hiện hành của Bộ Y tế (bản PDF ký số).
   2. Hướng dẫn của WHO.
   3. Nghiên cứu dịch tễ Việt Nam đã bình duyệt, cộng STEPS.
   4. Phác đồ của bệnh viện trung ương.
   - Blog tư nhân không dùng làm bằng chứng.
2. **Sổ đăng ký hướng dẫn**:
   - Mỗi văn bản lưu: số Quyết định, ngày, văn bản bị thay thế, URL gốc, bản lưu PDF, SHA-256, ngày truy cập, người kiểm tra.
   - Kiểm tra văn bản thay thế **hằng tháng**: tần suất ban hành 2024–2026 rất cao, và số hiệu có thể trùng giữa các năm (ví dụ 3312/QĐ-BYT năm 2015 và năm 2024).
3. **Nội dung từ hướng dẫn của Bộ Y tế**:
   - Diễn đạt lại bằng tiếng Việt phổ thông, điều này vốn là mục tiêu sản phẩm.
   - Ghi "Theo Hướng dẫn… (QĐ số…/QĐ-BYT ngày…)".
   - Không sao chép hình, bảng của bên thứ ba; không lấy văn bản từ CSDL tư nhân.
   - Xin **ý kiến luật sư SHTT** về khoản 2 Điều 15 (bản sau Luật 131/2025) trước khi phát hành.
4. **Prior**:
   - Tăng huyết áp, đái tháo đường: dùng STEPS 2021 (trích dẫn).
   - Bệnh truyền nhiễm: dùng **hệ số theo mùa và vùng** dựa trên công văn, báo cáo của Bộ Y tế và Cục Phòng bệnh, kèm câu hỏi phơi nhiễm. Không dùng con số tỷ lệ mới mắc tuyệt đối.
   - Niên giám chỉ để xếp thứ tự tương đối các bệnh nặng.
   - **Không dùng IHME** nếu chưa có giấy phép. Dataset WHO: kiểm tra giấy phép ở metadata từng mục.
5. **ICD**:
   - Mỗi bệnh trong nền tri thức gắn mã ICD-10 theo Thông tư 06/2026/TT-BYT và tên tiếng Việt chính thức.
   - Gửi công văn xin Cục QLKCB file dữ liệu và quyền sử dụng; không cào API.
   - Ánh xạ ICD-11 là tùy chọn: giấy phép CC BY-ND, và chưa có tiếng Việt.
6. **Red flags**:
   - Trẻ em: áp dụng nguyên dấu hiệu nguy hiểm IMCI và dấu hiệu ở trẻ dưới 2 tháng (mục 3.5).
   - Người lớn: lấy từ các hướng dẫn tương ứng, như dấu hiệu cảnh báo Dengue (2760), đột quỵ (3312/2024), nhóm nguy cơ cúm (1840).
   - Mọi red flag dẫn tới nút **gọi 115**.
7. **Ngôn ngữ**:
   - Từ điển đồng nghĩa theo vùng miền; dạng hiển thị "chuẩn (địa phương)"; tránh từ "ốm".
   - Kiểm thử với người dùng ở 3 miền, có người cao tuổi; đo hiểu biết sức khỏe bằng HLS-SF12.
8. **Đường dây nóng**:
   - Chỉ hiển thị **115** và **111**, cùng số của bệnh viện đã xác minh.
   - Đường dây chống độc, tâm thần, Bộ Y tế chỉ thêm sau khi có nguồn chính thức.
   - Kiểm tra lại mỗi quý.
9. **Vận hành**:
   - Cập nhật tên cơ quan sau tái cơ cấu: Cục Phòng bệnh; Cục Bà mẹ và Trẻ em phụ trách cả 111.
   - Lưu bản sao vì nhiều tên miền nhà nước bị lỗi chứng chỉ hoặc đã chết.

---

## 5. Câu hỏi mở và rủi ro

**Cần xác minh tiếp, theo thứ tự ưu tiên**

1. Tên đầy đủ, ngày ký, hiệu lực của **Thông tư 06/2026/TT-BYT** (ICD-10), và số văn bản của "bản trước".
2. Đường dây nóng **Bộ Y tế** (1900 9095?), **Trung tâm Chống độc Bạch Mai**, và đường dây **sức khỏe tâm thần, phòng chống tự tử** đang hoạt động.
3. **Niên giám thống kê y tế** bản mới nhất, cấu trúc bảng mắc và chết.
4. Văn bản **IMCI của Việt Nam**.
5. Lộ trình **ICD-11** của Bộ Y tế.
6. Website hiện hành của **Cục Phòng bệnh**.
7. Nguồn chính thức cho các số **113, 114, 112**.
8. Toàn văn khoản 2 Điều 15 sau Luật 131/2025; điều khoản định nghĩa "văn bản hành chính" trong Nghị định 17/2023 và Nghị định 134/2026; tình trạng của Nghị định 30/2020.
9. Danh mục tỉnh sau sắp xếp 2025 để làm prior theo vùng.

**Rủi ro**

- **Pháp lý (bản quyền)**: cách hiểu "văn bản hành chính" chưa có án lệ hay hướng dẫn rõ về tài liệu chuyên môn kèm quyết định. Hình, bảng của bên thứ ba nhúng trong hướng dẫn vẫn là rủi ro.
- **Giấy phép dữ liệu**: IHME cấm sử dụng thương mại. WHO ghi giấy phép mâu thuẫn. Vi dữ liệu STEPS chỉ được dùng phi thương mại.
- **Độ cũ của hướng dẫn**: tăng huyết áp (2010) và nhiều bộ chuyên khoa (2012–2015) có thể lệch so với chuẩn quốc tế. Cần bác sĩ duyệt, ghi rõ "theo hướng dẫn Bộ Y tế năm…".
- **Thiên lệch prior**: dữ liệu bệnh viện thiếu bệnh nhẹ ở cộng đồng; không có dữ liệu lý do khám ở tuyến ban đầu.
- **Ranh giới khám bệnh từ xa và thiết bị y tế**: Công văn 7780/BYT-KCB (10/2026) về thí điểm khám bệnh từ xa; phân loại phần mềm thiết bị y tế (xem legal-regulatory.md).
- **Hạ tầng nguồn**: tên miền, chứng chỉ và đường dẫn thay đổi sau tái cơ cấu 2025–2026.

---

## 6. Tài liệu tham khảo

Tất cả truy cập ngày 2026-10-24.

1. Chính phủ. Nghị định 313/2026/NĐ-CP (08/8/2026), chức năng, nhiệm vụ, cơ cấu Bộ Y tế. https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/8/313_2026_nd-cp_08082026_1-signed-1-.signed.pdf
2. VOV. Bộ Y tế có 19 đơn vị thuộc cơ cấu tổ chức mới. https://vov.vn/chinh-tri/bo-y-te-co-19-don-vi-thuoc-co-cau-to-chuc-moi-post1322415.vov
3. Cổng PBGDPL Cần Thơ. Bộ Y tế có 19 đơn vị trực thuộc. https://pbgdpl.cantho.gov.vn/bo-y-te-co-19-don-vi-truc-thuoc
4. Cục QLKCB. Mục Hướng dẫn chẩn đoán, điều trị. https://kcb.vn/phac-do
5. Cục QLKCB. Quyết định 1740/QĐ-BYT (viêm gan B), tin và PDF. https://kcb.vn/tin-tuc/quyet-dinh-1740-qd-byt-ban-hanh-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-viem-gan-vi-rut-b.html ; https://kcb.vn/upload/2005611/20260617/BYT__QD_ban_hanh_HDCDT_viem_gan_vi_rut_B_-_final_2_signed_8c1b5.pdf
6. Sở Y tế Lai Châu. PDF Quyết định 2760/QĐ-BYT. https://soyte.laichau.gov.vn/upload/81345/20230721/2760_QD-BYT_b2ef21fbba.pdf
7. Caselaw. Quyết định 3705/QĐ-BYT (2019), ghi chú thay thế. https://caselaw.vn/van-ban-phap-luat/331396-quyet-dinh-so-3705-qd-byt-ngay-22-08-2019-ve-huong-dan-chan-doan-dieu-tri-sot-xuat-huyet-dengue
8. Đại biểu Nhân dân (01/4/2026). Bệnh lây nhiễm tay chân miệng tăng cao, Bộ Y tế chỉ đạo khẩn. https://daibieunhandan.vn/benh-lay-nhiem-tay-chan-mieng-tang-cao-bo-y-te-chi-dao-khan-10411884.html
9. Hoatieu. Quyết định 292/QĐ-BYT 2024. https://hoatieu.vn/phap-luat/tai-quyet-dinh-292-qd-byt-2024-224435
10. Sức khỏe và Đời sống. Bộ Y tế ban hành hướng dẫn chẩn đoán và điều trị cúm mùa 2025. https://suckhoedoisong.vn/bo-y-te-ban-hanh-huong-dan-chan-doan-va-dieu-tri-cum-mua-2025-nhieu-diem-moi-169250604142932172.htm
11. Cổng TP Hải Phòng. PDF Hướng dẫn chẩn đoán và điều trị cúm mùa (2025). https://cdn.haiphong.gov.vn/gov-hpg/6530/tintuc/2025/6/huong-dan-chan-doan-va-dieu-tri-cum-mua638847998155197635.pdf
12. Caselaw. Quyết định 2671/QĐ-BYT ngày 26/06/2023. https://caselaw.vn/van-ban-phap-luat/508431-quyet-dinh-so-2671-qd-byt-ngay-26-06-2023-cua-bo-truong-bo-y-te-huong-dan-chan-doan-va-dieu-tri-covid-19
13. Sở Y tế Lai Châu. Quyết định ban hành Hướng dẫn chẩn đoán và điều trị COVID-19. https://soyte.laichau.gov.vn/ttksbenhtat/quan-ly-nha-nuoc/quyet-dinh-ve-viec-ban-hanh-huong-dan-chan-doan-va-dieu-tri-.html
14. LuatVietnam. Quyết định 1019/QĐ-BYT 2025 (sởi). https://luatvietnam.vn/y-te/quyet-dinh-1019-qd-byt-2025-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-benh-soi-395950-d1.html
15. TTYT Hóc Môn. Quyết định 1019/QĐ-BYT ngày 26/3/2025. https://trungtamytehocmon.medinet.gov.vn/van-ban/quyet-dinh-so-1019qd-byt-ngay-26-thang-3-nam-2025-cua-bo-y-te-ve-viec-ban-hanh-vbctmobile13666-219529.aspx
16. LuatVietnam. Quyết định 162/QĐ-BYT 2024 (lao). https://luatvietnam.vn/y-te/quyet-dinh-162-qd-byt-2024-huong-dan-chan-doan-dieu-tri-va-du-phong-benh-lao-292589-d1.html
17. PDF Quyết định 162/QĐ-BYT. https://storage-vnportal.vnpt.vn/cbg-ubnd/4934/T1/qd-162-2024-byt-dieu-tri-du-phong-benh-lao.pdf
18. Cục QLKCB. Hướng dẫn chẩn đoán và điều trị tăng huyết áp (3192/QĐ-BYT). https://kcb.vn/phac-do/huong-dan-chan-doan-va-dieu-tri-tang-huyet-ap.html ; https://kcb.vn/upload/2005611/20210723/huong_dan_chan_doan_dieu_tri_tha.pdf
19. LuatVietnam. Quyết định 5904/QĐ-BYT (2019). https://luatvietnam.vn/y-te/quyet-dinh-5904-qd-byt-bo-y-te-179976-d1.html
20. Cục QLKCB. Hướng dẫn chẩn đoán và điều trị đái tháo đường type 2; Caselaw 5481/QĐ-BYT. https://kcb.vn/phac-do/h-uong-dan-chan-doan-va-dieu-tri-dai-thao-duong-type-2.html ; https://caselaw.vn/van-ban-phap-luat/369321-quyet-dinh-so-5481-qd-byt-ngay-30-12-2020-ve-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-dai-thao-duong-tip-2-ban-hanh-boi-bo-truong-bo-y-te
21. Thư viện Pháp luật. Quyết định 1353/QĐ-BYT 2021 (chỉ dùng tiêu đề). https://thuvienphapluat.vn/van-ban/The-thao-Y-te/Quyet-dinh-1353-QD-BYT-2021-sua-doi-Quyet-dinh-5481-QD-BYT-dieu-tri-dai-thao-duong-tip-2-465643.aspx
22. LuatVietnam; Thư viện Pháp luật. Quyết định 3312/QĐ-BYT 2024 (đột quỵ não). https://luatvietnam.vn/y-te/quyet-dinh-3312-qd-byt-2024-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-dot-quy-nao-397568-d1.html ; https://thuvienphapluat.vn/van-ban/The-thao-Y-te/Quyet-dinh-3312-QD-BYT-2024-tai-lieu-chuyen-mon-Huong-dan-chan-doan-dieu-tri-dot-quy-nao-651734.aspx
23. Viện Sốt rét – KST – CT Quy Nhơn. Quyết định 3377/QĐ-BYT ngày 30/8/2023. https://www.impe-qn.org.vn/van-ban-cua-bo-y-te/quyet-dinh-so-3377qd-byt-ngay-3082023-huong-dan-chan-doan-va-dieu-tri-benh-sot/ctmb/33/11734
24. LuatVietnam. Quyết định 1622/QĐ-BYT (08/05/2014). https://luatvietnam.vn/y-te/quyet-dinh-1622-qd-byt-bo-y-te-86760-d1.html
25. VNRAS. Hướng dẫn chẩn đoán và xử trí ngộ độc, Quyết định 3610/QĐ-BYT. https://vnras.com/huong-dan-chan-doan-va-xu-tri-ngo-doc-theo-bo-y-te-quyet-dinh-so-3610-qd-byt-ngay-31-08-2015/
26. Trung tâm DI&ADR Quốc gia. Hướng dẫn chẩn đoán và xử trí ngộ độc. http://canhgiacduoc.org.vn/Hotro/daotao/519/H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-ch%E1%BA%A9n-%C4%91o%C3%A1n-v%C3%A0-x%E1%BB%AD-tr%C3%AD-ng%E1%BB%99-%C4%91%E1%BB%99c.htm
27. ĐHYD TP.HCM. Bài giảng Ngộ độc methanol (TS.BS Lê Quốc Hùng). https://admin.ump.edu.vn/uploads/ckeditor/files/6A%20-%20Ngo%20doc%20METHANOL%20-%20TS_BS_Le%20Quoc%20Hung.pdf
28. Hoatieu. Quyết định 6101/QĐ-BYT 2019 (Whitmore). https://hoatieu.vn/phap-luat/quyet-dinh-6101-qd-byt-2019-192833
29. Cục QLKCB. PDF Hướng dẫn chẩn đoán và điều trị một số bệnh truyền nhiễm (5642/QĐ-BYT; NXB Y học 2016). https://kcb.vn/upload/2005611/20210723/Truyen-nhiem-1.pdf
30. Sở Y tế Hà Nội. Công văn 1721/SYT-NVY (02/3/2026), kèm Quyết định 493/QĐ-BYT và 499/QĐ-BYT (13/02/2026, Nipah). https://datafiles.hanoi.gov.vn/gov-hni/6778/VanBan/2026/3/2/1721%20SYT.pdf
31. LuatVietnam. Quyết định 4235/QĐ-BYT (hô hấp). https://luatvietnam.vn/y-te/quyet-dinh-4235-qd-byt-cua-bo-y-te-ve-viec-ban-hanh-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-benh-ho-hap-345865-d1.html
32. VNRAS. Hướng dẫn bệnh hô hấp, ghi ngày 31/12/2012 (mâu thuẫn). https://vnras.com/huong-dan-chan-doan-va-dieu-tri-benh-ho-hap-theo-bo-y-te-quyet-dinh-so-4235-qd-byt-ngay-31-12-2012/
33. Cục QLKCB. Quyết định 2767/QĐ-BYT (COPD). https://kcb.vn/phac-do/quyet-dinh-2767-qd-byt-cua-bo-y-te-ngay-04-07-2023-ve-viec-ban-hanh-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-.html
34. VNRAS. Quyết định 1851/QĐ-BYT (hen). https://vnras.com/huong-dan-chan-doan-va-dieu-tri-hen-phe-quan-nguoi-lon-va-tre-em-tu-12-tuoi-tro-len-theo-bo-y-te-quyet-dinh-so-1851-qd-byt-ngay-24-04-2020/
35. Cục QLKCB. Quyết định 2388/QĐ-BYT (bệnh thận mạn). https://kcb.vn/phac-do/quyet-dinh-so-2388-qd-byt-ngay-12-8-2024-ve-viec-ban-hanh-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-benh-than-.html?categoryId=101796520
36. Cục QLKCB. Quyết định 1857/QĐ-BYT (suy tim). https://kcb.vn/phac-do/quyet-dinh-1857-qd-byt-ngay-05-07-2022-ve-viec-ban-hanh-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-suy-tim-cap-.html
37. VNRAS. Quyết định 2187/QĐ-BYT (hội chứng mạch vành cấp). https://vnras.com/huong-dan-chan-doan-va-xu-tri-hoi-chung-mach-vanh-cap-theo-bo-y-te-quyet-dinh-so-2187-qd-byt-ngay-03-06-2019/
38. VNRAS. Quyết định 2248/QĐ-BYT (hội chứng mạch vành mạn). https://vnras.com/quyet-dinh-so-2248-qd-byt-ngay-19-thang-5-nam-2023-cua-bo-y-te-ve-viec-ban-hanh-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-hoi-chung-mach-vanh-man/
39. Caselaw. Quyết định 3879/QĐ-BYT (nội tiết). https://caselaw.vn/van-ban-phap-luat/161370-quyet-dinh-so-3879-qd-byt-ngay-30-09-2014-cua-bo-truong-bo-y-te-ve-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-benh-noi-tiet-chuyen-hoa
40. ACC Group. Quyết định 361/QĐ-BYT (cơ xương khớp). https://accgroup.vn/quyet-dinh-361-qd-byt
41. Bệnh viện Ninh Hòa. Danh sách phác đồ của Bộ Y tế. https://benhvienninhhoa.khanhhoa.gov.vn/Danhsachtin/tabid/66/categoryid/0_phacdodieutriBo/pg/2/Default.aspx
42. VNRAS. Quyết định 3312/QĐ-BYT (07/08/2015, nhi khoa). https://vnras.com/huong-dan-chan-doan-va-dieu-tri-mot-so-benh-thuong-gap-o-tre-em-theo-bo-y-te-quyet-dinh-so-3312-qd-byt-ngay-07-08-2015/
43. Caselaw. Quyết định 315/QĐ-BYT (sản phụ khoa). https://caselaw.vn/van-ban-phap-luat/157786-quyet-dinh-315-qd-byt-nam-2015-ve-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-cac-benh-san-phu-khoa-do-bo-truong-bo-y-te-ban-hanh
44. Caselaw; Cục QLKCB. Quyết định 75/QĐ-BYT (da liễu). https://caselaw.vn/van-ban-phap-luat/158205-quyet-dinh-75-qd-byt-nam-2015-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-cac-benh-da-lieu-do-bo-truong-bo-y-te-ban-hanh ; https://kcb.vn/upload/2005611/20210723/Huong-dan-chan-doan-dieu-tri-Da-lieu.pdf
45. VNRAS. Quyết định 5643/QĐ-BYT (tai mũi họng). https://vnras.com/huong-dan-chan-doan-va-dieu-tri-mot-so-benh-ve-tai-mui-hong-theo-bo-y-te-quyet-dinh-so-5643-qd-byt-ngay-31-12-2015/
46. VNRAS. Quyết định 40/QĐ-BYT (mắt). https://vnras.com/huong-dan-chan-doan-va-dieu-tri-cac-benh-ve-mat-theo-bo-y-te-quyet-dinh-so-40-qd-byt-ngay-12-01-2015/
47. VNRAS. Quyết định 3108/QĐ-BYT (răng hàm mặt). https://vnras.com/huong-dan-chan-doan-va-dieu-tri-mot-so-benh-ve-rang-ham-mat-theo-bo-y-te-quyet-dinh-so-3108-qd-byt-ngay-28-07-2015/
48. VNRAS. Quyết định 2058/QĐ-BYT (tâm thần). https://vnras.com/huong-dan-chan-doan-va-dieu-tri-mot-so-roi-loan-tam-than-thuong-gap-theo-bo-y-te-quyet-dinh-so-2058-qd-byt-ngay-14-05-2020/
49. Caselaw. Quyết định 1493/QĐ-BYT (hồi sức tích cực). https://caselaw.vn/van-ban-phap-luat/156114-quyet-dinh-1493-qd-byt-nam-2015-ve-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-xu-tri-hoi-suc-tich-cuc-do-bo-truong-bo-y-te-ban-hanh
50. Caselaw. Quyết định 1832/QĐ-BYT (huyết học). https://caselaw.vn/van-ban-phap-luat/508729-quyet-dinh-so-1832-qd-byt-ngay-01-07-2022-cua-bo-truong-bo-y-te-ve-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-mot-so-benh-ly-huyet-hoc
51. Sở Y tế Đồng Nai. Bản sao Quyết định 2065/QĐ-BYT (viêm gan C). https://syt.dongnai.gov.vn/Lists/Vn%20bn/Attachments/5478/dinh%20kem%203289.pdf
52. VNRAS. Quyết định 1514/QĐ-BYT (ung bướu). https://vnras.com/huong-dan-chan-doan-va-dieu-tri-mot-so-benh-ung-buou-theo-bo-y-te-quyet-dinh-so-1514-qd-byt-ngay-01-04-2020/
53. VNRAS. Quyết định 3510/QĐ-BYT (11/11/2025, bệnh thần kinh do đái tháo đường). https://vnras.com/quyet-dinh-so-3510-qd-byt-ngay-11-thang-11-nam-2025-ve-viec-ban-hanh-tai-lieu-chuyen-mon-huong-dan-chan-doan-va-dieu-tri-benh-than-kinh-dai-thao-duong/
54. Cục QLKCB. Trang chủ (thông tin liên hệ; tin Ebola; Công văn 7780/BYT-KCB). https://kcb.vn/ ; https://kcb.vn/tin-tuc/bo-y-te-thi-diem-huong-dan-kham-benh-chua-benh-tu-xa.html
55. Cục Bản quyền tác giả. Giới thiệu Luật sửa đổi, bổ sung Luật SHTT 2025 (quyền tác giả). https://cov.gov.vn/tin-tuc/gioi-thieu-luat-sua-doi-bo-sung-mot-so-dieu-cua-luat-so-huu-tri-tue-nam-2025-noi-dung-quyen-tac-gia-quyen-lien-quan-168841.html
56. Lawgical. Luật 131/2025/QH15. https://lawgical.vn/tra-cuu/van-ban/luat-131-2025-qh15
57. ACC Group. Các đối tượng không thuộc phạm vi bảo hộ quyền tác giả. https://accgroup.vn/cac-doi-tuong-khong-thuoc-pham-vi-bao-ho-quyen-tac-gia
58. GV Lawyers. Đối tượng được bảo hộ quyền tác giả. https://gvlawyers.com.vn/doi-tuong-duoc-bao-ho-quyen-tac-gia-theo-quy-dinh-moi
59. Cổng HCC Nghệ An. Nghị định 17/2023/NĐ-CP. https://hcc.nghean.gov.vn/laws/detail/Nghi-dinh-so-17-2023-ND-CP-cua-Chinh-phu-Quy-dinh-chi-tiet-mot-so-dieu-va-bien-phap-thi-hanh-Luat-So-huu-tri-tue-ve-quyen-tac-gia-quyen-lien-quan-869/
60. Cục QLKCB. ICD-Vietnam, hệ thống quản lý mã hóa lâm sàng. https://icd.kcb.vn/
61. WHO. ICD-11 for Mortality and Morbidity Statistics, bản 2026-01. https://icd.who.int/browse/2026-01/mms/en
62. Wikipedia. ICD-11 (giấy phép CC BY-ND 3.0 IGO). https://en.wikipedia.org/wiki/ICD-11
63. IHME. Free-of-Charge Non-Commercial User Agreement. https://www.healthdata.org/Data-tools-practices/data-practices/ihme-free-charge-non-commercial-user-agreement
64. WHO. data.who.int, Viet Nam. https://data.who.int/countries/704
65. WHO. data.who.int Terms and conditions. https://data.who.int/redirect-pages/footer/learn-more/terms-and-conditions
66. WHO NCD Microdata Repository. Viet Nam STEPS 2021. https://extranet.who.int/ncdsmicrodata/index.php/catalog/948
67. WHO WPRO (2025). National survey on the risk factors of noncommunicable diseases in Viet Nam, 2021. https://extranet.who.int/ncdsmicrodata/index.php/catalog/948/download/6937
68. WHO NCD Microdata Repository. Viet Nam STEPS 2015 và 2009. https://extranet.who.int/ncdsmicrodata/index.php/catalog/590 ; https://extranet.who.int/ncdsmicrodata/index.php/catalog/719
69. Dữ liệu pháp luật. Thông tư 15/2026/TT-BYT hướng dẫn Luật Phòng bệnh. https://dulieuphapluat.vn/van-ban/y-te-van-ban/thong-tu-152026tt-byt-huong-dan-luat-phong-benh-do-bo-truong-bo-y-te-ban-hanh-1259492.html
70. Sở Y tế Hà Tĩnh. Công văn của Cục Phòng bệnh về liên cầu lợn (tệp "942-Cuc-PB", 08/2025). https://soyte.hatinh.gov.vn/upload/1000030/20250807/942-Cuc-PB_d19456e407.pdf
71. Báo Pháp luật Việt Nam. Tăng ca nhiễm ở Huế và Hưng Yên, Cục Phòng bệnh yêu cầu "siết" phòng, chống liên cầu lợn. https://baophapluat.vn/tang-ca-nhiem-o-hue-va-hung-yen-cuc-phong-benh-yeu-cau-siet-phong-chong-lien-cau-lon-lay-sang-nguoi.html
72. WHO (2014). Integrated Management of Childhood Illness: distance learning course, gồm Chart booklet. IRIS handle 10665/104772. https://iris.who.int/handle/10665/104772
73. MSD Manuals. Cổng tiếng Việt; Phiên bản chuyên gia; Quyền; Terms of use. https://www.msdmanuals.com/vi ; https://www.msdmanuals.com/vi/professional ; https://www.msdmanuals.com/vi/professional/content/permissions ; https://www.msdmanuals.com/home/content/termsofuse
74. Duong TV et al. Measuring health literacy in Asia: Validation of the HLS-EU-Q47 survey tool in six Asian countries. J Epidemiol 2017;27(2):80–86. https://doi.org/10.1016/j.je.2016.09.005
75. Duong TV et al. Development and Validation of a New Short-Form Health Literacy Instrument (HLS-SF12) for the General Public in Six Asian Countries. HLRP 2019;3(2). https://doi.org/10.3928/24748307-20190225-01
76. Nguyen HC et al. People with Suspected COVID-19 Symptoms Were More Likely Depressed… The Potential Benefit of Health Literacy. J Clin Med 2020;9(4):965. https://doi.org/10.3390/jcm9040965
77. Tổng đài Quốc gia Bảo vệ Trẻ em 111. https://tongdai111.vn/
78. Trung tâm Cấp cứu 115 TP.HCM. http://ttcc115.medinet.gov.vn/Default.aspx
79. Bệnh viện Bạch Mai. Trang chủ; Trung tâm Cấp cứu A9. https://bachmai.gov.vn/ ; https://bachmai.gov.vn/don-vi/trung-tam-cap-cuu-a9/60a668af-6bd7-e930-1bf2-59765f13d55f
80. Bệnh viện Bệnh Nhiệt đới Trung ương. https://www.benhnhietdoi.vn/
81. Wikipedia. List of suicide crisis lines; Telephone numbers in Vietnam. https://en.wikipedia.org/wiki/List_of_suicide_crisis_lines ; https://en.wikipedia.org/wiki/Telephone_numbers_in_Vietnam
82. Viện Vệ sinh dịch tễ Trung ương. https://nihe.org.vn/
83. Viện Pasteur Nha Trang. https://ipn.org.vn/
84. Viện Vệ sinh dịch tễ Tây Nguyên. https://tihe.org.vn/
85. Cổng cũ của Cục Y tế dự phòng (chứng chỉ hết hạn). https://vncdc.gov.vn/
86. Viện Pasteur TP.HCM (chứng chỉ tự ký). https://www.pasteurhcm.gov.vn/
87. Bệnh viện Nhi Trung ương. https://benhviennhitrunguong.gov.vn/
88. Sở Y tế TP.HCM (Medinet). https://medinet.hochiminhcity.gov.vn/
89. Hệ thống pháp luật. Quyết định 1996/QĐ-BYT năm 2025 (ghi phiếu nguyên nhân tử vong). https://hethongphapluat.com/quyet-dinh-1996-qd-byt-nam-2025-ve-huong-dan-ghi-phieu-chan-doan-nguyen-nhan-tu-vong-tai-cac-co-so-kham-benh-chua-benh-do-bo-truong-bo-y-te-ban-hanh.html
90. VNRAS. Quyết định 3756/QĐ-BYT (2018). https://vnras.com/quyet-dinh-3756-qd-byt/
91. Nhà thuốc Long Châu. Phác đồ điều trị sốt xuất huyết mới nhất (ví dụ ghi sai ngày 2760/QĐ-BYT, theo kết quả tìm kiếm). https://nhathuoclongchau.com.vn/bai-viet/phac-do-dieu-tri-sot-xuat-huyet-moi-nhat-theo-huong-dan-cua-bo-y-te.html
