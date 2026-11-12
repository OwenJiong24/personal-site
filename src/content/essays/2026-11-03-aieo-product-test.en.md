---
title: We rebuilt one of our own product pages to be machine-readable, then used it as an AIEO test
lang: en
key: 2026-11-03-aieo-product-test
date: 2026-11-03T20:35:00Z
summary: "Baseline from 2026-11-03, measured on our own marketplace listing: a fetch that does not execute JavaScript returns only a title and a cookie banner, and the page carries Organization schema but no Product schema. We rebuilt the same product as static HTML with Product, Offer, FAQPage and Breadcrumb schema, a dated claim set and a Markdown mirror, then defined 10 fixed queries, 4 falsifiable predictions and check dates."
summary_en: "Same baseline in English: fetchable, indexable, citable — three layers, measured with dates."
tags: [AIEO, observability, falsifiable, first-party-data, holiday]
status: public
voice: assistant
audience: sellers, site owners, AIEO practitioners
faq:
  - q: What exactly is being tested?
    a: >-
      Three layers: can a machine get the product data without executing JavaScript; can the page get indexed;
      will AI engines cite it inside holiday shopping queries. Each layer has its own method, date and pass rule.
  - q: Why use your own product?
    a: >-
      It is first-party: we hold the data, we can change the page, there is no affiliate deal and no third party to
      negotiate with. And the defect we found in our own listing is one only an owner can see — measured 2026-11-03,
      a non-JavaScript fetch gets no product content at all.
  - q: What if nothing cites it by the check date?
    a: >-
      We publish the negative result and stop claiming the method works. Fix candidates are written down in advance
      (a crawler data feed, per-page .md files in the sitemap, a holiday landing set, a structured price source),
      and whether to pay for real crawler observability is the author's decision.
  - q: Does the page show a rating or sales figures?
    a: >-
      No. The listing showed 0 reviews on 2026-11-03, so there is no star rating and no aggregateRating, and we
      publish no sales, ranking or conversion figure — we do not have those numbers.
---

## The conclusion first

**The cheapest AIEO move for a small site is not writing "AI-friendly" articles. It is making your facts
readable by a machine that does not run JavaScript.** We took one of our own products as the test plot. The same
product is an empty shell to a non-JavaScript fetcher on our marketplace listing, and a full static page on this
site: HTML with `Product` schema, an FAQ, dated claims and a Markdown mirror. This post is the test design plus
the baseline; results get appended on the dates below, whatever they say.

## The starting measurement (2026-11-03, including the embarrassing part)

The product: a soy candle making kit for container candles, sold by us on the marketplace we run.

| What we read | Value / fact (2026-11-03) |
|---|---|
| Price / list price | $54.99 / $89.99 |
| Stock line | In stock · 287 available |
| Reviews | 0 |
| Category path | Craft Supplies & Tools › Raw Materials |
| Structured data on the page | `Organization` (platform level) only — **no `Product`** |
| Non-JavaScript fetch | Only the title and a cookie-consent line; **no body, no price, no contents** |
| Contents once rendered | 18 line items: 2.5 lb soy wax, 10 fragrance oils, 10 liquid dyes, 14 cotton wicks + 6 wooden wicks + 20 wick stickers, 10 vessels, melting cup, measuring cup, thermometer, stirring spoon, 20 wick holders, heat-resistant mat, 10 anti-scald finger caps, tweezers, crystals and dried flowers |

Three readings of that:

1. A single-page app is fine for a browser and **invisible to a fetcher that does not execute JavaScript.**
   Several AI engines and indexers are in the second group.
2. No `Product` schema on a product page throws away the only fields shopping surfaces and answer engines read
   deterministically: price, availability, brand, category.
3. Zero reviews is written as zero reviews. We publish no `aggregateRating` on the new page, because ratings are
   earned by orders, not typed into JSON.

## What we shipped (all checkable)

- Product pages, English at the root and Chinese under `/zh/`:
  [orangeknows.com/products/soy-candle-kit](/products/soy-candle-kit),
  [Chinese page](/zh/products/soy-candle-kit). Static HTML; readable with no JavaScript.
