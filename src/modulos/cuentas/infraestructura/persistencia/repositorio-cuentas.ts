import { IRepositorioCuentas } from '../../dominio/repositorios/irepositorio-cuentas'
import { Cuenta } from '../../dominio/entidades/cuenta'

const CLAVE_CUENTAS = 'cuentas'

export class RepositorioCuentas implements IRepositorioCuentas {
  listar(): Cuenta[] {
    const datos = localStorage.getItem(CLAVE_CUENTAS)
    if (!datos) return []
    return JSON.parse(datos) as Cuenta[]
  }

  crear(cuenta: Cuenta): void {
    const cuentas = this.listar()
    cuentas.push(cuenta)
    localStorage.setItem(CLAVE_CUENTAS, JSON.stringify(cuentas))
  }
}
