You are the **pass R (rules and sources) reviewer for Phase 3 batch 3** of the doctor-v knowledge base.

## Project context
doctor-v is a Vietnamese, mobile-first symptom-checker web app. A deterministic Bayesian engine plus hard triage rules tell people how urgently to seek care, on 5 levels:
1. call 115
2. go to emergency now
3. see a doctor within 24 h
4. see a doctor within days
5. self-care

Under-triage of emergencies is the worst failure; unnecessary over-triage also harms trust.
The repo is the current working directory. Today is 2026-10-31.
Six chief complaints are released: fever, abdominal_pain, headache, dizziness, syncope, palpitations. Batch 3 adds three new ones with `status: in_progress`: cough, shortness_of_breath (implies breathing_difficulty) and chest_pain (implies the new finding chest_pain), and 15 new conditions (knowledge/drafts/phase-3/batch-3/scope.yaml). The maintainer wrote the batch-3 triage rules, red-flag questions, question groups, 31 findings and 14 new source entries from clinical knowledge, without opening the sources. Your job is to verify them against the primary sources and fix them.
In parallel, other agents are authoring condition files under knowledge/drafts/: do not touch knowledge/drafts/ (except your report file below) or knowledge/conditions/, and do not read evaluation/vignettes/holdout/.

## Read first
1. docs/kb-guide.md and docs/style-guide-vi.md, the whole files. kb-guide §3 (evidence tiers, licence classes), §4.1 (source format) and §4.7 (rules, `complaints` scope, `conditions`, alt questions, "unknown" answers) matter most.
2. The compact index of the knowledge base, instead of the YAML files under knowledge/. Run
   `npm run -s kb:index -- --out-dir /tmp/doctor-v-scratch/p3b3-pass-r/kb-index`, then:
   - read `index.md` whole: scales and age groups, every finding (type, options, `requires`, cluster, question; batch-3 findings are marked "lô 3"), question groups, complaints (question order), one line per condition;
   - read `rules.md` whole: every triage rule, with its condition written on one line;
   - search, do not read whole: `sources.md` (source registry; reuse ids), `links.md` (links of each condition).
