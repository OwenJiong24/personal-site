import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 板块集合（数字花园五抽屉中的四个内容抽屉）。字段一致，新增字段一处加即全部生效。
const article = z.object({
  title: z.string(),
  // 双语：lang 声明语言，key 是「同一篇文章」的键（两种语言用同一个 key）。
  // 不从文件名猜——Astro 的 glob loader 会吃掉文件名里的点（实测 x.en.md 的 id 是 xen）。
  lang: z.enum(['zh', 'en']).default('zh'),
  key: z.string().optional(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  summary: z.string().default(''),
  summary_en: z.string().default(''),
  tags: z.array(z.string()).default([]),
  // draft = 本地/预览可见，不进正式构建；public = 上线可见。
  status: z.enum(['draft', 'public']).default('draft'),
  // 需要 CEO 亲自过目的内容标 true；标了就不能 public（构建脚本会拦）。
  sensitive: z.boolean().default(false),
  // 双视角（CEO 2026-10-30 定）：assistant = 助手观察整理（AI 辅助，页面标明）；owner = OJ 本人执笔。
  // OJ 本人的话一律用引用块进文并标出处，不混进叙述。
  voice: z.enum(['assistant', 'owner']).default('assistant'),
  // 作者审定：0–5 分 + 一句话快速点评。留空 = 待补（构建时列进待补清单，不阻塞发布）。
  ownerRating: z.number().int().min(0).max(5).optional(),
  ownerNote: z.string().default(''),
  // 问答小节：正文可见 + FAQPage 结构化数据同时存在（只写 schema 不显示，或只显示不写 schema，
  // 都是 Google 反对的组合）。字段必须在基础 schema 里，否则 zod 会把 essays 的 faq 静默剥离
  //（实测：essays 声明的 faq 进不了 data，两篇文章一直没有 FAQPage）。
  audience: z.string().default(''),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  // 外发隔离网关（AB-01，CEO 2026-11-04 批准）：本条内容能不能被本机脚本改写成社媒草稿。
  // 铁律：时事短评类区块必须显式 enabled: false，门禁 scripts/check-syndication.mjs 拦；
  // 脚本只出草稿到 ..\strategy\外发草稿\，不发布、不调平台接口，发布由 OJ 手工执行。
  syndication: z
    .object({
      enabled: z.boolean().default(true),
      channels: z.array(z.enum(['x_thread', 'xiaohongshu_cards', 'linkedin_insight', 'wechat_draft'])).default(['x_thread']),
    })
    .default({ enabled: true, channels: ['x_thread'] }),
});

const col = (dir: string, extra?: z.ZodRawShape) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${dir}` }),
    schema: extra ? article.extend(extra) : article,
  });

export const collections = {
  journal: col('journal'),
  essays: col('essays'),
  // guides：写给手作卖家的实操指南（SEO/AIEO 主战场，带 FAQ）
  guides: col('guides', {
    audience: z.string().default('手工/手作卖家'),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
  notes: col('notes', {
    // 随记：一句话结论 + 线索类型
    kind: z.enum(['观察', '线索', '结论', '提问', 'observation', 'lead', 'conclusion', 'question']).default('观察'),
  }),
  projects: col('projects', { stage: z.string().default('进行中') }),
  // lab（AI 试验场）：一集合五形态，索引页按 kind 过滤（PRD §3-M1）
  lab: col('lab', {
    kind: z.enum(['case', 'insight', 'tip', 'note', 'topic']).default('note'),
    level: z.enum(['L0', 'L1', 'L2', 'L3', 'L4']).optional(),
  }),
};
