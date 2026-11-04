// 第 6 道门禁：ZART 创始人原话引用的可核对性与公关边界。
// 每条断言都写明「防什么缺陷」，并由 scripts/prove-quote-gate.mjs 用坏样本证明它会判红。
//
// Q1 逐字命中：登记簿里的 quote 必须能在脱密原文指定行区间内找到（含多行）
//    防：把二手摘要的概括当原话、引用被改写、出处行号断裂（v1 全部踩过）
// Q2 日期诚实：dateLabel 为 null 的条目，出现在页面上时页面必须写「原文未标日期」
//    防：抄二手摘要的【MMDD】标签（实测 L1439 摘要标 0808，原文段落是 2025-11-19）
// Q3 C 类外泄：status=C 的原话与 forbid 短语不得出现在任何 ZART 公开面
//    防：点名贬低同行、自称唯一、对外承诺费率/退款/时效、内部困难与融资数字外泄
// Q4 B 类未批准：status=B 的条目出现在页面上，必须先进批准白名单
//    防：未经 CEO 点头就把商业条款当公开立场
// Q5 公关边界词：ZART 公开面禁止竞争对手名称、排名/绝对化用语、承诺与 SLA 字样
//    防：骂对手、自大、把设想写成承诺
// Q6 登记簿卫生：id 唯一、状态合法、出处齐、C 类必须带 forbid 短语
//    防：登记簿自身烂掉导致前五条形同虚设
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const CONTENT = join(ROOT, 'src', 'content');
// 登记簿含 C 类原话与"不得公开"标注：只准待在本机 local/（.gitignore 内）。
// 放进公开仓库 = 直接把禁语发出去（2026-11-04 实测曾整份公开，见 AGENTS 记录）。
const REGISTRY = join(ROOT, 'local', 'zart-quotes.json');
const APPROVED = join(ROOT, 'local', 'zart-quotes-approved.json');
export const CORPUS_DEFAULT = 'C:/Users/OwenJiong/Desktop/ZART开发-本地/A-ZART资料0301/CEO笔记_20261014/01_CEO笔记_脱密版';

// 去 markdown 列表符号与粗体、空白等价（原文里有 U+00A0 不换行空格：实测 L1904「工具␠␠进行」、L1911「“故事”␠时」），
// 让「整行/行内片段」两种引用都能逐字比对；文字内容仍要求逐字
export const norm = (s) =>
  String(s)
    .replace(/\r\n/g, '\n')
    .replace(/[\u00A0\u202F\u3000]/g, ' ')
    .replace(/\*\*/g, '')
    .replace(/^[ \t]*[-*•][ \t]+/gm, '')
    .replace(/^[ \t]*\d+[.、][ \t]*/gm, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();

export function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(html?|md|xml|txt|json)$/i.test(name)) out.push(p);
  }
  return out;
}

// ZART 公开面 = 路径含 /zart 的产物与内容（站点其余页面允许讨论 Etsy 等话题，不在本门禁范围）
export const isZartFace = (p) => /(^|[\\/])zart([\\/]|$)/i.test(relative(ROOT, p).replace(/^[^\\/]+[\\/]/, ''));

