'use client'

import React, { useState } from 'react'
import { IssueList } from '@/components/issues/IssueList'
import { KanbanBoard } from '@/components/issues/KanbanBoard'
import { IssueDetailPane } from '@/components/issues/IssueDetailPane'
import { LayoutList, Kanban, Plus, Filter, SlidersHorizontal } from 'lucide-react'

export default function IssuesPage() {
  const [view, setView] = useState<'list' | 'board'>('list')
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null)

  // Mock handler to open issue details
  const handleIssueClick = (id: string) => {
    setSelectedIssueId(id)
  }

  return (
    <div className="flex h-full flex-col bg-huly-bg relative">
      {/* Detail Pane Overlay */}
      {selectedIssueId && (
        <>
          <div 
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedIssueId(null)}
          />
          <IssueDetailPane onClose={() => setSelectedIssueId(null)} />
        </>
      )}

      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-huly-border px-4 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-huly-text-primary">Issues</h1>
          
          <div className="h-6 w-px bg-huly-border" />
          
          {/* View Switcher */}
          <div className="flex items-center rounded-lg bg-white/5 p-0.5">
            <button 
              onClick={() => setView('list')}
              className={`flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium transition-colors ${view === 'list' ? 'bg-white/10 text-white' : 'text-huly-text-secondary hover:text-huly-text-primary'}`}
            >
              <LayoutList size={14} />
              List
            </button>
            <button 
              onClick={() => setView('board')}
              className={`flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium transition-colors ${view === 'board' ? 'bg-white/10 text-white' : 'text-huly-text-secondary hover:text-huly-text-primary'}`}
            >
              <Kanban size={14} />
              Board
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-huly-text-primary hover:bg-white/10 transition-colors">
            <Filter size={14} />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1.5 text-xs font-medium text-huly-text-primary hover:bg-white/10 transition-colors">
            <SlidersHorizontal size={14} />
            Display
          </button>
          <button 
            onClick={() => setSelectedIssueId('new')}
            className="flex items-center gap-2 rounded-md bg-huly-accent px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity ml-2"
          >
            <Plus size={14} />
            New Issue
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {view === 'list' ? (
          // @ts-ignore - Passing props to IssueList which might not accept them yet
          <div onClick={() => handleIssueClick('1')}>
             <IssueList />
          </div>
        ) : (
          // @ts-ignore
          <div onClick={() => handleIssueClick('1')}>
            <KanbanBoard />
          </div>
        )}
      </div>
    </div>
  )
}
