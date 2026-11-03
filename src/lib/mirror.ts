// Markdown 镜像生成器：/m/index.md、/m/all.md、/m/pages/<name>.md、/m/<zone>/<key>.md 共用这里。
// 原则：机器版本与页面读同一份数据（site/i18n/data/trust），所以线上改了，镜像自动跟上；
// 门禁 scripts/check-md.mjs 负责在两者脱节时让构建失败。
import { brand, sections, site, type SectionSlug } from './site';
import { ui } from './i18n';
import { chain, keyOf, langOf, publishedPosts, stats, utcDay, type Post } from './trust';
import { ALGORITHM, BODY_RULE, MACHINE_URLS, REPO_URL, VERIFY_STEPS } from './chain-spec';
import { gitSha } from './build';
import { uses } from '../data/uses';
import { product, disclosureEn, disclosureZh } from '../data/products';
import { toolList } from '../data/tools';
import { billing, howIWork, notFor, offers, serviceFaq, statusNote, strengths, tools } from '../data/services';
import { tagStats } from './tags';

export type Lang = 'en' | 'zh';

const yaml = (rows: (string | undefined)[], root: URL) =>
  ['```yaml', ...rows.filter((r) => r && r.includes(': ')).map((r) => r as string), '```'].join('\n');

const abs = (root: URL, p: string) => new URL(p, root).toString();
const pageUrl = (root: URL, lang: Lang, p: string) => abs(root, lang === 'zh' ? '/zh' + p : p);

type Meta = {
  title: string;
  date: Date;
  updated?: Date;
  summary?: string;
  tags?: string[];
  voice?: string;
  ownerRating?: number;
  ownerNote?: string;
  audience?: string;
  faq?: { q: string; a: string }[];
  stage?: string;
  status?: string;
};

/** 单篇条目的 Markdown 镜像（页面 URL 为规范地址，本文件是给机器的镜像，不是第二版）。 */
export function entryDoc(p: Post, twin: Post | undefined, root: URL): string {
  const d = p.data as Meta;
  const lang = langOf(p);
  const key = keyOf(p);
  const body = ((p as unknown as { body?: string }).body ?? '').trim();
  const rows = [
    `url: ${pageUrl(root, lang, '/' + p.collection + '/' + key)}`,
    'kind: markdown-mirror',
    `language: ${lang === 'zh' ? 'zh-CN' : 'en'}`,
    `section: ${p.collection}`,
    `key: ${key}`,
    `date_published: ${d.date.toISOString()}`,
    `date_updated: ${(d.updated ?? d.date).toISOString()}`,
    `author: ${site.author}`,
    `publisher: ${brand.name}`,
    `voice: ${d.voice ?? 'assistant'}`,
    d.ownerRating !== undefined ? `owner_rating: ${d.ownerRating}/5` : 'owner_rating: pending',
    d.ownerNote ? `owner_note: ${d.ownerNote}` : 'owner_note: pending',
    d.audience ? `audience: ${d.audience}` : undefined,
    d.stage ? `stage: ${d.stage}` : undefined,
    d.tags?.length ? `tags: ${d.tags.join(', ')}` : undefined,
    twin ? `translation: ${pageUrl(root, langOf(twin), '/' + twin.collection + '/' + key)}` : undefined,
    `machine_index: ${abs(root, '/m/index.md')}`,
    `full_corpus: ${abs(root, '/m/all.md')}`,
    `record_chain: ${abs(root, '/chain.json')}`,
  ];

  const out = [
    `# ${d.title}`,
    '',
    yaml(rows, root),
    '',
    d.summary ? `> ${d.summary}` : '',
    '',
    body,
    '',
    ...(d.faq?.length ? (['## FAQ', ''] as string[]).concat(d.faq.flatMap((f) => [`**Q: ${f.q}**`, '', `A: ${f.a}`, ''])) : []),
    '---',
    '',
    `Part of the ${brand.name} public record (\`${key}\`). Every published entry is hashed into a SHA-256 chain over its full body; head in the page footer, machine-readable chain at ${abs(root, '/chain.json')}. Recompute: ${abs(root, (lang === 'zh' ? '/zh/' : '/') + 'verify')}. All dates UTC.`,
    '',
    `Cite the \`url\` field as canonical. This file is a machine mirror, not a second edition.`,
  ];
  return out.filter((l) => l !== '').join('\n') + '\n';
}

