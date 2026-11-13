// 工具的单一真源：工具页（en/zh）、Markdown 镜像 (/m/tools/<slug>.md)、工具索引都读这里。
// 纪律：公式必须与页面里的 JS 完全一致（check-md 断言镜像含公式行）；
// 算例数字是手算出来的，页面与镜像同源，不写"通常""平均"这类无法核对的概括。

export type ToolFaq = { qEn: string; aEn: string; qZh: string; aZh: string };
export type ToolField = {
  id: string;
  labEn: string;
  labZh: string;
  unitEn: string;
  unitZh: string;
  value: string;
  step: string;
  min: string;
  max?: string;
  hintEn: string;
  hintZh: string;
};

export const pricingTool = {
  slug: 'pricing-calculator',
  href: '/tools/pricing-calculator',
  nameEn: 'Product cost and profit calculator',
  nameZh: '产品成本与利润计算器',
  titleTagEn: 'Product Cost & Profit Calculator for Handmade Sellers — Bill of Materials, Fees, Markup and Margin',
  titleTagZh: '手作品成本与利润计算器：物料清单、平台费用、加价率与毛利率',
  descEn:
    'Free product cost calculator in two modes. Detailed: list materials, packaging, labour, shipping and overheads by package quantity, and get the true item cost, the cost without labour, and a suggested price at a profit target. Quick: enter a price and a cost, set the platform fee, and get profit, markup and margin. The two modes share the same numbers - the worked example runs 55.19 of cost to a suggested 82.78, which is the price the quick mode then charges fees against.',
  descZh:
    '免费的产品成本计算器，两种模式。明细：按整包数量填材料、包装、人工、运费与杂项，得到真实单件成本、不含人工的成本，以及按目标利润率算出的建议价。简版：填售价与成本，设平台费率，得到利润、加价率与毛利率。两种模式共用同一套数字——算例从 55.19 的成本走到建议价 82.78，再把这个价放回简版算费用。',
  keywordsEn: [
    'product cost calculator',
    'handmade pricing calculator',
    'bill of materials calculator',
    'markup vs margin',
    'etsy fee calculator',
    'cost per unit from package price',
  ],
  keywordsZh: ['产品成本计算', '手作定价计算器', '物料清单', '加价率与毛利率', '平台费用计算', '整包单价换算'],
  fields: [
    { id: 'price', labEn: 'Selling price', labZh: '售价', unitEn: '', unitZh: '', value: '82.78', step: '0.01', min: '0', hintEn: 'What the buyer pays, before any fee is taken.', hintZh: '买家支付的价，未扣任何费用前。' },
    { id: 'cost', labEn: 'Cost per unit', labZh: '单件成本', unitEn: '', unitZh: '', value: '55.19', step: '0.01', min: '0', hintEn: 'From the detailed mode, or your own number. This is the figure the fees are subtracted from, not added to.', hintZh: '来自明细模式，或你自己的数字。费用是从它里面扣的，不是加到它上面。' },
    { id: 'feePct', labEn: 'Transaction fee', labZh: '交易费', unitEn: '%', unitZh: '%', value: '3.4', step: '0.01', min: '0', hintEn: 'Percentage taken on the order total. The default is the card-network rate published for our own marketplace; change it to yours.', hintZh: '按订单总额抽的百分比。默认值是我们自己平台公示的卡组织费率；改成你的。' },
    { id: 'feeFixed', labEn: 'Transaction fee, fixed part', labZh: '交易费固定部分', unitEn: '/order', unitZh: '/单', value: '0.37', step: '0.01', min: '0', hintEn: 'The flat cents charged per order on top of the percentage.', hintZh: '每单在百分比之外另收的固定金额。' },
    { id: 'listingFee', labEn: 'Listing fee', labZh: '上架费', unitEn: '/order', unitZh: '/单', value: '0', step: '0.01', min: '0', hintEn: 'Per-listing or per-order insertion fee, if your platform charges one.', hintZh: '按条或按单收的上架费，你的平台收就填。' },
    { id: 'adsPct', labEn: 'Ad fee', labZh: '广告费', unitEn: '%', unitZh: '%', value: '0', step: '0.01', min: '0', hintEn: 'Percentage taken on attributed sales. Leave at 0 if you do not run ads.', hintZh: '按归因订单抽的百分比。不投广告就留 0。' },
    { id: 'monthlyFee', labEn: 'Monthly platform fee', labZh: '平台月费', unitEn: '', unitZh: '', value: '0', step: '0.01', min: '0', hintEn: 'Subscription cost per month. Used only for the break-even count.', hintZh: '每月订阅费。只用来算保本件数。' },
    { id: 'target', labEn: 'Profit target multiple', labZh: '目标利润倍数', unitEn: '×', unitZh: '倍', value: '1.5', step: '0.1', min: '1', hintEn: 'Suggested price = item cost x this. 1.5 is the standard 50% profit target; 2.0 doubles the cost.', hintZh: '建议价 = 单件成本 × 这个数。1.5 是标准的五成利润目标；2.0 是成本翻倍。' },
  ] as ToolField[],
  formulaLines: [
    'cost per unit  = total package cost / package quantity x quantity needed',
    'C              = materials + packaging + labour + shipping + misc',
    'C (no labour)  = C - labour',
    'fees           = price x (fee % + ad %) + fee fixed + listing fee',
    'profit         = price - C - fees',
    'markup         = profit / C                    // markup on item cost',
    'margin         = profit / price',
    'markup on loaded cost = profit / (C + fees)    // what the source sheet prints',
    'suggested      = C x profit target multiple    // 1.5 = 50% profit on cost',
    'floor = C / (1 - fee)                          // price where the take-home equals C',
    'break-even     = monthly fee / profit',
  ],
  formulaZhLines: [
    '单件成本 = 整包总价 / 整包数量 × 单件用量',
    'C        = 材料 + 包装 + 人工 + 运费 + 杂项',
    'C(不含人工) = C - 人工',
    '费用     = 售价 × (交易费率 + 广告费率) + 交易费固定额 + 上架费',
    '利润     = 售价 - C - 费用',
    '加价率   = 利润 / C                          // 对成本的加价率',
    '毛利率   = 利润 / 售价',
    '对含费成本的加价率 = 利润 / (C + 费用)        // 原始表格印的是这个',
    '建议价   = C × 目标利润倍数                  // 1.5 = 成本上五成利润',
    '保本价   = C / (1 - 费率)                    // 到手等于 C 的那个价',
    '保本件数 = 月费 / 利润',
  ],
  exampleNoteEn:
    'Worked example from the sheet, and the two modes are the same arithmetic: materials 15/3x1 + 12/3x0.5 = 7.00, packaging 40/25x1 + 2.5/50x1 + 20/100x1 + 1/100x2 + 12/6x0.05 = 1.97, labour 15x2 + 1 + 13x0.2 + 13x0.1 = 34.90, shipping 7.99 + 0.50 = 8.49, misc 80x0.03 + 25x0.005 + 30x0.01 = 2.825, shown as 2.83, so C = 55.19 and C without labour = 20.29. At a 1.5 multiple the suggested price is 82.78 - and that is the price the quick mode then charges fees on: 82.78 x 3.4% + 0.37 = 3.18 of fees, so 24.41 of profit, which is a 44.2% markup on item cost and a 29.5% margin on price. The source sheet multiplies 55.19 by 1.5 for the suggestion but divides profit by cost-plus-fees for its markup cell, giving 41.8%; that is a different denominator, so both are printed here and never averaged.',
  exampleNoteZh:
    '表格里的算例，两种模式算的是同一件事：材料 15/3×1 + 12/3×0.5 = 7.00，包装 40/25×1 + 2.5/50×1 + 20/100×1 + 1/100×2 + 12/6×0.05 = 1.97，人工 15×2 + 1 + 13×0.2 + 13×0.1 = 34.90，运费 7.99 + 0.50 = 8.49，杂项 80×0.03 + 25×0.005 + 30×0.01 = 2.825（表格显示 2.83），于是 C = 55.19，不含人工 20.29。按 1.5 倍，建议价 82.78——这个价再放回简版算费用：82.78 × 3.4% + 0.37 = 3.18 的费用，于是利润 24.41，对成本是 44.2% 的加价率，对售价是 29.5% 的毛利率。原始表格用 55.19×1.5 给建议价，却拿利润除「成本+费用」算加价率得 41.8%；分母不同，所以这里两个都印、永不混成一个数。',
  faq: [
    {
      qEn: 'Why do I enter a package quantity instead of a price per unit?',
      aEn: 'Because that is how materials are actually bought. You pay 40 for 25 boxes, or 15 for a 3-skein pack of yarn, and one piece uses one box or half a skein. The calculator does the division for you: total package cost divided by package quantity, times how much one piece needs. Typing a per-piece price hides the rounding you already paid for.',
      qZh: '为什么填整包数量，而不是直接填单价？',
      aZh: '因为材料本来就是这么买的。你花 40 买 25 个盒子，或者花 15 买 3 绞毛线，而一件产品只用 1 个盒子或半绞。计算器替你除：整包总价 ÷ 整包数量 × 单件用量。直接填单价，会把你实际已经付掉的整包余量藏起来。',
    },
    {
      qEn: 'Why is labour a cost line and not just my profit?',
      aEn: 'If your hours are not in the cost, the profit number is not profit - it is wages you forgot to pay yourself. Put the hours and an hourly rate you would accept from a stranger in the labour table, and the profit figure above becomes what the business earns after paying you. The sheet also prints the cost without labour, for makers who want to see the material-only floor.',
      qZh: '为什么人工要算成本，不能算利润？',
      aZh: '如果工时不在成本里，那个"利润"就不是利润，是你忘了付给自己的工资。把工时和一个你愿意接受的时薪填进人工表，上面那个利润才是"付完你自己之后生意赚到的"。表格里也给了不含人工的成本，想只看材料的人可以用它。',
    },
    {
      qEn: 'What is the difference between markup and margin?',
      aEn: 'Markup divides profit by cost; margin divides profit by price. The same 24.41 of profit on 55.19 of cost is a 44.2% markup and a 29.5% margin. Sellers quote markup to feel better and shops think in margin, which is why the two numbers are on this page next to each other and never averaged.',
      qZh: '加价率和毛利率有什么区别？',
      aZh: '加价率是利润 ÷ 成本；毛利率是利润 ÷ 售价。同样 24.41 的利润、55.19 的成本，是 44.2% 的加价率和 29.5% 的毛利率。卖家爱说加价率（显得高），店家想的是毛利率，所以这两个数在这里并排出现，绝不混成一个平均数。',
    },
    {
      qEn: 'Is the suggested price the price I should charge?',
      aEn: 'No. It is cost times the multiple you chose - a floor with a margin on it, not a market price. A 1.5 multiple answers "what price keeps 50% profit on cost"; whether anyone pays it is a different question, and this page cannot see your market. Compare it against listings that are already selling, then decide.',
      qZh: '建议价就是该收的价吗？',
      aZh: '不是。它是成本乘以你选的倍数——一个带利润的地板，不是市场价格。1.5 倍回答的是"什么价能保住成本上五成利润"；有没有人付这个价是另一个问题，这个页面看不到你的市场。拿去和已经在卖的同类比，再决定。',
    },
  ] as ToolFaq[],
};

