---
lang: en
key: citation-panel-baseline
title: "Zero citations in forty prompts, and why that is a baseline rather than a verdict"
date: 2026-11-17T21:50:00Z
audience: "anyone reading an AI-visibility claim and wondering what was actually measured"
summary: "We ran 40 fixed prompts (20 English, 20 Chinese) on two anonymous engines. The visible result was 40 absents, zero citations — but the tool cannot see rendered results or Search Console, so the honest reading is 'we could not see ourselves', not 'we are not there'. Here is the panel, the distinction, and the check dates."
summary_en: "40 prompts, two engines, zero visible citations — and the methodological reason this is a baseline rather than a verdict."
tags: [AIEO, 引用面板, 门禁, "2026"]
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

## Conclusion: forty prompts returned zero sightings of our site, and the honest word for that is *unmeasurable*, not absent

**Forty fixed prompts returned zero sightings of our site — but with a plain fetcher and no Search Console, the honest word is "unmeasurable", not absent.** We ran 20 English and 20 Chinese prompts on two engines on 2026-11-17: cited 0 / used 0 / absent 40. Here is why that count cannot be read as a verdict.

## What the panel actually was

A fixed question set was defined in the where-to-sell essay with three allowed states:

- **cited** — our domain appears in the returned HTML;
- **used** — our words appear without a link;
- **absent** — neither is visible.

The 20 English prompts include "where to sell handmade 2027", "best etsy alternatives 2027", "how to start a small handmade business", "etsy fee calculation break even price" and "ko-fi vs big cartel for makers"; the 20 Chinese prompts include 「手工活去哪里卖 2027」「Etsy 平替」「抽成是除法怎么算」and「自己建店还是上平台」. Two anonymous engines (Google and Bing HTML endpoints), no login, no browser.

| State | Count | What it would mean |
|---|---|---|
| cited | **0** | Our URL was visible in the returned HTML |
| used | **0** | Our text appeared without a link |
| absent | **40** | Neither was visible to this method |

## Why "absent" is the wrong word to stop at

The same tool cannot find our own page in a `site:orangeknows.com` query. That is the tell. A method that cannot see our own page when we ask for it by name has no standing to say we are absent when we ask a generic question.

Two separate limits are at work:

1. **Rendering.** A plain fetcher gets the search shell. Earlier browser tests showed anti-bot interstitials on Google and degraded `site:` results on Bing; neither outcome is a reliable index reading.
2. **Submission.** No Search Console or Webmaster Tools is connected, so there is no evidence the sitemap was ever submitted. A page that has never been submitted can still be discovered, but we cannot claim it has.

Both limits were written into the article in earlier rounds; this panel is the first time we ran the full question set and published the count. **The count is 40 absents and it stays 40 — we are not renaming it "inconclusive" to make it nicer. We are saying what it can and cannot mean.**

## What would upgrade this from a baseline to a measurement

| Instrument | What it would settle | Status now |
|---|---|---|
| Search Console / Bing Webmaster Tools | Whether the pages are indexed at all | **Not connected** (we have said so explicitly) |
| Logged-in browser panel with rendered results | Whether our URLs appear for the fixed prompts | Not run; earlier anonymous browser probes were blocked or degraded |
| A second round on the same fixed prompts | Whether the count moves when pages age | **Scheduled on the article's existing check dates** |

The honest test is the second round: same 40 prompts, same engines, same method. If the count stays 40 while Search Console still reports zero indexed pages, that is a real finding about discoverability. If the count stays 40 while Search Console reports pages indexed, the finding is about our method being blind — and that is worth publishing too.

## Stances, with check dates

- **P1**: on the article's published check date, the same 40 prompts will be re-run and the counts published unchanged, including if they stay 0/0/40.
- **P2**: by **2026-12-02**, either Search Console is connected and we publish the indexed-page count, or this page records plainly that it still is not. We do not call a page "indexed" without it.
- **Unverified now**: every AI engine's citation behaviour. We measured two search engines' anonymous HTML, not chatbot answers, and we will not describe it as AI citation data.

Related: [the where-to-sell essay and its verification log](/essays/2026-11-03-handmade-selling-channels-2027/), [the AIEO product test](/essays/2026-11-03-aieo-product-test/), [why gates must not become theatre](/lab/gates-are-not-the-goal/).
