// 第一方产品页的单一真源：页面（en/zh）与 Markdown 镜像 (/m/pages/*) 都读这里。
// 数据纪律：所有数字必须来自 2026-11-03 在 listing 页的实测快照，并写明观察时间；
// 不写销量、排名、转化率、"最畅销"这类我们没数据的断言；0 评价就写 0 评价，不编 aggregateRating。
// 红线：不写店铺内部 id（sid）、不写 shopzart 的邮箱/电话（发布锚点只用本站域名），不写后台路径。

export const product = {
  id: 'soy-candle-kit',
  slug: 'soy-candle-kit',
  listingUrl: 'https://shopzart.com/listing/2949/soy-candle-making-kit-your-complete-home-kit-for-professiona-2949',
  observedAt: '2026-11-03',
  sellerEn: 'ZART (our own marketplace, sold by Zart)',
  sellerZh: 'ZART（我们自己的平台，卖家名 Zart）',
  firstParty: true,
  titleEn: 'Soy Candle Making Kit: Your Complete Home Kit for Professional, Sale-Ready Soy Candles',
  titleZh: '大豆蜡烛制作套装：家用全套，做出可出售的专业级大豆蜡烛',
  price: 54.99,
  listPrice: 89.99,
  currency: 'USD',
  stock: 287,
  reviews: 0,
  categoryPath: 'Craft Supplies & Tools › Raw Materials',
  returnsEn: 'Eligible for returns and exchanges (stated on the listing).',
  returnsZh: '支持退换（listing 页面写明）。',
  promoEn: 'New-customer 20% off (minimum spend $1) and $5 off a $15 purchase, both shown on the listing.',
  promoZh: '新客 20% off（最低 $1）与满 $15 减 $5，均为 listing 页面显示。',
  pitchEn:
    'Everything needed to make container soy candles at home: wax, fragrance, dye, wicks, six containers, and the tools to pour them safely.',
  pitchZh: '在家做出容器大豆蜡烛所需的全套：蜡、香精、染料、烛芯、六个容器，以及安全浇注所需的工具。',
  contents: [
    { qty: '2.5 lb', itemEn: 'soy wax flakes', itemZh: '大豆蜡片' },
    { qty: '10', itemEn: 'fragrance oils', itemZh: '香精' },
    { qty: '10', itemEn: 'liquid dyes', itemZh: '液体染料' },
    { qty: '14', itemEn: 'cotton wicks (pre-sized for containers)', itemZh: '棉芯（已按容器预裁）' },
    { qty: '6', itemEn: 'wooden wicks', itemZh: '木芯' },
    { qty: '20', itemEn: 'wick stickers', itemZh: '烛芯贴' },
    { qty: '4', itemEn: 'glass containers (1 × 5 oz, 3 × 7 oz)', itemZh: '玻璃容器（1×5oz、3×7oz）' },
    { qty: '4', itemEn: 'tin containers (2 × 8 oz, 1 × 4 oz, 1 × 3 oz)', itemZh: '铁罐（2×8oz、1×4oz、1×3oz）' },
    { qty: '2', itemEn: 'printed tins (1 × 2.5 oz, 1 × 4.5 oz)', itemZh: '印花铁罐（1×2.5oz、1×4.5oz）' },
    { qty: '1', itemEn: 'wax melting cup', itemZh: '熔蜡杯' },
    { qty: '1', itemEn: 'measuring cup', itemZh: '量杯' },
    { qty: '1', itemEn: 'thermometer', itemZh: '温度计' },
    { qty: '1', itemEn: 'wax stirring spoon', itemZh: '搅拌勺' },
    { qty: '20', itemEn: 'wick holders (10 wooden, 10 metal)', itemZh: '固芯器（木 10、金属 10）' },
    { qty: '1', itemEn: 'heat-resistant table mat', itemZh: '耐热桌垫' },
    { qty: '10', itemEn: 'anti-scald finger caps', itemZh: '防烫指套' },
    { qty: '1', itemEn: 'tweezers', itemZh: '镊子' },
    { qty: '1 set', itemEn: 'natural crystals and dried flowers', itemZh: '天然晶石与干花' },
  ],
  safetyEn: [
    'Keep dried flowers fully submerged in wax (fire hazard if exposed).',
    'Store materials cool and dry, out of sunlight.',
    'Keep wax and wicks away from open flame and heat.',
  ],
  safetyZh: ['干花必须完全被蜡覆盖（露出有起火风险）。', '材料存放在阴凉干燥处，避开阳光。', '蜡与烛芯远离明火与热源。'],
  factsEn: [
    'Total container capacity across the kit is 10 vessels; wax is 2.5 lb, so a full kit typically yields several dozen candles depending on vessel fill — we publish no yield claim because we have not run the test.',
    'The listing states the fragrance oils have high flashpoints; it gives no flashpoint number, so we do not state one.',
  ],
  factsZh: [
    '套装共含 10 个容器、2.5 磅蜡；能出多少支蜡烛取决于填充方式——我们没跑过灌装测试，所以不给产量数字。',
    'listing 写香精"高闪点"，但没给具体数值，我们也不写数值。',
  ],
  holidayTable: [
    {
      date: '2026-11-26',
      en: 'Thanksgiving (US, 4th Thursday)',
      zh: '感恩节（美国，11 月第四个周四）',
      useEn: 'Hostess gift: a candle poured and labelled by the guest, not the host.',
      useZh: '伴手礼：客人自己浇注并贴标的蜡烛，不抢主人风头。',
    },
    {
      date: '2026-11-27',
      en: 'Black Friday',
      zh: '黑五',
      useEn: 'Price is set at $54.99 today; we publish no Black Friday discount promise.',
      useZh: '今日标价 $54.99；我们不承诺黑五折扣。',
    },
    {
      date: '2026-11-28',
      en: 'Small Business Saturday',
      zh: '小商家周六',
      useEn: 'A kit sourced from an independent marketplace; buy the vessel set, make the gift.',
      useZh: '独立平台采购：买套装，把礼物做出来。',
    },
    {
      date: '2026-11-30',
      en: 'Cyber Monday',
      zh: '网络星期一',
      useEn: 'Last comfortable order date for a handmade gift before Hanukkah starts (verify shipping on the listing).',
      useZh: '光明节点烛前较稳的下单时点（发货时效以 listing 为准）。',
    },
    {
      date: '2026-12-04 → 2026-12-12',
      en: 'Hanukkah (candle lighting from sundown 4 Dec)',
      zh: '光明节（12-04 日落起点烛，至 12-12）',
      useEn: 'Make eight+ labelled candles as a gift; note this kit is for container candles, not a shamash set.',
      useZh: '可做八支以上带标签的蜡烛当礼物；注意这是容器蜡烛套装，不是灯台。',
    },
    {
      date: '2026-12-25',
      en: 'Christmas',
      zh: '圣诞节',
      useEn: 'Stocking-stuffer angle: the kit itself is the gift for a maker, not the candles.',
      useZh: '送礼角度：这套工具本身就是给手作人的礼物，而不是成品蜡烛。',
    },
    {
      date: '2026-12-26',
      en: 'Kwanzaa begins',
      zh: '宽扎节开始',
      useEn: 'Candle-adjacent gifting; we make no cultural claim beyond that.',
      useZh: '与蜡烛相关的送礼场景；我们不做更多文化断言。',
    },
  ],
  faq: [
    {
      qEn: 'Is this your product?',
      qZh: '这是你们自己的产品吗？',
      aEn: 'Yes. ZART is the marketplace we run, and this listing is first-party. The link is not an affiliate link, and we disclose that on every page that carries it.',
      aZh: '是。ZART 是我们自己运营的平台，这个 listing 是第一方商品。链接不是联盟返佣链接，我们也在带链接的每一页写明。',
    },
    {
      qEn: 'What is the real price and stock right now?',
      qZh: '现在真实价格和库存是多少？',
      aEn: 'Observed on 2026-11-03: $54.99 with a list price of $89.99, 287 units in stock. Both change; the listing page is the live source.',
      aZh: '2026-11-03 实测：$54.99，划线价 $89.99，现货 287 件。两者都会变，实时以 listing 页为准。',
    },
    {
      qEn: 'Does it have reviews?',
      qZh: '它有评价吗？',
      aEn: 'No. The listing showed 0 reviews on 2026-11-03, so we publish no star rating and no aggregate score.',
      aZh: '没有。2026-11-03 listing 显示 0 条评价，所以我们不写星级、不写总分。',
    },
    {
      qEn: 'Can a beginner use it for a holiday gift?',
      qZh: '新手能用它做节日礼物吗？',
      aEn: 'The kit includes a thermometer, melting cup, wick holders and 10 vessels, which covers the steps beginners usually get wrong. We have not run a beginner trial, so we do not claim a success rate.',
      aZh: '套装带温度计、熔蜡杯、固芯器和 10 个容器，覆盖了新手最容易出错的环节。我们没做过新手实测，所以不声称成功率。',
    },
    {
      qEn: 'What will you do with this page?',
      qZh: '你们拿这个页面做什么？',
      aEn: 'It is the test case for our AIEO experiment: a first-party product page with Product schema, FAQ, dated claims and a Markdown mirror, measured against a fixed query panel. Method and check dates: /essays/2026-11-03-aieo-product-test.',
      aZh: '它是我们 AIEO 实验的测试案例：一个带 Product 结构化数据、FAQ、带日期断言与 Markdown 镜像的第一方产品页，用固定提问面板去测。方法与核对日期见 /zh/essays/2026-11-03-aieo-product-test。',
    },
    {
      qEn: 'Will you publish sales numbers for it?',
      qZh: '你们会公开它的销量吗？',
      aEn: 'No. We publish observed price, stock and review counts with observation dates, plus anything we can check ourselves. Revenue and order counts stay private.',
      aZh: '不会。我们只写在带上时间的实测数据（价格、库存、评价数）与能自己核对的东西，营收与订单数不公开。',
    },
  ],
} as const;

export const disclosureEn =
  'First-party disclosure: ZART is the marketplace the author runs. This page links to our own listing. No affiliate commission, no sponsored claim, and no data we cannot check.';
export const disclosureZh =
  '第一方披露：ZART 是作者自己运营的平台，本页链的是我们自家商品；没有联盟返佣，没有赞助声明，不写我们核对不了的数据。';
