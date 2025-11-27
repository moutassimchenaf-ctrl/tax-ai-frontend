'use client'

import React from 'react'

interface User {
  id: string
  name: string
  color: string
}

const MOCK_ACTIVE_USERS: User[] = [
  { id: '1', name: 'MC', color: 'bg-purple-500' },
  { id: '2', name: 'AI', color: 'bg-blue-500' },
]

export function UserPresence() {
  return (
    <div className="flex items-center -space-x-2">
      {MOCK_ACTIVE_USERS.map((user) => (
        <div 
          key={user.id}
          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-huly-sidebar ${user.color} text-xs font-bold text-white ring-2 ring-transparent transition-transform hover:z-10 hover:scale-110`}
          title={`${user.name} is viewing`}
        >
          {user.name}
        </div>
      ))}
      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-huly-sidebar bg-white/10 text-xs font-medium text-huly-text-secondary hover:bg-white/20 transition-colors cursor-pointer">
        +2
      </div>
    </div>
  )
}
