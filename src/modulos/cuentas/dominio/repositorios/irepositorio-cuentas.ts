import { Cuenta } from '../entidades/cuenta'

export interface IRepositorioCuentas {
  listar(): Cuenta[]
  obtenerPorId(id: string): Cuenta | undefined
  crear(cuenta: Cuenta): void
  actualizar(cuenta: Cuenta): void
  eliminar(id: string): void
}
