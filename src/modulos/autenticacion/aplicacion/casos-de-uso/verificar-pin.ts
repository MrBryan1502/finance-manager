import { IRepositorioAutenticacion } from '../../dominio/repositorios/irepositorio-autenticacion'
import { PinAcceso } from '../../dominio/value-objects/pin-acceso'
import { PinIncorrectoError } from '../../dominio/errores/pin-incorrecto-error'
import { VerificarPinDTO } from '../dto/verificar-pin-dto'

export class VerificarPin {
  constructor(
    private readonly repositorioAutenticacion: IRepositorioAutenticacion
  ) {}

  ejecutar(dto: VerificarPinDTO): void {
    const pinIngresado = PinAcceso.crear(dto.pin)
    const pinGuardado = this.repositorioAutenticacion.obtenerPin()

    if (!pinGuardado) {
      throw new PinIncorrectoError()
    }

    if (!pinIngresado.esIgual(pinGuardado)) {
      throw new PinIncorrectoError()
    }
  }
}
