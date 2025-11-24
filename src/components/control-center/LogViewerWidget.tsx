'use client';

import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

interface LogEntry {
    id: string;
    timestamp: string;
    level: 'info' | 'warn' | 'error';
    message: string;
    source: string;
}

export function LogViewerWidget() {
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // Fetch live logs
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch('http://localhost:3008/api/system/logs');
                const newLogs = await res.json();
                setLogs(newLogs);
            } catch (err) {
                // console.error('Failed to fetch logs', err);
                // Mock logs for demo
                const mockLog: LogEntry = {
                    id: Math.random().toString(),
                    timestamp: new Date().toLocaleTimeString(),
                    level: Math.random() > 0.9 ? 'error' : Math.random() > 0.7 ? 'warn' : 'info',
                    message: `System event processed: ${Math.random().toString(36).substring(7)}`,
                    source: 'Orchestrator'
                };
                setLogs(prev => [...prev.slice(-15), mockLog]);
            }
        };

        const interval = setInterval(fetchLogs, 2000);
        fetchLogs(); // Initial fetch

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-full flex-col font-mono text-[10px] md:text-xs">
            {/* Header / Status Line */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-navy-900/5 bg-navy-900/[0.02]">
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-navy-900/50 uppercase tracking-widest">Live Stream</span>
                </div>
                <span className="text-navy-900/30">tail -f /var/log/syslog</span>
            </div>

            {/* Log Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-navy-900/10 scrollbar-track-transparent">
                {logs.map((log) => (
                    <div key={log.id} className="flex gap-3 group hover:bg-navy-900/[0.02] -mx-2 px-2 py-0.5 rounded transition">
                        <span className="text-navy-900/30 select-none w-16 shrink-0">{log.timestamp}</span>
                        <span className={`font-bold uppercase w-12 shrink-0 ${
                            log.level === 'error' ? 'text-red-500' :
                            log.level === 'warn' ? 'text-amber-500' : 'text-teal-600'
                        }`}>
                            {log.level}
                        </span>
                        <span className="text-navy-900/40 w-24 shrink-0 hidden sm:block">[{log.source}]</span>
                        <span className="text-navy-900/80 truncate">{log.message}</span>
                    </div>
                ))}
                <div className="flex items-center gap-2 text-teal-500/50 animate-pulse pt-2">
                    <span>_</span>
                </div>
            </div>
        </div>
    );
}
