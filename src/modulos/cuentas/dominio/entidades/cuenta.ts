export interface Cuenta {
  id: string
  nombre: string
  saldo: number
  tipo: string
  limiteCredito?: number
  diaCorte?: number
  diaPago?: number
}
