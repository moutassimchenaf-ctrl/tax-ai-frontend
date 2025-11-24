'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import HeroSkeleton from './HeroSkeleton'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

// Lazy load the optimized 3D canvas with R3F
const HeroCanvasOptimized = dynamic(() => import('./HeroCanvasOptimized'), {
    loading: () => <HeroSkeleton />,
    ssr: false,
})


export default function HeroSection() {
    const MotionH1 = motion.h1 as any;
    const MotionP = motion.p as any;
    const MotionDiv = motion.div as any;
    const router = useRouter();
    return (
        <header className='relative w-full h-screen flex items-center justify-center overflow-hidden'>
            {/* 3D Background */}
            <div className='absolute inset-0 z-0'>
                <HeroCanvasOptimized />
            </div>

            {/* Content Overlay */}
            <div className='relative z-10 container mx-auto px-4 text-center'>
                <MotionH1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className='text-6xl md:text-8xl font-bold tracking-tighter text-secondary-900 mb-6'
                >
                    The <span className='text-primary-teal'>TAi</span> Engine
                </MotionH1>

                <MotionP
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className='text-xl md:text-2xl text-secondary-600 mb-12 max-w-2xl mx-auto'
                >
                    Advanced AI-driven tax analysis and optimization for the modern enterprise.
                    <br />
                    Powered by advanced multi-agent intelligence.
                </MotionP>

                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className='flex flex-col md:flex-row gap-4 justify-center items-center'
                >
                    <Button
                        size='lg'
                        className='bg-primary-teal hover:bg-primary-teal/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
                        onClick={() => router.push('/dashboard')}
                    >
                        Launch Dashboard
                        <ArrowRight className='ml-2 w-5 h-5' />
                    </Button>
                    <Button
                        variant='outline'
                        size='lg'
                        className='border-primary-teal text-primary-teal hover:bg-primary-teal/10 px-8 py-6 text-lg rounded-full'
                    >
                        Learn More
                    </Button>
                </MotionDiv>
            </div>
        </header>
    )
}
