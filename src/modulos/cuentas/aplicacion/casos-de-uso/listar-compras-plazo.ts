import { IRepositorioComprasPlazo } from '../../dominio/repositorios/irepositorio-compras-plazo'
import { CompraPlazo } from '../../dominio/entidades/compra-plazo'

export class ListarComprasPlazo {
  constructor(
    private readonly repositorio: IRepositorioComprasPlazo
  ) {}

  ejecutar(cuentaId: string): CompraPlazo[] {
    return this.repositorio.listarPorCuenta(cuentaId)
  }
}