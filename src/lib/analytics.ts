// 第三方度量配置与同意条文案（本站唯一的一次许可询问）。
// 真源在 site.ts 之外单列，是因为它带 UI 文案；改开关只改这里与 site.ts，不散落进组件。
// 规矩出处：AGENTS.md「不加 Cookie 弹窗」经 OJ 2026-11-09 明确破例一次，只为 Microsoft Clarity 的同意模式。
export const clarity = {
  /** Clarity 项目 ID（clarity.microsoft.com → Settings → Overview，2026-11-09 OJ 建属性 zb6h8hdlh2） */
  projectId: 'zb6h8hdlh2',
  /** 关掉即整条链路不再加载第三方脚本；Cloudflare 计数由 Pages 自己注入，与此开关无关 */
  enabled: true,
  /** 同意状态存本地，不写 Cookie：on = 已同意，off = 已拒绝，缺失 = 未决定 */
  storageKey: 'ok-site-consent',
  /** Clarity 官方 tag 地址前缀（CSP 已放行 www.clarity.ms 与 *.clarity.ms） */
  tagBase: 'https://www.clarity.ms/tag/',
} as const;

export type ConsentUi = {
  question: string;
  why: string;
  accept: string;
  decline: string;
  detail: string;
  detailHref: string;
};

export const consentUi: Record<'zh' | 'en', ConsentUi> = {
  zh: {
    question: '让我们知道哪一段真的有人读——可以吗？',
    why: '只用一个匿名统计工具（Microsoft Clarity）看阅读方式，不认人、不投广告。',
    accept: '可以',
    decline: '先不用',
    detail: '它到底记了什么',
    detailHref: '/zh/support#third-party',
  },
  en: {
    question: 'May we check which paragraphs people actually read?',
    why: 'One anonymous usage tool (Microsoft Clarity). It measures reading behaviour, not who you are, and there is no ad targeting here.',
    accept: 'Sure',
    decline: 'Not now',
    detail: 'What it records, in one table',
    detailHref: '/support#third-party',
  },
};

/** 已同意（或从未反对时按缺失处理）的判定，供同意条与注入脚本共用。 */
export function readConsent(): 'on' | 'off' | null {
  if (typeof localStorage === 'undefined') return null;
  const v = localStorage.getItem(clarity.storageKey);
  return v === 'on' || v === 'off' ? v : null;
}
