# Quy tắc viết tiếng Việt

Áp dụng cho **mọi câu chữ người dùng nhìn thấy**: câu hỏi, lựa chọn trả lời, lời giải thích, tên bệnh, mô tả bệnh, lời khuyên, cảnh báo.

Người đọc mục tiêu: người cao tuổi, người chỉ học hết cấp 2, người ở cả 3 miền, đang lo lắng vì bản thân hoặc người thân không khỏe. Họ đọc trên điện thoại, có khi với chữ rất to.

Một số quy tắc được kiểm tra tự động bằng `npm run kb:check` (đánh dấu ⚙).

---

## 1. Nguyên tắc chung

1. **Mỗi câu một ý.** Nếu có chữ "và" nối hai ý khác nhau, tách thành hai câu, hoặc hai câu hỏi.
2. **Câu ngắn.**
   - Câu hỏi: tối đa **15 từ** (⚙ cảnh báo khi quá 15, lỗi khi quá 25).
   - Mỗi câu giải thích, mô tả, lời khuyên: tối đa **25 từ** (⚙ cảnh báo khi quá 25).
   - Lựa chọn trong danh sách chọn nhiều: tối đa **12 từ**.
3. **Từ thông dụng trước, thuật ngữ trong ngoặc.** Ví dụ: "ợ chua (trào ngược dạ dày)", "cứng gáy (cổ cứng, khó cúi xuống)".
4. **Viết khẳng định.** Không dùng phủ định kép.
   - ✗ "Không phải là không đau đúng không?"
   - ✓ "Có đau không?"
5. **Trả lời được bằng Có / Không / Không rõ** đối với câu hỏi loại có/không. Không gộp hai điều kiện vào một câu hỏi, trừ khi chúng là một dấu hiệu duy nhất ("vàng da, vàng mắt").
6. **Mốc thời gian cụ thể.** "Trong 24 giờ qua", "từ 3 ngày trở lên". Tránh "gần đây", "lâu nay" khi có thể nói cụ thể.
7. **Số và đơn vị.**
   - Viết bằng chữ số: "3 ngày", "2 lần".
   - Dấu thập phân là dấu phẩy: "37,5°C".
   - Khoảng: dùng gạch ngang "3–5 ngày".
8. **Trình bày.**
   - Không viết hoa toàn bộ câu. Không dùng chữ nghiêng.
   - Nhấn mạnh bằng chữ **đậm**, dùng ít.
   - Câu hỏi kết thúc bằng dấu "?" (⚙).
9. **Không viết tắt** khi người dùng có thể không hiểu ("SXH" → "sốt xuất huyết"). Ngoại lệ đã phổ biến: "COVID-19".
10. **Chuẩn Unicode dựng sẵn (NFC)** (⚙). Văn bản chép từ PDF đôi khi ở dạng tổ hợp (NFD), nhìn giống nhưng tìm kiếm sai.
11. **Kiểu đặt dấu thanh:** dùng "hòa, khỏe, thủy, hủy" (dấu đặt trên nguyên âm thứ hai của "oa, oe, uy").

## 2. Xưng hô

- **Ưu tiên câu không cần đại từ:** "Có sốt không?", "Đau ở vùng nào?", "Đã bị bao nhiêu ngày?".
- Khi bắt buộc phải có chủ ngữ:
  - kiểm tra cho bản thân: **"bạn"**;
  - kiểm tra cho người thân từ 13 tuổi trở lên: **"người bệnh"**;
  - kiểm tra cho trẻ dưới 13 tuổi: **"bé"**.
- Câu nào cần đổi chủ ngữ theo người được kiểm tra thì viết thêm trường `question_other_vi` (xem `docs/kb-guide.md`).
- Không dùng "quý khách", "quý vị" (xa cách, dài), không dùng "mày, tao, cậu".

## 3. Dấu hiệu nguy hiểm

Đây là phần quan trọng nhất về an toàn. Người dùng phải nhận ra được dấu hiệu ngay, không cần kiến thức y khoa.

- **Mô tả bằng điều nhìn thấy, cảm thấy được**, kèm mức độ cụ thể:
  - ✓ "Khó thở đến mức không nói trọn câu"
  - ✓ "Môi hoặc đầu ngón tay tím tái"
  - ✓ "Lơ mơ, gọi hỏi không tỉnh táo hẳn"
  - ✗ "Suy hô hấp", "Rối loạn ý thức"
- **Mỗi dấu hiệu tối đa 12 từ** trong danh sách chọn nhiều.
- **Mỗi dấu hiệu nguy hiểm phải có câu hỏi thay thế** (`alt_question_vi`), dùng khi người dùng trả lời "Không rõ". Câu thay thế hỏi theo cách khác, dễ quan sát hơn.
  - Câu chính: "Có cứng gáy không?"
  - Câu thay thế: "Có cúi đầu cho cằm chạm ngực được không?" (khi đó "Không" mới là dấu hiệu nguy hiểm; ghi rõ chiều câu trả lời trong dữ liệu).

## 4. Từ địa phương và từ dễ nhầm

Hiển thị theo dạng **"từ phổ thông (từ địa phương)"** khi hai cách nói đều phổ biến. Tất cả biến thể đều được đưa vào từ điển tìm kiếm.

