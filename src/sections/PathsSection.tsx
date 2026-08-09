const paths = [
  {
    key: 'huayan',
    name: '华严字母门',
    direction: '遍入 · 横向',
    identity: '我从般若空观入——不立一佛一名，愿遍入诸门',
    entry: '入处：四十二字轮',
    practice: '唱诵四十二字门，门门入空；或于字轮中任点一字，开其字帖，见其般若门与遮诠义，即从此字入观。',
    source: '所依：《华严经·入法界品》、天台四十二字配位',
    href: '#wheel',
    cta: '入字轮',
  },
  {
    key: 'tomitsu',
    name: '东密种子字门',
    direction: '总持 · 纵向',
    identity: '我从观想相应入——愿与一德一尊相应，一字总持',
    entry: '入处：诸尊种子字',
    practice: '于种子字表中择一字，开其字帖：表法（月轮真形）、表意（本尊功德之函数）、观法（现字·放光·摄归·字亡）俱全。',
    source: '所依：《大日经》阿字本不生、《金刚顶经》五相成身观',
    href: '#bridge',
    cta: '入两门',
  },
  {
    key: 'single',
    name: '单字专修',
    direction: '一门深入',
    identity: '我只想修某一个字——不问系统，一门深入',
    entry: '入处：日课修持器 · 持字选字',
    practice: '在日课中直接选定任何一字（四十二字门或诸尊种子字），月轮即现此字悉昙真形，一座十五分钟：入座、持字、观义、回向。',
    source: '所依：阿字观之传统——「阿字本不生，实义之根源」',
    href: '#practice',
    cta: '入日课',
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
          同一梵音，三条入路。不问先后，不设高下——
          <br />
          先认明自己是谁、要从哪门入，然后一门深入。
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
        三路归一：字门的空处、种子的满处、单字的住处，是同一个地方。
      </p>
    </section>
  )
}
