'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import './FluidShader' // Register the shader

interface GlassConduitsProps {
  scrollProgress: number
}

export function GlassConduits({ scrollProgress }: GlassConduitsProps) {
  const fluidRef = useRef<THREE.ShaderMaterial>(null)

  // Define the path (Catmull-Rom Spline)
  // Updated to connect directly to the side of the cube (approx x=1, y=0, z=0)
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.1, 0, 0), // Connection point on Cube (Right face)
      new THREE.Vector3(2.5, 0, 0), // Straight out
      new THREE.Vector3(3.5, -1, 1), // Curve down and forward
      new THREE.Vector3(1, -3, 3),   // Loop back
      new THREE.Vector3(-2, -4, 2),  // Distribution area
      new THREE.Vector3(-4, -5, 4),  // Exit
    ])
  }, [])

  // Update shader uniforms
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    // Sync with Cube Heartbeat (same math: pow(sin(t*4), 16))
    const beat = Math.pow(Math.sin(t * 4.0), 16.0)

    if (fluidRef.current?.uniforms) {
      if (fluidRef.current.uniforms.uTime) {
        fluidRef.current.uniforms.uTime.value = t
      }
      if (fluidRef.current.uniforms.uScrollProgress) {
        fluidRef.current.uniforms.uScrollProgress.value = scrollProgress
      }
      // Pass beat to fluid for "push" effect
      // We can modulate flow speed or bulge with the beat
      if (fluidRef.current.uniforms.uFlowSpeed) {
         fluidRef.current.uniforms.uFlowSpeed.value = 1.0 + beat * 2.0 // Burst of speed on beat
      }
    }
  })

  return (
    <group>
      {/* 
        B. THE GLASS CONDUITS 
        Material: MeshTransmissionMaterial -> transmission 1.0, thickness 0.5, CA 0.02 
      */}
      <mesh>
        <tubeGeometry args={[curve, 128, 0.4, 16, false]} />
        <MeshTransmissionMaterial 
          transmission={1.0}
          thickness={0.5}
          chromaticAberration={0.02}
          roughness={0.1}
          ior={1.5}
          color="#FFFFFF"
          backside={false}
          backsideThickness={0}
          resolution={512}
          anisotropy={1}
          distortion={0}
          distortionScale={0}
          temporalDistortion={0}
        />
      </mesh>

      {/* 
        C. THE FLUID (Inner Tube)
        Scale: 0.95 (to fit inside glass)
        Material: Custom FluidShader
      */}
      <mesh>
        <tubeGeometry args={[curve, 128, 0.35, 16, false]} />
        {/* @ts-ignore */}
        <fluidMaterial 
          ref={fluidRef} 
          transparent 
          uColor={new THREE.Color('#0898BB')}
        />
      </mesh>
      
      {/* Connection Ring (Socket on Cube) */}
      <mesh position={[1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <ringGeometry args={[0.35, 0.5, 32]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#0898BB" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}
