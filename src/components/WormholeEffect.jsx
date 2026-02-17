import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Wormhole Tunnel Shader ─── */
const WormholeShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#00f0ff') },
    uColor2: { value: new THREE.Color('#7f00ff') },
    uColor3: { value: new THREE.Color('#ff6622') },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      float dist = length(vUv - 0.5);
      float ripple = sin(dist * 30.0 - uTime * 3.0) * 0.5 + 0.5;
      float glow = smoothstep(0.5, 0.0, dist);
      
      vec3 color = mix(uColor1, uColor2, ripple);
      color = mix(color, uColor3, sin(uTime + vUv.x * 10.0) * 0.3);
      
      float alpha = glow * (0.3 + ripple * 0.4);
      alpha *= smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
      
      gl_FragColor = vec4(color, alpha);
    }
  `
}

/* ─── Wormhole Ring ─── */
function WormholeRing({ radius, z, speed, color, opacity }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * speed
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + z) * 0.05)
  })

  return (
    <mesh ref={ref} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

/* ─── Tunnel Particles ─── */
function TunnelParticles({ count = 500 }) {
  const ref = useRef()
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 1.5 + Math.random() * 2
      
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = Math.sin(angle) * radius
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
      
      // Color gradient based on position
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        colors[i * 3] = 0; colors[i * 3 + 1] = 0.94; colors[i * 3 + 2] = 1 // cyan
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.5; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 1 // purple
      } else {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.4; colors[i * 3 + 2] = 0.13 // orange
      }
      
      speeds[i] = 0.5 + Math.random() * 2
    }
    
    return { positions, colors, speeds }
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const positions = ref.current.geometry.attributes.position.array
    
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 2] += particles.speeds[i] * 0.1
      
      // Reset particles that go too far
      if (positions[i * 3 + 2] > 15) {
        positions[i * 3 + 2] = -15
      }
    }
    
    ref.current.geometry.attributes.position.needsUpdate = true
    ref.current.rotation.z = state.clock.elapsedTime * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── Central Vortex ─── */
function Vortex() {
  const ref = useRef()
  const materialRef = useRef()
  
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.5
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={ref} position={[0, 0, -10]}>
      <planeGeometry args={[6, 6, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        {...WormholeShaderMaterial}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ─── Spiral Arms ─── */
function SpiralArms() {
  const ref = useRef()
  
  const spiralPoints = useMemo(() => {
    const points = []
    for (let i = 0; i < 200; i++) {
      const t = i / 200
      const angle = t * Math.PI * 8
      const radius = 0.5 + t * 3
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -t * 15
      ))
    }
    return points
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.3
  })

  return (
    <group ref={ref}>
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((rotation, idx) => (
        <line key={idx} rotation={[0, 0, rotation]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={spiralPoints.length}
              array={new Float32Array(spiralPoints.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={idx % 2 === 0 ? '#00f0ff' : '#7f00ff'} 
            transparent 
            opacity={0.3}
          />
        </line>
      ))}
    </group>
  )
}

/* ─── Main Scene ─── */
function WormholeScene() {
  const rings = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      radius: 2 + Math.sin(i * 0.3) * 0.5,
      z: -i * 1.5,
      speed: 0.2 + Math.random() * 0.3,
      color: i % 3 === 0 ? '#00f0ff' : i % 3 === 1 ? '#7f00ff' : '#ff6622',
      opacity: 0.2 + (1 - i / 20) * 0.3
    }))
  }, [])

  return (
    <>
      <ambientLight intensity={0.1} />
      
      {/* Wormhole Rings */}
      {rings.map((ring, i) => (
        <WormholeRing key={i} {...ring} />
      ))}
      
      {/* Central Vortex */}
      <Vortex />
      
      {/* Spiral Arms */}
      <SpiralArms />
      
      {/* Particles */}
      <TunnelParticles count={400} />
      
      {/* Glow lights */}
      <pointLight position={[0, 0, -5]} color="#00f0ff" intensity={2} distance={10} />
      <pointLight position={[0, 0, -15]} color="#7f00ff" intensity={3} distance={15} />
    </>
  )
}

const WormholeEffect = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        style={{ background: 'transparent' }}
      >
        <WormholeScene />
      </Canvas>
    </div>
  )
}

export default WormholeEffect
