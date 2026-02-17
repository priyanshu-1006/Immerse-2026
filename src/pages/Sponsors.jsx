import React from 'react'
import { Link } from 'react-router-dom'

/* ═══════════════════════════════════════════════════════════════════
   SPONSOR DATA BY TIER
═══════════════════════════════════════════════════════════════════ */
const SPONSORS = {
  title: [
    { name: 'Google', logo: '🔷', description: 'Technology Partner' },
  ],
  platinum: [
    { name: 'Microsoft', logo: '🟦', description: 'Cloud Partner' },
    { name: 'GitHub', logo: '⚫', description: 'Developer Platform Partner' },
  ],
  gold: [
    { name: 'Vercel', logo: '▲', description: 'Deployment Partner' },
    { name: 'Cloudflare', logo: '🟠', description: 'Security Partner' },
    { name: 'DigitalOcean', logo: '🔵', description: 'Infrastructure Partner' },
  ],
  silver: [
    { name: 'JetBrains', logo: '🟣', description: 'IDE Partner' },
    { name: 'Figma', logo: '🎨', description: 'Design Partner' },
    { name: 'Notion', logo: '📝', description: 'Productivity Partner' },
    { name: 'MongoDB', logo: '🍃', description: 'Database Partner' },
  ],
  community: [
    { name: 'MLH', logo: '🎪', description: 'Hackathon Partner' },
    { name: 'Dev.to', logo: '👩‍💻', description: 'Community Partner' },
    { name: 'Hashnode', logo: '📰', description: 'Blog Partner' },
  ],
}

