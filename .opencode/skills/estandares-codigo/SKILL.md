# Estándares de Código

## Descripción

Utiliza esta skill para escribir cualquier archivo del proyecto.

Su objetivo es mantener un estilo consistente, legible y mantenible.

---

# Idioma

Todo el código del dominio debe escribirse en español.

Incluye:

* variables
* funciones
* clases
* interfaces
* enums
* DTO
* Value Objects
* eventos
* repositorios
* casos de uso

Se conservan únicamente los nombres propios del framework.

Ejemplos:

React

Props

Hooks

JSX

useEffect

useState

---

# Variables

Las variables deben expresar claramente su propósito.

Correcto

```ts
saldoDisponible
montoPendiente
fechaVencimiento
categoriaSeleccionada
```

Incorrecto

```ts
data
obj
tmp
valor
aux
```

---

# Funciones

Las funciones representan acciones.

Siempre comenzar con un verbo.

Ejemplos

registrarIngreso()

obtenerPatrimonio()

calcularSaldo()

crearCuenta()

eliminarMovimiento()

---

# Clases

Las clases representan conceptos del dominio.

No crear clases únicamente para agrupar funciones.

---

# Interfaces

Las interfaces representan contratos.

Ejemplo

IRepositorioMovimientos

Nunca utilizar interfaces vacías.

---

# Tipos

Utilizar type cuando represente una composición sencilla.

Utilizar interface para contratos.

---

# Enums

Crear enums únicamente cuando el conjunto de valores sea estable.

Evitar enums enormes.

---

# Métodos

Un método debe realizar una única tarea.

Si necesita demasiadas condiciones probablemente deba dividirse.

---

# Longitud

Funciones:

Preferiblemente menos de 30 líneas.

Métodos largos indican responsabilidades mezcladas.

---

# Parámetros

Preferir pocos parámetros.

Cuando existan muchos datos relacionados crear un DTO.

---

# Retornos

Evitar múltiples niveles de anidación.

Utilizar retornos anticipados.

Correcto

```ts
if (!cuenta) {
    return;
}
```

---

# Comentarios

No escribir comentarios que expliquen el código.

El código debe ser autoexplicativo.

Solo comentar cuando explique una decisión de negocio o una restricción importante.

---

# Constantes

No utilizar números mágicos.

Extraer constantes con nombres descriptivos.

---

# Booleanos

Los nombres deben responder preguntas.

Correcto

estaActiva

tieneSaldo

puedeEliminarse

Incorrecto

activo

saldo

eliminar

---

# Colecciones

Nombrar en plural.

cuentas

movimientos

categorias

---

# Errores

Nunca lanzar Error directamente.

Siempre utilizar errores específicos.

---

# Inmutabilidad

Preferir objetos inmutables.

Evitar modificar parámetros recibidos.

---

# Imports

Orden:

1. Librerías externas
2. Módulos internos
3. Tipos
4. Estilos

Eliminar imports no utilizados.

---

# Código duplicado

Antes de escribir código verificar si ya existe una implementación similar.

---

# Legibilidad

Optimizar siempre para que otra persona pueda entender el código rápidamente.

Nunca optimizar sacrificando claridad.

---

# Abstracciones

No crear abstracciones anticipadas.

Aplicar YAGNI.

---

# Organización

Cada archivo debe contener una única responsabilidad.

Evitar archivos excesivamente grandes.

---

# Checklist

Antes de finalizar un archivo verificar:

* ¿Los nombres expresan intención?
* ¿Existe código duplicado?
* ¿La función tiene una única responsabilidad?
* ¿Hay números mágicos?
* ¿El código puede simplificarse?vamos 
* ¿Las validaciones utilizan retornos tempranos?
* ¿Los errores son específicos?
* ¿El archivo tiene una única responsabilidad?

Si alguna respuesta es negativa, refactorizar antes de finalizar.
