import React from 'react'
import { Link } from 'react-router-dom'

/* ═══════════════════════════════════════════════════════════════════
   ABOUT PAGE - Interstellar Themed
═══════════════════════════════════════════════════════════════════ */
const About = () => {
  return (
    <div className="min-h-screen bg-[#020204]">
      
      {/* Background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_#00f0ff08_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_#7f00ff06_0%,_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,_#ffaa0005_0%,_transparent_40%)]" />
      </div>

      <div className="relative z-10">
        
        {/* ═════════════════════════════════════════════════════════════
            HEADER - About IMMERSE
        ═════════════════════════════════════════════════════════════ */}
        <header className="pt-12 sm:pt-16 lg:pt-20 pb-16 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Breadcrumb */}
            <div className="font-mono text-[10px] text-[#00f0ff]/40 tracking-[0.5em] mb-8">
              IMMERSE 2026 // BRIEFING
            </div>
            
            {/* Title */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white mb-8 tracking-wide">
              ABOUT{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#7f00ff]">
                IMMERSE
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-white/40 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              The flagship technical festival of MMMUT Gorakhpur. Where innovation 
              meets the infinite cosmos.
            </p>
          </div>
        </header>

        {/* ═════════════════════════════════════════════════════════════
            MAIN CONTENT
        ═════════════════════════════════════════════════════════════ */}
        <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 pb-24">
          <div className="max-w-5xl mx-auto">
            
            {/* About Description */}
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
              
              {/* Visual - Animated Rings */}
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0 order-2 lg:order-1">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border border-[#00f0ff]/15 animate-pulse" />
                <div className="absolute inset-8 rounded-full border border-[#7f00ff]/15 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute inset-16 rounded-full border border-[#00f0ff]/20 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute inset-24 rounded-full border border-[#ffaa00]/15 animate-pulse" style={{ animationDelay: '1.5s' }} />
                
                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl mb-6">🌌</div>
                    <div className="font-heading text-3xl text-[#00f0ff] tracking-wider">IMMERSE</div>
                    <div className="font-mono text-xs text-white/30 tracking-[0.3em] mt-2">EST. 2024</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-8 order-1 lg:order-2">
                <p className="text-xl text-white/70 leading-relaxed">
                  <span className="text-[#00f0ff]">IMMERSE</span> is the flagship annual technical festival 
                  of MMMUT Gorakhpur, organized by the Google Developer Group On Campus.
                </p>
                <p className="text-white/40 leading-relaxed">
                  Inspired by the endless possibilities of the cosmos, IMMERSE 2026 brings together 
                  innovators, developers, designers, and dreamers from across the nation for an 
                  unforgettable experience of learning, building, and networking.
                </p>
                <p className="text-white/40 leading-relaxed">
                  With 7 unique events spanning hackathons, AI challenges, coding competitions, 
                  workshops, startup pitches, creative showcases, and cybersecurity battles — 
                  there's a mission for every kind of tech enthusiast.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-8">
                  {[
                    { value: '3rd', label: 'Edition' },
                    { value: '500+', label: 'Participants' },
                    { value: '₹1L+', label: 'Prizes' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center py-6 border border-white/[0.06] bg-white/[0.02]">
                      <div className="font-heading text-2xl lg:text-3xl text-[#00f0ff] mb-2">{stat.value}</div>
                      <div className="font-mono text-[9px] text-white/30 tracking-[0.2em]">{stat.label.toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════
                INTERSTELLAR THEME
            ═════════════════════════════════════════════════════════ */}
            <div className="mb-32 py-20 border-y border-white/[0.06]">
              <div className="text-center mb-16">
                <div className="font-mono text-[10px] text-[#ffaa00]/50 tracking-[0.4em] mb-6">
                  // THEME
                </div>
                <h2 className="font-heading text-3xl lg:text-4xl text-white mb-6 tracking-wide">
                  THE THEME: <span className="text-[#ffaa00]">INTERSTELLAR</span>
                </h2>
                <p className="text-white/30 max-w-xl mx-auto italic">
                  "Mankind was born on Earth. It was never meant to die here."
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: '🕳️',
                    title: 'Black Holes',
                    desc: 'Overcome impossible challenges and bend the rules of possibility',
                    color: '#7f00ff'
                  },
                  {
                    icon: '🚀',
                    title: 'Space Travel',
                    desc: 'Journey beyond your comfort zone into uncharted territories',
                    color: '#00f0ff'
                  },
                  {
                    icon: '⏰',
                    title: 'Time Dilation',
                    desc: '24 hours where minutes feel like moments that change everything',
                    color: '#ffaa00'
                  },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="text-center p-10 border border-white/[0.06] bg-white/[0.01] hover:border-white/15 transition-all duration-500 group"
                  >
                    <div 
                      className="text-6xl mb-6 transition-transform duration-500 group-hover:scale-110"
                      style={{ filter: `drop-shadow(0 0 20px ${item.color}40)` }}
                    >
                      {item.icon}
                    </div>
                    <h3 
                      className="font-heading text-xl mb-4 tracking-wide"
                      style={{ color: item.color }}
                    >
                      {item.title.toUpperCase()}
                    </h3>
                    <p className="text-sm text-white/35 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════
                ORGANIZED BY - GDG
            ═════════════════════════════════════════════════════════ */}
            <div className="mb-32">
              <div className="text-center mb-16">
                <div className="font-mono text-[10px] text-[#00f0ff]/40 tracking-[0.4em] mb-6">
                  // ORGANIZED BY
                </div>
                <h2 className="font-heading text-3xl lg:text-4xl text-white mb-3 tracking-wide">
                  Google Developer Group
                </h2>
                <h3 className="font-heading text-xl text-[#00f0ff] tracking-wider">
                  On Campus MMMUT Gorakhpur
                </h3>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="p-10 lg:p-12 border border-white/[0.06] bg-white/[0.01]">
                  <div className="flex flex-col lg:flex-row items-center gap-10">
                    
                    {/* GDG Logo */}
                    <div className="flex-shrink-0">
                      <div className="w-36 h-36 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-5xl mb-2">🎓</div>
                          <div className="font-heading text-sm text-[#00f0ff] tracking-wider">GDG</div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <p className="text-white/50 leading-relaxed mb-6">
                        GDG On Campus MMMUT is a community of student developers passionate about 
                        Google technologies and open source. We organize workshops, hackathons, 
                        and events to help students learn, build, and grow together.
                      </p>
                      <p className="text-white/35 text-sm leading-relaxed">
                        Part of the global Google Developer Groups network, we connect students 
                        with industry experts, provide hands-on learning opportunities, and 
                        foster a culture of innovation at Madan Mohan Malaviya University of 
                        Technology, Gorakhpur.
                      </p>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex flex-wrap justify-center gap-4 mt-10 pt-10 border-t border-white/[0.06]">
                    {[
                      { name: 'Website', url: 'https://gdg.community.dev/gdg-on-campus-madan-mohan-malaviya-university-of-technology-gorakhpur-india/', icon: '🌐' },
                      { name: 'Instagram', url: 'https://instagram.com/gdgoncampus_mmmut', icon: '📸' },
                      { name: 'LinkedIn', url: 'https://linkedin.com/company/gdgoncampusmmmut', icon: '💼' },
                      { name: 'Twitter', url: 'https://twitter.com/gdgmmmut', icon: '🐦' },
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 border border-white/[0.08] text-white/40 hover:border-[#00f0ff]/30 hover:text-[#00f0ff] transition-all duration-300 no-underline"
                      >
                        <span>{social.icon}</span>
                        <span className="font-mono text-xs tracking-wider">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════
                VENUE
            ═════════════════════════════════════════════════════════ */}
            <div className="mb-32">
              <div className="text-center mb-12">
                <div className="font-mono text-[10px] text-[#00f0ff]/40 tracking-[0.4em] mb-6">
                  // BASE COORDINATES
                </div>
                <h2 className="font-heading text-3xl lg:text-4xl text-white tracking-wide">VENUE</h2>
              </div>

              <div className="max-w-3xl mx-auto p-10 border border-white/[0.06] bg-white/[0.01] text-center">
                <div className="text-6xl mb-6">🏛️</div>
                <h3 className="font-heading text-xl lg:text-2xl text-[#00f0ff] mb-4 tracking-wider">
                  MADAN MOHAN MALAVIYA UNIVERSITY OF TECHNOLOGY
                </h3>
                <p className="text-white/40 mb-8">Gorakhpur, Uttar Pradesh, India</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] text-white/50 font-mono text-sm">
                    📅 March 15-16, 2026
                  </span>
                  <span className="px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] text-white/50 font-mono text-sm">
                    🎪 Main Auditorium + Labs
                  </span>
                </div>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════
                CTA
            ═════════════════════════════════════════════════════════ */}
            <div className="text-center py-20 border border-white/[0.06] bg-white/[0.01]">
              <div className="font-mono text-[10px] text-[#00f0ff]/40 tracking-[0.4em] mb-6">
                // LAUNCH SEQUENCE
              </div>
              <h3 className="font-heading text-3xl lg:text-4xl text-white mb-8 tracking-wide">
                READY TO JOIN THE MISSION?
              </h3>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  to="/events"
                  className="px-12 py-5 bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] font-heading text-sm tracking-[0.3em] hover:bg-[#00f0ff]/20 hover:border-[#00f0ff]/60 transition-all duration-500 no-underline"
                >
                  EXPLORE EVENTS
                </Link>
                <a
                  href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-12 py-5 bg-[#7f00ff]/10 border border-[#7f00ff]/40 text-[#7f00ff] font-heading text-sm tracking-[0.3em] hover:bg-[#7f00ff]/20 hover:border-[#7f00ff]/60 transition-all duration-500 no-underline"
                >
                  REGISTER NOW
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

export default About
