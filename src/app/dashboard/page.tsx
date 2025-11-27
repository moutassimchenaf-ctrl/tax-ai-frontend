'use client'

import React from 'react'
import { GreetingPanel } from '@/components/dashboard/GreetingPanel'
import { IssuesWidget } from '@/components/dashboard/IssuesWidget'
import { InboxWidget } from '@/components/dashboard/InboxWidget'

import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex h-full flex-col px-8 pb-8">
      <GreetingPanel />
      
      <div className="mt-4 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3 min-h-0">
        {/* Main Column (Issues) */}
        <div className="lg:col-span-2 h-full min-h-[400px]">
          <IssuesWidget loading={loading} />
        </div>

        {/* Side Column (Inbox/Activity) */}
        <div className="h-full min-h-[400px]">
          <InboxWidget loading={loading} />
        </div>
      </div>
    </div>
  )
}
