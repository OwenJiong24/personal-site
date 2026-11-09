// 第三方度量：默认加载 + 明示披露 + 随时可关（OJ 2026-11-09 第二次裁定，取代当天的"同意条"方案）。
// 他的理由：来看内容就要有对应的同意，不该弹一条让人以为我们在监控；Clarity 很多网站都在用，没人这样打招呼。
// 落实口径：不设 Cookie 弹窗（AGENTS 那条规矩当天恢复原样）；披露写在页脚与 /support#third-party，
// 那张表带「关闭 Clarity」按钮——关掉后对 clarity.ms 一个请求都不发（选择存本地，本站不自设 Cookie）。
export const clarity = {
  /** Clarity 项目 ID（clarity.microsoft.com → Settings → Overview，2026-11-09 OJ 建属性 zb6h8hdlh2） */
  projectId: 'zb6h8hdlh2',
  /** 关掉即整条链路不再加载；Cloudflare 的无 Cookie 计数由 Pages 注入，与此开关无关 */
  enabled: true,
  /** 本地开关：只有值为 off 才不加载（默认加载，无需任何人先许可） */
  storageKey: 'ok-site-consent',
  /** 官方 tag 地址前缀（CSP 放行 www.clarity.ms 与 *.clarity.ms；故意不放行 c.bing.com） */
  tagBase: 'https://www.clarity.ms/tag/',
} as const;

/** 页脚那句披露的链接文案（合规细节与开关都在说明页那张表里）。 */
export const disclosure: Record<'zh' | 'en', { label: string; href: string }> = {
  zh: { label: '统计说明与关闭', href: '/zh/support#third-party' },
  en: { label: 'Analytics: what we record, turn it off', href: '/support#third-party' },
};
