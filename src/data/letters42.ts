export type LetterType = '一合' | '二合' | '三合'

export interface Letter42 {
  n: number
  /** 悉昙字形（为准） */
  siddham: string
  /** 汉字注音（为辅） */
  han: string
  iast: string
  type: LetterType
  /** 般若波罗蜜门名（《八十华严》卷七十六） */
  gate: string
  /** 遮诠义（据澄观疏钞、不空观门） */
  meaning: string
  /** 与诸尊种子字系统的桥接，若有 */
  seed?: string
  /** 文殊五字之一 */
  manjusri?: boolean
}

const V = '\u{115BF}' // 悉昙 virama（合字符）

export const letters42: Letter42[] = [
  { n: 1, siddham: '\u{11580}', han: '阿', iast: 'a', type: '一合', gate: '以菩萨威力入无差别境界', meaning: '一切法本不生', seed: '胎藏界大日如来种子 · 地轮 · 一切字之首', manjusri: true },
  { n: 2, siddham: '\u{115A8}', han: '多', iast: 'ra', type: '一合', gate: '无边差别门', meaning: '一切法离尘垢', seed: '火轮（大品般若经作「罗」）', manjusri: true },
  { n: 3, siddham: '\u{115A2}', han: '波', iast: 'pa', type: '一合', gate: '普照法界', meaning: '一切法第一义谛不可得', manjusri: true },
  { n: 4, siddham: '\u{11593}', han: '者', iast: 'ca', type: '一合', gate: '普轮断差别', meaning: '一切法无诸行', manjusri: true },
  { n: 5, siddham: '\u{115A1}', han: '那', iast: 'na', type: '一合', gate: '得无依无上', meaning: '一切法性相不可得', manjusri: true },
  { n: 6, siddham: '\u{115A9}', han: '逻', iast: 'la', type: '一合', gate: '离依止无垢', meaning: '一切法出世间，离惑染' },
  { n: 7, siddham: '\u{1159F}', han: '柁', iast: 'da', type: '一合', gate: '不退转方便', meaning: '一切法调伏寂静' },
  { n: 8, siddham: '\u{115A4}', han: '婆', iast: 'ba', type: '一合', gate: '金刚场', meaning: '一切法离缚解' },
  { n: 9, siddham: '\u{1159A}', han: '荼', iast: 'ḍa', type: '一合', gate: '普轮', meaning: '一切法离热恼，得清凉' },
  { n: 10, siddham: '\u{115AC}', han: '沙', iast: 'ṣa', type: '一合', gate: '海藏', meaning: '一切法无罣碍' },
  { n: 11, siddham: '\u{115AA}', han: '嚩', iast: 'va', type: '一合', gate: '普生安住', meaning: '一切法言语道断', seed: '水轮' },
  { n: 12, siddham: '\u{1159D}', han: '哆', iast: 'ta', type: '一合', gate: '圆满光', meaning: '一切法真如不动' },
  { n: 13, siddham: '\u{115A7}', han: '也', iast: 'ya', type: '一合', gate: '差别积聚', meaning: '一切法如实不生' },
  { n: 14, siddham: `\u{115AC}${V}\u{11598}`, han: '瑟吒', iast: 'ṣṭa', type: '二合', gate: '普光明息烦恼', meaning: '一切法制伏任持相不可得' },
  { n: 15, siddham: '\u{1158E}', han: '迦', iast: 'ka', type: '一合', gate: '无差别云', meaning: '一切法作者不可得', seed: '地藏菩萨种子' },
  { n: 16, siddham: '\u{115AD}', han: '娑', iast: 'sa', type: '一合', gate: '降霔大雨', meaning: '一切法时平等性不可得', seed: '圣观音种子' },
  { n: 17, siddham: '\u{115A6}', han: '么', iast: 'ma', type: '一合', gate: '大流湍激众峰齐峙', meaning: '一切法我所执性不可得' },
  { n: 18, siddham: '\u{11590}', han: '伽', iast: 'ga', type: '一合', gate: '普安立', meaning: '一切法行取性不可得' },
  { n: 19, siddham: `\u{115AD}${V}\u{1159E}`, han: '他', iast: 'stha', type: '一合', gate: '真如平等藏', meaning: '一切法处所性不可得' },
  { n: 20, siddham: '\u{11595}', han: '社', iast: 'ja', type: '一合', gate: '入世间海清净', meaning: '一切法能所生起不可得' },
  { n: 21, siddham: `\u{115AB}${V}\u{115AA}`, han: '锁', iast: 'śva', type: '一合', gate: '念一切佛庄严', meaning: '一切法安隐性不可得' },
  { n: 22, siddham: '\u{115A0}', han: '驮', iast: 'dha', type: '一合', gate: '观察拣择一切法聚', meaning: '一切法能持界性不可得' },
  { n: 23, siddham: '\u{115AB}', han: '奢', iast: 'śa', type: '一合', gate: '随顺一切佛教轮光明', meaning: '一切法寂静性不可得' },
  { n: 24, siddham: '\u{1158F}', han: '佉', iast: 'kha', type: '一合', gate: '修因地智慧藏', meaning: '一切法如虚空性不可得', seed: '空轮' },
  { n: 25, siddham: `\u{1158E}${V}\u{115AC}`, han: '叉', iast: 'kṣa', type: '一合', gate: '息诸业海藏', meaning: '一切法尽性不可得' },
  { n: 26, siddham: `\u{115AD}${V}\u{1159D}`, han: '娑多', iast: 'sta', type: '二合', gate: '蠲诸惑障开净光明', meaning: '一切法任持处非处不动性不可得' },
  { n: 27, siddham: `\u{11595}${V}\u{115A1}`, han: '壤', iast: 'jña', type: '一合', gate: '作世间智慧门', meaning: '一切法能所知性不可得' },
  { n: 28, siddham: `\u{115A8}${V}\u{1159E}`, han: '曷攞多', iast: 'rtha', type: '三合', gate: '生死境界智慧轮', meaning: '一切法执著义性不可得' },
  { n: 29, siddham: '\u{115A5}', han: '婆', iast: 'bha', type: '一合', gate: '一切智宫殿圆满庄严', meaning: '一切法可破坏性不可得' },
  { n: 30, siddham: '\u{11594}', han: '车', iast: 'cha', type: '一合', gate: '修行方便藏各别圆满', meaning: '一切法欲乐覆性不可得' },
  { n: 31, siddham: `\u{115AD}${V}\u{115A6}`, han: '娑么', iast: 'sma', type: '二合', gate: '随十方现见诸佛', meaning: '一切法可忆念性不可得' },
  { n: 32, siddham: `\u{115AE}${V}\u{115AA}`, han: '诃婆', iast: 'hva', type: '二合', gate: '观察一切无缘众生方便摄受令出生无碍力', meaning: '一切法可呼召性不可得', seed: '风轮诃(ha)字仅存于此二合之中' },
  { n: 33, siddham: `\u{1159D}${V}\u{115AD}`, han: '縒', iast: 'tsa', type: '一合', gate: '修行趣入一切功德海', meaning: '一切法勇健性不可得' },
  { n: 34, siddham: '\u{11591}', han: '伽', iast: 'gha', type: '一合', gate: '持一切法云坚固海藏', meaning: '一切法厚平等性不可得' },
  { n: 35, siddham: '\u{11599}', han: '吒', iast: 'ṭha', type: '一合', gate: '随愿普见十方诸佛', meaning: '一切法积集性不可得' },
  { n: 36, siddham: '\u{115A1}', han: '拏', iast: 'na', type: '一合', gate: '观察字轮有无尽诸亿字', meaning: '一切法离诸谊诤，无往无来' },
  { n: 37, siddham: `\u{115AD}${V}\u{115A3}`, han: '娑颇', iast: 'spha', type: '二合', gate: '化众生究竟处', meaning: '一切法徧满果报不可得' },
  { n: 38, siddham: `\u{115AD}${V}\u{1158E}`, han: '娑迦', iast: 'ska', type: '二合', gate: '广大藏无碍辩光明轮遍照', meaning: '一切法积聚蕴性不可得' },
  { n: 39, siddham: `\u{115A7}${V}\u{115AD}`, han: '也娑', iast: 'ysa', type: '二合', gate: '宣说一切佛法境界', meaning: '一切法衰老性相不可得' },
  { n: 40, siddham: `\u{115AB}${V}\u{11593}`, han: '室者', iast: 'śca', type: '二合', gate: '于一切众生界法雷遍吼', meaning: '一切法聚集足迹不可得' },
  { n: 41, siddham: '\u{11598}', han: '侘', iast: 'ṭa', type: '一合', gate: '以无我法开晓众生', meaning: '一切法相驱迫性不可得' },
  { n: 42, siddham: '\u{115A0}', han: '陀', iast: 'dha', type: '一合', gate: '一切法轮差别藏', meaning: '一切法究竟处所不可得' },
]

/** 阿字十二韵（通行本，各本微异）：每主字领十二助字，42 × 12 = 504 音 */
export const twelveRhymes = ['佒', '鞥', '翁', '乌', '爊', '哀', '医', '因', '安', '音', '谙', '讴']
