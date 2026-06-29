import { CompraPlazo } from '../entidades/compra-plazo'

export interface IRepositorioComprasPlazo {
  listarPorCuenta(cuentaId: string): CompraPlazo[]
  crear(compra: CompraPlazo): void
}