import React, { useState } from 'react'
import { EVENTS } from './WormholeNav'

const EventDetails = ({ event: singleEvent, onBack }) => {
  const [expandedId, setExpandedId] = useState(null)

  // If showing a single event from selection
  if (singleEvent) {
    return <SingleEventView event={singleEvent} onBack={onBack} />
  }

  // Show all events overview
  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="font-mono text-xs text-event-dim tracking-[0.3em] mb-3">
            {'>'} EVENT HORIZON // ALL SECTORS
          </div>
          <h2
            className="font-heading text-3xl lg:text-5xl text-event mb-4"
            style={{ textShadow: '0 0 20px rgba(0,240,255,0.3)' }}
          >
            MISSION ROSTER
          </h2>
          <div className="h-px max-w-md mx-auto bg-gradient-to-r from-transparent via-event/40 to-transparent mb-3" />
          <p className="font-body text-dust/70 max-w-xl mx-auto">
            Seven critical missions await your squadron. Each sector demands unique skills
            and offers extraordinary rewards.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="space-y-4">
          {EVENTS.map((event, index) => (
            <div
              key={event.id}
              className="group relative overflow-hidden transition-all duration-500"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div
                className="relative border transition-all duration-300 cursor-pointer"
                style={{
                  borderColor: expandedId === event.id ? event.color : `${event.color}22`,
                  background: expandedId === event.id
                    ? `linear-gradient(135deg, ${event.color}08, rgba(11,11,13,0.9))`
                    : 'rgba(11,11,13,0.6)',
                }}
                onClick={() => setExpandedId(expandedId === event.id ? null : event.id)}
                onMouseEnter={(e) => {
                  if (expandedId !== event.id) {
                    e.currentTarget.style.borderColor = `${event.color}55`
                  }
                }}
                onMouseLeave={(e) => {
                  if (expandedId !== event.id) {
                    e.currentTarget.style.borderColor = `${event.color}22`
                  }
                }}
              >
                {/* HUD Corners */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: event.color }} />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: event.color }} />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: event.color }} />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: event.color }} />

                {/* Main row */}
                <div className="flex items-center gap-4 p-5">
                  {/* Index */}
                  <div className="font-mono text-xs text-event-dim w-8">
                    [{String(index + 1).padStart(2, '0')}]
                  </div>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: `radial-gradient(circle, ${event.color}33, transparent)`,
                      border: `1px solid ${event.color}44`,
                    }}
                  >
                    {event.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-heading text-sm lg:text-base tracking-wider" style={{ color: event.color }}>
                        {event.name}
                      </h3>
                      <span className="font-mono text-[10px] px-2 py-0.5 border tracking-wider" style={{
                        borderColor: `${event.color}44`,
                        color: event.color,
                      }}>
                        {event.type}
                      </span>
                    </div>
                    <p className="font-body text-sm text-dust/60 line-clamp-1">
                      {event.description}
                    </p>
                  </div>

                  {/* Prize */}
                  <div className="hidden sm:block text-right">
                    <div className="font-heading text-sm" style={{ color: event.color }}>
                      {event.detail.prize}
                    </div>
                    <div className="font-mono text-[10px] text-event-dim">PRIZE POOL</div>
                  </div>

                  {/* Expand indicator */}
                  <div
                    className="font-mono text-event-dim transition-transform duration-300"
                    style={{
                      transform: expandedId === event.id ? 'rotate(180deg)' : 'rotate(0)',
                    }}
                  >
                    ▼
                  </div>
                </div>

                {/* Expanded content */}
                {expandedId === event.id && (
                  <div
                    className="px-5 pb-5 border-t"
                    style={{
                      borderColor: `${event.color}22`,
                      animation: 'fadeInUp 0.3s ease-out',
                    }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-5">
                      {/* About */}
                      <div>
                        <div className="font-heading text-xs tracking-wider mb-3" style={{ color: event.color }}>
                          BRIEFING
                        </div>
                        <p className="font-body text-sm text-dust/80 leading-relaxed">
                          {event.detail.about}
                        </p>
                      </div>

                      {/* Rules */}
                      <div>
                        <div className="font-heading text-xs tracking-wider mb-3" style={{ color: event.color }}>
                          PROTOCOLS
                        </div>
                        <div className="space-y-1.5">
                          {event.detail.rules.map((rule, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="font-mono text-[10px] mt-1" style={{ color: event.color }}>▸</span>
                              <span className="font-body text-sm text-dust/70">{rule}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Schedule */}
                      <div>
                        <div className="font-heading text-xs tracking-wider mb-3" style={{ color: event.color }}>
                          TIMELINE
                        </div>
                        <div className="space-y-1.5">
                          {event.detail.schedule.slice(0, 5).map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <span className="font-mono text-xs font-bold" style={{ color: event.color }}>
                                {item.time}
                              </span>
                              <div className="w-1.5 h-1.5 rounded-full" style={{ background: event.color }} />
                              <span className="font-body text-sm text-dust/70">{item.event}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button
                        className="btn-primary text-xs"
                        style={{
                          borderColor: event.color,
                          color: event.color,
                        }}
                      >
                        JOIN SQUADRON
                      </button>
                      <button
                        className="font-heading text-xs tracking-wider px-6 py-3 text-event-dim
                                   hover:text-event transition-colors border border-event/10 hover:border-event/30"
                      >
                        FULL BRIEFING →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Single Event View ─── */
const SingleEventView = ({ event, onBack }) => {
  const [activeTab, setActiveTab] = useState('briefing')

  return (
    <div className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="font-mono text-sm text-event-dim hover:text-event mb-8 transition-colors"
        >
          ← BACK TO SECTOR MAP
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Data side */}
          <div className="arwes-frame p-8" style={{ background: 'rgba(11,11,13,0.9)' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{event.icon}</span>
              <div>
                <h2 className="font-heading text-2xl tracking-wider" style={{ color: event.color }}>
                  {event.name}
                </h2>
                <div className="font-mono text-xs text-event-dim">{event.type}</div>
              </div>
            </div>

            <div className="flex gap-2 mb-6 mt-4 border-b border-event/10 pb-2">
              {['briefing', 'protocols', 'timeline'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="font-heading text-xs tracking-wider px-3 py-2 capitalize transition-all"
                  style={{
                    color: activeTab === tab ? event.color : '#666',
                    borderBottom: activeTab === tab ? `2px solid ${event.color}` : '2px solid transparent',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="min-h-[200px]">
              {activeTab === 'briefing' && (
                <p className="font-body text-dust/80 leading-relaxed">{event.detail.about}</p>
              )}
              {activeTab === 'protocols' && (
                <div className="space-y-2">
                  {event.detail.rules.map((rule, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 border border-event/5">
                      <span className="font-mono text-xs" style={{ color: event.color }}>[{String(i + 1).padStart(2, '0')}]</span>
                      <span className="font-body text-sm text-dust/80">{rule}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'timeline' && (
                <div className="space-y-2">
                  {event.detail.schedule.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-2 border-l-2" style={{ borderColor: `${event.color}44` }}>
                      <span className="font-mono text-sm font-bold" style={{ color: event.color }}>{item.time}</span>
                      <span className="font-body text-sm text-dust/80">{item.event}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="btn-primary mt-6 w-full" style={{ borderColor: event.color, color: event.color }}>
              JOIN SQUADRON
            </button>
          </div>

          {/* Visual side */}
          <div className="flex items-center justify-center" style={{
            background: `radial-gradient(circle at center, ${event.color}10, transparent)`,
          }}>
            <div
              className="w-56 h-56 rounded-full"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${event.color}cc, ${event.color}44, #111)`,
                boxShadow: `0 0 80px ${event.color}44`,
                animation: 'float 5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
