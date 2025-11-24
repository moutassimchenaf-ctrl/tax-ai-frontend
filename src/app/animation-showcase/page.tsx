'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { AnimatedText } from '@/components/animations/AnimatedText'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import {
  useButtonAnimation,
  useLoadingAnimation,
  usePhysicsAnimation,
  useTimeline
} from '@/hooks/useAnimations'
import {
  PlayIcon,
  PauseIcon,
  ArrowPathIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  DocumentCheckIcon,
  ChartPieIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

export default function AnimationShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  // Animation hooks
  const { elementRef: buttonRef } = useButtonAnimation('ripple')
  const { elementRef: loadingRef, isLoading, stopLoading } = useLoadingAnimation('pulse')
  const { elementRef: physicsRef, triggerAnimation, isAnimating } = usePhysicsAnimation('bounce', {
    velocity: { x: 200, y: -300 }
  })

  // Timeline demo
  const { timeline, play, pause, reverse, isPlaying } = useTimeline([
    {
      element: '.timeline-demo-1',
      vars: { x: 100, opacity: 1 },
    },
    {
      element: '.timeline-demo-2',
      vars: { x: 200, opacity: 1 },
    },
    {
      element: '.timeline-demo-3',
      vars: { x: 300, opacity: 1 },
    },
  ])

  const features = [
    { icon: ChatBubbleLeftRightIcon, title: 'AI Tax Assistant', description: 'Get instant answers to tax questions' },
    { icon: DocumentCheckIcon, title: 'Smart Compliance', description: 'Automated compliance monitoring' },
    { icon: ChartPieIcon, title: 'Advanced Analytics', description: 'Comprehensive analytics and reporting' },
    { icon: ShieldCheckIcon, title: 'Risk Assessment', description: 'AI-powered risk analysis' },
    { icon: CloudArrowUpIcon, title: 'Document Management', description: 'Secure cloud storage' },
    { icon: UsersIcon, title: 'Team Collaboration', description: 'Multi-user workspace' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">
            Tax.ai Animation Showcase
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Professional motion design with GSAP and Framer Motion
          </p>
        </div>

        {/* Text Animations */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Text Animations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-4">Split by Letter</h3>
              <AnimatedText animationType="splitByLetter" className="text-2xl font-light text-primary-teal">
                Revolutionary
              </AnimatedText>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-4">Typewriter Effect</h3>
              <AnimatedText
                animationType="typewriter"
                className="text-xl font-light text-gray-700"
              >
                AI-Powered Tax Automation
              </AnimatedText>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-4">Highlight Effect</h3>
              <AnimatedText
                animationType="highlight"
                className="text-xl font-light text-gray-700"
              >
                Click to highlight this text
              </AnimatedText>
            </div>
          </div>
        </div>

        {/* Interactive Animations */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Interactive Animations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-6">Button Interactions</h3>
              <div className="space-y-4">
                <Button
                  ref={buttonRef}
                  onClick={() => setActiveDemo('ripple')}
                  className="w-full"
                >
                  Click for Ripple Effect
                </Button>

                <Button
                  variant="outline"
                  className="w-full hover-lift"
                >
                  Hover for Lift Effect
                </Button>

                <Button
                  variant="ghost"
                  className="w-full hover-scale"
                >
                  Hover for Scale Effect
                </Button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-6">Loading States</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <LoadingSpinner size="md" />
                  <span>Default Loading Spinner</span>
                </div>

                <div className="flex items-center space-x-4">
                  <div
                    ref={loadingRef}
                    className="w-12 h-12 bg-primary-teal rounded-lg"
                  />
                  <span>Pulse Animation</span>
                  <Button
                    size="sm"
                    onClick={stopLoading}
                    className="ml-auto"
                  >
                    Stop
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded overflow-hidden">
                    <div className="skeleton-animation h-full bg-primary-teal/30 rounded"></div>
                  </div>
                  <span className="text-sm text-gray-600">Skeleton Loading</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Physics Animations */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Physics Animations</h2>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium mb-6">2D Physics</h3>
            <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
              <div
                ref={physicsRef}
                className="absolute top-4 left-4 w-8 h-8 bg-primary-teal rounded-full cursor-pointer"
                onClick={triggerAnimation}
              />
              <div className="absolute bottom-4 right-4 text-sm text-gray-600">
                Click the ball to see physics animation
              </div>
            </div>
            {isAnimating && (
              <p className="text-sm text-primary-teal mt-2">Animation in progress...</p>
            )}
          </div>
        </div>

        {/* Timeline Animations */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Timeline Animations</h2>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium mb-6">Sequential Animation Timeline</h3>
            <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden mb-6">
              <div className="timeline-demo-1 absolute top-4 left-4 w-8 h-8 bg-primary-teal rounded-full opacity-0"></div>
              <div className="timeline-demo-2 absolute top-4 left-4 w-8 h-8 bg-primary-blue-teal rounded-full opacity-0"></div>
              <div className="timeline-demo-3 absolute top-4 left-4 w-8 h-8 bg-primary-cyan rounded-full opacity-0"></div>
            </div>
            <div className="flex space-x-4">
              <Button onClick={play} disabled={isPlaying}>
                <PlayIcon className="w-4 h-4 mr-2" />
                Play
              </Button>
              <Button onClick={pause} disabled={!isPlaying} variant="outline">
                <PauseIcon className="w-4 h-4 mr-2" />
                Pause
              </Button>
              <Button onClick={reverse} variant="ghost">
                <ArrowPathIcon className="w-4 h-4 mr-2" />
                Reverse
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Animations */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Scroll Animations</h2>
          <div className="space-y-16">
            {features.map((feature, index) => (
              <ScrollReveal
                key={feature.title}
                className={`bg-white p-8 rounded-xl shadow-sm max-w-xl ${index % 2 === 1 ? 'ml-auto' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-teal/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary-teal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Performance Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-light text-primary-teal mb-2">60 FPS</div>
              <div className="text-sm text-gray-600">Target Frame Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-primary-teal mb-2">16ms</div>
              <div className="text-sm text-gray-600">Frame Budget</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-primary-teal mb-2">95+</div>
              <div className="text-sm text-gray-600">Lighthouse Score</div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              All animations are optimized for performance and accessibility
            </p>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          .hover-lift:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            transition: all 0.2s ease-out;
          }
          
          .hover-scale:hover {
            transform: scale(1.05);
            transition: transform 0.2s ease-out;
          }
          
          .skeleton-animation {
            background: linear-gradient(90deg, transparent, rgba(6, 112, 138, 0.3), transparent);
            animation: shimmer 1.5s infinite;
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  )
}