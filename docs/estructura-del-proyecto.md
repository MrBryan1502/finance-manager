# Estructura del Proyecto

## Objetivo

Definir la organización física del código fuente.

Toda nueva funcionalidad deberá respetar esta estructura.

---

# Estructura principal

```text
/
├── .opencode/
├── docs/
├── src/
├── public/
├── android/
├── ios/
└── tests/
```

---

# Código fuente

Todo el código de la aplicación vive dentro de:

```text
src/
```

No crear código de negocio fuera de esta carpeta.

---

# Organización

```text
src/
├── modulos/
├── compartido/
├── bootstrap/
└── main.tsx
```

---

# modulos/

Contiene todos los módulos del dominio.

Cada módulo es independiente.

Ejemplo:

```text
modulos/

    patrimonio/

    movimientos/

    obligaciones/

    presupuestos/

    metas/

    reportes/
```

Nunca crear código de negocio fuera de un módulo.

---

# compartido/

Contiene únicamente elementos reutilizables por varios módulos.

Ejemplos:

```text
compartido/

    dominio/

    infraestructura/

    presentacion/

    utilidades/
```

Debe mantenerse pequeño.

No mover aquí código solo para "reutilizar".

---

# bootstrap/

Responsable del inicio de la aplicación.

Ejemplos:

- configuración
- providers
- rutas
- inicialización
- inyección de dependencias

No colocar lógica de negocio.

---

# Módulos

Todo módulo mantiene la misma estructura.

```text
movimientos/

    dominio/

    aplicacion/

    infraestructura/

    presentacion/
```

Nunca modificar esta estructura.

---

# Dominio

```text
dominio/

    entidades/

    value-objects/

    errores/

    eventos/

    repositorios/
```

---

# Aplicación

```text
aplicacion/

    casos-de-uso/

    dto/

    mapeadores/
```

---

# Infraestructura

```text
infraestructura/

    persistencia/

    repositorios/

    mapeadores/
```

---

# Presentación

```text
presentacion/

    paginas/

    componentes/

    hooks/

    contexto/

    rutas/
```

---

# Archivos

Utilizar siempre:

kebab-case

Ejemplos:

```text
registrar-movimiento.ts

repositorio-sqlite.ts

cuenta.ts

dinero.ts
```

---

# Imports

Preferir imports absolutos mediante alias.

Ejemplo:

```ts
@/modulos/movimientos/...
```

Evitar rutas relativas largas.

---

# Prohibido

No crear carpetas globales como:

```text
components/

pages/

services/

repositories/

utils/
```

Todo pertenece a un módulo o a `compartido/`.

---

# Compartido

Mover un elemento a `compartido/` únicamente cuando:

- sea utilizado por dos o más módulos;
- represente un concepto transversal;
- no dependa de un módulo específico.

---

# Dependencias

Las dependencias permitidas son:

Presentación

↓

Aplicación

↓

Dominio

Infraestructura implementa contratos del dominio.

Nunca romper esta dirección.

---

# Checklist

Antes de crear un archivo verificar:

- ¿Pertenece a un módulo?
- ¿Existe una carpeta adecuada?
- ¿Debe estar en compartido?
- ¿Respeta la arquitectura?
- ¿Sigue la convención de nombres?