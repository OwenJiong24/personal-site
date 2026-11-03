import type { APIRoute } from 'astro';
import { toolDoc } from '../../../lib/mirror';
import { toolList } from '../../../data/tools';

// 工具页的 Markdown 镜像：/m/tools/<slug>.md（公式与算例照抄，让机器不跑 JS 也能核对算术）
export const prerender = true;

export function getStaticPaths() {
  return toolList.map((t) => ({ params: { slug: t.slug } }));
}

export const GET: APIRoute = async ({ params, site: base }) => {
  const root = base ?? new URL('https://orangeknows.com');
  const t = toolList.find((x) => x.slug === params.slug);
  if (!t) return new Response('Not found\n', { status: 404 });
  return new Response(toolDoc(t, root), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
