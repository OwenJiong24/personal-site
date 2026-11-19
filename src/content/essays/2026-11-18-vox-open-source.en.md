---
title: "I open-sourced my dictation tool. The hardest part was not the code."
lang: en
key: 2026-11-18-vox-open-source
date: 2026-11-18T23:00:00Z
summary: "On 2026-11-18 I published Vox, a Windows voice-dictation tool, as a public repository. The engineering was the easy half. The hard half was proving the release was clean: a real API key was once committed to history; personal hardware names and a domain-specific vocabulary were baked into prompts and tests. Here is the release checklist I actually ran, with the license constraint most people miss."
summary_zh: "2026-11-18 我把 Windows 语音输入工具 Vox 开源了。工程只是容易的一半；难的是证明发布是干净的：真实 API key 曾进过 git 历史、个人硬件型号和业务词表写死在 prompt 与测试里。这是我实际跑过的发布清单，以及大多数人会漏掉的许可证约束。"
tags: ["open-source", "engineering", "voice", "security", "2026"]
status: public
voice: assistant
---

**Conclusion**: shipping an internal tool as open source is not a `git push`. It is an audit whose deliverable is *evidence that nothing private left the building*. For Vox, the code was ready; the release took a secret scan, a zero-history repository, a text-only desensitization pass, and a dependency-license discovery that changed how the project describes itself.

On 2026-11-18 I published [vox-windows](https://github.com/OwenJiong24/vox-windows) — a Windows dictation tool: hold a hotkey, speak, release, and the text appears at the cursor. This note is about the release process, not the product tour.

## 1. The uncomfortable starting fact

An earlier project document recorded that a real cloud API key had once been committed in plaintext, then cleaned from git history. I did not take the document's word for it. I ran a pickaxe search over all commits for the key prefix and found the commit whose message literally says the history was rewritten. Whether or not any key survived, one conclusion was unavoidable: **publishing the existing repository with its history was not an option**.

So the release repository has no history at all. It is a fresh `git init`, one initial commit, 34 files. There is no ancestor commit that could carry an old secret. This is a deliberate trade: you lose the development story in the public repo, and you gain the ability to state, truthfully, that no historical blob was ever published.

## 2. What the secret scan actually found

Scanning the working tree against key patterns found nothing in the shipping code — but a broader audit found personal material that is not a "secret" in the credential sense and is exactly what leaked releases are made of:

- a developer name embedded in the default prompt;
- a specific GPU model hardcoded in a string that every user would see;
- a business-specific vocabulary (a cross-border-commerce tax term, three payment/company names) in the correction dictionary and in test fixtures;
- microphone model names from one person's desk in comments and tests;
- an absolute system-Python path from one machine in two launcher scripts.

None of these breaks the build. All of them tell a reader something about the author that the author did not choose to publish. I replaced each with a generic equivalent. The GPU model string became `NVIDIA GPU (CUDA)`; the prompt became a generic software-engineering sentence; the correction dictionary was rewritten around general dev terms.

**Rule of thumb**: a secret scan catches keys. A release audit must separately catch identity, hardware, and vocabulary. Those three are what turn an anonymous open-source project into a doxxing exercise.

## 3. The license constraint nobody expects

The source is MIT. I checked the installed dependency metadata rather than guessing, and two packages change the story for anyone redistributing a packaged build:

| Package | License | Why it matters |
|---|---|---|
| `zhconv` (Traditional→Simplified Chinese) | **GPLv2+** | Called as a library; a bundled binary may inherit GPL obligations |
| `pystray` (system tray) | **LGPLv3** | Dynamically imported; packaged builds must preserve notices and allow relinking |

The others are permissive (MIT / BSD / Apache-2.0 / PSF). I wrote a `THIRD_PARTY_NOTICES.md` that says plainly: the Vox source is MIT, but the aggregated work carries these two obligations. Calling the whole project "MIT" without that sentence would have been a small, plausible, wrong claim — the exact kind this site exists to catch.

## 4. The evidence checklist I ran

1. Full-history pickaxe for key prefixes → found a history-rewrite commit → publish with zero history.
2. Working-tree secret scan → no plaintext key in shipping files; real config (with encrypted keys) excluded from the release tree.
3. Identity/hardware/vocabulary pass → name, GPU model, business terms, mic names, machine path all replaced.
4. Diff the release tree against the verified source → only text changes, zero logic changes; the 115-test offline gate that passed on the source therefore still describes the release.
5. `git init` → one commit → push → verify with the remote API that the 34-file tree contains no `config.json`, no logs, no runtime state.

**Measured**: offline regression suite 115 passed / 0 failed; release syntax check all green; remote tree 34 files; sensitive files present = 0.

## 5. The useful structure

If you are about to open-source an internal tool, steal this decision table:

| Question | If yes | If no |
|---|---|---|
| Was any credential ever committed? | New repo, zero history | Keep history |
| Does code embed a name / hardware / customer vocabulary? | Text-only desensitization pass, then diff to prove no logic changed | Skip |
| Any GPL/LGPL dependency? | Ship notices; reconsider "MIT" wording | Say MIT plainly |
| Can you verify the *remote* tree, not just local? | Use the hosting API to list files after push | Do not claim clean |

The point is not that Vox is important. The point is that "open-sourcing" has a verifiable definition: the moment you can show the remote tree, the diff, and the license notices, you have actually done it — and until then you have only pushed code.

---

*This article was prepared with AI assistance and is pending the site owner's rating and one-line review.*
