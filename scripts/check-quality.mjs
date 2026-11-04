// 第 7 道门禁：文章质量（结构、具体性、无废话）。评分对象是 src/content 下的公开文章。
// 口径写死在下面，任何一条都能在产物上复跑；分数随文章发布，供外部核对。
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const CONTENT = join(ROOT, 'src/content');
const ZONES = ['journal', 'essays', 'guides', 'notes', 'projects'];

const FILLER = [
  'in today', 'in this article', 'we will explore', 'it is important to note', "it's important to note",
  'game-changer', 'game changer', 'delve', 'unlock', 'leverage', 'seamless', 'robust', 'in conclusion',
  'fast-paced world', 'as we all know', 'at the end of the day', 'in today’s',
  '在当今', '在快节奏', '随着科技', '众所周知', '值得一提的是', '需要注意的是', '本文将', '我们将',
  '总之', '综上所述', '赋能', '抓手', '闭环', '生态位', '干货', '良心', '深度剖析', '一文读懂', '带你',
];
const STRONG_OPENER = /^(\*\*[^*\n]{2,220}\*\*\s*[:：]?|\*\*[^*\n]{20,220}\*\*)/;
const hasDate = (t) => /20\d\d-\d\d-\d\d/.test(t);
const numbers = (t) => (t.match(/(?:^|[^a-zA-Z])\d[\d,.]*/g) || []).length;
// 句子数：英文按 . ! ?，中文按 。！？；，行首列表项与表格已剔除
const sentences = (t) => (t.match(/[^.!?\n。！？；]{6,}[.!?。！？；]/g) || []).length;

