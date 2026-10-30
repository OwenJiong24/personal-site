// 站点级配置：身份、锚点、分区。改署名/锚点只改这一处。
export const site = {
  // 公开署名：姓名拼音 + 角色。身份证级信息（生日、住址、证件、家属、客户数据）一律不上页。
  name: 'Owen Jiong',
  role: '独立开发者 · ZART 创始人',
  tagline: 'AM 时代的公开工作日志：一个人类工程师的连续记录',
  intro:
    '我在这里公开记录我每天在做什么、学到什么、判断错了什么。目的是在模型能批量生成一切的时代，留下一份可被核对、随时间累积的人类记录。',
  start: '2026-10-30',
  lang: 'zh-CN',
  locale: 'zh-CN',
  // 可核验锚点：别人用来确认「这些内容出自同一个人」。留空即不渲染。
  // 现状（CEO 定 2026-10-30）：只接 GitHub handle 与本站邮箱。
  // LinkedIn 这类真人职业档案暂不接——先把内容与可核验机制跑稳，再一步一步试探连接真实职业身份。
  anchors: {
    github: 'OwenJiong24',
    email: 'owen@owenjiong.com',
    x: '',
    linkedin: '',
    rss: '/rss.xml',
    rssEn: '/en/rss.xml',
  },
  support: {
    coze: '',
    coinflo: '',
    buyMeACoffee: '',
  },
  nav: [
    { href: '/journal', label: '开发日志' },
    { href: '/insights', label: '洞察' },
    { href: '/work', label: '项目' },
    { href: '/now', label: '现在' },
    { href: '/timeline', label: '时间线' },
    { href: '/about', label: '关于' },
  ],
} as const;

export const zones = [
  {
    slug: 'journal',
    name: '开发日志',
    href: '/journal',
    desc: '每天在做什么：写下的代码、踩到的坑、做出的决定。按日期累积，不可事后修饰。',
  },
  {
    slug: 'insights',
    name: '洞察',
    href: '/insights',
    desc: '对 AM 时代、产品、工程与协作的观察。结论会过时，所以每篇都带日期。',
  },
  {
    slug: 'work',
    name: '项目',
    href: '/work',
    desc: '我在建什么、进展到哪一步。只写可以公开的部分。',
  },
] as const;
