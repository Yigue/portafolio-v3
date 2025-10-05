"use client"

import { TextAnimation } from "@/components/common/SectionAnimation"
import Card, { CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// ===== INTERFACES =====
interface SkillGroup {
  category: string
  skills: string[]
}

interface SkillBubbleProps {
  group: SkillGroup
  index: number
}

/**
 * COMPONENTE SKILL BUBBLE
 * 
 * Card individual para cada grupo de habilidades con:
 * - Icono representativo
 * - Título de la categoría
 * - Lista de habilidades con animaciones
 * - Efectos de hover interactivos
 */
function SkillBubble({ group, index }: SkillBubbleProps) {
  return (
    <Card
      size="lg"
      variant="glass"
      delay={index * 0.2}
      className="group"
    >
      <CardHeader>
        {/* Icono de la categoría con efecto de glow */}
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:glow-blue">
          <div className="w-6 h-6 rounded-full bg-primary" />
        </div>
        
        {/* Título de la categoría */}
        <CardTitle className="text-xl font-medium group-hover:text-primary transition-colors">
          {group.category}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Lista de habilidades con animaciones flotantes */}
        <div className="space-y-2">
          {group.skills.map((skill: string, skillIndex: number) => (
            <span
              key={skillIndex}
              className="text-sm text-muted-foreground px-3 py-1.5 rounded-full bg-muted/30 inline-block mr-2 mb-2 hover:bg-primary/10 hover:text-primary transition-colors animate-float"
              style={{ animationDelay: `${skillIndex * 0.3}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * SECCIÓN DE HABILIDADES
 * 
 * Muestra las habilidades técnicas organizadas en categorías:
 * - Frontend: React, Next.js, TypeScript, Tailwind CSS
 * - Backend: .NET, Node.js, PostgreSQL, Redis
 * - DevOps: Docker, AWS, CI/CD, Kubernetes
 * - AI & Tools: Supabase, OpenAI, Git, Figma
 */
export default function SkillsSection() {
  // ===== DATOS DE HABILIDADES =====
  // Array con las categorías de habilidades y sus tecnologías
  const skillGroups: SkillGroup[] = [
    {
      category: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      category: "Backend", 
      skills: [".NET", "Node.js", "PostgreSQL", "Redis"],
    },
    {
      category: "DevOps",
      skills: ["Docker", "AWS", "CI/CD", "Kubernetes"],
    },
    {
      category: "AI & Tools",
      skills: ["Supabase", "OpenAI", "Git", "Figma"],
    },
  ]

  return (
    <section id="habilidades" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* ===== TÍTULO DE LA SECCIÓN ===== */}
        <TextAnimation delay={0.2}>
          <h2 className="text-4xl md:text-5xl font-light text-center mb-20">
            Habilidades
          </h2>
        </TextAnimation>

        {/* ===== GRID DE CARDS DE HABILIDADES ===== */}
        {/* Grid responsive que se adapta a diferentes tamaños de pantalla */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, index) => (
            <SkillBubble key={index} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
