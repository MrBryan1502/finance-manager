import { PinAcceso } from '../value-objects/pin-acceso'

export interface IRepositorioAutenticacion {
  obtenerPin(): PinAcceso | null
  guardarPin(pin: PinAcceso): void
  existePin(): boolean
}
