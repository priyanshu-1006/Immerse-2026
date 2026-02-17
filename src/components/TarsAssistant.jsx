import React, { useState, useEffect, useRef } from 'react'

const TARS_MESSAGES = {
  welcome: [
    "Welcome aboard, astronaut. TARS online.",
    "Initializing navigation protocols...",
    "All systems nominal. Ready to assist."
  ],
  idle: [
    "Shall I run a diagnostic?",
    "Event sectors awaiting exploration.",
    "Cooper would be proud.",
    "Humor setting: 75%. Adjustable.",
    "Time is relative. Deadlines are not.",
    "The universe awaits your innovation.",
    "Did you know? Black holes bend time.",
    "Ready for wormhole traversal.",
    "Your mission is important to us.",
    "Detecting high innovation potential."
  ],
  events: {
    'stellar-genesis': "Stellar Genesis: Where ideas become reality. 24-36 hours of pure creation.",
    'cosmic-intelligence': "Cosmic Intelligence: Your AI reasoning skills will be tested. Prompt engineering required.",
    'quantum-logic': "Quantum Logic: Algorithmic precision under pressure. May the best coder win.",
    'mission-control': "Mission Control: Hands-on learning workshops. Practical skills guaranteed.",
    'orbit-shift': "Orbit Shift: Startup ideation challenge. Think feasibility, think scale.",
    'synthetic-cosmos': "Synthetic Cosmos: Generative AI meets creativity. Visual storytelling awaits.",
    'event-horizon': "Event Horizon: Cybersecurity puzzles. Can you escape the digital void?"
  },
  help: [
    "Navigate using the sector map above.",
    "Click on any mission to learn more.",
    "Register early for the best experience.",
    "Teams can have 2-4 members for hackathons.",
    "All events have unique challenges.",
    "Check the countdown for launch date."
  ]
}

const TarsAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [humorLevel, setHumorLevel] = useState(75)
  const messagesEndRef = useRef(null)
  const typingRef = useRef(null)
  const greetingShownRef = useRef(false)

  // Typing effect
  const typeMessage = (text, callback) => {
    setIsTyping(true)
    let index = 0
    setCurrentMessage('')
    
    if (typingRef.current) clearInterval(typingRef.current)
    
    typingRef.current = setInterval(() => {
      if (index < text.length) {
        setCurrentMessage(prev => prev + text[index])
        index++
      } else {
        clearInterval(typingRef.current)
        setIsTyping(false)
        setMessages(prev => [...prev, { type: 'tars', text }])
        setCurrentMessage('')
        if (callback) callback()
      }
    }, 30)
  }

  // Initial greeting
  useEffect(() => {
    if (isOpen && !greetingShownRef.current) {
      greetingShownRef.current = true
      let messageIndex = 0
      const showNextMessage = () => {
        if (messageIndex < TARS_MESSAGES.welcome.length) {
          typeMessage(TARS_MESSAGES.welcome[messageIndex], () => {
            messageIndex++
            setTimeout(showNextMessage, 500)
          })
        }
      }
      setTimeout(showNextMessage, 500)
    }
  }, [isOpen])

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, currentMessage])

  // Random idle messages
  useEffect(() => {
    if (!isOpen) return
    
    const idleInterval = setInterval(() => {
      if (!isTyping && Math.random() > 0.7) {
        const randomMessage = TARS_MESSAGES.idle[Math.floor(Math.random() * TARS_MESSAGES.idle.length)]
        typeMessage(randomMessage)
      }
    }, 15000)

    return () => clearInterval(idleInterval)
  }, [isOpen, isTyping])

  const handleQuickAction = (action) => {
    setMessages(prev => [...prev, { type: 'user', text: action }])
    
    setTimeout(() => {
      let response = ''
      
      switch (action) {
        case 'Help':
          response = TARS_MESSAGES.help[Math.floor(Math.random() * TARS_MESSAGES.help.length)]
          break
        case 'Events':
          response = "We have 7 mission sectors: Stellar Genesis (Hackathon), Cosmic Intelligence (AI), Quantum Logic (Coding), Mission Control (Workshop), Orbit Shift (Startup), Synthetic Cosmos (Creative AI), Event Horizon (Cybersecurity)."
          break
        case 'Register':
          response = "Opening registration portal. Remember: In space, no one can hear you procrastinate. Register early!"
          setTimeout(() => {
            window.open('https://gdg.community.dev/events/details/google-google-developer-group-on-campus-mmmut-gorakhpur-presents-immerse-2026/', '_blank')
          }, 1500)
          break
        case 'Humor': {
          const newHumor = humorLevel === 100 ? 0 : humorLevel + 25
          setHumorLevel(newHumor)
          response = `Humor setting adjusted to ${newHumor}%. ${newHumor === 100 ? "Maximum humor engaged. Knock knock. Time." : newHumor === 0 ? "Humor disabled. Efficiency maximized." : "Calibrating wit parameters..."}`
          break
        }
        default:
          response = "Processing your request..."
      }
      
      typeMessage(response)
    }, 300)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] group"
        aria-label="Open TARS Assistant"
      >
        {/* TARS Robot Shape */}
        <div className="relative w-14 h-20 bg-gradient-to-b from-[#2a2a30] to-[#1a1a1e] border border-[#00f0ff]/30 shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] group-hover:border-[#00f0ff]/60">
          {/* Screen */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-6 bg-[#0B0B0D] border border-[#00f0ff]/50">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-4 h-1 bg-[#00f0ff] animate-pulse" />
            </div>
          </div>
          
          {/* Body Lines */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 space-y-1">
            <div className="h-px bg-[#00f0ff]/30" />
            <div className="h-px bg-[#00f0ff]/20" />
            <div className="h-px bg-[#00f0ff]/10" />
          </div>
          
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00f0ff]/5 to-transparent" />
        </div>
        
        {/* Badge */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#00ff88] rounded-full animate-pulse shadow-[0_0_10px_#00ff88]" />
        
        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity">
          TARS v2.4
        </div>
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-300 ${isMinimized ? 'w-72' : 'w-80 sm:w-96'}`}>
      {/* Main Container */}
      <div className="bg-[#0B0B0D]/95 border border-[#00f0ff]/30 backdrop-blur-xl shadow-[0_0_40px_rgba(0,240,255,0.15)] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#121218] border-b border-[#00f0ff]/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* TARS Icon */}
            <div className="w-8 h-12 bg-gradient-to-b from-[#2a2a30] to-[#1a1a1e] border border-[#00f0ff]/40 relative">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-5 h-3 bg-[#0B0B0D] border border-[#00f0ff]/50 flex items-center justify-center">
                <div className="w-3 h-0.5 bg-[#00f0ff] animate-pulse" />
              </div>
            </div>
            
            <div>
              <div className="font-heading text-sm text-[#00f0ff] tracking-wider">TARS</div>
              <div className="font-mono text-[8px] text-[#00808a]">HUMOR: {humorLevel}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-6 h-6 flex items-center justify-center text-[#00808a] hover:text-[#00f0ff] transition-colors"
            >
              {isMinimized ? '▲' : '▼'}
            </button>
            <button 
              onClick={() => { setIsOpen(false); setMessages([]) }}
              className="w-6 h-6 flex items-center justify-center text-[#00808a] hover:text-[#ff4444] transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] px-3 py-2 text-sm ${
                      msg.type === 'user' 
                        ? 'bg-[#7f00ff]/20 border border-[#7f00ff]/30 text-white' 
                        : 'bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#c2b280]'
                    }`}
                  >
                    {msg.type === 'tars' && (
                      <span className="text-[#00f0ff] font-mono text-[10px] block mb-1">TARS://</span>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && currentMessage && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-3 py-2 text-sm bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#c2b280]">
                    <span className="text-[#00f0ff] font-mono text-[10px] block mb-1">TARS://</span>
                    {currentMessage}
                    <span className="animate-pulse">▌</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="border-t border-[#00f0ff]/20 p-3">
              <div className="grid grid-cols-4 gap-2">
                {['Help', 'Events', 'Register', 'Humor'].map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    disabled={isTyping}
                    className="px-2 py-2 bg-[#00f0ff]/5 border border-[#00f0ff]/20 text-[10px] font-mono text-[#00f0ff] hover:bg-[#00f0ff]/15 hover:border-[#00f0ff]/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {action}
                  </button>
                ))}
              </div>
              
              <div className="mt-2 text-center font-mono text-[8px] text-[#00808a]">
                "Absolute honesty isn't always the most diplomatic..."
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default TarsAssistant
