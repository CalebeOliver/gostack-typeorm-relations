import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import AppError from '@shared/errors/AppError';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    // TODO
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    // TODO
    const product = await this.ormRepository.findOne({ name });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    // TODO
    const foundProducts = await this.ormRepository.find({
      where: {
        id: In(products.map(({ id }) => id)),
      },
    });

    return foundProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    // TODO
    const result = await Promise.all(
      products.map(async ({ id, quantity }) => {
        const product = await this.ormRepository.findOne(id);
        if (!product) throw new AppError('product informed not found');
        product.quantity = quantity;
        await this.ormRepository.save(product);
        return product;
      }),
    );
    return result;
  }
}

export default ProductsRepository;
