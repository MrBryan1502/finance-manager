import { TipoMovimiento } from '../../dominio/value-objects/tipo-movimiento'

export interface ActualizarMovimientoDTO {
  id: string
  tipo: TipoMovimiento
  monto: number
  descripcion: string
  categoria: string
  cuentaId: string
}