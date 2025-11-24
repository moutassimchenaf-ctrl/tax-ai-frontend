'use client'

import { 
  ChatBubbleLeftRightIcon,
  DocumentCheckIcon,
  ChartPieIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

const features = [
  {
    icon: ChatBubbleLeftRightIcon,
    title: 'AI Tax Assistant',
    description: 'Get instant answers to tax questions with our advanced AI assistant trained on GCC tax regulations.',
    color: 'text-primary-teal',
  },
  {
    icon: DocumentCheckIcon,
    title: 'Smart Compliance',
    description: 'Automated compliance monitoring ensures you meet all GCC tax requirements in real-time.',
    color: 'text-primary-blue-teal',
  },
  {
    icon: ChartPieIcon,
    title: 'Advanced Analytics',
    description: 'Comprehensive analytics and reporting to optimize your tax strategy and identify opportunities.',
    color: 'text-primary-cyan',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Risk Assessment',
    description: 'AI-powered risk analysis identifies potential compliance issues before they become problems.',
    color: 'text-primary-light-cyan',
  },
  {
    icon: CloudArrowUpIcon,
    title: 'Document Management',
    description: 'Secure cloud storage with AI-powered document categorization and retrieval.',
    color: 'text-primary-teal',
  },
  {
    icon: UsersIcon,
    title: 'Team Collaboration',
    description: 'Multi-user workspace with role-based access and real-time collaboration features.',
    color: 'text-primary-blue-teal',
  },
]

export function FeaturesSection() {
  const MotionDiv = motion.div as any;
  const MotionH2 = motion.h2 as any;
  const MotionP = motion.p as any;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-light text-gray-900 mb-4"
          >
            Everything You Need for
            <span className="block text-primary-teal">Tax Success</span>
          </MotionH2>
          
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 font-light max-w-3xl mx-auto"
          >
            Comprehensive tax automation platform designed specifically for GCC regulations. 
            From AI assistance to compliance monitoring, we've got you covered.
          </MotionP>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <MotionDiv
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg mb-6">
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 font-light leading-relaxed">
                {feature.description}
              </p>
            </MotionDiv>
          ))}
        </div>

        {/* Feature Stats */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-sm"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-light text-primary-teal mb-1">500+</div>
              <div className="text-sm text-gray-600">Tax Forms Supported</div>
            </div>
            <div>
              <div className="text-2xl font-light text-primary-teal mb-1">50+</div>
              <div className="text-sm text-gray-600">GCC Regulations</div>
            </div>
            <div>
              <div className="text-2xl font-light text-primary-teal mb-1">99.9%</div>
              <div className="text-sm text-gray-600">Uptime SLA</div>
            </div>
            <div>
              <div className="text-2xl font-light text-primary-teal mb-1">24/7</div>
              <div className="text-sm text-gray-600">AI Support</div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}