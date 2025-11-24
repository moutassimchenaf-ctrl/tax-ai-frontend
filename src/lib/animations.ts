// GSAP Animation utilities for Tax.ai TAi Engine
// Professional motion design matching Huly.io sophistication

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { useEffect } from 'react'
// import { Splitting } from 'splitting' // Commented out - not installed, functionality is guarded

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Physics2DPlugin)
}

// Animation configuration
export const animationConfig = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    page: 0.8,
  },
  easing: {
    easeOut: 'power2.out',
    easeInOut: 'power2.inOut',
    bounce: 'bounce.out',
    elastic: 'elastic.out(1, 0.8)',
  },
  stagger: {
    small: 0.05,
    normal: 0.1,
    large: 0.2,
  },
}

// Page transition animations
export const pageTransitions = {
  fadeIn: (element: HTMLElement | string, delay: number = 0) => {
    return gsap.fromTo(element,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration.page,
        ease: animationConfig.easing.easeOut,
        delay,
      }
    )
  },

  slideIn: (element: HTMLElement | string, direction: 'left' | 'right' | 'top' | 'bottom' = 'left') => {
    const transforms = {
      left: { x: -100 },
      right: { x: 100 },
      top: { y: -100 },
      bottom: { y: 100 },
    }

    return gsap.fromTo(element,
      { opacity: 0, ...transforms[direction] },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: animationConfig.duration.page,
        ease: animationConfig.easing.easeOut,
      }
    )
  },

  scaleIn: (element: HTMLElement | string) => {
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: animationConfig.duration.slow,
        ease: animationConfig.easing.elastic,
      }
    )
  },
}

// Text animations
export const textAnimations = {
  splitByLetter: (element: HTMLElement | string) => {
    if (typeof window !== 'undefined' && (window as any).Splitting) {
      (window as any).Splitting({ target: element, by: 'chars' })

      const chars = (element as HTMLElement).querySelectorAll('.char')
      return gsap.fromTo(chars,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: animationConfig.duration.fast,
          stagger: animationConfig.stagger.small,
          ease: animationConfig.easing.easeOut,
        }
      )
    }
  },

  typewriter: (element: HTMLElement | string, text: string, speed: number = 0.05) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return

    el.textContent = ''

    return gsap.to(el, {
      duration: text.length * speed,
      ease: 'none',
      onUpdate: function () {
        const progress = Math.floor(this.progress() * text.length)
        el.textContent = text.substring(0, progress)
      },
    })
  },

  highlight: (element: HTMLElement | string, color: string = '#06708A') => {
    return gsap.fromTo(element,
      { backgroundColor: 'transparent' },
      {
        backgroundColor: color,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: animationConfig.easing.easeInOut,
      }
    )
  },
}

