// 服务页与工具页的单一真源：页面 (.astro) 与 Markdown 镜像 (/m/pages/*.md) 都读这里，
// 避免两处手写导致线上与机器版本脱节。
import { brand, site } from '../lib/site';

export type Offer = {
  id: string;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  metaEn: string;
  metaZh: string;
};

export const offers: Offer[] = [
  {
    id: 'diagnosis',
    titleEn: '1 · Growth diagnosis (one week)',
    titleZh: '一 · 增长诊断（一周）',
    descEn:
      'You send 90 days of orders, cost inputs and read-only analytics access. You get a written diagnosis: margin by product, shipping and fee structure, listing gaps, three things to fix, a 30-day action list, and the numbers to track. Delivered as a document plus one call.',
    descZh:
      '你给 90 天订单、成本口径与只读数据权限。你得到一份书面诊断：逐品毛利、运费与抽成结构、listing 缺口、三件最该改的事、30 天行动清单、要盯的数字。交付物是文档 + 一次通话。',
    metaEn: 'Email with your monthly order count and the link to your shop.',
    metaZh: '发邮件带上月订单数与店铺链接。',
  },
  {
    id: 'ads-build',
    titleEn: '2 · Ads build-and-teach (two to three weeks)',
    titleZh: '二 · 投放搭建 + 教会（两到三周）',
    descEn:
      'We set up one paid channel properly: account structure, one campaign, creative briefs from your existing winning photos, budget rules, a stop-line table, and a weekly read-out your team can run after I leave.',
    descZh:
      '把一个付费渠道搭对：账户结构、一条 campaign、用你已经跑出来的赢家图出创意简报、预算规则、停止线表格，以及一份我走后你团队能自己跑的周度读数表。',
    metaEn: 'Prerequisite: at least one product with proven organic traction. If that is missing, the diagnosis comes first.',
    metaZh: '前置条件：至少一件商品在自然流量里已经证明卖得动。缺这条，先做诊断。',
  },
];

export const strengths = [
  {
    en: 'Unit economics — pricing that survives platform fees, failure rate and shipping; where the margin is quietly leaking.',
    zh: '单位经济——定价能不能扛住平台抽成、失败率与运费；毛利在哪些环节静悄悄漏掉。',
  },
  {
    en: 'Being found — listings, attributes, structured data, and how search and AI answer engines read a product page.',
    zh: '被找到——listing 标题与属性、结构化数据，以及搜索引擎与 AI 问答怎么读你的商品页。',
  },
  {
    en: 'Small-budget advertising — US channel buying on real budgets: test structure, stop lines, and what not to buy.',
    zh: '小预算投放——美国渠道的真实小额投放：测试结构、停止线、以及哪些流量不要买。',
  },
  {
    en: 'Systems — the tooling behind a shop: calculators, feeds, reports, automations that do not need an agency.',
    zh: '系统——店铺背后的工具：计算器、报表、自动化，不需要养一支技术团队。',
  },
];

export const notFor = [
  {
    en: 'Shops with no margin on the core product — pricing comes before traffic; I will say so in the first reply.',
    zh: '核心产品没有毛利的店——先解决定价，我会在第一封回复里直说。',
  },
  {
    en: 'Anyone looking for agency management, guaranteed sales, or "targeted buyer packages".',
    zh: '要"保证出单""精准客源包"的——这类需求我不会接，也会告诉你为什么是坑。',
  },
  {
    en: 'Full store builds on a fixed deadline; I ship advice, tooling and bounded builds, not a dev shop.',
    zh: '要在固定期限内交付整个商城开发的——我交建议、工具与有边界的搭建，不是外包开发队。',
  },
];

export const howIWork = [
  {
    en: 'Written first. Every engagement ends with a document; the reasoning is published afterwards in redacted form.',
    zh: '书面优先。每次合作都交付文档；脱密后的推理过程会公开在洞察里。',
  },
  {
    en: 'No credential sharing. Read-only access where possible, no passwords by email.',
    zh: '不共用凭据。尽量只读权限，密码不在聊天与邮件里传递。',
  },
  {
    en: 'Predictions on record. What I claim, I write down with a check date, and the outcome is published either way.',
    zh: '判断留档。我给出的预测会写下核对日期，中不中都公布。',
  },
];

export const statusNote = {
  en: `This consulting practice opened in 2026-11 alongside this site; there is no client-results page yet because there are no published engagements to publish. What exists instead is checkable: the daily journal, the SHA-256 chain over everything written here, the free tools, and this site's source on GitHub (${site.anchors.github}).`,
  zh: `这条服务线与本站同期开于 2026-11，目前没有可公开的客户案例——因为没有已发表的合作成果，我不会编。现在能核对的是：每日记录、正文哈希链、免费工具，以及这个站的源码在 GitHub（${site.anchors.github}）。`,
};

