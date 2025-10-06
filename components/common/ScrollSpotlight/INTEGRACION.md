# 🚀 Guía de Integración - Scroll Spotlight

## ✅ Ya está integrado en tu proyecto!

El sistema de **Scroll Spotlight** ya está completamente integrado con tu componente `CardAnimation` existente. 

**No necesitas cambiar nada** - todas las cards que usan `CardAnimation` ahora tienen un **destello móvil** activado por defecto.

---

## 🎯 Cómo funciona

Cuando haces scroll, hay una **franja en forma de cruz invisible** de ~1cm en el centro de la pantalla (tanto horizontal como vertical en 50vh y 50vw). Cuando **cualquier borde** de una card (top/bottom/left/right) **cruza esa franja**, **TODO ese borde** se ilumina completamente con efectos dinámicos:

- **Borde superior/inferior** → Se ilumina de lado a lado (izquierda a derecha)
- **Borde izquierdo/derecho** → Se ilumina de arriba a abajo

### Características activadas por defecto:
- ✅ **Franja de detección** de ~1cm en el centro de la pantalla
- ✅ **Iluminación de borde completo** (de punta a punta) estilo ConnectedLines
- ✅ Línea brillante con gradiente que ocupa todo el borde
- ✅ Resplandor ambiental distribuido por todo el borde
- ✅ **3 partículas brillantes** distribuidas (20%, 50%, 80%) cuando intensidad > 50%
- ✅ **Ondas expansivas** en puntos clave (30%, 70%) cuando intensidad > 60%
- ✅ Sincronizado con Lenis para scroll suave
- ✅ 60 FPS garantizados con RAF loop
- ✅ Usa `hsl(var(--primary))` del tema automáticamente

---

## 🔧 Personalización Opcional

### 1. En ProjectsSection (EJEMPLO)

Si quieres personalizar el color o intensidad del spotlight en tus proyectos:

```tsx
// components/sections/ProjectsSection.tsx

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <CardAnimation
      delay={index * 0.15}
      // ⭐ Personaliza el efecto:
      enableSpotlight={true}              // Ya es true por defecto
      glowSize={100}                       // Destello más grande (opcional)
      influenceRadius={350}                // Radio más grande (opcional)
      maxIntensity={0.9}                   // Intensidad (opcional)
      className="glass rounded-[20px] overflow-hidden..."
    >
      {/* Tu contenido */}
    </CardAnimation>
  )
}
```

**Nota:** El color ahora se toma automáticamente de `--primary` para mantener consistencia visual con ConnectedLines.

### 2. Colores por categoría

```tsx
// Puedes asignar diferentes colores según el tipo de proyecto:
const getSpotlightColor = (stack: string[]) => {
  if (stack.includes("React")) return "59, 130, 246"   // Azul
  if (stack.includes("Node.js")) return "34, 197, 94"  // Verde
  if (stack.includes(".NET")) return "147, 51, 234"    // Púrpura
  return "59, 130, 246" // Default
}

<CardAnimation
  spotlightColor={getSpotlightColor(project.stack)}
  // ...resto de props
>
```

### 3. Desactivar en cards específicas

Si alguna card NO debe tener spotlight:

```tsx
<CardAnimation
  enableSpotlight={false}  // Desactiva el spotlight
  // ...resto de props
>
```

---

## 🎨 Agregar Indicador Visual (Opcional)

Si quieres que se vea dónde está el punto de iluminación:

### En `app/page.tsx`:

```tsx
import { ScrollSpotlight } from "@/components"

export default function Home() {
  return (
    <ScrollProvider debug={false}>
      <div className="min-h-screen bg-background text-foreground relative">
        
        {/* ⭐ Agrega el indicador visual */}
        <ScrollSpotlight 
          indicatorStyle="gradient"  // o "line" o "pulse"
          opacity={0.2}
          color="59, 130, 246"
        />

        {/* Tu contenido existente */}
        <Header />
        <ProgressBar />
        <LightRails sections={sections} />
        
        <main className="relative">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          {/* ... */}
        </main>
      </div>
    </ScrollProvider>
  )
}
```

---

## 🎭 Estilos de Indicador

### `"gradient"` - Gradiente Sutil (Recomendado)
```tsx
<ScrollSpotlight 
  indicatorStyle="gradient" 
  opacity={0.2}
/>
```
Crea una zona de luz difusa, muy sutil y elegante.

