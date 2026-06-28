import { TipoMovimiento } from '../value-objects/tipo-movimiento'

export interface Movimiento {
  id: string
  tipo: TipoMovimiento
  monto: number
  descripcion: string
  categoria: string
  fecha: string
  cuentaId: string
}
