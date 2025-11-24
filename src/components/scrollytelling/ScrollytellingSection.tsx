'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScrollytellingSectionProps {
    children: React.ReactNode
    className?: string
    align?: 'left' | 'right' | 'center'
    index: number
}

export default function ScrollytellingSection({
    children,
    className,
    align = 'left',
    index,
}: ScrollytellingSectionProps) {
    const MotionDiv = motion.div as any;
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref as any,
        offset: ['start end', 'end start'],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])

    const alignClass = {
        left: 'items-start text-left',
        right: 'items-end text-right',
        center: 'items-center text-center',
    }

    return (
        <section
            ref={ref}
            className={cn(
                'min-h-screen w-full flex flex-col justify-center px-4 md:px-20 py-20 relative z-10 pointer-events-none',
                alignClass[align],
                className
            )}
        >
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl pointer-events-auto"
              >          {children}
            </MotionDiv>
        </section>
    )
}
