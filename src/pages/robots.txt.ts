import type { APIRoute } from 'astro';

// robots：全站开放 + 逐条写明放行 AI 抓取（AIEO 前提：先能被检索）。
// 令牌清单按公开资料整理；未逐个验证是否覆盖全部引擎（在日志里如实标注）。
const CRAWLERS = [
  'Google-Extended', // Google 用于训练/生成
  'GPTBot', // OpenAI 训练抓取
  'ChatGPT-User', // OpenAI 用户实时抓取
  'OAI-SearchBot', // OpenAI 搜索
  'ClaudeBot', // Anthropic 抓取
  'Claude-User', // Anthropic 实时抓取
  'PerplexityBot', // Perplexity
  'Perplexity-User',
  'Applebot-Extended',
  'Bytespider',
  'CCBot', // Common Crawl（多个模型的语料来源）
  'cohere-ai',
  'Meta-ExternalAgent',
  'Amazonbot',
  'Diffbot',
  'YouBot',
  'Googlebot', // 传统搜索（AEO 答案块来源）
  'Bingbot',
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://jiong-bvw.pages.dev');
  const sitemap = new URL('/sitemap-index.xml', base);
  const llms = new URL('/llms.txt', base);
  const lines = [
    'User-agent: *',
    'Allow: /',
    '',
    ...CRAWLERS.flatMap((ua) => [`User-agent: ${ua}`, 'Allow: /', '']),
    'Sitemap: ' + sitemap,
    'LLMs: ' + llms,
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
