'use client'

import React from 'react'
import { Plus, Search } from 'lucide-react'

export function GreetingPanel() {
  const date = new Date()
  const hours = date.getHours()
  const greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex items-center justify-between py-6">
      <div>
        <h1 className="text-3xl font-bold text-huly-text-primary">{greeting}, Moutassim</h1>
        <p className="text-huly-text-secondary mt-1">
          {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-2 text-sm font-medium text-huly-text-primary hover:bg-white/10 transition-colors">
          <Search size={16} />
          <span>Search</span>
          <kbd className="ml-2 hidden rounded bg-black/20 px-1.5 py-0.5 text-xs text-huly-text-secondary md:inline-block">⌘K</kbd>
        </button>
        <button className="flex items-center gap-2 rounded-md bg-huly-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity">
          <Plus size={16} />
          <span>New Issue</span>
        </button>
      </div>
    </div>
  )
}
