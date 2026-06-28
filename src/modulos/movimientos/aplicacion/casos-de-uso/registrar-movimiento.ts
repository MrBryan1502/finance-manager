import { IRepositorioMovimientos } from '../../dominio/repositorios/irepositorio-movimientos'
import { Movimiento } from '../../dominio/entidades/movimiento'
import { RegistrarMovimientoDTO } from '../dto/registrar-movimiento-dto'

export class RegistrarMovimiento {
  constructor(
    private readonly repositorioMovimientos: IRepositorioMovimientos
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
  }
}
