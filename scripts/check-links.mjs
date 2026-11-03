// 构建后门禁：扫全部产物里的内部链接与资源引用，任何指向不存在页面的链接 = 构建失败。
// 动机：2026-10-30 英文默认改版后，多个页面链到尚未存在的 /en/* 页面，构建全绿而线上一片 404。
// 覆盖：HTML 的 href/src 与页内锚点、canonical、hreflang、/llms.txt、/llms-full.txt、
//       两路 RSS、sitemap、以及关键产物是否齐全。
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = process.argv[2] ?? 'dist';
const norm = (p) => {
  const s = ('/' + String(p).replace(/^\/+/, '').split('?')[0].split('#')[0].replace(/\/+$/, '')).replace(/^\/+$/, '/');
  return s === '' ? '/' : s;
};
const existsPage = (pathName) => {
  const p = norm(pathName);
  if (p === '/') return existsSync(join(DIST, 'index.html'));
  const rel = p.slice(1);
  return (
    existsSync(join(DIST, rel, 'index.html')) ||
    existsSync(join(DIST, rel + '.html')) ||
    existsSync(join(DIST, rel)) // 真实文件（css/js/png/xml/json/svg/txt）
  );
};

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else files.push(p);
  }
};
walk(DIST);

const problems = [];
const seen = new Set();
const add = (from, to, why) => {
  const k = `${from}->${to}`;
  if (seen.has(k)) return;
  seen.add(k);
  problems.push(`${from}: ${why} → ${to}`);
};

