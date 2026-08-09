export interface SeedSyllable {
  /** 悉昙字形（为准） */
  siddham: string
  /** 汉字注音（为辅） */
  han: string
  iast: string
  deity: string
  meaning: string
  inWheel: boolean
}

const V = '\u{115BF}' // virama

/** 诸尊种子字（东密通行） */
export const seedSyllables: SeedSyllable[] = [
  { siddham: '\u{11580}', han: '阿', iast: 'a', deity: '胎藏界大日如来', meaning: '本不生 · 菩提心种子', inWheel: true },
  { siddham: `\u{115AA}\u{115B0}\u{115BD}`, han: '鑁', iast: 'vāṃ', deity: '金刚界大日如来', meaning: '法界体性 · 成身会', inWheel: false },
  { siddham: `\u{115AE}${V}\u{115A8}\u{115B2}\u{115BE}`, han: '纥哩', iast: 'hrīḥ', deity: '阿弥陀佛 · 观世音菩萨', meaning: '无缘大悲', inWheel: false },
  { siddham: '\u{1158E}', han: '迦', iast: 'ka', deity: '地藏菩萨', meaning: '作者不可得 · 如大地荷负', inWheel: true },
  { siddham: '\u{115AD}', han: '娑', iast: 'sa', deity: '圣观音', meaning: '平等性不可得 · 慈悲普覆', inWheel: true },
  { siddham: `\u{1158C}\u{115BD}`, han: '唵', iast: 'oṃ', deity: '佛部总持', meaning: '身密 · 三密之首', inWheel: false },
  { siddham: `\u{115AE}\u{115B4}\u{115BD}`, han: '吽', iast: 'hūṃ', deity: '金刚部总持', meaning: '意密 · 摧破障碍', inWheel: false },
]

/** 五大种子字 ↔ 四十二字门 */
export const fiveElements = [
  { el: '地轮', siddham: '\u{11580}', han: '阿', iast: 'a', shape: '方形', note: '字门第一字' },
  { el: '水轮', siddham: '\u{115AA}', han: '嚩', iast: 'va', shape: '圆形', note: '字门第十一' },
  { el: '火轮', siddham: '\u{115A8}', han: '囉', iast: 'ra', shape: '三角', note: '字门第二字（华严作「多」）' },
  { el: '风轮', siddham: '\u{115AE}', han: '诃', iast: 'ha', shape: '半月', note: '字门中不单立，仅存于二合「诃婆」(hva)' },
  { el: '空轮', siddham: '\u{1158F}', han: '佉', iast: 'kha', shape: '宝珠', note: '字门第廿四' },
]
