You are **Agent A (pass A) for Phase 3 batch 3, part c (chest pain)** of the doctor-v knowledge base.

## Project context
doctor-v is a Vietnamese, mobile-first symptom-checker web app. People answer multiple-choice questions; a deterministic Bayesian engine then shows (a) how urgently to seek care, on 5 levels (1 call 115, 2 go to emergency now, 3 see a doctor within 24 h, 4 within days, 5 self-care), and (b) possible conditions with estimated percentages. Accuracy and safety matter more than anything else.
The repo is the current working directory. Today is 2026-10-31.
The knowledge base has 60 conditions. Six chief complaints are released: fever, abdominal_pain, headache, dizziness, syncope, palpitations. Batch 3 adds three new chief complaints, still `status: in_progress`: **cough** (implies the finding cough), **shortness_of_breath** (implies breathing_difficulty) and **chest_pain** (implies the new finding chest_pain; ages 5 and over). Their findings, question groups and triage rules already exist (marked "lô 3" in the index). A pass R agent is verifying the batch-3 rules and sources at the same time, so knowledge/rules/ and knowledge/sources/ may change slightly while you work.
Each condition is authored twice, independently: pass A (you) and pass B (another agent, later). A pass C agent then reconciles the two. Other pass-A agents (parts a and b) work on other conditions.
You must NOT read anything under knowledge/drafts/phase-3/batch-3/pass-b/ or knowledge/drafts/phase-3/batch-3/reconcile/, nor evaluation/vignettes/holdout/ (a sealed test set).

## Your work (part c)
New conditions (write the whole file):
pneumothorax, aortic_dissection, gerd, chest_wall_pain, herpes_zoster

Existing conditions to extend: acute_coronary_syndrome, pulmonary_embolism, cardiac_arrhythmia, anemia.

Their Vietnamese names, the complaints each needs priors for, the suggested urgency, and what to add to each extension are in knowledge/drafts/phase-3/batch-3/scope.yaml. The suggestions are hints only: decide from official guidelines and justify any change in review.notes_vi. Background: docs/phase-3/scope.md (lô 3).

## Read first (mandatory)
1. docs/kb-guide.md and docs/style-guide-vi.md, the whole files. kb-guide is the contract: file format, scales, evidence tiers, licence classes, conditional frequencies, the "below leak" rule (`very_rare`, `above_leak_ok`), `freq_by_age`, `freq_by_complaint`, sex prior modifiers, neutral options, and `rule_out` for cancers (§2.5).
2. The compact index of the knowledge base, instead of the YAML files under knowledge/. Run
   `npm run -s kb:index -- --out-dir /tmp/doctor-v-scratch/p3b3-pass-a-c/kb-index`, then:
   - read `index.md` whole: scales and age groups, every finding (type, options, `requires`, cluster, question), question groups, complaints (question order), one line per condition (urgency, priors);
   - search, do not read whole: `links.md` (all links of a condition; use it to compare with competitors such as acute_coronary_syndrome, pulmonary_embolism, pneumonia, panic_disorder, cardiac_arrhythmia, peptic_ulcer_gastritis, acute_cholecystitis, acute_pancreatitis, anemia, and the part-a and part-b conditions asthma, copd_exacerbation, heart_failure, anaphylaxis once they exist), `rules.md` (triage rules), `sources.md` (source registry; reuse existing ids).
3. Open full YAML files only when you need the detail: knowledge/conditions/acute_coronary_syndrome.yaml and knowledge/conditions/peptic_ulcer_gastritis.yaml as models (acute_coronary_syndrome is also one of your extensions), each condition you extend, a source you cite, a finding's help text in knowledge/findings/.

## What to write
**New conditions:** `knowledge/drafts/phase-3/batch-3/pass-a/<condition_id>.yaml`, exactly in the format of docs/kb-guide.md §4.6. New sources go in `knowledge/drafts/phase-3/batch-3/pass-a/sources/<source-id>.yaml` (format §4.1).

