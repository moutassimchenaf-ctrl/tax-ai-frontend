'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronDown, Github } from 'lucide-react'

export function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#1c1c1c]/80 backdrop-blur-md border-b border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center">
           {/* Placeholder for Huly Logo Icon */}
           <div className="h-4 w-4 bg-black rounded-sm" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">Huly</span>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="#" className="text-sm font-medium text-white hover:text-blue-500 transition-colors">
          Pricing
        </Link>
        <div className="group relative flex items-center gap-1 cursor-pointer text-sm font-medium text-white hover:text-blue-500 transition-colors">
          Resources
          <ChevronDown size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="group relative flex items-center gap-1 cursor-pointer text-sm font-medium text-white hover:text-blue-500 transition-colors">
          Community
          <ChevronDown size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
        <Link href="#" className="text-sm font-medium text-white hover:text-blue-500 transition-colors">
          Download
        </Link>
        <Link href="#" className="flex items-center gap-2 text-sm font-medium text-white hover:text-blue-500 transition-colors">
          <Github size={16} />
          Star Us
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link href="/login" className="hidden md:block text-[11px] font-bold text-white uppercase tracking-wider hover:text-blue-500 transition-colors">
          Sign In
        </Link>
        <Link href="/signup" className="hidden md:block text-[11px] font-bold text-white uppercase tracking-wider hover:text-blue-500 transition-colors">
          Sign Up
        </Link>
        <button className="md:hidden text-white">
            {/* Mobile Menu Icon */}
            <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
            </div>
        </button>
      </div>
    </nav>
  )
}
