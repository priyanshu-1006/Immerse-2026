import React from 'react'

/* ═══════════════════════════════════════════════════════════════════
   UNIFIED LAYOUT SYSTEM
   
   Standard padding classes used throughout the project:
   - Horizontal: px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32
   - Max width: max-w-6xl (or max-w-5xl for narrower content)
   - Centering: mx-auto
   - Vertical sections: py-16 sm:py-20 lg:py-24 xl:py-32
═══════════════════════════════════════════════════════════════════ */

// Standard horizontal padding for all containers
export const CONTAINER_PADDING = 'px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32'

// Page wrapper - adds header clearance and standard layout
export const PageWrapper = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`min-h-screen bg-[#020204] ${className}`}>
      {noPadding ? children : (
        <div className="pt-8 sm:pt-12">
          {children}
        </div>
      )}
    </div>
  )
}

// Container - centered content with consistent max-width and padding
export const Container = ({ 
  children, 
  className = '', 
  size = 'default', // 'narrow' | 'default' | 'wide' | 'full'
  noPaddingX = false 
}) => {
  const maxWidthClass = {
    narrow: 'max-w-4xl',
    default: 'max-w-5xl',
    wide: 'max-w-6xl',
    full: 'max-w-7xl'
  }[size]

  return (
    <div className={`
      ${noPaddingX ? '' : CONTAINER_PADDING}
      ${maxWidthClass}
      mx-auto
      w-full
      ${className}
    `}>
      {children}
    </div>
  )
}

// Section - vertical spacing with optional container
export const Section = ({ 
  children, 
  className = '',
  size = 'default',
  spacing = 'default', // 'sm' | 'default' | 'lg'
  id = ''
}) => {
  const spacingClass = {
    sm: 'py-12 sm:py-16 lg:py-20',
    default: 'py-16 sm:py-20 lg:py-24 xl:py-32',
    lg: 'py-20 sm:py-24 lg:py-32 xl:py-40'
  }[spacing]

  return (
    <section id={id} className={`${spacingClass} ${CONTAINER_PADDING} ${className}`}>
      <Container size={size} noPaddingX>
        {children}
      </Container>
    </section>
  )
}

// Page Header - consistent page title section
export const PageHeader = ({ 
  breadcrumb, 
  title, 
  titleGradient,
  subtitle,
  className = ''
}) => {
  return (
    <header className={`pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 ${CONTAINER_PADDING} ${className}`}>
      <Container size="default" noPaddingX>
        <div className="text-center">
          {breadcrumb && (
            <div 
              className="font-mono text-[9px] sm:text-[10px] text-[#00f0ff]/40 tracking-[0.4em] sm:tracking-[0.5em] mb-6 sm:mb-8"
              style={{ animation: 'fadeIn 0.8s ease-out' }}
            >
              {breadcrumb}
            </div>
          )}
          
          <h1 
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 sm:mb-8 tracking-wide"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.2s backwards' }}
          >
            {title}{' '}
            {titleGradient && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#7f00ff]">
                {titleGradient}
              </span>
            )}
          </h1>
          
          {subtitle && (
            <p 
              className="text-white/35 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{ animation: 'fadeInUp 0.8s ease-out 0.4s backwards' }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </header>
  )
}

// Background Effects - consistent background overlays
export const BackgroundEffects = ({ variant = 'default' }) => {
  if (variant === 'stars') {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_#0a0a1540_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#7f00ff06_0%,_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#00f0ff06_0%,_transparent_40%)]" />
      </div>
    )
  }
  
  if (variant === 'gold') {
    return (
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_#ffd70008_0%,_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#7f00ff05_0%,_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,_#00f0ff05_0%,_transparent_40%)]" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,_#00f0ff08_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_#7f00ff06_0%,_transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_60%,_#ffaa0005_0%,_transparent_40%)]" />
    </div>
  )
}

export default {
  PageWrapper,
  Container,
  Section,
  PageHeader,
  BackgroundEffects,
  CONTAINER_PADDING
}
