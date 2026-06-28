import { IRepositorioMovimientos } from '../../dominio/repositorios/irepositorio-movimientos'
import { Movimiento } from '../../dominio/entidades/movimiento'

export class ListarMovimientos {
  constructor(
    private readonly repositorioMovimientos: IRepositorioMovimientos
  ) {}

  ejecutar(): Movimiento[] {
    return this.repositorioMovimientos.listar()
  }
}
