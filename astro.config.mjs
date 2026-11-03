import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 站点地址只改这一行（或用 PUBLIC_SITE_URL 覆盖）。
// 现状：线上 https://orangeknows.com（Pages 项目 jiong，自定义域名已绑，www 并存）。
// 语言结构（2026-10-30 英文默认，A702）：英文在根，中文在 /zh/ 前缀。
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://orangeknows.com',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      // 双语成对：sitemap 里给每页带上两种语言的 alternates（AEO/AIEO 检索友好）。
      // defaultLocale 必须等于「根路径的语言」= en。2026-11-03 实测：留旧值 'zh' 时，
      // 英文页在 sitemap 里被标成 hreflang="zh-Hans" 且与中文条目重复，等于把英文页当中文上报。
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', zh: 'zh-Hans' },
      },
      // 单条标签页不进 sitemap：这个版本(3.7.4)不读页面的 sitemap 导出，
      // 而 i18n 配对只认 URL 前缀，于是「只有中文的标签页」会被标成 hreflang="en"。
      // 标签索引页（已配对）保留为入口。
      filter: (page) => {
        const path = new URL(page).pathname;
        return !/^\/(zh\/)?tags\/.+/.test(path);
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
