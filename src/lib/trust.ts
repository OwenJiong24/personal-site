import { createHash } from 'node:crypto';
import { getCollection } from 'astro:content';
import { site } from './site';

export type Post =
  | Awaited<ReturnType<typeof getCollection<'journal'>>>[number]
  | Awaited<ReturnType<typeof getCollection<'insights'>>>[number]
  | Awaited<ReturnType<typeof getCollection<'work'>>>[number];

const t = (p: Post) => p.data.date.getTime();

/** 上线可见的文章（草稿与未来日期不进构建）。新→旧。 */
export async function publishedPosts(): Promise<Post[]> {
  const [journal, insights, work] = await Promise.all([
    getCollection('journal'),
    getCollection('insights'),
    getCollection('work'),
  ]);
  return [...journal, ...insights, ...work]
    .filter((p) => (p.data as { status: string }).status === 'public')
    .filter((p) => t(p) <= Date.now())
    .sort((a, b) => t(b) - t(a)) as Post[];
}

/** 某分区文章，新→旧。 */
export async function publishedIn(zone: 'journal' | 'insights' | 'work'): Promise<Post[]> {
  const all = await getCollection(zone);
  return all
    .filter((p) => (p.data as { status: string }).status === 'public')
    .filter((p) => t(p) <= Date.now())
    .sort((a, b) => t(b) - t(a)) as Post[];
}

const sha256 = (s: string) => createHash('sha256').update(s, 'utf8').digest('hex');

/**
 * 记录链：把全部公开文章按时间升序串成一条哈希链。
 * 目的是让「时间积累」可核对——发布后任何一篇被改动，链头摘要都会变，
 * 链头随每次构建写进页面；配合 Git 提交与 Pages 部署时间，第三方也能核对。
 */
export async function chain() {
  const posts = (await publishedPosts()).slice().sort((a, b) => t(a) - t(b)); // 旧→新
  let hash = `GENESIS:${site.start}`;
  const byId = new Map<string, string>();
  posts.forEach((p, i) => {
    hash = sha256(`${hash}|${i}|${p.id}|${p.data.date.toISOString()}|${p.data.title}`);
    byId.set(p.id, hash);
  });
  return { head: hash, byId, count: posts.length, ids: posts.map((p) => p.id) };
}

/** UTC 日期字符串（本工作区约定：时间一律 UTC）。 */
export const utcDay = (d: Date) => d.toISOString().slice(0, 10);

const dayMs = 86_400_000;

/** 连续记录天数：从最近一篇往回数，逐日不断。 */
export function streakDays(posts: Post[]): number {
  const days = [...new Set(posts.map((p) => utcDay(p.data.date)))].sort().reverse();
  if (days.length === 0) return 0;
  let n = 1;
  for (let i = 1; i < days.length; i += 1) {
    if (Date.parse(days[i - 1]) - Date.parse(days[i]) === dayMs) n += 1;
    else break;
  }
  return n;
}

/** 首页统计：已持续天数、记录总数、连续天数。 */
export function stats(posts: Post[]) {
  const days = new Set(posts.map((p) => utcDay(p.data.date)));
  const startMs = Date.parse(`${site.start}T00:00:00Z`);
  const elapsed = Math.max(1, Math.ceil((Date.now() - startMs) / dayMs) + 1);
  return {
    elapsedDays: elapsed,
    entries: posts.length,
    activeDays: days.size,
    streak: streakDays(posts),
    latest: posts[0]?.data.date,
  };
}
