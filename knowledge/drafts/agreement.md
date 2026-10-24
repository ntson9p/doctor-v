# Mức đồng thuận giữa lượt A và lượt B

- Số cặp liên kết có/không có trong cả hai lượt: 331
- Kappa có trọng số bậc hai trên 6 mức tần suất: **0.900**

| Bệnh | Liên kết chung | Trùng mức | Chỉ A | Chỉ B | TVD phân bố | Mức xử trí A/B | Không được bỏ sót A/B | Prior A/B |
|---|---|---|---|---|---|---|---|---|
| acute_appendicitis | 10 | 9 | 3 | 0 | 0.05 | 2/2 | có/có | abdominal_pain: P3/P3; fever: P5/P5 |
| acute_cholecystitis | 11 | 7 | 6 | 0 | 0.06 | 2/2 | không/không | abdominal_pain: P4/P3; fever: P5/P5 |
| acute_coronary_syndrome | 10 | 7 | 4 | 4 | 0.10 | 1/1 | có/có | abdominal_pain: P6/P6 |
| acute_gastroenteritis | 16 | 14 | 4 | 3 | 0.02 | 5/5 | không/không | abdominal_pain: P2/P2; fever: P3/P3 |
| acute_otitis_media | 6 | 4 | 3 | 2 | 0.05 | 4/4 | không/không | fever: P5/P4 |
| acute_pancreatitis | 11 | 9 | 4 | 6 | 0.01 | 2/2 | có/có | abdominal_pain: P4/P4 |
| acute_pyelonephritis | 9 | 9 | 5 | 4 | 0.04 | 3/3 | không/không | fever: P3/P3; abdominal_pain: P3/P3 |
| acute_sinusitis | 11 | 8 | 2 | 2 | 0.07 | 4/4 | không/không | headache: P3/P3; fever: P4/P4 |
| bacterial_meningitis | 13 | 8 | 5 | 2 | 0.06 | 2/2 | có/có | fever: P6/P6; headache: P6/P5 |
| bowel_obstruction | 11 | 9 | 3 | 1 | 0.05 | 2/2 | có/có | abdominal_pain: P4/P4 |
| common_cold | 12 | 9 | 7 | 4 | 0.05 | 5/5 | không/không | fever: P2/P2; headache: P3/P3 |
| covid19 | 9 | 4 | 5 | 4 | — | 5/5 | không/không | fever: P3/P3; headache: P4/P4 |
| cystitis | 8 | 7 | 3 | 1 | 0.09 | 4/4 | không/không | abdominal_pain: P3/P3 |
| dengue | 16 | 13 | 10 | 2 | 0.09 | 3/3 | không/không | fever: P2/P2; headache: P4/P4; abdominal_pain: P4/P5 |
| ectopic_pregnancy | 7 | 6 | 1 | 2 | 0.02 | 2/2 | có/có | abdominal_pain: P4/P4 |
| hand_foot_mouth_disease | 12 | 8 | 6 | 2 | 0.04 | 3/3 | không/không | fever: P6/P6 |
| influenza | 12 | 7 | 4 | 7 | 0.04 | 5/5 | không/không | fever: P2/P2; headache: P3/P3 |
| intussusception | 9 | 8 | 1 | 1 | 0.08 | 2/2 | có/có | abdominal_pain: P6/P6 |
| malaria | 8 | 8 | 5 | 1 | 0.05 | 3/3 | không/không | fever: P6/P6; headache: P6/P6 |
| measles | 11 | 11 | 2 | 0 | 0.05 | 3/3 | không/không | fever: P5/P5 |
| migraine | 9 | 9 | 2 | 0 | 0.04 | 5/5 | không/không | headache: P1/P1 |
| pelvic_inflammatory_disease | 8 | 8 | 1 | 2 | 0.07 | 3/3 | không/không | abdominal_pain: P3/P3; fever: P4/P4 |
| peptic_ulcer_gastritis | 7 | 7 | 3 | 1 | 0.03 | 4/4 | không/không | abdominal_pain: P2/P2 |
| pneumonia | 7 | 5 | 2 | 7 | 0.05 | 3/3 | không/không | fever: P3/P3; abdominal_pain: P5/P5 |
| preeclampsia | 7 | 6 | 6 | 3 | 0.03 | 2/2 | có/có | headache: P4/P5; abdominal_pain: P5/P5 |
| primary_dysmenorrhea | 12 | 11 | 3 | 1 | 0.14 | 5/5 | không/không | abdominal_pain: P2/P2 |
| renal_colic | 14 | 9 | 3 | 0 | 0.09 | 3/3 | không/không | abdominal_pain: P3/P3 |
| scrub_typhus | 10 | 8 | 4 | 2 | 0.06 | 3/3 | không/không | fever: P4/P4; headache: P5/P5 |
| sepsis | 12 | 9 | 4 | 0 | 0.10 | 1/1 | có/có | fever: P5/P4 |
| stroke | 10 | 9 | 1 | 6 | 0.05 | 1/1 | có/có | headache: P6/P5 |
| subarachnoid_hemorrhage | 10 | 9 | 1 | 5 | 0.03 | 1/1 | có/có | headache: P5/P5 |
| tension_type_headache | 7 | 7 | 1 | 2 | 0.05 | 5/5 | không/không | headache: P1/P1 |
| typhoid_fever | 6 | 6 | 6 | 1 | 0.04 | 3/3 | không/không | fever: P5/P6; abdominal_pain: P6/P6; headache: P6/P6 |

Mốc tham khảo: kappa ≥ 0,6 là đồng thuận khá; ≥ 0,8 là rất tốt. PRIOR_LEVELS: P1 > P2 > P3 > P4 > P5 > P6.
