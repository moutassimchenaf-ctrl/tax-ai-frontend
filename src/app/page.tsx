import dynamic from 'next/dynamic'
import { LandingNavbar } from '@/components/landing/LandingNavbar'
import { LandingHero } from '@/components/landing/LandingHero'
import { StickyScrollWrapper } from '@/components/landing/StickyScrollWrapper'
import { ProblemStatement } from '@/components/landing/ProblemStatement'
import { FeatureShowcase } from '@/components/landing/FeatureShowcase'
import { BentoGrid } from '@/components/landing/BentoGrid'
import { FinalCTA } from '@/components/landing/FinalCTA'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

export default function LandingPage() {
  return (
    <main className="bg-[#0A1628] min-h-screen">
      <LandingNavbar />
      <StickyScrollWrapper>
        <Scene />
        <LandingHero />
        <ProblemStatement />
        <FeatureShowcase />
        <BentoGrid />
        <FinalCTA />
      </StickyScrollWrapper>
    </main>
  )
}