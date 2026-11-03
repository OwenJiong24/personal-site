import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { keyOf, langOf, type Post } from '../../../lib/trust';
import { entryDoc, entryMirrorPath } from '../../../lib/mirror';
import { sections, type SectionSlug } from '../../../lib/site';

// 单篇条目的 Markdown 镜像，逐语言一份：
//   中文 /m/<zone>/<key>.md（历史地址，保持不变）
//   英文 /m/<zone>/<key>en.md
// 路由名 = 文件名去掉 .ts，所以本文件产出 /m/<zone>/<slug>.md
export const prerender = true;

const isPublic = (p: Post) => (p.data as { status?: string }).status === 'public';
const slugOf = (p: Post) => keyOf(p) + (langOf(p) === 'en' ? 'en' : '');

export async function getStaticPaths() {
  const seen = new Set<string>();
  const paths: { params: { zone: string; slug: string } }[] = [];
  for (const zone of sections as SectionSlug[]) {
    for (const p of (await getCollection(zone)) as Post[]) {
      if (!isPublic(p) || p.data.date.getTime() > Date.now()) continue;
      const slug = slugOf(p);
      if (seen.has(zone + '/' + slug)) continue;
      seen.add(zone + '/' + slug);
      paths.push({ params: { zone, slug } });
    }
  }
  return paths;
}

export const GET: APIRoute = async ({ params, site: base }) => {
  const root = base ?? new URL('https://orangeknows.com');
  const zone = params.zone as SectionSlug;
  const slug = params.slug as string;
  const lang: 'zh' | 'en' = slug.endsWith('en') ? 'en' : 'zh';
  const key = lang === 'en' ? slug.slice(0, -2) : slug;

  const posts = (await getCollection(zone)) as Post[];
  const p = posts.find((x) => keyOf(x) === key && langOf(x) === lang && isPublic(x));
  if (!p) return new Response('Not found\n', { status: 404 });

  const pool = (
    await Promise.all((sections as SectionSlug[]).map((z) => getCollection(z)))
  ).flat() as Post[];
  const twin = pool.find((x) => keyOf(x) === key && langOf(x) !== lang && isPublic(x));

  return new Response(entryDoc(p, twin, root), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
