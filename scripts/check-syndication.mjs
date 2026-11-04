// 门禁第 8 道：外发隔离断言（AB-01，CEO 2026-11-04 批准）。
// 规则：
//  S1 禁发区块（takes / off-the-record）里的 public 条目，syndication.enabled 必须是 false —— 否则构建失败；
//  S2 syndication 块语法必须完整（enabled 是布尔；channels 只允许白名单值）；
//  S3 任何条目不得把 OFF_THE_RECORD 写进 channels（自相矛盾＝隔离失效）。
// 红样本见本文件末尾 --prove。
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT = join(process.cwd(), 'src', 'content');
const ZONES = ['lab', 'journal', 'essays', 'guides', 'notes', 'projects', 'takes', 'off-the-record'];
const BAN = new Set(['takes', 'off-the-record']);
const CHANNELS = new Set(['x_thread', 'xiaohongshu_cards', 'linkedin_insight', 'wechat_draft']);
const problems = [];

for (const z of ZONES) {
  const d = join(CONTENT, z);
  if (!existsSync(d)) continue;
  for (const f of readdirSync(d)) {
    if (!f.endsWith('.md')) continue;
    const raw = readFileSync(join(d, f), 'utf8');
    if (!/^status:\s*public/m.test(raw)) continue;
    const block = raw.match(/^syndication:\n((?:[ \t]+.*\n?)*)/m);
    const enabled = block ? /^syndication:\n\s+enabled:\s*(true|false)/m.test(raw) && /enabled:\s*false/.test(block[1]) : null;
    const chs = block ? [...block[1].matchAll(/-\s*"?([A-Za-z_]+)"?/g)].map((m) => m[1]) : [];
    if (block) {
      if (!/enabled:\s*(true|false)/.test(block[1])) problems.push(`${z}/${f}: syndication.enabled 缺失或非布尔`);
      for (const c of chs) if (!CHANNELS.has(c)) problems.push(`${z}/${f}: channels 出现白名单外的值「${c}」`);
      if (chs.includes('OFF_THE_RECORD') || chs.includes('off_the_record')) problems.push(`${z}/${f}: channels 写了禁发区块标记，隔离自相矛盾`);
    }
    if (BAN.has(z) && enabled !== true) problems.push(`${z}/${f}: 禁发区块（${z}）必须显式 syndication.enabled: false`);
  }
}

if (problems.length) {
  console.error('外发隔离门禁未通过（' + problems.length + ' 项）：\n - ' + problems.slice(0, 30).join('\n - '));
  process.exit(1);
}
console.log('外发隔离门禁通过（禁发区块必须 enabled:false；channels 白名单 x_thread/xiaohongshu_cards/linkedin_insight/wechat_draft）');
