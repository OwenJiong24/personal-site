import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { keyOf, langOf, type Post } from '../../../lib/trust';
import { entryDoc } from '../../../lib/mirror';
import { sections, type SectionSlug } from '../../../lib/site';

// 单篇条目的 Markdown 镜像：/m/<zone>/<key>.md
// 路由名 = 文件名去掉 .ts，所以本文件产出 /m/<zone>/<key>.md
export const prerender = true;

const isPublic = (p: Post) => (p.data as { status?: string }).status === 'public';

export async function getStaticPaths() {
  const paths: { params: { zone: string; slug: string } }[] = [];
  for (const zone of sections as SectionSlug[]) {
    for (const p of (await getCollection(zone)) as Post[]) {
      if (!isPublic(p) || p.data.date.getTime() > Date.now()) continue;
      paths.push({ params: { zone, slug: keyOf(p) } });
    }
  }
  return paths;
}

export const GET: APIRoute = async ({ params, site: base }) => {
  const root = base ?? new URL('https://orangeknows.com');
  const zone = params.zone as SectionSlug;
  const slug = params.slug as string;

  const posts = (await getCollection(zone)) as Post[];
  const p = posts.find((x) => keyOf(x) === slug && isPublic(x));
  if (!p) return new Response('Not found\n', { status: 404 });

  const pool = (
    await Promise.all((sections as SectionSlug[]).map((z) => getCollection(z)))
  ).flat() as Post[];
  const twin = pool.find((x) => keyOf(x) === slug && langOf(x) !== langOf(p) && isPublic(x));

  return new Response(entryDoc(p, twin, root), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
