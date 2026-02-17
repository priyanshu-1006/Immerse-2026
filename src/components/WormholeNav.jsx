import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Event Data (7 Planets) ─── */
export const EVENTS = [
  {
    id: 'stellar-genesis',
    name: 'Stellar Genesis',
    type: 'Hackathon',
    color: '#cc4400',
    emissive: '#ff6622',
    description: 'Build from the ground up. 24 hours. One mission. Create the future.',
    icon: '🔨',
    detail: {
      about: 'Stellar Genesis is the flagship 24-hour hackathon. Teams will conceptualize, build, and deploy innovative solutions to real-world problems. From AI-driven tools to blockchain applications, the only limit is your imagination.',
      rules: [
        'Teams of 2-4 members',
        'All code must be written during the event',
        'Use of open-source libraries permitted',
        'Projects judged on innovation, execution, and impact',
        'Final demo + pitch: 5 min presentation',
      ],
      schedule: [
        { time: '09:00', event: 'Registration & Team Formation' },
        { time: '10:00', event: 'Problem Statements Released' },
        { time: '10:30', event: 'Hacking Begins' },
        { time: '18:00', event: 'Mentor Check-in Round 1' },
        { time: '22:00', event: 'Midnight Fuel (Food Break)' },
        { time: '08:00', event: 'Final Submissions' },
        { time: '09:00', event: 'Demos & Judging' },
      ],
      prize: '₹50,000',
    },
  },
  {
    id: 'cosmic-intelligence',
    name: 'Cosmic Intelligence',
    type: 'AI/ML',
    color: '#00ccff',
    emissive: '#00eeff',
    description: 'Unleash artificial minds. Machine learning at the edge of reality.',
    icon: '🧠',
    detail: {
      about: 'Cosmic Intelligence is an AI/ML competition that challenges participants to build intelligent systems. From NLP to computer vision, push the boundaries of what machines can learn and understand.',
      rules: [
        'Individual or duo participation',
        'Pre-trained models allowed with attribution',
        'Dataset will be provided at event start',
        'Evaluation on accuracy, creativity, and efficiency',
        'Submissions via Kaggle-style leaderboard',
      ],
      schedule: [
        { time: '10:00', event: 'Problem Statement Release' },
        { time: '10:30', event: 'Dataset Distribution' },
        { time: '14:00', event: 'Checkpoint 1' },
        { time: '18:00', event: 'Final Submissions' },
        { time: '19:00', event: 'Results & Presentations' },
      ],
      prize: '₹30,000',
    },
  },
  {
    id: 'quantum-logic',
    name: 'Quantum Logic',
    type: 'Competitive Programming',
    color: '#aa44ff',
    emissive: '#cc66ff',
    description: 'Algorithms that bend spacetime. Code at the speed of thought.',
    icon: '💎',
    detail: {
      about: 'Quantum Logic is a competitive programming contest featuring algorithmic challenges ranging from beginner to expert difficulty. Master data structures, dynamic programming, and graph theory under pressure.',
      rules: [
        'Individual participation only',
        'Languages: C++, Java, Python',
        '5 rounds of increasing difficulty',
        'Time-based scoring with penalty for wrong answers',
        'Plagiarism = immediate disqualification',
      ],
      schedule: [
        { time: '10:00', event: 'Contest Begins - Easy Round' },
        { time: '11:00', event: 'Medium Round' },
        { time: '12:30', event: 'Hard Round' },
        { time: '14:00', event: 'Expert Round' },
        { time: '15:00', event: 'Results & Prize Distribution' },
      ],
      prize: '₹25,000',
    },
  },
  {
    id: 'mission-control',
    name: 'Mission Control',
    type: 'Automation & Systems',
    color: '#888888',
    emissive: '#aaaaaa',
    description: 'Command the machines. Automate the impossible.',
    icon: '⚙️',
    detail: {
      about: 'Mission Control focuses on automation, DevOps, and systems engineering. Build CI/CD pipelines, automate infrastructure, or create IoT solutions that demonstrate mastery over complex systems.',
      rules: [
        'Teams of 1-3 members',
        'Use any automation framework or tool',
        'Cloud resources provided (limited)',
        'Live demo required for final evaluation',
        'Documentation quality contributes to scoring',
      ],
      schedule: [
        { time: '10:00', event: 'Challenge Briefing' },
        { time: '10:30', event: 'Building Phase Begins' },
        { time: '15:00', event: 'Mid-Review' },
        { time: '17:00', event: 'Final Demos' },
        { time: '18:00', event: 'Awards' },
      ],
      prize: '₹20,000',
    },
  },
  {
    id: 'orbit-shift',
    name: 'Orbit Shift',
    type: 'Startup Pitch',
    color: '#ffaa00',
    emissive: '#ffcc33',
    description: 'Change trajectories. Pitch ideas that redefine orbits.',
    icon: '🚀',
    detail: {
      about: 'Orbit Shift is the startup pitch competition. Present groundbreaking ideas to a panel of industry mentors and investors. The best pitches win seed funding support and mentorship opportunities.',
      rules: [
        'Teams of 1-4 founders',
        '10-minute pitch + 5-minute Q&A',
        'Slide deck mandatory (max 15 slides)',
        'Must address market size, problem, solution, and revenue model',
        'Working prototype is a bonus',
      ],
      schedule: [
        { time: '10:00', event: 'Opening & Keynote' },
        { time: '11:00', event: 'Pitches Begin (Group A)' },
        { time: '13:00', event: 'Lunch & Networking' },
        { time: '14:00', event: 'Pitches Continue (Group B)' },
        { time: '16:00', event: 'Finals' },
        { time: '17:30', event: 'Winner Announcement' },
      ],
      prize: '₹40,000 + Mentorship',
    },
  },
  {
    id: 'synthetic-cosmos',
    name: 'Synthetic Cosmos',
    type: 'Design & Vision',
    color: '#ff44aa',
    emissive: '#ff66cc',
    description: 'Envision new worlds. Design the interfaces of tomorrow.',
    icon: '🎨',
    detail: {
      about: 'Synthetic Cosmos is a UI/UX design challenge that pushes creative boundaries. Craft futuristic interfaces, design systems, and visual experiences that could exist in a sci-fi universe.',
      rules: [
        'Individual or duo participation',
        'Figma, Adobe XD, or any design tool',
        'Theme revealed at event start',
        'Deliver: Moodboard + 3 key screens + prototype',
        'Presentation: 5-minute design walkthrough',
      ],
      schedule: [
        { time: '10:00', event: 'Theme Reveal' },
        { time: '10:30', event: 'Research & Moodboarding' },
        { time: '12:00', event: 'Design Sprint' },
        { time: '16:00', event: 'Submissions Close' },
        { time: '16:30', event: 'Showcase & Judging' },
      ],
      prize: '₹20,000',
    },
  },
  {
    id: 'event-horizon',
    name: 'Event Horizon',
    type: 'Cybersecurity',
    color: '#44ff44',
    emissive: '#00ff88',
    description: 'Cross the boundary. Hack the unhackable.',
    icon: '🔒',
    detail: {
      about: 'Event Horizon is a Capture The Flag (CTF) cybersecurity competition. Navigate through cryptography, reverse engineering, web exploitation, and forensics challenges to prove your security expertise.',
      rules: [
        'Teams of 1-3 members',
        'Jeopardy-style CTF format',
        'Categories: Web, Crypto, RE, Forensics, Misc',
        'Dynamic scoring based on solve count',
        'No attacking competition infrastructure',
      ],
      schedule: [
        { time: '09:00', event: 'CTF Platform Opens' },
        { time: '09:30', event: 'Easy Challenges Released' },
        { time: '12:00', event: 'Medium Challenges Unlocked' },
        { time: '15:00', event: 'Hard Challenges Unlocked' },
        { time: '18:00', event: 'CTF Closes' },
        { time: '18:30', event: 'Scoreboard Freeze & Awards' },
      ],
      prize: '₹30,000',
    },
  },
]

