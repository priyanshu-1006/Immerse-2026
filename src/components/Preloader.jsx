import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

const BOOT_LINES = [
  { text: 'Initializing TARS neural interface...', type: 'system' },
  { text: 'TARS: "Hello, Commander. Ready for mission briefing."', type: 'tars' },
  { text: 'Loading wormhole navigation systems...', type: 'system' },
  { text: 'Quantum processors: ONLINE', type: 'success' },
  { text: 'Fuel cells: 100% | Oxygen: NOMINAL', type: 'success' },
  { text: 'Analyzing target atmosphere: MMMUT NEXUS', type: 'system' },
  { text: 'TARS: "Atmospheric conditions are favorable."', type: 'tars' },
  { text: 'Endurance propulsion: CHARGED', type: 'success' },
  { text: 'Communication arrays: FREQUENCY LOCKED', type: 'success' },
  { text: 'Event horizon calculations: COMPLETE', type: 'system' },
  { text: 'Wormhole coordinates: [47.2°N, 83.4°E]', type: 'data' },
  { text: 'TARS: "All systems nominal. Cooper, we are GO."', type: 'tars' },
  { text: '', type: 'blank' },
  { text: 'MISSION STATUS: LAUNCH SEQUENCE INITIATED', type: 'launch' },
]

/* ─── 3D Wormhole Effect ─── */
function WormholeTunnel() {
  const ringCount = 20
  const ringsRef = useRef([])

  const rings = useMemo(() => {
    return Array.from({ length: ringCount }, (_, i) => ({
      z: -i * 2,
      scale: 1 + i * 0.05,
      rotation: i * 0.2
    }))
  }, [])

  useFrame((state) => {
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z += 0.005 + i * 0.001
        ring.position.z += 0.1
        if (ring.position.z > 2) {
          ring.position.z = -(ringCount - 1) * 2
        }
      }
    })
  })

  return (
    <group position={[0, 0, -10]}>
      {rings.map((r, i) => (
        <mesh
          key={i}
          ref={el => ringsRef.current[i] = el}
          position={[0, 0, r.z]}
          rotation={[0, 0, r.rotation]}
        >
          <torusGeometry args={[2 + i * 0.1, 0.02, 8, 64]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(0.55 + i * 0.01, 0.8, 0.5)}
            transparent
            opacity={0.3 - i * 0.01}
          />
        </mesh>
      ))}
      <pointLight color="#00f0ff" intensity={2} distance={30} />
    </group>
  )
}

function CentralCore() {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
      meshRef.current.rotation.z += 0.02
    }
  })

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[0.3, 32]} />
      <meshBasicMaterial color="#00f0ff" />
    </mesh>
  )
}

function PreloaderCanvas({ progress }) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <Stars radius={100} depth={50} count={2000} factor={2} fade />
        <WormholeTunnel />
        <CentralCore />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}

/* ─── Animated Stats ─── */
function SystemStat({ label, value, delay }) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0
      const increment = value / 20
      const interval = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayed(value)
          clearInterval(interval)
        } else {
          setDisplayed(Math.floor(current))
        }
      }, 50)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return (
    <div className="text-center">
      <div className="font-heading text-lg text-[#00f0ff]">{displayed}%</div>
      <div className="font-mono text-[8px] text-white/40 tracking-wider">{label}</div>
    </div>
  )
}

