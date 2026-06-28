import { IRepositorioAutenticacion } from '../../dominio/repositorios/irepositorio-autenticacion'

export interface EstadoAutenticacion {
  sesionIniciada: boolean
  pinConfigurado: boolean
}

export class ObtenerEstadoAutenticacion {
  constructor(
    private readonly repositorioAutenticacion: IRepositorioAutenticacion
  ) {}

  ejecutar(): EstadoAutenticacion {
    const pinConfigurado = this.repositorioAutenticacion.existePin()

    return {
      sesionIniciada: false,
      pinConfigurado,
    }
  }
}
