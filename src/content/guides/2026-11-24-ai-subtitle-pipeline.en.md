---
title: "A subtitle pipeline that catches what AI translation misses"
lang: en
key: 2026-11-24-ai-subtitle-pipeline
date: 2026-11-24T12:00:00Z
audience: translators, video editors, developers who localise episodic video
summary: "An episode can have perfect-looking subtitle files and still be unusable. Three measured failures — term drift, timeline drift, and untranslated signs — need a glossary, a baseline, and a mandatory audit, not a better prompt."
tags: [guide, subtitles, translation, tooling, open-source]
status: public
voice: assistant
faq:
  - q: Is this a machine-translation service?
    a: >-
      No. It is a local-first workflow of small scripts that run on subtitle files
      you already have. The translating is done by you or by whatever AI assistant
      you use; the pipeline supplies the glossary, timeline baseline, and audit
      that stop the result from drifting.
  - q: Why not just translate the .srt in one pass?
    a: >-
      A single pass handles lines, not series consistency. In the measured case
      the first line was only 3 seconds off but the median drift was 27 seconds,
      and a duplicate name collapsed two characters into one rendering. Neither
      shows up in a line-by-line review.
  - q: Do I need ffmpeg?
    a: >-
      Only for the audio-onset sync check and track enumeration. Every other
      script is plain Python 3 reading text files. Nothing is uploaded.
  - q: Can I use it for languages other than Chinese?
    a: >-
      Yes. The coverage check defaults to a CJK script range but accepts a Latin
      mode, and the glossary is just a term table in your target language. The
      methods — baseline, dedup, tag-preserving splice, audit — are language-agnostic.
---

A subtitle file can be mounted, visible, fully translated — and still be
unusable. The fix is not a better prompt. It is a locked glossary, an explicit
timeline baseline, and one audit that must pass before delivery.

I built this after a real failure that took several rounds to diagnose. The
result is an open-source skill: [github.com/OwenJiong24/ai-subtitle-pipeline](https://github.com/OwenJiong24/ai-subtitle-pipeline).
The README and full docs are in English; a Chinese overview is included as an
optional extra.

## The three failures, with numbers

**1. Terminology drift.** With no locked term table, the same name is coined
again in each episode. In the case study, two similarly named characters ended
up with the same target rendering, which broke a joke that depends on the
difference. The automated term check now reports a mismatch rate; the target is
≤5%, and after a clean re-translation it was 0%.

**2. Timeline drift.** The subtitle file and the video came from different edits
of the same work. The first line was offset by 3 seconds — close enough to look
fine. The median offset across the episode was **27 seconds**, with outliers to
50 seconds, and drift was piecewise constant rather than linear. Checking the
first line is not a sync test. The audio-onset check now measures the median of
`onset − subtitle_start` using only lines preceded by 0.4 s of silence; a
healthy reference episode measured +0.32 s, and the repaired episode +0.25 s.

**3. Untranslated stylized text.** An animated location sign was repeated 1564
times with tiny position changes. The main dialogue translator skipped it
because it was not a dialogue style. Deduplicating by text collapsed it to seven
unique phrases; a style-preserving splice then translated all 1564 lines without
touching a single `\an8`, `\pos`, or `\fscx` tag.

## The structure that fixes them

| Failure | Artefact | Gate |
|---|---|---|
| Term drift | Locked glossary, looked up before translating | `term_check.py`, ≤5% mismatch |
| Timeline drift | Written baseline per episode | `audit_align.py` + `strict_sync.py`, ±1 s |
| Stylized loss | Dedup by unique text | `style_dump.py` + `style_splice.py` |
| Any of the above | One pre-delivery audit | `audit_episode.py`, 0 hard failures |

The audit also caught a fourth bug that made an episode look broken: an invisible
player-compatibility banner had its `\fscx0\fscy0\clip` tags dropped during
translation, so a 90-point white notice covered the screen for ten seconds.
The fix keeps such banners untouched; a repair script handles files already
generated.

## A testable claim

I claim that a mandatory objective audit catches more delivery failures than
careful manual review on a series of 20+ episodes. Check date: 2026-12-24.
Method: take any episodic localisation project you have already finished, run
`audit_episode.py` on each episode against its video, and count episodes with at
least one hard failure that were previously called done. If the count is zero
across your sample, the claim did not hold for your workflow — publish that
result too. I will report my own count at the check date whether or not it
favours the claim.

## Get it

The repo is public under MIT: [github.com/OwenJiong24/ai-subtitle-pipeline](https://github.com/OwenJiong24/ai-subtitle-pipeline).
Start with `docs/pipeline.md`, then `docs/calibration.md` and `docs/stylized-text.md`.
The case study in `docs/case-study.md` is deliberately anonymised — the method
is the point, not any particular work.
