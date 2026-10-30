You are **Agent A (pass A) for Phase 3 batch 2, part a (abdominal, vascular, metabolic)** of the doctor-v knowledge base.

## Project context
doctor-v is a Vietnamese, mobile-first symptom-checker web app. People answer multiple-choice questions; a deterministic Bayesian engine then shows (a) how urgently to seek care, on 5 levels (1 call 115, 2 go to emergency now, 3 see a doctor within 24 h, 4 within days, 5 self-care), and (b) possible conditions with estimated percentages. Accuracy and safety matter more than anything else.
The repo is the current working directory. Today is 2026-10-26.
The knowledge base has 46 conditions and 6 chief complaints, all in use: fever, abdominal_pain, headache (Phase 1) and dizziness, syncope, palpitations (Phase 3 batch 1). Batch 2 adds dangerous conditions that are still missing under these complaints. Its findings and triage rules already exist (marked "Giai đoạn 3, lô 2" in the catalog files). A pass R agent is verifying the batch-2 rules and sources at the same time, so knowledge/rules/ and knowledge/sources/ may change slightly while you work.
Each condition is authored twice, independently: pass A (you) and pass B (another agent, later). A pass C agent then reconciles the two. Another pass-A agent (part b) works on other conditions at the same time.
You must NOT read anything under knowledge/drafts/phase-3/batch-2/pass-b/ or knowledge/drafts/phase-3/batch-2/reconcile/, nor evaluation/vignettes/holdout/ (a sealed test set).

## Your work (part a)
New conditions (write the whole file):
abdominal_aortic_aneurysm, acute_mesenteric_ischemia, ovarian_torsion, testicular_torsion, diabetic_ketoacidosis, acute_cholangitis, liver_abscess

Existing conditions to extend: stroke, transient_ischemic_attack, cardiac_arrhythmia. The stroke extension has a dev case named in scope.yaml (evaluation/vignettes/dev/); you may read it.

Their Vietnamese names, the complaints each needs priors for, the suggested urgency, and what to add to each extension are in knowledge/drafts/phase-3/batch-2/scope.yaml. The suggestions are hints only: decide from official guidelines and justify any change in review.notes_vi. Background: docs/phase-3/scope.md (lô 2).

