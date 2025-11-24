'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    MessageSquare,
    ImageIcon,
    VideoIcon,
    Music,
    Code,
    Settings,
    Terminal,
    Shield,
    Activity
} from 'lucide-react';

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500',
    },
    {
        label: 'Control Center',
        icon: Terminal,
        href: '/control-center',
        color: 'text-teal-500',
    },
    {
        label: 'Conversation',
        icon: MessageSquare,
        href: '/dashboard/conversation',
        color: 'text-violet-500',
    },
    {
        label: 'Tax Analysis',
        icon: Code,
        href: '/dashboard/tax-analysis',
        color: 'text-emerald-500',
    },
    {
        label: 'Documents',
        icon: ImageIcon,
        href: '/dashboard/documents',
        color: 'text-pink-700',
    },
    {
        label: 'Settings',
        icon: Settings,
        href: '/settings',
        color: 'text-gray-400', // Neutral for settings
    },
];

export function GlassSidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-white/10 backdrop-blur-xl border-r border-navy-900/10 text-navy-900">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        {/* Logo Placeholder - Replace with actual logo if available */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-navy-900 to-teal-500 rounded-lg opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">T</div>
                    </div>
                    <h1 className="text-2xl font-thin tracking-tighter text-navy-900">
                        Titan<span className="font-bold text-teal-600">AI</span>
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-teal-600 hover:bg-teal-50/50 rounded-lg transition",
                                pathname === route.href ? "text-teal-600 bg-teal-50/80" : "text-navy-900/70"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                <span className="font-inter font-light tracking-wide">{route.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            
            {/* System Status Footer */}
            <div className="px-3 py-4 border-t border-navy-900/5">
                <div className="flex items-center gap-3 px-3">
                    <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-xs font-inter font-light text-navy-900/50">System Operational</span>
                </div>
            </div>
        </div>
    );
}
