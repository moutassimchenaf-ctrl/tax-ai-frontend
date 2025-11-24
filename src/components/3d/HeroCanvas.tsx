/**
 * HeroCanvas Component
 * 
 * Huly.io-style 3D hero scene with scroll-driven animations.
 * Features frame-by-frame scroll control, cinematic camera movements,
 * and dynamic lighting based on scroll position.
 * 
 * @example
 * ```tsx
 * <HeroCanvas />
 * ```
 */

'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment,
  Float,
  Text3D,
  Center,
  useGLTF
} from '@react-three/drei'
import * as THREE from 'three'
import { useGsapScroll } from '@/hooks/useGsapScroll'

/**
 * Animated 3D cube that responds to scroll
 */
function AnimatedCube({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return

    // Rotate based on scroll
    meshRef.current.rotation.y = scrollProgress * Math.PI * 2
    meshRef.current.rotation.x = scrollProgress * Math.PI

    // Scale based on scroll
    const scale = 1 + scrollProgress * 0.5
    meshRef.current.scale.set(scale, scale, scale)

    // Subtle floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
  })

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#0898bb"
        metalness={0.8}
        roughness={0.2}
        emissive="#06708a"
        emissiveIntensity={scrollProgress * 0.5}
      />
    </mesh>
  )
}

/**
 * Camera controller that animates based on scroll
 */
function ScrollCamera({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree()

  useFrame(() => {
    // Camera movement based on scroll
    camera.position.z = 5 - scrollProgress * 3
    camera.position.y = scrollProgress * 2
    camera.lookAt(0, 0, 0)
  })

  return null
}

/**
 * Scene content
 */
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight
        position={[-10, -10, -5]}
        intensity={scrollProgress}
        color="#0898bb"
      />

      {/* 3D Content */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <AnimatedCube scrollProgress={scrollProgress} />
      </Float>

      {/* Environment */}
      <Environment preset="city" />
    </>
  )
}

/**
 * Main HeroCanvas component
 */
export function HeroCanvas() {
  const { scrollProgress, triggerRef } = useGsapScroll({
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
    pin: false,
    markers: false,
  })

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      className="fixed inset-0 -z-10"
      style={{ height: '300vh' }} // Extended height for scroll
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="absolute inset-0"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <ScrollCamera scrollProgress={scrollProgress} />
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
