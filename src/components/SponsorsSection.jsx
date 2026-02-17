import React, { useState, useEffect, useRef } from 'react'

const SPONSORS = [
  {
    tier: 'TITLE SPONSOR',
    cols: 'grid-cols-1 max-w-sm mx-auto',
    companies: [
      { name: 'NovaCorp Industries', role: 'Primary Mission Funder', initials: 'NC' },
    ],
  },
  {
    tier: 'GOLD SPONSORS',
    cols: 'grid-cols-1 sm:grid-cols-3 max-w-3xl mx-auto',
    companies: [
      { name: 'Quantum Dynamics', role: 'Tech Partner', initials: 'QD' },
      { name: 'Stellar Labs', role: 'Research', initials: 'SL' },
      { name: 'Nebula Systems', role: 'Infrastructure', initials: 'NS' },
    ],
  },
  {
    tier: 'SILVER SPONSORS',
    cols: 'grid-cols-2 sm:grid-cols-4 max-w-4xl mx-auto',
    companies: [
      { name: 'Void Engineers', role: 'Engineering', initials: 'VE' },
      { name: 'Photon Grid', role: 'Energy', initials: 'PG' },
      { name: 'Dark Matter Labs', role: 'Analytics', initials: 'DM' },
      { name: 'Cosmic Forge', role: 'Manufacturing', initials: 'CF' },
    ],
  },
  {
    tier: 'COMMUNITY PARTNERS',
    cols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 max-w-5xl mx-auto',
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

const SponsorsSection = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="sponsors" ref={ref} className="mission-section min-h-screen flex items-center py-24 lg:py-32 px-8 md:px-12 lg:px-20 xl:px-32 relative z-10">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <div className="font-mono text-xs text-[#00808a] tracking-[0.3em] mb-4">
            {'>'} COLONY NETWORK // MISSION PARTNERS
          </div>
          <h2
            className="font-heading text-4xl lg:text-6xl text-[#00f0ff] mb-5"
            style={{ textShadow: '0 0 25px rgba(0,240,255,0.25)' }}
          >
            THE COLONY
          </h2>
          <div className="h-px max-w-sm mx-auto bg-gradient-to-r from-transparent via-[#00f0ff]/25 to-transparent mb-6" />
          <p className="text-base text-[#c2b280]/60 max-w-lg mx-auto leading-relaxed">
            Stations and outposts supporting our mission through deep space.
          </p>
        </div>

        {/* Tiers with generous spacing */}
        {SPONSORS.map((tier, tierIdx) => (
          <div
            key={tier.tier}
            className="mb-14 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: `${tierIdx * 200}ms`,
            }}
          >
            {/* Tier label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-[#00f0ff]/6" />
              <span className="font-heading text-xs tracking-[0.3em] text-[#00808a]">{tier.tier}</span>
              <div className="h-px flex-1 bg-[#00f0ff]/6" />
            </div>

            {/* Grid */}
            <div className={`grid gap-5 ${tier.cols}`}>
              {tier.companies.map((c) => (
                <SponsorCard key={c.name} company={c} isTitleSponsor={tier.tier === 'TITLE SPONSOR'} />
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div
          className="text-center mt-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '800ms' }}
        >
          <div className="hud-frame inline-block px-10 py-8 lg:px-16 lg:py-10">
            <div className="font-heading text-lg text-[#00f0ff] tracking-wider mb-3">
              BECOME A COLONY MEMBER
            </div>
            <p className="text-sm text-[#c2b280]/50 mb-6 max-w-sm mx-auto leading-relaxed">
              Fuel interstellar exploration. Partner with us to push beyond the event horizon.
            </p>
            <button className="btn-mission text-xs py-3 px-8">CONTACT MISSION CONTROL</button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SponsorCard({ company, isTitleSponsor }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="sponsor-box cursor-pointer py-6 px-5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="mx-auto mb-3 flex items-center justify-center font-heading tracking-wider transition-all duration-300"
        style={{
          width: isTitleSponsor ? '64px' : '52px',
          height: isTitleSponsor ? '64px' : '52px',
          fontSize: isTitleSponsor ? '16px' : '13px',
          border: `1px solid ${hovered ? 'rgba(0,240,255,0.45)' : 'rgba(0,240,255,0.1)'}`,
          color: hovered ? '#00f0ff' : '#555',
          boxShadow: hovered ? '0 0 20px rgba(0,240,255,0.15)' : 'none',
          borderRadius: '8px',
        }}
      >
        {company.initials}
      </div>
      <div
        className="font-heading tracking-wider transition-colors text-center"
        style={{
          fontSize: isTitleSponsor ? '14px' : '11px',
          color: hovered ? '#00f0ff' : '#666',
        }}
      >
        {company.name}
      </div>
      {company.role && (
        <div className="font-mono text-[10px] text-[#00808a] mt-1 text-center">{company.role}</div>
      )}
    </div>
  )
}

export default SponsorsSection
