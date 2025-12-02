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

// Huly Typography: Inter (All weights)
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Huly - Everything App for your teams',
  description: 'Huly is an open-source platform that serves as an all-in-one replacement of Linear, Jira, Slack, and Notion.',
  keywords: ['project management', 'issue tracker', 'open source', 'huly', 'linear alternative'],
  authors: [{ name: 'Huly Replica Team' }],
  creator: 'Huly Replica',
  publisher: 'Huly Replica',
  metadataBase: new URL('https://huly.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Huly - Everything App for your teams',
    description: 'Huly is an open-source platform that serves as an all-in-one replacement of Linear, Jira, Slack, and Notion.',
    url: 'https://huly.io',
    siteName: 'Huly',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huly - Everything App for your teams',
    description: 'Huly is an open-source platform that serves as an all-in-one replacement of Linear, Jira, Slack, and Notion.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-inter bg-[#1c1c1c] text-white antialiased selection:bg-blue-500 selection:text-white">
        <WebVitals />
        <Providers>
          <CommandPalette />
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