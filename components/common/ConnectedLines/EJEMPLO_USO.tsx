/**
 * 📘 EJEMPLO DE USO - Connected Lines System
 * 
 * Este archivo muestra cómo implementar el sistema de luz
 * en tus secciones y cards.
 */

"use client"

import { LightCard } from './index'
import { motion } from 'framer-motion'
import { useLightTrigger } from '@/lib/hooks/useLightTrigger'
import { useState } from 'react'

/**
 * EJEMPLO 1: Sección básica con LightCard
 * ----------------------------------------
 * La forma más simple de usar el sistema
 */
export function EjemploBasico() {
  return (
    <section id="sobre-mí" className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        
        {/* Card que reacciona a la luz automáticamente */}
        <LightCard 
          sectionId="sobre-mí"
          borderRadius={24}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">Sobre Mí</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Cuando la luz toque esta card, verás cómo un destello
            recorre su borde y aparecen partículas.
          </p>
        </LightCard>

      </div>
    </section>
  )
}


/**
 * EJEMPLO 2: Grid de cards con luz
 * ----------------------------------
 * Múltiples cards en una misma sección
 */
export function EjemploGrid() {
  return (
    <section id="habilidades" className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        
        <h2 className="text-4xl font-bold text-center mb-12">Mis Habilidades</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <LightCard sectionId="habilidades" borderRadius={16}>
            <div className="text-4xl mb-4">⚛️</div>
            <h3 className="text-xl font-bold mb-2">React</h3>
            <p className="text-sm text-muted-foreground">
              Desarrollo de interfaces modernas y reactivas
            </p>
          </LightCard>

          {/* Card 2 */}
          <LightCard sectionId="habilidades" borderRadius={16}>
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold mb-2">Design</h3>
            <p className="text-sm text-muted-foreground">
              UI/UX y animaciones fluidas
            </p>
          </LightCard>

          {/* Card 3 */}
          <LightCard sectionId="habilidades" borderRadius={16}>
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Performance</h3>
            <p className="text-sm text-muted-foreground">
              Optimización y best practices
            </p>
          </LightCard>

        </div>
      </div>
    </section>
  )
}


/**
 * EJEMPLO 3: Sección con animaciones personalizadas
 * ---------------------------------------------------
 * Usa useLightTrigger para crear animaciones custom
 */
export function EjemploPersonalizado() {
  const [lightProgress, setLightProgress] = useState(0)
  const [isActive, setIsActive] = useState(false)

  // Escuchar cuando la luz toca esta sección
  useLightTrigger('proyectos', (event) => {
    setIsActive(event.isActive)
    setLightProgress(event.progress)
  })

  return (
    <section id="proyectos" className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        
        {/* Título que se anima según el progreso de la luz */}
        <motion.h2 
          className="text-4xl font-bold text-center mb-12"
          animate={{
            opacity: isActive ? 1 : 0.5,
            scale: isActive ? 1 : 0.95,
            y: isActive ? 0 : 20,
          }}
          transition={{ duration: 0.5 }}
        >
          Mis Proyectos
        </motion.h2>

        {/* Barra de progreso visual */}
        <div className="w-full h-2 bg-border rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            style={{ width: `${lightProgress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Cards de proyectos */}
        <div className="space-y-6">
          <LightCard sectionId="proyectos" borderRadius={20}>
            <h3 className="text-2xl font-bold mb-2">Proyecto 1</h3>
            <p className="text-muted-foreground">
              Progreso de luz en esta sección: {(lightProgress * 100).toFixed(0)}%
            </p>
          </LightCard>

          <LightCard sectionId="proyectos" borderRadius={20}>
            <h3 className="text-2xl font-bold mb-2">Proyecto 2</h3>
            <p className="text-muted-foreground">
              Estado: {isActive ? '✨ Iluminado' : '💤 Esperando'}
            </p>
          </LightCard>
        </div>

      </div>
    </section>
  )
}


/**
 * EJEMPLO 4: Card sin LightCard wrapper (manual)
 * -----------------------------------------------
 * Si querés más control sobre la animación
 */
