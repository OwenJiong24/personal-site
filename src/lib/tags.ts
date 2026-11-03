import { getCollection } from 'astro:content';
import { publishedPosts, type Post, type Zone } from './trust';
import type { Lang } from './i18n';

// 标签索引：只给「≥2 篇」的标签建页（单篇标签页是薄内容，只进总览列表不建页）。
// 中文标签要有干净的英文 URL，所以显式映射；未映射的标签会落在回退 slug 上，
// 并由 scripts/lint-content.mjs 打印出来提醒补映射。
const SLUGS: Record<string, string> = {
  指南: 'guides', 手作: 'handmade', 手工: 'handmade-craft', 定价: 'pricing', 单位经济: 'unit-economics',
  运费: 'shipping', 包邮: 'free-shipping', 投放: 'advertising', 广告: 'ads', 预算: 'budget',
  评价: 'reviews', 客服: 'support', 复购: 'repeat-purchase', 定制: 'custom-orders', 报价: 'quoting',
  产能: 'capacity', 退款: 'refunds', 标题: 'titles', 属性: 'attributes', 转化: 'conversion',
  文案: 'copywriting', 拍摄: 'photography', 主图: 'hero-image', 手机: 'phone', 域名: 'domains',
  网站: 'websites', 邮箱: 'email', 独立站: 'own-site', 邮件列表: 'email-list', 低成本: 'low-cost',
  结构化数据: 'structured-data', 信任: 'trust', 可核验: 'verifiable', 可反驳: 'falsifiable',
  可观测性: 'observability', 记录机制: 'record-keeping', 方法论: 'method', 自查: 'self-audit',
  决策: 'decisions', 商业: 'business', 产品: 'product', 内容: 'content', 价值观: 'values',
  稀缺: 'scarcity', 个人品牌: 'personal-brand', 工程: 'engineering', 工程观: 'engineering-principles',
  质量门禁: 'quality-gates', 静态站: 'static-sites', 美国渠道: 'us-channels', AM时代: 'model-era',
};

const ascii = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const tagSlug = (tag: string): string => SLUGS[tag] ?? (ascii(tag) || encodeURIComponent(tag));

export const isAsciiTag = (tag: string) => /^[a-z0-9][a-z0-9 ._-]*$/i.test(tag);

export type TagEntry = { tag: string; slug: string; count: number; en: number; zh: number };

/** 全站标签统计（跨语言计数，页面按语言过滤展示）。 */
export async function tagStats(): Promise<TagEntry[]> {
  const posts = await allPostsBoth();
  const map = new Map<string, TagEntry>();
  for (const p of posts) {
    const lang: Lang = (p.data as { lang?: Lang }).lang ?? 'zh';
    for (const tag of (p.data.tags ?? [])) {
      const e = map.get(tag) ?? { tag, slug: tagSlug(tag), count: 0, en: 0, zh: 0 };
      e.count += 1;
      if (lang === 'en') e.en += 1;
      else e.zh += 1;
      map.set(tag, e);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

async function allPostsBoth(): Promise<Post[]> {
  const cols = await Promise.all(
    (['journal', 'essays', 'guides', 'notes', 'projects'] as Zone[]).map((z) => getCollection(z)),
  );
  return cols
    .flat()
    .filter((p) => (p.data as { status: string }).status === 'public')
    .filter((p) => p.data.date.getTime() <= Date.now()) as Post[];
}

/** 某语言下带该标签的文章，新→旧。 */
export async function postsByTag(tag: string, lang: Lang): Promise<Post[]> {
  const posts = await publishedPosts(lang);
  return posts.filter((p) => (p.data.tags ?? []).includes(tag));
}

/** 该语言的标签页是否真的会生成（hreflang 与语言切换只能指向存在的页面）。 */
export const tagPageExists = (t: TagEntry, lang: Lang): boolean => t.count >= 2 && (lang === 'en' ? t.en > 0 : t.zh > 0);

/** 可以建页的标签（≥2 篇且该语言下有内容）。 */
export async function linkableTags(lang: Lang, min = 2): Promise<TagEntry[]> {
  return (await tagStats()).filter((t) => t.count >= min && (lang === 'en' ? t.en > 0 : t.zh > 0));
}

/** 文章页的标签药丸是否可点：标签页存在才可链。 */
export async function linkableTagSet(lang: Lang): Promise<Set<string>> {
  return new Set((await linkableTags(lang)).map((t) => t.tag));
}

/** 未映射的中文标签（提醒补 SLUGS）。 */
export function unmappedTags(tags: string[]): string[] {
  return [...new Set(tags.filter((t) => !isAsciiTag(t) && !SLUGS[t]))];
}
