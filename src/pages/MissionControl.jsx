import React, { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, Ring } from '@react-three/drei'

/* --- 3D Space Station Background --- */
function SpaceStation({ position }) {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={0.5} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 2, 16]} />
          <meshBasicMaterial color="#00ff88" wireframe opacity={0.3} transparent />
        </mesh>
        <Ring args={[0.8, 1, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00ff88" opacity={0.4} transparent />
        </Ring>
      </group>
    </Float>
  )
}

function StationBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <Stars radius={100} depth={50} count={3000} factor={2} fade />
        <SpaceStation position={[3, 1, -5]} />
        <SpaceStation position={[-4, -1, -8]} />
        <ambientLight intensity={0.2} />
      </Canvas>
    </div>
  )
}

const MissionControl = () => {
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])

  const objectives = [
    'Master cutting-edge development methodologies',
    'Build real-world applications with industry tools',
    'Learn directly from experienced professionals',
    'Network with peers and industry experts',
    'Gain hands-on experience with modern tech stacks'
  ]

  const modules = [
    { icon: '🚀', name: 'Web Development', desc: 'React, Next.js, Modern CSS' },
    { icon: '🤖', name: 'AI/ML Fundamentals', desc: 'Python, TensorFlow, OpenAI' },
    { icon: '☁️', name: 'Cloud & DevOps', desc: 'AWS, Docker, CI/CD' },
    { icon: '📱', name: 'Mobile Development', desc: 'Flutter, React Native' }
  ]

  const schedule = [
    { time: 'Session 1', event: 'Opening & Fundamentals', desc: 'Foundation concepts' },
    { time: 'Session 2', event: 'Hands-on Workshop', desc: 'Build your first project' },
    { time: 'Session 3', event: 'Advanced Techniques', desc: 'Pro tips and tricks' },
    { time: 'Session 4', event: 'Q&A with Experts', desc: 'Industry insights' }
  ]

  return (
    <div className="min-h-screen bg-[#001008] text-white pb-32 relative overflow-hidden">
      <StationBackground />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-12 text-xs font-mono tracking-widest text-[#00ff88]/40">
              <Link to="/" className="hover:text-[#00ff88] transition-colors">HOME</Link>
              <span className="text-[#00ff88]">/</span>
              <span className="text-[#00ff88]">MISSION CONTROL</span>
            </div>

            <div className="border border-[#00ff88]/30 bg-[#00150a]/80 backdrop-blur-md p-12 relative shadow-[0_0_40px_-10px_#00ff8820]">
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#00ff88]" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#00ff88]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#00ff88]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#00ff88]" />
              
              <div className="text-[10px] font-mono tracking-[0.4em] text-[#00ff88] mb-4 uppercase">Training Module</div>
              <h1 className="text-5xl md:text-7xl font-heading text-white tracking-tight mb-8">MISSION CONTROL</h1>
              
              <p className="text-xl text-[#ccffdd]/80 leading-relaxed font-light max-w-2xl mx-auto mb-12">
                An intensive workshop series designed to equip participants with practical skills 
                in modern development practices. Learn from industry experts and build real-world projects.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-12">
                {[
                  { label: 'TYPE', value: 'WORKSHOP', color: '#00ff88' },
                  { label: 'DURATION', value: '4-6 HRS', color: '#ffffff' },
                  { label: 'LEVEL', value: 'ALL', color: '#ffaa00' }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="font-heading text-2xl" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-[10px] font-mono tracking-[0.2em] text-white/40 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                className="inline-block bg-[#00ff88] text-[#002211] font-heading text-sm tracking-widest px-12 py-4 hover:bg-white hover:scale-105 transition-all shadow-[0_0_40px_-5px_#00ff8860]">
                ENROLL NOW
              </a>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-16">
                <div>
                  <h2 className="text-[#00ff88] font-mono text-sm tracking-[0.2em] mb-8 border-b border-[#00ff88]/20 pb-4">
                    TRAINING OBJECTIVES
                  </h2>
                  <ul className="space-y-6">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-4 group">
                        <div className="mt-1.5 w-3 h-3 border border-[#00ff88]/50 flex items-center justify-center group-hover:border-[#00ff88] transition-colors shrink-0">
                          <div className="w-1.5 h-1.5 bg-[#00ff88] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-white/90">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-[#00ff88] font-mono text-sm tracking-[0.2em] mb-8 border-b border-[#00ff88]/20 pb-4">
                    SESSION PLAN
                  </h2>
                  <div className="space-y-4">
                    {schedule.map((slot, i) => (
                      <div key={i} className="flex justify-between border-b border-[#00ff88]/10 pb-4 group hover:pl-2 transition-all">
                        <div>
                          <div className="text-white text-lg group-hover:text-[#00ff88] transition-colors font-heading">{slot.event}</div>
                          <div className="text-white/50 text-sm">{slot.desc}</div>
                        </div>
                        <span className="text-[#00ff88]/60 font-mono text-xs pt-1">{slot.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[#00ff88] font-mono text-sm tracking-[0.2em] mb-8 border-b border-[#00ff88]/20 pb-4">
                  FOCUS MODULES
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {modules.map((mod, i) => (
                    <div key={i} className="group p-6 bg-[#00150a] border border-[#00ff88]/20 hover:border-[#00ff88]/50 hover:bg-[#00ff88]/5 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{mod.icon}</div>
                        <div>
                          <h3 className="font-heading text-xl text-white group-hover:text-[#00ff88] transition-colors">{mod.name}</h3>
                          <p className="text-sm text-white/50 mt-1">{mod.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 border border-[#00ff88]/30 bg-[#001810]">
                  <h3 className="font-mono text-xs tracking-[0.2em] text-[#00ff88] mb-4">WHAT YOU GET</h3>
                  <ul className="space-y-2">
                    {['Certificate of Completion', 'Workshop Materials', 'Project Templates', 'Community Access', 'Mentor Support'].map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-white/70">
                        <span className="text-[#00ff88]">+</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-32 text-center">
              <div className="inline-block p-12 border border-[#00ff88]/20 bg-black/50">
                <h3 className="font-heading text-2xl text-white mb-4">Ready to Level Up?</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">Join hands-on workshops led by industry experts.</p>
                <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                  className="inline-block bg-[#00ff88] text-black font-heading text-sm tracking-widest px-12 py-4 hover:bg-white transition-all">
                  ENROLL NOW
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MissionControl
