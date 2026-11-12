// 美国州级瓦片网格（tile-grid cartogram）布局：每个州一个方块，位置按地理邻接近似排布。
// 这不是地理边界——页面必须写明"cartogram, 不是边界地图"，否则就是用一张示意图冒充地图。
// 53 个条目 = 50 州 + DC + PR + VI。col 0..10，row 0..8。
export type Tile = { name: string; col: number; row: number };

export const tiles: Tile[] = [
  { name: 'Alaska', col: 0, row: 0 },
  { name: 'Maine', col: 10, row: 0 },

  { name: 'Vermont', col: 9, row: 1 },
  { name: 'New Hampshire', col: 10, row: 1 },

  { name: 'Washington', col: 1, row: 2 },
  { name: 'Idaho', col: 2, row: 2 },
  { name: 'Montana', col: 3, row: 2 },
  { name: 'North Dakota', col: 4, row: 2 },
  { name: 'Minnesota', col: 5, row: 2 },
  { name: 'Wisconsin', col: 6, row: 2 },
  { name: 'Michigan', col: 7, row: 2 },
  { name: 'New York', col: 8, row: 2 },
  { name: 'Massachusetts', col: 9, row: 2 },
  { name: 'Rhode Island', col: 10, row: 2 },

  { name: 'Oregon', col: 1, row: 3 },
  { name: 'Nevada', col: 2, row: 3 },
  { name: 'Wyoming', col: 3, row: 3 },
  { name: 'South Dakota', col: 4, row: 3 },
  { name: 'Iowa', col: 5, row: 3 },
  { name: 'Illinois', col: 6, row: 3 },
  { name: 'Indiana', col: 7, row: 3 },
  { name: 'Ohio', col: 8, row: 3 },
  { name: 'Pennsylvania', col: 9, row: 3 },
  { name: 'New Jersey', col: 10, row: 3 },

  { name: 'California', col: 1, row: 4 },
  { name: 'Utah', col: 2, row: 4 },
  { name: 'Colorado', col: 3, row: 4 },
  { name: 'Nebraska', col: 4, row: 4 },
  { name: 'Missouri', col: 5, row: 4 },
  { name: 'Kentucky', col: 6, row: 4 },
  { name: 'West Virginia', col: 7, row: 4 },
  { name: 'Virginia', col: 8, row: 4 },
  { name: 'Maryland', col: 9, row: 4 },
  { name: 'Delaware', col: 10, row: 4 },

  { name: 'Arizona', col: 2, row: 5 },
  { name: 'New Mexico', col: 3, row: 5 },
  { name: 'Kansas', col: 4, row: 5 },
  { name: 'Arkansas', col: 5, row: 5 },
  { name: 'Tennessee', col: 6, row: 5 },
  { name: 'North Carolina', col: 7, row: 5 },
  { name: 'South Carolina', col: 8, row: 5 },
  { name: 'District of Columbia', col: 9, row: 5 },
  { name: 'Connecticut', col: 10, row: 5 },

  { name: 'Oklahoma', col: 4, row: 6 },
  { name: 'Louisiana', col: 5, row: 6 },
  { name: 'Mississippi', col: 6, row: 6 },
  { name: 'Alabama', col: 7, row: 6 },
  { name: 'Georgia', col: 8, row: 6 },
  { name: 'Florida', col: 9, row: 6 },

  { name: 'Hawaii', col: 1, row: 7 },
  { name: 'Texas', col: 4, row: 7 },

  { name: 'Puerto Rico', col: 9, row: 8 },
  { name: 'Virgin Islands', col: 10, row: 8 },
];

/** 两字母缩写（瓦片上显示，避免 44px 方块里塞全名） */
export const abbr: Record<string, string> = {
  Alabama: 'AL', Alaska: 'AK', Arizona: 'AZ', Arkansas: 'AR', California: 'CA', Colorado: 'CO',
  Connecticut: 'CT', Delaware: 'DE', 'District of Columbia': 'DC', Florida: 'FL', Georgia: 'GA',
  Hawaii: 'HI', Idaho: 'ID', Illinois: 'IL', Indiana: 'IN', Iowa: 'IA', Kansas: 'KS', Kentucky: 'KY',
  Louisiana: 'LA', Maine: 'ME', Maryland: 'MD', Massachusetts: 'MA', Michigan: 'MI', Minnesota: 'MN',
  Mississippi: 'MS', Missouri: 'MO', Montana: 'MT', Nebraska: 'NE', Nevada: 'NV',
  'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
  'North Carolina': 'NC', 'North Dakota': 'ND', Ohio: 'OH', Oklahoma: 'OK', Oregon: 'OR',
  Pennsylvania: 'PA', 'Puerto Rico': 'PR', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', Tennessee: 'TN', Texas: 'TX', Utah: 'UT', Vermont: 'VT', Virginia: 'VA',
  'Virgin Islands': 'VI', Washington: 'WA', 'West Virginia': 'WV', Wisconsin: 'WI', Wyoming: 'WY',
};
