import type { APIRoute } from 'astro';
import { publishedPosts, chain } from '../lib/trust';
import { site } from '../lib/site';
import { gitSha } from '../lib/build';

// 机器可读的记录链：任何人可下载后用同样算法重算，核对链头。
export const GET: APIRoute = async () => {
  const posts = await publishedPosts();
  const ch = await chain();
  const items = [...posts]
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime())
    .map((p) => ({
      id: p.id,
      zone: p.collection,
      date: p.data.date.toISOString(),
      title: p.data.title,
      hash: ch.byId.get(p.id) ?? '',
    }));
  const body = {
    genesis: site.start,
    algorithm: 'SHA256(prev | index | id | ISO8601 date | title), 从 GENESIS:<start> 起按时间升序',
    head: ch.head,
    count: ch.count,
    built_at: new Date().toISOString(),
    built_from: gitSha,
    items,
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
