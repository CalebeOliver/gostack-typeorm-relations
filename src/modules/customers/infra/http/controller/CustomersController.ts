import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

import { container } from 'tsyringe';
import { getRepository } from 'typeorm';
import Customer from '../../typeorm/entities/Customer';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    const { name, email } = request.body;

    const createCustomerService = container.resolve(CreateCustomerService);

    const customer = await createCustomerService.execute({
      name,
      email,
    });

    return response.json(customer);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const repository = getRepository(Customer);

    const customers = await repository.find();

    return response.json(customers);
  }
}
