import { IRepositorioMovimientos } from '../../dominio/repositorios/irepositorio-movimientos'
import { IRepositorioCuentas } from '../../../cuentas/dominio/repositorios/irepositorio-cuentas'
import { ActualizarMovimientoDTO } from '../dto/actualizar-movimiento-dto'
import { TipoMovimiento } from '../../dominio/value-objects/tipo-movimiento'

export class ActualizarMovimiento {
  constructor(
    private readonly repositorioMovimientos: IRepositorioMovimientos,
    private readonly repositorioCuentas: IRepositorioCuentas
  ) {}

  ejecutar(dto: ActualizarMovimientoDTO): void {
    const anterior = this.repositorioMovimientos.obtenerPorId(dto.id)
    if (!anterior) return

    const movimiento = { ...anterior, ...dto }
    this.repositorioMovimientos.actualizar(movimiento)

    const cuenta = this.repositorioCuentas.obtenerPorId(dto.cuentaId)
    if (cuenta) {
      const reversaAnterior = anterior.tipo === TipoMovimiento.INGRESO ? -anterior.monto : anterior.monto
      const nuevoAjuste = dto.tipo === TipoMovimiento.INGRESO ? dto.monto : -dto.monto
      this.repositorioCuentas.actualizar({
        ...cuenta,
        saldo: cuenta.saldo + reversaAnterior + nuevoAjuste,
      })
    }
  }
}