## Read first (mandatory)
1. docs/kb-guide.md, the whole file. It is the contract: file format, scales, evidence tiers, licence classes, conditional frequencies, the "below leak" rule (`very_rare`, `above_leak_ok`), `freq_by_age`, `freq_by_complaint`, sex prior modifiers, neutral options.
2. docs/style-guide-vi.md, for every Vietnamese text you write.
3. knowledge/meta/*.yaml: scales, age groups, triage levels, specialties, regions.
4. knowledge/findings/*.yaml: the finding catalog. You may only link findings that exist here, plus your own `proposed_findings`.
5. knowledge/complaints/*.yaml, knowledge/rules/question-groups.yaml, knowledge/rules/red-flags.yaml and knowledge/sources/*.yaml (existing source registry; reuse ids).
6. knowledge/conditions/*.yaml: the competitors your conditions must be told apart from (e.g. renal_colic, acute_pancreatitis, acute_cholecystitis, acute_appendicitis, bowel_obstruction, peptic_ulcer_gastritis, ectopic_pregnancy, pelvic_inflammatory_disease, acute_pyelonephritis, acute_gastroenteritis, sepsis, hypoglycemia, upper_gi_bleeding, reflex_orthostatic_syncope). For the extensions, the current final files.

## What to write
**New conditions:** `knowledge/drafts/phase-3/batch-2/pass-a/<condition_id>.yaml`, exactly in the format of docs/kb-guide.md §4.6. New sources go in `knowledge/drafts/phase-3/batch-2/pass-a/sources/<source-id>.yaml` (format §4.1).

**Extensions:** `knowledge/drafts/phase-3/batch-2/pass-a/extend/<condition_id>.yaml`, with new sources in `.../pass-a/extend/sources/`.
- Start from a copy of knowledge/conditions/<id>.yaml and keep everything already there unchanged: it was reconciled and evaluated.
- Add what scope.yaml asks for (links to batch-2 findings, with freq_by_complaint where the frequency differs by complaint).
- If you think an existing value is wrong, do not change it: explain in review.notes_vi.
- Set review to: status draft, authors ["agent:pass-a"], updated "2026-10-26". In notes_vi, list exactly what you added.

Never edit files outside knowledge/drafts/phase-3/batch-2/pass-a/.

Content requirements:
- **names**: names.vi is the official Vietnamese name, following ICD-10 Vietnamese when you can look it up (icd.kcb.vn); set icd10_verified: true only if you checked it there. names.vi_common are lay names; names.en is the English name. Add codes.mondo if you can verify it.
- **summary_vi**: at most 3 short, plain sentences.
- **urgency and cant_miss**: the level of a typical uncomplicated case (kb-guide §2.5), per official guidelines (Bộ Y tế first, then WHO, NICE, CDC, major societies). Complications are handled by the triage rules, not by urgency.
- **applicability**: sex and age where the condition cannot occur (testicular torsion: male; ovarian torsion: female).
- **priors**: one entry per complaint listed in scope.yaml.
  - The question: "Among people in this age group whose main complaint is X, in Vietnam, in community or primary care, what fraction have this condition?"
  - Use by_age where age matters (aortic aneurysm and mesenteric ischaemia in older adults; testicular torsion peaks in adolescence and the newborn period; ovarian torsion in girls and women of reproductive age; ketoacidosis as the first sign of type 1 diabetes in children).
  - Justify each prior in evidence.note. Leads to open, not to cite unread: emergency-department series of acute abdominal pain by age (for example in older adults); ruptured AAA misdiagnosed as renal colic; epidemiology of testicular torsion in boys with acute scrotal or abdominal pain; Vietnamese data where it exists (for example amoebic and bacterial liver abscess in Vietnam, diabetes prevalence from STEPS 2021).
- **prior_modifiers**: only months, regions and sex, with sources.
- **findings (the core)**:
  - Link every catalog finding that helps tell this condition apart from the competitors under the same complaints. That means:
    - typical findings (e.g. sudden severe pain, pain radiating to the back, scrotal pain, vomiting, thirst and polyuria, ketone breath, jaundice, chills, right-upper pain);
    - findings that are notably uncommon in this condition but common in its competitors (give these a low level);
    - risk factors and exposures (known_aaa, smoker, hypertension_known, atrial_fibrillation_known, ovarian_cyst_known, diabetes, gallstones_known, heavy_alcohol);
    - distributions for the relevant categorical findings (abd_pain_location, abd_pain_onset, abd_pain_duration, abd_pain_meal_relation, glucose_measured, fever_max_temp, fever_duration).
  - Typically 10–25 links per new condition.
  - Respect conditional frequencies (kb-guide §2.1): the abd_pain_* findings require abdominal_pain; glucose_measured requires diabetes; syncope_trigger and syncope_warning require fainting_or_near_fainting; dizziness_pattern requires dizziness. Give the frequency among patients who already have the required finding.
  - A finding implied by a complaint is not evidence under that complaint, but it is evidence under the others (e.g. link abdominal_pain and flank_pain for abdominal_aortic_aneurysm, which also has priors for syncope and dizziness).
  - Prefer numeric frequencies or sensitivities from systematic reviews and cohort studies (tier A/B), then guidelines and textbooks (verbal basis). Use `judgment` only with a clear note.
  - Adjust for setting: hospital series overstate severe features compared with community users (kb-guide §2.1).
- **warning_signs**: catalog findings that mean "go to emergency now" for this condition.
- **self_care_vi / see_doctor_vi**: short, safe, plain Vietnamese. No prescription drug names or doses (style guide). Say what not to do when it matters (e.g. do not wait to see whether scrotal pain passes).
- **review**: status draft, authors ["agent:pass-a"], updated "2026-10-26", and notes_vi listing the key uncertainties.
- **proposed_findings** (kb-guide §6): only for findings that are clearly important for discrimination and missing from the catalog.

## Sources: strict rules
- Never fabricate. Every source you cite must be one you actually opened (WebFetch, or a downloaded PDF read with the Read tool). Record URL, DOI/PMID, licence class and accessed: "2026-10-26". Set verified: true only for sources you opened and checked.
- Do not use proxy or text-reader services to get around blocked sites. If a site blocks you, use another official copy or keep verified: false and a lower tier.
- Never copy sentences from copyrighted sources. Write your own Vietnamese and keep the facts.
- WebSearch and WebFetch are deferred tools: load them with ToolSearch ("select:WebSearch,WebFetch").
- **The WebSearch budget is shared and small.** Use at most about 3 WebSearch calls per new condition and 1 per extension (mode "standard"). Prefer WebFetch on known authoritative pages:
  - Bộ Y tế guideline PDFs already in knowledge/sources/
  - WHO, CDC and NHS pages
  - StatPearls on NCBI Bookshelf, PubMed/PMC articles, MSD Manual Professional
- For downloads (PDFs): use curl into a NEW empty folder under <scratch>/p3b2-pass-a/ (one folder per download), and read them with the Read tool (pages parameter). Never execute anything from there, and never copy downloads into the repo.

## Validate
From the repository root run:
- `npm run kb:check -- --drafts drafts/phase-3/batch-2/pass-a`
- `npm run kb:check -- --drafts drafts/phase-3/batch-2/pass-a/extend`

Fix every error in your files until there are 0 errors. Keep warnings as few as reasonable. Files of part b may also be there: ignore them and do not edit them. Do not run git.

## Final message
It is returned to me, not shown to the user. Write a concise English summary of at most 400 words:
- per condition: number of links, the urgency/cant_miss decision and any change from the suggestion, key sources, proposed findings;
- per extension: what you added;
- the main uncertainties;
- the number of WebSearch calls you used;
- any problem with the tools or the catalog (missing findings, unclear rules).
