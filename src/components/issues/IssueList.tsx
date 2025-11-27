'use client'

import React from 'react'
import { CheckCircle2, Circle, Clock, MoreHorizontal, User as UserIcon } from 'lucide-react'

// Mock Data Type
interface Issue {
  id: string
  identifier: string
  title: string
  status: 'Todo' | 'In Progress' | 'Done'
  priority: 'Low' | 'Medium' | 'High'
  assignee?: string
  dueDate?: string
}

const MOCK_ISSUES: Issue[] = [
  { id: '1', identifier: 'TIT-101', title: 'Implement Authentication Flow', status: 'In Progress', priority: 'High', assignee: 'MC', dueDate: 'Tomorrow' },
  { id: '2', identifier: 'TIT-102', title: 'Design Dashboard Layout', status: 'Done', priority: 'Medium', assignee: 'MC', dueDate: 'Today' },
  { id: '3', identifier: 'TIT-103', title: 'Setup Prisma Schema', status: 'Done', priority: 'High', assignee: 'MC' },
  { id: '4', identifier: 'TIT-104', title: 'Create Kanban Board Component', status: 'Todo', priority: 'Medium' },
  { id: '5', identifier: 'TIT-105', title: 'Fix Mobile Responsiveness', status: 'Todo', priority: 'Low', dueDate: 'Next Week' },
]

export function IssueList() {
  return (
    <div className="flex flex-col h-full bg-huly-bg text-huly-text-primary">
      {/* Header */}
      <div className="grid grid-cols-[100px_1fr_120px_100px_100px_100px] gap-4 border-b border-huly-border px-4 py-2 text-xs font-medium text-huly-text-secondary uppercase tracking-wider">
        <div>ID</div>
        <div>Title</div>
        <div>Status</div>
        <div>Priority</div>
        <div>Assignee</div>
        <div>Due Date</div>
      </div>

      {/* List Items */}
      <div className="flex-1 overflow-auto">
        {MOCK_ISSUES.map((issue) => (
          <div 
            key={issue.id}
            className="group grid grid-cols-[100px_1fr_120px_100px_100px_100px] gap-4 border-b border-huly-border/50 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors cursor-pointer items-center"
          >
            <div className="font-mono text-xs text-huly-text-secondary">{issue.identifier}</div>
            <div className="font-medium text-huly-text-primary truncate">{issue.title}</div>
            
            {/* Status */}
            <div className="flex items-center gap-2">
              {issue.status === 'Done' ? <CheckCircle2 size={14} className="text-green-500" /> :
               issue.status === 'In Progress' ? <Clock size={14} className="text-blue-500" /> :
               <Circle size={14} className="text-gray-500" />}
              <span className="text-xs">{issue.status}</span>
            </div>

            {/* Priority */}
            <div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                issue.priority === 'High' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                issue.priority === 'Medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                'border-blue-500/30 text-blue-400 bg-blue-500/10'
              }`}>
                {issue.priority}
              </span>
            </div>

            {/* Assignee */}
            <div className="flex items-center">
              {issue.assignee ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-[10px] font-bold text-white">
                  {issue.assignee}
                </div>
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-huly-text-secondary text-huly-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                  <UserIcon size={12} />
                </div>
              )}
            </div>

            {/* Due Date */}
            <div className="text-xs text-huly-text-secondary">
              {issue.dueDate || '-'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
