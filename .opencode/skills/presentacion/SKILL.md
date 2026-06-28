# Presentación

## Descripción

Utiliza esta skill siempre que debas crear o modificar la interfaz de usuario.

La presentación es responsable únicamente de mostrar información, capturar acciones del usuario y comunicarse con los casos de uso.

Nunca implementa reglas de negocio.

---

# Responsabilidades

La capa de presentación puede:

* mostrar información
* capturar entradas del usuario
* ejecutar casos de uso
* mostrar estados de carga
* mostrar errores
* navegar entre pantallas

No puede:

* realizar cálculos financieros
* acceder a SQLite
* modificar entidades del dominio directamente
* implementar reglas de negocio

---

# Organización

Cada módulo contiene su propia presentación.

Ejemplo

presentacion/

```
paginas/

componentes/

hooks/

contexto/

rutas/
```

No utilizar carpetas globales para componentes específicos del dominio.

---

# Páginas

Las páginas representan pantallas completas.

Ejemplos:

InicioPagina

DetalleCuentaPagina

RegistrarMovimientoPagina

ConfiguracionPagina

Una página coordina componentes.

No contiene lógica de negocio.

---

# Componentes

Los componentes representan partes reutilizables de la interfaz.

Ejemplos:

TarjetaCuenta

ListaMovimientos

ResumenPatrimonio

SelectorCategoria

Los componentes deben ser pequeños y reutilizables.

---

# Hooks

Los hooks encapsulan lógica de presentación.

Ejemplos:

* manejo de formularios
* estados de carga
* navegación
* comunicación con casos de uso

Los hooks nunca implementan reglas financieras.

---

# Contexto

El contexto debe utilizarse únicamente para estado compartido de la interfaz.

Ejemplos:

* tema
* usuario autenticado
* configuración
* preferencias

No utilizar Context para reemplazar el dominio.

---

# Comunicación

La UI nunca accede directamente a SQLite.

La comunicación será:

Página

↓

Hook

↓

Caso de uso

↓

Repositorio

Nunca:

Página

↓

SQLite

---

# Estados

Toda pantalla debe contemplar:

* carga
* éxito
* error
* vacío

No asumir que siempre existen datos.

---

# Formularios

La validación de experiencia de usuario puede realizarse en la interfaz.

Las validaciones de negocio pertenecen al dominio.

Ejemplo:

✔ campo obligatorio

✔ formato de fecha

✔ longitud máxima

Pero:

❌ saldo insuficiente

❌ monto inválido

❌ límite de crédito

Estas validaciones pertenecen al dominio.

---

# Navegación

Las páginas navegan.

Los componentes no.

Los componentes notifican eventos.

La página decide qué hacer.

---

# Componentes reutilizables

Crear componentes reutilizables cuando:

* aparezcan varias veces
* representen un concepto visual
* mejoren la legibilidad

Evitar componentes excesivamente genéricos.

---

# Manejo de errores

Nunca ocultar errores.

Mostrar mensajes claros para el usuario.

Registrar detalles técnicos únicamente cuando sea necesario.

---

# Carga

Mostrar indicadores de carga durante operaciones largas.

Evitar bloquear la interfaz innecesariamente.

---

# Diseño

Priorizar:

* simplicidad
* claridad
* accesibilidad
* consistencia

Evitar interfaces sobrecargadas.

---

# Estado

El estado de la interfaz debe ser el mínimo posible.

No duplicar información que pueda derivarse.

---

# React

Preferir:

* componentes funcionales
* Hooks
* composición
* funciones puras

Evitar lógica compleja dentro del JSX.

---

# Ionic

Utilizar componentes oficiales de Ionic siempre que cubran el caso de uso.

No reinventar componentes existentes.

Mantener una apariencia consistente con el ecosistema de Ionic.

---

# Comunicación con el dominio

Toda operación del usuario debe terminar ejecutando un caso de uso.

Nunca modificar entidades directamente desde React.

---

# Checklist

Antes de finalizar verificar:

* ¿La UI contiene lógica de negocio?
* ¿Existe acceso directo a SQLite?
* ¿La navegación está desacoplada?
* ¿Los componentes son reutilizables?
* ¿La página únicamente coordina?
* ¿El hook contiene solo lógica de presentación?
* ¿Se contemplan estados de carga, error y vacío?

Si alguna respuesta es negativa, refactorizar antes de finalizar.
