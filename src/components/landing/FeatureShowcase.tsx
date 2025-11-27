'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

export function FeatureShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return
        
        ScrollTrigger.create({
          trigger: panel,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(panel.querySelectorAll('.animate-text'), { 
              opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 
            })
            gsap.to(panel.querySelectorAll('.animate-card'), { 
              opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 
            })
          },
          onLeaveBack: () => {
            // Optional: Reset on scroll back for replayability
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !panelsRef.current.includes(el)) {
      panelsRef.current.push(el)
    }
  }

  return (
    <section ref={containerRef} className="relative w-full bg-[#0A1628] z-20">
      {/* Feature 1: Autonomous Audits */}
      <div ref={addToRefs} className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="animate-card opacity-0 translate-y-20 bg-[#0F1C2E] border border-white/5 rounded-2xl p-6 aspect-[4/3] shadow-2xl relative overflow-hidden group">
               {/* Mock UI: Audit Dashboard */}
               <div className="absolute top-4 left-4 right-4 h-8 bg-white/5 rounded-md" />
               <div className="absolute top-16 left-4 right-4 bottom-4 grid grid-cols-3 gap-4">
                  <div className="col-span-2 bg-white/5 rounded-md" />
                  <div className="col-span-1 bg-white/5 rounded-md" />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent opacity-50" />
            </div>
          </div>
          <div className="order-1 md:order-2 text-left md:pl-12">
            <h3 className="animate-text opacity-0 translate-y-10 text-sm font-bold text-[#0898BB] uppercase tracking-widest mb-4">
              Autonomous Audits
            </h3>
            <h2 className="animate-text opacity-0 translate-y-10 text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Scan, analyze, <br /> and optimize.
            </h2>
            <p className="animate-text opacity-0 translate-y-10 text-lg text-[#94A3B8] leading-relaxed max-w-md">
              Replace manual sampling with 100% transaction coverage. TAi Engine identifies risks and opportunities in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Feature 2: Agent Swarm */}
      <div ref={addToRefs} className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left md:pr-12">
            <h3 className="animate-text opacity-0 translate-y-10 text-sm font-bold text-[#FBbf24] uppercase tracking-widest mb-4">
              Agent Swarm
            </h3>
            <h2 className="animate-text opacity-0 translate-y-10 text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Orchestration <br /> in real-time.
            </h2>
            <p className="animate-text opacity-0 translate-y-10 text-lg text-[#94A3B8] leading-relaxed max-w-md">
              Deploy specialized AI agents for Tax, Legal, and Compliance. They collaborate to solve complex regulatory challenges.
            </p>
          </div>
          <div>
            <div className="animate-card opacity-0 translate-y-20 bg-[#0F1C2E] border border-white/5 rounded-2xl p-6 aspect-[4/3] shadow-2xl relative overflow-hidden">
               {/* Mock UI: Chat Interface */}
               <div className="space-y-4">
                  <div className="flex gap-3">
                     <div className="w-8 h-8 rounded-full bg-[#0898BB]" />
                     <div className="h-12 flex-1 bg-white/5 rounded-r-xl rounded-bl-xl" />
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                     <div className="w-8 h-8 rounded-full bg-[#FBbf24]" />
                     <div className="h-12 flex-1 bg-white/5 rounded-l-xl rounded-br-xl" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 3: Regulatory Memory */}
      <div ref={addToRefs} className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-4xl w-full text-center">
            <h3 className="animate-text opacity-0 translate-y-10 text-sm font-bold text-white/60 uppercase tracking-widest mb-4">
              Regulatory Memory
            </h3>
            <h2 className="animate-text opacity-0 translate-y-10 text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Recall every law. <br /> Instantly.
            </h2>
            <div className="animate-card opacity-0 translate-y-20 bg-[#0F1C2E] border border-white/5 rounded-2xl p-8 aspect-[16/9] shadow-2xl mx-auto relative overflow-hidden">
               {/* Mock UI: Document Viewer */}
               <div className="w-1/3 h-full border-r border-white/5 absolute left-0 top-0 bg-black/20" />
               <div className="absolute top-8 left-[36%] right-8 space-y-3">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-full" />
                  <div className="h-4 bg-white/10 rounded w-5/6" />
                  <div className="h-4 bg-[#0898BB]/20 rounded w-full border border-[#0898BB]/30" />
               </div>
            </div>
        </div>
      </div>
    </section>
  )
}
