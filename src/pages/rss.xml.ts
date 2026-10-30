import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { site } from '../lib/site';
import { publishedPosts } from '../lib/trust';

export const GET: APIRoute = async (context) => {
  const posts = await publishedPosts();
  return rss({
    title: `${site.name} 的公开记录`,
    description: site.tagline,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary || p.data.title,
      pubDate: p.data.date,
      link: `/${p.collection}/${p.id}`,
      categories: p.data.tags,
    })),
  });
};
