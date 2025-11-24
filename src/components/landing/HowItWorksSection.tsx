'use client'

import { 
  ArrowPathIcon,
  CheckIcon,
  DocumentTextIcon,
  LightBulbIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const steps = [
  {
    icon: DocumentTextIcon,
    title: 'Upload Documents',
    description: 'Securely upload your tax documents and financial data to our encrypted platform.',
    step: 1,
  },
  {
    icon: LightBulbIcon,
    title: 'AI Analysis',
    description: 'Our AI analyzes your documents, identifies requirements, and suggests optimizations.',
    step: 2,
  },
  {
    icon: ArrowPathIcon,
    title: 'Auto-Processing',
    description: 'Intelligent automation fills forms, calculates taxes, and ensures compliance.',
    step: 3,
  },
  {
    icon: CheckIcon,
    title: 'Review & Validate',
    description: 'Review AI-generated forms with our expert assistance and validation tools.',
    step: 4,
  },
  {
    icon: ShieldCheckIcon,
    title: 'Compliance Check',
    description: 'Final compliance verification against all GCC regulations and requirements.',
    step: 5,
  },
  {
    icon: PaperAirplaneIcon,
    title: 'Submit & Monitor',
    description: 'Submit to authorities and monitor status with real-time updates and alerts.',
    step: 6,
  },
]

export function HowItWorksSection() {
  const MotionH2 = motion.h2 as any;
  const MotionP = motion.p as any;
  const MotionDiv = motion.div as any;

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-light text-gray-900 mb-4"
          >
            How Tax.ai Works
          </MotionH2>
          
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 font-light max-w-3xl mx-auto"
          >
            Simple, intelligent, and secure tax automation in six easy steps. 
            From document upload to final submission, we've streamlined the entire process.
          </MotionP>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-teal/20 to-primary-blue-teal/20 hidden lg:block"></div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, index) => (
              <MotionDiv
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={clsx(
                  'relative flex flex-col lg:flex-row items-center',
                  index % 2 === 1 && 'lg:flex-row-reverse'
                )}
              >
                {/* Step Number */}
                <div className="absolute -top-8 lg:top-1/2 lg:-translate-y-1/2 left-1/2 transform -translate-x-1/2 lg:left-auto lg:right-1/2 lg:mr-8 lg:ml-0 z-10">
                  <div className="w-12 h-12 bg-primary-teal rounded-full flex items-center justify-center text-white font-medium shadow-lg">
                    {step.step}
                  </div>
                </div>

                {/* Content */}
                <div className={clsx(
                  'w-full lg:w-1/2',
                  index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
                )}>
                  <div className="bg-gray-50 rounded-2xl p-8">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary-teal/10 rounded-lg mr-4">
                        <step.icon className="h-6 w-6 text-primary-teal" />
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-gray-900">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500">Step {step.step}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden lg:block lg:w-1/2"></div>
              </MotionDiv>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center bg-gradient-to-br from-primary-teal/5 to-primary-blue-teal/5 rounded-2xl p-12"
        >
          <h3 className="text-2xl font-light text-gray-900 mb-4">
            Ready to Transform Your Tax Process?
          </h3>
          <p className="text-gray-600 font-light mb-8 max-w-2xl mx-auto">
            Join thousands of tax professionals who have already streamlined their workflow with Tax.ai. 
            Start your free trial today and experience the future of tax automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-teal text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-dark-teal transition-colors">
              Start Free Trial
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Schedule Demo
            </button>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}