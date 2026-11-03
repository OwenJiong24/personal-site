import type { APIRoute } from 'astro';
import { indexDoc } from '../../lib/mirror';

// 整站 Markdown 索引：/m/index.md
export const prerender = true;

export const GET: APIRoute = async ({ site: base }) => {
  const root = base ?? new URL('https://orangeknows.com');
  return new Response(await indexDoc(root), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
