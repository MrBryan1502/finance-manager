import { IRepositorioComprasPlazo } from '../../dominio/repositorios/irepositorio-compras-plazo'
import { CompraPlazo } from '../../dominio/entidades/compra-plazo'

const CLAVE_COMPRAS = 'compras_plazo'

export class RepositorioComprasPlazo implements IRepositorioComprasPlazo {
  listarPorCuenta(cuentaId: string): CompraPlazo[] {
    const datos = localStorage.getItem(CLAVE_COMPRAS)
    if (!datos) return []
    const todas = JSON.parse(datos) as CompraPlazo[]
    return todas.filter((c) => c.cuentaId === cuentaId)
  }

  crear(compra: CompraPlazo): void {
    const datos = localStorage.getItem(CLAVE_COMPRAS)
    const todas: CompraPlazo[] = datos ? JSON.parse(datos) : []
    todas.push(compra)
    localStorage.setItem(CLAVE_COMPRAS, JSON.stringify(todas))
  }
}