const clean = (raw) => {
  const body = raw.replace(/^---[\s\S]*?---\s*/, '');
  const prose = body.replace(/^#{1,6} .*$/gm, '').replace(/^>\s?/gm, '').replace(/```[\s\S]*?```/g, '');
  const txt = prose.replace(/\|.*\|/g, ' ').replace(/!?\[[^\]]*\]\([^)]*\)/g, 'link').replace(/[*_`#]/g, '');
  // 套话扫描只看我们自己的话：逐字引用块不计；行内引号里的术语是"提到"不是"使用"，同样不计
  const plain = body.split('\n').filter((l) => !l.startsWith('>')).join('\n').replace(/\|.*\|/g, ' ').replace(/!?\[[^\]]*\]\([^)]*\)/g, 'link').replace(/[*_`#]/g, '').replace(/「[^」]*」/g, ' ').replace(/[“"][^”"]*[”"]/g, ' ');
  return { body, txt, plain };
};

export function scoreArticle({ raw, name }) {
  const lang = (raw.match(/^lang:\s*(.+)$/m) || [, 'en'])[1].trim();
  const cjk = lang === 'zh';
  const { body, txt, plain } = clean(raw);
  const enWords = (txt.match(/[A-Za-z'’-]+/g) || []).length;
  const zhChars = (txt.match(/[一-龥]/g) || []).length;
  const words = cjk ? zhChars : enWords; // 各语言用自己的单位：英文计词，中文计字
  const h2 = (body.match(/^## (?!#)/gm) || []).length;
  const paras = txt.split(/\n\s*\n/).map((s) => s.trim()).filter((s) => s.length > 40);
  const opener = body.split('\n').find((l) => l.trim() && !l.startsWith('#') && !l.startsWith('>')) || '';
  const stance = /\bP\d\b[\s\S]{0,400}?(20\d\d-\d\d-\d\d)|核对日期|check date|核对日/.test(body);
  const filler = FILLER.filter((f) => plain.toLowerCase().includes(f.toLowerCase()));
  const dated = hasDate(body);
  const n = numbers(body);
  const s = Math.max(1, sentences(txt));
  const density = n / s;
  const linkCount = (body.match(/\]\(\/[^)]*\)/g) || []).length;
  const quoteLines = (body.match(/^>.*$/gm) || []).length;
  const perPara = paras.length ? words / paras.length : 999;
  const checks = [
    ['第一屏是可摘走的答案（不是引子）', STRONG_OPENER.test(opener)],
    ['有一手数据/实测（正文含具体数字）', n >= 5],
    ['带日期（日期即证据）', dated],
    ['有可反驳立场或核对日', stance],
    ['结构在 4-9 个 H2 之间', h2 >= 4 && h2 <= 9],
    ['句子具体度（每句≥0.35 个数字）', density >= 0.35],
    ['无 AI 套话', filler.length === 0],
    ['有站内动作（链到工具/指南，读者能拿去用）', linkCount >= 2],
    [cjk ? '长度在 600-2600 字之间' : '长度在 450-1600 词之间', words >= (cjk ? 600 : 450) && words <= (cjk ? 2600 : 1600)],
    [cjk ? '段落不注水（段均 ≤ 200 字）' : '段落不注水（段均 ≤ 90 词）', perPara <= (cjk ? 200 : 90)],
  ];
  return { name, lang, words, h2, n, density: +density.toFixed(2), filler, quoteLines, score: checks.filter((c) => c[1]).length, total: checks.length, fails: checks.filter((c) => !c[1]).map((c) => c[0]) };
}

const rows = [];
for (const z of ZONES) {
  const d = join(CONTENT, z);
  if (!existsSync(d)) continue;
  for (const f of readdirSync(d)) {
    if (!f.endsWith('.md')) continue;
    const raw = readFileSync(join(d, f), 'utf8');
    if (!/^status:\s*public/m.test(raw)) continue;
    const fm = raw.match(/^key:\s*(.+)$/m);
    const lang = (raw.match(/^lang:\s*(.+)$/m) || [, '?'])[1].trim();
    const fallback = f.replace(/\.(en|zh)\.md$/, '').replace(/\.md$/, ''); // 无 key 字段时按文件名推导（去掉语言后缀）
    rows.push({ ...scoreArticle({ raw, name: `${z}/${f}` }), key: fm ? fm[1].trim() : fallback, lang });
  }
}
const byKey = new Map();
for (const r of rows) {
  const cur = byKey.get(r.key);
  if (!cur || r.score < cur.score) byKey.set(r.key, r);
}
const list = [...byKey.values()].sort((a, b) => a.score - b.score || a.name.localeCompare(b.name));
const sum = list.reduce((n, r) => n + r.score, 0);
console.log(`文章质量评分（${list.length} 篇，满分 ${list[0].total}）：平均 ${(sum / list.length).toFixed(1)}；≥8 分 ${list.filter((r) => r.score >= 8).length} 篇；≤5 分 ${list.filter((r) => r.score <= 5).length} 篇`);
for (const r of list) console.log(`  ${r.score}/${r.total}  ${r.name}  [${r.words} 词 / ${r.h2} 个H2 / 数字 ${r.n} / 密度 ${r.density}] 套话:${r.filler.length ? r.filler.join('|') : '无'} 缺：${r.fails.join('；') || '—'}`);

if (process.argv.includes('--gate')) {
  const min = +(process.env.QUALITY_MIN || 8);
  const strict = process.env.QUALITY_STRICT === '1'; // 忽略豁免清单，用来证明这条检查真能判红
  const exPath = join(ROOT, 'scripts/quality-exemptions.json');
  const ex = strict || !existsSync(exPath) ? [] : (JSON.parse(readFileSync(exPath, 'utf8')).exemptions || []);
  const today = new Date().toISOString().slice(0, 10);
  const exMap = new Map(ex.map((e) => [e.key, e]));
  const bad = [];
  for (const r of list) {
    if (r.score >= min) continue;
    const e = exMap.get(r.key);
    if (!e) { bad.push(`${r.name} = ${r.score}/${r.total}，未登记豁免（缺：${r.fails.join('；')}）`); continue; }
    if (e.revise_by < today) bad.push(`${r.name} = ${r.score}/${r.total}，豁免已过期（${e.revise_by}，${e.action}）`);
  }
  if (bad.length) {
    console.error(`\n质量门禁未通过：${bad.length} 篇低于 ${min}/${list[0].total}${strict ? '（QUALITY_STRICT=1：豁免清单已忽略）' : ''}`);
    for (const b of bad.slice(0, 25)) console.error('  - ' + b);
    process.exit(1);
  }
  console.log(`质量自检通过（${list.length} 篇：≥${min} 分 ${list.filter((r) => r.score >= min).length} 篇，登记豁免 ${ex.length} 篇；豁免最早到期 ${ex.length ? ex.map((e) => e.revise_by).sort()[0] : '—'}）`);
}
