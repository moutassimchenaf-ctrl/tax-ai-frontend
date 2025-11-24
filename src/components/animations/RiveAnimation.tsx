/**
 * Example Rive Animation Component
 * 
 * Demonstrates how to use Rive for stateful vector animations.
 * Rive is ideal for interactive UI elements with state machines.
 * 
 * @example
 * ```tsx
 * <RiveAnimation src="/animations/button.riv" />
 * ```
 */

'use client'

import { useRive, UseRiveParameters } from '@rive-app/react-canvas'

interface RiveAnimationProps {
  /** Path to .riv file */
  src: string
  /** Animation state machine name */
  stateMachine?: string
  /** Auto-play animation */
  autoplay?: boolean
  /** Class name for container */
  className?: string
}

export function RiveAnimation({
  src,
  stateMachine = 'State Machine 1',
  autoplay = true,
  className = 'w-full h-full',
}: RiveAnimationProps) {
  const { RiveComponent } = useRive({
    src,
    stateMachines: stateMachine,
    autoplay,
  })

  return (
    <div className={className}>
      <RiveComponent />
    </div>
  )
}

/**
 * Example usage:
 * 
 * 1. Export animation from Rive Editor as .riv file
 * 2. Place in public/animations/
 * 3. Use component:
 * 
 * <RiveAnimation 
 *   src="/animations/loading.riv" 
 *   stateMachine="Loading State"
 *   className="w-32 h-32"
 * />
 */
