import { IRepositorioCuentas } from '../../dominio/repositorios/irepositorio-cuentas'
import { Cuenta } from '../../dominio/entidades/cuenta'

const CLAVE_CUENTAS = 'cuentas'

export class RepositorioCuentas implements IRepositorioCuentas {
  listar(): Cuenta[] {
    const datos = localStorage.getItem(CLAVE_CUENTAS)
    if (!datos) return []
    return JSON.parse(datos) as Cuenta[]
  }

  obtenerPorId(id: string): Cuenta | undefined {
    return this.listar().find((c) => c.id === id)
  }

  crear(cuenta: Cuenta): void {
    const cuentas = this.listar()
    cuentas.push(cuenta)
    localStorage.setItem(CLAVE_CUENTAS, JSON.stringify(cuentas))
  }

  actualizar(cuenta: Cuenta): void {
    const cuentas = this.listar()
    const indice = cuentas.findIndex((c) => c.id === cuenta.id)
    if (indice !== -1) {
      cuentas[indice] = cuenta
      localStorage.setItem(CLAVE_CUENTAS, JSON.stringify(cuentas))
    }
  }

  eliminar(id: string): void {
    const cuentas = this.listar().filter((c) => c.id !== id)
    localStorage.setItem(CLAVE_CUENTAS, JSON.stringify(cuentas))
  }
}
