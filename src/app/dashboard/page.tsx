'use client';

import { Hero3D } from '@/components/ui/hero-3d';
import { ToolCard } from '@/components/dashboard/ToolCard';
import { MessageSquare, FileText, BarChart3, Settings, Database, Shield } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const tools = [
        {
            title: 'AI Consultant',
            description: 'Engage with our advanced AI for real-time tax advice and regulatory guidance.',
            icon: MessageSquare,
            href: '/dashboard/conversation',
            color: 'teal' as const,
        },
        {
            title: 'Tax Analysis',
            description: 'Upload documents for deep analysis and compliance verification.',
            icon: FileText,
            href: '/dashboard/tax-analysis',
            color: 'blue' as const,
        },
        {
            title: 'Financial Reports',
            description: 'Generate comprehensive financial reports and visualizations.',
            icon: BarChart3,
            href: '/dashboard/reports',
            color: 'purple' as const,
        },
        {
            title: 'Knowledge Base',
            description: 'Access the complete library of UAE tax laws and regulations.',
            icon: Database,
            href: '/dashboard/knowledge',
            color: 'amber' as const,
        },
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" />
            
            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center rounded-full border border-teal-500/20 bg-teal-500/5 px-3 py-1 text-xs font-medium text-teal-600 backdrop-blur-sm">
                            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
                            System Online v2.1.0
                        </div>
                        <h1 className="font-inter text-4xl font-light tracking-tight text-navy-900 sm:text-5xl">
                            Welcome back, <span className="font-semibold text-teal-600">Commander</span>
                        </h1>
                        <p className="max-w-lg font-inter text-lg font-light text-navy-900/60">
                            Your central command for AI-driven tax analysis and financial intelligence. Select a module to begin.
                        </p>
                    </div>
                    
                    {/* 3D Element Container */}
                    <div className="relative h-[300px] w-full lg:h-[400px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 blur-3xl rounded-full opacity-50" />
                        <Hero3D />
                    </div>
                </div>

                {/* Tools Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {tools.map((tool, index) => (
                        <ToolCard
                            key={tool.title}
                            {...tool}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Secondary Section */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                    <Link href="/dashboard/settings" className="block">
                        <div className="group relative overflow-hidden rounded-2xl border border-navy-900/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
                            <div className="flex items-center gap-4">
                                <div className="rounded-lg bg-navy-900/5 p-3 text-navy-900">
                                    <Settings className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-inter font-medium text-navy-900">System Configuration</h3>
                                    <p className="text-sm text-navy-900/50">Manage API keys and preferences</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className="group relative overflow-hidden rounded-2xl border border-navy-900/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10">
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-navy-900/5 p-3 text-navy-900">
                                <Shield className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-inter font-medium text-navy-900">Security Status</h3>
                                <p className="text-sm text-navy-900/50">All systems operational and secure</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