const Preloader = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)
  const [phase, setPhase] = useState('boot') // boot, ready, launch
  const indexRef = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => {
    // Play intro sound
    try {
      const audio = new Audio('https://arwes.dev/assets/sounds/intro.mp3')
      audio.volume = 0.3
      audio.play().catch(() => {})
    } catch (e) {}

    function addNextLine() {
      const i = indexRef.current
      if (i >= BOOT_LINES.length) {
        setProgress(100)
        setPhase('launch')
        setTimeout(() => setFading(true), 600)
        setTimeout(() => onComplete(), 1500)
        return
      }

      setVisibleLines((prev) => [...prev, BOOT_LINES[i]])
      setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100))
      indexRef.current = i + 1

      if (i === BOOT_LINES.length - 2) {
        setPhase('ready')
      }

      const delay = BOOT_LINES[i].type === 'tars' ? 400 : 180 + Math.random() * 120
      timerRef.current = setTimeout(addNextLine, delay)
    }

    timerRef.current = setTimeout(addNextLine, 800)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [onComplete])

  const getLineColor = (type) => {
    switch (type) {
      case 'tars': return '#ffaa00'
      case 'success': return '#00ff88'
      case 'data': return '#00ccff'
      case 'launch': return '#ff6622'
      case 'blank': return 'transparent'
      default: return '#aaccff'
    }
  }

  return (
    <div
      className="preloader"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 1s ease-out',
      }}
    >
      {/* 3D Background */}
      <PreloaderCanvas progress={progress} />

      {/* Overlay Content */}
      <div className="relative z-10 w-full max-w-2xl px-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-heading text-4xl text-white tracking-[0.3em] mb-2">
            IMMERSE
          </div>
          <div className="font-mono text-[10px] text-[#00f0ff]/60 tracking-[0.4em]">
            INTERSTELLAR MISSION CONTROL
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8 p-4 border border-[#00f0ff]/10 bg-black/30 backdrop-blur-sm">
          <SystemStat label="POWER" value={100} delay={200} />
          <SystemStat label="SYSTEMS" value={100} delay={400} />
          <SystemStat label="NAV" value={100} delay={600} />
          <SystemStat label="COMM" value={100} delay={800} />
        </div>

        {/* Terminal */}
        <div className="bg-black/60 backdrop-blur-md border border-[#00f0ff]/20 p-6 mb-6 min-h-[300px] max-h-[350px] overflow-hidden relative">
          <div className="absolute top-2 left-4 flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#ff5555]" />
            <div className="w-2 h-2 rounded-full bg-[#ffaa00]" />
            <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
          </div>
          <div className="absolute top-2 right-4 font-mono text-[8px] text-white/30">TARS TERMINAL v2.0</div>
          
          <div className="mt-6 space-y-1">
            {visibleLines.map((line, i) => (
              <div
                key={i}
                className="font-mono text-xs"
                style={{
                  color: getLineColor(line.type),
                  lineHeight: '1.8',
                  animation: 'fadeIn 0.15s ease-out',
                  textShadow: line.type === 'launch' ? '0 0 10px #ff6622' : 'none'
                }}
              >
                {line.text ? (
                  <>
                    <span className="text-white/30 mr-2">{line.type === 'tars' ? '◆' : '>'}</span>
                    {line.text}
                  </>
                ) : '\u00A0'}
              </div>
            ))}
            <span
              className="inline-block w-2 h-4 ml-4"
              style={{
                backgroundColor: phase === 'launch' ? '#ff6622' : '#00ff88',
                animation: 'blink 0.6s step-end infinite',
              }}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-mono text-[10px] text-white/40 tracking-wider">
              {phase === 'boot' ? 'INITIALIZING SYSTEMS' : phase === 'ready' ? 'SYSTEMS READY' : 'LAUNCHING...'}
            </span>
            <span className="font-mono text-[10px] text-[#00f0ff]">{progress}%</span>
          </div>
          <div className="h-1 bg-[#1a1a22] rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300 ease-out rounded-full"
              style={{
                width: `${progress}%`,
                background: phase === 'launch' 
                  ? 'linear-gradient(90deg, #ff6622, #ffaa00)' 
                  : 'linear-gradient(90deg, #00f0ff, #7f00ff)',
                boxShadow: `0 0 15px ${phase === 'launch' ? 'rgba(255,102,34,0.5)' : 'rgba(0,240,255,0.4)'}`,
              }}
            />
          </div>
        </div>

        {/* Mission Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#00f0ff]/20 bg-black/30">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ 
                backgroundColor: phase === 'launch' ? '#ff6622' : '#00ff88',
                animation: 'pulse 1s infinite'
              }}
            />
            <span className="font-mono text-[10px] text-white/60 tracking-[0.2em]">
              MARCH 2026 // MMMUT GORAKHPUR
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preloader
