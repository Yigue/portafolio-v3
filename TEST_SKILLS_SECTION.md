# Test: Skills Section - Diagrama de Venn

## 📋 Descripción

Se ha creado una nueva versión de la sección de habilidades (`SkillsSectionVenn.tsx`) que muestra un **diagrama de Venn interactivo** con tres círculos superpuestos.

## 🎯 Características implementadas

### ✅ Círculos temáticos
1. **Desarrollo/Programación** (púrpura)
   - .NET, JavaScript, React, Node, Git, APIs, SQL, OOP
   
2. **Cloud/Infraestructura** (azul)
   - AWS, Docker, Kubernetes, CI/CD, Terraform, Linux, Monitoring
   
3. **Ciberseguridad** (rosa)
   - Pentesting, Networking, Firewalls, Vulnerability Analysis, ISO 27001, SIEM

### ✅ Efectos visuales
- **Bordes luminosos** con colores específicos para cada círculo
- **Glow animado** que reacciona al movimiento del mouse
- **Pulso periódico** en los bordes de los círculos
- **Etiquetas flotantes** con las tecnologías distribuidas circularmente
- **Texto central** con el rol principal: "DevOps Engineer / Backend Developer / Consultant"
- **Animaciones suaves** de entrada y hover

### ✅ Interactividad
- Efectos de hover en cada círculo
- Reactividad al movimiento del mouse (glow se intensifica)
- Animaciones escalonadas para las etiquetas

## 🔄 Cómo alternar entre versiones

En el archivo `app/page.tsx` (líneas 78-82):

```tsx
{/* Versión original del BentoGrid */}
{/* <SkillsSection /> */}

{/* Nueva versión con Diagrama de Venn */}
<SkillsSectionVenn />
```

### Para usar la versión original:
```tsx
<SkillsSection />
{/* <SkillsSectionVenn /> */}
```

### Para usar la versión Venn:
```tsx
{/* <SkillsSection /> */}
<SkillsSectionVenn />
```

## 🎨 Personalización

En `components/sections/SkillsSectionVenn.tsx` puedes ajustar:

### Colores (líneas 17-48):
- Cambiar los gradientes en `circleConfig`
- Ajustar `color`, `bgColor`, `glowColor`

### Texto central (líneas 283-311):
- Modificar "DevOps Engineer"
- Cambiar el subtítulo "Backend Developer / Consultant"

### Tecnologías (líneas 19-34):
- Agregar o quitar habilidades por círculo
- Los ítems se distribuyen automáticamente

### Tamaños y posiciones (líneas 28-33):
- `radius`: Tamaño del círculo (píxeles)
- `x`, `y`: Posición relativa al centro (píxeles)

## 🚀 Ver en acción

1. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

2. Navega a la sección de habilidades
3. Observa las animaciones y mueve el mouse sobre los círculos

## 📝 Observaciones

- Los círculos se superponen usando posicionamiento absoluto
- Las etiquetas de habilidades se distribuyen automáticamente en un círculo
- El efecto de pulso es continuo y asíncrono entre círculos
- El glow reacciona suavemente al movimiento del mouse

