'use client'

import React from 'react'
import { ChevronsUpDown, Plus } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export function WorkspaceSwitcher() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-huly-accent text-white shadow-lg hover:opacity-90 transition-opacity outline-none focus:ring-2 focus:ring-white/20">
          <span className="font-bold text-lg">T</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          className="z-50 min-w-[220px] overflow-hidden rounded-md border border-huly-border bg-huly-sidebar p-1 shadow-xl animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2"
          side="right"
          align="start"
          sideOffset={8}
        >
          <DropdownMenu.Label className="px-2 py-1.5 text-xs font-medium text-huly-text-secondary">
            Workspaces
          </DropdownMenu.Label>
          
          <DropdownMenu.Item className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-huly-text-primary outline-none hover:bg-white/5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-huly-accent text-xs text-white">
              T
            </div>
            <span>Titan Core</span>
            <span className="ml-auto text-xs text-huly-text-secondary">Active</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-huly-text-primary outline-none hover:bg-white/5">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded bg-purple-600 text-xs text-white">
              D
            </div>
            <span>Design System</span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-huly-border" />

          <DropdownMenu.Item className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-huly-text-primary outline-none hover:bg-white/5">
            <Plus className="mr-2 h-4 w-4" />
            <span>Create Workspace</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
