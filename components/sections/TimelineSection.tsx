"use client"

import { CardAnimation, TextAnimation } from "@/components/common/SectionAnimation"

interface TimelineItem {
  year: string
  title: string
  institution?: string
  company?: string
  description: string
}

interface TimelineCardProps {
  item: TimelineItem
  index: number
  side: "left" | "right"
}

function TimelineCard({ item, index, side }: TimelineCardProps) {
  return (
    <CardAnimation
      delay={0.3 + index * 0.1}
      className="glass rounded-[16px] p-6 shadow-card border border-border/50 hover:shadow-primary hover:border-primary/30 hover:glow-blue transition-all duration-500 group cursor-pointer hover-lift"
    >
      <div className="text-xs text-primary font-medium mb-2">{item.year}</div>
      <h4 className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
      <div className="text-sm text-muted-foreground mb-2">{item.institution || item.company}</div>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </CardAnimation>
  )
}

export default function TimelineSection() {
  const education: TimelineItem[] = [
    {
      year: "2021 - Presente",
      title: "Licenciatura en Sistemas",
      institution: "UADE",
      description: "Especialización en desarrollo de software y arquitectura de sistemas",
    },
    {
      year: "2023",
      title: "Certificación Full Stack",
      institution: "Plataforma Online",
      description: "React, Node.js, PostgreSQL, Docker",
    },
    {
      year: "2022",
      title: "Curso de Cloud Computing",
      institution: "AWS Academy",
      description: "Arquitectura cloud y servicios AWS",
    },
  ]

  const experience: TimelineItem[] = [
    {
      year: "2023 - Presente",
      title: "Desarrollador Full Stack",
      company: "Andreani",
      description: "Desarrollo de plataformas logísticas y sistemas de tracking en tiempo real",
    },
    {
      year: "2022 - 2023",
      title: "Freelance Developer",
      company: "Proyectos SaaS",
      description: "Creación de productos SaaS para startups y pequeñas empresas",
    },
    {
      year: "2021 - 2022",
      title: "Junior Developer",
      company: "Startup Tech",
      description: "Desarrollo frontend con React y TypeScript",
    },
  ]

  return (
    <section id="timeline" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <TextAnimation delay={0.2}>
          <h2 className="text-4xl md:text-5xl font-light text-center mb-20">
            Trayectoria
          </h2>
        </TextAnimation>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 relative">
          {/* Left Branch - Education */}
          <div className="space-y-6">
            <TextAnimation delay={0.4}>
              <h3 className="text-2xl font-light text-primary mb-8">
                Formación
              </h3>
            </TextAnimation>

            {education.map((item, index) => (
              <TimelineCard key={index} item={item} index={index} side="left" />
            ))}
          </div>

          {/* Right Branch - Experience */}
          <div className="space-y-6">
            <TextAnimation delay={0.4}>
              <h3 className="text-2xl font-light text-primary mb-8">
                Experiencia
              </h3>
            </TextAnimation>

            {experience.map((item, index) => (
              <TimelineCard key={index} item={item} index={index} side="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
