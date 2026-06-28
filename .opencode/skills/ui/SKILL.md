# UI

## Descripción

Utiliza esta skill siempre que debas crear o modificar componentes visuales.

El objetivo es mantener una interfaz consistente, moderna y accesible.

---

# Framework

La interfaz utilizará:

- Tailwind CSS
- shadcn/ui
- Ionic
- Lucide Icons

Siempre preferir componentes oficiales antes de crear componentes personalizados.

---

# Componentes

Utilizar primero componentes de shadcn/ui.

Ejemplos:

- Button
- Card
- Input
- Dialog
- Select
- Sheet
- Dropdown Menu
- Tabs
- Badge
- Alert
- Tooltip

Solo crear componentes propios cuando shadcn no cubra la necesidad.

---

# Tailwind

Utilizar clases utilitarias.

No escribir CSS personalizado salvo que sea estrictamente necesario.

Preferir:

```tsx
className="flex flex-col gap-4"
```

En lugar de:

```css
.mi-contenedor {
    display: flex;
}
```

---

# Diseño

Priorizar:

- simplicidad
- claridad
- consistencia

Evitar interfaces sobrecargadas.

---

# Responsive

Toda pantalla debe funcionar correctamente desde teléfonos pequeños hasta tablets.

No asumir un tamaño fijo.

---

# Espaciado

Utilizar la escala de Tailwind.

Ejemplos:

gap-2

gap-4

p-4

p-6

space-y-4

Evitar valores arbitrarios.

---

# Colores

Utilizar exclusivamente el sistema de colores definido por el tema.

No utilizar:

text-red-500

bg-blue-400

etc.

Preferir:

primary

secondary

destructive

muted

accent

foreground

background

Esto facilita el soporte para temas.

---

# Tipografía

Utilizar las clases oficiales.

No definir tamaños arbitrarios.

---

# Iconos

Utilizar Lucide Icons.

Evitar mezclar bibliotecas de iconos.

---

# Accesibilidad

Todos los formularios deben tener:

- label
- mensajes de error
- navegación por teclado
- atributos ARIA cuando correspondan

---

# Animaciones

Utilizar animaciones discretas.

No abusar de efectos visuales.

---

# Componentes

Los componentes visuales no deben contener lógica de negocio.

Solo representan datos recibidos mediante props.

---

# Dark Mode

Toda la interfaz debe funcionar correctamente tanto en modo claro como oscuro.

Nunca utilizar colores fijos.

---

# Checklist

Antes de finalizar:

- ¿Existe un componente de shadcn que resuelva el problema?
- ¿Se respetó el sistema de diseño?
- ¿Es responsive?
- ¿Es accesible?
- ¿Funciona en modo oscuro?
- ¿Evita CSS personalizado?
