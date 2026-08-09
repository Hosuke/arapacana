import { useEffect, useState } from 'react'
import { stages } from '@/data/curriculum'

type State = Record<string, boolean>
const KEY = 'zimen-kanyan'

export default function Checklist() {
  const [checks, setChecks] = useState<State>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}')
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(checks))
  }, [checks])

  const toggle = (id: string) => setChecks((c) => ({ ...c, [id]: !c[id] }))

  return (
    <section id="checklist" className="max-w-4xl mx-auto px-6 py-24">
      <header className="text-center mb-12">
        <p className="text-xs tracking-[0.5em] text-gold mb-4" style={{ paddingLeft: '0.5em' }}>
          自勘清单
        </p>
        <h2 className="text-2xl sm:text-3xl tracking-[0.25em] text-[#f0e7cb]" style={{ paddingLeft: '0.25em' }}>
          勘验 · 权在行者
        </h2>
        <p className="mt-5 text-sm text-dim leading-loose max-w-2xl mx-auto">
          勾满不判「通过」，程序只给一句建议：再行一周，或可进一阶。
          <br />
          判定在法，不在程序，更不在人。记录仅存于此浏览器。
        </p>
      </header>

      <div className="space-y-5">
        {stages.map((s) => {
          const total = s.kanyan.length
          const done = s.kanyan.filter((_, i) => checks[`${s.id}-${i}`]).length
          const pct = total ? done / total : 0
          return (
            <div key={s.id} className="rounded-lg border border-[#2a2440] bg-[#131022]/80 p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <h3 className="text-base sm:text-lg tracking-[0.15em] text-[#f0e7cb]">
                  <span className="text-gold mr-3">{s.numeral}</span>
                  {s.name}
                </h3>
                <span className="font-latin text-sm text-dim shrink-0">
                  {done} / {total}
                </span>
              </div>

              <div className="h-px w-full bg-[#2a2440] relative mb-5">
                <div
                  className="absolute left-0 top-0 h-px bg-[#c9a227] transition-all duration-500"
                  style={{ width: `${pct * 100}%` }}
                />
              </div>

              <ul className="space-y-3">
                {s.kanyan.map((k, i) => {
                  const id = `${s.id}-${i}`
                  const on = !!checks[id]
                  return (
                    <li key={id}>
                      <button
                        onClick={() => toggle(id)}
                        className="w-full flex items-start gap-3 text-left group"
                      >
                        <span
                          className={`mt-0.5 w-4 h-4 shrink-0 rounded-sm border transition-colors flex items-center justify-center ${
                            on
                              ? 'border-[#c9a227] bg-[#c9a227]/20 text-gold'
                              : 'border-[#3a3352] group-hover:border-[#c9a227]/50'
                          }`}
                        >
                          {on && <span className="text-[10px] leading-none">✓</span>}
                        </span>
                        <span
                          className={`text-sm leading-relaxed transition-colors ${
                            on ? 'text-[#e8dfc4]' : 'text-dim group-hover:text-[#e8dfc4]'
                          }`}
                        >
                          {k}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              {pct === 1 && (
                <p className="mt-5 text-xs tracking-[0.25em] text-gold/80">
                  诸项已勘 · 建议：再行一周，或可进一阶
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
