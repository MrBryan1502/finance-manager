import { IRepositorioMovimientos } from '../../dominio/repositorios/irepositorio-movimientos'
import { Movimiento } from '../../dominio/entidades/movimiento'

const CLAVE_MOVIMIENTOS = 'movimientos'

export class RepositorioMovimientos implements IRepositorioMovimientos {
  listar(): Movimiento[] {
    const datos = localStorage.getItem(CLAVE_MOVIMIENTOS)
    if (!datos) return []
    return JSON.parse(datos) as Movimiento[]
  }

  registrar(movimiento: Movimiento): void {
    const movimientos = this.listar()
    movimientos.push(movimiento)
    localStorage.setItem(CLAVE_MOVIMIENTOS, JSON.stringify(movimientos))
  }
}
