/**
 * ANIMATION LIBRARY
 * Biblioteca centralizada de configuraciones de animación
 */

import { Variants, Transition } from "framer-motion"

/**
 * EASING FUNCTIONS
 */
export const easings = {
  // Apple-style easing
  apple: [0.25, 0.46, 0.45, 0.94] as const,
  
  // Smooth easing
  smooth: [0.25, 0.1, 0.25, 1] as const,
  
  // Bounce easing
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  
  // Expo easing
  expo: [0.87, 0, 0.13, 1] as const,
  
  // Circ easing
  circ: [0.85, 0, 0.15, 1] as const,
}

/**
 * SPRING CONFIGS
 */
export const springs = {
  // Suave y lento
  gentle: {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
  },
  
  // Balance entre velocidad y suavidad
  smooth: {
    type: "spring" as const,
    stiffness: 120,
    damping: 25,
  },
  
  // Rápido y bouncy
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
  },
  
  // Muy suave, casi sin bounce
  soft: {
    type: "spring" as const,
    stiffness: 60,
    damping: 15,
  },
  
  // Snappy, respuesta rápida
  snappy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 40,
  },
}

/**
 * DURATION CONFIGS
 */
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2,
}

/**
 * FADE VARIANTS
 */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

/**
 * SLIDE VARIANTS
 */
export const slideVariants = {
  up: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
  },
  down: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 60 },
  },
  left: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  },
  right: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 60 },
  },
}

/**
 * SCALE VARIANTS
 */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
}

/**
 * BLUR VARIANTS (estilo Apple)
 */
export const blurVariants: Variants = {
  hidden: { 
    opacity: 0, 
    filter: "blur(10px)",
    y: 20,
  },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)",
    y: 0,
  },
  exit: { 
    opacity: 0, 
    filter: "blur(10px)",
    y: -20,
  },
}

/**
 * ROTATE + SLIDE VARIANTS
 */
export const rotateSlideVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotate: -5,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -40,
    rotate: 5,
    scale: 0.95,
  },
}

/**
 * STAGGER CONTAINER
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

/**
 * STAGGER ITEM
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.apple,
    },
  },
}

/**
 * MAGNETIC BUTTON EFFECT
 * Usa con useMotionValue para crear efecto magnético
 */
export const magneticTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 0.5,
}

/**
 * SHIMMER ANIMATION
 */
export const shimmerAnimation = {
  initial: { x: "-100%" },
  animate: {
    x: "200%",
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "linear",
    },
  },
}

/**
 * PULSE ANIMATION
 */
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
}

/**
 * GLOW ANIMATION
 */
export const glowAnimation = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(var(--primary-rgb), 0.3)",
      "0 0 40px rgba(var(--primary-rgb), 0.6)",
      "0 0 20px rgba(var(--primary-rgb), 0.3)",
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
}

/**
 * CLIP PATH REVEAL
 */
export const clipPathVariants: Variants = {
  hidden: {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
  },
  visible: {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: {
      duration: 0.8,
      ease: easings.expo,
    },
  },
}

/**
 * PARALLAX CONFIG
 */
export const parallaxConfig = {
  subtle: { y: [0, -20], transition: { duration: 0.8 } },
  medium: { y: [0, -40], transition: { duration: 0.8 } },
  strong: { y: [0, -60], transition: { duration: 0.8 } },
}

/**
 * HOVER SCALE
 */
export const hoverScale = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: easings.apple,
    },
  },
  tap: { 
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
}

/**
 * CARD HOVER EFFECT
 */
export const cardHover = {
  rest: { 
    y: 0, 
    scale: 1,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)",
  },
  hover: { 
    y: -4,
    scale: 1.02,
    boxShadow: "0 8px 16px rgba(59, 130, 246, 0.2)",
    transition: {
      duration: 0.3,
      ease: easings.apple,
    },
  },
}

/**
 * ENTRANCE ANIMATIONS (mezclas complejas)
 */
export const entranceAnimations = {
  // Fade + Blur + Slide (Apple style)
  appleReveal: {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easings.apple,
      },
    },
  },
  
  // Bounce entrance
  bounceIn: {
    hidden: {
      opacity: 0,
      scale: 0.3,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
  },
  
  // Rotate + Slide
  rotateSlide: {
    hidden: {
      opacity: 0,
      y: 40,
      rotate: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: easings.apple,
      },
    },
  },
  
  // Expand from center
  expandCenter: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easings.expo,
      },
    },
  },
}

/**
 * LOADING ANIMATIONS
 */
export const loadingAnimations = {
  spinner: {
    animate: {
      rotate: 360,
    },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
  
  dots: {
    animate: {
      y: [-10, 0, -10],
    },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  
  pulse: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

/**
 * SCROLL REVEAL CONFIG
 */
export const scrollRevealConfig = {
  viewport: { once: true, margin: "-100px" },
  initial: "hidden",
  whileInView: "visible",
}

