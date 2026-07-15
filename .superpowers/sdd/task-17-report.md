# Task 17: PWA (installable) + Netlify config + production build — Report

Status: **DONE**

## Source of truth

Read verbatim from `docs/superpowers/plans/2026-07-14-family-workout-tracker.md`:
- "Global Constraints" (lines 11–23)
- "Task 17: PWA (installable) + Netlify config + production build" (lines 2258–2336)

`vite-plugin-pwa` (`^1.3.0`) was already present in `package.json` dependencies.

## What changed

### 1. Icons (`public/icons/*.png`) — generated offline, zero dependencies

Wrote `scripts/gen-icons.mjs`: a self-contained Node script that builds an RGBA
pixel buffer, fills the charcoal background (`#14161b`), draws a bold coral
(`#ff5a36`) dumbbell glyph (two rounded end "plates" + a connecting bar, all
filled rectangles/circles via a tiny scanline rasterizer), and encodes the
result as a real PNG using only Node's built-in `zlib` module:
- `zlib.deflateSync` for the IDAT compressed scanline data (filter-type 0 / None per row).
- `zlib.crc32` (available in Node 20.12+/22.x) for chunk CRCs — verified against the standard "123456789" test vector (`cbf43926`) before use.
- Manual IHDR (8-bit, color type 6 = truecolor+alpha) / IDAT / IEND chunk assembly with the standard 8-byte PNG signature.

Three outputs, generated via `node scripts/gen-icons.mjs`:
- `public/icons/icon-192.png` — 192×192, glyph fraction 0.72 of canvas.
- `public/icons/icon-512.png` — 512×512, glyph fraction 0.72 of canvas.
- `public/icons/maskable-512.png` — 512×512, glyph fraction 0.62 of canvas (comfortably inside the ~80% maskable safe zone, extra margin for corner rounding).

Rendered previews (via Read tool) confirmed the dumbbell reads clearly on the
charcoal background and stays well clear of the edges. No 3rd-party image
tools were needed (sips/ImageMagick were checked; only `sips` exists on this
machine and isn't suited to procedural drawing, so the zlib approach was used
as instructed).

**Verification: `file public/icons/*.png`**
```
public/icons/icon-192.png:     PNG image data, 192 x 192, 8-bit/color RGBA, non-interlaced
public/icons/icon-512.png:     PNG image data, 512 x 512, 8-bit/color RGBA, non-interlaced
public/icons/maskable-512.png: PNG image data, 512 x 512, 8-bit/color RGBA, non-interlaced
```
All three are valid PNGs at the required dimensions.

### 2. `vite.config.ts`

Replaced with the exact block from the plan: added `VitePWA({ registerType:
'autoUpdate', includeAssets: [...], manifest: {...} })` to the `plugins`
array, alongside the existing `react()` plugin. The pre-existing `test`
block (vitest: `globals`, `environment: 'jsdom'`, `setupFiles`, `css: false`)
was kept intact and unmodified, merged into the same `defineConfig` call —
not dropped.

### 3. `index.html`

- `<title>Family Workout</title>` — already present, left as-is.
- Updated `<meta name="viewport">` to `content="width=device-width, initial-scale=1, viewport-fit=cover"` (added `viewport-fit=cover`).
- Added `<meta name="theme-color" content="#14161b" />`.
- Existing favicon link left untouched.

### 4. `netlify.toml` (new)

Created verbatim per the plan:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Verification

### `npm run build`
```
> tsc -b && vite build
...
dist/registerSW.js                0.13 kB
dist/manifest.webmanifest         0.44 kB
dist/index.html                   0.65 kB
dist/assets/index-*.css           7.14 kB
dist/assets/index-*.js          218.99 kB
✓ built in 48ms

PWA v1.3.0
mode      generateSW
precache  8 entries (221.60 KiB)
files generated
  dist/sw.js
  dist/workbox-9c191d2f.js
```
`dist/` contains: `sw.js`, `workbox-9c191d2f.js`, `registerSW.js`,
`manifest.webmanifest`, `index.html`, `assets/`, `icons/` (all three PNGs
copied through), `favicon.svg`, `icons.svg`. Build succeeded with no errors.

`dist/manifest.webmanifest` content confirms name, short_name, description,
theme/background color `#14161b`, `display: standalone`, `start_url: /`, and
all three icon entries (including the `maskable` purpose) resolved correctly.

### `npm test`
```
Test Files  17 passed (17)
     Tests  47 passed (47)
```
All 47 tests still pass — the vitest config block survived the merge intact.

## Git

Commits are disabled on this device per the standing rule. Ran `git add -A`
to stage everything (icons, `scripts/gen-icons.mjs`, `vite.config.ts`,
`index.html`, `netlify.toml`, plus the rest of the working tree from prior
tasks) and left it staged in the working tree for the user to commit later.
No commit was created.

## Concerns

None — build is clean, SW + manifest are emitted, all tests pass, and the
three PNG icons are verified valid at the correct dimensions.
