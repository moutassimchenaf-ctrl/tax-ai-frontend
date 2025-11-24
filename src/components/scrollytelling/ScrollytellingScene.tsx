'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScrollStore } from '@/stores/scroll-store'
import { View } from '@/components/canvas/View'
import { Float, Torus, Icosahedron } from '@react-three/drei'
import * as THREE from 'three'

export default function ScrollytellingScene() {
    const scrollProgress = useScrollStore((state) => state.progress)
    const group = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (group.current) {
            // Rotate the entire group based on scroll
            group.current.rotation.y = scrollProgress * Math.PI * 2

            // Move the group vertically
            // scrollProgress goes from 0 to 1. 
            // We want to move objects through the view.
            // This is a simple example; complex paths would use curves.
            group.current.position.z = -scrollProgress * 10 + 2
        }
    })

    return (
        <View className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
            <group ref={group}>
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <Torus position={[2, 0, -5]} args={[1, 0.4, 16, 100]}>
                        <meshStandardMaterial color="#0898BB" wireframe />
                    </Torus>
                </Float>

                <Float speed={3} rotationIntensity={2} floatIntensity={1}>
                    <Icosahedron position={[-2, -2, -10]} args={[1, 0]}>
                        <meshStandardMaterial color="#06708A" />
                    </Icosahedron>
                </Float>
            </group>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
        </View>
    )
}
