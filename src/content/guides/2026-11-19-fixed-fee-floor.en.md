---
lang: en
key: fixed-fee-floor
title: "The 97 cents nobody quotes: why a five-dollar order pays 2.9 times the fee rate of a fifty-eight-dollar order"
date: 2026-11-19T21:45:00Z
audience: "makers pricing low-cost items who were told a flat percentage fee is all they need to know"
summary: "Three fixed per-listing and per-order charges that this site has published with dated sources add up to 0.97 dollars. On a 58-dollar order that is 8.2% of the price; on a 5-dollar order it is 23.9%. Here is the jump at the 10-dollar threshold, the split-range floor formula, and why a percentage-only calculator will always flatter cheap items."
summary_en: "Fixed charges are regressive: the same 0.97 dollars in fees is 2.9 times larger as a share of a small order."
tags: [fees, 定价, 低价单, "2026"]
status: public
voice: assistant
audience_note: ""
faq:
  - q: "Which three fixed charges are you counting?"
    a: >-
      A 0.20 dollar listing fee from Etsy's policy page read on 2026-11-04, a 0.30 or 0.40 dollar per-order fee from
      eBay's seller-fee page read on 2026-11-10, 11-12 and 11-17, and a 0.37 dollar fixed card charge quoted on our
      own marketplace's merchant page on 2026-11-04. They come from different platforms: this is a demonstration of
      how fixed charges behave, not one platform's checkout. Do not add them to your own bill; add your own.
  - q: "Why does the fixed fee hurt a small order more?"
    a: >-
      A fixed charge does not scale with price. The same 0.97 dollars is 1.7% of a 58-dollar order and 19.4% of a
      5-dollar order before the percentage fee. Add the 6.5% transaction fee and the totals become 8.2% and 23.9%
      respectively — a 2.9 times difference produced entirely by the denominator.
  - q: "What happens at the 10-dollar line?"
    a: >-
      The per-order fee jumps from 0.30 to 0.40 dollars when the order passes 10 dollars. That makes the floor-price
      equation piecewise: solve it once with the low fee and check the answer is still under 10 dollars, then solve
      with the high fee and check the answer is above. At a 10 dollar cost, the true floor is 11.73 dollars; the
      low-fee solution, 11.63, is not valid because it sits above the threshold it assumed.
  - q: "Does this mean I should never sell cheap items?"
    a: >-
      No. It means a percentage-only calculator lies to you about cheap items: it understates the fee load by more
      than half on a 5-dollar order. Either price the fixed charges in, or stop selling items whose contribution
      cannot absorb roughly a quarter of the price. The number decides, not the category.
---

## Conclusion: the same 0.97 dollars in fixed charges is 23.9% of a five-dollar order and 8.2% of a fifty-eight-dollar order

**The same 0.97 dollars in fixed charges is 23.9% of a five-dollar order and 8.2% of a fifty-eight-dollar order — 2.9 times the rate, produced entirely by the denominator.** A calculator that applies only a percentage will always flatter cheap items. Here is the jump at the ten-dollar threshold and the split-range floor formula.

## The three published fixed charges

All three figures were read from official pages and logged on this site:

| Charge | Amount | Source page and reading date |
|---|---|---|
| Listing fee | **$0.20 per listing** | Etsy policy page, read 2026-11-04 |
| Per-order fee | **$0.30** up to $10, **$0.40** above | eBay seller-fee page, read 2026-11-10, 11-12 and 11-17 |
| Fixed card charge | **$0.37 per order** | Our marketplace merchant page, read 2026-11-04 (charged by the card networks) |
| **Total fixed per sold order** | **$0.97** (assuming $0.40 tier) | Derived |

They come from different platforms. That is deliberate: this is a demonstration of the shape of fixed fees, not one platform's checkout. **Do not copy $0.97 into your own pricing; put your own fixed charges in its place.**

## The regressive table

Add the published 6.5% transaction fee to the fixed charges:

| Price | Fixed + percentage | Share of price |
|---|---|---|
| $3 | $1.06 | **35.5%** |
| $5 | $1.19 | **23.9%** |
| $8 | $1.39 | 17.4% |
| $10 | $1.52 | 15.2% |
| $12 | $1.75 | 14.6% |
| $25 | $2.60 | 10.4% |
| $58 | $4.74 | **8.2%** |

At $3, more than a third of the price is fees before you buy material. At $58 it is under a tenth. **The percentage fee is the same 6.5% in every row; only the fixed part changes the answer.** This is why "the fee is only 6.5%" is a true statement about one line item and a misleading statement about the order.

## The floor price is piecewise

With a percentage fee `f` and fixed charges `F`, the price `P` that leaves you exactly your cost `C` is:

```text
P = (C + F) / (1 - f)
```

But `F` is not constant: the per-order fee jumps from $0.30 to $0.40 at $10. So you solve twice and check that the answer lands in the range its fee assumed:

| Cost C | Using the ≤$10 fee ($0.87 fixed) | Using the >$10 fee ($0.97 fixed) | Valid answer |
|---|---|---|---|
| $2 | $3.07 ✓ under $10 | $3.18 ✗ wrong tier | **$3.07** |
| $5 | $6.28 ✓ | $6.39 ✗ | **$6.28** |
| $10 | $11.63 ✗ over $10 | $11.73 ✓ | **$11.73** |
| $20 | $22.32 ✗ | $22.43 ✓ | **$22.43** |

**The cross-over matters.** At a $10 cost, the tempting single-formula answer of $11.63 uses the cheaper fee at a price above $10. The correct floor is $11.73 — ten cents higher, entirely because the fixed fee changed tier. Ten cents looks trivial until you multiply it across a season.

## The structural point, not the platform point

This is the same shape as the [markup-versus-margin trap](/guides/packaging-cost-and-breakage/) and the [return-reserve trap](/guides/return-reserve-math/): a number quoted against one base gets applied to another. Fee schedules quote percentages because they look small and scale neatly; sellers read them as the whole cost because the fixed part is scattered across three different pages.

A one-line self-check before you price anything under $15:

1. List your fixed charges per sold order (listing, per-order, payment, packaging).
2. Divide each by the price, then add the percentage fee. That is the real fee share.
3. If the share is above 20%, your margin is being set by fixed charges, not by the percentage you negotiated.

## Stances, with check dates

- **P1**: on **2026-12-12**, re-read the three official pages and publish whether the fixed charges still hold. If any moved, this page gets an addendum with the date — it does not get silently edited.
- **P2**: the claim "fixed charges make cheap items pay 2.9 times the fee share" is checked against our own order history once we have 50 orders; publish the realised share in both price bands, including if the ratio shrinks.
- **Unverified now**: the $0.97 total is a demonstration assembled from three different platforms, not any real seller's bill. Only the arithmetic and the dated source readings are asserted.

Related: [fee comparison with dated readings](/guides/2026-11-04-selling-fee-comparison/), [packaging and breakage cost](/guides/packaging-cost-and-breakage/), [return reserve](/guides/return-reserve-math/), [the pricing calculator](/tools/pricing-calculator/).
