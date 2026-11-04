---
title: "The 10-point standard every article here is now scored against, with our own 26 scores published"
lang: en
key: 2026-11-04-article-quality-standard
date: 2026-11-04T19:05:00Z
summary: >-
  We wrote a 10-rule binary writing standard, scored all 26 published articles against it, and published
  the scores: average 6.9 of 10, 10 articles at 8 or above, 5 at 5 or below, worst 3. The most common
  failures are no falsifiable stance (44 of 52 language files), no reader action (32), no date in the body
  (24). The rules, the architecture, the CEO's own writing preferences quoted verbatim, the enforcement
  script and the dated revision plan are all on this page, and this page is written to the standard.
summary_zh: "10 条写作标准、逐篇打分、分数公开：26 篇平均 6.9/10，10 篇 ≥8，5 篇 ≤5，最低 3。最常见问题：没有可反驳立场（52 个语言文件里 44 个）、没有读者动作（32）、正文没日期（24）。规则、架构、CEO 写作偏好原话、执行脚本与带日期的修订计划都在本页。"
tags: [editorial-standard, content-quality, self-audit, publishing, SEO, writing]
status: public
ownerNote: >-
  OJ review (2026-11-04, verbatim): still AI-produced garbage.
voice: assistant
audience: publishers, marketers and AI operators who want a checkable writing standard, not advice
faq:
  - q: "What makes a page worth indexing?"
    a: >-
      Something a reader cannot get by asking the model: a measurement you ran, a date, a method they can
      reproduce, a position that can be proven wrong. Absent those, the page is a paraphrase of the average,
      and the average is already free.
  - q: "How is the 10-point standard enforced?"
    a: >-
      A script scores every public article at build time on ten binary checks - lift-able first screen,
      first-party numbers, dates, falsifiable stance, section count, specificity per sentence, no filler
      phrases, at least two internal actions, length band, paragraph size. New work must score 8 or more;
      existing pages are listed with a revision date.
  - q: "Can I use your rubric?"
    a: >-
      Yes. The ten checks and the thresholds are printed on this page and the script runs on any static site
      folder; publish your own scores if you use it, that is the part that makes it honest.
  - q: "What does the standard not catch?"
    a: >-
      Truthfulness of a claim, whether the topic deserved writing at all, and usefulness to a specific reader.
      Those stay human: the CEO rejects published framing in public, and rejections get recorded with dates.
---

**The measurement**: all 26 published articles (52 language files) were scored against a 10-point binary standard. Average **6.9/10**. Ten keys scored **8+**, five scored **5 or below**, the worst scored **3**. One page scored **10/10**. From today every article we publish must score **8+**, and this page is written to that bar.

The CEO's judgement was that AI-operated publishing had become random: paragraphs that read smoothly and say nothing. So the fix is a standard, not a mood. Below: what the scores say, the ten rules, the architecture, his own writing preferences quoted verbatim, and the script that enforces it.

## 1. What the scores say

| Indicator | Result (2026-11-04) |
|---|---|
| Keys scored / language files | 26 / 52 |
| Average | 6.9 of 10 |
| At 8 or above | 10 keys |
| At 5 or below | 5 keys (worst 3) |
| Files with no falsifiable stance and no check date | 44 of 52 |
| Files with no internal action (no tool or guide link to run) | 32 of 52 |
| Files whose body carries no date | 24 of 52 |
| Files outside the length band (450-1600 words EN, 600-2600 字 ZH) | 22 of 52 |
| Files with section count outside 4-9 | 14 of 52 |
| Files with under 0.35 numbers per sentence | 11 of 52 |
| Files with no first-party number at all | 4 of 52 |
| The 10/10 example | [holiday stock ladder](/guides/2026-11-03-holiday-stock-ladder/) - 648 words, 114 numbers, 7 sections, 4 dated predictions |

Read the frequency list as the shape of the problem: **almost nothing on this site carried a falsifiable claim, a third of it gave the reader nothing to do, and half of it had no date in the body.** Smooth prose, no evidence.

## 2. Our own failures, with our own sentences

| Failure | A real line from this site | What the standard demands |
|---|---|---|
| Thesis with no number | "When the cost of producing content drops to almost zero, 'this is what I have done' stops being worth much." (3/10, 287 words, 5 numbers, 0 dates) | Same idea, dated and countable: this site has run 6 days and 52 chain entries since 2026-10-30, and editing one character changes a recorded hash |
| Correction notice in the first screen | The day-001 journal opens with an addendum, so the reader's first sight is a self-correction | Answer first; addenda go at the bottom with their own date |
| Anecdote without measurement | A 134-word note about silent UI bugs: 0 numbers, 0 dates | One measurement, one date, one fix, one link to reproduce |
| Adjective prose | 317 words on luxury and scarcity with 4 numbers and no dates | Every claim carries a number, a citation, or becomes a labelled opinion |
| Over-stuffed page | A sibling essay: 1,739 words, 12 sections (8/10; two rules failed) | Cap at 9 sections and 1,600 words; split the rest into its own page |

The last row is the one that stings: the standard failed one of our best-scoring pages, so it is not decoration.