export function EjemploManual() {
  const [isLit, setIsLit] = useState(false)

  useLightTrigger('contacto', (event) => {
    setIsLit(event.isActive && event.progress > 0.2)
  })

  return (
    <section id="contacto" className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        className="max-w-md w-full bg-card border rounded-2xl p-8"
        animate={{
          borderColor: isLit ? 'hsl(var(--primary))' : 'hsl(var(--border))',
          boxShadow: isLit 
            ? '0 0 40px hsl(var(--primary) / 0.5)' 
            : '0 4px 6px rgba(0,0,0,0.1)',
        }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">Contacto</h2>
        
        <motion.button
          className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-lg font-medium"
          animate={{
            scale: isLit ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 1,
            repeat: isLit ? Infinity : 0,
          }}
        >
          {isLit ? '✨ ¡Envía tu mensaje!' : 'Enviar mensaje'}
        </motion.button>
      </motion.div>
    </section>
  )
}


/**
 * EJEMPLO 5: Timeline con puntos iluminados
 * -------------------------------------------
 * Perfecto para secciones de experiencia laboral
 */
export function EjemploTimeline() {
  const [activeIndex, setActiveIndex] = useState(-1)

  useLightTrigger('timeline', (event) => {
    // Calcular qué item del timeline debe iluminarse
    const index = Math.floor(event.progress * 4) // 4 items
    setActiveIndex(event.isActive ? index : -1)
  })

  const timelineItems = [
    { year: '2024', title: 'Senior Developer', company: 'Tech Corp' },
    { year: '2023', title: 'Full Stack Developer', company: 'StartUp Inc' },
    { year: '2022', title: 'Frontend Developer', company: 'Digital Agency' },
    { year: '2021', title: 'Junior Developer', company: 'First Job' },
  ]

  return (
    <section id="timeline" className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        
        <h2 className="text-4xl font-bold text-center mb-16">Mi Trayectoria</h2>

        <div className="relative">
          {/* Línea vertical del timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

          {/* Items del timeline */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-20"
                animate={{
                  opacity: activeIndex >= index ? 1 : 0.4,
                  x: activeIndex >= index ? 0 : -20,
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Punto del timeline */}
                <motion.div
                  className="absolute left-6 w-4 h-4 rounded-full border-2"
                  animate={{
                    borderColor: activeIndex >= index 
                      ? 'hsl(var(--primary))' 
                      : 'hsl(var(--border))',
                    backgroundColor: activeIndex >= index 
                      ? 'hsl(var(--primary))' 
                      : 'transparent',
                    scale: activeIndex === index ? [1, 1.5, 1] : 1,
                    boxShadow: activeIndex === index 
                      ? '0 0 20px hsl(var(--primary))' 
                      : 'none',
                  }}
                  transition={{
                    duration: 0.5,
                    scale: {
                      duration: 1,
                      repeat: activeIndex === index ? Infinity : 0,
                    }
                  }}
                />

                {/* Contenido */}
                <LightCard 
                  sectionId="timeline"
                  borderRadius={12}
                >
                  <div className="text-primary font-bold mb-1">{item.year}</div>
                  <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.company}</p>
                </LightCard>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}


/**
 * EJEMPLO 6: Integración con page.tsx
 * -------------------------------------
 * Cómo usar todos estos ejemplos en tu página principal
 */
export function EjemploPageCompleto() {
  return (
    <>
      {/* En app/page.tsx, ya tenés esto: */}
      {/* <ConnectedLines debug={false} /> */}

      {/* Después, añadí tus secciones: */}
      <main className="relative">
        
        <EjemploBasico />
        <EjemploGrid />
        <EjemploPersonalizado />
        <EjemploTimeline />
        <EjemploManual />

      </main>
    </>
  )
}


/**
 * 💡 TIPS IMPORTANTES:
 * 
 * 1. Cada sección DEBE tener un id único que coincida con el sectionId:
 *    <section id="sobre-mí">
 *    <LightCard sectionId="sobre-mí">
 * 
 * 2. Las secciones deben tener suficiente altura para ser detectadas:
 *    className="min-h-screen" es ideal
 * 
 * 3. El componente ConnectedLines debe estar en el mismo nivel que las secciones
 *    para que pueda detectarlas correctamente
 * 
 * 4. Usá debug={true} en ConnectedLines para ver qué está pasando:
 *    <ConnectedLines debug={true} />
 * 
 * 5. Podés mezclar LightCard con animaciones custom usando useLightTrigger
 * 
 * 6. El sistema es responsive: se oculta en mobile con "hidden lg:block"
 */

