You are the **pass R (rules and sources) reviewer for Phase 3 batch 2** of the doctor-v knowledge base.

## Project context
doctor-v is a Vietnamese, mobile-first symptom-checker web app. A deterministic Bayesian engine plus hard triage rules tell people how urgently to seek care, on 5 levels:
1. call 115
2. go to emergency now
3. see a doctor within 24 h
4. see a doctor within days
5. self-care

Under-triage of emergencies is the worst failure; unnecessary over-triage also harms trust.
The repo is the current working directory. Today is 2026-10-26.
All 6 chief complaints are in use: fever, abdominal_pain, headache, dizziness, syncope, palpitations. Batch 2 adds dangerous conditions that are still missing under them (knowledge/drafts/phase-3/batch-2/scope.yaml). The maintainer wrote the batch-2 triage rules, red-flag questions, finding texts and 12 new source entries from clinical knowledge, without opening the sources. Your job is to verify them against the primary sources and fix them.
In parallel, other agents are authoring condition files under knowledge/drafts/: do not touch knowledge/drafts/ (except your report file below) or knowledge/conditions/, and do not read evaluation/vignettes/holdout/.

## Read first
- docs/kb-guide.md, especially §3 (evidence tiers, licence classes), §4.1 (source format) and §4.7 (rules, including `complaints` scope and `conditions`).
- docs/style-guide-vi.md, for any Vietnamese text you edit.
- knowledge/complaints/*.yaml (look for the comments "Lô 2"), knowledge/rules/question-groups.yaml.
- knowledge/rules/red-flags.yaml: the block "Giai đoạn 3, lô 2" at the end (rf_scrotal_pain, rf_acute_glaucoma_signs, rf_heat_stroke_signs, rf_kawasaki_signs, rf_dka_suspected, rf_new_diabetes_child, rf_aaa_rupture_signs, rf_lepto_severe, rf_fever_jaundice, rf_measles_contact_fever), and the batch-2 edits to existing rules: rf_dizziness_central_signs_high_risk and rf_acute_vertigo_vascular_risk (neck_injury_or_manipulation added as a risk factor), rf_recurrent_vertigo (long_episodes now counts). Also look at the existing rules that overlap with the new ones (e.g. rf_cholangitis_triad, rf_severe_abdominal_pain, rf_altered_consciousness, rf_extreme_bp, rf_extreme_bp_with_symptoms, rf_prolonged_fever, rf_fever_jaundice_malaria_exposure).
- knowledge/findings/*.yaml (findings marked "Giai đoạn 3, lô 2"), knowledge/sources/*.yaml, knowledge/meta/*.yaml.
- docs/worklog.md, the last entry (batch 2 start), for the reasons behind the maintainer's choices.

## Tasks
1. **The 12 new sources:** nhs-testicle-pain, nhs-glaucoma, nhs-heat-exhaustion-heatstroke, nhs-kawasaki-disease, nhs-diabetic-ketoacidosis, nhs-abdominal-aortic-aneurysm, nhs-jaundice, nhs-measles, nice-ng18, who-leptospirosis-2003, aha-kawasaki-2017, biller-stroke-2014.
   - Open each one (WebFetch, or download the PDF and read it with the Read tool).
   - Confirm the title, number, date and that it is the current version (for NICE: whether it was updated or replaced).
   - Set verified: true only if you opened it and confirmed it; otherwise keep false with a note. Set verified_by: "agent:pass-r".
   - Write in notes_vi the facts the rules rely on. For NHS pages, record the exact "Call 999", "Go to A&E" and "urgent GP / 111" lists.
   - Fix the licence class if it is wrong.
   - You may add a better source, especially a Bộ Y tế document (for example on leptospirosis, Japanese encephalitis, heat stroke first aid, or diabetic ketoacidosis). Search knowledge/sources/ first: it already has many Bộ Y tế guidelines.
2. **The 10 new rules and the 3 edited rules.** For each rule:
   - check that the cited source supports the trigger and the level, and fix the level, the condition or reason_vi when the source says otherwise (record why in evidence.note, with a locator; remove the "người bảo trì ghi theo trí nhớ" remarks once checked);
   - check whether a rule fires too broadly for a lay user, and adjust it. Examples to think about:
     - rf_dka_suspected for a person with diabetes and mild breathlessness from a cold, or with vomiting from food poisoning;
     - rf_kawasaki_signs for a child with measles, scarlet-fever-like illness or hand, foot and mouth disease;
     - rf_aaa_rupture_signs for an older person with renal colic who feels faint from the pain;
     - rf_fever_jaundice in a newborn or an infant (physiological jaundice; is there a better level for infants?);
     - rf_measles_contact_fever when the person has had 2 doses of vaccine.
   Key facts to check:
   - NHS testicle pain: which presentations need A&E or 999, and which an urgent GP;
   - acute angle-closure glaucoma: the symptoms that need same-day emergency eye care;
   - NHS heat exhaustion and heatstroke: the cooling steps, the 30-minute rule, the 999 criteria;
   - Kawasaki: AHA 2017 criteria (classic and incomplete), timing of treatment, the NHS urgency;
   - DKA: NHS symptoms and when to go to A&E; NICE NG18 on suspected type 1 diabetes in children (same-day referral);
   - ruptured or symptomatic AAA: NHS symptoms and the age groups at risk;
   - leptospirosis: WHO 2003 severe forms (Weil's disease, pulmonary haemorrhage) and who needs hospital care;
   - jaundice: NHS urgency for adults, children and newborns;
   - measles: NHS advice after contact and when ill;
   - cervical artery dissection after neck manipulation (AHA/ASA 2014): the warning symptoms and the time window.
3. **Complaint red-flag lists and groups:** check that the new questions are asked where they matter (scrotal_pain after abdominal_red_flags, eye_pain_one_side after headache_red_flags, flank_pain after syncope_red_flags, flood_mud_exposure and heat_exposure in fever_exposures). Checklist groups hold at most 7 items. You may reorder complaint red_flags or add a finding to them, with a reason. You may add rules that use existing findings. You may not create findings: list missing findings in your report instead.
4. **Finding texts** (batch-2 findings only): check question_vi, help_vi and label_vi for medical accuracy and plain language, for example:
   - the window of flood_mud_exposure (incubation of leptospirosis);
   - the window of neck_injury_or_manipulation (time from manipulation to stroke in cervical artery dissection);
   - the BCG scar hint (site of the BCG injection in Vietnam);
   - the description of ketone breath.
   Fix factual errors in text fields only; never change ids, types or options. List every edit in your report.

## Sources: strict rules
- Never fabricate. Only cite what you opened.
- Do not use proxy or text-reader services to get around blocked sites (nice.org.uk and journal sites often block automated access): if blocked, try the guideline PDF link, PubMed Central, another official copy, or keep verified: false with a note.
- WebSearch and WebFetch are deferred tools: load them with ToolSearch ("select:WebSearch,WebFetch").
- The WebSearch budget is shared and small: use at most about 20 WebSearch calls in total (mode "standard"). Prefer WebFetch on known URLs.
- For downloads: use curl into a NEW empty folder under <scratch>/p3b2-pass-r/ (one folder per download). Read them with the Read tool. Never execute anything from there, and never copy downloads into the repo.

## Validate and report
- Run `npm run kb:check` from the repository. It must show 0 errors. The warnings about unverified sources should disappear as you verify them.
- Run `npm run eval -- --set dev` before and after your changes (it takes about 2 minutes). Explain in your report every change in the results (the dev set has no cases yet for the batch-2 conditions, except d-from-h-syncope-017, d-from-h-dizzy-020, d-from-h-dizzy-015 and d-from-h-fever-009 in evaluation/vignettes/dev/, which you may read). No emergency case may become missed.
- Write a review report in Vietnamese to knowledge/drafts/phase-3/batch-2/review-rules.md:
  - what you verified;
  - what you changed and why, rule by rule;
  - what you could not verify;
  - missing findings or red flags you recommend.
- Edit only knowledge/rules/, knowledge/complaints/ (red_flags, intake, safety_net, sources only), the text fields of batch-2 findings, knowledge/sources/, and your report. Do not run git.

## Final message
It is returned to me, not shown to the user. Write a concise English summary of at most 400 words:
- the sources verified and not verified;
- the rules changed (id, old level → new level, reason);
- the rules added;
- red-flag list changes;
- the missing findings you recommend;
- the number of WebSearch calls used.
