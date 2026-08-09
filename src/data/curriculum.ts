export interface Stage {
  id: string
  numeral: string
  name: string
  weeks: string
  essence: string
  jiangyi: string
  guanfa: string
  xingchi: string
  kanyan: string[]
  liaoyi: string
}

export const charter = [
  {
    numeral: '壹',
    title: '依法观文',
    body: '本站依所列经论与公开仪轨整理，不自立教判，也不授灌顶、口传或认证。经义有疑，宜核对原典，并请教具德善知识。',
  },
  {
    numeral: '贰',
    title: '以图助观',
    body: '月轮、字轮与次第图只作学习方便，帮助辨认字相、方位与法义；不以图式代替本尊、坛城、仪轨与真实修持。',
  },
  {
    numeral: '叁',
    title: '返观自省',
    body: '清单只供记录闻思与日用，不判定证量，也不以感应或梦境分高下。有师承者仍依师教，本站不代作印可。',
  },
]

export const stages: Stage[] = [
  {
    id: 'stage-0',
    numeral: '〇',
    name: '声门 · 纯音',
    weeks: '二周',
    essence: '不入字，先入声',
    jiangyi:
      '音声可作摄心所缘。先从呼吸、发声与听闻入手，不预设信仰立场；只说明一个音节如何帮助收摄散乱。',
    guanfa:
      '先持「阿」音，只随声听闻，不急于解释法义；配合磬音，徐徐安住。每日十五分钟，可随身心状况增减。',
    xingchi: '行住坐卧间，偶一返听周遭之声——只听，不评判。',
    kanyan: [
      '十五分钟内，能觉察心离开音声，并温和返回数次',
      '不以安静、异相或特殊感受为目标，嘈杂中亦可练习听闻',
    ],
    liaoyi: '初步体会音声随缘生灭，不可执取；此为后续观字的一项准备。',
  },
  {
    id: 'stage-1',
    numeral: '壹',
    name: '字门 · 阿字一门',
    weeks: '四周',
    essence: '一字安住',
    jiangyi:
      '阿字「本不生」是经轨所示观门。本站不把它简化为哲学断言，也不声称一次观察便能证得，只引导在念起念灭处返观其义。',
    guanfa:
      '月轮阿字观的文献导读：辨认月轮与金色阿字，随文理解放光、摄归等名相。有师承者以师授仪轨为准；未受相关教授者，只作字相辨识、听音与经义闻思。',
    xingchi:
      '强烈情绪现前时，先安身息，轻念阿字，觉察其因缘变化；不压制，也不以此替代必要的照护与求助。',
    kanyan: [
      '一次学习中，能多次觉察散乱，并返回字音或字相',
      '情绪现前时，能先停顿片刻，觉察身心变化',
      '若有光色异相，不取不舍，仍返于当下所缘',
    ],
    liaoyi: '由念起念灭，渐次参究「阿字本不生」；不以文字理解自称实证。',
  },
  {
    id: 'stage-2',
    numeral: '贰',
    name: '义门 · 字即般若',
    weeks: '四周',
    essence: '从一字到遮诠',
    jiangyi:
      '华严四十二字门多以「某法不可得」开示般若遮诠。所谓不可得，不是否定因果与世事，而是观诸法无自性，不固执于名相。',
    guanfa:
      '四十二字门选七字观（阿、囉、波、那、迦、叉、壤），每字一日，行「字→词→不可得」三段观。',
    xingchi: '每周选一个日常执著较强的观念，观察它由哪些因缘成立，知其可用而非实有。',
    kanyan: [
      '一项执著现前时，能看见概念与事实未必相同',
      '观不可得后，仍能审慎负责地处理现实因果',
    ],
    liaoyi: '遮诠为离执，不是断灭；见无自性，仍不废因果与慈悲。',
  },
  {
    id: 'stage-3',
    numeral: '叁',
    name: '轮门 · 从字到图',
    weeks: '六周',
    essence: '以图助观',
    jiangyi:
      '网页以方位、次第与关系图辅助认识五大五字、五方五佛。图示只是方便，不等同于曼荼罗、本尊或法界本身。',
    guanfa:
      '依图辨识展开与摄归的图式：从中心一字展开诸位，再由外缘诸字摄归中心。本站不据此模拟正式仪轨；实际修持仍以传承教授为准。',
    xingchi: '复杂情境现前时，暂收纷杂名相，返观身心与因缘，再作回应。',
    kanyan: [
      '能按图说明展开与摄归的次第，不把记图当作证量',
      '人际冲突时，能暂缓反应，返观因缘后再处理',
    ],
    liaoyi: '一多相即之义可借图会意；图式只是譬喻，不可执图为法界。',
  },
  {
    id: 'stage-4',
    numeral: '肆',
    name: '不二门 · 两图一图',
    weeks: '四周',
    essence: '理智二门互照',
    jiangyi:
      '胎藏界与金刚界各有其经轨、方位与义理。本站只借并置图帮助观察理智、因果、能所等相待关系，不以简化模型混同两部传承。',
    guanfa: '于理与智、因与果、能观与所观之间返观其相待因缘，不强作同一，也不急于割裂。',
    xingchi: '在一对现实矛盾（理想／现实、自／他）上练习不二之观，不急于选边。',
    kanyan: ['矛盾现前时，能暂住十秒，辨明两端因缘而不仓促取舍'],
    liaoyi: '「烦恼即菩提」须依不二义理解，不是纵任烦恼；转迷成悟，仍须正见与行持。',
  },
  {
    id: 'stage-5',
    numeral: '伍',
    name: '无字门 · 羯磨曼荼罗',
    weeks: '长期 · 不结业',
    essence: '不住字相，归于日用',
    jiangyi:
      '大、三昧耶、法、羯磨四种曼荼罗各有所表而相互含摄。由字相入观，终须落实于身语意；不因归于日用便轻忽尊像、标帜或文字法门。',
    guanfa:
      '一次学习结束，暂放字相，安住片刻；随后在洗碗、行路、工作时照看身语意，使闻思不离日用。',
    xingchi: '日常亦可成为观照之处；常问所学是否增益慈悲、明辨与负责的行动。',
    kanyan: ['能将一次观照落实为一项较柔和、清明或负责的行动；此项不作结业判定'],
    liaoyi: '不住文字，亦不离文字所指；所学若不能落实于慈悲与行持，仍须返观。',
  },
]

