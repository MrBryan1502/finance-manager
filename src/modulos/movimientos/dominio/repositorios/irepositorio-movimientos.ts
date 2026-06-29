import { Movimiento } from '../entidades/movimiento'

export interface IRepositorioMovimientos {
  listar(): Movimiento[]
  obtenerPorId(id: string): Movimiento | undefined
  registrar(movimiento: Movimiento): void
  actualizar(movimiento: Movimiento): void
  eliminar(id: string): void
}
