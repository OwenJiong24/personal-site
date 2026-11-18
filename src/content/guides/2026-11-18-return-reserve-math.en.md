---
lang: en
key: return-reserve-math
title: "A 5% return rate is not 5% of your margin: where that 2.25 dollars per order actually comes from"
date: 2026-11-18T21:55:00Z
audience: "makers pricing handmade goods who have a return-rate field in a spreadsheet and do not know what it means"
summary: "Our pricing calculator uses return rate x cost per return as a per-order reserve. On its own defaults that is 2.25 dollars, or 4.1% of a 55-dollar price — but it eats 9.2% of the margin, not 4.1%. At a 10% return rate it eats 18.4%. Here is the arithmetic and the three numbers you must replace with measurements."
summary_en: "Return reserve is a percentage of price but a bigger percentage of margin — and the number you enter for cost per return decides whether the model is honest."
tags: [returns, 定价, 成本, "2026"]
status: public
voice: assistant
ownerNote: ""
faq:
  - q: "What does the return-rate field in the pricing calculator actually do?"
    a: >-
      It multiplies your return rate by the cost of one return event and adds that as a per-order reserve. With a 5%
      rate and 45 dollars of cost per return, the reserve is 2.25 dollars on every order, sold or not. It is an
      expected value, not a fine you pay five times out of a hundred.
  - q: "Why does a 5% rate take 9.2% of the margin?"
    a: >-
      Because the base changes. The 2.25-dollar reserve is 4.1% of a 55-dollar price, but the margin on that order
      is only 24.50 dollars, so 2.25 is 9.2% of the margin. Small reserve percentages are large margin percentages
      whenever the margin is thin.
  - q: "What should I put in 'cost per return'?"
    a: >-
      Not just the refund. Include the material you cannot resell, the return postage you pay, the relabelling or
      repackaging, and the hours of handling. For a one-off handmade item the whole unit can be unrecoverable, so a
      cost near the full price plus two-way shipping is more honest than 45 dollars.
  - q: "Can I lower the reserve by refusing returns?"
    a: >-
      You can lower the number in the spreadsheet; you cannot lower the expectation by changing policy. A
      no-returns policy shifts the cost into disputes, bad reviews and lost repeat customers, which our model does
      not price. The honest field is your measured cost, whatever policy produced it.
---

## Conclusion: a 5% return rate takes 9.2% of your margin, not 5% — because the base is not the price

**A 5% return rate takes 9.2% of your margin, not 5% — because the base is the margin, not the price.** Our calculator models a return as rate x cost per return: on its defaults that is $2.25 per order, 4.1% of a $55 price but 9.2% of the $24.50 margin. Here is the arithmetic and the three inputs you must measure.

## Where this sits in the calculator

The pricing tool's cost line is:

```text
C = materials + labour + shipping + return reserve
return reserve = return rate × cost per return event
```

That is an expected-value term: if 5% of orders cause a $45 event, you must earn $2.25 on every order to pay for the ones that happen. The tool's defaults are **5%** and **$45**; both are placeholders until you replace them, and the tool says so on the page.

## The percentage-of-what trap

Worked on the same defaults: price **$55**, cost C **$30.50** (materials, labour, shipping and the reserve), so margin before the fee line is **$24.50**.

| Return rate | Reserve per order | % of the $55 price | % of the $24.50 margin |
|---|---|---|---|
| 2% | $0.90 | 1.6% | **3.7%** |
| **5% (default)** | **$2.25** | **4.1%** | **9.2%** |
| 10% | $4.50 | 8.2% | **18.4%** |
| 20% | $9.00 | 16.4% | **36.7%** |

**The last column is the one to quote.** If your margin is 24.50, a reserve that looks like "only four percent" is eating nearly a tenth of what you earn. And a return rate of 10% — which is not unusual for fit-dependent items — eats **18.4%** of the margin. This is the same denominator trap as markup versus margin, and it tends to hide in the same spreadsheet.

## The input that decides whether the model is honest

`cost per return` is where most people underestimate. The $45 default is a round number, not a measurement. For a handmade item, a return event can contain:

- **material you cannot resell** — a monogrammed or made-to-measure item has no second buyer;
- **return postage you absorb** — even when the buyer pays to send it back, you often pay to send the replacement;
- **repackaging and relabelling** of a returned item that *is* resellable;
- **your hours** — opening, inspecting, deciding, repacking and answering messages.

If the whole unit is unrecoverable, a truer cost is the full price plus two-way shipping: **$55 + $16 = $71** on our numbers.

| Return rate | Reserve at $45/event | Reserve at $71/event | As % of price |
|---|---|---|---|
| 5% | $2.25 | **$3.55** | 6.5% |
| 10% | $4.50 | **$7.10** | 12.9% |

**Changing that one input moves the reserve by 58%** without touching the return rate. That is why the input needs a measurement, not a vibe: the rate is visible in your orders, the cost per event is usually not.

## A four-line self-check before you quote a price

1. Pull the last 50 orders: how many were returned? That is your **rate** — use the measured number, not 5%.
2. For one return, add up what you actually lost: material + postage + hours. That is your **cost per event**.
3. Multiply them and divide by your margin, not by your price. If the result exceeds 20%, fix the price or the product, not the spreadsheet.
4. Re-measure after any change in sizing, packaging or photos — those change the rate more than a policy does.

## What a no-returns policy does not do

Removing the returns checkbox shifts the cost rather than deleting it: disputes, chargebacks, negative reviews and lost repeat buyers still cost money, and our calculator does not price them. We publish no number for that trade because we have not measured it. **If you refuse returns, write down your own cost per dispute and use that as the event cost** — otherwise the model will quietly claim a saving you have not earned.

## Stances, with check dates

- **P1**: by **2026-12-18** we measure one real return event end-to-end (materials, both legs of postage, handling time at our own rate) and publish the total next to the $45 default — confirming or replacing it.
- **P2**: the claim "the reserve eats a bigger share of margin than of price" is checked against our own order history once 50 orders exist; publish the realised rate and the margin share, including zero returns.
- **Unverified now**: every return rate and cost-per-event figure on this page except the tool's stated defaults. Only the arithmetic is asserted.

Related: [the pricing calculator](/tools/pricing-calculator/), [packaging and breakage cost](/guides/packaging-cost-and-breakage/), [batch size curve](/guides/batch-size-math/), [wholesale pricing math](/guides/wholesale-pricing-math/).
