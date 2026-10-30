import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { site } from '../../lib/site';
import { publishedPosts, keyOf } from '../../lib/trust';
import { ui } from '../../lib/i18n';

// 英文订阅
export const GET: APIRoute = async (context) => {
  const posts = await publishedPosts('en');
  return rss({
    title: `${site.name} — public record (en)`,
    description: ui.en.tagline,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary || p.data.title,
      pubDate: p.data.date,
      link: '/en/' + p.collection + '/' + keyOf(p),
      categories: p.data.tags,
      language: 'en',
    })),
    xmlns: { h: false },
  });
};
