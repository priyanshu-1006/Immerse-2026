import React, { useLayoutEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

/* --- 3D Matrix/Hacker Background --- */
function MatrixRain() {
  const groupRef = useRef()
  const count = 100
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5
    }
    return pos
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      const positions = groupRef.current.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] -= 0.05
        if (positions[i * 3 + 1] < -10) {
          positions[i * 3 + 1] = 10
        }
      }
      groupRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={groupRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00ff44" size={0.05} transparent opacity={0.8} />
    </points>
  )
}

function HackerBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <Stars radius={100} depth={50} count={1000} factor={2} fade />
        <MatrixRain />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}

const EventHorizon = () => {
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])

  const attackVectors = [
    { code: '0x0F', name: 'Web Exploitation', desc: 'SQL injection, XSS, CSRF' },
    { code: '0x1F', name: 'Binary Analysis', desc: 'Reverse engineering, buffer overflow' },
    { code: '0x2F', name: 'Cryptography', desc: 'Encryption breaking, hash cracking' },
    { code: '0x3F', name: 'Forensics', desc: 'Log analysis, memory forensics' },
    { code: '0x4F', name: 'OSINT', desc: 'Open source intelligence gathering' },
    { code: '0x5F', name: 'Network Security', desc: 'Packet analysis, protocol exploitation' }
  ]

  const evaluation = [
    { name: 'Flag Captures', status: 'OK' },
    { name: 'Time to Solution', status: 'OK' },
    { name: 'Hint Usage', status: 'OK' },
    { name: 'First Blood Bonus', status: 'OK' }
  ]

  const schedule = [
    { time: '09:00', event: 'Portal Opens', desc: 'Access the CTF platform' },
    { time: '09:30', event: 'Challenge Release', desc: 'First wave of challenges' },
    { time: '14:00', event: 'Wave 2', desc: 'Additional challenges unlocked' },
    { time: '18:00', event: 'Final Wave', desc: 'Expert-level challenges' },
    { time: '21:00', event: 'Competition Ends', desc: 'Scoreboard freeze' }
  ]

  const rules = [
    'No attacking the CTF infrastructure',
    'No sharing flags with other teams',
    'No brute-forcing unless intended',
    'Maximum team size: 3 members'
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-32 relative overflow-hidden">
      <HackerBackground />
      
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-20"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff44 2px, #00ff44 4px)' }}
      />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8 text-xs font-mono text-[#00ff44]/40">
              <Link to="/" className="hover:text-[#00ff44] transition-colors">HOME</Link>
              <span className="text-[#00ff44]">/</span>
              <span className="text-[#00ff44]">EVENT_HORIZON</span>
            </div>

            <div className="text-center border border-[#00ff44]/30 p-12 bg-[#050505] relative shadow-[0_0_30px_-10px_#00ff4420]">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff44]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ff44]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ff44]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff44]" />

              <div className="text-xs font-bold text-[#00ff44] mb-6 uppercase tracking-widest border-b border-[#00ff44]/20 pb-2 inline-block font-mono">
                CYBERSECURITY CTF
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 uppercase leading-tight font-heading">
                EVENT <span className="text-[#00ff44]">&gt; HORIZON_</span>
              </h1>

              <p className="text-lg md:text-xl text-[#00dd33] leading-relaxed font-mono mb-8">
                Enter the dark side of cyberspace. A Capture The Flag competition that tests 
                your hacking skills across multiple security domains.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-8 font-mono text-sm">
                {[
                  { label: 'DIFFICULTY', value: 'ADVANCED', color: '#ff4444' },
                  { label: 'MODE', value: 'TEAM', color: '#00ff44' },
                  { label: 'DURATION', value: '12 HRS', color: '#ffffff' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-[10px] text-white/40 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                className="inline-block bg-[#00ff44] text-black font-bold text-lg px-12 py-4 hover:invert transition-all uppercase tracking-widest shadow-[0_0_20px_#00ff4480] font-mono">
                EXECUTE_PROTOCOL
              </a>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
              {/* Attack Vectors */}
              <div>
                <h2 className="text-[#00ff44] text-sm mb-8 bg-[#00ff44] text-black inline-block px-3 py-1 font-bold font-mono">
                  ATTACK VECTORS
                </h2>
                <div className="space-y-4 font-mono border-l border-[#00ff44]/30 pl-4">
                  {attackVectors.map((vector, i) => (
                    <div key={i} className="group hover:bg-[#00ff4410] px-4 py-2 -ml-4 transition-colors">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-[#005511]">[{vector.code}] ::</span>
                        <span className="text-[#00ff44] group-hover:text-white transition-colors font-bold">{vector.name}</span>
                      </div>
                      <div className="text-xs text-white/40 ml-16">{vector.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal */}
              <div className="font-mono text-xs bg-[#001105] border border-[#00aa22] p-6 shadow-inner">
                <div className="text-[#00ff44] border-b border-[#00ff44]/30 mb-4 pb-1 font-bold tracking-widest">
                  SYSTEM_LOGS / SCORING.LOG
                </div>
                <div className="space-y-2 opacity-80 mb-6">
                  {evaluation.map((crit, i) => (
                    <div key={i} className="flex gap-3 group hover:bg-[#00220a] px-2 -mx-2 transition-colors">
                      <span className="text-[#005511] w-12 shrink-0">CHECK:</span>
                      <span className="text-white group-hover:text-[#00ff44] transition-colors flex-1">{crit.name}</span>
                      <span className="text-[#00ff44]">{crit.status}</span>
                    </div>
                  ))}
                </div>
                <div className="animate-pulse text-[#00ff44]">_ awaiting input</div>
              </div>
            </div>

            {/* Schedule & Rules */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
              <div>
                <h2 className="text-[#00ff44] text-sm mb-8 bg-[#00ff44] text-black inline-block px-3 py-1 font-bold font-mono">
                  TIMELINE
                </h2>
                <div className="space-y-4">
                  {schedule.map((slot, i) => (
                    <div key={i} className="flex gap-6 p-4 border-b border-[#00ff44]/10 hover:bg-[#00ff4410] transition-colors group font-mono">
                      <span className="text-[#00ff44] text-sm w-16 shrink-0">{slot.time}</span>
                      <div>
                        <div className="text-white font-bold group-hover:text-[#00ff44] transition-colors">{slot.event}</div>
                        <div className="text-xs text-white/40">{slot.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[#00ff44] text-sm mb-8 bg-[#00ff44] text-black inline-block px-3 py-1 font-bold font-mono">
                  RULES OF ENGAGEMENT
                </h2>
                <ul className="space-y-3 font-mono">
                  {rules.map((rule, i) => (
                    <li key={i} className="flex gap-3 text-sm text-white/70">
                      <span className="text-[#00ff44]">&gt;</span>{rule}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-6 border border-[#ff4444]/30 bg-[#220000]">
                  <div className="text-xs font-mono text-[#ff4444] mb-2">WARNING</div>
                  <p className="text-sm text-white/60">Attempting to attack the CTF infrastructure will result in immediate disqualification.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block p-12 border border-[#00ff44]/20 bg-black/80">
                <h3 className="font-heading text-2xl text-white mb-4">Ready to Hack?</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto font-mono">Capture flags. Claim glory.</p>
                <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                  className="inline-block bg-[#00ff44] text-black font-heading text-sm tracking-widest px-12 py-4 hover:invert transition-all font-mono">
                  ./REGISTER
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default EventHorizon
