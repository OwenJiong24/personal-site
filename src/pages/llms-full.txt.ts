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
  const root = base ?? new URL('https://orangeknows.com');
  const zh = await publishedPosts('zh');
  const en = await publishedPosts('en');
  const head = [
    `${site.name} — full text of the public record`,
    `Author: ${site.author}, published as ${site.name}. All dates UTC. Index: /llms.txt`,
    'English entries are at the site root; Chinese entries under /zh/. Dual-voice rule: narration is compiled by the OK assistant (AI-assisted); quoted lines are OJ in his own words.',
    '',
  ].join('\n');
  const body = [
    '# English (root URLs)',
    '',
    ...en.map((p) => block(p, new URL(`/${p.collection}/${keyOf(p)}`, root).toString())),
    '# 中文 (zh-Hans, /zh/ 前缀)',
    '',
    ...zh.map((p) => block(p, new URL(`/zh/${p.collection}/${keyOf(p)}`, root).toString())),
  ].join('\n');
  return new Response(`${head}\n${body}`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
