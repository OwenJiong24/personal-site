// 红证门：证明 check-quotes 的每条断言「坏样本判红、好样本判绿」。
// 规矩来自 ZART 交件闸门：说不出防什么缺陷的断言等于没有断言；「绿」必须有坏样本证明。
// 跑法：node scripts/prove-quote-gate.mjs
import { existsSync, readFileSync } from 'node:fs';
import { checkQuotes, CORPUS_DEFAULT, norm } from './check-quotes.mjs';

const registry = JSON.parse(readFileSync('src/data/zart-quotes.json', 'utf8'));
const corpusRoot = process.env.ZART_CORPUS || CORPUS_DEFAULT;
const corpusAvailable = existsSync(corpusRoot);
const clone = (x) => JSON.parse(JSON.stringify(x));
const page = (text, name = 'dist/zart/index.html') => [{ name, zart: true, text }];
const get = (id) => registry.find((q) => q.id === id);

const A_null_date = get('drill-not-worthless');
const A_plain = get('mission-efficiency-serves-people');
const B_item = get('rank-suppress-fake-data');
const C_item = get('forbid-consume-nourish-competitor');

// 好样本：A 类原话 + 无日期条目已标「原文未标日期」+ 无竞对名/无承诺词
const goodText = [
  '<html><body>',
  `<blockquote>「${norm(A_plain.quote)}」</blockquote>`,
  `<blockquote>「${norm(A_null_date.quote)}」</blockquote><p>（原文未标日期）</p>`,
  `<p>出处：脱密原文 灵感备忘录/重要且紧急_脱密版.md:L1787</p>`,
  '</body></html>',
].join('\n');

