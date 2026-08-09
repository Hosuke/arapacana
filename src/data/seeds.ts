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

/** 常见东密种子字对读索引；尊属、读法与表义以具体轨本及传承教授为准 */
export const seedSyllables: SeedSyllable[] = [
  { siddham: '\u{11580}', han: '阿', iast: 'a', deity: '胎藏界大日如来', meaning: '本不生 · 菩提心种子', inWheel: true },
  { siddham: `\u{115AA}\u{115BD}`, han: '鑁', iast: 'vaṃ', deity: '金刚界大日如来', meaning: '法界体性 · 成身会', inWheel: false },
  { siddham: `\u{115AE}${V}\u{115A8}\u{115B1}\u{115BE}`, han: '纥哩', iast: 'hrīḥ', deity: '阿弥陀佛 · 观世音菩萨', meaning: '无缘大悲', inWheel: false },
  { siddham: `\u{1158C}\u{115BD}`, han: '唵', iast: 'oṃ', deity: '佛部总持', meaning: '身密 · 三密之首', inWheel: false },
  { siddham: `\u{115AE}\u{115B3}\u{115BD}`, han: '吽', iast: 'hūṃ', deity: '金刚部总持', meaning: '意密 · 摧破障碍', inWheel: false },
]

/** 五大种子字 ↔ 四十二字门 */
export const fiveElements = [
  { el: '地轮', siddham: '\u{11580}', han: '阿', iast: 'a', shape: '方形', note: '字门第一字' },
  { el: '水轮', siddham: '\u{115AA}', han: '嚩', iast: 'va', shape: '圆形', note: '字门第十一' },
  { el: '火轮', siddham: '\u{115A8}', han: '囉', iast: 'ra', shape: '三角', note: '字门第二字（华严作「多」）' },
  { el: '风轮', siddham: '\u{115AE}', han: '诃', iast: 'ha', shape: '半月', note: '字门中不单立，可在合字「诃婆」(hva) 中参照' },
  { el: '空轮', siddham: '\u{1158F}', han: '佉', iast: 'kha', shape: '宝珠', note: '字门第廿四' },
]
