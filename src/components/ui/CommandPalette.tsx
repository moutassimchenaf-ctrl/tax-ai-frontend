'use client'

import React, { useEffect, useState } from 'react'
import { Command } from 'cmdk'
import { Search, Plus, User, FileText, Settings, Layout } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl overflow-hidden rounded-xl border border-huly-border bg-huly-sidebar shadow-2xl animate-in zoom-in-95 duration-200">
        <Command className="w-full">
          <div className="flex items-center border-b border-huly-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 text-huly-text-secondary" />
            <Command.Input 
              placeholder="Type a command or search..." 
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-huly-text-secondary text-huly-text-primary"
            />
          </div>
          
          <Command.List className="max-h-[300px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-huly-text-secondary">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs font-medium text-huly-text-secondary px-2 py-1.5">
              <CommandItem icon={Layout} onSelect={() => runCommand(() => router.push('/dashboard'))}>
                Dashboard
              </CommandItem>
              <CommandItem icon={FileText} onSelect={() => runCommand(() => router.push('/dashboard/issues'))}>
                Issues
              </CommandItem>
              <CommandItem icon={Settings} onSelect={() => runCommand(() => router.push('/dashboard/settings'))}>
                Settings
              </CommandItem>
            </Command.Group>

            <Command.Group heading="Actions" className="text-xs font-medium text-huly-text-secondary px-2 py-1.5 mt-2">
              <CommandItem icon={Plus} onSelect={() => runCommand(() => console.log('New Issue'))}>
                Create New Issue
              </CommandItem>
              <CommandItem icon={User} onSelect={() => runCommand(() => console.log('Invite Team'))}>
                Invite Team Member
              </CommandItem>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}

function CommandItem({ children, icon: Icon, onSelect }: { children: React.ReactNode, icon: any, onSelect: () => void }) {
  return (
    <Command.Item 
      onSelect={onSelect}
      className="flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm text-huly-text-primary aria-selected:bg-huly-accent aria-selected:text-white transition-colors"
    >
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </Command.Item>
  )
}
