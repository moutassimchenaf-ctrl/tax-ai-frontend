'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/useAnimations'

interface ScrollRevealProps {
  children: ReactNode
  animationType?: 'revealOnScroll' | 'parallax'
  trigger?: string
  speed?: number
  className?: string
}

export function ScrollReveal({
  children,
  animationType = 'revealOnScroll',
  trigger,
  speed = 0.5,
  className = '',
}: ScrollRevealProps) {
  const { elementRef, triggerRef } = useScrollAnimation(animationType, {
    trigger,
    speed,
  })

  return (
    <div ref={elementRef} className={className}>
      {children}
      {trigger && <div ref={triggerRef} className="absolute" />}
    </div>
  )
}