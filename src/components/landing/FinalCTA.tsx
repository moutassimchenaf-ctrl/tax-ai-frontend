'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="w-full bg-[#0A1628] py-32 flex items-center justify-center z-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0898BB]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
        >
          Ready to deploy <br />
          <span className="text-[#0898BB]">Tax Intelligence?</span>
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-3 h-16 px-12 rounded-full bg-white text-[#0A1628] text-lg font-bold hover:bg-[#E2E8F0] transition-all duration-300 hover:scale-105"
          >
            Get Started Now
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
