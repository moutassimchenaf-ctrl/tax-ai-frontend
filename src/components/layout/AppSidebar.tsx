'use client'

import React from 'react'
import { Home, CheckSquare, Calendar, Folder, Settings, User } from 'lucide-react'
import { WorkspaceSwitcher } from './WorkspaceSwitcher'

import { useAuth } from '@/lib/auth'
import { LogOut } from 'lucide-react'

export function AppSidebar() {
  const { user, signOut } = useAuth()

  // Get initials from name or email
  const getInitials = () => {
    if (!user) return '?'
    if (user.full_name) {
        return user.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    }
    return user.email.substring(0, 2).toUpperCase()
  }

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
        
        {/* User Profile / Logout */}
        <div className="group relative">
            <div className="h-8 w-8 rounded-full bg-gray-600 overflow-hidden cursor-pointer hover:ring-2 hover:ring-huly-accent transition-all">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500 text-xs font-medium text-white">
                {getInitials()}
            </div>
            </div>
            
            {/* Hover Menu (Logout) */}
            <div className="absolute left-10 bottom-0 hidden group-hover:block pl-2 z-50">
                <div className="bg-[#1c1c1c] border border-white/10 rounded-lg p-2 shadow-xl w-48">
                    <div className="px-2 py-1 mb-2 border-b border-white/5">
                        <p className="text-xs font-medium text-white truncate">{user?.full_name}</p>
                        <p className="text-[10px] text-white/40 truncate">{user?.email}</p>
                    </div>
                    <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-red-400 hover:bg-white/5 rounded transition-colors"
                    >
                        <LogOut size={12} />
                        Sign Out
                    </button>
                </div>
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