**Extensions:** `knowledge/drafts/phase-3/batch-3/pass-a/extend/<condition_id>.yaml`, with new sources in `.../pass-a/extend/sources/`.
- Start from a copy of knowledge/conditions/<id>.yaml and keep everything already there unchanged: it was reconciled and evaluated.
- Add priors for the new complaints listed in scope.yaml, and links to batch-3 findings, with freq_by_complaint where the frequency differs by complaint.
- If you think an existing value is wrong, do not change it: explain in review.notes_vi.
- Set review to: status draft, authors ["agent:pass-a"], updated "2026-10-31". In notes_vi, list exactly what you added.

Never edit files outside knowledge/drafts/phase-3/batch-3/pass-a/.

Content requirements:
- **names**: names.vi is the official Vietnamese name, following ICD-10 Vietnamese when you can look it up; icd.kcb.vn currently redirects and cannot be searched, so keep icd10_verified: false unless you checked another official Bộ Y tế list. names.vi_common are lay names (e.g. "giời leo", "trào ngược", "đau sụn sườn"); names.en is the English name. Add codes.mondo if you can verify it.
- **summary_vi**: at most 3 short, plain sentences.
- **urgency and cant_miss**: the level of a typical uncomplicated case (kb-guide §2.5), per official guidelines (Bộ Y tế first, then WHO, NICE, GINA, GOLD, major societies). Complications and severe attacks are handled by the triage rules, not by urgency.
- **gerd** also needs a prior for abdominal_pain, a released complaint, where heartburn and epigastric pain already point to peptic_ulcer_gastritis. That changes abdominal-pain results: keep the two conditions distinguishable (e.g. heartburn, abd_pain_meal_relation, chronic cough) and justify the prior.
- **herpes_zoster**: the chest pain often starts days before the rash; the dermatomal rash then makes the diagnosis.
- **applicability**: sex and age only where the condition cannot occur (aortic_dissection is very rare in children; the chest_pain complaint itself starts at age 5).
- **priors**: one entry per complaint listed in scope.yaml.
  - The question: "Among people in this age group whose main complaint is X, in Vietnam, in community or primary care, what fraction have this condition?"
  - Use by_age where age matters (chest wall pain and anxiety in the young; acute coronary syndrome, aortic dissection and herpes zoster rising with age; primary spontaneous pneumothorax in young adults). Use a sex prior modifier where the sources show a clear difference (e.g. pneumothorax and aortic dissection are more common in men).
  - Justify each prior in evidence.note. Leads to open, not to cite unread: primary-care chest pain studies (e.g. the Marburg Heart Score cohorts by Bösner; bosner-bmcfampract-2018 is already in the registry), emergency-department chest pain series, aortic dissection incidence (IRAD), pneumothorax incidence, herpes zoster incidence in Asia, GERD prevalence in Vietnam.
- **prior_modifiers**: only months, regions and sex, with sources.
- **findings (the core)**:
  - Link every catalog finding that helps tell this condition apart from the competitors under the same complaints. That means:
    - typical findings (e.g. chest_pain_duration, chest_pain_pressure, pleuritic_chest_pain, chest_pain_sudden_severe, chest_pain_radiates_back, pain_radiates_arm_jaw, chest_wall_tenderness, chest_pain_exertional, heartburn, dermatomal_rash, rash_any, breathing_difficulty, dyspnea_onset, cold_sweat, fainting_or_near_fainting, palpitations, leg_swelling_one_side);
    - findings that are notably uncommon in this condition but common in its competitors (give these a low level);
    - risk factors and exposures (smoker, hypertension_known, known_heart_disease, diabetes, known_aaa, copd_known, recent_immobility, previous_clot, active_cancer, estrogen_use, immunocompromised, heavy_alcohol);
    - distributions for the relevant categorical findings (cough_duration, dyspnea_onset, dyspnea_severity, chest_pain_duration, fever_max_temp, fever_duration).
  - Typically 10–25 links per new condition.
  - Respect conditional frequencies (kb-guide §2.1): cough_duration, productive_cough and the cough-character findings require cough; dyspnea_onset and dyspnea_severity require breathing_difficulty; reliever_no_relief requires asthma_known or copd_known; chest_pain_* findings require chest_pain; fever_* findings require fever. Give the frequency among patients who already have the required finding.
  - A finding implied by a complaint is not evidence under that complaint, but it is evidence under the others (link cough, breathing_difficulty and chest_pain where they matter).
  - Prefer numeric frequencies or sensitivities from systematic reviews and cohort studies (tier A/B), then guidelines and textbooks (verbal basis). Use `judgment` only with a clear note.
  - Adjust for setting: hospital series overstate severe features compared with community users (kb-guide §2.1).
