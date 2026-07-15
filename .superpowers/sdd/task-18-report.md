# Task 18 — Visual polish, accessibility & responsive pass

**Status:** DONE
**Tests:** `Test Files 17 passed (17)` / `Tests 47 passed (47)`
**Build:** clean (`tsc -b && vite build` OK; CSS bundle 15.20 kB / 3.82 kB gzip)
**Content retag:** applied (days 30/60/90 "Compare to…" notes → kind `other`, no moveRef)

Art direction kept as locked: BOLD & ENERGETIC premium fitness look on deep charcoal
`#14161b` + coral `#ff5a36`, success green `#34d399`. Polish was CSS-first; TSX touches were
limited to class names, additive wrappers, the calendar legend, and the content retag. No
component logic, props, roles, aria-labels, visible text, or testids were changed.

## Global (`theme.css`)
- Added depth tokens: coral/green gradients, elevation shadows, accent/green glows, extra
  surface shades, `--ink`/`--ink-green` on-color text tokens, `.num` tabular-numeral helper.
- **Coral radial background glow** via `body::before` (fixed, layered coral + amber + faint
  blue radials at low opacity) so the dark UI reads as lit, not flat. No scroll impact.
- **Visible focus:** `:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px }`
  reads clearly on the dark bg; mouse clicks suppressed via `:focus:not(:focus-visible)`.
- Kept the global `prefers-reduced-motion` kill-switch intact.

## Who's-working-out picker (`PersonPicker`)
- Before: flat surface cards, plain coral avatars.
- After: left-aligned oversized display title, added subtitle "Pick your name to see today's
  plan.", gradient-surface cards with elevation + hover lift/glow, gradient coral avatars with
  glow, and a `›` chevron affordance that slides on hover. Avatars/chevrons `aria-hidden` so
  each button's accessible name stays the person's name (tests still match `/ady/i` etc.).

## Today hero (`TodayView` + `DayView` head)
- Before: small eyebrow, medium title, 72px ring.
- After: date shown as a coral uppercase kicker; "Day N · Phase" rendered as a coral-tinted
  **pill** (text node kept as one element so the `/day 1 · foundation/i` assertion still
  matches); large `-0.03em` display title; **big 104px progress ring** with a coral glow that
  turns green + green glow at 100%, larger tabular `done/total` label.

## Task rows (`TaskRow`)
- Before: plain checkbox rows.
- After: **kind-colored left stripe** (core coral / floor blue / cardio amber / rest·other
  grey) via inset box-shadow so category reads at a glance while the text tag still carries the
  label (color never the only signal); gradient surface; larger 30px rounded check; on done →
  green-gradient fill + a `checkpop` scale "pop" on `.task.is-done .task__check`, row tint,
  and struck label. Info "?" button is a 46×48 target with a coral hover.

## Day-complete celebration (`DayView`)
- Green-gradient banner with green glow and a `celebrate` scale/rise pop (respecting reduced
  motion). Text + `data-testid="day-complete"` unchanged.

## 90-day calendar (`CalendarView` / `DayCell`)
- **Summary card** now has an animated coral progress bar under the day/percent line.
- **New legend** (`aria-label="Calendar key"`): Done ✓ / Today ring / Upcoming / Missed /
  Rest · — each swatch pairs color with a shape/symbol.
- **Phase sections** get a coral numbered chip (1/2/3 — a real sequence) beside name+subtitle.
- **Status cells:** done = green gradient + small ✓ badge; today = coral inset ring + glow
  (shape cue); missed = dimmed + strikethrough; rest = coral `·`. Grid stays 7-wide.

## Header, StartDatePicker, ExerciseInfo
- Header: sticky blur, wrap-safe, active nav = coral gradient pill; nav + switch buttons
  bumped to 44px tap targets.
- StartDatePicker: centered layout, gradient CTA, `color-scheme: dark` date input.
- ExerciseInfo: bottom-sheet with grab handle, backdrop blur, rise/fade animations, gradient CTA.
- "← Back to calendar" downgraded to a quiet ghost button so it doesn't read as a primary CTA.

## Accessibility & responsive verification (headless Chrome via CDP)
- No horizontal scroll at 320 / 390 / 1024 px (`scrollWidth === innerWidth` at each).
- Calendar grid stays 7 columns at every width; cells 40px @320, 45px @390, 81px @1024.
- Header nav buttons measured at 44px height. Task/info/CTA controls ≥44–48px.
- Color is never the only signal: done ✓ (task check + calendar badge), green ring at 100%,
  today = ring shape, missed = strikethrough, rest = ·, plus the legend.
- Existing tests assert the roles/labels/text/testids and all 47 still pass.

## Screenshots
Captured at 430px mobile (see `task-18-shots/`):
- `01-picker.png` — Who's working out picker
- `02-today.png` — Today hero (Day 1, 2/5 ring, kind stripes, green checks)
- `03-calendar.png` — 90-day calendar (progress bar, legend, phase chips, status cells)

## Notes / concerns
- At 320px the 7-wide calendar cells are 40px (just under the 44px ideal) — an inherent
  tradeoff of keeping the grid 7-wide on the narrowest phones; at the common 390px width they
  are 45px. Everything else meets 44px.
- Project is staged with `git add -A` (commits disabled per environment rule).
