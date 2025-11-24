'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'
import { AnimatedText } from '@/components/animations/AnimatedText'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import {
  ArrowRightIcon,
  PlayIcon,
  ShieldCheckIcon,
  SparklesIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

export function HeroSection() {
  const MotionDiv = motion.div as any;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-teal/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-blue-teal/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center space-x-2 bg-primary-teal/10 px-4 py-2 rounded-full">
                <SparklesIcon className="h-5 w-5 text-primary-teal" />
                <span className="text-sm font-light text-primary-teal">
                  AI-Powered Tax Automation
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
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
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="h-6 w-6 text-primary-teal" />
                <span className="text-sm text-gray-600">100% Compliance</span>
              </div>
              <div className="flex items-center space-x-3">
                <LightBulbIcon className="h-6 w-6 text-primary-teal" />
                <span className="text-sm text-gray-600">AI-Powered Insights</span>
              </div>
              <div className="flex items-center space-x-3">
                <SparklesIcon className="h-6 w-6 text-primary-teal" />
                <span className="text-sm text-gray-600">Smart Automation</span>
              </div>
            </div>
          </MotionDiv>

          {/* Right Content - 3D Hero */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square bg-gradient-to-br from-primary-teal/5 to-primary-blue-teal/5 rounded-3xl overflow-hidden">
              {/* 3D Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 bg-primary-teal/20 rounded-2xl transform rotate-12 animate-pulse"></div>
                  <div className="absolute inset-4 w-24 h-24 bg-primary-blue-teal/30 rounded-xl transform -rotate-6 animate-pulse delay-150"></div>
                  <div className="absolute inset-8 w-16 h-16 bg-primary-cyan/40 rounded-lg transform rotate-3 animate-pulse delay-300"></div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-teal/60 rounded-full animate-bounce"></div>
                  <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-primary-blue-teal/60 rounded-full animate-bounce delay-150"></div>
                  <div className="absolute top-1/2 -right-6 w-4 h-4 bg-primary-cyan/60 rounded-full animate-bounce delay-300"></div>
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
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 animate-fade-in">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium">Real-time Compliance</span>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 animate-fade-in delay-300">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-sm font-medium">AI Assistant Active</span>
              </div>
            </div>
          </MotionDiv>
        </div>

        {/* Stats Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-light text-primary-teal mb-2">99.9%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-light text-primary-teal mb-2">10x</div>
            <div className="text-sm text-gray-600">Faster Processing</div>
          </div>
          <div>
            <div className="text-3xl font-light text-primary-teal mb-2">24/7</div>
            <div className="text-sm text-gray-600">AI Support</div>
          </div>
          <div>
            <div className="text-3xl font-light text-primary-teal mb-2">100%</div>
            <div className="text-sm text-gray-600">Compliance</div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}