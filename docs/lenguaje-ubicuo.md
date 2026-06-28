# Lenguaje Ubicuo

## Objetivo

Este documento define el vocabulario oficial del dominio utilizado en todo el proyecto.

Todos los nombres de entidades, casos de uso, variables, métodos, interfaces, Value Objects, eventos y documentación deberán utilizar exclusivamente los términos definidos aquí.

No deberán inventarse sinónimos para representar un mismo concepto.

---

# Reglas generales

* Todo el código del dominio estará escrito en español.
* Todos los nombres deben expresar intención.
* Evitar abreviaturas.
* Evitar anglicismos cuando exista un equivalente claro en español.
* Cada concepto representa una única responsabilidad.

---

# Conceptos principales

## Usuario

Persona propietaria de toda la información financiera registrada dentro de la aplicación.

---

## Patrimonio

Valor económico total del usuario.

Se calcula mediante:

Patrimonio = Activos - Pasivos

---

## Activo

Todo recurso que posee un valor económico para el usuario.

Ejemplos:

* Cuenta bancaria
* Cuenta de ahorro
* Efectivo
* Inversiones
* Caja chica

---

## Pasivo

Toda obligación financiera pendiente de pago.

Ejemplos:

* Tarjeta de crédito
* Préstamo
* Crédito automotriz
* Hipoteca
* Deuda informal

---

## Cuenta

Lugar donde existe un saldo.

Ejemplos:

* Cuenta bancaria
* Efectivo
* Caja
* Ahorro

Toda cuenta posee un saldo.

---

## Tarjeta

Instrumento financiero asociado normalmente a una institución bancaria.

Puede representar:

* Tarjeta de crédito
* Tarjeta de débito

---

## Deuda

Obligación financiera pendiente.

Toda deuda posee:

* saldo pendiente
* tasa de interés
* fecha límite
* pagos realizados

---

## Préstamo

Tipo específico de deuda originada mediante un financiamiento.

---

## Movimiento

Registro financiero que modifica uno o varios saldos.

Todo movimiento tiene:

* fecha
* monto
* categoría
* descripción

Ejemplos:

* ingreso
* gasto
* transferencia
* pago
* comisión
* interés

---

## Ingreso

Movimiento que incrementa el patrimonio del usuario.

---

## Gasto

Movimiento que disminuye el patrimonio del usuario.

---

## Pago

Movimiento destinado a disminuir una deuda existente.

---

## Transferencia

Movimiento compuesto que mueve dinero entre dos cuentas del usuario.

Toda transferencia genera:

* salida de una cuenta
* entrada en otra cuenta

---

## Categoría

Clasificación utilizada para organizar movimientos.

Ejemplos:

* Alimentación
* Transporte
* Vivienda
* Salud
* Educación

---

## Presupuesto

Límite económico definido para un periodo.

Permite controlar cuánto puede gastarse.

---

## Meta de ahorro

Objetivo económico que el usuario desea alcanzar.

---

## Recordatorio

Notificación programada para informar sobre eventos financieros futuros.

Ejemplos:

* pago de tarjeta
* vencimiento de préstamo
* pago de servicios

---

# Indicadores

## Saldo disponible

Cantidad de dinero utilizable inmediatamente.

---

## Activos totales

Suma del valor de todos los activos.

---

## Pasivos totales

Suma del valor de todas las obligaciones financieras.

---

## Patrimonio neto

Resultado de:

Activos - Pasivos

---

## Flujo de efectivo

Resultado de:

Ingresos - Gastos

durante un periodo determinado.

---

## Endeudamiento

Porcentaje de ingresos comprometidos por deudas.

---

## Capacidad de pago

Monto disponible para asumir nuevas obligaciones financieras sin comprometer la estabilidad económica.

---

# Value Objects

Los siguientes conceptos deberán modelarse como Value Objects siempre que sea posible.

* Dinero
* Porcentaje
* Saldo
* Fecha
* Periodo
* Moneda
* Nombre
* Descripción
* Correo electrónico
* Teléfono
* Tasa de interés
* Frecuencia
* Color
* Identificador

---

# Casos de uso

Todos los casos de uso deberán nombrarse utilizando verbos.

Ejemplos:

* RegistrarIngreso
* RegistrarGasto
* RegistrarPago
* RegistrarTransferencia
* CrearCuenta
* ActualizarCuenta
* EliminarCuenta
* ObtenerPatrimonio
* CalcularFlujoEfectivo
* ObtenerIndicadores

---

# Nombres prohibidos

No utilizar:

* Data
* Manager
* Helper
* Util
* Misc
* Service (cuando represente lógica de dominio)
* Info
* Item
* Object

Tampoco deberán utilizarse sinónimos para conceptos ya definidos.

Ejemplos incorrectos:

* Crédito (cuando el concepto correcto sea Deuda)
* Caja de dinero (usar Cuenta)
* Movimiento económico (usar Movimiento)
* Balance (usar Patrimonio o Saldo según corresponda)

---

# Fuente de verdad

En caso de existir conflicto entre documentación, código o conversaciones, este documento será la referencia oficial para nombrar cualquier concepto del dominio.
