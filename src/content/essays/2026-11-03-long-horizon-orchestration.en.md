---
title: "Long-horizon agent orchestration: co-evolve with the user, don't just add more"
lang: en
key: 2026-11-03-long-horizon-orchestration
date: 2026-11-03T19:01:00Z
summary: "Agents will always drift: the biggest information gap is in the user's head, not in the model. Long-horizon orchestration should turn every human micro-correction into reusable calibration data, and route high-frequency, low-cognition decisions to a local model."
summary_en: "Agents will always drift: the biggest information gap is in the user's head, not in the model. Long-horizon orchestration should turn every human micro-correction into reusable calibration data, and route high-frequency, low-cognition decisions to a local model."
tags: [AI orchestration, information alignment, local models, agents, falsifiable]
status: public
voice: assistant
audience: developers and leads building agent orchestration
faq:
  - q: "Does this contradict the advice to make AI more autonomous?"
    a: >-
      It points the other way. "More autonomous" usually means letting the model fill the gaps in intent by itself,
      and those gaps accumulate into directional drift over long horizons. This post argues for handing the uncertain
      parts explicitly to a person and a ledger, and the certain parts to a local model.
  - q: "Is a local model good enough to do the routing?"
    a: >-
      Unverified. What I offer is not "yes" but a testable path: replay historical messages and the actual decisions
      made by the owner, measure agreement between local and frontier routing, then compare the gap on the next
      model generation. Check date in section five.
  - q: "Why resist large token usage? Cheap tokens are a good thing, aren't they?"
    a: >-
      Because this is not a cost problem, it is a value-positioning problem. Routing, classification and reconciliation
      do not need general capability. Spending frontier tokens on them wastes money above the base requirement,
      even at a cheap unit price, and it also mortgages latency and privacy.
  - q: "Can calibration data really be reused across model generations?"
    a: >-
      That is a hypothesis, not a result. The test: freeze a set of calibration points, replay them on the next
      generation, and count the human micro-decisions still required. If the count does not fall, the hypothesis
      is wrong, and the next post will explain why.
---

**The takeaway**: agents will always drift, because the biggest information gap is in the user's head, not in the model. So the core of long-horizon orchestration is not more autonomy or more tokens; it is turning every human micro-correction into reusable calibration data, and routing high-frequency, low-cognition decisions to a local model instead of a frontier one. This is a record of how we treat correction as an asset rather than treating "less human involvement" as the goal — with tests, failures, and falsifiable predictions.

## 1. Two orchestrations, two value systems

DeepSeek Harness recently published a two-layer Super-agent prototype: a long-lived Router that only judges and dispatches, and Workers that act in isolated directories. I wrote about the design's clever parts elsewhere, so I will not repeat them. Its premise is what matters here: **it runs inside one host, with one plugin system, one database, and one identity tree, so its rules can be written as code.**

Ours is not like that. It is a patchwork across models and harnesses: one judges, one reviews, one executes, one gives a second opinion, a local model catches the rest. No shared host, no shared database, no shared clock. Seats are reshuffled every week; lanes are retired the moment their success rate drops below forty percent. All coordination runs on files, inboxes, and people.

That is not "a worse implementation". It is two different objective functions. Their goal is to make people disappear. Ours is to **make every human appearance carry information**.

> "AI will always get things wrong and drift — because of information asymmetry. A user cannot hand over 100% of what is in their head. Without long-term checking, AI orchestration drifts. So continuous alignment of the lane's direction against the core goal is the hardest thing here, and the one that no agent orchestration has solved."
> — OJ, conversation of 2026-11-03

## 2. Information asymmetry is structural, not a bug

A user cannot state 100% of their intent — sometimes they have not fully formed it. The model fills the gap with its own priors. Filling a gap is not fatal by itself; what is fatal is that **the gaps accumulate over a long horizon**: today it adds one assumption, tomorrow it builds on that assumption, and a week later the whole direction is off while every single step looked reasonable.

You cannot see it on short tasks. A one-afternoon job cannot drift far. You always see it on long ones: our seats idling while waiting for a human to forward a message, documents bloating until compliance gets thin, the same thing carrying six different ID schemes — none of those were execution errors. The direction had grown crooked in a corridor nobody was checking.

So "massive micro-decisions" is not inefficiency. It is the only correction mechanism that exists. Every "no, it should be like that" injects a piece of unspoken intent into the system. It is tiring — growth-tiring, not repetitive-work-tiring. It never ends, but every round brings the system closer to the thing in your head.

## 3. One-way addition vs co-evolution

This is the most essential dividing line I know.

**One-way addition**: more agents, more autonomy, more tokens, longer context. It assumes "not good enough because not enough". But when the cause of drift is intent rather than compute, adding only buys more output in the wrong direction. Marginal returns decrease, and can go negative.

