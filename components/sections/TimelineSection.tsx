"use client"

import { CardAnimation, TextAnimation } from "@/components/common/SectionAnimation"

interface TimelineItem {
  year: string
  title: string
  institution?: string
  company?: string
  description: string
  type: "education" | "experience"
}

interface TimelineCardProps {
  item: TimelineItem
  index: number
}

function TimelineCard({ item, index }: TimelineCardProps) {
  return (
    <CardAnimation
      delay={0.2 + index * 0.1}
      className="glass rounded-[20px] p-8 shadow-card border border-border/50 hover:shadow-primary-lg 
      hover:border-primary/30 transition-all duration-500 group cursor-pointer relative overflow-hidden"
    >
      {/* Indicador de tipo con badge */}
      <div className="absolute top-4 right-4">
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
          item.type === "education" 
            ? "bg-blue-500/10 text-blue-500 border border-blue-500/20" 
            : "bg-primary/10 text-primary border border-primary/20"
        }`}>
          {item.type === "education" ? "Formación" : "Experiencia"}
        </span>
      </div>

      {/* Contenido de la card */}
      <div className="space-y-3">
        <div className="text-sm text-primary font-semibold tracking-wide uppercase">
          {item.year}
        </div>
        
        <h4 className="text-2xl font-medium group-hover:text-primary transition-colors leading-tight">
          {item.title}
        </h4>
        
        <div className="text-base text-muted-foreground font-medium">
          {item.institution || item.company}
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed pt-2">
          {item.description}
        </p>
      </div>

      {/* Efecto de glow decorativo en hover */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 
      group-hover:opacity-100 transition-opacity duration-500" />
    </CardAnimation>
  )
}

function TimelineMarker({ item }: { item: TimelineItem }) {
  const isExperience = item.type === "experience"
  return (
    <div className="relative flex flex-col items-center gap-3 text-center">
      <span className="text-[11px] tracking-[0.35em] uppercase text-foreground/50">
        {item.year}
      </span>
      <div
        className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 ${
          isExperience ? "border-primary/50 bg-primary/10" : "border-blue-500/50 bg-blue-500/5"
        }`}
      >
        <div
          className={`h-3 w-3 rounded-full ${
            isExperience ? "bg-primary" : "bg-blue-400"
          } shadow-[0_0_12px_rgba(59,130,246,0.45)]`}
        />
      </div>
    </div>
  )
}

export default function TimelineSection() {
  // Combinamos ambos arrays en uno solo para el TracingBeam
  const timelineItems: TimelineItem[] = [
    {
      year: "2023 - Presente",
      title: "Desarrollador Full Stack",
      company: "Andreani",
      description: "Desarrollo de plataformas logísticas y sistemas de tracking en tiempo real con React, .NET y microservicios en AWS.",
      type: "experience",
    },
    {
      year: "2021 - Presente",
      title: "Licenciatura en Sistemas",
      institution: "UADE",
      description: "Especialización en desarrollo de software, arquitectura de sistemas, algoritmos avanzados y bases de datos distribuidas.",
      type: "education",
    },
    {
      year: "2023",
      title: "Certificación Full Stack",
      institution: "Plataforma Online",
      description: "Stack MERN completo: React, Node.js, Express, MongoDB, PostgreSQL, Docker y despliegue en producción.",
      type: "education",
    },
    {
      year: "2022 - 2023",
      title: "Freelance Developer",
      company: "Proyectos SaaS",
      description: "Creación de productos SaaS para startups: dashboards de analytics, sistemas de autenticación y APIs RESTful.",
      type: "experience",
    },
    {
      year: "2022",
      title: "Curso de Cloud Computing",
      institution: "AWS Academy",
      description: "Arquitectura cloud, servicios AWS (EC2, S3, Lambda, RDS), infraestructura como código y CI/CD pipelines.",
      type: "education",
    },
    {
      year: "2021 - 2022",
      title: "Junior Developer",
      company: "Startup Tech",
      description: "Desarrollo frontend con React, TypeScript, integración de APIs REST y GraphQL, y trabajo en equipo ágil.",
      type: "experience",
    },
  ]

  return (
    <section id="timeline" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <TextAnimation delay={0.2}>
          <div className="text-center mb-16 md:mb-24 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light">
              Trayectoria
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mi recorrido profesional y académico en el desarrollo de software
            </p>
          </div>
        </TextAnimation>

        {/* Timeline con línea central */}
        <div className="relative hidden md:flex flex-col gap-12">
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 hidden md:block">
            <div className="h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
          </div>

          {timelineItems.map((item, index) => {
            const isLeft = index % 2 === 0
            return (
              <div
                key={`${item.title}-${index}`}
                className="grid grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)] items-center gap-6 lg:gap-10"
              >
                <div className={`flex justify-end ${isLeft ? "" : "opacity-0 md:pointer-events-none"}`}>
                  <div className={`w-full max-w-xl ${isLeft ? "relative" : ""}`}>
                    {isLeft && (
                      <>
                        <TimelineCard item={item} index={index} />
                        <span className="absolute right-[-36px] top-1/2 hidden h-px w-9 -translate-y-1/2 bg-gradient-to-r from-primary/60 to-transparent lg:block" />
                      </>
                    )}
                  </div>
                </div>

                <TimelineMarker item={item} />

                <div className={`flex justify-start ${!isLeft ? "" : "opacity-0 md:pointer-events-none"}`}>
                  <div className={`w-full max-w-xl ${!isLeft ? "relative" : ""}`}>
                    {!isLeft && (
                      <>
                        <TimelineCard item={item} index={index} />
                        <span className="absolute left-[-36px] top-1/2 hidden h-px w-9 -translate-y-1/2 bg-gradient-to-l from-blue-400/60 to-transparent lg:block" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline en mobile - stack vertical sin línea */}
        <div className="block md:hidden space-y-8">
          {timelineItems.map((item, index) => (
            <TimelineCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
