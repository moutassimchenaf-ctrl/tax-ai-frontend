'use client';

import { motion } from 'framer-motion';

interface HoverCardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function HoverCard({ children, className = "", onClick }: HoverCardProps) {
    const MotionDiv = motion.div as any;
    return (
        <MotionDiv
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </MotionDiv>
    );
}
