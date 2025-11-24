'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export function CTASection() {
  const MotionDiv = motion.div as any;
  return (
    <section className="py-20 bg-gradient-to-br from-primary-teal to-primary-blue-teal">
      <div className="container">
        <div className="text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 w-fit mx-auto">
              <SparklesIcon className="h-5 w-5 text-white" />
              <span className="text-sm font-light text-white">
                Start Your Free Trial Today
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Ready to Transform Your
              <span className="block font-light">Tax Workflow?</span>
            </h2>

            <p className="text-xl text-white/90 font-light max-w-3xl mx-auto mb-8">
              Join thousands of tax professionals who have already streamlined their processes with Tax.ai.
              Start your free 14-day trial and experience the future of tax automation.
            </p>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              size="lg"
              className="bg-white text-primary-teal hover:bg-gray-50 px-8 py-4 text-lg"
            >
              Start Free Trial
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-teal px-8 py-4 text-lg"
            >
              Schedule Demo
            </Button>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-white/80">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm">Cancel anytime</span>
              </div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}