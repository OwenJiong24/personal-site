// 术语图谱真源：页面 /frameworks 与镜像 /m/pages/frameworks.md 都读这里（AB-04，CEO 2026-11-04 批准发布）。
// 诚实规矩：四条定义由 OK 助手起草，OJ 未逐条审定（审定截止 2027-01-15，写进页面）；
// 每条只写"今天能被核对的部分"，不写转化率、不写排名、不写销量、不写没跑过的效果。
export interface Framework {
  id: string;
  abbr: string;
  nameEn: string;
  nameZh: string;
  defEn: string;
  defZh: string;
  checkableEn: string;
  checkableZh: string;
  status: 'draft' | 'approved';
  firstSeen: string;
}

export const frameworks: Framework[] = [
  {
    id: 'witness-based-commerce',
    abbr: 'WBC',
    nameEn: 'Witness-based Commerce',
    nameZh: '见证式商业',
    defEn: 'A sale justified because the buyer saw the making - process, materials, failures - not because the price beats another listing.',
    defZh: '成交的理由是买家看见过制作过程（材料、步骤、失败），不是因为这里比别处便宜。',
    checkableEn: 'Today our own seller pages list materials and use, not process. The gap is public: the seller-side record count is 0.',
    checkableZh: '今天我们的卖家页只写材料与用途，不写过程；差距公开：卖家侧过程记录数 0。',
    status: 'draft',
    firstSeen: '2026-11-04',
  },
  {
    id: 'narrative-asset-management',
    abbr: 'NAM',
    nameEn: 'Narrative Asset Management',
    nameZh: '叙事资产管理',
    defEn: 'Turning scattered daily making-records into a compounding asset: dated, chained, hard to fake after the fact.',
    defZh: '把碎片的日常制作记录攒成可复利的资产：带日期、进链、事后不能偷偷改。',
    checkableEn: 'This site: 58 chained records in 6 days, verifiable from the public repository (verify-chain PASS). One person, tiny scale, stated plainly.',
    checkableZh: '本站：6 天 58 条链上记录，公开仓可逐条复算（verify-chain PASS）。一个人的规模，很小，如实写。',
    status: 'draft',
    firstSeen: '2026-11-04',
  },
  {
    id: 'narrative-signal-processing',
    abbr: 'NSP',
    nameEn: 'Narrative Signal Processing',
    nameZh: '叙事信号处理',
    defEn: 'Filtering synthetic marketing noise so that complexity and labour read as signal, not ad spend.',
    defZh: '在信息层过滤合成的营销噪音，让复杂度与工时被读成信号，而不是被广告投放读成预算。',
    checkableEn: 'On this site: the quote gate verifies 46 registered lines verbatim and 20 are marked never-public; the language-leak assertion caught 4 real leaks on its first run (2026-11-04).',
    checkableZh: '本站实现：引用门禁逐字核对 46 条登记、20 条标永不公开；语言泄露断言首跑连抓 4 处真泄露（2026-11-04）。',
    status: 'draft',
    firstSeen: '2026-11-04',
  },
  {
    id: 'expression-to-transaction',
    abbr: 'E2T',
    nameEn: 'Expression-to-Transaction',
    nameZh: '表达即交易',
    defEn: 'From honest expression to sale, with no promotional funnel in between: the writing does the selling, not the discount.',
    defZh: '从真实表达到成交之间不塞促销漏斗：由内容完成说服，不由折扣完成说服。',
    checkableEn: 'Unverified. We have run no A/B and publish no conversion figure. Counterexample on record: our own listing shows a struck-through price (2026-11-03).',
    checkableZh: '未验证。我们没跑过对照，不写转化率。反例在案：自家 listing 挂着划线价（2026-11-03）。',
    status: 'draft',
    firstSeen: '2026-11-04',
  },
];
