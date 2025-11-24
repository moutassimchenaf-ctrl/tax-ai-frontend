'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { View } from '@/components/canvas/View'

export default function HeroCanvas() {
    const mesh = useRef<any>(null)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (mesh.current) {
            mesh.current.rotation.x = t * 0.2
            mesh.current.rotation.y = t * 0.25
        }
    })

    return (
        <View className='absolute top-0 left-0 w-full h-full z-0'>
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                <mesh ref={mesh} scale={2}>
                    <boxGeometry args={[1, 1, 1]} />
                    <MeshDistortMaterial
                        color='#06708A'
                        speed={2}
                        distort={0.4}
                        roughness={0.2}
                        metalness={0.8}
                    />
                </mesh>
            </Float>
            <Common color='#ffffff' />
        </View>
    )
}

// Re-export Common here or import it from View if exported
import { Common } from '@/components/canvas/View'
