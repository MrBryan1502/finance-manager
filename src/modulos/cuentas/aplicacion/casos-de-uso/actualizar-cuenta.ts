import { IRepositorioCuentas } from '../../dominio/repositorios/irepositorio-cuentas'
import { ActualizarCuentaDTO } from '../dto/actualizar-cuenta-dto'

export class ActualizarCuenta {
  constructor(
    private readonly repositorioCuentas: IRepositorioCuentas
  ) {}

  ejecutar(dto: ActualizarCuentaDTO): void {
    const cuenta = this.repositorioCuentas.obtenerPorId(dto.id)
    if (!cuenta) return

    this.repositorioCuentas.actualizar({
      id: dto.id,
      nombre: dto.nombre,
      saldo: dto.saldo,
      tipo: dto.tipo,
      ...(dto.limiteCredito !== undefined && { limiteCredito: dto.limiteCredito }),
      ...(dto.diaCorte !== undefined && { diaCorte: dto.diaCorte }),
      ...(dto.diaPago !== undefined && { diaPago: dto.diaPago }),
    })
  }
}