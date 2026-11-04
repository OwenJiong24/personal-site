// Uses 清单数据。规则：只写可公开的实况，不写账号、主机地址、供应商入口、客户数据。
// 标 fromSession: true 的条目是我从这台机器实测到的；标 todo 的段落由 CEO 自己填。
export type UseGroup = 'work' | 'build' | 'mind' | 'life';

export interface UseItem {
  group: UseGroup;
  name: string;
  nameEn: string;
  why: string;
  whyEn: string;
  status?: 'daily' | 'trial' | 'todo';
}

export const uses: UseItem[] = [
  {
    group: 'work',
    name: 'Windows 工作站 + WSL2 Ubuntu',
    nameEn: 'Windows workstation + WSL2 Ubuntu',
    why: '前端与浏览器调试在 Windows，构建与容器化流程在 WSL；两条线互不污染。',
    whyEn: 'Front-end and browser debugging on Windows; build and container flows in WSL. The two lines never pollute each other.',
    status: 'daily',
  },
  {
    group: 'build',
    name: 'Node 24 + pnpm 11 + Astro 5',
    nameEn: 'Node 24 + pnpm 11 + Astro 5',
    why: '内容站要十年后还能构建：静态输出、无运行时、Markdown 进 Git。',
    whyEn: 'The site must still build in ten years: static output, no runtime framework, Markdown in Git.',
    status: 'daily',
  },
  {
    group: 'build',
    name: 'Cloudflare Pages + Git（公开仓）',
    nameEn: 'Cloudflare Pages + Git (public repo)',
    why: '免费静态托管够用一个人的记录站；域名、DNS、托管收在一个账号里。',
    whyEn: 'Free static hosting covers a one-person record site; domain, DNS and hosting live in one account.',
    status: 'daily',
  },
  {
    group: 'build',
    name: '多模型编码 harness 并用（Claude / DeepSeek / Qwen 等）',
    nameEn: 'Several coding harnesses at once (Claude / DeepSeek / Qwen and others)',
    why: '开发会话直接产出记录草稿：机器管流程与检查，人管判断与真话。',
    whyEn: 'Dev sessions produce record drafts directly: machines run the process and the checks, humans own judgement and the truth.',
    status: 'daily',
  },
  {
    group: 'mind',
    name: '每日一条开发日志（UTC 时间戳 + 哈希链）',
    nameEn: 'One dated log entry a day (UTC timestamps + hash chain)',
    why: '连续比精彩重要；链式摘要让"没有事后改口"可被核对。',
    whyEn: 'Continuity beats brilliance; chained digests make "no quiet edits afterwards" checkable.',
    status: 'daily',
  },
  {
    group: 'mind',
    name: '30 天 AIEO 引用实验',
    nameEn: '30-day AIEO citation experiment',
    why: '每周拿本站写过的结论去问主流 AI，记录是否被引用、引用哪段。',
    whyEn: 'Weekly, the conclusions this site published get asked of mainstream AI: was anything cited, and which passage.',
    status: 'trial',
  },
  {
    group: 'life',
    name: '（这一段由我本人写）',
    nameEn: '(this block is written by me personally)',
    why: '生活向工具与习惯：由 CEO 填，助手不代笔。',
    whyEn: 'Life-side tools and habits: filled in by the CEO; the assistant does not ghostwrite it.',
    status: 'todo',
  },
];
