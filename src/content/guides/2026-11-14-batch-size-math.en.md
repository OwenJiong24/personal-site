---
lang: en
key: batch-size-math
title: "Batch size is a curve with a bottom, not a virtue: the queue arithmetic behind 'make 20 while you're set up'"
date: 2026-11-14T21:45:00Z
audience: "makers who batch-produce and keep guessing how many to make per run"
summary: "Setup time, inventory carrying and stock risk make per-unit cost a U-shaped curve with a computable minimum. On our own numbers the bottom is 50 units and 1 unit costs 1.6 times more; doubling setup effort moves the optimum by 1.4x, not 2x. Formula, table, and the four numbers you need."
summary_en: "Setup time, carrying cost and stock risk make per-unit cost U-shaped with a computable minimum - and the minimum moves by the square root of setup, not proportionally."
tags: [batch, 库存, 成本, "2026"]
status: public
voice: assistant
ownerNote: ""
faq:
  - q: "What is the difference between a batch and a lot?"
    a: >-
      A batch is what you make in one run; the setup cost per unit is that run's setup time divided by the number of
      units in it. A lot is what you buy or hold, and it carries inventory cost per unit held. The same arithmetic
      applies to both, but they have different inputs: batching your own work has a setup time, ordering materials
      has a minimum order quantity and a lead time.
  - q: "How do I find the batch size with the lowest cost per unit?"
    a: >-
      There is a closed form. With setup time S hours, an hourly rate r, monthly units m, unit cost C, a carrying
      rate i and months held m_h, the minimum sits at the square root of (2 x S x r x m_h / (C x i)). On our worked
      numbers it lands at 49.6 units, so about 50, and the cost curve is flat within a few cents between 30 and 70.
  - q: "Why does doubling setup effort only move the optimum 1.4x?"
    a: >-
      Because the optimum sits inside a square root. Doubling the setup time multiplies the optimal batch by 1.41,
      not by 2. The practical consequence: if your setup is a pain, the fix is to cut setup time in half (which also
      halves the optimum) rather than to make twice as many units.
  - q: "What if my stock does not sell?"
    a: >-
      Then the curve is lying to you, and the honest fix is adding a probability term: expected cost per sold unit
      becomes unit cost divided by the probability of selling the batch within the holding window. Our table shows a
      50-unit batch at 70% sell-through costing 1.43 times the plain number, which is enough to move the optimum
      back toward smaller runs.
---

## Conclusion: per-unit cost bottoms out somewhere, and that somewhere is calculable

**Setup cost falls as batches grow and carrying cost rises as they grow, so per-unit cost has a minimum — and on our own numbers that minimum is 50 units, where one unit costs 1.6 times what it costs at the bottom.** The mistake most makers make is not choosing the wrong number: it is treating batch size as a personality trait ("I make twenty of everything") instead of a curve with a bottom you can compute from four figures you already have.

## The formula, and why it has a bottom

```text
per-unit cost(n) = setup cost / n        ← falls as n grows ("while you're set up")
                 + time per unit × rate  ← flat
                 + material cost         ← flat
                 + (n / 2) × unit cost × carrying rate / months held   ← rises as n grows
```

The first term is the reason people batch at all: a $0.75 setup on one unit is 75 cents of labour you must charge; on twenty units it is under four cents. The last term is the reason batching is not free: every unit sitting on a shelf is money you spent that earns nothing, and on a limited-edition item it is also a bet that the design still sells in month three.

The minimum of that sum sits at:

```text
n* = sqrt( 2 × setup hours × hourly rate × months held / (unit cost × carrying rate) )
```

## Our own numbers, worked

The inputs, all of them ours or stated as assumptions: **S = 0.75 h** of setup per run (an hour of basting, taping and clearing), **r = 25/hour** for your own time, **u = 0.5 h** of labour per unit, **material cost 18.00** per unit (the figure from the pricing calculator's worked example), **C = 30.50** per finished unit including that labour, **m_h = 20** months a batch is expected to sit or sell through, **i = 1%/month** carrying rate (storage plus the money tied up).

| Batch | Setup per unit | Carrying per unit | **Total cost per unit** |
|---|---|---|---|
| 1 | $18.75 | $0.01 | **$49.26** |
| 5 | $3.75 | $0.04 | **$34.29** |
| 10 | $1.88 | $0.08 | **$32.45** |
| 20 | $0.94 | $0.15 | **$31.59** |
| **40** | **$0.47** | **$0.31** | **$31.27** ← the flat part |
| **50** | **$0.38** | **$0.38** | **$31.26** ← the computed bottom |
| 80 | $0.23 | $0.61 | **$31.34** |
| 200 | $0.09 | $1.52 | **$32.12** |

**Read two things from this table.** First, going from 1 to 10 units saves **$16.81 per unit**; going from 10 to 50 saves **$1.19**; going from 50 to 200 *costs* **$0.86**. The expensive part of batching is the first ten units. Second, the curve is remarkably flat between 30 and 70 — the difference between 40 and 80 is seven cents per unit. That flatness is why arguing about "twenty versus thirty" is mostly a waste of a conversation: both are near the bottom, while "one at a time" is not.

## The sensitivity that changes how you should act

| Change | New optimum | Ratio |
|---|---|---|
| Baseline | **50** units | 1.00 |
| Setup time doubles (0.75 h → 1.5 h) | **70** units | **1.41** |
| Monthly volume doubles (20 → 40 units/mo) | **70** units | **1.41** |
| Carrying rate doubles (1% → 2%/mo) | **35** units | **0.71** |

The optimum sits inside a square root, so every change moves it by the **root of the change**, not the change itself. **Doubling your setup effort makes 70 the right number, not 100.** The practical reading: if setup is painful, the biggest single win is halving setup time — that halves the optimal batch and halves the per-unit setup cost at any size — not making twice as many units to "spread it out". This is the same shape as the fee trap: the requirement moves more slowly than the thing you are tempted to change.

## The term this model leaves out, and how to add it

The formula assumes every unit you make gets sold within the holding window. When that is not true, the honest correction is a probability: expected cost per **sold** unit = per-unit cost ÷ probability of selling the batch.

| Sell-through of a 50-unit batch | Expected cost per sold unit | vs the plain number |
|---|---|---|
| 100% | $31.26 | 1.00× |
| 85% | $36.78 | 1.18× |
| 70% | $44.66 | **1.43×** |
| 50% | $62.52 | 2.00× |

**A 70% sell-through turns the 50-unit optimum into a worse deal than a 20-unit run.** This is the honest reason small batches exist for unproven designs: the arithmetic is not "small is cautious", it is that the risk term multiplies the cost of being wrong, and an unproven design has a low sell-through probability. Run the formula with your own sell-through once you have one measured; until then, treat it as the dominant unknown.

## Stances, with check dates

- **P1**: by **2026-12-14** we record one real production run's setup time with a stopwatch (not an estimate) and publish the measured figure next to the 0.75 h assumption above, whether it confirms or contradicts it.
- **P2**: the claim "the curve is flat between 30 and 70 units, so the argument about twenty-versus-thirty is noise" gets tested against our own order history: publish the cost difference actually realised over at least three runs.
- **Unverified now**: the carrying rate (1%/month is an assumption, not a measured figure), the 20-month holding window, and every sell-through figure above. Only the formula is asserted; the numbers that enter it are placeholders until measured.

Related: [the pricing calculator](/tools/pricing-calculator/), [packaging and breakage cost](/guides/packaging-cost-and-breakage/), [holiday stock ladder](/guides/2026-11-03-holiday-stock-ladder/), [cost per listing](/guides/cost-per-listing/).