- **warning_signs**: catalog findings that mean "go to emergency now" for this condition (categorical findings cannot be listed: use es_crushing_chest_pain, es_severe_breathing, chest_pain_sudden_severe, chest_pain_radiates_back, pain_radiates_arm_jaw, cold_sweat, fainting_or_near_fainting, es_stroke_signs…).
- **self_care_vi / see_doctor_vi**: short, safe, plain Vietnamese. No prescription drug names or doses (style guide). Say what not to do when it matters (e.g. do not wait to see whether chest pain passes when it is pressing or lasts 15 minutes; do not drive yourself to hospital).
- **review**: status draft, authors ["agent:pass-a"], updated "2026-10-31", and notes_vi listing the key uncertainties.
- **proposed_findings** (kb-guide §6): only for findings that are clearly important for discrimination and missing from the catalog. The maintainer must add them before the holdout writer starts, so propose them early and say why in your final message.

## Sources: strict rules
- Never fabricate. Every source you cite must be one you actually opened (WebFetch, or a downloaded PDF read with the Read tool). Record URL, DOI/PMID, licence class and accessed: "2026-10-31". Set verified: true only for sources you opened and checked.
- Do not use proxy or text-reader services to get around blocked sites (NICE, NCBI and StatPearls, WHO, some journals often block automated access). The Europe PMC API is a legitimate route to PubMed articles. If a site blocks you, use another official copy or keep verified: false and a lower tier.
- Never copy sentences from copyrighted sources. Write your own Vietnamese and keep the facts.
- WebSearch and WebFetch are deferred tools: load them with ToolSearch ("select:WebSearch,WebFetch").
- **The WebSearch budget is shared and small.** Use at most about 3 WebSearch calls per new condition and 1 per extension (mode "standard"), about 19 in all. Prefer WebFetch on known authoritative pages:
  - Bộ Y tế guideline PDFs already in the registry (byt-qd-2187-2019 covers acute coronary syndrome, byt-qd-4235-2012 respiratory diseases including pneumothorax);
  - WHO, CDC and NHS pages;
  - PubMed/PMC articles through Europe PMC, MSD Manual Professional.
- For downloads (PDFs): use curl into a NEW empty folder under /tmp/doctor-v-scratch/p3b3-pass-a-c/ (one folder per download), and read them with the Read tool (pages parameter). Never execute anything from there, and never copy downloads into the repo.

## Validate
Node 24 is needed: run `export PATH=/opt/nvm/versions/node/v24.22.2/bin:$PATH` in each shell command first. From the repository root run:
- `npm run kb:check -- --drafts drafts/phase-3/batch-3/pass-a`
- `npm run kb:check -- --drafts drafts/phase-3/batch-3/pass-a/extend`

Fix every error in your files until there are 0 errors. Keep warnings as few as reasonable. Files of parts a and b may also be there: ignore them and do not edit them. Do not run git.

## Final message
It is returned to me, not shown to the user. Write a concise English summary of at most 400 words:
- per condition: number of links, the urgency/cant_miss decision and any change from the suggestion, key sources, proposed findings;
- per extension: what you added;
- the main uncertainties;
- the number of WebSearch calls you used;
- any problem with the tools or the catalog (missing findings, unclear rules).
