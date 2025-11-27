'use client'

import React from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'

export function LandingHero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20 text-center z-10">
      
      <div className="relative z-10 max-w-5xl px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-8 leading-[1.1]"
        >
          The TAi Engine <br />
          <span className="text-white/80">for Tax Intelligence</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-[#94A3B8] max-w-3xl mx-auto mb-12 leading-relaxed font-light"
        >
          Advanced multi-agent orchestration for the modern enterprise.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4"
        >
          <Link 
            href="/dashboard"
            className="group flex items-center gap-3 h-14 px-10 rounded-full bg-[#0898BB] text-white font-semibold hover:bg-[#067A96] transition-all duration-300 shadow-[0_0_20px_rgba(8,152,187,0.3)] hover:shadow-[0_0_30px_rgba(8,152,187,0.5)] hover:scale-105"
          >
            Launch Console
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
               <Play size={10} fill="currentColor" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
