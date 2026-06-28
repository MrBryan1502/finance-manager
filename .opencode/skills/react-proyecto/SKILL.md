# React del Proyecto

Esta skill complementa `vercel-react-best-practices`.

No reemplaza las recomendaciones generales de React.

---

# Componentes

Un componente representa una única responsabilidad visual.

Si supera aproximadamente 200 líneas, evaluar dividirlo.

---

# Hooks

Los hooks encapsulan únicamente lógica de presentación.

Nunca lógica financiera.

---

# Formularios

Todo formulario ejecuta un caso de uso.

Nunca modifica entidades directamente.

---

# Estado

Preferir estado local.

Utilizar Context únicamente para estado global de interfaz.

No almacenar entidades del dominio dentro del Context.

---

# Casos de uso

Toda interacción importante termina ejecutando un caso de uso.

Nunca acceder a SQLite.

Nunca acceder a infraestructura.

---

# Props

Preferir props explícitas.

Evitar objetos enormes.

---

# Renderizado

Mantener JSX simple.

Mover lógica compleja fuera del render.

---

# Componentes

Preferir composición antes que herencia.

---

# Layout

Utilizar Ionic únicamente para la estructura.

Utilizar shadcn/ui para componentes visuales.

---

# Navegación

Las páginas navegan.

Los componentes notifican eventos.

---

# Dominio

React nunca conoce entidades persistentes.

Siempre trabajar mediante casos de uso.