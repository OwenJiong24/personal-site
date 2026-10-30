// 构建后自检：token 与暗色块必须进产物 CSS。漏 import tokens.css 会让整站颜色失效且不报错。
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(process.cwd(), 'dist', '_astro');
if (!existsSync(dir)) {
  console.error('dist/_astro 不存在，先跑 astro build');
  process.exit(1);
}
const css = readdirSync(dir).filter((f) => f.endsWith('.css'));
const all = css.map((f) => readFileSync(join(dir, f), 'utf8')).join('\n');

const checks = [
  ['--bg 定义（tokens.css 是否被 import）', /--bg:\s*oklch/],
  ['暗色轴 [data-theme=dark]', /\[data-theme\s*=\s*["']?dark["']?\]/],
  ['正文排版 .prose', /\.prose/],
];
const missing = checks.filter(([, re]) => !re.test(all)).map(([name]) => name);
if (missing.length) {
  console.error('CSS 自检未通过，缺：\n - ' + missing.join('\n - '));
  process.exit(1);
}
console.log(`CSS 自检通过（${css.length} 个文件，token 与暗色都在产物里）`);
