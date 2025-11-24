'use client'

import { StarIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Al-Rashid',
    role: 'Senior Tax Consultant',
    company: 'Deloitte UAE',
    content: 'Tax.ai has transformed how we handle GCC tax compliance. The AI assistant is incredibly accurate and saves us hours of manual work.',
    rating: 5,
    image: '/testimonials/sarah.jpg',
  },
  {
    name: 'Mohammed Al-Zahran',
    role: 'Tax Director',
    company: 'PwC Saudi Arabia',
    content: 'The real-time compliance monitoring is a game-changer. We can now identify and resolve issues before they become problems.',
    rating: 5,
    image: '/testimonials/mohammed.jpg',
  },
  {
    name: 'Aisha Al-Mansouri',
    role: 'Chief Financial Officer',
    company: 'Emirates Group',
    content: 'The automation features have reduced our tax processing time by 80%. The accuracy and efficiency are unmatched.',
    rating: 5,
    image: '/testimonials/aisha.jpg',
  },
  {
    name: 'Khalid Al-Hashimi',
    role: 'Tax Manager',
    company: 'EY Qatar',
    content: 'Tax.ai\'s AI-powered insights have helped us optimize our tax strategy and identify significant savings opportunities.',
    rating: 5,
    image: '/testimonials/khalid.jpg',
  },
]

export function TestimonialsSection() {
  const MotionH2 = motion.h2 as any;
  const MotionP = motion.p as any;
  const MotionDiv = motion.div as any;

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
            Trusted by Tax Professionals
          </MotionH2>
          
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 font-light max-w-3xl mx-auto"
          >
            Join thousands of tax professionals across the GCC who trust Tax.ai 
            for their compliance and automation needs.
          </MotionP>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <MotionDiv
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-600 font-light leading-relaxed mb-6">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* Trust Indicators */}
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-light text-gray-900 mb-8">
              Trusted by Leading Organizations
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              <div className="text-center">
                <div className="text-lg font-medium text-gray-700">Deloitte</div>
                <div className="text-sm text-gray-500">Professional Services</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-gray-700">PwC</div>
                <div className="text-sm text-gray-500">Consulting</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-gray-700">EY</div>
                <div className="text-sm text-gray-500">Advisory</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-medium text-gray-700">KPMG</div>
                <div className="text-sm text-gray-500">Audit & Tax</div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}