import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'EVENTS', href: '/events' },
  { label: 'SPONSORS', href: '/sponsors' },
  { label: 'ABOUT', href: '/about' },
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (href) => location.pathname === href

  return (
    <>
      <header
  className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
    scrolled
      ? 'py-3 sm:py-4 bg-[#0B0B0D]/90 backdrop-blur-md border-b border-[#00f0ff]/10'
      : 'py-4 sm:py-6 bg-transparent'
  }`}
>
  <div className="w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32">
    
    <div className="w-full flex items-center justify-between">

      {/* LEFT */}
      <Link to="/" className="flex items-center gap-3 no-underline group">
        <div className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
        <div className="font-heading text-2xl tracking-[0.15em] text-white">
          IMMERSE<span className="text-[#00f0ff]">'26</span>
        </div>
      </Link>

      {/* CENTER */}
      <nav className="hidden lg:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={`px-2 py-2 font-mono text-xs tracking-[0.2em] transition-colors relative group no-underline ${
              isActive(item.href)
                ? 'text-[#00f0ff]'
                : 'text-[#c2b280]/70 hover:text-[#00f0ff]'
            }`}
          >
            {item.label}
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#00f0ff] transition-all duration-300 ${
                isActive(item.href)
                  ? 'w-full'
                  : 'w-0 group-hover:w-full'
              }`}
            />
          </Link>
        ))}
      </nav>

      {/* RIGHT */}
      <div className="hidden lg:flex items-center gap-6">
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#00ff88] tracking-widest border border-[#00ff88]/20 px-3 py-1 bg-[#00ff88]/5 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
          ONLINE
        </div>

        <a
          href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/"
          target="_blank"
          rel="noreferrer"
          className="font-heading text-xs tracking-widest text-[#0B0B0D] bg-[#00f0ff] hover:bg-white px-6 py-2.5 skew-x-[-10deg] transition-all duration-300"
        >
          REGISTER NOW
        </a>
      </div>

      {/* MOBILE BUTTON */}
      <button
        className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-[#00f0ff]/20 bg-[#00f0ff]/5"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <div className={`w-5 h-[2px] bg-[#00f0ff] transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <div className={`w-5 h-[2px] bg-[#00f0ff] transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
        <div className={`w-5 h-[2px] bg-[#00f0ff] transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

    </div>
  </div>
</header>


      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[190] bg-[#0B0B0D]/95 backdrop-blur-xl flex flex-col items-center justify-center animate-fadeIn">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`font-heading text-2xl tracking-widest mb-8 no-underline ${
                isActive(item.href)
                  ? 'text-[#00f0ff]'
                  : 'text-white hover:text-[#00f0ff]'
              }`}
            >
              {item.label}
            </Link>
          ))}

          <a
            href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/"
            target="_blank"
            rel="noreferrer"
            className="font-heading text-xl text-[#0B0B0D] bg-[#00f0ff] px-8 py-3 skew-x-[-10deg] mt-4 no-underline"
          >
            REGISTER
          </a>
        </div>
      )}
    </>
  )
}

export default Header
