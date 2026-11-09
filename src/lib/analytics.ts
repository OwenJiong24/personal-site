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
    question: '要不要让我们看到页面外的小地图？',
    why: '本站用 Microsoft Clarity 看会话回放、点击热力图和滚动深度，用来判断哪些段落真的有人读。它只在你会同意后加载，会设两个 Microsoft Cookie（_clck 与 _clsk）；Cloudflare 的无 Cookie 计数不受这里影响。文本默认打码，机器人流量会被过滤。',
    accept: '同意',
    decline: '不用',
    detail: '细节与改主意',
    detailHref: '/zh/support#third-party',
  },
  en: {
    question: 'May we see how the page is actually used?',
    why: 'We run Microsoft Clarity for session replay, click heatmaps and scroll depth, to tell which passages people really read. It loads only after you accept, and Microsoft then sets two cookies (_clck and _clsk). The cookieless Cloudflare counter is unaffected. Text is masked by default and bot traffic is filtered.',
    accept: 'Accept',
    decline: 'No thanks',
    detail: 'Details and changing your mind',
    detailHref: '/support#third-party',
  },
};

/** 已同意（或从未反对时按缺失处理）的判定，供同意条与注入脚本共用。 */
export function readConsent(): 'on' | 'off' | null {
  if (typeof localStorage === 'undefined') return null;
  const v = localStorage.getItem(clarity.storageKey);
  return v === 'on' || v === 'off' ? v : null;
}
