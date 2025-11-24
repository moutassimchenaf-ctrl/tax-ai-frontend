import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { AgentChat } from '@/components/agent/AgentChat'
import { AgentStateProvider } from '@/components/agent/AgentStateContext'
import { CommandPalette } from '@/components/ui/CommandPalette'
import SmoothScroll from '@/components/dom/SmoothScroll'
import Layout from '@/components/dom/Layout'
import { WebVitals } from '@/components/WebVitals'

// Clinical Futurism Typography: Inter Thin / Extra-Light
const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400'], // Thin, ExtraLight, Light, Regular
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TAi Engine: The Quantum Core',
  description: 'Clinical Futurism Scrollytelling Experience',
  keywords: ['tax automation', 'GCC compliance', 'AI tax', 'UAE corporate tax', 'VAT compliance', 'tax AI', 'enterprise tax automation'],
  authors: [{ name: 'Tax.ai Team' }],
  creator: 'Tax.ai',
  publisher: 'Tax.ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tax.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tax.ai - AI-Powered Tax Automation',
    description: 'Revolutionary AI system for GCC tax compliance and automation',
    url: 'https://tax.ai',
    siteName: 'Tax.ai',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tax.ai Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax.ai - AI-Powered Tax Automation',
    description: 'Advanced AI system for GCC tax compliance and automation',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-inter bg-white text-navy-900 antialiased selection:bg-teal-500 selection:text-white">
        <WebVitals />
        <Providers>
          <AgentStateProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </AgentStateProvider>
        </Providers>
      </body>
    </html>
  )
}