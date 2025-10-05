# 📚 GUÍA DE COMPONENTES REUTILIZABLES

Esta guía explica cómo usar los componentes reutilizables del portafolio para facilitar las modificaciones.

## 🎴 COMPONENTE CARD

### Uso Básico
```tsx
import Card, { CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Título de la Card</CardTitle>
    <CardDescription>Descripción de la card</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenido de la card</p>
  </CardContent>
  <CardFooter>
    <Button>Acción</Button>
  </CardFooter>
</Card>
```

### Propiedades del Card

#### Tamaños (`size`)
- `sm`: Pequeño - `p-4 rounded-lg`
- `md`: Mediano (default) - `p-6 rounded-xl`
- `lg`: Grande - `p-8 rounded-[20px]`
- `xl`: Extra grande - `p-12 rounded-[24px]`

#### Variantes (`variant`)
- `default`: Fondo sólido con sombra básica
- `elevated`: Fondo sólido con sombra elevada
- `glass`: Efecto glassmorphism (default)
- `outlined`: Solo borde, sin fondo

#### Otras Propiedades
- `delay`: Retraso de animación (número)
- `hover`: Habilitar efectos de hover (boolean)
- `onClick`: Función al hacer click
- `className`: Clases CSS personalizadas

### Ejemplos de Uso

#### Card de Proyecto
```tsx
<Card size="lg" variant="glass" delay={0.2}>
  <CardHeader>
    <CardTitle>Mi Proyecto</CardTitle>
    <CardDescription>Descripción del proyecto</CardDescription>
  </CardHeader>
  <CardContent>
    <img src="/proyecto.jpg" alt="Proyecto" />
  </CardContent>
  <CardFooter>
    <Button variant="outline">Ver Proyecto</Button>
  </CardFooter>
</Card>
```

#### Card de Habilidad
```tsx
<Card size="md" variant="glass" className="group">
  <CardHeader>
    <CardTitle>React</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Experiencia en desarrollo frontend</p>
  </CardContent>
</Card>
```

## 🔘 COMPONENTE BUTTON

### Uso Básico
```tsx
import { Button } from "@/components/ui/button"

<Button>Botón Normal</Button>
<Button variant="outline">Botón Outline</Button>
<Button size="lg">Botón Grande</Button>
```

### Variantes (`variant`)
- `default`: Botón principal con glow
- `destructive`: Botón de acción peligrosa
- `outline`: Botón con borde
- `secondary`: Botón secundario
- `ghost`: Botón fantasma
- `link`: Botón de enlace
- `glass`: Botón con efecto glassmorphism
- `gradient`: Botón con gradiente

### Tamaños (`size`)
- `sm`: Pequeño
- `default`: Mediano
- `lg`: Grande
- `xl`: Extra grande
- `icon-sm`: Solo icono pequeño
- `icon`: Solo icono
- `icon-lg`: Solo icono grande

### Funcionalidades Adicionales
- `loading`: Estado de carga con spinner
- `leftIcon`: Icono a la izquierda
- `rightIcon`: Icono a la derecha
- `disabled`: Deshabilitar botón

### Ejemplos de Uso

#### Botón con Icono
```tsx
<Button leftIcon={<DownloadIcon />} variant="outline">
  Descargar CV
</Button>
```

#### Botón con Estado de Carga
```tsx
<Button loading={isLoading} variant="gradient">
  Enviar Mensaje
</Button>
```

#### Botón de Icono
```tsx
<Button size="icon" variant="ghost">
  <SettingsIcon />
</Button>
```

## 🎨 PERSONALIZACIÓN DE ESTILOS

### Modificar Colores
Los colores se definen en `app/globals.css` en las variables CSS:
```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... más variables */
}
```

### Modificar Sombras
Las sombras se definen en `app/globals.css`:
```css
.shadow-card {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}
```

### Modificar Animaciones
Las animaciones se definen en `components/common/SectionAnimation.tsx`:
```tsx
// Cambiar duración de animación
transition={{ duration: 0.8, delay: 0.2 }}

// Cambiar easing
ease: [0.25, 0.46, 0.45, 0.94]
```

## 🔧 CÓMO MODIFICAR COMPONENTES

### 1. Cambiar Tamaños de Cards
Edita `components/ui/card.tsx` en la sección `sizeConfig`:
```tsx
const sizeConfig = {
  sm: "p-4 rounded-lg",        // ← Modifica aquí
  md: "p-6 rounded-xl",        // ← Modifica aquí
  lg: "p-8 rounded-[20px]",    // ← Modifica aquí
  xl: "p-12 rounded-[24px]"    // ← Modifica aquí
}
```

### 2. Cambiar Estilos de Botones
Edita `components/ui/button.tsx` en la sección `buttonVariants`:
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center...", // ← Estilos base
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground...", // ← Modifica aquí
        outline: "border bg-transparent glass...",        // ← Modifica aquí
      }
    }
  }
)
```

### 3. Cambiar Animaciones
Edita `components/common/SectionAnimation.tsx`:
```tsx
// Cambiar duración de animación
duration: 0.8,  // ← Modifica aquí

// Cambiar easing
ease: [0.25, 0.46, 0.45, 0.94]  // ← Modifica aquí
```

## 📝 NOTAS IMPORTANTES

1. **Siempre usa los componentes reutilizables** en lugar de crear estilos personalizados
2. **Mantén la consistencia** usando las mismas variantes en toda la aplicación
3. **Prueba los cambios** en diferentes tamaños de pantalla
4. **Usa los comentarios** para entender qué hace cada parte del código
5. **Modifica los datos** en los arrays de cada sección para cambiar el contenido

## 🚀 PRÓXIMOS PASOS

1. Actualiza las otras secciones para usar el componente Card
2. Personaliza los colores y estilos según tus preferencias
3. Agrega más variantes de botones si las necesitas
4. Modifica las animaciones para que se ajusten a tu estilo
