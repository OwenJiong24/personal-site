// 双语界面文案。中文是主语言（URL 无前缀），英文在 /en/ 前缀下。
// 规则：页面里所有面向人的固定文案都从这里取，不散落在模板里写死。
export type Lang = 'zh' | 'en';

export const ui = {
  zh: {
    htmlLang: 'zh-CN',
    ogLocale: 'zh_CN',
    switchTo: 'EN',
    switchAria: '切换到英文版',
    skip: '跳到正文',
    theme: { light: '亮色', dark: '暗色', aria: '切换明暗主题' },
    nav: [
      { path: '/journal', label: '开发日志' },
      { path: '/insights', label: '洞察' },
      { path: '/work', label: '项目' },
      { path: '/now', label: '现在' },
      { path: '/timeline', label: '时间线' },
      { path: '/about', label: '关于' },
    ],
    tagline: 'AM 时代的公开工作日志：一个人类工程师的连续记录',
    role: '独立开发者 · ZART 创始人',
    zones: {
      journal: { name: '开发日志', desc: '每天在做什么：写下的代码、踩到的坑、做出的决定。按日期累积，不可事后修饰。' },
      insights: { name: '洞察', desc: '对 AM 时代、产品、工程与协作的观察。结论会过时，所以每篇都带日期。' },
      work: { name: '项目', desc: '我在建什么、进展到哪一步。只写可以公开的部分。' },
    },
    intro:
      '我在这里公开记录我每天在做什么、学到什么、判断错了什么。目的是在模型能批量生成一切的时代，留下一份可被核对、随时间累积的人类记录。',
    stats: { days: '公开天数', entries: '条记录', streak: '连续天数', latest: '最近更新（UTC）', chain: '记录链头' },
    buttons: { latest: '读最新一条', about: '这个站在干什么', journal: '开发日志' },
    sections: { recent: '最近记录', zones: '三个区块', rules: '这份记录的规则' },
    rules: [
      '时间一律 UTC，写完不事后修饰；补记会标明「补记」。',
      '每篇公开记录进入一条哈希链（正文全文参与哈希），链头写在页脚：改一个字链头就变。',
      '不写密钥、主机地址、客户数据、未发布的商业数字，也不写身份证级隐私。',
      '静态站，无追踪脚本；正文中文为主，重要篇章配英文版。',
    ],
    zone: { meta: (n: number) => `${n} 条记录 · 按时间倒序`, empty: '这个区块还是空的。第一批内容写完后会出现在这里。' },
    post: {
      recorded: '记录于',
      updated: '更新于',
      chainLine: (i: number) => `链上第 ${i} 条`,
      builtNote: '本页由构建时生成；正文全文参与记录链哈希，发布后改一个字链头就会变，见',
      verifyLink: '如何核对这份记录',
      onlyOne: '这是本分区目前唯一的一条记录。',
      utc: '（UTC）',
      alsoIn: '英文版',
    },
    footer: {
      line: (name: string, start: string, n: number, d: number) =>
        `© 2026 ${name} · 起点 ${start} · 共 ${n} 条 / 记录 ${d} 天 ·`,
      chain: '记录链头',
      built: '构建自',
      noTracker: '静态站，无追踪脚本',
    },
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    switchTo: '中文',
    switchAria: 'Switch to the Chinese version',
    skip: 'Skip to content',
    theme: { light: 'Light', dark: 'Dark', aria: 'Toggle colour theme' },
    nav: [
      { path: '/journal', label: 'Journal' },
      { path: '/insights', label: 'Insights' },
      { path: '/work', label: 'Projects' },
      { path: '/now', label: 'Now' },
      { path: '/timeline', label: 'Timeline' },
      { path: '/about', label: 'About' },
    ],
    tagline: 'A public engineering log in the model era: one human, recorded continuously',
    role: 'Independent developer · Founder of ZART',
    zones: {
      journal: { name: 'Journal', desc: 'What I work on each day: the code, the traps, the decisions. Accumulated by date, never edited after the fact.' },
      insights: { name: 'Insights', desc: 'Observations on the model era, product, engineering and collaboration. Conclusions age, so every piece carries a date.' },
      work: { name: 'Projects', desc: 'What I am building and how far along it is. Only the part that can be public.' },
    },
    intro:
      'Here I publish what I work on each day, what I learn, and where my judgement was wrong. The point: in an age when models generate convincing artefacts in bulk, the only scarce proof is a continuous, checkable human record.',
    stats: { days: 'Days public', entries: 'Entries', streak: 'Day streak', latest: 'Last update (UTC)', chain: 'Chain head' },
    buttons: { latest: 'Read the latest', about: 'What this site is', journal: 'Journal' },
    sections: { recent: 'Recent entries', zones: 'Three sections', rules: 'Rules of this record' },
    rules: [
      'All timestamps are UTC. Nothing is edited after the fact; late additions are marked "addendum".',
      'Every published entry joins a hash chain (the full body is hashed). Change one character and the chain head changes.',
      'No credentials, no host addresses, no client data, no unreleased business numbers, no identity-grade private details.',
      'Static site, no trackers. Articles are Chinese-first, with English versions for the important ones.',
    ],
    zone: { meta: (n: number) => `${n} entries · newest first`, empty: 'This section is still empty. The first entries will show up here.' },
    post: {
      recorded: 'Recorded',
      updated: 'Updated',
      chainLine: (i: number) => `chain #${i}`,
      builtNote: 'This page is generated at build time; the full body is hashed into the record chain, so any post-publication edit changes the chain head. See',
      verifyLink: 'how to verify this record',
      onlyOne: 'This is currently the only entry in this section.',
      utc: '(UTC)',
      alsoIn: '中文原文',
    },
    footer: {
      line: (name: string, start: string, n: number, d: number) =>
        `© 2026 ${name} · since ${start} · ${n} ${n === 1 ? 'entry' : 'entries'} / ${d} ${d === 1 ? 'day' : 'days'} recorded ·`,
      chain: 'Chain head',
      built: 'built from',
      noTracker: 'Static site, no trackers',
    },
  },
} as const;

/** 语言前缀：中文在站点根，英文在 /en。 */
export const langPath = (lang: Lang, path: string) => (lang === 'en' ? `/en${path}` : path);
