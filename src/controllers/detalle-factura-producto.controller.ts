import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetalleFactura,
  Producto,
} from '../models';
import {DetalleFacturaRepository} from '../repositories';

export class DetalleFacturaProductoController {
  constructor(
    @repository(DetalleFacturaRepository)
    public detalleFacturaRepository: DetalleFacturaRepository,
  ) { }

  @get('/detalle-facturas/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to DetalleFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof DetalleFactura.prototype.id,
  ): Promise<Producto> {
    return this.detalleFacturaRepository.producto(id);
  }
}
