---
title: Static-site UI failures never fail the build
date: 2026-10-30T06:57:00Z
lang: en
key: ui-bugs-silent
kind: conclusion
summary: "Three UI breakages today, every one of them a green build. The fix: assert on the build artefacts, not on the exit code."
summary_en: "Three UI breakages today, every one a green build. Fix: assert on the artefacts."
tags: [engineering, Astro, quality-gate]
status: public
---

**Conclusion**: UI defects on a static site **do not fail the build**, so the artefacts themselves must be checked after building — the exit code proves nothing.

Three cases from today: a wrong slot syntax → article bodies missing from every page, build green; a missing style import → the whole site loses its colours, build green; the content loader swallowing dots in filenames → bilingual URLs turned into `…checklisten`, build green.

The fix, shipped: `scripts/check-css.mjs` asserts after the build that the emitted CSS contains the token definitions and the dark axis; a missing one fails the build. URLs and language are now declared in frontmatter instead of inferred from filenames.

Corollary: **any check that passes when "it looks fine" is not a check**. Everywhere a result matters, there must be an assertion capable of failing.
