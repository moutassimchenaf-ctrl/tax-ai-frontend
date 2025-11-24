'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    User,
    Search,
    FileText,
    LayoutDashboard,
    Bot,
    Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function CommandPalette() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                        {...({} as any)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A]/90 shadow-2xl backdrop-blur-xl"
                    >
                        <Command className="w-full">
                            <div className="flex items-center border-b border-white/10 px-4" cmdk-input-wrapper="">
                                <Search className="mr-2 h-5 w-5 shrink-0 text-white/50" />
                                <Command.Input
                                    placeholder="Type a command or search..."
                                    className="flex h-14 w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/30 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <Command.List className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                <Command.Empty className="py-6 text-center text-sm text-white/50">
                                    No results found.
                                </Command.Empty>

                                <Command.Group heading="Navigation" className="text-xs font-medium text-white/50 px-2 py-1.5">
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/dashboard'))}
                                        className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm text-white outline-none aria-selected:bg-white/10 aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                    >
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                        <span className="ml-auto text-xs tracking-widest text-white/30">⌘D</span>
                                    </Command.Item>

                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/control-center'))}
                                        className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm text-white outline-none aria-selected:bg-white/10 aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                    >
                                        <Terminal className="mr-2 h-4 w-4" />
                                        <span>Control Center</span>
                                        <span className="ml-auto text-xs tracking-widest text-white/30">⌘T</span>
                                    </Command.Item>
                                </Command.Group>

                                <Command.Group heading="Tools" className="text-xs font-medium text-white/50 px-2 py-1.5 mt-2">
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/dashboard/vat-calculator'))}
                                        className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm text-white outline-none aria-selected:bg-white/10 aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                    >
                                        <Calculator className="mr-2 h-4 w-4" />
                                        <span>VAT Calculator</span>
                                    </Command.Item>

                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/dashboard/compliance'))}
                                        className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm text-white outline-none aria-selected:bg-white/10 aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                        <span>Compliance Check</span>
                                    </Command.Item>
                                </Command.Group>

                                <Command.Group heading="System" className="text-xs font-medium text-white/50 px-2 py-1.5 mt-2">
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.push('/settings'))}
                                        className="relative flex cursor-default select-none items-center rounded-lg px-2 py-2 text-sm text-white outline-none aria-selected:bg-white/10 aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                    >
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                        <span className="ml-auto text-xs tracking-widest text-white/30">⌘S</span>
                                    </Command.Item>
                                </Command.Group>
                            </Command.List>

                            <div className="border-t border-white/10 px-4 py-2 text-xs text-white/30 flex justify-between">
                                <span>Use arrow keys to navigate</span>
                                <span>ESC to close</span>
                            </div>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
