---
title: 静态站的界面坏了不会报错
date: 2026-10-30T06:55:00Z
lang: zh
key: ui-bugs-silent
kind: 结论
summary: 今天三个界面故障，构建全部"成功"：正文没渲染、颜色全丢、双语 URL 变乱码。对策是把产物变成硬检查。
summary_en: "Three UI failures today, all of them 'successful' builds. Fix: assert on the build artefacts."
tags: [工程, Astro, 质量门禁]
status: public
---

**结论**：静态站的界面故障**不会让构建失败**，所以构建后必须检查产物本身，不能只看构建退出码。

今天实测三例：布局插槽写错 → 正文整块不渲染，构建绿；样式文件漏 import → 整站颜色失效，构建绿；
内容加载器吃掉文件名里的点 → 双语 URL 变成 `…checklisten`，构建绿。

对策（已落地）：`scripts/check-css.mjs` 在构建后断言产物 CSS 里必须存在 token 定义与暗色轴，缺了就构建失败；
URL 与语言不再从文件名推断，改由 frontmatter 显式声明。

推论：**任何"看起来正常就没事"的检查都是没有检查**。凡是在意结果的环节，都要有一个能失败的断言。
