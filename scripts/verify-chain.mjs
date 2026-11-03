// 独立核对记录链：不依赖本站代码，只用 /chain.json + 公开仓库的原文重算链头。
// 用法：node scripts/verify-chain.mjs [--site https://orangeknows.com]
// 退出码 0 = 链头一致（内容未被事后改动）；非 0 = 不一致或取数失败。
import { createHash } from 'node:crypto';

const sha256 = (s) => createHash('sha256').update(s, 'utf8').digest('hex');
const args = process.argv.slice(2);
const siteUrl = args[args.indexOf('--site') + 1] || 'https://orangeknows.com';
const GENESIS_PREFIX = 'GENESIS:';

const get = async (url, opt = {}) => {
  const r = await fetch(url, { redirect: 'follow', cache: 'no-store', ...opt });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  return r;
};

const chainJson = await (await get(`${siteUrl}/chain.json`)).json();
const { head, count, built_from: sha, genesis, items, algorithm } = chainJson;
console.log(`chain.json: count=${count} built_from=${sha} items=${items.length}`);
if (items.length !== count) {
  console.error(`FAIL: items(${items.length}) 与 count(${count}) 不一致，无法重算`);
  process.exit(2);
}
console.log(`算法: ${algorithm}`);

// 正文 = 去掉 YAML frontmatter、并把换行统一为 \n 后的内容（与站点的 v2 哈希口径一致）
const stripFrontmatter = (text) => {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  return (m ? text.slice(m[0].length) : text).replace(/\r\n/g, '\n');
};

const base = `https://raw.githubusercontent.com/OwenJiong24/personal-site/${sha}`;
let hash = `${GENESIS_PREFIX}${genesis}`;
let missing = 0;
const diffs = [];

for (const it of items) {
  let body;
  try {
    body = stripFrontmatter(await (await get(`${base}/${it.source}`)).text());
  } catch (e) {
    missing += 1;
    diffs.push(`  取不到源文件: ${it.source} (${e.message})`);
    body = '';
  }
  hash = sha256(`${hash}|${it.i}|${it.id}|${it.date}|${it.title}|${body}`);
  if (hash !== it.hash) diffs.push(`  第 ${it.i} 条 ${it.id} 链上哈希不符`);
}

const ok = hash === head && diffs.length === 0;
console.log(`重算链头: ${hash}`);
console.log(`公布链头: ${head}`);
if (diffs.length) console.log(diffs.join('\n'));
console.log(ok ? `PASS: ${count} 条记录逐条重算后链头一致（取数 ${items.length - missing} 条源文件）` : 'FAIL: 链头不一致，内容可能被改动或源文件取不全');
process.exit(ok ? 0 : 1);
