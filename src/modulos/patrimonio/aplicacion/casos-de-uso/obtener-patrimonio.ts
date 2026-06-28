import { IRepositorioPatrimonio } from '../../dominio/repositorios/irepositorio-patrimonio'
import { ResumenPatrimonioDTO } from '../dto/resumen-patrimonio-dto'

export class ObtenerPatrimonio {
  constructor(
    private readonly repositorioPatrimonio: IRepositorioPatrimonio
  ) {}

  ejecutar(): ResumenPatrimonioDTO {
    const resumen = this.repositorioPatrimonio.obtenerResumen()

    return {
      activos: resumen.activos.valor,
      pasivos: resumen.pasivos.valor,
      patrimonio: resumen.patrimonio.valor,
      ingresos: resumen.ingresos.valor,
      gastos: resumen.gastos.valor,
    }
  }
}
