# Arquitectura del Proyecto

## Descripción

Utiliza esta skill siempre que debas crear, modificar o extender cualquier funcionalidad del proyecto.

Esta skill define la arquitectura oficial utilizada por la aplicación.

Si existe conflicto con conocimientos generales sobre Arquitectura Hexagonal, prevalecen las reglas descritas aquí.

---

# Objetivo

Mantener una arquitectura consistente, modular y fácil de mantener.

Toda funcionalidad nueva deberá respetar esta estructura.

---

# Filosofía

La arquitectura debe favorecer:

* bajo acoplamiento
* alta cohesión
* separación de responsabilidades
* independencia del framework
* independencia de la base de datos
* facilidad para realizar pruebas

---

# Organización

Toda funcionalidad pertenece a un módulo.

Nunca crear código fuera de un módulo salvo infraestructura compartida claramente justificada.

Ejemplo:

modulos/

```
cuentas/

movimientos/

deudas/

reportes/
```

---

# Capas

Cada módulo posee exactamente cuatro capas.

dominio/

aplicacion/

infraestructura/

presentacion/

No crear capas adicionales.

---

# Dominio

Responsabilidades:

* entidades
* value objects
* contratos
* reglas de negocio
* eventos
* errores

El dominio nunca conoce:

* React
* Ionic
* SQLite
* Capacitor
* HTTP
* APIs

---

# Aplicación

Responsabilidades:

* casos de uso
* orquestación
* coordinación entre repositorios
* ejecución del dominio

No contiene reglas de presentación.

---

# Infraestructura

Responsabilidades:

* SQLite
* adaptadores
* persistencia
* implementación de repositorios
* acceso a servicios externos

Nunca colocar reglas de negocio aquí.

---

# Presentación

Responsabilidades:

* páginas
* componentes
* hooks
* contexto
* navegación

No realizar cálculos de negocio.

Toda lógica debe delegarse a casos de uso.

---

# Comunicación

La comunicación siempre será:

Presentación

↓

Aplicación

↓

Dominio

Infraestructura implementa contratos del dominio.

Nunca comunicar directamente Presentación con Infraestructura.

---

# Casos de uso

Cada caso de uso representa una única acción del usuario.

Ejemplos:

RegistrarIngreso

RegistrarPago

EliminarCuenta

ActualizarPresupuesto

No combinar múltiples acciones en un mismo caso de uso.

---

# Value Objects

Crear un Value Object cuando:

* exista validación
* exista comportamiento
* represente un concepto del dominio
* deba evitar estados inválidos

No utilizar primitivas cuando exista un concepto del negocio.

---

# Repositorios

Siempre definir primero la interfaz.

Después implementar SQLite.

Nunca al revés.

---

# Nuevos módulos

Al agregar una nueva funcionalidad:

1. identificar el dominio
2. crear entidades
3. crear Value Objects
4. definir contratos
5. crear casos de uso
6. implementar infraestructura
7. construir UI

Nunca comenzar por React.

---

# Regla principal

Siempre modelar primero el dominio.

La interfaz es únicamente una consecuencia del modelo de negocio.

Nunca diseñar el dominio alrededor de la interfaz gráfica.

---

# Checklist

Antes de finalizar cualquier implementación verificar:

* ¿Respeta las capas?
* ¿El dominio depende de React?
* ¿El dominio depende de SQLite?
* ¿Existe lógica duplicada?
* ¿Se reutilizaron Value Objects?
* ¿Existe un caso de uso por acción?
* ¿Los nombres siguen el lenguaje ubicuo?
* ¿El módulo sigue la estructura oficial?

Si alguna respuesta es negativa, corregir antes de finalizar.