// 1) HTML：内部链接、相对链接、页内锚点、canonical、hreflang
const pages = files.filter((f) => f.endsWith('.html'));
for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  const self = norm(relative(DIST, f).split(sep).join('/').replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, ''));
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = m[1];
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(raw)) continue;
    if (raw.startsWith('#')) {
      const id = raw.slice(1);
      if (id && !new RegExp(`id="${id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(html)) add(self, raw, '页内锚点不存在');
      continue;
    }
    if (!raw.startsWith('/')) {
      const abs = norm(self === '/' ? '/' + raw : self.replace(/\/$/, '') + '/' + raw);
      if (!existsPage(abs)) add(self, raw, '相对链接指向不存在的页面');
      continue;
    }
    if (!existsPage(raw)) add(self, raw, '内部链接指向不存在的页面');
  }
  const can = /rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  if (can && !existsPage(new URL(can).pathname)) add(self, can, 'canonical 指向不存在页面');
  for (const m of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
    if (!existsPage(new URL(m[2]).pathname)) add(self, m[2], `hreflang ${m[1]} 指向不存在页面`);
  }
}

// 2) 机器可读入口里列出的本站 URL（外链只保留不核）
const selfHost = (u) => {
  const h = new URL(u).hostname;
  return h === 'orangeknows.com' || h === 'www.orangeknows.com';
};
for (const name of ['llms.txt', 'llms-full.txt']) {
  const f = join(DIST, name);
  if (!existsSync(f)) { problems.push(`${name}: 文件不存在`); continue; }
  for (const m of readFileSync(f, 'utf8').matchAll(/https?:\/\/[^\s)>]+/g)) {
    const u = m[0].replace(/[.,)]+$/, '');
    // 带占位符的模式说明（/m/<section>/<key>.md）是文档写法，不是可点链接
    if (u.includes('%3C') || u.includes('<') || u.includes('%3E') || u.includes('>')) continue;
    if (!selfHost(u)) continue;
    if (!existsPage(new URL(u).pathname)) add(name, u, '列出但线上不存在');
  }
}
for (const name of ['rss.xml', join('zh', 'rss.xml')]) {
  const f = join(DIST, name);
  if (!existsSync(f)) { problems.push(`${name}: 文件不存在`); continue; }
  for (const m of readFileSync(f, 'utf8').matchAll(/<link>(https?:\/\/[^<]+)<\/link>/g)) {
    if (!selfHost(m[1])) continue;
    if (!existsPage(new URL(m[1]).pathname)) add(name, m[1], 'RSS 条目链接 404');
  }
}
const smIndex = join(DIST, 'sitemap-index.xml');
if (existsSync(smIndex)) {
  for (const m of readFileSync(smIndex, 'utf8').matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)) {
    const relPath = new URL(m[1]).pathname.replace(/^\//, '');
    if (!existsSync(join(DIST, relPath))) { add('sitemap-index.xml', m[1], 'sitemap 子文件缺失'); continue; }
    for (const s of readFileSync(join(DIST, relPath), 'utf8').matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>([\s\S]*?)<\/url>/g)) {
      if (!selfHost(s[1])) continue;
      if (!existsPage(new URL(s[1]).pathname)) add('sitemap', s[1], 'sitemap URL 404');
      // 语言标注必须和 URL 前缀一致：英文默认后，根路径页在 sitemap 里不能标成 zh-Hans
      const isZhUrl = new URL(s[1]).pathname.startsWith('/zh/');
      const tags = [...s[2].matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)];
      for (const t of tags) {
        const target = new URL(t[2]).pathname.startsWith('/zh/');
        if (t[1] === 'en' && target) add('sitemap', t[2], 'hreflang en 指向 /zh/ 路径');
        if (t[1] === 'zh-Hans' && !target) add('sitemap', t[2], 'hreflang zh-Hans 指向非 /zh/ 路径（英文页被当中文上报）');
      }
      const langs = tags.map((t) => t[1] + '|' + t[2]);
      if (new Set(langs).size !== langs.length) add('sitemap', s[1], 'sitemap 语言条目重复');
      if (isZhUrl && !tags.some((t) => t[1] === 'zh-Hans')) add('sitemap', s[1], '中文页缺 zh-Hans 自指条目');
    }
  }
}

// 3) 关键产物与首页完整性
for (const need of [
  'index.html', '404.html', 'rss.xml', join('zh', 'rss.xml'), 'llms.txt', 'llms-full.txt', 'chain.json', 'sitemap-index.xml',
  'favicon.svg', 'favicon.ico', 'favicon-16.png', 'favicon-32.png', 'favicon-48.png',
  'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'maskable-icon-512.png', 'logo-512.png', 'site.webmanifest',
  '_headers', '_redirects',
]) {
  if (!existsSync(join(DIST, need))) problems.push(`缺关键产物: ${need}`);
}
const home = readFileSync(join(DIST, 'index.html'), 'utf8');
for (const [label, re] of [
  ['首页缺 html lang="en"', /<html[^>]*\blang="en"/],
  ['首页缺 canonical', /rel="canonical"/],
  ['首页缺 og:image', /property="og:image"/],
  ['首页缺 JSON-LD', /application\/ld\+json/],
  ['首页缺到中文站的语言开关', /href="\/zh\/"/],
  ['head 缺 favicon.ico 声明', /rel="shortcut icon"[^>]*favicon\.ico/],
  ['head 缺 apple-touch-icon 声明', /rel="apple-touch-icon"/],
  ['head 缺 webmanifest 声明', /rel="manifest"[^>]*site\.webmanifest/],
  ['head 缺 theme-color', /name="theme-color"/],
  ['og:image 尺寸与实际 2400x1260 不符', /og:image:width" content="2400"[\s\S]{0,80}og:image:height" content="1260"/],
  ['首页 JSON-LD 缺 Organization 实体', /"@type":"Organization"/],
  ['首页 JSON-LD 缺 logo 字段', /"logo":\{"@type":"ImageObject"/],
  ['首页 JSON-LD 缺 sameAs 共指', /"sameAs":\[/],
]) if (!re.test(home)) problems.push(`完整性: ${label}`);

// 3b) 文章页 publisher 必须是 Organization（带 logo），不能是 Person（Google 文章富结果要求）
const articleShells = files.filter((f) => /\\(journal|essays|guides|notes|projects)\\.+\\index\.html$/.test(f));
for (const f of articleShells) {
  const t = readFileSync(f, 'utf8');
  if (/"publisher":\{"@type":"Person"/.test(t)) add(f.replace(DIST, ''), '/about', 'publisher 写成了 Person');
  if (!/"publisher":\{"@type":"Organization"/.test(t)) add(f.replace(DIST, ''), '/about', '缺 Organization publisher');
}

if (problems.length) {
  console.error(`链接/完整性自检未通过（${problems.length} 项）：`);
  for (const p of problems.slice(0, 60)) console.error('  - ' + p);
  process.exit(1);
}
console.log(`链接/完整性自检通过（${pages.length} 页 + 机器可读入口，无死链、关键产物齐）`);
