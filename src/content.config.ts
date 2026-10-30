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
});

const col = (dir: string, extra?: z.ZodRawShape) =>
  defineCollection({
    loader: glob({ pattern: '**/*.md', base: `./src/content/${dir}` }),
    schema: extra ? article.extend(extra) : article,
  });

export const collections = {
  journal: col('journal'),
  essays: col('essays'),
  notes: col('notes', {
    // 随记：一句话结论 + 线索类型
    kind: z.enum(['观察', '线索', '结论', '提问', 'observation', 'lead', 'conclusion', 'question']).default('观察'),
  }),
  projects: col('projects', { stage: z.string().default('进行中') }),
};
