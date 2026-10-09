# Stage 2 — changes from original Claude Stage 1

## Website design
- Reworked the homepage with a cinematic photographic hero, editorial layout, featured images, films teaser, package presentation and booking links.
- Extracted six standalone photographs from the owner-supplied wedding brochure pages 2, 3, 4 and 6, plus a hero copy; added descriptive gallery metadata and a social sharing preview.
- Added owner-replaceable homepage asset `src/assets/site/hero.webp`.
- Added optional founder and team portraits resolved from `src/assets/team/`.
- Updated global styling and print styles.

## Calculator
- Replaced the single-function-only calculator with separate selectable events (up to six), independent package/add-ons per event and one combined estimated quotation.
- Kept bespoke base coverage explicitly unpriced, rather than making up a base price.
- Added separate function tabs, removal, event details, quantity controls, consent check, WhatsApp sharing, Netlify quotation form and A4 print styling.
- Added `estimateMultiple` pure pricing function and three new automated tests; all eleven tests pass.
- Preserved the PDF's exact package and add-on prices.

## Operations
- Set requested 100% booking payment as **unapproved draft**; source PDF says 50%. Owner must confirm before launch.
- Kept disputed delivery policies flagged for approval.
- Added Google indexing safeguard: `site.launchApproved` defaults to `false` until owner approvals and deployment tests finish.
- Updated Node version to 22 for repeatable built-in TypeScript test runner.
- Added `README.md`, `START_HERE_ROMAN_URDU.md`, photo-editing guide, revised approvals checklist.

## Tests and limitations
- Passed 11 Node.js unit tests for price calculations.
- Passed global TypeScript parser checks of TS/TSX sources.
- Static Netlify Forms markup detected in source.
- Could not install Astro dependencies or run the actual `npm run build` because the npm registry was not reachable from this sandbox. The ZIP includes the unverified Astro source and must pass `npm install && npm run build` in a connected environment before live launch.
- The ZIP intentionally contains no fabricated package-lock.json. Generate the real lockfile by running `npm install` in a network-enabled environment.
