import React, { useLayoutEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { EVENTS } from './EventData'

const EventPage = () => {
  const { eventId } = useParams()
  const event = EVENTS.find((e) => e.id === eventId)

  // Scroll to top instantly on mount
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [eventId])

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#ff0055] font-mono tracking-widest bg-[#0B0B0D]">
        // ERROR: SECTOR COORDINATES NOT FOUND
        <br />
        <Link to="/" className="text-[#00f0ff] underline mt-4 block">RETURN TO BASE</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#c2b280] pb-32 pt-28 relative overflow-hidden">
      
      {/* Background Glow */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full blur-[120px] opacity-[0.12] pointer-events-none z-0"
        style={{ background: `radial-gradient(circle, ${event.color}, transparent 70%)` }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        
        {/* Navigation Breadcrumb */}
        <div className="flex justify-center items-center gap-2 mb-12 font-mono text-[10px] tracking-widest opacity-60">
          <Link to="/" className="hover:text-white">HOME</Link> {'/'}
          <Link to="/#events" className="hover:text-white">MISSIONS</Link> {'/'}
          <span style={{ color: event.color }}>{event.name.toUpperCase()}</span>
        </div>

        {/* HERO HEADER */}
        <div className="mb-16">
          <div 
            className="text-8xl lg:text-9xl mb-8 inline-block animate-pulse-slow drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            style={{ color: event.color }}
          >
            {event.icon}
          </div>
          
          <h1 className="font-heading text-6xl lg:text-8xl mb-6 text-white leading-tight">
             {event.name}
          </h1>
          
          <div className="font-mono text-sm lg:text-base tracking-[0.3em] uppercase mb-8" style={{ color: event.color }}>
            {event.type}
          </div>
          
          <p className="text-xl lg:text-2xl leading-relaxed opacity-90 max-w-3xl mx-auto font-light">
            {event.description}
          </p>
        </div>

        {/* KEY STATS BAR */}
        <div className="bg-[#0B0B0D]/80 border-y border-[#ffffff]/10 py-10 mb-20 flex flex-wrap justify-center gap-12 lg:gap-24 backdrop-blur-sm">
            {[
                { l: 'DIFFICULTY', v: event.detail.difficulty },
                { l: 'TEAM SIZE', v: event.detail.teamSize },
                { l: 'DURATION', v: event.detail.duration },
            ].map((s) => (
                <div key={s.l} className="text-center">
                    <div className="font-heading text-3xl lg:text-4xl text-white mb-2">{s.v}</div>
                    <div className="font-mono text-[10px] tracking-widest opacity-50">{s.l}</div>
                </div>
            ))}
        </div>

        {/* SECTIONS */}
        <div className="flex flex-col gap-24 text-center">
            
            {/* OVERVIEW / ABOUT */}
            <section id="briefing">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-12 bg-[#ffffff]/20" />
                    <h2 className="font-heading text-3xl text-white tracking-widest">MISSION OVERVIEW</h2>
                    <div className="h-px w-12 bg-[#ffffff]/20" />
                </div>
                <div className="text-lg leading-loose opacity-80 max-w-3xl mx-auto">
                    {event.detail.about}
                </div>
            </section>

             {/* OBJECTIVES */}
             {event.detail.objective && (
              <section id="objectives">
                  <div className="flex items-center justify-center gap-4 mb-8">
                      <div className="h-px w-12 bg-[#ffffff]/20" />
                      <h2 className="font-heading text-3xl text-white tracking-widest">OBJECTIVES</h2>
                      <div className="h-px w-12 bg-[#ffffff]/20" />
                  </div>
                  <ul className="text-left inline-block max-w-2xl mx-auto space-y-4">
                      {event.detail.objective.map((obj, i) => (
                          <li key={i} className="flex gap-4 items-start bg-[#ffffff]/5 p-4 rounded border border-[#ffffff]/5 hover:bg-[#ffffff]/10 transition-colors">
                              <span className="font-mono text-[#00f0ff] mt-1">0{i+1}</span>
                              <span className="opacity-90 leading-relaxed text-lg">{obj}</span>
                          </li>
                      ))}
                  </ul>
              </section>
            )}

            {/* FOCUS AREAS & FORMAT */}
            <section id="focus">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px w-12 bg-[#ffffff]/20" />
                    <h2 className="font-heading text-3xl text-white tracking-widest">FOCUS & FORMAT</h2>
                    <div className="h-px w-12 bg-[#ffffff]/20" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {/* Focus Areas */}
                  <div className="bg-[#0B0B0D] border border-[#ffffff]/10 p-8">
                    <h3 className="font-mono text-xs tracking-widest text-[#00f0ff] mb-6 border-b border-[#00f0ff]/20 pb-2">FOCUS AREAS</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {event.detail.focusAreas && event.detail.focusAreas.map((area, i) => (
                        <span key={i} className="px-3 py-1 bg-[#ffffff]/5 text-sm border border-[#ffffff]/10 rounded-full">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Format */}
                  <div className="bg-[#0B0B0D] border border-[#ffffff]/10 p-8">
                    <h3 className="font-mono text-xs tracking-widest text-[#00f0ff] mb-6 border-b border-[#00f0ff]/20 pb-2">PARTICIPATION FORMAT</h3>
                     <ul className="space-y-2 text-left inline-block">
                        {event.detail.format && event.detail.format.map((fmt, i) => (
                          <li key={i} className="text-sm opacity-80 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full"></span>
                            {fmt}
                          </li>
                        ))}
                     </ul>
                  </div>
                </div>
            </section>

             {/* EVALUATION */}
             {event.detail.evaluation && (
              <section id="evaluation">
                  <div className="flex items-center justify-center gap-4 mb-8">
                      <div className="h-px w-12 bg-[#ffffff]/20" />
                      <h2 className="font-heading text-3xl text-white tracking-widest">EVALUATION CRITERIA</h2>
                      <div className="h-px w-12 bg-[#ffffff]/20" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                      {event.detail.evaluation.map((crit, i) => (
                          <div key={i} className="px-6 py-3 border border-[#ffffff]/10 bg-[#ffffff]/5 text-center min-w-[200px]">
                              <span className="block font-heading text-xl text-white mb-1">{crit}</span>
                              <span className="block text-[10px] font-mono tracking-widest opacity-40">CRITERION {i+1}</span>
                          </div>
                      ))}
                  </div>
              </section>
            )}

            {/* SCHEDULE */}
            {event.detail.schedule && (
              <section id="timeline">
                  <div className="flex items-center justify-center gap-4 mb-8">
                      <div className="h-px w-12 bg-[#ffffff]/20" />
                      <h2 className="font-heading text-3xl text-white tracking-widest">TIMELINE</h2>
                      <div className="h-px w-12 bg-[#ffffff]/20" />
                  </div>
                   <div className="max-w-xl mx-auto space-y-4">
                      {event.detail.schedule.map((slot, i) => (
                          <div key={i} className="bg-[#0B0B0D] border border-[#ffffff]/10 p-6 flex justify-between items-center group hover:border-[#00f0ff]/30 transition-colors">
                              <div className="font-mono text-sm tracking-widest text-[#00f0ff] group-hover:text-[#fff] transition-colors">{slot.time}</div>
                              <div className="font-heading text-xl text-white text-right">{slot.event}</div>
                          </div>
                      ))}
                  </div>
              </section>
            )}

            {/* REWARDS & CTA */}
            <section id="rewards" className="mb-20">
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="h-px w-12 bg-[#ffffff]/20" />
                    <h2 className="font-heading text-3xl text-white tracking-widest">REWARDS</h2>
                    <div className="h-px w-12 bg-[#ffffff]/20" />
                </div>
                
                <div className="inline-block px-16 py-10 border border-[#ffaa00]/30 bg-[#ffaa00]/5 rounded-xl mb-12 relative overflow-hidden group">
                     {/* Glow */}
                     <div className="absolute inset-0 bg-gradient-to-t from-[#ffaa00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     
                     <div className="relative z-10">
                       <div className="font-heading text-6xl text-[#ffaa00] mb-2 drop-shadow-[0_0_15px_rgba(255,170,0,0.5)]">
                         {event.detail.prize}
                       </div>
                       <div className="font-mono text-xs tracking-[0.4em] text-[#ffaa00]/60 uppercase">
                         Total Prize Pool
                       </div>
                     </div>
                </div>

                <div className="block">
                  <a 
                      href="https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/" 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block bg-[#00f0ff] text-[#0B0B0D] font-heading text-xl px-16 py-6 skew-x-[-10deg] hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_50px_-10px_#00f0ff60]"
                  >
                      REGISTER FOR {event.name.toUpperCase()}
                  </a>
                </div>
            </section>

        </div>

         {/* BOTTOM NAV */}
         <div className="mt-20 border-t border-[#ffffff]/10 pt-10 flex justify-center">
            <Link to="/" className="text-xs font-mono tracking-widest opacity-50 hover:opacity-100 hover:text-[#00f0ff] transition-all">
                ← RETURN TO MISSION CONTROL
            </Link>
         </div>

      </div>
    </div>
  )
}

export default EventPage