const docHeader = (title: string, root: URL, lang: Lang, extra: (string | undefined)[], url: string, kind = 'markdown-page-mirror') =>
  [
    `# ${title}`,
    '',
    yaml(
      [
        `url: ${url}`,
        `kind: ${kind}`,
        `language: ${lang === 'zh' ? 'zh-CN' : 'en'}`,
        `site: ${brand.name} (${brand.abbr}) / ${brand.zh}`,
        `slogan: ${brand.slogan} / ${brand.sloganZh}`,
        `author: ${site.author}`,
        `role: ${site.role}`,
        `record_started: ${site.start}`,
        `contact: ${site.anchors.email}`,
        `github: ${site.anchors.github ? 'https://github.com/' + site.anchors.github : undefined}`,
        `generated: ${new Date().toISOString()}`,
        ...extra,
      ],
      root,
    ),
    '',
  ] as string[];

/** 逐语言镜像地址：中文保持 `/m/<zone>/<key>.md`（老链接一律不破），英文用 `<key>en.md`。
 *  此前中英共用一个文件（内容是中文），导致英文页对机器声明的镜像是中文正文——
 *  对以英文提问的 AI 引擎等于没有镜像。实测 2026-11-03。 */
export function entryMirrorPath(zone: string, key: string, lang: 'zh' | 'en'): string {
  return `/m/${zone}/${key}${lang === 'en' ? 'en' : ''}.md`;
}

/** 页面路径 → 该页的 Markdown 镜像地址（没有镜像则 null，用于 <link rel="alternate" type="text/markdown">）。
 *  规则：文章页有逐篇镜像（按语言）；已知静态页映射到 /m/pages/<name>.md；其余（分区索引、标签页、工具页）不给。 */
export function mdMirrorFor(path: string): string | null {
  const p = path.replace(/\/+$/, '') || '/';
  const isZh = p.startsWith('/zh');
  const clean = isZh ? p.slice(3) || '/' : p;
  const m = /^\/(journal|essays|guides|notes|projects)\/([\w.-]+)$/.exec(clean);
  if (m) return entryMirrorPath(m[1], m[2], isZh ? 'zh' : 'en');
  const prod = /^\/products\/([\w.-]+)$/.exec(clean);
  if (prod) return `/m/products/${prod[1]}.md`;
  const tool = /^\/tools\/([\w.-]+)$/.exec(clean);
  if (tool) return `/m/tools/${tool[1]}.md`;
  const page = clean === '/' ? 'home' : clean.slice(1);
  const known: PageName[] = ['home', 'about', 'now', 'services', 'support', 'tools', 'products', 'uses', 'verify', 'tags', 'timeline'];
  if (clean === '/tools') return '/m/pages/tools.md';
  return known.includes(page as PageName) ? `/m/pages/${page}.md` : null;
}

