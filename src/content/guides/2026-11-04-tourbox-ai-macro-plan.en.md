---
lang: en
key: tourbox-ai-macro-plan
title: "TourBox as a one-handed AI macro board: a design and a self-test, not a review"
date: 2026-11-04T22:25:00Z
audience: "people who code, edit and write with AI all day"
summary: "Can a photo controller become the physical shortcut board for AI work? This page gives the 4 key bindings, a self-test that decides whether it saves time, and the three things we have not done: no preset file, no affiliate link, no measurements."
summary_en: "A design plus the test that settles it. No download, no buy link, no numbers yet - and all three admitted."
tags: [hardware, workflow, AI, "2026"]
status: public
voice: assistant
ownerNote: ""
faq:
  - q: "Are these bindings in use today?"
    a: >-
      No. The page is a design, status: not measured. We run the self-test for 30 days and append
      the readings. If it saves nothing, that is the published conclusion.
  - q: "Why is there no download link?"
    a: >-
      A .tourbox preset has to be exported from a machine that really runs it. An assistant inventing a
      file and calling it ready is exactly the fake we refuse. It ships when the file exists.
  - q: "Why is there no buy link?"
    a: >-
      The site's public promise is affiliate-only, and the affiliate account plus the /go redirect layer
      are not open yet (PRD P1). A link today would be undisclosed promotion, so there is none.
  - q: "What is a TourBox?"
    a: >-
      A one-handed controller for photo and video work: four physical components - big knob, wheel,
      side key, tall key - each mappable. Its documented purpose is creative-software shortcuts,
      not AI tooling.
---

## Conclusion: this is an experiment design, not a verdict

**Selling a photo peripheral as an AI miracle is the kind of content we argue against.** This page does three things: state the bindings, give a checkable self-test, and list what we have not done. The intent comes from OJ himself:

> "My TourBox is basically a shaped keyboard - you can map a lot of shortcuts to it, convenient for working in the AI era."
> — OJ, 2026-11-04 (said in the session, not drafted)

## The bindings (status: not measured)

| Component | Designed binding | Why this one | How we verify |
|---|---|---|---|
| Big knob (turn) | Step through AI code diffs block by block / trim context length | Reviewing machine-written changes is the highest-frequency motion; scroll distance sets review speed | Count knob jumps vs mouse-wheel scrolls across 20 tasks |
| Wheel (up/down) | Switch prompt templates: red-team, bilingual polish, minimal refactor | Template switching is pure keyboard work; a physical wheel removes one window switch | Time the switch, keyboard vs peripheral, with a stopwatch |
| Side key (hold) | Start/stop voice input, transcribed text lands at the cursor | Speaking beats typing if the path is one step | Same 200-word content: compare voice path vs typing path completion time |
| Tall key (click) | Strip the selection into structured input: drop format noise, wrap in tags | Cleaning pasted text is the most repetitive part of prompting | Count manual edits saved per clean-up |

Deliberately absent: a "run the whole multi-agent pipeline" button. The rule from our [beginner tip](/lab/) applies here too - **write what done looks like before you automate it**.

## The self-test (anyone can run it; 30 days to a verdict)

1. Pick 3 AI tasks you do every day (review a diff, rewrite copy, clean context).
2. Baseline 5 days: no peripheral, stopwatch on time and switch count.
3. Test 5 days: the bindings above, same measurements.
4. Use it for the remaining 20 days; log every binding you change and why.
5. Verdict rule: **at least one of time or switch count down ≥15%**, and stable on at least 2 of the 3 tasks. Below that, the honest answer is "not worth it".

We do not have these readings today, so this page publishes no verdict and no "double your speed".

## Three things we have not done (as of 2026-11-04)

- **No preset file.** A `.tourbox` preset must be exported from a real working machine. When it exists it goes to `/downloads/` and this page gets an addendum.
- **No buy link.** Affiliate-only is the site's public promise; the account and the `/go` redirect layer are not open (PRD P1). A link now would be undisclosed promotion.
- **No measurement.** The hardware is in use; the 5+5 day comparison has not been run. Things not run get no results.

## Check dates

- **P1: 2026-12-04** - publish the 30-day readings: time and switch count per task, plus the binding-change log. Ugly numbers get published as they are.
- **P2:** this page shows no download button until the file exists. Check: the button list on this page.
- **P3:** any affiliate link must arrive with the disclosure block. Check: disclosure present at the top. Link without disclosure is a violation - we pull it.

Related: [the AI Lab](/lab/), [uses (what I run)](/uses/), [pricing calculator](/tools/pricing-calculator/) - same rule, formula printed on the page.
