import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float } from '@react-three/drei'

/* ─── 3D Sun/Star Background ─── */
function SunCore() {
  const meshRef = useRef()
  const coronaRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
    if (coronaRef.current) {
      coronaRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
      coronaRef.current.rotation.z += 0.001
    }
  })

  return (
    <group position={[3, 0, -5]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#ff6622" />
      </mesh>
      <mesh ref={coronaRef} scale={1.3}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#ff8844" transparent opacity={0.3} />
      </mesh>
      <mesh scale={1.8}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#ffaa00" transparent opacity={0.1} />
      </mesh>
      <pointLight color="#ff6622" intensity={5} distance={20} />
    </group>
  )
}

function StellarBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <Stars radius={100} depth={50} count={3000} factor={3} fade />
        <Float speed={0.5} floatIntensity={0.5}>
          <SunCore />
        </Float>
      </Canvas>
    </div>
  )
}

/* ─── Animated Counter ─── */
function AnimatedStat({ value, label, color, delay = 0 }) {
  const [displayed, setDisplayed] = useState(0)
  const targetNum = parseInt(value.replace(/\D/g, '')) || 0
  const suffix = value.replace(/[\d]/g, '')
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0
      const increment = targetNum / 30
      const interval = setInterval(() => {
        current += increment
        if (current >= targetNum) {
          setDisplayed(targetNum)
          clearInterval(interval)
        } else {
          setDisplayed(Math.floor(current))
        }
      }, 50)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [targetNum, delay])

  return (
    <div className="bg-black/40 border border-white/10 p-6 backdrop-blur-sm text-center group hover:bg-white/5 transition-all hover:scale-105 hover:border-[#ff6622]/30">
      <div className="font-heading text-3xl md:text-4xl mb-2 transition-transform group-hover:scale-110" style={{ color }}>
        {suffix.includes('₹') ? '₹' : ''}{displayed.toLocaleString()}{suffix.replace('₹', '')}
      </div>
      <div className="text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase">{label}</div>
    </div>
  )
}

