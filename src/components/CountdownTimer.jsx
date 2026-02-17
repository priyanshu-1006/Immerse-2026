import React, { useState, useEffect, useRef } from 'react'

// Set your launch date here
const LAUNCH_DATE = new Date('2026-03-15T09:00:00')

function calculateTimeLeft() {
  const difference = LAUNCH_DATE - new Date()
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, launched: true }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    launched: false
  }
}

const CountdownTimer = ({ variant = 'full' }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (timeLeft.launched) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full">
          <div className="w-3 h-3 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_15px_#00ff88]" />
          <span className="font-heading text-lg text-[#00ff88] tracking-widest">MISSION ACTIVE</span>
        </div>
      </div>
    )
  }

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days, color: '#00f0ff' },
    { label: 'HOURS', value: timeLeft.hours, color: '#7f00ff' },
    { label: 'MINS', value: timeLeft.minutes, color: '#00ff88' },
    { label: 'SECS', value: timeLeft.seconds, color: '#ffaa00' }
  ]

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 font-mono text-sm">
        <span className="text-[#00808a]">T-MINUS:</span>
        <span className="text-[#00f0ff]">
          {String(timeLeft.days).padStart(2, '0')}D : 
          {String(timeLeft.hours).padStart(2, '0')}H : 
          {String(timeLeft.minutes).padStart(2, '0')}M : 
          {String(timeLeft.seconds).padStart(2, '0')}S
        </span>
      </div>
    )
  }

  return (
    <div className="text-center">
      {/* Status Label */}
      <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-[#ff6622]/30 bg-[#ff6622]/5">
        <div className="w-2 h-2 rounded-full bg-[#ff6622] animate-pulse" />
        <span className="font-mono text-[10px] sm:text-xs text-[#ff6622] tracking-[0.15em] sm:tracking-[0.2em]">COUNTDOWN ACTIVE</span>
      </div>

      {/* Timer Grid - Bold Design */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 mb-4">
        {timeUnits.map((unit, i) => (
          <React.Fragment key={unit.label}>
            <div className="relative group">
              {/* Number Box - HUD Style */}
              <div 
                className="relative bg-[#0a0a0c]/95 border-2 backdrop-blur-sm p-3 sm:p-4 lg:p-6 min-w-[60px] sm:min-w-[80px] lg:min-w-[100px]"
                style={{ borderColor: `${unit.color}40` }}
              >
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-30 blur-xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${unit.color}40, transparent 70%)` }}
                />
                
                <div 
                  className="relative font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tabular-nums"
                  style={{ 
                    color: unit.color,
                    textShadow: `0 0 30px ${unit.color}60, 0 0 60px ${unit.color}30`
                  }}
                >
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] lg:text-[10px] text-white/40 tracking-[0.2em] mt-2">
                  {unit.label}
                </div>
                
                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: unit.color }} />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: unit.color }} />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: unit.color }} />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: unit.color }} />
                
                {/* Top Center Tick Mark */}
                <div 
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-1"
                  style={{ background: `linear-gradient(to right, transparent, ${unit.color}60, transparent)` }}
                />
              </div>
            </div>
            
            {/* Separator */}
            {i < timeUnits.length - 1 && (
              <div className="text-xl sm:text-2xl lg:text-3xl text-white/20 font-light animate-pulse">:</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mission Status */}
      <div className="font-mono text-[10px] sm:text-xs text-[#00808a] tracking-widest">
        MISSION STATUS: <span className="text-[#ffaa00]">PREPARATION PHASE</span>
      </div>
    </div>
  )
}

export default CountdownTimer
