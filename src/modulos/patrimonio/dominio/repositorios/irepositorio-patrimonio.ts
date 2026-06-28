import { Dinero } from '../value-objects/dinero'

export interface ResumenPatrimonio {
  activos: Dinero
  pasivos: Dinero
  patrimonio: Dinero
  ingresos: Dinero
  gastos: Dinero
}

export interface IRepositorioPatrimonio {
  obtenerResumen(): ResumenPatrimonio
}
