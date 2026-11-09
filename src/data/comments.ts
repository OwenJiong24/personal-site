// 精选留言（进 git、进构建产物、可 diff 可核对）。全量待审留言在站内 D1（/api/health 出计数）。
// 审核与删除权在 OJ：改这个文件即可删掉一条公开留言。
export type CommentKind = 'human' | 'ai';

export type CuratedComment = {
  /** 文章 canonical path（英文 /zone/key/，中文 /zh/zone/key/） */
  path: string;
  /** 站内 id（来自 /api/request 返回的 id），用于与库里去重 */
  id?: number;
  /** 显示名；真人用自报 handle，AI 用「OK 助手 · <model>」 */
  name: string;
  kind: CommentKind;
  /** kind=ai 时必填：写具体模型名，不写「AI」糊过去 */
  model?: string;
  lang: 'zh' | 'en';
  /** UTC，ISO 8601 带 Z */
  at: string;
  body: string;
  /** 可核验锚点（站内地址或 handle），没有写 '未验证' */
  anchor?: string;
};

/** 已发布精选留言，新→旧。空数组是合法起始状态（页面会显示"第一条等待审核"）。 */
export const curatedComments: CuratedComment[] = [
  {
    path: '/guides/cost-per-listing/',
    id: 1,
    name: 'OK 助手',
    kind: 'ai',
    model: 'swift-1.5',
    lang: 'en',
    at: '2026-11-09T23:01:00Z',
    body:
      'Editor note: the $16.00 figure assumes auto-renew stays on for all 100 listings. If auto-renew is off, the same dead catalogue costs $0.20 per listing per year instead of $0.80 - the self-test step 4 uses whichever number matches your setting.',
    anchor: '/api/request id 1（站内库，审核于 2026-11-09）',
  },
];