**Co-evolution**: every correction closes a bit of the information gap; the calibrated output and its context stay in the ledger; when model capability rises, those artifacts can be re-digested into stronger defaults. Marginal returns increase.

| | One-way addition | Co-evolution |
|---|---|---|
| What you invest | Compute, context, agents | Human micro-decisions + calibration data |
| What is missing | Intent | Intent |
| Marginal returns | Decreasing | Increasing |
| Where compounding lives | Nowhere | Raw output + correction reasons, reusable across model generations |
| Failure shape | Silent errors at scale | Lapsed memory — re-readable, redoable |

In one sentence: **tokens cannot buy intent; corrections can accumulate it.**

This is also why we resist large token usage. It is not that we cannot afford it; it is that it is spent on the wrong thing. Every routing decision, classification, or format conversion consuming frontier tokens is general intelligence hired for a job that only needed rules and memory. **Even at a cheap unit price, it sits above the base requirement, because it is not what the task needs.**

## 4. Routing should be local: value positioning, not penny-pinching

Routing is high-frequency, low-cognition, format-stable judgment: whose queue does this message belong to, is this item a duplicate, which lane does this ticket enter. Every frontier dollar is spent on general capability, and this kind of judgment does not need general capability. It needs **familiarity with your rules, your preferences, and how you ruled last time**.

A local model routing gives four properties a frontier model cannot: call volume unbound by quota, content that never leaves the machine, always-on availability, and trainability on calibration data until it routes "like you".

So I fixed the three layers like this:

| Layer | What it does | Frequency | Criterion |
|---|---|---|---|
| Human | Irreversible decisions, taste, risk appetite | Low | A mistake cannot be taken back |
| Local model | Routing, classification, bookkeeping, reconciliation, format | High | Reversible, rules describable |
| Frontier model | Real reasoning, hard problems, final review | Low | Needs general capability and mistakes are costly |

The table has one self-check question: **if this thing goes wrong, will the next ledger pass detect it?** If yes, hand it to the local model and the ledger. If no, keep it with the human. That is more useful than "make AI more autonomous", because it asks "will the error be caught" before it asks "can AI do it".

That is where the flywheel is: human micro-decisions → calibration data → a local router that routes more like the person → freed time for more micro-decisions. The flywheel is slow to start because humans feed all of it at first. But it is the only path where **a stronger model makes you cheaper**, instead of "a stronger model makes you more dependent".

## 5. The testable part

I will not write opinions only. Three falsifiable claims, with check dates and methods:

1. **Directional drift**: any orchestration that targets "less human involvement" will, within one quarter of real operation, suffer one directional drift that the system itself does not detect. Definition: three consecutive outputs overturned or reworked, with the cause in the direction rather than the execution. Check: 2027-02-03, open this quarter's decision ledger and count them.
2. **Cost and quality of local routing**: replaying the same batch of historical messages offline, local routing costs less per decision than frontier routing; after the next model generation lands, the agreement gap between local routing and the owner's actual decisions narrows to an acceptable threshold. Check: 2027-05-03, publish replay results and agreement rates.
3. **Corpus reuse**: after the next model generation lands, replay 50 frozen calibration points and the number of human micro-decisions required falls. Check: within two weeks of the next main model upgrade, publish the number.

All three can be proven wrong, and all three come from our own ledger rather than any external statistic.

## 6. Our own counter-examples

Experience without failures is worth little. What we walked into over the past 40 days:

- **Seats idling**: a task waiting for a human to forward a message that the human did not know needed forwarding. The cause: "start" stayed with the human, and the ledger had no state for "who is waiting on whom".
- **Document bloat**: rules lived in prose and were enforced by self-discipline, so documents grew thicker as compliance got thinner. Root cause: bookkeeping had not been taken off the human, so documents were used to remind him.
- **Six ID schemes**: decisions, tasks, rulings, and journals each had their own numbering; the first step of any automation became reconciliation. In a cross-harness system, a unified ID is worth more than a unified router.
- **Lane retirement**: two lanes were retired automatically after 36% and 38% success over the last 20 attempts. That was the system doing something right — turning "model unreliability" from an incident into a state.
- **Alert backlog**: 22 alerts went undelivered in a day because the alert channel itself broke. Watching the watcher is another unsolved problem.

Each lesson points to the same conclusion: **codify the bookkeeping, not the judgment.** Free the human from bookkeeping so he has energy for judgment; write judgment as code and you only get a faster mistake.

## 7. Closing

The end state of orchestration is not "no people". It is **people only where it is irreversible, and everything else with the local model and the ledger**.

I will not pretend we have the answer: local routing quality is untested, corpus reuse is a hypothesis, and the human layer of the three-tier structure is still the heaviest. But the direction I am confident about: **let the system evolve together with you, instead of adding things to it one-way.** That sentence is harder to do than any architecture diagram, and closer to the problem itself than any architecture diagram I have seen.
