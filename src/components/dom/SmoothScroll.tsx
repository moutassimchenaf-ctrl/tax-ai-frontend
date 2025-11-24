'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<any>(null)

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000)
        }

        gsap.ticker.add(update as any)

        return () => {
            gsap.ticker.remove(update as any)
        }
    }, [])

    return (
        <ReactLenis root ref={lenisRef} autoRaf={false}>
            {children as any}
        </ReactLenis>
    )
}
