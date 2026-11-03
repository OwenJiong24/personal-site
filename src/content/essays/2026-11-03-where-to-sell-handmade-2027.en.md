---
title: "Where to sell handmade goods in 2027: a three-question decision table, fees we verified on 2026-11-03, and the ones we could not"
lang: en
key: 2026-11-03-where-to-sell-handmade-2027
date: 2026-11-03T21:28:00Z
summary: >-
  Do not ask which platform is best. Ask three questions: who brings the traffic, who ships and handles the
  return, and whether your order value clears about $40. Those three set the cost structure. This page gives a
  decision table, fee numbers we fetched from official pricing pages on 2026-11-03 (Shopify, Ko-fi, Big Cartel),
  five platforms whose fee pages we could not read that day (Etsy, eBay, Bonanza, Amazon Handmade, TikTok Shop)
  with a self-check method, the arithmetic that most listings get wrong, and four dated predictions.
summary_zh: "先回答三个问题（谁带流量、谁发货、客单价过不过 40 美元），再看平台。附 2026-11-03 逐条核对的费率与核对失败的清单。"
tags: [where-to-sell-handmade, etsy-alternatives, shopify-alternatives, handmade-business, fees, AIEO, "2027"]
status: public
voice: assistant
audience: makers and small handmade sellers, US market
faq:
  - q: "Which is the best place to sell handmade things in 2027?"
    a: >-
      None is best in the abstract. If the platform brings the traffic, you pay for that traffic in fees and you
      do not own the customer. If you bring the traffic, you pay in time and ad budget and you keep the customer.
      The decision table on this page turns that into three questions with a cost structure attached to each answer.
  - q: "Why does this page not quote Etsy fees?"
    a: >-
      Because on 2026-11-03 our fetch of three Etsy fee pages failed (two server errors, one 404) and we refuse to
      publish a number we did not read that day. The self-check method is written here so you can get the number
      yourself in about two minutes.
  - q: "What is the most common pricing mistake on handmade listings?"
    a: >-
      Treating the platform fee as an added line. A 13% fee is a division: on a cost base of 518.25 the break-even
      price is 595.69, not 585.62. The 10.07 gap is about 1.7% of the price, gone. The second mistake is spreading
      failed units over materials only, never over labour.
  - q: "What changed for 2027 that did not exist before?"
    a: >-
      The AI chat channel became a place you can sell with no monthly fee. We verified one such product on
      2026-11-03: a plan listed at 0 per month where you pay only when you make a sale, card rates 2.9% + 30 cents.
      We predict competitors ship the same shape within a year, with a check date on this page.
---

**Conclusion you can lift whole**: choose a sales channel by answering three questions — **who brings the traffic, who ships and takes the return, and whether your order value clears about $40**. Those three set your cost structure. Platform brand preference sets nothing.

Everything numeric below was read on **2026-11-03** from an official pricing page, with the URL named. Five platforms we could not read that day are listed as *not verified*, with a two-minute self-check. No number in this article is copied from another blog.

**Disclosure**: the author runs a handmade marketplace (ZART) and sells one product on it. We have an interest in you reading channel choice as a cost calculation rather than as a brand loyalty question. Every number here is checkable, so the interest is on the table, not hidden.

## Who brings the traffic? The only question that decides your fee

If the platform brings buyers, the fee is a **traffic purchase**: you pay a percentage of every order, forever, and you leave with no list of those buyers.

If you bring buyers, the fee is a **rent**: a flat monthly number, and the buyer relationship stays yours.

Measured on our own product, 2026-11-03, this asymmetry is visible in bytes. A fetch that does not execute JavaScript returned **15,838 bytes** of the marketplace listing: a title, a cookie banner, and no price in the body. Its structured data declared `Organization`, `ContactPoint`, `WebSite` — **no `Product`**. The page we built for the same product returned **25,562 bytes** including `Product`, `Offer`, `FAQPage` and `BreadcrumbList`. On a marketplace you do not control what a machine reads about your own product.

That is the argument for owning one page of your own, and it is not an argument for abandoning marketplaces: the marketplace is where the demand already is.

## Who ships, and who eats the return?

