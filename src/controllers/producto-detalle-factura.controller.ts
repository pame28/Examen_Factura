import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Producto,
  DetalleFactura,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDetalleFacturaController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Array of Producto has many DetalleFactura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DetalleFactura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetalleFactura>,
  ): Promise<DetalleFactura[]> {
    return this.productoRepository.detalleFacturas(id).find(filter);
  }

  @post('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleFactura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFactura, {
            title: 'NewDetalleFacturaInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) detalleFactura: Omit<DetalleFactura, 'id'>,
  ): Promise<DetalleFactura> {
    return this.productoRepository.detalleFacturas(id).create(detalleFactura);
  }

  @patch('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Producto.DetalleFactura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleFactura, {partial: true}),
        },
      },
    })
    detalleFactura: Partial<DetalleFactura>,
    @param.query.object('where', getWhereSchemaFor(DetalleFactura)) where?: Where<DetalleFactura>,
  ): Promise<Count> {
    return this.productoRepository.detalleFacturas(id).patch(detalleFactura, where);
  }

  @del('/productos/{id}/detalle-facturas', {
    responses: {
      '200': {
        description: 'Producto.DetalleFactura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetalleFactura)) where?: Where<DetalleFactura>,
  ): Promise<Count> {
    return this.productoRepository.detalleFacturas(id).delete(where);
  }
}
