import {
  IRepositorioPatrimonio,
  ResumenPatrimonio,
} from '../../dominio/repositorios/irepositorio-patrimonio'
import { Dinero } from '../../dominio/value-objects/dinero'
import { RepositorioCuentas } from '../../../cuentas/infraestructura/persistencia/repositorio-cuentas'
import { RepositorioMovimientos } from '../../../movimientos/infraestructura/persistencia/repositorio-movimientos'
import { TipoMovimiento } from '../../../movimientos/dominio/value-objects/tipo-movimiento'

const repositorioCuentas = new RepositorioCuentas()
const repositorioMovimientos = new RepositorioMovimientos()

export class RepositorioPatrimonio implements IRepositorioPatrimonio {
  obtenerResumen(): ResumenPatrimonio {
    const cuentas = repositorioCuentas.listar()
    const movimientos = repositorioMovimientos.listar()

    const activos = cuentas.reduce((sum, c) => sum + c.saldo, 0)
    const pasivos = 0
    const ingresos = movimientos
      .filter((m) => m.tipo === TipoMovimiento.INGRESO)
      .reduce((sum, m) => sum + m.monto, 0)
    const gastos = movimientos
      .filter((m) => m.tipo === TipoMovimiento.GASTO)
      .reduce((sum, m) => sum + m.monto, 0)

    return {
      activos: Dinero.crear(activos),
      pasivos: Dinero.crear(pasivos),
      patrimonio: Dinero.crear(activos - pasivos),
      ingresos: Dinero.crear(ingresos),
      gastos: Dinero.crear(gastos),
    }
  }
}
