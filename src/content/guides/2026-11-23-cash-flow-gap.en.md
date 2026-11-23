---
lang: en
key: cash-flow-gap
title: "A profitable batch can still bankrupt you: the 629 dollars you must spend before the first dollar arrives"
date: 2026-11-23T21:45:00Z
audience: "makers who price a batch correctly but have never checked whether they can afford to start it"
summary: "Profit and cash are different timelines. Using figures already published on this site, a 20-piece batch costs 629.40 dollars to start and returns 1,028.50 after selling — but only after a 7-to-14 day settlement lag. Sell half and the 514.25 dollars back does not cover the 629.40 spent. Here is the gap, the three时钟 that set its length, and the one number to write down before your next batch."
summary_en: "A batch can be profitable on paper and still be unaffordable in cash."
tags: [现金流, 库存, 定价, "2026"]
status: public
voice: assistant
ownerNote: ""
faq:
  - q: "What is the cash-flow gap here?"
    a: >-
      The money you must pay out before the money comes back. Materials, your labour priced at your own rate and
      per-order fees are spent when the batch is made; the platform pays you only after the item sells and settles.
      The gap is the span between those two moments, multiplied by the batch size.
  - q: "Where do the numbers come from?"
    a: >-
      Material 18 dollars and half an hour of labour at 25 dollars an hour are the figures in this site's pricing
      calculator example; the 6.5% fee and 0.37 fixed card charge come from pages read on 2026-11-04; the 0.20
      listing fee and 0.30 per-order fee come from the fixed-fee article. All are stated inputs, not your shop.
  - q: "Why does selling only half hurt so much?"
    a: >-
      Because the whole batch was paid for up front. On a 20-piece batch you spend 629.40; half sold returns 514.25.
      You are 115.15 short while still holding ten unsold pieces. The profit per sold unit is positive; the cash
      position is negative until the rest sell.
  - q: "How do I shorten the gap?"
    a: >-
      Three levers, in order of control: make the batch smaller, sell before you make (pre-order or made-to-order),
      and choose channels with faster settlement. The first two are yours; settlement speed is usually not.
---

## Conclusion: a 20-piece batch needs 629.40 dollars up front and returns 1,028.50 only after settlement — sell half and you are 115.15 short

**A price can be correct and a batch still unaffordable. On figures already published on this site, 20 units cost **629.40 dollars** to start; the full batch returns **1,028.50** after the platform settles. But if only half sell before you need cash again, you get **514.25** back against **629.40** spent — down **115.15** with ten pieces still on the shelf. Profit and cash run on different clocks.**

## The two timelines

```text
Money out, at batch start:  n x (material + labour + fixed fees)
Money in, after sale + settlement:  n x price x (1 - fee rate)
```

Using this site's published inputs: material **$18.00**, labour **0.5 h × $25/h = $12.50**, fixed fees **$0.97**, price **$55.00**, fee rate **6.5%**.

| Batch | Cash out at start | Cash in after full sale | Cash in if half sell |
|---|---|---|---|
| 10 | $314.70 | $514.25 | $257.12 |
| 20 | **$629.40** | **$1,028.50** | **$514.25** |
| 40 | $1,258.80 | $2,057.00 | $1,028.50 |
| 80 | $2,517.60 | $4,114.00 | $2,057.00 |

**The half-sold column is the one to read.** At every batch size, selling half leaves you with less cash than you started with — even though each unit sold makes about $19.96. The unsold half was paid for in full and has returned nothing.

## The three clocks that set the length of the gap

```text
gap = production days + days-to-sell + settlement days
```

| Production | Days to sell | Settlement | Total gap | Turnovers per year |
|---|---|---|---|---|
| 7 | 14 | 7 | **28 days** | 13.0 |
| 7 | 30 | 14 | 51 days | 7.2 |
| 14 | 30 | 14 | 58 days | 6.3 |
| 30 | 60 | 14 | 104 days | 3.5 |

Settlement days are the part you least control. The table uses 7 and 14 as stated examples, not published platform terms — we have not read a current settlement policy, so we do not quote one. The point is the shape: **a 28-day gap needs roughly six times less working capital than a 104-day gap at the same batch size**, because the money comes back sooner and can fund the next run.

## The number to write down before your next batch

**Peak cash exposure = cash out at start − cash already returned by that date.**

For a 20-piece batch with no sales before completion, that is $629.40. Ask one question: could you pay that amount today and still cover the next 28 days of ordinary costs? If not, the batch is unaffordable no matter how good the margin is. The three levers, in order of how much you control them:

1. **Smaller batches** — halve n and you halve exposure, at the cost of more setup per unit (see [batch size math](/guides/batch-size-math/)).
2. **Sell before making** — pre-orders or made-to-order move the "days to sell" clock to zero.
3. **Faster settlement** — worth checking, but usually not yours to change.

## Why settlement days deserve a five-minute check

Settlement is the clock you can inspect without changing it. Before your next batch, open the payment section of the channel you actually use and write down the date when funds become available, not the date the order ships. Then compare that with the day you must pay your own material supplier. If the two dates are more than a month apart, no amount of margin on the listing changes the fact that you are financing the platform's float. We are not quoting a number for any specific channel here because we have not read a current settlement policy — which is precisely why the article tells you to go and read yours rather than copy ours.

## What this article does not price

Interest on money borrowed, storage of unsold stock, and the cost of a stock-out when the next batch is late. We have not measured any of them, so none appear in the table. The arithmetic above is about timing, not about every cost of doing business.

## Stances, with check dates

- **P1**: by **2026-12-23** we publish the actual cash-out figure for one real batch of our own, measured at purchase time, next to the 629.40 example. If it differs, the example stays and the difference is explained.
- **P2**: the claim "selling half does not recover a full batch's cash" is arithmetic and stands; by **2027-01-23** we check it against real order timing, including a batch where it fails because most units sold before completion.
- **Unverified now**: every settlement day count and every batch size except the stated 20-piece example. Only the formula and the arithmetic are asserted.

Related: [batch size curve](/guides/batch-size-math/), [pricing calculator](/tools/pricing-calculator/), [fixed fees](/guides/fixed-fee-floor/), [return reserve](/guides/return-reserve-math/).
