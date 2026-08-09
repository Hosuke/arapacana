const paths = [
  {
    key: 'huayan',
    name: '华严字母门',
    direction: '遍入 · 横向',
    identity: '我从般若字门入——愿随文观义，遍入诸门',
    entry: '入处：四十二字轮',
    practice: '按四十二字门次第识音读义；亦可于字轮中任点一字，查《华严经》般若门与不空本逐字释义，随文观学。',
    source: '所依：《华严经·入法界品》及后世四十二字配位之说',
    href: '#wheel',
    cta: '入字轮',
  },
  {
    key: 'tomitsu',
    name: '东密种子字门',
    direction: '总持 · 纵向',
    identity: '我从种子字观学入——愿由一字忆持一德，摄心观义',
    entry: '入处：诸尊种子字',
    practice: '于种子字表中择一字，开其字帖：辨字相、读法义、随文作观；若依密教仪轨修持，当以传承教授为准。',
    source: '所依：《大日经》阿字门、《金刚顶经瑜伽十八会指归》五相成身',
    href: '#bridge',
    cta: '入两门',
  },
  {
    key: 'single',
    name: '单字观学',
    direction: '一门深入',
    identity: '我愿从一字入——先识字相与出处，再作日常闻思',
    entry: '入处：十五分钟观学 · 选字闻思',
    practice: '在观学区选定一字，依次安身、识字、观义、回向。此为学习提示，不代替仪轨口授。',
    source: '所依：《大日经》——「阿字门，一切诸法本不生故」',
    href: '#practice',
    cta: '入观学',
  },
]

export default function PathsSection() {
  return (
    <section id="paths" className="max-w-5xl mx-auto px-6 py-24">
      <header className="text-center mb-12">
        <p className="text-xs tracking-[0.5em] text-gold mb-4" style={{ paddingLeft: '0.5em' }}>
          入门择路
        </p>
        <h2 className="text-2xl sm:text-3xl tracking-[0.25em] text-[#f0e7cb]" style={{ paddingLeft: '0.25em' }}>
          三条入路 · 各从其门
        </h2>
        <p className="mt-5 text-sm text-dim leading-loose max-w-2xl mx-auto">
          可依自己的学习因缘择一入口。各门所依不同，不宜混同，亦不以此分高下。
          <br />
          先明出处，再循一门学习；有疑处，回到原典与善知识。
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-5">
        {paths.map((p) => (
          <article
            key={p.key}
            className="flex flex-col rounded-lg border border-[#2a2440] bg-[#131022]/80 p-7 hover:border-[#c9a227]/40 transition-colors"
          >
            <div className="text-xs tracking-[0.3em] text-gold mb-2">{p.direction}</div>
            <h3 className="text-xl tracking-[0.2em] text-[#f0e7cb] mb-4">{p.name}</h3>
            <p className="text-sm leading-relaxed text-[#d6cdb2] mb-5">「{p.identity}」</p>
            <div className="gold-rule w-full opacity-50 mb-5" />
            <div className="space-y-4 flex-1">
              <div>
                <div className="text-xs tracking-[0.3em] text-gold mb-1.5">{p.entry}</div>
                <p className="text-sm leading-loose text-dim">{p.practice}</p>
              </div>
              <p className="text-xs leading-relaxed text-[#6f6788]">{p.source}</p>
            </div>
            <a
              href={p.href}
              className="mt-6 self-start rounded-full border border-[#c9a227]/50 px-6 py-2 text-xs tracking-[0.3em] text-gold hover:bg-[#c9a227]/10 transition-colors"
            >
              {p.cta} →
            </a>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center text-xs tracking-[0.2em] leading-loose text-[#6f6788]">
        三路可相互参照；所依经轨与修法次第，各须分明。
      </p>
    </section>
  )
}
