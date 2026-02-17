import React from 'react'
import { Link } from 'react-router-dom'
import { EVENTS } from './EventData'
import WormholeEffect from './WormholeEffect'

const WormholeSection = () => {
  return (
    <section id="wormhole" className="mission-section min-h-screen flex items-center py-24 lg:py-32 px-8 md:px-12 lg:px-20 xl:px-32 relative z-10">
      {/* 3D Wormhole Background */}
      <div className="absolute inset-0 z-0">
        <WormholeEffect />
      </div>
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header - Strictly Centered */}
        <div className="text-center mb-16 lg:mb-24 max-w-4xl mx-auto">
          <div className="font-mono text-xs text-[#00808a] mb-4 tracking-[0.4em]">
            SECTOR MAP // SELECT MISSION
          </div>
          <h2
            className="font-heading text-5xl lg:text-7xl mb-6 relative inline-block"
            style={{ color: '#00f0ff', textShadow: '0 0 40px rgba(0,240,255,0.3)' }}
          >
            CHOOSE YOUR PATH
            <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent" />
          </h2>
          <p className="text-xl text-[#c2b280]/70 mt-8 leading-relaxed">
            Seven sectors await. Unlock your potential.
          </p>
        </div>

        {/* Centralized Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {EVENTS.map((event, i) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="group relative block p-8 border bg-[#0B0B0D]/80 backdrop-blur-md transition-all duration-300 hover:bg-[#0B0B0D]/95 hover:border-[#00f0ff]/30 hover:-translate-y-2 no-underline flex flex-col items-center text-center"
              style={{ 
                borderColor: `${event.color}15`,
                boxShadow: `0 0 0 1px ${event.color}05`
              }}
            >
              {/* Event Number */}
              <div className="absolute top-4 right-4 font-heading text-4xl opacity-[0.1]" style={{ color: event.color }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Icon - CLEAN, NO BALL BACKGROUND */}
              <div
                className="mb-6 text-6xl transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                style={{ color: event.color }}
              >
                {event.icon}
              </div>

              {/* Title */}
              <h3
                className="font-heading text-xl tracking-wide mb-2 transition-colors group-hover:text-white"
                style={{ color: event.color }}
              >
                {event.name}
              </h3>

              <div className="font-mono text-xs text-[#00808a] mb-4 uppercase tracking-wider">
                {event.type}
              </div>

              <p className="font-mono text-xs text-[#c2b280]/50 leading-relaxed mb-6 flex-grow max-w-[200px]">
                {event.shortDesc}
              </p>

              {/* CTA */}
              <div 
                className="mt-auto px-4 py-2 border border-transparent text-[10px] font-heading tracking-widest transition-all group-hover:border-[#00f0ff]/30 group-hover:text-[#00f0ff] group-hover:shadow-[0_0_10px_#00f0ff20]"
                style={{ color: '#555' }}
              >
                ENTER SECTOR ›
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WormholeSection
