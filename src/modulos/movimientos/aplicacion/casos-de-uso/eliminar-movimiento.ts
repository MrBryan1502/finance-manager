import { IRepositorioMovimientos } from '../../dominio/repositorios/irepositorio-movimientos'
import { IRepositorioCuentas } from '../../../cuentas/dominio/repositorios/irepositorio-cuentas'
import { TipoMovimiento } from '../../dominio/value-objects/tipo-movimiento'

export class EliminarMovimiento {
  constructor(
    private readonly repositorioMovimientos: IRepositorioMovimientos,
    private readonly repositorioCuentas: IRepositorioCuentas
  ) {}

  ejecutar(id: string): void {
    const movimiento = this.repositorioMovimientos.obtenerPorId(id)
    if (!movimiento) return

    this.repositorioMovimientos.eliminar(id)

    const cuenta = this.repositorioCuentas.obtenerPorId(movimiento.cuentaId)
    if (cuenta) {
      const reversa = movimiento.tipo === TipoMovimiento.INGRESO ? -movimiento.monto : movimiento.monto
      this.repositorioCuentas.actualizar({
        ...cuenta,
        saldo: cuenta.saldo + reversa,
      })
    }
  }
}