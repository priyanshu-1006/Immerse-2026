import React, { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, Sphere } from '@react-three/drei'

/* --- 3D Artistic/Chromatic Background --- */
function ArtisticOrb({ position, color, speed }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed
      meshRef.current.rotation.y += speed * 0.5
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <Float speed={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial color={color} wireframe opacity={0.4} transparent />
      </mesh>
      <pointLight color={color} intensity={0.8} distance={5} position={position} />
    </Float>
  )
}

function ArtisticBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <Stars radius={100} depth={50} count={2000} factor={2} fade />
        <ArtisticOrb position={[-3, 2, -5]} color="#ff66cc" speed={0.01} />
        <ArtisticOrb position={[3, -1, -6]} color="#cc66ff" speed={0.008} />
        <ArtisticOrb position={[0, 0, -4]} color="#ff44aa" speed={0.012} />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}

const SyntheticCosmos = () => {
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [])

  const themes = [
    { name: 'Cosmic Dreams', desc: 'Visualize the universe in your unique style' },
    { name: 'Digital Genesis', desc: 'Birth of new digital life forms' },
    { name: 'Neural Aesthetics', desc: 'AI-human creative collaboration' },
    { name: 'Abstract Dimensions', desc: 'Beyond conventional visual boundaries' }
  ]

  const evaluation = [
    { name: 'Creativity & Originality', value: 30 },
    { name: 'Technical Execution', value: 25 },
    { name: 'Theme Interpretation', value: 20 },
    { name: 'Visual Impact', value: 15 },
    { name: 'Tool Mastery', value: 10 }
  ]

  const schedule = [
    { time: 'Day 1', event: 'Theme Reveal' },
    { time: 'Day 1-5', event: 'Creation Period' },
    { time: 'Day 6', event: 'Submission Deadline' },
    { time: 'Day 7', event: 'Judging & Awards' }
  ]

  const tools = ['Midjourney', 'DALL-E 3', 'Stable Diffusion', 'Adobe Firefly', 'RunwayML', 'Any AI Art Tool']

  return (
    <div className="min-h-screen bg-[#110515] text-white pb-32 relative overflow-hidden">
      <ArtisticBackground />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-[#ff66cc]/10 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '30s' }} />
            
            <div className="flex items-center justify-center gap-3 mb-12 text-xs font-mono tracking-widest text-[#ff66cc]/40">
              <Link to="/" className="hover:text-[#ff66cc] transition-colors">HOME</Link>
              <span className="text-[#ff66cc]">/</span>
              <span className="text-[#ff66cc]">SYNTHETIC COSMOS</span>
            </div>

            <div className="font-serif italic text-xl text-[#ff66cc]/60 mb-6">Imagine. Generate. Transcend.</div>

            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white mb-8 drop-shadow-[0_0_30px_rgba(255,100,200,0.3)] leading-[0.9] tracking-tight">
              SYNTHETIC <span className="text-[#ff66cc]">COSMOS</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#ffccf0] font-light max-w-2xl mx-auto leading-relaxed mb-12">
              An AI art competition that pushes the boundaries of creativity and technology. 
              Create stunning visual masterpieces using generative AI tools.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-12 max-w-md mx-auto">
              {[
                { label: 'TYPE', value: 'AI ART', color: '#ff66cc' },
                { label: 'MODE', value: 'SOLO', color: '#ffffff' },
                { label: 'LEVEL', value: 'ALL', color: '#cc66ff' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-heading text-xl" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[10px] font-mono tracking-[0.2em] text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
              className="inline-block bg-[#ff66cc] text-[#110515] font-heading text-sm tracking-widest px-12 py-4 hover:bg-white hover:scale-105 transition-all duration-500 rounded-full shadow-lg">
              SUBMIT YOUR CREATION
            </a>
          </div>
        </section>

        {/* Themes Gallery */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading text-3xl text-white mb-12 text-center">CREATIVE <span className="text-[#ff66cc]">THEMES</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
              {themes.map((theme, i) => (
                <div key={i} className="group relative aspect-[3/4] bg-[#220a2a] border border-[#ff66cc]/10 overflow-hidden hover:border-[#ff66cc]/40 transition-all duration-700 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#110515] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-8 left-6 right-6 z-10">
                    <div className="font-mono text-[10px] text-[#ff66cc] mb-3 opacity-60">THEME 0{i + 1}</div>
                    <h3 className="font-heading text-2xl text-white leading-none tracking-wide group-hover:text-[#ff66cc] transition-colors duration-500">{theme.name}</h3>
                    <p className="text-sm text-white/50 mt-2">{theme.desc}</p>
                  </div>
                  <div className="absolute top-6 right-6 text-[#ff66cc] text-6xl opacity-5 font-serif italic">{i + 1}</div>
                </div>
              ))}
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto border-t border-[#ff66cc]/10 pt-16">
              <div>
                <h3 className="font-heading text-xl text-white mb-8 tracking-wider border-l-2 border-[#ff66cc] pl-4">JUDGING CRITERIA</h3>
                <div className="space-y-4">
                  {evaluation.map((crit, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#ffacf0]/80 font-light italic">{crit.name}</span>
                        <span className="text-[#ff66cc]">{crit.value}%</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#ff66cc] to-[#cc66ff]" style={{ width: `${crit.value * 3.3}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="font-heading text-xl text-white mb-8 tracking-wider border-l-2 border-[#ff66cc] pl-4">TIMELINE</h3>
                  <div className="space-y-6">
                    {schedule.map((slot, i) => (
                      <div key={i} className="flex items-center gap-6 group hover:pl-2 transition-all">
                        <div className="font-mono text-[#ff66cc] text-xs w-16 shrink-0">{slot.time}</div>
                        <div className="font-serif text-xl text-white/90 italic group-hover:text-[#ff66cc] transition-colors">{slot.event}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading text-xl text-white mb-6 tracking-wider border-l-2 border-[#ff66cc] pl-4">ALLOWED TOOLS</h3>
                  <div className="flex flex-wrap gap-2">
                    {tools.map((tool, i) => (
                      <span key={i} className="bg-[#ff66cc]/10 text-[#ff66cc] px-3 py-1 text-sm border border-[#ff66cc]/20 hover:bg-[#ff66cc]/20 transition-colors">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-32 text-center">
              <div className="inline-block p-12 border border-[#ff66cc]/20 bg-black/50">
                <h3 className="font-heading text-2xl text-white mb-4">Ready to Create Cosmic Art?</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">Unleash your creative vision with AI.</p>
                <a href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" target="_blank" rel="noreferrer"
                  className="inline-block bg-[#ff66cc] text-black font-heading text-sm tracking-widest px-12 py-4 hover:bg-white transition-all rounded-full">
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

export default SyntheticCosmos
