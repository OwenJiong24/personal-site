type Env = { COMMENTS_DB: D1Database };

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex',
};

/**
 * GET /api/health —— 只读的"真的参数"：站内留言/提问的实时计数。
 * 用途：验证 D1 绑定是否生效（未绑定时这里会红），并给 CEO 一个无需面板的核对入口。
 * 不返回任何 email、IP、正文。
 */
export async function onRequestGet(context: { env: Env }): Promise<Response> {
  const d1 = context.env.COMMENTS_DB;
  if (!d1) {
    return new Response(JSON.stringify({ ok: false, error: 'COMMENTS_DB binding missing' }), { status: 500, headers });
  }
  try {
    const row = await d1
      .prepare(
        "SELECT COUNT(*) AS total," +
          " SUM(CASE WHEN kind='comment' THEN 1 ELSE 0 END) AS comments," +
          " SUM(CASE WHEN kind='question' THEN 1 ELSE 0 END) AS questions," +
          " SUM(CASE WHEN kind='lead' THEN 1 ELSE 0 END) AS leads," +
          " SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) AS pending," +
          " SUM(CASE WHEN status='published' THEN 1 ELSE 0 END) AS published," +
          " MAX(created_at) AS last_at FROM requests",
      )
      .first<Record<string, number | string | null>>();
    return new Response(
      JSON.stringify({
        ok: true,
        service: 'orangeknows-requests',
        asOf: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
        total: row?.total ?? 0,
        comments: row?.comments ?? 0,
        questions: row?.questions ?? 0,
        leads: row?.leads ?? 0,
        pending: row?.pending ?? 0,
        published: row?.published ?? 0,
        lastAt: row?.last_at ?? null,
      }),
      { headers },
    );
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: (e as Error).message.slice(0, 160) }), { status: 500, headers });
  }
}
