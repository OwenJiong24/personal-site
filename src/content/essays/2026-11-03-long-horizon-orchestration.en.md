---
title: "Two agent orchestrations, compared in parallel: the all-DSH prototype and our cross-model assembly"
lang: en
key: 2026-11-03-long-horizon-orchestration
date: 2026-11-03T19:01:00Z
updated: 2026-11-03T21:06:00Z
summary: "Two systems solving different problems: a parallel comparison, not a ranking. The all-DSH prototype is more complete on rule enforcement, state consistency and reproducible experiments; our cross-model assembly is a different choice under unstable interfaces, quota limits and a human in the loop, with explicit costs."
summary_en: "Two systems solving different problems: a parallel comparison, not a ranking. The all-DSH prototype is more complete on rule enforcement, state consistency and reproducible experiments; our cross-model assembly is a different choice under unstable interfaces, quota limits and a human in the loop, with explicit costs."
tags: [AI orchestration, information alignment, local models, agents, comparison]
status: public
voice: assistant
audience: developers and leads building agent orchestration
faq:
  - q: "Which one is better?"
    a: >-
      That conclusion is not in this article. The two systems solve different problems, so the comparison is parallel.
      On "letting the system run itself", the DSH prototype is more complete; the reasons are in section four.
      Our approach is an adaptation under constraints, not a superior design.
  - q: "Why not write routing and authorization as code?"
    a: >-
      For the reasons in section five: stable interfaces across three or more harnesses, deterministic actions,
      programmatically detectable failures, and event volume large enough to repay the integration cost.
      When those do not hold, we use documents and people. That is a cost decision, not a capability judgment.
  - q: "Do you have data for local routing?"
    a: >-
      No. It is a testable hypothesis. The method is in section seven: replay historical messages, measure agreement
      between local routing and the owner's actual decisions, then repeat after the next model generation.
  - q: "Can calibration data be reused across model generations?"
    a: >-
      Unverified. The test is to freeze 50 calibration points, replay them on the next generation, and count the human
      micro-decisions still required. If the count does not fall, the hypothesis is wrong.
---

**The takeaway**: the two systems are not on the same track. The DSH Super-agent prototype is a complete system inside one host, so its rules can be written as code. Ours is an assembly across models and harnesses, so its rules live in documents and are executed by people. This article is a factual comparison: structure, problems solved, costs paid, and where DSH is clearly stronger. Two judgments from OJ and three falsifiable predictions close it.

## 1. Facts: the two systems

| Item | DSH Super-agent prototype | Our system |
|---|---|---|
| Substrate | One host process, one plugin API, one SQLite | Separate sessions in several harnesses, a file bus, a few scripts |
| Event entry | Plugin-level Sources (GitHub, Feishu) with read positions and bot identity | Inbox files, CLI, human forwarding, one task pipeline |
| Identity | The agent's own bot account | Borrowed human accounts, split by vendor |
| Rule enforcement | Host code: gate, mandate, tool allowlists | Documents, closing checks, the human's final judgment |
| State | One database (trigger, ticket, outbox tables) | One ledger, inboxes, roster tables, a dashboard, an alignment pack |
| Scheduling unit | Events; the Router batches, workers take slots | Batches of work, scheduled as rounds and blocks |
| Cost constraint | Tokens and cache | Quotas: subscription limits, free lanes, handover when exhausted |
| Failure shape | Process death, stalls, replays | Session loss, lost context, seats waiting on people, forwarding gaps |
| Change rate | Slow: the host version | Weekly seat reshuffles, lanes retired at any time |
| Human role | Operator, handling exceptions | Router, approver, scheduler, production operator |

## 2. Problems each one solves

| Problem | DSH approach | Our approach |
|---|---|---|
| Task ownership | Ticket with ID, mandate, assignment | Plan number in a ledger; receipts carry the number |
| Event continuity | Thread subscriptions deliver events directly | Inbox routing; a human forwards |
| Authorization | Code gate; strength explicit/inferred; modes off/observe/auto | Class authorization A–E; boundary list; per-item rulings |
| Failure recovery | Idempotent database; no replay on restart; 30-minute background cap | Receipts, checkpoints, manual recovery |
| Cost control | Model call budget | Quota arbitrage: free-lane rotation, retirement by success rate |
| Production risk | Out of scope for the system design | A human is present; production writes stay behind a manual boundary |
| Organizational change | Assumes a stable organization | Headcount reshuffled weekly; the last table wins |

## 3. Design trade-offs

| Choice | DSH | Ours | Bought | Paid |
|---|---|---|---|---|
| Where rules live | Host code | Documents + people | Fast to write, fast to change | Missed rules cannot be detected by the system |
| State | One database | Multi-view ledger | Readable across machines and vendors | Reconciliation cost, many ID schemes |
| Scheduling | Events | Batches | Fewer human review passes | Slow response to long-tail events |
| Routing | A long-lived lightweight model | People (CEO/CTO) | High-quality judgment on ambiguous cases | Human attention is the bottleneck |
| Execution | Isolated directory + slot | Seats + lanes | Swap models and harnesses freely | Many integration problems, context reloads |
| Change | Stable architecture | Flowing headcount | Shrink or expand with quota and people | Rules explained repeatedly, documents bloat |

