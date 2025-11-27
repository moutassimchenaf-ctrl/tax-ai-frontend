'use client'

import { useRef } from 'react'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div
            ref={ref}
            style={{
                position: 'relative',
                width: ' 100%',
                height: '100%',
                overflow: 'auto',
                touchAction: 'auto',
            }}
        >
            {children}

        </div>
    )
}

export default Layout
