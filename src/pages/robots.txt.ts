import type { APIRoute } from 'astro';

// robots 随站点地址生成：换域名（pages.dev → owenjiong.com）时 sitemap 地址自动跟着变。
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://jiong-bvw.pages.dev');
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${new URL('/sitemap-index.xml', base)}`].join('\n');
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
