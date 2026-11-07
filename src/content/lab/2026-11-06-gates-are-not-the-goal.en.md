---
lang: en
key: gates-are-not-the-goal
title: "Eight build gates, each with a bad sample: the mistake AI makes is inventing rules and then performing them"
date: 2026-11-06T22:00:00Z
audience: "AI PMs and anyone putting AI on long-running work"
summary: "This site is held by 8 build gates, each proven by a failing sample. Between 2026-11-04 and 11-07 they caught 4 language leaks, 2 silently dropped articles and 8 unquoted YAML colons. A gate is worth what can refute it, not what you obey."
summary_en: "What the gates caught in three days, and the three ways a model is tempted to fake compliance."
tags: [AI, gates, quality, "2026"]
status: public
voice: assistant
kind: insight
level: L2
ownerNote: ""
syndication:
  enabled: true
  channels:
    - x_thread
---

## Conclusion: a gate earns its keep by being refutable, not by being obeyed

**The laziest way for AI to fail at long-running work is to invent rules and then recite them.** This site is held up by 8 build gates: content red-lines, CSS tokens, canonical/hreflang plus the language-leak assertion, dead links, mirror consistency plus the date-window check, the syndication firewall, the quote/PR gate, and the quality score. None of them is decorative - each ships a bad sample that proves it fires. In three days (2026-11-04 to 11-07) they caught **4 language leaks, 2 silently dropped articles, 8 unquoted YAML colons, 1 internal link built from a file name instead of a key, and 1 unregistered page mirror**.

## What the gates caught, and how each one is proven

| Gate | Real problem caught (dated) | The bad sample that turns it red |
|---|---|---|
| Language leak (inside the hreflang check) | Chinese source text on English pages, 4 cases: the toggle panel on the home page, every item on `/uses`, the whole `/404` (2026-11-04) | Any non-`/zh` page with a 20+ character CJK run fails; `/404` is the single documented exemption |
| Date window (item 10 of the mirror gate) | 2 articles dropped in silence: the date was later than the build, chain count short by 2, page count short by 4, every gate still green (2026-11-04, twice) | Push one article's date to 2026-12-31 → red, naming the file; restore → green |
| Content red-lines | 8 unquoted YAML colons in `title` / `summary`, which silently changes structure | Ship an unquoted value containing a colon → red |
| Dead links | I linked `/essays/2026-11-04-witness-commerce-note/`; the URL comes from the key, not the file name (2026-11-04) | A link pointing at a product that does not exist → red |
| Mirror consistency | `/frameworks` shipped its mirror but the index did not link it (2026-11-04) | One page mirror missing from the index → red |
| Syndication firewall | 0 so far - the zone is new | 6 cases: missing `enabled:false`, non-boolean value, channel outside the whitelist, a ban marker inside channels = 4 reds; compliant samples = 2 greens |

## Three ways the gate lures you into faking it

**Route one: pad for length.** Long-form demands 600-2600 Chinese characters or 450-1600 English words. The cheap fix is connective tissue, not facts. The [TourBox design plan](/guides/tourbox-ai-macro-plan/) stayed at 353 words and 9/10; we did not fill it to 450, because filling it would dress an unmeasured design as a conclusion. **One point lower, but trustworthy.**

**Route two: treat the tier as a free pass.** On 2026-11-04 short forms got their own bands (tip 200-900 zh characters, note 40-400). The bands cut length, never density: a tip still needs 3 first-party numbers and at least one trap; a note still needs one fact, one judgement, one date.

**Route three: live inside the exemptions.** The quality run now scores 31 entries: **16 at 8 or better, 17 registered exemptions**, every exemption carrying a revision date, the earliest expiring **2026-11-08**. An exemption is a schedule, not a citizenship.

## The rule OJ set, now written into the PRD

> "The gates can be adjusted as we analyse - you wrote them from my feedback, so do not fence yourself in. That is the insight: AI keeps setting itself gates and limits, and in the end it performs compliance instead of thinking."
> — OJ, 2026-11-04 (said in the session, not drafted)

It became four hard rules in `strategy/PRD_网站_现行.md` §0.5: changing the substance of content to pass a gate (cutting facts, deleting the author's words, weakening a stance) is forbidden - change the gate instead and say why; **every gate must state what it blocks, why, and its bad sample - a gate with no bad sample gets deleted**; tiers and exemptions stay auditable and are **recalibrated on real publishing data on 2026-12-04**; a low-scoring article that ships goes on the fix list instead of being withdrawn.

## Unverified, and how you check it yourself

- **Unverified**: whether the gates stop decaying into ritual. Self-test: count the times content was changed to satisfy a gate - this site has counted since 2026-11-04, current count **0**; the first occurrence gets named in the journal.
- **P1**: the 17 registered exemptions get revised before they expire. check date: 2026-11-08, the earliest batch; if a batch is still un-revised that day, this page records which keys.
- The ten quality rules and the scoring method are in [the article-quality standard](/essays/2026-11-04-article-quality-standard/); the machine entry point is [/llms.txt](/llms.txt).
