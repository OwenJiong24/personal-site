import type { APIRoute } from 'astro';
import { site } from '../lib/site';
import { publishedPosts, chain, keyOf, utcDay } from '../lib/trust';
import { ui } from '../lib/i18n';

// llms.txt：给 AI 检索用的站点索引（AIEO 常用做法）。中文为主，英文条目单列。
export const GET: APIRoute = async ({ site: base }) => {
  const root = base ?? new URL('https://jiong-bvw.pages.dev');
  const abs = (p: string) => new URL(p, root).toString();
  const zh = await publishedPosts('zh');
  const en = await publishedPosts('en');
  const ch = await chain();

  const lines = [
    `# ${site.name} — ${ui.zh.tagline}`,
    '',
    `> ${ui.zh.intro}`,
    '',
    `Author: ${site.name} (${site.role})`,
    `GitHub: ${site.anchors.github ? `https://github.com/${site.anchors.github}` : 'n/a'}`,
    `Contact: ${site.anchors.email}`,
    'Language: zh-Hans (primary), en (translations, /en/ prefix)',
    'Timezone: all dates UTC',
    'Integrity: every published entry is hashed (full body) into a SHA-256 chain; head in page footer',
    `Chain head: ${ch.head}`,
    `Machine-readable chain: ${abs('/chain.json')}`,
    'Full text for models: ' + abs('/llms-full.txt'),
    '',
    '## Sections',
    '',
    `- [${ui.zh.zones.journal.name}](${abs('/journal')}): ${ui.zh.zones.journal.desc}`,
    `- [${ui.zh.zones.insights.name}](${abs('/insights')}): ${ui.zh.zones.insights.desc}`,
    `- [${ui.zh.zones.work.name}](${abs('/work')}): ${ui.zh.zones.work.desc}`,
    `- [${ui.zh.nav[5].label}](${abs('/about')}): 我是谁、这个站的规则`,
    `- [如何核对这份记录](${abs('/verify')}): 哈希链算法与核对方法`,
    '',
    '## Entries (zh-Hans)',
    '',
    ...zh.map(
      (p) =>
        `- [${p.data.title}](${abs(`/${p.collection}/${keyOf(p)}`)}): ${utcDay(p.data.date)} — ${p.data.summary}`,
    ),
    '',
    '## Entries (en)',
    '',
    ...en.map(
      (p) =>
        `- [${p.data.title}](${abs(`/en/${p.collection}/${keyOf(p)}`)}): ${utcDay(p.data.date)} — ${p.data.summary}`,
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
