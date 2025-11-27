'use client'

import React from 'react'
import { CheckCircle2, Circle, Clock } from 'lucide-react'

import { Skeleton } from '@/components/ui/Skeleton'

export function IssuesWidget({ loading }: { loading?: boolean }) {
  return (
    <div className="flex flex-col rounded-xl border border-huly-border bg-huly-sidebar overflow-hidden h-full">
      <div className="flex items-center justify-between border-b border-huly-border px-4 py-3">
        <h3 className="font-semibold text-huly-text-primary">My Issues</h3>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-huly-accent/10 text-xs font-medium text-huly-accent">3</span>
      </div>
      
      <div className="flex-1 overflow-auto p-2">
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <IssueItem 
              id="TIT-123" 
              title="Implement Huly Replica Design System" 
              status="In Progress" 
              priority="High" 
            />
            <IssueItem 
              id="TIT-124" 
              title="Setup Prisma Schema" 
              status="Todo" 
              priority="Medium" 
            />
            <IssueItem 
              id="TIT-125" 
              title="Configure Tailwind Colors" 
              status="Done" 
              priority="Low" 
            />
          </>
        )}
      </div>
    </div>
  )
}

function IssueItem({ id, title, status, priority }: { id: string, title: string, status: string, priority: string }) {
  return (
    <div className="group flex items-center gap-3 rounded-lg p-2 hover:bg-white/5 transition-colors cursor-pointer">
      <div className={`mt-0.5 ${
        status === 'Done' ? 'text-green-500' : 
        status === 'In Progress' ? 'text-blue-500' : 
        'text-gray-500'
      }`}>
        {status === 'Done' ? <CheckCircle2 size={16} /> : 
         status === 'In Progress' ? <Clock size={16} /> : 
         <Circle size={16} />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-huly-text-secondary">{id}</span>
          <span className="truncate text-sm text-huly-text-primary">{title}</span>
        </div>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
          priority === 'High' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
          priority === 'Medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
          'border-blue-500/30 text-blue-400 bg-blue-500/10'
        }`}>
          {priority}
        </span>
      </div>
    </div>
  )
}
