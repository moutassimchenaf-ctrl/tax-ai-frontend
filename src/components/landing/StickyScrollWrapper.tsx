'use client'

import { ReactNode, useEffect } from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface StickyScrollWrapperProps {
  children: ReactNode
}

export function StickyScrollWrapper({ children }: StickyScrollWrapperProps) {
  useEffect(() => {
    // Refresh ScrollTrigger on resize
    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="relative w-full min-h-screen bg-[#0A1628] text-white selection:bg-[#0898BB] selection:text-white">
        {children}
      </div>
    </ReactLenis>
  )
}
