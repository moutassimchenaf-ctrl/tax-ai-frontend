'use client'

import { useEffect } from 'react'
import { useScroll } from 'framer-motion'
import { useScrollStore } from '@/stores/scroll-store'

export default function ScrollSync() {
    const { scrollYProgress } = useScroll()
    const setProgress = useScrollStore((state) => state.setProgress)

    useEffect(() => {
        return scrollYProgress.on('change', (latest) => {
            setProgress(latest)
        })
    }, [scrollYProgress, setProgress])

    return null
}
