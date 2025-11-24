'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, File, FileCode, FileSpreadsheet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DocumentCardProps {
    title: string;
    type: 'pdf' | 'doc' | 'xls' | 'code';
    size: string;
    date: string;
    tags: string[];
    delay?: number;
}

export function DocumentCard({
    title,
    type,
    size,
    date,
    tags,
    delay = 0
}: DocumentCardProps) {
    
    const getIcon = () => {
        switch (type) {
            case 'pdf': return <FileText className="h-6 w-6 text-red-500" />;
            case 'xls': return <FileSpreadsheet className="h-6 w-6 text-emerald-500" />;
            case 'code': return <FileCode className="h-6 w-6 text-blue-500" />;
            default: return <File className="h-6 w-6 text-gray-500" />;
        }
    };

    const MotionDiv = motion.div as any;

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className={cn(
                "group relative overflow-hidden rounded-xl border border-navy-900/5 bg-white/50 backdrop-blur-sm p-4 transition-all hover:bg-white/80 hover:shadow-lg hover:shadow-navy-900/5 hover:-translate-y-1"
            )}
        >
            <div className="flex items-start gap-4">
                <div className="rounded-lg bg-navy-900/5 p-3 group-hover:bg-white transition-colors">
                    {getIcon()}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-inter font-medium text-navy-900 truncate pr-8">{title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-navy-900/40 font-mono">
                        <span>{size}</span>
                        <span>•</span>
                        <span>{date}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-navy-900/5 text-[10px] font-medium text-navy-900/60 uppercase tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hover Actions */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-teal-500/10 hover:text-teal-600">
                    <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-teal-500/10 hover:text-teal-600">
                    <Download className="h-4 w-4" />
                </Button>
            </div>
        </MotionDiv>
    );
}
