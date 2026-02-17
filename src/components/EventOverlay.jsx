import React, { useState } from 'react'

const EventOverlay = ({ event, index }) => {
  const [activeTab, setActiveTab] = useState('briefing')
  const isLeft = index % 2 === 0

  const tabs = [
    { id: 'briefing', label: 'BRIEFING' },
    { id: 'protocols', label: 'PROTOCOLS' },
    { id: 'timeline', label: 'TIMELINE' },
  ]

  return (
    <div className="absolute inset-0 flex items-center" style={{ pointerEvents: 'auto' }}>
      <div className="w-full max-w-[1100px] mx-auto px-8 lg:px-16">
        <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
          <div className="w-full max-w-lg">
            {/* Event Card */}
            <div
              className="hud-frame p-6 lg:p-8"
              style={{
                borderColor: `${event.color}33`,
                background: 'rgba(11, 11, 13, 0.85)',
              }}
            >
              {/* Colored top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${event.color}, transparent)` }}
              />

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{
                      background: `radial-gradient(circle, ${event.color}20, transparent)`,
                      border: `1px solid ${event.color}33`,
                    }}
                  >
                    {event.icon}
                  </div>
                  <div>
                    <h3
                      className="font-heading text-lg lg:text-xl tracking-wider"
                      style={{ color: event.color }}
                    >
                      {event.name}
                    </h3>
                    <div className="font-mono text-[10px] text-event-dim tracking-wider">
                      {event.type}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-heading text-sm" style={{ color: event.color }}>
                    {event.detail.prize}
                  </div>
                  <div className="font-mono text-[9px] text-event-dim">PRIZE POOL</div>
                </div>
              </div>

              <div className="h-px mb-4" style={{ background: `${event.color}22` }} />

              {/* Sector number */}
              <div className="font-mono text-[10px] text-event-dim mb-4 tracking-wider">
                SECTOR {String(index + 1).padStart(2, '0')} OF 07 // {event.description}
              </div>

              {/* Tabs */}
              <div className="flex gap-px mb-4 bg-void/50">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="font-heading text-[10px] tracking-wider px-4 py-2 flex-1 transition-all duration-300"
                    style={{
                      color: activeTab === tab.id ? event.color : '#555',
                      background: activeTab === tab.id ? `${event.color}12` : 'transparent',
                      borderBottom: activeTab === tab.id ? `2px solid ${event.color}` : '2px solid transparent',
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[150px] max-h-[200px] overflow-y-auto pr-2"
                style={{ scrollbarWidth: 'thin', scrollbarColor: `${event.color}33 transparent` }}
              >
                {activeTab === 'briefing' && (
                  <p className="text-sm text-dust/80 leading-relaxed">
                    {event.detail.about}
                  </p>
                )}

                {activeTab === 'protocols' && (
                  <div className="space-y-2">
                    {event.detail.rules.map((rule, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="font-mono text-[10px] mt-0.5 shrink-0" style={{ color: event.color }}>
                          [{String(i + 1).padStart(2, '0')}]
                        </span>
                        <span className="text-dust/70">{rule}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div className="space-y-1.5">
                    {event.detail.schedule.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 py-1 border-l-2"
                        style={{ borderColor: `${event.color}33`, paddingLeft: '12px' }}
                      >
                        <span className="font-mono text-xs font-bold shrink-0" style={{ color: event.color }}>
                          {item.time}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: event.color }} />
                        <span className="text-sm text-dust/70">{item.event}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Register */}
              <button
                className="btn-primary w-full mt-5 text-[11px]"
                style={{ borderColor: `${event.color}66`, color: event.color }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${event.color}15`
                  e.currentTarget.style.boxShadow = `0 0 25px ${event.color}22`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,240,255,0.05)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                JOIN SQUADRON →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventOverlay
