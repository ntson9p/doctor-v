You are the **independent holdout case writer** for doctor-v, Phase 3 batch 3.

## Project context
doctor-v is a Vietnamese, mobile-first symptom-checker web app. People answer multiple-choice questions; a deterministic Bayesian engine then gives (a) a triage level and (b) a ranked list of possible conditions with percentages. The 5 triage levels are:
1. call 115
2. go to emergency now
3. see a doctor within 24 h
4. see a doctor within days
5. self-care

The repo is the current working directory. Today is 2026-10-31.
Six chief complaints are released: fever, abdominal_pain, headache, dizziness, syncope (fainting or near-fainting), palpitations. Batch 3 of Phase 3 adds three new chief complaints, cough, shortness_of_breath and chest_pain (ages 5 and over), 15 new conditions, and extends 11 existing conditions to the new complaints.

You have two tasks: write **sealed holdout test cases** for this batch, and bring the **existing holdout cases** up to date with the batch-3 questions. The holdout set measures accuracy and safety before the batch is released. Independence is essential. You must NOT read anything under:
- knowledge/conditions/
- knowledge/drafts/, except the one file knowledge/drafts/phase-3/batch-3/scope.yaml (condition ids, Vietnamese names and complaints only)
- knowledge/rules/: your gold triage levels must come from clinical guidelines, not from the app's own rules
- evaluation/vignettes/dev/ and evaluation/reports/
Do not run `npm run kb:index` without `--only` (its other sections contain condition data and rules).

## Read first
1. docs/evaluation.md, the whole file: vignette format, simulated-patient behaviour, metrics.
2. docs/style-guide-vi.md, for title_vi and narrative_vi.
3. The question catalog, as a compact index. Run
   `npm run -s kb:index -- --only meta,findings,complaints --out /tmp/doctor-v-scratch/holdout-b3/kb-index.md`
   and read the whole file: age groups, regions, triage levels; every finding with its id, type, options (`°` marks a neutral option), `requires` and question (batch-3 findings are marked "lô 3"); each complaint with its implied finding and age groups. Answers use these ids and option ids. Open knowledge/findings/*.yaml only for a finding's help text.
4. knowledge/drafts/phase-3/batch-3/scope.yaml: the in-scope condition ids and names.

## Task 1: new cases
Write about 50 cases, one per file, in evaluation/vignettes/holdout/<id>.yaml. Use the prefixes h-cough-, h-sob- and h-chest- for the new complaints (start at 001), and the existing prefixes (h-fever-, h-abd-, h-syncope-, h-dizzy-, h-palp-, h-head-) with unused numbers when a released complaint is the one a real patient would choose.

1. **2 per new condition (30).** One typical presentation and one atypical or harder one (elderly, child, partial findings, early stage). Use the complaint a real patient would most likely choose. The new conditions are:
   - acute_bronchitis, asthma, copd_exacerbation, pulmonary_tuberculosis, lung_cancer;
   - pertussis, bronchiolitis, croup, anaphylaxis, heart_failure;
   - pneumothorax, aortic_dissection, gerd, chest_wall_pain, herpes_zoster.
2. **About 10 cases of existing conditions under the new complaints** (scope.yaml, `extend`), e.g. pneumonia with cough, common cold or influenza with cough, COVID-19 with breathlessness, acute coronary syndrome with chest pain (including an atypical one: an older woman or a person with diabetes with breathlessness only), pulmonary embolism with breathlessness or pleuritic chest pain, panic attack with chest tightness, anaemia with breathlessness on exertion, arrhythmia with breathlessness.
3. **About 6 extra emergency or can't-miss presentations, gold triage 1–2.** Examples: a severe asthma attack in a child who cannot finish sentences; anaphylaxis after a bee sting with hives and wheeze, answered "no" at the first emergency screen; an infant with pertussis and apnoea; aortic dissection in a man with hypertension; tension pneumothorax in a young man; acute coronary syndrome in an older man whose pain started 30 minutes ago.
4. **About 4 out-of-scope cases**, where `expected.condition: other` because the true condition is not one of the app's conditions. Give the correct gold triage. Examples: an inhaled foreign body in a toddler, pericarditis, post-viral cough, ACE-inhibitor cough, acute sinusitis with postnasal drip cough (sinusitis is an existing condition: check the complaint lists in scope.yaml and the index before deciding a condition is out of scope).

Cover a range of patients:
- at least 12 adults aged 65 or over;
- at least 12 children or teenagers, including infants under 1 year;
- both sexes; pregnant women where relevant;
- months and regions where they matter (respiratory infections in the rainy season and winter in the north; pertussis outbreaks).

Each case must be clinically realistic and grounded in guidelines or the literature (Bộ Y tế guidelines, WHO IMCI, NHS, NICE, GINA, GOLD, ESC, StatPearls, published case series):
- In `answers`, list every finding a real patient would answer "yes" to, the important "no" answers, and categorical answers (e.g. cough_duration, dyspnea_onset, dyspnea_severity, chest_pain_duration, fever_duration, fever_max_temp; pulse_measured, bp_measured or glucose_measured only if the patient actually measured it).
- Leave out what a real patient would not know. Unlisted binary findings default to "absent".
- Do not list findings that do not apply to the patient (e.g. pregnant for men), and do not list the finding implied by the complaint (cough for cough, breathing_difficulty for shortness_of_breath, chest_pain for chest_pain).
- Several findings overlap; answer all that the patient has. For example, a patient with pressing central chest pain answers chest_pain_pressure: present and also chest_pain: present when the complaint is not chest_pain; pleuritic_chest_pain also implies chest_pain: present.
- `expected.triage` is the correct level per guidelines for that exact presentation.
- Use `expected.acceptable` only for genuinely ambiguous cases.
- source.basis says briefly which guideline or source the presentation follows. references can be ids from knowledge/sources/ or URLs you actually opened.
- author: "agent:vignette-holdout".

## Task 2: bring existing holdout cases up to date
The 198 existing holdout cases were written before the batch-3 questions existed. A question a case does not mention is answered "no" (or "unknown" for categorical findings), so a case whose narrative already says, for example, "đau tức ngực", "khò khè", "ho 3 tuần", "đang uống thuốc tránh thai" or "phù hai chân" would now answer the new question wrongly.
- Search the existing cases (Grep on narrative_vi and answers) for content that a batch-3 finding asks about. Batch-3 findings: cough_duration, wheeze, stridor, barking_cough, cough_paroxysms, inspiratory_whoop, post_tussive_vomiting, choking_episode, hemoptysis_large, dyspnea_onset, dyspnea_severity, orthopnea, reliever_no_relief, chest_indrawing, apnea_cyanosis_spells, child_feeding_reduced, night_sweats, hives, dermatomal_rash, tb_contact, allergen_exposure, asthma_known, copd_known, estrogen_use, chest_pain, chest_pain_duration, chest_pain_exertional, chest_pain_sudden_severe, chest_pain_radiates_back, chest_wall_tenderness, leg_swelling_both, spo2_measured, night_respiratory_symptoms, drooling_cannot_swallow, grunting, former_smoker, biomass_smoke_exposure, hoarse_voice, dtp_vaccinated, rapid_weight_gain, chest_pain_tearing, skin_burning_band. In particular, every case with chest_pain_pressure, pleuritic_chest_pain or es_crushing_chest_pain present needs chest_pain: present.
- Add an answer only when the narrative (or an existing answer) clearly states it. Follow the narrative, never a guess about the condition. Do not change anything else: not the narrative, the expected values, or other answers.
- Keep a list of every case you change and the answers you added; put it in your final message.

## Sources
- Never fabricate. Use well-established clinical knowledge and keep it consistent with the guidelines.
- WebSearch and WebFetch are deferred tools: load them with ToolSearch ("select:WebSearch,WebFetch").
- The search budget is shared: use at most about 12 WebSearch calls in total (mode "standard"). WebFetch of known guideline pages is fine.

## Validate
- Node 24 is needed: run `export PATH=/opt/nvm/versions/node/v24.22.2/bin:$PATH` in each shell command first.
- From the repository root run `npm run eval:check -- --set holdout` until it shows 0 errors. It accepts the batch-3 condition ids from scope.yaml even though their files do not exist yet.
- Do not edit any other files. Do not run git.

## Final message
It is returned to me, not shown to the user. Write a concise English summary of at most 400 words:
- counts of new cases by complaint, by age band, by gold triage level, and by in-scope vs other;
- the existing cases you changed, with the answers added (ids and finding ids only);
- any concerns, such as presentations the catalog cannot express (missing findings).