// Button and interactive element animations
export const buttonAnimations = {
  hover: (element: HTMLElement | string) => {
    const el = gsap.utils.toArray(element)[0] as HTMLElement

    el?.addEventListener('mouseenter', () => {
      gsap.to(el, {
        scale: 1.05,
        duration: animationConfig.duration.fast,
        ease: animationConfig.easing.easeOut,
      })
    })

    el?.addEventListener('mouseleave', () => {
      gsap.to(el, {
        scale: 1,
        duration: animationConfig.duration.fast,
        ease: animationConfig.easing.easeOut,
      })
    })
  },

  click: (element: HTMLElement | string) => {
    const el = gsap.utils.toArray(element)[0] as HTMLElement

    el?.addEventListener('mousedown', () => {
      gsap.to(el, {
        scale: 0.95,
        duration: animationConfig.duration.fast,
        ease: animationConfig.easing.easeOut,
      })
    })

    el?.addEventListener('mouseup', () => {
      gsap.to(el, {
        scale: 1,
        duration: animationConfig.duration.fast,
        ease: animationConfig.easing.easeOut,
      })
    })
  },

  ripple: (element: HTMLElement | string, event: MouseEvent) => {
    const el = gsap.utils.toArray(element)[0] as HTMLElement
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const ripple = document.createElement('div')
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -10px;
    `

    el.style.position = 'relative'
    el.style.overflow = 'hidden'
    el.appendChild(ripple)

    gsap.to(ripple, {
      scale: 4,
      opacity: 0,
      duration: 0.6,
      ease: animationConfig.easing.easeOut,
      onComplete: () => ripple.remove(),
    })
  },
}

// Card and content animations
export const contentAnimations = {
  staggerIn: (elements: HTMLElement[] | string, staggerDelay: number = 0.1) => {
    return gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration.normal,
        stagger: staggerDelay,
        ease: animationConfig.easing.easeOut,
      }
    )
  },

  flip: (element: HTMLElement | string) => {
    return gsap.fromTo(element,
      { rotationY: 0 },
      {
        rotationY: 180,
        duration: animationConfig.duration.slow,
        ease: animationConfig.easing.easeInOut,
      }
    )
  },

  float: (element: HTMLElement | string, intensity: number = 10) => {
    return gsap.to(element, {
      y: `+=${intensity}`,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  },
}

// Scroll-triggered animations
export const scrollAnimations = {
  revealOnScroll: (element: HTMLElement | string, trigger: HTMLElement | string) => {
    return gsap.fromTo(element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration.slow,
        ease: animationConfig.easing.easeOut,
        scrollTrigger: {
          trigger,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  },

  parallax: (element: HTMLElement | string, speed: number = 0.5) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  },

  progressBar: (element: HTMLElement | string) => {
    return gsap.fromTo(element,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    )
  },
}

// Physics-based animations - commented out due to plugin type issues
export const physicsAnimations = {
  bounce: (element: HTMLElement | string, velocity: { x: number; y: number }) => {
    // Physics2D plugin has type compatibility issues - disabled for now
    return undefined as any
  },

  attract: (element: HTMLElement | string, target: { x: number; y: number }) => {
    // Physics2D plugin has type compatibility issues - disabled for now
    return undefined as any
  },
}

// Loading and state animations
export const loadingAnimations = {
  spinner: (element: HTMLElement | string) => {
    return gsap.to(element, {
      rotation: 360,
      duration: 1,
      ease: 'none',
      repeat: -1,
    })
  },

  pulse: (element: HTMLElement | string) => {
    return gsap.to(element, {
      scale: 1.1,
      opacity: 0.7,
      duration: 0.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  },

  skeleton: (element: HTMLElement | string) => {
    return gsap.to(element, {
      xPercent: 100,
      duration: 1.5,
      ease: 'none',
      repeat: -1,
    })
  },
}

// Utility functions
export const animationUtils = {
  killAll: () => {
    gsap.killTweensOf('*')
  },

  killElement: (element: HTMLElement | string) => {
    gsap.killTweensOf(element)
  },

  pauseAll: () => {
    gsap.globalTimeline.pause()
  },

  resumeAll: () => {
    gsap.globalTimeline.resume()
  },

  timeScale: (scale: number) => {
    gsap.globalTimeline.timeScale(scale)
  },
}

// Custom hooks for React integration
export const useGSAPAnimation = (animationFn: () => gsap.core.Tween | gsap.core.Timeline, deps: any[] = []) => {
  useEffect(() => {
    const animation = animationFn()

    return () => {
      if (animation) {
        animation.kill()
      }
    }
  }, deps)
}

export const useScrollTrigger = (
  element: HTMLElement | string,
  animation: gsap.core.Tween | gsap.core.Timeline,
  config: ScrollTrigger.Vars = {}
) => {
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: element,
      animation,
      ...config,
    })

    return () => {
      trigger.kill()
    }
  }, [])
}

// Timeline utilities
export const createTimeline = (config: gsap.TimelineVars = {}) => {
  return gsap.timeline(config)
}

export const addToTimeline = (
  timeline: gsap.core.Timeline,
  element: HTMLElement | string,
  vars: gsap.TweenVars,
  position?: gsap.Position
) => {
  return timeline.to(element, vars, position)
}

// Export everything
export default {
  animationConfig,
  pageTransitions,
  textAnimations,
  buttonAnimations,
  contentAnimations,
  scrollAnimations,
  physicsAnimations,
  loadingAnimations,
  animationUtils,
  useGSAPAnimation,
  useScrollTrigger,
  createTimeline,
  addToTimeline,
}