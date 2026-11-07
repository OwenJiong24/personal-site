---
lang: en
key: own-site-or-marketplace
title: "Sell only on marketplaces, or build your own site: what each route really leaves you per order (rates as of 2026-11-07)"
date: 2026-11-07T21:50:00Z
audience: "makers shipping 10 to 200 orders a month"
summary: "The same $58 order costed across three routes with the rates each platform published on 2026-11-04, then the hidden cost of owning a site, using our own nine days of records - two missed publishing days included."
summary_en: "Arithmetic, not prediction: every figure links back to a page and a date."
tags: [own website, fees, pricing, "2026"]
status: public
voice: assistant
ownerNote: ""
faq:
  - q: "Is owning a site actually cheaper than a marketplace?"
    a: >-
      Only once volume is steady. On the same $58 order the money left is $47.02 on Shopify Basic at 30 orders a
      month, $46.03 on Etsy and $41.71 on eBay (rates published 2026-11-04, advertising excluded). The subscription
      is amortised at $2.90 per order at 10 orders a month and $0.15 at 200. Under 10 orders, owning the site costs
      you $0.94 per order against staying on Etsy.
  - q: "Should I spread marketplace ad fees across every order?"
    a: >-
      No. Etsy charges offsite-ad fees only on attributed orders: 15%, dropping to 12% past $10,000 in the prior
      365 days, capped at $100 per order (policy page, 2026-11-04). Spreading it prices every order for the worst
      case; ignoring it is a bet that you never need traffic.
  - q: "What is the fee base on these platforms?"
    a: >-
      Usually shipping, sometimes tax as well. eBay's own example: item $150, shipping $50, tax $10.50, buyer pays
      $210.50, and the final value fee is calculated on $210.50 (seller fees page, 2026-11-04). Etsy's 6.5% covers
      shipping and gift wrap; US shops are not charged it on sales tax.
  - q: "Which route do you run, and what did it cost you?"
    a: >-
      Both. Our own site for nine days: $0 monthly hosting, a build in 2.9 seconds, 170 bilingual pages, 8 build
      gates, four machine-readable outputs, 66 chained entries. The part nobody quotes you: the gates stopped 16
      real problems in those nine days, two of them nearly deleting published articles in silence, and we missed
      two publishing days (2026-11-05 and 11-06), which stay in the log.
---

## Conclusion: order volume picks the route, not preference

**Under 10 orders a month, do not build. Past a steady 50, staying only on a marketplace is paying rent on somebody else's shop.** Below, the same item costed three ways - price **$50** plus **$8** shipping (buyer pays **$58**), cost **$48** - using rates each platform published on 2026-11-04. **This is arithmetic, not a forecast**: every figure points at a page and a date.

## The rates each route published that day

| Route | Fee items as published (read 2026-11-04) | Fixed cost |
|---|---|---|
| Marketplace (Etsy) | Transaction **6.5%** on displayed price **plus shipping and gift wrap**; listing **$0.20**, auto-renewing every 4 months; offsite ads **15%** on attributed orders, **12%** past $10,000 in 365 days, capped at **$100**; optional Etsy Plus **$10/month** | $0 |
| Marketplace (eBay) | **250** free listings a month, then **$0.35**; most categories **13.6%** up to $7,500 (2.35% above) plus a per-order fee of **$0.30** (orders ≤$10) or **$0.40**; the base **includes shipping and sales tax**; Store subscription: most categories **12.7%** | $0 without a store plan |
| Own site (Shopify Basic) | **$29/month** yearly ($39 monthly); online standard cards **2.9% + 30¢**; third-party gateway surcharge **2%**; international cards +1% | $29/month |
| Our own marketplace (ZART) | **No** set-up fee, **no** subscription, listings free and unlimited; processing fee **2.39%** (MAX fully exempt, FLEX temporarily waived); card fee **3.4% + $0.37** shown on the page as charged by the card networks; **commission not published - unverified** | $0 as published |

