import React, { useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import CountdownTimer from '../components/CountdownTimer'
import Carousel from '../components/Carousel'

/* ═══════════════════════════════════════════════════════════════════
   GARGANTUA - Interstellar Black Hole Effect
═══════════════════════════════════════════════════════════════════ */
function Gargantua() {
  const accretionRef = useRef()
  const outerRingRef = useRef()
  const gravitationalLensingRef = useRef()

  const accretionParticles = useMemo(() => {
    const count = 1500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 * 5
      const radius = 1.5 + (i / count) * 2
      const height = (Math.random() - 0.5) * 0.1
      
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(angle) * radius
      
      const t = i / count
      colors[i * 3] = 1 - t * 0.5
      colors[i * 3 + 1] = 0.3 + t * 0.5
      colors[i * 3 + 2] = 0.1 + t * 0.9
    }
    return { positions, colors }
  }, [])

  const lensRingParticles = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const radius = 4.5 + Math.sin(i * 0.3) * 0.2
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.3
      positions[i * 3 + 2] = 0
    }
    return positions
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (accretionRef.current) {
      accretionRef.current.rotation.y = t * 0.5
      accretionRef.current.rotation.x = 0.3
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.1
    }
    if (gravitationalLensingRef.current) {
      gravitationalLensingRef.current.rotation.z = -t * 0.15
    }
  })

  return (
    <group position={[0, 0.5, -5]}>
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.05, 16, 100]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.8} />
      </mesh>
      <points ref={accretionRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={1500} array={accretionParticles.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={1500} array={accretionParticles.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} />
      </points>
      <group ref={gravitationalLensingRef}>
        <mesh><torusGeometry args={[2.5, 0.02, 16, 100]} /><meshBasicMaterial color="#00f0ff" transparent opacity={0.15} /></mesh>
        <mesh rotation={[0, Math.PI / 4, 0]}><torusGeometry args={[2.8, 0.015, 16, 100]} /><meshBasicMaterial color="#7f00ff" transparent opacity={0.1} /></mesh>
      </group>
      <points ref={outerRingRef}>
        <bufferGeometry><bufferAttribute attach="attributes-position" count={200} array={lensRingParticles} itemSize={3} /></bufferGeometry>
        <pointsMaterial size={0.03} color="#00f0ff" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  )
}

function WormholePortal() {
  const ringRefs = useRef([])
  useFrame((state) => {
    const t = state.clock.elapsedTime
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z = t * (0.1 + i * 0.05) * (i % 2 ? 1 : -1)
        ring.scale.setScalar(1 + Math.sin(t + i) * 0.02)
      }
    })
  })
  return (
    <group position={[0, 0, -15]}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} ref={el => ringRefs.current[i] = el} position={[0, 0, -i * 2]}>
          <torusGeometry args={[3 + i * 0.5, 0.02, 16, 100]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#00f0ff' : '#7f00ff'} transparent opacity={0.3 - i * 0.05} />
        </mesh>
      ))}
    </group>
  )
}

function OrbitingParticles() {
  const ref = useRef()
  const particles = useMemo(() => {
    const count = 100
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 5 + Math.random() * 10
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = Math.sin(angle) * radius - 10
    }
    return positions
  }, [])
  useFrame((state) => { if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02 })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" count={100} array={particles} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} />
    </points>
  )
}

function InterstellarBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={['#020204']} />
        <Stars radius={100} depth={80} count={5000} factor={4} fade speed={0.3} />
        <Gargantua />
        <WormholePortal />
        <OrbitingParticles />
        <ambientLight intensity={0.05} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020204] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_transparent_0%,_#020204_70%)] pointer-events-none" />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   EVENT & SPONSOR CARDS
