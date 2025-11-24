'use client';

import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function GhostHeader() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const MotionHeader = motion.header as any;

    return (
        <MotionHeader
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed top-0 left-0 w-full z-50 h-14 flex items-center justify-between px-6 pointer-events-none"
        >
            {/* Logo Area */}
            <div className="pointer-events-auto">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500/20 to-blue-500/20 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:border-teal-500/30 transition-colors">
                        <div className="w-3 h-3 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                    </div>
                    <span className="font-inter font-light text-sm tracking-widest text-white/80 uppercase">
                        TAi <span className="text-teal-500">Engine</span>
                    </span>
                </Link>
            </div>

            {/* Auth Action */}
            <div className="pointer-events-auto">
                {!loading && (
                    <Button
                        onClick={() => router.push(user ? '/dashboard' : '/login')}
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white/90 hover:bg-white/10 hover:text-white transition-all duration-300",
                            "font-inter font-light tracking-wide text-xs uppercase px-6"
                        )}
                    >
                        {user ? 'Go to Dashboard' : 'Sign In'}
                    </Button>
                )}
            </div>
        </MotionHeader>
    );
}