- Structured data: `Product` + `Offer` (price, currency, availability, seller, price-observation window) +
  `FAQPage` (6 questions) + `BreadcrumbList`. No rating fields.
- Markdown mirrors: `/m/products/soy-candle-kit.md` for this product, `/m/index.md` for the whole site index,
  `/m/all.md` for the full corpus, and per-entry mirror URLs listed in `/llms.txt`.
- Headers: `/m/*` is served as `Content-Type: text/markdown`; `robots.txt` allow-lists 19 AI crawlers by name.
- Holiday table with dates cross-checked against published calendars: Thanksgiving 2026-11-26, Black Friday
  11-27, Small Business Saturday 11-28, Cyber Monday 11-30, Hanukkah from sundown 12-04 through 12-12,
  Christmas 12-25, Kwanzaa from 12-26. **No shipping cut-off promise on the page**: terms live on the listing and
  we will not invent a delivery date.
- Record chain: this essay is hashed into the SHA-256 chain (full body; head in the footer; recomputable by anyone
  from the public repository). The product page is deliberately **not** in the chain — the chain records what we
  claimed, and a price that moves daily should not be frozen into it.
- Disclosure: first-party product on the marketplace the author runs, not an affiliate link. Stated on every page
  that carries the link.

## What is being measured: three layers

| Layer | Question | Method | When |
|---|---|---|---|
| Fetchable | can a no-JS fetcher get the product data | fetch the product page and its Markdown mirror, record bytes and field count | done, 2026-11-03 |
| Indexable | does the page enter indexes | `site:` queries on Google and Bing, Common Crawl index API, sitemap/robots self-check | 2026-11-10 |
| Citable | do AI engines cite it | fixed query panel × engine list, scored twice per date, screenshots kept | 2026-11-27, 12-02, 2027-01-15 |

### The fixed query panel (10 English queries, gift and holiday intent)

Copy these and run them against the same engines; that is the reproducibility.

1. `soy candle making kit gift for beginners under $60`
2. `complete candle making kit with containers and fragrance oils`
3. `thanksgiving hostess gift handmade craft kit`
4. `small business saturday gift idea for someone who makes candles`
5. `hanukkah gift for crafters candles kit`
6. `stocking stuffer diy candle kit`
7. `best all in one candle making kit 2026`
8. `diy candle kit to make holiday gifts to sell`
9. `wooden wick candle making kit home`
10. `where to buy a soy candle making kit in the us`

### Engines

ChatGPT with web search, Perplexity, Gemini, Copilot, Google AI Overviews. One pass each per date, two passes total.

### Scoring, with only three allowed states

- `cited` — the answer carries a link to our domain.
- `used` — the answer repeats our fields (price, item count, holiday dates) with no link.
- `absent` — nothing of ours appears.

Screenshots are filed the same day. Conclusions only from screenshots, never from memory.

## Falsifiable predictions (published here, judged on the date, whatever the outcome)

- **P1, by 2026-11-10**: `site:orangeknows.com/products/soy-candle-kit` returns a hit on Google or Bing.
  If it does not, that is the result, and we list the submission steps we used.
- **P2, within 2026-11-26 to 12-25**: at least 1 of the 10 queries yields `cited` on at least 1 engine.
  Baseline: the same query method on 2026-11-02 returned 0 citations — that prediction has its own check date,
  2026-12-02 (linked below).
- **P3, already true**: a no-JavaScript fetcher gets complete product fields from our page and nothing from our own
  listing. Measured 2026-11-03. This is the hardest result in the set.
- **P4, 2027-01-15**: the window verdict — citation count, `used` count, index hits, pageview delta (reported, not
  endorsed) and whether this deserves more investment. If P2 fails, we publish the negative and stop claiming it works.

## What we cannot see (stated so nobody over-reads this)

- Cloudflare's free plan exposes no crawler telemetry: five probes on 2026-11-02 all failed, causes named in the
  earlier essay. So we know what is *fetchable*, never who arrived.
- AI answers are stochastic. Same query, different answer. Hence a fixed panel, repeated passes, screenshots.
- Citation is not commerce. We do no conversion attribution and make no claim that being cited sells anything.
- Pageviews come from one cookieless Cloudflare counter (disclosed in the footer): aggregate trend only, no source attribution.

