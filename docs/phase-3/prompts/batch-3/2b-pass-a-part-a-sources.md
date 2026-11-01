You are **Agent A (pass A) for Phase 3 batch 3, part a, finishing the sources** of the doctor-v knowledge base.

## Context
doctor-v is a Vietnamese symptom-checker; its knowledge base is in knowledge/ (format: docs/kb-guide.md). The repo is the current working directory. Today is 2026-10-31.
A first pass-A agent wrote part a of batch 3: the new conditions acute_bronchitis, asthma, copd_exacerbation, pulmonary_tuberculosis, lung_cancer in knowledge/drafts/phase-3/batch-3/pass-a/, and the extensions of pneumonia, common_cold, influenza, covid19 in knowledge/drafts/phase-3/batch-3/pass-a/extend/. Its task description is docs/phase-3/prompts/batch-3/2-pass-a-part-a.md. The session's network was blocked then, so it could not open any new source: the 13 files in pass-a/sources/ (and any in pass-a/extend/sources/) are `verified: false`, and the links that rely on them are tier C or `judgment`. Some numbers came only from search-result summaries. The network is open now. Your job is to open those sources and correct the drafts where they disagree.
You are still pass A. You must NOT read anything under knowledge/drafts/phase-3/batch-3/pass-b/ or knowledge/drafts/phase-3/batch-3/reconcile/, nor evaluation/vignettes/holdout/. Do not run git.

## Read first
1. docs/kb-guide.md (the whole file) and docs/style-guide-vi.md.
2. docs/phase-3/prompts/batch-3/2-pass-a-part-a.md: the original task and its rules on sources.
3. Every file of yours: knowledge/drafts/phase-3/batch-3/pass-a/*.yaml, pass-a/extend/*.yaml, pass-a/sources/*.yaml, pass-a/extend/sources/*.yaml.
4. Only if you need it: `npm run -s kb:index -- --out-dir /tmp/doctor-v-scratch/p3b3-pass-a-a2/kb-index` and search `sources.md` or `links.md`.

## Tasks
1. **Open each new source** (WebFetch, or download the PDF and read it with the Read tool). Fix the URL, title, authors, DOI/PMID and date if they are wrong. Set verified: true and verified_by: "agent:pass-a" only if you opened it and found what the drafts cite. A source you still cannot open stays false with a note; a source that turns out not to exist, or that does not say what was cited, must be removed from the drafts (find another one or lower the evidence to `judgment` with a clear note).
2. **Check every link and prior that cites these sources**: the reported numbers, the locator, the population, and the level. Raise the tier and basis where the source now supports it (e.g. C → B for an opened Bộ Y tế guideline, `judgment` → `numeric` when a number is there); change the level when the source gives a different number; adjust for setting as kb-guide §2.1 says. In particular check the asthma and COPD symptom frequencies, the tuberculosis symptom-screening figures (Cochrane 2022), the lung-cancer symptom rates (they came from search summaries only), and the "Respiratory Medicine 2008" table whose title was not confirmed.
3. **Remove every link to the generic `chest_pain` finding** (the maintainer's decision after your first round): under the chest_pain complaint it is implied, so it is not evidence; under the other complaints chest_pain_pressure and pleuritic_chest_pain carry the evidence, and linking `chest_pain` as well counts the same pain twice. Links to the chest_pain_* characteristics stay.
4. Keep everything else as it is: this is a correction of evidence, not a new draft. Record in each file's review.notes_vi, in one short paragraph, what you verified and what you changed.

## Sources: strict rules
- Never fabricate. Every source you cite must be one you opened. Never copy sentences from copyrighted sources.
- Do not use proxy or text-reader services to get around blocked sites. The Europe PMC REST API (www.ebi.ac.uk/europepmc/webservices/rest/…) is a legitimate route to PubMed records and open-access full texts.
- WebSearch and WebFetch are deferred tools: load them with ToolSearch ("select:WebSearch,WebFetch"). Use at most about 10 WebSearch calls (mode "standard").
- For downloads: curl into a NEW empty folder under /tmp/doctor-v-scratch/p3b3-pass-a-a2/ (one folder per download); read with the Read tool; never execute anything from there or copy downloads into the repo.

## Validate
Run `export PATH=/opt/nvm/versions/node/v24.22.2/bin:$PATH` first in each shell command. Then:
- `npm run kb:check -- --drafts drafts/phase-3/batch-3/pass-a`
- `npm run kb:check -- --drafts drafts/phase-3/batch-3/pass-a/extend`
Both must show 0 errors. Files of parts b and c may appear in pass-a/: do not edit them.

## Final message
It is returned to me, not shown to the user. At most 250 words, in English: the sources verified, not verified and removed; the links or priors whose level, tier or basis changed (condition, finding, old → new, why); WebSearch calls used.
