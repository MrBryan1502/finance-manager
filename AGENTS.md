# AGENTS.md

# Instrucciones para OpenCode

Este documento define las reglas de desarrollo del proyecto.

Estas reglas tienen prioridad sobre cualquier sugerencia generada automáticamente.

Si existe conflicto entre este documento y una respuesta del modelo, deberá respetarse este documento.

---

# Objetivo

Desarrollar una aplicación móvil para la gestión integral de finanzas personales utilizando una arquitectura limpia, modular y escalable.

La prioridad del proyecto es la mantenibilidad a largo plazo.

El código generado deberá favorecer la claridad, la simplicidad y la extensibilidad antes que la rapidez de implementación.

---

# Principio fundamental

Siempre preferir soluciones oficiales del ecosistema antes de implementar soluciones propias.

Ejemplos:

- Preferir componentes de shadcn/ui antes de crear componentes personalizados.
- Preferir APIs oficiales de React antes de bibliotecas adicionales.
- Preferir componentes de Ionic para navegación y estructura de páginas.
- Preferir Tailwind CSS antes de escribir CSS personalizado.

Solo implementar una solución propia cuando las herramientas oficiales no cubran el caso de uso.

---

# Stack tecnológico

La aplicación utilizará las siguientes tecnologías:

* Ionic
* React
* TypeScript
* Capacitor
* SQLite
* Tailwind CSS
* shadcn/ui
* Lucide Icons

No utilizar tecnologías distintas salvo que el usuario lo solicite explícitamente.

---

# Arquitectura

El proyecto utiliza:

* Arquitectura Hexagonal
* Modular (Vertical Slice)
* Domain Driven Design (DDD) ligero
* SOLID
* Clean Code

La estructura deberá mantenerse consistente durante todo el proyecto.

Nunca generar arquitecturas híbridas.

---

# Organización del proyecto

Cada funcionalidad pertenece a un módulo.

Ejemplo:

src/

```
modulos/

    cuentas/

    movimientos/

    deudas/

    ingresos/
```

Cada módulo contiene exclusivamente cuatro capas.

dominio/

aplicacion/

infraestructura/

presentacion/

No crear carpetas globales como:

* components
* pages
* hooks
* services
* repositories

Cada módulo es responsable de sus propios componentes.

---

# Dependencias

La dirección de las dependencias siempre será:

Presentación

↓

Aplicación

↓

Dominio

↑

Infraestructura

El dominio nunca depende de ninguna otra capa.

La infraestructura implementa contratos definidos por el dominio.

---

# Dominio

El dominio representa únicamente reglas de negocio.

No puede depender de:

* React
* Ionic
* SQLite
* Capacitor
* APIs externas
* LocalStorage

No utilizar:

fetch

axios

window

document

Storage

SQLite

Hooks

JSX

dentro del dominio.

---

# Aplicación

La capa de aplicación orquesta casos de uso.

Responsabilidades:

* coordinar repositorios
* ejecutar reglas del dominio
* transformar datos cuando sea necesario

No debe contener lógica de presentación.

---

# Infraestructura

Responsable de:

* SQLite
* Persistencia
* Repositorios
* Adaptadores
* APIs
* Capacitor

Toda tecnología externa pertenece únicamente a esta capa.

---

# Presentación

Utilizar:

* React
* Ionic
* Hooks
* Context API

La UI nunca implementa reglas de negocio.

La UI únicamente representa información y ejecuta casos de uso.

---

# Sistema de Diseño

La interfaz utilizará Ionic como plataforma móvil y shadcn/ui como biblioteca principal de componentes.

## Responsabilidades

### Ionic

Ionic será responsable de:

* Estructura de la aplicación.
* Navegación.
* Integración con Capacitor.
* Comportamiento móvil.
* Gestión de páginas (`IonPage`, `IonContent`, etc.).

### shadcn/ui

shadcn/ui será la biblioteca principal para los componentes visuales.

Siempre preferir componentes oficiales de shadcn/ui antes de crear componentes personalizados.

Ejemplos:

* Button
* Card
* Input
* Select
* Dialog
* Sheet
* Tabs
* Badge
* Alert
* Dropdown Menu
* Tooltip
* Table

### Tailwind CSS

Tailwind CSS será el sistema principal de estilos.

Preferir clases utilitarias antes que CSS personalizado.

No crear archivos CSS salvo que sea estrictamente necesario.

