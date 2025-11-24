/**
 * useGsapScroll Hook
 * 
 * Provides frame-by-frame scroll control for 3D scenes and animations.
 * Integrates GSAP ScrollTrigger with React Three Fiber for Huly.io-style scrollytelling.
 * 
 * @example
 * ```tsx
 * const { scrollProgress, scrollY } = useGsapScroll({
 *   start: 'top top',
 *   end: 'bottom bottom',
 *   scrub: 1,
 *   onUpdate: (progress) => {
 *     // Update 3D scene based on scroll progress
 *   }
 * })
 * ```
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface UseGsapScrollOptions {
  /** ScrollTrigger start position (default: 'top top') */
  start?: string | number
  /** ScrollTrigger end position (default: 'bottom bottom') */
  end?: string | number
  /** Scrub value for smooth scrolling (default: 1) */
  scrub?: boolean | number
  /** Pin the element during scroll */
  pin?: boolean
  /** Markers for debugging (only in development) */
  markers?: boolean
  /** Callback when scroll updates */
  onUpdate?: (progress: number) => void
  /** Callback when scroll enters */
  onEnter?: () => void
  /** Callback when scroll leaves */
  onLeave?: () => void
}

export interface UseGsapScrollReturn {
  /** Current scroll progress (0-1) */
  scrollProgress: number
  /** Current scroll Y position */
  scrollY: number
  /** Scroll trigger instance */
  scrollTrigger: ScrollTrigger | null
  /** Ref to attach to trigger element */
  triggerRef: React.RefObject<HTMLElement>
}

/**
 * Hook for GSAP ScrollTrigger integration
 */
export function useGsapScroll(
  options: UseGsapScrollOptions = {}
): UseGsapScrollReturn {
  const {
    start = 'top top',
    end = 'bottom bottom',
    scrub = 1,
    pin = false,
    markers = false,
    onUpdate,
    onEnter,
    onLeave,
  } = options

  const triggerRef = useRef<HTMLElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [scrollTrigger, setScrollTrigger] = useState<ScrollTrigger | null>(null)

  useEffect(() => {
    if (!triggerRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start,
      end,
      scrub,
      pin,
      markers: markers && process.env.NODE_ENV === 'development',
      onUpdate: (self) => {
        setScrollProgress(self.progress)
        setScrollY(self.scroll())
        onUpdate?.(self.progress)
      },
      onEnter: () => {
        onEnter?.()
      },
      onLeave: () => {
        onLeave?.()
      },
    })

    setScrollTrigger(trigger)

    return () => {
      trigger.kill()
    }
  }, [start, end, scrub, pin, markers, onUpdate, onEnter, onLeave])

  return {
    scrollProgress,
    scrollY,
    scrollTrigger,
    triggerRef: triggerRef as React.RefObject<HTMLElement>,
  }
}

/**
 * Hook for creating GSAP timeline controlled by scroll
 */
export function useScrollTimeline(
  options: UseGsapScrollOptions = {}
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const { scrollTrigger, triggerRef } = useGsapScroll(options)

  useEffect(() => {
    if (!triggerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: options.start || 'top top',
        end: options.end || 'bottom bottom',
        scrub: options.scrub ?? 1,
        pin: options.pin,
        markers: options.markers && process.env.NODE_ENV === 'development',
      },
    })

    timelineRef.current = tl

    return () => {
      tl.kill()
    }
  }, [options, triggerRef])

  return {
    timeline: timelineRef.current,
    triggerRef,
    scrollTrigger,
  }
}
