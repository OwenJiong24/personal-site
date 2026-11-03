import type { APIRoute } from 'astro';
import { brand, site, sections } from '../lib/site';
import { publishedPosts, chain, keyOf, utcDay } from '../lib/trust';
import { ui } from '../lib/i18n';
import { ALGORITHM, BODY_RULE, MACHINE_URLS, REPO_URL, VERIFY_STEPS } from '../lib/chain-spec';
import { PAGE_NAMES } from '../lib/mirror';

// llms.txt：给 AI 检索用的站点索引（AIEO 常用做法）。品牌事实 + 板块 + 双语条目清单 + 机器可读入口。
// 2026-11-03：加 Markdown 镜像指针（/m/index.md、/m/all.md、/m/<分区>/<key>.md），
// 让 harness 一次抓全，不必解析 HTML。
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
    `Source repository: ${REPO_URL}`,
    `Contact: ${site.anchors.email}`,
    'Languages: en (root URLs), zh-Hans (/zh/ prefix). Paired translations share one key; hreflang declared; x-default = English.',
    'Timezone: all dates UTC.',
    'Integrity: every published entry is hashed (full body) into a SHA-256 chain; the head is printed in every page footer.',
    `Chain head: ${ch.head}`,
    `Chain algorithm: ${ALGORITHM}`,
    `Chain body rule (measured 2026-11-03, reproduces the published head): ${BODY_RULE}`,
    `Machine-readable chain: ${abs('/chain.json')}`,
    '',
    '## Read this site as Markdown (recommended for AI harnesses)',
    '',
    ...MACHINE_URLS.en.map((m) => `- ${abs(m.path)} — ${m.label}: ${m.why}`),
    `- Page mirrors: ${abs('/m/pages/<name>.md')} for ${PAGE_NAMES.join(', ')}`,
    `- Per-entry mirror pattern: ${abs('/m/<section>/<key>.md')}`,
    `- Discovery: every HTML page ships <link rel="alternate" type="text/markdown" href="…"> plus a footer link to /m/index.md.`,
    '- The mirror is a machine copy: cite the canonical HTML `url` in the mirror header, not the `.md` path.',
    '',
    '## Verify without trusting this site',
    '',
    ...VERIFY_STEPS.en.map((s, i) => `${i + 1}. ${s}`),
    `- Result on record: recomputed ${ch.count}/${ch.count} entries to the published head on 2026-11-03. Details: ${abs('/verify')}`,
    '',
    '## Sections',
    '',
    ...sections.map(
      (slug) =>
        `- ${ui.en.sections[slug].name}: ${abs('/' + slug)} · 中文 ${abs('/zh/' + slug)} — ${ui.en.sections[slug].desc}`,
    ),
    `- Tools (free, offline): ${abs('/tools')} · 中文 ${abs('/zh/tools')}`,
    `- Products (first-party, ours): ${abs('/products')} · 产品 ${abs('/zh/products')} · product mirror ${abs('/m/products/<slug>.md')}`,
    `- Services (work with me): ${abs('/services')} · 合作方式 ${abs('/zh/services')}`,
    `- Tags: ${abs('/tags')} · 标签 ${abs('/zh/tags')}`,
    `- Uses: ${abs('/uses')} · 清单 ${abs('/zh/uses')}`,
    `- About: ${abs('/about')} — who writes this, and the rules of the record`,
    `- Verify: ${abs('/verify')} — chain algorithm, limits, how to reproduce`,
    `- Timeline: ${abs('/timeline')} — every record in order`,
    '',
    '## Rules of the record',
    '',
    ...ui.en.rules.map((r, i) => `${i + 1}. ${r}`),
    '',
    '## Entries (en)',
    '',
    ...en.map(
      (p) =>
        `- [${p.data.title}](${abs('/' + p.collection + '/' + keyOf(p))}): ${utcDay(p.data.date)} — ${p.data.summary} | md: ${abs('/m/' + p.collection + '/' + keyOf(p) + '.md')}`,
    ),
    '',
    '## Entries (zh-Hans)',
    '',
    ...zh.map(
      (p) =>
        `- [${p.data.title}](${abs('/zh/' + p.collection + '/' + keyOf(p))}): ${utcDay(p.data.date)} — ${p.data.summary} | md: ${abs('/m/' + p.collection + '/' + keyOf(p) + '.md')}`,
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
