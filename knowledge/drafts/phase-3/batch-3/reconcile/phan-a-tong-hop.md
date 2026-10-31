# Lượt C, Giai đoạn 3 lô 3, phần a (đường hô hấp dưới ở người lớn): báo cáo chung

- Người thực hiện: `agent:pass-c`, 31/10/2026. Không đọc bộ ca giữ kín. Không chạy git.
- Bệnh mới: acute_bronchitis, asthma, copd_exacerbation, pulmonary_tuberculosis, lung_cancer. Bản mở rộng: pneumonia, common_cold, influenza, covid19. Biên bản từng bệnh nằm cùng thư mục.
- Cả 9 bản chính thức để `source_checked`: mọi nguồn được trích đều đã xác minh (nguồn mới do lượt C mở lại; nguồn cũ đã được các lượt trước xác minh).
- `npm run kb:check`: 0 lỗi; không còn cảnh báo nào trong các tệp của phần a (cảnh báo còn lại của toàn bộ dữ liệu thuộc tệp khác).
- `npm run kb:agreement -- drafts/phase-3/batch-3` chạy lại khi lượt B phần c đã có đủ bản nháp: kappa có trọng số **0,958 trên 159 cặp** (trước: 0,931 trên 100 cặp, chưa có phần c).
- WebSearch: **0 lần**. Mọi nguồn mở bằng `curl` (API Europe PMC, trang AAFP, NHS, MSD, NICE, WHO, IARC, GOLD, STEPS) vào thư mục tạm, đọc chữ bằng công cụ trích văn bản. Không trang nào bị chặn.

## 1. Nguồn

Chuyển vào `knowledge/sources/` 28 nguồn, mỗi nguồn ghi `verified: true`, `verified_by: agent:pass-c` và điều đã đối chiếu:
- Toàn văn qua API Europe PMC: Frese 2011 (bảng 5), Nguyen 2020 (điều tra lao quốc gia, bảng 3–4), Cochrane 2022 (lao), Okoli 2018 (bảng 3), Chowienczyk 2020 (bảng 2), Ruano-Raviña 2020 (bảng 1), McManus 2008 (bảng 3); GRACE (van Vugt 2013, đã có trong sổ) đối chiếu lại bảng 1.
- Tóm tắt qua API Europe PMC: Ebell 2013, Lâm 2011, Lâm 2014, Nguyen Viet 2015, Wang 2008, Miller 2000, Duong 2025, Hamilton 2005, Verdon 2008.
- Trang web, PDF: Kinkade 2016 (AAFP), NHS Bronchitis, NHS COPD, NHS TB, NHS Lung cancer, MSD TB, MSD Lung carcinoma, WHO Việt Nam (COPD), Australian Asthma Handbook, NICE NG12, bản tin GLOBOCAN 2024, báo cáo STEPS 2021 (bảng 5). GOLD 2026 (đã có trong sổ) mở lại tr. 32 cho tỷ lệ chưa được chẩn đoán.
- Gộp id trùng: `nguyen-plosone-2020` (bỏ `nguyenhv-plosone-2020`), `iarc-globocan-vn-2024` (bỏ `globocan-2024-vietnam`, nhãn L3 theo © IARC), `frese-jcmr-2011` (lượt A phần c dùng `frese-jclinmedres-2011`, cùng bài; lượt C phần c nên dùng id đã có trong sổ).
- Không dùng: `ijgm-gina-vn-2017` (số tỷ lệ hen là số dẫn lại; dùng Lâm 2011 là nguồn gốc).
- Không có nguồn nào chưa xác minh trong các tệp phần a.

## 2. Dấu hiệu đề xuất

- Các đề xuất của bản nháp phần a (night_respiratory_symptoms, biomass_smoke_exposure, former_smoker) đã có trong danh mục và được liên kết. Không có đề xuất nào khác phải để ngoài bản chính thức.

## 3. Đề xuất cho người bảo trì (không sửa quy tắc, triệu chứng chính)

1. **`conditions` của quy tắc lô 3** (để danh sách "Bác sĩ cần loại trừ" không rỗng khi phiên dừng khẩn):
   - rf_hemoptysis_severe: [pulmonary_tuberculosis, lung_cancer] (cùng pulmonary_embolism nếu phần c đồng ý). Ca d-lung-cancer-3 hiện dừng khẩn với danh sách rỗng.
   - rf_asthma_reliever_fails: [asthma]; rf_copd_reliever_fails: [copd_exacerbation].
   - rf_dyspnea_cannot_speak, rf_dyspnea_at_rest, rf_spo2_low: [asthma, copd_exacerbation, pneumonia] (cùng các bệnh của phần b, c).
