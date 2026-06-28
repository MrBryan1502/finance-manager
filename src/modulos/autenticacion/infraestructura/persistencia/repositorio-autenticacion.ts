import { IRepositorioAutenticacion } from '../../dominio/repositorios/irepositorio-autenticacion'
import { PinAcceso } from '../../dominio/value-objects/pin-acceso'
import { MapeadorAutenticacion } from '../mapeadores/mapeador-autenticacion'

export class RepositorioAutenticacion implements IRepositorioAutenticacion {
  obtenerPin(): PinAcceso | null {
    const valor = localStorage.getItem(MapeadorAutenticacion.clavePin())
    if (!valor) return null
    return MapeadorAutenticacion.aPinAcceso(valor)
  }

  guardarPin(pin: PinAcceso): void {
    localStorage.setItem(
      MapeadorAutenticacion.clavePin(),
      MapeadorAutenticacion.aCadena(pin)
    )
  }

  existePin(): boolean {
    return localStorage.getItem(MapeadorAutenticacion.clavePin()) !== null
  }
}
