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
4. `status: public` → 先 `git commit` 再发布：`.\scripts\deploy.ps1`
   （脚本依次做：构建（含内容红线检查 + CSS 自检）→ 把当前提交号 `GIT_SHA` 烘进页脚与 `/chain.json` → `wrangler pages deploy` 直传 Cloudflare Pages）。
5. 线上地址：**https://jiong-bvw.pages.dev**（Cloudflare 免费子域名；`jiong.pages.dev` 已被他人注册，所以带 `-bvw` 后缀）。

`date` 一律写 UTC，带 `Z` 后缀。补记在正文首行写「补记」。
线上页脚写的「构建自 xxxxxxx」就是产生这份内容的提交号：先提交再发布，两者才对得上。

## 线上与域名现状

- 托管：Cloudflare Pages 项目 `jiong`，**直传部署**（本机构建 → 上传 `dist`），不是 Git 自动构建。
- 站点地址在 `astro.config.mjs` 的 `site`（可用环境变量 `PUBLIC_SITE_URL` 覆盖）。
  canonical、RSS、站点地图、robots 都跟着它走。
- 部署凭据：优先读本仓根目录的 `.cf-token`（只给 Cloudflare Pages:Edit 权限的 API Token，已在 .gitignore 内）；
  文件不存在时用本机 `wrangler login` 的登录态。
- 以后绑 `owenjiong.com`：在 Pages 项目的 Custom domains 添加域名，Cloudflare 自动配 DNS 与证书；
  然后把 `astro.config.mjs` 的 `site` 改成 `https://owenjiong.com` 再发一次。
- 想要「push 即上线」：在 Pages 面板把项目改成 Git 集成（Build command `pnpm run build`、输出目录 `dist`、
  环境变量 `NODE_VERSION=22`），并给 `pnpm-workspace.yaml` 里已声明的 esbuild/sharp 构建脚本留好许可。

## 本机推送的坑（这台机器实测）

`git push` 会**静默失败**（凭据助手要读 Windows 钥匙串，子进程被拦，没有报错输出）。可用写法：

```powershell
$env:GH_TOKEN = (gh auth token)
git -c credential.helper='!gh auth git-credential' push origin main
git ls-remote origin refs/heads/main   # 必须核对远端确实前进，别只看退出码
$env:GH_TOKEN = $null
```

## 目录约定

- `src/content/` 全部文字内容（唯一需要日常改动的地方）
- `src/lib/site.ts` 署名、锚点、区块定义（改身份/联系方式只改这里）
- `src/styles/tokens.css` 从本机 `ui-toolkit/tokens.css` 同步的 A 集值（真源改了按此同步，不在站点里发明新值）
- `scripts/lint-content.mjs` 发布红线检查 · `scripts/check-css.mjs` 构建后 CSS 自检 · `scripts/deploy.ps1` 一键发布
- `src/pages/chain.json.ts` 机器可读记录链（外部核对入口）

## 设计

一套 token，A 集（Rylo，暖奶油底 + 暖近黑 + 品牌蓝），暗色是正交轴。
组件禁止裸 hex；中文正文行高放宽到 1.75（长文阅读需要，属对 A 集英文 UI 行高的有意偏离）。

## 一键发布（本机）
``powershell
.\scripts\deploy.ps1   # 构建 → 过红线 → 上传到 Cloudflare Pages（项目 jiong）
`` 

需要本仓根目录有 `.cf-token`：在 Cloudflare 面板 My Profile → API Tokens → 用模板 **Edit Cloudflare Pages** 建一个（只含 Pages:Edit 权限），粘进文件保存。该文件在 .gitignore 内，不进仓库、不在命令行里传。

## 双语与 AIEO（2026-10-30）

- 中文主语言在站点根，英文在 `/en/`；文案表在 `src/lib/i18n.ts`，加新页面用 `ui[lang]` 取词。
- 文章双语：frontmatter `lang` + `key`（同 key = 同一篇文章），文件如 `2026-10-30-aieo-checklist.zh.md` / `.en.md`。
- 机器可读：`/llms.txt` 索引、`/llms-full.txt` 全文、`/chain.json` 记录链、`/rss.xml`(zh) 与 `/en/rss.xml`(en)。
- 结构化数据：首页 Person + WebSite，文章页 BlogPosting（含 `datePublished`、`dateModified`、`workTranslation`、链上摘要）。
- `robots.txt` 逐条放行主流 AI 爬虫（清单在 `src/pages/robots.txt.ts`）。