## Diseño

La interfaz debe ser:

* limpia
* consistente
* responsive
* accesible

Priorizar la simplicidad sobre la complejidad visual.

## Colores

Utilizar exclusivamente los tokens del tema.

Evitar colores fijos como:

* text-red-500
* bg-blue-500

Preferir:

* primary
* secondary
* destructive
* accent
* muted
* background
* foreground

## Modo oscuro

Toda la aplicación debe funcionar correctamente en modo claro y oscuro.

Nunca asumir colores fijos.

## Componentes

Los componentes visuales:

* no implementan reglas de negocio;
* reciben datos mediante props;
* notifican eventos mediante callbacks.

Toda lógica de negocio pertenece a los casos de uso.

## CSS

Antes de escribir CSS personalizado verificar:

1. ¿Existe un componente de shadcn/ui que resuelva el problema?
2. ¿Puede resolverse utilizando Tailwind CSS?
3. Solo como última opción crear estilos personalizados.

---

# SQLite

SQLite será la fuente principal de persistencia.

Nunca acceder directamente a SQLite desde React.

Toda consulta deberá pasar por un repositorio.

No escribir SQL fuera de infraestructura.

---

# Lenguaje

Todo el código propio del proyecto estará escrito en español.

Incluye:

* variables
* métodos
* funciones
* clases
* interfaces
* enums
* DTO
* Value Objects
* entidades
* repositorios
* casos de uso
* eventos

Se conservan únicamente los nombres propios del framework.

Ejemplos:

React

Props

Hooks

JSX

useState

useEffect

---

# Convenciones de nombres

Variables

saldoDisponible

montoPago

fechaVencimiento

Funciones

registrarIngreso()

obtenerPatrimonio()

calcularFlujoEfectivo()

Clases

Cuenta

Movimiento

Deuda

Repositorio

Interfaces

IRepositorioMovimientos

DTO

RegistrarIngresoDTO

Archivos

registrar-ingreso.ts

repositorio-sqlite.ts

crear-cuenta.ts

Usar siempre kebab-case.

---

# Value Objects

Todo dato con reglas propias deberá modelarse como Value Object.

Ejemplos:

Dinero

Saldo

Correo

Nombre

Fecha

Periodo

Porcentaje

Frecuencia

No utilizar tipos primitivos cuando exista un concepto del dominio.

---

# Entidades

Las entidades representan conceptos del dominio.

No deben contener lógica de infraestructura.

No deben conocer React.

No deben conocer SQLite.

---

# Casos de uso

Cada caso de uso representa una única acción.

Ejemplos:

RegistrarIngreso

RegistrarGasto

RegistrarPago

CrearCuenta

EliminarCuenta

ObtenerPatrimonio

CalcularIndicadores

Cada caso de uso deberá tener una única responsabilidad.

---

# Repositorios

Los contratos pertenecen al dominio.

Las implementaciones pertenecen a infraestructura.

Nunca acceder directamente a SQLite desde un caso de uso.

---

# Errores

No lanzar Error directamente.

Crear errores específicos del dominio.

Ejemplo:

MontoInvalidoError

SaldoInsuficienteError

CuentaNoEncontradaError

---

# Testing

Toda regla de negocio deberá poder probarse sin React.

Prioridad:

1. Dominio
2. Casos de uso
3. Infraestructura
4. UI

---

# Calidad del código

Favorecer siempre:

* SOLID
* DRY
* KISS
* YAGNI
* Código expresivo
* Bajo acoplamiento
* Alta cohesión

Evitar optimizaciones prematuras.

---

# Antes de escribir código

Siempre verificar:

* ¿Ya existe una implementación?
* ¿Existe un Value Object apropiado?
* ¿Existe una entidad similar?
* ¿Se puede reutilizar un caso de uso?

Evitar duplicación.

---

# Prohibiciones

No crear clases God.

No crear Helpers genéricos.

No crear Utils con múltiples responsabilidades.

No utilizar variables de una sola letra.

No utilizar nombres ambiguos.

No colocar lógica de negocio dentro de React.

No acceder directamente a SQLite desde la UI.

No romper la arquitectura para resolver problemas pequeños.

---

# Fuente de verdad

Cuando exista conflicto entre distintos documentos:

1. AGENTS.md
2. docs/lenguaje-ubicuo.md
3. docs/vision.md

Todas las decisiones deberán respetar ese orden.