| Phổ thông | Biến thể thường gặp | Ghi chú |
|---|---|---|
| nôn | ói, mửa | Hiển thị "nôn (ói)" |
| đi ngoài | đi cầu, đi tiêu | |
| tiêu chảy | đi ngoài phân lỏng, đi lỏng | |
| đau dạ dày | đau bao tử | Miền Nam hay nói "bao tử" |
| đau đầu | nhức đầu | |
| sổ mũi | chảy nước mũi | |
| ớn lạnh | rét run, lạnh run | |
| chóng mặt | choáng váng, xây xẩm | Phân biệt "chóng mặt" (quay cuồng) với "choáng" (sắp ngất) khi cần |
| mệt mỏi | uể oải, đuối sức | |
| ho có đờm | ho có đàm | Miền Nam nói "đàm" |
| bị bệnh | bị ốm | **Không dùng "ốm"**: miền Bắc hiểu là bệnh, miền Nam hiểu là gầy |
| gầy sút | ốm đi, sụt cân | Dùng "sụt cân" |
| đau nhức người | ê ẩm, mỏi người | |

**Từ dân gian** như "cảm", "trúng gió", "nóng trong", "trúng thực":
- không dùng làm tên bệnh hay kết quả;
- có thể đưa vào từ điển tìm kiếm để dẫn người dùng đến triệu chứng thật (ví dụ "trúng gió" → chóng mặt, buồn nôn, đau đầu, ớn lạnh).

## 5. Tên bệnh

- Mỗi bệnh có **tên chính thức** (theo ICD-10 tiếng Việt của Bộ Y tế khi tra được) và **tên thường gọi**.
- Màn hình kết quả hiển thị tên thường gọi trước, tên chính thức sau nếu khác: "Đau bụng kinh (thống kinh)".
- Không giảm nhẹ hay phóng đại tên bệnh để "trấn an" hoặc "dọa".

## 6. Những điều cấm

| Cấm | Lý do | Thay bằng |
|---|---|---|
| "chẩn đoán", "kết luận", "bạn bị bệnh X" | App không chẩn đoán (định vị pháp lý) | "tình trạng có thể liên quan", "phù hợp với…" |
| "chắc chắn", "100%", "không sao đâu", "khỏi hẳn" | Hứa hẹn sai sự thật | "nhiều khả năng", "thường tự khỏi trong…" |
| "bác sĩ AI", "khám online" | Gây hiểu là hành nghề y | "công cụ thông tin sức khỏe" |
| Tên thuốc kê đơn, liều thuốc | Ngoài phạm vi, nguy hiểm | "hỏi bác sĩ hoặc dược sĩ trước khi dùng thuốc" |
| Ngôn từ gây hoảng sợ | Người dùng đang lo lắng | Nói rõ việc cần làm ngay |

**Ngoại lệ có kiểm soát về thuốc:**
- Được nhắc thuốc không kê đơn **không kèm liều**, khi đó là lời khuyên an toàn đã có trong hướng dẫn chính thức. Ví dụ: "Khi nghi sốt xuất huyết, **không** tự dùng aspirin hoặc ibuprofen".
- Được nhắc "dung dịch bù nước (oresol)" cho tiêu chảy.
- Mỗi trường hợp phải có nguồn.

## 7. Con số và xác suất

- Viết "khoảng 65%"; dưới 5% thì viết "dưới 5%". Không bao giờ viết 0% hay 100%.
- Giải thích bằng tần suất tự nhiên: "Trong 100 người trả lời giống bạn, ước tính khoảng 65 người là do tình trạng này. Đây là ước tính, không phải kết luận."
- Không đặt nhãn chữ kiểu "khả năng cao/thấp" cạnh con số (dễ hiểu sai).

## 8. Ví dụ

| Chưa tốt | Tốt hơn | Vì sao |
|---|---|---|
| "Bạn có bị đau đầu kèm buồn nôn và sợ ánh sáng không?" | 3 câu riêng: "Có đau đầu không?", "Có buồn nôn không?", "Ánh sáng có làm khó chịu hơn không?" | Mỗi câu một ý |
| "Có xuất hiện dấu hiệu màng não không?" | "Có cứng gáy (cổ cứng, khó cúi xuống) không?" | Mô tả điều quan sát được |
| "Tình trạng sốt kéo dài bao lâu rồi?" | "Đã sốt bao nhiêu ngày?" | Ngắn, cụ thể |
| "Có đau thượng vị không?" | "Có đau vùng trên rốn (thượng vị) không?" | Từ thông dụng trước |
| "Có tiểu buốt, tiểu rắt không?" | "Có đau buốt khi đi tiểu không?" và "Có phải đi tiểu nhiều lần, mỗi lần ít không?" | Hai dấu hiệu khác nhau |
| "Bạn bị viêm ruột thừa." | "Viêm ruột thừa: khoảng 40%. Cần đi khám ngay để loại trừ." | Không kết luận |

## 9. Quy trình rà soát câu chữ

1. Kiểm tra tự động (⚙): độ dài câu, từ cấm, dấu câu, Unicode NFC, khoảng trắng thừa.
2. Rà soát bằng "nhân vật mô phỏng": người 70 tuổi học hết cấp 2, ở miền Bắc, miền Trung, miền Nam. Hỏi: "Câu này có chỗ nào khó hiểu hoặc có thể hiểu sai không?". Cách này chỉ là bổ sung, không thay được người thật.
3. Chủ dự án đọc mẫu ở mỗi mốc duyệt.
4. Khi có bác sĩ: bác sĩ kiểm tra câu chữ có đúng về chuyên môn không (câu dễ hiểu nhưng sai nghĩa y khoa là lỗi nghiêm trọng hơn câu khó hiểu).
