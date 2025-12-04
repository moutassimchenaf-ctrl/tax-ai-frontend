import React from 'react';
import { format } from 'date-fns';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  MoreHorizontal 
} from 'lucide-react';

// Temporary types until Prisma types are generated/imported
interface Issue {
  id: string;
  identifier: string;
  title: string;
  status: { name: string; color: string; category: string };
  priority: string;
  assignee?: { name: string | null; avatarUrl?: string | null } | null;
  dueDate?: Date | null;
}

interface IssueListProps {
  issues: Issue[];
  onIssueClick: (issue: Issue) => void;
}

export const IssueList: React.FC<IssueListProps> = ({ issues, onIssueClick }) => {
  
  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'high': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'medium': return <Circle className="w-4 h-4 text-yellow-500" />;
      default: return <Circle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'done': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#0A1628] rounded-lg border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-xs font-mono text-white/50 uppercase tracking-wider bg-white/5">
        <div className="col-span-6">Title</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Priority</div>
        <div className="col-span-2">Assignee</div>
      </div>

      {/* List Items */}
      <div className="flex-1 overflow-y-auto max-h-[600px]">
        {issues.map((issue) => (
          <div 
            key={issue.id}
            onClick={() => onIssueClick(issue)}
            className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors items-center group"
          >
            {/* Title & ID */}
            <div className="col-span-6 flex items-center gap-3">
              <span className="font-mono text-xs text-white/40">{issue.identifier}</span>
              <span className="text-sm font-medium text-white/90 group-hover:text-[#0898BB] transition-colors">
                {issue.title}
              </span>
            </div>

            {/* Status */}
            <div className="col-span-2 flex items-center gap-2">
              {getStatusIcon(issue.status.category)}
              <span 
                className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10"
                style={{ color: issue.status.color }}
              >
                {issue.status.name}
              </span>
            </div>

            {/* Priority */}
            <div className="col-span-2 flex items-center gap-2">
              {getPriorityIcon(issue.priority)}
              <span className="text-xs text-white/60 capitalize">{issue.priority.toLowerCase()}</span>
            </div>

            {/* Assignee */}
            <div className="col-span-2 flex items-center gap-2">
              {issue.assignee ? (
                <>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0898BB] to-[#06708a] flex items-center justify-center text-[10px] font-bold text-white">
                    {issue.assignee.name?.charAt(0) || '?'}
                  </div>
                  <span className="text-xs text-white/60 truncate">{issue.assignee.name || 'Unknown'}</span>
                </>
              ) : (
                <span className="text-xs text-white/30 italic">Unassigned</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
