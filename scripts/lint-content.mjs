// 发布前 lint：公开内容进公网，红线用机器拦，不靠自觉。
// 规则：1) sensitive=true 不得 public；2) 命中密钥/主机/内部标识样式即失败；3) public 文必须有 summary。
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const CONTENT = join(ROOT, 'src', 'content');

const BAD = [
  [/\b(ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{10,}/, 'GitHub 令牌样式'],
  [/github_pat_[A-Za-z0-9_]{10,}/, 'GitHub 细粒度令牌样式'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'AWS access key 样式'],
  [/BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/, '私钥内容'],
  [/\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/, 'JWT 样式'],
  [/(password|passwd|secret|token|api[_-]?key)\s*[:=]\s*['"]?[^\s'"]{6,}/i, '明文口令/密钥赋值'],
  [/\b(10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})\b/, '内网 IP'],
  [/[\w.+-]+@[\w-]+\.[\w.-]+\.(cn|com|net|org)\b(?![^)]*owenjiong)/, '非公开邮箱（公开锚点只允许本站域名邮箱）'],
  [/(某主机|生产库|面板地址|后台地址|bastion|ssh -p\s*\d{2,5})/i, '生产/主机标识'],
];

function files(dir) {
  const out = [];
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
  // frontmatter 值里出现「ASCII 冒号+空格」会让 YAML 把值当嵌套映射，Astro 构建直接炸在 content sync，
  // 报错只给个行列号很难查。在这里拦下来。
  for (const line of head.split('\n')) {
    const m = /^([A-Za-z_][\w-]*):\s+(.*)$/.exec(line);
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
  for (const [re, why] of BAD) {
    const m = re.exec(text);
    if (m) errors.push(`${rel}: 命中「${why}」→ ${m[0].slice(0, 24)}…（删掉或改为定性描述）`);
  }
}

if (errors.length) {
  console.error('内容红线检查未通过：\n' + errors.map((e) => ' - ' + e).join('\n'));
  process.exit(1);
}
console.log('内容红线检查通过（公开文件不含密钥/主机/内部标识样式）');
