# 本仓工作守则（给任何 harness / 模型）

这是 CEO 的个人公开站，公网可读。在这里干活按下面几条来。

## 发布红线（机器拦，不靠自觉）

`pnpm build` 前会跑 `scripts/lint-content.mjs`。公开内容里不得出现：

- 任何形式的凭据：令牌、密钥、私钥、明文口令、JWT
- 主机与入口：IP（含内网段）、面板/后台地址、SSH 入口、供应商控制台
- ZART 与客户的机密：客户名单、未发布的商业数字（营收/GMV/融资/合同）、内部架构细节、排期承诺
- 身份证级隐私：生日、住址、证件号、家属信息；公开署名用姓名拼音 + 角色 + 可核验锚点即可
- 非本站域名的邮箱（公开锚点只用 `@orangeknows.com`，白名单在 scripts/lint-content.mjs 里从 site.ts 读）

命中即构建失败。绕过它 = 事故，不是效率。

## 写作规矩（双视角，CEO 2026-10-30 定，取代旧的"第一人称=CEO"写法）

- **两个视角必须分得开**：叙述与整理用 `voice: assistant`（OK 助手，AI 辅助，页面文首徽标自动标明）；CEO 本人的观点与判断**只以引用块进文并标出处**，不混进叙述。CEO 亲自执笔时写 `voice: owner`。
- 每篇公开文章留 **OJ 审定**位：`ownerRating: 0-5` + `ownerNote`（一句话快速点评）。**不得代 CEO 编造评分**；留空则页面显示「点评待补」，构建时会打印待补清单。
- 助手可以起草，**发布必须 CEO 过目**；不确定就留 `status: draft`。
- 时间一律 UTC（frontmatter 带 `Z`）。写完不事后修饰；补记标「补记」。
- 说实话：没做的不写「做了」，没跑过的写「仅计划」，判断错了在下篇写清怎么改的。
- 连续比精彩重要：短、具体、可核对，胜过修辞。
- 日期不得晚于构建时刻：晚于构建时间的文章会被内容聚合过滤掉（本轮踩过两次）。

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
  线上是 **https://orangeknows.com**（2026-10-30 已绑 Pages 自定义域名；备用地址 `jiong-bvw.pages.dev`，`jiong.pages.dev` 已被他人注册所以带 `-bvw` 后缀）。
  站点地址写在 `astro.config.mjs` 的 `site`（可用 `PUBLIC_SITE_URL` 覆盖），canonical/RSS/站点地图/robots 都跟着它走。
- `git push` 在这台机器上会**静默失败**（凭据助手要读 Windows 钥匙串，子进程被拦，且没有输出）。
  可用写法：先 `$env:GH_TOKEN = (gh auth token)`，再
  `git -c credential.helper='!gh auth git-credential' push origin main`，然后用 `git ls-remote origin refs/heads/main`
  核对远端确实前进了——**不看这步就宣称推送成功是不可靠的**。
- 绝不在命令行参数里传令牌（会进进程列表），不把令牌写进任何提交、日志或汇报。

## 双语与 AIEO 规矩（2026-10-30 加）

- 每篇文章 frontmatter 必须写 `lang: zh|en` 与 `key: <文章键>`；同一篇文章的中英版用**同一个 key**。
  不要靠文件名推语言：Astro 的 glob loader 会吃掉文件名里的点（实测 `x.en.md` 的 id 是 `xen`）。
- 英文在站点根（`/essays/<key>/` 等），中文在 `/zh/` 前缀下（2026-10-30 英文默认，A702）。
  hreflang 由 `src/layouts/base.astro` 自动成对，`x-default` 指英文；只有存在译文时才渲染语言切换。
  英文主订阅 `/rss.xml`，中文 `/zh/rss.xml`，两路各自单语。旧 `/en/*` 与老板块 URL 在 `public/_redirects` 里 301。
- AIEO 写作要求：第一屏给出一句话结论（能被整段摘走）；术语首次出现给全称+英文原名；
  一页一主题；问答小节用 H2 提问、紧跟一句直答；一句一个事实（带数字/日期）。
- `/llms.txt`（索引）与 `/llms-full.txt`（全文）由端点自动生成，改内容不用手维护；
  `robots.txt` 逐条放行 AI 抓取。**没跑过的效果一律写「未验证」**，不许声称「会被 AI 引用」。
- 身份锚点只用 GitHub handle + 本站邮箱。**LinkedIn 等真人职业档案暂不接**（CEO 定：一步一步试探），
  要接得由 CEO 明确点头。

## 品牌（2026-10-30 定稿）

- 品牌：**OrangeKnows（OK）**，中文二级名「橙知道」，个人内核 OJ（Owen Jiong = 作者）。
- 域名：`orangeknows.com`（CEO 已购、在 Cloudflare 账号内）。站点地址写在 `astro.config.mjs` 的 `site`。
- VI 真源：`ui-toolkit/tokens.css` 的 **C 集** + `ui-toolkit/modes/c-orangeknows.md`（语法/符号/slogan 规则）。
  站点只同步值，不在本仓发明新色；组件禁裸 hex；**橙底必须配墨字**（白字压阳光橙对比不足）。
- 板块（数字花园五抽屉）：Journal 日志 / Essays 洞察 / Notes 随记 / Projects 项目 / Uses 清单。
  改板块名要同步 UI 文案（`src/lib/i18n.ts`）与 `public/_redirects`（旧 URL 301）。
- Logo 见 `src/components/Brand.astro`（几何 monogram：正圆 O + 45° 折角 K）+ `public/favicon.svg` + `public/og.png`（分享图 1200×630）。
- 品牌占位紫（#7c3aed）作废；C 集不再是"风格化玩具"，而是 CEO 个人品牌资产。

## 域名绑定（Cloudflare 面板，wrangler 无此命令）

2026-10-30 已完成：Pages 项目 `jiong` → Custom domains → `orangeknows.com`（Active / SSL enabled），DNS 为 proxied CNAME → `jiong-bvw.pages.dev`。Email Routing 已开通，catch-all 转发到 CEO 的 Gmail（`owen@orangeknows.com` 可收信）。
www.orangeknows.com：已在 Pages 加为自定义域名，且 CEO 已在 DNS 加记录，实测 `https://www.orangeknows.com/` 返回 200（2026-10-30）。
可选的 SEO 卫生项：加一条 Redirect Rule 把 www 301 到 apex（不做也能跑，只是两个地址并存）。
DMARC：CEO 已启用，当前 `p=none`（仅监控）。BIMI 需要 `p=quarantine/reject` 才能推进（见 docs/STRATEGY.md §6）。