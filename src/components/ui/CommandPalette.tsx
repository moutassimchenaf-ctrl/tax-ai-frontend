'use client';

import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Search, Plus, User, FileText, Settings, LogOut, LayoutGrid } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();

  // Toggle with Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[20vh]">
      <div className="w-full max-w-2xl bg-[#0A1628] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <Command className="w-full bg-transparent">
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="w-5 h-5 text-white/40 mr-3" />
            <Command.Input 
              placeholder="Type a command or search..." 
              className="w-full h-14 bg-transparent text-white placeholder:text-white/40 focus:outline-none text-lg font-medium"
            />
          </div>
          
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-white/40">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs font-bold text-white/30 uppercase tracking-wider mb-2 px-2">
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/dashboard'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:bg-white/5 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Dashboard</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/dashboard/issues'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:bg-white/5 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <FileText className="w-4 h-4" />
                <span>Issues</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => router.push('/settings'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:bg-white/5 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Actions" className="text-xs font-bold text-white/30 uppercase tracking-wider mb-2 px-2 mt-4">
              <Command.Item 
                onSelect={() => runCommand(() => console.log('New Issue'))}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:bg-white/5 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Issue</span>
              </Command.Item>
              <Command.Item 
                onSelect={() => runCommand(() => signOut())}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:bg-white/5 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Team" className="text-xs font-bold text-white/30 uppercase tracking-wider mb-2 px-2 mt-4">
              <Command.Item 
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:bg-white/5 hover:text-white cursor-pointer transition-colors aria-selected:bg-white/10 aria-selected:text-white"
              >
                <User className="w-4 h-4" />
                <span>Invite Member...</span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
};
