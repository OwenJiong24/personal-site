# OrangeKnows — the public record of Owen Jiong (OJ)

**Live site: <https://orangeknows.com>** · Chinese version: <https://orangeknows.com/zh/>

A static personal site built to accumulate trust over time: a daily engineering journal, essays,
practical guides for handmade / craft sellers, notes, projects, and free tools. Every entry is
timestamped in UTC and hashed into a SHA-256 record chain, so the record cannot be quietly rewritten
after the fact.

The premise: in an era when models generate convincing artefacts in bulk, the scarce proof is a
continuous, checkable human record.

> 中文摘要见文末「中文说明」。

## Stack

| Layer | Choice | Why |
|---|---|---|
| Site | [Astro 5](https://astro.build), static output | No runtime framework, no trackers; it must still build in ten years |
| Content | Markdown + content collections | Content is data, so the publish gate can check it |
| Hosting | Cloudflare Pages (project `jiong`) | Free tier, custom domain, edge delivery |
| Styles | Design tokens in `src/styles/tokens.css` | One brand source of truth; components use tokens, never raw hex |
| i18n | English at `/`, Chinese at `/zh/` | English is the default (global reach), Chinese serves the domestic market |

No JavaScript framework ships to the browser. The only inline script is the pricing calculator.

## Repository layout

```
src/content/        journal · essays · guides · notes · projects   (Markdown, bilingual)
src/pages/          English routes at root, Chinese under pages/zh/
src/pages/tools/    free static tools (no tracking, runs in the browser)
src/layouts/        base.astro (chrome, hreflang, footer chain head) · post.astro (article)
src/components/     Brand (logo monogram) · views · JSON-LD
src/lib/            site.ts (identity, the single config entry) · i18n.ts · trust.ts · build.ts
src/styles/         tokens.css (brand values) · global.css (brand grammar)
scripts/            lint-content.mjs (publish gate) · check-css.mjs (build self-check) · deploy.ps1
docs/STRATEGY.md    audience, positioning, BIMI plan, dual-voice writing rules
public/             _headers · _redirects · favicon · og.png
```

## Run it locally

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # content red-line gate → CSS self-check → dist/
```

`pnpm build` fails on purpose when public content contains credentials, host addresses, internal
identifiers, a non-brand email domain, `sensitive: true` together with `status: public`, a missing
summary, or a missing `lang` / `key` declaration. Do not work around the gate.

## Content model

Each article is one Markdown file per language. The two languages are paired by an explicit `key`,
never by file name: Astro's glob loader strips dots, so `x.en.md` becomes the id `xen` (measured, not
folklore).

```yaml
title: 需求自查九问
lang: zh            # zh | en
key: 2026-10-30-nine-questions   # identical across the two languages
date: 2026-10-30T07:58:00Z       # UTC, and not in the future (later dates get filtered out)
voice: assistant    # assistant (AI-assisted, disclosed on the page) | owner (written by OJ)
ownerRating: 4      # OJ's verdict 0-5; blank renders "Verdict pending"
ownerNote: 'Nine questions, four veto layers — this is the one I keep using.'
summary: '...'      # required for public entries
status: public      # draft stays out of the public build
```

### Dual voice (the house rule)

Narration and compilation are attributed to **the OK assistant** (AI-assisted) and labelled on every
article page. **OJ's own views enter only as blockquotes with a source line**, never blended into the
narration. Each article carries a **signed-off verdict**: a 0–5 rating plus a one-line quick comment
by OJ. Ratings are never invented on his behalf — a missing one renders as `Verdict pending` and the
build prints it as work to do.

The split is deliberate: a reader, and an AI engine, can tell which layer is human judgement and
which layer is compiled assistance.

## Trust machinery

- **Record chain**: SHA-256 over `prev | index | id | ISO date | title | body`; the newest head sits in
  the footer and the full chain is at [`/chain.json`](https://orangeknows.com/chain.json). Changing one
  character of a published body changes the head.
- **Build stamp**: footers and `/chain.json` carry `built_from`, the git commit the build came from.
- **Verification page**: [`/verify`](https://orangeknows.com/verify) states what the chain proves and
  what it does not prove (it is not a third-party timestamp; that is a known gap).

## AIEO / SEO

`hreflang` pairs with `x-default` on English; JSON-LD (`Person`, `WebSite`, `BlogPosting` with
`workTranslation`, `FAQPage` on guides); `/llms.txt` and `/llms-full.txt`; a sitemap with language
alternates; per-language RSS (`/rss.xml` English, `/zh/rss.xml` Chinese); and a `robots.txt` that
allow-lists search and AI crawlers by name. Measured effect: **unverified** — the site says so plainly
instead of asserting it.

## Publishing flow

1. Draft in Markdown with `status: draft`.
2. `pnpm dev`, read both languages.
3. OJ reviews and signs off (`ownerRating` / `ownerNote`).
4. Set `status: public`, commit, then `.\scripts\deploy.ps1` (build → gate → `wrangler pages deploy`).
5. Verify: the page returns 200, the `/chain.json` head moved, and `built_from` equals the pushed commit.

## Brand

`OrangeKnows` (`OK`), Chinese secondary name 橙知道, author `Owen Jiong` (OJ). Slogan:
*Ideas you can check.* / 「洞察，可核对。」 The monogram is a true circle `O` plus a 45° folded `K`
(`src/components/Brand.astro`). Token values come from one brand source of truth (the `ui-toolkit/`
C-set); this repository only mirrors them.

## Status and known gaps

Stated as facts, not marketing: DMARC is published at `p=none` (monitoring only), so BIMI is not
active; no VMC certificate has been purchased; the record chain has no third-party anchor yet; the
guides library is new and its search performance has not been measured.

## License

Source code here is published for transparency. Site content (text, brand, logo) is © Owen Jiong.
A formal code licence will be added; until then, ask before reusing the code.

---

## 中文说明

**线上地址：<https://orangeknows.com>**（中文站在 <https://orangeknows.com/zh/>）

纯静态个人站（Astro 5，Cloudflare Pages 托管），做**长期可核对的公开记录**：每日开发日志、洞察长文、
给手作卖家的实操指南、随记、项目与免费工具。每篇文章带 UTC 时间戳，正文全文进入 SHA-256 记录链——
发布后改一个字，页脚链头就会变，记录不能被事后悄悄改掉。

- **双视角写作**：叙述与整理署名「OK 助手」（AI 辅助，页面自动标注）；OJ 本人的观点**只以引用块进文并标出处**；
  文末固定「OJ 审定」位：0–5 分 + 一句话快速点评。助手不得代他编造评分，未打分就显示「点评待补」。
- **发布门禁**：`pnpm build` 前拦凭据、主机与入口信息、内部标识、非本站邮箱、`sensitive` 与 `public` 并存、
  缺 summary、缺 `lang`/`key`。命中即构建失败，不要绕过。
- **双语结构**：英文在根，中文在 `/zh/`；`hreflang` 成对、`x-default` 指英文；RSS 各自单语。
- **AIEO**：`/llms.txt`、`/llms-full.txt`、结构化数据（Person / WebSite / BlogPosting / FAQPage）、
  robots 逐条放行 AI 抓取。**效果目前未验证**，站上也这么写。
- **已知缺口**：DMARC 现为 `p=none`（仅监控，BIMI 未生效）、未购 VMC 证书、链头还没有第三方锚定。

品牌：OrangeKnows（OK）／中文「橙知道」／作者 Owen Jiong（OJ）；slogan：*Ideas you can check.*（洞察，可核对。）