/** 整站索引：一个文件读完这个站是什么、有哪些内容、怎么核对。 */
export async function indexDoc(root: URL): Promise<string> {
  const en = await publishedPosts('en');
  const zh = await publishedPosts('zh');
  const ch = await chain();
  const s = stats(en);
  const tags = await tagStats();
  const head = docHeader(`${brand.name} — site index`, root, 'en', [`entries_en: ${en.length}`, `entries_zh: ${zh.length}`, `chain_entries: ${ch.count}`, `chain_head: ${ch.head}`], abs(root, '/m/index.md'), 'markdown-site-index');

  const rules = ui.en.rules.map((r, i) => `${i + 1}. ${r}`);
  const zhRules = ui.zh.rules.map((r, i) => `${i + 1}. ${r}`);

  const lines = [
    ...head,
    `> ${brand.longEn}`,
    `> ${brand.longZh}`,
    '',
    ui.en.intro,
    '',
    ui.zh.intro,
    '',
    '## What is checkable about this record',
    '',
    `- Every published entry is hashed over its **full body** into a SHA-256 chain: \`${ALGORITHM}\``,
    `- Body rule (measured, not assumed): ${BODY_RULE}.`,
    `- Chain: ${ch.count} entries, head \`${ch.head}\` (also in every page footer).`,
    `- Built from commit \`${gitSha ?? 'see built_from in /chain.json'}\` (footer of every page shows the same value).`,
    `- Reproduce: ${VERIFY_STEPS.en.map((s2, i) => `(${i + 1}) ${s2}`).join('  ')}`,
    `- Streak: ${s.streak} consecutive days; ${s.entries} English entries; started ${site.start}.`,
    '',
    '## Machine endpoints',
    '',
    ...MACHINE_URLS.en.map((m) => `- \`${m.path}\` — ${m.label}: ${m.why}`),
    '',
    '## Rules of the record (en)',
    '',
    ...rules,
    '',
    '## 这份记录的规矩（中文）',
    '',
    ...zhRules,
    '',
    '## Sections',
    '',
    ...sections.map((z) => `- ${ui.en.sections[z].name} (\`${z}\`): ${ui.en.sections[z].desc}\n  index: ${abs(root, '/' + z)} · 中文: ${abs(root, '/zh/' + z)}`),
    `- Timeline: ${abs(root, '/timeline')} · 时间线: ${abs(root, '/zh/timeline')}`,
    `- Tags: ${abs(root, '/tags')} — ${tags.length} tags, ${tags.filter((t) => t.count >= 2).length} with their own page`,
    '',
    '## Pages',
    '',
    `- [Home](${abs(root, '/m/pages/home.md')}) · [About](${abs(root, '/m/pages/about.md')}) · [Now](${abs(root, '/m/pages/now.md')}) · [Services](${abs(root, '/m/pages/services.md')}) · [Support](${abs(root, '/m/pages/support.md')}) · [Tools](${abs(root, '/m/pages/tools.md')}) · [Products](${abs(root, '/m/pages/products.md')}) · [Uses](${abs(root, '/m/pages/uses.md')}) · [Verify](${abs(root, '/m/pages/verify.md')}) · [Tags](${abs(root, '/m/pages/tags.md')}) · [Timeline](${abs(root, '/m/pages/timeline.md')})`,
    `- First-party product mirrors: ${abs(root, '/m/products/' + 'soy-candle-kit' + '.md')}`,
    '',
    '## Entries (English, root URLs)',
    '',
    ...en.map(
      (p) =>
        `- [${p.data.title}](${pageUrl(root, 'en', '/' + p.collection + '/' + keyOf(p))}) · \`${p.collection}\` · ${utcDay(p.data.date)} · md: ${abs(root, entryMirrorPath(p.collection, keyOf(p), 'en'))}\n  ${p.data.summary ?? ''}`,
    ),
    '',
    '## 条目（中文，/zh/ 前缀）',
    '',
    ...zh.map(
      (p) =>
        `- [${p.data.title}](${pageUrl(root, 'zh', '/' + p.collection + '/' + keyOf(p))}) · \`${p.collection}\` · ${utcDay(p.data.date)} · md: ${abs(root, entryMirrorPath(p.collection, keyOf(p), 'zh'))}\n  ${p.data.summary ?? ''}`,
    ),
    '',
    '## Contact and citation',
    '',
    `- Author: ${site.author} (${site.role}). Contact: ${site.anchors.email}. Source: ${REPO_URL}`,
    '- Citation: quote short passages with attribution and the canonical `url`. Do not present the `.md` mirror as the publication address.',
    '- Status labels used across the site: 已做 / 首次尝试 / 未验证 (done / first attempt / not verified). Unverified effects are labelled, never claimed.',
    '',
  ];
  return lines.join('\n');
}

