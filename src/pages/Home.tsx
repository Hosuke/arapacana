import { useState } from 'react'
import Nav from '@/sections/Nav'
import Overture from '@/components/Overture'
import Hero from '@/sections/Hero'
import Charter from '@/sections/Charter'
import PathsSection from '@/sections/PathsSection'
import WheelSection from '@/sections/WheelSection'
import BridgeSection from '@/sections/BridgeSection'
import Stages from '@/sections/Stages'
import Practice from '@/sections/Practice'
import Checklist from '@/sections/Checklist'
import Source from '@/sections/Source'
import Footer from '@/sections/Footer'

export default function Home() {
  const [practiceSel, setPracticeSel] = useState('mode:a')

  const goPractice = (encoded: string) => {
    setPracticeSel(encoded)
    requestAnimationFrame(() => {
      document.getElementById('practice')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Overture />
        <Hero />
        <div className="gold-rule max-w-3xl mx-auto opacity-40" />
        <Charter />
        <div className="gold-rule max-w-3xl mx-auto opacity-40" />
        <PathsSection />
        <div className="gold-rule max-w-3xl mx-auto opacity-40" />
        <WheelSection onPractice={goPractice} />
        <div className="gold-rule max-w-3xl mx-auto opacity-40" />
        <BridgeSection onPractice={goPractice} />
        <div className="gold-rule max-w-3xl mx-auto opacity-40" />
        <Stages />
        <div className="gold-rule max-w-3xl mx-auto opacity-40" />
        <Practice sel={practiceSel} onSelChange={setPracticeSel} />
        <div className="gold-rule max-w-3xl mx-auto opacity-40" />
        <Checklist />
        <div className="gold-rule max-w-3xl mx-auto opacity-40" />
        <Source />
      </main>
      <Footer />
    </div>
  )
}
