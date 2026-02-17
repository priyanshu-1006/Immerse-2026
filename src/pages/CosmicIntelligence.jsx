import React, { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'

/* --- 3D Neural Network Background --- */
function NeuralNode({ position }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2)
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00ccff" />
      </mesh>
      <pointLight color="#00ccff" intensity={0.5} distance={3} />
    </group>
  )
}

function NeuralNetwork() {
  const nodes = [
    [-3, 2, -5], [-1, 1, -4], [1, 2, -6], [3, 0, -5],
    [-2, -1, -4], [0, -2, -5], [2, -1, -6], [4, 1, -4]
  ]
  
  return (
    <group>
      {nodes.map((pos, i) => (
        <Float key={i} speed={1} floatIntensity={0.3}>
          <NeuralNode position={pos} />
        </Float>
      ))}
    </group>
  )
}

function NeuralBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <Stars radius={100} depth={50} count={2000} factor={2} fade />
        <NeuralNetwork />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}

const CosmicIntelligence = () => {
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])

  const focusAreas = [
    { icon: '🤖', name: 'Prompt Engineering', desc: 'Master the art of AI communication' },
    { icon: '🧠', name: 'Logical Reasoning', desc: 'Pattern recognition & deduction' },
    { icon: '📊', name: 'Data Analysis', desc: 'Extract insights from complex datasets' },
    { icon: '💡', name: 'Creative Problem Solving', desc: 'Think outside the neural network' }
  ]

  const objectives = [
    'Demonstrate proficiency in leveraging AI tools effectively',
    'Apply logical reasoning to solve complex multi-step problems',
    'Optimize prompts for maximum AI output quality',
    'Analyze and interpret AI-generated responses critically'
  ]

  const schedule = [
    { time: 'Round 1', event: 'Prompt Crafting Challenge', desc: 'Create optimal prompts for specific tasks' },
    { time: 'Round 2', event: 'Logic Labyrinth', desc: 'Navigate through reasoning puzzles' },
    { time: 'Round 3', event: 'AI Integration Task', desc: 'Build solutions with AI assistance' },
    { time: 'Final', event: 'Neural Nexus', desc: 'Combined challenge for finalists' }
  ]

  const evaluation = [
    { name: 'Prompt Effectiveness', value: 30 },
    { name: 'Logical Accuracy', value: 25 },
    { name: 'Creative Approach', value: 20 },
    { name: 'Time Efficiency', value: 15 },
    { name: 'Presentation', value: 10 }
  ]

  const prizes = [
    { position: '1st', amount: '₹15,000', extras: ['AI Tools Subscription', 'Mentorship'] },
    { position: '2nd', amount: '₹10,000', extras: ['Premium Courses'] },
    { position: '3rd', amount: '₹5,000', extras: ['Swag Kit'] }
  ]

  return (
    <div className="min-h-screen bg-[#050510] text-white pb-32 relative overflow-hidden">
      <NeuralBackground />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-12 text-xs font-mono tracking-widest text-white/40">
              <Link to="/" className="hover:text-[#00ccff] transition-colors">HOME</Link>
              <span className="text-[#00ccff]">/</span>
              <span className="text-[#00ccff]">COSMIC INTELLIGENCE</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#00ccff]/10 border border-[#00ccff]/30 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#00ccff] animate-pulse shadow-[0_0_10px_#00ccff]" />
              <span className="font-mono text-xs text-[#00ccff] tracking-[0.2em]">AI & REASONING CHALLENGE</span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
              COSMIC<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ccff] to-[#0066ff]">INTELLIGENCE</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#aaccff]/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              Test your ability to harness artificial intelligence. Master prompt engineering, 
              logical reasoning, and creative problem-solving in this mind-bending challenge.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                className="bg-[#00ccff] text-black font-heading text-sm tracking-widest px-10 py-4 hover:bg-white transition-all shadow-[0_0_30px_-5px_#00ccff80]">
                INITIALIZE PROTOCOL
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { label: 'DIFFICULTY', value: 'INTERMEDIATE', color: '#00ccff' },
                { label: 'SQUAD', value: '1-2 MEMBERS', color: '#ffffff' },
                { label: 'DURATION', value: '6-12 HRS', color: '#00ff88' }
              ].map((stat, i) => (
                <div key={i} className="bg-[#001122]/60 border border-[#00ccff]/20 p-4 backdrop-blur-sm hover:border-[#00ccff]/50 transition-all">
                  <div className="font-heading text-xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[10px] font-mono tracking-[0.2em] text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7 space-y-20">
                <div>
                  <h2 className="font-heading text-3xl text-white mb-8 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-[#00ccff]" /> ABOUT THE CHALLENGE
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Cosmic Intelligence is designed to test your ability to leverage AI tools, 
                    apply prompt engineering techniques, and demonstrate superior logical reasoning skills.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    Navigate through increasingly complex challenges that require both human creativity 
                    and effective AI collaboration.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-3xl text-white mb-8 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-[#00ccff]" /> FOCUS AREAS
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {focusAreas.map((area, i) => (
                      <div key={i} className="group p-6 border border-[#00ccff]/20 bg-[#001122]/50 hover:border-[#00ccff]/50 hover:bg-[#00ccff]/5 transition-all">
                        <div className="text-4xl mb-4">{area.icon}</div>
                        <h3 className="font-heading text-lg text-white mb-2">{area.name}</h3>
                        <p className="text-sm text-white/60">{area.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-3xl text-white mb-8 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-[#00ccff]" /> COMPETITION ROUNDS
                  </h2>
                  <div className="space-y-4">
                    {schedule.map((round, i) => (
                      <div key={i} className="flex gap-6 p-4 border-b border-[#00ccff]/10 hover:bg-[#00ccff]/5 transition-colors group">
                        <div className="font-mono text-[#00ccff] text-xs w-20 shrink-0 pt-1">{round.time}</div>
                        <div className="flex-1">
                          <div className="font-heading text-lg text-white group-hover:text-[#00ccff] transition-colors">{round.event}</div>
                          <p className="text-sm text-white/50 mt-1">{round.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="bg-[#0a1520] border border-[#00ccff]/20 p-8">
                  <h3 className="font-mono text-xs tracking-[0.2em] text-[#00ccff] mb-6 border-b border-white/10 pb-4">OBJECTIVES</h3>
                  <ul className="space-y-4">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex gap-3 text-sm text-white/70">
                        <span className="text-[#00ccff] font-mono">[{String(i + 1).padStart(2, '0')}]</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#0a1520] border border-[#00ccff]/20 p-8">
                  <h3 className="font-mono text-xs tracking-[0.2em] text-[#00ccff] mb-6 border-b border-white/10 pb-4">EVALUATION METRICS</h3>
                  <div className="space-y-4">
                    {evaluation.map((metric, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/80">{metric.name}</span>
                          <span className="text-[#00ccff]">{metric.value}%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#00ccff] to-[#0066ff] rounded-full" style={{ width: `${metric.value * 3.3}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-32">
              <h2 className="font-heading text-3xl text-white mb-12 text-center">PRIZE <span className="text-[#00ccff]">MATRIX</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {prizes.map((prize, i) => (
                  <div key={i} className={`p-8 text-center border ${i === 0 ? 'border-[#00ccff]/50 bg-gradient-to-b from-[#00ccff]/10 to-transparent' : 'border-white/10 bg-black/30'} hover:scale-105 transition-transform`}>
                    <div className="font-heading text-4xl mb-2" style={{ color: i === 0 ? '#00ccff' : i === 1 ? '#c0c0c0' : '#cd7f32' }}>{prize.position}</div>
                    <div className="font-heading text-2xl text-white mb-4">{prize.amount}</div>
                    <ul className="space-y-1">
                      {prize.extras.map((extra, j) => (<li key={j} className="text-xs text-white/60">+ {extra}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-32 text-center">
              <div className="inline-block p-12 border border-[#00ccff]/20 bg-black/50">
                <h3 className="font-heading text-2xl text-white mb-4">Ready to Test Your Neural Network?</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">Prove your AI mastery and logical prowess.</p>
                <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                  className="inline-block bg-[#00ccff] text-black font-heading text-sm tracking-widest px-12 py-4 hover:bg-white transition-all shadow-[0_0_30px_-5px_#00ccff80]">
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

export default CosmicIntelligence
