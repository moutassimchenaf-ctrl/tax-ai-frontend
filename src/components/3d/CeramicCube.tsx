'use client'

import { useRef, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { RoundedBox, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Custom Shader for Pulsating Veins
const VeinMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color('#0898BB'),
    uBaseColor: new THREE.Color('#FFFFFF'),
    uPulse: 0,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uPulse;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      
      // Slight expansion on pulse
      vec3 pos = position + normal * (uPulse * 0.02);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uBaseColor;
    uniform float uPulse;

    // Simplex Noise (3D)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    float snoise(vec3 v) {
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      // Voronoi-like vein pattern using noise
      float noiseScale = 3.0;
      float n = snoise(vPosition * noiseScale + uTime * 0.1);
      
      // Create sharp "cracks"
      float veins = smoothstep(0.45, 0.5, abs(n)); // Invert for cracks
      veins = 1.0 - veins;
      
      // Pulse intensity
      float glow = veins * (uPulse * 2.0 + 0.5);
      
      // Mix Base White with Teal Veins
      vec3 finalColor = mix(uBaseColor, uColor, glow);
      
      // Add rim light effect
      float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
      finalColor += uColor * fresnel * 0.5;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
)

extend({ VeinMaterial })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VeinMaterialType = any

declare global {
  namespace JSX {
    interface IntrinsicElements {
      veinMaterial: VeinMaterialType
    }
  }
}

export function CeramicCube() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    
    // Heartbeat Pulse (Sharp beat)
    // Beat every 1.5 seconds
    const beat = Math.pow(Math.sin(t * 4.0), 16.0) // Sharp spike
    
    if (materialRef.current?.uniforms) {
      if (materialRef.current.uniforms.uTime) {
        materialRef.current.uniforms.uTime.value = t
      }
      if (materialRef.current.uniforms.uPulse) {
        materialRef.current.uniforms.uPulse.value = beat
      }
    }
    
    // Physical expansion on beat
    if (groupRef.current) {
      const scale = 1 + beat * 0.02
      groupRef.current.scale.set(scale, scale, scale)
      
      // Gentle float
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1
      groupRef.current.rotation.x = Math.cos(t * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <RoundedBox args={[2, 2, 2]} radius={0.2} smoothness={8}>
        {/* Custom Vein Shader Material */}
        {/* @ts-ignore */}
        <veinMaterial 
          ref={materialRef}
          uColor={new THREE.Color('#0898BB')}
          uBaseColor={new THREE.Color('#FFFFFF')}
        />
      </RoundedBox>
    </group>
  )
}
