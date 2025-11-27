'use client'

import React from 'react'
import { Home, CheckSquare, Calendar, Folder, Settings, User } from 'lucide-react'
import { WorkspaceSwitcher } from './WorkspaceSwitcher'

export function AppSidebar() {
  return (
    <div className="flex h-screen w-[60px] flex-col items-center justify-between border-r border-huly-border bg-huly-sidebar py-4">
      {/* Top Section: Navigation */}
      <div className="flex flex-col gap-6">
        {/* Workspace Logo/Switcher */}
        <div className="flex justify-center">
          <WorkspaceSwitcher />
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-4">
          <NavItem icon={<Home size={20} />} label="Home" active />
          <NavItem icon={<CheckSquare size={20} />} label="My Issues" />
          <NavItem icon={<Calendar size={20} />} label="Calendar" />
          <NavItem icon={<Folder size={20} />} label="Projects" />
        </nav>
      </div>

      {/* Bottom Section: User/Settings */}
      <div className="flex flex-col gap-4">
        <NavItem icon={<Settings size={20} />} label="Settings" />
        <div className="h-8 w-8 rounded-full bg-gray-600 overflow-hidden cursor-pointer hover:ring-2 hover:ring-huly-accent transition-all">
           {/* Placeholder Avatar */}
           <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-xs font-medium text-white">
             MC
           </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-colors ${active ? 'bg-white/10 text-white' : 'text-huly-text-secondary hover:bg-white/5 hover:text-huly-text-primary'}`}>
      {icon}
      {/* Tooltip */}
      <div className="absolute left-14 hidden rounded bg-black px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap z-50">
        {label}
      </div>
    </div>
  )
}
