import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react'

/* ─── Sound Configuration ─── */
const SOUNDS = {
  hover: {
    url: '/sounds/hover.mp3',
    volume: 0.2,
    fallback: true
  },
  click: {
    url: '/sounds/click.mp3',
    volume: 0.3,
    fallback: true
  },
  transition: {
    url: '/sounds/transition.mp3',
    volume: 0.4,
    fallback: true
  },
  success: {
    url: '/sounds/success.mp3',
    volume: 0.3,
    fallback: true
  },
  ambient: {
    url: '/sounds/ambient.mp3',
    volume: 0.1,
    loop: true,
    fallback: true
  },
  notification: {
    url: '/sounds/notification.mp3',
    volume: 0.25,
    fallback: true
  }
}

/* ─── Web Audio API Synthesizer (Fallback when no audio files) ─── */
class SoundSynthesizer {
  constructor() {
    this.audioContext = null
    this.initialized = false
  }

  init() {
    if (this.initialized) return
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.initialized = true
    } catch {
      console.warn('Web Audio API not supported')
    }
  }

  // Generate sci-fi beep sound
  playBeep(frequency = 800, duration = 0.1, type = 'sine', volume = 0.2) {
    if (!this.audioContext) return
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = type
    
    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration)
    
    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  // Hover sound - quick high beep
  playHover() {
    this.playBeep(1200, 0.05, 'sine', 0.15)
  }

  // Click sound - double beep
  playClick() {
    this.playBeep(800, 0.08, 'square', 0.2)
    setTimeout(() => this.playBeep(1000, 0.06, 'square', 0.15), 50)
  }

  // Transition sound - sweeping effect
  playTransition() {
    if (!this.audioContext) return
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(2000, this.audioContext.currentTime + 0.3)
    
    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.4)
    
    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.4)
  }

  // Success sound - ascending notes
  playSuccess() {
    const notes = [523, 659, 784, 1047] // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      setTimeout(() => this.playBeep(freq, 0.15, 'sine', 0.2), i * 100)
    })
  }

  // Notification sound
  playNotification() {
    this.playBeep(880, 0.1, 'sine', 0.2)
    setTimeout(() => this.playBeep(1100, 0.15, 'sine', 0.25), 120)
  }

  // Ambient drone (one-shot)
  playAmbientPulse() {
    if (!this.audioContext) return
    
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    const filter = this.audioContext.createBiquadFilter()
    
    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    oscillator.type = 'sawtooth'
    oscillator.frequency.value = 80
    
    filter.type = 'lowpass'
    filter.frequency.value = 400
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.5)
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 2)
    
    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 2)
  }
}

/* ─── Sound Context ─── */
const SoundContext = createContext(null)

export const SoundProvider = ({ children }) => {
  const [enabled, setEnabled] = useState(false)
  const [masterVolume, setMasterVolume] = useState(0.5)
  const audioRefs = useRef({})
  const synthRef = useRef(new SoundSynthesizer())

  // Initialize audio context on first user interaction
  const initAudio = useCallback(() => {
    if (!enabled) {
      setEnabled(true)
      synthRef.current.init()
    }
  }, [enabled])

  // Synthesizer fallback
  const playSynthSound = useCallback((soundName) => {
    const synth = synthRef.current
    switch (soundName) {
      case 'hover':
        synth.playHover()
        break
      case 'click':
        synth.playClick()
        break
      case 'transition':
        synth.playTransition()
        break
      case 'success':
        synth.playSuccess()
        break
      case 'notification':
        synth.playNotification()
        break
      case 'ambient':
        synth.playAmbientPulse()
        break
      default:
        synth.playBeep()
    }
  }, [])

  // Play a sound
  const play = useCallback((soundName) => {
    if (!enabled) return

    const soundConfig = SOUNDS[soundName]
    if (!soundConfig) return

    // Try to play audio file first
    if (audioRefs.current[soundName]) {
      const audio = audioRefs.current[soundName]
      audio.volume = soundConfig.volume * masterVolume
      audio.currentTime = 0
      audio.play().catch(() => {
        // Fallback to synthesizer
        playSynthSound(soundName)
      })
    } else {
      // Use synthesizer fallback
      playSynthSound(soundName)
    }
  }, [enabled, masterVolume, playSynthSound])

  // Preload audio files
  useEffect(() => {
    const refs = audioRefs.current
    Object.entries(SOUNDS).forEach(([name, config]) => {
      const audio = new Audio()
      audio.src = config.url
      audio.loop = config.loop || false
      audio.volume = config.volume * masterVolume
      audio.preload = 'auto'
      refs[name] = audio
    })

    return () => {
      Object.values(refs).forEach(audio => {
        audio.pause()
        audio.src = ''
      })
    }
  }, [masterVolume])

  // Update volumes when master volume changes
  useEffect(() => {
    Object.entries(SOUNDS).forEach(([name, config]) => {
      if (audioRefs.current[name]) {
        audioRefs.current[name].volume = config.volume * masterVolume
      }
    })
  }, [masterVolume])

  const value = {
    enabled,
    masterVolume,
    setMasterVolume,
    initAudio,
    play,
    toggle: () => setEnabled(prev => !prev)
  }

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  )
}

/* ─── Hook ─── */
export const useSound = () => {
  const context = useContext(SoundContext)
  if (!context) {
    // Return dummy functions if not wrapped in provider
    return {
      enabled: false,
      masterVolume: 0,
      setMasterVolume: () => {},
      initAudio: () => {},
      play: () => {},
      toggle: () => {}
    }
  }
  return context
}

/* ─── Sound Toggle Button Component ─── */
export const SoundToggle = () => {
  const { enabled, toggle, initAudio } = useSound()

  const handleClick = () => {
    initAudio()
    toggle()
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-[100] w-10 h-10 bg-[#0B0B0D]/80 border border-[#00f0ff]/30 backdrop-blur-sm flex items-center justify-center group hover:border-[#00f0ff]/60 transition-all"
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {enabled ? (
        <svg className="w-5 h-5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M6 9H3v6h3l4 4V5L6 9z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-[#00808a] group-hover:text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
      
      {/* Pulse indicator when enabled */}
      {enabled && (
        <div className="absolute inset-0 rounded-none border border-[#00f0ff]/50 animate-ping" />
      )}
    </button>
  )
}

export default SoundProvider
