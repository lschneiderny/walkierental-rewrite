// Shared animation configurations for consistent effects across all pages
// Optimized for performance with smooth, polished animations

// ============================================================================
// MOTION VARIANTS - Reusable animation definitions
// ============================================================================

// Fade and slide up - primary animation for content
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 30
  },
  visible: { 
    opacity: 1, 
    y: 0
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

// Scale up with fade - for cards and emphasis elements
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
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

// Stagger container - fast for quicker animations
export const staggerContainerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1
  }
}

// ============================================================================
// TRANSITION CONFIGS - Timing and easing for all animations
// ============================================================================

// Standard smooth transition - primary choice
export const smoothTransition = {
  duration: 0.5
}

// Fast transition - for interactive elements
export const fastTransition = {
  duration: 0.3
}

// Spring transition - for playful moments
export const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
  mass: 0.8
}

// Slow transition - for emphasis
export const slowTransition = {
  duration: 0.8
}

// Standard is smooth
export const standardTransition = smoothTransition

// ============================================================================
// STAGGER CONFIGS - For sequencing multiple animations
// ============================================================================

// Standard stagger for lists and grids
export const staggerTransition = {
  staggerChildren: 0.08,
  delayChildren: 0,
  ...smoothTransition
}

// Fast stagger for quicker sequences
export const staggerTransitionFast = {
  staggerChildren: 0.04,
  delayChildren: 0,
  ...fastTransition
}

// Slow stagger for emphasis
export const staggerTransitionSlow = {
  staggerChildren: 0.12,
  delayChildren: 0,
  ...slowTransition
}

// ============================================================================
// VIEWPORT CONFIGS - For scroll-triggered animations
// ============================================================================

// Standard viewport - triggers when 20% is visible
export const scrollViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -50px 0px"
}

// Eager viewport - triggers earlier
export const scrollViewportEager = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -100px 0px"
}

// Strict viewport - waits for more to be visible
export const scrollViewportStrict = {
  once: true,
  amount: 0.3,
  margin: "0px 0px 0px 0px"
}

// Legacy viewport for compatibility
export const standardViewport = scrollViewport
export const scrollViewportFast = scrollViewportEager
