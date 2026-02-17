import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll, Stars, Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import { EVENTS } from './EventData'
import HeroOverlay from './HeroOverlay'
import EventOverlay from './EventOverlay'
import SponsorsOverlay from './SponsorsOverlay'
import FooterOverlay from './FooterOverlay'
import ScrollNav from './ScrollNav'

/* ═══════════════════════════════════════════════
   3D SCENE OBJECTS
   ═══════════════════════════════════════════════ */

/* ─── Endurance Station ─── */
function EnduranceStation({ scrollData }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const offset = scrollData.current
    groupRef.current.rotation.y += 0.004
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    // Move away as we scroll
    groupRef.current.position.z = -offset * 80
    groupRef.current.position.x = 3 - offset * 15
    const s = Math.max(0, 1 - offset * 4)
    groupRef.current.scale.setScalar(s)
  })

  return (
    <group ref={groupRef} position={[3, 0, 0]}>
      {/* Main Ring */}
      <mesh>
        <torusGeometry args={[2.2, 0.08, 16, 100]} />
        <meshStandardMaterial color="#8899aa" metalness={0.9} roughness={0.2} emissive="#00f0ff" emissiveIntensity={0.05} />
      </mesh>
      {/* Inner Ring */}
      <mesh>
        <torusGeometry args={[1.8, 0.05, 16, 80]} />
        <meshStandardMaterial color="#667788" metalness={0.8} roughness={0.3} emissive="#00f0ff" emissiveIntensity={0.03} />
      </mesh>
      {/* Spokes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 2, Math.sin(angle) * 2, 0]} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.015, 0.015, 0.8, 6]} />
            <meshStandardMaterial color="#445566" metalness={0.8} roughness={0.4} />
          </mesh>
        )
      })}
      {/* Habitat Modules */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh key={`m-${i}`} position={[Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0]} rotation={[0, 0, angle]}>
            <boxGeometry args={[0.3, 0.15, 0.15]} />
            <meshStandardMaterial color="#778899" metalness={0.85} roughness={0.25} emissive="#00f0ff" emissiveIntensity={0.08} />
          </mesh>
        )
      })}
      {/* Central Hub */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#556677" metalness={0.9} roughness={0.2} emissive="#00f0ff" emissiveIntensity={0.1} />
      </mesh>
      <pointLight color="#00f0ff" intensity={2} distance={5} />
    </group>
  )
}

/* ─── Earth ─── */
function Earth({ scrollData }) {
  const ref = useRef()

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y += 0.001
    const offset = scrollData.current
    ref.current.position.z = -3 - offset * 60
    const s = Math.max(0, 1 - offset * 3)
    ref.current.scale.setScalar(s)
  })

  return (
    <group ref={ref} position={[-4, -1, -3]}>
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial color="#1a3a5c" emissive="#0a1a2c" emissiveIntensity={0.3} metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh scale={1.02}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial color="#4488cc" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

/* ─── Black Hole with Accretion Disk ─── */
function BlackHole({ scrollData }) {
  const groupRef = useRef()
  const diskRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const offset = scrollData.current

    // Black hole appears at ~15% scroll, fully visible at ~25%
    const appear = THREE.MathUtils.smoothstep(offset, 0.1, 0.25)
    // We fly through it from 25% to 45%
    const passThrough = THREE.MathUtils.smoothstep(offset, 0.25, 0.45)

    groupRef.current.position.z = -20 + appear * 20 - passThrough * 60
    const s = appear * (1 + passThrough * 3)
    groupRef.current.scale.setScalar(Math.max(0.01, s))

    if (diskRef.current) {
      diskRef.current.rotation.z += 0.01
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, -20]}>
      {/* Event horizon */}
      <mesh>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Accretion disk - outer */}
      <mesh ref={diskRef} rotation={[Math.PI * 0.4, 0, 0]}>
        <torusGeometry args={[2.2, 0.5, 3, 120]} />
        <meshBasicMaterial color="#7f00ff" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Accretion disk - inner hot */}
      <mesh rotation={[Math.PI * 0.4, 0, 0]}>
        <torusGeometry args={[1.3, 0.2, 3, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Accretion disk - outer faint */}
      <mesh rotation={[Math.PI * 0.4, 0, 0]}>
        <torusGeometry args={[3.2, 0.3, 3, 120]} />
        <meshBasicMaterial color="#5500aa" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      {/* Photon sphere glow */}
      <mesh>
        <sphereGeometry args={[1.0, 64, 64]} />
        <meshBasicMaterial color="#7f00ff" transparent opacity={0.08} />
      </mesh>

      {/* Lights */}
      <pointLight color="#7f00ff" intensity={4} distance={12} />
      <pointLight color="#00f0ff" intensity={2} distance={8} position={[0, 1, 0]} />
    </group>
  )
}

/* ─── Warp Tunnel (between black hole and events) ─── */
function WarpTunnel({ scrollData }) {
  const groupRef = useRef()
  const rings = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      z: -i * 4,
      radius: 1.5 + Math.sin(i * 0.5) * 0.5,
      speed: 0.01 + Math.random() * 0.02,
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const offset = scrollData.current
    // Visible during 25%-45% scroll
    const appear = THREE.MathUtils.smoothstep(offset, 0.2, 0.3)
    const disappear = THREE.MathUtils.smoothstep(offset, 0.42, 0.5)
    groupRef.current.visible = appear > 0 && disappear < 1
    const o = appear * (1 - disappear)
    groupRef.current.children.forEach((child, i) => {
      child.material.opacity = o * 0.15
      child.rotation.z += rings[i].speed
    })
    groupRef.current.position.z = -20 - offset * 20
  })

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} rotation={[0, 0, i * 0.3]}>
          <torusGeometry args={[ring.radius, 0.02, 8, 60]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── Event Planet ─── */
function EventPlanet({ event, index, scrollData }) {
  const ref = useRef()
  // Each planet appears at a different scroll position
  // Events span from 30% to 85% → each event gets ~7.8% of scroll
  const startOffset = 0.3 + index * 0.078
  const centerOffset = startOffset + 0.04
  const endOffset = startOffset + 0.078

  useFrame((state) => {
    if (!ref.current) return
    const offset = scrollData.current

    // Planet appears, moves to center, then flies past
    const appear = THREE.MathUtils.smoothstep(offset, startOffset - 0.02, startOffset + 0.02)
    const center = THREE.MathUtils.smoothstep(offset, startOffset, centerOffset)
    const leave = THREE.MathUtils.smoothstep(offset, centerOffset, endOffset + 0.02)

    // Position: comes from far ahead, settles to side, then flies past
    const z = THREE.MathUtils.lerp(20, 0, appear) + THREE.MathUtils.lerp(0, -30, leave)
    const x = (index % 2 === 0 ? 1 : -1) * (3 - center * 1 + leave * 2)
    const y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3

    ref.current.position.set(x, y, z)
    ref.current.rotation.y += 0.008

    // Scale: grow as it approaches, stay, then shrink
    const scale = appear * (1 - leave * 0.8)
    ref.current.scale.setScalar(Math.max(0.01, scale))

    // Visibility
    ref.current.visible = appear > 0.01
  })

  return (
    <group ref={ref}>
      {/* Planet sphere */}
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color={event.color}
          emissive={event.emissive}
          emissiveIntensity={0.4}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      {/* Atmosphere glow */}
      <mesh scale={1.15}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={event.emissive} transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      {/* Light */}
      <pointLight color={event.emissive} intensity={1.5} distance={6} />
    </group>
  )
}

/* ─── Floating Particles (depth effect) ─── */
function DepthParticles({ scrollData }) {
  const pointsRef = useRef()
  const count = 500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200
    }
    return pos
  }, [])

  useFrame(() => {
    if (!pointsRef.current) return
    const offset = scrollData.current
    // Move particles to create depth/speed feel
    pointsRef.current.position.z = offset * 100
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00f0ff" size={0.05} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

/* ═══════════════════════════════════════════════
   CAMERA CONTROLLER (Scroll-Driven)
   ═══════════════════════════════════════════════ */
function CameraController({ scrollData }) {
  const { camera } = useThree()

  useFrame(() => {
    const offset = scrollData.current

    // Camera journey stages:
    // 0-15%: Orbit view (hero), slight push forward
    // 15-30%: Approach black hole
    // 30-45%: Fly through wormhole tunnel
    // 45-85%: Glide past event planets
    // 85-100%: Final pull-out to colony view

    let z, y, x, lookZ

    if (offset < 0.15) {
      // Hero: gentle drift forward
      const t = offset / 0.15
      z = 6 - t * 3
      y = t * 0.5
      x = 0
      lookZ = -5
    } else if (offset < 0.3) {
      // Approach black hole
      const t = (offset - 0.15) / 0.15
      z = 3 - t * 10
      y = 0.5 - t * 0.5
      x = 0
      lookZ = z - 10
    } else if (offset < 0.45) {
      // Through the wormhole
      const t = (offset - 0.3) / 0.15
      z = -7 - t * 15
      y = Math.sin(t * Math.PI) * 0.5
      x = Math.sin(t * Math.PI * 2) * 0.3
      lookZ = z - 8
    } else if (offset < 0.85) {
      // Gliding past planets
      const t = (offset - 0.45) / 0.4
      z = -22 - t * 20
      y = Math.sin(t * Math.PI * 3) * 0.2
      x = 0
      lookZ = z - 5
    } else {
      // Colony / finale
      const t = (offset - 0.85) / 0.15
      z = -42 - t * 8
      y = t * 1
      x = 0
      lookZ = z - 5
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.05)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, z, 0.05)
    camera.lookAt(
      THREE.MathUtils.lerp(camera.position.x, 0, 0.1),
      THREE.MathUtils.lerp(camera.position.y, 0, 0.1),
      lookZ
    )
  })

  return null
}

/* ═══════════════════════════════════════════════
   SCROLL SCENE (3D + HTML Overlays)
   ═══════════════════════════════════════════════ */
function ScrollScene() {
  const scroll = useScroll()
  const scrollData = useRef(0)
  const [currentOffset, setCurrentOffset] = useState(0)

  useFrame(() => {
    scrollData.current = scroll.offset
    // Update state less frequently for overlays
    const rounded = Math.round(scroll.offset * 1000) / 1000
    if (Math.abs(rounded - currentOffset) > 0.005) {
      setCurrentOffset(rounded)
    }
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 3, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-5, 2, 3]} intensity={0.3} color="#00f0ff" />
      <pointLight position={[3, -2, -3]} intensity={0.2} color="#7f00ff" />

      {/* Stars background */}
      <Stars radius={150} depth={80} count={4000} factor={3} saturation={0} fade speed={0.3} />

      {/* Depth particles */}
      <DepthParticles scrollData={scrollData} />

      {/* Camera */}
      <CameraController scrollData={scrollData} />

      {/* Scene objects */}
      <EnduranceStation scrollData={scrollData} />
      <Earth scrollData={scrollData} />
      <BlackHole scrollData={scrollData} />
      <WarpTunnel scrollData={scrollData} />

      {/* Event Planets */}
      {EVENTS.map((event, i) => (
        <EventPlanet key={event.id} event={event} index={i} scrollData={scrollData} />
      ))}

      {/* HTML Overlays embedded in 3D scroll */}
      <HeroHtmlOverlay scrollData={scrollData} />
      {EVENTS.map((event, i) => (
        <EventHtmlOverlay key={event.id} event={event} index={i} scrollData={scrollData} />
      ))}
      <ColonyHtmlOverlay scrollData={scrollData} />
    </>
  )
}

