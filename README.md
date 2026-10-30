# 个人站（owenjiong.com）

AM 时代的公开工作记录：名片 + 博客 + 每日开发日志。Astro 5 静态站，GitHub 源码，Cloudflare Pages 托管。

## 本地跑起来

```bash
pnpm install     # 首次
pnpm dev         # http://localhost:4321
pnpm build       # 构建前先过内容门禁，产物在 dist/
pnpm preview     # 预览构建产物
```

## 写作与发布流程（唯一路径）

1. 新建 `src/content/<分区>/<UTC日期>-<短标题>.md`（分区：`journal` 开发日志 / `insights` 洞察 / `work` 项目）。
2. frontmatter 必填 `title / date / summary`，`status` 先写 `draft`。
3. 本地 `pnpm dev` 看效果。**公开前由 CEO 过目**（内容以第一人称写，助手代笔的段落要本人认可）。
4. `status: public` → `pnpm build`（含红线检查，命中密钥/内网地址/明文口令/非公开邮箱会中断）→ `git push`。
5. Cloudflare Pages 检测到 push 自动构建上线。

`date` 一律写 UTC，带 `Z` 后缀。补记在正文首行写「补记」。

## Cloudflare Pages 设置（首次部署）

- Project 指向本仓库（私有仓库用 GitHub 集成授权）。
- Build command: `pnpm run build` · Build output directory: `dist`
- 环境变量：`NODE_VERSION = 22`；`PUBLIC_SITE_URL = https://<项目>.pages.dev`（正式域名后改成 `https://owenjiong.com`）
- 域名：先给 `.pages.dev` 预览；买好 `owenjiong.com` 后在 Custom domains 添加，Cloudflare 自动配 DNS 与证书。
- 响应头（安全基线，放 `public/_headers` 之前先在 Pages 配）：构建产物全静态，无需 D1/Workers。

## 目录约定

- `src/content/` 全部文字内容（唯一需要日常改动的地方）
- `src/lib/site.ts` 署名、锚点、区块定义（改身份/联系方式只改这里）
- `src/styles/tokens.css` 从本机 `ui-toolkit/tokens.css` 同步的 A 集值（真源改了按此同步，不在站点里发明新值）
- `scripts/lint-content.mjs` 发布红线检查
- `src/pages/chain.json.ts` 机器可读记录链（外部核对入口）

## 设计

一套 token，A 集（Rylo，暖奶油底 + 暖近黑 + 品牌蓝），暗色是正交轴。
组件禁止裸 hex；中文正文行高放宽到 1.75（长文阅读需要，属对 A 集英文 UI 行高的有意偏离）。

## 一键发布（本机）
``powershell
.\scripts\deploy.ps1   # 构建 → 过红线 → 上传到 Cloudflare Pages（项目 jiong）
`` 

需要本仓根目录有 `.cf-token`：在 Cloudflare 面板 My Profile → API Tokens → 用模板 **Edit Cloudflare Pages** 建一个（只含 Pages:Edit 权限），粘进文件保存。该文件在 .gitignore 内，不进仓库、不在命令行里传。
