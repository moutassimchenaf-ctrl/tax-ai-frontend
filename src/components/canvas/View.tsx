'use client'

import { forwardRef, Suspense, useImperativeHandle, useRef, MutableRefObject } from 'react'
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from '@react-three/drei'

export const Common = ({ color }: { color?: string }) => (
    <Suspense fallback={null}>
        {color && <color attach='background' args={[color]} />}
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 30, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color='blue' />
        <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
    </Suspense>
)

interface ViewProps {
    children?: React.ReactNode;
    orbit?: boolean;
    [key: string]: any; // Allow other props to be passed to the div
}

const View = forwardRef<HTMLDivElement, ViewProps>(({ children, orbit, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement>(null!)
    useImperativeHandle(ref, () => localRef.current as HTMLDivElement)

    return (
        <>
            <div ref={localRef} {...props} />
            {localRef.current && (
                <ViewImpl track={localRef as MutableRefObject<HTMLElement>}>
                    {children}
                    {orbit && <OrbitControls makeDefault />}
                </ViewImpl>
            )}
        </>
    )
})
View.displayName = 'View'

export { View }
