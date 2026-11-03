import type { APIRoute } from 'astro';
import { allDoc } from '../../lib/mirror';

// 全文语料（Markdown，单文件）：/m/all.md
export const prerender = true;

export const GET: APIRoute = async ({ site: base }) => {
  const root = base ?? new URL('https://orangeknows.com');
  return new Response(await allDoc(root), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
