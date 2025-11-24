'use client';

import React from 'react';
import { Activity, Cpu, HardDrive, Zap, Terminal } from 'lucide-react';
import { HudCard } from '@/components/control-center/HudCard';
import { SystemHealthWidget } from '@/components/control-center/SystemHealthWidget';
import { AgentStatusWidget } from '@/components/control-center/AgentStatusWidget';
import { LogViewerWidget } from '@/components/control-center/LogViewerWidget';

export default function ControlCenterPage() {
    return (
        <div className="min-h-screen p-8 space-y-8">
            
            {/* Header Area */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-inter font-thin text-navy-900 tracking-tight">
                        Control <span className="font-bold text-teal-600">Center</span>
                    </h1>
                    <p className="mt-1 font-inter font-light text-sm text-navy-900/60">
                        System monitoring and agent orchestration grid.
                    </p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-teal-50/50 border border-teal-500/10">
                    <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="font-inter font-medium text-xs text-teal-700 uppercase tracking-wider">
                        System Operational
                    </span>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <KpiStat
                    title="CPU Load"
                    value="12%"
                    trend="+2%"
                    icon={Cpu}
                />
                <KpiStat
                    title="Memory"
                    value="4.2 GB"
                    trend="-1%"
                    icon={HardDrive}
                />
                <KpiStat
                    title="Active Agents"
                    value="3"
                    trend="Stable"
                    icon={Zap}
                />
                <KpiStat
                    title="Uptime"
                    value="99.9%"
                    trend="Good"
                    icon={Activity}
                />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid gap-6 lg:grid-cols-3 h-[600px]">

                {/* Left Column: System Health & Agents */}
                <div className="lg:col-span-2 flex flex-col gap-6 h-full">
                    <div className="grid gap-6 md:grid-cols-2 flex-1">
                        <HudCard title="System Health" icon={Activity} className="h-full">
                            <SystemHealthWidget />
                        </HudCard>
                        <HudCard title="Agent Status" icon={Terminal} className="h-full">
                            <AgentStatusWidget />
                        </HudCard>
                    </div>
                    <HudCard title="System Logs" icon={Terminal} className="flex-[1.5] overflow-hidden">
                        <LogViewerWidget />
                    </HudCard>
                </div>

                {/* Right Column: Services */}
                <div className="h-full">
                    <HudCard title="Service Status" icon={Zap} className="h-full">
                        <ServiceControlPanel />
                    </HudCard>
                </div>
            </div>
        </div>
    );
}

function KpiStat({ title, value, trend, icon }: any) {
    return (
        <HudCard title={title} icon={icon} className="min-h-[140px]">
            <div className="flex flex-col justify-end h-full">
                <p className="text-4xl font-inter font-thin text-navy-900 tracking-tighter">
                    {value}
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-inter font-medium text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">
                        {trend}
                    </span>
                    <span className="text-xs font-inter font-light text-navy-900/40">
                        vs last hour
                    </span>
                </div>
            </div>
        </HudCard>
    );
}

function ServiceControlPanel() {
    return (
        <div className="space-y-4">
            <ServiceRow name="Orchestration" status="running" />
            <ServiceRow name="Vector DB" status="running" />
            <ServiceRow name="MCP Server" status="running" />
            <ServiceRow name="Frontend" status="running" />
            <ServiceRow name="Analytics" status="stopped" />
        </div>
    );
}

function ServiceRow({ name, status }: { name: string, status: 'running' | 'stopped' | 'error' }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-navy-900/5 hover:bg-white/10 transition cursor-pointer group">
            <div className="flex items-center gap-3">
                <div className={`h-1.5 w-1.5 rounded-full ${status === 'running' ? 'bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]' : 'bg-red-400'}`} />
                <span className="font-inter font-light text-sm text-navy-900 group-hover:text-teal-700 transition">
                    {name}
                </span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition text-xs font-inter font-medium text-navy-900/40">
                Manage
            </div>
        </div>
    );
}
