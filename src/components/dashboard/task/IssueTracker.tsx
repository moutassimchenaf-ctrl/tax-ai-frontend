import React, { useState } from 'react';
import { LayoutGrid, List, Plus, Filter, Search, Loader2 } from 'lucide-react';
import { IssueList } from './IssueList';
import { KanbanBoard } from './KanbanBoard';
import { IssueModal } from './IssueModal';
import { DragEndEvent } from '@dnd-kit/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getIssues, updateIssueStatus } from '@/app/actions';
import { toast } from 'react-hot-toast';
import { KanbanColumnSkeleton } from '@/components/ui/LoadingSkeleton';

// Mock Columns (Status IDs should match database seeds)
const COLUMNS = [
  { id: 's3', title: 'Backlog', color: '#6B7280', category: 'todo' },
  { id: 's2', title: 'In Progress', color: '#F59E0B', category: 'in_progress' },
  { id: 's1', title: 'Done', color: '#10B981', category: 'done' },
];

export const IssueTracker = () => {
  const [view, setView] = useState<'list' | 'board'>('board');
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const queryClient = useQueryClient();

  // Fetch Issues
  const { data: issuesData, isLoading } = useQuery({
    queryKey: ['issues'],
    queryFn: async () => {
      const res = await getIssues();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  // Update Status Mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ issueId, statusId }: { issueId: string; statusId: string }) => {
      const res = await updateIssueStatus(issueId, statusId);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      toast.success('Issue updated');
    },
    onError: () => {
      toast.error('Failed to update issue');
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const issueId = active.id as string;
      const newStatusId = over.id as string;
      
      // Optimistic Update (Optional, but good UX)
      // For now, we rely on the mutation to refresh data
      updateStatusMutation.mutate({ issueId, statusId: newStatusId });
    }
  };

  const issues = issuesData || [];

  const columns = COLUMNS.map(col => ({
    ...col,
    // Map status names/IDs from DB to columns. 
    // Note: In a real app, fetch statuses from DB too.
    // Here we assume simple mapping or filter by status.name/id
    issues: issues.filter((i: any) => i.statusId === col.id || i.status?.id === col.id)
  }));

  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full bg-[#0A1628] p-6 overflow-hidden">
        {/* Skeleton Header */}
        <div className="flex items-center justify-between mb-6">
           <div className="h-8 w-32 bg-white/5 rounded animate-pulse" />
           <div className="h-8 w-64 bg-white/5 rounded animate-pulse" />
        </div>
        {/* Skeleton Board */}
        <div className="flex gap-6 h-full overflow-hidden">
          <KanbanColumnSkeleton />
          <KanbanColumnSkeleton />
          <KanbanColumnSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#0A1628]">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-white">Issues</h2>
          <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded ${view === 'list' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('board')}
              className={`p-1.5 rounded ${view === 'board' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text" 
              placeholder="Search issues..." 
              className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-[#0898BB]"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#0898BB] hover:bg-[#06708a] rounded-lg text-sm text-white font-medium transition-colors">
            <Plus className="w-4 h-4" />
            New Issue
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden p-6">
        {view === 'list' ? (
          <IssueList issues={issues} onIssueClick={setSelectedIssue} />
        ) : (
          <KanbanBoard 
            columns={columns} 
            onDragEnd={handleDragEnd}
            onIssueClick={setSelectedIssue}
          />
        )}
      </div>

      {/* Modal */}
      <IssueModal 
        issue={selectedIssue} 
        isOpen={!!selectedIssue} 
        onClose={() => setSelectedIssue(null)} 
      />
    </div>
  );
};
