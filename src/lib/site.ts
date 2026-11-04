// 站点级配置：品牌、作者、锚点、板块。改署名/锚点/域名只改这一处。
// 品牌规则真源：ui-toolkit/modes/c-orangeknows.md（第 0 节品牌事实不可自创）

export const brand = {
  name: 'OrangeKnows',
  abbr: 'OK',
  zh: '橙知道', // 二级：中文正文与中文标签用，不进 logo 主视觉
  domain: 'orangeknows.com',
  slogan: 'Ideas you can check.',
  sloganZh: '洞察，可核对。',
  signatureEn: 'OK — dated, checkable.',
  signatureZh: '先给结论，再给依据。',
  longEn: 'A public record of what I know — dated, sourced, and chained.',
  longZh: '一份公开记录：我知道什么、什么时候知道、依据是什么。',
} as const;

export const site = {
  // 站点名 = 品牌名；作者名分开写，结构化数据的 author 用作者（可核验性靠作者实体）
  name: brand.name,
  author: 'Owen Jiong',
  authorZh: 'Owen Jiong（OJ）',
  role: 'Independent developer · Founder of ZART',
  roleZh: '独立开发者 · ZART 创始人',
  tagline: 'A public engineering log in the model era: one human, recorded continuously',
  taglineZh: 'AM 时代的公开工作日志：一个人类工程师的连续记录',
  intro:
    'This is my testing ground, not a dump: testing how information travels in the AI era - agents, not only crawlers. AIEO is a variant of SEO.',
  introZh:
    '这里是我的试验场，不是垃圾场：测试 AI 时代信息怎么传播——靠 agent，不只看爬虫。AIEO 只是 SEO 的变种。',
  start: '2026-10-30',
  lang: 'zh-CN',
  locale: 'zh-CN',
  // 可核验锚点：别人用来确认「这些内容出自同一个人」。留空即不渲染。
  // CEO 定（A699）：只接 GitHub handle 与本站邮箱；LinkedIn 等真人职业档案暂不接，一步一步试探。
  anchors: {
    github: 'OwenJiong24',
    email: 'owen@orangeknows.com',
    x: '',
    linkedin: '',
    rss: '/rss.xml',
    rssEn: '/rss.xml',
  },
  support: {
    coze: '',
    coinflo: '',
    buyMeACoffee: '',
  },
} as const;

// 板块（Q5 数字花园/实验室形态）：slug 同时是 collection 名与 URL 段
export type SectionSlug = 'lab' | 'journal' | 'essays' | 'guides' | 'notes' | 'projects';

export const sections: SectionSlug[] = ['lab', 'journal', 'essays', 'guides', 'notes', 'projects'];

// 站点遥测（首页数据条用，AB-09）：只写可核对的事实，来源=构建链与门禁日志
export const metrics = {
  gates: 7, // lint-content → build → check-css → check-i18n(+泄露) → check-links → check-md(+日期窗口) → check-quotes → check-quality
  lastRedGate: '2026-11-04', // 泄露断言上线当轮连抓 4 处真泄露（英文页中文原文 / uses 英文页中文条目 / 404 整页中文）
} as const;
