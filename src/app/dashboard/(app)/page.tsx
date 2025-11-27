'use client'

import React from 'react'

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-huly-text-primary mb-4">Good morning, Moutassim</h1>
      <p className="text-huly-text-secondary">Here is what's happening in your workspace today.</p>
      
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Widget 1: My Issues */}
        <div className="rounded-xl border border-huly-border bg-huly-sidebar p-6">
          <h3 className="text-lg font-semibold text-huly-text-primary mb-4">My Issues</h3>
          <div className="flex flex-col gap-3">
            <IssueItem title="Fix navigation bug" status="In Progress" />
            <IssueItem title="Update documentation" status="Todo" />
            <IssueItem title="Review PR #123" status="Done" />
          </div>
        </div>

        {/* Widget 2: Activity */}
        <div className="rounded-xl border border-huly-border bg-huly-sidebar p-6">
          <h3 className="text-lg font-semibold text-huly-text-primary mb-4">Activity</h3>
          <div className="text-sm text-huly-text-secondary">
            No recent activity.
          </div>
        </div>
      </div>
    </div>
  )
}

function IssueItem({ title, status }: { title: string, status: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/5 p-3 hover:bg-white/10 transition-colors cursor-pointer">
      <span className="text-sm font-medium text-huly-text-primary">{title}</span>
      <span className={`text-xs px-2 py-1 rounded-full ${
        status === 'Done' ? 'bg-green-500/20 text-green-400' :
        status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
        'bg-gray-500/20 text-gray-400'
      }`}>
        {status}
      </span>
    </div>
  )
}
