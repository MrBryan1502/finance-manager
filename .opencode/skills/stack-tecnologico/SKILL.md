# Stack Tecnológico

## Descripción

Utiliza esta skill siempre que debas tomar decisiones relacionadas con las tecnologías del proyecto.

El objetivo es mantener una integración consistente entre todas las herramientas utilizadas.

---

# Stack oficial

El proyecto utiliza exclusivamente:

- Ionic
- React
- TypeScript
- Capacitor
- SQLite
- Tailwind CSS
- shadcn/ui
- Lucide React

No introducir nuevas dependencias sin autorización del usuario.

---

# Responsabilidades

## React

Responsable de:

- componentes
- estado local
- renderizado
- composición

No implementar reglas de negocio.

---

## Ionic

Responsable de:

- estructura móvil
- navegación
- integración con Capacitor
- comportamiento nativo

Utilizar:

IonApp

IonPage

IonContent

IonRouterOutlet

Tabs

Menu

Navigation

No utilizar componentes visuales de Ionic cuando exista una alternativa equivalente en shadcn/ui, salvo que el comportamiento móvil de Ionic sea necesario.

---

## Tailwind CSS

Sistema principal de estilos.

Preferir clases utilitarias.

Evitar CSS personalizado.

---

## shadcn/ui

Biblioteca principal de componentes visuales.

Siempre preferir:

Button

Input

Card

Dialog

Sheet

Select

Badge

Tabs

Alert

Dropdown Menu

Tooltip

Table

Antes de crear un componente personalizado verificar si shadcn ya ofrece una solución.

---

## Lucide React

Biblioteca oficial de iconos.

No mezclar bibliotecas de iconos.

---

## Capacitor

Responsable de:

- acceso al dispositivo
- plugins nativos
- almacenamiento cuando corresponda
- funcionalidades móviles

Nunca acceder a Capacitor desde el dominio.

---

## SQLite

Responsable de la persistencia.

Nunca acceder directamente desde React.

Siempre utilizar repositorios.

---

# Comunicación

La comunicación correcta es:

React

↓

Caso de uso

↓

Repositorio

↓

SQLite

Nunca:

React

↓

SQLite

---

# Componentes

Utilizar:

Ionic

↓

Layout

↓

shadcn/ui

↓

Tailwind

No invertir este orden.

---

# Dependencias

No incorporar nuevas bibliotecas cuando el stack actual resuelva el problema.

Antes de instalar una dependencia verificar:

- ¿Ya existe una solución oficial?
- ¿React la proporciona?
- ¿Ionic la proporciona?
- ¿shadcn la proporciona?

Solo instalar una nueva dependencia cuando exista una necesidad clara.

---

# Objetivo

Favorecer un stack pequeño, consistente y fácil de mantener.
