"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { TextAnimation } from "@/components/common/SectionAnimation"

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] glow-blue-strong animate-pulse" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
        <TextAnimation delay={0.2}>
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-light tracking-tight text-balance">
              Desarrollador
              <br />
              <span className="text-muted-foreground">Full Stack</span>
            </h1>
          </div>
        </TextAnimation>

        <TextAnimation delay={0.4}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Creando experiencias digitales excepcionales en Andreani y estudiando en UADE
          </p>
        </TextAnimation>

        <TextAnimation delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-8 shadow-card hover:shadow-primary-lg hover:glow-blue transition-all duration-300"
              onClick={() => document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Ver proyectos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 glass bg-transparent hover:border-primary/50 hover:shadow-primary transition-all duration-300"
              onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contactar
            </Button>
          </div>
        </TextAnimation>
      </div>
    </section>
  )
}
