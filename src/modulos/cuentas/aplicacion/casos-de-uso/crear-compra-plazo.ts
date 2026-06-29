import { IRepositorioComprasPlazo } from '../../dominio/repositorios/irepositorio-compras-plazo'
import { CompraPlazo } from '../../dominio/entidades/compra-plazo'
import { CrearCompraPlazoDTO } from '../dto/crear-compra-plazo-dto'

export class CrearCompraPlazo {
  constructor(
    private readonly repositorio: IRepositorioComprasPlazo
  ) {}

  private generarId(): string {
    return crypto.randomUUID()
  }

  ejecutar(dto: CrearCompraPlazoDTO): void {
    const compra: CompraPlazo = {
      id: this.generarId(),
      cuentaId: dto.cuentaId,
      descripcion: dto.descripcion,
      montoTotal: dto.montoTotal,
      mesesTotales: dto.mesesTotales,
      mesesRestantes: dto.mesesTotales,
      fechaInicio: new Date().toISOString(),
    }

    this.repositorio.crear(compra)
  }
}