import { IRepositorioCuentas } from '../../dominio/repositorios/irepositorio-cuentas'

export class EliminarCuenta {
  constructor(
    private readonly repositorioCuentas: IRepositorioCuentas
  ) {}

  ejecutar(id: string): void {
    this.repositorioCuentas.eliminar(id)
  }
}