/** 全文语料：全部条目正文，英文在前、中文在后，每篇带元数据块。 */
export async function allDoc(root: URL): Promise<string> {
  const en = await publishedPosts('en');
  const zh = await publishedPosts('zh');
  const ch = await chain();
  const head = docHeader(`${brand.name} — full corpus`, root, 'en', [`entries_en: ${en.length}`, `entries_zh: ${zh.length}`, `chain_entries: ${ch.count}`, `chain_head: ${ch.head}`], abs(root, '/m/all.md'), 'markdown-corpus');
  const all = [...en, ...zh];
  const twins = await Promise.all(
    all.map(async (p) => {
      const pool = [...en, ...zh];
      return pool.find((x) => keyOf(x) === keyOf(p) && langOf(x) !== langOf(p));
    }),
  );
  const parts = all.map((p, i) => entryDoc(p, twins[i], root));
  return [...head, `Total: ${all.length} entries (${en.length} English, ${zh.length} Chinese). Full bodies included; chain head above.`, '', ...parts].join('\n');
}

export type PageName = 'home' | 'about' | 'now' | 'services' | 'support' | 'tools' | 'products' | 'uses' | 'verify' | 'tags' | 'timeline';
export const PAGE_NAMES: PageName[] = ['home', 'about', 'now', 'services', 'support', 'tools', 'products', 'uses', 'verify', 'tags', 'timeline'];

/** 工具页的 Markdown 镜像：/m/tools/<slug>.md。公式与算例照抄，机器不跑 JS 也能核对算术。 */
export function toolDoc(t: (typeof toolList)[number], root: URL): string {
  const url = abs(root, '/m/tools/' + t.slug + '.md');
  const head = docHeader(
    `${t.nameEn} / ${t.nameZh}`,
    root,
    'en',
    [
      `tool_slug: ${t.slug}`,
      'kind-of-page: free tool',
      'cost: free',
      'runs: browser-only, no data sent',
      'tracking: none on this page',
      'last_updated: 2026-11-03',
      `canonical_en: ${abs(root, t.href)}`,
      `canonical_zh: ${abs(root, '/zh' + t.href)}`,
      `keywords: ${t.keywordsEn.join(', ')}`,
      `关键词: ${t.keywordsZh.join('、')}`,
    ],
    url,
    'markdown-tool-mirror',
  );
  const inputs = t.fields
    .filter((f) => f.id !== 'pf')
    .map((f) => `- \`${f.id}\` = ${f.value} — ${f.labEn} / ${f.labZh}${f.unitEn ? ` (${f.unitEn})` : ''}: ${f.hintEn}`);
  return [
    ...head,
    `> ${t.descEn}`,
    `> ${t.descZh}`,
    '',
    '## Inputs (defaults, with units) / 输入（默认值与单位）',
    '',
    ...inputs,
    t.fields.some((f) => f.id === 'pf') ? `- \`pf\` = premium factor 溢价系数 2.0 (1.0–4.0)` : '',
    '',
    '## Formula, exactly as the page computes it / 公式（与页面计算完全一致）',
    '',
    '```text',
    ...t.formulaLines,
    '```',
    '',
    '```中文',
    ...t.formulaZhLines,
    '```',
    '',
    '## Worked example / 算例',
    '',
    t.exampleNoteEn,
    '',
    t.exampleNoteZh,
    '',
    '## FAQ / 常见问题',
    '',
    ...t.faq.flatMap((f) => [`**Q (en): ${f.qEn}**`, '', `A: ${f.aEn}`, '', `**Q（中文）：${f.qZh}**`, '', `答：${f.aZh}`, '']),
    `Schema shipped on the HTML page: WebApplication (free) + FAQPage + BreadcrumbList.`,
    `Related guides: ${abs(root, '/guides/2026-10-30-pricing-handmade')} · ${abs(root, '/guides/2026-11-01-shipping-math')}`,
  ]
    .filter((l) => l !== '')
    .join('\n') + '\n';
}

