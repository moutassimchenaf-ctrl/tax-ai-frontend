// Custom React hooks for GSAP animations
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as animations from '@/lib/animations'

// Hook for page load animations
export const usePageLoad = (animationType: 'fadeIn' | 'slideIn' | 'scaleIn' = 'fadeIn') => {
  const [isLoaded, setIsLoaded] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current || isLoaded) return

    const animation = animations.pageTransitions[animationType](elementRef.current)

    animation.eventCallback('onComplete', () => {
      setIsLoaded(true)
    })

    return () => {
      animation.kill()
    }
  }, [animationType, isLoaded])

  return { elementRef, isLoaded }
}

// Hook for scroll-triggered animations
export const useScrollAnimation = (
  animationType: 'revealOnScroll' | 'parallax' = 'revealOnScroll',
  options: { trigger?: string; speed?: number } = {}
) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    let animation: gsap.core.Tween | gsap.core.Timeline

    if (animationType === 'revealOnScroll') {
      animation = animations.scrollAnimations.revealOnScroll(
        elementRef.current,
        options.trigger || elementRef.current
      )
    } else if (animationType === 'parallax') {
      animation = animations.scrollAnimations.parallax(
        elementRef.current,
        options.speed || 0.5
      )
    }

    return () => {
      if (animation) {
        animation.kill()
      }
    }
  }, [animationType, options])

  return { elementRef, triggerRef }
}

// Hook for text animations
export const useTextAnimation = (
  animationType: 'splitByLetter' | 'typewriter' | 'highlight',
  text?: string,
  options: { delay?: number; color?: string; speed?: number } = {}
) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!elementRef.current || isAnimating) return

    setIsAnimating(true)
    let animation: gsap.core.Tween | gsap.core.Timeline | undefined

    const animate = () => {
      if (animationType === 'splitByLetter') {
        const result = animations.textAnimations.splitByLetter(elementRef.current!)
        if (result) {
          animation = result
        }
      } else if (animationType === 'typewriter' && text) {
        animation = animations.textAnimations.typewriter(
          elementRef.current!,
          text
        )
      } else if (animationType === 'highlight') {
        elementRef.current!.addEventListener('click', () => {
          animations.textAnimations.highlight(elementRef.current!)
        })
      }

      if (animation && options.delay) {
        animation.delay(options.delay)
      }
    }

    // Delay animation to ensure element is rendered
    const timeoutId = setTimeout(animate, 100)

    return () => {
      clearTimeout(timeoutId)
      if (animation) {
        animation.kill()
      }
    }
  }, [animationType, text, options, isAnimating])

  return { elementRef, isAnimating }
}

// Hook for button interactions
export const useButtonAnimation = (animationType: 'hover' | 'click' | 'ripple' = 'hover') => {
  const elementRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    if (animationType === 'hover') {
      animations.buttonAnimations.hover(elementRef.current)
    } else if (animationType === 'click') {
      animations.buttonAnimations.click(elementRef.current)
    } else if (animationType === 'ripple') {
      const handleClick = (event: MouseEvent) => {
        animations.buttonAnimations.ripple(elementRef.current!, event)
      }

      elementRef.current.addEventListener('click', handleClick)

      return () => {
        elementRef.current?.removeEventListener('click', handleClick)
      }
    }
  }, [animationType])

  return { elementRef }
}

// Hook for stagger animations
export const useStaggerAnimation = (
  elements: HTMLElement[] | string,
  options: { delay?: number; stagger?: number } = {}
) => {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    if (isAnimated) return

    const animate = () => {
      const animation = animations.contentAnimations.staggerIn(
        elements,
        options.stagger
      )

      if (options.delay) {
        animation.delay(options.delay)
      }

      animation.eventCallback('onComplete', () => {
        setIsAnimated(true)
      })

      return animation
    }

    const timeoutId = setTimeout(animate, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [elements, options, isAnimated])

  return { isAnimated }
}

