# Biên bản đối chiếu lượt C: heart_failure (Suy tim, đợt nặng lên)

- Giai đoạn 3 lô 3, phần b. Người đối chiếu: `agent:pass-c`. Ngày: 2026-10-31.
- Bản nháp: `pass-a/heart_failure.yaml`, `pass-b/heart_failure.yaml`.
- Nguồn mở lại: Nguyen 2025 (toàn văn PMC12853784, bảng 1–2), Tran 2026 (toàn văn PMC13202145, bảng 1), Ray 2006 (toàn văn PMC1550946), Wang 2005, Mant 2009, ADHERE-AP (tóm tắt qua API Europe PMC), MSD Acute heart failure (tải trang, cập nhật 7/2026). 1857/QĐ-BYT, NHS Heart failure đã được lượt R xác minh trong ngày; Frese 2011 đã được lượt C phần a đọc lại toàn văn.
- Nguồn đưa vào sổ: `nguyenht-bmccvd-2025` (cùng bài với `nguyen-bmccardiovascdisord-2025` của lượt A; giữ một id), `tran-openheart-2026`, `wang-jama-2005`, `mant-hta-2009`, `atherton-jcardfail-2012`, `msd-acute-heart-failure`, `ray-critcare-2006` (dùng chung với nhiễm khuẩn huyết).
- Trạng thái: `source_checked`.

## Bất đồng và quyết định

| Trường | Lượt A | Lượt B | Quyết định | Lý do | Nguồn |
|---|---|---|---|---|---|
| prior shortness_of_breath, từ 75 tuổi | P1 | P2 | P2 (B) | Lượt A dựa vào Ray (cấp cứu, suy hô hấp, chọn lọc nặng); lượt B dựa vào tuyến ban đầu (Frese), gần người dùng hơn | Frese 2011; Ray 2006 |
| prior shortness_of_breath, 2 tháng–5 tuổi | P5 | P6 | P6 (B) | Hiếm, phần lớn đã biết bệnh tim bẩm sinh | |
| prior cough, 18–74 tuổi | 18–44 P5, 45–64 P4, 65–74 P3 | thấp hơn một mức | Theo B | Ho về đêm là triệu chứng ít điển hình (1857 Bảng 3); người suy tim nặng lên thường chọn Khó thở | 1857/QĐ-BYT |
| breathing_difficulty, orthopnea, leg_swelling_both: bậc | B | A (Mant 2009) | A | Tổng quan phân tích gộp ở tuyến ban đầu | Mant 2009 |
| atrial_fibrillation_known | occasional | frequent | occasional (A) | Hai nghiên cứu Việt Nam lệch nhiều (khoảng 5% và 35%); câu hỏi là đã được bác sĩ nói bị rung nhĩ | Nguyen 2025; Tran 2026 |
| diabetes | occasional | frequent | occasional (A) | Trung bình hai nghiên cứu khoảng 30%, dưới ranh giới 33% | Nguyen 2025; Tran 2026 |
| dyspnea_onset | 0,12 / 0,48 / 0,40 | 0,12 / 0,58 / 0,30 | Trung bình 0,12 / 0,53 / 0,35 | Ngang nguồn | 1857; MSD |
| dyspnea_severity | 0,55 / 0,35 / 0,10 | 0,45 / 0,45 / 0,10 | Trung bình 0,50 / 0,40 / 0,10 | Ngang nguồn | MSD; NHS |
| night_respiratory_symptoms | Không (dấu hiệu chưa có) | frequent | Giữ (B) | Cơn khó thở kịch phát về đêm LR dương 2,6 | Wang 2005 |
| rapid_weight_gain | Đề xuất dấu hiệu | occasional | Giữ (B) | Dấu hiệu đã vào danh mục | 1857 Bảng 3; NHS |
| spo2_measured | Không (dấu hiệu chưa có) | 0,15 / 0,15 / 0,10 / 0,60 | Giữ (B) | Sung huyết phổi làm giảm SpO2 | MSD |
| cough_duration | 0,35 / 0,30 / 0,27 / 0,08 | Không | Giữ (A) | Ho về đêm theo đợt ứ dịch | 1857 |
| cough | occasional | Không | **Bỏ** | Bằng tỷ lệ nền 0,2: không mang thông tin | |
| fever | rare | Không | **Bỏ** (theo B) | Nhiễm trùng là yếu tố thúc đẩy (1857 Phần III mục 2); câu 'có sốt' không nên hạ suy tim | 1857 |
| fainting_or_near_fainting | rare | Không | **Bỏ** | NHS liệt kê choáng là triệu chứng suy tim; mức thấp hơn nền trái nguồn | NHS Heart failure |
| leg_swelling_one_side | rare | Không | **Bỏ** | 0,025 so với tỷ lệ nền 0,03: không mang thông tin | |
| warning_signs | 6 mục | 7 mục (cold_sweat, palpitations thay drowsy) | 6 mục của A | Hồi hộp rất hay gặp ở người suy tim có rung nhĩ, đưa vào danh sách cấp cứu sẽ báo động quá mức | |
| self_care_vi, see_doctor_vi | | | Ghép hai bản | Thêm ho đờm hồng có bọt: khám trong ngày (NHS) | NHS |

Các trường còn lại trùng nhau (mã, mức xử trí 3, không được bỏ sót: không, prior 18–74 tuổi ở Khó thở, breathless_on_exertion, known_heart_disease, hypertension_known, fatigue, wheeze, palpitations, chest_pain_pressure, pleuritic_chest_pain).

## Giá trị dựa trên nhận định (cần bác sĩ duyệt)

- Hai prior (suy từ tuyến ban đầu châu Âu và người nằm viện ở Việt Nam).
- Tần suất khó thở khi nằm, ho về đêm ở đợt nặng lên; tăng cân nhanh; các phân bố.
- Yếu tố nguy cơ lấy từ người nằm viện; người dùng cộng đồng có thể ít bệnh nền hơn.

## Ca dev

- d-heart-failure-1 (72 tuổi, điển hình): 100%, mức 3. d-heart-failure-3 (68 tuổi từng hút thuốc, khò khè, dễ nhầm đợt cấp bệnh phổi tắc nghẽn): 98%, mức 3.
- d-heart-failure-2 (80 tuổi, Ho về đêm, suy tim mới mắc): đứng đầu (81%). Bản đầu không ghi huyết áp nên câu huyết áp 'Không rõ' làm quy tắc rf_extreme_bp_with_symptoms (mức 2) ở trạng thái không rõ với người từ 75 tuổi: mức 2. Người cao tuổi có tăng huyết áp thường đo huyết áp ở nhà; lượt C thêm số đo vào câu chuyện (150/85 mmHg) và câu trả lời tương ứng.