export function checkQuotes({ registry, approved, pages, corpusRoot, corpusAvailable = true }) {
  const problems = [];
  const ids = new Set();
  const approvedSet = new Set(approved);
  const zartPages = pages.filter((p) => p.zart);
  // 引用了登记簿原话的「单页」也算 ZART 公开面（文章 slug 未必含 zart）。
  // 聚合文件（llms-full.txt、m/all.md）天然含全站文本，不纳入扫描面，避免自伤。
  const quoteCores = registry.map((q) => norm(q.quote));
  const faces = [
    ...zartPages,
    ...pages.filter((p) => /index\.html$/i.test(p.name) && !p.zart && quoteCores.some((c) => c.length > 12 && norm(p.text).includes(c))),
  ];

  // Q6 登记簿卫生
  for (const q of registry) {
    for (const key of ['id', 'file', 'lineFrom', 'lineTo', 'quote', 'theme', 'status']) {
      if (q[key] === undefined || q[key] === null || q[key] === '') problems.push(`Q6 登记簿 ${q.id ?? '?'} 缺字段 ${key}`);
    }
    if (!['A', 'B', 'C'].includes(q.status)) problems.push(`Q6 ${q.id} 状态非法：${q.status}`);
    if (ids.has(q.id)) problems.push(`Q6 登记簿 id 重复：${q.id}`);
    ids.add(q.id);
    if (q.status === 'C' && !(Array.isArray(q.forbid) && q.forbid.length)) problems.push(`Q6 C 类 ${q.id} 必须给 forbid 短语`);
    if (q.rawTag && !/^(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/.test(q.rawTag)) problems.push(`Q6 ${q.id} rawTag 非法（应为 MMDD）：${q.rawTag}`);
    if ('dateLabel' in q) problems.push(`Q6 ${q.id} 仍带旧字段 dateLabel（年份不可证，字段已废）`);
  }

  const corpusFiles = new Map();
  for (const q of registry) {
    if (!corpusAvailable) break;
    // Q1 逐字命中
    const path = join(corpusRoot, q.file);
    if (!existsSync(path)) {
      problems.push(`Q1 ${q.id} 找不到脱密原文：${q.file}`);
      continue;
    }
    if (!corpusFiles.has(path)) corpusFiles.set(path, readFileSync(path, 'utf8').split(/\r?\n/));
    const lines = corpusFiles.get(path);
    if (!(q.lineFrom >= 1) || q.lineTo > lines.length) {
      problems.push(`Q1 ${q.id} 行号越界：${q.lineFrom}-${q.lineTo}（文件 ${lines.length} 行）`);
      continue;
    }
    const window = norm(lines.slice(q.lineFrom - 1, q.lineTo).join('\n'));
    if (!window.includes(norm(q.quote))) {
      problems.push(`Q1 ${q.id} 引用与脱密原文 ${q.file}:L${q.lineFrom}-${q.lineTo} 不逐字一致（引用被改写或行号错）`);
    }
    // Q1b 日期标记必须真在该行里（v1 的日期全来自索引推断与摘要自造标签，实测语料内 0 个年份锚点）
    if (q.rawTag && !lines.slice(q.lineFrom - 1, q.lineTo).join('\n').includes(q.rawTag)) {
      problems.push(`Q1b ${q.id} 的日期标记 ${q.rawTag} 不在所引原文行内（标签是编的）`);
    }
    if (q.year) problems.push(`Q1b ${q.id} 不得带年份（语料内无年份锚点）：${q.year}`);
  }

  // Q2 日期诚实 + Q3 C 类外泄 + Q4 B 类批准
  for (const q of registry) {
    const core = norm(q.quote);
    const shown = zartPages.filter((p) => norm(p.text).includes(core));
    if (q.status === 'C') {
      for (const p of shown) problems.push(`Q3 C 类原话出现在公开面：${q.id} → ${p.name}`);
      for (const phrase of q.forbid ?? []) {
        for (const p of zartPages) if (norm(p.text).includes(norm(phrase))) problems.push(`Q3 C 类禁语出现在公开面：「${phrase}」(${q.id}) → ${p.name}`);
      }
    }
    if (q.status === 'B' && shown.length && !approvedSet.has(q.id)) {
      problems.push(`Q4 B 类未经批准不得公开：${q.id}（${q.ask ?? '需 CEO 点头'}）`);
    }
    if (q.status !== 'C' && !q.rawTag && shown.length) {
      const markers = ['原文未标日期', 'no date in source'];
      for (const p of shown) if (!markers.some((m) => norm(p.text).includes(m))) problems.push(`Q2 ${q.id} 原文行内没有日期标记，页面必须写「原文未标日期 / no date in source」：${p.name}`);
    }
  }

  // Q5 公关边界（只在 ZART 公开面与引用了登记簿原话的单页生效）
  const rivals = ['Etsy', 'Shopify', 'Amazon', 'eBay', 'Makely', 'Storenvy', 'artisans.coop', 'novica', 'Kiwico', 'Uncommon Goods', 'Cratejoy'];
  const absolutes = ['唯一', '仅次于', '最好的', '行业第一', '第一名', '最优质'];
  const promises = ['承诺', '保证', '全额退款', '免费退货', '1min', '每1分钟', '一定退', '必定'];
  for (const p of faces) {
    const t = norm(p.text);
    // Q2b：不得把语料年份当事实写出来（实测：脱密笔记里 0 个年份锚点，索引的年份全是推断）
    const yearPair = /(原文|笔记|脱密|脱密原文|source)[^<\n]{0,60}(20\d{2})|(20\d{2})[^<\n]{0,40}(原文|笔记|脱密)/g;
    for (const m of t.matchAll(yearPair)) problems.push(`Q2b 语料年份不可证，公开页不得出现：「${m[0].slice(0, 70)}」→ ${p.name}`);
    for (const w of rivals) if (t.includes(w)) problems.push(`Q5 ZART 公开面出现竞争对手名称「${w}」：${p.name}`);
    for (const w of absolutes) if (t.includes(w)) problems.push(`Q5 ZART 公开面出现排名/绝对化用语「${w}」：${p.name}`);
    for (const w of promises) if (t.includes(w)) problems.push(`Q5 ZART 公开面出现承诺/SLA 用语「${w}」：${p.name}`);
    for (const w of ['GMV', '营收', '融资', '估值', 'CAC', '卖家数', '万人民币', '亿美金']) if (t.includes(w)) problems.push(`Q5 ZART 公开面出现商业数字用语「${w}」：${p.name}`);
    // Q7 流程残留：项目管理语言不得当内容发（CEO 2026-11-03：读者看这些得到什么？）
    for (const w of ['作废', '门禁', '登记表', '白名单', '红证', '坏样本', '断言', '流水线', '逐条勾选', '需 OJ', '需 CEO', 'v1 的', 'A 类', 'B 类', 'C 类']) {
      if (t.includes(w)) problems.push(`Q7 内部流程用语出现在公开页「${w}」：${p.name}`);
    }
  }

  return problems;
}

if (process.argv[1] && process.argv[1].replace(/\\/g, '/').endsWith('scripts/check-quotes.mjs')) {
  if (!existsSync(REGISTRY)) {
    console.error(`引用门禁无法运行：登记簿不在本机 ${REGISTRY}。它按规矩只待在 .gitignore 内的 local/，构建区须同步该目录后再跑。`);
    process.exit(1);
  }
  // Q8：登记簿被 git 跟踪 = C 类原话与"不得公开"标注已进公开树，直接判死
  try {
    const { execSync } = await import('node:child_process');
    const tracked = execSync('git ls-files -- src/data/zart-quotes.json src/data/zart-quotes-approved.json', { cwd: ROOT, encoding: 'utf8' }).trim();
    if (tracked) {
      console.error('Q8 登记簿在公开仓库里被跟踪（C 类原话泄露）：\n  ' + tracked.split('\n').join('\n  ') + '\n  处理：git rm --cached 该文件，正文移入 local/，并清理历史。');
      process.exit(1);
    }
  } catch { /* 构建镜像无 .git：跳过 Q8 */ }
  const registry = JSON.parse(readFileSync(REGISTRY, 'utf8'));
  const approved = existsSync(APPROVED) ? JSON.parse(readFileSync(APPROVED, 'utf8')) : [];
  const corpusRoot = process.env.ZART_CORPUS || CORPUS_DEFAULT;
  const corpusAvailable = existsSync(corpusRoot);
  const pages = [...walk(DIST), ...walk(CONTENT)]
    .filter((p) => !p.includes('node_modules'))
    .map((p) => ({ name: relative(ROOT, p).split(sep).join('/'), zart: isZartFace(p), text: readFileSync(p, 'utf8') }));
  const zartPages = pages.filter((p) => p.zart);
  // 与 checkQuotes 内部同一口径：引用了登记簿原话的单页也算公开面（日志要说真数，别说只数路径的那个数）
  const cores = registry.map((q) => norm(q.quote));
  const widened = pages.filter((p) => /index\.html$/i.test(p.name) && !p.zart && cores.some((c) => c.length > 12 && norm(p.text).includes(c)));
  const problems = checkQuotes({ registry, approved, pages, corpusRoot, corpusAvailable });
  const by = (s) => registry.filter((q) => q.status === s).length;
  if (!corpusAvailable) console.log(`  提示：脱密原文语料不可达（${corpusRoot}），Q1 逐字核对跳过，其余规则照常生效`);
  if (problems.length) {
    console.error(`引用/公关门禁未通过（${problems.length} 项）：`);
    for (const p of problems.slice(0, 40)) console.error('  - ' + p);
    process.exit(1);
  }
  console.log(
    `引用/公关门禁通过（登记 ${registry.length} 条：A ${by('A')} / B ${by('B')} / C ${by('C')}；` +
      `已批准 ${approved.length} 条 B 类；ZART 公开面 ${zartPages.length + widened.length} 个（路径含 zart ${zartPages.length} + 因引用原话并入 ${widened.length}）；逐字核对 ${corpusAvailable ? '已跑' : '跳过'}）`,
  );
}