export const shippingTool = {
  slug: 'shipping-calculator',
  href: '/tools/shipping-calculator',
  nameEn: 'Shipping shape calculator',
  nameZh: '运费收法计算器',
  titleTagEn: 'Free Shipping Calculator for Makers — Bake Shipping into Price, Charge Plainly, or Set a Threshold',
  titleTagZh: '手作卖家运费计算器：摊进价、单列实收、还是门槛包邮',
  descEn:
    'Free shipping strategy calculator for handmade sellers. Decide between baking shipping into the price, charging it plainly, or a free-shipping threshold, using shipping as a share of price — with the platform fee grossed into the baked price, a returns reserve and a margin check.',
  descZh:
    '给手作卖家的免费运费策略计算器。用运费占售价的比例决定摊进价、单列实收、门槛包邮；摊进价会把平台抽成一起算进去，并给退换预留与毛利校验。',
  keywordsEn: [
    'free shipping threshold calculator',
    'shipping cost calculator for small business',
    'etsy shipping strategy',
    'bake shipping into price',
    'handmade shipping math',
  ],
  keywordsZh: ['包邮门槛', '运费定价', '手作运费计算', '摊进价', '电商运费策略'],
  fields: [
    { id: 'cur', labEn: 'Currency symbol', labZh: '货币符号', unitEn: '', unitZh: '', value: '$', step: 'any', min: '0', hintEn: 'Just the glyph', hintZh: '只填符号' },
    { id: 'price', labEn: 'Item price now', labZh: '当前售价', unitEn: '', unitZh: '', value: '90', step: '1', min: '0', hintEn: 'The price the buyer sees today', hintZh: '买家今天看到的标价' },
    { id: 'ship', labEn: 'Real shipping median', labZh: '真实运费中位数', unitEn: '', unitZh: '', value: '6', step: '1', min: '0', hintEn: 'Median of your last 50 shipped orders', hintZh: '最近 50 单运费中位数' },
    { id: 'aov', labEn: 'Average order value', labZh: '平均客单价', unitEn: '', unitZh: '', value: '120', step: '1', min: '0', hintEn: 'From your own order data, not a guess', hintZh: '用你自己的订单数据，不靠猜' },
    { id: 'ret', labEn: 'Return rate', labZh: '退货率', unitEn: '%', unitZh: '%', value: '5', step: '1', min: '0', max: '50', hintEn: 'Share of orders returned', hintZh: '订单中被退的比例' },
    { id: 'retpc', labEn: 'Cost per return event', labZh: '单次退货成本', unitEn: '', unitZh: '', value: '12', step: '1', min: '0', hintEn: 'Two legs of shipping + restock', hintZh: '来回运费 + 复检入库' },
    { id: 'fee', labEn: 'Platform + payment fees', labZh: '平台与支付抽成', unitEn: '%', unitZh: '%', value: '13', step: '0.5', min: '0', max: '60', hintEn: 'Applied to the price the buyer pays', hintZh: '按买家支付的价款抽成' },
    { id: 'margin', labEn: 'Current gross margin per item', labZh: '当前单件毛利', unitEn: '', unitZh: '', value: '40', step: '1', min: '0', hintEn: 'Price minus material, labour share and packaging', hintZh: '售价减材料、工时摊销与包装' },
  ] as ToolField[],
  formulaLines: [
    'ratio = shipping / price',
    'R = return rate x cost per return',
    'ratio > 15%   -> bake shipping into the price',
    'ratio < 8%    -> charge shipping plainly',
    'in between    -> free-shipping threshold',
    'baked price = (price + shipping + R) / (1 - fee)   // fee is on the price the buyer pays',
    'threshold = average order value x 1.2 ... 1.5',
    'margin after absorbing shipping = margin - shipping - R',
    'weak margin flag = margin after < 30% of price',
  ],
  formulaZhLines: [
    '比例 = 运费 / 售价',
    'R = 退货率 x 单次退货成本',
    '比例 > 15%  → 运费摊进价并显示包邮',
    '比例 < 8%   → 单列实收',
    '中间区间     → 设门槛包邮',
    '摊进价 = (售价 + 运费 + R) / (1 - 抽成)   // 抽成按买家支付的价款计',
    '门槛 = 平均客单价 x 1.2 ... 1.5',
    '承担运费后毛利 = 毛利 - 运费 - R',
    '薄毛利标记 = 承担运费后毛利 < 售价的 30%',
  ],
  exampleNoteEn:
    'Worked example on the defaults: ratio 6.7% → charge plainly. If you baked in anyway: (90 + 6 + 0.6) / 0.87 = 111.03, so the displayed price rises 23.4% to keep the same net. Reserve 0.60 per item; margin after shipping 33.40, which is 37.1% of 90 — above the 30% flag.',
  exampleNoteZh:
    '默认值算例：比例 6.7% → 单列实收。若强行摊进价：(90 + 6 + 0.6) / 0.87 = 111.03，标价要涨 23.4% 才保住同样的到手。每件退换预留 0.60；扣运费后毛利 33.40，占售价 90 的 37.1%，高于 30% 的警戒线。',
  faq: [
    {
      qEn: 'Why divide by (1 − fee) when baking shipping into the price?',
      aEn: 'Because the platform takes its percentage of the higher sticker price. Adding shipping to the price is not enough: on a 13% fee you keep only 87% of what you add, so the shipping must be grossed up to land intact.',
      qZh: '摊进价为什么要除以 (1 − 抽成)？',
      aZh: '因为平台对新标价同样抽成。只把运费加进售价不够：13% 抽成下你只留下加进去的 87%，运费必须放大才能足额到手。',
    },
    {
      qEn: 'Do the 8% and 15% bands come from research?',
      aEn: 'They are our working thresholds, from the shipping guide, not an industry statistic. They are stated so you can disagree with a number instead of a mood; test on your own checkout data.',
      qZh: '8% 和 15% 这两条线是研究出来的吗？',
      aZh: '这是我们自用的工作阈值，来自运费指南，不是行业统计。写成数字是让你能用数据反驳，而不是凭感觉；请用你自己的结账数据验证。',
    },
    {
      qEn: 'How do I set the free-shipping threshold?',
      aEn: 'Start at 1.2 to 1.5 times your own average order value. Below 1.2 you give the shipping away to buyers who would have paid anyway; far above 1.5 buyers cannot reach it and the banner stops working.',
      qZh: '包邮门槛怎么定？',
      aZh: '从你自己平均客单价的 1.2 到 1.5 倍起步。低于 1.2 等于把运费白送给本来就会买的客人；远高于 1.5 买家够不着，横幅就失效。',
    },
    {
      qEn: 'Does the calculator know my carriers or box sizes?',
      aEn: 'No. It reads the median shipping you measured. Dimensional weight, box size and zone pricing live in the shipping guide; a calculator cannot see your parcel.',
      qZh: '它了解我的承运商与箱型吗？',
      aZh: '不了解。它只用你量出来的运费中位数。体积重、箱型与分区计价在运费指南里；计算器看不到你的包裹。',
    },
    {
      qEn: 'What does the margin flag mean?',
      aEn: 'If the margin left after absorbing shipping and returns is under 30% of the price, the shipping shape is not your problem — pricing is. Fix price first, then choose the shape.',
      qZh: '毛利警戒线是什么意思？',
      aZh: '承担运费与退货后剩余毛利低于售价 30% 时，问题不在运费收法，而在定价。先修价格，再选收法。',
    },
    {
      qEn: 'Is my data sent anywhere?',
      aEn: 'No. It runs in your browser and keeps your inputs in local browser storage only.',
      qZh: '我的数据会上传吗？',
      aZh: '不会。页面在浏览器本地运行，输入只存在你浏览器的本地存储。',
    },
  ] as ToolFaq[],
} as const;


export const toolList = [pricingTool, shippingTool];
