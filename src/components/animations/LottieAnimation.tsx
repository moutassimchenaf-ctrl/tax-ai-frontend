/**
 * Example Lottie Animation Component
 * 
 * Demonstrates how to use Lottie for simple vector animations.
 * Lottie is ideal for simple, non-interactive animations exported from After Effects.
 * 
 * @example
 * ```tsx
 * <LottieAnimation src="/animations/success.json" />
 * ```
 */

'use client'

import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'

interface LottieAnimationProps {
  /** Path to .json Lottie file */
  src: string
  /** Loop animation */
  loop?: boolean
  /** Auto-play animation */
  autoplay?: boolean
  /** Class name for container */
  className?: string
}

export function LottieAnimation({
  src,
  loop = true,
  autoplay = true,
  className = 'w-full h-full',
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load Lottie animation:', err))
  }, [src])

  if (!animationData) {
    return <div className={className} />
  }

  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  )
}

/**
 * Example usage:
 * 
 * 1. Export animation from After Effects using Bodymovin plugin
 * 2. Place .json file in public/animations/
 * 3. Use component:
 * 
 * <LottieAnimation 
 *   src="/animations/checkmark.json" 
 *   loop={false}
 *   className="w-24 h-24"
 * />
 */
