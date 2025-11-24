'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, OrbitControls, Preload } from '@react-three/drei';

interface SceneCanvasProps {
    children: React.ReactNode;
    className?: string;
    cameraPosition?: [number, number, number];
}

export default function SceneCanvas({
    children,
    className = "w-full h-full",
    cameraPosition = [0, 0, 5]
}: SceneCanvasProps) {
    return (
        <div className={className}>
            <Canvas
                camera={{ position: cameraPosition, fov: 45 }}
                dpr={[1, 2]} // Handle high-DPI screens
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    {children}
                    <Environment preset="city" />
                    <Preload all />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
}