═══════════════════════════════════════════════════════════════════ */
const EVENTS = [
  { id: 'stellar-genesis', name: 'Stellar Genesis', type: 'Hackathon', icon: '🌟', color: '#ff6622', desc: '24-hour innovation marathon' },
  { id: 'cosmic-intelligence', name: 'Cosmic Intelligence', type: 'AI/ML', icon: '🧠', color: '#00f0ff', desc: 'AI & Machine Learning challenge' },
  { id: 'quantum-logic', name: 'Quantum Logic', type: 'Coding', icon: '⚡', color: '#7f00ff', desc: 'Competitive coding battles' },
  { id: 'mission-control', name: 'Mission Control', type: 'Workshop', icon: '🛸', color: '#00ff88', desc: 'Expert-led workshops' },
  { id: 'orbit-shift', name: 'Orbit Shift', type: 'Startup', icon: '🚀', color: '#ffaa00', desc: 'Pitch your startup idea' },
  { id: 'synthetic-cosmos', name: 'Synthetic Cosmos', type: 'Creative', icon: '🎨', color: '#ff00aa', desc: 'AI-powered creativity' },
  { id: 'event-horizon', name: 'Event Horizon', type: 'Cyber', icon: '🔐', color: '#00ff00', desc: 'Cybersecurity CTF' },
]

function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}`} className="group relative block h-full overflow-hidden no-underline">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${event.color}15, transparent, ${event.color}10)` }} />
      
      <div className="relative h-full p-6 lg:p-8 bg-[#08080a]/90 border border-white/[0.08] backdrop-blur-xl transition-all duration-500 group-hover:border-white/20">
        <div className="text-4xl lg:text-5xl mb-5 transition-transform duration-500 group-hover:scale-110"
          style={{ filter: `drop-shadow(0 0 20px ${event.color}50)` }}>
          {event.icon}
        </div>
        <h3 className="font-heading text-lg lg:text-xl text-white/90 mb-2 group-hover:text-white transition-colors tracking-wide">
          {event.name}
        </h3>
        <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: event.color }}>
          {event.type}
        </div>
        <p className="text-sm text-white/35 leading-relaxed">{event.desc}</p>
        <div className="absolute bottom-5 right-5 w-8 h-8 flex items-center justify-center border border-white/10 text-white/30 group-hover:border-[#00f0ff]/50 group-hover:text-[#00f0ff] transition-all duration-300">→</div>
      </div>
    </Link>
  )
}

const SPONSORS = [
  { name: 'Google', tier: 'Title' },
  { name: 'Microsoft', tier: 'Platinum' },
  { name: 'GitHub', tier: 'Platinum' },
  { name: 'Vercel', tier: 'Gold' },
]

