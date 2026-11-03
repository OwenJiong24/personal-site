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
  nameEn: 'Handmade pricing calculator',
  nameZh: '手作定价计算器',
  titleTagEn: 'Handmade Pricing Calculator — Floor Price with Platform Fees, Failure Rate, Shipping and Returns',
  titleTagZh: '手作定价计算器：把平台抽成、失败率、运费与退换算进保本价',
  descEn:
    'Free handmade pricing calculator. Enter material, small parts, failure rate, hours, hourly rate, shipping you absorb, return rate, cost per return and platform fees; it returns the floor price, a premium price, the surplus per production hour and the break-even units. Runs offline in your browser, no account, no tracking, arithmetic shown line by line.',
  descZh:
    '免费手作定价计算器。填材料、配件包装、失败率、工时、时薪、你承担的运费、退货率、单次退货成本与平台抽成，得到保本价、溢价定价、每生产小时盈余与保本件数。浏览器本地运行、不注册、无追踪，每一步算术都摊在页面上。',
  keywordsEn: [
    'handmade pricing calculator',
    'etsy fee calculator',
    'craft pricing formula',
    'unit economics for makers',
    'break-even price handmade',
    'price per hour handmade',
  ],
  keywordsZh: ['手作定价', '保本价计算', '平台抽成计算', '单位经济', ' Etsy 费用', '手工卖家定价公式'],
  fields: [
    { id: 'cur', labEn: 'Currency symbol', labZh: '货币符号', unitEn: '', unitZh: '', value: '$', step: 'any', min: '0' , hintEn: 'Just the glyph: $, €, ¥', hintZh: '只填符号：$、€、¥' },
    { id: 'mat', labEn: 'Main material per piece', labZh: '单件主材料', unitEn: '', unitZh: '', value: '60', step: '1', min: '0', hintEn: 'What the piece consumes in materials', hintZh: '这件成品消耗的主料成本' },
    { id: 'extra', labEn: 'Small parts + packaging', labZh: '配件与包装', unitEn: '', unitZh: '', value: '15', step: '1', min: '0', hintEn: 'Findings, tags, box, tape, insert card', hintZh: '小配件、吊牌、盒子、胶带、卡片' },
    { id: 'fail', labEn: 'Failure rate', labZh: '失败率', unitEn: '%', unitZh: '%', value: '20', step: '1', min: '0', max: '90', hintEn: 'Units made that cannot be sold: cracked, off-spec, test pieces', hintZh: '做出来不能卖的件数占比：报废、不合格、试做' },
    { id: 'hours', labEn: 'Hours per production unit', labZh: '单件工时', unitEn: 'h', unitZh: '小时', value: '4', step: '0.5', min: '0', hintEn: 'Time per unit you make, sold or not', hintZh: '每做一件花的时间，卖不卖都算' },
    { id: 'rate', labEn: 'Your labour rate', labZh: '你的时薪', unitEn: '/h', unitZh: '/小时', value: '80', step: '5', min: '0', hintEn: 'The rate you insist on paying yourself', hintZh: '你坚持付给自己的时薪' },
    { id: 'ship', labEn: 'Shipping you absorb per sale', labZh: '每单你承担的运费', unitEn: '', unitZh: '', value: '20', step: '1', min: '0', hintEn: 'Median of your last 50 shipped orders', hintZh: '取最近 50 单运费中位数' },
    { id: 'ret', labEn: 'Return rate', labZh: '退货率', unitEn: '%', unitZh: '%', value: '10', step: '1', min: '0', max: '60', hintEn: 'Share of sold units returned', hintZh: '售出件数中被退的比例' },
    { id: 'retpc', labEn: 'Cost per return event', labZh: '单次退货成本', unitEn: '', unitZh: '', value: '45', step: '1', min: '0', hintEn: 'Two legs of shipping + restock + refund handling', hintZh: '来回运费 + 复检入库 + 退款处理' },
    { id: 'fee', labEn: 'Platform + payment fees', labZh: '平台与支付抽成', unitEn: '%', unitZh: '%', value: '13', step: '0.5', min: '0', max: '60', hintEn: 'Applied to the price the buyer pays', hintZh: '按买家支付的价款抽成' },
    { id: 'fixed', labEn: 'Monthly fixed overhead', labZh: '每月固定开销', unitEn: '', unitZh: '', value: '200', step: '10', min: '0', hintEn: 'Rent, tools, subscriptions, insurance — what the surplus must cover', hintZh: '房租、工具、订阅、保险——盈余要先盖住这些' },
    { id: 'pf', labEn: 'Premium factor', labZh: '溢价系数', unitEn: '×', unitZh: '倍', value: '2', step: '0.1', min: '1', max: '4', hintEn: '1.0 = floor, 1.5–3 is normal for handmade', hintZh: '1.0=保本价，手作常见区间 1.5–3' },
  ] as ToolField[],
  formulaLines: [
    'u = 1 / (1 - failure)                     // production units per sold unit',
    'M = (main + parts) x u                     // materials, including failures',
    'L = hours x rate x u                       // labour, including failures',
    'S = shipping absorbed per sale',
    'R = return rate x cost per return',
    'C = M + L + S + R                          // variable cost per sold unit',
    'floor = C / (1 - fee)                      // price where net equals C',
    'price = floor x premium factor',
    'net = price x (1 - fee)',
    'profit = net - C                           // surplus after paying your labour',
    'surplus per hour = profit / (hours x u)',
    'break-even units = monthly overhead / profit',
  ],
  formulaZhLines: [
    'u = 1 / (1 - 失败率)                        // 每卖 1 件需要生产的件数',
    'M = (主材料 + 配件包装) x u                 // 材料含失败件',
    'L = 工时 x 时薪 x u                         // 工时也含失败件',
    'S = 每单你承担的运费',
    'R = 退货率 x 单次退货成本',
    'C = M + L + S + R                          // 每件售出可变成本',
    '保本价 = C / (1 - 抽成)                     // 到手等于 C 的那个价',
    '定价 = 保本价 x 溢价系数',
    '到手 = 定价 x (1 - 抽成)',
    '盈余 = 到手 - C                            // 已按你填的时薪付过自己工资',
    '每生产小时盈余 = 盈余 / (工时 x u)',
    '保本件数 = 每月固定开销 / 盈余',
  ],
  exampleNoteEn:
    'Worked example on the defaults: u = 1.25, M = 93.75, L = 400, S = 20, R = 4.5, C = 518.25 → floor 595.69, price 1191.38, net 1036.50, profit 518.25, surplus 103.65 per production hour, break-even 1 unit at 200 overhead.',
  exampleNoteZh:
    '默认值算例：u=1.25、M=93.75、L=400、S=20、R=4.5、C=518.25 → 保本价 595.69、定价 1191.38、到手 1036.50、盈余 518.25、每生产小时盈余 103.65、固定开销 200 时保本 1 件。',
  faq: [
    {
      qEn: 'Why is the failure rate multiplied into labour as well as materials?',
      aEn: 'A failed piece burns the same hours as a sold one. Grossing up only materials understates the cost of a high-failure product and produces a floor you cannot survive.',
      qZh: '为什么失败率要乘工时，不只乘材料？',
      aZh: '报废件消耗的工时和售出件一样多。只把失败率摊到材料上，会低估高失败率产品的成本，算出的保本价活不下去。',
    },
    {
      qEn: 'What does "surplus per hour" mean, and how is it not your hourly rate?',
      aEn: 'Labour is already paid in the cost base at the rate you entered. The surplus per hour is what the premium adds on top of paying yourself that rate — the money that covers rent, tools and profit.',
      qZh: '「每生产小时盈余」是什么，为什么不等于时薪？',
      aZh: '你填的时薪已经在成本里付给自己了。盈余是溢价在这份工资之上多出来的部分，用来盖房租、工具与利润。',
    },
    {
      qEn: 'Is the platform fee taken on shipping too?',
      aEn: 'The model charges the fee on the price the buyer pays. If your marketplace also fees the shipping you charge the buyer, add that shipping into the price field and treat it as revenue, not as absorbed cost.',
      qZh: '平台抽成算不算运费？',
      aZh: '模型按买家支付的价款抽成。如果你的平台对向买家收的运费也抽成，把那部分放进价款里当收入算，别当自己承担的运费。',
    },
    {
      qEn: 'What is a realistic premium factor for handmade?',
      aEn: '1.5 to 3 on this cost base is common. Above 3 the buyer needs a story they can repeat to someone else; the calculator will show the arithmetic, the ceiling is your judgement and your market.',
      qZh: '手作的溢价系数定多少合理？',
      aZh: '在这个成本口径下 1.5 到 3 常见。超过 3 需要买家能转述给别人听的叙事；计算器只给算术，天花板由你的判断与市场决定。',
    },
    {
      qEn: 'Does the calculator know my market price?',
      aEn: 'No. It computes the floor your own numbers imply, then applies the multiplier you choose. Compare the result against listings that are already selling at that price; that comparison is outside this page.',
      qZh: '它知道我的市场价吗？',
      aZh: '不知道。它用你自己的数字算出保本价，再乘你选的系数。算出的价格要去和已经在卖的同款对比，那一步不在本页里。',
    },
    {
      qEn: 'Does anything get sent to a server?',
      aEn: 'No. The maths runs in your browser, values stay in your browser storage so a reload keeps them, and there is no analytics on this tool page.',
      qZh: '数据会上传吗？',
      aZh: '不会。计算在浏览器本地跑，数值只存在你浏览器的本地存储里（刷新后还在），这个工具页没有统计脚本。',
    },
  ] as ToolFaq[],
} as const;

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
