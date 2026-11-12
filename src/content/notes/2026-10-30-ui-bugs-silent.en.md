---
title: "Static-site UI failures never fail the build (measured, 2026-11-12)"
date: 2026-10-30T06:57:00Z
lang: en
key: ui-bugs-silent
kind: conclusion
summary: "Three UI breakages on 2026-10-30, every one of them a green build. The fix, with the numbers it now guards: 179 pages, one 30,663-byte CSS file, 57 token definitions, three artefact assertions."
summary_en: "Three UI breakages on 2026-10-30, every one a green build. Now guarded by three assertions on a 179-page, 30,663-byte CSS output."
tags: [engineering, Astro, quality-gate]
status: public
voice: assistant
---

**Conclusion**: a static build reports success for any page it managed to emit, so UI defects must be **measured on the artefacts** — on 2026-10-30 three separate breakages all shipped green, and none of them changed the exit code.

The three, dated 2026-10-30: a wrong slot syntax dropped article bodies from every page (build green); a missing style import removed the site's colours (build green); the content loader swallowed dots in filenames so bilingual URLs collapsed to `…checklisten` (build green).

What now guards them, measured on the 2026-11-12 build: **179 HTML pages**, **one CSS file of 30,663 bytes**, **57 token definitions** present in the emitted CSS, and `scripts/check-css.mjs` making **3 assertions** (the `--bg` token exists, the dark-axis block exists, both survive minification). A missing token or a lost dark axis now fails the build. The second fix was structural: language and URL moved into frontmatter, so no filename rule can silently rename a page.

**Stance, check date 2026-12-12**: the nine-gate chain now catches every *artefact-level* defect on the first build, but it still cannot see a rendering defect that only appears in a browser — layout overflow, a token applied to the wrong element, a broken focus ring. Test method on that date: pick three pages, break one visual rule in each, and count how many the gates catch. My prediction, written down so it can be scored: **0 of 3**.
