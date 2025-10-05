# Estructura de Componentes

Este directorio contiene todos los componentes del portafolio organizados de manera modular y reutilizable.

## Estructura de Carpetas

```
components/
├── layout/           # Componentes de layout general
│   ├── Header.tsx    # Header con navegación y toggle de tema
│   ├── Footer.tsx    # Footer con información de copyright
│   └── ProgressBar.tsx # Barra de progreso de scroll
├── sections/         # Componentes de secciones específicas
│   ├── HeroSection.tsx      # Sección principal/hero
│   ├── AboutSection.tsx     # Sección "Sobre mí"
│   ├── TimelineSection.tsx  # Sección de trayectoria/experiencia
│   ├── SkillsSection.tsx    # Sección de habilidades
│   ├── ProjectsSection.tsx  # Sección de proyectos
│   └── ContactSection.tsx   # Sección de contacto
├── common/           # Componentes comunes/reutilizables
│   └── BackgroundEffects.tsx # Efectos de fondo
├── ui/               # Componentes de UI base (shadcn/ui)
│   ├── button.tsx
│   ├── input.tsx
│   └── textarea.tsx
├── index.ts          # Exportaciones centralizadas
└── README.md         # Este archivo
```

## Uso

### Importación Individual
```tsx
import Header from '@/components/layout/Header'
import HeroSection from '@/components/sections/HeroSection'
```

### Importación desde el Índice
```tsx
import { Header, HeroSection, AboutSection } from '@/components'
```

## Componentes de Layout

### Header
- Navegación principal
- Toggle de tema (claro/oscuro)
- Responsive design

### Footer
- Información de copyright
- Enlaces adicionales

### ProgressBar
- Barra de progreso de scroll
- Indicador visual del progreso de lectura

## Componentes de Secciones

### HeroSection
- Sección principal con título y CTA
- Efectos de animación con Framer Motion
- Botones de navegación

### AboutSection
- Información personal
- Foto de perfil
- Descripción profesional

### TimelineSection
- Cronología de educación y experiencia
- Cards animados
- Separación por categorías

### SkillsSection
- Habilidades organizadas por categorías
- Efectos hover
- Animaciones de entrada

### ProjectsSection
- Grid de proyectos
- Cards con imágenes y tecnologías
- Efectos de hover

### ContactSection
- Formulario de contacto
- Información de redes sociales
- Descarga de CV

## Componentes Comunes

### BackgroundEffects
- Efectos de fondo globales
- Elementos decorativos

## Características

- **Modularidad**: Cada componente es independiente y reutilizable
- **TypeScript**: Tipado fuerte en todos los componentes
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **Animaciones**: Efectos suaves con Framer Motion
- **Accesibilidad**: Componentes accesibles con ARIA labels
- **Performance**: Componentes optimizados para rendimiento

## Convenciones

- Nombres en PascalCase para componentes
- Props tipadas con interfaces TypeScript
- Uso de "use client" para componentes que requieren interactividad
- Exportación por defecto para componentes principales
- Documentación en JSDoc para props complejas
