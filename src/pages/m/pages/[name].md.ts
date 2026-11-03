import type { APIRoute } from 'astro';
import { pageDoc, PAGE_NAMES, type PageName } from '../../../lib/mirror';

// 静态页的 Markdown 镜像：/m/pages/<name>.md
export const prerender = true;

export function getStaticPaths() {
  return PAGE_NAMES.map((name) => ({ params: { name }, props: { name } }));
}

export const GET: APIRoute = async ({ params, site: base }) => {
  const root = base ?? new URL('https://orangeknows.com');
  const name = params.name as PageName;
  if (!PAGE_NAMES.includes(name)) return new Response('Not found\n', { status: 404 });
  return new Response(await pageDoc(name, root), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