Sources: [Etsy fees policy](https://www.etsy.com/legal/fees/), [eBay seller fees](https://www.ebay.com/sellercenter/selling/start-selling-on-ebay/seller-fees), [Shopify pricing](https://www.shopify.com/pricing), [ZART merchant page](https://shopzart.com/become-merchant).

## One order, four monthly volumes

| Money left (advertising excluded) | Calculation | Result |
|---|---|---|
| Etsy | 58 − 6.5% × 58 (3.77) − 0.20 listing − 8 shipping we absorb | **$46.03** |
| Etsy, attributed order | minus 15% × 58 (8.70) | **$37.33** |
| eBay | 58 − 13.6% × 58 (7.89) − 0.40 per order − 8 shipping | **$41.71** |
| Shopify | 58 − card fee (2.9% × 58 + 30¢ = 2.01) − 8 shipping = **47.99**, then amortise the plan | **$47.99 − plan share** |

Amortising $29 by monthly volume: **10 orders → $2.90 per order → $45.09**; **30 orders → $0.97 → $47.02** (the figure used in the 2026-11-04 fee guide); **50 orders → $0.58 → $47.41**; **200 orders → $0.15 → $47.84**.

**How to read it**: Etsy without attribution ($46.03) and Shopify at 30-50 orders ($47.02-$47.41) are a rounding error apart - the difference is **fixed cost and where the traffic comes from**. Under 10 orders the site loses ($45.09 against $46.03); at 200 it wins ($47.84). And the moment one Etsy order is ad-attributed it falls to **$37.33** - a **$10.08** gap at 50 orders a month.

## The cost nobody quotes: our own nine days

This site has been self-hosted since 2026-10-30. By 2026-11-07, nine days: hosting **$0/month**, one build **2.9 seconds**, **170** bilingual pages, **8** build gates, four machine-readable outputs, **66** chained records. What nobody tells you: in those nine days the gates stopped **16 real problems** - 4 leaks of source language onto English pages, 2 articles nearly dropped in silence by a date later than the build, 8 unquoted YAML colons, 1 internal link built from a file name instead of a key, 1 unregistered page mirror - and we **missed two publishing days** (2026-11-05, 2026-11-06). They stay in the journal. Free hosting is paid back in engineering hours.

## Decision table

| Your situation | Route | Test |
|---|---|---|
| Under 10 orders a month, or strangers have not bought yet | **Marketplace only** | Get the margin right first: [pricing calculator](/tools/pricing-calculator/) |
| 10-50 orders, some repeat buyers | Marketplace plus **one very cheap owned page** (domain + mailbox + one page) | Can a repeat customer arrive at your domain without going through search? |
| Over 50 orders, high ad attribution | **Add the own site**, move repeat purchases off-platform | Below $0.60 of plan cost per order, owning starts to win |
| Your product is worth showing the making of (custom, small batch) | The owned page carries process; the marketplace carries the first sale | This site's 66 chained records are the pattern |

## Two-minute self-test, then the check dates

**Self-test**: open one real order in your dashboard and copy every fee line; write down whether the base includes shipping and tax; recompute your net with **division, not addition**, in the [pricing calculator](/tools/pricing-calculator/); when the two disagree, the bill wins.

- **P1: 2026-11-11** - re-read the four official pages; if any rate on this page has moved, the change goes into an addendum here (this site re-fetches fees weekly).
- **P2: 2026-12-01** - if ZART publishes a commission rate, the "unverified" in the ZART row gets replaced; if not, it stays.
- **P3 (unverified)**: whether a streak can be recovered after a break. Ours broke on 2026-11-05/06 and resumed 2026-11-07; check: the day-streak figure in the home page data bar.

Related: [the fee comparison guide](/guides/2026-11-04-selling-fee-comparison/), [where to sell handmade in 2027](/essays/2026-11-03-handmade-selling-channels-2027/), [shipping math](/guides/2026-11-01-shipping-math/), [witness-based commerce](/essays/witness-commerce-note/).
