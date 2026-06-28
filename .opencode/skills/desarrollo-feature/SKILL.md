# Desarrollo de Features

## Descripción

Utiliza esta skill siempre que el usuario solicite crear, modificar o ampliar una funcionalidad.

El objetivo es seguir un proceso consistente y respetar la arquitectura del proyecto.

---

# Flujo de trabajo

Antes de escribir código:

1. Leer `docs/vision.md` para comprender el objetivo del producto.
2. Consultar `docs/lenguaje-ubicuo.md` para utilizar la terminología oficial.
3. Revisar `AGENTS.md` para respetar las reglas generales del proyecto.
4. Identificar el módulo al que pertenece la funcionalidad.

---

# Modelado del dominio

Antes de implementar cualquier detalle técnico:

- Identificar las entidades involucradas.
- Identificar los Value Objects necesarios.
- Identificar las reglas de negocio.
- Identificar los repositorios requeridos.
- Verificar si existen conceptos reutilizables.

No comenzar por la interfaz de usuario.

---

# Orden de implementación

Implementar siempre en este orden:

1. Value Objects.
2. Errores del dominio.
3. Entidades.
4. Interfaces de repositorio.
5. Casos de uso.
6. Implementaciones de infraestructura.
7. Persistencia (SQLite).
8. Interfaz de usuario.
9. Pruebas.

---

# Antes de crear código

Verificar:

- ¿Ya existe una entidad equivalente?
- ¿Ya existe un Value Object reutilizable?
- ¿Ya existe un caso de uso similar?
- ¿La funcionalidad pertenece realmente a este módulo?

Evitar duplicación.

---

# Casos de uso

Cada acción importante del usuario debe corresponder a un único caso de uso.

No crear casos de uso con múltiples responsabilidades.

---

# Persistencia

No acceder directamente a SQLite.

Toda persistencia debe realizarse mediante repositorios.

---

# Interfaz

La interfaz solo:

- muestra información;
- captura acciones del usuario;
- ejecuta casos de uso.

No implementa reglas de negocio.

---

# Refactorización

Al finalizar una funcionalidad:

- revisar nombres;
- eliminar duplicación;
- simplificar lógica;
- verificar dependencias entre capas.

---

# Checklist final

Antes de dar por terminada una feature comprobar:

- ¿Respeta la arquitectura hexagonal?
- ¿Respeta el lenguaje ubicuo?
- ¿No hay lógica de negocio en React?
- ¿No hay acceso directo a SQLite?
- ¿Se reutilizaron componentes existentes?
- ¿Los nombres están en español?
- ¿Se añadieron pruebas cuando corresponde?
- ¿La solución mantiene la simplicidad?

Si alguna respuesta es negativa, corregir antes de finalizar.