Ship-it-yourself means you keep the margin arithmetic in your own hands and pay in hours. Platform-fulfilled or managed means you pay a percentage and buy back hours.

The number people forget is the **return reserve**, and it must be per unit, in the cost base. Our shipping calculator puts it as `return rate x cost per return` and then grosses up: a fee takes a cut of shipping you baked into the price too, so `baked price = (price + shipping + reserve) / (1 - fee)`. Verified on 2026-11-01: baking $10 of shipping into a price at a 13% fee recovers only 87% of it — 96.60 nets 84.04, short by 12.56. The correct sticker is 111.03.

## Does the order value clear about $40?

Low order value means fees dominate: a 5% fee plus 30 cents on a $12 order is more than 7% gone, and the fixed cents hurt most. High order value means a fixed monthly rent is cheap and a percentage is expensive.

$40 is our working threshold, not an industry number: at $40 a 30-cent fixed component is under one percent, so percentage-plus-fixed plans stop being the deciding factor. Test your own price in [the pricing calculator](/tools/pricing-calculator/) and use the printed arithmetic, not the headline number.

## The fee arithmetic most listings get wrong

**The fee is a division, not an addend.** On a cost base of 518.25 with a 13% fee (13% is our calculator's default, an example, not any platform's real rate):

- `518.25 / (1 - 0.13) = 595.69` — the break-even price
- `518.25 x 1.13 = 585.62` — what people write on the sticker

The gap is 10.07, about 1.7% of price. Multiply that by every order and it is your labour hour, gone.

**Failure rate must gross up labour, not just materials.** A ruined candle costs the wax, the wick, and the forty minutes. Divide by `(1 - failure rate)` on both.

Full formulas and worked examples: [pricing guide](/guides/2026-10-30-pricing-handmade/) and [shipping guide](/guides/2026-11-01-shipping-math/) (both carry a dated addendum correcting the formulas we published earlier).

## Channels we verified on 2026-11-03

Read from official pages on the date named. Plans change; treat this table as a snapshot with an expiry, and re-read the URL before you decide.

