import React from 'react'
import { Link } from 'react-router-dom'
import CountdownTimer from './CountdownTimer'

const HeroSection = () => {
  return (
    <section id="hero" className="mission-section min-h-screen flex items-center justify-center py-24 lg:py-32 px-8 md:px-12 lg:px-20 xl:px-32 relative z-10">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center relative">
        
        {/* Status */}
        <div className="flex items-center gap-3 mb-8" style={{ animation: 'fadeIn 1s ease-out' }}>
          <div className="w-3 h-3 rounded-full bg-[#00ff88]" style={{ boxShadow: '0 0 10px rgba(0,255,136,0.6)', animation: 'blink 2s ease-in-out infinite' }} />
          <span className="font-mono text-sm text-[#00ff88] tracking-widest">SYSTEMS ONLINE // IMMERSE 2026</span>
        </div>

        {/* Huge Animated Ring Behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] pointer-events-none -z-10 opacity-40">
           <div className="absolute inset-0 rounded-full border-2 border-[#00f0ff]/20" style={{ animation: 'orbit 40s linear infinite' }} />
           <div className="absolute inset-12 rounded-full border border-[#7f00ff]/30" style={{ animation: 'orbit 25s linear infinite reverse' }} />
           <div className="absolute inset-32 rounded-full border border-[#00f0ff]/10" style={{ animation: 'pulse-ring 4s ease-out infinite' }} />
        </div>

        {/* Main Title Block - Centered */}
        <div className="hud-frame p-10 lg:p-16 w-full bg-black/60 backdrop-blur-sm border-[#00f0ff]/20">
          <div className="font-mono text-xs text-[#00808a] mb-6 tracking-[0.4em] uppercase">
            National Tech Fest // GDG MMMUT
          </div>

          <h1
            className="font-heading text-6xl sm:text-7xl lg:text-9xl leading-[0.9] mb-8"
            style={{ color: '#00f0ff', textShadow: '0 0 50px rgba(0,240,255,0.4), 0 0 100px rgba(0,240,255,0.1)' }}
          >
            IMMERSE<br />
            <span style={{ color: '#7f00ff', textShadow: '0 0 50px rgba(127,0,255,0.5), 0 0 100px rgba(127,0,255,0.2)' }}>
              2026
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-[#c2b280]/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            A platform for innovation, intelligence, and transformation.
            Experience the future at MMMUT Gorakhpur.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-mission text-base py-5 px-10 tracking-widest"
            >
              EXPLORE MISSIONS
            </button>
            <Link
              to="/events/stellar-genesis"
              className="btn-mission text-base py-5 px-10 tracking-widest no-underline"
              style={{ borderColor: 'rgba(127,0,255,0.4)', color: '#aa77ff' }}
            >
              HACKATHON BRIEFING
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full max-w-4xl" style={{ animation: 'fadeInUp 1s ease-out 0.5s both' }}>
          {[
            { value: '7', label: 'CORE SECTORS', color: '#00f0ff' },
            { value: '24H', label: 'HACKATHON', color: '#7f00ff' },
            { value: '500+', label: 'INNOVATORS', color: '#00ff88' },
            { value: '₹1L+', label: 'PRIZE POOL', color: '#ffaa00' },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-4 border border-[#00f0ff]/10 bg-[#0B0B0D]/80 backdrop-blur-md">
              <div className="font-heading text-3xl lg:text-4xl mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="font-mono text-[10px] tracking-widest text-[#00808a]">{stat.label}</div>
            </div>
          ))}
        </div>
        {/* Countdown Timer */}
        <div className="mt-12 w-full max-w-4xl" style={{ animation: 'fadeInUp 1s ease-out 0.7s both' }}>
          <CountdownTimer variant="full" />
        </div>
      </div>

      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center animate-bounce">
        <div className="text-[#00f0ff]/40 text-2xl">▽</div>
      </div>
    </section>
  )
}

export default HeroSection
