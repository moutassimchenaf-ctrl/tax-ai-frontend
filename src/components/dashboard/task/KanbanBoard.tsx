import React from 'react';
import { 
  DndContext, 
  DragOverlay, 
  useDraggable, 
  useDroppable,
  DragEndEvent,
  DragStartEvent
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoreHorizontal, Plus } from 'lucide-react';

// Types (Shared with IssueList ideally)
interface Issue {
  id: string;
  identifier: string;
  title: string;
  status: { id: string; name: string; color: string; category: string };
  priority: string;
  assignee?: { name: string | null; avatarUrl?: string | null } | null;
}

interface Column {
  id: string;
  title: string;
  color: string;
  issues: Issue[];
}

interface KanbanBoardProps {
  columns: Column[];
  onDragEnd: (event: DragEndEvent) => void;
  onIssueClick: (issue: Issue) => void;
}

// Draggable Issue Card
const IssueCard = ({ issue, onClick }: { issue: Issue; onClick: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issue.id,
    data: { issue }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className="bg-[#0A1628] border border-white/10 p-3 rounded-lg shadow-sm hover:border-[#0898BB]/50 cursor-grab active:cursor-grabbing group mb-3"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-mono text-[10px] text-white/40">{issue.identifier}</span>
        <button className="text-white/20 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <h4 className="text-sm font-medium text-white/90 mb-3 leading-tight">{issue.title}</h4>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
           {/* Priority Dot */}
           <div className={`w-2 h-2 rounded-full ${
             issue.priority === 'URGENT' ? 'bg-red-500' : 
             issue.priority === 'HIGH' ? 'bg-orange-500' : 'bg-blue-500'
           }`} />
        </div>
        {issue.assignee && (
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0898BB] to-[#06708a] flex items-center justify-center text-[8px] font-bold text-white">
            {issue.assignee.name?.charAt(0) || '?'}
          </div>
        )}
      </div>
    </div>
  );
};

// Droppable Column
const KanbanColumn = ({ column, onIssueClick }: { column: Column; onIssueClick: (i: Issue) => void }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col min-w-[280px] w-[280px] h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: column.color }} />
          <h3 className="text-sm font-medium text-white/80">{column.title}</h3>
          <span className="text-xs text-white/40 font-mono">{column.issues.length}</span>
        </div>
        <button className="text-white/40 hover:text-white transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Drop Area */}
      <div 
        ref={setNodeRef}
        className="flex-1 bg-white/[0.02] rounded-xl p-2 border border-white/5 overflow-y-auto"
      >
        {column.issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} onClick={() => onIssueClick(issue)} />
        ))}
      </div>
    </div>
  );
};

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, onDragEnd, onIssueClick }) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [activeIssue, setActiveIssue] = React.useState<Issue | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveIssue(event.active.data.current?.issue);
  };

  const handleDragEndWrapper = (event: DragEndEvent) => {
    setActiveId(null);
    setActiveIssue(null);
    onDragEnd(event);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEndWrapper}>
      <div className="flex h-full gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <KanbanColumn key={col.id} column={col} onIssueClick={onIssueClick} />
        ))}
      </div>
      
      <DragOverlay>
        {activeIssue ? (
           <div className="bg-[#0A1628] border border-[#0898BB] p-3 rounded-lg shadow-2xl w-[260px] opacity-90 rotate-3 cursor-grabbing">
              <div className="flex justify-between items-start mb-2">
                <span className="font-mono text-[10px] text-white/40">{activeIssue.identifier}</span>
              </div>
              <h4 className="text-sm font-medium text-white/90 mb-3">{activeIssue.title}</h4>
           </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