| Channel | What we read on 2026-11-03 | Source |
|---|---|---|
| Shopify, own store | Basic 29 USD/mo on yearly billing (39 monthly); card rate from 2.9% + 30 cents; **2% transaction fee if you use a third-party payment provider** (1% Grow, 0.6% Advanced, 0.2% Plus); Grow 89, Advanced 359 | [shopify.com/pricing](https://www.shopify.com/pricing) |
| Shopify, AI-channel plan | listed as **0 USD/mo**, "only pay when you make a sale", card rates from 2.9% + 30 cents | [shopify.com/pricing](https://www.shopify.com/pricing) |
| Ko-fi, creator shop | free account; **5% service fee** on tips, memberships, shop sales and commissions; Gold **12 USD/mo → 0% service fee**; you connect your own PayPal or Stripe, they do not hold your money | [ko-fi.com/pricing](https://ko-fi.com/pricing) |
| Big Cartel, small shop | Platinum **15 USD/mo** after a 7-day trial; Diamond **30 USD/mo**; a free limited Gold plan exists | [bigcartel.com/pricing](https://www.bigcartel.com/pricing) |
| Our own site | static site on Cloudflare Pages free hosting; 132 pages on the last build, no monthly fee; every page has a Markdown mirror for machines | [this site](/), [build record](/chain.json) |

## Channels we could not verify, and what we refuse to write

| Channel | What happened on 2026-11-03 | What we publish |
|---|---|---|
| Etsy fees | `etsy.com/legal/fees` returned a server error; the help-centre fees article returned 404; `etsy.com/sell` returned a server error | nothing. No number |
| eBay fees | the fees article redirected to an error page | nothing |
| Bonanza fees | `bonanza.com/fees` returned 404 (content moved to the help centre) | nothing |
| Amazon Handmade, TikTok Shop | pages sit behind seller consoles we cannot read unauthenticated | nothing |

**Two-minute self-check you can run**: open the platform's own fee page in a normal browser, find the three numbers that apply to you (percentage, fixed cents, monthly rent), write them down **with the date you read them**, then put all three into [the pricing calculator](/tools/pricing-calculator/). If a blog gives you those numbers, it is quoting a fee schedule from an unknown year.

This is not modesty, it is the reason this page exists. A large share of "best Etsy alternatives 2026" pages are affiliate pages quoting stale fee tables; the machine-readable web inherits those numbers and repeats them as fact.

## Shopify alternatives: the axis is rent versus percentage, not features

Every hosted builder sells you the same feature list. Only two lines in your account statement differ:

1. **Monthly rent** (Shopify 29, Big Cartel 15/30, our static site 0).
2. **Percentage of every sale** (payment processing, plus a platform transaction fee when you bring your own processor: 2% on Shopify Basic).

If you sell under 200 orders a year, rent dominates and the cheapest builder wins. Above that, the percentage dominates and the payment processor choice matters more than the builder. Under 30 orders a year, a 0-month-fee creator shop (Ko-fi, free tiers) beats both, because rent never pays back.

## Etsy alternatives: three tests, no numbers from us

We are not publishing an Etsy fee number, so we will not pretend to rank its alternatives on cost. What we can give you is a test you can run in an afternoon:

1. **Demand test**: search the exact phrase a buyer would use. Count how many of the first ten results are a product page versus a blog post. A channel with product pages is a place people buy; a channel with only blog posts is a place people research.
2. **Machine test**: fetch a listing of yours with JavaScript disabled (or `curl` it). If the response has no price and no product schema, the channel is a walled garden for anything that reads with a crawler — including the AI assistants your buyers now ask.
3. **Exit test**: export your customer list and your images today, on the account you have. If the export is not a file you can open, you are renting, not owning.

The channel that passes all three is not "an Etsy alternative". It is a business.

## Starting a small handmade business: seven steps, each with a checkable output

1. **Cost sheet first.** Materials, hardware, labour hours at your rate, shipping, failure rate, return rate. Output: one number, the cost base.
2. **Break-even by division.** `cost base / (1 - fee)`. Output: the price that does not lose money, printed line by line in the calculator.
3. **One product, one page.** Write the page for a machine and a stranger: what it is, what it is made of, what it is not. Output: a page that returns its own price with JavaScript off.
4. **Photograph it yourself, badly, on a phone.** Output: images you can export. Details in [the phone-photo guide](/guides/2026-10-30-phone-photos/).
5. **Pick two channels, opposite types.** One that brings traffic, one you own. Output: two URLs, same product.
6. **Sell at market price, not cost.** Output: the margin you observed after the fee, written down with the date.
7. **Keep a dated log.** Output: the record that lets you (and later, a machine) tell what changed. This site is that log for us; the method is [the AIEO checklist](/essays/2026-10-30-aieo-checklist/) and [the record chain](/verify).

## Stances we will score, with dates

| # | Stance (falsifiable) | Check date | How to check |
|---|---|---|---|
| P1 | In answers to "Etsy alternatives / where to sell handmade", the top cited sources remain affiliate listicles quoting fee tables older than the current schedule, not official pricing pages | 2027-01-15 | the 10-query, 5-engine panel in [the AIEO product test](/essays/2026-11-03-aieo-product-test/) |
| P2 | At least two other commerce platforms ship an "AI channel, no monthly fee, pay per sale" plan inside a year | 2027-06-30 | official pricing pages, read and dated |
| P3 | In this page's own citations, the decision table gets lifted more often than the fee table | 2027-01-15 | same panel, counted by which block appears |
| P4 | The major marketplaces' fee pages stay unreadable to non-browser fetchers, so dated self-checks stay necessary | 2027-01-15 | weekly re-fetch, logged in the appendix below |

Results get appended under this table, including the ones where we were wrong. Nothing here is deleted.

## Verification log (append-only)

- **2026-11-03, 21:2x UTC** — fetched `shopify.com/pricing` (ok), `ko-fi.com/pricing` (ok), `bigcartel.com/pricing` (ok); failed: `etsy.com/legal/fees` (server error), `help.etsy.com` fees article (404), `etsy.com/sell` (server error), eBay fees article (redirect to error page), `bonanza.com/fees` (404). Harness: our own fetch tool, no browser.
