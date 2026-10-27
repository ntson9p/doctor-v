# Mức đồng thuận giữa lượt A và lượt B

- Số cặp liên kết có/không có trong cả hai lượt: 128
- Kappa có trọng số bậc hai trên 6 mức tần suất: **0.925**

| Bệnh | Liên kết chung | Trùng mức | Chỉ A | Chỉ B | TVD phân bố | Mức xử trí A/B | Không được bỏ sót A/B | Prior A/B |
|---|---|---|---|---|---|---|---|---|
| abdominal_aortic_aneurysm | 15 | 14 | 6 | 4 | 0.05 | 1/1 | có/có | abdominal_pain: P6/P6; syncope: P6/P6; dizziness: P6/P6 |
| acute_angle_closure_glaucoma | 7 | 7 | 4 | 0 | 0.07 | 2/2 | có/có | headache: P6/P6 |
| acute_cholangitis | 8 | 8 | 0 | 2 | 0.03 | 2/2 | có/có | abdominal_pain: P4/P5; fever: P5/P5 |
| acute_mesenteric_ischemia | 10 | 8 | 0 | 2 | 0.02 | 1/1 | có/có | abdominal_pain: P6/P6 |
| diabetic_ketoacidosis | 14 | 10 | 1 | 5 | 0.04 | 2/2 | có/có | abdominal_pain: P5/P5; fever: P6/P6; dizziness: P6/P6 |
| encephalitis | 8 | 6 | 1 | 1 | 0.06 | 1/1 | có/có | fever: P6/P6; headache: P6/P5 |
| heat_exhaustion | 14 | 12 | 2 | 5 | 0.05 | 5/5 | không/không | headache: P3/P4; dizziness: P3/P4; syncope: P3/P4; fever: P4/P5 |
| heat_stroke | 10 | 9 | 1 | 1 | 0.07 | 1/1 | có/có | syncope: P5/P6; fever: P6/P6; headache: P6/P6; dizziness: P6/P6 |
| hypertensive_crisis | 1 | 0 | 8 | 7 | 0.15 | 3/3 | không/không | headache: P5/P5; dizziness: P5/P5 |
| kawasaki_disease | 10 | 9 | 4 | 0 | 0.03 | 3/3 | không/không | fever: P5/P6 |
| leptospirosis | 10 | 10 | 6 | 3 | 0.03 | 3/3 | không/không | fever: P4/P4; headache: P5/P5 |
| liver_abscess | 7 | 6 | 2 | 3 | 0.07 | 3/3 | không/không | fever: P5/P5; abdominal_pain: P5/P5 |
| ovarian_torsion | 10 | 10 | 3 | 3 | 0.05 | 2/2 | có/có | abdominal_pain: P4/P5 |
| testicular_torsion | 4 | 1 | 0 | 3 | 0.08 | 2/2 | có/có | abdominal_pain: P6/P6 |

Mốc tham khảo: kappa ≥ 0,6 là đồng thuận khá; ≥ 0,8 là rất tốt. PRIOR_LEVELS: P1 > P2 > P3 > P4 > P5 > P6.
