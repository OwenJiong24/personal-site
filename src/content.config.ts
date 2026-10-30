import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 三个分区各自成集合（分区块做 SEO）。字段一致，新增字段一处加即三处生效。
const article = z.object({
  title: z.string(),
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
  insights: col('insights'),
  work: col('work', { stage: z.string().default('进行中') }),
};
