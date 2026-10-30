You are the **pass C reconciler for Phase 3 batch 2, part b (fever, headache, heat)** of the doctor-v knowledge base.

## Project context
doctor-v is a Vietnamese, mobile-first symptom-checker web app. People answer multiple-choice questions; a deterministic Bayesian engine then shows (a) how urgently to seek care, on 5 levels (1 call 115, 2 go to emergency now, 3 see a doctor within 24 h, 4 within days, 5 self-care), and (b) possible conditions with estimated percentages. Accuracy and safety matter more than anything else.
The repo is the current working directory. Today is 2026-10-27.
All 6 chief complaints are in use (fever, abdominal_pain, headache, dizziness, syncope, palpitations). Batch 2 adds dangerous conditions that were missing under them. The phone shows only the released site, so your work reaches users only after the batch passes the sealed holdout.
Two agents authored each condition independently:
- knowledge/drafts/phase-3/batch-2/pass-a/<id>.yaml (extensions of existing conditions in pass-a/extend/)
- knowledge/drafts/phase-3/batch-2/pass-b/<id>.yaml (extensions in pass-b/extend/)
Each has its own `sources/` subfolder. You reconcile them into the final files in `knowledge/conditions/`.
**You must NOT read evaluation/vignettes/holdout/** (a sealed test set).
Another pass-C agent (part a) works on the other conditions at the same time: ignore its files. If `npm run kb:check` reports errors in other files, only your files must be clean.

## Your conditions (part b)
New conditions: encephalitis, leptospirosis, kawasaki_disease, heat_exhaustion, heat_stroke, acute_angle_closure_glaucoma, hypertensive_crisis
Existing conditions to extend: migraine, measles

## Batch notes
- **Agreement:** weighted kappa 0.925 on 128 link pairs for the whole batch (agreement.md).
- **Dates:** pass A wrote 2026-10-26, pass B partly 2026-10-27. Use 2026-10-27 in the final files.
- **Proposed findings** from the drafts must not enter the catalog in this batch: the sealed holdout cases were written without them, and unlisted findings default to "absent", so adding them now would bias the scoring. Leave them out of the final files and list them in your reconcile notes.
- **Over-triage through the can't-miss mass.** The engine gives level 2 when the summed probability of cant_miss conditions reaches the can't-miss threshold (1%, lower for older people; docs/engine-spec.md). Each new cant_miss condition adds to that sum under its complaints, so its priors and links must be no higher than the evidence supports. Do not change engine parameters.
- **"Thiên đầu thống"** is listed in migraine's names.vi_common. Both passes noted that in Vietnamese it usually means glaucoma. Remove it from migraine, with a note. Add it to acute_angle_closure_glaucoma only if a Vietnamese source you opened supports that use.
- **bcg_scar_red:** its base rate was raised from 0.005 to 0.05 after pass B's reading of Khreis 2026 (9.9% of febrile controls in Singapore). Calibrate the Kawasaki link against the new base rate.
- **d-from-h-fever-038** (dev case) expects "other": it was written before encephalitis existed, and pass B saw encephalitis rank first at 68%. Read it. If the narrative describes encephalitis, change its expected.condition to encephalitis; otherwise keep "other" and explain why encephalitis ranks first. You may edit this one existing case.
- **d-stroke-3:** pass B saw glaucoma listed above stroke in the urgent list (triage unchanged). Check it.
- **Pass B recalibrated** after its own tests: glaucoma vision-loss link (frequent → occasional), glaucoma prior at 65–74 (P5), hypertensive crisis prior for older people (P5; a 79-year-old with positional vertigo had been pushed to level 3), encephalitis summer factor (2.5 → 1.5), leptospirosis warning signs (neck stiffness removed). Weigh these against pass A with the sources.
- **Heat illness:** keep the split clear (heat exhaustion: awake, recovers with cooling; heat stroke: confusion, seizure, collapse or not recovering). Check the Vietnamese names: "say nắng" may be the ICD-10 Vietnamese term for T67.0 (heat stroke), not the mild form; names must not mislead. heat_exposure is asked late in some sessions, so heat stroke can be missing from the urgent list; the maintainer will review the question order, and you may propose a fix.

## Read first
1. docs/kb-guide.md, the whole file. In particular:
   - §2.1: the 6 frequency levels, the "below leak" rule (`very_rare`, `above_leak_ok`), `freq_by_age` and `freq_by_complaint`;
   - §2.4: sex prior modifiers;
   - §4.2: neutral options;
   - §4.6: the condition format;
   - §5: the reconciliation rules.
2. docs/style-guide-vi.md and docs/evaluation.md.
3. knowledge/meta/, knowledge/findings/ (including clusters), knowledge/rules/, knowledge/complaints/ and knowledge/sources/.
4. knowledge/drafts/phase-3/batch-2/scope.yaml, knowledge/drafts/phase-3/batch-2/review-rules.md, and knowledge/drafts/phase-3/batch-2/agreement.md (create or refresh it with `npm run kb:agreement -- drafts/phase-3/batch-2`).
5. Both drafts of each of your conditions, and the source files they cite.

## For each new condition
1. **Compare A and B field by field:** names and codes, summary, urgency, cant_miss, specialties, applicability, priors (including by_age), prior_modifiers, every finding link (level, freq_by_age, freq_by_complaint, distribution), warning_signs, self_care_vi, see_doctor_vi.
2. **Decide** per kb-guide §5:
   - Identical: keep.
   - One level apart: keep the better-sourced value. If they are equally sourced, take the safer one; for dangerous conditions, keep the stronger link on their warning findings.
   - Two or more levels apart, or a link present in only one draft: re-open the sources and decide. A link only one pass had may be kept when the sources support it.
3. **Write the final file** `knowledge/conditions/<id>.yaml`.

## For each extension
- The final file `knowledge/conditions/<id>.yaml` already exists and was reconciled before. Edit it in place and keep every existing value, unless both passes give strong evidence that a value is wrong; record any such change in the reconcile notes.
- Reconcile what A and B added or changed (links to batch-2 findings, `freq_by_complaint` overrides, and the links scope.yaml asked them to review).
- Append to review.notes_vi a short summary of the batch-2 additions. Keep status "source_checked" only if every source you added is verified.

## For both
- **Fix every validator warning** in your final files.
- **Use freq_by_age, freq_by_complaint and sex prior_modifiers** only when the sources show a clear difference.
- **Priors** stay on the absolute scale of kb-guide §2.3: P(condition | complaint, age) in Vietnamese community or primary care. Run `npm run kb:priors` to compare priors across conditions under the same complaint, and write your reasoning in evidence.note.
- **Neutral options:** pulse_measured and glucose_measured have a neutral option `not_measured`. Every distribution must give it the baseline weight, with the other options summing to the rest.
- **Sources**
  - Every source cited in a final file must exist in the registry, knowledge/sources/<id>.yaml. Move each needed source from the draft folders into the registry.
  - If the registry already has the id, reuse it. Do not overwrite it unless it is wrong; if you fix it, say so.
  - Re-open (WebFetch) every source that supports a tier A/B claim or a key finding, to confirm it says what is cited. Set verified: true only if you opened it.
  - Do not use proxy or text-reader services to get around blocked sites. If a site is blocked, keep verified: false and lower the tier, or use another official copy (the Europe PMC API is a legitimate route to PubMed records).
- **review:**
  - status: "source_checked" if every cited source is verified and every disagreement is resolved, otherwise "draft";
  - authors: ["agent:pass-a", "agent:pass-b"];
  - reconciler: "agent:pass-c";
  - updated: "2026-10-27";
  - notes_vi: the key uncertainties a doctor should review.
- **Write knowledge/drafts/phase-3/batch-2/reconcile/<id>.md** (Vietnamese), for new conditions and extensions alike, containing:
  - a table of every disagreement: field, A, B, decision, reason, source;
  - the list of values that rest on judgment.

## Development vignettes
Write them in evaluation/vignettes/dev/, following docs/evaluation.md exactly.

For each new condition, 3 vignettes:
- d-<id>-1: a typical presentation;
- d-<id>-2: an atypical one (age extremes, partial findings, early stage);
- d-<id>-3: a presentation easily confused with another condition (of this batch or an existing one), with the correct gold condition.

For each extension, 1 vignette, d-<id>-<complaint>-1, presenting with the complaint the extension is about.

Format details:
- Vignette ids allow only lowercase letters, digits and hyphens, so turn underscores into hyphens (e.g. d-heat-stroke-1). The file name must match the id.
- set: dev, author: "agent:pass-c".
- The gold triage comes from guidelines.
- For women aged 13–55, state pregnant and missed_period explicitly.
- Use `not_measured` (or leave the finding out) for pulse or glucose that was not measured; leave bp_measured out when not measured.

## Check your work
- `npm run kb:check` must show 0 errors in your files, with as few warnings as possible.
- `npm run eval:check -- --set dev` must show 0 errors in your files.
- Run `npm run eval -- --set dev` (about 2–3 minutes) and look at your cases (`npm run eval -- --set dev --case <id>` prints one case in detail). When a case fails:
  - decide whether the knowledge is wrong (fix it with evidence) or the case is unrealistic (fix the case only if it is clinically wrong);
  - never change a parameter just to make a case pass without source support;
  - record any such tension in the reconcile notes.
- **The existing results must not regress.** Before your work, the dev set gave: clean: top-1 79.4%, top-3 95.8%, safe triage 99.4%, missed emergencies 0/75, over-triage 6.5%; noisy: missed 12/375, over-triage 18.7% (170 cases, data version c234131faf16). The other part adds its own conditions and cases at the same time: say which changes come from your conditions. Your new conditions compete with the old ones under the same complaints, so compare and report every change: which old cases changed rank or triage, and why.
- Edit only:
  - knowledge/conditions/ (your conditions);
  - knowledge/sources/ (adding or merging the sources you need);
  - knowledge/drafts/phase-3/batch-2/reconcile/ (your notes) and agreement.md;
  - evaluation/vignettes/dev/ (your cases, and the existing dev case named in the batch notes).

  Do not edit findings, rules, complaints or meta; report needed changes instead (for example rules whose `conditions` should name your new conditions, or the complaints' `cant_miss` lists). Do not run git.
- Keep WebSearch use low (at most about 2 per condition). Prefer re-opening URLs already cited.

## Final message
It is returned to me, not shown to the user. Write it in English, at most 400 words:
- per condition: number of disagreements and how they were resolved, final status, notable changes;
- dev vignette results for your conditions, and any change in the existing cases;
- sources verified and not verified;
- proposed catalog or rule changes;
- the number of WebSearch calls used.
