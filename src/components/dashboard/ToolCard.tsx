'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ToolCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    color?: 'teal' | 'blue' | 'purple' | 'amber';
    delay?: number;
}

export function ToolCard({
    title,
    description,
    icon: Icon,
    href,
    color = 'teal',
    delay = 0
}: ToolCardProps) {
    
    const colorMap: Record<NonNullable<ToolCardProps['color']>, { bg: string; text: string; border: string; glow: string }> = {
        teal: {
            bg: 'bg-teal-500/10',
            text: 'text-teal-600',
            border: 'border-teal-500/20',
            glow: 'group-hover:shadow-teal-500/20'
        },
        blue: {
            bg: 'bg-blue-500/10',
            text: 'text-blue-600',
            border: 'border-blue-500/20',
            glow: 'group-hover:shadow-blue-500/20'
        },
        purple: {
            bg: 'bg-purple-500/10',
            text: 'text-purple-600',
            border: 'border-purple-500/20',
            glow: 'group-hover:shadow-purple-500/20'
        },
        amber: {
            bg: 'bg-amber-500/10',
            text: 'text-amber-600',
            border: 'border-amber-500/20',
            glow: 'group-hover:shadow-amber-500/20'
        }
    };

    const colors = colorMap[color];
    const MotionDiv = motion.div as any;

    return (
        <Link href={href} className="block h-full">
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.4 }}
                className={cn(
                    "group relative h-full overflow-hidden rounded-2xl border bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10",
                    colors.border,
                    "hover:shadow-xl",
                    colors.glow
                )}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between">
                        <div className={cn("rounded-xl p-3 transition-colors duration-300", colors.bg)}>
                            <Icon className={cn("h-6 w-6", colors.text)} />
                        </div>
                        <div className="rounded-full border border-white/10 bg-white/5 p-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                            <ArrowRight className="h-4 w-4 text-navy-900/50" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="mb-2 font-inter text-lg font-medium text-navy-900">
                            {title}
                        </h3>
                        <p className="font-inter text-sm font-light leading-relaxed text-navy-900/60">
                            {description}
                        </p>
                    </div>

                    {/* Footer / Status */}
                    <div className="mt-6 flex items-center gap-2">
                        <div className={cn("h-1.5 w-1.5 rounded-full animate-pulse", colors.bg.replace('/10', ''))} />
                        <span className="font-inter text-xs font-medium uppercase tracking-wider text-navy-900/40">
                            Ready to Launch
                        </span>
                    </div>
                </div>
            </MotionDiv>
        </Link>
    );
}
