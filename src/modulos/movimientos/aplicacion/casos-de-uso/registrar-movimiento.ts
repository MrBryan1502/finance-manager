import { IRepositorioMovimientos } from '../../dominio/repositorios/irepositorio-movimientos'
import { IRepositorioCuentas } from '../../../cuentas/dominio/repositorios/irepositorio-cuentas'
import { Movimiento } from '../../dominio/entidades/movimiento'
import { RegistrarMovimientoDTO } from '../dto/registrar-movimiento-dto'
import { TipoMovimiento } from '../../dominio/value-objects/tipo-movimiento'

export class RegistrarMovimiento {
  constructor(
    private readonly repositorioMovimientos: IRepositorioMovimientos,
    private readonly repositorioCuentas: IRepositorioCuentas
  ) {}

  private generarId(): string {
    return crypto.randomUUID()
  }

  ejecutar(dto: RegistrarMovimientoDTO): void {
    const movimiento: Movimiento = {
      id: this.generarId(),
      tipo: dto.tipo,
      monto: dto.monto,
      descripcion: dto.descripcion,
      categoria: dto.categoria,
      fecha: new Date().toISOString(),
      cuentaId: dto.cuentaId,
    }

    this.repositorioMovimientos.registrar(movimiento)

    const cuenta = this.repositorioCuentas.obtenerPorId(dto.cuentaId)
    if (cuenta) {
      const ajuste = dto.tipo === TipoMovimiento.INGRESO ? dto.monto : -dto.monto
      this.repositorioCuentas.actualizar({
        ...cuenta,
        saldo: cuenta.saldo + ajuste,
      })
    }
  }
}