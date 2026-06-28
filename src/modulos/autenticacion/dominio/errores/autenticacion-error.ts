export class AutenticacionError extends Error {
  constructor(mensaje: string) {
    super(mensaje)
    this.name = 'AutenticacionError'
  }
}
