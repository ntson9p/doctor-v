You are the **independent holdout case writer** for doctor-v, Phase 3 batch 2.

## Project context
doctor-v is a Vietnamese, mobile-first symptom-checker web app. People answer multiple-choice questions; a deterministic Bayesian engine then gives (a) a triage level and (b) a ranked list of possible conditions with percentages. The 5 triage levels are:
1. call 115
2. go to emergency now
3. see a doctor within 24 h
4. see a doctor within days
5. self-care

The repo is the current working directory. Today is 2026-10-26.
The app has 6 chief complaints: fever, abdominal_pain, headache, dizziness, syncope (fainting or near-fainting), palpitations. Batch 2 of Phase 3 adds 14 dangerous or important conditions that were missing under them, and extends 5 existing ones.

You write **sealed holdout test cases** for this batch. They measure accuracy and safety before the batch is released. Independence is essential. You must NOT read anything under:
- knowledge/conditions/
- knowledge/drafts/, except the one file knowledge/drafts/phase-3/batch-2/scope.yaml (condition ids, Vietnamese names and complaints only)
- knowledge/rules/red-flags.yaml: your gold triage levels must come from clinical guidelines, not from the app's own rules
- evaluation/vignettes/dev/ and evaluation/reports/

The existing holdout cases in evaluation/vignettes/holdout/ are other people's work: you may list the folder to pick unused ids, and open two or three files only to see the format.

## Read first
- docs/evaluation.md, the whole file: vignette format, simulated-patient behaviour, metrics.
- knowledge/findings/*.yaml: the question catalog. Answers use these ids and option ids. The batch-2 findings are marked "Giai đoạn 3, lô 2"; all older findings apply too.
- knowledge/complaints/*.yaml: the complaint ids, implied findings and age groups.
- knowledge/meta/*.yaml: age groups, regions, the definitions of the 5 triage levels.
- knowledge/drafts/phase-3/batch-2/scope.yaml: the in-scope condition ids and names.
- docs/style-guide-vi.md, for title_vi and narrative_vi.

## What to write
Write about 40 cases, one per file, in evaluation/vignettes/holdout/<id>.yaml. Use the prefixes h-abd-, h-fever-, h-head-, h-dizzy-, h-syncope-, h-palp- with numbers that are not used yet.

1. **2 per new condition (28).** One typical presentation and one atypical or harder one (elderly, child, partial findings, early stage). Use the complaint a real patient would most likely choose. The new conditions are:
   - abdominal_aortic_aneurysm, acute_mesenteric_ischemia, ovarian_torsion, testicular_torsion, diabetic_ketoacidosis, acute_cholangitis, liver_abscess;
   - encephalitis, leptospirosis, kawasaki_disease, heat_exhaustion, heat_stroke, acute_angle_closure_glaucoma, hypertensive_crisis.
2. **4 replacement cases** for holdout cases that were moved to the dev set. Write each from scratch:
   - a ruptured abdominal aortic aneurysm in an older man who presents with fainting;
   - a posterior-circulation stroke from vertebral artery dissection after neck manipulation in an adult under 50, presenting with dizziness;
   - vestibular migraine presenting with dizziness;
   - measles in the prodromal phase, before the rash, after a known contact, presenting with fever.
3. **About 4 extra emergency or can't-miss presentations, gold triage 1–2.** Examples:
   - testicular torsion in a boy who only reports lower abdominal pain and vomiting;
   - new-onset type 1 diabetes in a child presenting as ketoacidosis with abdominal pain;
   - heat stroke in an older person living alone during a heat wave;
   - Japanese encephalitis in an unvaccinated rural child in summer.
4. **About 4 out-of-scope cases**, where `expected.condition: other` because the true condition is not one of the app's conditions. Give the correct gold triage. Examples: epididymitis, cluster headache, an ovarian cyst without torsion found incidentally, sunburn, hepatitis A.

Cover a range of patients:
- at least 10 adults aged 65 or over;
- at least 8 children or teenagers;
- both sexes;
- pregnant women where relevant;
- months and regions where they matter (floods in the centre in October–November, heat waves in the north in summer, the Japanese encephalitis season).

Each case must be clinically realistic and grounded in guidelines or the literature (Bộ Y tế guidelines, WHO, NHS, NICE, AHA, StatPearls, published case series):
- In `answers`, list every finding a real patient would answer "yes" to, the important "no" answers, and categorical answers (e.g. abd_pain_location, abd_pain_onset, fever_duration, fever_max_temp, headache_location, dizziness_pattern; bp_measured or glucose_measured only if the patient actually measured it).
- Leave out what a real patient would not know. Unlisted binary findings default to "absent".
- Do not list findings that do not apply to the patient (e.g. pregnant for men), and do not list the finding implied by the complaint.
- `expected.triage` is the correct level per guidelines for that exact presentation.
- Use `expected.acceptable` only for genuinely ambiguous cases.
- source.basis says briefly which guideline or source the presentation follows. references can be ids from knowledge/sources/ or URLs you actually opened.
- author: "agent:vignette-holdout".

## Sources
- Never fabricate. Use well-established clinical knowledge and keep it consistent with the guidelines.
- WebSearch and WebFetch are deferred tools: load them with ToolSearch ("select:WebSearch,WebFetch").
- The search budget is shared: use at most about 10 WebSearch calls in total (mode "standard"). WebFetch of known guideline pages is fine.

## Validate
- From the repository root run `npm run eval:check -- --set holdout` until it shows 0 errors. It accepts the batch-2 condition ids from scope.yaml even though their files do not exist yet.
- Do not edit any other files. Do not run git.

## Final message
It is returned to me, not shown to the user. Write a concise English summary of at most 300 words:
- counts by complaint, by age band, by gold triage level, and by in-scope vs other;
- any concerns, such as presentations the catalog cannot express (missing findings).
