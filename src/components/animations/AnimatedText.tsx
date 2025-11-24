'use client'

import { ReactNode } from 'react'
import { useTextAnimation } from '@/hooks/useAnimations'

interface AnimatedTextProps {
  children: ReactNode
  animationType?: 'splitByLetter' | 'typewriter' | 'highlight'
  text?: string
  delay?: number
  color?: string
  speed?: number
  className?: string
}

export function AnimatedText({
  children,
  animationType = 'splitByLetter',
  text,
  delay = 0,
  color = '#06708A',
  speed = 0.05,
  className = '',
}: AnimatedTextProps) {
  const { elementRef, isAnimating } = useTextAnimation(
    animationType,
    text || (typeof children === 'string' ? children : undefined),
    { delay, color, speed }
  )

  return (
    <span ref={elementRef} className={className}>
      {children}
    </span>
  )
}