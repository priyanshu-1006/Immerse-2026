import React, { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'LAUNCH' },
  { id: 'wormhole', label: 'WORMHOLE' },
  { id: 'events', label: 'MISSIONS' },
  { id: 'sponsors', label: 'COLONY' },
]

const ScrollIndicator = () => {
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="scroll-indicator hidden lg:flex">
      {SECTIONS.map((section) => (
        <div
          key={section.id}
          className={`scroll-dot ${activeId === section.id ? 'active' : ''}`}
          title={section.label}
          onClick={() => scrollTo(section.id)}
        />
      ))}
    </div>
  )
}

export default ScrollIndicator
