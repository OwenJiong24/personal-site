import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 站点地址只改这一行（或用 PUBLIC_SITE_URL 覆盖）。
// 现状：Cloudflare 免费子域名 jiong-bvw.pages.dev（jiong.pages.dev 已被他人注册）。
// 绑 owenjiong.com 后改成 https://owenjiong.com，canonical / RSS / 站点地图 / robots 会自动跟着走。
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://jiong-bvw.pages.dev',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // 双语成对：sitemap 里给每篇带上两种语言的 alternates（AEO/AIEO 检索友好）
      i18n: {
        defaultLocale: 'zh',
        locales: { zh: 'zh-Hans', en: 'en' },
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: true,
    },
  },
  build: { inlineStylesheets: 'auto' },
  // 构建提交号由 src/lib/build.ts 从环境变量 GIT_SHA 读取（Astro 没有顶层 define 这个键）
});
