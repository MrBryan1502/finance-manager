import { IRepositorioAutenticacion } from '../../dominio/repositorios/irepositorio-autenticacion'
import { PinAcceso } from '../../dominio/value-objects/pin-acceso'
import { EstablecerPinDTO } from '../dto/establecer-pin-dto'

export class EstablecerPin {
  constructor(
    private readonly repositorioAutenticacion: IRepositorioAutenticacion
  ) {}

  ejecutar(dto: EstablecerPinDTO): void {
    const pin = PinAcceso.crear(dto.pin)
    this.repositorioAutenticacion.guardarPin(pin)
  }
}
