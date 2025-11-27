'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function ProblemStatement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: true,
      })

      // Animate text
      gsap.fromTo(textRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            end: 'top top',
            scrub: true
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center bg-transparent z-10">
      <div className="max-w-4xl px-6 text-center">
        <h2 ref={textRef} className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Smarter than Big 4, ERPs, <br />
          <span className="text-[#0898BB]">and Manual Audits combined.</span>
        </h2>
      </div>
    </section>
  )
}
