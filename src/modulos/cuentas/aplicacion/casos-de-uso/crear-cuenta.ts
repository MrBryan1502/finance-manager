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
    }

    this.repositorioCuentas.crear(cuenta)
  }
}
