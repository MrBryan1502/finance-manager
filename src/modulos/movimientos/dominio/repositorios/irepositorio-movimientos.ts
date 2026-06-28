import { Movimiento } from '../entidades/movimiento'

export interface IRepositorioMovimientos {
  listar(): Movimiento[]
  registrar(movimiento: Movimiento): void
}
