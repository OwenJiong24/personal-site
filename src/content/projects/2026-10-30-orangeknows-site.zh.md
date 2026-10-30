---
title: OrangeKnows 站点（这份记录本身）
lang: zh
key: 2026-10-30-orangeknows-site
date: 2026-10-30T21:50:00Z
stage: live
summary: 把这个站当产品做：双语静态记录 + 发布门禁 + 哈希链，无追踪。2026-10-30 建成，源码公开。
summary_en: "The site as a product: bilingual static record, publish gate, hash chain, no trackers."
tags: [astro, 静态站, 信任]
status: public
voice: assistant
---

**是什么**：你现在看的这个站，被当成一个产品来做，只有三条要求——**被找到、被核对、十年后还能构建**。

**怎么做的**
- Astro 5 静态输出，无运行时框架、无统计脚本、无 Cookie 横幅。
- 内容用 Markdown，显式声明 `lang` + `key`；中英两版用同一个 key 配对，不靠文件名推断。
- 每次构建前过发布门禁：凭据、主机与入口信息、内部标识、非本站邮箱、`sensitive` 内容、缺摘要、缺语言键——命中即构建失败。
- 每篇正文全文进 SHA-256 链；页脚显示链头与本次构建来自的提交号。
- 构建后三道自检：产物 CSS 里有 token、canonical 等于页面自身地址、hreflang 指向的译文页确实存在。

**证据**：源码在
[github.com/OwenJiong24/personal-site](https://github.com/OwenJiong24/personal-site)，链在
[`/chain.json`](/chain.json)，核对方法在 [`/verify`](/zh/verify)。

**还没做的**：链头没有第三方时间戳锚定、没有读者数据、搜索表现未测量。
