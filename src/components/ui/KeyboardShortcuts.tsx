'use client';

import React, { useEffect, useState } from 'react';
import { X, Command, Keyboard } from 'lucide-react';

export const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '?' && e.shiftKey) {
        setIsOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Cmd + K', desc: 'Open Command Palette' },
    { key: 'Shift + ?', desc: 'Show Keyboard Shortcuts' },
    { key: 'Esc', desc: 'Close Modal / Clear Selection' },
    { key: 'Cmd + /', desc: 'Toggle Sidebar' },
    { key: 'C', desc: 'Create New Issue' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#0A1628] border border-white/10 w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-white/60" />
            <h3 className="font-semibold text-white">Keyboard Shortcuts</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-2">
          {shortcuts.map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
              <span className="text-sm text-white/70">{s.desc}</span>
              <kbd className="px-2 py-1 bg-white/10 border border-white/10 rounded text-xs font-mono text-white/90 min-w-[24px] text-center">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
