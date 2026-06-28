import { AutenticacionError } from './autenticacion-error'

export class PinInvalidoError extends AutenticacionError {
  constructor() {
    super('El PIN debe tener entre 4 y 6 dígitos numéricos')
    this.name = 'PinInvalidoError'
  }
}
