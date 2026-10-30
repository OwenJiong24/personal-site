import type { APIRoute } from 'astro';
import { brand, site, sections } from '../lib/site';
import { publishedPosts, chain, keyOf, utcDay } from '../lib/trust';
import { ui } from '../lib/i18n';

// llms.txt：给 AI 检索用的站点索引（AIEO 常用做法）。品牌事实 + 板块 + 双语条目清单。
export const GET: APIRoute = async ({ site: base }) => {
  const root = base ?? new URL('https://orangeknows.com');
  const abs = (p: string) => new URL(p, root).toString();
  const zh = await publishedPosts('zh');
  const en = await publishedPosts('en');
  const ch = await chain();

  const lines = [
    `# ${brand.name} (${brand.abbr}) — ${brand.slogan}`,
    '',
    `> ${brand.longEn}`,
    `> ${brand.longZh}`,
    '',
    `Author: ${site.author} (${site.role})`,
    `Chinese secondary name: ${brand.zh}`,
    `Domain: ${brand.domain}`,
    `GitHub: ${site.anchors.github ? 'https://github.com/' + site.anchors.github : 'n/a'}`,
    `Contact: ${site.anchors.email}`,
    'Languages: en (root URLs), zh-Hans (/zh/ prefix). Paired translations share one key; hreflang declared.',
    'Timezone: all dates UTC.',
    'Integrity: every published entry is hashed (full body) into a SHA-256 chain; the head is printed in every page footer.',
    `Chain head: ${ch.head}`,
    `Machine-readable chain: ${abs('/chain.json')}`,
    'Full text for models: ' + abs('/llms-full.txt'),
    'Citation policy: short passages may be quoted with attribution and a link to the canonical URL.',
    '',
    '## Sections',
    '',
    ...sections.map((slug) => `- [${ui.zh.sections[slug].name}](${abs('/zh/' + slug)}): ${ui.zh.sections[slug].desc}`),
    `- [${ui.zh.uses.name}](${abs('/zh/uses')}): ${ui.zh.uses.desc}`,
    `- [About](${abs('/zh/about')}): who writes this and the rules of the record`,
    `- [Verify](${abs('/zh/verify')}): chain algorithm, limits, and how to check`,
    '',
    '## Entries (zh-Hans)',
    '',
    ...zh.map(
      (p) => `- [${p.data.title}](${abs('/zh/' + p.collection + '/' + keyOf(p))}): ${utcDay(p.data.date)} — ${p.data.summary}`,
    ),
    '',
    '## Entries (en)',
    '',
    ...en.map(
      (p) => `- [${p.data.title}](${abs('/' + p.collection + '/' + keyOf(p))}): ${utcDay(p.data.date)} — ${p.data.summary}`,
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
