import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 域名切换只改这一行：pages.dev 预览期用 PAGES_URL，正式域名用 owenjiong.com
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://owenjiong.com',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: true,
    },
  },
  build: { inlineStylesheets: 'auto' },
});