const cases = [
  {
    rule: '好样本',
    prevents: '证明门禁不是空转（全绿要有对照）',
    input: { registry, approved: [], pages: page(goodText) },
    expect: 'green',
  },
  {
    rule: 'Q1 逐字',
    prevents: '引用被改写/行号错/摘要概括当原话',
    input: { registry: (() => { const r = clone(registry); const t = r.find((q) => q.id === 'mission-efficiency-serves-people'); t.quote = 'Mission：效率服务于客户'; return r; })(), approved: [], pages: [] },
    expect: 'Q1',
  },
  {
    rule: 'Q1 真实逃逸样本',
    prevents: 'v1 实际犯的错：引用二手摘要的概括（带省略号与改写）',
    input: {
      registry: (() => { const r = clone(registry); r[0].quote = 'Etsy 和 Shopify 都在『消耗』工匠…而我们，是这个行业唯一的『滋养者』'; return r; })(),
      approved: [],
      pages: [],
    },
    expect: 'Q1',
  },
  {
    rule: 'Q1b 自造日期标记',
    prevents: 'v1 的真实错：把摘要自造的【0808】当原文标记',
    input: { registry: (() => { const r = clone(registry); r.find((q) => q.id === 'value-story-effort-scarcity').rawTag = '0808'; return r; })(), approved: [], pages: [] },
    expect: 'Q1b',
  },
  {
    rule: 'Q1b 登记簿带年份',
    prevents: '把索引推断的年份写成事实（语料内 0 个年份锚点）',
    input: { registry: (() => { const r = clone(registry); r.find((q) => q.id === 'value-story-effort-scarcity').year = '2025-11-19'; return r; })(), approved: [], pages: [] },
    expect: 'Q1b',
  },
  {
    rule: 'Q2b 页面写语料年份',
    prevents: '页面上出现「原文 2025-11-19」这类不可证年份',
    input: { registry, approved: [], pages: page(`<p>「${norm(A_plain.quote)}」—— 脱密原文 2025-11-19（原文未标日期）</p>`) },
    expect: 'Q2b',
  },
  {
    rule: 'Q6 旧字段残留',
    prevents: '旧 dateLabel 混进登记簿，年份规则失效',
    input: { registry: (() => { const r = clone(registry); r.find((q) => q.id === 'position-enable-light-social').dateLabel = '2025-06-04'; return r; })(), approved: [], pages: [] },
    expect: 'Q6',
  },
  {
    rule: 'Q2 日期',
    prevents: '把摘要【MMDD】当日期；原文无日期时不给标注',
    input: { registry, approved: [], pages: page(`<p>「${norm(A_null_date.quote)}」—— OJ，2025-08-08</p>`) },
    expect: 'Q2',
  },
  {
    rule: 'Q3 C 类禁语',
    prevents: '点名贬低同行 + 自称唯一（v1 全文都在这条上翻车）',
    input: { registry, approved: [], pages: page('<p>我们是这个行业唯一的「滋养者」</p>') },
    expect: 'Q3',
  },
  {
    rule: 'Q3 C 类原话',
    prevents: '内部经营困难清单被贴到公开页',
    input: { registry, approved: [], pages: page('<p>当年四条判断：资金量不够</p>') },
    expect: 'Q3',
  },
  {
    rule: 'Q4 B 类未批准',
    prevents: '未经 CEO 点头把排序政策当公开立场',
    input: { registry, approved: [], pages: page(`<p>「${norm(B_item.quote)}」</p><p>（原文未标日期）</p>`) },
    expect: 'Q4',
  },
  {
    rule: 'Q4 B 类已批准对照',
    prevents: '证明批准白名单确实放行（门禁不是永久红灯）',
    input: { registry, approved: [B_item.id], pages: page(`<p>「${norm(B_item.quote)}」</p><p>（原文未标日期）</p>`) },
    expect: 'green',
  },
  {
    rule: 'Q5 竞对名 + 排名',
    prevents: '骂对手、自我排名（「仅次于 Etsy」这类）',
    input: { registry, approved: [], pages: page('<p>我们仅次于Etsy，这是最好的位置</p>') },
    expect: 'Q5',
  },
  {
    rule: 'Q5 承诺/SLA',
    prevents: '把设想写成对外承诺（退款、时效、保证）',
    input: { registry, approved: [], pages: page('<p>我们承诺：不满意全额退款，客服 1min 内响应</p>') },
    expect: 'Q5',
  },
  {
    rule: 'Q5 商业数字',
    prevents: '融资/GMV/卖家规模等机密进公开页',
    input: { registry, approved: [], pages: page('<p>我们的 GMV 与卖家数在涨</p>') },
    expect: 'Q5',
  },
  {
    rule: 'Q6 登记簿卫生',
    prevents: 'id 重复导致批准白名单与核对串号',
    input: { registry: (() => { const r = clone(registry); r.push(clone(A_plain)); return r; })(), approved: [], pages: [] },
    expect: 'Q6',
  },
  {
    rule: 'Q6 C 类缺禁语',
    prevents: 'C 类没有 forbid 短语 → 只能整段命中，改写就漏过',
    input: { registry: (() => { const r = clone(registry); r.find((q) => q.id === C_item.id).forbid = []; return r; })(), approved: [], pages: [] },
    expect: 'Q6',
  },
];

let bad = 0;
console.log(`红证门（语料${corpusAvailable ? '可达' : '不可达：Q1 用例只验登记簿结构'}）`);
for (const c of cases) {
  const problems = checkQuotes({ ...c.input, corpusRoot, corpusAvailable });
  const isGreen = problems.length === 0;
  const ok = c.expect === 'green' ? isGreen : problems.some((p) => p.startsWith(c.expect));
  if (!ok) bad += 1;
  console.log(`  ${ok ? 'OK ' : 'BAD'} ${c.rule.padEnd(18)} 期望 ${c.expect.padEnd(6)} 实得 ${isGreen ? '绿(0)' : problems.length + ' 项红'} | 防：${c.prevents}`);
  if (!isGreen && c.expect === 'green') console.log('      意外红：' + problems.slice(0, 3).join(' ; '));
}
console.log(bad ? `FAIL: ${bad} 个用例不符合预期 → 门禁不可信` : `PASS: ${cases.length} 个用例全部符合预期（每条断言都有坏样本判红 + 好样本判绿）`);
process.exit(bad ? 1 : 0);