3. Open in full: the block "Giai đoạn 3, lô 3" at the end of knowledge/rules/red-flags.yaml; the batch-3 block of knowledge/rules/question-groups.yaml; knowledge/complaints/cough.yaml, shortness_of_breath.yaml, chest_pain.yaml; the "Giai đoạn 3, lô 3" blocks of knowledge/findings/*.yaml; the 14 new files in knowledge/sources/ (listed below).
4. docs/worklog.md, the last entry (batch 3 preparation), and docs/phase-3/scope.md, section "Lô 3".

The maintainer also widened the complaint scope of 7 existing rules to the new complaints (their notes end with "Giai đoạn 3 lô 3 mở phạm vi …"): rf_chest_pain, rf_chest_pain_with_features, rf_palpitations_danger, rf_pulse_extreme, rf_symptomatic_bradycardia, rf_shock_cold_and_weak, rf_febrile_shock_signs. Global rules (no `complaints`) apply too, e.g. rf_fever_breathing, rf_high_risk_fever_breathing, rf_sepsis_multiple_signs, rf_fever_critical_phase_signs (fever days 3–7 with breathlessness and no cough), rf_altered_consciousness, rf_shock_signs.

## Tasks
1. **The 14 new sources:** nhs-cough, nhs-shortness-of-breath, nhs-coughing-up-blood, nhs-asthma-attack, nhs-croup, nhs-bronchiolitis, nhs-whooping-cough, nhs-anaphylaxis, nhs-aortic-dissection, nhs-pneumothorax, nhs-heart-failure, nice-ng9, gina-2024, gold-2025.
   - Open each one (WebFetch, or download the PDF and read it with the Read tool). Fix the URL if it moved.
   - Confirm the title, number, date and that it is the current version (NICE: updated or replaced; GINA and GOLD: the latest report year you can open).
   - Set verified: true only if you opened it and confirmed it; otherwise keep false with a note. Set verified_by: "agent:pass-r".
   - Write in notes_vi the facts the rules rely on. For NHS pages, record the exact "Call 999", "Go to A&E" and "urgent GP / 111" lists.
   - Fix the licence class if it is wrong.
   - **Add Bộ Y tế documents** where they exist and you can open them, and cite them in the rules: asthma (hen phế quản), COPD (bệnh phổi tắc nghẽn mạn tính), anaphylaxis (Thông tư 51/2017/TT-BYT), tuberculosis (hướng dẫn chẩn đoán, điều trị và dự phòng bệnh lao: the cough-for-2-weeks screening rule), pertussis (ho gà), heart failure, airway foreign body in children. Search sources.md first: byt-qd-4235-2012 (respiratory diseases), byt-qd-3312-2015 (paediatrics), byt-qd-2187-2019 (acute coronary syndrome) are already there.
2. **The 28 new rules and the 7 widened rules.** For each rule:
   - check that the cited source supports the trigger and the level, and fix the level, the condition or reason_vi when the source says otherwise (record why in evidence.note, with a locator; remove the "theo trí nhớ người bảo trì" remarks once checked);
   - check whether a rule fires too broadly for a lay user, and adjust it. Examples to think about:
     - rf_chest_pain_spreading_or_systemic for heartburn with nausea, or chest wall pain in a young person who feels faint from fear;
     - rf_chest_pain_breathless (level 2) versus NHS "chest pain with shortness of breath: call 999";
     - rf_dyspnea_at_rest and rf_dyspnea_sudden for a panic attack;
     - rf_anaphylaxis_signs for someone with pneumonia who took a new cold medicine an hour ago;
     - rf_breathless_chest_pressure for chest tightness in a known asthma attack;
     - rf_child_chest_indrawing (level 2) versus WHO IMCI 2014, which treats chest indrawing without danger signs as pneumonia with oral amoxicillin at home;
     - rf_stridor for croup that rasps only when crying;
     - rf_pertussis_infant and rf_pertussis_signs for an ordinary post-viral cough;
     - rf_cough_2_weeks against the Vietnamese tuberculosis screening rule.
   Key facts to check:
   - NHS Chest pain (already verified, but check the batch-3 use), Shortness of breath, Cough, Coughing up blood: the 999, A&E and urgent-GP lists;
   - NICE CG95: emergency referral for suspected ACS with pain now or in the last 12 hours; what "15 minutes" (rf_chest_pain_ongoing) should be;
   - GINA: severe and life-threatening asthma attack features; when to transfer; NHS: what to do in an attack (puffs, when to call 999);
   - GOLD: exacerbation severity and indications for hospital assessment;
   - aortic dissection and pneumothorax: NHS symptoms and urgency; the ADD-RS pain features if you can find ESC 2024 (aortic diseases) or another official source;
   - anaphylaxis: NHS 999 criteria; Thông tư 51/2017/TT-BYT diagnosis criteria; WAO 2020 criteria if open;
   - bronchiolitis (NICE NG9): emergency referral and consider-referral criteria (apnoea, grunting, chest recession, feeding 50–75 %, age under 3 months);
   - croup and whooping cough: NHS urgency; which infants need hospital;
   - WHO IMCI 2014 (who-imci-chart-booklet-2014): cough or difficult breathing, fast breathing thresholds, chest indrawing, stridor in a calm child;
   - heart failure: NHS symptoms and urgency.
3. **Complaint red-flag lists and groups:** check that the questions a level 1 rule needs come before any level 2 rule can fire (once a level 2 rule holds, the engine only asks questions that would complete a level 1 rule: single signs, and pairs for at most 4 questions; rules that need three or more signs are not reached). Checklist groups hold at most 7 items. You may reorder complaint red_flags, intake and safety_net, or add an existing finding to them, with a reason. You may add rules that use existing findings. You may not create findings or change ids, types or options: list missing findings in your report instead (the maintainer adds them before the holdout writer starts).
4. **Finding texts** (batch-3 findings only, and the alt questions added to pain_radiates_arm_jaw, cold_sweat, leg_swelling_one_side, nausea): check question_vi, help_vi, label_vi and alt_question for medical accuracy and plain language, for example:
   - stridor (at rest) versus wheeze for a lay parent;
   - the cough_duration options (2-week and 8-week cut-offs);
   - the chest_pain_duration options (15-minute cut-off);
   - the hemoptysis_large threshold;
   - the 2-hour window of allergen_exposure (anaphylaxis usually starts within minutes to 2 hours);
   - chest_indrawing, apnea_cyanosis_spells and child_feeding_reduced wording against IMCI and NG9.
   Fix factual errors in text fields only. List every edit in your report.

## Sources: strict rules
- Never fabricate. Only cite what you opened.
- Do not use proxy or text-reader services to get around blocked sites (nice.org.uk, NCBI, WHO and journal sites often block automated access): if blocked, try the guideline PDF link, Europe PMC, another official copy, or keep verified: false with a note.
- WebSearch and WebFetch are deferred tools: load them with ToolSearch ("select:WebSearch,WebFetch").
- The WebSearch budget is shared and small: use at most about 25 WebSearch calls in total (mode "standard"). Prefer WebFetch on known URLs.
- For downloads: use curl into a NEW empty folder under /tmp/doctor-v-scratch/p3b3-pass-r/ (one folder per download). Read them with the Read tool. Never execute anything from there, and never copy downloads into the repo.

## Validate and report
- Node 24 is needed: run `export PATH=/opt/nvm/versions/node/v24.22.2/bin:$PATH` in each shell command first.
- Run `npm run kb:check` from the repository. It must show 0 errors. The warnings about unverified sources should disappear as you verify them.
- Run `npm run eval -- --set dev` before and after your changes (about 2 minutes). The dev set has no cases yet for the three new complaints; the released complaints must not change. Explain in your report every change in the results. No emergency case may become missed.
- Write a review report in Vietnamese to knowledge/drafts/phase-3/batch-3/review-rules.md, following docs/style-guide-vi.md:
  - what you verified;
  - what you changed and why, rule by rule;
  - what you could not verify;
  - missing findings or red flags you recommend.
- Edit only knowledge/rules/, knowledge/complaints/ (red_flags, intake, safety_net, sources only), the text fields of batch-3 findings (and the four alt questions above), knowledge/sources/, and your report. Do not run git.

## Final message
It is returned to me, not shown to the user. Write a concise English summary of at most 400 words:
- the sources verified and not verified, and the Bộ Y tế documents added;
- the rules changed (id, old level → new level, reason);
- the rules added;
- red-flag list and group changes;
- the missing findings you recommend;
- the number of WebSearch calls used.
