import { Cuenta } from '../entidades/cuenta'

export interface IRepositorioCuentas {
  listar(): Cuenta[]
  crear(cuenta: Cuenta): void
}