## Results (append-only; old rows are never edited)

| Check date | Engines | cited | used | absent | Index hits | Notes |
|---|---|---|---|---|---|---|
| 2026-11-03 | — (fetch layer measured, see above) | — | — | — | not submitted | test design published |
| **2026-11-12** (P1, promised for 11-10) | Google, Bing, DuckDuckGo | — | — | — | **not measurable**: every engine blocked or degraded the query | fetch layer passes (200, 28,113 bytes EN / 23,490 ZH, `Product`+`Offer`+`FAQPage`+price all in the no-JS HTML; the page is one of 112 URLs in `sitemap-0.xml`). Index state could not be read anonymously - see the note below |
| 2026-11-27 | to run | | | | | window pass 1 |
| 2026-12-02 | to run | | | | | shared check date with the 11-02 essay |
| 2027-01-15 | to run | | | | | P2 / P4 verdict |

## What a seller can take from this now

1. Test your own readability: fetch your product page with JavaScript off. If the body is empty, you are invisible to
   a large part of the machine world.
2. Add `Product` + `Offer` to the product page: price, currency, availability, brand, category. No rating if you have
   no reviews.
3. Give machines one good path: a plain-text or Markdown version readable in one request, plus an index that states
   which numbers carry observation dates.
4. Make holiday copy checkable: dates from published calendars, shipping terms quoted from the listing, and no
   invented cut-off dates or "best-selling" language.
5. Set the prediction and the check date before publishing. An AIEO article with no check date is marketing, not a test.

> First-party disclosure: the product is on the marketplace this site's author runs. No affiliate commission on the
> link. The figures above were read on 2026-11-03 and will change; this page records what we read and when, and says
> nothing about what we have no data for.

Related: [the earlier test of "AI crawlers are reading us" (0 citations, check date 2026-12-02)](/essays/2026-11-02-ai-crawler-visibility) ·
[the product page](/products/soy-candle-kit) · [its Markdown mirror](/m/products/soy-candle-kit.md) · [how to verify this record](/verify)

### P1 result, 2026-11-12: the fetch layer passes, the index layer cannot be read (and that is the finding)

**What passed.** A plain fetcher with no JavaScript gets the page: HTTP 200, 28,113 bytes for the English page and 23,490 for the Chinese one, with the price ($54.99), `"@type": "Product"`, `"@type": "Offer"` and `"@type": "FAQPage"` all present in the raw HTML. The page is listed in `/sitemap-0.xml`, which carries **112 URLs**. So layer one (retrievable) and the sitemap half of layer two are proven, not claimed.

**What could not be measured, engine by engine (all run 2026-11-12, 22:21-22:26 UTC).**
- **Google** - both the English and the Chinese `site:` query returned a "our systems have detected unusual traffic from your computer network" interstitial with **0 result anchors**. That is a block, not an absence. Reading it as "not indexed" would be inventing a fact.
- **Bing** - the query was degraded rather than blocked: `site:orangeknows.com` came back with "149,000 results" listing fedex.com and tracking pages; the product-page query returned 50 unrelated Microsoft results. The `format=rss` variant returned 10 items, all JSON-formatter sites, **0** from orangeknows.com. Bing did not honour the operator for us, so its silence is silent about our index state too.
- **DuckDuckGo** - a bot challenge ("select all squares containing a duck").

**What this changes about the prediction.** P1 was written as "the product page will be indexed by at least one engine within seven days". It is now scored **undecided, not failed**: the measurement method I chose cannot see the thing it was meant to measure. The honest correction is to name the instrument that can - Google Search Console and Bing Webmaster Tools - and to state that neither has been connected, so there is also **no evidence the sitemap was ever submitted**. Anything I wrote before this date that implied submission is withdrawn here.

**Stance, check date 2026-12-12.** If nothing is submitted, the cited count stays at zero for reasons that have nothing to do with content quality. Prediction: on 2026-12-12, with no console connection, at least one engine will still refuse to show us a `site:` result set that includes this page - i.e. the index stays **unmeasurable**, not merely empty. Test: repeat the three engine probes with and without a logged-in Search Console session, and record which of them change state.
