'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, SSAO, TiltShift2 } from '@react-three/postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'

interface QuantumSceneProps {
  children: React.ReactNode
}

export function QuantumScene({ children }: QuantumSceneProps) {
  return (
    <div className="fixed inset-0 z-0 h-screen w-full bg-white">
      <Canvas
        dpr={[1, 2]} // Performance cap
        gl={{ 
          antialias: false, // Let post-processing handle AA if needed, or rely on DPR
          stencil: false,
          depth: true,
          alpha: false // Pure white background handled by CSS/Container
        }}
        camera={{ position: [0, 0, 10], fov: 35 }}
      >
        <Suspense fallback={null}>
          {/* 
            LIGHTING: Surgical Top-Area Key Light 
            Intensity: 2.0
          */}
          <ambientLight intensity={0.8} />
          <spotLight 
            position={[5, 10, 5]} 
            intensity={2.0} 
            angle={0.5} 
            penumbra={1} 
            castShadow 
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
    </div>
  )
}
