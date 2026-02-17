import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

/* ═══════════════════════════════════════════════════════════════════
   EVENTS DATA
═══════════════════════════════════════════════════════════════════ */
const EVENTS = [
  {
    id: 'stellar-genesis',
    name: 'Stellar Genesis',
    type: 'Hackathon',
    category: 'build',
    icon: '🌟',
    color: '#ff6622',
    description: 'A 24-hour innovation marathon where teams build solutions that matter. From ideation to prototype, transform your vision into reality.',
    prize: '₹50,000',
    duration: '24 Hours',
    teamSize: '2-4 Members',
  },
  {
    id: 'cosmic-intelligence',
    name: 'Cosmic Intelligence',
    type: 'AI / ML',
    category: 'ai',
    icon: '🧠',
    color: '#00f0ff',
    description: 'Dive into the realm of artificial intelligence and machine learning. Build models that push the boundaries of whats possible.',
    prize: '₹20,000',
    duration: '6 Hours',
    teamSize: '1-3 Members',
  },
  {
    id: 'quantum-logic',
    name: 'Quantum Logic',
    type: 'Competitive Coding',
    category: 'code',
    icon: '⚡',
    color: '#7f00ff',
    description: 'Test your algorithmic prowess in intense coding battles. Speed, accuracy, and elegance all matter here.',
    prize: '₹15,000',
    duration: '3 Hours',
    teamSize: 'Individual',
  },
  {
    id: 'mission-control',
    name: 'Mission Control',
    type: 'Workshop',
    category: 'learn',
    icon: '🛸',
    color: '#00ff88',
    description: 'Hands-on technical workshops led by industry experts. Learn cutting-edge technologies and apply them in real-time.',
    prize: 'Certificates',
    duration: '4 Hours',
    teamSize: 'Individual',
  },
  {
    id: 'orbit-shift',
    name: 'Orbit Shift',
    type: 'Startup Pitch',
    category: 'build',
    icon: '🚀',
    color: '#ffaa00',
    description: 'Got a startup idea? Pitch it to investors and industry veterans. The best ideas get funding and mentorship.',
    prize: '₹25,000 + Incubation',
    duration: '5 Minutes/Team',
    teamSize: '1-3 Members',
  },
  {
    id: 'synthetic-cosmos',
    name: 'Synthetic Cosmos',
    type: 'Creative AI',
    category: 'ai',
    icon: '🎨',
    color: '#ff00aa',
    description: 'Where art meets artificial intelligence. Create stunning visuals, music, or experiences using generative AI tools.',
    prize: '₹10,000',
    duration: '4 Hours',
    teamSize: '1-2 Members',
  },
  {
    id: 'event-horizon',
    name: 'Event Horizon',
    type: 'Cybersecurity CTF',
    category: 'security',
    icon: '🔐',
    color: '#00ff00',
    description: 'Capture The Flag competition for security enthusiasts. Crack codes, find vulnerabilities, and prove your skills.',
    prize: '₹15,000',
    duration: '8 Hours',
    teamSize: '1-3 Members',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Events', icon: '◈' },
  { id: 'build', label: 'Build', icon: '⚙' },
  { id: 'ai', label: 'AI / ML', icon: '◉' },
  { id: 'code', label: 'Coding', icon: '◆' },
  { id: 'learn', label: 'Learn', icon: '◇' },
  { id: 'security', label: 'Security', icon: '◈' },
]

/* ═══════════════════════════════════════════════════════════════════
   SKELETON LOADER
═══════════════════════════════════════════════════════════════════ */
function EventCardSkeleton({ index }) {
  return (
    <div
      className="relative block bg-[#08080a]/95 border border-white/[0.06] backdrop-blur-sm overflow-hidden"
      style={{ 
        animationDelay: `${index * 80}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
        opacity: 0
      }}
    >
      <div className="relative p-8 lg:p-10">
        {/* Icon skeleton */}
        <div className="w-16 h-16 bg-white/[0.03] rounded-lg mb-8 animate-pulse" />
        
        {/* Title skeleton */}
        <div className="h-7 bg-white/[0.03] rounded mb-3 w-3/4 animate-pulse" />
        
        {/* Type tag skeleton */}
        <div className="h-4 bg-white/[0.03] rounded mb-6 w-1/3 animate-pulse" />
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-8">
          <div className="h-4 bg-white/[0.03] rounded animate-pulse" />
          <div className="h-4 bg-white/[0.03] rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-white/[0.03] rounded w-4/6 animate-pulse" />
        </div>

        {/* Meta info skeleton */}
        <div className="flex flex-wrap gap-3">
          <div className="h-7 w-20 bg-white/[0.03] rounded animate-pulse" />
          <div className="h-7 w-24 bg-white/[0.03] rounded animate-pulse" />
          <div className="h-7 w-20 bg-white/[0.03] rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   EVENT CARD - Enhanced with better animations
═══════════════════════════════════════════════════════════════════ */
function EventCard({ event, index }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      to={`/events/${event.id}`}
      className="group relative block bg-[#08080a]/95 border border-white/[0.06] backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-[#0a0a0c] no-underline overflow-hidden hover:scale-[1.02] hover:-translate-y-1"
      style={{ 
        animationDelay: `${index * 80}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
        opacity: 0
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ 
          background: `linear-gradient(135deg, ${event.color}15 0%, transparent 50%, ${event.color}15 100%)`,
        }}
      />

      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
        style={{ 
          background: `radial-gradient(circle at ${isHovered ? '50%' : '0%'} ${isHovered ? '50%' : '0%'}, ${event.color}12 0%, transparent 60%)`,
          transition: 'background 0.5s ease-out'
        }}
      />

      {/* Animated number badge */}
      <div 
        className="absolute top-6 right-6 font-heading text-5xl md:text-6xl opacity-[0.04] select-none transition-all duration-500 group-hover:opacity-[0.08] group-hover:scale-110" 
        style={{ color: event.color }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Content */}
      <div className="relative p-6 sm:p-8 lg:p-10">
        {/* Icon with enhanced animation */}
        <div 
          className="text-4xl sm:text-5xl lg:text-6xl mb-6 lg:mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
          style={{ 
            filter: `drop-shadow(0 0 ${isHovered ? '35px' : '25px'} ${event.color}40)`,
            transition: 'all 0.5s ease-out'
          }}
        >
          {event.icon}
        </div>

        {/* Title with stagger effect */}
        <h3 className="font-heading text-lg sm:text-xl lg:text-2xl text-white/90 mb-2 lg:mb-3 group-hover:text-white transition-all duration-300 tracking-wide group-hover:tracking-wider">
          {event.name}
        </h3>
        
        {/* Type tag with slide animation */}
        <div 
          className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mb-4 lg:mb-6 transition-all duration-300 group-hover:tracking-[0.3em]"
          style={{ color: event.color }}
        >
          {event.type}
        </div>
        
        {/* Description with better line clamping */}
        <p className="text-xs sm:text-sm lg:text-base text-white/35 leading-relaxed mb-6 lg:mb-8 line-clamp-3 group-hover:text-white/45 transition-colors duration-300">
          {event.description}
        </p>

        {/* Meta info with stagger animation */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <span 
            className="px-2.5 sm:px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] text-[9px] sm:text-[10px] font-mono text-white/40 tracking-wider transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/[0.06]"
            style={{ transitionDelay: '0ms' }}
          >
            {event.duration}
          </span>
          <span 
            className="px-2.5 sm:px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] text-[9px] sm:text-[10px] font-mono text-white/40 tracking-wider transition-all duration-300 group-hover:border-white/10 group-hover:bg-white/[0.06]"
            style={{ transitionDelay: '50ms' }}
          >
            {event.teamSize}
          </span>
          <span 
            className="px-2.5 sm:px-3 py-1.5 border text-[9px] sm:text-[10px] font-mono tracking-wider transition-all duration-300 group-hover:bg-white/[0.02]"
            style={{ 
              borderColor: `${event.color}30`, 
              color: event.color,
              transitionDelay: '100ms'
            }}
          >
            {event.prize}
          </span>
        </div>
      </div>

      {/* Animated arrow with trail effect */}
      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border border-white/[0.06] text-white/20 group-hover:border-[#00f0ff]/40 group-hover:text-[#00f0ff] transition-all duration-300 group-hover:translate-x-1">
        <span className="text-base sm:text-lg transition-transform duration-300 group-hover:translate-x-0.5">→</span>
      </div>

      {/* Corner accent */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, transparent 0%, ${event.color} 100%)`,
        }}
      />
    </Link>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   CATEGORY FILTER BUTTON
═══════════════════════════════════════════════════════════════════ */
function CategoryButton({ category, isActive, onClick, index }) {
  return (
    <button
      onClick={onClick}
      className={`group relative px-4 sm:px-6 py-2.5 sm:py-3 font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
        isActive
          ? 'bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff]'
          : 'bg-white/[0.02] border border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60 hover:bg-white/[0.04]'
      }`}
      style={{
        animation: 'fadeIn 0.4s ease-out forwards',
        animationDelay: `${index * 50}ms`,
        opacity: 0
      }}
    >
      {/* Icon */}
      <span className="inline-block mr-2 transition-transform duration-300 group-hover:scale-110">
        {category.icon}
      </span>
      {category.label}
      
      {/* Active indicator */}
      {isActive && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent"
          style={{ animation: 'slideIn 0.3s ease-out' }}
        />
      )}
    </button>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   EVENTS PAGE
═══════════════════════════════════════════════════════════════════ */
const Events = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Memoized filtered events
  const filteredEvents = useMemo(() => {
    return activeCategory === 'all' 
      ? EVENTS 
      : EVENTS.filter(e => e.category === activeCategory)
  }, [activeCategory])

  // Handle category change with transition
  const handleCategoryChange = (categoryId) => {
    if (categoryId === activeCategory) return
    
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveCategory(categoryId)
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <div className="min-h-screen bg-[#020204] overflow-x-hidden">
      
      {/* Enhanced background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_#0a0a1540_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#7f00ff06_0%,_transparent_40%)] animate-pulse-slow" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#00f0ff06_0%,_transparent_40%)] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      <div className="relative z-10">
        
        {/* ═════════════════════════════════════════════════════════════
            HEADER - Improved mobile spacing
        ═════════════════════════════════════════════════════════════ */}
        <header className="pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Breadcrumb */}
            <div 
              className="font-mono text-[9px] sm:text-[10px] text-[#00f0ff]/40 tracking-[0.4em] sm:tracking-[0.5em] mb-6 sm:mb-8"
              style={{ animation: 'fadeIn 0.8s ease-out' }}
            >
              IMMERSE 2026 // MISSIONS
            </div>
            
            {/* Title - Better responsive sizing */}
            <h1 
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 sm:mb-8 tracking-wide px-4"
              style={{ animation: 'fadeInUp 0.8s ease-out 0.2s backwards' }}
            >
              CHOOSE YOUR{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#7f00ff] animate-gradient">
                MISSION
              </span>
            </h1>
            
            {/* Subtitle - Better mobile text size */}
            <p 
              className="text-white/35 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-4"
              style={{ animation: 'fadeInUp 0.8s ease-out 0.4s backwards' }}
            >
              Seven sectors await your expertise. Each mission offers unique challenges, 
              incredible prizes, and the chance to prove yourself among the best.
            </p>
          </div>
        </header>

        {/* ═════════════════════════════════════════════════════════════
            CATEGORY FILTERS - Better mobile layout
        ═════════════════════════════════════════════════════════════ */}
        <div className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 mb-8 sm:mb-12">
          <div className="max-w-5xl mx-auto">
            {isLoading ? (
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-10 sm:h-12 w-24 sm:w-32 bg-white/[0.03] rounded animate-pulse"
                    style={{ animationDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {CATEGORIES.map((cat, index) => (
                  <CategoryButton
                    key={cat.id}
                    category={cat}
                    isActive={activeCategory === cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════
            EVENTS GRID - Responsive with better mobile columns
        ═════════════════════════════════════════════════════════════ */}
        <section className="px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 pb-16 sm:pb-24">
          <div className="max-w-5xl mx-auto">
            <div 
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 transition-opacity duration-200 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {isLoading ? (
                <>
                  {[...Array(6)].map((_, i) => (
                    <EventCardSkeleton key={i} index={i} />
                  ))}
                </>
              ) : (
                <>
                  {filteredEvents.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </>
              )}
            </div>

            {/* Empty state */}
            {!isLoading && filteredEvents.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 opacity-20">◈</div>
                <p className="text-white/30 text-sm">No events found in this category</p>
              </div>
            )}
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
            CTA SECTION - Better mobile padding
        ═════════════════════════════════════════════════════════════ */}
        <section className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 pb-20 sm:pb-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-8 border border-white/[0.06] bg-white/[0.01] relative overflow-hidden group">
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/[0.02] to-[#7f00ff]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10">
                <div className="font-mono text-[9px] sm:text-[10px] text-[#00f0ff]/40 tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6">
                  // LAUNCH SEQUENCE
                </div>
                
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white mb-4 sm:mb-6 tracking-wide">
                  READY TO LAUNCH?
                </h3>
                
                <p className="text-white/35 text-sm sm:text-base mb-8 sm:mb-12 max-w-lg mx-auto leading-relaxed px-4">
                  Secure your spot in IMMERSE 2026. Registrations are open for all missions.
                </p>
                
                <a
                  href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-[#00f0ff]/15 to-[#7f00ff]/15 border border-[#00f0ff]/40 text-[#00f0ff] font-heading text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] hover:from-[#00f0ff]/25 hover:to-[#7f00ff]/25 hover:border-[#00f0ff]/60 hover:scale-105 transition-all duration-500 no-underline"
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
        <div className="text-center pb-12 sm:pb-20 px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-white/25 hover:text-[#00f0ff] transition-all duration-300 no-underline tracking-wider hover:gap-3"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Enhanced Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(100px, 100px);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        /* Better mobile touch feedback */
        @media (hover: none) and (pointer: coarse) {
          .group:active {
            transform: scale(0.98);
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar for modern browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #020204;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(0, 240, 255, 0.2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 240, 255, 0.3);
        }
      `}</style>
    </div>
  )
}

export default Events