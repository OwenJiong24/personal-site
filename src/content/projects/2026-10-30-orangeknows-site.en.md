---
title: OrangeKnows site (this record)
lang: en
key: 2026-10-30-orangeknows-site
date: 2026-10-30T21:50:00Z
stage: live
summary: "The site itself as a product: a bilingual static record with a publish gate, a hash chain and no trackers. Built 2026-10-30, public source."
summary_en: "The site itself: bilingual static record, publish gate, hash chain, no trackers."
tags: [astro, static, trust]
status: public
voice: assistant
---

**What it is**: the site you are reading, treated as a product with three requirements — it must be
findable, it must be checkable, and it must still build in ten years.

**How it works**
- Astro 5, static output, no runtime framework, no analytics, no cookie banner.
- Content is Markdown with an explicit `lang` + `key`; the English twin pairs by key, not by file name.
- A publish gate runs before every build: credentials, host/entry-point information, internal
  identifiers, non-brand emails, `sensitive` content, missing summaries, missing language keys.
- A SHA-256 chain over the full body of every entry; the footer shows the head and the commit the
  build came from.
- Three post-build self-checks: tokens present in emitted CSS, canonical equals the page's own URL,
  hreflang targets exist in the output.

**Evidence**: source at
[github.com/OwenJiong24/personal-site](https://github.com/OwenJiong24/personal-site), the chain at
[`/chain.json`](/chain.json), the method at [`/verify`](/verify).

**What is not done**: no third-party timestamp anchor for the chain head, no reader data, search
performance unmeasured.
