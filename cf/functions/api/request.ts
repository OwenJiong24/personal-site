/// <summary>
/// Cloudflare Pages Function：真实写入端点（留言 / 提问 / 咨询）。
/// 同一个仓的静态产物 + 这个端点 = 站点仍是静态构建，十年后照样能构建；写入走 D1。
/// 路由：POST /api/request（JSON 或表单），GET /api/request?path=…（只返回已发布留言）。
/// 隐私：只存 IP 的 SHA-256 前 16 位哈希做限流，不存 IP 原文；email 不对外返回。
/// </summary>
type Env = {
  COMMENTS_DB: D1Database;
};

type Kind = 'comment' | 'question' | 'lead';
const KINDS = new Set<string>(['comment', 'question', 'lead']);

const cors = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex',
};

function clean(s: string, max: number): string {
  return s
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max);
}

/** 站内路径白名单：防开放重定向，也防把任意外链塞进数据。 */
function safePath(p: string): string | null {
  const v = clean(p, 120);
  if (!v.startsWith('/') || v.startsWith('//')) return null;
  if (!/^\/[a-z0-9][a-z0-9/-]{0,118}\/?$/.test(v)) return null;
  return v.endsWith('/') ? v : v + '/';
}

async function ipHash(request: Request): Promise<string> {
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || 'unknown';
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + '|ok-2026'));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16);
}

async function readForm(request: Request): Promise<Record<string, string>> {
  const ct = request.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    try {
      const j = (await request.json()) as Record<string, unknown>;
      const out: Record<string, string> = {};
      for (const k of Object.keys(j)) out[k] = typeof j[k] === 'string' ? (j[k] as string) : '';
      return out;
    } catch {
      return {};
    }
  }
  const fd = await request.formData();
  const out: Record<string, string> = {};
  fd.forEach((v, k) => {
    out[k] = typeof v === 'string' ? v : '';
  });
  return out;
}

export async function onRequestGet(context: { request: Request; env: Env }): Promise<Response> {
  const url = new URL(context.request.url);
  const path = url.searchParams.get('path');
  if (!path) return new Response(JSON.stringify({ ok: false, error: 'path required' }), { status: 400, headers: cors });
  const p = safePath(path);
  if (!p) return new Response(JSON.stringify({ ok: false, error: 'bad path' }), { status: 400, headers: cors });
  const { results } = await context.env.COMMENTS_DB.prepare(
    "SELECT id, kind, name, body, lang, created_at FROM requests WHERE path = ? AND status = 'published' AND kind = 'comment' ORDER BY created_at DESC LIMIT 60",
  ).bind(p).all();
  return new Response(JSON.stringify({ ok: true, path: p, items: results ?? [] }), { headers: cors });
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const f = await readForm(context.request);
  const wantsJson = (context.request.headers.get('accept') || '').includes('application/json') || (context.request.headers.get('content-type') || '').includes('json');
  const reply = (status: number, obj: Record<string, unknown>, redirect?: string) => {
    if (!wantsJson && redirect) {
      return new Response(null, { status: 303, headers: { Location: redirect + (redirect.includes('?') ? '&' : '?') + 'posted=1', 'Cache-Control': 'no-store' } });
    }
    return new Response(JSON.stringify(obj), { status, headers: cors });
  };

  // 蜜罐字段：机器人填了就直接丢弃（装作成功），人类看不见这个字段
  if (clean(f.hp || '', 40) !== '') return reply(200, { ok: true, ignored: true });

  const kind = (f.kind || 'comment').trim() as Kind;
  if (!KINDS.has(kind)) return reply(400, { ok: false, error: 'kind must be comment, question or lead' });

  const path = safePath(f.path || '');
  if (!path) return reply(400, { ok: false, error: 'path must be an internal page' });

  const name = clean(f.name || '', 60);
  if (name.length < 1) return reply(400, { ok: false, error: 'name required' });

  const body = clean(f.body || '', 1200);
  if (body.length < 4) return reply(400, { ok: false, error: 'message too short' });

  const email = clean(f.email || '', 120).toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/.test(email)) return reply(400, { ok: false, error: 'bad email' });

  const lang = f.lang === 'en' ? 'en' : 'zh';
  const hash = await ipHash(context.request);

  const recent = await context.env.COMMENTS_DB.prepare(
    "SELECT COUNT(*) AS n FROM requests WHERE ip_hash = ? AND created_at > datetime('now', '-30 minutes')",
  ).bind(hash).first<{ n: number }>();
  if ((recent?.n ?? 0) >= 5) return reply(429, { ok: false, error: 'too many submissions, try again later' });

  const res = await context.env.COMMENTS_DB.prepare(
    'INSERT INTO requests (kind, path, lang, name, email, body, status, ip_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  )
    .bind(kind, path, lang, name, email || null, body, 'pending', hash)
    .run();

  const id = (res.meta as { last_row_id?: number })?.last_row_id ?? 0;
  const back = kind === 'comment' ? path : '/contact/';
  return reply(200, { ok: true, id, status: 'pending', note: 'after review it appears on the page' }, wantsJson ? undefined : path);
  void back;
}
