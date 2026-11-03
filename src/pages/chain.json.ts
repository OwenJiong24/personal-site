import type { APIRoute } from 'astro';
import { allPublic, chain, keyOf, langOf } from '../lib/trust';
import { site } from '../lib/site';
import { gitSha } from '../lib/build';

// 机器可读的记录链：任何人可下载后用同样算法重算并核对链头。
// 关键：items 必须覆盖链的**全部**条目（中英双语都算一条），顺序与哈希顺序一致，
// 并给出每条的源文件路径与页面地址——否则第三方拿到这份 JSON 也重算不出链头。
// 2026-11-03 修：此前 items 只列了中文（publishedPosts 默认 'zh'），38 条链只公布 19 条。
export const GET: APIRoute = async () => {
  const posts = await allPublic();
  const ch = await chain();
  const byId = new Map(posts.map((p) => [p.id, p]));
  const items = ch.ids.map((id, i) => {
    const p = byId.get(id)!;
    const lang = langOf(p);
    return {
      i,
      id,
      zone: p.collection,
      lang,
      key: keyOf(p),
      date: p.data.date.toISOString(),
      title: p.data.title,
      hash: ch.byId.get(id) ?? '',
      // 源文件：从公开仓库的 built_from 提交取原文，即可逐条重算。
      // 注意 collection id 会吃掉文件名里的点（…day-001.zh.md → id …day-001zh），
      // 所以用 loader 给的 filePath，不能由 id 反推。
      source: (p as unknown as { filePath?: string }).filePath ?? `src/content/${p.collection}/${id}.md`,
      url: (lang === 'zh' ? '/zh/' : '/') + p.collection + '/' + keyOf(p),
    };
  });
  const body = {
    genesis: site.start,
    algorithm:
      'v2 SHA256(prev | index | id | ISO8601 date | title | body), 从 GENESIS:<start> 起按 items 顺序升序；正文换行统一为 \\n 后参与哈希；summary 不参与；中英两版各算一条',
    head: ch.head,
    count: ch.count,
    built_at: new Date().toISOString(),
    built_from: gitSha,
    repo: 'https://github.com/OwenJiong24/personal-site',
    verify: 'node scripts/verify-chain.mjs  # 拉本文件 + 从公开仓库取每条 source 的原文，重算链头并比对',
    items,
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