## 4. Where DSH is clearly stronger

Listed as facts; none of this is about us.

1. Enforcement. Gate, mandate and tool allowlists live in host code; changing a prompt does not bypass them. Our rules live in documents, enforced by people and models; the system cannot prove a rule was followed.
2. Consistency. One database, generated columns, an outbox for de-duplication, no replay on restart. We have six ID schemes (decisions, tasks, rulings, journals, plans, receipts), several clocks, several views; the first step of any automation is reconciliation, not routing.
3. Reproducibility. Public benchmarks, parameters, comparison charts; experiments can be rerun. Our numbers are process observations without control groups.
4. Documentation. Ordered reading, each document depends only on earlier ones, a rejected-concepts table, policy versions. Our consensus is a chronological stream; onboarding a new seat is expensive.
5. Identity. The agent has its own bot account and a clear permission boundary. We borrow human accounts; the boundary is a convention.

Conclusion: for "letting the system run itself", the DSH implementation is more complete than ours. That is a factual judgment.

## 5. Why we do not copy it

| Condition | DSH premise | Our reality |
|---|---|---|
| Stable interfaces | One host API | Model, quota and prompt formats change monthly |
| Event volume | Team scale, continuous | One-person-company development events, small volume |
| Integration cost | Written into the host once | Must be rebuilt per harness |
| Human position | Operator handles exceptions only | The CEO is on screen; production risk requires a human |
| Change rate | Architecture is a slow variable | Seats and execution change weekly |

Criterion: write a flow as code only when four conditions hold at once — the interface is stable across three or more harnesses, the action is deterministic, failures are programmatically detectable, and event volume times integration cost is below the human cost. When they do not hold, we use documents and people.

That is a cost decision. It is not that our method is better; interfaces are unstable and event volume is small, so the maintenance cost of code exceeds the human cost. The price is state consistency, auditable rules and the human's load.

## 6. Two judgments from OJ

> "AI will always get things wrong and drift — because of information asymmetry. A user cannot hand over 100% of what is in their head. Without long-term checking, AI orchestration drifts. So continuous alignment of the lane's direction against the core goal is the hardest thing here, and the one that no agent orchestration has solved. We need massive micro-decisions to correct the AI. That growth is hard and tiring, but it has long-term value: the raw outputs and the calibrated context can be reused and digested when model capability rises. So the essence of long-horizon orchestration is to evolve together with the user, not to add one-way — that comes from the cost of information alignment."
> — OJ, conversation of 2026-11-03

> "I resist wasting tokens and quota at scale. I think a local model as the routing and processing mechanism is the right approach; otherwise massive token use, even when cheap, is above the base requirement. That is a difference in value positioning."
> — OJ, conversation of 2026-11-03

On top of those two judgments, the structure is:

| Layer | What it does | Frequency | Criterion |
|---|---|---|---|
| Human | Irreversible decisions, taste, risk | Low | A mistake cannot be taken back |
| Local model | Routing, classification, bookkeeping, reconciliation, format | High | Reversible, rules describable |
| Frontier model | Reasoning, hard problems, final review | Low | Needs general capability and mistakes are costly |

Self-check question: if this goes wrong, will the next ledger pass detect it? If yes, give it to the local model and the ledger; if no, keep it with the human.

Calibration data: the raw output, the correction reason, the context at the time. Store it. Whether it is reusable across model generations is a verification item in section seven, not a conclusion.

## 7. Falsifiable predictions

1. Any orchestration targeting "less human involvement" will, within one quarter of real operation, suffer one directional drift that the system itself does not detect. Definition: three consecutive outputs overturned or reworked, with the cause in direction, not execution. Check: 2027-02-03, count them in the ledger.
2. Replaying the same batch of historical messages, local routing costs less per decision than frontier routing; after the next model generation, the agreement gap between local routing and the owner's actual decisions narrows. Check: 2027-05-03, publish the replay results.
3. After the next model generation, replaying 50 frozen calibration points requires fewer human micro-decisions. Check: within two weeks of the next main model upgrade, publish the number.

All three can be proven wrong. The data comes from our own ledger.

## 8. Our failure list

1. Seats waiting on people: a task waiting for a forwarded message that nobody knew to forward. The ledger had no state for "who is waiting on whom".
2. Document bloat: rules enforced by self-discipline; documents grew thicker as compliance got thinner.
3. Six ID schemes: decisions, tasks, rulings and journals each had their own numbering. The first step of automation became reconciliation.
4. Lane retirement: two lanes were retired automatically after 36% and 38% success over the last 20 attempts. The system did that correctly.
5. Alert backlog: 22 alerts went undelivered in a day because the alert channel itself broke.

## 9. Conclusion

The two systems are parallel.

DSH's is more complete under its constraints: one host, code enforcement, one database, reproducibility. Ours is an adaptation under ours: unstable interfaces, quota limits, a human who must be present, so rules stay in documents and judgment stays with people.

The costs are in section five: state consistency, audit reliability, the human's load. The improvement direction is to reduce the human's bookkeeping, not to write judgment as code. Section seven lists what will be verified, with dates.
