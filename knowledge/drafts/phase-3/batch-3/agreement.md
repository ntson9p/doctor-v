# Mức đồng thuận giữa lượt A và lượt B

- Số cặp liên kết có/không có trong cả hai lượt: 100
- Kappa có trọng số bậc hai trên 6 mức tần suất: **0.931**
- Bệnh chỉ có ở lượt A: aortic_dissection, chest_wall_pain, gerd, herpes_zoster, pneumothorax

| Bệnh | Liên kết chung | Trùng mức | Chỉ A | Chỉ B | TVD phân bố | Mức xử trí A/B | Không được bỏ sót A/B | Prior A/B |
|---|---|---|---|---|---|---|---|---|
| acute_bronchitis | 9 | 9 | 1 | 7 | 0.02 | 5/5 | không/không | cough: P2/P1; shortness_of_breath: —/P2 |
| anaphylaxis | 12 | 9 | 4 | 3 | 0.09 | 1/1 | có/có | shortness_of_breath: P4/P4; cough: P5/P5; chest_pain: P5/P5 |
| asthma | 9 | 7 | 3 | 6 | 0.06 | 3/3 | không/không | shortness_of_breath: P2/P2; cough: P3/P3; chest_pain: P3/P3 |
| bronchiolitis | 12 | 10 | 1 | 6 | 0.03 | 3/3 | không/không | cough: P2/P3; shortness_of_breath: P1/P2; fever: P3/P3 |
| copd_exacerbation | 11 | 11 | 0 | 7 | 0.06 | 3/3 | không/không | shortness_of_breath: P2/P2; cough: P3/P3 |
| croup | 8 | 6 | 3 | 5 | 0.03 | 3/3 | không/không | cough: P3/P4; shortness_of_breath: P2/P3 |
| heart_failure | 13 | 11 | 5 | 3 | 0.10 | 3/3 | không/không | shortness_of_breath: P4/P3; cough: P5/P5 |
| lung_cancer | 5 | 4 | 4 | 6 | 0.05 | 4/4 | không/không | cough: P6/P5; shortness_of_breath: P6/P5; chest_pain: P6/P5 |
| pertussis | 9 | 8 | 2 | 2 | 0.05 | 3/3 | không/không | cough: P4/P4 |
| pulmonary_tuberculosis | 12 | 10 | 2 | 0 | 0.05 | 4/4 | không/không | cough: P4/P4; fever: P4/P5; shortness_of_breath: P5/P5 |

Mốc tham khảo: kappa ≥ 0,6 là đồng thuận khá; ≥ 0,8 là rất tốt. PRIOR_LEVELS: P1 > P2 > P3 > P4 > P5 > P6.
