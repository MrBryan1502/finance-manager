import { PinAcceso } from '../../dominio/value-objects/pin-acceso'

const CLAVE_PIN = 'pin_acceso'

export class MapeadorAutenticacion {
  static aCadena(pin: PinAcceso): string {
    return pin.valor
  }

  static aPinAcceso(cadena: string): PinAcceso {
    return PinAcceso.crear(cadena)
  }

  static clavePin(): string {
    return CLAVE_PIN
  }
}
