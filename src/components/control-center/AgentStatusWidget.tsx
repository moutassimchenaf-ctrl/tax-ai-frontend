'use client';

import React from 'react';
import { Bot, BrainCircuit, MessageSquare } from 'lucide-react';
import { useAgentState } from '../agent/AgentStateContext';

export function AgentStatusWidget() {
    // In a real app, we'd fetch this from the backend
    // For now, we can use the context to show real-time "thinking" state
    const { isThinking } = useAgentState();

    return (
        <div className="space-y-4">
            {/* Active Agent Card */}
            <div className="flex items-center justify-between rounded-lg bg-teal-50/30 border border-teal-500/10 p-4 relative overflow-hidden group">
                {/* Holographic Scan Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
                
                <div className="flex items-center space-x-3 relative z-10">
                    <div className="rounded-lg bg-teal-100/50 p-2 text-teal-700 border border-teal-200/50">
                        <Bot className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="font-inter font-medium text-sm text-navy-900">Ultra Super Agent</p>
                        <p className="font-inter font-light text-xs text-navy-900/50">v2.1.0 (Kimi/GLM)</p>
                    </div>
                </div>
                <div className={`flex items-center space-x-2 rounded-full px-2.5 py-1 text-xs font-medium border ${isThinking ? 'bg-amber-50 text-amber-700 border-amber-200/50' : 'bg-teal-50 text-teal-700 border-teal-200/50'}`}>
                    <div className={`h-1.5 w-1.5 rounded-full ${isThinking ? 'bg-amber-500 animate-pulse' : 'bg-teal-500'}`} />
                    <span className="font-inter">{isThinking ? 'Processing...' : 'Online'}</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-navy-900/5 bg-white/5 p-3 hover:bg-white/10 transition">
                    <div className="flex items-center space-x-2 text-navy-900/50 mb-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-inter font-medium uppercase tracking-wider">Messages</span>
                    </div>
                    <p className="text-xl font-inter font-light text-navy-900">142</p>
                </div>
                <div className="rounded-lg border border-navy-900/5 bg-white/5 p-3 hover:bg-white/10 transition">
                    <div className="flex items-center space-x-2 text-navy-900/50 mb-1">
                        <BrainCircuit className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-inter font-medium uppercase tracking-wider">Tools</span>
                    </div>
                    <p className="text-xl font-inter font-light text-navy-900">89</p>
                </div>
            </div>
        </div>
    );
}
