# Tasks 4, 5, 6 — Ady Phase 1/2/3 content

## Files created

- `src/data/ady/phase1.ts` — `phase1: Phase` (n:1, 'Foundation', 'habit & form, keep it doable'), days 1–30 from Appendix A.1. Rest days: 7, 14, 21, 28.
- `src/data/ady/phase1.test.ts` — validation test exactly as specified in Task 4.
- `src/data/ady/phase2.ts` — `phase2: Phase` (n:2, 'Momentum', 'more volume, longer walks, optional light jog'), days 31–60 from Appendix A.2. Rest days: 37, 44, 51, 58.
- `src/data/ady/phase2.test.ts` — validation test exactly as specified in Task 5.
- `src/data/ady/phase3.ts` — `phase3: Phase` (n:3, 'Peak', 'your strongest month — circuits & test days'), days 61–90 from Appendix A.3. Rest days: 67, 74, 81, 88.
- `src/data/ady/phase3.test.ts` — validation test exactly as specified in Task 6.

## Process (TDD)

For each phase: wrote the validation test first, ran `npm test -- phaseN` to confirm it failed (module not found), then wrote the phase content file, then reran to confirm PASS. Final `npm test` run: **6 test files passed (6), 14 tests passed (14)**.

## Verification beyond the required tests

Since this is a precision-transcription task, I wrote two throwaway verification scripts (not committed as deliverables, removed after use) to cross-check every one of the 90 days against Appendix A programmatically:

1. **Verbatim transcription check** — parsed all 90 markdown table rows (title + `·`-split workout segments) directly from the plan doc and diffed them byte-for-byte against the `t(...)` labels and `day(...)` titles extracted from the three `.ts` files. Result: **0 mismatches across all 90 days**.
2. **kind/moveRef rule check** — re-derived the expected `kind`/`moveRef` for every task label by mechanically re-applying the Task 4 keyword table (with the documented priority: rest-day override and "Full core circuit" rounds-line override checked before generic keywords like "plank"/"bicycle"/"walk"), and diffed against what's actually in the phase files, plus confirmed every rest day (7,14,21,28,37,44,51,58,67,74,81,88) has `isRest: true` and exactly one `{kind:'rest'}` task. Result: **0 problems**.

## Ambiguous rows and how I resolved them

- **Rest-day segments that contain "walk"** (days 14, 21, 37, 51, 67, 81 — e.g. "Full rest or gentle walk + stretch"): the keyword table would naively match "walk" → cardio/power-walk, but the plan's explicit rest-day rule ("Rest-day single segment → `('rest')`, and pass `isRest = true`") overrides generic keyword matching for the whole rest-day segment. Resolved by always tagging the single rest-day segment as `('rest')` regardless of embedded keywords, matching the day-7 pattern shown in the Task 4 worked example.
- **"Full core circuit" rounds lines** (days 29, 59, 89 — e.g. "3 rounds: 20 crunch / 15 twist per side / 15 bicycle per side / 30s plank / 12 leg raise / 10 push-up"): this segment contains "bicycle", "plank", and "leg raise" substrings that would otherwise map to specific floor moves, but the plan explicitly calls out "'Full core circuit' rounds line → `('core')` no moveRef (mixed)" as an override. Resolved by tagging only that one segment `('core')` with no `moveRef`, while the day's other segments (e.g. "5 min walk", "20 min brisk walk") still get normal cardio/power-walk tagging.
- **Day-30/60/90 "test day" segments** ("Compare to Day N: longest plank hold & max crunches in 60s..."): these aren't literally prescribing a plank exercise, they're a self-test/comparison note, but the segment text contains "plank" and no other rule intercepts it, so per the mechanical first-match keyword table it was tagged `('floor', 'plank')`. This is a defensible literal application of the stated rules; flagging here in case the intent was `('other')` for these narrative/test segments instead.
- **"Day-30 progress photo 🎉" / "Progress photo 🎉" / "Final progress photo 🎉" segments**: no keyword in the table matches "photo" or emoji text. Resolved by defaulting to `t(label, 'other')` (no moveRef), consistent with `t()`'s own default kind of `'other'` and the general intent that non-exercise administrative segments (photos, notes) are `'other'`.

No day numbering, title, or segment text required judgment calls — all 90 rows transcribed verbatim per the automated diff above.

## Test summary

```
Test Files  6 passed (6)
     Tests  14 passed (14)
```

All changes staged via `git add -A` (commits are disabled on this device per the standing rule).
