// 发布前 lint：公开内容进公网，红线用机器拦，不靠自觉。
// 拦：1) sensitive=true 却 public；2) public 缺 summary；3) frontmatter 值含 ASCII 冒号未加引号（会让 Astro 静默炸）；
//     4) 凭据/主机/内部标识样式；5) 非本站域名的邮箱（允许域名从 site.ts 的 brand.domain 读，不写死）。
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const CONTENT = join(ROOT, 'src', 'content');

// 本站公开邮箱域名：从唯一配置处读，域名改了这里自动跟
const siteSrc = existsSync(join(ROOT, 'src', 'lib', 'site.ts')) ? readFileSync(join(ROOT, 'src', 'lib', 'site.ts'), 'utf8') : '';
const brandDomain = (/domain:\s*'([^']+)'/m.exec(siteSrc) ?? [])[1] ?? 'orangeknows.com';
const emailOk = new RegExp(`@[${brandDomain.replace(/\./g, '\\.')}]\\b`);

const BAD = [
  [/\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{10,}/, 'GitHub 令牌样式'],
  [/github_pat_[A-Za-z0-9_]{10,}/, 'GitHub 细粒度令牌样式'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'AWS access key 样式'],
  [/BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/, '私钥内容'],
  [/\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/, 'JWT 样式'],
  [/(password|passwd|secret|token|api[_-]?key)\s*[:=]\s*['"]?[^\s'"]{6,}/i, '明文口令/密钥赋值'],
  [/\b(10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/, '内网 IP'],
  [/(某主机|生产库|面板地址|后台地址|bastion|ssh -p\s*\d{2,5})/i, '生产/主机标识'],
  [/[\w.+-]+@[\w-]+\.[\w-]+\.[a-z]{2,}\b/i, '邮箱（只允许本站域名）'],
];

function files(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...files(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

const errors = [];
for (const file of files(CONTENT)) {
  const rel = relative(ROOT, file).replace(/\\/g, '/');
  const text = readFileSync(file, 'utf8');
  const fm = /^---\n([\s\S]*?)\n---/.exec(text);
  const head = fm ? fm[1] : '';

  for (const line of head.split('\n')) {
    const m = /^\s*(?:-\s*)?([A-Za-z_][\w-]*):\s+(.*)$/.exec(line);
    if (!m) continue;
    const val = m[2];
    const quoted = /^["'].*["']$/.test(val) || /^\[.*\]$/.test(val);
    if (!quoted && /:\s/.test(val)) {
      errors.push(`${rel}: frontmatter「${m[1]}」的值含冒号且未加引号 → ${val.slice(0, 40)}`);
    }
  }

  const isPublic = /^\s*status:\s*public\s*$/m.test(head);
  const isSensitive = /^\s*sensitive:\s*true\s*$/m.test(head);
  if (isPublic && isSensitive) errors.push(`${rel}: sensitive=true 且 status=public（需 CEO 过目后再发）`);
  if (isPublic && !/^\s*summary:\s*\S/m.test(head)) errors.push(`${rel}: public 文缺 summary（列表页与 SEO 摘要）`);
  if (isPublic && !/^\s*(lang|key):/m.test(head)) errors.push(`${rel}: public 文缺 lang/key 声明（双语与 URL 依赖它）`);

  for (const [re, why] of BAD) {
    const m = re.exec(text);
    if (!m) continue;
    if (why === '邮箱（只允许本站域名）' && emailOk.test(m[0])) continue;
    errors.push(`${rel}: 命中「${why}」→ ${m[0].slice(0, 24)}…（删掉或改为定性描述）`);
  }
}

if (errors.length) {
  console.error('内容红线检查未通过：\n' + errors.map((e) => ' - ' + e).join('\n'));
  process.exit(1);
}
console.log(`内容红线检查通过（公开文件不含凭据/主机/内部标识；邮箱域名白名单：${brandDomain}）`);
