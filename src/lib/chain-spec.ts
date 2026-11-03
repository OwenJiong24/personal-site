// 记录链的公开规格：算法串、仓库、正文口径、复现步骤。
// chain.json 端点、/verify 页（中英）、以及 Markdown 镜像 (/m/pages/verify.md) 都读这里，
// 三处共用一份事实，避免"页面上写的算法"与"实际哈希"脱节。

export const REPO_URL = 'https://github.com/OwenJiong24/personal-site';

/** 与 src/lib/trust.ts 的 chain() 保持一致；改哈希口径必须同时改这里与 scripts/verify-chain.mjs。 */
export const ALGORITHM =
  'SHA256(prev | index | id | ISO8601 date | title | body), starting from GENESIS:<start>, entries in ascending time order; both the Chinese and the English version count as separate entries';

/** 实测出来的正文口径（五种候选里唯一能复现公布链头的一种，2026-11-03 实测 38/38）。 */
export const BODY_RULE =
  'the hashed body = the Markdown file with YAML frontmatter removed, surrounding whitespace trimmed, newlines normalised to \\n; the listing summary field is not hashed';

export const VERIFY_STEPS: Record<'en' | 'zh', string[]> = {
  en: [
    `Clone the source: git clone ${REPO_URL}`,
    'Check out the commit shown in the page footer as "built from" (also in /chain.json as built_from).',
    'Run: node scripts/verify-chain.mjs',
    'It downloads /chain.json, fetches every record\'s Markdown source from the public repo, recomputes all digests, and exits non-zero if anything differs.',
  ],
  zh: [
    `克隆源码：git clone ${REPO_URL}`,
    '检出页脚 "built from" 标明的提交号（/chain.json 里的 built_from 同一个值）。',
    '运行：node scripts/verify-chain.mjs',
    '它会下载 /chain.json，从公开仓库逐条取回记录的 Markdown 原文，重算全部摘要，任一条对不上就以非零码退出。',
  ],
};

export const MACHINE_URLS: Record<'en' | 'zh', { label: string; path: string; why: string }[]> = {
  en: [
    { label: 'Machine index (Markdown)', path: '/m/index.md', why: 'the whole site as one Markdown file for AI harnesses' },
    { label: 'Full corpus (Markdown)', path: '/m/all.md', why: 'every published entry, full body, one file' },
    { label: 'Per-entry Markdown mirror', path: '/m/<section>/<key>.md', why: 'canonical metadata block + body' },
    { label: 'llms.txt index', path: '/llms.txt', why: 'plain-text index' },
    { label: 'llms-full.txt', path: '/llms-full.txt', why: 'plain-text full corpus' },
    { label: 'chain.json', path: '/chain.json', why: 'the chain, one item per record, with source paths' },
    { label: 'RSS', path: '/rss.xml', why: 'English feed (Chinese at /zh/rss.xml)' },
    { label: 'Sitemap', path: '/sitemap-index.xml', why: 'URL list with language alternates' },
  ],
  zh: [
    { label: '机器索引（Markdown）', path: '/m/index.md', why: '整站一份 Markdown，给 AI harness 一次读全' },
    { label: '全文语料（Markdown）', path: '/m/all.md', why: '全部已发布条目正文，单文件' },
    { label: '单篇 Markdown 镜像', path: '/m/<分区>/<key>.md', why: '规范元数据块 + 正文' },
    { label: 'llms.txt 索引', path: '/llms.txt', why: '纯文本索引' },
    { label: 'llms-full.txt', path: '/llms-full.txt', why: '纯文本全文' },
    { label: 'chain.json', path: '/chain.json', why: '记录链，每条一个 item，含源文件路径' },
    { label: 'RSS', path: '/zh/rss.xml', why: '中文订阅（英文在 /rss.xml）' },
    { label: '站点地图', path: '/sitemap-index.xml', why: 'URL 清单与语言互指' },
  ],
};
