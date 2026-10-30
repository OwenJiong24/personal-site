import type { APIRoute } from 'astro';
import { site } from '../lib/site';
import { publishedPosts, keyOf, type Post } from '../lib/trust';

// 全文版：把全部公开正文按时间倒序拼成一个纯文本文件，供模型一次读全。
const block = (p: Post, url: string) => {
  const body = (p as unknown as { body?: string }).body ?? '';
  const d = p.data.date.toISOString();
  return [`## ${p.data.title}`, `URL: ${url}`, `Date: ${d}`, `Tags: ${p.data.tags.join(', ')}`, '', body, '', '---', ''].join(
    '\n',
  );
};

export const GET: APIRoute = async ({ site: base }) => {
  const root = base ?? new URL('https://jiong-bvw.pages.dev');
  const zh = await publishedPosts('zh');
  const en = await publishedPosts('en');
  const head = [
    `${site.name} — full text of the public record`,
    `Author: ${site.name}. All dates UTC. Index: /llms.txt`,
    '',
  ].join('\n');
  const body = [
    '# Chinese (zh-Hans)',
    '',
    ...zh.map((p) => block(p, new URL(`/${p.collection}/${keyOf(p)}`, root).toString())),
    '# English',
    '',
    ...en.map((p) => block(p, new URL(`/en/${p.collection}/${keyOf(p)}`, root).toString())),
  ].join('\n');
  return new Response(`${head}\n${body}`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