const TIER_CONFIG = {
  title: { label: 'Title Sponsor', color: '#ffd700', gridCols: 'grid-cols-1', cardSize: 'large' },
  platinum: { label: 'Platinum Sponsors', color: '#e5e4e2', gridCols: 'grid-cols-1 md:grid-cols-2', cardSize: 'medium' },
  gold: { label: 'Gold Sponsors', color: '#ffaa00', gridCols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', cardSize: 'medium' },
  silver: { label: 'Silver Sponsors', color: '#c0c0c0', gridCols: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4', cardSize: 'small' },
  community: { label: 'Community Partners', color: '#00f0ff', gridCols: 'grid-cols-2 md:grid-cols-3', cardSize: 'small' },
}

/* ═══════════════════════════════════════════════════════════════════
   SPONSOR CARD
═══════════════════════════════════════════════════════════════════ */
function SponsorCard({ sponsor, tier }) {
  const config = TIER_CONFIG[tier]
  
  const sizeClasses = {
    large: 'p-16 min-h-[280px]',
    medium: 'p-12 min-h-[220px]',
    small: 'p-8 min-h-[180px]',
  }
  
  const iconSizes = {
    large: 'text-8xl',
    medium: 'text-6xl',
    small: 'text-5xl',
  }
  
  const nameSizes = {
    large: 'text-3xl',
    medium: 'text-2xl',
    small: 'text-lg',
  }

  return (
    <div 
      className={`group relative flex flex-col items-center justify-center bg-[#08080a]/90 border border-white/[0.06] backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-[#0a0a0c] ${sizeClasses[config.cardSize]}`}
    >
      {/* Hover glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ 
          background: `radial-gradient(ellipse at center, ${config.color}08 0%, transparent 70%)`
        }}
      />

      {/* Logo */}
      <div className={`${iconSizes[config.cardSize]} mb-6 transition-transform duration-500 group-hover:scale-110`}>
        {sponsor.logo}
      </div>

      {/* Name */}
      <h3 className={`font-heading text-white/80 group-hover:text-white transition-colors tracking-wider ${nameSizes[config.cardSize]}`}>
        {sponsor.name.toUpperCase()}
      </h3>

      {/* Description */}
      <p className="mt-3 font-mono text-[10px] text-white/30 tracking-wider text-center">
        {sponsor.description}
      </p>

      {/* Tier Badge */}
      <div 
        className="absolute top-4 right-4 px-3 py-1.5 text-[9px] font-mono tracking-[0.15em] border"
        style={{ borderColor: `${config.color}30`, color: config.color }}
      >
        {tier.toUpperCase()}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   TIER SECTION
═══════════════════════════════════════════════════════════════════ */
function TierSection({ tier, sponsors }) {
  const config = TIER_CONFIG[tier]

  return (
    <div className="mb-20">
      
      {/* Tier Header */}
      <div className="flex items-center gap-6 mb-10">
        <div 
          className="h-px flex-1" 
          style={{ background: `linear-gradient(to right, transparent, ${config.color}30, transparent)` }} 
        />
        <h2 
          className="font-heading text-lg tracking-[0.2em]"
          style={{ color: config.color }}
        >
          {config.label.toUpperCase()}
        </h2>
        <div 
          className="h-px flex-1" 
          style={{ background: `linear-gradient(to left, transparent, ${config.color}30, transparent)` }} 
        />
      </div>

      {/* Sponsors Grid */}
      <div className={`grid gap-6 ${config.gridCols}`}>
        {sponsors.map((sponsor, i) => (
          <SponsorCard key={i} sponsor={sponsor} tier={tier} />
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SPONSORS PAGE
═══════════════════════════════════════════════════════════════════ */
const Sponsors = () => {
  return (
    <div className="min-h-screen bg-[#020204]">
      
      {/* Background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_#ffd70008_0%,_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#7f00ff05_0%,_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,_#00f0ff05_0%,_transparent_40%)]" />
      </div>

      <div className="relative z-10">
        
        {/* ═════════════════════════════════════════════════════════════
            HEADER
        ═════════════════════════════════════════════════════════════ */}
        <header className="pt-12 sm:pt-16 lg:pt-20 pb-16 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Breadcrumb */}
            <div className="font-mono text-[10px] text-[#00f0ff]/40 tracking-[0.5em] mb-8">
              IMMERSE 2026 // ALLIANCE
            </div>
            
            {/* Title */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white mb-8 tracking-wide">
              OUR{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#ffaa00]">
                SPONSORS
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-white/35 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              IMMERSE 2026 is made possible by the incredible support of our partners. 
              These industry leaders share our vision of fostering innovation and excellence.
            </p>
          </div>
        </header>

        {/* ═════════════════════════════════════════════════════════════
            SPONSOR TIERS
        ═════════════════════════════════════════════════════════════ */}
        <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 pb-24">
          <div className="max-w-5xl mx-auto">
            {Object.entries(SPONSORS).map(([tier, sponsors]) => (
              <TierSection key={tier} tier={tier} sponsors={sponsors} />
            ))}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            BECOME A SPONSOR CTA
        ═════════════════════════════════════════════════════════════ */}
        <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 pb-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-20 px-8 border border-white/[0.06] bg-white/[0.01]">
              
              <div className="font-mono text-[10px] text-[#ffd700]/50 tracking-[0.4em] mb-6">
                // JOIN THE ALLIANCE
              </div>
              
              <h3 className="font-heading text-3xl lg:text-4xl text-white mb-6 tracking-wide">
                BECOME A SPONSOR
              </h3>
              
              <p className="text-white/35 mb-12 max-w-lg mx-auto leading-relaxed">
                Partner with IMMERSE 2026 and connect with 500+ innovators, developers, 
                and future tech leaders.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <a
                  href="mailto:gdgmmmut@gmail.com?subject=IMMERSE 2026 Sponsorship Inquiry"
                  className="px-12 py-5 bg-[#ffd700]/10 border border-[#ffd700]/40 text-[#ffd700] font-heading text-sm tracking-[0.3em] hover:bg-[#ffd700]/20 hover:border-[#ffd700]/60 transition-all duration-500 no-underline"
                >
                  CONTACT US
                </a>
                <a
                  href="#"
                  className="px-10 py-5 border border-white/10 text-white/40 font-heading text-sm tracking-[0.2em] hover:border-white/30 hover:text-white/70 transition-all duration-500 no-underline"
                >
                  SPONSORSHIP DECK
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            BACK LINK
        ═════════════════════════════════════════════════════════════ */}
        <div className="text-center pb-20">
          <Link
            to="/"
            className="font-mono text-sm text-white/25 hover:text-[#00f0ff] transition-colors no-underline tracking-wider"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sponsors