/** 第一方产品页的 Markdown 镜像：/m/products/<slug>.md（数字全带观察时间，不含未验证断言）。 */
export function productDoc(root: URL): string {
  const p = product;
  const url = abs(root, '/m/products/' + p.slug + '.md');
  const head = docHeader(
    `${p.titleEn} / ${p.titleZh}`,
    root,
    'en',
    [
      `product_slug: ${p.slug}`,
      `observed: ${p.observedAt}`,
      `price: ${p.price} ${p.currency}`,
      `list_price: ${p.listPrice} ${p.currency}`,
      `in_stock: ${p.stock}`,
      `reviews: ${p.reviews}`,
      'first_party: true',
      'affiliate: false',
      `canonical_en: ${abs(root, '/products/' + p.slug)}`,
      `canonical_zh: ${abs(root, '/zh/products/' + p.slug)}`,
      `listing: ${p.listingUrl}`,
      `test_writeup: ${abs(root, '/essays/2026-11-03-aieo-product-test')}`,
    ],
    url,
    'markdown-product-mirror',
  );
  return [
    ...head,
    disclosureEn,
    '',
    disclosureZh,
    '',
    `> ${p.pitchEn}`,
    `> ${p.pitchZh}`,
    '',
    '## Contents / 套装内容',
    '',
    '| Qty | Item (en) | 物品（中文） |',
    '|---|---|---|',
    ...p.contents.map((c) => `| ${c.qty} | ${c.itemEn} | ${c.itemZh} |`),
    '',
    '## Holiday fit 2026 (dates cross-checked) / 节日适配',
    '',
    '| Date | Occasion (en) | 节点（中文） | Fit (en) | 用法（中文） |',
    '|---|---|---|---|---|',
    ...p.holidayTable.map((h) => `| ${h.date} | ${h.en} | ${h.zh} | ${h.useEn} | ${h.useZh} |`),
    '',
    '## Claims we do not make / 我们不声称什么',
    '',
    ...p.factsEn.map((f) => `- ${f}`),
    ...p.factsZh.map((f) => `- 中文：${f}`),
    '- No best-selling, ranking, conversion, repeat-purchase or sales figure: nothing we cannot point to a source for.',
    '- No shipping cut-off promise: terms live on the listing page, observed ' + p.observedAt + '.',
    '',
    '## Safety (as the listing states) / 安全提示',
    '',
    ...p.safetyEn.map((s) => `- ${s}`),
    ...p.safetyZh.map((s) => `- 中文：${s}`),
    '',
    '## FAQ / 常见问题',
    '',
    ...p.faq.flatMap((f) => [`**Q (en): ${f.qEn}**`, '', `A: ${f.aEn}`, '', `**Q（中文）：${f.qZh}**`, '', `答：${f.aZh}`, '']),
    `Schema shipped on the HTML page: Product + Offer + FAQPage + BreadcrumbList (no aggregateRating: ${p.reviews} reviews).`,
  ].join('\n') + '\n';
}


