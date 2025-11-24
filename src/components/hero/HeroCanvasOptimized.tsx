'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useProgress, Html } from '@react-three/drei'
import * as THREE from 'three'

// Loading component with progress indicator
function Loader() {
    const { progress } = useProgress()
    return (
        <Html center>
            <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 border-4 border-primary-teal border-t-transparent rounded-full animate-spin" />
                <p className="text-primary-teal font-medium">{progress.toFixed(0)}% loaded</p>
            </div>
        </Html>
    )
}

// Optimized 3D Scene with lazy-loaded geometries
function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />

            {/* Animated mesh - simplified for performance */}
            <mesh rotation={[0, 0, 0]}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <meshStandardMaterial
                    color="#06708A"
                    metalness={0.8}
                    roughness={0.2}
                    envMapIntensity={1}
                />
            </mesh>

            {/* Camera controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
        </>
    )
}

export default function HeroCanvasOptimized() {
    return (
        <Canvas
            dpr={[1, 2]} // Adaptive pixel ratio for performance
            performance={{ min: 0.5 }} // Adaptive performance
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

            {/* Suspense boundary with loading fallback */}
            <Suspense fallback={<Loader />}>
                <Scene />
            </Suspense>
        </Canvas>
    )
}
