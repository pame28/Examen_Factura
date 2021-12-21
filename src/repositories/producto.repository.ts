import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Producto, ProductoRelations, DetalleFactura} from '../models';
import {DetalleFacturaRepository} from './detalle-factura.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly detalleFacturas: HasManyRepositoryFactory<DetalleFactura, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DetalleFacturaRepository') protected detalleFacturaRepositoryGetter: Getter<DetalleFacturaRepository>,
  ) {
    super(Producto, dataSource);
    this.detalleFacturas = this.createHasManyRepositoryFactoryFor('detalleFacturas', detalleFacturaRepositoryGetter,);
    this.registerInclusionResolver('detalleFacturas', this.detalleFacturas.inclusionResolver);
  }
}
