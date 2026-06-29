# Finance Manager App

Aplicación móvil para la gestión integral de finanzas personales. Construida con Ionic + React + TypeScript, almacenamiento local y autenticación biométrica.

## Stack tecnológico

- **Ionic 8** — Estructura de páginas y navegación
- **React 19** — UI
- **TypeScript** — Tipado estático
- **Material UI 9** — Componentes visuales
- **Capacitor 8** — Acceso nativo
- **@aparajita/capacitor-biometric-auth** — Autenticación biométrica
- **localStorage** — Persistencia de datos
- **Tailwind CSS 4** — Estilos globales
- **Lucide React** — Íconos

## Arquitectura

Arquitectura hexagonal con módulos verticales. Cada módulo contiene cuatro capas:

- `dominio/` — Entidades, Value Objects, contratos de repositorio
- `aplicacion/` — Casos de uso que orquestan la lógica
- `infraestructura/` — Implementaciones concretas (persistencia, biometría)
- `presentacion/` — Páginas y componentes React

### Módulos actuales

| Módulo         | Descripción                                      |
|----------------|--------------------------------------------------|
| `autenticacion`| PIN de acceso (4-6 dígitos), biometría opcional  |
| `cuentas`      | CRUD de cuentas (efectivo, banco, crédito)       |
| `movimientos`  | Registro de ingresos y gastos por cuenta         |
| `patrimonio`   | Panel con activos, pasivos, patrimonio neto      |

## Requisitos

- Node.js >= 18
- pnpm
- Java 17+ (para Android)
- Android Studio (para build nativo)

## Instalación

```bash
pnpm install
pnpm cap sync
```

## Scripts

| Comando              | Descripción                              |
|----------------------|------------------------------------------|
| `pnpm dev`           | Inicia servidor de desarrollo            |
| `pnpm build`         | Build de producción                      |
| `pnpm preview`       | Previsualiza build                       |
| `pnpm lint`          | ESLint                                   |
| `pnpm test.unit`     | Pruebas unitarias (Vitest)               |
| `pnpm test.e2e`      | Pruebas e2e (Cypress)                    |
| `pnpm cap run android` | Ejecutar en dispositivo Android       |

## Enlaces

- [Visión del producto](docs/vision.md)
- [Lenguaje ubicuo](docs/lenguaje-ubicuo.md)
- [Estructura del proyecto](docs/estructura-del-proyecto.md)

## Licencia

Privado — uso personal.