export const billing = {
  en: 'Billing: US entity, invoice in USD. Non-disclosure by default; nothing about a client is published without written permission. No advertising or sponsored posts on this site; affiliate links are disclosed.',
  zh: `收款：美国实体，美元发票；国内需人民币与开票的走对方现有主体配合（先说清，避免中间卡住）。保密默认，不写客户名、不发营收数字；站上不接广告与赞助帖，只允许披露过的联盟返佣。品牌 ${brand.name}。`,
};

export const serviceFaq = [
  {
    en: { q: 'What do you actually deliver?', a: 'A written diagnosis with numbers: unit economics, channel mix, listing and shipping structure, a 30-day action list, and the measurement plan to check it. For buying work: campaign structure, creative briefs, budget rules and a stop-line table.' },
    zh: { q: '你们交付什么？', a: '一份带数字的书面诊断：单位经济、渠道结构、listing 与运费结构、30 天行动清单，以及怎么核对这些数字。投放工作还包括：campaign 结构、创意简报、预算规则、停止线表格。' },
  },
  {
    en: { q: 'Do you run my account day to day?', a: 'Not as an agency. I set up, I teach your team to run, and I stay for a defined number of working sessions. Ongoing management needs a retainer designed after the first engagement.' },
    zh: { q: '你们接代运营吗？', a: '接"搭好并教会"，不接长期代运营。第一阶段我把结构与规则立起来，你的团队接手跑；需要长期盯盘我们设计成按周期的驻场，不做无边界托管。' },
  },
  {
    en: { q: 'What do you need from me to start?', a: 'Last 90 days of orders (a CSV export is fine), your cost inputs, and read-only analytics access. No passwords, no shared logins.' },
    zh: { q: '要不要交出店铺账号密码？', a: '不要。可核对的部分用只读权限；不给密码、不在邮件里传任何凭据。这也是我给自己的红线，写在站上。' },
  },
  {
    en: { q: 'How is pricing set?', a: 'Not published as fixed tiers. Scope-based: send the order volume and category, and you get a written quote and scope statement within 24 hours.' },
    zh: { q: '报价怎么定？', a: '不公开写死档位。按范围报价：发来月订单量与品类，24 小时内给一份书面报价与范围说明。' },
  },
  {
    en: { q: 'Can you invoice in RMB with a Chinese fapiao?', a: 'The contracting and billing entity is a US entity (USD invoice). For domestic clients that need RMB settlement and fapiao, work with your existing entity and we adapt to your finance process. Stated up front so nothing stalls mid-engagement.' },
    zh: { q: '能开人民币发票吗？', a: '收款主体是美国实体，合同与发票走英文（美元）。国内需要人民币结算与开票的，走你现有的合作主体，我们按你的财务口径配合。这点先说清，避免合作到中间卡住。' },
  },
];

export type Tool = { nameEn: string; nameZh: string; href: string; descEn: string; descZh: string; status: 'live' | 'planned' };

export const tools: Tool[] = [
  {
    nameEn: 'Handmade pricing calculator',
    nameZh: '手作定价计算器',
    href: '/tools/pricing-calculator',
    descEn: 'Floor price from material, failure rate, hours, shipping and platform fees; shows net, hourly rate and break-even units. Runs offline in your browser.',
    descZh: '从材料、失败率、工时、运费与平台抽成算出保本价，给出净利、时薪与保本件数。浏览器本地运行，可离线。',
    status: 'live',
  },
  {
    nameEn: 'Shipping shape calculator',
    nameZh: '运费收法计算器',
    href: '/tools/shipping-calculator',
    descEn: 'Bake shipping into the price, charge plainly, or set a threshold — decided by shipping as a share of price, with the 1.2–1.5× AOV threshold rule and a returns reserve.',
    descZh: '摊进价 / 单列实收 / 门槛包邮怎么选：由运费占售价比例决定，门槛按客单价 1.2–1.5 倍，并给每件退换预留。',
    status: 'live',
  },
  {
    nameEn: 'Listing photo checklist',
    nameZh: '主图拍摄清单',
    href: '',
    descEn: 'The five shots a listing needs, with a printable check.',
    descZh: '一个 listing 需要的五张图，附可打印自查表。',
    status: 'planned',
  },
  {
    nameEn: 'Fee-and-shipping comparison sheet',
    nameZh: '平台费用与运费对比表',
    href: '',
    descEn: 'Compare what the same sale costs across marketplaces.',
    descZh: '同一笔成交，在不同平台各自吃掉多少。',
    status: 'planned',
  },
];