// Hook for loading animations
export const useLoadingAnimation = (animationType: 'spinner' | 'pulse' | 'skeleton' = 'spinner') => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!elementRef.current || !isLoading) return

    let animation: gsap.core.Tween

    if (animationType === 'spinner') {
      animation = animations.loadingAnimations.spinner(elementRef.current)
    } else if (animationType === 'pulse') {
      animation = animations.loadingAnimations.pulse(elementRef.current)
    } else if (animationType === 'skeleton') {
      animation = animations.loadingAnimations.skeleton(elementRef.current)
    }

    return () => {
      if (animation) {
        animation.kill()
      }
    }
  }, [animationType, isLoading])

  const stopLoading = () => {
    setIsLoading(false)
  }

  return { elementRef, isLoading, stopLoading }
}

// Hook for timeline animations
export const useTimeline = (animationSteps: Array<{
  element: HTMLElement | string
  vars: gsap.TweenVars
  position?: gsap.Position
}>) => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    timelineRef.current = animations.createTimeline()

    animationSteps.forEach(({ element, vars, position }) => {
      animations.addToTimeline(timelineRef.current!, element, vars, position)
    })

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  const play = () => {
    if (timelineRef.current) {
      timelineRef.current.play()
      setIsPlaying(true)
    }
  }

  const pause = () => {
    if (timelineRef.current) {
      timelineRef.current.pause()
      setIsPlaying(false)
    }
  }

  const reverse = () => {
    if (timelineRef.current) {
      timelineRef.current.reverse()
    }
  }

  return { timeline: timelineRef.current, play, pause, reverse, isPlaying }
}

// Hook for physics animations
export const usePhysicsAnimation = (
  animationType: 'bounce' | 'attract',
  options: { velocity?: { x: number; y: number }; target?: { x: number; y: number } } = {}
) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const triggerAnimation = () => {
    if (!elementRef.current || isAnimating) return

    setIsAnimating(true)
    let animation: gsap.core.Tween | undefined

    if (animationType === 'bounce' && options.velocity) {
      animation = animations.physicsAnimations.bounce(
        elementRef.current,
        options.velocity
      )
    } else if (animationType === 'attract' && options.target) {
      animation = animations.physicsAnimations.attract(
        elementRef.current,
        options.target
      )
    }

    if (animation) {
      animation.eventCallback('onComplete', () => {
        setIsAnimating(false)
      })
    }
  }

  return { elementRef, triggerAnimation, isAnimating }
}

// Hook for managing multiple animations
export const useAnimationController = () => {
  const animationsRef = useRef<Set<gsap.core.Tween | gsap.core.Timeline>>(new Set())

  const addAnimation = (animation: gsap.core.Tween | gsap.core.Timeline) => {
    animationsRef.current.add(animation)
  }

  const removeAnimation = (animation: gsap.core.Tween | gsap.core.Timeline) => {
    animationsRef.current.delete(animation)
  }

  const killAll = () => {
    animationsRef.current.forEach(animation => {
      animation.kill()
    })
    animationsRef.current.clear()
  }

  const pauseAll = () => {
    animationsRef.current.forEach(animation => {
      animation.pause()
    })
  }

  const resumeAll = () => {
    animationsRef.current.forEach(animation => {
      animation.resume()
    })
  }

  useEffect(() => {
    return () => {
      killAll()
    }
  }, [])

  return {
    addAnimation,
    removeAnimation,
    killAll,
    pauseAll,
    resumeAll,
    animationCount: animationsRef.current.size,
  }
}

// Utility hooks
export const useAnimationFrame = (callback: (deltaTime: number) => void) => {
  const requestRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number | null>(null)

  const animate = (time: number) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])
}

export const useIntersectionObserver = (
  elementRef: React.RefObject<HTMLElement>,
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) => {
  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        callback(entry)
      }
    }, options)

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, callback, options])
}

// Performance monitoring hook
export const useAnimationPerformance = () => {
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useAnimationFrame(() => {
    frameCount.current++
    const currentTime = performance.now()

    if (currentTime - lastTime.current >= 1000) {
      setFps(Math.round(frameCount.current * 1000 / (currentTime - lastTime.current)))
      frameCount.current = 0
      lastTime.current = currentTime
    }
  })

  return { fps }
}