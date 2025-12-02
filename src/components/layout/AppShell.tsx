import React from 'react'
import { AppSidebar } from './AppSidebar'
import { PresenceIndicator } from '@/components/collaboration/PresenceIndicator'
import { NotificationsPopover } from '@/components/collaboration/NotificationsPopover'
import { KeyboardShortcuts } from '@/components/ui/KeyboardShortcuts'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0A1628] text-white font-inter">
      {/* Sidebar */}
      <AppSidebar />
      
      {/* Keyboard Shortcuts Listener */}
      <KeyboardShortcuts />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Bar */}
        <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-[#0A1628]/50 backdrop-blur-md z-10">
           {/* Left: Breadcrumbs (Placeholder) */}
           <div className="flex items-center gap-2 text-sm text-white/40">
             <span>Workspace</span>
             <span>/</span>
             <span className="text-white">Dashboard</span>
           </div>

           {/* Right: Collaboration Tools */}
           <div className="flex items-center gap-4">
             <PresenceIndicator />
             <div className="h-4 w-px bg-white/10" />
             <NotificationsPopover />
           </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