### `"line"` - Línea Horizontal
```tsx
<ScrollSpotlight 
  indicatorStyle="line" 
  opacity={0.15}
/>
```
Línea horizontal con punto central pulsante.

### `"pulse"` - Ondas de Pulso
```tsx
<ScrollSpotlight 
  indicatorStyle="pulse" 
  opacity={0.18}
/>
```
Ondas concéntricas animadas, más llamativo.

---

## 📱 Testing del Sistema

### Ver en acción:
1. Abre tu aplicación
2. Haz scroll lentamente
3. Observa cómo las cards se iluminan al pasar por el centro
4. Los bordes y sombras cambiarán suavemente

### Debug Mode:
Para ver los valores en tiempo real, abre DevTools y inspecciona:
```html
<div 
  data-spotlight-active="true"
  data-spotlight-intensity="0.87"
>
```

---

## 🎨 Consistencia Visual

El sistema ahora usa **automáticamente** el color primary de tu tema (`hsl(var(--primary))`), igual que:
- MainVerticalLine
- LineIllumination  
- LightRails
- Todos los componentes ConnectedLines

Esto crea una **experiencia visual cohesiva** donde todas las luces y efectos comparten el mismo color y estilo.

Si quieres cambiar el color de **todos** los efectos a la vez, modifica la variable `--primary` en tu configuración de tema.

---

## ⚡ Performance

El sistema está optimizado para 60 FPS:

- ✅ Usa `requestAnimationFrame` para sincronizar con el navegador
- ✅ Motion values de Framer Motion (GPU accelerated)
- ✅ Cálculos mínimos en cada frame
- ✅ No hay re-renders innecesarios
- ✅ Compatible con Lenis smooth scroll

---

## 🔥 Tips Pro

### 1. Ajusta el radio según el contenido
```tsx
// Para cards pequeñas
<CardAnimation influenceRadius={200} />

// Para cards grandes
<CardAnimation influenceRadius={400} />
```

### 2. Intensidad variable
```tsx
// Efecto sutil
<CardAnimation maxIntensity={0.6} />

// Efecto dramático
<CardAnimation maxIntensity={1} />
```

### 3. Combinar con hover effects
```tsx
<CardAnimation
  enableSpotlight
  className="transition-all hover:scale-105"
>
  {/* El spotlight y el hover funcionan juntos */}
</CardAnimation>
```

---

## 🐛 Troubleshooting

### Las cards no se iluminan
- ✅ Verifica que el hijo directo tenga `border` o `border-transparent`
- ✅ Asegúrate de tener `ScrollProvider` envolviendo la app
- ✅ Revisa que `enableSpotlight={true}`

### Lag o bajadas de FPS
- Reduce `influenceRadius` a 200-250
- Limita el número de cards con spotlight activo
- Usa `enableSpotlight={false}` en cards secundarias

### El color no se ve bien
- Verifica el formato RGB: `"255, 0, 0"` (sin `rgb()`)
- Aumenta `maxIntensity` si es muy sutil
- Ajusta el `opacity` del fondo de la card

---

## 📊 Configuración Recomendada por Sección

### Hero Section
```tsx
// Sin spotlight, es la primera sección
<CardAnimation enableSpotlight={false} />
```

### About Section
```tsx
// Spotlight sutil
<CardAnimation 
  enableSpotlight
  maxIntensity={0.7}
  spotlightColor="59, 130, 246"
/>
```

### Projects Section
```tsx
// Spotlight normal con colores personalizados
<CardAnimation 
  enableSpotlight
  spotlightColor="147, 51, 234"
  influenceRadius={300}
/>
```

### Skills Section
```tsx
// Spotlight suave para múltiples items
<CardAnimation 
  enableSpotlight
  influenceRadius={200}
  maxIntensity={0.6}
/>
```

### Contact Section
```tsx
// Sin spotlight, es la última sección
<CardAnimation enableSpotlight={false} />
```

---

## 🎬 Siguiente Paso

Ya está todo listo! Solo **haz scroll** en tu aplicación y verás el efecto en acción.

Si quieres personalizarlo, usa los ejemplos de arriba. Si no, deja los defaults - se ve genial! 🚀

