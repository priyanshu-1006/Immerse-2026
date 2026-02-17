import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { EVENTS } from './EventData'
import PlanetNav from './PlanetNav'

/* Observer Helper */
function useVisible(threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

function EventBlock({ event, index }) {
  const [ref, visible] = useVisible()

  return (
    <div id={`event-${event.id}`} ref={ref} className="py-24 lg:py-32 px-8 md:px-12 lg:px-20 xl:px-32 relative">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Section Label */}
        <div 
          className="font-mono text-xs text-[#555] tracking-[0.3em] mb-12 transition-all duration-700 delay-100"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          MISSION {String(index + 1).padStart(2, '0')} // {event.type.toUpperCase()}
        </div>

        {/* Content Box - Centered & Clean */}
        <div 
          className="relative transition-all duration-1000 delay-200"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          <div className="relative z-10 p-10 lg:p-16 border border-[#00f0ff]/10 bg-[#0B0B0D]/80 backdrop-blur-xl shadow-[0_0_50px_-20px_rgba(0,0,0,0.5)]">
            
            {/* CLEAN ICON - NO BALL */}
            <div className="flex flex-col items-center mb-10">
              <div 
                className="text-8xl lg:text-9xl mb-6 transition-transform duration-500 hover:scale-110 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                style={{ color: event.color }}
              >
                {event.icon}
              </div>
              
              <h3
                className="font-heading text-5xl lg:text-7xl tracking-wide mb-4 leading-none"
                style={{ color: event.color, textShadow: `0 0 60px ${event.color}40` }}
              >
                {event.name}
              </h3>
              
              <div className="font-mono text-sm lg:text-base text-[#c2b280]/60 tracking-widest max-w-2xl mx-auto">
                {event.shortDesc}
              </div>
            </div>

            {/* Description */}
            <p className="text-xl lg:text-2xl text-[#c2b280]/90 leading-relaxed max-w-3xl mx-auto mb-14 font-light">
              {event.description}
            </p>

            {/* Stats - Centered Grid */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-8 mb-14">
              {[
                { l: 'DIFFICULTY', v: event.detail.difficulty },
                { l: 'TEAM', v: event.detail.teamSize },
                { l: 'TIME', v: event.detail.duration },
                { l: 'REWARD', v: event.detail.prize },
              ].map((s) => (
                <div key={s.l} className="px-6 py-4 border border-[#00f0ff]/10 bg-[#000]/40 min-w-[140px]">
                  <div className="font-heading text-xl" style={{ color: event.color }}>{s.v}</div>
                  <div className="font-mono text-[10px] text-[#555] tracking-widest mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to={`/events/${event.id}`}
              className="inline-block border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-[#0B0B0D] px-10 py-4 font-heading text-sm tracking-[0.2em] transition-all duration-300 no-underline shadow-[0_0_20px_#00f0ff10] hover:shadow-[0_0_40px_#00f0ff60]"
            >
              INITIATE MISSION SEQUENCE
            </Link>

          </div>

          {/* Decorative Corner Lines */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#00f0ff]/30" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00f0ff]/30" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#00f0ff]/30" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#00f0ff]/30" />
        </div>
      </div>
    </div>
  )
}

const EventsSection = () => {
  return (
    <section id="events" className="relative z-10 pt-40 pb-20 px-8 md:px-12 lg:px-20 xl:px-32">
      {/* Central Header */}
      <div className="text-center mb-20 max-w-6xl mx-auto">
        <h2 className="font-heading text-6xl lg:text-8xl text-white opacity-90 tracking-tight">
          CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#7f00ff]">MISSIONS</span>
        </h2>
        <div className="w-24 h-1 bg-[#00f0ff]/50 mx-auto mt-6" />
      </div>

      {/* 3D Planet Navigation */}
      <div className="mb-20">
        <PlanetNav />
      </div>

      {EVENTS.map((event, i) => (
        <EventBlock key={event.id} event={event} index={i} />
      ))}
    </section>
  )
}

export default EventsSection
