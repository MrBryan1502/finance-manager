# Persistencia SQLite

## Descripción

Utiliza esta skill siempre que debas crear o modificar la persistencia del proyecto.

Toda la persistencia deberá respetar la arquitectura hexagonal.

---

# Responsabilidad

SQLite es únicamente un mecanismo de almacenamiento.

Nunca representa el dominio.

El dominio no conoce SQLite.

---

# Acceso

Toda operación debe seguir:

Caso de uso

↓

Repositorio

↓

SQLite

Nunca acceder desde React.

---

# Repositorios

Siempre crear primero:

IRepositorioMovimientos

Después:

RepositorioMovimientosSQLite

Nunca implementar directamente sin contrato.

---

# Tablas

Una tabla representa un modelo de persistencia.

No necesariamente una entidad del dominio.

Evitar acoplar el dominio al esquema físico.

---

# Mapeadores

Toda conversión entre SQLite y el dominio deberá realizarse mediante mapeadores.

SQLite

↓

Mapper

↓

Entidad

Nunca construir entidades directamente desde SQL.

---

# Migraciones

Toda modificación del esquema deberá realizarse mediante migraciones.

Nunca modificar tablas manualmente.

---

# Versionado

La base de datos deberá mantener una versión.

Toda actualización debe ser incremental.

Nunca modificar migraciones ya ejecutadas.

---

# SQL

Mantener SQL aislado.

No escribir consultas fuera de infraestructura.

---

# Transacciones

Utilizar transacciones cuando:

- se modifiquen varias tablas
- exista riesgo de inconsistencia

---

# Eliminación

Preferir eliminación lógica cuando la información tenga valor histórico.

Los movimientos financieros normalmente no deben eliminarse.

---

# Índices

Crear índices únicamente cuando exista una necesidad demostrable.

Evitar optimización prematura.

---

# Consultas

Preferir consultas simples.

Mover lógica de negocio al dominio.

---

# Cálculos

SQLite no debe calcular reglas financieras.

Los cálculos pertenecen al dominio.

---

# Fuente de verdad

Los movimientos financieros representan la fuente oficial para reconstruir el estado financiero.

No almacenar información derivada salvo que exista una razón de rendimiento claramente justificada.

---

# Checklist

Antes de finalizar:

- ¿Existe interfaz del repositorio?
- ¿El dominio conoce SQLite?
- ¿Hay SQL fuera de infraestructura?
- ¿Se utilizan mapeadores?
- ¿Existe migración?
- ¿La operación requiere transacción?