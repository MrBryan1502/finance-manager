# Dominio Financiero

## Descripción

Utiliza esta skill siempre que debas modelar información relacionada con finanzas personales.

Esta skill define el significado de los conceptos financieros utilizados por la aplicación.

No inventes nuevos conceptos si ya existen en este documento.

---

# Filosofía

La aplicación no registra únicamente ingresos y gastos.

Modela el estado financiero completo del usuario.

Todo elemento financiero pertenece al patrimonio del usuario.

---

# Patrimonio

El patrimonio representa la situación financiera del usuario.

Se calcula mediante:

Patrimonio = Activos - Pasivos

Nunca modificar esta definición.

---

# Activos

Un activo representa cualquier recurso económico propiedad del usuario.

Ejemplos:

* efectivo
* cuenta bancaria
* cuenta de ahorro
* inversión
* fondo de emergencia

Los activos aumentan el patrimonio.

---

# Pasivos

Un pasivo representa cualquier obligación financiera.

Ejemplos:

* tarjeta de crédito
* préstamo
* hipoteca
* deuda informal

Los pasivos disminuyen el patrimonio.

---

# Cuenta

Una cuenta almacena dinero.

Toda cuenta posee:

* saldo
* nombre
* moneda
* tipo

Ejemplos:

* efectivo
* banco
* ahorro

---

# Tarjeta

Una tarjeta representa un instrumento financiero.

Puede ser:

* débito
* crédito

Las tarjetas de crédito generan deuda.

Las tarjetas de débito no.

---

# Movimiento

Todo cambio financiero debe registrarse mediante un movimiento.

Nunca modificar saldos directamente.

Los movimientos representan la fuente de verdad.

---

# Tipos de movimiento

Los movimientos permitidos son:

Ingreso

Gasto

Transferencia

Pago

Comisión

Interés

Ajuste

No crear nuevos tipos salvo autorización del usuario.

---

# Ingreso

Incrementa los recursos económicos.

Ejemplos:

* salario
* bono
* devolución
* venta

---

# Gasto

Representa una salida económica destinada al consumo.

Ejemplos:

* supermercado
* gasolina
* entretenimiento
* servicios

No utilizar gasto para representar pagos de deuda.

---

# Pago

Representa una disminución de una obligación financiera.

Ejemplos:

* pago de tarjeta
* pago de préstamo

El pago modifica una deuda.

No representa un gasto de consumo.

---

# Transferencia

Representa un movimiento entre dos cuentas propias.

Toda transferencia genera:

* salida de una cuenta
* entrada en otra

Nunca modificar el patrimonio.

---

# Interés

Representa el costo financiero asociado a una deuda o inversión.

Puede incrementar:

* deuda
* rendimiento

Dependiendo del contexto.

---

# Comisión

Representa un cargo generado por una institución financiera.

---

# Ajuste

Movimiento utilizado únicamente para corregir diferencias de saldo.

Debe utilizarse excepcionalmente.

---

# Presupuesto

Define un límite de gasto durante un periodo.

Nunca modifica saldos.

Solo permite medir el comportamiento financiero.

---

# Meta de ahorro

Representa un objetivo económico.

No modifica saldos.

Sirve para evaluar el progreso del usuario.

---

# Categorías

Toda categoría clasifica movimientos.

No almacena dinero.

No modifica patrimonio.

---

# Indicadores

El sistema debe ser capaz de calcular:

* patrimonio
* activos
* pasivos
* flujo de efectivo
* gastos por categoría
* ingresos por periodo
* porcentaje de endeudamiento
* capacidad de pago

Los indicadores nunca almacenan información.

Siempre se calculan.

---

# Proyecciones

Las proyecciones representan simulaciones futuras.

Nunca modifican información real.

Toda proyección debe poder eliminarse sin afectar los datos existentes.

---

# Reglas fundamentales

Nunca modificar saldos directamente.

Todo cambio financiero debe originarse mediante movimientos.

Nunca eliminar movimientos utilizados para cálculos históricos.

Los cálculos deben ser deterministas.

Una misma entrada siempre produce el mismo resultado.

---

# Casos especiales

Recibir un préstamo:

Activo ↑

Pasivo ↑

Patrimonio sin cambios.

---

Comprar con tarjeta de crédito:

Pasivo ↑

No disminuye inmediatamente una cuenta bancaria.

---

Pagar una tarjeta:

Activo ↓

Pasivo ↓

No representa un gasto de consumo.

---

Transferir dinero entre cuentas:

Activo cambia de ubicación.

Patrimonio sin cambios.

---

Registrar un ingreso:

Activo ↑

Patrimonio ↑

---

Registrar un gasto:

Activo ↓

Patrimonio ↓

---

# Modelado

Antes de crear una entidad nueva verificar:

¿Representa un concepto del dominio?

¿Tiene identidad?

¿Tiene comportamiento?

¿Debe persistirse?

Si la respuesta es negativa probablemente sea un Value Object.

---

# Fuente de verdad

Los movimientos representan la fuente oficial para reconstruir el estado financiero del usuario.

Nunca almacenar información redundante que pueda calcularse nuevamente.
