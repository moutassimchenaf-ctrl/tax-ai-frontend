'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, TrendingUp, FileText, Globe, Lock, Zap } from 'lucide-react'

const features = [
  {
    title: 'Global Compliance',
    description: 'Automated adherence to local tax laws across 150+ jurisdictions.',
    icon: Globe,
    colSpan: 'md:col-span-2',
    bg: 'bg-gradient-to-br from-[#0A1628] to-[#0F1C2E]'
  },
  {
    title: 'Forecasting',
    description: 'Predictive tax liability modeling.',
    icon: TrendingUp,
    colSpan: 'md:col-span-1',
    bg: 'bg-[#0F1C2E]'
  },
  {
    title: 'Secure Vault',
    description: 'Bank-grade encryption for sensitive financial data.',
    icon: Lock,
    colSpan: 'md:col-span-1',
    bg: 'bg-[#0F1C2E]'
  },
  {
    title: 'Strategy Engine',
    description: 'AI-driven tax saving strategies tailored to your business.',
    icon: Zap,
    colSpan: 'md:col-span-2',
    bg: 'bg-gradient-to-bl from-[#0A1628] to-[#0F1C2E]'
  }
]

export function BentoGrid() {
  return (
    <section className="w-full bg-[#0A1628] px-6 py-32 z-20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${feature.colSpan} ${feature.bg} rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden`}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#0898BB] transition-colors duration-300">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed">{feature.description}</p>
              </div>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0898BB]/0 via-[#0898BB]/5 to-[#0898BB]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
