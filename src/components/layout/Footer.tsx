import Link from 'next/link'
import Image from 'next/image'
import { Github, Twitter, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0A1628] border-t border-white/5 relative z-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="relative h-8 w-24 mb-6">
              <Image 
                src="/taxai-logo-white.png" 
                alt="Tax.ai" 
                fill 
                className="object-contain object-left"
              />
            </div>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              The autonomous engine for modern tax intelligence. Orchestrating agents, audits, and compliance in real-time.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API Reference</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-white/40">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Legal</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/20 text-sm">
            © 2025 Tax.ai Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-white/40 hover:text-white transition-colors"><Github size={20} /></Link>
            <Link href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={20} /></Link>
            <Link href="#" className="text-white/40 hover:text-white transition-colors"><Linkedin size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  )
}