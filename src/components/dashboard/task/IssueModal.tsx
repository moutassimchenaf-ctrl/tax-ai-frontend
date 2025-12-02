import React, { useState } from 'react';
import { X, Calendar, User, Tag, CheckCircle2, Clock, AlertCircle, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { MarkdownEditor } from '@/components/ui/MarkdownEditor';

// Types (Shared)
interface Issue {
  id: string;
  identifier: string;
  title: string;
  description?: string;
  status: { name: string; color: string; category: string };
  priority: string;
  assignee?: { name: string; avatarUrl?: string };
  dueDate?: Date;
}

interface IssueModalProps {
  issue: Issue | null;
  isOpen: boolean;
  onClose: () => void;
}

export const IssueModal: React.FC<IssueModalProps> = ({ issue, isOpen, onClose }) => {
  const [comment, setComment] = useState('');

  if (!isOpen || !issue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0A1628] border border-white/10 w-full max-w-3xl h-[80vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-white/40">{issue.identifier}</span>
            <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: issue.status.color }} />
              <span className="text-xs font-medium text-white/80">{issue.status.name}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Column */}
          <div className="flex-1 p-8 overflow-y-auto border-r border-white/10">
            <h1 className="text-2xl font-bold text-white mb-6">{issue.title}</h1>
            
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-white/70 leading-relaxed">
                {issue.description || "No description provided."}
              </p>
            </div>

            {/* Activity / Comments Placeholder */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-4">Activity</h3>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0898BB] to-[#06708a] flex-shrink-0" />
                <div className="flex-1">
                  <MarkdownEditor 
                    value={comment} 
                    onChange={setComment} 
                    placeholder="Leave a comment..." 
                    className="mb-3"
                  />
                  <div className="flex justify-end">
                    <button className="px-4 py-2 bg-[#0898BB] text-white text-sm font-medium rounded-lg hover:bg-[#06708a] transition-colors">
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="w-80 bg-white/[0.02] p-6 overflow-y-auto">
            <div className="space-y-6">
              
              {/* Assignee */}
              <div>
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider block mb-2">Assignee</label>
                <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors group">
                  {issue.assignee ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0898BB] to-[#06708a] flex items-center justify-center text-[10px] font-bold text-white">
                        {issue.assignee.name.charAt(0)}
                      </div>
                      <span className="text-sm text-white/80 group-hover:text-white">{issue.assignee.name}</span>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-white/40 group-hover:text-white/60">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Unassigned</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider block mb-2">Priority</label>
                <div className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                  <AlertCircle className={`w-4 h-4 ${
                    issue.priority === 'URGENT' ? 'text-red-500' : 
                    issue.priority === 'HIGH' ? 'text-orange-500' : 'text-blue-500'
                  }`} />
                  <span className="text-sm text-white/80 capitalize">{issue.priority.toLowerCase()}</span>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider block mb-2">Due Date</label>
                <div className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors text-white/60 hover:text-white">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {issue.dueDate ? format(issue.dueDate, 'MMM d, yyyy') : 'No due date'}
                  </span>
                </div>
              </div>

              {/* Labels */}
              <div>
                <label className="text-xs font-bold text-white/40 uppercase tracking-wider block mb-2">Labels</label>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs border border-blue-500/30">
                    <Tag className="w-3 h-3" />
                    Frontend
                  </div>
                  <button className="text-xs text-white/40 hover:text-white flex items-center gap-1 px-2 py-1 rounded border border-white/10 hover:bg-white/5 transition-colors">
                    + Add
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
