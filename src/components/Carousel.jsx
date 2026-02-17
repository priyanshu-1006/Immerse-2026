import React, { useState, useEffect, useRef, useCallback } from 'react'

const Carousel = ({ 
  children, 
  autoPlay = true, 
  interval = 4000, 
  showControls = true,
  showDots = true,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 24,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop)
  const containerRef = useRef(null)
  const childrenArray = React.Children.toArray(children)
  const totalItems = childrenArray.length

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setItemsToShow(itemsPerView.mobile)
      } else if (width < 1024) {
        setItemsToShow(itemsPerView.tablet)
      } else {
        setItemsToShow(itemsPerView.desktop)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [itemsPerView])

  const maxIndex = Math.max(0, totalItems - itemsToShow)

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isHovered || totalItems <= itemsToShow) return
    
    const timer = setInterval(nextSlide, interval)
    return () => clearInterval(timer)
  }, [autoPlay, isHovered, interval, nextSlide, totalItems, itemsToShow])

  // Touch/Swipe support
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
  }

  if (totalItems === 0) return null

  return (
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Track */}
      <div 
        ref={containerRef}
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsToShow + gap / itemsToShow)}%)`,
            gap: `${gap}px`
          }}
        >
          {childrenArray.map((child, index) => (
            <div 
              key={index}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / itemsToShow}% - ${gap * (itemsToShow - 1) / itemsToShow}px)` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showControls && totalItems > itemsToShow && (
        <>
          <button
            onClick={prevSlide}
            className="absolute -left-2 sm:-left-4 lg:-left-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#0B0B0D]/90 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/60 transition-all duration-300 backdrop-blur-sm z-10"
            aria-label="Previous"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-2 sm:-right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-[#0B0B0D]/90 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff]/60 transition-all duration-300 backdrop-blur-sm z-10"
            aria-label="Next"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && totalItems > itemsToShow && (
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#00f0ff] w-8 shadow-[0_0_10px_#00f0ff]' 
                  : 'bg-white/15 w-2 hover:bg-white/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