2. **Thứ tự câu hỏi:** thêm `covid_self_test` vào phần hỏi tiếp của Ho và Khó thở như ở Sốt. Ca d-covid19-cough-1 (que thử dương tính) chỉ đứng hạng 3 vì câu này không được hỏi.
3. **cant_miss của Ho, Khó thở, Đau ngực:** không bệnh nào của phần a thuộc nhóm không được bỏ sót.
4. Bác sĩ nên xem mức xử trí theo urgency 3 của hen: hen dạng ho ở trẻ (ho kéo dài, không có cơn khó thở) ra mức 3 thay vì 4 (ca d-asthma-2).

## 4. Bộ dev

So từng ca (chế độ sạch và 5 hạt giống nhiễu), dữ liệu gốc (68ce96c9e5d7) với dữ liệu chỉ có thay đổi của phần a; ca của phần b, c không tính.

### 4.1 Chỉ số

| | Trước (217 ca) | Phần a, cùng 217 ca | Phần a, 239 ca (thêm 22 ca mới) |
|---|---|---|---|
| Sạch | top1 75,7% · top3 94,9% · an toàn 99,5% · bỏ sót 0/106 · quá mức 6,9% | top1 75,2% · top3 94,9% · an toàn 99,5% · bỏ sót 0/106 · quá mức 6,9% | top1 76,7% (181/236) · top3 94,9% (224/236) · an toàn 99,6% · bỏ sót 0/109 · quá mức 7,5% |
| Nhiễu | bỏ sót 10/530 · quá mức 18,7% | bỏ sót 10/530 · quá mức 18,5% | bỏ sót 10/545 · quá mức 18,8% |

- 22 ca mới của phần a: top1 20/22, top3 21/22, an toàn 22/22, khuyên quá mức 3/22 (d-acute-bronchitis-2, d-asthma-2, d-lung-cancer-2: mức 3 thay vì 4), không ca cấp cứu nào bị bỏ sót (cả 5 hạt giống nhiễu).
- Ca không đạt top 3: d-lung-cancer-3 (mục 3.1). Ca không đạt top 1: d-covid19-cough-1 (mục 3.2).
- Toàn bộ dữ liệu lúc chạy cuối (phần a và phần b, chưa có phần c; 258 ca, 12e9ddd8f39d): sạch top1 76,9% · top3 93,7% · an toàn 99,6% · bỏ sót 0/114 · quá mức 7,4%; nhiễu bỏ sót 10/570 · quá mức 19,4%. Các ca của phần a gần như không đổi khi có phần b (d-common-cold-3 một hạt giống mức 5 → 4; d-lung-cancer-2 một hạt giống hạng 9 → 7).

### 4.2 Ca cũ đổi kết quả do phần a

| Ca | Thay đổi | Lý do |
|---|---|---|
| d-pneumonia-2 (Sốt, 78 tuổi) | sạch: hạng 1 → 3, mức 2 không đổi; nhiễu: mức 1 → 2 ở 3 hạt giống (mức đúng 3) | Câu trả lời lô 3 thêm vào ca và câu hỏi mới (khò khè, thời gian ho, đau cơ) đổi thứ tự hỏi; xem biên bản pneumonia |
| d-typhoid-fever-2 (Sốt) | hạng 12 → 13 (sạch và 4 hạt giống) | Lao phổi thêm prior Sốt (1,2%) |
| d-typhoid-fever-1 | hạt giống 2: hạng 3 → 4 | Như trên |
| d-malaria-2 | hạt giống 4, 5: hạng 11 → 12, 17 → 18 | Như trên |
| d-from-h-fever-014 (viêm xoang) | 3 hạt giống đổi hạng (4 → 2, 2 → 3, 2 → 3) | Thứ tự câu hỏi |
| d-diabetic-ketoacidosis-3 | hạt giống 1: hạng 5 → 4 | Thứ tự câu hỏi |
| d-acute-otitis-media-3, d-liver-abscess-1 | mỗi ca một hạt giống: mức 2 → 3 (đúng mức 3) | Thứ tự câu hỏi |

Các ca cũ khác chỉ đổi xác suất dưới 0,5 điểm. Không ca nào bị hạ mức xử trí xuống dưới mức đúng. Prior Sốt của lao: chọn P5 (lượt B); P4 (lượt A) làm thêm d-malaria-2 (sạch) và hai ca nhiễu đổi hạng (biên bản lao phổi).

### 4.3 Ca cũ được thêm câu trả lời lô 3

Chỉ thêm khi lời kể nói rõ: cough_duration (11 ca của 4 bệnh mở rộng), d-pneumonia-1 thêm khởi phát, mức khó thở, chest_pain và thời gian đau ngực; chest_pain absent ở d-pneumonia-2, d-covid19-3, d-influenza-1; chest_indrawing absent ở d-common-cold-3. Không sửa gì khác.
