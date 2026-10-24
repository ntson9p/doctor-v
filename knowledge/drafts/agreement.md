# Mức đồng thuận giữa lượt A và lượt B

- Số cặp liên kết có/không có trong cả hai lượt: 160
- Kappa có trọng số bậc hai trên 6 mức tần suất: **0.900**
- Bệnh chỉ có ở lượt A: acute_appendicitis, acute_cholecystitis, acute_gastroenteritis, acute_pancreatitis, acute_pyelonephritis, bacterial_meningitis, bowel_obstruction, cystitis, dengue, intussusception, malaria, peptic_ulcer_gastritis, renal_colic, scrub_typhus, sepsis, typhoid_fever

| Bệnh | Liên kết chung | Trùng mức | Chỉ A | Chỉ B | TVD phân bố | Mức xử trí A/B | Không được bỏ sót A/B | Prior A/B |
|---|---|---|---|---|---|---|---|---|
| acute_coronary_syndrome | 10 | 7 | 4 | 4 | 0.10 | 1/1 | có/có | abdominal_pain: P6/P6 |
| acute_otitis_media | 6 | 4 | 3 | 2 | 0.05 | 4/4 | không/không | fever: P5/P4 |
| acute_sinusitis | 11 | 8 | 2 | 2 | 0.07 | 4/4 | không/không | headache: P3/P3; fever: P4/P4 |
| common_cold | 12 | 9 | 7 | 4 | 0.05 | 5/5 | không/không | fever: P2/P2; headache: P3/P3 |
| covid19 | 9 | 4 | 5 | 4 | — | 5/5 | không/không | fever: P3/P3; headache: P4/P4 |
| ectopic_pregnancy | 7 | 6 | 1 | 2 | 0.02 | 2/2 | có/có | abdominal_pain: P4/P4 |
| hand_foot_mouth_disease | 12 | 8 | 6 | 2 | 0.04 | 3/3 | không/không | fever: P6/P6 |
| influenza | 12 | 7 | 4 | 7 | 0.04 | 5/5 | không/không | fever: P2/P2; headache: P3/P3 |
| measles | 11 | 11 | 2 | 0 | 0.05 | 3/3 | không/không | fever: P5/P5 |
| migraine | 9 | 9 | 2 | 0 | 0.04 | 5/5 | không/không | headache: P1/P1 |
| pelvic_inflammatory_disease | 8 | 8 | 1 | 2 | 0.07 | 3/3 | không/không | abdominal_pain: P3/P3; fever: P4/P4 |
| pneumonia | 7 | 5 | 2 | 7 | 0.05 | 3/3 | không/không | fever: P3/P3; abdominal_pain: P5/P5 |
| preeclampsia | 7 | 6 | 6 | 3 | 0.03 | 2/2 | có/có | headache: P4/P5; abdominal_pain: P5/P5 |
| primary_dysmenorrhea | 12 | 11 | 3 | 1 | 0.14 | 5/5 | không/không | abdominal_pain: P2/P2 |
| stroke | 10 | 9 | 1 | 6 | 0.05 | 1/1 | có/có | headache: P6/P5 |
| subarachnoid_hemorrhage | 10 | 9 | 1 | 5 | 0.03 | 1/1 | có/có | headache: P5/P5 |
| tension_type_headache | 7 | 7 | 1 | 2 | 0.05 | 5/5 | không/không | headache: P1/P1 |

Mốc tham khảo: kappa ≥ 0,6 là đồng thuận khá; ≥ 0,8 là rất tốt. PRIOR_LEVELS: P1 > P2 > P3 > P4 > P5 > P6.
