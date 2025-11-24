'use client'

import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ReactLenis } from '@studio-freight/react-lenis'
import { QuantumScene } from '@/components/3d/QuantumScene'
import { CeramicCube } from '@/components/3d/CeramicCube'
import { GlassConduits } from '@/components/3d/GlassConduits'
import { GhostHeader } from '@/components/layout/GhostHeader'

gsap.registerPlugin(ScrollTrigger)

export default function QuantumCorePage() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  
  // DOM Overlay Refs
  const overlay1Ref = useRef<HTMLDivElement>(null)
  const overlay2Ref = useRef<HTMLDivElement>(null)
  const overlay3Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => setScrollProgress(self.progress),
      },
    })

    // 0% -> 10% | Ignition
    // Camera Zoom handled by R3F component or simple scale here if possible, 
    // but we'll drive the scene props via state/context usually. 
    // For this strict implementation, we pass scrollProgress to components.
    
    // DOM Overlays Choreography
    
    // 10% -> 40% | Injection: "Data Ingestion"
    tl.fromTo(overlay1Ref.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 
      0.1
    )
    tl.to(overlay1Ref.current, 
      { opacity: 0, y: -50, duration: 0.1, ease: 'power2.in' }, 
      0.35
    )

    // 40% -> 70% | Filtration: "Compliance Check: Passed"
    tl.fromTo(overlay2Ref.current, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.1, ease: 'back.out(1.7)' }, 
      0.45
    )
    tl.to(overlay2Ref.current, 
      { opacity: 0, scale: 1.1, duration: 0.1, ease: 'power2.in' }, 
      0.65
    )

    // 70% -> 100% | Distribution: Final Status
    tl.fromTo(overlay3Ref.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.1, ease: 'power2.out' }, 
      0.75
    )

  }, { scope: containerRef })

  return (
    <ReactLenis root>
      <GhostHeader />
      <div ref={containerRef} className="relative h-[500vh] w-full">
        
        {/* 3D SCENE LAYER (Fixed Background) */}
        <div ref={sceneRef} className="fixed inset-0 z-0">
          <QuantumScene>
            <group position={[0, 0, 0]}>
              <CeramicCube />
              <GlassConduits scrollProgress={scrollProgress} />
            </group>
          </QuantumScene>
        </div>

        {/* DOM OVERLAY LAYER (Scroll-driven) */}
        <div className="fixed inset-0 z-10 pointer-events-none flex flex-col items-center justify-center">
          
          {/* Overlay 1: Data Ingestion */}
          <div ref={overlay1Ref} className="absolute opacity-0">
            <h1 className="font-inter text-6xl font-thin tracking-tighter text-navy-900">
              Data Ingestion
            </h1>
            <div className="mt-4 h-px w-32 bg-teal-500/50 mx-auto" />
            <p className="mt-2 text-center font-inter text-sm font-light text-navy-900/60 tracking-widest uppercase">
              Stream Active
            </p>
          </div>

          {/* Overlay 2: Compliance Check */}
          <div ref={overlay2Ref} className="absolute opacity-0">
            <div className="flex items-center gap-4">
              <div className="h-4 w-4 rounded-full bg-teal-500 animate-pulse" />
              <h1 className="font-inter text-6xl font-thin tracking-tighter text-navy-900">
                Compliance Check
              </h1>
            </div>
            <p className="mt-4 text-center font-inter text-2xl font-light text-teal-500 tracking-wide">
              PASSED
            </p>
          </div>

          {/* Overlay 3: Distribution */}
          <div ref={overlay3Ref} className="absolute opacity-0 text-center">
            <h1 className="font-inter text-6xl font-thin tracking-tighter text-navy-900 mb-8">
              Distribution
            </h1>
            <div className="grid grid-cols-3 gap-12">
              <div className="flex flex-col items-center gap-2">
                <div className="h-px w-full bg-navy-900/20" />
                <span className="font-inter text-sm font-medium text-navy-900">VAT</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-px w-full bg-navy-900/20" />
                <span className="font-inter text-sm font-medium text-navy-900">CORPORATE</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-px w-full bg-navy-900/20" />
                <span className="font-inter text-sm font-medium text-navy-900">EXCISE</span>
              </div>
            </div>
          </div>

        </div>

        {/* SCROLL SPACER (Invisible) */}
        <div className="absolute inset-0 z-20 pointer-events-none" />
      </div>
    </ReactLenis>
  )
}