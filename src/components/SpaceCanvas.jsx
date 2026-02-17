import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Error Boundary ─── */
class ModelErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false } }
  static getDerivedStateFromError() { return { hasError: true } }
  render() { return this.state.hasError ? (this.props.fallback || null) : this.props.children }
}

/* ─── ENDURANCE (Hero Ship) ─── */
function EnduranceModel({ progressRef }) {
  const { scene } = useGLTF('/models/interstellar__endurance.glb')
  const ref = useRef()
  const cloned = useMemo(() => scene.clone(), [scene])

  useFrame((state) => {
    if (!ref.current) return
    const p = progressRef.current
    ref.current.rotation.y += 0.005
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    
    // Position logic: Starts large on right, then flies off
    const fade = Math.max(0, 1 - p * 3)
    ref.current.scale.setScalar(fade * 0.15) 
    
    // Positioned to the right (x=3) so it doesn't block center text
    ref.current.position.set(
      3 + p * 2,
      0.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2,
      -4 - p * 15
    )
  })

  return (
    <group ref={ref}>
      <primitive object={cloned} />
      <pointLight color="#00f0ff" intensity={2} distance={8} />
    </group>
  )
}

function EnduranceFallback({ progressRef }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const p = progressRef.current
    const fade = Math.max(0, 1 - p * 3)
    ref.current.scale.setScalar(fade * 0.8)
    ref.current.position.set(3, 0.5, -4 - p * 15)
    ref.current.rotation.y += 0.01
  })
  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[2.5, 0.1, 16, 80]} />
        <meshStandardMaterial color="#8899aa" emissive="#00f0ff" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

function Endurance({ progressRef }) {
  return (
    <ModelErrorBoundary fallback={<EnduranceFallback progressRef={progressRef} />}>
      <Suspense fallback={<EnduranceFallback progressRef={progressRef} />}>
        <EnduranceModel progressRef={progressRef} />
      </Suspense>
    </ModelErrorBoundary>
  )
}

/* ─── BLACK HOLE (Background visuals) ─── */
function BlackHoleModel({ progressRef }) {
  const { scene } = useGLTF('/models/gargantua_the_black_hole.glb')
  const ref = useRef()
  const cloned = useMemo(() => scene.clone(), [scene])

  useFrame(() => {
    if (!ref.current) return
    const p = progressRef.current
    const appear = THREE.MathUtils.smoothstep(p, 0.1, 0.3)
    
    ref.current.scale.setScalar(appear * 0.8)
    ref.current.rotation.y += 0.001
    ref.current.position.set(0, 0, -25 + appear * 5)
  })

  return (
    <group ref={ref}>
      <primitive object={cloned} />
      <pointLight color="#7f00ff" intensity={5} distance={20} />
      <pointLight color="#00f0ff" intensity={2} distance={10} position={[0, 5, 0]} />
    </group>
  )
}

function BlackHoleFallback({ progressRef }) {
  const ref = useRef()
  useFrame(() => {
    if (!ref.current) return
    const p = progressRef.current
    const appear = THREE.MathUtils.smoothstep(p, 0.1, 0.3)
    ref.current.scale.setScalar(appear * 3)
    ref.current.position.set(0, 0, -25 + appear * 5)
  })
  return (
    <group ref={ref}>
      <mesh><sphereGeometry args={[1.5, 32, 32]} /><meshBasicMaterial color="#000000" /></mesh>
      <mesh rotation={[Math.PI * 0.4, 0, 0]}>
        <torusGeometry args={[4, 0.8, 3, 40]} />
        <meshBasicMaterial color="#7f00ff" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function BlackHole({ progressRef }) {
  return (
    <ModelErrorBoundary fallback={<BlackHoleFallback progressRef={progressRef} />}>
      <Suspense fallback={<BlackHoleFallback progressRef={progressRef} />}>
        <BlackHoleModel progressRef={progressRef} />
      </Suspense>
    </ModelErrorBoundary>
  )
}

/* ─── PARTICLES ─── */
function DepthParticles({ progressRef }) {
  const ref = useRef()
  const count = 400
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60
      arr[i * 3 + 2] = (Math.random() - 0.5) * 100 - 20
    }
    return arr
  }, [])

  useFrame(() => {
    if (!ref.current) return
    ref.current.position.z = progressRef.current * 40
    ref.current.rotation.y = progressRef.current * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00f0ff" size={0.05} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

/* ─── CAMERA ─── */
function CameraRig({ progressRef }) {
  const { camera } = useThree()
  useFrame(() => {
    const p = progressRef.current
    let z = 10 - p * 2
    camera.rotation.x = p * 0.1
    camera.position.z = z
  })
  return null
}

function Scene({ progressRef }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
      <Stars radius={200} depth={100} count={3000} factor={3} saturation={0} fade speed={0.2} />

      <CameraRig progressRef={progressRef} />
      <DepthParticles progressRef={progressRef} />
      <Endurance progressRef={progressRef} />
      <BlackHole progressRef={progressRef} />
      {/* Removed Earth and EventPlanets as requested */}
    </>
  )
}

const SpaceCanvas = ({ scrollProgress }) => {
  const progressRef = useRef(0)
  progressRef.current = scrollProgress

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ background: '#0B0B0D' }}
        onCreated={({ gl }) => {
          gl.getContext().canvas.addEventListener('webglcontextlost', (e) => e.preventDefault())
        }}
      >
        <color attach="background" args={['#0B0B0D']} />
        <fog attach="fog" args={['#0B0B0D', 20, 60]} />
        <Suspense fallback={null}>
          <Scene progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/interstellar__endurance.glb')
useGLTF.preload('/models/gargantua_the_black_hole.glb')

export default SpaceCanvas
