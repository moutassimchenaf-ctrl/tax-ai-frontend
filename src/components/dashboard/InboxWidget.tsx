'use client'

import React from 'react'
import { Bell } from 'lucide-react'

import { Skeleton } from '@/components/ui/Skeleton'

export function InboxWidget({ loading }: { loading?: boolean }) {
  return (
    <div className="flex flex-col rounded-xl border border-huly-border bg-huly-sidebar overflow-hidden h-full">
      <div className="flex items-center justify-between border-b border-huly-border px-4 py-3">
        <h3 className="font-semibold text-huly-text-primary">Inbox</h3>
        <button className="text-xs text-huly-text-secondary hover:text-huly-text-primary transition-colors">Mark all read</button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        {loading ? (
          <div className="w-full space-y-4">
             <Skeleton className="h-12 w-12 rounded-full mx-auto" />
             <Skeleton className="h-4 w-32 mx-auto" />
             <Skeleton className="h-3 w-48 mx-auto" />
          </div>
        ) : (
          <>
            <div className="mb-3 rounded-full bg-white/5 p-3 text-huly-text-secondary">
              <Bell size={24} />
            </div>
            <h4 className="text-sm font-medium text-huly-text-primary">All caught up</h4>
            <p className="text-xs text-huly-text-secondary mt-1">You have no new notifications.</p>
          </>
        )}
      </div>
    </div>
  )
}
