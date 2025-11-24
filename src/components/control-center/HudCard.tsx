'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface HudCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: React.ElementType;
    accentColor?: 'teal' | 'navy' | 'white';
}

export function HudCard({ 
    children, 
    className, 
    title, 
    icon: Icon,
    accentColor = 'teal' 
}: HudCardProps) {
    const MotionDiv = motion.div as any;
    
    const borderColors: Record<string, string> = {
        teal: 'border-teal-500/20',
        navy: 'border-navy-900/10',
        white: 'border-white/20'
    };

    const accentColors: Record<string, string> = {
        teal: 'bg-teal-500',
        navy: 'bg-navy-900',
        white: 'bg-white'
    };

    return (
        <MotionDiv 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "relative overflow-hidden rounded-xl border bg-white/5 backdrop-blur-sm p-6",
                borderColors[accentColor],
                className
            )}
        >
            {/* Corner Accents (HUD Style) */}
            <div className={cn("absolute top-0 left-0 h-8 w-[1px]", accentColors[accentColor], "opacity-20")} />
            <div className={cn("absolute top-0 left-0 h-[1px] w-8", accentColors[accentColor], "opacity-20")} />
            <div className={cn("absolute bottom-0 right-0 h-8 w-[1px]", accentColors[accentColor], "opacity-20")} />
            <div className={cn("absolute bottom-0 right-0 h-[1px] w-8", accentColors[accentColor], "opacity-20")} />

            {/* Header */}
            {(title || Icon) && (
                <div className="flex items-center gap-3 mb-4">
                    {Icon && (
                        <div className={cn("p-1.5 rounded-md bg-white/5 border border-white/10")}>
                            {/* @ts-ignore */}
                            <Icon className="w-4 h-4 text-navy-900/70" />
                        </div>
                    )}
                    {title && (
                        <h3 className="font-inter font-medium text-sm text-navy-900/70 tracking-wide uppercase">
                            {title}
                        </h3>
                    )}
                </div>
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        </MotionDiv>
    );
}
