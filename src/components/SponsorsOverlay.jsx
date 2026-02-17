import React, { useState } from 'react'

const SPONSORS = [
  {
    tier: 'TITLE SPONSOR',
    companies: [
      { name: 'NovaCorp Industries', role: 'Primary Mission Funder', initials: 'NC' },
    ],
  },
  {
    tier: 'GOLD SPONSORS',
    companies: [
      { name: 'Quantum Dynamics', role: 'Technology Partner', initials: 'QD' },
      { name: 'Stellar Labs', role: 'Research Division', initials: 'SL' },
      { name: 'Nebula Systems', role: 'Infrastructure', initials: 'NS' },
    ],
  },
  {
    tier: 'SILVER SPONSORS',
    companies: [
      { name: 'Void Engineers', role: 'Engineering', initials: 'VE' },
      { name: 'Photon Grid', role: 'Energy', initials: 'PG' },
      { name: 'Dark Matter Labs', role: 'Analytics', initials: 'DM' },
      { name: 'Cosmic Forge', role: 'Manufacturing', initials: 'CF' },
    ],
  },
  {
    tier: 'COMMUNITY',
    companies: [
      { name: 'Astro Guild', initials: 'AG' },
      { name: 'Orbit Connect', initials: 'OC' },
      { name: 'Star Academy', initials: 'SA' },
      { name: 'Gravity Well', initials: 'GW' },
      { name: 'Ion Drive', initials: 'ID' },
      { name: 'Pulsar Tech', initials: 'PT' },
    ],
  },
]

const SponsorsOverlay = () => {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="min-h-screen flex items-center" style={{ pointerEvents: 'auto' }}>
      <div className="w-full max-w-[1100px] mx-auto px-8 lg:px-16 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="font-mono text-[11px] text-event-dim tracking-[0.3em] mb-3">
            {'>'} COLONY NETWORK // MISSION PARTNERS
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl text-event mb-3"
            style={{ textShadow: '0 0 20px rgba(0,240,255,0.25)' }}>
            THE COLONY
          </h2>
          <div className="h-px max-w-sm mx-auto bg-gradient-to-r from-transparent via-event/30 to-transparent mb-3" />
          <p className="text-dust/60 max-w-md mx-auto text-sm">
            The stations supporting our mission through deep space.
          </p>
        </div>

        {/* Tiers */}
        {SPONSORS.map((tier) => (
          <div key={tier.tier} className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-event/10" />
              <span className="font-heading text-[10px] tracking-[0.3em] text-event-dim">{tier.tier}</span>
              <div className="h-px flex-1 bg-event/10" />
            </div>

            <div className={`grid gap-3 ${
              tier.tier === 'TITLE SPONSOR' ? 'grid-cols-1 max-w-xs mx-auto'
              : tier.tier === 'GOLD SPONSORS' ? 'grid-cols-3'
              : tier.tier === 'SILVER SPONSORS' ? 'grid-cols-2 sm:grid-cols-4'
              : 'grid-cols-3 sm:grid-cols-6'
            }`}>
              {tier.companies.map((c) => (
                <div
                  key={c.name}
                  className="sponsor-card"
                  onMouseEnter={() => setHovered(c.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className="w-12 h-12 mx-auto mb-2 flex items-center justify-center font-heading text-sm tracking-wider transition-all duration-300"
                    style={{
                      border: `1px solid ${hovered === c.name ? 'rgba(0,240,255,0.5)' : 'rgba(0,240,255,0.12)'}`,
                      color: hovered === c.name ? '#00f0ff' : '#555',
                      boxShadow: hovered === c.name ? '0 0 15px rgba(0,240,255,0.2)' : 'none',
                    }}
                  >
                    {c.initials}
                  </div>
                  <div className="font-heading text-[10px] tracking-wider text-center transition-colors"
                    style={{ color: hovered === c.name ? '#00f0ff' : '#666' }}>
                    {c.name}
                  </div>
                  {c.role && (
                    <div className="font-mono text-[8px] text-event-dim text-center mt-0.5">{c.role}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center mt-10">
          <div className="hud-frame inline-block px-10 py-6">
            <div className="font-heading text-sm text-event tracking-wider mb-2">JOIN THE COLONY</div>
            <p className="text-xs text-dust/50 mb-4 max-w-xs">
              Become a sponsor and fuel interstellar exploration.
            </p>
            <button className="btn-primary text-[10px] py-2.5 px-6">CONTACT MISSION CONTROL</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SponsorsOverlay