/* ═══════════════════════════════════════════════
   HTML OVERLAYS IN 3D SPACE
   ═══════════════════════════════════════════════ */

function HeroHtmlOverlay({ scrollData }) {
  const ref = useRef()

  useFrame(() => {
    if (!ref.current) return
    const offset = scrollData.current
    const opacity = 1 - THREE.MathUtils.smoothstep(offset, 0.05, 0.15)
    ref.current.style.opacity = opacity
    ref.current.style.pointerEvents = opacity > 0.3 ? 'auto' : 'none'
  })

  return (
    <Html
      fullscreen
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <div ref={ref}>
        <HeroOverlay />
      </div>
    </Html>
  )
}

function EventHtmlOverlay({ event, index, scrollData }) {
  const ref = useRef()
  const startOffset = 0.3 + index * 0.078
  const centerOffset = startOffset + 0.04
  const endOffset = startOffset + 0.078

  useFrame(() => {
    if (!ref.current) return
    const offset = scrollData.current
    const fadeIn = THREE.MathUtils.smoothstep(offset, startOffset, startOffset + 0.02)
    const fadeOut = THREE.MathUtils.smoothstep(offset, centerOffset + 0.02, endOffset)
    const opacity = fadeIn * (1 - fadeOut)
    ref.current.style.opacity = opacity
    ref.current.style.pointerEvents = opacity > 0.3 ? 'auto' : 'none'
    ref.current.style.transform = `translateY(${(1 - fadeIn) * 50}px)`
  })

  return (
    <Html
      fullscreen
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <div ref={ref} style={{ transition: 'transform 0.3s ease-out' }}>
        <EventOverlay event={event} index={index} />
      </div>
    </Html>
  )
}

