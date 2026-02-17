import React, { useRef, useMemo, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

/* ─── Event Planet Data ─── */
const PLANETS = [
  {
    id: 'stellar-genesis',
    name: 'Stellar Genesis',
    type: 'Flagship Hackathon',
    color: '#ff6622',
    emissive: '#ff4400',
    position: [-4, 2, -2],
    size: 0.8,
    orbitSpeed: 0.3,
    description: 'Birth of Innovation',
    texture: 'sun' // molten surface
  },
  {
    id: 'cosmic-intelligence',
    name: 'Cosmic Intelligence',
    type: 'AI Challenge',
    color: '#00ccff',
    emissive: '#0088ff',
    position: [-2, -1, -4],
    size: 0.6,
    orbitSpeed: 0.5,
    description: 'Neural Networks',
    texture: 'neural'
  },
  {
    id: 'quantum-logic',
    name: 'Quantum Logic',
    type: 'Competitive Programming',
    color: '#aa44ff',
    emissive: '#8800ff',
    position: [0, 1.5, -3],
    size: 0.55,
    orbitSpeed: 0.4,
    description: 'Crystal Precision',
    texture: 'crystal'
  },
  {
    id: 'mission-control',
    name: 'Mission Control',
    type: 'Technical Workshop',
    color: '#00ff88',
    emissive: '#00cc66',
    position: [3, 0, -2],
    size: 0.65,
    orbitSpeed: 0.35,
    description: 'Training Station',
    texture: 'tech'
  },
  {
    id: 'orbit-shift',
    name: 'Orbit Shift',
    type: 'Startup Ideathon',
    color: '#ffaa00',
    emissive: '#ff8800',
    position: [4.5, 2, -3],
    size: 0.5,
    orbitSpeed: 0.6,
    description: 'Launch Trajectory',
    texture: 'golden'
  },
  {
    id: 'synthetic-cosmos',
    name: 'Synthetic Cosmos',
    type: 'Creative AI',
    color: '#ff44aa',
    emissive: '#ff0088',
    position: [2, -2, -4],
    size: 0.55,
    orbitSpeed: 0.45,
    description: 'Chromatic World',
    texture: 'artistic'
  },
  {
    id: 'event-horizon',
    name: 'Event Horizon',
    type: 'Cybersecurity CTF',
    color: '#44ff44',
    emissive: '#00ff00',
    position: [-3.5, -2.5, -3],
    size: 0.5,
    orbitSpeed: 0.55,
    description: 'Dark Matter',
    texture: 'dark'
  }
]

/* ─── Planet Component ─── */
function Planet({ planet, onHover, onLeave, isHovered }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const ringsRef = useRef()
  
  // Create procedural texture based on type
  const material = useMemo(() => {
    const color = new THREE.Color(planet.color)
    const emissive = new THREE.Color(planet.emissive)
    
    return {
      color,
      emissive,
      emissiveIntensity: isHovered ? 0.8 : 0.3,
      metalness: planet.texture === 'crystal' ? 0.9 : 0.3,
      roughness: planet.texture === 'sun' ? 0.2 : 0.6
    }
  }, [planet, isHovered])

  useFrame((state) => {
    if (!meshRef.current) return
    
    // Self rotation
    meshRef.current.rotation.y += 0.005
    
    // Gentle float
    meshRef.current.position.y = planet.position[1] + Math.sin(state.clock.elapsedTime * planet.orbitSpeed) * 0.1
    
    // Glow pulse
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
    }
    
    // Rings rotation
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group position={planet.position}>
      {/* Glow sphere */}
      <mesh ref={glowRef} scale={isHovered ? 1.4 : 1.2}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshBasicMaterial 
          color={planet.color} 
          transparent 
          opacity={isHovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Main planet */}
      <mesh 
        ref={meshRef}
        onPointerEnter={() => onHover(planet)}
        onPointerLeave={onLeave}
        scale={isHovered ? 1.15 : 1}
      >
        <sphereGeometry args={[planet.size, 64, 64]} />
        <meshStandardMaterial {...material} />
      </mesh>
      
      {/* Rings for certain planets */}
      {(planet.texture === 'golden' || planet.texture === 'crystal') && (
        <mesh ref={ringsRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[planet.size * 1.5, 0.03, 16, 100]} />
          <meshBasicMaterial color={planet.color} transparent opacity={0.5} />
        </mesh>
      )}
      
      {/* Orbit trail */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <ringGeometry args={[planet.size * 0.9, planet.size * 0.95, 64]} />
        <meshBasicMaterial color={planet.color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Label (HTML) */}
      {isHovered && (
        <Html center position={[0, planet.size + 0.5, 0]} className="pointer-events-none">
          <div className="text-center whitespace-nowrap animate-fadeIn">
            <div className="font-heading text-lg tracking-wider mb-1" style={{ color: planet.color, textShadow: `0 0 20px ${planet.color}` }}>
              {planet.name}
            </div>
            <div className="font-mono text-[10px] text-white/60">{planet.type}</div>
          </div>
        </Html>
      )}
    </group>
  )
}

/* ─── Connection Lines ─── */
function ConnectionLines({ planets }) {
  const linesRef = useRef()
  
  const linePositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < planets.length; i++) {
      const next = planets[(i + 1) % planets.length]
      positions.push(
        ...planets[i].position,
        ...next.position
      )
    }
    return new Float32Array(positions)
  }, [planets])

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={linePositions.length / 3}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00f0ff" transparent opacity={0.15} />
    </lineSegments>
  )
}

