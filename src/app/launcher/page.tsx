'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calculator, FileText, LayoutDashboard, Settings, Terminal, Command, Cpu, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAgentState } from '@/components/agent/AgentStateContext';

export default function LauncherPage() {
    const MotionDiv = motion.div as any;
    const [query, setQuery] = useState('');
    const router = useRouter();
    const { setIsThinking } = useAgentState();
    const [mounted, setMounted] = useState(false);
    const [time, setTime] = useState('');

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        return () => clearInterval(timer);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        // Simulate activating agent with query
        setIsThinking(true);
        // In a real app, we'd pass this query to the agent chat
        // For now, let's redirect to dashboard where agent is present
        setTimeout(() => {
            router.push('/dashboard');
            setIsThinking(false);
        }, 500);
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-black">
            {/* Glass Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

            {/* Content Container */}
            <div className="relative flex min-h-screen flex-col items-center justify-center p-4">

                {/* Clock & Status (Top Right) */}
                <div className="absolute top-6 right-6 flex items-center space-x-6 text-white/80">
                    <div className="flex items-center space-x-2">
                        <Cpu className="h-4 w-4" />
                        <span className="text-xs font-medium">12% Load</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4" />
                        <span className="text-xs font-medium">Active</span>
                    </div>
                    <div className="text-xl font-light tracking-widest">{time}</div>
                </div>

                {/* Main Launcher Interface */}
                <MotionDiv
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-3xl"
                >
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
                            <Search className="h-6 w-6 text-white/50 group-focus-within:text-white transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Ask Titan AI or search commands..."
                            className="w-full rounded-2xl border border-white/10 bg-white/10 py-6 pl-16 pr-6 text-2xl font-light text-white placeholder:text-white/30 backdrop-blur-md focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 shadow-2xl transition-all"
                            autoFocus
                        />
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <div className="flex items-center space-x-1 rounded bg-white/10 px-2 py-1 text-xs font-medium text-white/50">
                                <Command className="h-3 w-3" />
                                <span>K</span>
                            </div>
                        </div>
                    </form>

                    {/* Quick Access Grid */}
                    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <QuickLink
                            icon={LayoutDashboard}
                            label="Dashboard"
                            desc="Overview"
                            onClick={() => router.push('/dashboard')}
                            delay={0.1}
                        />
                        <QuickLink
                            icon={Terminal}
                            label="Control Center"
                            desc="System Ops"
                            onClick={() => router.push('/control-center')}
                            delay={0.2}
                        />
                        <QuickLink
                            icon={Calculator}
                            label="VAT Calc"
                            desc="Tools"
                            onClick={() => router.push('/dashboard/vat-calculator')}
                            delay={0.3}
                        />
                        <QuickLink
                            icon={Settings}
                            label="Settings"
                            desc="Config"
                            onClick={() => router.push('/settings')}
                            delay={0.4}
                        />
                    </div>
                </MotionDiv>

                {/* Footer Hint */}
                <MotionDiv
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-8 text-center text-sm text-white/30"
                >
                    Press <span className="font-medium text-white/50">Cmd + K</span> for global commands
                </MotionDiv>

            </div>
        </div>
    );
}

function QuickLink({ icon: Icon, label, desc, onClick, delay }: any) {
    const MotionButton = motion.button as any;
    return (
        <MotionButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.3 }}
            onClick={onClick}
            className="group relative flex flex-col items-start justify-between overflow-hidden rounded-xl border border-white/5 bg-white/5 p-6 text-left backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:-translate-y-1"
        >
            <div className="mb-4 rounded-lg bg-white/10 p-3 text-white group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <h3 className="font-medium text-white">{label}</h3>
                <p className="text-xs text-white/50">{desc}</p>
            </div>
        </MotionButton>
    );
}