function ColonyHtmlOverlay({ scrollData }) {
  const ref = useRef()

  useFrame(() => {
    if (!ref.current) return
    const offset = scrollData.current
    const opacity = THREE.MathUtils.smoothstep(offset, 0.84, 0.92)
    ref.current.style.opacity = opacity
    ref.current.style.pointerEvents = opacity > 0.3 ? 'auto' : 'none'
  })

  return (
    <Html
      fullscreen
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <div ref={ref}>
        <SponsorsOverlay />
        <FooterOverlay />
      </div>
    </Html>
  )
}

/* ═══════════════════════════════════════════════
   MAIN SCROLL JOURNEY COMPONENT
   ═══════════════════════════════════════════════ */
const ScrollJourney = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: '#0B0B0D' }}
        gl={{ antialias: true, alpha: false }}
      >
        <ScrollControls pages={12} damping={0.15} >
          <ScrollScene />
        </ScrollControls>
      </Canvas>

      {/* Fixed UI overlapping the canvas */}
      <HeaderFixed />
      <ScrollProgressIndicator />
      <DepthIndicatorUI />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   FIXED UI ELEMENTS (outside Canvas)
   ═══════════════════════════════════════════════ */

function HeaderFixed() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[200]">
      <div className="absolute inset-0 bg-void/60 backdrop-blur-md" />
      <div className="relative flex items-center justify-between px-8 lg:px-16 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full border border-event/60 flex items-center justify-center"
              style={{ boxShadow: '0 0 12px rgba(0,240,255,0.2)' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-event" style={{ boxShadow: '0 0 8px rgba(0,240,255,0.6)' }} />
            </div>
          </div>
          <div>
            <div className="font-heading text-sm text-event tracking-[0.25em]">INTERSTELLAR</div>
            <div className="font-mono text-[9px] text-event-dim tracking-wider">TECHFEST // MMMUT NEXUS</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {['LAUNCH', 'WORMHOLE', 'MISSIONS', 'COLONY'].map((item) => (
            <span key={item} className="font-heading text-[10px] tracking-[0.2em] text-event/50 hover:text-event cursor-pointer transition-colors">
              {item}
            </span>
          ))}
        </nav>

        {/* Status */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="font-mono text-[10px] text-event-dim hidden sm:inline">SYSTEMS NOMINAL</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-event/20 to-transparent" />
    </header>
  )
}

function ScrollProgressIndicator() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    // Listen for scroll progress from canvas
    const interval = setInterval(() => {
      const el = document.querySelector('[data-scroll-offset]')
      if (el) {
        setOffset(parseFloat(el.dataset.scrollOffset) || 0)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const sections = [
    { label: 'LAUNCH', at: 0 },
    { label: 'APPROACH', at: 0.15 },
    { label: 'WORMHOLE', at: 0.3 },
    { label: 'MISSIONS', at: 0.45 },
    { label: 'COLONY', at: 0.88 },
  ]

  return (
    <div className="scroll-progress hidden lg:flex">
      <div className="flex flex-col items-center gap-3">
        {sections.map((section) => (
          <div
            key={section.label}
            className={`scroll-dot ${offset >= section.at - 0.05 && offset < (section.at + 0.15) ? 'active' : ''}`}
            data-label={section.label}
          />
        ))}
      </div>
    </div>
  )
}

function DepthIndicatorUI() {
  return (
    <div className="depth-indicator hidden lg:block">
      <div className="font-mono text-[9px] text-event-dim tracking-wider -rotate-90 origin-left translate-y-[-50px] whitespace-nowrap">
        DEPTH // SCROLL TO DIVE
      </div>
    </div>
  )
}

export default ScrollJourney
