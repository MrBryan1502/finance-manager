import { PinInvalidoError } from '../errores/pin-invalido-error'

export class PinAcceso {
  private readonly _valor: string

  private constructor(valor: string) {
    this._valor = valor
  }

  static crear(pin: string): PinAcceso {
    if (!/^\d{4,6}$/.test(pin)) {
      throw new PinInvalidoError()
    }
    return new PinAcceso(pin)
  }

  get valor(): string {
    return this._valor
  }

  esIgual(pin: PinAcceso): boolean {
    return this._valor === pin._valor
  }
}
