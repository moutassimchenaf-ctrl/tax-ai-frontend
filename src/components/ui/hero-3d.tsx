"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.2;
            meshRef.current.rotation.y = t * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere args={[1, 100, 200]} scale={2.5} ref={meshRef}>
                <MeshDistortMaterial
                    color="#4f46e5" // Indigo-600
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

function AnimatedSphereSecondary() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.1;
            meshRef.current.rotation.y = t * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
            <Sphere args={[1, 64, 64]} scale={1.5} ref={meshRef} position={[3, -1, -2]}>
                <MeshDistortMaterial
                    color="#ec4899" // Pink-500
                    attach="material"
                    distort={0.3}
                    speed={1.5}
                    roughness={0.4}
                    metalness={0.6}
                />
            </Sphere>
        </Float>
    );
}

export const Hero3D = () => {
    return (
        <div className="absolute inset-0 -z-10 h-[500px] w-full overflow-hidden opacity-30 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={1} />
                <directionalLight position={[2, 5, 2]} intensity={2} />
                <AnimatedSphere />
                <AnimatedSphereSecondary />
            </Canvas>
        </div>
    );
};
