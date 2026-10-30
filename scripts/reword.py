#!/usr/bin/env python3
"""Rewrite this repo's commit messages to English-first (Chinese body line kept).

Why: the repository is public and its audience is English-speaking (Google, AI engines,
overseas makers). GitHub's file listing shows the subject line of each commit, so Chinese
subjects made the repo read as a Chinese project.

Usage (run from the repo root):
    git filter-branch -f --msg-filter "python scripts/reword.py" -- --all

Safety: filter-branch keeps a backup under refs/original/. After rewriting, rebuild and
redeploy, because every commit hash changes and the footer's `built_from` must point at a
commit that exists.
"""
import sys

MAP = {
    "个人站 v0.1：Astro 骨架 + 发布门禁 + 三条首批内容":
        "Site v0.1: Astro skeleton, publish gate, first three entries",
    "上线 jiong-bvw.pages.dev：修 slot/tokens 缺陷，加发布脚本与安全头":
        "Ship to jiong-bvw.pages.dev: fix slot/tokens defects, add deploy script and security headers",
    "记录本机发布与推送的可复用做法（deploy.ps1 / gh 凭据助手 / 线上地址 jiong-bvw）":
        "Document the repeatable local release and push procedure (deploy.ps1, gh credential helper)",
    "构建提交号注入改走 .ts 模块（Vite define 不进 .astro），deploy 脚本取号加固":
        "Move the build commit stamp into a .ts module (Vite define does not reach .astro templates)",
    "提交号注入走构建期环境变量（Astro 无顶层 define，哨兵值实测烘入生效）":
        "Inject the commit stamp via a build-time env var (Astro has no top-level define; verified with a sentinel)",
    "第 001 天日志加补记（域名未付款、上线地址实况）+ README 写清实况与本机推送坑":
        "Journal day 001: addendum on the unpaid domain and the live URL; README states real state and push quirks",
    "记录链纳入正文全文（实测：改一字链头变、还原可复现），文案与实现对齐":
        "Hash the full body into the record chain (verified: one character changes the head, revert restores it)",
    "线上内容对得上 Git 提交：页脚与 chain.json 烘入构建提交号":
        "Tie live content to git commits: stamp the build commit into the footer and chain.json",
    "中英双语上线 + AIEO 基建：hreflang 成对、BlogPosting/Person JSON-LD、llms.txt/llms-full.txt、robots 放行 AI 爬虫、单语双 RSS":
        "Ship bilingual i18n and AIEO base: hreflang pairs, JSON-LD, llms.txt/llms-full.txt, AI crawlers in robots, per-language RSS",
    "品牌落地 OrangeKnows（OK）：C 集定稿 + 几何 monogram + 五抽屉结构 + 正式域名":
        "Brand lands as OrangeKnows (OK): C-set tokens, geometric monogram, five drawers, real domain",
    "绑定正式域名 orangeknows.com 的外网验证与运维结论":
        "Bind orangeknows.com: external verification results and operations notes",
    "内容上线：三篇取自 CEO 本人笔记（中英各一）+ 全部页面补英文版":
        "Publish three essays from OJ's own notes (zh + en) and add English versions of every page",
    "新增 /guides 栏目：手作卖家实操指南（SEO/AIEO 主战场，带 FAQ 结构化）":
        "Add the /guides section: practical playbooks for craft sellers, with FAQ structured data",
    "英文默认改版 + 战略设计落盘 + 今日三篇 guides":
        "Switch to English-default layout, write down the site strategy, publish today's three guides",
    "双视角机制 + 免费工具线（能力×人群矩阵落盘）":
        "Dual-voice mechanism and the free-tools line; record the capability x audience matrix",
    "AGENTS.md：记下 git push 会假报 Everything up-to-date 的实测坑（须用显式 refspec + ls-remote 核对）":
        "AGENTS.md: record that git push can falsely report 'Everything up-to-date' (use an explicit refspec)",
    "README 改成英文为主 + 中文摘要（仓库公开化准备）":
        "README: English-led with a Chinese summary (preparing the repo to go public)",
    "公开化准备：AGENTS.md 转本地（不进公开树）、STRATEGY 内部引用中性化":
        "Go-public preparation: untrack AGENTS.md, neutralise internal references in STRATEGY",
    "Fix canonical/hreflang after the English-default switch; add a build gate":
        "Fix canonical/hreflang after the English-default switch; add a build gate",
}

BODY_KEEP = 3  # keep the first N Chinese body lines under the English subject


def main() -> None:
    raw = sys.stdin.buffer.read().decode("utf-8", "replace")
    lines = raw.rstrip("\n").split("\n")
    subject = lines[0].strip()
    body = [ln for ln in lines[1:] if ln.strip()]
    new_subject = MAP.get(subject)
    if new_subject is None:
        for zh, en in MAP.items():
            if subject.startswith(zh[:18]):
                new_subject = en
                break
    if new_subject is None:
        sys.stdout.write(raw)  # unmapped: leave untouched
        return
    out = [new_subject]
    if body:
        out.append("")
        out.extend(body[:BODY_KEEP])
    sys.stdout.write("\n".join(out) + "\n")


if __name__ == "__main__":
    main()
