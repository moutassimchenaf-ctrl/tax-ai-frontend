'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera, OrbitControls, ContactShadows } from '@react-three/drei'
import { EffectComposer, Bloom, SSAO, TiltShift2 } from '@react-three/postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'
import { ErrorBoundary } from '@/components/ErrorBoundary'

interface QuantumSceneProps {
  children: React.ReactNode
}

export function QuantumScene({ children }: QuantumSceneProps) {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full bg-gray-50">
      <ErrorBoundary>
        <Canvas
          dpr={[1, 2]} // Performance cap
          shadows
          gl={{ 
            antialias: false, // Let post-processing handle AA if needed, or rely on DPR
            stencil: false,
            depth: true,
            alpha: true // Allow CSS background to show through if needed, but we'll set scene bg too
          }}
          camera={{ position: [0, 0, 10], fov: 35 }}
        >
          {/* Off-White Background for contrast with white objects */}
          <color attach="background" args={['#f5f5f5']} />
          
          <Suspense fallback={null}>
            {/* 
              LIGHTING: Surgical Top-Area Key Light 
              Intensity: 2.0
            */}
            <ambientLight intensity={0.7} />
            <spotLight 
              position={[5, 10, 5]} 
              intensity={2.0} 
              angle={0.5} 
              penumbra={1} 
              castShadow 
              shadow-bias={-0.0001}
            />
            
            {/* 
              RIM LIGHT: Teal for edge separation 
              Color: #0898BB
            */}
            <spotLight 
              position={[-5, 0, -5]} 
              intensity={1.5} 
              color="#0898BB" 
            />

            {/* Environment for reflections */}
            <Environment preset="city" />

            {/* The Stage Content */}
            {children}

            {/* Grounding Shadows */}
            <ContactShadows 
              resolution={1024} 
              scale={20} 
              blur={2} 
              opacity={0.25} 
              far={10} 
              color="#000000" 
            />

            {/* 
              POST-PROCESSING 
              - Bloom: Threshold 0.9 (Only Teal glows)
              - SSAO: White-on-white depth
              - TiltShift: Micro-blur
            */}
            <EffectComposer>
              <SSAO 
                radius={0.4} 
                intensity={50} 
                luminanceInfluence={0.4} 
                color={new THREE.Color('black')}
                worldDistanceThreshold={1.0}
                worldDistanceFalloff={0.1}
                worldProximityThreshold={1.0}
                worldProximityFalloff={0.1}
              />
              <Bloom 
                luminanceThreshold={0.9} 
                mipmapBlur 
                intensity={1.5} 
                radius={0.4}
              />
              <TiltShift2 blur={0.05} />
            </EffectComposer>

            {/* Camera Control (for debug, will be overridden by scroll) */}
            {/* <OrbitControls /> */}
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
