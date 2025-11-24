'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/Logo'
import {
  ArrowRightIcon,
  PlayIcon,
  ShieldCheckIcon,
  SparklesIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    // Animate left content
    tl.fromTo(leftContentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }
    )

    // Animate right content with delay
    tl.fromTo(rightContentRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.3'
    )

    // Animate stats section
    tl.fromTo(statsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.2'
    )

    // Floating elements animation
    const floatingElements = containerRef.current.querySelectorAll('.floating-element')
    floatingElements.forEach((element, index) => {
      gsap.to(element, {
        y: '+=10',
        duration: 2 + index * 0.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: index * 0.1,
      })
    })

    // Animate feature cards
    const featureCards = containerRef.current.querySelectorAll('.feature-card')
    gsap.fromTo(featureCards,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: featureCards[0],
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // Text animation with splitting
    const heroTitle = containerRef.current.querySelector('.hero-title')
    if (heroTitle) {
      const chars = heroTitle.textContent?.split('') || []
      heroTitle.innerHTML = chars.map(char =>
        char === ' ' ? ' ' : `<span class="char">${char}</span>`
      ).join('')

      tl.fromTo(heroTitle.querySelectorAll('.char'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: 'power2.out',
        },
        '-=0.5'
      )
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-blue-teal/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div ref={leftContentRef} className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center space-x-2 bg-primary-teal/10 px-4 py-2 rounded-full">
                <SparklesIcon className="h-5 w-5 text-primary-teal" />
                <span className="text-sm font-light text-primary-teal">
                  AI-Powered Tax Automation
                </span>
              </div>
            </div>

            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Revolutionize Your
              <span className="block text-primary-teal font-light">
                Tax Workflow
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 font-light max-w-2xl">
              Advanced AI system for GCC tax compliance and automation.
              Streamline your processes with intelligent automation,
              real-time compliance monitoring, and expert AI assistance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="group">
                Start Free Trial
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button variant="outline" size="lg" className="group">
                <PlayIcon className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="feature-card flex items-center space-x-3 bg-white/50 backdrop-blur-sm p-4 rounded-lg">
                <ShieldCheckIcon className="h-6 w-6 text-primary-teal" />
                <span className="text-sm text-gray-600">100% Compliance</span>
              </div>
              <div className="feature-card flex items-center space-x-3 bg-white/50 backdrop-blur-sm p-4 rounded-lg">
                <LightBulbIcon className="h-6 w-6 text-primary-teal" />
                <span className="text-sm text-gray-600">AI-Powered Insights</span>
              </div>
              <div className="feature-card flex items-center space-x-3 bg-white/50 backdrop-blur-sm p-4 rounded-lg">
                <SparklesIcon className="h-6 w-6 text-primary-teal" />
                <span className="text-sm text-gray-600">Smart Automation</span>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Hero */}
          <div ref={rightContentRef} className="relative">
            <div className="relative aspect-square bg-gradient-to-br from-primary-teal/5 to-primary-blue-teal/5 rounded-3xl overflow-hidden">
              {/* 3D Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="floating-element w-32 h-32 bg-primary-teal/20 rounded-2xl transform rotate-12"></div>
                  <div className="floating-element absolute inset-4 w-24 h-24 bg-primary-blue-teal/30 rounded-xl transform -rotate-6"></div>
                  <div className="floating-element absolute inset-8 w-16 h-16 bg-primary-cyan/40 rounded-lg transform rotate-3"></div>

                  {/* Floating Elements */}
                  <div className="floating-element absolute -top-4 -left-4 w-8 h-8 bg-primary-teal/60 rounded-full"></div>
                  <div className="floating-element absolute -bottom-4 -right-4 w-6 h-6 bg-primary-blue-teal/60 rounded-full"></div>
                  <div className="floating-element absolute top-1/2 -right-6 w-4 h-4 bg-primary-cyan/60 rounded-full"></div>
                </div>
              </div>

              {/* Data Stream Effect */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-teal rounded-full animate-ping"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-primary-blue-teal rounded-full animate-ping delay-150"></div>
                <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-primary-cyan rounded-full animate-ping delay-300"></div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/10 to-transparent rounded-3xl"></div>
            </div>

            {/* Feature Cards */}
            <div className="feature-card absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium">Real-time Compliance</span>
              </div>
            </div>

            <div className="feature-card absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-sm font-medium">AI Assistant Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl">
            <div className="text-3xl font-light text-primary-teal mb-2">99.9%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl">
            <div className="text-3xl font-light text-primary-teal mb-2">10x</div>
            <div className="text-sm text-gray-600">Faster Processing</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl">
            <div className="text-3xl font-light text-primary-teal mb-2">24/7</div>
            <div className="text-sm text-gray-600">AI Support</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl">
            <div className="text-3xl font-light text-primary-teal mb-2">100%</div>
            <div className="text-sm text-gray-600">Compliance</div>
          </div>
        </div>
      </div>
    </section>
  )
}