import React, { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'

/* --- 3D Rocket/Launch Background --- */
function Rocket({ position }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <coneGeometry args={[0.2, 0.8, 8]} />
        <meshBasicMaterial color="#ffaa00" />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.6, 8]} />
        <meshBasicMaterial color="#ff6622" />
      </mesh>
      <pointLight color="#ff6622" intensity={2} distance={5} position={[0, -1, 0]} />
    </group>
  )
}

function LaunchBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <Stars radius={100} depth={50} count={3000} factor={3} fade />
        <Float speed={0.5} floatIntensity={0.5}>
          <Rocket position={[3, 0, -5]} />
        </Float>
        <ambientLight intensity={0.2} />
      </Canvas>
    </div>
  )
}

const OrbitShift = () => {
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])

  const focusAreas = [
    { icon: '🎯', name: 'Problem-Solution Fit', desc: 'Validate market need' },
    { icon: '💼', name: 'Business Model', desc: 'Revenue & scalability' },
    { icon: '🛠️', name: 'MVP Development', desc: 'Build lean, iterate fast' },
    { icon: '📊', name: 'Pitch Deck', desc: 'Tell your story' },
    { icon: '🤝', name: 'Networking', desc: 'Connect with investors' }
  ]

  const evaluation = [
    { name: 'Innovation & Uniqueness', value: 25 },
    { name: 'Market Potential', value: 25 },
    { name: 'Business Viability', value: 20 },
    { name: 'Team Capability', value: 15 },
    { name: 'Pitch Quality', value: 15 }
  ]

  const schedule = [
    { time: 'Phase 1', event: 'Idea Submission', desc: 'Submit your startup concept' },
    { time: 'Phase 2', event: 'Pitch Deck Review', desc: 'Expert feedback session' },
    { time: 'Phase 3', event: 'Mentorship Round', desc: 'Work with industry mentors' },
    { time: 'Final', event: 'Demo Day', desc: 'Pitch to investors' }
  ]

  const prizes = [
    { position: '1st', amount: '₹1,00,000', extras: ['Seed Funding', 'Incubation Support'] },
    { position: '2nd', amount: '₹50,000', extras: ['Mentorship Program'] },
    { position: '3rd', amount: '₹25,000', extras: ['Cloud Credits'] }
  ]

  return (
    <div className="min-h-screen bg-[#0a0800] text-white pb-32 relative overflow-hidden">
      <LaunchBackground />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-12 text-xs font-mono tracking-widest text-white/40">
              <Link to="/" className="hover:text-[#ffaa00] transition-colors">HOME</Link>
              <span className="text-[#ffaa00]">/</span>
              <span className="text-[#ffaa00]">ORBIT SHIFT</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-[#ffaa00]/30 bg-[#ffaa00]/10 rounded-full">
              <span className="font-mono text-xs text-[#ffaa00] tracking-[0.2em]">STARTUP INCUBATOR</span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight tracking-tight">
              ORBIT <span className="text-[#ffaa00]">SHIFT</span>
            </h1>

            <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto font-light mb-12">
              Where groundbreaking ideas meet real-world impact. Pitch your startup vision 
              and compete for seed funding, mentorship, and incubation support.
            </p>

            <div className="flex justify-center gap-12 mb-12">
              <div className="text-center">
                <div className="text-3xl font-heading text-[#ffaa00]">₹1L+</div>
                <div className="text-[10px] tracking-[0.2em] text-white/40 mt-1">SEED FUNDING</div>
              </div>
              <div className="w-px h-12 bg-[#ffaa00]/20" />
              <div className="text-center">
                <div className="text-3xl font-heading text-white">2-4</div>
                <div className="text-[10px] tracking-[0.2em] text-white/40 mt-1">TEAM SIZE</div>
              </div>
            </div>

            <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
              className="inline-block bg-[#ffaa00] text-black font-heading text-sm tracking-widest px-10 py-4 hover:bg-white transition-all shadow-[0_0_40px_-10px_#ffaa0060] rounded-full">
              PITCH YOUR VISION
            </a>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
              {/* Focus Areas Card */}
              <div className="bg-[#110d00] border border-[#ffaa00]/20 p-8 hover:border-[#ffaa00] transition-colors">
                <h2 className="font-heading text-xl text-white mb-6 tracking-wide">FOCUS AREAS</h2>
                <div className="space-y-4">
                  {focusAreas.map((area, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <span className="text-2xl">{area.icon}</span>
                      <div>
                        <div className="text-white font-heading text-sm group-hover:text-[#ffaa00] transition-colors">{area.name}</div>
                        <div className="text-white/50 text-xs">{area.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Criteria Card */}
              <div className="bg-[#110d00] border border-[#ffaa00]/20 p-8 hover:border-[#ffaa00] transition-colors">
                <h2 className="font-heading text-xl text-white mb-6 tracking-wide">JUDGING CRITERIA</h2>
                <div className="space-y-4">
                  {evaluation.map((crit, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/70">{crit.name}</span>
                        <span className="text-[#ffaa00]">{crit.value}%</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#ffaa00] to-[#ff6622]" style={{ width: `${crit.value * 4}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Roadmap Card */}
              <div className="bg-[#110d00] border border-[#ffaa00]/20 p-8 hover:border-[#ffaa00] transition-colors md:col-span-2 lg:col-span-1">
                <h2 className="font-heading text-xl text-white mb-6 tracking-wide">ROADMAP</h2>
                <div className="space-y-6">
                  {schedule.map((slot, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-[#ffaa00] text-black flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-[0_0_10px_#ffaa00]">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-white font-heading text-sm">{slot.event}</div>
                        <div className="text-white/50 text-xs">{slot.desc}</div>
                        <div className="text-[#ffaa00]/60 text-xs font-mono">{slot.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prizes */}
            <div className="mb-32">
              <h2 className="font-heading text-3xl text-white mb-12 text-center">FUNDING <span className="text-[#ffaa00]">POOL</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {prizes.map((prize, i) => (
                  <div key={i} className={`p-8 text-center border ${i === 0 ? 'border-[#ffaa00]/50 bg-gradient-to-b from-[#ffaa00]/10 to-transparent' : 'border-white/10 bg-black/30'} hover:scale-105 transition-transform`}>
                    <div className="font-heading text-4xl mb-2" style={{ color: i === 0 ? '#ffaa00' : i === 1 ? '#c0c0c0' : '#cd7f32' }}>{prize.position}</div>
                    <div className="font-heading text-2xl text-white mb-4">{prize.amount}</div>
                    <ul className="space-y-1">
                      {prize.extras.map((extra, j) => (<li key={j} className="text-xs text-white/60">+ {extra}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block p-12 border border-[#ffaa00]/20 bg-black/50">
                <h3 className="font-heading text-2xl text-white mb-4">Ready to Launch Your Startup?</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">Transform your idea into reality.</p>
                <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                  className="inline-block bg-[#ffaa00] text-black font-heading text-sm tracking-widest px-12 py-4 hover:bg-white transition-all">
                  REGISTER NOW
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default OrbitShift
