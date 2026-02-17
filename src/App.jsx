import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import TarsAssistant from './components/TarsAssistant'
import { SoundProvider } from './components/SoundSystem'

// Pages
import Home from './pages/Home'
import Events from './pages/Events'
import Sponsors from './pages/Sponsors'
import About from './pages/About'
import StellarGenesis from './pages/StellarGenesis'
import CosmicIntelligence from './pages/CosmicIntelligence'
import QuantumLogic from './pages/QuantumLogic'
import MissionControl from './pages/MissionControl'
import OrbitShift from './pages/OrbitShift'
import SyntheticCosmos from './pages/SyntheticCosmos'
import EventHorizon from './pages/EventHorizon'

/* ───────────────────────────────────────────────────────────────
   PAGE TRANSITION LOADER (Warp)
─────────────────────────────────────────────────────────────── */
function RouteTransition({ isNavigating }) {
  if (!isNavigating) return null

  return (
    <div className="fixed inset-0 z-[500] bg-black flex flex-col items-center justify-center pointer-events-none animate-fadeInOut">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:20px_20px] opacity-20 animate-warp" />
      <div className="w-16 h-16 border-2 border-white rounded-full border-t-transparent animate-spin" />
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [navigating, setNavigating] = useState(false)

  const location = useLocation()
  const prevLoc = useRef(location.pathname)

  const handleLoadComplete = () => setLoading(false)

  useEffect(() => {
    if (prevLoc.current !== location.pathname) {
      setNavigating(true)

      window.scrollTo(0, 0)

      const timeout = setTimeout(() => {
        setNavigating(false)
      }, 800)

      prevLoc.current = location.pathname

      return () => clearTimeout(timeout)
    }
  }, [location.pathname])

  return (
    <SoundProvider>
      {loading && <Preloader onComplete={handleLoadComplete} />}

      <RouteTransition isNavigating={navigating} />

      <Header />
      <TarsAssistant />

      {/* Main Content Area - Header handled by fixed positioning */}
      <div className={`min-h-screen transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Page Routes - each page handles its own top padding */}
        <main className="pt-20 sm:pt-24 lg:pt-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/about" element={<About />} />

            <Route path="/events/stellar-genesis" element={<StellarGenesis />} />
            <Route path="/events/cosmic-intelligence" element={<CosmicIntelligence />} />
            <Route path="/events/quantum-logic" element={<QuantumLogic />} />
            <Route path="/events/mission-control" element={<MissionControl />} />
            <Route path="/events/orbit-shift" element={<OrbitShift />} />
            <Route path="/events/synthetic-cosmos" element={<SyntheticCosmos />} />
            <Route path="/events/event-horizon" element={<EventHorizon />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </SoundProvider>
  )
}

export default App
