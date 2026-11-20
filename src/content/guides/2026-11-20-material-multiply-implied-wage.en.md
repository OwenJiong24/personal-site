---
lang: en
key: material-multiply-implied-wage
title: "Material times three sounds generous. On our numbers it pays 58 dollars an hour — here is how to check your own"
date: 2026-11-20T21:45:00Z
audience: "makers who price by a material multiplier and have never checked what hourly wage that multiplier implies"
summary: "A price rule like 'material x 3' hides a wage. Using only figures already published on this site, we invert the pricing equation: material 18, half an hour per piece, 6.5% fee, 5% failure and 0.97 in fixed charges. Material x 3 gives 54 dollars and implies 58 dollars an hour; the same piece at 36 dollars implies 26 dollars an hour. Here is the inversion and the check."
summary_en: "The multiplier is a wage in disguise — invert the pricing equation to see what you are actually paying yourself."
tags: [pricing, 时薪, 定价, "2026"]
status: public
voice: assistant
audience_note: ""
faq:
  - q: "What does 'inverting the price' mean here?"
    a: >-
      Instead of starting with a target hourly wage and computing a price, you start with the price you already charge
      and solve for the wage it pays. The inputs are the same: material cost, hours per piece, fee rate, failure rate
      and fixed charges per order. Only the direction changes.
  - q: "Where do the numbers in the worked example come from?"
    a: >-
      Material cost 18 dollars and half an hour of labour are the figures in our pricing calculator's worked example.
      The 6.5% transaction fee comes from the fee page read on 2026-11-04, the 0.97 dollars in fixed charges from the
      fixed-fee article published on 2026-11-19, and the 5% failure rate from the calculator defaults. All are stated
      as inputs, not as measurements of your shop.
  - q: "Why does a small change in price move the implied wage so much?"
    a: >-
      Because the wage is the residual after material, fees and failures are paid. On this cost base the residual is
      thin: going from a 36-dollar price to a 45-dollar price raises the implied wage from 26 to 42 dollars an hour —
      a 25% price rise producing a 61% wage rise. That amplification is the reason the inversion is worth doing.
  - q: "Does a high implied wage mean the price is right?"
    a: >-
      No. It means the wage is high if every piece sells at that price and the hours are really half an hour. If the
      item does not sell, the implied wage is theoretical. The inversion tells you what the price promises, not what
      the market will pay; compare it against actual orders before you raise anything.
---

## Conclusion: a material multiplier is a wage in disguise — on our numbers "times three" promises 58 dollars an hour

**Material x 3 implies about 58 dollars an hour on our numbers; x 2 implies 26.** A multiplier is a wage in disguise - invert the equation to see what you are really paying yourself.

## The inversion

Start from the pricing identity, where a sold unit must cover the material and hours of every unit produced, including failures:

```text
P x (1 - fee) - fixed = material + hours x wage, all divided by (1 - failure)

Solve for the wage the price actually pays:
wage = [ P x (1 - fee) - fixed ] x (1 - failure) - material / hours
```

The inputs here are all already on this site: material **$18.00** and hours **0.5** from the [pricing calculator's worked example](/tools/pricing-calculator/), fee **6.5%** from the [fee page read on 2026-11-04](/guides/2026-11-04-selling-fee-comparison/), fixed charges **$0.97** from the [fixed-fee article](/guides/fixed-fee-floor/), and failure **5%** from the calculator defaults. They are inputs to a demonstration, not measurements of your shop.

## What the common multipliers actually pay

| Rule | Price | Implied hourly wage |
|---|---|---|
| Material × 2 | $36.00 | **$26.11/hour** |
| Material × 3 | $54.00 | **$58.09/hour** |
| Material × 4 | $72.00 | **$90.07/hour** |

**"Times three" is not a modest rule.** On this cost base it promises an hourly wage near $58 — far above the $25/hour used in the [batch-size article](/guides/batch-size-math/). If nobody pays $54 for that item, the wage is theoretical: the price promised it, the market did not.

The reverse check is more useful. Fix a wage target and solve for the price:

| Target wage | Minimum price |
|---|---|
| $15/hour | $29.80 |
| **$25/hour** | **$35.43** |
| $40/hour | $43.87 |
| $60/hour | $55.13 |

At $25/hour — the rate used in our own worked examples — the floor is **$35.43**, close to the "×2" price. So the multiplier rule that looked conservative is roughly the wage target; the one that looked standard is more than double it.

## Why the wage moves faster than the price

Take the same piece at three prices:

| Price | Implied wage |
|---|---|
| $45 | $42.10/hour |
| $55 | $59.86/hour |
| $65 | $77.63/hour |

A **$10** price rise (22%) moves the implied wage by **$17.76** (42%). The wage is the residual after fixed costs, so it moves more than the price does. This is the same shape as the [fixed-fee trap](/guides/fixed-fee-floor/) and the [return-reserve trap](/guides/return-reserve-math/): a small change at the top becomes a large change at the bottom because the base is smaller.

Failure rate adds another multiplier. At a 25-dollar wage target, the minimum price is **$33.66** with zero failures and **$42.07** at 20% failures — a **25%** price rise needed just to pay for the pieces that never ship. A multiplier rule has no term for failure at all, so it silently assumes zero.

## A four-line check on your own price

1. Write the price you actually charge and the material cost. Their ratio is your multiplier.
2. Put your real hours per piece, your fee rate and your fixed charges into the inversion above.
3. Compare the implied wage with the wage you would accept from a stranger for the same hours.
4. If the two are far apart, change the price or the process — not the number you tell yourself.

## Stances, with check dates

- **P1**: by **2026-12-20** we time one real production piece with a stopwatch and compare the measured hours with the 0.5 used here, publishing the difference even if it contradicts this article.
- **P2**: by **2027-01-15** we publish the median price of our own listings and the implied wage from actual orders, including listings that never sold. A rule that promises $58/hour and never sells is not paying $58/hour.
- **Unverified now**: your hours, your fee rate and your failure rate. Only the arithmetic is asserted; every input is a stated example.

Related: [the pricing calculator](/tools/pricing-calculator/), [batch size math](/guides/batch-size-math/), [fixed fees](/guides/fixed-fee-floor/), [return reserve](/guides/return-reserve-math/).
