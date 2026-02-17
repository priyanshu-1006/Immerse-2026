import React from 'react'

const HeroOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center" style={{ pointerEvents: 'auto' }}>
      <div className="w-full max-w-[1100px] mx-auto px-8 lg:px-16 pt-20">
        <div className="max-w-2xl">
          {/* Status */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-xs text-success/80 tracking-[0.2em]">
              SYSTEMS ONLINE // MISSION READY
            </span>
          </div>

          {/* HUD Frame */}
          <div className="hud-frame p-8 lg:p-10 mb-8">
            <div className="hud-frame-full absolute inset-0 pointer-events-none" />

            {/* Glow */}
            <div
              className="absolute -top-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.1) 0%, transparent 70%)' }}
            />

            <div className="relative">
              <div className="font-mono text-[11px] text-event-dim mb-4 tracking-[0.2em]">
                {'>'} MISSION DESIGNATION
              </div>

              <h1
                className="font-heading text-5xl sm:text-6xl lg:text-8xl text-event mb-3 leading-[0.9]"
                style={{ textShadow: '0 0 40px rgba(0,240,255,0.35), 0 0 80px rgba(0,240,255,0.15)' }}
              >
                INTER<br />
                <span
                  className="text-nebula"
                  style={{ textShadow: '0 0 40px rgba(127,0,255,0.5), 0 0 80px rgba(127,0,255,0.2)' }}
                >
                  STELLAR
                </span>
              </h1>

              <div className="h-px bg-gradient-to-r from-event via-nebula to-transparent my-5" />

              <p className="text-lg lg:text-xl text-dust/80 max-w-lg leading-relaxed mb-1">
                Navigate the Endurance through the unknown. Seven missions.
                One destination. The future awaits beyond the event horizon.
              </p>
              <p className="font-mono text-[11px] text-event-dim mb-7 tracking-wider">
                COORDINATES: MMMUT NEXUS // SECTOR 7G
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="btn-primary">
                  <span className="flex items-center gap-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    INITIATE LAUNCH
                  </span>
                </button>
                <button
                  className="btn-primary"
                  style={{ borderColor: 'rgba(127,0,255,0.4)', color: '#b366ff' }}
                >
                  MISSION BRIEFING
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'EVENTS', value: '07' },
              { label: 'MISSIONS', value: '∞' },
              { label: 'CREW', value: '500+' },
              { label: 'SECTORS', value: '07' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 border border-event/8 bg-void/40 backdrop-blur-sm">
                <div className="font-heading text-xl lg:text-2xl text-event">{stat.value}</div>
                <div className="font-mono text-[9px] text-event-dim tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] text-event-dim tracking-[0.3em] animate-pulse">
          SCROLL TO DIVE INTO THE WORMHOLE
        </span>
        <div className="flex flex-col items-center gap-1 animate-bounce">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-event/40">
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-event/20">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default HeroOverlay
