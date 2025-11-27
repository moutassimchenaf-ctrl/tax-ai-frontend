'use client'

import React, { useState } from 'react'
import { Send, User } from 'lucide-react'

interface Comment {
  id: string
  user: string
  content: string
  timestamp: string
}

const MOCK_COMMENTS: Comment[] = [
  { id: '1', user: 'MC', content: 'We need to make sure the design aligns with the new brand guidelines.', timestamp: '2h ago' },
  { id: '2', user: 'AI', content: 'Agreed. I have updated the color palette in the config.', timestamp: '1h ago' },
]

export function CommentSection() {
  const [comments, setComments] = useState(MOCK_COMMENTS)
  const [newComment, setNewComment] = useState('')

  const handleSend = () => {
    if (!newComment.trim()) return
    setComments([...comments, {
      id: Date.now().toString(),
      user: 'MC',
      content: newComment,
      timestamp: 'Just now'
    }])
    setNewComment('')
  }

  return (
    <div className="flex flex-col h-full border-l border-huly-border bg-huly-sidebar w-[350px]">
      <div className="p-4 border-b border-huly-border">
        <h3 className="font-semibold text-huly-text-primary">Activity</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-xs font-bold text-white">
              {comment.user}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-huly-text-primary">{comment.user}</span>
                <span className="text-xs text-huly-text-secondary">{comment.timestamp}</span>
              </div>
              <p className="text-sm text-huly-text-secondary leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-huly-border bg-huly-bg">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full rounded-lg border border-huly-border bg-huly-sidebar p-3 pr-10 text-sm text-huly-text-primary placeholder:text-huly-text-secondary focus:border-huly-accent focus:outline-none resize-none h-24"
          />
          <button 
            onClick={handleSend}
            className="absolute bottom-3 right-3 p-1.5 rounded-md bg-huly-accent text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!newComment.trim()}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
