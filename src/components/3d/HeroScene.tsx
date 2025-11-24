'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import SceneCanvas from './SceneCanvas';

import { useAgentState } from '../agent/AgentStateContext';

function HeroMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const { isThinking } = useAgentState();

    useFrame((state) => {
        if (meshRef.current) {
            // Rotate faster when thinking
            const speedMultiplier = isThinking ? 3 : 1;
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2 * speedMultiplier;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3 * speedMultiplier;
        }
    });

    return (
        <Float speed={isThinking ? 5 : 2} rotationIntensity={isThinking ? 2 : 1} floatIntensity={isThinking ? 3 : 2}>
            <Icosahedron args={[1, 1]} ref={meshRef}>
                <MeshDistortMaterial
                    color={isThinking ? "#818cf8" : "#4f46e5"} // Light indigo when thinking
                    attach="material"
                    distort={isThinking ? 0.8 : 0.4}
                    speed={isThinking ? 5 : 2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Icosahedron>
        </Float>
    );
}

export default function HeroScene() {
    return (
        <SceneCanvas className="absolute inset-0 z-0 pointer-events-none">
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <HeroMesh />
        </SceneCanvas>
    );
}
