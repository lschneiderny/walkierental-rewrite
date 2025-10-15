// Shared animation configurations for consistent effects across all pages
// Optimized for performance with smooth, polished animations

// Fade and slide up - primary animation
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1
  }
}

// Simple fade in
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

// Slide in from left
export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0
  }
}

// Slide in from right
export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0
  }
}

// Scale up with fade
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1
  }
}

// Stagger container - standard speed
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1
  }
}

// Stagger container - fast
export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1
  }
}

// Stagger transition configurations
export const staggerTransition = {
  staggerChildren: 0.1,
  delayChildren: 0.1
}

export const staggerTransitionFast = {
  staggerChildren: 0.05,
  delayChildren: 0
}

// Viewport configurations for scroll animations
export const scrollViewport = {
  once: true,
  amount: 0.2, // Trigger when 20% of element is visible
  margin: "0px 0px -50px 0px" // Bottom margin for earlier triggering
}

export const scrollViewportFast = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -100px 0px"
}

// Legacy viewport for compatibility
export const standardViewport = scrollViewport

// Transition presets
export const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 15,
  mass: 0.8
}

export const smoothTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1]
}

export const fastTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1]
}

export const standardTransition = smoothTransition
