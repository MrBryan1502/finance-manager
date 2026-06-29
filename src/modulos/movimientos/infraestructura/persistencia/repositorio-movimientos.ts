import { IRepositorioMovimientos } from '../../dominio/repositorios/irepositorio-movimientos'
import { Movimiento } from '../../dominio/entidades/movimiento'

const CLAVE_MOVIMIENTOS = 'movimientos'

export class RepositorioMovimientos implements IRepositorioMovimientos {
  listar(): Movimiento[] {
    const datos = localStorage.getItem(CLAVE_MOVIMIENTOS)
    if (!datos) return []
    return JSON.parse(datos) as Movimiento[]
  }

  obtenerPorId(id: string): Movimiento | undefined {
    return this.listar().find((m) => m.id === id)
  }

  registrar(movimiento: Movimiento): void {
    const movimientos = this.listar()
    movimientos.push(movimiento)
    localStorage.setItem(CLAVE_MOVIMIENTOS, JSON.stringify(movimientos))
  }

  actualizar(movimiento: Movimiento): void {
    const movimientos = this.listar()
    const indice = movimientos.findIndex((m) => m.id === movimiento.id)
    if (indice !== -1) {
      movimientos[indice] = movimiento
      localStorage.setItem(CLAVE_MOVIMIENTOS, JSON.stringify(movimientos))
    }
  }

  eliminar(id: string): void {
    const movimientos = this.listar().filter((m) => m.id !== id)
    localStorage.setItem(CLAVE_MOVIMIENTOS, JSON.stringify(movimientos))
  }
}