# ⚡ Quick Start - Scroll Beam System

## 🎯 Implementación en 3 pasos

### 1️⃣ Agregar el Overlay Visual (Opcional pero recomendado)

En `app/page.tsx`:

```tsx
import { ScrollBeamOverlay } from "@/components"

export default function Home() {
  return (
    <ScrollProvider>
      {/* Visualizador de la franja luminosa */}
      <ScrollBeamOverlay visible={true} opacity={0.15} />
      
      <main>
        {/* Tu contenido */}
      </main>
    </ScrollProvider>
  )
}
```

### 2️⃣ Usar CardAnimation en tus secciones

Reemplaza tus cards existentes:

```tsx
// ❌ Antes
<div className="p-6 border rounded-lg">
  Mi card
</div>

// ✅ Ahora
<CardAnimation enableSpotlight>
  <div className="p-6 border rounded-lg">
    Mi card
  </div>
</CardAnimation>
```

### 3️⃣ Scrollea y disfruta! 🎉

Las cards se iluminarán automáticamente al pasar por el centro de la pantalla.

---

## 📝 Ejemplo Completo: ProjectsSection

```tsx
"use client"

import { CardAnimation } from "@/components/common/SectionAnimation"

interface Project {
  title: string
  description: string
  stack: string[]
}

export default function ProjectsSection() {
  const projects: Project[] = [
    {
      title: "Sistema de Tracking",
      description: "Plataforma de seguimiento en tiempo real",
      stack: ["React", "Node.js", "PostgreSQL"],
    },
    {
      title: "SaaS de Gestión",
      description: "Herramienta de gestión empresarial con IA",
      stack: ["Next.js", "Supabase", "OpenAI"],
    },
    // ... más proyectos
  ]

  return (
    <section id="proyectos" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-light text-center mb-20">
          Proyectos
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <CardAnimation
              key={index}
              delay={index * 0.1}
              enableSpotlight={true}
              maxIntensity={1}
              influenceRadius={200}
            >
              <div className="glass rounded-[20px] overflow-hidden border border-border/50 bg-card p-6">
                <h3 className="text-xl font-medium mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </CardAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 🎨 Personalización Rápida

### Efecto más sutil
```tsx
<CardAnimation 
  maxIntensity={0.6} 
  influenceRadius={250}
/>
```

### Efecto más dramático
```tsx
<CardAnimation 
  maxIntensity={1.2} 
  influenceRadius={150}
/>
```

### Overlay más visible (debug)
```tsx
<ScrollBeamOverlay 
  visible={true} 
  opacity={0.3}
  height={80}
/>
```

### Overlay en producción (sutil)
```tsx
<ScrollBeamOverlay 
  visible={true} 
  opacity={0.1}
  height={60}
/>
```

---

## 🔥 Tips Pro

### 1. Stagger para múltiples cards
```tsx
{projects.map((project, index) => (
  <CardAnimation 
    key={index}
    delay={index * 0.1}  // ← Stagger automático
  >
    {/* card content */}
  </CardAnimation>
))}
```

### 2. Desactivar en cards secundarias
```tsx
<CardAnimation enableSpotlight={false}>
  {/* Esta card no tendrá Scroll Beam */}
</CardAnimation>
```

### 3. Overlay solo en desarrollo
```tsx
<ScrollBeamOverlay 
  visible={process.env.NODE_ENV === 'development'}
/>
```

### 4. Mantener el border visible
```tsx
{/* ✅ Asegúrate que las cards tengan border */}
<div className="border border-border rounded-lg">
  {/* El efecto necesita un borde para iluminar */}
</div>
```

---

## 🎬 Resultado Esperado

Cuando scrollees, verás:

1. **Franja luminosa** en el centro del viewport (si activaste el overlay)
2. **Cards se iluminan** progresivamente al acercarse al centro
3. **Brillo máximo** cuando el centro de la card cruza el centro de la pantalla
4. **Apagado gradual** cuando se alejan
5. **Transiciones suaves** sin saltos ni flicker

Todo sincronizado perfectamente con el scroll fluido de Lenis! 🚀

---

## ✅ Checklist de Integración

- [ ] `ScrollProvider` envuelve la aplicación
- [ ] Agregaste `<ScrollBeamOverlay />` (opcional)
- [ ] Reemplazaste divs con `<CardAnimation>`
- [ ] Las cards tienen `border` visible
- [ ] Testeaste el scroll (debería verse el efecto)
- [ ] Ajustaste `maxIntensity` e `influenceRadius` a tu gusto

---

## 🆘 Problemas Comunes

### No veo el efecto
1. Verifica que `ScrollProvider` esté activo
2. Asegúrate que las cards tengan `border`
3. Prueba aumentar `maxIntensity={1.5}` temporalmente

### El overlay no aparece
1. Verifica que `visible={true}`
2. Aumenta `opacity={0.3}` para testing
3. Revisa que esté dentro del `ScrollProvider`

### Performance issues
1. Reduce el número de cards con `enableSpotlight`
2. Desactiva el overlay en producción
3. Usa `enableSpotlight={false}` en cards off-screen

---

¡Listo! Tu Scroll Beam está funcionando 🎉

