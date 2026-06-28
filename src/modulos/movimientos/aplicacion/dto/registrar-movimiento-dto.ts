import { TipoMovimiento } from '../../dominio/value-objects/tipo-movimiento'

export interface RegistrarMovimientoDTO {
  tipo: TipoMovimiento
  monto: number
  descripcion: string
  categoria: string
  cuentaId: string
}
