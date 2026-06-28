import { AutenticacionError } from './autenticacion-error'

export class PinIncorrectoError extends AutenticacionError {
  constructor() {
    super('El PIN ingresado es incorrecto')
    this.name = 'PinIncorrectoError'
  }
}
