// 本机外发草稿生成器（AB-01 的第二半，CEO 2026-11-04 批准）。
// 铁律：① 只出草稿，不发布、不调用任何平台 API；② 禁发区块（takes/off-the-record）与 syndication.enabled:false 一律跳过；
// ③ 输出只落在工作区 `OrangeKnows\strategy\外发草稿\`（不在公开仓）；④ 每条都标"待 OJ 过目"，改完由人发。
// 用法：node scripts/syndicate.mjs [--days 7]
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT = join(process.cwd(), 'src', 'content');
const OUT = 'C:/Users/OwenJiong/Desktop/OrangeKnows/strategy/外发草稿';
const SITE = 'https://orangeknows.com';
const ZONES = ['lab', 'journal', 'essays', 'guides', 'notes', 'projects', 'takes', 'off-the-record'];
const BAN = new Set(['takes', 'off-the-record']);
const LABEL = { x_thread: 'X / Threads（一句结论 + 链）', xiaohongshu_cards: '小红书（分步卡片文案）', linkedin_insight: 'LinkedIn（高管/PM 洞察体）', wechat_draft: '公众号（长文改写草稿）' };

const days = Number((process.argv.find((a) => a.startsWith('--days')) || '').split(' ')[1] || process.argv.includes('--days') ? (process.argv[process.argv.indexOf('--days') + 1] || 7) : 7);
// 默认只出最近 10 篇：一摞 56 份草稿没人会读，外发要的是"本周发哪几条"，不是全量倾倒
const limitArg = process.argv.indexOf('--limit');
const LIMIT = limitArg >= 0 ? Number(process.argv[limitArg + 1]) : 10;
const cutoff = Date.now() - days * 86400_000;

const parse = (raw) => {
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const f = m[1];
  const g = (k) => (f.match(new RegExp('^' + k + ':\\s*(.+)$', 'm')) || [, ''])[1].trim().replace(/^["']|["']$/g, '');
  return {
    title: g('title'), key: g('key'), lang: g('lang'), date: g('date'), summary: g('summary'),
    status: g('status'),
    synOff: /syndication:[\s\S]*enabled:\s*false/.test(f),
    channels: [...f.matchAll(/^\s{4}-\s*"?([A-Za-z_]+)"?/gm)].map((x) => x[1]),
  };
};

const items = [];
for (const z of ZONES) {
  const d = join(CONTENT, z);
  if (!existsSync(d)) continue;
  for (const f of readdirSync(d)) {
    if (!f.endsWith('.md')) continue;
    const p = parse(readFileSync(join(d, f), 'utf8'));
    if (!p || p.status !== 'public') continue;
    if (Date.parse(p.date) < cutoff) continue;
    if (BAN.has(z) || p.synOff) { console.log(`  跳过（禁发区/隔离）：${z}/${f}`); continue; }
    const chs = p.channels.length ? p.channels : ['x_thread'];
    items.push({ zone: z, file: f, p, chs });
  }
}

items.sort((a, b) => Date.parse(b.p.date) - Date.parse(a.p.date));
const picked = items.slice(0, LIMIT);
const stamp = new Date().toISOString().slice(0, 10);
const dir = join(OUT, stamp);
mkdirSync(dir, { recursive: true });
let n = 0;
for (const { zone, p, chs } of picked) {
  const base = zone === 'journal' ? `/${zone}` : `/${zone}`;
  const url = (p.lang === 'zh' ? '/zh' : '') + base + '/' + p.key + '/';
  for (const ch of chs) {
    const body = [
      `# 外发草稿 · ${LABEL[ch] || ch}`,
      '',
      `> 状态：**待 OJ 过目**（未发布、未调用任何平台接口）。生成：${new Date().toISOString().slice(0, 16)}Z（本机脚本 syndicate.mjs）`,
      '',
      `**原文链接**：${SITE}${url}`,
      `**Markdown 镜像**：${SITE}/m/${zone}/${p.key}${p.lang === 'en' ? 'en' : ''}.md`,
      `**发布日期**：${p.date}（UTC）｜ **语言**：${p.lang} ｜ **区块**：${zone}`,
      '',
      '## 原文标题',
      '',
      p.title,
      '',
      '## 一句话结论（原文 summary，可整段摘走）',
      '',
      p.summary || '（原文未写 summary，请补一句再发）',
      '',
      '## 本渠道改写要求（人工执行，脚本不代发）',
      '',
      ch === 'x_thread' && '- 一条推：结论句 + 一个带日期的数字 + 链；不堆标签，不写"干货必看"。',
      ch === 'xiaohongshu_cards' && '- 3:4 卡片 4-6 张：首图＝结论句；每卡一步；末图＝链 + 链摘要 8 位；标题写搜索意图。',
      ch === 'linkedin_insight' && '- 洞察体：先判断、后依据；署名 OJ；不写内部困难、不写没跑过的效果。',
      ch === 'wechat_draft' && '- 长文改写：保留出处与日期；外链在文中说明不可点；文末放本站规范地址。',
      '',
      '## 发布后回填（journal 记一行）',
      '',
      `- 渠道：${ch}｜原文 key：${p.key}｜发出时间（UTC）：待填｜被否/被删：待填`,
      '',
    ].filter((l) => l !== false).join('\n');
    writeFileSync(join(dir, `${p.key}.${p.lang}.${ch}.md`), body, 'utf8');
    n++;
  }
}
console.log(`外发草稿生成：候选 ${items.length} 篇（近 ${days} 天）→ 取最近 ${picked.length} 篇 → ${n} 份草稿；目录 ${dir}`);
console.log('规矩：脚本不发任何东西。草稿由 OJ 过目后手工发布，发完在 journal 记渠道与时间（被否也要记）。');
