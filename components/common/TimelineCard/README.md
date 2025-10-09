# TimelineCard

Componente genérico para crear cards de timeline/trayectoria con efectos de iluminación animados sincronizados con el scroll.

## Características

- ✨ Animación de bordes sincronizada con scroll
- 🎯 Coordinado con TracingBeam (se ilumina en el centro de la pantalla)
- 🎨 Badge opcional con variantes de color
- 🔥 Efecto de glow en hover
- 📦 Totalmente personalizable

## Uso Básico

```tsx
import { TimelineCard } from "@/components"

<TimelineCard
  year="2023 - Presente"
  title="Desarrollador Full Stack"
  subtitle="Andreani"
  badge={{ label: "Experiencia", variant: "primary" }}
  index={0}
>
  Desarrollo de plataformas logísticas y sistemas de tracking en tiempo real.
</TimelineCard>
```

## Con TracingBeam

```tsx
import { TracingBeam } from "@/components/ui/TracingBeam"
import { TimelineCard } from "@/components"

<TracingBeam>
  <div className="space-y-12">
    {items.map((item, index) => (
      <TimelineCard
        key={index}
        year={item.year}
        title={item.title}
        subtitle={item.company}
        badge={{ 
          label: item.type === "education" ? "Formación" : "Experiencia",
          variant: item.type === "education" ? "info" : "primary"
        }}
        index={index}
      >
        {item.description}
      </TimelineCard>
    ))}
  </div>
</TracingBeam>
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `year` | `string` | - | Año o rango de años (ej: "2023 - Presente") |
| `title` | `string` | - | Título principal (puesto, certificación, etc.) |
| `subtitle` | `string?` | - | Subtítulo (empresa, institución) |
| `badge` | `BadgeConfig?` | - | Badge opcional con label y variante |
| `children` | `ReactNode` | - | Contenido de la card (descripción) |
| `index` | `number` | `0` | Índice para animación staggered |
| `className` | `string` | `""` | Clases CSS adicionales |
| `enableBeam` | `boolean` | `true` | Activar/desactivar efecto de beam |

### BadgeConfig

```ts
{
  label: string
  variant: "primary" | "secondary" | "success" | "info"
}
```

## Variantes de Badge

```tsx
// Primario (azul)
badge={{ label: "Experiencia", variant: "primary" }}

// Secundario
badge={{ label: "Proyecto", variant: "secondary" }}

// Éxito (verde)
badge={{ label: "Completado", variant: "success" }}

// Info (azul claro)
badge={{ label: "Formación", variant: "info" }}
```

## Personalización

### Desactivar Beam Effect

```tsx
<TimelineCard
  enableBeam={false}
  // ... otras props
/>
```

### Estilos Personalizados

```tsx
<TimelineCard
  className="bg-gradient-to-br from-primary/5 to-transparent"
  // ... otras props
/>
```

### Contenido Personalizado

```tsx
<TimelineCard
  year="2023"
  title="Proyecto Especial"
  subtitle="Cliente"
>
  <div className="space-y-4">
    <p>Descripción del proyecto...</p>
    <ul className="list-disc list-inside space-y-1">
      <li>Tecnología 1</li>
      <li>Tecnología 2</li>
    </ul>
  </div>
</TimelineCard>
```

## Integración Completa

```tsx
// TimelineSection.tsx
"use client"

import { TracingBeam } from "@/components/ui/TracingBeam"
import { TimelineCard } from "@/components"

interface TimelineItem {
  year: string
  title: string
  subtitle: string
  description: string
  type: "education" | "experience"
}

export default function TimelineSection() {
  const items: TimelineItem[] = [
    {
      year: "2023 - Presente",
      title: "Desarrollador Full Stack",
      subtitle: "Andreani",
      description: "Desarrollo de plataformas logísticas...",
      type: "experience",
    },
    // ... más items
  ]

  return (
    <section className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-5xl font-light text-center mb-24">
          Trayectoria
        </h2>

        <TracingBeam className="px-6">
          <div className="space-y-12">
            {items.map((item, index) => (
              <TimelineCard
                key={index}
                year={item.year}
                title={item.title}
                subtitle={item.subtitle}
                badge={{ 
                  label: item.type === "education" ? "Formación" : "Experiencia",
                  variant: item.type === "education" ? "info" : "primary"
                }}
                index={index}
              >
                {item.description}
              </TimelineCard>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  )
}
```

## Coordinación con TracingBeam

El componente está diseñado para trabajar perfectamente con `TracingBeam`:

- Se ilumina cuando llega al **centro de la pantalla**
- La intensidad máxima coincide con el punto brillante del TracingBeam
- Se desvanece progresivamente al salir del viewport
- Offset configurado en `["start center", "end center"]`

## Notas

- La animación usa `useScroll` de Framer Motion con offset centrado
- El efecto de hover añade un glow decorativo en la esquina inferior derecha
- Los badges son totalmente opcionales y personalizables
- Compatible con SSR (usa `"use client"`)