/* ─── Timeline Component ─── */
function Timeline({ items }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#ff6622] via-[#ff6622]/50 to-transparent" />
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex gap-6 group">
            <div className="relative z-10 w-8 h-8 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-[#ff6622] group-hover:scale-150 transition-transform shadow-[0_0_15px_#ff6622]" />
            </div>
            <div className="flex-1 pb-6">
              <div className="font-mono text-xs text-[#ff6622] mb-2">{item.time}</div>
              <div className="font-heading text-lg text-white group-hover:text-[#ffaa00] transition-colors">{item.event}</div>
              {item.description && <p className="text-sm text-white/60 mt-2">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const StellarGenesis = () => {
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])

  const objectives = [
    { title: 'Identify Challenges', desc: 'Discover meaningful real-world problems that technology can solve' },
    { title: 'Design Solutions', desc: 'Create innovative and feasible approaches using cutting-edge tech' },
    { title: 'Build Prototypes', desc: 'Develop functional prototypes that demonstrate your concept' },
    { title: 'Present & Pitch', desc: 'Showcase your solution to our panel of expert judges' }
  ]

  const focusAreas = [
    { icon: '🤖', name: 'Artificial Intelligence', desc: 'ML, NLP, Computer Vision' },
    { icon: '🌐', name: 'Web & App Solutions', desc: 'Full-stack, Mobile, PWA' },
    { icon: '⚡', name: 'Smart Systems', desc: 'IoT, Automation, Edge Computing' },
    { icon: '🔧', name: 'Automation & Productivity', desc: 'Workflow, DevOps, Tools' },
    { icon: '💡', name: 'Open Innovation', desc: 'Any impactful idea welcome' }
  ]

  const evaluationCriteria = [
    { name: 'Innovation & Problem Relevance', weight: 25 },
    { name: 'Technical Implementation', weight: 25 },
    { name: 'Feasibility & Scalability', weight: 20 },
    { name: 'User Experience / Design', weight: 15 },
    { name: 'Presentation & Impact', weight: 15 }
  ]

  const schedule = [
    { time: 'Day 1 - 09:00', event: 'Opening Ceremony', description: 'Welcome address and problem statement reveal' },
    { time: 'Day 1 - 10:00', event: 'Hacking Begins', description: 'Start building your solutions' },
    { time: 'Day 1 - 14:00', event: 'Mentor Session 1', description: 'Get guidance from industry experts' },
    { time: 'Day 1 - 20:00', event: 'Progress Check', description: 'Mid-hackathon checkpoint' },
    { time: 'Day 2 - 08:00', event: 'Final Sprint', description: 'Last stretch of development' },
    { time: 'Day 2 - 12:00', event: 'Submission Deadline', description: 'Final code freeze' },
    { time: 'Day 2 - 14:00', event: 'Presentations', description: 'Demo your solution to judges' },
    { time: 'Day 2 - 18:00', event: 'Awards Ceremony', description: 'Winners announcement' }
  ]

  const rules = [
    'Teams must consist of 2-4 members',
    'All code must be written during the hackathon',
    'Use of open-source libraries and APIs is allowed',
    'Pre-existing projects or code are not permitted',
    'All submissions must include a demo video',
    'Decisions of judges are final'
  ]

  const prizes = [
    { position: '1st', amount: '₹50,000', extras: ['Internship Opportunities', 'Mentorship Program', 'Cloud Credits'] },
    { position: '2nd', amount: '₹30,000', extras: ['Cloud Credits', 'Dev Tools Subscription'] },
    { position: '3rd', amount: '₹20,000', extras: ['Swag Kit', 'Course Vouchers'] }
  ]

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white pb-32 relative overflow-hidden">
      <StellarBackground />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-12 text-xs font-mono tracking-widest text-white/40">
              <Link to="/" className="hover:text-[#ff6622] transition-colors">HOME</Link>
              <span className="text-[#ff6622]">/</span>
              <span className="text-[#ff6622]">STELLAR GENESIS</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-[#ff6622]/10 border border-[#ff6622]/30 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#ff6622] animate-pulse shadow-[0_0_10px_#ff6622]" />
              <span className="font-mono text-xs text-[#ff6622] tracking-[0.2em]">FLAGSHIP HACKATHON</span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
              STELLAR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6622] to-[#ffaa00]">GENESIS</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#c2b280]/80 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
              The premier innovation challenge of IMMERSE 2026. Push beyond conventional thinking 
              and create impactful technology-driven solutions that shape the future.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                className="bg-[#ff6622] text-black font-heading text-sm tracking-widest px-10 py-4 hover:bg-white transition-all shadow-[0_0_30px_-5px_#ff662280]">
                REGISTER YOUR TEAM
              </a>
              <button onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-[#ff6622]/40 text-[#ff6622] font-heading text-sm tracking-widest px-10 py-4 hover:bg-[#ff6622]/10 transition-all">
                VIEW DETAILS
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <AnimatedStat value="₹100000" label="Prize Pool" color="#ffaa00" delay={0} />
              <AnimatedStat value="24-36" label="Hours" color="#ff6622" delay={200} />
              <AnimatedStat value="2-4" label="Team Size" color="#ffffff" delay={400} />
              <AnimatedStat value="500+" label="Participants" color="#00ff88" delay={600} />
            </div>

            <div className="mt-20 animate-bounce">
              <div className="text-[#ff6622]/40 text-3xl">▽</div>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section id="details" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7 space-y-20">
                <div>
                  <h2 className="font-heading text-3xl text-white mb-8 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-[#ff6622]" /> ABOUT THE MISSION
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Stellar Genesis is the premier innovation challenge of IMMERSE 2026, designed to 
                    push participants beyond conventional thinking and inspire the creation of impactful 
                    technology-driven solutions.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    This hackathon encourages teams to identify real-world problems and transform ideas 
                    into scalable prototypes within a high-energy collaborative environment.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-3xl text-white mb-8 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-[#ff6622]" /> MISSION OBJECTIVES
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {objectives.map((obj, i) => (
                      <div key={i} className="group p-6 border border-white/10 bg-black/30 hover:border-[#ff6622]/40 hover:bg-[#ff6622]/5 transition-all">
                        <div className="font-mono text-[#ff6622] text-4xl mb-4 opacity-30 group-hover:opacity-100 transition-opacity">0{i + 1}</div>
                        <h3 className="font-heading text-lg text-white mb-2">{obj.title}</h3>
                        <p className="text-sm text-white/60">{obj.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-3xl text-white mb-8 flex items-center gap-4">
                    <span className="w-12 h-[2px] bg-[#ff6622]" /> EVENT TIMELINE
                  </h2>
                  <Timeline items={schedule} />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="bg-[#15151A] border border-white/10 p-8">
                  <h3 className="font-mono text-xs tracking-[0.2em] text-[#ff6622] mb-6 border-b border-white/10 pb-4">FOCUS AREAS</h3>
                  <div className="space-y-4">
                    {focusAreas.map((area, i) => (
                      <div key={i} className="flex items-start gap-4 p-3 hover:bg-white/5 transition-colors rounded">
                        <span className="text-2xl">{area.icon}</span>
                        <div>
                          <div className="font-heading text-white text-sm">{area.name}</div>
                          <div className="text-xs text-white/50">{area.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#15151A] border border-white/10 p-8">
                  <h3 className="font-mono text-xs tracking-[0.2em] text-[#ff6622] mb-6 border-b border-white/10 pb-4">EVALUATION CRITERIA</h3>
                  <div className="space-y-4">
                    {evaluationCriteria.map((crit, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/80">{crit.name}</span>
                          <span className="text-[#ff6622]">{crit.weight}%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-[#ff6622] to-[#ffaa00] rounded-full" style={{ width: `${crit.weight * 4}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#15151A] border border-white/10 p-8">
                  <h3 className="font-mono text-xs tracking-[0.2em] text-[#ff6622] mb-6 border-b border-white/10 pb-4">RULES & GUIDELINES</h3>
                  <ul className="space-y-3">
                    {rules.map((rule, i) => (
                      <li key={i} className="flex gap-3 text-sm text-white/70">
                        <span className="text-[#ff6622]">▸</span>{rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-32">
              <h2 className="font-heading text-3xl text-white mb-12 text-center">PRIZE <span className="text-[#ffaa00]">CONSTELLATION</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {prizes.map((prize, i) => (
                  <div key={i} className={`relative p-8 text-center border ${i === 0 ? 'border-[#ffaa00]/50 bg-gradient-to-b from-[#ffaa00]/10 to-transparent' : 'border-white/10 bg-black/30'} hover:scale-105 transition-transform`}>
                    {i === 0 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#ffaa00] text-black text-[10px] font-mono tracking-widest">GRAND PRIZE</div>}
                    <div className="font-heading text-5xl mb-2" style={{ color: i === 0 ? '#ffaa00' : i === 1 ? '#c0c0c0' : '#cd7f32' }}>{prize.position}</div>
                    <div className="font-heading text-3xl text-white mb-6">{prize.amount}</div>
                    <ul className="space-y-2">
                      {prize.extras.map((extra, j) => (<li key={j} className="text-sm text-white/60">+ {extra}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-32 text-center">
              <div className="inline-block p-12 border border-[#ff6622]/20 bg-black/50">
                <h3 className="font-heading text-2xl text-white mb-4">Ready to Create the Future?</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">Join hundreds of innovators in the most exciting hackathon of the year.</p>
                <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                  className="inline-block bg-[#ff6622] text-black font-heading text-sm tracking-widest px-12 py-4 hover:bg-white transition-all shadow-[0_0_30px_-5px_#ff662280]">
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

export default StellarGenesis
