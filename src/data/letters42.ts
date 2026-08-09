export type GlyphForm = '单字' | '合字'

export interface Letter42 {
  n: number
  /** 悉昙字形：依不空T19 No.1019；逐字证据见provenance manifest */
  siddham: string
  /** 汉字注音：依《八十华严》T10 No.279；与不空本异写者见校注 */
  han: string
  iast: string
  form: GlyphForm
  /** 般若波罗蜜门名（《八十华严》卷七十六） */
  gate: string
  /** 不空T19 No.1019逐字释义；非《八十华严》门名原句 */
  meaning: string
  /** 与诸尊种子字系统的桥接，若有 */
  seed?: string
  /** 文殊五字之一 */
  manjusri?: boolean
}

const V = '\u{115BF}' // 悉昙 virama（合字符）

export const letters42: Letter42[] = [
  { n: 1, siddham: '\u{11580}', han: '阿', iast: 'a', form: '单字', gate: '以菩萨威力入无差别境界', meaning: '一切法本不生', seed: '常见对读：胎藏界大日如来阿字、地轮阿字', manjusri: true },
  { n: 2, siddham: '\u{115A8}', han: '多', iast: 'ra', form: '单字', gate: '无边差别门', meaning: '一切法离尘垢', seed: '常见对读：火轮囉字；《华严经》此处音译作「多」', manjusri: true },
  { n: 3, siddham: '\u{115A2}', han: '波', iast: 'pa', form: '单字', gate: '普照法界', meaning: '一切法胜义谛不可得', manjusri: true },
  { n: 4, siddham: '\u{11593}', han: '者', iast: 'ca', form: '单字', gate: '普轮断差别', meaning: '一切法无诸行', manjusri: true },
  { n: 5, siddham: '\u{115A1}', han: '那', iast: 'na', form: '单字', gate: '得无依无上', meaning: '一切法性相不可得', manjusri: true },
  { n: 6, siddham: '\u{115A9}', han: '逻', iast: 'la', form: '单字', gate: '离依止无垢', meaning: '一切法出世间故，爱支因缘永不现' },
  { n: 7, siddham: '\u{1159F}', han: '柁', iast: 'da', form: '单字', gate: '不退转方便', meaning: '一切法调伏寂静真如平等无分别' },
  { n: 8, siddham: '\u{115A4}', han: '婆', iast: 'ba', form: '单字', gate: '金刚场', meaning: '一切法离缚解' },
  { n: 9, siddham: '\u{1159A}', han: '荼', iast: 'ḍa', form: '单字', gate: '普轮', meaning: '一切法离热矫秽得清凉' },
  { n: 10, siddham: '\u{115AC}', han: '沙', iast: 'ṣa', form: '单字', gate: '海藏', meaning: '一切法无罣碍' },
  { n: 11, siddham: '\u{115AA}', han: '嚩', iast: 'va', form: '单字', gate: '普生安住', meaning: '一切法言语道断', seed: '常见对读：水轮嚩字' },
  { n: 12, siddham: '\u{1159D}', han: '哆', iast: 'ta', form: '单字', gate: '圆满光', meaning: '一切法真如不动' },
  { n: 13, siddham: '\u{115A7}', han: '也', iast: 'ya', form: '单字', gate: '差别积聚', meaning: '一切法如实不生' },
  { n: 14, siddham: `\u{115AC}${V}\u{11598}`, han: '瑟吒', iast: 'ṣṭa', form: '合字', gate: '普光明息烦恼', meaning: '一切法制伏任持相不可得' },
  { n: 15, siddham: '\u{1158E}', han: '迦', iast: 'ka', form: '单字', gate: '无差别云', meaning: '一切法作者不可得' },
  { n: 16, siddham: '\u{115AD}', han: '娑', iast: 'sa', form: '单字', gate: '降霔大雨', meaning: '一切法时平等性不可得' },
  { n: 17, siddham: '\u{115A6}', han: '么', iast: 'ma', form: '单字', gate: '大流湍激众峰齐峙', meaning: '一切法我所执性不可得' },
  { n: 18, siddham: '\u{11590}', han: '伽', iast: 'ga', form: '单字', gate: '普安立', meaning: '一切法行取性不可得' },
  { n: 19, siddham: '\u{1159E}', han: '他', iast: 'tha', form: '单字', gate: '真如平等藏', meaning: '一切法处所不可得' },
  { n: 20, siddham: '\u{11595}', han: '社', iast: 'ja', form: '单字', gate: '入世间海清净', meaning: '一切法能所生起不可得' },
  { n: 21, siddham: `\u{115AD}${V}\u{115AA}`, han: '锁', iast: 'sva', form: '合字', gate: '念一切佛庄严', meaning: '一切法安隐性不可得' },
  { n: 22, siddham: '\u{115A0}', han: '驮', iast: 'dha', form: '单字', gate: '观察拣择一切法聚', meaning: '一切法能持界性不可得' },
  { n: 23, siddham: '\u{115AB}', han: '奢', iast: 'śa', form: '单字', gate: '随顺一切佛教轮光明', meaning: '一切法寂静性不可得' },
  { n: 24, siddham: '\u{1158F}', han: '佉', iast: 'kha', form: '单字', gate: '修因地智慧藏', meaning: '一切法如虚空性不可得', seed: '常见对读：空轮佉字' },
  { n: 25, siddham: `\u{1158E}${V}\u{115AC}`, han: '叉', iast: 'kṣa', form: '合字', gate: '息诸业海藏', meaning: '一切法穷尽性不可得' },
  { n: 26, siddham: `\u{115AD}${V}\u{1159D}`, han: '娑多', iast: 'sta', form: '合字', gate: '蠲诸惑障开净光明', meaning: '一切法住持处非处令不动转性不可得' },
  { n: 27, siddham: '\u{11597}', han: '壤', iast: 'ña', form: '单字', gate: '作世间智慧门', meaning: '一切法能所知性不可得' },
  { n: 28, siddham: `\u{115A8}${V}\u{1159E}`, han: '曷攞多', iast: 'rtha', form: '合字', gate: '生死境界智慧轮', meaning: '一切法执著义性不可得' },
  { n: 29, siddham: '\u{115A5}', han: '婆', iast: 'bha', form: '单字', gate: '一切智宫殿圆满庄严', meaning: '一切法可破坏性不可得' },
  { n: 30, siddham: '\u{11594}', han: '车', iast: 'cha', form: '单字', gate: '修行方便藏各别圆满', meaning: '一切法欲乐覆性不可得' },
  { n: 31, siddham: `\u{115AD}${V}\u{115A6}`, han: '娑么', iast: 'sma', form: '合字', gate: '随十方现见诸佛', meaning: '一切法可忆念性不可得' },
  { n: 32, siddham: `\u{115AE}${V}\u{115AA}`, han: '诃婆', iast: 'hva', form: '合字', gate: '观察一切无缘众生方便摄受令出生无碍力', meaning: '一切法可呼召性不可得', seed: '常见对读：风轮诃(ha)字可在此合字中参照' },
  { n: 33, siddham: `\u{1159D}${V}\u{115AD}`, han: '縒', iast: 'tsa', form: '合字', gate: '修行趣入一切功德海', meaning: '一切法勇健性不可得' },
  { n: 34, siddham: '\u{11591}', han: '伽', iast: 'gha', form: '单字', gate: '持一切法云坚固海藏', meaning: '一切法厚平等性不可得' },
  { n: 35, siddham: '\u{11599}', han: '吒', iast: 'ṭha', form: '单字', gate: '随愿普见十方诸佛', meaning: '一切法积集性不可得' },
  { n: 36, siddham: '\u{1159C}', han: '拏', iast: 'ṇa', form: '单字', gate: '观察字轮有无尽诸亿字', meaning: '一切法离诸喧诤无往无来行住坐卧不可得' },
  { n: 37, siddham: '\u{115A3}', han: '娑颇', iast: 'pha', form: '单字', gate: '化众生究竟处', meaning: '一切法遍满果报不可得' },
  { n: 38, siddham: `\u{115AD}${V}\u{1158E}`, han: '娑迦', iast: 'ska', form: '合字', gate: '广大藏无碍辩光明轮遍照', meaning: '一切法积聚蕴性不可得' },
  { n: 39, siddham: `\u{115A7}${V}\u{115AD}`, han: '也娑', iast: 'ysa', form: '合字', gate: '宣说一切佛法境界', meaning: '一切法衰老性相不可得' },
  { n: 40, siddham: `\u{115AB}${V}\u{11593}`, han: '室者', iast: 'śca', form: '合字', gate: '于一切众生界法雷遍吼', meaning: '一切法聚集足迹不可得' },
  { n: 41, siddham: '\u{11598}', han: '侘', iast: 'ṭa', form: '单字', gate: '以无我法开晓众生', meaning: '一切法相驱迫性不可得' },
  { n: 42, siddham: '\u{1159B}', han: '陀', iast: 'ḍha', form: '单字', gate: '一切法轮差别藏', meaning: '一切法究竟处所不可得' },
]
