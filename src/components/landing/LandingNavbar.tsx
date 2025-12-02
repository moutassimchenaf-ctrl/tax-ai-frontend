'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Star } from 'lucide-react';
import { GlitchHeader } from '@/components/ui/GlitchHeader';
import { useAuth } from '@/lib/auth';

export const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Pricing', href: '#pricing' },
    { name: 'Resources', href: '#resources' },
    { name: 'Community', href: '#community' },
    { name: 'Download', href: '#download' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-white/10 ${
        isScrolled ? 'bg-[#0A1628]/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Left: Brand */}
        <div className="flex items-center gap-4">
          <GlitchHeader />
          <span className="hidden md:inline-block font-mono text-white/60 text-xs tracking-wide border-l border-white/10 pl-4 ml-2">
            TAi Engine
          </span>
        </div>

        {/* Center: Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs text-white/80">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[#0898BB] transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#star"
            className="flex items-center gap-2 hover:text-yellow-400 transition-colors uppercase tracking-wider"
          >
            <Star className="w-3 h-3" /> Star Us
          </Link>
        </div>

        {/* Right: Auth */}
        <div className="hidden md:flex items-center gap-6 font-mono text-xs">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-white hover:text-[#0898BB] transition-colors">
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="text-white/60 hover:text-white transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-white hover:text-[#0898BB] transition-colors uppercase tracking-wider">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 border border-[#0898BB] text-[#0898BB] rounded hover:bg-[#0898BB] hover:text-white transition-all uppercase tracking-wider"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A1628] border-b border-white/10"
          >
            <div className="flex flex-col p-6 gap-4 font-mono text-sm text-white/80">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#0898BB] transition-colors uppercase"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#star"
                className="flex items-center gap-2 hover:text-yellow-400 transition-colors uppercase"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Star className="w-4 h-4" /> Star Us
              </Link>
              <div className="h-px bg-white/10 my-2" />
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-white hover:text-[#0898BB]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-white/60 hover:text-white"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-white hover:text-[#0898BB] uppercase"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="text-[#0898BB] uppercase"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
