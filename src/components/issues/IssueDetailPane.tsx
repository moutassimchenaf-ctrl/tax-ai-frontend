'use client'

import React from 'react'
import { X, MoreHorizontal, Calendar, User, Tag, CheckCircle2 } from 'lucide-react'
import { CommentSection } from '@/components/collaboration/CommentSection'
import { UserPresence } from '@/components/collaboration/UserPresence'

export function IssueDetailPane({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-y-0 right-0 z-40 flex w-[900px] shadow-2xl animate-in slide-in-from-right duration-300">
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-huly-bg border-l border-huly-border">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-huly-border px-6 py-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-huly-text-secondary">TIT-101</span>
            <div className="flex items-center gap-2 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 border border-blue-500/20">
              <CheckCircle2 size={12} />
              In Progress
            </div>
          </div>
          <div className="flex items-center gap-4">
            <UserPresence />
            <div className="h-4 w-px bg-huly-border" />
            <button className="text-huly-text-secondary hover:text-huly-text-primary">
              <MoreHorizontal size={20} />
            </button>
            <button onClick={onClose} className="text-huly-text-secondary hover:text-huly-text-primary">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-bold text-huly-text-primary mb-6">Implement Authentication Flow</h1>
          
          <div className="prose prose-invert max-w-none text-huly-text-secondary">
            <p>
              We need to implement the full authentication flow using Supabase Auth. This includes:
            </p>
            <ul>
              <li>Sign Up / Sign In pages</li>
              <li>OAuth providers (GitHub, Google)</li>
              <li>Protected routes middleware</li>
              <li>Session management</li>
            </ul>
            <p>
              Please ensure the design matches the Figma mockups for the login screen.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-8 border-t border-huly-border pt-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-huly-text-primary">Properties</h3>
              <div className="grid grid-cols-[100px_1fr] gap-y-3 text-sm">
                <div className="text-huly-text-secondary flex items-center gap-2"><User size={14}/> Assignee</div>
                <div className="flex items-center gap-2 text-huly-text-primary">
                  <div className="h-5 w-5 rounded-full bg-purple-500 text-[10px] flex items-center justify-center text-white font-bold">MC</div>
                  Moutassim
                </div>

                <div className="text-huly-text-secondary flex items-center gap-2"><Calendar size={14}/> Due Date</div>
                <div className="text-huly-text-primary">Tomorrow</div>

                <div className="text-huly-text-secondary flex items-center gap-2"><Tag size={14}/> Labels</div>
                <div className="flex gap-2">
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-huly-text-secondary">Backend</span>
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-huly-text-secondary">Auth</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar (Comments) */}
      <CommentSection />
    </div>
  )
}
