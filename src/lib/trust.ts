import { createHash } from 'node:crypto';
import { getCollection } from 'astro:content';
import { site } from './site';
import type { Lang } from './i18n';

export type Zone = 'journal' | 'insights' | 'work';

export type Post =
  | Awaited<ReturnType<typeof getCollection<'journal'>>>[number]
  | Awaited<ReturnType<typeof getCollection<'insights'>>>[number]
  | Awaited<ReturnType<typeof getCollection<'work'>>>[number];

const t = (p: Post) => p.data.date.getTime();

/** 语言与文章键都来自 frontmatter（Astro 的 glob loader 会吃掉文件名里的点，不能靠文件名）。 */
export const langOf = (p: Post): Lang => (p.data as { lang?: Lang }).lang ?? 'zh';

const stripLangSuffix = (id: string, lang: Lang) => {
  if (id.endsWith('.' + lang)) return id.slice(0, -(lang.length + 1));
  if (id.endsWith(lang)) return id.slice(0, -lang.length);
  return id;
};

export const keyOf = (p: Post) =>
  (p.data as { key?: string }).key ?? stripLangSuffix(p.id, langOf(p));

/** 全部可公开条目（草稿与未来日期不进构建），中文与英文都包含。新→旧。 */
async function allPublic(): Promise<Post[]> {
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

/** 某语言的可公开条目，新→旧。 */
export async function publishedPosts(lang: Lang = 'zh'): Promise<Post[]> {
  return (await allPublic()).filter((p) => langOf(p) === lang);
}

/** 某分区 + 某语言，新→旧。 */
export async function publishedIn(zone: Zone, lang: Lang = 'zh'): Promise<Post[]> {
  return (await publishedPosts(lang)).filter((p) => p.collection === zone);
}

/** 同一篇文章的另一种语言版本（没有则 undefined）。 */
export async function twinOf(p: Post): Promise<Post | undefined> {
  const key = keyOf(p);
  const want: Lang = langOf(p) === 'zh' ? 'en' : 'zh';
  return (await allPublic()).find((x) => keyOf(x) === key && langOf(x) === want);
}

const sha256 = (s: string) => createHash('sha256').update(s, 'utf8').digest('hex');

/**
 * 记录链：全部公开条目（含英文译文）按时间升序串成一条哈希链。
 * 摘要 = SHA256(上一条摘要 | 序号 | 文件 id | 日期 | 标题 | 正文全文)。
 * 正文与译文都在哈希范围内；列表用的 summary 不参与。
 */
export async function chain() {
  const posts = (await allPublic()).slice().sort((a, b) => t(a) - t(b)); // 旧→新
  let hash = `GENESIS:${site.start}`;
  const byId = new Map<string, string>();
  posts.forEach((p, i) => {
    const raw = (p as unknown as { body?: string }).body ?? '';
    hash = sha256(`${hash}|${i}|${p.id}|${p.data.date.toISOString()}|${p.data.title}|${raw}`);
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

/**
 * 首页统计。entries 按「文章键」去重（一篇双语算一篇），
 * 记录链的条数在 /chain.json 里按文件计，两个口径都写清，不混用。
 */
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