function SponsorCard({ sponsor }) {
  return (
    <div className="flex items-center justify-center h-24 lg:h-28 px-8 bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-[#00f0ff]/20 hover:bg-white/[0.05] transition-all duration-500">
      <span className="font-heading text-lg lg:text-xl text-white/50 tracking-[0.15em] hover:text-white/80 transition-colors">
        {sponsor.name.toUpperCase()}
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN HOME PAGE - Bold Hero Design
═══════════════════════════════════════════════════════════════════ */
const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <InterstellarBackground />
      
      {/* Section Navigation Dots - Right Side */}
      <div className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full border transition-all duration-300 cursor-pointer hover:border-[#00f0ff] hover:bg-[#00f0ff]/20 ${
              i === 0 ? 'border-[#00f0ff] bg-[#00f0ff]' : 'border-white/20'
            }`}
          />
        ))}
      </div>

      <div className="relative z-10">
        
        {/* ═════════════════════════════════════════════════════════════
            HERO SECTION - Bold Design
        ═════════════════════════════════════════════════════════════ */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 text-center">
          
          {/* HUD Frame Container */}
          <div className="relative w-full max-w-5xl mx-auto p-8 sm:p-12 lg:p-16">
            
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#00f0ff]/40" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#00f0ff]/40" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#00f0ff]/40" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#00f0ff]/40" />
            
            {/* Status Indicator */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88,0_0_20px_#00ff8880] animate-pulse" />
              <span className="font-mono text-xs sm:text-sm text-[#00ff88] tracking-[0.3em] uppercase">
                SYSTEMS ONLINE // IMMERSE 2026
              </span>
            </div>
            
            {/* Subtext */}
            <div className="font-mono text-[10px] sm:text-xs text-white/30 tracking-[0.4em] mb-10">
              NATIONAL TECH FEST // GDG MMMUT
            </div>
            
            {/* Main Title - IMMERSE */}
            <div className="relative mb-2">
              <h1 
                className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] leading-[0.85] tracking-[0.05em]"
                style={{
                  background: 'linear-gradient(180deg, #00f0ff 0%, #00a8b0 50%, #007080 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 80px rgba(0, 240, 255, 0.3)',
                  filter: 'drop-shadow(0 0 40px rgba(0, 240, 255, 0.2))'
                }}
              >
                IMMERSE
              </h1>
            </div>
            
            {/* Year - 2026 */}
            <div 
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-[0.15em] mb-10"
              style={{
                background: 'linear-gradient(180deg, #bf00ff 0%, #7f00ff 50%, #5000a0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 60px rgba(127, 0, 255, 0.3)',
                filter: 'drop-shadow(0 0 30px rgba(127, 0, 255, 0.2))'
              }}
            >
              2026
            </div>
            
            {/* Description */}
            <p className="text-white/50 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              A platform for innovation, intelligence, and transformation.
            </p>
            <p className="text-white/30 text-sm sm:text-base lg:text-lg max-w-xl mx-auto mb-12">
              Experience the future at MMMUT Gorakhpur.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16">
              <Link 
                to="/events" 
                className="group relative px-10 sm:px-14 py-4 sm:py-5 overflow-hidden no-underline border-2 border-[#00f0ff]/60 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 hover:border-[#00f0ff] transition-all duration-500"
              >
                <span className="relative font-heading text-sm sm:text-base text-[#00f0ff] tracking-[0.2em]">
                  EXPLORE MISSIONS
                </span>
              </Link>
              <Link 
                to="/events/stellar-genesis" 
                className="group relative px-10 sm:px-14 py-4 sm:py-5 overflow-hidden no-underline border-2 border-[#7f00ff]/60 bg-[#7f00ff]/10 hover:bg-[#7f00ff]/20 hover:border-[#7f00ff] transition-all duration-500"
              >
                <span className="relative font-heading text-sm sm:text-base text-[#bf00ff] tracking-[0.2em]">
                  HACKATHON BRIEFING
                </span>
              </Link>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
              {[
                { value: '7', label: 'CORE SECTORS', color: '#00f0ff' },
                { value: '24H', label: 'HACKATHON', color: '#00f0ff' },
                { value: '500+', label: 'INNOVATORS', color: '#00ff88' },
                { value: '₹1L+', label: 'PRIZE POOL', color: '#ffaa00' },
              ].map((stat, i) => (
                <div key={i} className="text-center py-4">
                  <div 
                    className="font-heading text-3xl sm:text-4xl lg:text-5xl mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
          
          {/* Countdown Timer - Full Version */}
          <div className="w-full max-w-4xl mx-auto px-4">
            <CountdownTimer />
          </div>

        </section>

        {/* ═════════════════════════════════════════════════════════════
            ABOUT IMMERSE - Short Description
        ═════════════════════════════════════════════════════════════ */}
        <section className="py-24 lg:py-32 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32">
          <div className="max-w-6xl mx-auto">
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Left - Content */}
              <div className="order-2 lg:order-1">
                <div className="font-mono text-[10px] text-[#00f0ff]/50 tracking-[0.4em] mb-6">// LAUNCH PAD</div>
                <h2 className="font-heading text-3xl lg:text-4xl text-white mb-8 tracking-wide">
                  ABOUT <span className="text-[#00f0ff]">IMMERSE</span>
                </h2>
                <p className="text-white/50 leading-relaxed mb-6">
                  IMMERSE is the flagship annual technical festival of MMMUT Gorakhpur, 
                  organized by Google Developer Group On Campus. Inspired by the endless 
                  possibilities of the cosmos, we bring together innovators, developers, 
                  and dreamers for an unforgettable journey.
                </p>
                <p className="text-white/35 leading-relaxed mb-10">
                  With 7 unique missions spanning hackathons, AI challenges, coding battles, 
                  workshops, startup pitches, and cybersecurity CTF — there's a sector for 
                  every kind of tech enthusiast.
                </p>
                
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '7', label: 'Events' },
                    { value: '500+', label: 'Participants' },
                    { value: '₹1L+', label: 'Prizes' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center py-5 border border-white/[0.06] bg-white/[0.02]">
                      <div className="font-heading text-2xl lg:text-3xl text-[#00f0ff] mb-1">{stat.value}</div>
                      <div className="font-mono text-[9px] text-white/30 tracking-[0.2em]">{stat.label.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Visual */}
              <div className="relative order-1 lg:order-2 flex justify-center">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                  <div className="absolute inset-0 rounded-full border border-[#00f0ff]/20 animate-pulse" />
                  <div className="absolute inset-6 rounded-full border border-[#7f00ff]/15 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute inset-12 rounded-full border border-[#00f0ff]/20 animate-pulse" style={{ animationDelay: '1s' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl lg:text-7xl mb-4">🌌</div>
                      <div className="font-heading text-xl lg:text-2xl text-[#00f0ff] tracking-wider">IMMERSE</div>
                      <div className="font-mono text-[10px] text-white/30 tracking-[0.2em] mt-1">2026</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            MISSIONS CAROUSEL
        ═════════════════════════════════════════════════════════════ */}
        <section className="py-24 lg:py-32 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            
            <div className="flex items-end justify-between mb-12 lg:mb-16">
              <div>
                <div className="font-mono text-[10px] text-[#00f0ff]/50 tracking-[0.4em] mb-4">// SECTOR MAP</div>
                <h2 className="font-heading text-3xl lg:text-4xl text-white tracking-wide">MISSIONS</h2>
              </div>
              <Link to="/events" className="hidden sm:flex items-center gap-3 text-white/30 hover:text-[#00f0ff] transition-colors font-mono text-sm tracking-wider no-underline group">
                View All<span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="px-2">
              <Carousel autoPlay interval={5000} itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }} gap={24}>
                {EVENTS.map(event => <EventCard key={event.id} event={event} />)}
              </Carousel>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            PARTNERS CAROUSEL
        ═════════════════════════════════════════════════════════════ */}
        <section className="py-24 lg:py-32 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 border-t border-white/[0.05]">
          <div className="max-w-6xl mx-auto">
            
            <div className="flex items-end justify-between mb-12 lg:mb-16">
              <div>
                <div className="font-mono text-[10px] text-[#00f0ff]/50 tracking-[0.4em] mb-4">// ALLIANCE</div>
                <h2 className="font-heading text-3xl lg:text-4xl text-white tracking-wide">PARTNERS</h2>
              </div>
              <Link to="/sponsors" className="hidden sm:flex items-center gap-3 text-white/30 hover:text-[#00f0ff] transition-colors font-mono text-sm tracking-wider no-underline group">
                View All<span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="px-2">
              <Carousel autoPlay interval={3000} itemsPerView={{ mobile: 2, tablet: 3, desktop: 4 }} gap={20} showDots={false}>
                {SPONSORS.map((sponsor, i) => <SponsorCard key={i} sponsor={sponsor} />)}
              </Carousel>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            STATS
        ═════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-24 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 border-t border-white/[0.05]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                { value: '7', label: 'Events' },
                { value: '24H', label: 'Hackathon' },
                { value: '500+', label: 'Participants' },
                { value: '₹1L+', label: 'Prize Pool' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/[0.05] py-10 px-4 text-center hover:bg-white/[0.03] transition-colors duration-500">
                  <div className="font-heading text-3xl lg:text-4xl text-[#00f0ff] mb-2 tracking-wide">{stat.value}</div>
                  <div className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
