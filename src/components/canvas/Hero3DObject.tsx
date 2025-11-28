import { useRef, useLayoutEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshTransmissionMaterial, RoundedBox, Float } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Hero3DObject(props: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)
  const { viewport } = useThree()
  
  // Responsive scale: smaller on mobile
  const isMobile = viewport.width < 5
  const scale = isMobile ? 0.8 : 1.2

  useLayoutEffect(() => {
    if (!meshRef.current) return

    const ctx = gsap.context(() => {
      // Scene 2: The Descent (Dolly In + Rotate)
      // Matches the "ProblemStatement" section which pins for 300vh
      gsap.to(meshRef.current!.position, {
        z: 3,
        y: -1,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '+=200%', // Corresponds to the first part of the scroll
          scrub: 1,
        }
      })

      gsap.to(meshRef.current!.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '+=200%',
          scrub: 1,
        }
      })

      // Scene 4: The Morph (Distortion increase)
      // Happens during the FeatureShowcase
      if (materialRef.current) {
        gsap.to(materialRef.current, {
          distortion: 0.8,
          distortionScale: 0.5,
          chromaticAberration: 0.2,
          scrollTrigger: {
            trigger: 'body',
            start: '30% top', // Starts later in the scroll
            end: '80% top',
            scrub: 1,
          }
        })
      }
    })

    return () => ctx.revert()
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      // Idle animation (layered on top of scroll)
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
      <RoundedBox ref={meshRef} args={[1.5, 1.5, 1.5]} scale={scale} radius={0.2} smoothness={4} {...props}>
        <MeshTransmissionMaterial
          ref={materialRef}
          backside
          samples={16}
          resolution={512}
          transmission={0.99}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          thickness={2}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.4}
          temporalDistortion={0.2}
          color="#ffffff"
        />
      </RoundedBox>
    </Float>
  )
}
