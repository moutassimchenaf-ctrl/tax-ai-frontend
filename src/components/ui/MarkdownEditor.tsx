import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bold, Italic, List, Code, Eye, Edit2 } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Write something...",
  className = "" 
}) => {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const insertFormat = (prefix: string, suffix: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newText = `${before}${prefix}${selection}${suffix}${after}`;
    onChange(newText);
    
    // Restore focus and selection (rough approximation)
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  return (
    <div className={`border border-white/10 rounded-lg overflow-hidden bg-white/5 ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => insertFormat('**', '**')}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button 
            onClick={() => insertFormat('*', '*')}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button 
            onClick={() => insertFormat('- ')}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="List"
          >
            <List className="w-4 h-4" />
          </button>
          <button 
            onClick={() => insertFormat('`', '`')}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors"
            title="Code"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center bg-white/10 rounded p-0.5">
          <button 
            onClick={() => setMode('edit')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
              mode === 'edit' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            <Edit2 className="w-3 h-3" />
            Write
          </button>
          <button 
            onClick={() => setMode('preview')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
              mode === 'preview' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" />
            Preview
          </button>
        </div>
      </div>

      {/* Editor / Preview Area */}
      <div className="min-h-[150px]">
        {mode === 'edit' ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full min-h-[150px] p-4 bg-transparent text-white text-sm focus:outline-none resize-y font-mono"
          />
        ) : (
          <div className="p-4 prose prose-invert prose-sm max-w-none">
            <ReactMarkdown>{value || '*Nothing to preview*'}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};