/* ─── Black Hole Shader ─── */
function BlackHole() {
  const meshRef = useRef()
  const ringRef = useRef()

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.008
    }
  })

  return (
    <group>
      {/* Event horizon - dark sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Accretion disk */}
      <mesh ref={ringRef} rotation={[Math.PI * 0.35, 0, 0]}>
        <torusGeometry args={[1.8, 0.4, 2, 100]} />
        <meshBasicMaterial
          color="#7f00ff"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner glow ring */}
      <mesh rotation={[Math.PI * 0.35, 0, 0]}>
        <torusGeometry args={[1.2, 0.15, 2, 80]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI * 0.35, 0, 0]}>
        <torusGeometry args={[2.5, 0.2, 2, 100]} />
        <meshBasicMaterial
          color="#7f00ff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Photon ring glow */}
      <pointLight position={[0, 0, 0]} color="#7f00ff" intensity={3} distance={8} />
      <pointLight position={[0, 1, 0]} color="#00f0ff" intensity={1.5} distance={6} />
    </group>
  )
}

/* ─── Orbiting Planet ─── */
function Planet({ event, index, total, onHover, onClick }) {
  const meshRef = useRef()
  const orbitRadius = 4 + (index % 2) * 0.8
  const speed = 0.15 + index * 0.02
  const offset = (index / total) * Math.PI * 2

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + offset
      meshRef.current.position.x = Math.cos(t) * orbitRadius
      meshRef.current.position.z = Math.sin(t) * orbitRadius * 0.4
      meshRef.current.position.y = Math.sin(t * 2) * 0.3
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerEnter={() => onHover(event)}
      onPointerLeave={() => onHover(null)}
      onClick={() => onClick(event)}
    >
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial
        color={event.color}
        emissive={event.emissive}
        emissiveIntensity={0.5}
        metalness={0.3}
        roughness={0.6}
      />
      {/* Glow */}
      <pointLight color={event.emissive} intensity={0.8} distance={3} />
    </mesh>
  )
}

