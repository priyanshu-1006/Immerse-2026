import React from 'react'

const FooterOverlay = () => {
  return (
    <div className="border-t border-event/8 py-12 px-8 lg:px-16" style={{ pointerEvents: 'auto' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-heading text-lg text-event tracking-[0.25em] mb-2">INTERSTELLAR</div>
            <div className="font-mono text-[10px] text-event-dim tracking-wider mb-3">TECHFEST // MMMUT NEXUS</div>
            <p className="text-sm text-dust/50 leading-relaxed">
              Where technology meets the cosmos and innovation propels us beyond the event horizon.
            </p>
          </div>
          <div>
            <div className="font-heading text-[11px] text-event tracking-[0.2em] mb-3">NAVIGATION</div>
            {['Mission Base', 'Wormhole Gate', 'Event Horizon', 'The Colony'].map((link) => (
              <button key={link} className="block text-sm text-dust/40 hover:text-event transition-colors mb-1.5">
                {'>'} {link}
              </button>
            ))}
          </div>
          <div>
            <div className="font-heading text-[11px] text-event tracking-[0.2em] mb-3">COMM CHANNEL</div>
            <div className="font-mono text-sm text-dust/50 mb-2">
              <span className="text-event-dim">EMAIL:</span> contact@interstellar.nexus
            </div>
            <div className="flex gap-2 mt-3">
              {['TW', 'IG', 'LI', 'GH'].map((s) => (
                <div key={s}
                  className="w-7 h-7 border border-event/15 flex items-center justify-center
                             font-mono text-[10px] text-event-dim hover:text-event hover:border-event
                             transition-all cursor-pointer hover:bg-event/5"
                >{s}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-px bg-event/10 mb-4" />
        <div className="flex justify-between items-center">
          <div className="font-mono text-[10px] text-event-dim">© 2026 INTERSTELLAR TECHFEST</div>
          <div className="font-mono text-[10px] text-event-dim flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            ENDURANCE: ONLINE
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterOverlay
