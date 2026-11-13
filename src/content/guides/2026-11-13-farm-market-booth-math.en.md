---
lang: en
key: farm-market-booth-math
title: "Which farmers markets take handmade vendors — and the booth arithmetic that decides if any of them is worth a Saturday"
date: 2026-11-13T21:40:00Z
audience: "makers deciding whether a craft table at a farmers market is worth the weekend"
summary: "A directory snapshot puts 3,712 of 8,776 US farmers markets as listing crafts vendors — but the top state by penetration is not the top state by count, and neither tells you if a booth pays. Here is the file we published, the distinction most searches miss, and the break-even formula for a market day."
summary_en: "Penetration rate versus absolute count, then the booth break-even arithmetic — with the data vintage stated up front."
tags: [farmers market, craft fair, 摊位, selling channels, "2026"]
status: public
voice: assistant
ownerNote: ""
faq:
  - q: "Where does the market list on this site come from?"
    a: >-
      A USDA Farmers Market Directory snapshot. It holds 8,776 US markets with usable coordinates, of which 3,712
      list crafts vendors and 4,064 list soap. The season windows inside the snapshot run 2010 to 2020, so it is a
      historical directory, not a live list: a market in it may have moved, closed or changed its vendor rules. We
      publish the vintage instead of hiding it.
  - q: "Which state has the most markets that take craft vendors?"
    a: >-
      California, with 224 of its 756 markets listing crafts vendors. But only 29.6% of California's markets do, while
      Missouri lists crafts at 62.7% of its 255 markets. So if you are choosing a state to tour, the question is not
      "most markets" but "most markets that will take me", and the two rank differently.
  - q: "How many items must I sell at a market to break even?"
    a: >-
      Booth fee plus travel plus the value of the stock you bring, divided by your contribution per sale. At $55 per
      item and $18 of variable cost, each sale contributes $37. A $150 booth and $40 of travel needs 5.1 sales, so 6.
      The formula is the point; the numbers are placeholders you replace with your own.
  - q: "Should I do a craft fair instead of a farmers market?"
    a: >-
      They are different bets. A farmers market gives you recurring foot traffic and a weekly slot; a craft fair gives
      you concentrated handmade-intent buyers and much higher booth fees. Run the same break-even arithmetic on both
      and compare the number of sales each needs, rather than comparing the booth fee.
---

## Conclusion: pick the state by penetration, then decide the booth by arithmetic

**3,712 of 8,776 US farmers markets in a USDA snapshot list crafts vendors, but the state that ranks first for craft coverage is not the state with the most markets — and neither number says whether a booth pays.** California has the most craft-listing markets (224 of 756); Missouri has the highest share (62.7% of 255). Below: the data with its vintage, the distinction those two rankings expose, and the break-even formula that turns any of it into a yes or no.

## The dataset, and what it can be trusted for

We turned a USDA Farmers Market Directory snapshot into a searchable page with a state map: **8,776 markets with usable coordinates, 53 states and territories, 3,712 listing crafts (42.3%), 4,064 listing soap (46.3%), 5,264 carrying a website.** Full data at [/tools/markets/](/tools/markets/), raw JSON under `/data/markets/`.

**The vintage is the first thing to read:** every record's season window falls between **2010 and 2020**. This is a historical directory. It can tell you roughly where markets are and how much craft coverage a state has; it cannot tell you that any given market is running this Saturday, what a booth costs, or whether your category is already full.

| State | Markets | Listing crafts | Share |
|---|---|---|---|
| California | 756 | **224** | 29.6% |
| New York | 672 | **211** | 31.4% |
| Michigan | 342 | **177** | 51.8% |
| Missouri | 255 | **160** | 62.7% |
| Wisconsin | 311 | 144 | 46.3% |
| Massachusetts | 325 | 144 | 44.3% |

## Ranked by count and ranked by share are two different maps

Look at the middle of that table. Missouri has **160** craft-listing markets out of 255 — a **62.7%** share, the highest of any large state in the file. California has **224** out of 756 — a **29.6%** share, less than half of Missouri's.

- If you are picking **one state to tour**, absolute count wins: California gives you 224 doors.
- If you are picking **where a cold application is most likely to be accepted**, share wins: in Missouri nearly two in three markets take crafts vendors, so a random application has a much better hit rate.
- The two strategies cost different things: touring a big state means more travel per confirmed booth; applying where share is high means fewer rejections but fewer total slots.

**This is the reading most "best state for craft fairs" pages skip** — they list counts or they list percentages, and either way the answer changes when you ask the other question.

## The booth arithmetic that actually decides it

A market day is a fixed-cost bet against a per-sale contribution. Write three numbers:

```text
contribution per sale = price - variable cost      (materials, packaging, card fees)
fixed cost of the day = booth fee + travel + food + the stock you cannot sell
sales needed = fixed cost of the day / contribution per sale
```

Worked example, on our own published numbers: price **$55**, variable cost **$18** (materials plus the $0.85–$2.60 packaging line measured for this site), contribution **$37**. A **$150** booth plus **$40** travel is **$190** fixed, which needs **5.1 → 6 sales** to break even, and 12 sales to make the day worth more than staying home and shipping.

| Booth fee | Travel | Fixed | Sales needed at $37 | At a 30% margin instead ($16.50) |
|---|---|---|---|---|
| $50 | $20 | $70 | **2** | **5** |
| $150 | $40 | $190 | **6** | **12** |
| $350 | $80 | $430 | **12** | **26** |
| $600 | $120 | $720 | **20** | **44** |

**The right column is the point.** The same booth that needs 6 sales at a $37 contribution needs 12 at a $16.50 contribution. Before you compare booth fees between two fairs, compute your own contribution per sale — that ratio moves the requirement twice as fast as the fee does. Our pricing calculator does the variable-cost side: [/tools/pricing-calculator/](/tools/pricing-calculator/).

## A four-step order that avoids wasting application fees

1. **Filter the data to your state** and tick crafts. That is your candidate set, with web addresses attached.
2. **Check each candidate's own site** for the current application window and booth fee — the snapshot has neither, and neither does this page.
3. **Run the break-even formula** with your real contribution per sale before paying any application fee. Non-refundable fees are part of the fixed cost.
4. **Apply where share is high first** if your goal is to get in; apply in the big state first if your goal is volume. Decide which one you are doing before you send anything.

## Stances, with check dates

- **P1**: by **2026-12-13** we re-fetch the current USDA directory (the Local Food Portal, not this 2010–2020 snapshot) and publish the record count and the date, or state publicly that the source is no longer machine-readable. Either outcome gets written down.
- **P2**: the claim "share and count rank differently, so the strategy differs" gets tested on real applications: we record the application-to-acceptance rate for at least five markets and publish it, including zero-acceptance.
- **Unverified now**: every booth fee on this page. They are placeholders showing the formula; we have paid none of them, so we state none of them as fact.

Related: [packaging and breakage cost](/guides/packaging-cost-and-breakage/), [where to sell handmade in 2027](/essays/2026-11-03-handmade-selling-channels-2027/), [wholesale pricing math](/guides/wholesale-pricing-math/), [the market search itself](/tools/markets/).