/* ─── Central Black Hole ─── */
function CentralBlackHole() {
  const meshRef = useRef()
  const discRef = useRef()
  
  useFrame((state) => {
    if (discRef.current) {
      discRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group position={[0, 0, -8]}>
      {/* Event horizon */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* Accretion disk */}
      <mesh ref={discRef} rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[3, 0.8, 4, 100]} />
        <meshBasicMaterial 
          color="#7f00ff" 
          transparent 
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner glow */}
      <pointLight color="#7f00ff" intensity={3} distance={15} />
      <pointLight color="#00f0ff" intensity={1} distance={10} position={[0, 2, 0]} />
    </group>
  )
}

/* ─── Scene ─── */
function PlanetScene() {
  const [hoveredPlanet, setHoveredPlanet] = useState(null)

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      <Stars radius={100} depth={50} count={2000} factor={2} fade speed={0.3} />
      
      <CentralBlackHole />
      
      <ConnectionLines planets={PLANETS} />
      
      {PLANETS.map((planet) => (
        <Float key={planet.id} speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <Planet
            planet={planet}
            onHover={setHoveredPlanet}
            onLeave={() => setHoveredPlanet(null)}
            isHovered={hoveredPlanet?.id === planet.id}
          />
        </Float>
      ))}
    </>
  )
}

/* ─── Main Component ─── */
const PlanetNav = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null)

  return (
    <div className="relative w-full h-[600px] lg:h-[700px]">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <PlanetScene />
        </Suspense>
      </Canvas>

      {/* Planet Grid (Fallback / Additional Navigation) */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex flex-wrap justify-center gap-3">
          {PLANETS.map((planet) => (
            <Link
              key={planet.id}
              to={`/events/${planet.id}`}
              className="group px-4 py-2 bg-[#0B0B0D]/80 border backdrop-blur-sm transition-all duration-300 hover:scale-105"
              style={{ 
                borderColor: `${planet.color}30`,
                boxShadow: `0 0 20px ${planet.color}10`
              }}
              onMouseEnter={() => setSelectedPlanet(planet)}
              onMouseLeave={() => setSelectedPlanet(null)}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ 
                    background: planet.color,
                    boxShadow: `0 0 10px ${planet.color}`
                  }}
                />
                <span 
                  className="font-mono text-xs tracking-wider transition-colors"
                  style={{ color: planet.color }}
                >
                  {planet.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Selected Planet Info */}
      {selectedPlanet && (
        <div 
          className="absolute top-6 left-6 p-4 bg-[#0B0B0D]/90 border backdrop-blur-md max-w-xs animate-fadeIn"
          style={{ borderColor: `${selectedPlanet.color}40` }}
        >
          <div className="font-mono text-[10px] mb-2" style={{ color: selectedPlanet.color }}>
            SECTOR DATA //
          </div>
          <div className="font-heading text-xl text-white mb-1">{selectedPlanet.name}</div>
          <div className="font-mono text-xs text-white/60 mb-3">{selectedPlanet.type}</div>
          <div className="text-sm text-[#c2b280]/80">{selectedPlanet.description}</div>
          <Link
            to={`/events/${selectedPlanet.id}`}
            className="inline-block mt-4 px-4 py-2 text-xs font-mono tracking-wider transition-all hover:bg-white/10"
            style={{ 
              color: selectedPlanet.color,
              border: `1px solid ${selectedPlanet.color}40`
            }}
          >
            ENTER SECTOR →
          </Link>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-6 right-6 font-mono text-[10px] text-[#00808a] text-right">
        <div>HOVER: View Sector</div>
        <div>CLICK: Enter Mission</div>
      </div>
    </div>
  )
}

export default PlanetNav
