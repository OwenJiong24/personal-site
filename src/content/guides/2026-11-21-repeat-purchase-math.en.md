---
lang: en
key: repeat-purchase-math
title: "A 50% repeat rate still will not pay back a 50-dollar acquisition: the six-order LTV table"
date: 2026-11-21T21:45:00Z
audience: "makers who are told to 'make it up on repeat purchases' and have never written the rate down"
summary: "Repeat purchase is quoted as a way to recover acquisition cost, but the arithmetic is harsher than the slogan. Using the 24.41-dollar contribution from our published pricing example, a 50% repeat rate across six orders gives 48.44 dollars of lifetime value — still below a 50-dollar acquisition cost. Here is the table, the implied break-even rate, and the three inputs you must measure."
summary_en: "The lifetime value of repeat buyers is usually much smaller than the story about them."
tags: [CRM, 复购, 获客, 定价, "2026"]
status: public
voice: assistant
ownerNote: ""
faq:
  - q: "What is LTV in this article?"
    a: >-
      Lifetime value here means the sum of contribution from a customer over a fixed number of orders, not a
      company valuation and not revenue. Contribution is the price minus the costs already published on this site;
      we use 24.41 dollars, the profit in the pricing calculator's worked example.
  - q: "Why do the six-order and twelve-order numbers look almost the same?"
    a: >-
      Because a repeat rate compounds. At a 10% rate the probability of a sixth order is about one in a hundred, so
      orders after the fourth contribute almost nothing. The long tail is a rounding error at low repeat rates, which
      is exactly why 'they will come back later' does not rescue a thin first order.
  - q: "What repeat rate would make a 50-dollar acquisition cost pay back?"
    a: >-
      More than 100% on this cost base. Solving six-order LTV for 50 dollars needs a repeat probability above one,
      which is impossible. The honest conclusion is that the first order must carry the acquisition cost; repeat
      revenue is upside, not the plan.
  - q: "Can raising prices fix it?"
    a: >-
      It can, if the market pays. Doubling contribution from 24.41 to 48.82 would cover a 50-dollar acquisition on
      the first order or the second. If the market will not pay that, the alternative is lowering acquisition cost —
      which is a different project from making a better product.
---

## Conclusion: a 50% repeat rate over six orders yields 48.44 dollars — still short of a 50-dollar acquisition cost

**A 50% repeat rate over six orders yields 48.44 dollars - short of a 50-dollar acquisition cost.** Repeat revenue compounds from contribution, not price, and on our numbers the slogan fails by a factor of two.

## The model, and its honest limits

```text
LTV(n orders) = contribution x (1 + r + r^2 + ... + r^(n-1))
```

`r` is the probability that a customer who bought once buys again in the next period. We use **n = 6** orders because that is a plausible window for a handmade business and because the numbers after it are tiny at low rates. Contribution is **$24.41** — the profit in the [pricing calculator's worked example](/tools/pricing-calculator/), read on 2026-11-13. An acquisition cost of **$50** is a placeholder, not a figure from our own spending; we have never bought an ad, and we say so.

| Repeat rate r | LTV over 6 orders | Multiple of one order | Covers a $50 acquisition? |
|---|---|---|---|
| 10% | $27.12 | 1.11× | No |
| 20% | $30.51 | 1.25× | No |
| 30% | $34.86 | 1.43× | No |
| 40% | $40.62 | 1.67× | No |
| **50%** | **$48.44** | **2.00×** | **No** |

**Even doubling the customer's value by repeat purchases does not cover the acquisition.** That is the structural point: repeat revenue compounds from the *contribution*, not from the *price*, and the contribution is the thin part of a handmade order.

## Why the long tail does not rescue it

Extending the window from six orders to twelve barely moves the answer:

| r | 6 orders | 12 orders | Change |
|---|---|---|---|
| 10% | $27.12 | $27.12 | $0.00 |
| 20% | $30.51 | $30.51 | $0.00 |
| 50% | $48.44 | $48.81 | $0.37 |

At a 20% repeat rate, the chance of a fifth order is 1.6% and of a tenth is 0.02%. The orders after the fourth are rounds in a spreadsheet, not money in a bank account. This is why the "long tail of loyal customers" argument fails on small numbers: the tail is short when the rate is small.

## The break-even rate does not exist on this base

Solving six-order LTV for $50 on a $24.41 contribution needs a repeat probability above 100%. There is no such rate. The two inputs that can change the answer are:

| Change | Six-order LTV | Verdict |
|---|---|---|
| Contribution doubles to $48.82 | $48.82 on first order | Covers $50 nearly by order two |
| Acquisition halves to $25 | $27.12 at 10% repeat | Covered by the first order |
| Both | — | Healthy, but both must be true |

**If the first order cannot cover acquisition cost, you are running a business that depends on customers doing something they have no obligation to do.** The honest choice is to lower acquisition cost or raise contribution; repeat purchase is upside on top of either.

## What to measure before using this table

1. **Contribution per order.** Use the [pricing calculator](/tools/pricing-calculator/) with your own numbers, not our $24.41.
2. **Repeat rate over a fixed window.** Count customers who bought again within six orders or twelve months, and write the window down. A percentage without a window is not a rate.
3. **Your real acquisition cost.** If you have never paid for a customer, write zero and say that the acquisition was time, not money. Do not invent $50.
4. Then run the formula. If the result is below acquisition cost, the first order is the one that needs fixing.

## Stances, with check dates

- **P1**: by **2026-12-21** we publish our own measured repeat rate over a stated window, including if it is zero. We have not measured it yet and will not quote an industry number.
- **P2**: the claim "a 50% repeat rate cannot cover a 50-dollar acquisition on a 24.41-dollar contribution" is arithmetic and stands as written; the claim that this generalises to other shops gets checked on **2027-01-21** against real customer records, including shops where it fails.
- **Unverified now**: every acquisition cost and repeat rate except the stated $24.41 input. Only the formula and its arithmetic are asserted.

Related: [the pricing calculator](/tools/pricing-calculator/), [return reserve](/guides/return-reserve-math/), [batch size math](/guides/batch-size-math/), [fixed fees](/guides/fixed-fee-floor/).
