"use client"

import { useState } from "react"
import { CardAnimation, TextAnimation } from "@/components/common/SectionAnimation"

interface Project {
  title: string
  description: string
  stack: string[]
  image: string
}

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <CardAnimation
      delay={index * 0.12}
      className="group cursor-pointer"
    >
      <div 
        className="relative rounded-[20px] overflow-hidden glass border border-border/50 hover:shadow-primary-lg hover:border-primary/30 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Borde animado con gradiente */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-[-10%]">
            <div 
              className="absolute inset-0 animate-spin-slow"
              style={{
                background: `conic-gradient(
                  from 0deg,
                  transparent 0deg,
                  hsl(var(--primary)) 40deg,
                  hsl(var(--primary) / 0.8) 80deg,
                  hsl(var(--primary) / 0.4) 160deg,
                  transparent 360deg
                )`,
                animationDuration: "3s",
              }}
            />
          </div>
        </div>

        {/* Contenido de la card */}
        <div className="relative bg-background rounded-[20px] overflow-hidden">
          <div className="aspect-video bg-muted overflow-hidden relative">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "scale-110 brightness-110" : "scale-100 brightness-100"
              }`}
            />
            {/* Overlay con gradiente */}
            <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          </div>
          
          <div className="p-6 space-y-4 relative">
            <h3 className="text-xl font-medium group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.stack.map((tech: string, techIndex: number) => (
                <span 
                  key={techIndex} 
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Botón de acción en hover */}
            <div className={`pt-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                Ver proyecto 
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardAnimation>
  )
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "Sistema de Tracking",
      description: "Plataforma de seguimiento en tiempo real para logística",
      stack: ["React", "Node.js", "PostgreSQL"],
      image: "/modern-ecommerce-website.png",
    },
    {
      title: "SaaS de Gestión",
      description: "Herramienta de gestión empresarial con IA",
      stack: ["Next.js", "Supabase", "OpenAI"],
      image: "/task-management-dashboard.png",
    },
    {
      title: "E-commerce Platform",
      description: "Tienda online con pagos integrados",
      stack: ["React", "Stripe", "Tailwind"],
      image: "/modern-ecommerce-website.png",
    },
    {
      title: "Analytics Dashboard",
      description: "Dashboard de métricas y visualización de datos",
      stack: ["Next.js", "D3.js", "Redis"],
      image: "/analytics-dashboard-charts.png",
    },
    {
      title: "Mobile App",
      description: "Aplicación móvil para gestión de tareas",
      stack: ["React Native", "Firebase"],
      image: "/task-management-dashboard.png",
    },
    {
      title: "API Gateway",
      description: "Microservicios con arquitectura escalable",
      stack: [".NET", "Docker", "AWS"],
      image: "/social-media-feed-interface.jpg",
    },
  ]

  return (
    <section id="proyectos" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <TextAnimation delay={0.2}>
          <h2 className="text-4xl md:text-5xl font-light text-center mb-20">
            Proyectos
          </h2>
        </TextAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
