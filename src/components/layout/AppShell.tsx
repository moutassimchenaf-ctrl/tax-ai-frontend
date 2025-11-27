'use client'

import React from 'react'
import { AppSidebar } from './AppSidebar'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-huly-bg text-huly-text-primary font-inter">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Bar (Optional, can be part of children or here) */}
        {/* <div className="h-12 border-b border-huly-border flex items-center px-4">
             Breadcrumbs / Search
        </div> */}
        
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
