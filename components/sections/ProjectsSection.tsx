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
      delay={index * 0.15}
      className="glass rounded-[20px] overflow-hidden shadow-card border border-border/50 hover:shadow-primary-lg hover:border-primary/30 transition-all duration-500 group cursor-pointer"
    >
      <div className="aspect-video bg-muted overflow-hidden">
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
      </div>
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-medium group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech: string, techIndex: number) => (
            <span 
              key={techIndex} 
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {tech}
            </span>
          ))}
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
