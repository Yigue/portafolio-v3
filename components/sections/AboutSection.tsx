"use client"

import { CardAnimation, TextAnimation } from "@/components/common/SectionAnimation"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function AboutSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  
  // Parallax sutil para efectos de fondo
  const y = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section ref={ref} id="sobre-mí" className="py-32 relative">
      {/* Efecto parallax de fondo */}
      <motion.div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ y }}
      >
        <div className="absolute top-32 left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <CardAnimation
          delay={0.2}
          className="glass rounded-[20px] p-8 md:p-12 shadow-card border border-border/50 hover:shadow-primary-lg hover:border-primary/30 transition-all duration-500"
        >
          <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto shadow-primary">
                {/* Placeholder con iniciales */}
                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">GS</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <TextAnimation delay={0.4}>
                <h2 className="text-3xl md:text-4xl font-light">Sobre mí</h2>
              </TextAnimation>
              
              <TextAnimation delay={0.6}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Trabajo en <span className="text-foreground font-medium">Andreani</span> desarrollando soluciones
                  logísticas innovadoras. Actualmente estudio en <span className="text-foreground font-medium">UADE</span>{" "}
                  y me especializo en crear productos <span className="text-foreground font-medium">SaaS</span> escalables
                  con tecnologías modernas.
                </p>
              </TextAnimation>
              
              <TextAnimation delay={0.8}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Mi enfoque combina diseño elegante con ingeniería robusta para crear experiencias que los usuarios aman.
                </p>
              </TextAnimation>
            </div>
          </div>
        </CardAnimation>
      </div>
    </section>
  )
}