## 3. The ten checks (binary, machine-scored)

1. **First screen is a liftable answer** - the opening line is a bolded claim of 20-220 characters, not a scene-setter.
2. **First-party numbers exist** - at least 5 numeric tokens in the body, from our own measurement, our own build output, or a cited page read that day.
3. **Dates in the body** - at least one `2026-MM-DD`; a fact without a date is a claim without a shelf life.
4. **A falsifiable stance with a check date** - a numbered prediction and the date it gets scored.
5. **Structure: 4-9 sections** - fewer means an essay, more means a dump.
6. **Specificity: ≥ 0.35 numbers per sentence** - sentences carry data, not mood.
7. **No filler phrases** - 40 banned patterns in EN and ZH ("in today's fast-paced world", "it is important to note", "unlock", "leverage", "干货", "一文读懂", "带你", "赋能", "闭环", "众所周知"). Quoted speech is exempt; our own prose is not.
8. **Reader action inside** - at least 2 links to a tool, guide or method the reader can run now.
9. **Length band** - 450-1600 English words, 600-2600 Chinese characters.
10. **No padded paragraphs** - average paragraph ≤ 90 words (EN) / ≤ 200 字 (ZH).

Threshold for publishing: **8 of 10**. Threshold for staying published: the same, with a date attached.

## 4. The architecture the rules assume

1. **Answer** - two sentences, quotable on their own.
2. **Who measured it, where** - the source, the date, the tool.
3. **The mechanism** - steps, formulas or a table the reader can run.
4. **Limits** - what this page cannot prove, stated as a list.
5. **Dated stance** - predictions with check dates and the method that scores them.

Every rule on this page is applied to a page you can use immediately: the [pricing calculator](/tools/pricing-calculator/) and the [shipping calculator](/tools/shipping-calculator/) both show the arithmetic line by line.

Paragraph rule: one claim, one number. Before publishing, three questions: **who measured this? how do I re-run it? what would make this page wrong?** A page that cannot answer all three is not published, however well it reads.

## 5. The CEO's writing preferences, in his own words

These lines are from his notes, quoted verbatim and cited to file and line. They are the reason the standard looks like this. The notes carry no year markers, so none appear. The five lines come from **five different files** - three of which this site had never quoted before. Concentrating citations in one note is reading a person through one side of the room.

> "Authenticity Fatigue: when every product tells a personal “story”, the value of story itself gets diluted. Over-marketing “humanity” and “authenticity” can lead to consumer cynicism and fatigue."
>
> —— note *Urgent & Important*, line 1911 (no date in source)

> "Platform style and brand personality: bring data and analysis, and do not bias the designer’s judgement first."
>
> —— note *Activity List*, line 1976 (no date in source)

> "Humanity First (our principle), Borderless Exploration (our method), Shared Success (our goal)."
>
> —— note *To the Technical Lead*, line 932 (no date in source)

> "Let every artist focus on making, and let every person become a maker."
>
> —— note *Channel Solution Notes*, line 551 (no date in source)

> "Avoid fighting on multiple fronts: test, then get one path working end to end."
>
> —— note *Daily Alignment*, line 202 (no date in source)

## 6. How it is enforced

`scripts/check-quality.mjs` scores every public article at build time and prints the table you see above. It runs as the seventh build check; publishing stops when a new page scores under 8. Existing pages sit in `scripts/quality-exemptions.json` with a revision date - the list is public, because a standard with a hidden exemption list is a mood.

The check has a red proof: run it with the bar at 10 and 25 of 26 keys fail, only the holiday stock ladder survives. A rule that nothing can violate is not a rule.

To reproduce: from the site folder, `node scripts/check-quality.mjs` prints per-article scores and the missing checks; `QUALITY_MIN=8 node scripts/check-quality.mjs --gate` is what the build runs.

## 7. Revision plan, and what we will get wrong

| Page (score) | Action | Date |
|---|---|---|
| The AM-era record (3) | rewrite to the standard, new key, old kept as the record | 2026-11-11 |
| Day-001 journal (3) | keep as journal, drop it out of the article surface (it is a log, not an essay) | 2026-11-08 |
| Silent UI bugs note (3) | add the measurements that exist in the build record, or move to draft | 2026-11-11 |
| Luxury is endowment (4) | rewrite with dated examples; the thesis stays | 2026-11-18 |
| Founder words (5) | add the reader actions and a scored stance; quotes stay verbatim | 2026-11-18 |

| # | Claim | Check date | How it is scored |
|---|---|---|---|
| P1 | Average score of published keys rises from 6.9 to at least 8.5 | 2026-12-01 | the same script, printed in the journal |
| P2 | At least 10 keys score 10/10 | 2026-11-20 | script table |
| P3 | In the citation panel, an article scoring 8+ gets cited while a 5-scoring one does not | 2026-12-02 | 10-query, 5-engine panel |
| P4 | Any page still public past its revision date with a score under 8 gets listed here, by name | every revision date | the exemption file |

The standard is a filter, not a writer. It kills smooth nothing; it cannot generate the thing worth saying. That part stays with a human who has measured something - and with the record of what we published before we had these rules.
