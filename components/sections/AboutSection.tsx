"use client"

import { SectionAnimation, CardAnimation, TextAnimation } from "@/components/common/SectionAnimation"
import LightCard from "@/components/common/LightCard/LightCard"

export default function AboutSection() {
  return (
    <section id="sobre-mí" className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        <LightCard
          sectionId="sobre-mí"
          cardVariant="glass"
          lightIntensity={0.6}
          lightColor="hsl(var(--primary))"
          className="rounded-[20px] p-8 md:p-12 shadow-card-lg border border-border/50 hover:shadow-primary-lg transition-all duration-500"
        >
          <div className="grid md:grid-cols-[200px_1fr] gap-8 items-center">
            <CardAnimation
              className="relative"
              delay={0.4}
            >
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl glow-blue animate-pulse" />
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto shadow-primary">
                <img
                  src="/professional-developer-portrait.png"
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover"
                />
              </div>
            </CardAnimation>

            <div className="space-y-4">
              <TextAnimation delay={0.6}>
                <h2 className="text-3xl md:text-4xl font-light">Sobre mí</h2>
              </TextAnimation>
              
              <TextAnimation delay={0.8}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Trabajo en <span className="text-foreground font-medium">Andreani</span> desarrollando soluciones
                  logísticas innovadoras. Actualmente estudio en <span className="text-foreground font-medium">UADE</span>{" "}
                  y me especializo en crear productos <span className="text-foreground font-medium">SaaS</span> escalables
                  con tecnologías modernas.
                </p>
              </TextAnimation>
              
              <TextAnimation delay={1.0}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Mi enfoque combina diseño elegante con ingeniería robusta para crear experiencias que los usuarios aman.
                </p>
              </TextAnimation>
            </div>
          </div>
        </LightCard>
      </div>
    </section>
  )
}