/* ─── Orbit Lines ─── */
function OrbitLines() {
  return (
    <>
      {[4, 4.8].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.005, 8, 100]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.08} />
        </mesh>
      ))}
    </>
  )
}

/* ─── 3D Scene ─── */
function WormholeScene({ onHover, onClick }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <BlackHole />
      <OrbitLines />
      {EVENTS.map((event, i) => (
        <Planet
          key={event.id}
          event={event}
          index={i}
          total={EVENTS.length}
          onHover={onHover}
          onClick={onClick}
        />
      ))}
    </>
  )
}

/* ─── Wormhole Navigation Section ─── */
const WormholeNav = ({ onEventSelect }) => {
  const [hoveredEvent, setHoveredEvent] = useState(null)
  const [selectedForDetail, setSelectedForDetail] = useState(null)

  const handlePlanetClick = (event) => {
    setSelectedForDetail(event)
  }

  return (
    <div className="relative min-h-screen py-20">
      {/* Section Header */}
      <div className="text-center mb-8 px-6">
        <div className="font-mono text-xs text-event-dim tracking-[0.3em] mb-3">
          {'>'} NAVIGATION SYSTEM // WORMHOLE GATE
        </div>
        <h2 className="font-heading text-3xl lg:text-5xl text-event mb-4" style={{
          textShadow: '0 0 20px rgba(0,240,255,0.3)',
        }}>
          SECTOR MAP
        </h2>
        <div className="h-px max-w-md mx-auto bg-gradient-to-r from-transparent via-event/40 to-transparent mb-3" />
        <p className="font-body text-dust/70 max-w-xl mx-auto">
          Each planet represents a mission sector. Hover to identify. Click to enter
          the gravitational field and access mission details.
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="relative h-[500px] lg:h-[600px]">
        <Canvas
          camera={{ position: [0, 3, 8], fov: 50 }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
        >
          <WormholeScene
            onHover={setHoveredEvent}
            onClick={handlePlanetClick}
          />
        </Canvas>

        {/* Hover tooltip */}
        {hoveredEvent && (
          <div
            className="absolute top-8 left-1/2 -translate-x-1/2 arwes-frame px-6 py-4 pointer-events-none"
            style={{
              background: 'rgba(11,11,13,0.9)',
              borderColor: hoveredEvent.color,
              maxWidth: '350px',
            }}
          >
            <div className="font-heading text-sm tracking-wider mb-1" style={{ color: hoveredEvent.color }}>
              {hoveredEvent.icon} {hoveredEvent.name}
            </div>
            <div className="font-mono text-xs text-event-dim mb-2">
              TYPE: {hoveredEvent.type}
            </div>
            <div className="font-body text-sm text-dust/80">
              {hoveredEvent.description}
            </div>
          </div>
        )}
      </div>

      {/* Event List (below 3D) */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {EVENTS.map((event) => (
            <button
              key={event.id}
              onClick={() => handlePlanetClick(event)}
              className="text-left p-4 border transition-all duration-300 hover:scale-105 group"
              style={{
                borderColor: `${event.color}33`,
                background: selectedForDetail?.id === event.id
                  ? `${event.color}15`
                  : 'rgba(11,11,13,0.6)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = event.color
                e.currentTarget.style.boxShadow = `0 0 20px ${event.color}33`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${event.color}33`
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{event.icon}</span>
                <span className="font-heading text-xs tracking-wider" style={{ color: event.color }}>
                  {event.name}
                </span>
              </div>
              <div className="font-mono text-[10px] text-event-dim tracking-wider mb-1">
                {event.type}
              </div>
              <div className="font-body text-xs text-dust/60 line-clamp-2">
                {event.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected event detail modal */}
      {selectedForDetail && (
        <EventDetailModal
          event={selectedForDetail}
          onClose={() => setSelectedForDetail(null)}
        />
      )}
    </div>
  )
}

/* ─── Event Detail Modal ─── */
const EventDetailModal = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState('briefing')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const tabs = [
    { id: 'briefing', label: 'BRIEFING' },
    { id: 'protocols', label: 'PROTOCOLS' },
    { id: 'timeline', label: 'TIMELINE' },
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-void/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto"
        style={{
          animation: 'fadeInUp 0.4s ease-out',
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Side - Data */}
          <div className="arwes-frame p-6 lg:p-8" style={{
            background: 'rgba(11,11,13,0.95)',
          }}>
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 font-mono text-event-dim hover:text-event transition-colors"
            >
              [X] CLOSE
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{event.icon}</span>
                <h3 className="font-heading text-xl lg:text-2xl tracking-wider" style={{ color: event.color }}>
                  {event.name}
                </h3>
              </div>
              <div className="font-mono text-xs text-event-dim tracking-wider">
                MISSION TYPE: {event.type} // PRIZE POOL: {event.detail.prize}
              </div>
              <div className="h-px mt-3" style={{
                background: `linear-gradient(90deg, ${event.color}, transparent)`,
              }} />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="font-heading text-xs tracking-wider px-4 py-2 transition-all"
                  style={{
                    color: activeTab === tab.id ? event.color : '#666',
                    borderBottom: activeTab === tab.id
                      ? `2px solid ${event.color}`
                      : '2px solid transparent',
                    background: activeTab === tab.id
                      ? `${event.color}10`
                      : 'transparent',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[200px]">
              {activeTab === 'briefing' && (
                <div className="space-y-4">
                  <p className="font-body text-dust/90 leading-relaxed">
                    {event.detail.about}
                  </p>
                </div>
              )}

              {activeTab === 'protocols' && (
                <div className="space-y-2">
                  {event.detail.rules.map((rule, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 border border-event/10 bg-void/50"
                    >
                      <span className="font-mono text-xs" style={{ color: event.color }}>
                        [{String(i + 1).padStart(2, '0')}]
                      </span>
                      <span className="font-body text-sm text-dust/80">{rule}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-1">
                  {event.detail.schedule.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 border-l-2 transition-all hover:bg-event/5"
                      style={{ borderColor: `${event.color}44` }}
                    >
                      <span className="font-mono text-sm font-bold" style={{ color: event.color }}>
                        {item.time}
                      </span>
                      <div className="w-2 h-2 rounded-full" style={{ background: event.color }} />
                      <span className="font-body text-sm text-dust/80">{item.event}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Register Button */}
            <div className="mt-8">
              <button
                className="btn-primary w-full"
                style={{
                  borderColor: event.color,
                  color: event.color,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${event.color}15`
                  e.currentTarget.style.boxShadow = `0 0 20px ${event.color}33`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                JOIN SQUADRON
              </button>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div
            className="hidden lg:flex items-center justify-center p-8"
            style={{
              background: `radial-gradient(circle at center, ${event.color}15, rgba(11,11,13,0.95))`,
              borderLeft: `1px solid ${event.color}22`,
            }}
          >
            <div className="text-center">
              {/* Large planet visualization */}
              <div
                className="w-48 h-48 rounded-full mx-auto mb-8 relative"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${event.color}ee, ${event.color}44, #111)`,
                  boxShadow: `0 0 60px ${event.color}44, inset 0 0 40px rgba(0,0,0,0.5)`,
                  animation: 'float 4s ease-in-out infinite',
                }}
              >
                {/* Atmosphere */}
                <div
                  className="absolute inset-[-6px] rounded-full"
                  style={{
                    border: `2px solid ${event.color}33`,
                    animation: 'pulse-ring 3s ease-out infinite',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-5xl">
                  {event.icon}
                </div>
              </div>

              <div className="font-heading text-2xl tracking-wider mb-2" style={{ color: event.color }}>
                {event.name}
              </div>
              <div className="font-mono text-sm text-event-dim">
                SECTOR {EVENTS.indexOf(event) + 1} OF {EVENTS.length}
              </div>
              <div className="mt-4 font-heading text-3xl" style={{
                color: event.color,
                textShadow: `0 0 20px ${event.color}66`,
              }}>
                {event.detail.prize}
              </div>
              <div className="font-mono text-xs text-event-dim mt-1">PRIZE POOL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WormholeNav
