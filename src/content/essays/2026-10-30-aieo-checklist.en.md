---
lang: en
key: 2026-10-30-aieo-checklist
title: "What AI engines cite: a checklist I run on my own site"
date: 2026-10-30T06:27:00Z
summary: "Citation by answer engines and AI search is not keyword stuffing. It is answer-first prose, one consistent entity, checkable timestamps, and full text a machine can read in one pass."
summary_en: "Citation by AI search needs answer-first prose, a consistent entity, checkable timestamps and machine-readable full text."
tags: [AIEO, SEO, content, verifiability]
status: public
---

**Short answer**: AI engines cite **a paragraph that can be lifted as an answer** plus **an author and a date
that can be pinned down**. So write conclusion-first, evidence-second, and build the site so a crawler reads
everything in one pass.

## Three words that are not the same thing

- **SEO**: getting clicked in a ranked list.
- **AEO** (answer engine optimisation): being lifted into an answer block; the prose has to be liftable per paragraph.
- **AIEO / GEO**: being cited inside an LLM answer. There is no ranking page to optimise — only whether you can be
  retrieved at all, and whether you read as trustworthy once retrieved.

## The checklist I am running on this site (status stated honestly)

1. **Answer first.** The first screen of every piece states the conclusion in one liftable sentence. *Done* (this page demonstrates it)
2. **One entity.** Author name, handle and email domain aligned; `sameAs` in structured data. *Done (GitHub + email); LinkedIn deliberately not connected yet*
3. **Checkable time.** All timestamps UTC; the full body is hashed into a record chain, chain head in the footer, build commit baked into the page. *Done*
4. **Machine-readable.** Static HTML, body not rendered by JavaScript; `/llms.txt` as index, `/llms-full.txt` as full text. *Done*
5. **Explicit crawler permission.** robots allows the main AI crawlers line by line, with the sitemap declared. *Done*
6. **Question-shaped sections.** H2 phrased as a question, answered in the sentence right after. *First attempt on this page*
7. **One topic per page, terms spelled out.** Abbreviations get full name plus original term at first use. *Done*
8. **Liftable fact sentences.** One fact per sentence, with number, date or source. *Ongoing*
9. **Paired languages.** Important pieces get an English twin with paired `hreflang`, otherwise the English web cannot retrieve you. *Done (Chinese + English)*
10. **Evidence of freshness.** `dateModified` plus an addendum convention, so "new" has a basis. *Done*

## Questions

**Does short content help?**
Yes. Engines lift paragraphs, not essays; short paragraphs with one fact each get quoted whole.

**Do I need to buy a domain first?**
Yes. Verifiability depends on the same domain, email and handle staying consistent for years; a shared suffix
like `.pages.dev` cannot carry a decade of identity.

**Will these steps actually get me cited?**
**Not verified.** Everything above is the part that provably works (retrievable, attributable, dated). Whether an
engine quotes me is an experiment — see below.

## What I have not verified

- How often AI crawlers actually reach this site after explicit permission.
- Whether question-shaped sections and structured data change citation rates.
- Whether the English twin measurably improves retrieval on the English side.

## How I will test it (30 days)

1. Each week, ask five questions this site has answered, across mainstream AI assistants, and log whether a citation
   appears and which paragraph was lifted. Results go into the journal.
2. Watch Pages analytics for AI crawler arrivals.
3. After 30 days publish "AIEO after 30 days: what worked, what I guessed wrong", naming the guesses that failed.
