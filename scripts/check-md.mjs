// 构建后门禁：Markdown 镜像必须与线上内容一致，否则构建失败。
// 拦的是真实风险：镜像一旦漏更，AI 读到的就是旧内容，而页面上写着"整站可读"。
// 用法：node scripts/check-md.mjs [dist]
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = process.argv[2] ?? 'dist';
const problems = [];
const need = (cond, msg) => { if (!cond) problems.push(msg); };
const read = (p) => readFileSync(p, 'utf8');
const size = (p) => statSync(p).size;

// 1) 两个总入口
for (const f of ['m/index.md', 'm/all.md']) {
  const p = join(DIST, f);
  need(existsSync(p), `缺 Markdown 入口: /${f}`);
  if (existsSync(p)) need(size(p) > 2000, `Markdown 入口过小（${size(p)} 字节）: /${f}`);
}
if (problems.length) {
  console.error('Markdown 镜像自检未通过：\n' + problems.map((x) => '  - ' + x).join('\n'));
  process.exit(1);
}

const chainJson = JSON.parse(read(join(DIST, 'chain.json')));
const index = read(join(DIST, 'm/index.md'));
const all = read(join(DIST, 'm/all.md'));

// 2) 每条链上记录都要有对应 .md 镜像，且元数据齐、正文非空
let mirrors = 0;
const missing = [];
for (const it of chainJson.items) {
  const key = it.key ?? it.id;
  const p = join(DIST, 'm', it.zone, key + '.md');
  if (!existsSync(p)) { missing.push(`${it.zone}/${key}`); continue; }
  const t = read(p);
  mirrors += 1;
  for (const field of ['url: ', 'kind: markdown-mirror', 'language: ', 'section: ', 'key: ', 'date_published: ', 'voice: ', 'record_chain: ']) {
    if (!t.includes(field)) problems.push(`/m/${it.zone}/${key}.md 缺元数据字段 "${field.trim()}"`);
  }
  if (t.trim().split('\n').length < 12) problems.push(`/m/${it.zone}/${key}.md 正文过短（${t.trim().split('\n').length} 行）`);
  if (!t.includes(chainJson.head) && !t.includes('/chain.json')) problems.push(`/m/${it.zone}/${key}.md 没指向记录链`);
}
need(missing.length === 0, `缺 ${missing.length} 篇镜像：${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ' …' : ''}`);
need(mirrors === chainJson.count, `镜像数 ${mirrors} 与链上记录数 ${chainJson.count} 不一致`);

// 3) index.md 要覆盖每条记录、每个页面镜像、链头
for (const it of chainJson.items) {
  const key = it.key ?? it.id;
  need(index.includes(`/m/${it.zone}/${key}.md`), `index.md 未收录 /m/${it.zone}/${key}.md`);
}
need(index.includes(chainJson.head), 'index.md 未写出链头');
need(index.includes('/m/all.md'), 'index.md 未指向全文语料');

// 4) 页面镜像：至少 8 个，且都被 index.md 链接
const pageDir = join(DIST, 'm', 'pages');
need(existsSync(pageDir), '缺目录 /m/pages/');
const pageFiles = existsSync(pageDir) ? readdirSync(pageDir).filter((f) => f.endsWith('.md')) : [];
need(pageFiles.length >= 8, `页面镜像只有 ${pageFiles.length} 个（应 ≥8）`);
for (const f of pageFiles) {
  need(size(join(pageDir, f)) > 500, `页面镜像过小: /m/pages/${f}（${size(join(pageDir, f))} 字节）`);
  need(index.includes(`/m/pages/${f}`), `index.md 未链接 /m/pages/${f}`);
}

// 5) all.md 的正文条数
const corpus = (all.match(/kind: markdown-mirror/g) ?? []).length;
need(corpus === chainJson.count, `/m/all.md 收录 ${corpus} 篇，应为 ${chainJson.count} 篇`);

// 6) 每个文章页 HTML 都要带 <link rel="alternate" type="text/markdown">
const htmlPages = [];
const walk = (dir) => {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) walk(p);
    else if (n.endsWith('.html')) htmlPages.push(p);
  }
};
walk(DIST);
const articleHtml = htmlPages.filter((p) => /\\(journal|essays|guides|notes|projects)\\/.test(p));
let linked = 0;
for (const p of articleHtml) {
  if (read(p).includes('type="text/markdown"')) linked += 1;
  else problems.push(`${p.replace(DIST, '')} 缺 Markdown 镜像 link`);
}
need(linked === articleHtml.length, `文章页 ${linked}/${articleHtml.length} 带镜像 link`);

// 7) llms.txt 要指向 Markdown 镜像
const llms = read(join(DIST, 'llms.txt'));
need(llms.includes('/m/index.md'), 'llms.txt 未指向 /m/index.md');
need(llms.includes('/m/all.md'), 'llms.txt 未指向 /m/all.md');
need((llms.match(/\| md: /g) ?? []).length >= chainJson.count / 2, 'llms.txt 条目清单未附 md 地址');

// 8) _headers 要把 .md 声明为 text/markdown（Cloudflare 默认按 text/plain 发）
const headers = read(join(DIST, '_headers'));
need(/text\/markdown/.test(headers), '_headers 未给 /m/* 声明 Content-Type: text/markdown');

if (problems.length) {
  console.error(`Markdown 镜像自检未通过（${problems.length} 项）：`);
  for (const p of problems.slice(0, 40)) console.error('  - ' + p);
  process.exit(1);
}
console.log(
  `Markdown 镜像自检通过（${mirrors} 篇单篇 + ${pageFiles.length} 个页面镜像 + 索引/全文，` +
  `链 ${chainJson.count} 条；${linked}/${articleHtml.length} 个文章页带 link）`,
);
