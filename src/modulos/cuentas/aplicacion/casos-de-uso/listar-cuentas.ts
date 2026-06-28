import { IRepositorioCuentas } from '../../dominio/repositorios/irepositorio-cuentas'
import { Cuenta } from '../../dominio/entidades/cuenta'

export class ListarCuentas {
  constructor(
    private readonly repositorioCuentas: IRepositorioCuentas
  ) {}

  ejecutar(): Cuenta[] {
    return this.repositorioCuentas.listar()
  }
}