export interface PracticePhase {
  key: string
  name: string
  gate: string
  seconds: number
  guidance: string
}

export const practicePhases: PracticePhase[] = [
  {
    key: 'seat',
    name: '安身',
    gate: '准备',
    seconds: 60,
    guidance: '安稳坐下，脊直肩松。念三宝恩德，先安顿此身。',
  },
  {
    key: 'hold',
    name: '识字',
    gate: '字相',
    seconds: 480,
    guidance: '辨认月轮中的悉昙阿字、IAST 转写 a 与汉字注音「阿」。心走失了，看见，再回来。',
  },
  {
    key: 'contemplate',
    name: '观义',
    gate: '经义',
    seconds: 240,
    guidance: '依经义观此字本不生：念头未起时，它在何处？不急求答案，返观念起念灭。',
  },
  {
    key: 'dedicate',
    name: '回向',
    gate: '发愿',
    seconds: 120,
    guidance: '以此闻思，普愿法界众生，入般若波罗蜜门。',
  },
]

export const sources = [
  {
    title: '《大毗卢遮那成佛神变加持经》',
    body: '经云：「阿字门，一切诸法本不生故。」本站据此说明阿字法义，不另造引文。',
    ref: 'CBETA T18, no.848, p.10a22–27',
    url: 'https://github.com/cbeta-org/xml-p5/blob/master/T/T18/T18n0848.xml#L1420-L1428',
  },
  {
    title: '《金刚顶经瑜伽十八会指归》',
    body: '不空概述五相为「通达本心、修菩提心、成金刚心、证金刚身、佛身圆满」，同段亦说曼荼罗仪则与为弟子受法。本站只作名相导读。',
    ref: 'CBETA T18, no.869, p.284c18–28',
    url: 'https://github.com/cbeta-org/xml-p5/blob/master/T/T18/T18n0869.xml#L96-L106',
  },
  {
    title: '《大方广佛华严经·入法界品》',
    body: '善知众艺童子说：「我恒唱持此之字母。」经文依次列四十二字及各自所入般若波罗蜜门；本站的门名逐字取此。',
    ref: 'CBETA T10, no.279, p.418a3起',
    url: 'https://github.com/cbeta-org/xml-p5/blob/master/T/T10/T10n0279.xml#L37854-L37863',
  },
  {
    title: '不空《大方广佛华严经入法界品四十二字观门》',
    body: '本书逐字列出悉昙字、音写、般若波罗蜜门及「悟一切法……」释义。本站四十二字的悉昙、IAST与逐字释义以此为直接底本；与《八十华严》音写有异者，逐字标注。',
    ref: 'CBETA T19, no.1019, p.707c21–709a11',
    url: 'https://github.com/cbeta-org/xml-p5/blob/master/T/T19/T19n1019.xml#L774-L884',
  },
  {
    title: '《大智度论》四十二字门释义',
    body: '论释「字等、语等诸字入门」，逐字说明由字入诸法实相。本站以之复核义理层次，不把论中异次第强配为《华严经》原句。',
    ref: 'CBETA T25, no.1509, p.407c10–408b17',
    url: 'https://github.com/cbeta-org/xml-p5/blob/master/T/T25/T25n1509.xml#L33163-L33229',
  },
  {
    title: '不空《华严经入法界品字轮瑜伽仪轨》',
    body: '仪轨在发愿、供养、悲心与菩提心等前行后，方说「于月轮内右旋布列四十二梵字」。本网站据此绘图，不截取图式冒充完整行法。',
    ref: 'CBETA T19, no.1020, p.709b14–29',
    url: 'https://github.com/cbeta-org/xml-p5/blob/master/T/T19/T19n1020.xml#L107-L122',
  },
  {
    title: '澄观《大方广佛华严经随疏演义钞》',
    body: '澄观会通十经一论，辨明字音、次第与释义多有参差，并以「初阿字门具后荼字」说明举初摄后。本站据此保留经、论、观门之间的层级与异文。',
    ref: 'CBETA T36, no.1736, p.688a1起；p.21b9–16',
    url: 'https://github.com/cbeta-org/xml-p5/blob/master/T/T36/T36n1736.xml#L62561-L62608',
  },
]
