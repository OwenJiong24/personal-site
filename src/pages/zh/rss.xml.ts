import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { site } from '../../lib/site';
import { publishedPosts, keyOf } from '../../lib/trust';
import { ui } from '../../lib/i18n';

// 中文订阅 /zh/rss.xml（英文在根 /rss.xml，两路各自单语，不混语言）
export const GET: APIRoute = async (context) => {
  const posts = await publishedPosts('zh');
  return rss({
    title: `${site.name} 的公开记录`,
    description: ui.zh.tagline,
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.summary || p.data.title,
      pubDate: p.data.date,
      link: '/zh/' + p.collection + '/' + keyOf(p),
      categories: p.data.tags,
      language: 'zh-CN',
    })),
  });
};
