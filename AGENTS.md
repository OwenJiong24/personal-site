# 本仓工作守则（给任何 harness / 模型）

这是 CEO 的个人公开站，公网可读。在这里干活按下面几条来。

## 发布红线（机器拦，不靠自觉）

`pnpm build` 前会跑 `scripts/lint-content.mjs`。公开内容里不得出现：

- 任何形式的凭据：令牌、密钥、私钥、明文口令、JWT
- 主机与入口：IP（含内网段）、面板/后台地址、SSH 入口、供应商控制台
- ZART 与客户的机密：客户名单、未发布的商业数字（营收/GMV/融资/合同）、内部架构细节、排期承诺
- 身份证级隐私：生日、住址、证件号、家属信息；公开署名用姓名拼音 + 角色 + 可核验锚点即可
- 非本站域名的邮箱（公开锚点只用 `@owenjiong.com`）

命中即构建失败。绕过它 = 事故，不是效率。

## 写作规矩

- 第一人称是 CEO 本人在说话。助手可以起草，**发布必须 CEO 过目**；不确定就留 `status: draft`。
- 时间一律 UTC（frontmatter 带 `Z`）。写完不事后修饰；补记标「补记」。
- 说实话：没做的不写「做了」，没跑过的写「仅计划」，判断错了在下篇写清怎么改的。
- 连续比精彩重要：短、具体、可核对，胜过修辞。

## 工程规矩

- 样式只用 `src/styles/tokens.css` 的变量，禁裸 hex。设计真源是本机 `ui-toolkit/`，不在站点里造第二套。
- 不加运行时框架、不加追踪脚本、不加 Cookie 弹窗。这站要十年后还能构建。
- 改 `src/lib/site.ts`（身份/锚点/区块）是唯一允许动公共配置的地方；锚点留空即不渲染。
- 不在本仓放 `.env` 真值；Pages 的环境变量在 Cloudflare 面板配。

## 与 ZART 主仓的关系

这是独立项目，**不是 ZART 的一部分**：独立 git 仓库（本目录有自己的 `.git`，remote 是私有仓
`OwenJiong24/personal-site`），不用 ZART 的构建容器、不动 ZART 的 main/integration、不发 ZART 的生产。
之所以放在 ZART 工作区目录树里，是因为本机 harness 的沙箱只保证子进程能写工作区内（工作区外构建会 Access is denied）。
任务状态记在 ZART 状态中枢：`python _指挥层/状态中枢/hub.py task set T310 ...`（在 ZART 工作区跑），本仓只写一句结论。

## 本机发布与推送的坑（已验证）

- 发布：`.\scripts\deploy.ps1`（构建 → 内容红线 → `wrangler pages deploy` 直传 Cloudflare Pages 项目 `jiong`）。
  线上是 **https://jiong-bvw.pages.dev**（`jiong.pages.dev` 已被他人注册，Cloudflare 自动加了 `-bvw` 后缀）。
  站点地址写在 `astro.config.mjs` 的 `site`（可用 `PUBLIC_SITE_URL` 覆盖），canonical/RSS/站点地图/robots 都跟着它走。
- `git push` 在这台机器上会**静默失败**（凭据助手要读 Windows 钥匙串，子进程被拦，且没有输出）。
  可用写法：先 `$env:GH_TOKEN = (gh auth token)`，再
  `git -c credential.helper='!gh auth git-credential' push origin main`，然后用 `git ls-remote origin refs/heads/main`
  核对远端确实前进了——**不看这步就宣称推送成功是不可靠的**。
- 绝不在命令行参数里传令牌（会进进程列表），不把令牌写进任何提交、日志或汇报。
