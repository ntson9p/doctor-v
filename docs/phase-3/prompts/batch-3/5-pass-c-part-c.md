You are the **pass C reconciler for Phase 3 batch 3, part c (chest pain)** of the doctor-v knowledge base.

## Project context
doctor-v is a Vietnamese, mobile-first symptom-checker web app. People answer multiple-choice questions; a deterministic Bayesian engine then shows (a) how urgently to seek care, on 5 levels (1 call 115, 2 go to emergency now, 3 see a doctor within 24 h, 4 within days, 5 self-care), and (b) possible conditions with estimated percentages. Accuracy and safety matter more than anything else.
The repo is the current working directory. Today is 2026-10-31.
Six chief complaints are released (fever, abdominal_pain, headache, dizziness, syncope, palpitations). Batch 3 adds three, still `status: in_progress`: cough, shortness_of_breath (implies breathing_difficulty) and chest_pain (implies chest_pain; ages 5 and over), with 15 new conditions and 11 extensions. The phone shows only the released site, so your work reaches users only after the batch passes the sealed holdout.
Two agents authored each condition independently:
- knowledge/drafts/phase-3/batch-3/pass-a/<id>.yaml (extensions of existing conditions in pass-a/extend/)
- knowledge/drafts/phase-3/batch-3/pass-b/<id>.yaml (extensions in pass-b/extend/)
Each has its own `sources/` subfolder. You reconcile them into the final files in `knowledge/conditions/`.
**You must NOT read evaluation/vignettes/holdout/** (a sealed test set).
Other pass-C agents work on the other parts: ignore their files. If `npm run kb:check` reports errors in other files, only your files must be clean.

## Your conditions (part c)
New conditions: pneumothorax, aortic_dissection, gerd, chest_wall_pain, herpes_zoster
Existing conditions to extend: acute_coronary_syndrome, pulmonary_embolism, cardiac_arrhythmia, anemia

## Batch notes
- **Agreement:** weighted kappa 0.958 on 159 link pairs for the whole batch (knowledge/drafts/phase-3/batch-3/agreement.md).
- **Dates:** use 2026-10-31 in the final files.
- **The network was blocked during part of this batch.** Pass A part a first wrote without opening any new source, then a second pass-A agent opened them and corrected the evidence; the drafts say which values were checked. Re-open what supports tier A/B claims and key findings.
- **GINA and GOLD:** cite gina-2026 and gold-2026 (verified, in the registry), not gina-2024 or gold-2025 (superseded, unverified).
- **Do not link the generic `chest_pain` finding** (maintainer's decision): under the chest_pain complaint it is implied; under the other complaints chest_pain_pressure and pleuritic_chest_pain carry the evidence, and linking chest_pain too counts the same pain twice. Drop such links from the drafts. The chest_pain_* characteristics are fine.
- **Proposed findings:** these were added to the catalog before the holdout writer started, so link the catalog versions where the drafts proposed them: spo2_measured, night_respiratory_symptoms, drooling_cannot_swallow, grunting, former_smoker, biomass_smoke_exposure, hoarse_voice, dtp_vaccinated, rapid_weight_gain, chest_pain_tearing, skin_burning_band. Any other proposal must stay out of the final files (the sealed holdout cases were written without it, and unlisted findings default to "absent"); list it in your reconcile notes.
- **Over-triage through the can't-miss mass.** The engine gives level 2 when the summed probability of cant_miss conditions reaches the can't-miss threshold (1%, lower for older people; docs/engine-spec.md). Each new cant_miss condition (anaphylaxis, pneumothorax, aortic_dissection) adds to that sum under its complaints, so its priors and links must be no higher than the evidence supports. Do not change engine parameters.
- **Released complaints change:** pulmonary_tuberculosis and bronchiolitis add priors for fever, gerd for abdominal_pain. Compare the dev set on those complaints before and after, and explain every change.
- **Existing dev cases** of the conditions you extend were written before the batch-3 questions existed. When such a case's narrative clearly states a batch-3 finding (e.g. how long the cough has lasted, sudden breathlessness, central chest pressure), add the answer. Change nothing else in those cases.
- **chest_wall_pain:** pass A moved the suggested urgency from 5 to 4 (NHS Costochondritis: call 111, i.e. level 3 under pass R's convention). Decide from the sources.
- **aortic_dissection:** pass A kept urgency 1 although HSE's wording maps to level 2; the rule rf_aortic_dissection_signs is level 1.
- **gerd:** its abdominal_pain prior changes a released complaint, where heartburn and epigastric pain already point to peptic_ulcer_gastritis. Keep the two distinguishable, and report every abdominal-pain dev change.
- **acute_coronary_syndrome:** stable angina is not a condition (pass A: about 7–11% of primary-care chest pain); do not stretch ACS to cover it, but report the gap.
- **anemia:** breathless_on_exertion and dyspnea_severity partly ask the same thing; avoid counting it twice (choose levels accordingly or propose a cluster).
- **Duplicate draft sources:** bosner-bmcfampract-2009 and verdon-smw-2008 exist in more than one draft folder; merge them into one registry file each.

## Read first
1. docs/kb-guide.md, the whole file (§2.1 frequency levels, the "below leak" rule, `freq_by_age`, `freq_by_complaint`; §2.4 sex prior modifiers; §2.5 urgency, cant_miss, `rule_out`; §4.2 neutral options; §4.6 the condition format; §5 the reconciliation rules), docs/style-guide-vi.md and docs/evaluation.md.
2. The compact index, instead of the YAML files under knowledge/. Run `npm run -s kb:index -- --out-dir /tmp/doctor-v-scratch/p3b3-pass-c-c/kb-index`, read `index.md` whole, and search `links.md`, `rules.md`, `sources.md` when you need them (links.md shows the final links of the competitors).
3. knowledge/drafts/phase-3/batch-3/scope.yaml, knowledge/drafts/phase-3/batch-3/review-rules.md (both rounds), knowledge/drafts/phase-3/batch-3/agreement.md.
4. Both drafts of each of your conditions, the current final file of each condition you extend, and the source files they cite.

## For each new condition
1. **Compare A and B field by field:** names and codes, summary, urgency, cant_miss, rule_out, specialties, applicability, priors (including by_age), prior_modifiers, every finding link (level, freq_by_age, freq_by_complaint, distribution), warning_signs, self_care_vi, see_doctor_vi.
2. **Decide** per kb-guide §5:
   - Identical: keep.
   - One level apart: keep the better-sourced value. If they are equally sourced, take the safer one; for dangerous conditions, keep the stronger link on their warning findings.
   - Two or more levels apart, or a link present in only one draft: re-open the sources and decide. A link only one pass had may be kept when the sources support it.
3. **Write the final file** `knowledge/conditions/<id>.yaml`.

## For each extension
- The final file `knowledge/conditions/<id>.yaml` already exists and was reconciled before. Edit it in place and keep every existing value, unless both passes give strong evidence that a value is wrong; record any such change in the reconcile notes.
- Reconcile what A and B added: priors for the new complaints, links to batch-3 findings, `freq_by_complaint` overrides (an existing link may need one now that a new complaint selects a different subset of patients).
- Append to review.notes_vi a short summary of the batch-3 additions. Keep status "source_checked" only if every source you added is verified.

## For both
- **Fix every validator warning** in your final files.
- **Use freq_by_age, freq_by_complaint and sex prior_modifiers** only when the sources show a clear difference.
- **Priors** stay on the absolute scale of kb-guide §2.3: P(condition | complaint, age) in Vietnamese community or primary care. Run `npm run kb:priors` to compare priors across conditions under the same complaint, and write your reasoning in evidence.note.
- **Neutral options:** pulse_measured, glucose_measured and spo2_measured have a neutral option `not_measured`. Every distribution must give it the baseline weight, with the other options summing to the rest.
- **Sources**
  - Every source cited in a final file must exist in the registry, knowledge/sources/<id>.yaml. Move each needed source from the draft folders into the registry.
  - If the registry already has the id, reuse it. Do not overwrite it unless it is wrong; if you fix it, say so.
  - Re-open (WebFetch, or curl and the Read tool) every source that supports a tier A/B claim or a key finding, to confirm it says what is cited. Set verified: true only if you opened it.
  - Do not use proxy or text-reader services to get around blocked sites. If a site is blocked, keep verified: false and lower the tier, or use another official copy (the Europe PMC REST API at www.ebi.ac.uk/europepmc/webservices/rest/ is a legitimate route to PubMed records).
  - For downloads: curl into a NEW empty folder under /tmp/doctor-v-scratch/p3b3-pass-c-c/ (one folder per download); never execute anything from there or copy downloads into the repo.
- **review:**
  - status: "source_checked" if every cited source is verified and every disagreement is resolved, otherwise "draft";
  - authors: ["agent:pass-a", "agent:pass-b"];
  - reconciler: "agent:pass-c";
  - updated: "2026-10-31";
  - notes_vi: the key uncertainties a doctor should review.
- **Write knowledge/drafts/phase-3/batch-3/reconcile/<id>.md** (Vietnamese), for new conditions and extensions alike, containing:
  - a table of every disagreement: field, A, B, decision, reason, source;
  - the list of values that rest on judgment.

## Development vignettes
Write them in evaluation/vignettes/dev/, following docs/evaluation.md exactly.

For each new condition, 3 vignettes:
- d-<id>-1: a typical presentation;
- d-<id>-2: an atypical one (age extremes, partial findings, early stage);
- d-<id>-3: a presentation easily confused with another condition (of this batch or an existing one), with the correct gold condition.

For each extension, 1 vignette per new complaint it gains, d-<id>-<complaint>-1 (complaint ids with hyphens, e.g. d-pneumonia-shortness-of-breath-1), up to 2 per extension: choose the complaints a patient with that condition most often chooses.

Format details:
- Vignette ids allow only lowercase letters, digits and hyphens, so turn underscores into hyphens. The file name must match the id.
- set: dev, author: "agent:pass-c".
- The gold triage comes from guidelines.
- For women aged 13–55, state pregnant and missed_period explicitly.
- Answer every batch-3 finding the patient has, including overlaps: pleuritic_chest_pain or chest_pain_pressure present means chest_pain: present when the complaint is not chest_pain. Do not list the finding implied by the complaint.
- Leave out measurements that were not taken, or use `not_measured` (pulse, glucose, SpO2).

## Check your work
- Node 24 is needed: run `export PATH=/opt/nvm/versions/node/v24.22.2/bin:$PATH` in each shell command first.
- `npm run kb:check` must show 0 errors in your files, with as few warnings as possible.
- `npm run eval:check -- --set dev` must show 0 errors in your files.
- Run `npm run eval -- --set dev` (about 2–3 minutes) and look at your cases (`npm run eval -- --set dev --case <id>` prints one case in detail). When a case fails:
  - decide whether the knowledge is wrong (fix it with evidence) or the case is unrealistic (fix the case only if it is clinically wrong);
  - never change a parameter just to make a case pass without source support;
  - record any such tension in the reconcile notes.
- **The existing results must not regress.** Before batch 3's pass C, the dev set gave (217 cases, data version 68ce96c9e5d7): clean: top-1 75.7%, top-3 94.9%, safe triage 99.5%, missed emergencies 0/106, over-triage 6.9%; noisy: missed 10/530, over-triage 18.7%. The other parts add their own conditions and cases at the same time: say which changes come from your conditions. Your conditions compete with the old ones under the same complaints, so compare and report every change: which old cases changed rank or triage, and why.
- Edit only:
  - knowledge/conditions/ (your conditions);
  - knowledge/sources/ (adding or merging the sources you need);
  - knowledge/drafts/phase-3/batch-3/reconcile/ (your notes) and agreement.md;
  - evaluation/vignettes/dev/ (your cases, and answers in existing dev cases of your extensions as the batch notes say).

  Do not edit findings, rules, complaints or meta; report needed changes instead (for example rules whose `conditions` should name your new conditions, the complaints' `cant_miss` lists, or question order). Do not run git.
- Keep WebSearch use low (at most about 2 per condition). Prefer re-opening URLs already cited.

## Final message
It is returned to me, not shown to the user. Write it in English, at most 400 words:
- per condition: number of disagreements and how they were resolved, final status, notable changes;
- dev vignette results for your conditions, and any change in the existing cases;
- sources verified and not verified;
- proposed catalog or rule changes (rule targets, cant_miss lists, question order);
- the number of WebSearch calls used.
