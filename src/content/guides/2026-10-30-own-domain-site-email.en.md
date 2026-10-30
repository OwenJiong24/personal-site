---
title: "Own your domain, site and inbox for under $20 a year"
lang: en
key: 2026-10-30-own-domain-site-email
date: 2026-10-30T08:06:00Z
audience: makers, craft sellers, handmade business owners
summary: "A minimum viable setup for makers: your own domain, a free static site, and a real inbox on that domain. Hard cost is the domain — about US$10 a year."
summary_en: "A minimum viable setup for makers: own domain, free static site, real inbox. Hard cost: the domain."
tags: [guide, domain, website, email, low-cost]
status: public
faq:
  - q: I am not technical. Can I finish this myself?
    a: >-
      Yes. Buying a domain, connecting a site, and turning on email forwarding are all form-filling. Every step below
      tells you what you should see on screen.
  - q: Do I have to leave my marketplace shop?
    a: >-
      No. Your own site and your shop are two legs: the marketplace brings traffic, your own site is where that traffic
      lands and what you keep for a decade. Run both.
  - q: What does it actually cost per year?
    a: >-
      One domain. At Cloudflare's at-cost pricing a .com is about US$10 per year (check your checkout page). Hosting,
      certificates and email forwarding sit inside free tiers.
  - q: Why not just use Gmail?
    a: >-
      Gmail works, but name@yourdomain is part of being credible: suppliers, buyers and collaborators read a custom
      domain as proof that this person is here for the long run. And the address survives any platform change.
---

**Conclusion**: to be findable, reachable and memorable as a maker you need exactly three things — **your own domain, a free-hosted site, and an inbox on that domain**. The only hard cost is the domain: about US$10 a year. Everything else fits inside free tiers.

## Why the marketplace shop is not enough

The marketplaces are not bad; the problem is that nothing there belongs to you. Rules, fees, traffic allocation, search ranking — any of them can change and you must follow. A domain is the only asset that is still in your name ten years later.

> "In essence we gather people with the same need together, so we do not have to advertise to find orders — the orders find us."
> — from my own notes (redacted)

That line is about the power of a platform; it works in reverse too: **your site is your own demand-aggregation point**. When a buyer searches "handmade ceramic mug" and lands on your page instead of a listing grid, that click is finally yours.

## Three steps, in order

### Step 1 — buy a domain (~US$10/year)

- Where: Cloudflare Registrar (at-cost, no first-year gimmicks, no renewal hikes), or any registrar you trust.
- What: name + `.com` is the stable choice. If the budget is tight you can take a cheaper suffix, but know the cost: lower trust by default and worse email deliverability.
- Do this: turn on auto-renew and set a calendar reminder. Letting a domain lapse and get re-registered is the most expensive mistake in this whole process.
- What you will see: a DNS settings page. Touch nothing yet.

### Step 2 — put a site online (free)

- Use Cloudflare Pages: connect a folder of static files (or a GitHub repo), build once, get a URL.
- In the Pages project add **Custom domains** → your domain. It writes DNS and issues the certificate for you.
- What you will see: the domain moves from `Initializing` to `Active / SSL enabled`, and `https://yourdomain` opens.
- Keep the site simple at first: one page of who I am, what I make, how to reach me, plus a works list. Do not start with a full store.

### Step 3 — a real inbox on that domain (free)

- In Cloudflare open **Email Routing**, add a destination (your Gmail), verify once.
- Turn on a catch-all rule: everything at `*@yourdomain` forwards to that inbox.
- What you will see: MX, SPF and DKIM records appear automatically.
- Result: `hello@yourdomain` and `orders@yourdomain` both receive mail while your actual inbox stays Gmail. Configure send-mail-as in Gmail when you want to reply from the domain.

## Cost table (your checkout price wins)

| Item | Cost | Note |
|---|---|---|
| Domain | ≈ US$10/year | The only hard cost; at-cost renewal does not jump |
| Static hosting | 0 | Free tier is far beyond a personal site |
| HTTPS certificate | 0 | Issued and renewed automatically |
| Email forwarding | 0 | Catch-all into your existing inbox |
| Site tooling | 0 | Hand-written HTML or a static generator |

## Three mistakes to skip

1. **Build the store first, content later.** Backwards. Buyers find you before they buy you; build the findable page first.
2. **Any cheap domain will do, nobody looks.** The domain is your street address. Picking a bad suffix is writing the address on a scrap of paper.
3. **I will do it when I am better at tech.** None of these three steps needs tech. They need one afternoon.

## The judgement to take away

> "Luxury never disappears — because what is luxurious is not efficiency but scarcity: the value a person endows."
> — from my own notes (redacted)

Handmade never sold efficiency. It sold who made it, why, and why others cannot. Your own site is where that endowment gets **fixed in place**: works sell out, pages do not.
