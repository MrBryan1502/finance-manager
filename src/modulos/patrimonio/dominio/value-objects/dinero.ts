export class Dinero {
  private readonly _valor: number

  private constructor(valor: number) {
    this._valor = Math.round(valor * 100) / 100
  }

  static crear(valor: number): Dinero {
    if (isNaN(valor)) {
      throw new Error('El valor debe ser un número válido')
    }
    return new Dinero(valor)
  }

  get valor(): number {
    return this._valor
  }

  get formateado(): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(this._valor)
  }

  sumar(otro: Dinero): Dinero {
    return Dinero.crear(this._valor + otro._valor)
  }

  restar(otro: Dinero): Dinero {
    return Dinero.crear(this._valor - otro._valor)
  }

  esMayorQue(otro: Dinero): boolean {
    return this._valor > otro._valor
  }

  esIgual(otro: Dinero): boolean {
    return this._valor === otro._valor
  }
}