/** 静态页的 Markdown 镜像（数据来自与页面相同的来源，不是手抄）。 */
export async function pageDoc(name: PageName, root: URL): Promise<string> {
  const ch = await chain();
  const en = await publishedPosts('en');
  const zh = await publishedPosts('zh');
  const s = stats(en);
  const url = abs(root, '/m/pages/' + name + '.md');
  const head = docHeader(`${brand.name} — ${name}`, root, 'en', [`page: ${name}`, `chain_entries: ${ch.count}`, `chain_head: ${ch.head}`], url);
  const L = (en2: string, zh2: string) => `- EN: ${en2}\n- 中文: ${zh2}`;

  const sec = (t: string) => ['', `## ${t}`, ''] as string[];

  switch (name) {
    case 'home':
      return [
        ...head,
        `> ${brand.longEn}`,
        ui.en.intro,
        '',
        ...sec('Current state'),
        `- Record started ${site.start}; ${s.elapsedDays} days elapsed; ${s.entries} English entries over ${s.activeDays} active days; streak ${s.streak} days.`,
        `- Chain: ${ch.count} entries, head \`${ch.head}\`.`,
        `- Latest: ${s.latest ? s.latest.toISOString() : 'n/a'}`,
        '',
        ...sec('Sections'),
        ...sections.map((z) => `- ${ui.en.sections[z].name}: ${abs(root, '/' + z)} · ${ui.en.sections[z].desc}`),
        L('Tools (free, offline): ' + abs(root, '/tools'), '工具（免费、本地运行）：' + abs(root, '/zh/tools')),
        L('Services: ' + abs(root, '/services'), '合作方式：' + abs(root, '/zh/services')),
        '',
        ...sec('Rules'),
        ...ui.en.rules.map((r, i) => `${i + 1}. ${r}`),
        '',
        L('中文说明：本站英文在根路径，中文在 /zh/ 前缀；两版同 key 互指（hreflang + x-default=英文）。', ''),
      ].join('\n') + '\n';

    case 'about':
      return [
        ...head,
        ui.en.intro,
        '',
        ui.zh.intro,
        '',
        ...sec('Who'),
        `- ${site.author} — ${site.role}. GitHub: ${site.anchors.github ? 'https://github.com/' + site.anchors.github : 'n/a'}. Contact: ${site.anchors.email}.`,
        '- Anchors are deliberately minimal: GitHub handle + site email (the CEO is adding identity anchors step by step).',
        '',
        ...sec('Dual voice'),
        `- Narration is compiled by the OK assistant (\`voice: assistant\`, AI-assisted, labelled on every page). OJ's own words appear only as sourced blockquotes; \`voice: owner\` is used when he writes it himself.`,
        `- Every entry carries an \`owner_rating\` (0-5) and \`owner_note\`. Ratings are the author's to give: the site never invents them, and pending ones display as pending.`,
        '',
        ...sec('Rules of the record'),
        ...ui.en.rules.map((r, i) => `${i + 1}. ${r}`),
        '',
        ...sec('What this site is for'),
        `- Chinese site: inbound commercial enquiries (商单). English site: audience, tools, affiliate disclosure. Billed through a US entity; no ads or sponsored posts; affiliate links disclosed.`,
        `- Insight bar for publishing: every article carries first-party data (including failures), a falsifiable stance with a check date, or a structure nobody else publishes.`,
      ].join('\n') + '\n';

    case 'now':
      return [
        ...head,
        `- This page is a snapshot of the present; history lives in ${abs(root, '/timeline')}.`,
        `- Updated: ${utcDay(new Date())} (UTC).`,
        '',
        ...sec('What is happening'),
        '- Publishing daily on the site; guides are auxiliary to insights, not the headline.',
        '- Building tools for makers (two live: pricing, shipping shape).',
        '- Opened a consulting line (diagnosis, ads build-and-teach) in 2026-11.',
        '- Working on e-commerce systems (ZART) as the main build; only publishable parts are described here.',
        '',
        ...sec('Not yet'),
        '- No third-party timestamp anchor (RFC3161) for the chain head.',
        '- No client-results page (there are no published engagements yet).',
        '- Crawler telemetry: Cloudflare free plan exposes none (measured 2026-11-02).',
      ].join('\n') + '\n';

    case 'services':
      return [
        ...head,
        'Short, bounded engagements for handmade and craft sellers. Plain language, numbers on the table, and a written action list you can run without me.',
        '中文：短周期、有边界的合作。先给结论，数字摊开，最后交你一份不需要我也能执行的行动清单。',
        '',
        ...sec('Strengths'),
        ...strengths.map((x) => `- ${x.en}\n  中文：${x.zh}`),
        '',
        ...sec('Offers'),
        ...offers.flatMap((o) => [`### ${o.titleEn} / ${o.titleZh}`, '', o.descEn, '', o.descZh, '', `_${o.metaEn}_`, `_${o.metaZh}_`, '']),
        ...sec('Who this is not for'),
        ...notFor.map((x) => `- ${x.en}\n  中文：${x.zh}`),
        '',
        ...sec('How I work'),
        ...howIWork.map((x) => `- ${x.en}\n  中文：${x.zh}`),
        '',
        ...sec('Honest status'),
        statusNote.en,
        '',
        statusNote.zh,
        '',
        billing.en,
        '',
        billing.zh,
        '',
        ...sec('FAQ / 常见问题'),
        ...serviceFaq.flatMap((f) => [`**Q (en): ${f.en.q}**`, '', `A: ${f.en.a}`, '', `**Q（中文）：${f.zh.q}**`, '', `答：${f.zh.a}`, '']),
        '',
        L('Page: ' + abs(root, '/services'), '页面：' + abs(root, '/zh/services')),
      ].join('\n') + '\n';

    case 'support':
      return [
        ...head,
        'How to support this record: it is free to read, has no ads, no tracking, and no paywall.',
        '中文：这份记录免费公开阅读，无广告、无付费墙；页面带一枚托管方注入的无 Cookie 访问计数，页脚已披露。',
        '',
        ...sec('Routes that exist today'),
        `- Read it, cite it, link it: canonical URLs above; short quotes with attribution are welcome.`,
        `- Use the free tools: ${abs(root, '/tools')} (no account, runs offline).`,
        `- Commission work: ${abs(root, '/services')} — English track; ${abs(root, '/zh/services')} — 中文线索。`,
        `- Email: ${site.anchors.email}`,
        '',
        ...sec('Routes deliberately not used'),
        '- No advertising, no sponsored posts (CEO decision, recorded in docs/STRATEGY.md).',
        '- Affiliate links only, always disclosed on the page that carries them.',
        '- No donation buttons yet: the support links in site config are intentionally empty, so nothing renders.',
      ].join('\n') + '\n';

    case 'tools':
      return [
        ...head,
        'Free tools for makers. No account, no tracking, everything runs in your browser (the page works offline once loaded).',
        '中文：给手作卖家的免费工具。不注册、输入不出本机，全部在浏览器本地运行。',
        '',
        ...sec('Live'),
        ...tools.filter((t) => t.status === 'live').flatMap((t) => [
          `### ${t.nameEn} / ${t.nameZh}`,
          '',
          `- URL: ${abs(root, t.href)} · 中文: ${abs(root, '/zh' + t.href)}`,
          `- ${t.descEn}`,
          `- 中文：${t.descZh}`,
          '',
        ]),
        ...sec('Planned (not built — do not cite as available)'),
        ...tools.filter((t) => t.status === 'planned').map((t) => `- ${t.nameEn} / ${t.nameZh}: ${t.descEn}`),
      ].join('\n') + '\n';

    case 'products':
      return [
        ...head,
        'First-party products: sold on the marketplace the author runs. Every page states what was measured, when, and what was not tested. Not affiliate links.',
        '中文：第一方商品，卖在作者自己运营的平台。每页写明实测内容与时间、没测过什么；不是联盟链接。',
        '',
        `### ${product.titleEn} / ${product.titleZh}`,
        '',
        `- Canonical (en): ${abs(root, '/products/' + product.slug)} · 中文: ${abs(root, '/zh/products/' + product.slug)}`,
        `- Listing (first-party): ${product.listingUrl}`,
        `- Mirror of the full product page: ${abs(root, '/m/products/' + product.slug + '.md')}`,
        `- Observed ${product.observedAt}: price ${product.price} ${product.currency}, list ${product.listPrice} ${product.currency}, in stock ${product.stock}, reviews ${product.reviews}`,
        `- Contents: ${product.contents.map((c) => `${c.qty} ${c.itemEn}`).join('; ')}`,
        `- Disclosure: ${disclosureEn}`,
        `- 披露：${disclosureZh}`,
        `- Test write-up (method, query panel, check dates): ${abs(root, '/essays/2026-11-03-aieo-product-test')}`,
        `- No claims we cannot check: no yield, success rate, ranking, conversion, sales figure, shipping cut-off.`,
      ].join('\n') + '\n';

    case 'uses':
      return [
        ...head,
        'The tooling I actually use, with why. Not recommendations — a live list. 规矩：不写账号、主机地址、供应商入口、客户数据。',
        '',
        ...(['work', 'build', 'mind', 'life'] as const).map((g) => [
          `## ${ui.en.uses.groups[g] ?? g} / ${ui.zh.uses.groups[g]}`,
          '',
          ...uses.filter((u) => u.group === g).map((u) => `- **${u.name}**${u.status ? ` (${u.status})` : ''}: ${u.why}`),
          '',
        ].join('\n')),
        `Page: ${abs(root, '/uses')} · 中文: ${abs(root, '/zh/uses')}`,
      ].join('\n') + '\n';

    case 'verify':
      return [
        ...head,
        'What is claimed, and how to check it without trusting this site.',
        '',
        ...sec('The chain'),
        `- Algorithm: \`${ALGORITHM}\``,
        `- Body rule (measured): ${BODY_RULE}`,
        `- Entries: ${ch.count}. Head: \`${ch.head}\``,
        `- Machine-readable: ${abs(root, '/chain.json')} — one item per record, in hash order, each with \`source\` (repo path), \`url\`, \`lang\`, \`key\`, \`hash\`.`,
        '',
        ...sec('Reproduce it'),
        ...VERIFY_STEPS.en.map((x, i) => `${i + 1}. ${x}`),
        '',
        '中文复现步骤：',
        ...VERIFY_STEPS.zh.map((x, i) => `${i + 1}. ${x}`),
        '',
        ...sec('Measured result'),
        `- 2026-11-03: ${ch.count}/${ch.count} records recomputed from the public repo to the published head (verifier exit code 0). Of five candidate body rules, only the one above reproduces it.`,
        '',
        ...sec('What this does not prove'),
        '- It does not prove the writing is true; it proves the text was not edited after publication.',
        '- No independent timestamp authority yet (RFC3161 / signing deferred): timing evidence today = Cloudflare Pages deployment + a public Git commit.',
        '',
        ...sec('Endpoints for machines'),
        ...MACHINE_URLS.en.map((m) => `- \`${m.path}\` — ${m.label}`),
      ].join('\n') + '\n';

    case 'tags': {
      const tags = await tagStats();
      const linkable = tags.filter((t) => t.count >= 2);
      return [
        ...head,
        `Topics in this record: ${tags.length} tags total. Tag pages exist only for tags with 2+ entries (thin pages help nobody, including crawlers).`,
        `标签共 ${tags.length} 个；只有条目数 ≥2 的标签建索引页。`,
        '',
        ...sec('Tag pages'),
        ...linkable.map((t) => `- \`${t.tag}\` (${t.count}) → ${abs(root, '/tags/' + t.slug)} · 中文 ${abs(root, '/zh/tags/' + t.slug)}`),
        '',
        ...sec('Single-entry tags (no page)'),
        tags.filter((t) => t.count < 2).map((t) => `- ${t.tag}`).join(', '),
      ].join('\n') + '\n';
    }

    case 'timeline': {
      const all = [...en, ...zh].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
      return [
        ...head,
        `Every published record in reverse chronological order: ${all.length} entries (${en.length} English, ${zh.length} Chinese), from ${site.start} to today.`,
        '',
        ...all.map(
          (p) =>
            `- ${utcDay(p.data.date)} · \`${langOf(p)}\` · ${p.collection} · [${p.data.title}](${pageUrl(root, langOf(p), '/' + p.collection + '/' + keyOf(p))}) · md: ${abs(root, entryMirrorPath(p.collection, keyOf(p), langOf(p)))}`,
        ),
      ].join('\n') + '\n';
    }
  }
}
