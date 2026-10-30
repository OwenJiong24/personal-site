---
title: "Tags are the interface: structured data beats channel lists"
lang: en
key: 2026-10-30-tag-as-interface
date: 2026-10-30T07:53:00Z
summary: "A site is caught by the ecosystem not by how many channels it plugs into, but by how complete its structured facts are. Most third-party services are just entry points to the same facts."
summary_en: "A site is caught by the ecosystem not by channel count, but by structured-data completeness."
tags: [SEO, AIEO, structured-data, engineering]
status: public
---

**Conclusion**: whether the ecosystem can pick a site up depends on **how complete its structured data is**, not on how many channels it plugs into. Channels are entry points; structured data is the interface. Get the interface right and entry points are cheap to add.

## Where this judgement comes from

> "Google Analytics is essentially a Tag… as long as you satisfy Google's structured data, 90%+ of external services work (Hotjar, Pinterest, ad channels). All of them need built-in tags."
> — from my own product notes, 2026 (redacted), the SEO-infrastructure section

I wrote that into a PRD as the reason to build the structured layer before wiring channels. Today I am testing the same claim on my own site's AIEO, and it holds: **one set of facts, read by different consumers in different ways**.

## What I actually shipped on this site (status stated)

1. **One fact set, declared several ways**: `Person` + `WebSite` on the home page, `BlogPosting` per article (`datePublished`, `dateModified`, `wordCount`, `isPartOf`, `workTranslation`). *Done*
2. **Language is a fact too**: paired `hreflang` + `x-default`, one canonical per language. *Done*
3. **Machine-readable index**: `/llms.txt` for models, `/llms-full.txt` for full text. *Done*
4. **Checkable time**: UTC timestamps plus a SHA-256 chain over full bodies, head in the footer and `/chain.json`. *Done*
5. **Channels last**: RSS, sitemap, social preview image. *Done*
6. **Whether it actually gets cited**: *not verified* — the 30-day experiment runs now; results go into the journal.

## Why the interface comes first

Channels change: a platform that matters today is gone in two years. Structured facts do not change: who wrote this, when, about what, related to what. Get those right once and every new channel is nearly free. Get them wrong and ten channels are ten readers that cannot understand you.

Corollary: **the foundation of any content platform is not the editor, it is that fact model.**

## A counter-example (my own)

My first version had HTML and RSS, which looked "human-readable" enough. A model reading it got no author entity, no update time, no language or translation relation — so it could only treat me as unattributed text. Only after the structured layer existed was "the same person, writing continuously" decidable.

So the order is: **fact model → structured declarations → machine index → distribution**. Do it in reverse and you redo all of it.
