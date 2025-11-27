'use client'

import React from 'react'
import { MoreHorizontal, Plus } from 'lucide-react'

// Mock Data (Shared with IssueList for now)
const COLUMNS = [
  { id: 'todo', title: 'Todo', color: 'bg-gray-500' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500' },
  { id: 'done', title: 'Done', color: 'bg-green-500' },
]

const MOCK_ISSUES = [
  { id: '1', identifier: 'TIT-101', title: 'Implement Authentication Flow', status: 'In Progress', priority: 'High', assignee: 'MC' },
  { id: '2', identifier: 'TIT-102', title: 'Design Dashboard Layout', status: 'Done', priority: 'Medium', assignee: 'MC' },
  { id: '3', identifier: 'TIT-103', title: 'Setup Prisma Schema', status: 'Done', priority: 'High', assignee: 'MC' },
  { id: '4', identifier: 'TIT-104', title: 'Create Kanban Board Component', status: 'Todo', priority: 'Medium' },
  { id: '5', identifier: 'TIT-105', title: 'Fix Mobile Responsiveness', status: 'Todo', priority: 'Low' },
]

export function KanbanBoard() {
  return (
    <div className="flex h-full overflow-x-auto p-6 bg-huly-bg">
      <div className="flex gap-6 min-w-full">
        {COLUMNS.map((col) => (
          <div key={col.id} className="flex h-full w-[300px] min-w-[300px] flex-col rounded-xl bg-huly-sidebar border border-huly-border/50">
            {/* Column Header */}
            <div className="flex items-center justify-between p-3 border-b border-huly-border/50">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${col.color}`} />
                <span className="text-sm font-medium text-huly-text-primary">{col.title}</span>
                <span className="text-xs text-huly-text-secondary">
                  {MOCK_ISSUES.filter(i => i.status.toLowerCase().replace(' ', '-') === col.id).length}
                </span>
              </div>
              <div className="flex gap-1">
                <button className="p-1 text-huly-text-secondary hover:text-huly-text-primary hover:bg-white/5 rounded">
                  <Plus size={14} />
                </button>
                <button className="p-1 text-huly-text-secondary hover:text-huly-text-primary hover:bg-white/5 rounded">
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>

            {/* Column Content */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {MOCK_ISSUES
                .filter(issue => {
                  const statusMap: Record<string, string> = { 'Todo': 'todo', 'In Progress': 'in-progress', 'Done': 'done' }
                  return statusMap[issue.status] === col.id
                })
                .map((issue) => (
                  <KanbanCard key={issue.id} issue={issue} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function KanbanCard({ issue }: { issue: any }) {
  return (
    <div className="group flex flex-col gap-2 rounded-lg border border-huly-border bg-huly-bg p-3 shadow-sm hover:border-huly-accent/50 hover:shadow-md transition-all cursor-grab active:cursor-grabbing">
      <div className="flex items-start justify-between">
        <span className="text-xs font-mono text-huly-text-secondary">{issue.identifier}</span>
        <button className="opacity-0 group-hover:opacity-100 text-huly-text-secondary hover:text-huly-text-primary">
          <MoreHorizontal size={14} />
        </button>
      </div>
      
      <h4 className="text-sm font-medium text-huly-text-primary leading-tight">
        {issue.title}
      </h4>

      <div className="flex items-center justify-between mt-1">
        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
          issue.priority === 'High' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
          issue.priority === 'Medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
          'border-blue-500/30 text-blue-400 bg-blue-500/10'
        }`}>
          {issue.priority}
        </span>

        {issue.assignee && (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-[9px] font-bold text-white">
            {issue.assignee}
          </div>
        )}
      </div>
    </div>
  )
}
