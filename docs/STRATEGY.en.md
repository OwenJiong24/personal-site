# OrangeKnows site strategy

> doc_id: OK-STRAT-001 · English twin of `STRATEGY.md` (the Chinese original is the source of truth for wording)
> author: local:swift (drafted from OJ's own words) · status: **current** · supersedes: none
> Maintenance: record only immutable direction and settled facts. OJ's own words appear in blockquotes, unedited.

## 1. Why this site exists

The goal is not traffic. It is being treated as **a trustworthy person** by the people who matter:
craft sellers who find the guides, partners and vendors in China, investors, and AI engines that quote us.

> "Mainly, in the AM era, to let people know me… these things are an accumulation over time, and that is what makes them meaningful and valuable."
> "Start from what can be covered and searched, give content that is genuinely valuable, and thread my own judgement through it."

## 2. Two markets, division of labour (settled 2026-10-30)

| | English site (`/`, default) | Chinese site (`/zh/`) |
|---|---|---|
| Goal | **Users**: makers and craft sellers worldwide | **Commercials**: Chinese sellers, partners, channels, investors |
| Content | Searchable playbooks, tooling, AI usage, industry judgement | Industry judgement, method, evidence of execution |
| Language | English first (Google and AI retrieval are the main battlefield) | Native Chinese, higher depth and sharpness |

> "English default matters… the Chinese site is for attracting commercial work, the English site is for attracting users."

## 3. Audiences and what they search for

1. **Craft sellers (EN)**: cheap domain/site/inbox, pricing, photos, shipping and fees, "should I build my own site", can AI write my listings.
2. **Craft sellers (ZH)**: the same, plus "a second leg outside the platform" and what is doable inside China.
3. **Peers and engineers**: structured data, AIEO/SEO practice, how a checkable record is built.
4. **Vendors and partners**: what this person is building, how good his judgement is, is he reliable.
5. **Investors**: a long-run narrative with evidence of execution — a continuous record is the evidence.
6. **Future readers (AI engines)**: can an engine extract a citable, sourced conclusion without knowing him.

## 4. Content lines

| Section | Role | Cadence |
|---|---|---|
| `guides` | Practical playbooks for sellers (SEO/AIEO main battlefield, EN first, bilingual, FAQ) | target 3/day, drafted in batch, published after OJ signs off |
| `essays` | Industry judgement and method (OJ quotes with sources) | 1–2/week |
| `journal` | What is being built, day by day | daily |
| `notes` | One-line conclusions and leads | irregular |
| `projects` / `uses` / `tools` | What is being built, what is used, free tools | quarterly / as needed |

Three hard standards: **the title is a real search intent · the steps are followable · OJ's judgement is threaded through as sourced quotes.**

## 5. Identity and trust

- Brand `OrangeKnows (OK)`; author `Owen Jiong`; Chinese secondary name 橙知道.
- Anchors are **GitHub handle + `owen@orangeknows.com`** only. LinkedIn and other real-name professional profiles are **not connected** (decision A699); connecting one needs OJ's explicit yes.
- Verifiability: UTC timestamps + a SHA-256 chain over the full body + footer chain head + `built_from` commit + paired `hreflang` + `llms.txt`.
- Privacy: no credentials, no host/entry points, no client data, no unreleased business numbers, no ID-level personal data.

## 6. BIMI plan

| Step | Status |
|---|---|
| DMARC record exists | ✅ published, but `p=none` (monitor only) |
| Raise to `p=quarantine` (BIMI requires an enforced policy) | to do (needs DNS write access, panel operation by OJ) |
| Brand SVG in SVG Tiny PS profile | to do (square canvas, no external references) |
| VMC/CMC certificate (needed for Gmail to show the logo) | **deferred**: annual fee, and it requires a verifiable registered trademark |
| BIMI on the work account | same prerequisites, evaluate after the apex domain enforces a policy |

## 7. Dual-voice writing rule (settled 2026-10-30)

> "Articles should not be written in the first person. Write them as one of my assistants observing, compiling and organising, so two viewpoints show: some viewpoints are mine — a living human — and the parts that are AI-assisted are clearly marked, plus my rating and quick comment."

| Part | Who | On the page |
|---|---|---|
| Narration, structure, data | **OK assistant** (AI-assisted) | A badge under the title states this |
| Judgement, opinion, quotes | **OJ** | Blockquotes with a source line, never blended into narration |
| Sign-off | **OJ** | A verdict block: 0–5 rating + one-line comment |

Fields: `voice: assistant|owner`, `ownerRating: 0-5`, `ownerNote`. A missing rating renders as `Verdict pending`
and the build lists it as work. **Ratings are never invented on OJ's behalf.**
Consequence: a reader and an AI engine can tell which layer is human judgement and which is compiled help.

## 8. Capability × audience matrix

> "I am good at business analysis, technical AI development, marketing, US-local marketing, US channel ad buying, execution, consumer insight… different audiences need different angles, all of them commercially valuable. We can also share free resources, like the small tools we build."

| Capability | English site (users / makers) | Chinese site (commercials) |
|---|---|---|
| Business analysis | Pricing, unit economics, fee and shipping comparisons (live: pricing guide + calculator) | Category opportunity, supply-demand structure, channel economics |
| Technical / AI development | AI usage, free tools that run, avoiding traps | System and delivery capability — the credential for commercial work |
| Marketing / US-local marketing | Search intent, listing copy, seasonality | How to enter the US market (scarce information for domestic sellers) |
| US channel ad buying | Minimum viable small-budget buying, and failure cases | Channel choice and ROI structure |
| Execution | Followable checklists | Strategy-to-launch execution records (the journal is the proof) |
| Consumer insight | Why people buy handmade, what reviews say | Nine-question demand audit, buyer segmentation |

**Free resources line**: `/tools` and `/zh/tools`. Static, no tracking, no sign-up, runs in the browser; one tool per "the seller keeps doing this calculation by hand"; tools cross-link with guides.

## 9. Commercial commitments (settled 2026-10-30)

| Track | For | Sold | Billing |
|---|---|---|---|
| English | Makers, small brands | Ads/growth consulting, tool subscriptions (pricing calculator → fee database, multi-store) | **US entity** (Stripe subscriptions, US invoicing) |
| Chinese | Domestic sellers, partners | Growth diagnostics, site building, automation | Domestic payments via the existing entity; the Chinese site is lead generation |

Published commitments (stated on `/support`, not to be changed quietly):
- **No ads, no sponsored posts, no soft advertising.**
- **Affiliate links only**: things OJ actually uses (domains, hosting, software, gear), always disclosed on the page, never ranked for commission.
- Site income comes from exactly two places: services and tools.
- Anything not measured is labelled **unverified**.

Guardrail: the dual-voice rule does not bend for commerce. AI multiplies output; judgement is not outsourced.
OJ reviews and signs off at least weekly; two consecutive weeks without it means publishing frequency goes down,
so the site never turns into a marketing account.

Full evaluation and the 90-day sequence: `../strategy/00_变现路线评估.md` in the workspace (Chinese).

## 10. Original discussion record

All blockquotes are OJ's own words from the 2026-10-30 conversation, unedited. Related decisions: A699 (anchors),
A700 (brand), A701 (content pivot), A702 (English default), A705 (dual voice and tools line).
