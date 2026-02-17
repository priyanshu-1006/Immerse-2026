import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 border-t border-[#00f0ff]/10 bg-[#0B0B0D]">

      <div className="w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 py-16 lg:py-20">
        
        {/* ✅ Proper Container */}
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Brand */}
            <div className="flex flex-col items-start">
              <Link to="/" className="no-underline group">
                <div className="font-heading text-2xl text-[#00f0ff] tracking-[0.2em] mb-2 group-hover:text-white transition-colors">
                  IMMERSE<span className="text-[#7f00ff]">2026</span>
                </div>
              </Link>

              <div className="font-mono text-xs text-[#00808a] tracking-wider mb-6 leading-relaxed">
                NATIONAL TECH FEST<br/>
                POWERED BY <span className="text-[#00f0ff]">GDG MMMUT GORAKHPUR</span>
              </div>

              <p className="text-sm text-[#c2b280]/60 leading-relaxed max-w-xs">
                Where technology meets the cosmos. Together we innovate, build, and transform the future.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <div className="font-heading text-xs text-[#00f0ff] tracking-[0.2em] mb-6">
                SECTOR MAP
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'hero', label: 'LAUNCH PAD' },
                  { id: 'wormhole', label: 'MISSIONS' },
                  { id: 'events', label: 'BRIEFINGS' },
                  { id: 'sponsors', label: 'ALLIANCE' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="text-left text-sm text-[#c2b280]/50 hover:text-[#00f0ff] transition-colors tracking-wide"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="font-heading text-xs text-[#00f0ff] tracking-[0.2em] mb-6">
                COMMUNICATION
              </div>

              <div className="font-mono text-sm text-[#c2b280]/50 mb-4">
                <span className="text-[#00808a] block text-xs mb-1">
                  GENERAL FREQUENCY
                </span>
                contact@immerse.gdgmmmut.com
              </div>

              <div className="font-mono text-sm text-[#c2b280]/50 mb-6">
                <span className="text-[#00808a] block text-xs mb-1">
                  BASE COORDINATES
                </span>
                MMMUT Gorakhpur, UP, India
              </div>

              <div className="flex gap-4">
                {['TWITTER', 'INSTA', 'LINKEDIN', 'GITHUB'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="p-2 border border-[#00f0ff]/10 text-[10px] font-mono text-[#00808a] hover:text-[#00f0ff] hover:border-[#00f0ff]/40 hover:bg-[#00f0ff]/5 transition-all rounded"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#00f0ff]/10 to-transparent mb-8" />

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="font-mono text-[10px] text-[#00808a]/60 tracking-wider">
              © 2026 GDG MMMUT. ALL RIGHTS RESERVED. // SYSTEM V2.4
            </div>

            <div className="font-mono text-[10px] text-[#00ff88] flex items-center gap-2 px-3 py-1 border border-[#00ff88]/20 rounded-full bg-[#00ff88]/5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              ENDURANCE: ONLINE
            </div>
          </div>

        </div> {/* ✅ Missing div fixed */}
      </div>
    </footer>
  )
}

export default Footer
