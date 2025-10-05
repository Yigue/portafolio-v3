"use client"

import { motion } from "framer-motion"

/**
 * PULSE GLOW - Efecto de pulso durante scroll
 * 
 * Glow animado que aparece cuando el usuario está haciendo scroll
 */
export default function PulseGlow() {
  return (
    <motion.div
      className="absolute inset-0 w-2 h-96 bg-gradient-to-b from-primary/40 via-primary/60 to-primary/40 rounded-full blur-md"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}
