import { IRepositorioCuentas } from '../../dominio/repositorios/irepositorio-cuentas'
import { Cuenta } from '../../dominio/entidades/cuenta'
import { CrearCuentaDTO } from '../dto/crear-cuenta-dto'

export class CrearCuenta {
  constructor(
    private readonly repositorioCuentas: IRepositorioCuentas
  ) {}

  private generarId(): string {
    return crypto.randomUUID()
  }

  ejecutar(dto: CrearCuentaDTO): void {
    const cuenta: Cuenta = {
      id: this.generarId(),
      nombre: dto.nombre,
      saldo: dto.saldo,
      tipo: dto.tipo,
      ...(dto.limiteCredito !== undefined && { limiteCredito: dto.limiteCredito }),
      ...(dto.diaCorte !== undefined && { diaCorte: dto.diaCorte }),
      ...(dto.diaPago !== undefined && { diaPago: dto.diaPago }),
    }

    this.repositorioCuentas.crear(cuenta)
  }
}
