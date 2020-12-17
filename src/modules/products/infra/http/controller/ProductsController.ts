import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import { getRepository } from 'typeorm';
import Product from '../../typeorm/entities/Product';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    const { name, price, quantity } = request.body;

    const createProductService = container.resolve(CreateProductService);

    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const repository = getRepository(Product);

    const products = await repository.find();

    return response.json(products);
  }
}
