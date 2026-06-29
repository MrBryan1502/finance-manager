export interface CrearCuentaDTO {
  nombre: string
  saldo: number
  tipo: string
  limiteCredito?: number
  diaCorte?: number
  diaPago?: number
}
