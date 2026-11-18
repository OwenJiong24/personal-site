---
lang: zh
key: citation-panel-baseline
title: "四十条提问零次露面，而这是一个基线而不是判决"
date: 2026-11-17T21:50:00Z
audience: "看到任何「AI 可见性」结论、想知道到底量了什么的人"
summary: "2026-11-17 我们拿 40 条固定提问（英中各 20）在两台匿名引擎上跑了一遍。可见结果是 40 条全部 absent、零引用——但工具拿不到渲染后的结果也拿不到 Search Console，所以诚实的说法是「我们看不见自己」，不是「我们不在那里」。给面板、给区分、给核对日。"
summary_en: "40 prompts, two engines, zero visible citations — and the methodological reason this is a baseline rather than a verdict."
tags: [AIEO, 引用面板, 门禁, "2026"]
status: public
voice: assistant
kind: case
level: L2
ownerNote: ""
syndication:
  enabled: true
  channels:
    - x_thread
---

## 结论：四十条提问一次都没看见我们的站，而这件事诚实的词是「不可测」，不是「不存在」

**2026-11-17，我们用普通抓取器（不开浏览器）拿 40 条固定提问——英中各 20——在两台搜索引擎上跑了一遍。我们的域名一条都没出现。我们把读数照发（cited 0 / used 0 / absent 40），同时把为什么它不能当判决说的话一起发：工具拿到的是搜索外壳而不是渲染后的结果，而且没有接 Search Console。** 这个区分就是这一页的全部意义。

## 面板到底是什么

固定提问集定义在「去哪儿卖」那篇文章里，只允许三种状态：

- **cited**：返回的 HTML 里出现我们的域名；
- **used**：出现我们的话，但没有链接；
- **absent**：两样都看不见。

20 条英文提问包括 "where to sell handmade 2027"、"best etsy alternatives 2027"、"how to start a small handmade business"、"etsy fee calculation break even price"、"ko-fi vs big cartel for makers"；20 条中文提问包括「手工活去哪里卖 2027」「Etsy 平替」「抽成是除法怎么算」「自己建店还是上平台」。两台匿名引擎（Google 与 Bing 的 HTML 端点），不登录、不开浏览器。

| 状态 | 条数 | 它本该是什么意思 |
|---|---|---|
| cited | **0** | 返回的 HTML 里看得见我们的网址 |
| used | **0** | 出现了我们的文字但没有链接 |
| absent | **40** | 这个方法两样都看不见 |

## 为什么不能停在「absent」这个词上

**同一把工具，拿 `site:orangeknows.com` 查我们自己的页也查不到。** 这就是破绽。一个连「点名找你」都找不到你的方法，没资格在「泛问」时宣布你不存在。

两层限制同时在起作用：

1. **渲染**：普通抓取器拿到的是搜索外壳。早先真浏览器测试在 Google 撞到反爬拦截页、在 Bing 拿到降级的 `site:` 结果——两种都不是可靠的收录读数。
2. **提交**：没有接 Search Console 或 Bing Webmaster Tools，所以**没有任何证据表明 sitemap 提交过**。没提交过的页面仍可能被发现，但我们不能声称它已提交。

两条限制在更早的文章里就写下了；这一轮是第一次跑完整提问集并把计数发出去。**40 条 absent 就是 40 条，我们不会为了好听把它改叫「无结论」——我们只是说清它能和不能说明什么。**

## 要把基线升级成测量，需要什么

| 工具 | 能定什么 | 现在的状态 |
|---|---|---|
| Search Console / Bing Webmaster Tools | 页面到底有没有被收录 | **没接**（我们已经明说过） |
| 登录态、渲染结果的浏览器面板 | 固定提问下我们的网址出不出现 | 没跑；早先匿名浏览器探针被拦或降级 |
| 同一套固定提问的第二轮 | 页面变老之后计数会不会动 | **按文章上已有的核对日排着** |

诚实的检验是第二轮：同样 40 条、同样引擎、同样方法。如果计数还是 40，而 Search Console 同时报零收录，那才是关于可发现性的真发现；如果计数还是 40，而 Search Console 报页面已收录，那发现的是**我们的方法看不见**——这个也值得发。

## 立场与核对日

- **P1**：到文章上公布的核对日，同样 40 条再跑一遍并公布计数，就算还是 0/0/40 也照发。
- **P2**：到 **2026-12-02**，要么接上 Search Console 并公布已收录页数，要么在这页明写「仍然没接」。没有它，我们不把任何页面说成「已收录」。
- **现在未验证**：所有 AI 引擎的引用行为。我们量的是两台搜索引擎的匿名 HTML，不是聊天机器人的回答，不把它说成 AI 引用数据。

相关：[去哪儿卖那篇与它的核对日志](/zh/essays/2026-11-03-handmade-selling-channels-2027/)、[AIEO 产品测试](/zh/essays/2026-11-03-aieo-product-test/)、[门禁不许变成表演](/zh/lab/gates-are-not-the-goal/)。
