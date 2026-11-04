// 构建后自检：每个页面的 canonical 必须等于它自己的地址，hreflang 指向的译文页必须存在。
// 背景：2026-10-30 把英文改成默认语言时，静态页的 path 参数漏改，导致所有中文页的 canonical
// 指向英文页（Google 会判定为重复页），线上跑了一段时间才被发现。这个门禁防止它再发生。
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = process.argv[2] ?? 'dist';

// 站内地址统一成「无尾斜杠」，根是 '/'
const norm = (p) => {
  const clean = ('/' + String(p).replace(/^\/+/, '').replace(/\/+$/, '')).replace(/^\/+$/, '/');
  return clean === '/' ? '/' : clean;
};

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith('.html')) files.push(p);
  }
};
walk(DIST);

const urlOf = (file) => {
  const rel = relative(DIST, file).split(sep).join('/');
  return norm(rel.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, ''));
};
const existsPage = (pathName) => {
  const p = norm(pathName);
  if (p === '/') return existsSync(join(DIST, 'index.html'));
  return existsSync(join(DIST, p.slice(1), 'index.html')) || existsSync(join(DIST, p.slice(1) + '.html'));
};

const problems = [];
// 泄露面：英文页只准放译文。CEO 的手打原文（含笔误、履历数字）只出现在中文站。
const CJK_RUN = /[\u4e00-\u9fff][\u4e00-\u9fff\u3000\uff0c\u3002\uff1f\uff01\uff1a\uff1b\u201c\u201d\u2018\u2019\uff08\uff09、\s]{19,}[\u4e00-\u9fff]/g;
const RAW_TYPOS = ['enmdorse', '没一个维度'];
for (const file of files) {
  const url = urlOf(file);
  if (url.startsWith('/zh')) continue;
  // 故意双语的工具页（noindex，不进索引/语料）：404。其它英文页成串中文一律红。
  if (url === '/404') continue;
  const text = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
  for (const w of RAW_TYPOS) if (text.includes(w)) problems.push(`泄露：英文页 ${url} 含中文手打原文特征串「${w}」`);
  const runs = text.match(CJK_RUN);
  if (runs) problems.push(`泄露：英文页 ${url} 出现成串中文（${runs[0].length} 字）：${runs[0].slice(0, 28)}…——原文只发中文站`);
}
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const self = urlOf(file);
  const noindex = /<meta name="robots" content="[^"]*noindex/.test(html);
  const can = /rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  if (!can) {
    if (!noindex) problems.push(`${self}: 缺 canonical`);
    continue;
  }
  const canPath = norm(new URL(can).pathname);
  if (canPath !== self) problems.push(`${self}: canonical 指向 ${canPath}（规范地址应等于自身）`);

  for (const m of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
    const [, code, href] = m;
    const target = norm(new URL(href).pathname);
    if (!existsPage(target)) problems.push(`${self}: hreflang ${code} 指向 ${target}，产物里不存在（会 404）`);
  }
}

if (problems.length) {
  console.error(`canonical/hreflang 自检未通过（${problems.length} 项）：\n - ` + problems.slice(0, 40).join('\n - '));
  process.exit(1);
}
console.log(`canonical/hreflang 与语言泄露自检通过（${files.length} 个页面，规范地址与译文互指都对）`);
