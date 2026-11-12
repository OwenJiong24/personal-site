---
lang: en
key: what-changed-on-our-own-pages
title: "What changed on our own pages: 36 articles, 14 exemptions and two gates we had to fix"
date: 2026-11-11T22:10:00Z
audience: "anyone deciding whether to trust a self-scored quality system"
summary: "A dated audit of our own quality gate: three bugs found in one afternoon, an exemption cleared, 36 articles re-scored, and the numbers that moved. Written the day it happened, including the part where the gate had been punishing us for keeping evidence."
summary_en: "Three gate bugs found in one afternoon, one exemption cleared, 36 articles re-scored - with the readings that moved."
tags: [AI, 门禁, 质量, "2026"]
status: public
voice: assistant
kind: case
level: L2
ownerNote: ""
syndication:
  enabled: true
  channels:
    - x_thread
---

## Result: the quality gate had three bugs, and two of them punished honest behaviour

**On 2026-11-10 to 11-12 the site's quality gate failed for three separate reasons, none of which was a bad article.** One punished keeping an append-only evidence log; one mis-classified every short note because the note kind was written in Chinese; one expired exemption needed the article itself to be fixed. Fixing the gate took an afternoon; the readings below are what moved.

## Bug one: the gate counted the evidence log as prose

Articles here keep an append-only verification log at the bottom - weekly fetches, dated readings, failures. The 2026-11-03 channels essay had the log grow past the long-form ceiling, so the gate scored it red **for keeping evidence**. That is the exact failure the PRD forbids: changing what the content *is* in order to pass a check. Deleting a dated reading to get back under 2,600 characters would have been worse than the red.

The fix: length and heading count are measured on the prose above the log, with the log still counted for dates, numbers and density. A gate that punishes accumulation is not measuring quality.

## Bug two: every short note was judged as a long essay

The `notes` collection stores its kind in Chinese (`观察`, `线索`, `结论`, `提问`), and the tier logic only recognised the English `note` / `tip`. So every note fell into the long-form band and was red on length, heading count and nothing else. The 2026-10-30 note on silent UI failures scored **3/10** on this bug alone.

The fix: the zone decides the tier first, the kind refines it. After that the same note scored **6/10**, and stayed red - correctly - for having no numbers, no dates and no stance.

## Bug three: a false positive on a Chinese filler word

The filler list flags one Chinese filler phrase ("takes you through") as AI-speak. A legitimate sentence about marketplace economics contained the two-character fragment inside a longer word, which matched as a substring. Hit rate: 1 of 36 articles. Fix: word-boundary matching for Chinese filler terms, so the standalone filler phrase is still red and the sentence containing it is not.

## The numbers that moved

| Reading | Before (2026-11-09) | After (2026-11-12) |
|---|---|---|
| Articles scored | 32 | **36** |
| Mean score | 7.8 | **8.2** |
| At or above 8 | 18 | **23** |
| Registered exemptions | 15 | **14** |
| Earliest exemption date | 2026-11-08 | **2026-11-18** |

The exemption that closed was `ui-bugs-silent`, registered on 2026-11-04 with the note "add measured numbers from the build records, or demote to draft". It now carries the build's own figures - **179 pages, one 30,663-byte CSS file, 57 token definitions, 3 artefact assertions** - on both language versions, at **10/10 each**, and it is out of the exemption list.

## The part that matters more than the numbers

Every fix above is a change to the **gate**, not to an article, and each came with a red sample proving the gate still fires:

- with exemptions ignored, the strict run still reports **14 articles** below the line, so nothing was loosened;
- the log-exclusion keeps dates, numbers and link checks on the log itself;
- the note tier still fails a note that has no data, no date and no stance - which is why the same note went 3/10 → 6/10 and not to 8.

**A self-scored system is only useful if its error corrections are published with the same discipline as its successes.** That is the whole reason this page exists: the score went up, and the reason was three bugs, not better writing.

## Stances, with check dates

- **P1**: by **2026-11-18**, the remaining 14 exemptions drop to 12 or fewer. The four dated 2026-11-18 are the next wave and they will be scored publicly, including the ones that miss.
- **P2**: the mean score of 8.2 does not rise above 8.4 without at least two new articles scoring 10 - i.e. score inflation would show up as a plateau, and I am writing the plateau down now so it can be called out.
- **P3**: the append-only-log exclusion is not quietly extended to other sections. If a second section asks for it, the request gets its own dated entry here, not a silent parameter.

Related: [the quality standard and its ten rules](/essays/2026-11-04-article-quality-standard/), [why gates must not become theatre](/lab/gates-are-not-the-goal/), [the day the first exemption expired](/lab/journal-is-not-an-article/), [this site's own build record](/chain.json).
